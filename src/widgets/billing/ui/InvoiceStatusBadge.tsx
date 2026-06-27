import type { InvoiceStatus } from '~/entities/billing';
import { cn } from '~/shared/lib';
import { Badge } from '~/shared/ui/kit';

const INVOICE_STATUS: Record<InvoiceStatus, { label: string; className: string }> = {
  paid: {
    label: 'Paid',
    className: 'bg-success/15 text-success-foreground border-transparent',
  },
  upcoming: {
    label: 'Upcoming',
    className: 'bg-primary/10 text-primary border-transparent',
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

export const InvoiceStatusBadge = ({ status }: { status: InvoiceStatus }) => {
  const { label, className } = INVOICE_STATUS[status];
  return <Badge className={cn(className)}>{label}</Badge>;
};
