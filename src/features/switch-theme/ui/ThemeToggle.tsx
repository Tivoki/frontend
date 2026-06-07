'use client';

import { useTheme } from 'next-themes';
import { HugeiconsIcon } from '@hugeicons/react';
import { Moon02Icon, Sun01Icon } from '@hugeicons/core-free-icons';

import { Button } from '~/shared/ui/kit';

export const ThemeToggle = () => {
  const { setTheme } = useTheme();

  const toggle = () => {
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full text-muted-foreground"
      onClick={toggle}
      aria-label="Toggle theme"
    >
      <HugeiconsIcon icon={Sun01Icon} strokeWidth={1.75} className="hidden size-5 dark:block" />
      <HugeiconsIcon icon={Moon02Icon} strokeWidth={1.75} className="size-5 dark:hidden" />
    </Button>
  );
};
