'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import type { KnowledgeBaseSource } from '~/entities/knowledge-base-source';
import { useActiveWorkspaceId } from '~/features/switch-workspace';
import { KnowledgeBaseSourcesTable, KnowledgeBaseStats } from '~/widgets/knowledge-base';
import { KnowledgeBaseHeader } from './KnowledgeBaseHeader';

const AddSourceDialog = dynamic(
  () =>
    import('~/features/add-knowledge-base-source').then((m) => ({
      default: m.AddSourceDialog,
    })),
  { ssr: false },
);

type SourceDialogState = { mode: 'add' } | { mode: 'edit'; source: KnowledgeBaseSource };

export const KnowledgeBasePage = () => {
  const workspaceId = useActiveWorkspaceId();
  const [dialogState, setDialogState] = useState<SourceDialogState | null>(null);

  const closeDialog = () => setDialogState(null);

  return (
    <div className="flex w-full max-w-400 flex-1 flex-col gap-4 p-4">
      <KnowledgeBaseHeader onAddSource={() => setDialogState({ mode: 'add' })} />

      <KnowledgeBaseStats />

      <KnowledgeBaseSourcesTable
        onEditSource={(source) => setDialogState({ mode: 'edit', source })}
      />

      {dialogState && workspaceId && (
        <AddSourceDialog
          workspaceId={workspaceId}
          open
          onOpenChange={(open) => {
            if (!open) {
              closeDialog();
            }
          }}
          mode={dialogState.mode}
          sourceId={dialogState.mode === 'edit' ? dialogState.source.id : undefined}
          defaultType={dialogState.mode === 'edit' ? dialogState.source.type : undefined}
          defaultData={
            dialogState.mode === 'edit'
              ? {
                  name: dialogState.source.name,
                  url: dialogState.source.url,
                  content: dialogState.source.content ?? undefined,
                  items: dialogState.source.items ?? undefined,
                }
              : undefined
          }
        />
      )}
    </div>
  );
};
