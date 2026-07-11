'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { AUTH_ERRORS } from '~/features/auth/model/auth.constants';
import { apiClient, getApiErrorMessage } from '~/shared/api';
import type { components } from '~/shared/api';
import { toRoute } from '~/shared/lib';

const safeRedirect = (target: string | null) =>
  toRoute(target && /^\/(?![/\\])/.test(target) ? target : '/dashboard');

export const useLogin = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  return useMutation({
    mutationFn: (data: components['schemas']['LoginDto']) =>
      apiClient.post('auth/login', { json: data }).json<void>(),
    onSuccess: () => router.push(safeRedirect(searchParams.get('redirect'))),
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
