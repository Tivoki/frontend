'use client';

import { HugeiconsIcon } from '@hugeicons/react';
import { CreditCardIcon } from '@hugeicons/core-free-icons';

import {
  CURRENT_CYCLE,
  NEXT_PAYMENT_DATE,
  PAYMENT_METHODS,
  TOTAL_THIS_MONTH,
} from '~/entities/billing';
import { useSearchParam } from '~/shared/lib';
import { Button, Card, CardContent } from '~/shared/ui/kit';

export const BillingCycleSummary = () => {
  const defaultMethod = PAYMENT_METHODS.find((method) => method.isDefault);
  const [, setTab] = useSearchParam('tab', 'overview');

  return (
    <Card>
      <CardContent className="lg:divide-border grid grid-cols-1 gap-4 lg:grid-cols-3 lg:items-center lg:gap-6 lg:divide-x">
        <div>
          <p className="text-muted-foreground text-sm">Current cycle</p>
          <p className="text-foreground text-lg font-semibold">
            {CURRENT_CYCLE.start} – {CURRENT_CYCLE.end}
          </p>
          <p className="text-muted-foreground text-sm">
            {CURRENT_CYCLE.daysLeft} days left in your billing cycle
          </p>
        </div>

        <div className="lg:pl-6">
          <p className="text-muted-foreground text-sm">Total this month</p>
          <p className="text-foreground text-lg font-semibold">
            {TOTAL_THIS_MONTH} <span className="text-muted-foreground text-sm">USD</span>
          </p>
          <p className="text-muted-foreground text-sm">
            Next payment on {NEXT_PAYMENT_DATE}
          </p>
        </div>

        {defaultMethod && (
          <div className="lg:pl-6">
            <p className="text-muted-foreground text-sm">Payment method</p>
            <div className="mt-1 flex items-center gap-2">
              <span className="text-foreground inline-flex items-center gap-1.5 text-sm font-medium">
                <HugeiconsIcon
                  icon={CreditCardIcon}
                  strokeWidth={1.75}
                  className="size-4"
                />
                {defaultMethod.brand} •••• {defaultMethod.last4}
              </span>
              <Button
                type="button"
                variant="link"
                size="sm"
                className="h-auto p-0"
                onClick={() => setTab('payment-methods')}
              >
                Manage
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
