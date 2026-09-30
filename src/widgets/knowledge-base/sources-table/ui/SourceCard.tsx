'use client';

import {
  Doc01Icon,
  Edit01Icon,
  File01Icon,
  Globe02Icon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import type { IconSvgElement } from '@hugeicons/react';
import type {
  KnowledgeBaseSource,
  KnowledgeBaseSourceType,
} from '~/entities/knowledge-base-source';
import { cn, formatRelativeTime } from '~/shared/lib';
import { Badge } from '~/shared/ui/kit';
import { STATUS_CONFIG, TYPE_BADGE_VARIANTS, TYPE_LABELS } from '../model/config';
import { SourceActionsMenu } from './SourceActionsMenu';

const TYPE_ICONS: Record<KnowledgeBaseSourceType, IconSvgElement> = {
  website: Globe02Icon,
  file: File01Icon,
  faq: Doc01Icon,
  manual: Edit01Icon,
};

interface SourceCardProps {
  source: KnowledgeBaseSource;
  onEdit: () => void;
  onReindex: () => void;
  onDelete: () => void;
  isReindexing?: boolean;
}

export function SourceCard({
  source,
  onEdit,
  onReindex,
  onDelete,
  isReindexing,
}: SourceCardProps) {
  const icon = TYPE_ICONS[source.type];
  const statusConfig = STATUS_CONFIG[source.status];

  return (
    <div className="flex items-start gap-3 border-b px-4 py-3 last:border-b-0">
      <div className="bg-primary/10 flex size-9 shrink-0 items-center justify-center rounded-lg">
        <HugeiconsIcon icon={icon} strokeWidth={1.75} className="text-primary size-4" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="text-foreground truncate text-sm font-medium">{source.name}</p>
          <SourceActionsMenu
            onEdit={onEdit}
            onReindex={onReindex}
            onDelete={onDelete}
            isReindexing={isReindexing}
          />
        </div>

        {source.url && (
          <p className="text-muted-foreground truncate text-xs">{source.url}</p>
        )}

        <div className="mt-2 flex flex-wrap items-center gap-2">
          <Badge variant={TYPE_BADGE_VARIANTS[source.type]}>
            {TYPE_LABELS[source.type]}
          </Badge>
          <span
            className={cn(
              'inline-flex items-center gap-1 text-xs font-medium',
              statusConfig.textClass,
            )}
          >
            <span className={cn('size-1.5 rounded-full', statusConfig.dotClass)} />
            {statusConfig.label}
          </span>
        </div>

        <div className="text-muted-foreground mt-1 flex flex-wrap items-center gap-x-3 text-xs">
          <span>{source.documentsCount.toLocaleString('en-US')} docs</span>
          <span>{source.chunksCount.toLocaleString('en-US')} chunks</span>
          <span>Updated {formatRelativeTime(source.updatedAt)}</span>
        </div>

        {source.status === 'error' && source.error && (
          <p className="text-destructive mt-1 text-xs">{source.error}</p>
        )}
      </div>
    </div>
  );
}
