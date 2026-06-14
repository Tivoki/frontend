import { BubbleChatIcon, Mail01Icon, TelegramIcon, WebhookIcon } from '@hugeicons/core-free-icons';

import type { Escalation, EscalationDestination, HandoffChannel, RoutingRule } from './types';

export const HANDOFF_CHANNELS: HandoffChannel[] = [
  {
    id: 'email',
    name: 'Email',
    description: 'Forward escalations to your support inbox',
    status: 'connected',
    icon: Mail01Icon,
  },
  {
    id: 'webhook',
    name: 'Webhook',
    description: 'Send escalations to your webhook endpoint',
    status: 'connected',
    icon: WebhookIcon,
  },
  {
    id: 'telegram',
    name: 'Telegram',
    description: 'Notify your team via Telegram channel',
    status: 'connected',
    icon: TelegramIcon,
  },
  {
    id: 'external-chat',
    name: 'External Chat',
    description: 'Open escalations in external live chat',
    status: 'needs_setup',
    icon: BubbleChatIcon,
  },
];

export const DEFAULT_ESCALATION_DESTINATION: EscalationDestination = 'email';

export const ROUTING_RULES: RoutingRule[] = [
  { id: 'r1', priority: 1, condition: 'If user asks for human', destinations: ['telegram', 'email'], active: true },
  { id: 'r2', priority: 2, condition: 'If AI confidence < 65%', destinations: ['webhook'], active: true },
  { id: 'r3', priority: 3, condition: 'If order issue', destinations: ['email'], active: true },
  { id: 'r4', priority: 4, condition: 'If VIP customer', destinations: ['external_chat', 'telegram'], active: false },
];

export const ESCALATIONS: Escalation[] = [
  {
    id: '1',
    conversationId: 'ESC-2024-0610-1024',
    visitorName: 'Sarah Johnson',
    visitorEmail: 'sarah.j@example.com',
    reason: 'Order not received',
    destination: 'telegram',
    status: 'waiting_human',
    requestedAt: 'Jun 10, 2024 10:24 AM',
    source: 'Web widget',
    assignedTo: '@support-team',
    notes: "Customer has not received their order placed on May 28. Tracking shows no updates.",
  },
  {
    id: '2',
    conversationId: 'ESC-2024-0610-0958',
    visitorName: 'Michael Chen',
    visitorEmail: 'michael.c@example.com',
    reason: 'Refund request',
    destination: 'email',
    status: 'in_progress',
    requestedAt: 'Jun 10, 2024 9:58 AM',
    source: 'Email',
    assignedTo: 'Alex M.',
  },
  {
    id: '3',
    conversationId: 'ESC-2024-0610-0937',
    visitorName: 'Emma Davis',
    visitorEmail: 'emma.d@example.com',
    reason: 'Payment issue',
    destination: 'webhook',
    status: 'in_progress',
    requestedAt: 'Jun 10, 2024 9:37 AM',
    source: 'Web widget',
    assignedTo: 'Support team',
  },
  {
    id: '4',
    conversationId: 'ESC-2024-0610-0852',
    visitorName: 'James Wilson',
    visitorEmail: 'james.w@example.com',
    reason: 'Cancel subscription',
    destination: 'external_chat',
    status: 'resolved',
    requestedAt: 'Jun 10, 2024 8:52 AM',
    source: 'Intercom',
  },
  {
    id: '5',
    conversationId: 'ESC-2024-0610-0831',
    visitorName: 'Priya Patel',
    visitorEmail: 'priya.p@example.com',
    reason: 'Product question',
    destination: 'telegram',
    status: 'resolved',
    requestedAt: 'Jun 10, 2024 8:31 AM',
    source: 'Web widget',
  },
];
