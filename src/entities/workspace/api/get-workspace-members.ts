import { serverApiGet } from '~/shared/api/index.server';
import type { ServerApiResult } from '~/shared/api/index.server';

import { WORKSPACE_PAGE_SIZE } from '../model/config';
import type { Page, WorkspaceMemberWithUser } from '../model/types';

export const getWorkspaceMembers = (
  workspaceId: string,
  page = 1,
): Promise<ServerApiResult<Page<WorkspaceMemberWithUser>>> =>
  serverApiGet(
    `workspaces/${workspaceId}/members?page=${page}&take=${WORKSPACE_PAGE_SIZE}`,
  );
