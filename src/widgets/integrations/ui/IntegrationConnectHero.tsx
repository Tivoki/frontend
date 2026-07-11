'use client';

import { ArrowLeft01Icon, Plug01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { IntegrationIcon, type Integration } from '~/entities/integration';
import { useWorkspaceHref } from '~/features/switch-workspace';
import { Badge, Button } from '~/shared/ui/kit';
import Link from 'next/link';

interface IntegrationConnectHeroProps {
  integration: Integration;
}

export const IntegrationConnectHero = ({ integration }: IntegrationConnectHeroProps) => {
  const workspaceHref = useWorkspaceHref();

  return (
    <section className="border-border bg-background rounded-2xl border p-4 shadow-xs sm:p-6">
      <Button
        asChild
        variant="ghost"
        size="sm"
        className="text-muted-foreground mb-5 w-fit"
      >
        <Link href={workspaceHref('integrations')}>
          <HugeiconsIcon icon={ArrowLeft01Icon} strokeWidth={1.8} className="size-4" />
          Back to integrations
        </Link>
      </Button>

      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center">
          <IntegrationIcon
            brand={integration.brand}
            name={integration.name}
            className="size-14"
          />
          <div className="min-w-0 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="font-heading text-foreground text-2xl leading-tight font-semibold sm:text-3xl">
                Connect {integration.name}
              </h1>
              <Badge
                variant={integration.status === 'connected' ? 'secondary' : 'outline'}
              >
                {integration.status === 'connected' ? 'Connected' : 'Available'}
              </Badge>
            </div>
            <p className="text-muted-foreground max-w-2xl text-sm leading-6 sm:text-base">
              {integration.description} Configure credentials, review permissions, and
              prepare the connection flow before wiring the live API.
            </p>
          </div>
        </div>

        <Button type="button" disabled className="w-full sm:w-fit">
          <HugeiconsIcon icon={Plug01Icon} strokeWidth={1.8} className="size-4" />
          Start connection
        </Button>
      </div>
    </section>
  );
};
