'use client';

import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import {
  sourceDtoToKnowledgeBaseSource,
  useKnowledgeSources,
} from '~/entities/knowledge-base-source';
import type {
  KnowledgeBaseSource,
  KnowledgeBaseSourceType,
} from '~/entities/knowledge-base-source';
import {
  DeleteSourceDialog,
  useReindexKnowledgeSource,
} from '~/features/manage-knowledge-source';
import type { DeletableSource } from '~/features/manage-knowledge-source';
import { useActiveWorkspaceId } from '~/features/switch-workspace';
import { Card, Tabs, TabsContent, TabsList, TabsTrigger } from '~/shared/ui/kit';
import { LoadingMoreRow } from '~/shared/ui/primitives';
import { KnowledgeBaseSourcesTableSkeleton } from './KnowledgeBaseSourcesTableSkeleton';
import { SourceCard } from './SourceCard';
import { SourcesTable } from './SourcesTable';

type SourceFilter = 'all' | KnowledgeBaseSourceType;

interface KnowledgeBaseSourcesTableProps {
  onEditSource: (source: KnowledgeBaseSource) => void;
}

const FILTERS: ReadonlyArray<{ value: SourceFilter; label: string }> = [
  { value: 'all', label: 'All Sources' },
  { value: 'website', label: 'Websites' },
  { value: 'file', label: 'Files' },
  { value: 'faq', label: 'FAQs' },
  { value: 'manual', label: 'Manual' },
];

export const KnowledgeBaseSourcesTable = ({
  onEditSource,
}: KnowledgeBaseSourcesTableProps) => {
  const [filter, setFilter] = useState<SourceFilter>('all');
  const [sourceToDelete, setSourceToDelete] = useState<DeletableSource | null>(null);

  const workspaceId = useActiveWorkspaceId();
  const { data, isPending, isError, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useKnowledgeSources(workspaceId);
  const reindexSource = useReindexKnowledgeSource(workspaceId ?? '');

  const sources = (data?.pages.flatMap((page) => page.data) ?? []).map(
    sourceDtoToKnowledgeBaseSource,
  );

  const { ref: sentinelRef } = useInView({
    rootMargin: '200px',
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) void fetchNextPage();
    },
  });

  if (isPending) {
    return <KnowledgeBaseSourcesTableSkeleton />;
  }

  return (
    <>
      <Card className="gap-0 overflow-hidden py-0">
        <Tabs
          value={filter}
          onValueChange={(v) => setFilter(v as SourceFilter)}
          className="gap-0"
        >
          <div className="overflow-x-auto border-b px-3 pt-3 pb-2 sm:px-4">
            <TabsList variant="line" className="h-9 w-auto">
              {FILTERS.map((f) => (
                <TabsTrigger key={f.value} value={f.value}>
                  {f.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {isError ? (
            <p className="text-muted-foreground px-4 py-12 text-center text-sm">
              Couldn&apos;t load knowledge base sources.
            </p>
          ) : (
            FILTERS.map((f) => {
              const filteredSources =
                f.value === 'all'
                  ? sources
                  : sources.filter((source) => source.type === f.value);

              return (
                <TabsContent key={f.value} value={f.value}>
                  {filteredSources.length === 0 ? (
                    <p className="text-muted-foreground px-4 py-12 text-center text-sm">
                      No sources to display.
                    </p>
                  ) : (
                    <>
                      <div className="md:hidden">
                        {filteredSources.map((source) => (
                          <SourceCard
                            key={source.id}
                            source={source}
                            onEdit={() => onEditSource(source)}
                            onReindex={() => reindexSource.mutate(source.id)}
                            onDelete={() => setSourceToDelete(source)}
                            isReindexing={
                              reindexSource.isPending &&
                              reindexSource.variables === source.id
                            }
                          />
                        ))}
                      </div>
                      <div className="hidden md:block">
                        <SourcesTable
                          sources={filteredSources}
                          onEdit={onEditSource}
                          onReindex={(source) => reindexSource.mutate(source.id)}
                          onDelete={(source) => setSourceToDelete(source)}
                          reindexingSourceId={
                            reindexSource.isPending
                              ? (reindexSource.variables ?? null)
                              : null
                          }
                        />
                      </div>
                    </>
                  )}
                </TabsContent>
              );
            })
          )}
        </Tabs>

        {hasNextPage && !isError && <div ref={sentinelRef} aria-hidden className="h-px" />}
        {isFetchingNextPage && (
          <LoadingMoreRow label="Loading more…" className="px-4 py-4 text-sm" />
        )}
      </Card>

      <DeleteSourceDialog
        workspaceId={workspaceId ?? ''}
        source={sourceToDelete}
        onClose={() => setSourceToDelete(null)}
      />
    </>
  );
};
