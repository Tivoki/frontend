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
import { cn } from '~/shared/lib';
import { Badge, TableCell, TableRow } from '~/shared/ui/kit';
import { STATUS_CONFIG, TYPE_BADGE_VARIANTS, TYPE_LABELS } from '../model/config';
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
          <div className="bg-primary/10 flex size-8 shrink-0 items-center justify-center rounded-lg">
            <HugeiconsIcon
              icon={icon}
              strokeWidth={1.75}
              className="text-primary size-4"
            />
          </div>
          <div className="min-w-0">
            <p className="text-foreground text-sm leading-tight font-medium">
              {source.name}
            </p>
            {source.url && (
              <p className="text-muted-foreground max-w-45 truncate text-xs sm:max-w-60">
                {source.url}
              </p>
            )}
          </div>
        </div>
      </TableCell>

      <TableCell className="text-center">
        <Badge variant={TYPE_BADGE_VARIANTS[source.type]}>
          {TYPE_LABELS[source.type]}
        </Badge>
      </TableCell>

      <TableCell className="text-center text-sm tabular-nums">
        {source.documentsCount}
      </TableCell>

      <TableCell className="hidden text-center text-sm tabular-nums sm:table-cell">
        {source.chunksCount}
      </TableCell>

      <TableCell className="text-muted-foreground hidden text-center text-sm md:table-cell">
        {source.updatedAt}
      </TableCell>

      <TableCell className="text-center">
        <span
          className={cn(
            'inline-flex items-center gap-1.5 text-xs font-medium',
            statusConfig.textClass,
          )}
        >
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
