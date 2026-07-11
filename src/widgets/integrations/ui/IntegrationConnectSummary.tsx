'use client';

import { InformationCircleIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import Link from 'next/link';
import type { Integration } from '~/entities/integration';
import { useWorkspaceHref } from '~/features/switch-workspace';
import { Button } from '~/shared/ui/kit';

interface IntegrationConnectSummaryProps {
  integration: Integration;
}

export const IntegrationConnectSummary = ({
  integration,
}: IntegrationConnectSummaryProps) => {
  const workspaceHref = useWorkspaceHref();

  return (
    <aside className="border-border bg-background rounded-2xl border p-4 shadow-xs sm:p-5 xl:sticky xl:top-4">
      <div className="bg-primary/10 text-primary mb-4 flex size-10 items-center justify-center rounded-full">
        <HugeiconsIcon
          icon={InformationCircleIcon}
          strokeWidth={1.8}
          className="size-5"
        />
      </div>

      <div className="space-y-2">
        <h2 className="font-heading text-foreground text-base font-semibold">
          Before you connect
        </h2>
        <p className="text-muted-foreground text-sm leading-6">
          The UI is ready for {integration.name}. The primary action is disabled until the
          backend authorization endpoint is connected.
        </p>
      </div>

      <div className="border-border my-5 border-t" />

      <dl className="grid gap-3 text-sm">
        <div className="flex items-center justify-between gap-3">
          <dt className="text-muted-foreground">Provider</dt>
          <dd className="text-foreground font-medium">{integration.name}</dd>
        </div>
        <div className="flex items-center justify-between gap-3">
          <dt className="text-muted-foreground">Status</dt>
          <dd className="text-foreground font-medium capitalize">{integration.status}</dd>
        </div>
        <div className="flex items-center justify-between gap-3">
          <dt className="text-muted-foreground">Category</dt>
          <dd className="text-foreground font-medium capitalize">
            {integration.category}
          </dd>
        </div>
      </dl>

      <Button asChild variant="outline" className="mt-5 w-full">
        <Link href={workspaceHref('integrations')}>Cancel</Link>
      </Button>
    </aside>
  );
};
