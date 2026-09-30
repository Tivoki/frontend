'use client';

import { Delete01Icon, FlashIcon, Settings02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useState } from 'react';
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
import { INTEGRATION_CATALOG } from '../model/catalog';
import type { Integration, IntegrationStatus, IntegrationType } from '../model/types';
import { IntegrationIcon } from './IntegrationIcon';

const STATUS_DOT: Record<IntegrationStatus, string> = {
  CONNECTED: 'bg-success',
  PENDING: 'bg-amber-500',
  ERROR: 'bg-destructive',
};

const STATUS_TEXT: Record<IntegrationStatus, string> = {
  CONNECTED: 'text-success-foreground',
  PENDING: 'text-amber-600 dark:text-amber-400',
  ERROR: 'text-destructive',
};

const STATUS_LABEL: Record<IntegrationStatus, string> = {
  CONNECTED: 'Connected',
  PENDING: 'Awaiting confirmation',
  ERROR: 'Needs attention',
};

interface IntegrationCardProps {
  type: IntegrationType;
  integration?: Integration;
  onConnect: (type: IntegrationType) => void;
  onConfigure: (type: IntegrationType, integration: Integration) => void;
  onTest: (integration: Integration) => void;
  onDisconnect: (integration: Integration) => void;
  className?: string;
}

export const IntegrationCard = ({
  type,
  integration,
  onConnect,
  onConfigure,
  onTest,
  onDisconnect,
  className,
}: IntegrationCardProps) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const entry = INTEGRATION_CATALOG[type];

  return (
    <>
      <article
        className={cn(
          'group border-border bg-card hover:border-primary/30 flex min-h-50 flex-col overflow-hidden rounded-xl border shadow-xs transition-colors hover:shadow-sm',
          className,
        )}
      >
        <div className="flex-1 space-y-4 p-4 sm:p-5">
          <IntegrationIcon type={type} />
          <div className="min-w-0 space-y-2">
            <h3 className="font-heading text-foreground text-sm leading-5 font-semibold">
              {entry.name}
            </h3>
            <p className="text-muted-foreground text-sm leading-6 sm:text-[0.8125rem]">
              {entry.description}
            </p>
          </div>
        </div>

        <div className="border-border bg-background/60 mt-auto flex min-h-14 items-center justify-between border-t px-4 py-3 sm:px-5">
          {!integration ? (
            <Button type="button" variant="outline" size="sm" onClick={() => onConnect(type)}>
              Connect
            </Button>
          ) : (
            <div
              className={cn(
                'flex items-center gap-2 text-sm font-medium',
                STATUS_TEXT[integration.status],
              )}
            >
              <span
                className={cn('size-2 rounded-full', STATUS_DOT[integration.status])}
                aria-hidden="true"
              />
              {STATUS_LABEL[integration.status]}
            </div>
          )}

          {integration && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  className="text-muted-foreground hover:text-foreground"
                  aria-label={`Manage ${entry.name}`}
                >
                  <HugeiconsIcon
                    icon={Settings02Icon}
                    strokeWidth={1.8}
                    className="size-4"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-40">
                {integration.status === 'PENDING' ? (
                  <DropdownMenuItem onClick={() => onConfigure(type, integration)}>
                    View instructions
                  </DropdownMenuItem>
                ) : (
                  <>
                    <DropdownMenuItem onClick={() => onConfigure(type, integration)}>
                      <HugeiconsIcon
                        icon={Settings02Icon}
                        strokeWidth={1.8}
                        className="size-4"
                      />
                      Configure
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onTest(integration)}>
                      <HugeiconsIcon icon={FlashIcon} strokeWidth={1.8} className="size-4" />
                      Send test notification
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  variant="destructive"
                  onClick={() => setDeleteDialogOpen(true)}
                >
                  <HugeiconsIcon icon={Delete01Icon} strokeWidth={1.8} className="size-4" />
                  Disconnect
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </article>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogTitle>Disconnect {entry.name}?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove the {entry.name} integration from your workspace, and it will
              stop receiving escalations. You can reconnect it at any time.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={() => integration && onDisconnect(integration)}
            >
              Disconnect
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
