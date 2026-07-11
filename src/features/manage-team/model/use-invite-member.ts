'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { workspaceKeys } from '~/entities/workspace';
import type { WorkspaceMember } from '~/entities/workspace';
import { apiClient, getApiErrorMessage } from '~/shared/api';
import type { components } from '~/shared/api';
import { toast } from 'sonner';

export const useInviteMember = (workspaceId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: components['schemas']['AddWorkspaceMemberDto']) =>
      apiClient
        .post(`workspaces/${workspaceId}/members`, { json: data })
        .json<WorkspaceMember>(),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: workspaceKeys.members(workspaceId),
      });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
};
