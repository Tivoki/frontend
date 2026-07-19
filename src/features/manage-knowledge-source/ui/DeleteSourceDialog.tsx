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
import { useDeleteKnowledgeSource } from '../model/use-delete-knowledge-source';

export interface DeletableSource {
  id: string;
  name: string;
}

interface DeleteSourceDialogProps {
  workspaceId: string;
  source: DeletableSource | null;
  onClose: () => void;
}

export const DeleteSourceDialog = ({
  workspaceId,
  source,
  onClose,
}: DeleteSourceDialogProps) => {
  const { mutate, isPending } = useDeleteKnowledgeSource(workspaceId);

  return (
    <AlertDialog open={!!source} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete source?</AlertDialogTitle>
          <AlertDialogDescription>
            {source?.name} and all of its documents and chunks will be permanently
            removed. This can&apos;t be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            disabled={isPending}
            onClick={() => {
              if (!source) return;
              mutate(source.id, { onSuccess: onClose });
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
