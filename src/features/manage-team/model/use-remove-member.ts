'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { workspaceKeys } from '~/entities/workspace';
import type { WorkspaceMember } from '~/entities/workspace';
import { apiClient, getApiErrorMessage } from '~/shared/api';

export const useRemoveMember = (workspaceId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (memberId: string) =>
      apiClient
        .delete(`workspaces/${workspaceId}/members/${memberId}`)
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
