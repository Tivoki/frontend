import { Tick02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import type { PlanTier } from '~/entities/billing';
import { cn } from '~/shared/lib';
import { Badge, Button, Card, CardContent, CardHeader, CardTitle } from '~/shared/ui/kit';

export const PlanTierCard = ({ plan }: { plan: PlanTier }) => {
  return (
    <Card className={cn(plan.isHighlighted && 'border-primary ring-primary/20 ring-2')}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {plan.name}
          {plan.isCurrent && (
            <Badge className="bg-primary/10 text-primary border-transparent">
              Current
            </Badge>
          )}
        </CardTitle>
        <p className="text-muted-foreground text-sm">{plan.description}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-foreground text-3xl font-semibold">
          {plan.price}
          <span className="text-muted-foreground text-base font-normal">
            /{plan.interval}
          </span>
        </p>

        <ul className="space-y-2">
          {plan.features.map((feature) => (
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

        <Button
          type="button"
          variant={plan.isCurrent ? 'outline' : 'default'}
          disabled={plan.isCurrent}
          className="w-full"
        >
          {plan.ctaLabel}
        </Button>
      </CardContent>
    </Card>
  );
};
