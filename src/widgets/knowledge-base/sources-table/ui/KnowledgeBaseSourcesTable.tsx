'use client';

import type {
  KnowledgeBaseSource,
  KnowledgeBaseSourceType,
} from '~/entities/knowledge-base-source';
import { Card, Tabs, TabsContent, TabsList, TabsTrigger } from '~/shared/ui/kit';
import { useState } from 'react';
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

export const KnowledgeBaseSourcesTable = ({
  onEditSource,
}: KnowledgeBaseSourcesTableProps) => {
  const [filter, setFilter] = useState<SourceFilter>('all');

  return (
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

        {FILTERS.map((f) => {
          const sources =
            f.value === 'all'
              ? MOCK_SOURCES
              : MOCK_SOURCES.filter((source) => source.type === f.value);

          return (
            <TabsContent key={f.value} value={f.value}>
              {sources.length === 0 ? (
                <p className="text-muted-foreground px-4 py-12 text-center text-sm">
                  No sources to display.
                </p>
              ) : (
                <>
                  <div className="md:hidden">
                    {sources.map((source) => (
                      <SourceCard
                        key={source.id}
                        source={source}
                        onEdit={() => onEditSource(source)}
                      />
                    ))}
                  </div>
                  <div className="hidden md:block">
                    <SourcesTable sources={sources} onEdit={onEditSource} />
                  </div>
                </>
              )}
            </TabsContent>
          );
        })}
      </Tabs>
    </Card>
  );
};
