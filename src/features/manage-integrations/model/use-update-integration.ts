'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import type { Integration } from '~/entities/integration';
import { integrationKeys } from '~/entities/integration';
import type { components } from '~/shared/api';
import { apiClient, getApiErrorMessage } from '~/shared/api';

interface UpdateIntegrationInput {
  integrationId: string;
  data: components['schemas']['UpdateIntegrationDto'];
}

export const useUpdateIntegration = (workspaceId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ integrationId, data }: UpdateIntegrationInput) =>
      apiClient
        .patch(`workspaces/${workspaceId}/integrations/${integrationId}`, { json: data })
        .json<Integration>(),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: integrationKeys.lists(workspaceId) });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
};
