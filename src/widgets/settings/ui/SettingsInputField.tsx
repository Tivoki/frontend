'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { Field, FieldError, FieldLabel, Input } from '~/shared/ui/kit';
import type { SettingsValues } from '~/entities/settings';
import type { SettingsStringField } from '../model/field-names';

interface SettingsInputFieldProps {
  name: SettingsStringField;
  label: string;
  type?: string;
  placeholder?: string;
  maxLength?: number;
  autoComplete?: string;
}

export const SettingsInputField = ({
  name,
  label,
  type = 'text',
  placeholder,
  maxLength,
  autoComplete = 'off',
}: SettingsInputFieldProps) => {
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
          <Input
            {...field}
            id={id}
            type={type}
            placeholder={placeholder}
            maxLength={maxLength}
            autoComplete={autoComplete}
            aria-invalid={fieldState.invalid}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};
