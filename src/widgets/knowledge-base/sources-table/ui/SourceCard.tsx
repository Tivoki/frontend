'use client';

import { HugeiconsIcon } from '@hugeicons/react';
import type { IconSvgElement } from '@hugeicons/react';
import {
  Globe02Icon,
  File01Icon,
  Doc01Icon,
  Edit01Icon,
} from '@hugeicons/core-free-icons';

import { Badge } from '~/shared/ui/kit';
import { cn } from '~/shared/lib';
import type {
  KnowledgeBaseSource,
  KnowledgeBaseSourceType,
} from '~/entities/knowledge-base-source';
import { TYPE_LABELS, TYPE_BADGE_VARIANTS, STATUS_CONFIG } from '../model/config';
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
}

export function SourceCard({ source, onEdit }: SourceCardProps) {
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
          <SourceActionsMenu onEdit={onEdit} />
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
          <span>Updated {source.updatedAt}</span>
        </div>
      </div>
    </div>
  );
}
