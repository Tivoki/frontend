'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { HTTPError } from 'ky';
import { toast } from 'sonner';
import {
  catchUpHistory,
  conversationKeys,
  putConversationDetail,
  resetInboxToFirstPage,
} from '~/entities/conversation';
import type { ConversationDetail, HistoryMessage } from '~/entities/conversation';
import { apiClient, getApiErrorCode, getApiErrorMessage } from '~/shared/api';
import { getReplyState, updateReplyState } from './reply-store';

interface SendResponse {
  message: HistoryMessage;
  duplicate: boolean;
  conversation: ConversationDetail;
}

interface SendInput {
  clientMessageId: string;
  content: string;
  escalationId: string;
}

export const MAX_REPLY_LENGTH = 4000;

/**
 * Operator reply. The text becomes a pending bubble right away and the draft
 * is cleared; on failure the bubble stays with Retry (same clientMessageId, so
 * a retry after a timeout can't duplicate) and nothing typed is lost. A
 * canonical message arriving over SSE first simply hides the pending bubble.
 */
export const useSendReply = (workspaceId: string, conversationId: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (input: SendInput) =>
      apiClient
        .post(`workspaces/${workspaceId}/conversations/${conversationId}/messages`, {
          json: input,
          timeout: 15_000,
          retry: { limit: 2, methods: ['post'], statusCodes: [408, 429, 502, 503, 504] },
        })
        .json<SendResponse>(),
    onSuccess: async (response, input) => {
      putConversationDetail(queryClient, response.conversation);
      await catchUpHistory(queryClient, workspaceId, conversationId).catch(
        () => undefined,
      );
      updateReplyState(workspaceId, conversationId, (state) => ({
        ...state,
        pending: state.pending.filter(
          (reply) => reply.clientMessageId !== input.clientMessageId,
        ),
      }));
      void resetInboxToFirstPage(queryClient, workspaceId);
    },
    onError: (error, input) => {
      const code = getApiErrorCode(error);
      const message = getApiErrorMessage(error);
      updateReplyState(workspaceId, conversationId, (state) => ({
        ...state,
        pending: state.pending.map((reply) =>
          reply.clientMessageId === input.clientMessageId
            ? { ...reply, status: 'failed', error: message }
            : reply,
        ),
      }));
      if (code || (error instanceof HTTPError && error.response.status === 403)) {
        // State changed under us (closed, reassigned…): show the truth.
        void queryClient.invalidateQueries({
          queryKey: conversationKeys.detail(workspaceId, conversationId),
        });
      }
      toast.error(message);
    },
  });

  const send = (escalationId: string) => {
    const content = getReplyState(workspaceId, conversationId).draft.trim();
    if (!content || content.length > MAX_REPLY_LENGTH) return;
    const clientMessageId = crypto.randomUUID();
    updateReplyState(workspaceId, conversationId, (state) => ({
      draft: '',
      pending: [...state.pending, { clientMessageId, content, status: 'sending' }],
    }));
    mutation.mutate({ clientMessageId, content, escalationId });
  };

  const retry = (clientMessageId: string, escalationId: string) => {
    const reply = getReplyState(workspaceId, conversationId).pending.find(
      (item) => item.clientMessageId === clientMessageId,
    );
    if (!reply) return;
    updateReplyState(workspaceId, conversationId, (state) => ({
      ...state,
      pending: state.pending.map((item) =>
        item.clientMessageId === clientMessageId
          ? { ...item, status: 'sending', error: undefined }
          : item,
      ),
    }));
    mutation.mutate({ clientMessageId, content: reply.content, escalationId });
  };

  /** Puts a failed reply back into the composer for editing. */
  const restore = (clientMessageId: string) =>
    updateReplyState(workspaceId, conversationId, (state) => {
      const reply = state.pending.find(
        (item) => item.clientMessageId === clientMessageId,
      );
      if (!reply) return state;
      return {
        draft: state.draft ? `${state.draft}\n${reply.content}` : reply.content,
        pending: state.pending.filter((item) => item.clientMessageId !== clientMessageId),
      };
    });

  return { send, retry, restore, isSending: mutation.isPending };
};
