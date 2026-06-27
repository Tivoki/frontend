import { HugeiconsIcon } from '@hugeicons/react';
import { Download01Icon } from '@hugeicons/core-free-icons';

import { INVOICES } from '~/entities/billing';
import {
  Button,
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
import { InvoiceStatusBadge } from './InvoiceStatusBadge';

export const BillingInvoicesTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>All invoices</CardTitle>
        <CardDescription>Every invoice issued for your subscription.</CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <div className="divide-border divide-y sm:hidden">
          {INVOICES.map((invoice) => (
            <div key={invoice.id} className="flex items-center gap-3 px-4 py-3">
              <div className="min-w-0 flex-1">
                <p className="text-foreground text-sm font-medium">{invoice.number}</p>
                <p className="text-muted-foreground text-xs">
                  {invoice.date} · {invoice.period}
                </p>
              </div>
              <InvoiceStatusBadge status={invoice.status} />
              <span className="text-foreground shrink-0 text-sm font-medium">
                {invoice.amount}
              </span>
            </div>
          ))}
        </div>

        <div className="hidden sm:block">
          <Table className="min-w-150">
            <TableHeader>
              <TableRow>
                <TableHead className="px-4 sm:px-5">Invoice</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Billing period</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="px-4 text-right sm:px-5">Receipt</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {INVOICES.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="text-foreground px-4 font-medium sm:px-5">
                    {invoice.number}
                  </TableCell>
                  <TableCell className="text-muted-foreground whitespace-nowrap">
                    {invoice.date}
                  </TableCell>
                  <TableCell className="text-muted-foreground whitespace-nowrap">
                    {invoice.period}
                  </TableCell>
                  <TableCell className="text-foreground">{invoice.amount}</TableCell>
                  <TableCell>
                    <InvoiceStatusBadge status={invoice.status} />
                  </TableCell>
                  <TableCell className="px-4 text-right sm:px-5">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground hover:text-foreground gap-1.5"
                      disabled={invoice.status === 'upcoming'}
                    >
                      <HugeiconsIcon
                        icon={Download01Icon}
                        strokeWidth={1.75}
                        className="size-4"
                      />
                      Download
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
