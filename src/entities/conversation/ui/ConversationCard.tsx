import { cn } from '~/shared/lib';
import { STATUS_LABELS, STATUS_STYLES } from '../model/config';
import type { Conversation } from '../model/types';

interface ConversationCardProps {
  conversation: Conversation;
  isActive?: boolean;
  onClick?: () => void;
}

export const ConversationCard = ({
  conversation,
  isActive,
  onClick,
}: ConversationCardProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'border-border hover:bg-muted/40 w-full border-b px-4 py-3 text-left transition-colors',
        isActive && 'border-l-primary bg-primary/5 border-l-2',
      )}
    >
      <div className="flex items-start gap-3">
        <div className="bg-primary/10 text-primary flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold">
          {conversation.customerName.charAt(0)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-start justify-between gap-2">
            <p className="text-foreground truncate text-sm font-medium">
              {conversation.customerName}
            </p>
            <span className="text-muted-foreground shrink-0 text-xs">
              {conversation.time}
            </span>
          </div>
          <p className="text-muted-foreground mb-2 line-clamp-1 text-xs">
            {conversation.lastMessage}
          </p>
          <span
            className={cn(
              'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
              STATUS_STYLES[conversation.status],
            )}
          >
            {STATUS_LABELS[conversation.status]}
          </span>
        </div>
      </div>
    </button>
  );
};
