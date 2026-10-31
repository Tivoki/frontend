'use client';

import { SearchIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import {
  ConversationCard,
  INBOX_TABS,
  SEARCH_MAX_LENGTH,
  SEARCH_MIN_LENGTH,
  normalizeInboxTab,
  normalizeSearch,
  tabToFilter,
  useInbox,
} from '~/entities/conversation';
import type { InboxItem } from '~/entities/conversation';
import { RealtimeStatusBadge } from '~/features/conversation-realtime';
import type { RealtimeStatus } from '~/features/conversation-realtime';
import { cn, useSearchParam } from '~/shared/lib';
import { Button, Input, Skeleton, Tabs, TabsList, TabsTrigger } from '~/shared/ui/kit';

const SEARCH_DEBOUNCE_MS = 300;

interface ConversationListProps {
  workspaceId: string;
  selectedId?: string;
  onSelect: (id: string) => void;
  realtimeStatus?: RealtimeStatus;
}

export const ConversationList = ({
  workspaceId,
  selectedId,
  onSelect,
  realtimeStatus,
}: ConversationListProps) => {
  const [tabParam, setTab] = useSearchParam('tab');
  const [searchParam, setSearchParam] = useSearchParam('search', '');
  const tab = normalizeInboxTab(tabParam);
  const [input, setInput] = useState(searchParam);
  const [debounced, setDebounced] = useState(searchParam);
  const urlSearch = useRef({ value: searchParam, set: setSearchParam });
  useEffect(() => {
    urlSearch.current = { value: searchParam, set: setSearchParam };
  }, [searchParam, setSearchParam]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounced(input);
      const next = input.trim() ? input : '';
      if (next !== urlSearch.current.value) urlSearch.current.set(next || undefined);
    }, SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [input]);

  const q = normalizeSearch(debounced);
  const tooShort = debounced.trim().length > 0 && q === undefined;
  const query = useMemo(() => ({ filter: tabToFilter(tab), q }), [tab, q]);
  const inbox = useInbox(workspaceId, query);
  const items = useMemo(() => {
    // Live list: a row can move between pages while paging — keep the first.
    const seen = new Set<string>();
    const result: InboxItem[] = [];
    for (const page of inbox.data?.pages ?? []) {
      for (const item of page.items) {
        if (seen.has(item.id)) continue;
        seen.add(item.id);
        result.push(item);
      }
    }
    return result;
  }, [inbox.data]);

  const { ref: sentinelRef, inView } = useInView({ rootMargin: '200px' });
  useEffect(() => {
    if (inView && inbox.hasNextPage && !inbox.isFetchingNextPage)
      void inbox.fetchNextPage();
  }, [inView, inbox]);

  return (
    <Tabs
      value={tab}
      onValueChange={(value) => setTab(value === 'all' ? undefined : value)}
      className="border-border bg-background flex h-full flex-col border-r"
    >
      <TabsList
        variant="line"
        className="border-border text-foreground custom-scrollbar flex h-auto w-full items-end justify-start overflow-x-auto overflow-y-hidden rounded-none border-b bg-transparent px-2 pt-2 pb-0"
      >
        {INBOX_TABS.map((t) => (
          <TabsTrigger
            key={t.value}
            value={t.value}
            className={cn(
              'hover:text-foreground shrink-0 rounded-none px-3 py-2 text-xs font-medium transition-colors hover:bg-transparent',
              'h-auto flex-none group-data-horizontal/tabs:after:bottom-0',
              'data-active:bg-transparent',
            )}
          >
            {t.label}
          </TabsTrigger>
        ))}
      </TabsList>

      <div className="border-border border-b p-3">
        <div className="relative">
          <HugeiconsIcon
            icon={SearchIcon}
            strokeWidth={1.75}
            className="text-muted-foreground absolute top-1/2 left-2.5 size-4 -translate-y-1/2"
          />
          <Input
            type="search"
            aria-label="Search conversations"
            placeholder="Search by name, email, last message or ID"
            value={input}
            maxLength={SEARCH_MAX_LENGTH}
            onChange={(event) => setInput(event.target.value)}
            className="h-8 pl-8 text-xs"
          />
        </div>
        {(tooShort || (realtimeStatus && realtimeStatus !== 'open')) && (
          <div className="mt-2 flex items-center justify-between gap-2">
            {tooShort ? (
              <p className="text-muted-foreground text-xs">
                Type at least {SEARCH_MIN_LENGTH} characters to search.
              </p>
            ) : (
              <span />
            )}
            {realtimeStatus && <RealtimeStatusBadge status={realtimeStatus} />}
          </div>
        )}
      </div>

      <div
        className="custom-scrollbar mt-0 flex-1 overflow-y-auto"
        aria-busy={inbox.isFetching}
      >
        {inbox.isPending ? (
          <div className="space-y-px">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="flex gap-3 px-4 py-3">
                <Skeleton className="size-9 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-3.5 w-2/3" />
                  <Skeleton className="h-3 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : inbox.isError && items.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 p-6 text-center">
            <p className="text-muted-foreground text-sm">
              Couldn&apos;t load conversations.
            </p>
            <Button size="sm" variant="outline" onClick={() => void inbox.refetch()}>
              Try again
            </Button>
          </div>
        ) : items.length === 0 ? (
          <p className="text-muted-foreground flex h-24 items-center justify-center px-4 text-center text-sm">
            {q
              ? 'No conversations match your search'
              : tab === 'all'
                ? 'No conversations yet'
                : 'No conversations in this view'}
          </p>
        ) : (
          <>
            {items.map((conversation) => (
              <ConversationCard
                key={conversation.id}
                conversation={conversation}
                isActive={conversation.id === selectedId}
                onClick={() => onSelect(conversation.id)}
              />
            ))}
            <div ref={sentinelRef} className="h-1" />
            {inbox.isFetchingNextPage && (
              <p className="text-muted-foreground py-3 text-center text-xs">
                Loading more…
              </p>
            )}
          </>
        )}
      </div>
    </Tabs>
  );
};
