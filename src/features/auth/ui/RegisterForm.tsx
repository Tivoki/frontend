'use client';

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import {
  EyeIcon,
  LockPasswordIcon,
  Mail01Icon,
  ViewOffIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
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
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { registerSchema, type RegisterFormData } from '../model/register.schema';
import { useRegister } from '../model/use-register';

const FORM_ID = 'register-form';

export const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { mutate } = useRegister();

  const form = useForm<RegisterFormData>({
    resolver: standardSchemaResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    mutate({
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
    });
  };

  return (
    <form id={FORM_ID} onSubmit={form.handleSubmit(onSubmit)} noValidate>
      <FieldGroup>
        <div className="flex flex-col gap-5 sm:flex-row sm:gap-2">
          <Controller
            name="firstName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={`${FORM_ID}-firstName`}>First name</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    {...field}
                    id={`${FORM_ID}-firstName`}
                    type="text"
                    placeholder="John"
                    autoComplete="name"
                    aria-invalid={fieldState.invalid}
                  />
                </InputGroup>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="lastName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={`${FORM_ID}-lastName`}>Last name</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    {...field}
                    id={`${FORM_ID}-lastName`}
                    type="text"
                    placeholder="Doe"
                    autoComplete="name"
                    aria-invalid={fieldState.invalid}
                  />
                </InputGroup>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </div>

        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={`${FORM_ID}-email`}>Work email</FieldLabel>
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
                  placeholder="you@company.com"
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
              <FieldLabel htmlFor={`${FORM_ID}-password`}>Password</FieldLabel>
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
                  placeholder="Min. 8 characters"
                  autoComplete="new-password"
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

        <Controller
          name="confirmPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={`${FORM_ID}-confirm-password`}>
                Confirm password
              </FieldLabel>
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
                  id={`${FORM_ID}-confirm-password`}
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Repeat your password"
                  autoComplete="new-password"
                  aria-invalid={fieldState.invalid}
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton
                    onClick={() => setShowConfirmPassword((v) => !v)}
                    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                  >
                    <HugeiconsIcon
                      icon={showConfirmPassword ? ViewOffIcon : EyeIcon}
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
          className="mt-2 w-full"
          disabled={form.formState.isSubmitting}
        >
          Create account
        </Button>
      </FieldGroup>
    </form>
  );
};
