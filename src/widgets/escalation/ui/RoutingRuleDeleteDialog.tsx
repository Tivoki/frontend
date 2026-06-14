import type { RoutingRule } from '~/entities/escalation';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '~/shared/ui/kit';

interface RoutingRuleDeleteDialogProps {
  rule: RoutingRule | null;
  onConfirm: (id: string) => void;
  onClose: () => void;
}

export const RoutingRuleDeleteDialog = ({
  rule,
  onConfirm,
  onClose,
}: RoutingRuleDeleteDialogProps) => {
  return (
    <AlertDialog open={!!rule} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete rule?</AlertDialogTitle>
          <AlertDialogDescription>
            Rule &ldquo;{rule?.condition}&rdquo; will be permanently removed.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={() => rule && onConfirm(rule.id)}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
