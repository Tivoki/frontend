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
      <p className="text-sm text-foreground truncate flex-1">{item.title}</p>
      <span className={cn('text-xs font-medium px-2 py-0.5 rounded-full shrink-0', statusStyles[item.status])}>
        {statusLabels[item.status]}
      </span>
    </div>
  );
};
