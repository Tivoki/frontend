'use client';

import { ArrowLeft01Icon, InformationCircleIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useEffect, useRef } from 'react';
import { CHANNEL_LABELS } from '~/entities/conversation';
import type { Conversation } from '~/entities/conversation';
import { Badge, Button } from '~/shared/ui/kit';
import { MessageBubble } from './MessageBubble';
import { ReplyComposer } from './ReplyComposer';

interface ConversationThreadProps {
  conversation: Conversation | null;
  onBack?: () => void;
  onInfo?: () => void;
}

export const ConversationThread = ({
  conversation,
  onBack,
  onInfo,
}: ConversationThreadProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, [conversation?.id]);

  if (!conversation) {
    return (
      <div className="text-muted-foreground flex flex-1 items-center justify-center text-sm">
        Select a conversation to view messages
      </div>
    );
  }

  const customerInitial = conversation.customerName.charAt(0);

  return (
    <div className="bg-background flex h-full flex-col">
      <div className="border-border flex items-center gap-2 border-b px-3 py-3 sm:px-4">
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
              {conversation.customerName}
            </p>
            <Badge variant="secondary" className="shrink-0 text-xs capitalize">
              {CHANNEL_LABELS[conversation.channel]}
            </Badge>
          </div>
          <p className="text-muted-foreground truncate text-xs">
            {conversation.customerEmail}
          </p>
        </div>

        {onInfo && (
          <div className="shrink-0 xl:hidden">
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

      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {conversation.messages?.map((msg) => (
          <MessageBubble key={msg.id} message={msg} customerInitial={customerInitial} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <ReplyComposer />
    </div>
  );
};
