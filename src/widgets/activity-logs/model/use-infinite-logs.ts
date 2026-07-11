'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { LogEntry } from '~/entities/log';
import { fetchLogs } from '~/entities/log';

interface UseInfiniteLogsResult {
  entries: LogEntry[];
  isLoading: boolean;
  /** True before the first page has loaded. */
  isInitialLoading: boolean;
  error: boolean;
  hasMore: boolean;
  loadMore: () => void;
}

export const useInfiniteLogs = (pageSize?: number): UseInfiniteLogsResult => {
  const [entries, setEntries] = useState<LogEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Refs guard against duplicate/parallel fetches (e.g. observer + button).
  const cursorRef = useRef<string | null>(null);
  const loadingRef = useRef(false);
  const hasMoreRef = useRef(true);
  const startedRef = useRef(false);

  const loadMore = useCallback(async () => {
    if (loadingRef.current || !hasMoreRef.current) return;

    loadingRef.current = true;
    setIsLoading(true);
    setError(false);

    try {
      const page = await fetchLogs({ cursor: cursorRef.current, limit: pageSize });
      cursorRef.current = page.nextCursor;
      hasMoreRef.current = page.nextCursor !== null;
      setEntries((prev) => [...prev, ...page.entries]);
      setHasMore(page.nextCursor !== null);
    } catch {
      setError(true);
    } finally {
      loadingRef.current = false;
      setIsLoading(false);
    }
  }, [pageSize]);

  // Load the first page once on mount.
  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    void loadMore();
  }, [loadMore]);

  return {
    entries,
    isLoading,
    isInitialLoading: isLoading && entries.length === 0,
    error,
    hasMore,
    loadMore: () => void loadMore(),
  };
};
