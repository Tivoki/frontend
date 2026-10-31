'use client';

import { AttachmentIcon, SentIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import type { ReactNode } from 'react';
import { cn } from '~/shared/lib';
import {
  Button,
  buttonVariants,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '~/shared/ui/kit';
import { updateReplyState, useReplyState } from '../model/reply-store';
import { MAX_REPLY_LENGTH, useSendReply } from '../model/use-send-reply';

interface ReplyComposerProps {
  workspaceId: string;
  conversationId: string;
  /** Active escalation the reply belongs to; null = replies not possible now. */
  escalationId: string | null;
  canReply: boolean;
  /** Why the composer is read-only, with an optional action (e.g. Take over). */
  disabledReason?: ReactNode;
}

export const ReplyComposer = ({
  workspaceId,
  conversationId,
  escalationId,
  canReply,
  disabledReason,
}: ReplyComposerProps) => {
  const { draft } = useReplyState(workspaceId, conversationId);
  const { send } = useSendReply(workspaceId, conversationId);
  const enabled = canReply && escalationId !== null;
  const trimmed = draft.trim();
  const tooLong = trimmed.length > MAX_REPLY_LENGTH;

  const handleSend = () => {
    if (!enabled || !trimmed || tooLong) return;
    send(escalationId);
  };

  return (
    <div className="border-border border-t p-3">
      {!enabled && disabledReason && (
        <div className="bg-muted/50 text-muted-foreground mb-2 flex flex-wrap items-center justify-between gap-2 rounded-md px-3 py-2 text-xs">
          {disabledReason}
        </div>
      )}
      <div
        className={cn(
          'border-input bg-background focus-within:border-ring focus-within:ring-ring/50 rounded-lg border focus-within:ring-2',
          !enabled && 'opacity-60',
        )}
      >
        <Tabs value="reply">
          <TabsList variant="line" className="px-3">
            <TabsTrigger
              value="reply"
              className="text-muted-foreground after:bg-primary data-active:text-primary text-xs font-medium"
            >
              Reply
            </TabsTrigger>
            <Tooltip>
              <TooltipTrigger asChild>
                {/* span: disabled triggers don't emit pointer events for the tooltip */}
                <span tabIndex={0}>
                  <TabsTrigger
                    value="note"
                    disabled
                    className="text-muted-foreground text-xs font-medium"
                  >
                    Note
                  </TabsTrigger>
                </span>
              </TooltipTrigger>
              <TooltipContent>Internal notes are not available yet</TooltipContent>
            </Tooltip>
          </TabsList>
          <TabsContent value="reply" className="mt-0">
            <Textarea
              aria-label="Reply message"
              placeholder={enabled ? 'Type your reply… (Ctrl+Enter to send)' : ''}
              value={draft}
              disabled={!enabled}
              maxLength={MAX_REPLY_LENGTH + 500}
              onChange={(event) =>
                updateReplyState(workspaceId, conversationId, (state) => ({
                  ...state,
                  draft: event.target.value,
                }))
              }
              onKeyDown={(event) => {
                if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
                  event.preventDefault();
                  handleSend();
                }
              }}
              className="h-18 resize-none border-0 p-3 text-sm focus-visible:ring-0"
            />
          </TabsContent>
        </Tabs>
        <div className="flex items-center justify-between gap-2 px-3 pb-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <span
                tabIndex={0}
                aria-disabled="true"
                className={cn(
                  buttonVariants({ variant: 'ghost', size: 'icon-sm' }),
                  'text-muted-foreground cursor-not-allowed opacity-50',
                )}
              >
                <HugeiconsIcon
                  icon={AttachmentIcon}
                  strokeWidth={1.75}
                  className="size-4"
                />
                <span className="sr-only">Attach file (not available yet)</span>
              </span>
            </TooltipTrigger>
            <TooltipContent>Attachments are not available yet</TooltipContent>
          </Tooltip>
          <div className="flex items-center gap-2">
            {trimmed.length > MAX_REPLY_LENGTH - 200 && (
              <span
                className={cn(
                  'text-xs',
                  tooLong ? 'text-destructive' : 'text-muted-foreground',
                )}
              >
                {trimmed.length}/{MAX_REPLY_LENGTH}
              </span>
            )}
            <Button
              size="sm"
              disabled={!enabled || !trimmed || tooLong}
              onClick={handleSend}
              className="gap-1.5"
            >
              <HugeiconsIcon icon={SentIcon} strokeWidth={1.75} className="size-4" />
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
