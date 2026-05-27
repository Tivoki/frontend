'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Command, CommandDialog, CommandInput } from '~/shared/ui/kit';
import { useSearchItems } from '../model/use-search-items';
import { SearchResultList } from './SearchResultList';

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
    <CommandDialog
      open={open}
      onOpenChange={(value) => {
        onOpenChange(value);
        if (!value) setQuery('');
      }}
    >
      <Command shouldFilter={false}>
        <CommandInput
          placeholder="Search pages, actions, docs..."
          value={query}
          onValueChange={setQuery}
        />
        <SearchResultList groups={groups} query={query} onSelect={handleSelect} />
      </Command>
    </CommandDialog>
  );
};
