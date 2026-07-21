'use client';

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { Controller, useForm } from 'react-hook-form';
import type { EmailIntegrationConfig, Integration } from '~/entities/integration';
import {
  emailIntegrationSchema,
  type EmailIntegrationFormData,
  useConnectIntegration,
  useUpdateIntegration,
} from '~/features/manage-integrations';
import { Button, Field, FieldError, FieldGroup, FieldLabel, Input } from '~/shared/ui/kit';

const FORM_ID = 'email-integration-form';

interface EmailConnectFormProps {
  workspaceId: string;
  integration?: Integration;
  onDone: () => void;
}

export const EmailConnectForm = ({
  workspaceId,
  integration,
  onDone,
}: EmailConnectFormProps) => {
  const config = integration?.config as EmailIntegrationConfig | undefined;
  const form = useForm<EmailIntegrationFormData>({
    resolver: standardSchemaResolver(emailIntegrationSchema),
    defaultValues: { email: config?.email ?? '' },
  });

  const connect = useConnectIntegration(workspaceId);
  const update = useUpdateIntegration(workspaceId);
  const isPending = connect.isPending || update.isPending;

  const onSubmit = (data: EmailIntegrationFormData) => {
    if (integration) {
      update.mutate(
        { integrationId: integration.id, data: { email: data.email } },
        { onSuccess: onDone },
      );
    } else {
      connect.mutate({ type: 'EMAIL', email: data.email }, { onSuccess: onDone });
    }
  };

  return (
    <form id={FORM_ID} onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <FieldGroup>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={`${FORM_ID}-email`}>Support inbox email</FieldLabel>
              <Input
                {...field}
                id={`${FORM_ID}-email`}
                type="email"
                placeholder="support@yourcompany.com"
                autoComplete="off"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <Button type="submit" form={FORM_ID} disabled={isPending} className="w-full">
        {isPending ? 'Saving…' : integration ? 'Save' : 'Connect'}
      </Button>
    </form>
  );
};
