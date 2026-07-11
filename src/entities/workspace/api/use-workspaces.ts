'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { apiClient } from '~/shared/api';
import { nextWorkspacePage, WORKSPACE_PAGE_SIZE } from '../model/config';
import { workspaceKeys } from '../model/keys';
import type { Page, Workspace } from '../model/types';

export const useWorkspaces = () =>
  useInfiniteQuery({
    queryKey: workspaceKeys.lists(),
    queryFn: ({ pageParam }) =>
      apiClient
        .get('workspaces', {
          searchParams: { page: pageParam, take: WORKSPACE_PAGE_SIZE },
        })
        .json<Page<Workspace>>(),
    initialPageParam: 1,
    getNextPageParam: nextWorkspacePage,
  });
