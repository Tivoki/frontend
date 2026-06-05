'use client';

import { Controller, useFormContext, useWatch } from 'react-hook-form';

import { ImageUploadIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

import { cn } from '~/shared/lib';
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
  Textarea,
} from '~/shared/ui/kit';
import { LAUNCHER_STYLES, WELCOME_MSG_MAX } from '~/entities/widget';
import type { WidgetConfig } from '~/entities/widget';

import { ColorPickerField } from './ColorPickerField';

const LABEL_CLASS = 'text-muted-foreground text-xs';

export const AppearanceSection = () => {
  const { control } = useFormContext<WidgetConfig>();
  const primaryColor = useWatch({ control, name: 'primaryColor' });

  return (
    <section className="space-y-4">
      <h2 className="text-foreground text-sm font-semibold">Appearance</h2>

      <FieldGroup className="gap-4">
        <div className="grid grid-cols-2 gap-3">
          <Controller
            control={control}
            name="primaryColor"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="appearance-primary-color" className={LABEL_CLASS}>
                  Primary color
                </FieldLabel>
                <ColorPickerField
                  id="appearance-primary-color"
                  label="Primary color"
                  value={field.value}
                  onChange={field.onChange}
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            control={control}
            name="secondaryColor"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="appearance-secondary-color" className={LABEL_CLASS}>
                  Secondary color
                </FieldLabel>
                <ColorPickerField
                  id="appearance-secondary-color"
                  label="Secondary color"
                  value={field.value}
                  onChange={field.onChange}
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </div>

        <Controller
          control={control}
          name="position"
          render={({ field }) => (
            <Field>
              <FieldLabel className={LABEL_CLASS}>Position</FieldLabel>
              <div className="flex gap-2">
                {(['bottom-right', 'bottom-left'] as const).map((pos) => (
                  <Button
                    key={pos}
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => field.onChange(pos)}
                    className={cn(
                      'capitalize',
                      field.value === pos ? 'border-primary bg-primary/10 text-primary' : '',
                    )}
                  >
                    {pos.split('-').join(' ')}
                  </Button>
                ))}
              </div>
            </Field>
          )}
        />

        <Controller
          control={control}
          name="launcherStyle"
          render={({ field }) => (
            <Field>
              <FieldLabel htmlFor="appearance-launcher-style" className={LABEL_CLASS}>
                Launcher style
              </FieldLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="appearance-launcher-style" className="w-full">
                  <span className="text-sm">{field.value}</span>
                </SelectTrigger>
                <SelectContent position="popper">
                  {LAUNCHER_STYLES.map((style) => (
                    <SelectItem key={style} value={style}>
                      {style}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          )}
        />

        <Controller
          control={control}
          name="welcomeMessage"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="flex items-center justify-between">
                <FieldLabel htmlFor="appearance-welcome" className={LABEL_CLASS}>
                  Welcome message
                </FieldLabel>
                <span className="text-muted-foreground text-xs">
                  {field.value?.length ?? 0}/{WELCOME_MSG_MAX}
                </span>
              </div>
              <Textarea
                {...field}
                id="appearance-welcome"
                maxLength={WELCOME_MSG_MAX}
                rows={2}
                aria-invalid={fieldState.invalid}
                className="resize-none text-sm"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          control={control}
          name="chatTitle"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="appearance-chat-title" className={LABEL_CLASS}>
                Chat title
              </FieldLabel>
              <Input
                {...field}
                id="appearance-chat-title"
                aria-invalid={fieldState.invalid}
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Field>
          <FieldLabel className={LABEL_CLASS}>Avatar</FieldLabel>
          <div className="flex items-center gap-3">
            <div
              className="text-primary-foreground flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold"
              style={{ backgroundColor: primaryColor }}
            >
              AI
            </div>
            <div className="flex gap-2">
              <Button type="button" variant="outline" size="sm" className="gap-1.5">
                <HugeiconsIcon icon={ImageUploadIcon} strokeWidth={1.75} className="size-3.5" />
                Change avatar
              </Button>
              <Button type="button" variant="ghost" size="sm">
                Remove
              </Button>
            </div>
          </div>
        </Field>
      </FieldGroup>
    </section>
  );
};
