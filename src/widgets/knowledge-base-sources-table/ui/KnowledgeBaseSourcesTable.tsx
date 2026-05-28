'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';

import { Card, Tabs, TabsContent, TabsList, TabsTrigger } from '~/shared/ui/kit';
import type {
  KnowledgeBaseSource,
  KnowledgeBaseSourceType,
} from '~/entities/knowledge-base-source';

import { SourceCard } from './SourceCard';
import { SourcesTable } from './SourcesTable';

const AddSourceDialog = dynamic(
  () => import('~/features/add-knowledge-base-source').then((m) => m.AddSourceDialog),
  { ssr: false },
);

type SourceFilter = 'all' | KnowledgeBaseSourceType;

const FILTERS: ReadonlyArray<{ value: SourceFilter; label: string }> = [
  { value: 'all', label: 'All Sources' },
  { value: 'website', label: 'Websites' },
  { value: 'file', label: 'Files' },
  { value: 'faq', label: 'FAQs' },
  { value: 'manual', label: 'Manual' },
];

// TO DELETE
const MOCK_SOURCES: KnowledgeBaseSource[] = [
  {
    id: '1',
    name: 'Help Center',
    url: 'https://acme.com/help',
    type: 'website',
    documentsCount: 40,
    chunksCount: 524,
    updatedAt: '1h ago',
    status: 'active',
  },
  {
    id: '2',
    name: 'Product Docs',
    url: 'https://docs.acme.com/docs',
    type: 'website',
    documentsCount: 129,
    chunksCount: 1024,
    updatedAt: '5h ago',
    status: 'active',
  },
  {
    id: '3',
    name: 'FAQs',
    url: 'faqs.pdf',
    type: 'faq',
    documentsCount: 1,
    chunksCount: 24,
    updatedAt: '10d ago',
    status: 'active',
  },
  {
    id: '4',
    name: 'Shipping & Returns',
    url: 'shipping.pdf',
    type: 'file',
    documentsCount: 1,
    chunksCount: 18,
    updatedAt: '4d ago',
    status: 'active',
  },
  {
    id: '5',
    name: 'Product Guide',
    url: 'guide.pdf',
    type: 'file',
    documentsCount: 1,
    chunksCount: 15,
    updatedAt: '3d ago',
    status: 'indexing',
  },
  {
    id: '6',
    name: 'Terms & Conditions',
    url: 'https://acme.com/terms',
    type: 'website',
    documentsCount: 12,
    chunksCount: 198,
    updatedAt: '1w ago',
    status: 'active',
  },
];

export function KnowledgeBaseSourcesTable() {
  const [filter, setFilter] = useState<SourceFilter>('all');
  const [editingSource, setEditingSource] = useState<KnowledgeBaseSource | null>(null);

  const renderSources = (sources: KnowledgeBaseSource[]) =>
    sources.length === 0 ? (
      <p className="px-4 py-12 text-center text-sm text-muted-foreground">
        No sources to display.
      </p>
    ) : (
      <>
        <div className="md:hidden">
          {sources.map((source) => (
            <SourceCard
              key={source.id}
              source={source}
              onEdit={() => setEditingSource(source)}
            />
          ))}
        </div>
        <div className="hidden md:block">
          <SourcesTable sources={sources} onEdit={setEditingSource} />
        </div>
      </>
    );

  return (
    <>
      <Card className="gap-0 overflow-hidden py-0">
        <Tabs
          value={filter}
          onValueChange={(v) => setFilter(v as SourceFilter)}
          className="gap-0"
        >
          <div className="overflow-x-auto border-b px-3 pb-2 pt-3 sm:px-4">
            <TabsList variant="line" className="h-9 w-auto">
              {FILTERS.map((f) => (
                <TabsTrigger key={f.value} value={f.value}>
                  {f.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {FILTERS.map((f) => {
            const sources =
              f.value === 'all'
                ? MOCK_SOURCES
                : MOCK_SOURCES.filter((source) => source.type === f.value);

            return (
              <TabsContent key={f.value} value={f.value}>
                {renderSources(sources)}
              </TabsContent>
            );
          })}
        </Tabs>
      </Card>

      <AddSourceDialog
        open={Boolean(editingSource)}
        onOpenChange={(open) => !open && setEditingSource(null)}
        mode="edit"
        defaultType={editingSource?.type}
        defaultData={
          editingSource
            ? { name: editingSource.name, url: editingSource.url }
            : undefined
        }
      />
    </>
  );
}
