'use client';

import { useQuery } from '@tanstack/react-query';
import { apiClient } from '~/shared/api';
import { userKeys } from '../model/keys';
import type { Me } from '../model/types';

export const useMe = (options?: { enabled?: boolean }) =>
  useQuery({
    queryKey: userKeys.me(),
    queryFn: () => apiClient.get('users/me').json<Me>(),
    enabled: options?.enabled ?? true,
  });
