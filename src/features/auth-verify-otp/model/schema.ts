import { z } from 'zod';

export const verifyOtpSchema = z.object({
  otpCode: z
    .string()
    .length(6, 'Enter the 6-character code from your email')
    .regex(/^\d+$/, 'Code must contain only digits'),
});

export type VerifyOtpFormData = z.infer<typeof verifyOtpSchema>;
