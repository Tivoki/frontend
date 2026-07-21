'use client';

import {
  AlertDiamondIcon,
  Clock01Icon,
  Time01Icon,
  UserCheck01Icon,
} from '@hugeicons/core-free-icons';
import type { ComponentProps, FC } from 'react';
import { useEscalations } from '~/entities/escalation';
import { useActiveWorkspaceId } from '~/features/switch-workspace';
import { cn } from '~/shared/lib';
import type { KpiStat } from '~/shared/ui/primitives';
import { KpiCard } from '~/shared/ui/primitives';

const formatDuration = (ms: number): string => {
  const totalSeconds = Math.round(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}m ${seconds}s`;
};

export const EscalationKpis: FC<ComponentProps<'div'>> = ({ className, ...props }) => {
  const workspaceId = useActiveWorkspaceId();
  const { data: escalations } = useEscalations(workspaceId);

  const total = escalations?.length ?? 0;
  const pending = escalations?.filter((e) => e.status === 'WAITING_HUMAN').length ?? 0;
  const resolved = escalations?.filter((e) => e.status === 'RESOLVED') ?? [];

  const avgHandoffMs =
    resolved.length > 0
      ? resolved.reduce(
          (sum, e) => sum + (new Date(e.updatedAt).getTime() - new Date(e.createdAt).getTime()),
          0,
        ) / resolved.length
      : null;

  const stats: KpiStat[] = [
    { id: 'total', label: 'Total escalations', value: total, icon: AlertDiamondIcon },
    { id: 'pending', label: 'Pending handoff', value: pending, icon: Clock01Icon },
    {
      id: 'resolved',
      label: 'Resolved by human',
      value: resolved.length,
      icon: UserCheck01Icon,
    },
    {
      id: 'avg_time',
      label: 'Avg. handoff time',
      value: avgHandoffMs === null ? '—' : formatDuration(avgHandoffMs),
      icon: Time01Icon,
    },
  ];

  return (
    <div
      className={cn('grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4', className)}
      {...props}
    >
      {stats.map((stat) => (
        <KpiCard key={stat.id} stat={stat} />
      ))}
    </div>
  );
};
