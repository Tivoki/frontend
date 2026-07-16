'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { widgetKeys } from '~/entities/widget';
import type { WidgetDto } from '~/entities/widget';
import { apiClient, getApiErrorMessage } from '~/shared/api';

export const useCreateWidget = (workspaceId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => apiClient.post(`workspaces/${workspaceId}/widget`).json<WidgetDto>(),
    onSuccess: (data) => {
      queryClient.setQueryData(widgetKeys.detail(workspaceId), data);
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
};
