export type ConversationStatus = 'open' | 'pending' | 'resolved' | 'closed';

export type ConversationChannel = 'email' | 'webchat' | 'telegram' | 'intercom';

export interface ConversationMessage {
  id: string;
  role: 'customer' | 'ai' | 'agent';
  content: string;
  timestamp: string;
}

export interface ConversationEvent {
  id: string;
  type: 'started' | 'ai_resolved' | 'viewed' | 'assigned';
  description: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  customerName: string;
  customerEmail: string;
  lastMessage: string;
  status: ConversationStatus;
  channel: ConversationChannel;
  time: string;
  avatarUrl?: string;
  assignedTo?: string;
  language?: string;
  createdAt?: string;
  source?: string;
  tags?: string[];
  messages?: ConversationMessage[];
  events?: ConversationEvent[];
  aiSummary?: string;
  unreadCount?: number;
  isEscalated?: boolean;
}
