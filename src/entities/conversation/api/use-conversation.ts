'use client';

import { useQuery } from '@tanstack/react-query';
import { HTTPError } from 'ky';
import { apiClient } from '~/shared/api';
import { conversationKeys } from '../model/keys';
import type { ConversationDetail } from '../model/types';

/** Detail by id — independent of whichever inbox page or filter is loaded. */
export const useConversation = (workspaceId: string | null, id: string | undefined) =>
  useQuery({
    queryKey: conversationKeys.detail(workspaceId ?? '', id ?? ''),
    queryFn: ({ signal }) =>
      apiClient
        .get(`workspaces/${workspaceId}/conversations/${id}`, { signal })
        .json<ConversationDetail>(),
    enabled: workspaceId !== null && !!id,
    staleTime: 30_000,
    retry: (count, error) =>
      !(error instanceof HTTPError && [403, 404].includes(error.response.status)) &&
      count < 2,
  });

/** 403/404 are a distinct "not available" state, not "nothing selected". */
export const isUnavailableError = (error: unknown): boolean =>
  error instanceof HTTPError && [403, 404].includes(error.response.status);
