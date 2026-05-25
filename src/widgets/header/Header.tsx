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
    <header className={cn('flex h-14.25 items-center gap-4 border-b border-border bg-background px-4', className)}>
      <SidebarTrigger className="md:hidden size-8 rounded-full border border-border text-muted-foreground hover:bg-muted hover:text-foreground" />

      <WorkspaceSwitcher />

      <div className="flex-1 max-w-md">
        <SearchBar />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <NotificationsButton />

        <UserMenu />
      </div>
    </header>
  );
};
