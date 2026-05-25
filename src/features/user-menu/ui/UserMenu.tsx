'use client';

import { useState } from 'react';
import Link from 'next/link';
import { HugeiconsIcon } from '@hugeicons/react';
import { AccountSetting01Icon, Logout01Icon, UserIcon } from '@hugeicons/core-free-icons';

import { getInitials } from '~/shared/lib';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Separator,
} from '~/shared/ui/kit';
import type { CurrentUser } from '../model/types';

const MOCK_USER: CurrentUser = {
  name: 'John Doe',
  email: 'john.doe@acme.com',
};

const LINK_ITEMS = [
  { icon: UserIcon, label: 'Profile', href: '/profile' },
  { icon: AccountSetting01Icon, label: 'Settings', href: '/settings' },
] as const;

interface UserMenuProps {
  user?: CurrentUser;
}

export const UserMenu = ({ user = MOCK_USER }: UserMenuProps) => {
  const [open, setOpen] = useState(false);

  const initials = getInitials(user.name);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="h-auto max-w-40 gap-2 rounded-none py-1 pl-2 hover:bg-transparent"
        >
          <Avatar className="bg-primary/20">
            <AvatarFallback className="text-primary bg-transparent text-xs font-semibold">
              {initials}
            </AvatarFallback>
            <AvatarImage src="" alt={initials} />
          </Avatar>
          <span className="text-foreground hidden truncate text-xs font-medium sm:block">
            {user.name}
          </span>
        </Button>
      </PopoverTrigger>

      <PopoverContent align="end" sideOffset={8} className="w-56 p-1">
        <div className="px-2 py-1.5">
          <p className="text-foreground truncate text-sm font-medium">{user.name}</p>
          <p className="text-muted-foreground truncate text-xs">{user.email}</p>
        </div>

        <Separator />

        {LINK_ITEMS.map(({ icon, label, href }) => (
          <Button
            key={label}
            variant="ghost"
            className="w-full justify-start text-sm font-normal"
            asChild
          >
            <Link href={href} onClick={() => setOpen(false)}>
              <HugeiconsIcon
                icon={icon}
                strokeWidth={1.75}
                className="text-muted-foreground size-4"
              />
              {label}
            </Link>
          </Button>
        ))}

        <Separator />

        <Button
          variant="ghost"
          className="text-destructive hover:bg-destructive/10 hover:text-destructive w-full justify-start text-sm font-normal"
          onClick={() => setOpen(false)}
        >
          <HugeiconsIcon icon={Logout01Icon} strokeWidth={1.75} className="size-4" />
          Sign out
        </Button>
      </PopoverContent>
    </Popover>
  );
};
