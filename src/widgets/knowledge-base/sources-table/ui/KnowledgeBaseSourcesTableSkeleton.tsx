import { Card, Skeleton } from '~/shared/ui/kit';

export const KnowledgeBaseSourcesTableSkeleton = () => {
  return (
    <Card className="gap-0 overflow-hidden py-0">
      <div className="border-b px-3 pt-3 pb-2 sm:px-4">
        <Skeleton className="h-9 w-64" />
      </div>
      <div className="divide-border divide-y">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 px-4 py-3">
            <Skeleton className="size-8 shrink-0 rounded-lg" />
            <div className="flex-1 space-y-1.5">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-3 w-56" />
            </div>
            <Skeleton className="hidden h-5 w-16 rounded-full sm:block" />
            <Skeleton className="hidden h-4 w-10 md:block" />
          </div>
        ))}
      </div>
    </Card>
  );
};
