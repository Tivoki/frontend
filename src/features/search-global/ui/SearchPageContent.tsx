'use client';

import { Cancel01Icon, Search01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { cn } from '~/shared/lib';
import {
  Command,
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '~/shared/ui/kit';
import type { Route } from 'next';
import { useRouter } from 'next/navigation';
import { useCallback, useRef, useState } from 'react';
import { useSearchItems } from '../model/use-search-items';
import { SearchResultList } from './SearchResultList';

interface SearchPageContentProps {
  className?: string;
}

export const SearchPageContent = ({ className }: SearchPageContentProps) => {
  const [query, setQuery] = useState('');
  const groups = useSearchItems(query);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSelect = useCallback(
    (href?: Route, onSelect?: () => void) => {
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
    },
    [router],
  );

  const clearQuery = useCallback(() => {
    setQuery('');
    inputRef.current?.focus();
  }, []);

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <InputGroup className="h-9">
        <InputGroupAddon>
          <HugeiconsIcon
            icon={Search01Icon}
            strokeWidth={2}
            className="size-4 opacity-50"
          />
        </InputGroupAddon>
        <InputGroupInput
          className="text-sm placeholder:text-xs"
          ref={inputRef}
          autoFocus
          placeholder="Search pages, actions, docs..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <InputGroupAddon align="inline-end">
            <InputGroupButton onClick={clearQuery}>
              <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} className="size-3.5" />
            </InputGroupButton>
          </InputGroupAddon>
        )}
      </InputGroup>

      <Command shouldFilter={false} className="bg-popover rounded-xl">
        <SearchResultList
          groups={groups}
          query={query}
          onSelect={handleSelect}
          listClassName="max-h-none"
        />
      </Command>
    </div>
  );
};
