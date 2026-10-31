'use client';

import { ArrowDown01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useMarkRead, visiblePending } from '~/entities/conversation';
import type { ConversationDetail, HistoryMessage } from '~/entities/conversation';
import { PendingReplyBubble, useReplyState } from '~/features/conversation-reply';
import { Button, Skeleton } from '~/shared/ui/kit';
import { MessageBubble } from './MessageBubble';

const NEAR_BOTTOM_PX = 80;
const READ_RECEIPT_DELAY_MS = 800;

interface MessageListProps {
  workspaceId: string;
  conversation: ConversationDetail;
  messages: HistoryMessage[];
  isLoading: boolean;
  hasOlder: boolean;
  isFetchingOlder: boolean;
  onLoadOlder: () => void;
  customerInitial: string;
}

/**
 * Starts at the newest messages, loads older pages at the top while keeping
 * the scroll anchor, auto-scrolls only when the operator is at the bottom
 * (otherwise offers "New messages"), and sends a coalesced read receipt only
 * while the tab is visible and the newest messages are on screen.
 */
export const MessageList = ({
  workspaceId,
  conversation,
  messages,
  isLoading,
  hasOlder,
  isFetchingOlder,
  onLoadOlder,
  customerInitial,
}: MessageListProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const atBottomRef = useRef(true);
  const anchorRef = useRef<{ oldest: number; fromBottom: number } | null>(null);
  const lastNewestRef = useRef(0);
  const [hasUnseen, setHasUnseen] = useState(false);
  const { pending } = useReplyState(workspaceId, conversation.id);
  const pendingVisible = visiblePending(pending, messages);
  const markRead = useMarkRead(workspaceId);
  const oldestSeq = messages[0]?.seq ?? 0;
  const newestSeq = messages.at(-1)?.seq ?? 0;

  const scrollToBottom = useCallback(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
    atBottomRef.current = true;
    setHasUnseen(false);
  }, []);

  // Older page prepended: restore the distance from the bottom.
  useLayoutEffect(() => {
    const el = scrollRef.current;
    const anchor = anchorRef.current;
    if (el && anchor && oldestSeq < anchor.oldest) {
      el.scrollTop = el.scrollHeight - anchor.fromBottom;
      anchorRef.current = null;
    }
  }, [oldestSeq]);

  // First render of a conversation, new messages, own pending reply.
  useLayoutEffect(() => {
    if (newestSeq === 0 && pendingVisible.length === 0) return;
    const grew = newestSeq > lastNewestRef.current;
    const first = lastNewestRef.current === 0;
    lastNewestRef.current = newestSeq;
    if (first || atBottomRef.current) scrollToBottom();
    else if (grew) setHasUnseen(true);
  }, [newestSeq, pendingVisible.length, scrollToBottom]);

  const { ref: topRef, inView: topVisible } = useInView({ rootMargin: '120px' });
  useEffect(() => {
    if (!topVisible || !hasOlder || isFetchingOlder) return;
    const el = scrollRef.current;
    if (el)
      anchorRef.current = {
        oldest: oldestSeq,
        fromBottom: el.scrollHeight - el.scrollTop,
      };
    onLoadOlder();
  }, [topVisible, hasOlder, isFetchingOlder, oldestSeq, onLoadOlder]);

  // Read receipt: only visible tab + newest messages on screen; coalesced.
  const [readTick, setReadTick] = useState(0);
  const { mutate: sendRead } = markRead;
  useEffect(() => {
    if (newestSeq <= conversation.lastReadSeq) return;
    if (!atBottomRef.current || document.visibilityState !== 'visible') return;
    const timer = setTimeout(
      () => sendRead({ id: conversation.id, lastReadSeq: newestSeq }),
      READ_RECEIPT_DELAY_MS,
    );
    return () => clearTimeout(timer);
  }, [newestSeq, conversation.id, conversation.lastReadSeq, readTick, sendRead]);
  useEffect(() => {
    const onVisible = () => setReadTick((tick) => tick + 1);
    document.addEventListener('visibilitychange', onVisible);
    return () => document.removeEventListener('visibilitychange', onVisible);
  }, []);

  const onScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < NEAR_BOTTOM_PX;
    if (atBottom !== atBottomRef.current) {
      atBottomRef.current = atBottom;
      if (atBottom) {
        setHasUnseen(false);
        setReadTick((tick) => tick + 1);
      }
    }
  };

  return (
    <div className="relative min-h-0 flex-1">
      <div
        ref={scrollRef}
        onScroll={onScroll}
        className="h-full space-y-4 overflow-y-auto p-4"
        role="log"
        aria-live="polite"
        aria-relevant="additions"
      >
        {isLoading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <Skeleton
              key={index}
              className={index % 2 ? 'ml-auto h-12 w-1/2' : 'h-12 w-2/3'}
            />
          ))
        ) : (
          <>
            {hasOlder && (
              <div
                ref={topRef}
                className="text-muted-foreground py-1 text-center text-xs"
              >
                {isFetchingOlder ? 'Loading earlier messages…' : ' '}
              </div>
            )}
            {!hasOlder && messages.length === 0 && pendingVisible.length === 0 && (
              <p className="text-muted-foreground py-8 text-center text-sm">
                No messages in this conversation yet.
              </p>
            )}
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                customerInitial={customerInitial}
              />
            ))}
            {pendingVisible.map((reply) => (
              <PendingReplyBubble
                key={reply.clientMessageId}
                workspaceId={workspaceId}
                conversationId={conversation.id}
                reply={reply}
                escalationId={conversation.activeEscalation?.id ?? null}
              />
            ))}
          </>
        )}
      </div>
      {hasUnseen && (
        <Button
          size="sm"
          className="absolute bottom-3 left-1/2 -translate-x-1/2 gap-1 shadow-md"
          onClick={scrollToBottom}
        >
          <HugeiconsIcon icon={ArrowDown01Icon} strokeWidth={1.75} className="size-3.5" />
          New messages
        </Button>
      )}
    </div>
  );
};
