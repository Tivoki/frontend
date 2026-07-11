'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { apiClient, getApiErrorMessage } from '~/shared/api';
import type { components } from '~/shared/api';
import { toast } from 'sonner';

export const useRegister = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: components['schemas']['RegisterDto']) =>
      apiClient.post('auth/register', { json: data }).json<void>(),
    onSuccess: (_data, variables) => {
      const params = new URLSearchParams({ email: variables.email });
      router.push(`/auth/verify-otp?${params.toString()}`);
      return;
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
};
