'use client';

import { Controller, useFormContext } from 'react-hook-form';

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  Textarea,
} from '~/shared/ui/kit';
import type { WidgetConfig } from '~/entities/widget';

import { SwitchField } from './SwitchField';

const LABEL_CLASS = 'text-muted-foreground text-xs';

export const SecuritySection = () => {
  const { control } = useFormContext<WidgetConfig>();

  return (
    <section className="space-y-4">
      <h2 className="text-foreground text-sm font-semibold">Security</h2>

      <div className="flex flex-col gap-5">
        <Controller
          control={control}
          name="allowedDomains"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="security-domains" className={LABEL_CLASS}>
                Allowed domains
              </FieldLabel>
              <Textarea
                {...field}
                id="security-domains"
                rows={3}
                placeholder={'acme.com\napp.acme.com'}
                aria-invalid={fieldState.invalid}
                className="resize-none font-mono text-xs"
              />
              <FieldDescription className="text-xs">
                One domain per line. Leave empty to allow the widget on any domain.
              </FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <SwitchField
          name="identityVerification"
          label="Identity verification"
          description="Require an HMAC signature to verify logged-in users and prevent impersonation."
        />

        <SwitchField
          name="requireCookieConsent"
          label="Cookie consent"
          description="Ask visitors for consent before the widget stores any cookies (GDPR)."
        />

        <SwitchField
          name="enableCaptcha"
          label="Spam protection"
          description="Show a CAPTCHA to anonymous visitors before they can send a message."
        />
      </div>
    </section>
  );
};
