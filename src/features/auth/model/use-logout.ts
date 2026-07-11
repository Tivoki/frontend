'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { apiClient, getApiErrorMessage } from '~/shared/api';

export const useLogout = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: () => apiClient.post('auth/logout').json<void>(),
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
    onSuccess: () => {
      router.push('/');
    },
  });
};
