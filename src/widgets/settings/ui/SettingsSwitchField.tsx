'use client';

import { Controller, useFormContext } from 'react-hook-form';

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  Switch,
} from '~/shared/ui/kit';
import type { SettingsValues } from '~/entities/settings';
import type { SettingsBooleanField } from '../model/field-names';

interface SettingsSwitchFieldProps {
  name: SettingsBooleanField;
  label: string;
  description?: string;
}

export const SettingsSwitchField = ({
  name,
  label,
  description,
}: SettingsSwitchFieldProps) => {
  const { control } = useFormContext<SettingsValues>();
  const id = `settings-switch-${name}`;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Field orientation="horizontal">
          <FieldContent>
            <FieldLabel htmlFor={id} className="text-sm">
              {label}
            </FieldLabel>
            {description && (
              <FieldDescription className="text-xs">{description}</FieldDescription>
            )}
          </FieldContent>
          <Switch id={id} checked={field.value} onCheckedChange={field.onChange} />
        </Field>
      )}
    />
  );
};
