'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { apiClient, getApiErrorMessage } from '~/shared/api';
import type { LoginFormData } from './login.schema';
import { AUTH_ERRORS } from '~/features/auth/model/auth.constants';
import { toast } from 'sonner';

export const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: LoginFormData) =>
      apiClient.post('api/v1/auth/login', { json: data }).json<void>(),
    onSuccess: () => router.push('/dashboard'),
    onError: (error, variables) => {
      const message = getApiErrorMessage(error);

      if (message.includes(AUTH_ERRORS.UNCONFIRMED_EMAIL)) {
        const params = new URLSearchParams({ email: variables.email });
        router.push(`/auth/verify-otp?${params.toString()}`);
        return;
      }

      toast.error(message);
    },
  });
};
