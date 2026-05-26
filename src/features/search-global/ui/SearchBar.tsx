'use client';

import { useCallback, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { CommandIcon, SearchIcon } from '@hugeicons/core-free-icons';

import { cn, useIsTouchPointer, useKeyboardShortcut, useModKey } from '~/shared/lib';
import { Button } from '~/shared/ui/kit';
import { SearchCommandDialog } from './SearchCommandDialog';

interface SearchBarProps {
  className?: string;
}

export const SearchBar = ({ className }: SearchBarProps) => {
  const [open, setOpen] = useState(false);
  const isMobile = useIsTouchPointer();
  const modKey = useModKey();

  const toggle = useCallback(() => setOpen((prev) => !prev), []);
  useKeyboardShortcut('k', toggle, ['mod']);

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setOpen(true)}
        className={cn(
          'w-full justify-start gap-2 px-3 font-normal text-muted-foreground hover:text-foreground',
          className,
        )}
      >
        <HugeiconsIcon icon={SearchIcon} strokeWidth={2} className="size-4 shrink-0" />
        <span className="flex-1 text-left truncate">Search...</span>

        {!isMobile && (
          <kbd className="flex items-center gap-0.5 rounded border border-border bg-background px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
            {modKey === '⌘' ? (
              <HugeiconsIcon icon={CommandIcon} strokeWidth={2} className="size-3" />
            ) : (
              <span>Ctrl</span>
            )}
            <span>K</span>
          </kbd>
        )}
      </Button>

      <SearchCommandDialog open={open} onOpenChange={setOpen} />
    </>
  );
};
