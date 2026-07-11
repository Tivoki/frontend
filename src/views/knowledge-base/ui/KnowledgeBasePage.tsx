'use client';

import { Database01Icon, Doc01Icon, Layers01Icon } from '@hugeicons/core-free-icons';
import dynamic from 'next/dynamic';
import { useState } from 'react';

import type { KnowledgeBaseSource } from '~/entities/knowledge-base-source';
import { KpiCard, type KpiStat } from '~/shared/ui/primitives';
import { KnowledgeBaseSourcesTable } from '~/widgets/knowledge-base';

import { KnowledgeBaseHeader } from './KnowledgeBaseHeader';

const AddSourceDialog = dynamic(
  () =>
    import('~/features/add-knowledge-base-source').then((m) => ({
      default: m.AddSourceDialog,
    })),
  { ssr: false },
);

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

type SourceDialogState = { mode: 'add' } | { mode: 'edit'; source: KnowledgeBaseSource };

export const KnowledgeBasePage = () => {
  const [dialogState, setDialogState] = useState<SourceDialogState | null>(null);

  const closeDialog = () => setDialogState(null);

  return (
    <div className="flex w-full max-w-400 flex-1 flex-col gap-4 p-4">
      <KnowledgeBaseHeader onAddSource={() => setDialogState({ mode: 'add' })} />

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 [&>*:last-child]:col-span-2 [&>*:last-child]:sm:col-span-1">
        {KB_STATS.map((stat) => (
          <KpiCard key={stat.id} stat={stat} />
        ))}
      </div>

      <KnowledgeBaseSourcesTable
        onEditSource={(source) => setDialogState({ mode: 'edit', source })}
      />

      {dialogState && (
        <AddSourceDialog
          open
          onOpenChange={(open) => {
            if (!open) {
              closeDialog();
            }
          }}
          mode={dialogState.mode}
          defaultType={dialogState.mode === 'edit' ? dialogState.source.type : undefined}
          defaultData={
            dialogState.mode === 'edit'
              ? {
                  name: dialogState.source.name,
                  url: dialogState.source.url,
                }
              : undefined
          }
        />
      )}
    </div>
  );
};
