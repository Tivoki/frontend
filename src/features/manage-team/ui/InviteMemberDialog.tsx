'use client';

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { WORKSPACE_ROLE_LABELS } from '~/entities/workspace';
import type { WorkspaceRole } from '~/entities/workspace';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/shared/ui/kit';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { inviteMemberSchema, type InviteMemberFormData } from '../model/schema';
import { useInviteMember } from '../model/use-invite-member';

const FORM_ID = 'invite-member-form';

/** Roles that can be assigned when inviting a member (the owner role is immutable). */
const INVITABLE_ROLES: WorkspaceRole[] = ['ADMIN', 'AGENT', 'VIEWER'];

interface InviteMemberDialogProps {
  workspaceId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const InviteMemberDialog = ({
  workspaceId,
  open,
  onOpenChange,
}: InviteMemberDialogProps) => {
  const form = useForm<InviteMemberFormData>({
    resolver: standardSchemaResolver(inviteMemberSchema),
    defaultValues: { email: '', role: 'AGENT' },
  });

  const { mutateAsync, isPending } = useInviteMember(workspaceId);

  useEffect(() => {
    if (!open) form.reset();
  }, [open, form]);

  const onSubmit = async (data: InviteMemberFormData) => {
    try {
      await mutateAsync(data);
      onOpenChange(false);
    } catch {
      // Error toast is surfaced by the mutation's onError handler.
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[min(24rem,calc(100%-2rem))]">
        <DialogHeader>
          <DialogTitle>Invite member</DialogTitle>
          <DialogDescription>Send an invite to join this workspace.</DialogDescription>
        </DialogHeader>

        <form id={FORM_ID} onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={`${FORM_ID}-email`}>Email</FieldLabel>
                  <Input
                    {...field}
                    id={`${FORM_ID}-email`}
                    type="email"
                    placeholder="name@company.com"
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
                  <FieldLabel htmlFor={`${FORM_ID}-role`}>Role</FieldLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id={`${FORM_ID}-role`} className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {INVITABLE_ROLES.map((role) => (
                        <SelectItem key={role} value={role}>
                          {WORKSPACE_ROLE_LABELS[role]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>
        </form>

        <DialogFooter showCloseButton>
          <Button type="submit" form={FORM_ID} disabled={isPending}>
            {isPending ? 'Sending…' : 'Send invite'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
