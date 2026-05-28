import type { KnowledgeBaseSourceType, KnowledgeBaseSourceStatus } from '~/entities/knowledge-base-source';

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
  active: {
    label: 'Active',
    dotClass: 'bg-green-500',
    textClass: 'text-green-700 dark:text-green-400',
  },
  inactive: {
    label: 'Inactive',
    dotClass: 'bg-muted-foreground',
    textClass: 'text-muted-foreground',
  },
  indexing: {
    label: 'Indexing',
    dotClass: 'bg-yellow-500 animate-pulse',
    textClass: 'text-yellow-700 dark:text-yellow-400',
  },
  error: {
    label: 'Error',
    dotClass: 'bg-destructive',
    textClass: 'text-destructive',
  },
};
