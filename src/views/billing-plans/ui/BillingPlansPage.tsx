import { ArrowLeft01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import Link from 'next/link';

import { Button } from '~/shared/ui/kit';
import { PlansGrid } from '~/widgets/billing';

export const BillingPlansPage = () => {
  return (
    <div className="flex w-full flex-1 flex-col gap-4 p-4 sm:gap-6 sm:p-6">
      <div className="space-y-1">
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="text-muted-foreground -ml-2 w-fit"
        >
          <Link href="/billing">
            <HugeiconsIcon icon={ArrowLeft01Icon} strokeWidth={1.8} className="size-4" />
            Back to billing
          </Link>
        </Button>

        <h1 className="font-heading text-foreground text-2xl leading-tight font-semibold">
          Plans
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          Choose the plan that fits your team. You can change plans at any time.
        </p>
      </div>

      <PlansGrid />
    </div>
  );
};
