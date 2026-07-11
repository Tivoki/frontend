'use client';

import { HugeiconsIcon } from '@hugeicons/react';
import {
  BubbleChatIcon,
  CogIcon,
  HomeIcon,
  Search01Icon,
} from '@hugeicons/core-free-icons';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import { useWorkspaceHref } from '~/features/switch-workspace';
import { cn } from '~/shared/lib';

const NAV_ITEMS = [
  { id: 'overview', label: 'Overview', sub: '', icon: HomeIcon },
  { id: 'conversations', label: 'Chats', sub: 'conversations', icon: BubbleChatIcon },
  { id: 'search', label: 'Search', sub: 'search', icon: Search01Icon },
  { id: 'settings', label: 'Settings', sub: 'settings', icon: CogIcon },
] as const;

export const BottomNav = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const workspaceHref = useWorkspaceHref();

  const isConversationOpened =
    pathname === workspaceHref('conversations') && Boolean(searchParams.get('id'));

  if (isConversationOpened) {
    return null;
  }

  return (
    <nav className="z-50 flex h-[calc(4rem+env(safe-area-inset-bottom))] shrink-0 items-stretch border-t border-border bg-background pb-[env(safe-area-inset-bottom)] sm:hidden">
      {NAV_ITEMS.map((item) => {
        const href = workspaceHref(item.sub);
        const isActive = pathname === href;
        return (
          <Link
            key={item.id}
            href={href}
            className={cn(
              'flex flex-1 flex-col items-center justify-center gap-1 py-2 text-xs font-medium transition-colors',
              isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground',
            )}
          >
            <HugeiconsIcon
              icon={item.icon}
              strokeWidth={isActive ? 2 : 1.75}
              className="size-5"
            />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};
