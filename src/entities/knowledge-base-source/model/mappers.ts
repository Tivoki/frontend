import { formatRelativeTime } from '~/shared/lib';
import type { components } from '~/shared/api';
import type {
  KnowledgeBaseSource,
  KnowledgeBaseSourceStatus,
  KnowledgeBaseSourceType,
} from './types';

export type KnowledgeSourceDto = components['schemas']['KnowledgeSourceResponseDto'];
export type CreateKnowledgeSourceDto = components['schemas']['CreateKnowledgeSourceDto'];
export type UpdateKnowledgeSourceDto = components['schemas']['UpdateKnowledgeSourceDto'];
export type FaqItemDto = components['schemas']['FaqItemDto'];

export const TYPE_TO_FORM: Record<KnowledgeSourceDto['type'], KnowledgeBaseSourceType> = {
  WEBSITE: 'website',
  FILE: 'file',
  FAQ: 'faq',
  MANUAL: 'manual',
};

export const TYPE_TO_DTO: Record<KnowledgeBaseSourceType, KnowledgeSourceDto['type']> = {
  website: 'WEBSITE',
  file: 'FILE',
  faq: 'FAQ',
  manual: 'MANUAL',
};

const STATUS_TO_FORM: Record<KnowledgeSourceDto['status'], KnowledgeBaseSourceStatus> = {
  PENDING: 'pending',
  INDEXING: 'indexing',
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  ERROR: 'error',
};

export const sourceDtoToKnowledgeBaseSource = (dto: KnowledgeSourceDto): KnowledgeBaseSource => ({
  id: dto.id,
  name: dto.name,
  url: dto.url ?? undefined,
  type: TYPE_TO_FORM[dto.type],
  documentsCount: dto.documentsCount,
  chunksCount: dto.chunksCount,
  updatedAt: formatRelativeTime(dto.updatedAt),
  status: STATUS_TO_FORM[dto.status],
  error: dto.error,
  content: dto.content,
  items: dto.items,
});
