import { ConversationRow } from '~/entities/conversation';
import type { Conversation } from '~/entities/conversation';
import { cn } from '~/shared/lib';

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
    <div className={cn('rounded-xl border border-border bg-background', className)}>
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <h3 className="text-sm font-semibold text-foreground">Recent Conversations</h3>
        <button className="text-xs text-primary hover:underline">View All</button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-b border-border">
              <th className="py-2.5 px-4 text-left text-xs font-medium text-muted-foreground">Name</th>
              <th className="py-2.5 px-4 text-left text-xs font-medium text-muted-foreground">Message</th>
              <th className="py-2.5 px-4 text-left text-xs font-medium text-muted-foreground">Status</th>
              <th className="py-2.5 px-4 text-left text-xs font-medium text-muted-foreground">Channel</th>
              <th className="py-2.5 px-4 text-right text-xs font-medium text-muted-foreground">Time</th>
            </tr>
          </thead>
          <tbody>
            {conversations.map((conversation) => (
              <ConversationRow key={conversation.id} conversation={conversation} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
