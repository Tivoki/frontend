'use client';

import { INVOICES } from '~/entities/billing';
import { useSearchParam } from '~/shared/lib';
import {
  Button,
  Card,
  CardContent,
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

export const RecentInvoicesCard = () => {
  const recentInvoices = INVOICES.slice(0, 5);
  const [, setTab] = useSearchParam('tab', 'overview');

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent invoices</CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <div className="divide-border divide-y sm:hidden">
          {recentInvoices.map((invoice) => (
            <div key={invoice.id} className="flex items-center gap-3 px-4 py-3">
              <div className="min-w-0 flex-1">
                <p className="text-foreground text-sm font-medium">{invoice.number}</p>
                <p className="text-muted-foreground text-xs">{invoice.date}</p>
              </div>
              <InvoiceStatusBadge status={invoice.status} />
              <span className="text-foreground shrink-0 text-sm font-medium">
                {invoice.amount}
              </span>
            </div>
          ))}
        </div>

        <div className="hidden overflow-x-auto sm:block">
          <Table className="min-w-150">
            <TableHeader>
              <TableRow>
                <TableHead className="px-4 sm:px-5">Invoice</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Billing period</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead className="px-4 sm:px-5">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentInvoices.map((invoice) => (
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
                  <TableCell className="px-4 sm:px-5">
                    <InvoiceStatusBadge status={invoice.status} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="px-4 pt-4 sm:px-5">
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => setTab('invoices')}
          >
            View all invoices
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
