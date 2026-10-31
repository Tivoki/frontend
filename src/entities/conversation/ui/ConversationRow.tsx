import { cn, formatRelativeTime } from '~/shared/lib';
import { TableCell, TableRow } from '~/shared/ui/kit';
import { visitorInitial, visitorLabel } from '../lib/format';
import { CHANNEL_LABELS } from '../model/config';
import type { InboxItem } from '../model/types';
import { ConversationBadgePill } from './ConversationBadgePill';

interface ConversationRowProps {
  conversation: InboxItem;
  className?: string;
  onClick?: () => void;
}

export const ConversationRow = ({
  conversation,
  className,
  onClick,
}: ConversationRowProps) => {
  return (
    <TableRow
      onClick={onClick}
      className={cn(
        'border-border hover:bg-muted/40 border-b transition-colors',
        onClick && 'cursor-pointer',
        className,
      )}
    >
      <TableCell className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="bg-muted text-muted-foreground flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-medium">
            {visitorInitial(conversation.visitor)}
          </div>
          <div className="min-w-0">
            <p className="text-foreground truncate text-sm font-medium">
              {visitorLabel(conversation.visitor)}
            </p>
            <p className="text-muted-foreground truncate text-xs">
              {conversation.visitor.email ?? '—'}
            </p>
          </div>
        </div>
      </TableCell>
      <TableCell className="px-4 py-3 whitespace-normal">
        <p className="text-muted-foreground line-clamp-2 max-w-xs text-xs">
          {conversation.lastMessage?.preview ?? 'No messages yet'}
        </p>
      </TableCell>
      <TableCell className="px-4 py-3">
        <ConversationBadgePill
          status={conversation.status}
          escalation={conversation.activeEscalation}
          className="px-2.5"
        />
      </TableCell>
      <TableCell className="px-4 py-3">
        <span className="text-muted-foreground text-xs">{CHANNEL_LABELS.WEBCHAT}</span>
      </TableCell>
      <TableCell className="px-4 py-3 text-right">
        <time
          dateTime={conversation.activityAt}
          className="text-muted-foreground text-xs whitespace-nowrap"
        >
          {formatRelativeTime(conversation.activityAt)}
        </time>
      </TableCell>
    </TableRow>
  );
};
