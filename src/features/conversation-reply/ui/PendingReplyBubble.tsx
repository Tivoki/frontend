'use client';

import type { PendingReply } from '~/entities/conversation';
import { cn } from '~/shared/lib';
import { Button } from '~/shared/ui/kit';
import { useSendReply } from '../model/use-send-reply';

interface PendingReplyBubbleProps {
  workspaceId: string;
  conversationId: string;
  reply: PendingReply;
  escalationId: string | null;
}

/** An operator reply not yet confirmed by the server (sending or failed). */
export const PendingReplyBubble = ({
  workspaceId,
  conversationId,
  reply,
  escalationId,
}: PendingReplyBubbleProps) => {
  const { retry, restore } = useSendReply(workspaceId, conversationId);
  const failed = reply.status === 'failed';
  return (
    <div className="flex flex-row-reverse gap-2" aria-live="polite">
      <div className="bg-success-subtle text-success-foreground flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold">
        You
      </div>
      <div
        className={cn(
          'bg-primary text-primary-foreground max-w-[70%] rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm',
          failed ? 'ring-destructive ring-2' : 'opacity-70',
        )}
      >
        <p className="leading-relaxed whitespace-pre-wrap">{reply.content}</p>
        <div className="text-primary-foreground/80 mt-1 flex flex-wrap items-center gap-2 text-xs">
          {failed ? (
            <>
              <span>Not sent{reply.error ? `: ${reply.error}` : ''}</span>
              {escalationId && (
                <Button
                  size="xs"
                  variant="secondary"
                  onClick={() => retry(reply.clientMessageId, escalationId)}
                >
                  Retry
                </Button>
              )}
              <Button
                size="xs"
                variant="ghost"
                className="text-primary-foreground"
                onClick={() => restore(reply.clientMessageId)}
              >
                Edit
              </Button>
            </>
          ) : (
            <span>Sending…</span>
          )}
        </div>
      </div>
    </div>
  );
};
