'use client';

import type { InfiniteData, QueryClient } from '@tanstack/react-query';
import { conversationKeys } from '../model/keys';
import type { ConversationDetail, InboxPage } from '../model/types';

/**
 * The inbox is live: after an invalidation the page chain restarts from the
 * first page (older pages are dropped, not refetched with stale cursors).
 * Only active queries refetch.
 */
export async function resetInboxToFirstPage(
  queryClient: QueryClient,
  workspaceId: string,
): Promise<void> {
  queryClient.setQueriesData<InfiniteData<InboxPage, string | null>>(
    { queryKey: conversationKeys.inboxes(workspaceId) },
    (data) =>
      data && data.pages.length > 1
        ? { pages: data.pages.slice(0, 1), pageParams: data.pageParams.slice(0, 1) }
        : data,
  );
  await queryClient.invalidateQueries({
    queryKey: conversationKeys.inboxes(workspaceId),
    refetchType: 'active',
  });
}

/** Stores a fresher detail (e.g. returned by a command) unless the cache is newer. */
export function putConversationDetail(
  queryClient: QueryClient,
  detail: ConversationDetail,
): void {
  queryClient.setQueryData<ConversationDetail>(
    conversationKeys.detail(detail.workspaceId, detail.id),
    (current) => (current && current.revision > detail.revision ? current : detail),
  );
}
