import { ActivityLogsFeed } from '~/widgets/activity-logs';

export const LogsPage = () => {
  return (
    <div className="flex w-full flex-1 flex-col gap-4 p-4 sm:gap-6 sm:p-6">
      <div className="space-y-1">
        <h1 className="font-heading text-foreground text-2xl leading-tight font-semibold">
          Activity logs
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          A chronological record of events across your workspace.
        </p>
      </div>

      <ActivityLogsFeed />
    </div>
  );
};
