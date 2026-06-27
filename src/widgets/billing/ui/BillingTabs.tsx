'use client';

import { useSearchParam } from '~/shared/lib';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/shared/ui/kit';
import { BillingHistoryTab } from './BillingHistoryTab';
import { BillingInvoicesTab } from './BillingInvoicesTab';
import { BillingOverviewTab } from './BillingOverviewTab';
import { BillingPaymentMethodsTab } from './BillingPaymentMethodsTab';

const TABS = [
  { value: 'overview', label: 'Overview' },
  { value: 'invoices', label: 'Invoices' },
  { value: 'payment-methods', label: 'Payment methods' },
  { value: 'billing-history', label: 'Billing history' },
] as const;

export const BillingTabs = () => {
  const [tab, setTab] = useSearchParam('tab', 'overview');

  return (
    <Tabs value={tab} onValueChange={setTab} className="gap-4">
      <div className="border-border overflow-x-auto overflow-y-hidden border-b">
        <TabsList variant="line" className="w-max">
          {TABS.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      <TabsContent value="overview">
        <BillingOverviewTab />
      </TabsContent>
      <TabsContent value="invoices">
        <BillingInvoicesTab />
      </TabsContent>
      <TabsContent value="payment-methods">
        <BillingPaymentMethodsTab />
      </TabsContent>
      <TabsContent value="billing-history">
        <BillingHistoryTab />
      </TabsContent>
    </Tabs>
  );
};
