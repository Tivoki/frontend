import { cn } from '~/shared/lib';

/** Spinner row shown at the tail of an infinite list while the next page loads. */
export const LoadingMoreRow = ({
  label = 'Loading…',
  className,
}: {
  label?: string;
  className?: string;
}) => (
  <div
    className={cn(
      'text-muted-foreground flex items-center justify-center gap-2 py-2 text-xs',
      className,
    )}
  >
    <span className="border-muted-foreground/40 border-t-muted-foreground size-3.5 animate-spin rounded-full border-2" />
    {label}
  </div>
);
