import { serverApiGet } from '~/shared/api/index.server';
import type { ServerApiResult } from '~/shared/api/index.server';

import { WORKSPACE_PAGE_SIZE } from '../model/config';
import type { Page, Workspace } from '../model/types';

export const getWorkspaces = (page = 1): Promise<ServerApiResult<Page<Workspace>>> =>
  serverApiGet(`workspaces?page=${page}&take=${WORKSPACE_PAGE_SIZE}`);
