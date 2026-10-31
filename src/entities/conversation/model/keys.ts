import type { InboxQuery } from './types';

/** Every key starts with the workspace, so a workspace switch never shows foreign cache. */
export const conversationKeys = {
  all: ['conversations'] as const,
  workspace: (workspaceId: string) => [...conversationKeys.all, workspaceId] as const,
  inboxes: (workspaceId: string) =>
    [...conversationKeys.workspace(workspaceId), 'inbox'] as const,
  inbox: (workspaceId: string, query: InboxQuery) =>
    [...conversationKeys.inboxes(workspaceId), query] as const,
  detail: (workspaceId: string, id: string) =>
    [...conversationKeys.workspace(workspaceId), 'detail', id] as const,
  history: (workspaceId: string, id: string) =>
    [...conversationKeys.workspace(workspaceId), 'history', id] as const,
  activities: (workspaceId: string, id: string) =>
    [...conversationKeys.workspace(workspaceId), 'activities', id] as const,
};
