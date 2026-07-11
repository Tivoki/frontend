import { Skeleton } from '~/shared/ui/kit';

export const WorkspaceSwitcherSkeleton = () => {
  return (
    <div className="flex items-center gap-2 px-2 py-1.5">
      <Skeleton className="size-7 rounded-md" />
      <div className="hidden min-w-0 space-y-1 lg:block">
        <Skeleton className="h-3.5 w-28" />
        <Skeleton className="h-3 w-16" />
      </div>
    </div>
  );
};
