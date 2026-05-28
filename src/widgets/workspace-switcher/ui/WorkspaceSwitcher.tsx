'use client';

import { useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowUpDownIcon, PlusSignIcon, Tick02Icon } from '@hugeicons/core-free-icons';
import dynamic from 'next/dynamic';

import { cn } from '~/shared/lib';
import { Button, Popover, PopoverContent, PopoverTrigger, Separator } from '~/shared/ui/kit';
import type { Workspace } from '~/features/switch-workspace';
import type { CreateWorkspaceFormData } from '~/features/create-workspace';
import { WorkspaceAvatar } from './WorkspaceAvatar';

const CreateWorkspaceDialog = dynamic(() =>
  import('~/features/create-workspace').then((m) => ({ default: m.CreateWorkspaceDialog })),
);

const MOCK_WORKSPACES: Workspace[] = [
  { id: '1', name: 'Acme Corporation', role: 'Customer Workspace' },
  { id: '2', name: 'Globex Inc.', role: 'Support Workspace' },
  { id: '3', name: 'Initech LLC', role: 'Customer Workspace' },
];

interface WorkspaceSwitcherProps {
  workspaces?: Workspace[];
  defaultWorkspaceId?: string;
}

export const WorkspaceSwitcher = ({
  workspaces = MOCK_WORKSPACES,
  defaultWorkspaceId = '1',
}: WorkspaceSwitcherProps) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeId, setActiveId] = useState(defaultWorkspaceId);
  const [workspaceList, setWorkspaceList] = useState<Workspace[]>(workspaces);

  const active = workspaceList.find((w) => w.id === activeId) ?? workspaceList[0];

  const handleCreate = (data: CreateWorkspaceFormData) => {
    const newWorkspace: Workspace = { id: crypto.randomUUID(), ...data };
    setWorkspaceList((prev) => [...prev, newWorkspace]);
    setActiveId(newWorkspace.id);
  };

  return (
    <>
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger asChild>
          <Button variant="ghost" className="h-auto py-1.5 text-left">
            <WorkspaceAvatar name={active.name} />
            <div className="hidden min-w-0 lg:block">
              <p className="text-foreground truncate text-sm leading-tight font-semibold">
                {active.name}
              </p>
              <p className="text-muted-foreground truncate text-xs leading-tight">{active.role}</p>
            </div>
            <HugeiconsIcon
              icon={ArrowUpDownIcon}
              strokeWidth={2}
              className="text-muted-foreground ml-1 hidden size-3.5 shrink-0 xl:block"
            />
          </Button>
        </PopoverTrigger>

        <PopoverContent align="start" sideOffset={6} className="w-64 p-1">
          <p className="text-muted-foreground p-1 text-xs font-medium uppercase">Workspaces</p>

          <div className="flex flex-col gap-0.5">
            {workspaceList.map((workspace) => {
              const isActive = workspace.id === activeId;
              return (
                <Button
                  key={workspace.id}
                  variant="ghost"
                  onClick={() => {
                    setActiveId(workspace.id);
                    setPopoverOpen(false);
                  }}
                  className={cn(
                    'h-auto w-full py-1.5 text-left',
                    isActive
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                      : 'hover:bg-muted text-foreground',
                  )}
                >
                  <WorkspaceAvatar name={workspace.name} size="sm" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm leading-tight font-medium">{workspace.name}</p>
                    <p className="text-muted-foreground truncate text-xs leading-tight">
                      {workspace.role}
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

      <CreateWorkspaceDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onCreate={handleCreate}
      />
    </>
  );
};
