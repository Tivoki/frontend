'use client';

import { useMemo } from 'react';

import type { SearchGroup } from './types';
import { STATIC_SEARCH_GROUPS } from './data';

/**
 * Returns filtered search groups for the given query.
 * Static implementation — swap `STATIC_SEARCH_GROUPS` with an API call here
 * once the backend is ready; the hook signature stays the same.
 */
export const useSearchItems = (query: string): SearchGroup[] => {
  return useMemo(() => {
    if (!query.trim()) return STATIC_SEARCH_GROUPS;

    const q = query.toLowerCase();

    return STATIC_SEARCH_GROUPS.map((group) => ({
      ...group,
      items: group.items.filter(
        (item) =>
          item.label.toLowerCase().includes(q) ||
          item.description?.toLowerCase().includes(q) ||
          item.keywords?.some((kw) => kw.toLowerCase().includes(q)),
      ),
    })).filter((group) => group.items.length > 0);
  }, [query]);
};
