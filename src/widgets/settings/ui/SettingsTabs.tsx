'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/shared/ui/kit';
import { ApiKeysSettings } from './ApiKeysSettings';
import { BillingSettings } from './BillingSettings';
import { DomainSettings } from './DomainSettings';
import { GeneralSettings } from './GeneralSettings';
import { TeamSettings } from './TeamSettings';
import { UsageSettings } from './UsageSettings';

const TABS = [
  { value: 'general', label: 'General' },
  { value: 'team', label: 'Team' },
  { value: 'billing', label: 'Billing' },
  { value: 'domains', label: 'Domains' },
  { value: 'api-keys', label: 'API Keys' },
  { value: 'usage', label: 'Usage' },
] as const;

export const SettingsTabs = () => {
  return (
    <Tabs defaultValue="general" className="gap-4">
      <div className="border-border -mx-4 overflow-x-auto border-b px-4 sm:-mx-6 sm:px-6">
        <TabsList variant="line" className="w-max">
          {TABS.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      <TabsContent value="general">
        <GeneralSettings />
      </TabsContent>
      <TabsContent value="team">
        <TeamSettings />
      </TabsContent>
      <TabsContent value="billing">
        <BillingSettings />
      </TabsContent>
      <TabsContent value="domains">
        <DomainSettings />
      </TabsContent>
      <TabsContent value="api-keys">
        <ApiKeysSettings />
      </TabsContent>
      <TabsContent value="usage">
        <UsageSettings />
      </TabsContent>
    </Tabs>
  );
};
