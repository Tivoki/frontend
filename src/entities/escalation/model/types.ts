import type { IconSvgElement } from '@hugeicons/react';

export type EscalationStatus = 'waiting_human' | 'in_progress' | 'resolved';
export type EscalationDestination = 'telegram' | 'email' | 'webhook' | 'external_chat';
export type HandoffChannelStatus = 'connected' | 'needs_setup';

export interface Escalation {
  id: string;
  conversationId: string;
  visitorName: string;
  visitorEmail: string;
  reason: string;
  destination: EscalationDestination;
  status: EscalationStatus;
  requestedAt: string;
  source?: string;
  assignedTo?: string;
  notes?: string;
}

export interface HandoffChannel {
  id: string;
  name: string;
  description: string;
  status: HandoffChannelStatus;
  icon: IconSvgElement;
}

export interface RoutingRule {
  id: string;
  priority: number;
  condition: string;
  destinations: EscalationDestination[];
  active: boolean;
}
