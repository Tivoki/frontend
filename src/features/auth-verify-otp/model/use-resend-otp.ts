'use client';

import { useMutation } from '@tanstack/react-query';
import { apiClient } from '~/shared/api';

export const useResendOtp = (email: string) =>
  useMutation({
    mutationFn: () =>
      apiClient.post('api/v1/auth/resend-otp', { json: { email } }).json<void>(),
  });
