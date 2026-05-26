import { ConversationRow } from '~/entities/conversation';
import type { Conversation } from '~/entities/conversation';
import { cn } from '~/shared/lib';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '~/shared/ui/kit';
import Link from 'next/link';

const statusStyles: Record<Conversation['status'], string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  active: 'bg-blue-100 text-blue-700',
  resolved: 'bg-green-100 text-green-700',
  escalated: 'bg-red-100 text-red-700',
};

const statusLabels: Record<Conversation['status'], string> = {
  pending: 'Pending',
  active: 'Active',
  resolved: 'Resolved',
  escalated: 'Escalated',
};

const channelLabels: Record<Conversation['channel'], string> = {
  email: 'Email',
  webchat: 'Webchat',
  telegram: 'Telegram',
  intercom: 'Intercom',
};

const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: '1',
    customerName: 'Jennifer Smith',
    customerEmail: 'jennifer.smith@acme.com',
    lastMessage: "Hi, I'm having trouble with my account. Can you help?",
    status: 'active',
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
    lastMessage: "Thanks for your help! The issue has been resolved.",
    status: 'resolved',
    channel: 'telegram',
    time: '1h ago',
  },
  {
    id: '4',
    customerName: 'Marcus Lee',
    customerEmail: 'marcus.lee@business.com',
    lastMessage: "I need to speak with a manager urgently about my subscription.",
    status: 'escalated',
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
  return (
    <div className={cn('min-w-0 rounded-xl border border-border bg-background', className)}>
      <div className="flex items-center justify-between gap-3 border-b border-border px-3 py-3 sm:px-4">
        <h3 className="text-sm font-semibold text-foreground">Recent Conversations</h3>
        <Link href='/conversations' className="shrink-0 text-xs font-medium text-primary hover:underline">
          View All
        </Link>
      </div>

      <div className="divide-y divide-border md:hidden">
        {conversations.map((conversation) => (
          <article key={conversation.id} className="px-3 py-3">
            <div className="flex min-w-0 items-start gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground">
                {conversation.customerName.charAt(0)}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex min-w-0 items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">{conversation.customerName}</p>
                    <p className="truncate text-xs text-muted-foreground">{conversation.customerEmail}</p>
                  </div>
                  <span className="shrink-0 text-xs text-muted-foreground">{conversation.time}</span>
                </div>

                <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">{conversation.lastMessage}</p>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span
                    className={cn(
                      'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                      statusStyles[conversation.status],
                    )}
                  >
                    {statusLabels[conversation.status]}
                  </span>
                  <span className="text-xs text-muted-foreground">{channelLabels[conversation.channel]}</span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="hidden md:block">
        <Table className="min-w-150">
          <TableHeader>
            <TableRow className="border-b border-border hover:bg-transparent">
              <TableHead className="h-auto px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">
                Name
              </TableHead>
              <TableHead className="h-auto px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">
                Message
              </TableHead>
              <TableHead className="h-auto px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">
                Status
              </TableHead>
              <TableHead className="h-auto px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">
                Channel
              </TableHead>
              <TableHead className="h-auto px-4 py-2.5 text-right text-xs font-medium text-muted-foreground">
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
