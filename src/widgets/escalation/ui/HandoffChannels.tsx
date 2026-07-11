'use client';

import { useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Add01Icon } from '@hugeicons/core-free-icons';

import type { HandoffChannel } from '~/entities/escalation';
import { HANDOFF_CHANNELS } from '~/entities/escalation';
import { cn } from '~/shared/lib';
import { Button } from '~/shared/ui/kit';
import { HandoffChannelAddSheet } from './HandoffChannelAddSheet';
import { HandoffChannelConfigureSheet } from './HandoffChannelConfigureSheet';

const STATUS_DOT: Record<HandoffChannel['status'], string> = {
  connected: 'bg-success',
  needs_setup: 'bg-amber-500',
};

const STATUS_TEXT: Record<HandoffChannel['status'], string> = {
  connected: 'text-success-foreground',
  needs_setup: 'text-amber-600 dark:text-amber-400',
};

const STATUS_LABEL: Record<HandoffChannel['status'], string> = {
  connected: 'Connected',
  needs_setup: 'Needs setup',
};

const VISIBLE_STATUSES: HandoffChannel['status'][] = ['connected', 'needs_setup'];

export const HandoffChannels = () => {
  const [configuring, setConfiguring] = useState<HandoffChannel | null>(null);
  const [addOpen, setAddOpen] = useState(false);

  const channels = HANDOFF_CHANNELS.filter((c) => VISIBLE_STATUSES.includes(c.status));

  return (
    <>
      <section className="border-border bg-background flex h-95 flex-col rounded-2xl border shadow-xs">
        <div className="shrink-0 px-4 pt-4 sm:px-5 sm:pt-5">
          <h2 className="font-heading text-foreground text-base font-semibold">
            Handoff channels
          </h2>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-3 sm:px-5">
          {channels.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <p className="text-muted-foreground text-sm">No channels connected yet.</p>
            </div>
          ) : (
            <div className="divide-border flex flex-col divide-y">
              {channels.map((channel) => (
                <div
                  key={channel.id}
                  className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
                >
                  <div className="bg-muted flex size-9 shrink-0 items-center justify-center rounded-lg">
                    <HugeiconsIcon
                      icon={channel.icon}
                      strokeWidth={1.75}
                      className="text-foreground size-4"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-foreground text-sm font-medium">{channel.name}</p>
                    <p className="text-muted-foreground truncate text-xs">
                      {channel.description}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-3">
                    <div
                      className={cn(
                        'flex items-center gap-1.5 text-xs font-medium',
                        STATUS_TEXT[channel.status],
                      )}
                    >
                      <span
                        className={cn(
                          'size-1.5 rounded-full',
                          STATUS_DOT[channel.status],
                        )}
                      />
                      <span className="hidden sm:inline">
                        {STATUS_LABEL[channel.status]}
                      </span>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="shrink-0"
                      onClick={() => setConfiguring(channel)}
                    >
                      Configure
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-border shrink-0 border-t px-4 py-3 sm:px-5">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setAddOpen(true)}
          >
            <HugeiconsIcon icon={Add01Icon} strokeWidth={1.75} className="size-4" />
            Add channel
          </Button>
        </div>
      </section>

      <HandoffChannelConfigureSheet
        channel={configuring}
        onClose={() => setConfiguring(null)}
      />
      <HandoffChannelAddSheet open={addOpen} onClose={() => setAddOpen(false)} />
    </>
  );
};
