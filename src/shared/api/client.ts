'use client';

import ky from 'ky';

const getCsrfCookie = (): string | undefined => {
  if (typeof document === 'undefined') return undefined;
  return document.cookie
    .split('; ')
    .find((row) => row.startsWith('csrfToken='))
    ?.split('=')[1];
};

export const apiClient = ky.create({
  prefix: process.env.NEXT_PUBLIC_API_URL,
  credentials: 'include',
  hooks: {
    beforeRequest: [
      async ({ request }) => {
        const method = request.method.toUpperCase();
        if (['GET', 'HEAD', 'OPTIONS'].includes(method)) return;

        let token = getCsrfCookie();
        if (!token) {
          await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/csrf`, {
            credentials: 'include',
          });
          token = getCsrfCookie();
        }

        if (token) {
          request.headers.set('x-csrf-token', token);
        }
      },
    ],
  },
});
