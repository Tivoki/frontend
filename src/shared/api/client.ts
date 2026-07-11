'use client';

import ky from 'ky';
import { AUTH_CONSTANTS } from '~/shared/lib';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getCsrfCookie = (): string | undefined => {
  if (typeof document === 'undefined') return undefined;
  return document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${AUTH_CONSTANTS.csrfTokenCookie}=`))
    ?.split('=')[1];
};

let refreshPromise: Promise<boolean> | null = null;
const refreshSession = (): Promise<boolean> => {
  refreshPromise ??= fetch('/api/auth/refresh', { method: 'POST' })
    .then((response) => response.ok)
    .catch(() => false)
    .finally(() => {
      refreshPromise = null;
    });
  return refreshPromise;
};

const redirectToLogin = (): void => {
  if (typeof window === 'undefined') return;
  const target = encodeURIComponent(window.location.pathname + window.location.search);
  window.location.href = `/auth/login?redirect=${target}`;
};

export const apiClient = ky.create({
  prefix: API_URL,
  credentials: 'include',
  hooks: {
    beforeRequest: [
      async ({ request }) => {
        const method = request.method.toUpperCase();
        if (['GET', 'HEAD', 'OPTIONS'].includes(method)) return;

        let token = getCsrfCookie();
        if (!token) {
          await fetch(`${API_URL}/auth/csrf`, {
            credentials: 'include',
          });
          token = getCsrfCookie();
        }

        if (token) {
          request.headers.set('x-csrf-token', token);
        }
      },
    ],
    afterResponse: [
      async ({ request, response, retryCount }) => {
        if (response.status !== 401) return;

        if (request.url.includes('/auth/')) return;
        if (retryCount > 0) return;

        const refreshed = await refreshSession();
        if (!refreshed) {
          redirectToLogin();
          return;
        }

        return ky.retry();
      },
    ],
  },
});
