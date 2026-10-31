'use client';

import { ArrowLeft01Icon, InformationCircleIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useCallback, useMemo } from 'react';
import {
  CHANNEL_LABELS,
  ConversationBadgePill,
  isUnavailableError,
  mergeBySeq,
  useConversation,
  useHistory,
  visitorInitial,
  visitorLabel,
} from '~/entities/conversation';
import type { ConversationDetail, HistoryMessage } from '~/entities/conversation';
import {
  AssignMenu,
  ResolveButton,
  TakeOverButton,
} from '~/features/conversation-actions';
import { ReplyComposer } from '~/features/conversation-reply';
import { Badge, Button, Skeleton } from '~/shared/ui/kit';
import { MessageList } from './MessageList';

interface ConversationThreadProps {
  workspaceId: string | null;
  conversationId: string | undefined;
  onBack?: () => void;
  onInfo?: () => void;
}

const composerReason = (conversation: ConversationDetail) => {
  const { capabilities, activeEscalation } = conversation;
  if (conversation.status === 'CLOSED')
    return <span>Closed — a new visitor message will reopen this conversation.</span>;
  if (!activeEscalation)
    return capabilities.canTakeOver ? (
      <>
        <span>The AI assistant is handling this conversation.</span>
        <TakeOverButton conversation={conversation} size="xs" />
      </>
    ) : (
      <span>View only — the AI assistant is handling this conversation.</span>
    );
  if (activeEscalation.assignedTo && !capabilities.canReply)
    return (
      <span>
        {activeEscalation.assignedTo.name ?? 'Another agent'} is handling this
        conversation.
      </span>
    );
  return <span>View only — your role can&apos;t reply.</span>;
};

export const ConversationThread = ({
  workspaceId,
  conversationId,
  onBack,
  onInfo,
}: ConversationThreadProps) => {
  const detail = useConversation(workspaceId, conversationId);
  const history = useHistory(workspaceId, conversationId);
  const messages = useMemo<HistoryMessage[]>(
    () =>
      mergeBySeq(
        [],
        [...(history.data?.pages ?? [])].flatMap((page) => page.items),
      ),
    [history.data],
  );
  const { fetchNextPage } = history;
  const loadOlder = useCallback(() => void fetchNextPage(), [fetchNextPage]);
  const lastSeenVisitorSeq = useMemo(
    () =>
      messages.reduce(
        (max, message) => (message.role === 'VISITOR' ? Math.max(max, message.seq) : max),
        0,
      ),
    [messages],
  );

  if (!conversationId || !workspaceId) {
    return (
      <div className="text-muted-foreground flex flex-1 items-center justify-center text-sm">
        Select a conversation to view messages
      </div>
    );
  }

  if (detail.isError) {
    const unavailable = isUnavailableError(detail.error);
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center">
        <p className="text-foreground text-sm font-medium">
          {unavailable ? 'Conversation not available' : 'Couldn’t load this conversation'}
        </p>
        <p className="text-muted-foreground max-w-xs text-xs">
          {unavailable
            ? 'It doesn’t exist in this workspace or you no longer have access to it.'
            : 'Check your connection and try again.'}
        </p>
        <div className="flex gap-2">
          {onBack && (
            <Button size="sm" variant="ghost" onClick={onBack}>
              Back to inbox
            </Button>
          )}
          {!unavailable && (
            <Button size="sm" variant="outline" onClick={() => void detail.refetch()}>
              Try again
            </Button>
          )}
        </div>
      </div>
    );
  }

  const conversation = detail.data;
  if (!conversation) {
    return (
      <div className="flex flex-1 flex-col gap-4 p-4" aria-busy>
        <Skeleton className="h-10 w-1/2" />
        <Skeleton className="h-12 w-2/3" />
        <Skeleton className="ml-auto h-12 w-1/2" />
      </div>
    );
  }

  const initial = visitorInitial(conversation.visitor);

  return (
    <div className="bg-background flex h-full min-h-0 flex-col">
      <div className="border-border flex flex-wrap items-center gap-2 border-b px-3 py-3 sm:px-4">
        {onBack && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="text-muted-foreground shrink-0 md:hidden"
            aria-label="Back to conversations"
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} strokeWidth={1.75} className="size-5" />
          </Button>
        )}

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="text-foreground truncate text-sm font-semibold">
              {visitorLabel(conversation.visitor)}
            </p>
            <Badge variant="secondary" className="shrink-0 text-xs">
              {CHANNEL_LABELS[conversation.channel]}
            </Badge>
            <ConversationBadgePill
              status={conversation.status}
              escalation={conversation.activeEscalation}
              className="shrink-0"
            />
          </div>
          <p className="text-muted-foreground truncate text-xs">
            {conversation.visitor.email ?? 'No email'}
          </p>
        </div>

        {/* Actions wrap onto their own row on narrow screens. */}
        <div className="order-3 flex basis-full items-center justify-end gap-1.5 empty:hidden sm:order-2 sm:basis-auto">
          {conversation.activeEscalation && (
            <TakeOverButton conversation={conversation} />
          )}
          <AssignMenu conversation={conversation} />
          <ResolveButton
            conversation={conversation}
            lastSeenVisitorSeq={lastSeenVisitorSeq}
          />
        </div>
        <div className="order-2 flex shrink-0 items-center sm:order-3">
          {onInfo && (
            <div className="xl:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={onInfo}
                className="text-muted-foreground"
                aria-label="Conversation info"
              >
                <HugeiconsIcon
                  icon={InformationCircleIcon}
                  strokeWidth={1.75}
                  className="size-5"
                />
              </Button>
            </div>
          )}
        </div>
      </div>

      <MessageList
        key={conversation.id}
        workspaceId={workspaceId}
        conversation={conversation}
        messages={messages}
        isLoading={history.isPending}
        hasOlder={history.hasNextPage}
        isFetchingOlder={history.isFetchingNextPage}
        onLoadOlder={loadOlder}
        customerInitial={initial}
      />

      <ReplyComposer
        key={conversation.id}
        workspaceId={workspaceId}
        conversationId={conversation.id}
        escalationId={conversation.activeEscalation?.id ?? null}
        canReply={conversation.capabilities.canReply}
        disabledReason={composerReason(conversation)}
      />
    </div>
  );
};
