'use client';

import { useState } from 'react';
import type { Integration, IntegrationType } from '~/entities/integration';
import { INTEGRATION_TYPES, useIntegrations } from '~/entities/integration';
import { useActiveWorkspaceId } from '~/features/switch-workspace';
import {
  useConnectIntegration,
  useDisconnectIntegration,
  useTestIntegration,
} from '~/features/manage-integrations';
import { Skeleton } from '~/shared/ui/kit';
import { IntegrationConnectSheet } from './IntegrationConnectSheet';
import { IntegrationsSection } from './IntegrationsSection';

export const IntegrationsBrowser = () => {
  const workspaceId = useActiveWorkspaceId() ?? '';
  const { data: integrations, isLoading } = useIntegrations(workspaceId || null);
  const connect = useConnectIntegration(workspaceId);
  const disconnect = useDisconnectIntegration(workspaceId);
  const test = useTestIntegration(workspaceId);
  const [openType, setOpenType] = useState<IntegrationType | null>(null);

  const integrationsByType = new Map<IntegrationType, Integration>(
    (integrations ?? []).map((integration) => [integration.type, integration]),
  );
  const activeIntegration = openType ? integrationsByType.get(openType) : undefined;

  const handleConnect = (type: IntegrationType) => {
    // Telegram has no user-supplied config: create it immediately so the sheet
    // can show the connect code right away.
    if (type === 'TELEGRAM') {
      connect.mutate({ type: 'TELEGRAM' }, { onSuccess: () => setOpenType('TELEGRAM') });
      return;
    }
    setOpenType(type);
  };

  return (
    <div className="flex flex-1 flex-col">
      <div className="border-border flex flex-col gap-4 border-b px-4 py-5 sm:px-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-1">
          <h1 className="font-heading text-foreground text-2xl leading-tight font-semibold">
            Integrations
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Connect the channels you want to use for human handoff.
          </p>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        {isLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {INTEGRATION_TYPES.map((type) => (
              <Skeleton key={type} className="h-50 rounded-xl" />
            ))}
          </div>
        ) : (
          <IntegrationsSection
            types={INTEGRATION_TYPES}
            integrationsByType={integrationsByType}
            onConnect={handleConnect}
            onConfigure={(type) => setOpenType(type)}
            onTest={(integration) => test.mutate(integration.id)}
            onDisconnect={(integration) => disconnect.mutate(integration.id)}
          />
        )}
      </div>

      <IntegrationConnectSheet
        workspaceId={workspaceId}
        type={openType}
        integration={activeIntegration}
        onClose={() => setOpenType(null)}
      />
    </div>
  );
};
