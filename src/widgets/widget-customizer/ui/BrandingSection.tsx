'use client';

import { ImageUploadIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Controller, useFormContext } from 'react-hook-form';
import type { WidgetConfig } from '~/entities/widget';
import {
  Button,
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  Input,
} from '~/shared/ui/kit';

const LABEL_CLASS = 'text-muted-foreground text-xs';

export const BrandingSection = () => {
  const { control } = useFormContext<WidgetConfig>();

  return (
    <section className="space-y-4">
      <h2 className="text-foreground text-sm font-semibold">Branding</h2>

      <FieldGroup className="gap-4">
        <Field>
          <FieldLabel className={LABEL_CLASS}>Logo</FieldLabel>
          <div className="flex items-center gap-3">
            <div className="border-border bg-muted text-muted-foreground flex size-10 shrink-0 items-center justify-center rounded-lg border border-dashed">
              <HugeiconsIcon
                icon={ImageUploadIcon}
                strokeWidth={1.75}
                className="size-4"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-muted-foreground truncate text-xs">
                acme-logo.png — 32 × 32
              </p>
            </div>
            <Button type="button" variant="outline" size="sm">
              Change
            </Button>
          </div>
        </Field>

        <div className="grid gap-3 sm:grid-cols-2">
          <Controller
            control={control}
            name="brandingTitle"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="branding-title" className={LABEL_CLASS}>
                  Title
                </FieldLabel>
                <Input
                  {...field}
                  id="branding-title"
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            control={control}
            name="brandingSubtitle"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="branding-subtitle" className={LABEL_CLASS}>
                  Subtitle
                </FieldLabel>
                <Input
                  {...field}
                  id="branding-subtitle"
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </div>
      </FieldGroup>
    </section>
  );
};
