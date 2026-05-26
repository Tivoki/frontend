'use client';

import { SearchBar } from '~/features/search-global';
import { NotificationsButton } from '~/features/notifications';
import { WorkspaceSwitcher } from '~/features/switch-workspace';
import { UserMenu } from '~/features/user-menu';
import { cn } from '~/shared/lib';
import { SidebarTrigger } from '~/shared/ui/kit';

interface HeaderProps {
  className?: string;
}

export const Header = ({ className }: HeaderProps) => {
  return (
    <header className={cn('flex h-14.25 items-center gap-2 border-b border-border bg-background px-3 sm:gap-3 sm:px-4 md:gap-4', className)}>
      <SidebarTrigger className="md:hidden shrink-0 size-8 rounded-full border border-border text-muted-foreground hover:bg-muted hover:text-foreground" />

      <WorkspaceSwitcher />

      <div className="min-w-0 flex-1 sm:max-w-md">
        <SearchBar />
      </div>

      <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-2">
        <NotificationsButton />
        <UserMenu />
      </div>
    </header>
  );
};
