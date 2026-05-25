export type ConversationStatus = 'pending' | 'active' | 'resolved' | 'escalated';

export type ConversationChannel = 'email' | 'webchat' | 'telegram' | 'intercom';

export interface Conversation {
  id: string;
  customerName: string;
  customerEmail: string;
  lastMessage: string;
  status: ConversationStatus;
  channel: ConversationChannel;
  time: string;
  avatarUrl?: string;
}
