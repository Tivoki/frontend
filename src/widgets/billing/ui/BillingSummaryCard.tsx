'use client';

import { BILLING_SUMMARY } from '~/entities/billing';
import { useSearchParam } from '~/shared/lib';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Separator,
} from '~/shared/ui/kit';

export const BillingSummaryCard = () => {
  const [, setTab] = useSearchParam('tab', 'overview');

  return (
    <Card>
      <CardHeader>
        <CardTitle>Billing summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Subscription</span>
          <span className="text-foreground font-medium">
            {BILLING_SUMMARY.subscription}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Usage overages</span>
          <span className="text-foreground font-medium">
            {BILLING_SUMMARY.usageOverages}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Tax ({BILLING_SUMMARY.taxRate})</span>
          <span className="text-foreground font-medium">{BILLING_SUMMARY.taxAmount}</span>
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <span className="text-foreground text-sm font-semibold">Total</span>
          <span className="text-foreground text-sm font-semibold">
            {BILLING_SUMMARY.total}
          </span>
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => setTab('invoices')}
        >
          View invoices
        </Button>
      </CardContent>
    </Card>
  );
};
