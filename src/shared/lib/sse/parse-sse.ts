/** One parsed Server-Sent Event. */
export interface SseMessage {
  event: string;
  data: string;
  id?: string;
}

/**
 * Incremental text/event-stream parser (WHATWG rules for event/data/id;
 * comments and retry are ignored). Feed decoded chunks; complete events are
 * returned, a trailing partial event is kept for the next chunk.
 */
export class SseParser {
  private buffer = '';

  push(chunk: string): SseMessage[] {
    this.buffer += chunk.replace(/\r\n?/g, '\n');
    const messages: SseMessage[] = [];
    let boundary: number;
    while ((boundary = this.buffer.indexOf('\n\n')) !== -1) {
      const block = this.buffer.slice(0, boundary);
      this.buffer = this.buffer.slice(boundary + 2);
      let event = 'message';
      const data: string[] = [];
      let id: string | undefined;
      for (const line of block.split('\n')) {
        if (!line || line.startsWith(':')) continue;
        const colon = line.indexOf(':');
        const field = colon === -1 ? line : line.slice(0, colon);
        let value = colon === -1 ? '' : line.slice(colon + 1);
        if (value.startsWith(' ')) value = value.slice(1);
        if (field === 'event') event = value;
        else if (field === 'data') data.push(value);
        else if (field === 'id') id = value;
      }
      if (data.length > 0) messages.push({ event, data: data.join('\n'), id });
    }
    return messages;
  }
}

/** Exponential backoff with full jitter, capped. */
export function backoffDelay(attempt: number, baseMs = 1_000, maxMs = 30_000): number {
  const ceiling = Math.min(maxMs, baseMs * 2 ** Math.max(0, attempt));
  return Math.round(ceiling / 2 + Math.random() * (ceiling / 2));
}
