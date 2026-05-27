'use client';

import { Fragment } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

import {
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '~/shared/ui/kit';
import type { SearchGroup } from '../model/types';

interface SearchResultListProps {
  groups: SearchGroup[];
  query: string;
  onSelect: (href?: string, onSelect?: () => void) => void;
  listClassName?: string;
}

export const SearchResultList = ({ groups, query, onSelect, listClassName }: SearchResultListProps) => (
  <CommandList className={listClassName}>
    <CommandEmpty>No results for &ldquo;{query}&rdquo;</CommandEmpty>
    {groups.map((group, index) => (
      <Fragment key={group.id}>
        {index > 0 && <CommandSeparator aria-hidden='true' />}
        <CommandGroup heading={group.label}>
          {group.items.map((item) => (
            <CommandItem
              key={item.id}
              value={item.id}
              onSelect={() => onSelect(item.href, item.onSelect)}
            >
              {item.icon && (
                <HugeiconsIcon
                  icon={item.icon}
                  strokeWidth={2}
                  className="size-4 text-muted-foreground group-data-selected/command-item:text-foreground"
                />
              )}
              <span className="min-w-0 flex-1 basis-0 line-clamp-2 wrap-break-word">{item.label}</span>
              {item.description && (
                <span className="ml-auto max-w-[40%] shrink truncate text-right text-xs text-muted-foreground group-data-selected/command-item:text-foreground">
                  {item.description}
                </span>
              )}
            </CommandItem>
          ))}
        </CommandGroup>
      </Fragment>
    ))}
  </CommandList>
);
