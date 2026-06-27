'use client';

import { HugeiconsIcon } from '@hugeicons/react';
import { AlertDiamondIcon } from '@hugeicons/core-free-icons';

import { USAGE_OVERAGE } from '~/entities/billing';
import { useSearchParam } from '~/shared/lib';
import { Button, Card, CardContent, CardHeader, CardTitle } from '~/shared/ui/kit';

export const UsageOverageAlert = () => {
  const [, setTab] = useSearchParam('tab', 'overview');

  return (
    <Card>
      <CardHeader>
        <CardTitle>Usage overages</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="border-warning/40 bg-warning-subtle flex items-start gap-3 rounded-lg border p-3">
          <HugeiconsIcon
            icon={AlertDiamondIcon}
            strokeWidth={1.75}
            className="text-warning-foreground mt-0.5 size-5 shrink-0"
          />
          <p className="text-warning-foreground text-sm">
            You&apos;ve used {USAGE_OVERAGE.conversationsOver.toLocaleString('en-US')} AI
            conversations over your plan limit.
            <span className="mt-1 block opacity-80">
              Overages are billed at {USAGE_OVERAGE.ratePerConversation} per conversation.
            </span>
          </p>
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => setTab('billing-history')}
        >
          View overage history
        </Button>
      </CardContent>
    </Card>
  );
};
