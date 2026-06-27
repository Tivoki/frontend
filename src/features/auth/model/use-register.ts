'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { apiClient, getApiErrorMessage } from '~/shared/api';
import type { RegisterFormData } from './register.schema';
import { toast } from 'sonner';

export const useRegister = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: ({ confirmPassword: _, ...data }: RegisterFormData) =>
      apiClient.post('api/v1/auth/register', { json: data }).json<void>(),
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
