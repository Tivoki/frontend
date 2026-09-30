'use client';

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { Controller, useForm, useWatch } from 'react-hook-form';
import type { Integration, TelegramIntegrationConfig } from '~/entities/integration';
import {
  topicRetentionSchema,
  type TopicRetentionFormData,
  useUpdateIntegration,
} from '~/features/manage-integrations';
import {
  Button,
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

const FORM_ID = 'telegram-topic-retention-form';

const MODE_OPTIONS: Array<{ value: TopicRetentionFormData['mode']; label: string }> = [
  { value: 'IMMEDIATE', label: 'Immediately after resolving' },
  { value: 'HOURS', label: 'After a number of hours' },
  { value: 'DAYS', label: 'After a number of days' },
  { value: 'NEVER', label: 'Never (keep forever)' },
];

interface TelegramRetentionFormProps {
  workspaceId: string;
  integration: Integration;
  onDone: () => void;
}

export const TelegramRetentionForm = ({
  workspaceId,
  integration,
  onDone,
}: TelegramRetentionFormProps) => {
  const config = integration.config as TelegramIntegrationConfig;
  const retention = config.topicRetention;

  const form = useForm<TopicRetentionFormData>({
    resolver: standardSchemaResolver(topicRetentionSchema),
    defaultValues: {
      mode: retention?.mode ?? 'IMMEDIATE',
      value: retention?.value ?? 2,
    },
  });

  const update = useUpdateIntegration(workspaceId);
  const mode = useWatch({ control: form.control, name: 'mode' });
  const showValue = mode === 'HOURS' || mode === 'DAYS';

  const onSubmit = (data: TopicRetentionFormData) => {
    update.mutate(
      { integrationId: integration.id, data: { topicRetention: data } },
      { onSuccess: onDone },
    );
  };

  return (
    <form
      id={FORM_ID}
      onSubmit={form.handleSubmit(onSubmit)}
      className="border-border space-y-3 rounded-lg border p-3"
    >
      <p className="text-sm font-medium">Delete resolved topics</p>

      <FieldGroup>
        <div className="flex items-end gap-2">
          <Controller
            name="mode"
            control={form.control}
            render={({ field }) => (
              <Field className="flex-1">
                <FieldLabel
                  htmlFor={`${FORM_ID}-mode`}
                  className="text-muted-foreground text-xs"
                >
                  When
                </FieldLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id={`${FORM_ID}-mode`} className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {MODE_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            )}
          />

          {showValue && (
            <Controller
              name="value"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="w-20" data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor={`${FORM_ID}-value`}
                    className="text-muted-foreground text-xs"
                  >
                    {mode === 'HOURS' ? 'Hours' : 'Days'}
                  </FieldLabel>
                  <Input
                    id={`${FORM_ID}-value`}
                    type="number"
                    min={1}
                    value={Number.isNaN(field.value) ? '' : field.value}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref}
                    aria-invalid={fieldState.invalid}
                  />
                </Field>
              )}
            />
          )}
        </div>
        {form.formState.errors.value && (
          <FieldError errors={[form.formState.errors.value]} />
        )}
      </FieldGroup>

      <Button type="submit" form={FORM_ID} className="w-full" disabled={update.isPending}>
        {update.isPending ? 'Saving…' : 'Save'}
      </Button>
    </form>
  );
};
