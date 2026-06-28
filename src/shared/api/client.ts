'use client';

import ky from 'ky';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getCsrfCookie = (): string | undefined => {
  if (typeof document === 'undefined') return undefined;
  return document.cookie
    .split('; ')
    .find((row) => row.startsWith('csrfToken='))
    ?.split('=')[1];
};

const performRefresh = async (): Promise<boolean> => {
  if (!API_URL) return false;
  const csrf = getCsrfCookie();
  try {
    const response = await fetch(`${API_URL}/api/v1/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
      headers: csrf ? { 'x-csrf-token': csrf } : undefined,
    });
    return response.ok;
  } catch {
    return false;
  }
};

let refreshPromise: Promise<boolean> | null = null;
const refreshSession = (): Promise<boolean> => {
  refreshPromise ??= performRefresh().finally(() => {
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
          await fetch(`${API_URL}/api/v1/auth/csrf`, {
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

        if (request.url.includes('/api/v1/auth/')) return;
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
