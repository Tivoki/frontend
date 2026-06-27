import {
  AiBrain01Icon,
  Database01Icon,
  Doc01Icon,
  MessageMultiple01Icon,
} from '@hugeicons/core-free-icons';

import type {
  BillingCycle,
  BillingHistoryEntry,
  BillingSummary,
  Invoice,
  PaymentMethod,
  PlanInfo,
  PlanTier,
  UsageMetric,
  UsageOverage,
} from './types';

export const CURRENT_CYCLE: BillingCycle = {
  start: 'May 12, 2026',
  end: 'Jun 12, 2026',
  daysLeft: 21,
};

export const TOTAL_THIS_MONTH = '$48.60';
export const NEXT_PAYMENT_DATE = 'Jun 12, 2026';

export const PAYMENT_METHODS: PaymentMethod[] = [
  { id: 'pm1', brand: 'Visa', last4: '4242', expiry: '08 / 27', isDefault: true },
  { id: 'pm2', brand: 'Mastercard', last4: '5588', expiry: '02 / 26', isDefault: false },
];

export const CURRENT_PLAN: PlanInfo = {
  name: 'Pro Plan',
  price: '$99',
  interval: 'month',
  features: [
    '10,000 AI conversations / month',
    '40,000 messages / month',
    '200 knowledge base documents',
    '5 GB storage',
    'Integrations & Webhooks',
    'Priority email support',
  ],
};

export const USAGE_METRICS: UsageMetric[] = [
  {
    id: 'conversations',
    label: 'AI conversations',
    description: 'Conversations handled by AI',
    used: 6800,
    limit: 10000,
    unit: '',
    icon: MessageMultiple01Icon,
    barClassName: 'bg-primary',
    iconClassName: 'bg-primary/10 text-primary',
  },
  {
    id: 'messages',
    label: 'Messages',
    description: 'Total messages (user + AI)',
    used: 24560,
    limit: 40000,
    unit: '',
    icon: AiBrain01Icon,
    barClassName: 'bg-success',
    iconClassName: 'bg-success/15 text-success-foreground',
  },
  {
    id: 'kb-documents',
    label: 'Knowledge base documents',
    description: 'Total documents in your KB',
    used: 128,
    limit: 200,
    unit: '',
    icon: Doc01Icon,
    barClassName: 'bg-orange-500',
    iconClassName: 'bg-orange-500/10 text-orange-600 dark:text-orange-400',
  },
  {
    id: 'storage',
    label: 'Storage',
    description: 'Total storage used',
    used: 2.4,
    limit: 5,
    unit: 'GB',
    icon: Database01Icon,
    barClassName: 'bg-blue-500',
    iconClassName: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  },
];

export const INVOICES: Invoice[] = [
  {
    id: 'i1',
    number: 'INV-2026-0601',
    date: 'Jun 1, 2026',
    period: 'May 12 – Jun 12, 2026',
    amount: '$99.00',
    status: 'upcoming',
  },
  {
    id: 'i2',
    number: 'INV-2026-0501',
    date: 'May 1, 2026',
    period: 'Apr 12 – May 12, 2026',
    amount: '$99.00',
    status: 'paid',
  },
  {
    id: 'i3',
    number: 'INV-2026-0401',
    date: 'Apr 1, 2026',
    period: 'Mar 12 – Apr 12, 2026',
    amount: '$99.00',
    status: 'paid',
  },
  {
    id: 'i4',
    number: 'INV-2026-0301',
    date: 'Mar 1, 2026',
    period: 'Feb 12 – Mar 12, 2026',
    amount: '$99.00',
    status: 'paid',
  },
  {
    id: 'i5',
    number: 'INV-2026-0201',
    date: 'Feb 1, 2026',
    period: 'Jan 12 – Feb 12, 2026',
    amount: '$99.00',
    status: 'paid',
  },
];

export const BILLING_SUMMARY: BillingSummary = {
  subscription: '$99.00',
  usageOverages: '$0.00',
  taxRate: '0%',
  taxAmount: '$0.00',
  total: '$99.00 USD',
};

export const USAGE_OVERAGE: UsageOverage = {
  conversationsOver: 1320,
  ratePerConversation: '$0.015',
};

export const BILLING_HISTORY: BillingHistoryEntry[] = [
  {
    id: 'h1',
    date: 'Jun 1, 2026',
    description: 'Pro Plan — subscription charge',
    type: 'charge',
    amount: '$99.00',
  },
  {
    id: 'h2',
    date: 'May 28, 2026',
    description: 'Usage overage — 1,320 AI conversations',
    type: 'overage',
    amount: '$19.80',
  },
  {
    id: 'h3',
    date: 'May 1, 2026',
    description: 'Pro Plan — subscription charge',
    type: 'charge',
    amount: '$99.00',
  },
  {
    id: 'h4',
    date: 'Apr 1, 2026',
    description: 'Pro Plan — subscription charge',
    type: 'charge',
    amount: '$99.00',
  },
  {
    id: 'h5',
    date: 'Mar 14, 2026',
    description: 'Refund — billing adjustment',
    type: 'refund',
    amount: '-$12.00',
  },
  {
    id: 'h6',
    date: 'Mar 1, 2026',
    description: 'Pro Plan — subscription charge',
    type: 'charge',
    amount: '$99.00',
  },
];

export const PLAN_TIERS: PlanTier[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: '$29',
    interval: 'month',
    description: 'For small teams getting started with AI support.',
    features: [
      '2,000 AI conversations / month',
      '10,000 messages / month',
      '50 knowledge base documents',
      '1 GB storage',
      'Email support',
    ],
    isCurrent: false,
    isHighlighted: false,
    ctaLabel: 'Downgrade',
  },
  {
    id: 'pro',
    name: 'Pro Plan',
    price: '$99',
    interval: 'month',
    description: 'For growing teams that need more conversations and integrations.',
    features: [
      '10,000 AI conversations / month',
      '40,000 messages / month',
      '200 knowledge base documents',
      '5 GB storage',
      'Integrations & Webhooks',
      'Priority email support',
    ],
    isCurrent: true,
    isHighlighted: true,
    ctaLabel: 'Current plan',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: '$299',
    interval: 'month',
    description: 'For larger organizations with advanced security and support needs.',
    features: [
      'Unlimited AI conversations',
      'Unlimited messages',
      'Unlimited knowledge base documents',
      '50 GB storage',
      'Integrations & Webhooks',
      'SSO & advanced security',
      'Dedicated account manager',
    ],
    isCurrent: false,
    isHighlighted: false,
    ctaLabel: 'Upgrade',
  },
];
