'use client';

import { useInView } from 'react-intersection-observer';
import { cn } from '~/shared/lib';
import { Button } from '~/shared/ui/kit';
import { LoadingMoreRow } from '~/shared/ui/primitives';
import { useInfiniteLogs } from '../model/use-infinite-logs';
import { ActivityLogsSkeleton } from './ActivityLogsSkeleton';
import { ActivityLogsTable } from './ActivityLogsTable';

export const ActivityLogsFeed = ({ className }: { className?: string }) => {
  const { entries, isLoading, isInitialLoading, error, hasMore, loadMore } =
    useInfiniteLogs();

  const { ref: sentinelRef } = useInView({
    rootMargin: '200px',
    onChange: (inView) => {
      if (inView && hasMore && !isLoading && !error) loadMore();
    },
  });

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
        <LoadingMoreRow label="Loading more…" className="px-4 py-4 text-sm" />
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

      {/* Infinite-scroll sentinel (kept in the DOM while more pages exist) */}
      {hasMore && !error && <div ref={sentinelRef} aria-hidden className="h-px" />}
    </div>
  );
};
