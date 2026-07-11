import { Tick02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import Link from 'next/link';
import { CURRENT_PLAN } from '~/entities/billing';
import { Badge, Button, Card, CardContent, CardHeader, CardTitle } from '~/shared/ui/kit';

export const PlanSummaryCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Your plan
          <Badge className="bg-primary/10 text-primary border-transparent">
            {CURRENT_PLAN.name}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-foreground text-3xl font-semibold">
          {CURRENT_PLAN.price}
          <span className="text-muted-foreground text-base font-normal">
            /{CURRENT_PLAN.interval}
          </span>
        </p>
        <p className="text-muted-foreground text-sm">Billed monthly</p>

        <ul className="space-y-2">
          {CURRENT_PLAN.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-sm">
              <HugeiconsIcon
                icon={Tick02Icon}
                strokeWidth={2}
                className="text-primary mt-0.5 size-4 shrink-0"
              />
              <span className="text-foreground">{feature}</span>
            </li>
          ))}
        </ul>

        <Button asChild className="w-full">
          <Link href="/dashboard/billing/plans">Manage plan</Link>
        </Button>
      </CardContent>
    </Card>
  );
};
