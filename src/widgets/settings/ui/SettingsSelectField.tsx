'use client';

import type { SettingsValues } from '~/entities/settings';
import {
  Field,
  FieldLabel,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/shared/ui/kit';
import { Controller, useFormContext } from 'react-hook-form';
import type { SettingsStringField } from '../model/field-names';

interface SettingsSelectFieldProps {
  name: SettingsStringField;
  label: string;
  options: readonly string[];
}

export const SettingsSelectField = ({
  name,
  label,
  options,
}: SettingsSelectFieldProps) => {
  const { control } = useFormContext<SettingsValues>();
  const id = `settings-${name}`;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Field>
          <FieldLabel htmlFor={id} className="text-muted-foreground text-xs">
            {label}
          </FieldLabel>
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger id={id} className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      )}
    />
  );
};
