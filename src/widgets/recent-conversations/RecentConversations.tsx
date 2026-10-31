'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import {
  CHANNEL_LABELS,
  ConversationBadgePill,
  ConversationRow,
  useInbox,
  visitorInitial,
  visitorLabel,
} from '~/entities/conversation';
import { useActiveWorkspaceId, useWorkspaceHref } from '~/features/switch-workspace';
import { cn, formatRelativeTime } from '~/shared/lib';
import {
  Skeleton,
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '~/shared/ui/kit';

const RECENT_LIMIT = 5;

interface RecentConversationsProps {
  className?: string;
}

export const RecentConversations = ({ className }: RecentConversationsProps) => {
  const router = useRouter();
  const workspaceHref = useWorkspaceHref();
  const workspaceId = useActiveWorkspaceId();
  const query = useMemo(() => ({ filter: 'all' as const }), []);
  const inbox = useInbox(workspaceId, query);
  const conversations = (inbox.data?.pages[0]?.items ?? []).slice(0, RECENT_LIMIT);
  const open = (id: string) => router.push(workspaceHref(`conversations?id=${id}`));

  return (
    <div
      className={cn('border-border bg-background min-w-0 rounded-xl border', className)}
    >
      <div className="border-border flex items-center justify-between gap-3 border-b px-3 py-3 sm:px-4">
        <h3 className="text-foreground text-sm font-semibold">Recent Conversations</h3>
        <Link
          href={workspaceHref('conversations')}
          className="text-primary shrink-0 text-xs font-medium hover:underline"
        >
          View All
        </Link>
      </div>

      {inbox.isPending ? (
        <div className="space-y-3 p-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-10 w-full" />
          ))}
        </div>
      ) : conversations.length === 0 ? (
        <p className="text-muted-foreground p-6 text-center text-sm">
          {inbox.isError ? 'Couldn’t load conversations.' : 'No conversations yet.'}
        </p>
      ) : (
        <>
          <div className="divide-border divide-y md:hidden">
            {conversations.map((conversation) => (
              <article
                key={conversation.id}
                className="hover:bg-muted/40 cursor-pointer px-3 py-3"
                onClick={() => open(conversation.id)}
              >
                <div className="flex min-w-0 items-start gap-3">
                  <div className="bg-muted text-muted-foreground flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-medium">
                    {visitorInitial(conversation.visitor)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex min-w-0 items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-foreground truncate text-sm font-medium">
                          {visitorLabel(conversation.visitor)}
                        </p>
                        <p className="text-muted-foreground truncate text-xs">
                          {conversation.visitor.email ?? '—'}
                        </p>
                      </div>
                      <span className="text-muted-foreground shrink-0 text-xs">
                        {formatRelativeTime(conversation.activityAt)}
                      </span>
                    </div>

                    <p className="text-muted-foreground mt-2 line-clamp-2 text-xs">
                      {conversation.lastMessage?.preview ?? 'No messages yet'}
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <ConversationBadgePill
                        status={conversation.status}
                        escalation={conversation.activeEscalation}
                        className="px-2.5"
                      />
                      <span className="text-muted-foreground text-xs">
                        {CHANNEL_LABELS.WEBCHAT}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="hidden md:block">
            <Table className="min-w-150">
              <TableHeader>
                <TableRow className="border-border border-b hover:bg-transparent">
                  <TableHead className="text-muted-foreground h-auto px-4 py-2.5 text-left text-xs font-medium">
                    Name
                  </TableHead>
                  <TableHead className="text-muted-foreground h-auto px-4 py-2.5 text-left text-xs font-medium">
                    Message
                  </TableHead>
                  <TableHead className="text-muted-foreground h-auto px-4 py-2.5 text-left text-xs font-medium">
                    Status
                  </TableHead>
                  <TableHead className="text-muted-foreground h-auto px-4 py-2.5 text-left text-xs font-medium">
                    Channel
                  </TableHead>
                  <TableHead className="text-muted-foreground h-auto px-4 py-2.5 text-right text-xs font-medium">
                    Time
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {conversations.map((conversation) => (
                  <ConversationRow
                    key={conversation.id}
                    conversation={conversation}
                    onClick={() => open(conversation.id)}
                  />
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      )}
    </div>
  );
};
