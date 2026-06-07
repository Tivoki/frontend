'use client';

import type { ConversationMessage } from '~/entities/conversation';
import { cn } from '~/shared/lib';

interface MessageBubbleProps {
  message: ConversationMessage;
  customerInitial: string;
}

export const MessageBubble = ({ message, customerInitial }: MessageBubbleProps) => {
  const isOutbound = message.role !== 'customer';

  return (
    <div className={cn('flex gap-2', isOutbound && 'flex-row-reverse')}>
      <div
        className={cn(
          'flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold',
          message.role === 'customer'
            ? 'bg-muted text-muted-foreground'
            : message.role === 'ai'
              ? 'bg-primary/10 text-primary'
              : 'bg-success-subtle text-success-foreground',
        )}
      >
        {message.role === 'customer' ? customerInitial : message.role === 'ai' ? 'AI' : 'A'}
      </div>
      <div
        className={cn(
          'max-w-[70%] rounded-2xl px-4 py-2.5 text-sm',
          message.role === 'customer'
            ? 'rounded-tl-sm bg-muted text-foreground'
            : 'rounded-tr-sm bg-primary text-primary-foreground',
        )}
      >
        <p className="leading-relaxed">{message.content}</p>
        <p
          className={cn(
            'mt-1 text-xs',
            message.role === 'customer' ? 'text-muted-foreground' : 'text-primary-foreground/70',
          )}
        >
          {message.timestamp}
        </p>
      </div>
    </div>
  );
};
