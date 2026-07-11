import { toRoute } from '~/shared/lib';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { cache } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export type ServerApiResult<T> = { ok: true; data: T } | { ok: false; status: number };

export const serverApiGet = cache(
  async <T>(path: string): Promise<ServerApiResult<T>> => {
    const cookieStore = await cookies();

    const response = await fetch(`${API_URL}/${path}`, {
      headers: { cookie: cookieStore.toString() },
      cache: 'no-store',
    });

    if (response.status === 401) redirect(toRoute('/api/auth/logout'));
    if (!response.ok) return { ok: false, status: response.status };

    return { ok: true, data: (await response.json()) as T };
  },
);
