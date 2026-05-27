import { cn } from '~/shared/lib';
import { TableCell, TableRow } from '~/shared/ui/kit';
import { STATUS_STYLES, STATUS_LABELS, CHANNEL_LABELS } from '../model/config';
import type { Conversation } from '../model/types';

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
        <p className="line-clamp-2 max-w-xs text-xs text-muted-foreground">{conversation.lastMessage}</p>
      </TableCell>
      <TableCell className="px-4 py-3">
        <span
          className={cn(
            'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
            STATUS_STYLES[conversation.status],
          )}
        >
          {STATUS_LABELS[conversation.status]}
        </span>
      </TableCell>
      <TableCell className="px-4 py-3">
        <span className="text-xs text-muted-foreground">{CHANNEL_LABELS[conversation.channel]}</span>
      </TableCell>
      <TableCell className="px-4 py-3 text-right">
        <span className="whitespace-nowrap text-xs text-muted-foreground">{conversation.time}</span>
      </TableCell>
    </TableRow>
  );
};
