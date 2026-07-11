'use client';

import type { Integration, IntegrationStatus } from '~/entities/integration';
import { useWorkspaceHref } from '~/features/switch-workspace';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/shared/ui/kit';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { IntegrationsSection } from './IntegrationsSection';

type IntegrationTab = 'all' | IntegrationStatus;

interface IntegrationsBrowserProps {
  integrations: Integration[];
}

const TAB_ITEMS: Array<{ value: IntegrationTab; label: string }> = [
  { value: 'all', label: 'All integrations' },
  { value: 'connected', label: 'Connected' },
  { value: 'available', label: 'Available' },
];

export const IntegrationsBrowser = ({
  integrations: initialIntegrations,
}: IntegrationsBrowserProps) => {
  const router = useRouter();
  const workspaceHref = useWorkspaceHref();
  const [activeTab, setActiveTab] = useState<IntegrationTab>('all');
  const [integrations, setIntegrations] = useState(initialIntegrations);

  const connectedIntegrations = useMemo(
    () => integrations.filter((integration) => integration.status === 'connected'),
    [integrations],
  );

  const availableIntegrations = useMemo(
    () => integrations.filter((integration) => integration.status === 'available'),
    [integrations],
  );

  const handleConnect = (integration: Integration) => {
    router.push(workspaceHref(`integrations/${integration.id}/connect`));
  };

  const handleEdit = (integration: Integration) => {
    router.push(workspaceHref(`integrations/${integration.id}/edit`));
  };

  const handleDelete = (integration: Integration) => {
    setIntegrations((prev) =>
      prev.map((item) =>
        item.id === integration.id ? { ...item, status: 'available' } : item,
      ),
    );
  };

  return (
    <div className="flex flex-1 flex-col">
      <div className="border-border flex flex-col gap-4 border-b px-4 py-5 sm:px-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-1">
          <h1 className="font-heading text-foreground text-2xl leading-tight font-semibold">
            Integrations
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Connect your favorite tools and services to automate your workflow.
          </p>
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as IntegrationTab)}
        className="min-h-0 flex-1 gap-0"
      >
        <div className="border-border overflow-x-auto overflow-y-hidden border-b px-4 sm:px-6">
          <TabsList variant="line" className="gap-8 p-0">
            {TAB_ITEMS.map((item) => (
              <TabsTrigger
                key={item.value}
                value={item.value}
                className="px-0 text-sm font-semibold group-data-horizontal/tabs:after:bottom-0 data-[state=active]:after:opacity-100"
              >
                {item.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <div className="flex flex-col gap-6 p-4 sm:p-6">
          <TabsContent value="all" className="m-0 flex flex-col gap-6">
            <IntegrationsSection
              title="Connected integrations"
              description="These integrations are currently connected to your account."
              integrations={connectedIntegrations}
              onConnect={handleConnect}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />

            <IntegrationsSection
              title="Available integrations"
              description="Connect additional tools and services to enhance your workflow."
              integrations={availableIntegrations}
              onConnect={handleConnect}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </TabsContent>

          <TabsContent value="connected" className="m-0">
            <IntegrationsSection
              title="Connected integrations"
              description="These integrations are currently connected to your account."
              integrations={connectedIntegrations}
              onConnect={handleConnect}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </TabsContent>

          <TabsContent value="available" className="m-0">
            <IntegrationsSection
              title="Available integrations"
              description="Connect additional tools and services to enhance your workflow."
              integrations={availableIntegrations}
              onConnect={handleConnect}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};
