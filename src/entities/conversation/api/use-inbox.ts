'use client';

import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { apiClient } from '~/shared/api';
import { conversationKeys } from '../model/keys';
import type { InboxPage, InboxQuery } from '../model/types';

export const INBOX_PAGE_SIZE = 30;

const fetchInboxPage = (
  workspaceId: string,
  query: InboxQuery,
  cursor: string | null,
  signal: AbortSignal,
) =>
  apiClient
    .get(`workspaces/${workspaceId}/conversations/inbox`, {
      searchParams: {
        limit: INBOX_PAGE_SIZE,
        filter: query.filter,
        ...(query.q && { q: query.q }),
        ...(query.assignee && { assignee: query.assignee }),
        ...(cursor && { cursor }),
      },
      signal,
    })
    .json<InboxPage>();

/**
 * Live inbox (server-side filters, keyset cursor). Realtime invalidation
 * trims the cache to the first page before refetching (see
 * `resetInboxToFirstPage`), so stale cursors are never replayed.
 */
export const useInbox = (workspaceId: string | null, query: InboxQuery) =>
  useInfiniteQuery({
    queryKey: conversationKeys.inbox(workspaceId ?? '', query),
    queryFn: ({ pageParam, signal }) =>
      fetchInboxPage(workspaceId!, query, pageParam, signal),
    initialPageParam: null as string | null,
    getNextPageParam: (page) => (page.hasMore ? page.nextCursor : undefined),
    enabled: workspaceId !== null,
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  });
