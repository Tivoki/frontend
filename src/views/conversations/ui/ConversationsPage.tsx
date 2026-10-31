'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { isCanonicalInboxTab, normalizeInboxTab } from '~/entities/conversation';
import { useInboxRealtime } from '~/features/conversation-realtime';
import { clearReplyStates } from '~/features/conversation-reply';
import { useActiveWorkspaceId } from '~/features/switch-workspace';
import { cn, useSearchParam } from '~/shared/lib';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  useSidebar,
} from '~/shared/ui/kit';
import { ConversationList } from '~/widgets/conversation';

const ConversationThread = dynamic(
  () => import('~/widgets/conversation').then((m) => ({ default: m.ConversationThread })),
  {
    loading: () => (
      <div className="text-muted-foreground flex flex-1 items-center justify-center text-sm">
        Loading…
      </div>
    ),
  },
);

const ConversationInfo = dynamic(() =>
  import('~/widgets/conversation').then((m) => ({ default: m.ConversationInfo })),
);

export const ConversationsPage = () => {
  const { open: isDesktopSidebarOpen } = useSidebar();
  const workspaceId = useActiveWorkspaceId();

  const [selectedId, setSelectedId] = useSearchParam('id');
  const [tab, setTab] = useSearchParam('tab');
  const [infoOpen, setInfoOpen] = useState(false);

  // One stream per tab for the whole workspace, above both layouts.
  const realtimeStatus = useInboxRealtime(workspaceId, selectedId);

  // Old links (?tab=open|pending|resolved) keep working.
  useEffect(() => {
    if (!isCanonicalInboxTab(tab)) {
      const normalized = normalizeInboxTab(tab);
      setTab(normalized === 'all' ? undefined : normalized);
    }
  }, [tab, setTab]);

  // Drafts are page-scoped and never cross workspaces.
  useEffect(() => () => clearReplyStates(), [workspaceId]);

  if (!workspaceId) return null;

  const list = (
    <ConversationList
      workspaceId={workspaceId}
      selectedId={selectedId}
      onSelect={setSelectedId}
      realtimeStatus={realtimeStatus}
    />
  );

  return (
    <div className="flex min-h-0 flex-1 overflow-hidden">
      <div
        className={cn(
          'hidden min-h-0 flex-1 overflow-hidden',
          isDesktopSidebarOpen ? 'lg:flex' : 'md:flex',
        )}
      >
        <ResizablePanelGroup orientation="horizontal" className="min-h-0 flex-1">
          <ResizablePanel
            defaultSize="280px"
            minSize="260px"
            maxSize="400px"
            className="flex flex-col"
          >
            {list}
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel minSize="380px" className="flex min-w-0 flex-col">
            <ConversationThread
              workspaceId={workspaceId}
              conversationId={selectedId}
              onBack={selectedId ? () => setSelectedId(undefined) : undefined}
              onInfo={() => setInfoOpen(true)}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
        <div className="hidden xl:flex xl:w-72 xl:flex-col">
          <ConversationInfo workspaceId={workspaceId} conversationId={selectedId} />
        </div>
      </div>

      {!selectedId && (
        <div
          className={cn(
            'flex w-full flex-col',
            isDesktopSidebarOpen ? 'lg:hidden' : 'md:hidden',
          )}
        >
          {list}
        </div>
      )}
      {selectedId && (
        <div
          className={cn(
            'flex min-w-0 flex-1 flex-col',
            isDesktopSidebarOpen ? 'lg:hidden' : 'md:hidden',
          )}
        >
          <ConversationThread
            workspaceId={workspaceId}
            conversationId={selectedId}
            onBack={() => setSelectedId(undefined)}
            onInfo={() => setInfoOpen(true)}
          />
        </div>
      )}
      <Sheet open={infoOpen} onOpenChange={setInfoOpen}>
        <SheetContent
          side="right"
          className="w-full max-w-sm p-0"
          aria-describedby={undefined}
        >
          <SheetHeader className="border-border border-b px-4 py-3">
            <SheetTitle className="text-sm">Conversation info</SheetTitle>
          </SheetHeader>
          <ConversationInfo workspaceId={workspaceId} conversationId={selectedId} />
        </SheetContent>
      </Sheet>
    </div>
  );
};
