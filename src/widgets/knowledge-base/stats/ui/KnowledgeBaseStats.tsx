'use client';

import { Database01Icon, Doc01Icon, Layers01Icon } from '@hugeicons/core-free-icons';
import { useKnowledgeSources } from '~/entities/knowledge-base-source';
import { useActiveWorkspaceId } from '~/features/switch-workspace';
import { Skeleton } from '~/shared/ui/kit';
import { KpiCard, type KpiStat } from '~/shared/ui/primitives';

const GRID_CLASS =
  'grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 [&>*:last-child]:col-span-2 [&>*:last-child]:sm:col-span-1';

export const KnowledgeBaseStats = () => {
  const workspaceId = useActiveWorkspaceId();
  const { data, isPending } = useKnowledgeSources(workspaceId);

  if (isPending) {
    return (
      <div className={GRID_CLASS}>
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-24 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  const meta = data?.pages[0]?.meta;
  const sourcesCount = meta?.itemCount ?? 0;
  const documentsCount = meta?.documentsCount ?? 0;
  const chunksCount = meta?.chunksCount ?? 0;

  const stats: KpiStat[] = [
    {
      id: 'sources',
      label: 'Sources',
      value: sourcesCount.toLocaleString('en-US'),
      icon: Database01Icon,
    },
    {
      id: 'documents',
      label: 'Documents',
      value: documentsCount.toLocaleString('en-US'),
      icon: Doc01Icon,
    },
    {
      id: 'chunks',
      label: 'Total chunks',
      value: chunksCount.toLocaleString('en-US'),
      icon: Layers01Icon,
    },
  ];

  return (
    <div className={GRID_CLASS}>
      {stats.map((stat) => (
        <KpiCard key={stat.id} stat={stat} />
      ))}
    </div>
  );
};
