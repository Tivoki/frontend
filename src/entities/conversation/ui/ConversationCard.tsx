import { cn, formatRelativeTime } from '~/shared/lib';
import { visitorInitial, visitorLabel } from '../lib/format';
import type { InboxItem } from '../model/types';
import { ConversationBadgePill } from './ConversationBadgePill';

interface ConversationCardProps {
  conversation: InboxItem;
  isActive?: boolean;
  onClick?: () => void;
}

const PREVIEW_PREFIX: Partial<Record<string, string>> = {
  ASSISTANT: 'AI: ',
  HUMAN_AGENT: 'Team: ',
};

export const ConversationCard = ({
  conversation,
  isActive,
  onClick,
}: ConversationCardProps) => {
  const { lastMessage, unreadCount, activeEscalation } = conversation;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={isActive ? 'true' : undefined}
      className={cn(
        'border-border hover:bg-muted/40 focus-visible:ring-ring/50 w-full border-b px-4 py-3 text-left transition-colors focus-visible:ring-2 focus-visible:outline-none',
        isActive && 'border-l-primary bg-primary/5 border-l-2',
      )}
    >
      <div className="flex items-start gap-3">
        <div className="bg-primary/10 text-primary flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold">
          {visitorInitial(conversation.visitor)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-start justify-between gap-2">
            <p
              className={cn(
                'text-foreground truncate text-sm',
                unreadCount > 0 ? 'font-semibold' : 'font-medium',
              )}
            >
              {visitorLabel(conversation.visitor)}
            </p>
            <time
              dateTime={conversation.activityAt}
              className="text-muted-foreground shrink-0 text-xs"
            >
              {formatRelativeTime(conversation.activityAt)}
            </time>
          </div>
          <p className="text-muted-foreground mb-2 line-clamp-1 text-xs">
            {lastMessage
              ? `${PREVIEW_PREFIX[lastMessage.role] ?? ''}${lastMessage.preview}`
              : 'No messages yet'}
          </p>
          <div className="flex flex-wrap items-center gap-1.5">
            <ConversationBadgePill
              status={conversation.status}
              escalation={activeEscalation}
            />
            {activeEscalation?.assignedTo && (
              <span className="text-muted-foreground truncate text-xs">
                {activeEscalation.assignedTo.name ?? 'Former member'}
              </span>
            )}
            {unreadCount > 0 && (
              <span
                className="bg-primary text-primary-foreground ml-auto inline-flex min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] font-semibold"
                aria-label={`${unreadCount} unread`}
              >
                {unreadCount > 99 ? '99+' : unreadCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </button>
  );
};
