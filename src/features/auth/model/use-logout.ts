'use client';

import { useMutation } from '@tanstack/react-query';
import { apiClient, getApiErrorMessage } from '~/shared/api';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

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
