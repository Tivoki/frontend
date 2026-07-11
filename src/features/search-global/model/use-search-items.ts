'use client';

import { useMemo } from 'react';
import { useScopedHref } from '~/features/switch-workspace';
import { STATIC_SEARCH_GROUPS } from './data';
import type { SearchGroup, SearchItem } from './types';

const matchesQuery = (item: SearchItem, q: string) =>
  !q ||
  item.label.toLowerCase().includes(q) ||
  item.description?.toLowerCase().includes(q) ||
  item.keywords?.some((kw) => kw.toLowerCase().includes(q));

export const useSearchItems = (query: string): SearchGroup[] => {
  const scopedHref = useScopedHref();

  return useMemo(() => {
    const q = query.trim().toLowerCase();

    return STATIC_SEARCH_GROUPS.map((group) => ({
      ...group,
      items: group.items
        .filter((item) => matchesQuery(item, q))
        .map((item) =>
          item.scope ? { ...item, href: scopedHref(item.scope, item.sub) } : item,
        ),
    })).filter((group) => group.items.length > 0);
  }, [query, scopedHref]);
};
