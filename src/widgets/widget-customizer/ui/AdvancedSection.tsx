'use client';

import type { WidgetConfig } from '~/entities/widget';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  Input,
  Textarea,
} from '~/shared/ui/kit';
import { Controller, useFormContext } from 'react-hook-form';
import { SwitchField } from './SwitchField';

const LABEL_CLASS = 'text-muted-foreground text-xs';

export const AdvancedSection = () => {
  const { control } = useFormContext<WidgetConfig>();

  return (
    <section className="space-y-4">
      <h2 className="text-foreground text-sm font-semibold">Advanced</h2>

      <div className="flex flex-col gap-5">
        <Controller
          control={control}
          name="customCss"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="advanced-css" className={LABEL_CLASS}>
                Custom CSS
              </FieldLabel>
              <Textarea
                {...field}
                id="advanced-css"
                rows={4}
                placeholder=".tikketi-launcher { box-shadow: none; }"
                aria-invalid={fieldState.invalid}
                className="resize-y font-mono text-xs"
              />
              <FieldDescription className="text-xs">
                Injected into the widget container. Scope your selectors carefully.
              </FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          control={control}
          name="zIndex"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="advanced-zindex" className={LABEL_CLASS}>
                z-index
              </FieldLabel>
              <Input
                id="advanced-zindex"
                type="number"
                value={Number.isNaN(field.value) ? '' : field.value}
                onChange={(e) => field.onChange(e.target.valueAsNumber)}
                onBlur={field.onBlur}
                name={field.name}
                ref={field.ref}
                aria-invalid={fieldState.invalid}
              />
              <FieldDescription className="text-xs">
                Stacking order of the widget relative to your page.
              </FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <SwitchField
          name="hideBranding"
          label='Remove "Powered by Tikketi"'
          description="Hide the Tikketi branding from the chat window."
        />
      </div>
    </section>
  );
};
