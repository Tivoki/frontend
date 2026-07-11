import { serverApiGet } from '~/shared/api/index.server';
import type { ServerApiResult } from '~/shared/api/index.server';

import type { WorkspaceWithMembers } from '../model/types';

export const getWorkspace = (
  workspaceId: string,
): Promise<ServerApiResult<WorkspaceWithMembers>> =>
  serverApiGet(`workspaces/${workspaceId}`);
