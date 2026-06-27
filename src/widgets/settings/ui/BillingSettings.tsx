'use client';

import { HugeiconsIcon } from '@hugeicons/react';
import { CreditCardIcon, Download01Icon } from '@hugeicons/core-free-icons';
import Link from 'next/link';

import { CURRENT_PLAN, INVOICES, PAYMENT_METHOD } from '~/entities/settings';
import type { InvoiceStatus } from '~/entities/settings';
import { cn } from '~/shared/lib';
import {
  Badge,
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

const INVOICE_STATUS: Record<InvoiceStatus, { label: string; className: string }> = {
  paid: {
    label: 'Paid',
    className: 'bg-success/15 text-success-foreground border-transparent',
  },
  pending: {
    label: 'Pending',
    className: 'bg-amber-500/15 border-transparent text-amber-600 dark:text-amber-400',
  },
  failed: {
    label: 'Failed',
    className: 'bg-destructive/10 text-destructive border-transparent',
  },
};

export const BillingSettings = () => {
  const seatsPct = Math.round((CURRENT_PLAN.seatsUsed / CURRENT_PLAN.seats) * 100);

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Current plan</CardTitle>
          <CardDescription>Manage your subscription and seats.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted/40 border-border flex flex-wrap items-center justify-between gap-3 rounded-lg border p-4">
            <div>
              <div className="flex items-center gap-2">
                <p className="text-foreground text-lg font-semibold">
                  {CURRENT_PLAN.name}
                </p>
                <Badge className="bg-primary/10 text-primary border-transparent">
                  Current
                </Badge>
              </div>
              <p className="text-muted-foreground text-sm">
                {CURRENT_PLAN.price}/{CURRENT_PLAN.interval} · renews{' '}
                {CURRENT_PLAN.renewsOn}
              </p>
            </div>
            <div className="flex gap-2">
              <Button asChild variant="outline" size="sm">
                <Link href="/dashboard/billing/plans">Change plan</Link>
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-destructive"
              >
                Cancel
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Seats used</span>
              <span className="text-foreground font-medium">
                {CURRENT_PLAN.seatsUsed} / {CURRENT_PLAN.seats}
              </span>
            </div>
            <div className="bg-muted h-2 w-full overflow-hidden rounded-full">
              <div
                className="bg-primary h-full rounded-full"
                style={{ width: `${seatsPct}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Payment method</CardTitle>
          <CardDescription>Used for recurring charges.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-border flex items-center gap-3 rounded-lg border p-3">
            <div className="bg-muted text-foreground flex size-10 shrink-0 items-center justify-center rounded-md">
              <HugeiconsIcon
                icon={CreditCardIcon}
                strokeWidth={1.75}
                className="size-5"
              />
            </div>
            <div className="min-w-0">
              <p className="text-foreground text-sm font-medium">
                {PAYMENT_METHOD.brand} ···· {PAYMENT_METHOD.last4}
              </p>
              <p className="text-muted-foreground text-xs">
                Expires {PAYMENT_METHOD.expiry}
              </p>
            </div>
          </div>
          <Button type="button" variant="outline" className="w-full">
            Update payment method
          </Button>
        </CardContent>
      </Card>

      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle>Billing history</CardTitle>
          <CardDescription>Download past invoices.</CardDescription>
        </CardHeader>
        <CardContent className="px-0">
          {/* Mobile: cards */}
          <div className="divide-border divide-y md:hidden">
            {INVOICES.map((invoice) => {
              const status = INVOICE_STATUS[invoice.status];
              return (
                <div key={invoice.id} className="flex items-center gap-3 px-4 py-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-foreground text-sm font-medium">
                      {invoice.number}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {invoice.date} · {invoice.plan}
                    </p>
                  </div>
                  <Badge className={status.className}>{status.label}</Badge>
                  <span className="text-foreground shrink-0 text-sm font-medium">
                    {invoice.amount}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Desktop: table */}
          <div className="hidden md:block">
            <Table className="min-w-150">
              <TableHeader>
                <TableRow>
                  <TableHead className="px-4 sm:px-5">Invoice</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="px-4 text-right sm:px-5">Receipt</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {INVOICES.map((invoice) => {
                  const status = INVOICE_STATUS[invoice.status];
                  return (
                    <TableRow key={invoice.id}>
                      <TableCell className="text-foreground px-4 font-medium sm:px-5">
                        {invoice.number}
                      </TableCell>
                      <TableCell className="text-muted-foreground whitespace-nowrap">
                        {invoice.date}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {invoice.plan}
                      </TableCell>
                      <TableCell className="text-foreground">{invoice.amount}</TableCell>
                      <TableCell>
                        <Badge className={cn(status.className)}>{status.label}</Badge>
                      </TableCell>
                      <TableCell className="px-4 text-right sm:px-5">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="text-muted-foreground hover:text-foreground gap-1.5"
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
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
