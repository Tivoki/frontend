import type { InboxFilter, InboxTab } from '../model/types';

export const INBOX_TABS: { value: InboxTab; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'waiting', label: 'Waiting for operator' },
  { value: 'in_progress', label: 'In progress' },
  { value: 'escalated', label: 'Escalated' },
  { value: 'closed', label: 'Closed' },
];

const LEGACY_TABS: Record<string, InboxTab> = {
  open: 'active',
  pending: 'waiting',
  resolved: 'closed',
};

/** Normalizes `?tab=` (incl. old open/pending/resolved links); unknown → all. */
export function normalizeInboxTab(value: string | null | undefined): InboxTab {
  if (!value) return 'all';
  if (value in LEGACY_TABS) return LEGACY_TABS[value];
  return (INBOX_TABS.some((tab) => tab.value === value) ? value : 'all') as InboxTab;
}

/** True when the URL used a legacy/unknown tab and should be rewritten. */
export function isCanonicalInboxTab(value: string | null | undefined): boolean {
  return !value || INBOX_TABS.some((tab) => tab.value === value);
}

export function tabToFilter(tab: InboxTab): InboxFilter {
  return tab;
}

export const SEARCH_MIN_LENGTH = 3;
export const SEARCH_MAX_LENGTH = 100;
const CONVERSATION_ID = /^[a-z0-9]{20,40}$/i;

/** Search sent to the server: trimmed, bounded; too short → none. */
export function normalizeSearch(raw: string | null | undefined): string | undefined {
  const value = (raw ?? '').trim().slice(0, SEARCH_MAX_LENGTH);
  if (!value) return undefined;
  if (value.length < SEARCH_MIN_LENGTH && !CONVERSATION_ID.test(value)) return undefined;
  return value;
}
