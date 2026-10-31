import type { ConversationStatus } from './types';

/** What the inbox shows as the state badge: closed, AI, or a handoff stage. */
export type ConversationBadge = 'closed' | 'ai' | 'waiting' | 'in_progress';

export const BADGE_STYLES: Record<ConversationBadge, string> = {
  ai: 'bg-info-subtle text-info-foreground',
  waiting: 'bg-warning-subtle text-warning-foreground',
  in_progress: 'bg-success-subtle text-success-foreground',
  closed: 'bg-muted text-foreground',
};

export const BADGE_LABELS: Record<ConversationBadge, string> = {
  ai: 'Active · AI',
  waiting: 'Waiting',
  in_progress: 'In progress',
  closed: 'Closed',
};

export const STATUS_LABELS: Record<ConversationStatus, string> = {
  ACTIVE: 'Active',
  CLOSED: 'Closed',
};

export const ESCALATION_STATUS_LABELS: Record<
  'WAITING_HUMAN' | 'IN_PROGRESS' | 'RESOLVED',
  string
> = {
  WAITING_HUMAN: 'Waiting',
  IN_PROGRESS: 'In progress',
  RESOLVED: 'Resolved',
};

/** Visitor channel. Telegram is an operator channel, not a visitor source. */
export const CHANNEL_LABELS = { WEBCHAT: 'Webchat' } as const;
