'use client';

import { useQuery } from '@tanstack/react-query';
import { apiClient } from '~/shared/api';
import { escalationKeys } from '../model/keys';
import type { Escalation } from '../model/types';

interface EscalationsPage {
  data: Escalation[];
}

export const useEscalations = (workspaceId: string | null) =>
  useQuery({
    queryKey: escalationKeys.lists(workspaceId ?? ''),
    queryFn: () =>
      apiClient
        .get(`workspaces/${workspaceId}/escalations`, { searchParams: { take: 50 } })
        .json<EscalationsPage>(),
    enabled: workspaceId !== null,
    select: (page) => page.data,
  });
