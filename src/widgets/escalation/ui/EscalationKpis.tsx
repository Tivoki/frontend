import {
  AlertDiamondIcon,
  Clock01Icon,
  Time01Icon,
  UserCheck01Icon,
} from '@hugeicons/core-free-icons';

import type { KpiStat } from '~/shared/ui/primitives';
import { KpiCard } from '~/shared/ui/primitives';
import type { ComponentProps, FC } from 'react';
import { cn } from '~/shared/lib';

const STATS: KpiStat[] = [
  {
    id: 'total',
    label: 'Total escalations',
    value: 156,
    icon: AlertDiamondIcon,
    change: { value: '↑ 18.6% vs last period', trend: 'up' },
  },
  {
    id: 'pending',
    label: 'Pending handoff',
    value: 23,
    icon: Clock01Icon,
    change: { value: '↑ 27.4% vs last period', trend: 'up' },
  },
  {
    id: 'resolved',
    label: 'Resolved by human',
    value: 118,
    icon: UserCheck01Icon,
    change: { value: '↑ 20.1% vs last period', trend: 'up' },
  },
  {
    id: 'avg_time',
    label: 'Avg. handoff time',
    value: '12m 34s',
    icon: Time01Icon,
    change: { value: '↓ 9.3% vs last period', trend: 'down' },
  },
];

export const EscalationKpis: FC<ComponentProps<'div'>> = ({ className, ...props }) => {
  return (
    <div
      className={cn('grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4', className)}
      {...props}
    >
      {STATS.map((stat) => (
        <KpiCard key={stat.id} stat={stat} />
      ))}
    </div>
  );
};
