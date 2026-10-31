'use client';

import {
  useInfiniteQuery,
  type QueryClient,
  type InfiniteData,
} from '@tanstack/react-query';
import { HTTPError } from 'ky';
import { apiClient } from '~/shared/api';
import { mergeBySeq } from '../lib/history-merge';
import { conversationKeys } from '../model/keys';
import type { HistoryPage } from '../model/types';

type HistoryData = InfiniteData<HistoryPage, number | null>;

/**
 * Pages of messages by immutable seq: page 0 is the newest (no cursor),
 * further pages go back with `beforeSeq`. Newer messages from realtime are
 * merged into page 0 by `catchUpHistory` — the whole history is never refetched.
 */
export const useHistory = (workspaceId: string | null, id: string | undefined) =>
  useInfiniteQuery({
    queryKey: conversationKeys.history(workspaceId ?? '', id ?? ''),
    queryFn: ({ pageParam, signal }) =>
      apiClient
        .get(`workspaces/${workspaceId}/conversations/${id}/history`, {
          searchParams: {
            limit: 50,
            ...(pageParam !== null && { beforeSeq: pageParam }),
          },
          signal,
        })
        .json<HistoryPage>(),
    initialPageParam: null as number | null,
    getNextPageParam: (page) =>
      page.hasOlder && page.oldestSeq ? page.oldestSeq : undefined,
    enabled: workspaceId !== null && !!id,
    // 403/404 are final (the detail shows "not available"); don't retry them.
    retry: (count, error) =>
      !(error instanceof HTTPError && [403, 404].includes(error.response.status)) &&
      count < 2,
    // Realtime keeps it fresh; avoid refetching every loaded page on focus.
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

const catchUps = new Map<string, Promise<void>>();

/**
 * Single-flight delta fetch: `afterSeq` from the newest loaded message,
 * page by page while `hasNewer`. Deduped by id, so overlapping SSE hints
 * and HTTP responses never duplicate a bubble.
 */
export function catchUpHistory(
  queryClient: QueryClient,
  workspaceId: string,
  id: string,
): Promise<void> {
  const key = conversationKeys.history(workspaceId, id);
  const flightKey = JSON.stringify(key);
  const running = catchUps.get(flightKey);
  if (running) return running.then(() => catchUpHistory(queryClient, workspaceId, id));

  const run = (async () => {
    for (let guard = 0; guard < 50; guard++) {
      const data = queryClient.getQueryData<HistoryData>(key);
      if (!data) return; // not loaded yet: the initial fetch brings the latest
      const newest = data.pages.reduce(
        (max, page) => Math.max(max, page.newestSeq ?? 0),
        0,
      );
      const delta = await apiClient
        .get(`workspaces/${workspaceId}/conversations/${id}/history`, {
          searchParams: { afterSeq: newest, limit: 100 },
        })
        .json<HistoryPage>();
      queryClient.setQueryData<HistoryData>(key, (current) => {
        if (!current || current.pages.length === 0) return current;
        const [latest, ...older] = current.pages;
        const items = mergeBySeq(latest.items, delta.items);
        return {
          ...current,
          pages: [
            {
              ...latest,
              items,
              newestSeq: items.at(-1)?.seq ?? latest.newestSeq,
              hasNewer: delta.hasNewer,
              conversationRevision: delta.conversationRevision,
            },
            ...older,
          ],
        };
      });
      if (!delta.hasNewer) return;
    }
  })().finally(() => catchUps.delete(flightKey));
  catchUps.set(flightKey, run);
  return run;
}
