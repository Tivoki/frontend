'use client';

import { useEffect, useRef } from 'react';

import { cn } from '~/shared/lib';
import { Button } from '~/shared/ui/kit';
import { useInfiniteLogs } from '../model/use-infinite-logs';
import { ActivityLogsSkeleton } from './ActivityLogsSkeleton';
import { ActivityLogsTable } from './ActivityLogsTable';

export const ActivityLogsFeed = ({ className }: { className?: string }) => {
  const { entries, isLoading, isInitialLoading, error, hasMore, loadMore } =
    useInfiniteLogs();

  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || !hasMore || error) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) loadMore();
      },
      { rootMargin: '200px' },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasMore, error, loadMore, entries.length]);

  return (
    <div
      className={cn(
        'border-border bg-background overflow-hidden rounded-2xl border shadow-xs',
        className,
      )}
    >
      {isInitialLoading ? (
        <ActivityLogsSkeleton />
      ) : (
        <ActivityLogsTable entries={entries} />
      )}

      {/* Loading-more indicator */}
      {isLoading && !isInitialLoading && (
        <div className="text-muted-foreground flex items-center justify-center gap-2 px-4 py-4 text-sm">
          <span className="border-muted-foreground/40 border-t-muted-foreground size-4 animate-spin rounded-full border-2" />
          Loading more…
        </div>
      )}

      {/* Error state with retry */}
      {error && (
        <div className="flex flex-col items-center gap-2 px-4 py-6 text-center">
          <p className="text-muted-foreground text-sm">Couldn’t load activity logs.</p>
          <Button type="button" variant="outline" size="sm" onClick={loadMore}>
            Try again
          </Button>
        </div>
      )}

      {/* Empty state */}
      {!isInitialLoading && !error && entries.length === 0 && (
        <div className="flex items-center justify-center px-4 py-10">
          <p className="text-muted-foreground text-sm">No activity yet.</p>
        </div>
      )}

      {/* End of list */}
      {!hasMore && !error && entries.length > 0 && (
        <div className="text-muted-foreground border-border border-t px-4 py-4 text-center text-xs">
          You’ve reached the end.
        </div>
      )}

      {/* Infinite-scroll sentinel (kept in the DOM while more pages exist) */}
      {hasMore && !error && <div ref={sentinelRef} aria-hidden className="h-px" />}
    </div>
  );
};
