import { cn } from '~/shared/lib';
import type { Conversation, ConversationStatus, ConversationChannel } from '../model/types';

const statusStyles: Record<ConversationStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  active: 'bg-blue-100 text-blue-700',
  resolved: 'bg-green-100 text-green-700',
  escalated: 'bg-red-100 text-red-700',
};

const statusLabels: Record<ConversationStatus, string> = {
  pending: 'Pending',
  active: 'Active',
  resolved: 'Resolved',
  escalated: 'Escalated',
};

const channelLabels: Record<ConversationChannel, string> = {
  email: 'Email',
  webchat: 'Webchat',
  telegram: 'Telegram',
  intercom: 'Intercom',
};

interface ConversationRowProps {
  conversation: Conversation;
  className?: string;
}

export const ConversationRow = ({ conversation, className }: ConversationRowProps) => {
  return (
    <tr className={cn('border-b border-border last:border-0 hover:bg-muted/40 transition-colors', className)}>
      <td className="py-3 px-4">
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground shrink-0">
            {conversation.customerName.charAt(0)}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{conversation.customerName}</p>
            <p className="text-xs text-muted-foreground truncate">{conversation.customerEmail}</p>
          </div>
        </div>
      </td>
      <td className="py-3 px-4">
        <p className="text-sm text-muted-foreground line-clamp-2 max-w-xs">{conversation.lastMessage}</p>
      </td>
      <td className="py-3 px-4">
        <span className={cn('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium', statusStyles[conversation.status])}>
          {statusLabels[conversation.status]}
        </span>
      </td>
      <td className="py-3 px-4">
        <span className="text-sm text-muted-foreground">{channelLabels[conversation.channel]}</span>
      </td>
      <td className="py-3 px-4 text-right">
        <span className="text-xs text-muted-foreground whitespace-nowrap">{conversation.time}</span>
      </td>
    </tr>
  );
};
