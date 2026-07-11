'use client';

import { useQuery } from '@tanstack/react-query';
import { apiClient } from '~/shared/api';
import { workspaceKeys } from '../model/keys';
import type { WorkspaceWithMembers } from '../model/types';

export const useWorkspace = (workspaceId: string | null) =>
  useQuery({
    queryKey: workspaceKeys.detail(workspaceId ?? ''),
    queryFn: () =>
      apiClient.get(`workspaces/${workspaceId}`).json<WorkspaceWithMembers>(),
    enabled: workspaceId !== null,
    retry: false,
  });
