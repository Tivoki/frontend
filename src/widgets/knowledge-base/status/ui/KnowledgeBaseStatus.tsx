import Link from 'next/link';

import { KnowledgeBaseItemRow } from '~/entities/knowledge-base-item';
import type { KnowledgeBaseItem } from '~/entities/knowledge-base-item';

const MOCK_KB_ITEMS: KnowledgeBaseItem[] = [
  { id: '1', title: 'Shipping Policy', status: 'published', updatedAt: '2d ago' },
  { id: '2', title: 'Returns & Warranty', status: 'published', updatedAt: '5d ago' },
  { id: '3', title: 'Privacy Policy', status: 'draft', updatedAt: '1w ago' },
  { id: '4', title: 'FAQ Page', status: 'outdated', updatedAt: '3w ago' },
  { id: '5', title: 'Product Guides', status: 'published', updatedAt: '1d ago' },
];

interface KnowledgeBaseStatusProps {
  items?: KnowledgeBaseItem[];
}

export const KnowledgeBaseStatus = ({
  items = MOCK_KB_ITEMS,
}: KnowledgeBaseStatusProps) => {
  return (
    <div className="border-border bg-background rounded-xl border p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-foreground text-sm font-semibold">Knowledge Base Status</h3>
        <Link href="/knowledge-base" className="text-primary text-xs hover:underline">
          View All
        </Link>
      </div>
      <div className="divide-border divide-y">
        {items.map((item) => (
          <KnowledgeBaseItemRow key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};
