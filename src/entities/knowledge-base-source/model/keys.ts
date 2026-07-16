export const knowledgeBaseKeys = {
  all: ['knowledge-sources'] as const,
  lists: (workspaceId: string) => [...knowledgeBaseKeys.all, 'list', workspaceId] as const,
};
