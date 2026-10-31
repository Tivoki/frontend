'use client';

import { useQuery } from '@tanstack/react-query';
import { HTTPError } from 'ky';
import { apiClient } from '~/shared/api';
import { conversationKeys } from '../model/keys';
import type { ActivityPage } from '../model/types';

/** Lifecycle audit (latest first). */
export const useConversationActivities = (
  workspaceId: string | null,
  id: string | undefined,
  revision: number | undefined,
) =>
  useQuery({
    queryKey: [
      ...conversationKeys.activities(workspaceId ?? '', id ?? ''),
      revision ?? 0,
    ],
    queryFn: ({ signal }) =>
      apiClient
        .get(`workspaces/${workspaceId}/conversations/${id}/activities`, {
          searchParams: { limit: 30 },
          signal,
        })
        .json<ActivityPage>(),
    enabled: workspaceId !== null && !!id,
    // 403/404 are final (the detail shows "not available"); don't retry them.
    retry: (count, error) =>
      !(error instanceof HTTPError && [403, 404].includes(error.response.status)) &&
      count < 2,
    placeholderData: (previous) => previous,
    staleTime: Infinity,
  });
