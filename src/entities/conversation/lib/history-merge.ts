/** Minimal message shape the merge logic needs. */
export interface SeqMessage {
  id: string;
  seq: number;
}

/**
 * Merges canonical messages by id, ordered by seq. Safe for any mix of
 * catch-up pages, duplicates and out-of-order deliveries.
 */
export function mergeBySeq<T extends SeqMessage>(current: T[], incoming: T[]): T[] {
  if (incoming.length === 0) return current;
  const byId = new Map(current.map((message) => [message.id, message]));
  for (const message of incoming) byId.set(message.id, message);
  return [...byId.values()].sort((a, b) => a.seq - b.seq);
}

export interface PendingReply {
  clientMessageId: string;
  content: string;
  status: 'sending' | 'failed';
  error?: string;
}

/** Pending bubbles whose canonical message already arrived (via HTTP or SSE) are dropped. */
export function visiblePending<T extends { clientMessageId: string | null }>(
  pending: PendingReply[],
  canonical: T[],
): PendingReply[] {
  if (pending.length === 0) return pending;
  const known = new Set(
    canonical
      .map((message) => message.clientMessageId)
      .filter((id): id is string => !!id),
  );
  return pending.filter((reply) => !known.has(reply.clientMessageId));
}

/** Highest seq in a list of pages (0 when empty). */
export function newestSeq(messages: SeqMessage[]): number {
  return messages.reduce((max, message) => Math.max(max, message.seq), 0);
}
