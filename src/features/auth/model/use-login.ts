'use client';

import { useMutation } from '@tanstack/react-query';
import type { Route } from 'next';
import { useRouter, useSearchParams } from 'next/navigation';
import { apiClient, getApiErrorMessage } from '~/shared/api';
import type { components } from '~/shared/api';
import { AUTH_ERRORS } from '~/features/auth/model/auth.constants';
import { toast } from 'sonner';

// A local path only, so a crafted ?redirect= can't bounce the user to another
// origin (protocol-relative `//` and backslash `/\` variants included).
const safeRedirect = (target: string | null): Route =>
  (target && /^\/(?![/\\])/.test(target) ? target : '/dashboard') as Route;

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
