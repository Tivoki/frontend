'use client';

import { Controller, useFormContext } from 'react-hook-form';

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  Switch,
} from '~/shared/ui/kit';
import type { WidgetConfig } from '~/entities/widget';

// Only the boolean keys of WidgetConfig are valid switch targets.
type BooleanKey = {
  [K in keyof WidgetConfig]: WidgetConfig[K] extends boolean ? K : never;
}[keyof WidgetConfig];

interface SwitchFieldProps {
  name: BooleanKey;
  label: string;
  description?: string;
}

export const SwitchField = ({ name, label, description }: SwitchFieldProps) => {
  const { control } = useFormContext<WidgetConfig>();
  const id = `switch-${name}`;

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
