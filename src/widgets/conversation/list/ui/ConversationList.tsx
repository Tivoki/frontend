'use client';

import { useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { SearchIcon } from '@hugeicons/core-free-icons';
import { ConversationCard } from '~/entities/conversation';
import type { Conversation, ConversationStatus } from '~/entities/conversation';
import { cn } from '~/shared/lib';
import { Input } from '~/shared/ui/kit';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '~/shared/ui/kit';

type FilterTab = 'all' | ConversationStatus;

const TABS: { value: FilterTab; label: string }[] = [
  { value: 'all', label: 'All' },
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

export const ConversationList = ({ conversations, selectedId, onSelect }: ConversationListProps) => {
  const [tab, setTab] = useState<FilterTab>('all');
  const [search, setSearch] = useState('');

  const q = search.toLowerCase();

  const getFiltered = (tabValue: FilterTab) =>
    conversations.filter((c) => {
      const matchesTab = tabValue === 'all' || c.status === tabValue;
      const matchesSearch =
        !q ||
        c.customerName.toLowerCase().includes(q) ||
        c.customerEmail.toLowerCase().includes(q) ||
        c.lastMessage.toLowerCase().includes(q);
      return matchesTab && matchesSearch;
    });

  return (
    <Tabs
      value={tab}
      onValueChange={(value) => setTab(value as FilterTab)}
      className="flex h-full flex-col border-r border-border bg-background"
    >
      <TabsList
        variant="line"
        className="flex h-auto w-full items-end justify-start overflow-x-auto overflow-y-hidden rounded-none border-b border-border bg-transparent px-2 pt-2 pb-0 text-foreground custom-scrollbar"
      >
        {TABS.map((t) => (
          <TabsTrigger
            key={t.value}
            value={t.value}
            className={cn(
              'shrink-0 rounded-none px-3 py-2 text-xs font-medium transition-colors hover:bg-transparent hover:text-foreground',
              'h-auto flex-none after:bg-primary group-data-horizontal/tabs:after:bottom-0 data-active:text-primary',
              'data-active:bg-transparent',
            )}
          >
            {t.label}
          </TabsTrigger>
        ))}
      </TabsList>

      <div className="border-b border-border p-3">
        <div className="relative">
          <HugeiconsIcon
            icon={SearchIcon}
            strokeWidth={1.75}
            className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            placeholder="Search conversations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
            className="mt-0 flex-1 overflow-y-auto custom-scrollbar"
          >
            {filtered.length === 0 ? (
              <p className="flex h-24 items-center justify-center text-sm text-muted-foreground">
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
