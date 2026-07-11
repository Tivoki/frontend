'use client';

import { HugeiconsIcon } from '@hugeicons/react';
import {
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '~/shared/ui/kit';
import type { Route } from 'next';
import { Fragment } from 'react';
import type { SearchGroup } from '../model/types';

interface SearchResultListProps {
  groups: SearchGroup[];
  query: string;
  onSelect: (href?: Route, onSelect?: () => void) => void;
  listClassName?: string;
}

export const SearchResultList = ({
  groups,
  query,
  onSelect,
  listClassName,
}: SearchResultListProps) => (
  <CommandList className={listClassName}>
    <CommandEmpty>No results for &ldquo;{query}&rdquo;</CommandEmpty>
    {groups.map((group, index) => (
      <Fragment key={group.id}>
        {index > 0 && <CommandSeparator aria-hidden="true" />}
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
                  className="text-muted-foreground group-data-selected/command-item:text-foreground size-4"
                />
              )}
              <span className="line-clamp-2 min-w-0 flex-1 basis-0 wrap-break-word">
                {item.label}
              </span>
              {item.description && (
                <span className="text-muted-foreground group-data-selected/command-item:text-foreground ml-auto max-w-[40%] shrink truncate text-right text-xs">
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
