'use client';

import { useState } from 'react';

import { ArrowUpDownIcon, PlusSignIcon, Tick02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useInView } from 'react-intersection-observer';

import {
  WorkspaceAvatar,
  WORKSPACE_ROLE_LABELS,
  useWorkspace,
  useWorkspaces,
  type WorkspaceWithMembers,
} from '~/entities/workspace';
import { cn, toRoute } from '~/shared/lib';
import { LoadingMoreRow } from '~/shared/ui/primitives';
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Separator,
} from '~/shared/ui/kit';

import { useActiveWorkspaceId } from '../model/use-active-workspace-id';
import { WorkspaceSwitcherSkeleton } from './WorkspaceSwitcherSkeleton';

const CreateWorkspaceDialog = dynamic(() =>
  import('~/features/create-workspace').then((m) => ({
    default: m.CreateWorkspaceDialog,
  })),
);

export const WorkspaceSwitcher = () => {
  const router = useRouter();
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const activeWorkspaceId = useActiveWorkspaceId();
  // The detail query (hydrated by the workspace layout) resolves the active
  // workspace even when it sits beyond the loaded pages of the list.
  const { data: active, isPending: isActivePending } = useWorkspace(activeWorkspaceId);
  const { data, isPending, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useWorkspaces();
  const workspaces = data?.pages.flatMap((page) => page.data) ?? [];
  const activeRole = workspaces.find((workspace) => workspace.id === active?.id)?.role;

  const { ref: sentinelRef } = useInView({
    rootMargin: '100px',
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) void fetchNextPage();
    },
  });

  const goToWorkspace = (id: string) => {
    router.push(toRoute(`/dashboard/${id}`));
  };

  const handleCreated = (workspace: WorkspaceWithMembers) => {
    goToWorkspace(workspace.id);
  };

  if (isPending || (activeWorkspaceId !== null && isActivePending)) {
    return <WorkspaceSwitcherSkeleton />;
  }

  return (
    <>
      {!active ? (
        <Button
          variant="ghost"
          className="h-auto py-1.5"
          onClick={() => setDialogOpen(true)}
        >
          <HugeiconsIcon icon={PlusSignIcon} strokeWidth={2} className="size-4" />
          <span className="hidden lg:inline">Add workspace</span>
        </Button>
      ) : (
        <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="h-auto py-1.5 text-left">
              <WorkspaceAvatar name={active.name} />
              <div className="hidden min-w-0 lg:block">
                <p className="text-foreground truncate text-sm leading-tight font-semibold">
                  {active.name}
                </p>
                {activeRole && (
                  <p className="text-muted-foreground truncate text-xs leading-tight">
                    {WORKSPACE_ROLE_LABELS[activeRole]}
                  </p>
                )}
              </div>
              <HugeiconsIcon
                icon={ArrowUpDownIcon}
                strokeWidth={2}
                className="text-muted-foreground ml-1 hidden size-3.5 shrink-0 xl:block"
              />
            </Button>
          </PopoverTrigger>

          <PopoverContent align="start" sideOffset={6} className="w-64 p-1">
            <p className="text-muted-foreground p-1 text-xs font-medium uppercase">
              Workspaces
            </p>

            <div className="flex max-h-64 flex-col gap-0.5 overflow-y-auto">
              {workspaces.map((workspace) => {
                const isActive = workspace.id === active.id;
                return (
                  <Button
                    key={workspace.id}
                    variant="ghost"
                    onClick={() => {
                      setPopoverOpen(false);
                      goToWorkspace(workspace.id);
                    }}
                    className={cn(
                      'h-auto w-full py-1.5 text-left',
                      isActive
                        ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                        : 'text-foreground hover:bg-muted',
                    )}
                  >
                    <WorkspaceAvatar name={workspace.name} size="sm" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm leading-tight font-medium">
                        {workspace.name}
                      </p>
                      <p className="text-muted-foreground truncate text-xs leading-tight">
                        {WORKSPACE_ROLE_LABELS[workspace.role]}
                      </p>
                    </div>
                    {isActive && (
                      <HugeiconsIcon
                        icon={Tick02Icon}
                        strokeWidth={2.5}
                        className="text-primary size-3.5 shrink-0"
                      />
                    )}
                  </Button>
                );
              })}

              {isFetchingNextPage && <LoadingMoreRow />}

              {hasNextPage && !isFetchingNextPage && (
                <div ref={sentinelRef} aria-hidden className="h-px shrink-0" />
              )}
            </div>

            <Separator />

            <Button
              variant="ghost"
              className="w-full"
              onClick={() => {
                setPopoverOpen(false);
                setDialogOpen(true);
              }}
            >
              <HugeiconsIcon icon={PlusSignIcon} strokeWidth={2} className="size-4" />
              Add workspace
            </Button>
          </PopoverContent>
        </Popover>
      )}

      <CreateWorkspaceDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onCreated={handleCreated}
      />
    </>
  );
};
