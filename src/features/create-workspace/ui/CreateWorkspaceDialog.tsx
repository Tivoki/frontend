'use client';

import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';

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

import { createWorkspaceSchema, type CreateWorkspaceFormData } from '../model/schema';

const FORM_ID = 'create-workspace-form';

interface CreateWorkspaceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate?: (data: CreateWorkspaceFormData) => void;
}

export const CreateWorkspaceDialog = ({
  open,
  onOpenChange,
  onCreate,
}: CreateWorkspaceDialogProps) => {
  const form = useForm<CreateWorkspaceFormData>({
    resolver: standardSchemaResolver(createWorkspaceSchema),
    defaultValues: { name: '', role: '' },
  });

  useEffect(() => {
    if (!open) form.reset();
  }, [open, form]);

  const onSubmit = (data: CreateWorkspaceFormData) => {
    onCreate?.(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[min(24rem,calc(100%-2rem))]">
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

            <Controller
              name="role"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={`${FORM_ID}-role`}>Workspace type</FieldLabel>
                  <Input
                    {...field}
                    id={`${FORM_ID}-role`}
                    placeholder="Customer Workspace"
                    autoComplete="off"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>
        </form>

        <DialogFooter showCloseButton>
          <Button type="submit" form={FORM_ID} disabled={form.formState.isSubmitting}>
            Create workspace
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
