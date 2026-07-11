import { serverApiGet } from '~/shared/api/index.server';
import type { ServerApiResult } from '~/shared/api/index.server';

import type { Me } from '../model/types';

export const getMe = (): Promise<ServerApiResult<Me>> => serverApiGet('users/me');
