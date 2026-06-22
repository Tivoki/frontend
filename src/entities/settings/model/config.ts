import type {
  AccountInfo,
  ApiKey,
  Domain,
  Invoice,
  PaymentMethod,
  PlanInfo,
  TeamMember,
  UsageMetric,
} from './types';

export const ACCOUNT_INFO: AccountInfo = {
  id: 'acc_8f7d2e3c6a4b1d09',
  createdAt: 'May 12, 2024',
  plan: 'Pro Plan',
};

export const CURRENT_PLAN: PlanInfo = {
  name: 'Pro Plan',
  price: '$99',
  interval: 'month',
  renewsOn: 'Jul 12, 2026',
  seats: 10,
  seatsUsed: 6,
};

export const PAYMENT_METHOD: PaymentMethod = {
  brand: 'Visa',
  last4: '4242',
  expiry: '08 / 27',
};

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'm1',
    name: 'Olivia Bennett',
    email: 'olivia@acme.com',
    role: 'Owner',
    status: 'active',
  },
  {
    id: 'm2',
    name: 'Marcus Lee',
    email: 'marcus.lee@acme.com',
    role: 'Admin',
    status: 'active',
  },
  {
    id: 'm3',
    name: 'Amanda Torres',
    email: 'amanda.t@acme.com',
    role: 'Agent',
    status: 'active',
  },
  {
    id: 'm4',
    name: 'Robert Wilson',
    email: 'r.wilson@acme.com',
    role: 'Agent',
    status: 'active',
  },
  {
    id: 'm5',
    name: 'Jennifer Smith',
    email: 'jennifer.smith@acme.com',
    role: 'Viewer',
    status: 'invited',
  },
];

export const INVOICES: Invoice[] = [
  {
    id: 'i1',
    number: 'INV-2026-006',
    date: 'Jun 12, 2026',
    amount: '$99.00',
    plan: 'Pro Plan',
    status: 'paid',
  },
  {
    id: 'i2',
    number: 'INV-2026-005',
    date: 'May 12, 2026',
    amount: '$99.00',
    plan: 'Pro Plan',
    status: 'paid',
  },
  {
    id: 'i3',
    number: 'INV-2026-004',
    date: 'Apr 12, 2026',
    amount: '$99.00',
    plan: 'Pro Plan',
    status: 'paid',
  },
  {
    id: 'i4',
    number: 'INV-2026-003',
    date: 'Mar 12, 2026',
    amount: '$49.00',
    plan: 'Starter Plan',
    status: 'paid',
  },
];

export const API_KEYS: ApiKey[] = [
  {
    id: 'k1',
    name: 'Production',
    maskedKey: 'tk_live_••••••••••••4a9f',
    scope: 'admin',
    createdAt: 'Jan 09, 2026',
    lastUsed: '2 hours ago',
  },
  {
    id: 'k2',
    name: 'Web widget',
    maskedKey: 'tk_live_••••••••••••e21c',
    scope: 'read',
    createdAt: 'Feb 18, 2026',
    lastUsed: '5 minutes ago',
  },
  {
    id: 'k3',
    name: 'Zapier integration',
    maskedKey: 'tk_live_••••••••••••77b0',
    scope: 'write',
    createdAt: 'Mar 30, 2026',
    lastUsed: 'Yesterday',
  },
];

export const DOMAINS: Domain[] = [
  { id: 'd1', domain: 'acme.com', status: 'verified', addedAt: 'May 12, 2024' },
  { id: 'd2', domain: 'support.acme.com', status: 'verified', addedAt: 'Jun 02, 2024' },
  { id: 'd3', domain: 'help.acme.io', status: 'pending', addedAt: 'Jun 10, 2026' },
  { id: 'd4', domain: 'old.acme.net', status: 'failed', addedAt: 'Jun 11, 2026' },
];

export const USAGE_METRICS: UsageMetric[] = [
  { id: 'u1', label: 'Conversations', used: 8420, limit: 15000, unit: '' },
  { id: 'u2', label: 'AI resolutions', used: 5210, limit: 10000, unit: '' },
  { id: 'u3', label: 'Team seats', used: 6, limit: 10, unit: '' },
  { id: 'u4', label: 'Knowledge base storage', used: 3.2, limit: 5, unit: 'GB' },
  { id: 'u5', label: 'API requests', used: 142000, limit: 500000, unit: '' },
];
