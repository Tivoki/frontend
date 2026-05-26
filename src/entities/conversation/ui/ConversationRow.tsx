import { cn } from '~/shared/lib';
import { TableCell, TableRow } from '~/shared/ui/kit';
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
    <TableRow className={cn('border-b border-border transition-colors hover:bg-muted/40', className)}>
      <TableCell className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground">
            {conversation.customerName.charAt(0)}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-foreground">{conversation.customerName}</p>
            <p className="truncate text-xs text-muted-foreground">{conversation.customerEmail}</p>
          </div>
        </div>
      </TableCell>
      <TableCell className="px-4 py-3 whitespace-normal">
        <p className="text-xs text-muted-foreground line-clamp-2 max-w-xs">{conversation.lastMessage}</p>
      </TableCell>
      <TableCell className="px-4 py-3">
        <span
          className={cn(
            'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
            statusStyles[conversation.status],
          )}
        >
          {statusLabels[conversation.status]}
        </span>
      </TableCell>
      <TableCell className="px-4 py-3">
        <span className="text-xs text-muted-foreground">{channelLabels[conversation.channel]}</span>
      </TableCell>
      <TableCell className="px-4 py-3 text-right">
        <span className="text-xs text-muted-foreground whitespace-nowrap">{conversation.time}</span>
      </TableCell>
    </TableRow>
  );
};
