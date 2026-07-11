import { cn } from '~/shared/lib';
import { Badge } from '~/shared/ui/kit';
import type { LogLevel } from '../model/types';

const LEVEL_STYLES: Record<LogLevel, string> = {
  info: 'bg-primary/10 text-primary',
  success: 'bg-success/15 text-success-foreground',
  warning: 'bg-amber-500/15 text-amber-600 dark:text-amber-400',
  error: 'bg-destructive/10 text-destructive',
};

const LEVEL_LABEL: Record<LogLevel, string> = {
  info: 'Info',
  success: 'Success',
  warning: 'Warning',
  error: 'Error',
};

interface LogLevelBadgeProps {
  level: LogLevel;
  className?: string;
}

export const LogLevelBadge = ({ level, className }: LogLevelBadgeProps) => {
  return (
    <Badge className={cn('border-transparent', LEVEL_STYLES[level], className)}>
      <span
        className={cn('size-1.5 rounded-full', {
          'bg-primary': level === 'info',
          'bg-success': level === 'success',
          'bg-amber-500': level === 'warning',
          'bg-destructive': level === 'error',
        })}
      />
      {LEVEL_LABEL[level]}
    </Badge>
  );
};
