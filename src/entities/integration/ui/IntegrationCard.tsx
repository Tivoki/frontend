'use client';

import { useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Delete01Icon, PencilEdit01Icon, Settings02Icon } from '@hugeicons/core-free-icons';

import { cn } from '~/shared/lib';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/shared/ui/kit';

import type { Integration } from '../model/types';
import { IntegrationIcon } from './IntegrationIcon';

interface IntegrationCardProps {
  integration: Integration;
  onConnect?: (integration: Integration) => void;
  onEdit?: (integration: Integration) => void;
  onDelete?: (integration: Integration) => void;
  className?: string;
}

export const IntegrationCard = ({
  integration,
  onConnect,
  onEdit,
  onDelete,
  className,
}: IntegrationCardProps) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const isConnected = integration.status === 'connected';

  return (
    <>
      <article
        className={cn(
          'group border-border bg-card hover:border-primary/30 flex min-h-50 flex-col overflow-hidden rounded-xl border shadow-xs transition-colors hover:shadow-sm',
          className,
        )}
      >
        <div className="flex-1 space-y-4 p-4 sm:p-5">
          <IntegrationIcon brand={integration.brand} name={integration.name} />
          <div className="min-w-0 space-y-2">
            <h3 className="font-heading text-foreground text-sm leading-5 font-semibold">
              {integration.name}
            </h3>
            <p className="text-muted-foreground text-sm leading-6 sm:text-[0.8125rem]">
              {integration.description}
            </p>
          </div>
        </div>

        <div className="border-border bg-background/60 mt-auto flex min-h-14 items-center justify-between border-t px-4 py-3 sm:px-5">
          {isConnected ? (
            <div className="flex items-center gap-2 text-sm font-medium text-success-foreground">
              <span className="size-2 rounded-full bg-success" aria-hidden="true" />
              Connected
            </div>
          ) : (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onConnect?.(integration)}
            >
              Connect
            </Button>
          )}

          {isConnected && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  className="text-muted-foreground hover:text-foreground"
                  aria-label={`Configure ${integration.name}`}
                >
                  <HugeiconsIcon icon={Settings02Icon} strokeWidth={1.8} className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-36">
                <DropdownMenuItem onClick={() => onEdit?.(integration)}>
                  <HugeiconsIcon icon={PencilEdit01Icon} strokeWidth={1.8} className="size-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive" onClick={() => setDeleteDialogOpen(true)}>
                  <HugeiconsIcon icon={Delete01Icon} strokeWidth={1.8} className="size-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </article>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogTitle>Disconnect {integration.name}?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove the {integration.name} integration from your workspace. You can
              reconnect it at any time.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={() => onDelete?.(integration)}>
              Disconnect
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
