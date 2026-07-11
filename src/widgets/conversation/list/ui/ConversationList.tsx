'use client';

import { SearchIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { ConversationCard } from '~/entities/conversation';
import type { Conversation, ConversationStatus } from '~/entities/conversation';
import { cn, useSearchParam } from '~/shared/lib';
import { Input, Tabs, TabsContent, TabsList, TabsTrigger } from '~/shared/ui/kit';

type FilterTab = 'all' | 'escalated' | ConversationStatus;

const TABS: { value: FilterTab; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'escalated', label: 'Escalated' },
  { value: 'open', label: 'Open' },
  { value: 'pending', label: 'Pending' },
  { value: 'resolved', label: 'Resolved' },
  { value: 'closed', label: 'Closed' },
];

interface ConversationListProps {
  conversations: Conversation[];
  selectedId?: string;
  onSelect: (id: string) => void;
}

export const ConversationList = ({
  conversations,
  selectedId,
  onSelect,
}: ConversationListProps) => {
  const [tab, setTab] = useSearchParam('tab', 'all');
  const [search, setSearch] = useSearchParam('search', '');

  const q = search.toLowerCase();

  const getFiltered = (tabValue: FilterTab) =>
    conversations.filter((c) => {
      if (tabValue === 'escalated' && !c.isEscalated) return false;
      if (tabValue !== 'all' && tabValue !== 'escalated' && c.status !== tabValue)
        return false;
      return (
        !q ||
        c.customerName.toLowerCase().includes(q) ||
        c.customerEmail.toLowerCase().includes(q) ||
        c.lastMessage.toLowerCase().includes(q)
      );
    });

  return (
    <Tabs
      value={tab}
      onValueChange={setTab}
      className="border-border bg-background flex h-full flex-col border-r"
    >
      <TabsList
        variant="line"
        className="border-border text-foreground custom-scrollbar flex h-auto w-full items-end justify-start overflow-x-auto overflow-y-hidden rounded-none border-b bg-transparent px-2 pt-2 pb-0"
      >
        {TABS.map((t) => (
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
            placeholder="Search conversations..."
            value={search}
            onChange={(e) => setSearch(e.target.value || undefined)}
            className="h-8 pl-8 text-xs"
          />
        </div>
      </div>

      {TABS.map((t) => {
        const filtered = getFiltered(t.value);
        return (
          <TabsContent
            key={t.value}
            value={t.value}
            className="custom-scrollbar mt-0 flex-1 overflow-y-auto"
          >
            {filtered.length === 0 ? (
              <p className="text-muted-foreground flex h-24 items-center justify-center text-sm">
                No conversations found
              </p>
            ) : (
              filtered.map((c) => (
                <ConversationCard
                  key={c.id}
                  conversation={c}
                  isActive={c.id === selectedId}
                  onClick={() => onSelect(c.id)}
                />
              ))
            )}
          </TabsContent>
        );
      })}
    </Tabs>
  );
};
