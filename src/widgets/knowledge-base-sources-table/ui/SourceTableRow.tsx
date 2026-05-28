import { HugeiconsIcon } from '@hugeicons/react';
import type { IconSvgElement } from '@hugeicons/react';
import { Globe02Icon, File01Icon, Doc01Icon, Edit01Icon } from '@hugeicons/core-free-icons';

import { Badge, TableRow, TableCell } from '~/shared/ui/kit';
import { cn } from '~/shared/lib';
import type { KnowledgeBaseSource, KnowledgeBaseSourceType } from '~/entities/knowledge-base-source';
import { TYPE_LABELS, TYPE_BADGE_VARIANTS, STATUS_CONFIG } from '../model/config';
import { SourceActionsMenu } from './SourceActionsMenu';

const TYPE_ICONS: Record<KnowledgeBaseSourceType, IconSvgElement> = {
  website: Globe02Icon,
  file: File01Icon,
  faq: Doc01Icon,
  manual: Edit01Icon,
};

interface SourceTableRowProps {
  source: KnowledgeBaseSource;
  onEdit: () => void;
}

export function SourceTableRow({ source, onEdit }: SourceTableRowProps) {
  const icon = TYPE_ICONS[source.type];
  const statusConfig = STATUS_CONFIG[source.status];

  return (
    <TableRow>
      <TableCell className="pl-4">
        <div className="flex items-center gap-3">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <HugeiconsIcon icon={icon} strokeWidth={1.75} className="size-4 text-primary" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium leading-tight text-foreground">{source.name}</p>
            {source.url && (
              <p className="max-w-45 truncate text-xs text-muted-foreground sm:max-w-60">
                {source.url}
              </p>
            )}
          </div>
        </div>
      </TableCell>

      <TableCell className="text-center">
        <Badge variant={TYPE_BADGE_VARIANTS[source.type]}>{TYPE_LABELS[source.type]}</Badge>
      </TableCell>

      <TableCell className="text-center text-sm tabular-nums">
        {source.documentsCount.toLocaleString('en-US')}
      </TableCell>

      <TableCell className="hidden text-center text-sm tabular-nums sm:table-cell">
        {source.chunksCount.toLocaleString('en-US')}
      </TableCell>

      <TableCell className="hidden text-center text-sm text-muted-foreground md:table-cell">
        {source.updatedAt}
      </TableCell>

      <TableCell className="text-center">
        <span className={cn('inline-flex items-center gap-1.5 text-xs font-medium', statusConfig.textClass)}>
          <span className={cn('size-1.5 rounded-full', statusConfig.dotClass)} />
          {statusConfig.label}
        </span>
      </TableCell>

      <TableCell className="pr-2 text-right">
        <SourceActionsMenu onEdit={onEdit} />
      </TableCell>
    </TableRow>
  );
}
