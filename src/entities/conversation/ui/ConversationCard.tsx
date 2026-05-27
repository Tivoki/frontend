import { cn } from '~/shared/lib';
import { STATUS_STYLES, STATUS_LABELS } from '../model/config';
import type { Conversation } from '../model/types';

interface ConversationCardProps {
  conversation: Conversation;
  isActive?: boolean;
  onClick?: () => void;
}

export const ConversationCard = ({ conversation, isActive, onClick }: ConversationCardProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'w-full border-b border-border px-4 py-3 text-left transition-colors hover:bg-muted/40',
        isActive && 'border-l-2 border-l-primary bg-primary/5',
      )}
    >
      <div className="flex items-start gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
          {conversation.customerName.charAt(0)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-start justify-between gap-2">
            <p className="truncate text-sm font-medium text-foreground">{conversation.customerName}</p>
            <span className="shrink-0 text-xs text-muted-foreground">{conversation.time}</span>
          </div>
          <p className="mb-2 line-clamp-1 text-xs text-muted-foreground">{conversation.lastMessage}</p>
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
