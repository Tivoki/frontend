'use client';

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import {
  EyeIcon,
  LockPasswordIcon,
  Mail01Icon,
  ViewOffIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { GoogleIcon } from '~/shared/icons';
import {
  Button,
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from '~/shared/ui/kit';
import { loginSchema, type LoginFormData } from '../model/login.schema';
import { useLogin } from '../model/use-login';

const FORM_ID = 'login-form';

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate } = useLogin();

  const form = useForm<LoginFormData>({
    resolver: standardSchemaResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = (data: LoginFormData) => {
    mutate(data);
  };

  return (
    <div className="space-y-4">
      <form id={FORM_ID} onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <FieldGroup>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={`${FORM_ID}-email`}>Email</FieldLabel>
                <InputGroup>
                  <InputGroupAddon>
                    <InputGroupText>
                      <HugeiconsIcon
                        icon={Mail01Icon}
                        strokeWidth={1.75}
                        className="size-4"
                      />
                    </InputGroupText>
                  </InputGroupAddon>
                  <InputGroupInput
                    {...field}
                    id={`${FORM_ID}-email`}
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    aria-invalid={fieldState.invalid}
                  />
                </InputGroup>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <div className="flex items-center justify-between">
                  <FieldLabel htmlFor={`${FORM_ID}-password`}>Password</FieldLabel>
                  <button
                    type="button"
                    className="text-primary hover:text-primary/80 text-xs font-medium transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
                <InputGroup>
                  <InputGroupAddon>
                    <InputGroupText>
                      <HugeiconsIcon
                        icon={LockPasswordIcon}
                        strokeWidth={1.75}
                        className="size-4"
                      />
                    </InputGroupText>
                  </InputGroupAddon>
                  <InputGroupInput
                    {...field}
                    id={`${FORM_ID}-password`}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    aria-invalid={fieldState.invalid}
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton
                      onClick={() => setShowPassword((v) => !v)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      <HugeiconsIcon
                        icon={showPassword ? ViewOffIcon : EyeIcon}
                        strokeWidth={1.75}
                        className="size-4"
                      />
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Button
            type="submit"
            size="lg"
            className="mt-1 w-full"
            disabled={form.formState.isSubmitting}
          >
            Sign in
          </Button>
        </FieldGroup>
      </form>

      <div>
        <Button type="button" variant="outline" size="lg" className="w-full gap-2">
          <GoogleIcon className="size-4 shrink-0" />
          <span className="text-sm">Continue with Google</span>
        </Button>
      </div>
    </div>
  );
};
