'use client';

import { Controller, useForm } from 'react-hook-form';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import {
  Button,
  FieldError,
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '~/shared/ui/kit';

import { verifyOtpSchema, type VerifyOtpFormData } from '../model/schema';
import { useVerifyOtp } from '../model/use-verify-otp';
import { useResendOtp } from '../model/use-resend-otp';

const OTP_LENGTH = 6;

interface Props {
  email: string;
}

export const VerifyOtpForm = ({ email }: Props) => {
  const { mutate: verifyOtpMutate } = useVerifyOtp(email);
  const { mutate: resendOtpMutate, isPending: isResendOtpPending } = useResendOtp(email);

  const form = useForm<VerifyOtpFormData>({
    resolver: standardSchemaResolver(verifyOtpSchema),
    defaultValues: { otpCode: '' },
  });

  const onSubmit = (data: VerifyOtpFormData) => {
    verifyOtpMutate(data);
  };

  const handleResend = async () => {
    resendOtpMutate();
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
      <div className="flex flex-col items-center gap-5">
        <Controller
          name="otpCode"
          control={form.control}
          render={({ field, fieldState }) => (
            <div className="flex flex-col items-center gap-2">
              <InputOTP
                maxLength={OTP_LENGTH}
                value={field.value}
                onChange={field.onChange}
                onComplete={form.handleSubmit(onSubmit)}
                autoComplete="one-time-code"
                aria-invalid={fieldState.invalid}
                disabled={form.formState.isSubmitting}
              >
                <InputOTPGroup>
                  {Array.from({ length: OTP_LENGTH }).map((_, i) => (
                    <InputOTPSlot key={i} index={i} className="size-12 text-base" />
                  ))}
                </InputOTPGroup>
              </InputOTP>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </div>
          )}
        />

        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={form.formState.isSubmitting}
        >
          Verify email
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="w-full"
          disabled={isResendOtpPending}
          onClick={handleResend}
        >
          Resend code
        </Button>
      </div>
    </form>
  );
};
