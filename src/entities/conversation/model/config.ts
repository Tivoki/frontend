import type { ConversationStatus, ConversationChannel } from './types';

export const STATUS_STYLES: Record<ConversationStatus, string> = {
  open: 'bg-info-subtle text-info-foreground',
  pending: 'bg-warning-subtle text-warning-foreground',
  resolved: 'bg-success-subtle text-success-foreground',
  closed: 'bg-muted text-foreground',
};

export const STATUS_LABELS: Record<ConversationStatus, string> = {
  open: 'Open',
  pending: 'Pending',
  resolved: 'Resolved',
  closed: 'Closed',
};

export const CHANNEL_LABELS: Record<ConversationChannel, string> = {
  email: 'Email',
  webchat: 'Webchat',
  telegram: 'Telegram',
  intercom: 'Intercom',
};
