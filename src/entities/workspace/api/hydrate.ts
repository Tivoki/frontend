import type { QueryClient } from '@tanstack/react-query';

import { workspaceKeys } from '../model/keys';
import type {
  Page,
  Workspace,
  WorkspaceMemberWithUser,
  WorkspaceWithMembers,
} from '../model/types';

export const seedWorkspaceList = (
  queryClient: QueryClient,
  firstPage: Page<Workspace>,
): void => {
  queryClient.setQueryData(workspaceKeys.lists(), {
    pages: [firstPage],
    pageParams: [1],
  });
};

export const seedWorkspaceDetail = (
  queryClient: QueryClient,
  workspace: WorkspaceWithMembers,
): void => {
  queryClient.setQueryData(workspaceKeys.detail(workspace.id), workspace);
};

export const seedWorkspaceMembers = (
  queryClient: QueryClient,
  workspaceId: string,
  firstPage: Page<WorkspaceMemberWithUser>,
): void => {
  queryClient.setQueryData(workspaceKeys.members(workspaceId), {
    pages: [firstPage],
    pageParams: [1],
  });
};
