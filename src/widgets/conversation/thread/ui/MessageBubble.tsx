import { formatMessageTime } from '~/entities/conversation';
import type { HistoryMessage } from '~/entities/conversation';
import { cn } from '~/shared/lib';

interface MessageBubbleProps {
  message: HistoryMessage;
  customerInitial: string;
}

const authorLabel = (message: HistoryMessage): string | null => {
  if (message.role === 'ASSISTANT') return 'AI assistant';
  if (message.role !== 'HUMAN_AGENT') return null;
  return (
    message.author.name ?? (message.author.type === 'EXTERNAL' ? 'Telegram' : 'Team')
  );
};

export const MessageBubble = ({ message, customerInitial }: MessageBubbleProps) => {
  if (message.role === 'SYSTEM') {
    return (
      <p className="text-muted-foreground text-center text-xs [contain-intrinsic-size:auto_24px] [content-visibility:auto]">
        {message.content} · {formatMessageTime(message.createdAt)}
      </p>
    );
  }
  const isCustomer = message.role === 'VISITOR';
  const isAi = message.role === 'ASSISTANT';
  const label = authorLabel(message);

  return (
    <div
      className={cn(
        'flex gap-2 [contain-intrinsic-size:auto_72px] [content-visibility:auto]',
        !isCustomer && 'flex-row-reverse',
      )}
    >
      <div
        className={cn(
          'flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold',
          isCustomer
            ? 'bg-muted text-muted-foreground'
            : isAi
              ? 'bg-primary/10 text-primary'
              : 'bg-success-subtle text-success-foreground',
        )}
        aria-hidden
      >
        {isCustomer
          ? customerInitial
          : isAi
            ? 'AI'
            : (label?.charAt(0).toUpperCase() ?? 'A')}
      </div>
      <div
        className={cn(
          'max-w-[70%] rounded-2xl px-4 py-2.5 text-sm',
          isCustomer
            ? 'bg-muted text-foreground rounded-tl-sm'
            : 'bg-primary text-primary-foreground rounded-tr-sm',
        )}
      >
        {label && (
          <p className="text-primary-foreground/80 mb-0.5 text-xs font-medium">{label}</p>
        )}
        <p className="leading-relaxed break-words whitespace-pre-wrap">
          {message.content}
        </p>
        <time
          dateTime={message.createdAt}
          className={cn(
            'mt-1 block text-xs',
            isCustomer ? 'text-muted-foreground' : 'text-primary-foreground/70',
          )}
        >
          {formatMessageTime(message.createdAt)}
        </time>
      </div>
    </div>
  );
};
