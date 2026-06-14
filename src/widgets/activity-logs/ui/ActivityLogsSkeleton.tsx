import { Skeleton } from '~/shared/ui/kit';

export const ActivityLogsSkeleton = () => {
  return (
    <div className="divide-border divide-y">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 px-4 py-4 sm:px-5">
          <Skeleton className="h-5 w-16 rounded-full" />
          <div className="flex-1 space-y-1.5">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-3 w-1/3" />
          </div>
          <Skeleton className="hidden h-4 w-20 md:block" />
        </div>
      ))}
    </div>
  );
};
