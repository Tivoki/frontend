import type { IconSvgElement } from '@hugeicons/react';

export type InvoiceStatus = 'paid' | 'upcoming' | 'pending' | 'failed';

export interface Invoice {
  id: string;
  number: string;
  date: string;
  period: string;
  amount: string;
  status: InvoiceStatus;
}

export interface BillingCycle {
  start: string;
  end: string;
  daysLeft: number;
}

export interface PaymentMethod {
  id: string;
  brand: string;
  last4: string;
  expiry: string;
  isDefault: boolean;
}

export interface PlanInfo {
  name: string;
  price: string;
  interval: string;
  features: string[];
}

export type UsageMetricId = 'conversations' | 'messages' | 'kb-documents' | 'storage';

export interface UsageMetric {
  id: UsageMetricId;
  label: string;
  description: string;
  used: number;
  limit: number;
  unit: string;
  icon: IconSvgElement;
  barClassName: string;
  iconClassName: string;
}

export interface BillingSummary {
  subscription: string;
  usageOverages: string;
  taxRate: string;
  taxAmount: string;
  total: string;
}

export interface UsageOverage {
  conversationsOver: number;
  ratePerConversation: string;
}

export type BillingHistoryEntryType = 'charge' | 'overage' | 'refund';

export interface BillingHistoryEntry {
  id: string;
  date: string;
  description: string;
  type: BillingHistoryEntryType;
  amount: string;
}

export interface PlanTier {
  id: string;
  name: string;
  price: string;
  interval: string;
  description: string;
  features: string[];
  isCurrent: boolean;
  isHighlighted: boolean;
  ctaLabel: string;
}
