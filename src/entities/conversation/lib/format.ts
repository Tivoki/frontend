import type { ConversationBadge } from '../model/config';
import type { ActiveEscalation, ConversationStatus, InboxItem } from '../model/types';

/** Name, else email, else a neutral label — never invented data. */
export function visitorLabel(visitor: InboxItem['visitor']): string {
  return visitor.name?.trim() || visitor.email?.trim() || 'Anonymous visitor';
}

export function visitorInitial(visitor: InboxItem['visitor']): string {
  const label = visitor.name?.trim() || visitor.email?.trim();
  return label ? label.charAt(0).toUpperCase() : '?';
}

export function badgeOf(
  status: ConversationStatus,
  escalation: Pick<ActiveEscalation, 'status'> | null,
): ConversationBadge {
  if (status === 'CLOSED') return 'closed';
  if (!escalation) return 'ai';
  return escalation.status === 'IN_PROGRESS' ? 'in_progress' : 'waiting';
}

const timeFormatter = new Intl.DateTimeFormat(undefined, {
  hour: '2-digit',
  minute: '2-digit',
});
const dateTimeFormatter = new Intl.DateTimeFormat(undefined, {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
});

/** Local time for a bubble; date+time when not today. Input is ISO/UTC. */
export function formatMessageTime(iso: string): string {
  const date = new Date(iso);
  const today = new Date();
  return date.toDateString() === today.toDateString()
    ? timeFormatter.format(date)
    : dateTimeFormatter.format(date);
}

export function formatDateTime(iso: string | null | undefined): string {
  return iso ? dateTimeFormatter.format(new Date(iso)) : '—';
}

/** "en" → "English" in the viewer's locale; unknown codes are shown as-is. */
export function languageName(code: string | null | undefined): string | null {
  if (!code) return null;
  try {
    return new Intl.DisplayNames(undefined, { type: 'language' }).of(code) ?? code;
  } catch {
    return code;
  }
}
