'use client';

import { useCallback, useSyncExternalStore } from 'react';
import type { PendingReply } from '~/entities/conversation';

interface ReplyState {
  draft: string;
  pending: PendingReply[];
}

const EMPTY: ReplyState = { draft: '', pending: [] };

/**
 * In-memory drafts and unsent replies per workspace + conversation. Kept for
 * the page's lifetime only (no persistence: drafts may contain PII), so
 * switching conversations or a failed send never loses text.
 */
const states = new Map<string, ReplyState>();
const listeners = new Set<() => void>();

const keyOf = (workspaceId: string, conversationId: string) =>
  `${workspaceId}:${conversationId}`;

function emit(): void {
  for (const listener of listeners) listener();
}

export function updateReplyState(
  workspaceId: string,
  conversationId: string,
  update: (state: ReplyState) => ReplyState,
): void {
  const key = keyOf(workspaceId, conversationId);
  states.set(key, update(states.get(key) ?? EMPTY));
  emit();
}

export function getReplyState(workspaceId: string, conversationId: string): ReplyState {
  return states.get(keyOf(workspaceId, conversationId)) ?? EMPTY;
}

/** Drops every draft (logout / workspace switch). */
export function clearReplyStates(): void {
  states.clear();
  emit();
}

export function useReplyState(workspaceId: string, conversationId: string): ReplyState {
  const subscribe = useCallback((listener: () => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }, []);
  return useSyncExternalStore(
    subscribe,
    () => getReplyState(workspaceId, conversationId),
    () => EMPTY,
  );
}
