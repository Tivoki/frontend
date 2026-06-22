import { HugeiconsIcon } from '@hugeicons/react';
import {
  AiBrain01Icon,
  HardDriveIcon,
  MessageMultiple01Icon,
  ServerStack01Icon,
  UserGroupIcon,
} from '@hugeicons/core-free-icons';
import type { IconSvgElement } from '@hugeicons/react';

import { CURRENT_PLAN, USAGE_METRICS } from '~/entities/settings';
import { cn } from '~/shared/lib';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/shared/ui/kit';

const METRIC_ICON: Record<string, IconSvgElement> = {
  u1: MessageMultiple01Icon,
  u2: AiBrain01Icon,
  u3: UserGroupIcon,
  u4: HardDriveIcon,
  u5: ServerStack01Icon,
};

const formatValue = (value: number, unit: string) =>
  unit ? `${value} ${unit}` : value.toLocaleString('en-US');

export const UsageSettings = () => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Usage this period</CardTitle>
          <CardDescription>
            {CURRENT_PLAN.name} · resets on {CURRENT_PLAN.renewsOn}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {USAGE_METRICS.map((metric) => {
            const pct = Math.min(100, Math.round((metric.used / metric.limit) * 100));
            const isHigh = pct >= 80;

            return (
              <div key={metric.id} className="border-border rounded-xl border p-4">
                <div className="flex items-center gap-2">
                  <div className="bg-muted text-muted-foreground flex size-8 shrink-0 items-center justify-center rounded-lg">
                    <HugeiconsIcon
                      icon={METRIC_ICON[metric.id]}
                      strokeWidth={1.75}
                      className="size-4"
                    />
                  </div>
                  <p className="text-muted-foreground text-sm">{metric.label}</p>
                </div>

                <p className="text-foreground mt-3 text-2xl font-semibold">
                  {formatValue(metric.used, metric.unit)}
                  <span className="text-muted-foreground text-sm font-normal">
                    {' '}
                    / {formatValue(metric.limit, metric.unit)}
                  </span>
                </p>

                <div className="bg-muted mt-3 h-2 w-full overflow-hidden rounded-full">
                  <div
                    className={cn(
                      'h-full rounded-full',
                      isHigh ? 'bg-amber-500' : 'bg-primary',
                    )}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <p className="text-muted-foreground mt-1.5 text-xs">{pct}% used</p>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};
