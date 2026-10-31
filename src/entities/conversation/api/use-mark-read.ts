'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '~/shared/api';
import { conversationKeys } from '../model/keys';
import type { ConversationDetail, ReadState } from '../model/types';

/** Monotonic read receipt for the current user (the server clamps and ignores stale ones). */
export const useMarkRead = (workspaceId: string | null) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, lastReadSeq }: { id: string; lastReadSeq: number }) =>
      apiClient
        .put(`workspaces/${workspaceId}/conversations/${id}/read-state`, {
          json: { lastReadSeq },
        })
        .json<ReadState>(),
    onSuccess: (state, { id }) => {
      if (!workspaceId) return;
      queryClient.setQueryData<ConversationDetail>(
        conversationKeys.detail(workspaceId, id),
        (detail) =>
          detail
            ? {
                ...detail,
                lastReadSeq: state.lastReadSeq,
                unreadCount: state.unreadCount,
              }
            : detail,
      );
      void queryClient.invalidateQueries({
        queryKey: conversationKeys.inboxes(workspaceId),
        refetchType: 'none',
      });
    },
  });
};
