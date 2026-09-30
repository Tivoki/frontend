'use client';

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { Controller, useForm } from 'react-hook-form';
import type { Integration, WebhookIntegrationConfig } from '~/entities/integration';
import {
  useConnectIntegration,
  useUpdateIntegration,
  webhookIntegrationSchema,
  type WebhookIntegrationFormData,
} from '~/features/manage-integrations';
import { Button, Field, FieldError, FieldGroup, FieldLabel, Input } from '~/shared/ui/kit';

const FORM_ID = 'webhook-integration-form';

interface WebhookConnectFormProps {
  workspaceId: string;
  integration?: Integration;
  onDone: () => void;
}

export const WebhookConnectForm = ({
  workspaceId,
  integration,
  onDone,
}: WebhookConnectFormProps) => {
  const config = integration?.config as WebhookIntegrationConfig | undefined;
  const form = useForm<WebhookIntegrationFormData>({
    resolver: standardSchemaResolver(webhookIntegrationSchema),
    defaultValues: { url: config?.url ?? '' },
  });

  const connect = useConnectIntegration(workspaceId);
  const update = useUpdateIntegration(workspaceId);
  const isPending = connect.isPending || update.isPending;

  const onSubmit = (data: WebhookIntegrationFormData) => {
    if (integration) {
      update.mutate(
        { integrationId: integration.id, data: { url: data.url } },
        { onSuccess: onDone },
      );
    } else {
      connect.mutate({ type: 'WEBHOOK', url: data.url }, { onSuccess: onDone });
    }
  };

  return (
    <form id={FORM_ID} onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <FieldGroup>
        <Controller
          name="url"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={`${FORM_ID}-url`}>Endpoint URL</FieldLabel>
              <Input
                {...field}
                id={`${FORM_ID}-url`}
                type="url"
                placeholder="https://example.com/webhooks/escalations"
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
