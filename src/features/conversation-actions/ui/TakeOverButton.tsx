'use client';

import type { ConversationDetail } from '~/entities/conversation';
import { Button } from '~/shared/ui/kit';
import { useConversationAction } from '../model/use-conversation-action';

interface TakeOverButtonProps {
  conversation: ConversationDetail;
  size?: 'xs' | 'sm';
}

/** Atomically opens a handoff assigned to you (or claims an unassigned one). */
export const TakeOverButton = ({ conversation, size = 'sm' }: TakeOverButtonProps) => {
  const action = useConversationAction(conversation.workspaceId, conversation.id);
  if (!conversation.capabilities.canTakeOver) return null;
  const claiming = conversation.activeEscalation !== null;
  return (
    <Button
      size={size}
      disabled={action.isPending}
      onClick={() =>
        action.mutate({
          action: { type: 'TAKE_OVER' },
          expectedRevision: conversation.revision,
        })
      }
    >
      {claiming ? 'Assign to me' : 'Take over'}
    </Button>
  );
};
