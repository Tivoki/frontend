import { AiBrain03Icon, CheckmarkBadge01Icon, User02Icon } from '@hugeicons/core-free-icons';

import { KpiCard } from '~/shared/ui/primitives';
import type { KpiStat } from '~/shared/ui/primitives';
import { cn } from '~/shared/lib';

const MOCK_STATS: KpiStat[] = [
  {
    id: 'ai-replies',
    label: 'AI replies',
    value: '2,842',
    change: { value: '+4.3% vs last 7 days', trend: 'up' },
    icon: AiBrain03Icon,
  },
  {
    id: 'resolved-by-ai',
    label: 'Resolved by AI',
    value: '68.4%',
    change: { value: '0% vs last 7 days', trend: 'up' },
    icon: CheckmarkBadge01Icon,
  },
  {
    id: 'human-handoffs',
    label: 'Human Handoffs',
    value: '12',
    change: { value: '-3% vs last 7 days', trend: 'down' },
    icon: User02Icon,
  },
];

interface StatsOverviewProps {
  stats?: KpiStat[];
  className?: string;
}

export const StatsOverview = ({ stats = MOCK_STATS, className }: StatsOverviewProps) => {
  return (
    <div
      className={cn(
        'grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 [&>*:last-child]:col-span-2 [&>*:last-child]:sm:col-span-1',
        className,
      )}
    >
      {stats.map((stat) => (
        <KpiCard key={stat.id} stat={stat} />
      ))}
    </div>
  );
};
