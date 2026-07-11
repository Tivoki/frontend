'use client';

import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';

import type { WorkspaceWithMembers } from '~/entities/workspace';
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Field,
  FieldLabel,
  FieldError,
  FieldGroup,
  Input,
} from '~/shared/ui/kit';

import { useCreateWorkspace } from '../model/use-create-workspace';
import { createWorkspaceSchema, type CreateWorkspaceFormData } from '../model/schema';

const FORM_ID = 'create-workspace-form';

interface CreateWorkspaceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated?: (workspace: WorkspaceWithMembers) => void;
  dismissible?: boolean;
}

export const CreateWorkspaceDialog = ({
  open,
  onOpenChange,
  onCreated,
  dismissible = true,
}: CreateWorkspaceDialogProps) => {
  const form = useForm<CreateWorkspaceFormData>({
    resolver: standardSchemaResolver(createWorkspaceSchema),
    defaultValues: { name: '' },
  });

  const { mutate, isPending } = useCreateWorkspace();

  useEffect(() => {
    if (!open) form.reset();
  }, [open, form]);

  const onSubmit = (data: CreateWorkspaceFormData) => {
    mutate(data, {
      onSuccess: (workspace) => {
        onCreated?.(workspace);
        onOpenChange(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-[min(24rem,calc(100%-2rem))]"
        showCloseButton={dismissible}
        onEscapeKeyDown={dismissible ? undefined : (e) => e.preventDefault()}
        onInteractOutside={dismissible ? undefined : (e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>New workspace</DialogTitle>
          <DialogDescription>
            Create a new workspace to manage a separate team or customer environment.
          </DialogDescription>
        </DialogHeader>

        <form id={FORM_ID} onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={`${FORM_ID}-name`}>Workspace name</FieldLabel>
                  <Input
                    {...field}
                    id={`${FORM_ID}-name`}
                    placeholder="Acme Corporation"
                    autoComplete="off"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>
        </form>

        <DialogFooter showCloseButton={dismissible}>
          <Button type="submit" form={FORM_ID} disabled={isPending}>
            {isPending ? 'Creating…' : 'Create workspace'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
