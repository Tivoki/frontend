import { StatCard } from '~/entities/stat';
import type { Stat } from '~/entities/stat';
import { cn } from '~/shared/lib';

const MOCK_STATS: Stat[] = [
  {
    id: 'in-routes',
    label: 'In Routes',
    value: '2,842',
    change: { value: '+4.3% vs last 7 days', trend: 'up' },
    color: 'default',
  },
  {
    id: 'resolved-by-ai',
    label: 'Resolved by AI',
    value: '68.4%',
    change: { value: '+2.1% vs last 7 days', trend: 'up' },
    color: 'success',
  },
  {
    id: 'human-handoffs',
    label: 'Human Handoffs',
    value: '12',
    change: { value: '-3 vs last 7 days', trend: 'up' },
    color: 'info',
  },
];

interface StatsOverviewProps {
  stats?: Stat[];
  className?: string;
}

export const StatsOverview = ({ stats = MOCK_STATS, className }: StatsOverviewProps) => {
  return (
    <div className={cn('grid grid-cols-1 gap-3 sm:grid-cols-3', className)}>
      {stats.map((stat) => (
        <StatCard key={stat.id} stat={stat} />
      ))}
    </div>
  );
};
