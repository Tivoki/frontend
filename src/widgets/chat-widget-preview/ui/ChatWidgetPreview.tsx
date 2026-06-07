'use client';

import { useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Moon02Icon, Sun01Icon } from '@hugeicons/core-free-icons';

import { cn } from '~/shared/lib';
import { Button } from '~/shared/ui/kit';
import type { WidgetConfig } from '~/entities/widget';

import type { DeviceType } from '../model/types';
import { DeviceSwitcher } from './DeviceSwitcher';
import { MockWebsiteContent } from './MockWebsiteContent';
import { WidgetPopup } from './WidgetPopup';

const FRAME_CLASS: Record<DeviceType, string> = {
  desktop: 'w-full',
  tablet: 'mx-auto max-w-[620px] rounded-b-2xl border-x border-border shadow-lg',
  mobile: 'mx-auto max-w-[360px] rounded-b-3xl border-x border-border shadow-xl',
};

interface ChatWidgetPreviewProps {
  config: WidgetConfig;
}

export const ChatWidgetPreview = ({ config }: ChatWidgetPreviewProps) => {
  const [device, setDevice] = useState<DeviceType>('desktop');
  const [manualTheme, setManualTheme] = useState<'light' | 'dark'>('light');
  const previewTheme: 'light' | 'dark' = config.theme === 'auto' ? manualTheme : config.theme;

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-border bg-background">
      <div className="flex shrink-0 items-center gap-3 border-b border-border bg-muted/30 px-4 py-2.5">
        <div className="hidden shrink-0 items-center gap-1.5 sm:flex">
          <div className="size-2.5 rounded-full bg-[#ff5f57]" />
          <div className="size-2.5 rounded-full bg-[#febc2e]" />
          <div className="size-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex min-w-0 flex-1 items-center justify-center">
          <div className="flex h-5 w-full max-w-48 min-w-0 items-center justify-center truncate rounded-full bg-muted/80 px-3 text-[10px] text-muted-foreground">
            yourwebsite.com
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <div className="flex items-center gap-0.5 rounded-md border border-border bg-muted/40 p-0.5">
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className={cn(
                'size-6 rounded-sm',
                previewTheme === 'light'
                  ? 'bg-background text-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground',
              )}
              onClick={() => setManualTheme('light')}
              aria-label="Preview light theme"
            >
              <HugeiconsIcon icon={Sun01Icon} strokeWidth={1.75} className="size-3.5" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className={cn(
                'size-6 rounded-sm',
                previewTheme === 'dark'
                  ? 'bg-background text-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground',
              )}
              onClick={() => setManualTheme('dark')}
              aria-label="Preview dark theme"
            >
              <HugeiconsIcon icon={Moon02Icon} strokeWidth={1.75} className="size-3.5" />
            </Button>
          </div>
          <DeviceSwitcher value={device} onChange={setDevice} />
        </div>
      </div>

      <div className="overflow-hidden bg-muted/20" style={{ minHeight: 480 }}>
        <div className={cn('relative transition-all duration-300', FRAME_CLASS[device])}>
          <MockWebsiteContent device={device} />
          <div
            className={cn(
              'absolute bottom-5 max-w-[calc(100%-2.5rem)]',
              config.position === 'bottom-left' ? 'left-5' : 'right-5',
            )}
          >
            <WidgetPopup config={config} previewTheme={previewTheme} />
          </div>
        </div>
      </div>
    </div>
  );
};
