export type TeamRole = 'Owner' | 'Admin' | 'Agent' | 'Viewer';
export type TeamMemberStatus = 'active' | 'invited';

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: TeamRole;
  status: TeamMemberStatus;
}

export type InvoiceStatus = 'paid' | 'pending' | 'failed';

export interface Invoice {
  id: string;
  number: string;
  date: string;
  amount: string;
  plan: string;
  status: InvoiceStatus;
}

export interface PlanInfo {
  name: string;
  price: string;
  interval: string;
  renewsOn: string;
  seats: number;
  seatsUsed: number;
}

export interface PaymentMethod {
  brand: string;
  last4: string;
  expiry: string;
}

export type ApiKeyScope = 'read' | 'write' | 'admin';

export interface ApiKey {
  id: string;
  name: string;
  maskedKey: string;
  scope: ApiKeyScope;
  createdAt: string;
  lastUsed: string;
}

export type DomainStatus = 'verified' | 'pending' | 'failed';

export interface Domain {
  id: string;
  domain: string;
  status: DomainStatus;
  addedAt: string;
}

export interface UsageMetric {
  id: string;
  label: string;
  used: number;
  limit: number;
  unit: string;
}

export interface AccountInfo {
  id: string;
  createdAt: string;
  plan: string;
}
