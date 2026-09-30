'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import type { Integration } from '~/entities/integration';
import { integrationKeys } from '~/entities/integration';
import { apiClient, getApiErrorMessage } from '~/shared/api';

export const useDisconnectIntegration = (workspaceId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (integrationId: string) =>
      apiClient
        .delete(`workspaces/${workspaceId}/integrations/${integrationId}`)
        .json<Integration>(),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: integrationKeys.lists(workspaceId) });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
};
