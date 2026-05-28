import {
  Database01Icon,
  Doc01Icon,
  Layers01Icon,
} from '@hugeicons/core-free-icons';

import { KpiCard, type KpiStat } from '~/shared/ui/primitives';
import { KnowledgeBaseSourcesTable } from '~/widgets/knowledge-base-sources-table';

import { KnowledgeBaseHeader } from './KnowledgeBaseHeader';

const KB_STATS: KpiStat[] = [
  {
    id: 'sources',
    label: 'Sources',
    value: '24',
    change: { value: '+3 this week', trend: 'up' },
    icon: Database01Icon,
  },
  {
    id: 'documents',
    label: 'Documents',
    value: '312',
    change: { value: '+16 this week', trend: 'up' },
    icon: Doc01Icon,
  },
  {
    id: 'chunks',
    label: 'Total chunks',
    value: '2,451',
    change: { value: '+245 this week', trend: 'up' },
    icon: Layers01Icon,
  },
];

export const KnowledgeBasePage = () => {
  return (
    <div className="flex w-full max-w-400 flex-1 flex-col gap-4 p-4">
      <KnowledgeBaseHeader />

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 [&>*:last-child]:col-span-2 [&>*:last-child]:sm:col-span-1">
        {KB_STATS.map((stat) => (
          <KpiCard key={stat.id} stat={stat} />
        ))}
      </div>

      <KnowledgeBaseSourcesTable />
    </div>
  );
};
