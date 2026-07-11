'use client';

import { Moon02Icon, Sun01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useTheme } from 'next-themes';
import { useCallback } from 'react';
import { useKeyboardShortcut } from '~/shared/lib';
import { Button } from '~/shared/ui/kit';

export const ThemeToggle = () => {
  const { setTheme } = useTheme();

  const toggle = useCallback(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'light' : 'dark');
  }, [setTheme]);

  useKeyboardShortcut('L', toggle, ['mod', 'shift']);

  return (
    <Button
      variant="ghost"
      size="icon"
      className="text-muted-foreground rounded-full"
      onClick={toggle}
      aria-label="Toggle theme"
      aria-keyshortcuts="Control+Shift+L"
    >
      <HugeiconsIcon
        icon={Sun01Icon}
        strokeWidth={1.75}
        className="hidden size-5 dark:block"
      />
      <HugeiconsIcon
        icon={Moon02Icon}
        strokeWidth={1.75}
        className="size-5 dark:hidden"
      />
    </Button>
  );
};
