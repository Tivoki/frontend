import type { NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const ACCESS_TOKEN_COOKIE = 'accessToken';
export const REFRESH_TOKEN_COOKIE = 'refreshToken';
export const CSRF_TOKEN_COOKIE = 'csrfToken';

/**
 * Exchanges a refresh token for a fresh token pair. Runs on the server only
 * (proxy and the /api/auth routes) — the browser never talks to the backend
 * refresh endpoint directly.
 *
 * Returns the backend `Set-Cookie` strings to forward, or `null` when the
 * session can't be renewed.
 */
export const refreshAuthCookies = async (
  refreshToken: string,
): Promise<string[] | null> => {
  if (!API_URL) return null;

  try {
    const response = await fetch(`${API_URL}/auth/refresh`, {
      method: 'POST',
      headers: { cookie: `${REFRESH_TOKEN_COOKIE}=${refreshToken}` },
      cache: 'no-store',
    });

    if (!response.ok) return null;

    const setCookies = response.headers.getSetCookie();
    return setCookies.length > 0 ? setCookies : null;
  } catch {
    return null;
  }
};

/** Forwards backend `Set-Cookie` strings onto an outgoing response. */
export const appendSetCookies = <T extends NextResponse>(
  response: T,
  setCookies: string[],
): T => {
  for (const setCookie of setCookies) {
    response.headers.append('set-cookie', setCookie);
  }
  return response;
};

/** Removes the auth cookies from the browser via an outgoing response. */
export const clearAuthCookies = <T extends NextResponse>(response: T): T => {
  response.cookies.delete(ACCESS_TOKEN_COOKIE);
  response.cookies.delete(REFRESH_TOKEN_COOKIE);
  return response;
};
