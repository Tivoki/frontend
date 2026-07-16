'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { widgetConfigToUpdateDto, widgetKeys } from '~/entities/widget';
import type { WidgetConfig, WidgetDto } from '~/entities/widget';
import { apiClient, getApiErrorMessage } from '~/shared/api';

export const useUpdateWidgetConfig = (workspaceId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (config: WidgetConfig) =>
      apiClient
        .patch(`workspaces/${workspaceId}/widget`, { json: widgetConfigToUpdateDto(config) })
        .json<WidgetDto>(),
    onSuccess: (data) => {
      queryClient.setQueryData(widgetKeys.detail(workspaceId), data);
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
};
