'use client';

import { useId, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { AttachmentIcon, SentIcon } from '@hugeicons/core-free-icons';
import { cn } from '~/shared/lib';
import {
  Button,
  buttonVariants,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
} from '~/shared/ui/kit';

interface ReplyComposerProps {
  onSend?: (text: string, type: 'reply' | 'note') => void;
}

export const ReplyComposer = ({ onSend }: ReplyComposerProps) => {
  const [text, setText] = useState('');
  const [activeTab, setActiveTab] = useState<'reply' | 'note'>('reply');
  const attachmentInputId = useId();

  const handleSend = () => {
    if (!text.trim()) return;
    onSend?.(text, activeTab);
    setText('');
  };

  return (
    <div className="border-border border-t p-3">
      <div className="border-input bg-background focus-within:border-ring focus-within:ring-ring/50 rounded-lg border focus-within:ring-2">
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as 'reply' | 'note')}
        >
          <TabsList variant="line" className="px-3">
            {(['reply', 'note'] as const).map((t) => (
              <TabsTrigger
                key={t}
                value={t}
                className="text-muted-foreground after:bg-primary data-active:text-primary text-xs font-medium capitalize"
              >
                {t}
              </TabsTrigger>
            ))}
          </TabsList>
          {(['reply', 'note'] as const).map((t) => (
            <TabsContent key={t} value={t} className="mt-0">
              <Textarea
                aria-label={t === 'reply' ? 'Reply message' : 'Internal note'}
                placeholder={t === 'reply' ? 'Type your reply…' : 'Add an internal note…'}
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="h-18 resize-none border-0 p-3 text-sm focus-visible:ring-0"
              />
            </TabsContent>
          ))}
        </Tabs>
        <div className="flex items-center justify-between px-3 pb-2">
          <input
            id={attachmentInputId}
            type="file"
            className="peer sr-only"
            aria-label="Attach file"
          />
          <label
            htmlFor={attachmentInputId}
            className={cn(
              buttonVariants({ variant: 'ghost', size: 'icon-sm' }),
              'text-muted-foreground peer-focus-visible:border-ring peer-focus-visible:ring-ring/50 peer-focus-visible:ring-3',
            )}
          >
            <HugeiconsIcon icon={AttachmentIcon} strokeWidth={1.75} className="size-4" />
            <span className="sr-only">Attach file</span>
          </label>
          <Button
            size="sm"
            disabled={!text.trim()}
            onClick={handleSend}
            className="gap-1.5"
          >
            <HugeiconsIcon icon={SentIcon} strokeWidth={1.75} className="size-4" />
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};
