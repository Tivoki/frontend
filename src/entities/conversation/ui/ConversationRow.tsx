import { cn } from '~/shared/lib';
import { TableCell, TableRow } from '~/shared/ui/kit';
import { CHANNEL_LABELS, STATUS_LABELS, STATUS_STYLES } from '../model/config';
import type { Conversation } from '../model/types';

interface ConversationRowProps {
  conversation: Conversation;
  className?: string;
}

export const ConversationRow = ({ conversation, className }: ConversationRowProps) => {
  return (
    <TableRow
      className={cn(
        'border-border hover:bg-muted/40 border-b transition-colors',
        className,
      )}
    >
      <TableCell className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="bg-muted text-muted-foreground flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-medium">
            {conversation.customerName.charAt(0)}
          </div>
          <div className="min-w-0">
            <p className="text-foreground truncate text-sm font-medium">
              {conversation.customerName}
            </p>
            <p className="text-muted-foreground truncate text-xs">
              {conversation.customerEmail}
            </p>
          </div>
        </div>
      </TableCell>
      <TableCell className="px-4 py-3 whitespace-normal">
        <p className="text-muted-foreground line-clamp-2 max-w-xs text-xs">
          {conversation.lastMessage}
        </p>
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
        <span className="text-muted-foreground text-xs">
          {CHANNEL_LABELS[conversation.channel]}
        </span>
      </TableCell>
      <TableCell className="px-4 py-3 text-right">
        <span className="text-muted-foreground text-xs whitespace-nowrap">
          {conversation.time}
        </span>
      </TableCell>
    </TableRow>
  );
};
