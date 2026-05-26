import { cn } from '~/shared/lib';
import type { Stat } from '../model/types';
import { Card, CardHeader, CardContent, CardFooter } from '~/shared/ui/kit';
import { HugeiconsIcon } from '@hugeicons/react';

interface StatCardProps {
  stat: Stat;
  className?: string;
}

export const StatCard = ({ stat, className }: StatCardProps) => {
  return (
    <Card className={cn('bg-sidebar gap-2', className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <p>{stat.label}</p>
          <div className="bg-primary/10 rounded-full p-1">
            <HugeiconsIcon className="h-4 w-4" icon={stat.icon} />
          </div>
        </div>
      </CardHeader>
      <CardContent className="">
        <p className="text-foreground text-xl font-bold sm:text-2xl">{stat.value}</p>
      </CardContent>
      <CardFooter className="border-none bg-transparent">
        <StatChange stat={stat} />
      </CardFooter>
    </Card>
  );
};

const StatChange = ({ stat }: { stat: Stat }) => {
  return (
    stat.change && (
      <p
        className={cn('text-xs', {
          'text-green-700': stat.change.trend === 'up',
          'text-red-600': stat.change.trend === 'down',
          'text-muted-foreground': stat.change.trend === 'neutral',
        })}
      >
        {stat.change.value}
      </p>
    )
  );
};
