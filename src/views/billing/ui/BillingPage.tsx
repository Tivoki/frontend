import { Wallet01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import Link from 'next/link';
import { Suspense } from 'react';
import { Button } from '~/shared/ui/kit';
import { BillingTabs } from '~/widgets/billing';

export const BillingPage = () => {
  return (
    <div className="flex w-full flex-1 flex-col gap-4 p-4 sm:gap-6 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1">
          <h1 className="font-heading text-foreground text-2xl leading-tight font-semibold">
            Billing
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Manage your subscription, usage, and payment details.
          </p>
        </div>

        <div>
          <Button asChild>
            <Link href="/dashboard/billing/plans">
              <HugeiconsIcon icon={Wallet01Icon} strokeWidth={1.75} className="size-4" />
              Manage plan
            </Link>
          </Button>
        </div>
      </div>

      <Suspense fallback={null}>
        <BillingTabs />
      </Suspense>
    </div>
  );
};
