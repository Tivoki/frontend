export type NotificationKind = 'message' | 'ticket' | 'mention' | 'system';

export interface Notification {
  id: string;
  kind: NotificationKind;
  title: string;
  body: string;
  time: string;
  read: boolean;
}