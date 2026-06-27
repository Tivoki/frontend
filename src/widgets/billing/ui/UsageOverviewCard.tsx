import { HugeiconsIcon } from '@hugeicons/react';
import Link from 'next/link';

import { USAGE_METRICS } from '~/entities/billing';
import {
  Button,
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '~/shared/ui/kit';

export const UsageOverviewCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Usage overview</CardTitle>
        <CardAction>
          <Button type="button" variant="outline" size="sm">
            This month
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-5">
        {USAGE_METRICS.map((metric) => {
          const pct = Math.min(100, Math.round((metric.used / metric.limit) * 100));
          const used = metric.unit
            ? `${metric.used} ${metric.unit}`
            : metric.used.toLocaleString('en-US');
          const limit = metric.unit
            ? `${metric.limit} ${metric.unit}`
            : metric.limit.toLocaleString('en-US');

          return (
            <div key={metric.id} className="flex items-center gap-3">
              <div
                className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${metric.iconClassName}`}
              >
                <HugeiconsIcon
                  icon={metric.icon}
                  strokeWidth={1.75}
                  className="size-4.5"
                />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-foreground text-sm font-medium">{metric.label}</p>
                    <p className="text-muted-foreground text-xs">{metric.description}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-foreground text-sm font-medium">
                      {used} <span className="text-muted-foreground">/ {limit}</span>
                    </p>
                    <p className="text-muted-foreground text-xs">{pct}%</p>
                  </div>
                </div>
                <div className="bg-muted mt-2 h-2 w-full overflow-hidden rounded-full">
                  <div
                    className={`h-full rounded-full ${metric.barClassName}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}

        <Button asChild variant="outline" className="w-full">
          <Link href="/settings?tab=usage">View full usage analytics</Link>
        </Button>
      </CardContent>
    </Card>
  );
};
