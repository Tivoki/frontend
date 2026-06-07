import { HugeiconsIcon } from '@hugeicons/react';
import type { IconSvgElement } from '@hugeicons/react';

import { cn } from '~/shared/lib';
import { Card, CardHeader, CardContent, CardFooter } from '~/shared/ui/kit';

export interface KpiStat {
  id: string;
  label: string;
  value: string | number;
  change?: {
    value: string;
    trend: 'up' | 'down' | 'neutral';
  };
  icon: IconSvgElement;
}

interface KpiCardProps {
  stat: KpiStat;
  className?: string;
}

export const KpiCard = ({ stat, className }: KpiCardProps) => {
  return (
    <Card className={cn('gap-2 bg-sidebar', className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <p>{stat.label}</p>
          <div className="rounded-full bg-primary/10 p-1">
            <HugeiconsIcon icon={stat.icon} strokeWidth={1.75} className="size-4 text-primary" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-xl font-bold text-foreground sm:text-2xl">{stat.value}</p>
      </CardContent>
      <CardFooter className="border-none bg-transparent">
        {stat.change && (
          <p
            className={cn('text-xs', {
              'text-success-foreground': stat.change.trend === 'up',
              'text-destructive': stat.change.trend === 'down',
              'text-muted-foreground': stat.change.trend === 'neutral',
            })}
          >
            {stat.change.value}
          </p>
        )}
      </CardFooter>
    </Card>
  );
};
