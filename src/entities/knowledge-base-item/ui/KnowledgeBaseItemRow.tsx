import { cn } from '~/shared/lib';
import type { KnowledgeBaseItem, KnowledgeBaseItemStatus } from '../model/types';

const statusStyles: Record<KnowledgeBaseItemStatus, string> = {
  published: 'bg-success-subtle text-success-foreground',
  draft: 'bg-muted text-muted-foreground',
  outdated: 'bg-warning-subtle text-warning-foreground',
};

const statusLabels: Record<KnowledgeBaseItemStatus, string> = {
  published: 'Published',
  draft: 'Draft',
  outdated: 'Outdated',
};

interface KnowledgeBaseItemRowProps {
  item: KnowledgeBaseItem;
  className?: string;
}

export const KnowledgeBaseItemRow = ({ item, className }: KnowledgeBaseItemRowProps) => {
  return (
    <div className={cn('flex items-center justify-between gap-2 py-2', className)}>
      <p className="text-foreground flex-1 truncate text-sm">{item.title}</p>
      <span
        className={cn(
          'shrink-0 rounded-full px-2 py-0.5 text-xs font-medium',
          statusStyles[item.status],
        )}
      >
        {statusLabels[item.status]}
      </span>
    </div>
  );
};
