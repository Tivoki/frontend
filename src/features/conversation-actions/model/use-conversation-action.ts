'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  conversationKeys,
  putConversationDetail,
  resetInboxToFirstPage,
} from '~/entities/conversation';
import type { ConversationDetail } from '~/entities/conversation';
import { escalationKeys } from '~/entities/escalation';
import { apiClient, getApiErrorCode, getApiErrorMessage } from '~/shared/api';

export type ConversationAction =
  | { type: 'TAKE_OVER' }
  | { type: 'ASSIGN'; escalationId: string; assigneeUserId: string }
  | { type: 'UNASSIGN'; escalationId: string }
  | { type: 'RESOLVE'; escalationId: string; lastSeenVisitorSeq: number };

interface ActionResponse {
  duplicate: boolean;
  conversation: ConversationDetail;
}

const CONFLICT_HINT: Record<string, string> = {
  CONVERSATION_CHANGED:
    'The conversation changed — review the latest messages and try again.',
  ESCALATION_STALE: 'This handoff is no longer active.',
  ASSIGNED_TO_ANOTHER_AGENT: 'Another agent is handling this conversation.',
  IDEMPOTENCY_CONFLICT: 'This action was already used for something else; try again.',
};

/**
 * Lifecycle command with the revision the operator saw. A conflict never
 * applies anything: the detail is refetched so the operator sees the truth.
 * Successes and conflicts both refresh the inbox and the escalations panel.
 */
export const useConversationAction = (workspaceId: string, conversationId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      action,
      expectedRevision,
    }: {
      action: ConversationAction;
      expectedRevision: number;
    }) =>
      apiClient
        .post(`workspaces/${workspaceId}/conversations/${conversationId}/actions`, {
          json: { ...action, expectedRevision, actionId: crypto.randomUUID() },
        })
        .json<ActionResponse>(),
    onSuccess: ({ conversation }) => {
      putConversationDetail(queryClient, conversation);
    },
    onError: (error) => {
      const code = getApiErrorCode(error);
      toast.error((code && CONFLICT_HINT[code]) ?? getApiErrorMessage(error));
      void queryClient.invalidateQueries({
        queryKey: conversationKeys.detail(workspaceId, conversationId),
      });
    },
    onSettled: () => {
      void resetInboxToFirstPage(queryClient, workspaceId);
      void queryClient.invalidateQueries({ queryKey: escalationKeys.lists(workspaceId) });
      void queryClient.invalidateQueries({
        queryKey: conversationKeys.activities(workspaceId, conversationId),
      });
    },
  });
};
