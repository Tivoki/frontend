'use client';

import { useQueryClient } from '@tanstack/react-query';
import type { InfiniteData } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import {
  catchUpHistory,
  conversationKeys,
  resetInboxToFirstPage,
} from '~/entities/conversation';
import type { ConversationDetail, HistoryPage } from '~/entities/conversation';
import { escalationKeys } from '~/entities/escalation';
import { openEventStream, redirectToLogin } from '~/shared/api';

export type RealtimeStatus = 'connecting' | 'open' | 'reconnecting' | 'stopped';

interface ChangedHint {
  conversationId: string;
  revision: number;
  latestMessageSeq: number;
}

/** Inbox list refreshes are coalesced into at most one pending refetch. */
const LIST_COALESCE_MS = 200;
const OPEN_COALESCE_MS = 100;
/** Beyond this many distinct hints in one window, a full resync is cheaper. */
const MAX_BUFFERED_HINTS = 200;

/**
 * One workspace stream per tab, mounted above the desktop/mobile layouts.
 * Hints carry no content; correctness comes from the API:
 * - `ready` (every connect/reconnect), `resync` (server anti-entropy / Redis
 *   reconnect), tab becoming visible → refresh first inbox page, open detail
 *   and a history delta.
 * - `changed` → coalesced list refresh; for the open conversation a detail
 *   refetch if the revision is newer and an `afterSeq` catch-up if new
 *   messages exist. Closed/reopened status changes arrive the same way.
 */
export function useInboxRealtime(
  workspaceId: string | null,
  openConversationId: string | undefined,
): RealtimeStatus {
  const queryClient = useQueryClient();
  const [status, setStatus] = useState<RealtimeStatus>('connecting');
  const openRef = useRef(openConversationId);

  useEffect(() => {
    openRef.current = openConversationId;
  }, [openConversationId]);

  useEffect(() => {
    if (!workspaceId) return;
    let listTimer: ReturnType<typeof setTimeout> | null = null;
    let openTimer: ReturnType<typeof setTimeout> | null = null;
    const hints = new Map<string, ChangedHint>();

    const refreshList = () => {
      if (listTimer) return;
      listTimer = setTimeout(() => {
        listTimer = null;
        void resetInboxToFirstPage(queryClient, workspaceId);
        void queryClient.invalidateQueries({
          queryKey: escalationKeys.lists(workspaceId),
        });
      }, LIST_COALESCE_MS);
    };

    const syncOpen = (hint?: ChangedHint) => {
      const id = openRef.current;
      if (!id) return;
      const detail = queryClient.getQueryData<ConversationDetail>(
        conversationKeys.detail(workspaceId, id),
      );
      if (!hint || !detail || hint.revision > detail.revision) {
        void queryClient.invalidateQueries({
          queryKey: conversationKeys.detail(workspaceId, id),
        });
      }
      const history = queryClient.getQueryData<InfiniteData<HistoryPage>>(
        conversationKeys.history(workspaceId, id),
      );
      const newest = history?.pages[0]?.newestSeq ?? 0;
      if (!hint || hint.latestMessageSeq > newest) {
        void catchUpHistory(queryClient, workspaceId, id).catch(() => undefined);
      }
    };

    const flushOpen = () => {
      openTimer = null;
      const id = openRef.current;
      const hint = id ? hints.get(id) : undefined;
      for (const [conversationId] of hints) {
        if (conversationId === id) continue;
        // Cached but not on screen: refetch when it's opened again.
        void queryClient.invalidateQueries({
          queryKey: conversationKeys.detail(workspaceId, conversationId),
          refetchType: 'none',
        });
      }
      hints.clear();
      if (hint) syncOpen(hint);
    };

    const resync = () => {
      hints.clear();
      refreshList();
      syncOpen();
    };

    const stream = openEventStream({
      path: `workspaces/${workspaceId}/conversation-events`,
      onStatus: setStatus,
      onEvent: ({ event, data }) => {
        if (event === 'ready' || event === 'resync') {
          resync();
          return;
        }
        if (event === 'changed' || event === 'read') {
          const hint = data as ChangedHint;
          if (typeof hint?.conversationId !== 'string') return;
          refreshList();
          if (event === 'read') {
            if (hint.conversationId === openRef.current) syncOpen();
            return;
          }
          const previous = hints.get(hint.conversationId);
          if (!previous || previous.revision < hint.revision)
            hints.set(hint.conversationId, hint);
          if (hints.size > MAX_BUFFERED_HINTS) {
            resync();
            return;
          }
          openTimer ??= setTimeout(flushOpen, OPEN_COALESCE_MS);
        }
        // `reconnect` is followed by a server close; `ping` keeps proxies alive.
      },
      onForbidden: () => {
        queryClient.removeQueries({ queryKey: conversationKeys.workspace(workspaceId) });
        toast.error('You no longer have access to this workspace’s conversations.');
      },
      onUnauthorized: redirectToLogin,
    });

    const onOnline = () => stream.reconnect();
    const onVisible = () => {
      if (document.visibilityState === 'visible') resync();
    };
    window.addEventListener('online', onOnline);
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      stream.close();
      if (listTimer) clearTimeout(listTimer);
      if (openTimer) clearTimeout(openTimer);
      window.removeEventListener('online', onOnline);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, [workspaceId, queryClient]);

  return status;
}
