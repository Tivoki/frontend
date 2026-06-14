export type LogLevel = 'info' | 'success' | 'warning' | 'error';

export interface LogEntry {
  id: string;
  level: LogLevel;
  /** Machine-readable event name, e.g. `conversation.escalated`. */
  action: string;
  /** Human-readable description of what happened. */
  message: string;
  actorName: string;
  actorEmail: string;
  /** Where the event originated, e.g. `Web widget`, `API`, `System`. */
  source: string;
  /** ISO 8601 timestamp. */
  timestamp: string;
}

export interface FetchLogsParams {
  /** Opaque cursor for the next page. `null`/omitted loads the first page. */
  cursor?: string | null;
  limit?: number;
}

export interface LogsPage {
  entries: LogEntry[];
  /** Cursor for the next page, or `null` when there are no more entries. */
  nextCursor: string | null;
}
