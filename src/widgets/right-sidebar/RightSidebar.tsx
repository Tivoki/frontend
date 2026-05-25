import { KnowledgeBaseItemRow } from '~/entities/knowledge-base-item';
import type { KnowledgeBaseItem } from '~/entities/knowledge-base-item';
import { cn } from '~/shared/lib';

const MOCK_KB_ITEMS: KnowledgeBaseItem[] = [
  { id: '1', title: 'Shipping Policy', status: 'published', updatedAt: '2d ago' },
  { id: '2', title: 'Returns & Warranty', status: 'published', updatedAt: '5d ago' },
  { id: '3', title: 'Privacy Policy', status: 'draft', updatedAt: '1w ago' },
  { id: '4', title: 'FAQ Page', status: 'outdated', updatedAt: '3w ago' },
  { id: '5', title: 'Product Guides', status: 'published', updatedAt: '1d ago' },
];

const INTEGRATION_ITEMS = [
  { id: 'email', label: 'Email' },
  { id: 'webchat', label: 'Webchat' },
  { id: 'telegram', label: 'Telegram' },
  { id: 'intercom', label: 'Intercom' },
] as const;

interface RightSidebarProps {
  kbItems?: KnowledgeBaseItem[];
  className?: string;
}

export const RightSidebar = ({ kbItems = MOCK_KB_ITEMS, className }: RightSidebarProps) => {
  return (
    <aside className={cn('flex w-64 shrink-0 flex-col gap-3', className)}>
      {/* Knowledge Base Status */}
      <div className="rounded-xl border border-border bg-background p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-foreground">Knowledge Base Status</h3>
          <button className="text-xs text-primary hover:underline">View All</button>
        </div>
        <div className="divide-y divide-border">
          {kbItems.map((item) => (
            <KnowledgeBaseItemRow key={item.id} item={item} />
          ))}
        </div>
      </div>

      {/* Widget Preview */}
      <div className="rounded-xl border border-border bg-background p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-foreground">Widget Preview</h3>
          <button className="text-xs text-primary hover:underline">Primary</button>
        </div>
        <div className="rounded-lg bg-primary/5 border border-primary/20 p-3 text-center">
          <p className="text-xs text-muted-foreground">Chat widget preview</p>
          <div className="mt-2 inline-flex items-center justify-center size-8 rounded-full bg-primary text-primary-foreground text-xs font-medium">
            AI
          </div>
        </div>
      </div>

      {/* Escalation / Integrations */}
      <div className="rounded-xl border border-border bg-background p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-foreground">Escalation / Integrations</h3>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {INTEGRATION_ITEMS.map((integration) => (
            <div
              key={integration.id}
              className="flex items-center justify-center rounded-lg border border-border py-2 px-3 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
            >
              {integration.label}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};
