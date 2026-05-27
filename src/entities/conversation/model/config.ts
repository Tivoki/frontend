import type { ConversationStatus, ConversationChannel } from './types';

export const STATUS_STYLES: Record<ConversationStatus, string> = {
  open: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  resolved: 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400',
  closed: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
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
