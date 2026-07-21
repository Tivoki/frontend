'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { apiClient, getApiErrorMessage } from '~/shared/api';

export const useTestIntegration = (workspaceId: string) =>
  useMutation({
    mutationFn: (integrationId: string) =>
      apiClient
        .post(`workspaces/${workspaceId}/integrations/${integrationId}/test`)
        .json<{ ok: boolean }>(),
    onSuccess: () => {
      toast.success('Test notification sent');
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
