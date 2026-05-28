export type KnowledgeBaseSourceType = 'website' | 'file' | 'faq' | 'manual';
export type KnowledgeBaseSourceStatus = 'active' | 'inactive' | 'indexing' | 'error';

export interface KnowledgeBaseSource {
  id: string;
  name: string;
  url?: string;
  type: KnowledgeBaseSourceType;
  documentsCount: number;
  chunksCount: number;
  updatedAt: string;
  status: KnowledgeBaseSourceStatus;
}
