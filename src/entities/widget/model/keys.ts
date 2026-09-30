export const widgetKeys = {
  all: ['widget'] as const,
  detail: (workspaceId: string) => [...widgetKeys.all, 'detail', workspaceId] as const,
};
