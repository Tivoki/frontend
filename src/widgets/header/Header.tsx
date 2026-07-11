'use client';

import { NotificationsButton } from '~/features/notifications';
import { SearchBar } from '~/features/search-global';
import { ThemeToggle } from '~/features/switch-theme';
import { WorkspaceSwitcher } from '~/features/switch-workspace';
import { UserMenu } from '~/features/user-menu';
import { cn } from '~/shared/lib';
import { SidebarTrigger } from '~/shared/ui/kit';

interface HeaderProps {
  className?: string;
}

export const Header = ({ className }: HeaderProps) => {
  return (
    <header
      className={cn(
        'border-border bg-background flex h-14.25 items-center gap-2 border-b px-3 sm:gap-3 sm:px-4 md:gap-4',
        className,
      )}
    >
      <SidebarTrigger className="border-border text-muted-foreground hover:bg-muted hover:text-foreground size-8 shrink-0 rounded-full border md:hidden" />

      <WorkspaceSwitcher />

      <div className="mx-auto hidden max-w-md min-w-0 flex-1 sm:block">
        <SearchBar />
      </div>

      <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-2">
        <NotificationsButton />
        <ThemeToggle />
        <UserMenu />
      </div>
    </header>
  );
};
