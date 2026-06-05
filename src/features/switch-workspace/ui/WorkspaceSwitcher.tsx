'use client';

import { useState } from 'react';

import { ArrowUpDownIcon, PlusSignIcon, Tick02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import dynamic from 'next/dynamic';

import { cn } from '~/shared/lib';
import { Button, Popover, PopoverContent, PopoverTrigger, Separator } from '~/shared/ui/kit';

import type { CreateWorkspaceFormData } from '~/features/create-workspace';
import type { Workspace } from '../model/types';
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
              <p className="truncate text-sm font-semibold leading-tight text-foreground">
                {active.name}
              </p>
              <p className="truncate text-xs leading-tight text-muted-foreground">{active.role}</p>
            </div>
            <HugeiconsIcon
              icon={ArrowUpDownIcon}
              strokeWidth={2}
              className="ml-1 hidden size-3.5 shrink-0 text-muted-foreground xl:block"
            />
          </Button>
        </PopoverTrigger>

        <PopoverContent align="start" sideOffset={6} className="w-64 p-1">
          <p className="p-1 text-xs font-medium uppercase text-muted-foreground">Workspaces</p>

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
                      : 'text-foreground hover:bg-muted',
                  )}
                >
                  <WorkspaceAvatar name={workspace.name} size="sm" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium leading-tight">{workspace.name}</p>
                    <p className="truncate text-xs leading-tight text-muted-foreground">
                      {workspace.role}
                    </p>
                  </div>
                  {isActive && (
                    <HugeiconsIcon
                      icon={Tick02Icon}
                      strokeWidth={2.5}
                      className="size-3.5 shrink-0 text-primary"
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
