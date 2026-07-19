'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { apiClient, nextPage } from '~/shared/api';
import { WORKSPACE_PAGE_SIZE } from '../model/config';
import { workspaceKeys } from '../model/keys';
import type { Page, WorkspaceMemberWithUser } from '../model/types';

/** Lists the members of a workspace, paginated. */
export const useWorkspaceMembers = (workspaceId: string | null) =>
  useInfiniteQuery({
    queryKey: workspaceKeys.members(workspaceId ?? ''),
    queryFn: ({ pageParam }) =>
      apiClient
        .get(`workspaces/${workspaceId}/members`, {
          searchParams: { page: pageParam, take: WORKSPACE_PAGE_SIZE },
        })
        .json<Page<WorkspaceMemberWithUser>>(),
    initialPageParam: 1,
    getNextPageParam: nextPage,
    enabled: workspaceId !== null,
  });
