import { cn } from '~/shared/lib';
import type { Stat } from '../model/types';

const colorMap: Record<NonNullable<Stat['color']>, string> = {
  default: 'bg-background border-border',
  success: 'bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-900',
  warning: 'bg-yellow-50 border-yellow-200 dark:bg-yellow-950/20 dark:border-yellow-900',
  danger: 'bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-900',
  info: 'bg-blue-50 border-blue-200 dark:bg-blue-950/20 dark:border-blue-900',
};

interface StatCardProps {
  stat: Stat;
  className?: string;
}

export const StatCard = ({ stat, className }: StatCardProps) => {
  const colorClass = colorMap[stat.color ?? 'default'];

  return (
    <div className={cn('rounded-xl border p-4 flex flex-col gap-2', colorClass, className)}>
      <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
      {stat.change && (
        <p className={cn('text-xs', {
          'text-green-600': stat.change.trend === 'up',
          'text-red-500': stat.change.trend === 'down',
          'text-muted-foreground': stat.change.trend === 'neutral',
        })}>
          {stat.change.value}
        </p>
      )}
    </div>
  );
};
