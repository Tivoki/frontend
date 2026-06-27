'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { apiClient } from '~/shared/api';
import type { VerifyOtpFormData } from './schema';

export const useVerifyOtp = (email: string) => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: VerifyOtpFormData) =>
      apiClient.post('api/v1/auth/verify-otp', { json: { email, ...data } }).json<void>(),
    onSuccess: () => {
      router.push('/auth/login');
    },
  });
};
