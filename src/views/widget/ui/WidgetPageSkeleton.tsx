import { Skeleton } from '~/shared/ui/kit';

export const WidgetPageSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="space-y-2">
        <Skeleton className="h-7 w-40" />
        <Skeleton className="h-4 w-72" />
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <div className="border-border bg-card space-y-4 rounded-xl border p-5">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
        <Skeleton className="h-96 w-full rounded-xl" />
      </div>
    </div>
  );
};
