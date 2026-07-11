'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { workspaceKeys } from '~/entities/workspace';
import type { WorkspaceWithMembers } from '~/entities/workspace';
import { apiClient, getApiErrorMessage } from '~/shared/api';
import type { components } from '~/shared/api';

export const useCreateWorkspace = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: components['schemas']['CreateWorkspaceDto']) =>
      apiClient.post('workspaces', { json: data }).json<WorkspaceWithMembers>(),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: workspaceKeys.lists() });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
};
