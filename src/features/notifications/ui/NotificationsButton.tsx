'use client';

import { Notification01Icon, Tick02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useState } from 'react';
import { cn } from '~/shared/lib';
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Separator,
} from '~/shared/ui/kit';
import type { Notification } from '../model/types';

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    kind: 'message',
    title: 'New message from Anna K.',
    body: "Hi, I still haven't received my ticket refund… dsa dsa ds 123 das",
    time: '2 min ago',
    read: false,
  },
  {
    id: '2',
    kind: 'ticket',
    title: 'Ticket #4821 assigned to you',
    body: 'Flight cancellation — passenger Müller, Josef',
    time: '14 min ago',
    read: false,
  },
  {
    id: '3',
    kind: 'mention',
    title: 'You were mentioned',
    body: '@you can you handle this escalation?',
    time: '1 hr ago',
    read: false,
  },
  {
    id: '4',
    kind: 'system',
    title: 'Knowledge base updated',
    body: 'Refund policy v3.2 published by admin',
    time: '3 hr ago',
    read: true,
  },
  {
    id: '5',
    kind: 'ticket',
    title: 'Ticket #4799 resolved',
    body: 'Closed automatically after 72 h inactivity',
    time: 'Yesterday',
    read: true,
  },
];

const KIND_COLORS: Record<Notification['kind'], string> = {
  message: 'bg-info/15 text-info-foreground',
  ticket: 'bg-warning/15 text-warning-foreground',
  mention: 'bg-purple/15 text-purple-foreground',
  system: 'bg-muted text-muted-foreground',
};

const KIND_LABEL: Record<Notification['kind'], string> = {
  message: 'MSG',
  ticket: 'TKT',
  mention: '@',
  system: 'SYS',
};

export const NotificationsButton = () => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<Notification[]>(MOCK_NOTIFICATIONS);

  const unreadCount = items.filter((n) => !n.read).length;

  const markRead = (id: string) =>
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));

  const markAllRead = () => setItems((prev) => prev.map((n) => ({ ...n, read: true })));

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground relative rounded-full"
          aria-label="Notifications"
        >
          <HugeiconsIcon
            icon={Notification01Icon}
            strokeWidth={1.75}
            className="size-5"
          />
          {unreadCount > 0 && (
            <span className="bg-destructive absolute top-1 right-1 size-2 rounded-full">
              <span className="sr-only">{unreadCount} unread</span>
            </span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent align="end" sideOffset={8} className="w-60 p-0 md:w-80">
        <div className="flex items-center justify-between px-3 py-2.5">
          <div className="flex items-center gap-2">
            <span className="text-foreground text-sm font-semibold">Notifications</span>
            {unreadCount > 0 && (
              <span className="bg-primary text-primary-foreground flex size-4 items-center justify-center rounded-full text-[10px] font-medium">
                {unreadCount}
              </span>
            )}
          </div>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="xs"
              onClick={markAllRead}
              className="text-muted-foreground"
            >
              <HugeiconsIcon icon={Tick02Icon} strokeWidth={2} className="size-3" />
              Mark all read
            </Button>
          )}
        </div>

        <Separator />

        <div className="max-h-80 overflow-y-auto">
          {items.length === 0 ? (
            <p className="text-muted-foreground py-8 text-center text-sm">
              All caught up
            </p>
          ) : (
            items.map((n) => (
              <button
                key={n.id}
                type="button"
                disabled={n.read}
                onClick={() => markRead(n.id)}
                className={cn(
                  'group flex w-full gap-3 px-3 py-2.5 text-left transition-colors',
                  n.read ? 'opacity-60' : 'hover:bg-muted/60',
                )}
              >
                <span
                  className={cn(
                    'mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md text-[10px] font-bold',
                    KIND_COLORS[n.kind],
                  )}
                >
                  {KIND_LABEL[n.kind]}
                </span>

                <div className="min-w-0 flex-1">
                  <p
                    className={cn(
                      'text-xs leading-tight font-medium',
                      !n.read && 'text-foreground',
                    )}
                  >
                    {n.title}
                  </p>
                  <p className="text-muted-foreground mt-0.5 line-clamp-2 min-w-0 text-[11px] wrap-break-word">
                    {n.body}
                  </p>
                  <p className="text-muted-foreground/70 mt-1 text-[10px]">{n.time}</p>
                </div>

                <div className="flex shrink-0 items-start pt-1">
                  {!n.read && <span className="bg-primary size-1.5 rounded-full" />}
                </div>
              </button>
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};
