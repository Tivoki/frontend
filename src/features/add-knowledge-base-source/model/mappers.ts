import { TYPE_TO_DTO } from '~/entities/knowledge-base-source';
import type {
  CreateKnowledgeSourceDto,
  KnowledgeBaseSourceType,
  UpdateKnowledgeSourceDto,
} from '~/entities/knowledge-base-source';
import type { AddSourceFormData } from './schema';

export type CreateSourcePayload =
  | { kind: 'json'; body: CreateKnowledgeSourceDto }
  | { kind: 'form-data'; body: FormData };

export const sourceFormDataToCreatePayload = (
  type: KnowledgeBaseSourceType,
  data: AddSourceFormData,
): CreateSourcePayload => {
  if (type === 'file') {
    const formData = new FormData();
    formData.set('type', TYPE_TO_DTO.file);
    formData.set('name', data.name);
    if (data.file) formData.set('file', data.file);
    return { kind: 'form-data', body: formData };
  }

  if (type === 'faq') {
    return {
      kind: 'json',
      body: {
        type: TYPE_TO_DTO.faq,
        name: data.name,
        url: data.url || undefined,
        items: (data.items ?? []).map(({ question, answer }) => ({ question, answer })),
      },
    };
  }

  return {
    kind: 'json',
    body: {
      type: TYPE_TO_DTO[type],
      name: data.name,
      url: type === 'website' ? data.url : undefined,
      content: type === 'manual' ? data.content : undefined,
    },
  };
};

export const sourceFormDataToUpdateDto = (
  type: KnowledgeBaseSourceType,
  data: AddSourceFormData,
): UpdateKnowledgeSourceDto => {
  if (type === 'faq') {
    return {
      name: data.name,
      url: data.url || undefined,
      items: (data.items ?? []).map(({ question, answer }) => ({ question, answer })),
    };
  }

  return {
    name: data.name,
    url: type === 'website' ? data.url : undefined,
    content: type === 'manual' ? data.content : undefined,
  };
};
