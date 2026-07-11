'use client';

import { useMutation } from '@tanstack/react-query';
import { apiClient, getApiErrorMessage } from '~/shared/api';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

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
