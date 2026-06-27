import { BillingCycleSummary } from './BillingCycleSummary';
import { BillingSummaryCard } from './BillingSummaryCard';
import { PlanSummaryCard } from './PlanSummaryCard';
import { RecentInvoicesCard } from './RecentInvoicesCard';
import { UsageOverageAlert } from './UsageOverageAlert';
import { UsageOverviewCard } from './UsageOverviewCard';

export const BillingOverviewTab = () => {
  return (
    <div className="space-y-4">
      <BillingCycleSummary />

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <UsageOverviewCard />
          <RecentInvoicesCard />
        </div>

        <div className="space-y-4 lg:col-span-1">
          <PlanSummaryCard />
          <BillingSummaryCard />
          <UsageOverageAlert />
        </div>
      </div>
    </div>
  );
};
