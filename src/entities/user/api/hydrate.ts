import type { QueryClient } from '@tanstack/react-query';
import { userKeys } from '../model/keys';
import type { Me } from '../model/types';

export const seedMe = (queryClient: QueryClient, me: Me): void => {
  queryClient.setQueryData(userKeys.me(), me);
};
