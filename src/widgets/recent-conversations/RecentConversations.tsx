'use client';

import { ConversationRow } from '~/entities/conversation';
import type { Conversation } from '~/entities/conversation';
import { STATUS_STYLES, STATUS_LABELS, CHANNEL_LABELS } from '~/entities/conversation';
import { useWorkspaceHref } from '~/features/switch-workspace';
import { cn } from '~/shared/lib';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '~/shared/ui/kit';
import Link from 'next/link';

const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: '1',
    customerName: 'Jennifer Smith',
    customerEmail: 'jennifer.smith@acme.com',
    lastMessage: "Hi, I'm having trouble with my account. Can you help?",
    status: 'open',
    channel: 'webchat',
    time: '2m ago',
  },
  {
    id: '2',
    customerName: 'Robert Wilson',
    customerEmail: 'r.wilson@example.com',
    lastMessage: "What's the status of my refund? I submitted it last week.",
    status: 'pending',
    channel: 'email',
    time: '15m ago',
  },
  {
    id: '3',
    customerName: 'Amanda Torres',
    customerEmail: 'amanda.t@company.io',
    lastMessage: 'Thanks for your help! The issue has been resolved.',
    status: 'resolved',
    channel: 'telegram',
    time: '1h ago',
  },
  {
    id: '4',
    customerName: 'Marcus Lee',
    customerEmail: 'marcus.lee@business.com',
    lastMessage: 'I need to speak with a manager urgently about my subscription.',
    status: 'closed',
    channel: 'intercom',
    time: '2h ago',
  },
];

interface RecentConversationsProps {
  conversations?: Conversation[];
  className?: string;
}

export const RecentConversations = ({
  conversations = MOCK_CONVERSATIONS,
  className,
}: RecentConversationsProps) => {
  const workspaceHref = useWorkspaceHref();

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

      <div className="divide-border divide-y md:hidden">
        {conversations.map((conversation) => (
          <article key={conversation.id} className="px-3 py-3">
            <div className="flex min-w-0 items-start gap-3">
              <div className="bg-muted text-muted-foreground flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-medium">
                {conversation.customerName.charAt(0)}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex min-w-0 items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-foreground truncate text-sm font-medium">
                      {conversation.customerName}
                    </p>
                    <p className="text-muted-foreground truncate text-xs">
                      {conversation.customerEmail}
                    </p>
                  </div>
                  <span className="text-muted-foreground shrink-0 text-xs">
                    {conversation.time}
                  </span>
                </div>

                <p className="text-muted-foreground mt-2 line-clamp-2 text-xs">
                  {conversation.lastMessage}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span
                    className={cn(
                      'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                      STATUS_STYLES[conversation.status],
                    )}
                  >
                    {STATUS_LABELS[conversation.status]}
                  </span>
                  <span className="text-muted-foreground text-xs">
                    {CHANNEL_LABELS[conversation.channel]}
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
              <ConversationRow key={conversation.id} conversation={conversation} />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
