export type KnowledgeBaseSourceType = 'website' | 'file' | 'faq' | 'manual';
export type KnowledgeBaseSourceStatus =
  | 'pending'
  | 'active'
  | 'inactive'
  | 'indexing'
  | 'error';

export interface KnowledgeBaseFaqItem {
  question: string;
  answer: string;
}

export interface KnowledgeBaseSource {
  id: string;
  name: string;
  url?: string;
  type: KnowledgeBaseSourceType;
  documentsCount: number;
  chunksCount: number;
  updatedAt: string;
  status: KnowledgeBaseSourceStatus;
  error?: string | null;
  content?: string | null;
  items?: KnowledgeBaseFaqItem[] | null;
}
