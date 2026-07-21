export const integrationKeys = {
  all: ['integrations'] as const,
  lists: (workspaceId: string) => [...integrationKeys.all, 'list', workspaceId] as const,
};
