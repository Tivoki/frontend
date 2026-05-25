export type KnowledgeBaseItemStatus = 'published' | 'draft' | 'outdated';

export interface KnowledgeBaseItem {
  id: string;
  title: string;
  status: KnowledgeBaseItemStatus;
  updatedAt: string;
}
