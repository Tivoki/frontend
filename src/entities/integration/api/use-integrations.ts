'use client';

import { useQuery } from '@tanstack/react-query';
import { apiClient } from '~/shared/api';
import { integrationKeys } from '../model/keys';
import type { Integration, IntegrationStatus } from '../model/types';

interface IntegrationsPage {
  data: Integration[];
}

const PENDING: IntegrationStatus = 'PENDING';

/** Lists integrations connected to the workspace. Polls while any is PENDING (e.g. a Telegram connect code awaiting confirmation). */
export const useIntegrations = (workspaceId: string | null) =>
  useQuery({
    queryKey: integrationKeys.lists(workspaceId ?? ''),
    queryFn: () =>
      apiClient
        .get(`workspaces/${workspaceId}/integrations`, { searchParams: { take: 50 } })
        .json<IntegrationsPage>(),
    enabled: workspaceId !== null,
    select: (page) => page.data,
    refetchInterval: (query) =>
      query.state.data?.data.some((integration) => integration.status === PENDING)
        ? 4000
        : false,
  });
