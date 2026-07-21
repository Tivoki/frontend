'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import type { Integration } from '~/entities/integration';
import { integrationKeys } from '~/entities/integration';
import type { components } from '~/shared/api';
import { apiClient, getApiErrorMessage } from '~/shared/api';

export const useConnectIntegration = (workspaceId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: components['schemas']['CreateIntegrationDto']) =>
      apiClient
        .post(`workspaces/${workspaceId}/integrations`, { json: data })
        .json<Integration>(),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: integrationKeys.lists(workspaceId) });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
};
