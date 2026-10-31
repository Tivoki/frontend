import { cn } from '~/shared/lib';
import type { RealtimeStatus } from '../model/use-inbox-realtime';

interface RealtimeStatusBadgeProps {
  status: RealtimeStatus;
  className?: string;
}

/** Shown only when live updates are not flowing. */
export const RealtimeStatusBadge = ({ status, className }: RealtimeStatusBadgeProps) => {
  if (status === 'open' || status === 'connecting') return null;
  return (
    <span
      role="status"
      className={cn(
        'bg-warning-subtle text-warning-foreground inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium',
        className,
      )}
    >
      <span className="size-1.5 animate-pulse rounded-full bg-current" />
      {status === 'reconnecting' ? 'Reconnecting…' : 'Live updates off'}
    </span>
  );
};
