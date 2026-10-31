'use client';

import type { ConversationDetail } from '~/entities/conversation';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
} from '~/shared/ui/kit';
import { useConversationAction } from '../model/use-conversation-action';

interface ResolveButtonProps {
  conversation: ConversationDetail;
  /** Newest visitor message seq actually shown to the operator. */
  lastSeenVisitorSeq: number;
}

/**
 * The single "finish" action: resolves the handoff and closes the
 * conversation. Refused (409) if the visitor wrote after what was shown.
 */
export const ResolveButton = ({
  conversation,
  lastSeenVisitorSeq,
}: ResolveButtonProps) => {
  const action = useConversationAction(conversation.workspaceId, conversation.id);
  const escalation = conversation.activeEscalation;
  if (!escalation || !conversation.capabilities.canResolve) return null;
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="sm" variant="outline" disabled={action.isPending}>
          Resolve
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Resolve and close this conversation?</AlertDialogTitle>
          <AlertDialogDescription>
            Nobody will answer until the visitor writes again. A new visitor message
            reopens this conversation with the assistant; the history stays.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() =>
              action.mutate({
                action: {
                  type: 'RESOLVE',
                  escalationId: escalation.id,
                  lastSeenVisitorSeq,
                },
                expectedRevision: conversation.revision,
              })
            }
          >
            Resolve
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
