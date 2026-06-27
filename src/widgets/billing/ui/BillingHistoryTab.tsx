import { BILLING_HISTORY } from '~/entities/billing';
import type { BillingHistoryEntryType } from '~/entities/billing';
import { cn } from '~/shared/lib';
import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/shared/ui/kit';

const HISTORY_TYPE: Record<
  BillingHistoryEntryType,
  { label: string; className: string }
> = {
  charge: {
    label: 'Charge',
    className: 'bg-muted text-muted-foreground border-transparent',
  },
  overage: {
    label: 'Overage',
    className: 'bg-amber-500/15 border-transparent text-amber-600 dark:text-amber-400',
  },
  refund: {
    label: 'Refund',
    className: 'bg-success/15 text-success-foreground border-transparent',
  },
};

export const BillingHistoryTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Billing history</CardTitle>
        <CardDescription>
          A full ledger of charges, overages, and refunds.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <div className="divide-border divide-y sm:hidden">
          {BILLING_HISTORY.map((entry) => {
            const type = HISTORY_TYPE[entry.type];
            return (
              <div key={entry.id} className="flex items-center gap-3 px-4 py-3">
                <div className="min-w-0 flex-1">
                  <p className="text-foreground text-sm font-medium">
                    {entry.description}
                  </p>
                  <p className="text-muted-foreground text-xs">{entry.date}</p>
                </div>
                <Badge className={cn(type.className)}>{type.label}</Badge>
                <span className="text-foreground shrink-0 text-sm font-medium">
                  {entry.amount}
                </span>
              </div>
            );
          })}
        </div>

        <div className="hidden sm:block">
          <Table className="min-w-150">
            <TableHeader>
              <TableRow>
                <TableHead className="px-4 sm:px-5">Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="px-4 text-right sm:px-5">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {BILLING_HISTORY.map((entry) => {
                const type = HISTORY_TYPE[entry.type];
                return (
                  <TableRow key={entry.id}>
                    <TableCell className="text-muted-foreground px-4 whitespace-nowrap sm:px-5">
                      {entry.date}
                    </TableCell>
                    <TableCell className="text-foreground">{entry.description}</TableCell>
                    <TableCell>
                      <Badge className={cn(type.className)}>{type.label}</Badge>
                    </TableCell>
                    <TableCell className="text-foreground px-4 text-right font-medium sm:px-5">
                      {entry.amount}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
