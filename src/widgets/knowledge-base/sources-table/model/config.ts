import type {
  KnowledgeBaseSourceStatus,
  KnowledgeBaseSourceType,
} from '~/entities/knowledge-base-source';

export const TYPE_LABELS: Record<KnowledgeBaseSourceType, string> = {
  website: 'Website',
  file: 'File',
  faq: 'FAQ',
  manual: 'Manual',
};

export const TYPE_BADGE_VARIANTS: Record<
  KnowledgeBaseSourceType,
  'default' | 'secondary' | 'outline'
> = {
  website: 'secondary',
  file: 'secondary',
  faq: 'outline',
  manual: 'outline',
};

export const STATUS_CONFIG: Record<
  KnowledgeBaseSourceStatus,
  { label: string; dotClass: string; textClass: string }
> = {
  pending: {
    label: 'Pending',
    dotClass: 'bg-muted-foreground',
    textClass: 'text-muted-foreground',
  },
  active: {
    label: 'Active',
    dotClass: 'bg-success',
    textClass: 'text-success-foreground',
  },
  inactive: {
    label: 'Inactive',
    dotClass: 'bg-muted-foreground',
    textClass: 'text-muted-foreground',
  },
  indexing: {
    label: 'Indexing',
    dotClass: 'bg-warning animate-pulse',
    textClass: 'text-warning-foreground',
  },
  error: {
    label: 'Error',
    dotClass: 'bg-destructive',
    textClass: 'text-destructive',
  },
};
