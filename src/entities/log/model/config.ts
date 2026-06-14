import type { FetchLogsParams, LogEntry, LogLevel, LogsPage } from './types';

interface LogSeed {
  level: LogLevel;
  action: string;
  message: string;
  actorName: string;
  actorEmail: string;
  source: string;
}

const LOG_SEEDS: LogSeed[] = [
  {
    level: 'info',
    action: 'conversation.started',
    message: 'New conversation opened from the web widget',
    actorName: 'Jennifer Smith',
    actorEmail: 'jennifer.smith@acme.com',
    source: 'Web widget',
  },
  {
    level: 'warning',
    action: 'conversation.escalated',
    message: 'Conversation escalated to a human agent (low AI confidence)',
    actorName: 'System',
    actorEmail: 'system@tikketi.io',
    source: 'System',
  },
  {
    level: 'success',
    action: 'conversation.resolved',
    message: 'Conversation marked as resolved',
    actorName: 'Amanda Torres',
    actorEmail: 'amanda.t@company.io',
    source: 'Dashboard',
  },
  {
    level: 'error',
    action: 'integration.sync_failed',
    message: 'Failed to sync knowledge base from Notion (timeout)',
    actorName: 'System',
    actorEmail: 'system@tikketi.io',
    source: 'API',
  },
  {
    level: 'info',
    action: 'knowledge_base.updated',
    message: 'Knowledge base article "Refund policy" updated',
    actorName: 'Marcus Lee',
    actorEmail: 'marcus.lee@business.com',
    source: 'Dashboard',
  },
  {
    level: 'success',
    action: 'integration.connected',
    message: 'Telegram integration connected successfully',
    actorName: 'Robert Wilson',
    actorEmail: 'r.wilson@example.com',
    source: 'Dashboard',
  },
  {
    level: 'warning',
    action: 'routing_rule.disabled',
    message: 'Routing rule "If AI confidence < 65%" was disabled',
    actorName: 'Jennifer Smith',
    actorEmail: 'jennifer.smith@acme.com',
    source: 'Dashboard',
  },
  {
    level: 'info',
    action: 'member.invited',
    message: 'Invited a new teammate to the workspace',
    actorName: 'Amanda Torres',
    actorEmail: 'amanda.t@company.io',
    source: 'Dashboard',
  },
  {
    level: 'error',
    action: 'webhook.delivery_failed',
    message: 'Webhook delivery failed with status 500',
    actorName: 'System',
    actorEmail: 'system@tikketi.io',
    source: 'API',
  },
  {
    level: 'success',
    action: 'auth.login',
    message: 'Signed in from a new device',
    actorName: 'Marcus Lee',
    actorEmail: 'marcus.lee@business.com',
    source: 'Web app',
  },
];

const TOTAL_LOGS = 64;
/** Fixed base time so mock timestamps are deterministic. */
const BASE_TIME = new Date('2026-06-14T14:30:00Z').getTime();
/** Minutes between consecutive mock entries. */
const STEP_MINUTES = 7;

/** Full mock dataset, newest first — stands in for the backing store. */
const ALL_LOGS: LogEntry[] = Array.from({ length: TOTAL_LOGS }, (_, i) => {
  const seed = LOG_SEEDS[i % LOG_SEEDS.length];
  return {
    ...seed,
    id: `log_${String(i + 1).padStart(4, '0')}`,
    timestamp: new Date(BASE_TIME - i * STEP_MINUTES * 60_000).toISOString(),
  };
});

const DEFAULT_LIMIT = 15;
/** Simulated network latency for the mock API (ms). */
const MOCK_LATENCY = 600;

/**
 * Cursor-paginated logs source. Mock implementation backed by an in-memory
 * array; swap the body for a real request (the signature is API-ready):
 *   `fetch(\`/api/logs?cursor=${cursor ?? ''}&limit=${limit}\`).then(r => r.json())`
 */
export const fetchLogs = async ({
  cursor,
  limit = DEFAULT_LIMIT,
}: FetchLogsParams = {}): Promise<LogsPage> => {
  const start = cursor ? Number(cursor) : 0;
  const entries = ALL_LOGS.slice(start, start + limit);
  const nextStart = start + limit;
  const nextCursor = nextStart < ALL_LOGS.length ? String(nextStart) : null;

  await new Promise((resolve) => setTimeout(resolve, MOCK_LATENCY));

  return { entries, nextCursor };
};
