'use client';

import Link from 'next/link';
import { INTEGRATION_CATALOG, IntegrationIcon, useIntegrations } from '~/entities/integration';
import { useUpdateIntegration } from '~/features/manage-integrations';
import { useActiveWorkspaceId, useWorkspaceHref } from '~/features/switch-workspace';
import { Button, Skeleton, Switch } from '~/shared/ui/kit';

export const EscalationMethods = () => {
  const workspaceId = useActiveWorkspaceId();
  const workspaceHref = useWorkspaceHref();
  const { data: integrations, isLoading } = useIntegrations(workspaceId);
  const update = useUpdateIntegration(workspaceId ?? '');

  const connected = (integrations ?? []).filter((integration) => integration.status === 'CONNECTED');

  return (
    <section className="border-border bg-background flex h-95 flex-col rounded-2xl border shadow-xs">
      <div className="shrink-0 space-y-1 px-4 pt-4 sm:px-5 sm:pt-5">
        <h2 className="font-heading text-foreground text-base font-semibold">
          Escalation methods
        </h2>
        <p className="text-muted-foreground text-sm">
          Choose which connected channels notify your team.
        </p>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-3 sm:px-5">
        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className="h-14 w-full" />
            ))}
          </div>
        ) : connected.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
            <p className="text-muted-foreground text-sm">No integrations connected yet.</p>
            <Button type="button" variant="outline" size="sm" asChild>
              <Link href={workspaceHref('integrations')}>Connect an integration</Link>
            </Button>
          </div>
        ) : (
          <div className="divide-border flex flex-col divide-y">
            {connected.map((integration) => {
              const entry = INTEGRATION_CATALOG[integration.type];

              return (
                <div
                  key={integration.id}
                  className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
                >
                  <IntegrationIcon type={integration.type} className="size-9 rounded-lg" />

                  <div className="min-w-0 flex-1">
                    <p className="text-foreground text-sm font-medium">{entry.name}</p>
                    <p className="text-muted-foreground truncate text-xs">
                      {entry.description}
                    </p>
                  </div>

                  <Switch
                    checked={integration.useForEscalation}
                    disabled={update.isPending}
                    onCheckedChange={(checked) =>
                      update.mutate({
                        integrationId: integration.id,
                        data: { useForEscalation: checked },
                      })
                    }
                    aria-label={`Use ${entry.name} for escalation`}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="border-border shrink-0 border-t px-4 py-3 sm:px-5">
        <Button type="button" variant="outline" size="sm" asChild>
          <Link href={workspaceHref('integrations')}>Manage integrations</Link>
        </Button>
      </div>
    </section>
  );
};
