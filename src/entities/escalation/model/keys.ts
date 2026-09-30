export const escalationKeys = {
  all: ['escalations'] as const,
  lists: (workspaceId: string) => [...escalationKeys.all, 'list', workspaceId] as const,
};
