'use client';

import { backoffDelay, SseParser } from '../lib/sse/parse-sse';
import { API_URL, refreshSession } from './client';

export interface StreamEvent {
  event: string;
  data: unknown;
}

export interface EventStreamHandle {
  close(): void;
  /** Drop the current connection and reconnect now (e.g. browser came online). */
  reconnect(): void;
}

interface Options {
  /** Path relative to the API base, e.g. `workspaces/1/conversation-events`. */
  path: string;
  onEvent: (event: StreamEvent) => void;
  /** Connection state changes, for "reconnecting" UI. */
  onStatus?: (status: 'connecting' | 'open' | 'reconnecting' | 'stopped') => void;
  /** 403/404: access is gone — the stream stops for good. */
  onForbidden?: () => void;
  /** 401 that a refresh could not fix. */
  onUnauthorized?: () => void;
}

/**
 * Cookie-authenticated SSE over fetch streaming (no tokens in the URL).
 * Unlike EventSource it sees HTTP statuses: 401 → one single-flight session
 * refresh, then reconnect; 403/404 → stop; other failures → bounded
 * exponential backoff with jitter. The server sends no replayable ids, so
 * every (re)connect must be followed by a resync from the API (callers do
 * that on the `ready` event).
 */
export function openEventStream(options: Options): EventStreamHandle {
  let controller: AbortController | null = null;
  let stopped = false;
  let attempt = 0;
  let timer: ReturnType<typeof setTimeout> | null = null;

  const schedule = (delay: number) => {
    if (stopped) return;
    if (timer) clearTimeout(timer);
    options.onStatus?.('reconnecting');
    timer = setTimeout(() => void connect(), delay);
  };

  const connect = async (): Promise<void> => {
    if (stopped) return;
    controller?.abort();
    const current = new AbortController();
    controller = current;
    options.onStatus?.(attempt === 0 ? 'connecting' : 'reconnecting');
    try {
      const response = await fetch(`${API_URL}/${options.path}`, {
        credentials: 'include',
        headers: { accept: 'text/event-stream' },
        cache: 'no-store',
        signal: current.signal,
      });
      if (response.status === 401) {
        if (await refreshSession()) {
          schedule(0);
        } else {
          stopped = true;
          options.onStatus?.('stopped');
          options.onUnauthorized?.();
        }
        return;
      }
      if (response.status === 403 || response.status === 404) {
        stopped = true;
        options.onStatus?.('stopped');
        options.onForbidden?.();
        return;
      }
      if (!response.ok || !response.body) throw new Error(`HTTP ${response.status}`);

      options.onStatus?.('open');
      const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
      const parser = new SseParser();
      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        attempt = 0;
        for (const message of parser.push(value)) {
          let data: unknown = null;
          try {
            data = JSON.parse(message.data);
          } catch {
            continue;
          }
          if (message.event === 'revoked') {
            stopped = true;
            options.onStatus?.('stopped');
            options.onForbidden?.();
            current.abort();
            return;
          }
          options.onEvent({ event: message.event, data });
        }
      }
      // Server closed (lifetime/reconnect hint, deploy drain): reconnect soon.
      schedule(backoffDelay(0, 500, 2_000));
    } catch {
      if (current.signal.aborted && controller !== current) return;
      if (stopped) return;
      schedule(backoffDelay(attempt++));
    }
  };

  void connect();

  return {
    close() {
      stopped = true;
      if (timer) clearTimeout(timer);
      controller?.abort();
      options.onStatus?.('stopped');
    },
    reconnect() {
      if (stopped) return;
      attempt = 0;
      schedule(0);
    },
  };
}
