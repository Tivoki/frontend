'use client';

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
import { useRemoveMember } from '../model/use-remove-member';

export interface RemovableMember {
  id: string;
  label: string;
}

interface RemoveMemberDialogProps {
  workspaceId: string;
  member: RemovableMember | null;
  onClose: () => void;
}

export const RemoveMemberDialog = ({
  workspaceId,
  member,
  onClose,
}: RemoveMemberDialogProps) => {
  const { mutate, isPending } = useRemoveMember(workspaceId);

  return (
    <AlertDialog open={!!member} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogTitle>Remove member?</AlertDialogTitle>
          <AlertDialogDescription>
            {member?.label} will lose access to this workspace.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            disabled={isPending}
            onClick={() => {
              if (!member) return;
              mutate(member.id, { onSuccess: onClose });
            }}
          >
            Remove
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
