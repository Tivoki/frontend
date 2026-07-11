'use client';

import { useMemo } from 'react';
import { useActiveWorkspaceId, useScopedHref } from '~/features/switch-workspace';
import { STATIC_SEARCH_GROUPS } from './data';
import type { SearchGroup, SearchItem } from './types';

const matchesQuery = (item: SearchItem, q: string) =>
  !q ||
  item.label.toLowerCase().includes(q) ||
  item.description?.toLowerCase().includes(q) ||
  item.keywords?.some((kw) => kw.toLowerCase().includes(q));

/**
 * Returns filtered search groups for the given query, resolving internal
 * (`sub` + `scope`) targets to concrete hrefs under the active workspace.
 * Swap `STATIC_SEARCH_GROUPS` with an API call here once the backend is ready.
 */
export const useSearchItems = (query: string): SearchGroup[] => {
  const scopedHref = useScopedHref();
  // Memo dependency: the href builder itself is a fresh closure every render,
  // but its output only changes with the active workspace id.
  const workspaceId = useActiveWorkspaceId();

  return useMemo(() => {
    const resolveHref = (item: SearchItem): SearchItem =>
      item.scope ? { ...item, href: scopedHref(item.scope, item.sub) } : item;

    const q = query.trim().toLowerCase();

    return STATIC_SEARCH_GROUPS.map((group) => ({
      ...group,
      items: group.items.filter((item) => matchesQuery(item, q)).map(resolveHref),
    })).filter((group) => group.items.length > 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, workspaceId]);
};
