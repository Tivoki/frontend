'use client';

import { useQuery } from '@tanstack/react-query';
import { apiClient } from '~/shared/api';
import { widgetKeys } from '../model/keys';
import type { WidgetDto } from '../model/mappers';

export const useWidget = (workspaceId: string | null) =>
  useQuery({
    queryKey: widgetKeys.detail(workspaceId ?? ''),
    queryFn: () => {
      if (!workspaceId) throw new Error('Workspace ID is required');
      return apiClient.get(`workspaces/${workspaceId}/widget`).json<WidgetDto>();
    },
    enabled: workspaceId !== null,
    retry: false,
  });
