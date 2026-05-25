'use client';

import { Fragment, useState } from 'react';
import { useRouter } from 'next/navigation';
import { HugeiconsIcon } from '@hugeicons/react';

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '~/shared/ui/kit';
import { useSearchItems } from '../model/use-search-items';

interface SearchCommandDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SearchCommandDialog = ({ open, onOpenChange }: SearchCommandDialogProps) => {
  const [query, setQuery] = useState('');
  const groups = useSearchItems(query);
  const router = useRouter();

  const handleSelect = (href?: string, onSelect?: () => void) => {
    onOpenChange(false);
    setQuery('');

    if (onSelect) {
      onSelect();
      return;
    }

    if (!href) return;

    if (href.startsWith('http')) {
      window.open(href, '_blank', 'noopener,noreferrer');
    } else {
      router.push(href);
    }
  };

  return (
    <CommandDialog open={open} onOpenChange={(value) => { onOpenChange(value); if (!value) setQuery(''); }}>
      <Command shouldFilter={false}>
        <CommandInput
          placeholder="Search pages, actions, docs..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          <CommandEmpty>No results for &ldquo;{query}&rdquo;</CommandEmpty>

          {groups.map((group, index) => (
            <Fragment key={group.id}>
              {index > 0 && <CommandSeparator />}
              <CommandGroup heading={group.label}>
                {group.items.map((item) => (
                  <CommandItem
                    key={item.id}
                    value={item.id}
                    onSelect={() => handleSelect(item.href, item.onSelect)}
                  >
                    {item.icon && (
                      <HugeiconsIcon icon={item.icon} strokeWidth={2} className="size-4 text-muted-foreground" />
                    )}
                    <span className="flex-1 basis-0 min-w-0 line-clamp-2 wrap-break-word">{item.label}</span>
                    {item.description && (
                      <span className="max-w-[40%] ml-auto shrink truncate text-right text-xs text-muted-foreground">
                        {item.description}
                      </span>
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Fragment>
          ))}
        </CommandList>
      </Command>
    </CommandDialog>
  );
};
