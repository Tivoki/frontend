'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { Field, FieldError, FieldLabel, Textarea } from '~/shared/ui/kit';
import type { SettingsValues } from '~/entities/settings';
import type { SettingsStringField } from '../model/field-names';

interface SettingsTextareaFieldProps {
  name: SettingsStringField;
  label: string;
  maxLength?: number;
  rows?: number;
}

export const SettingsTextareaField = ({
  name,
  label,
  maxLength,
  rows = 3,
}: SettingsTextareaFieldProps) => {
  const { control } = useFormContext<SettingsValues>();
  const id = `settings-${name}`;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <div className="flex items-center justify-between">
            <FieldLabel htmlFor={id} className="text-muted-foreground text-xs">
              {label}
            </FieldLabel>
            {maxLength && (
              <span className="text-muted-foreground text-xs">
                {field.value?.length ?? 0}/{maxLength}
              </span>
            )}
          </div>
          <Textarea
            {...field}
            id={id}
            rows={rows}
            maxLength={maxLength}
            aria-invalid={fieldState.invalid}
            className="resize-none text-sm"
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};
