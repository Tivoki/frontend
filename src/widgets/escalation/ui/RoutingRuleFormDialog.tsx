import type { RoutingRule } from '~/entities/escalation';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '~/shared/ui/kit';

interface RoutingRuleFormDialogProps {
  open: boolean;
  rule: RoutingRule | null;
  isFallback?: boolean;
  onClose: () => void;
}

export const RoutingRuleFormDialog = ({
  open,
  rule,
  isFallback = false,
  onClose,
}: RoutingRuleFormDialogProps) => {
  const title = isFallback
    ? 'Edit fallback destination'
    : rule
      ? 'Edit routing rule'
      : 'Create routing rule';

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <p className="text-muted-foreground text-sm">Rule form coming soon.</p>
      </DialogContent>
    </Dialog>
  );
};
