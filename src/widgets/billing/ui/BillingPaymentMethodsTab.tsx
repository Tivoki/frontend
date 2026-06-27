import { HugeiconsIcon } from '@hugeicons/react';
import { CreditCardIcon, PlusSignIcon } from '@hugeicons/core-free-icons';

import { PAYMENT_METHODS } from '~/entities/billing';
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/shared/ui/kit';

export const BillingPaymentMethodsTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment methods</CardTitle>
        <CardDescription>Manage the cards used for your subscription.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {PAYMENT_METHODS.map((method) => (
          <div
            key={method.id}
            className="border-border flex flex-wrap items-center justify-between gap-3 rounded-lg border p-3"
          >
            <div className="flex items-center gap-3">
              <div className="bg-muted text-foreground flex size-10 shrink-0 items-center justify-center rounded-md">
                <HugeiconsIcon
                  icon={CreditCardIcon}
                  strokeWidth={1.75}
                  className="size-5"
                />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-foreground text-sm font-medium">
                    {method.brand} •••• {method.last4}
                  </p>
                  {method.isDefault && (
                    <Badge className="bg-primary/10 text-primary border-transparent">
                      Default
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground text-xs">Expires {method.expiry}</p>
              </div>
            </div>

            <div className="flex gap-2">
              {!method.isDefault && (
                <Button type="button" variant="outline" size="sm">
                  Set as default
                </Button>
              )}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-destructive"
              >
                Remove
              </Button>
            </div>
          </div>
        ))}

        <Button type="button" variant="outline" className="w-full gap-1.5">
          <HugeiconsIcon icon={PlusSignIcon} strokeWidth={1.75} className="size-4" />
          Add payment method
        </Button>
      </CardContent>
    </Card>
  );
};
