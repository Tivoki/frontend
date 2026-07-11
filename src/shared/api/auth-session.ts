import type { NextResponse } from 'next/server';
import { AUTH_CONSTANTS } from '~/shared/lib';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const refreshAuthCookies = async (
  refreshToken: string,
): Promise<string[] | null> => {
  if (!API_URL) return null;

  try {
    const response = await fetch(`${API_URL}/auth/refresh`, {
      method: 'POST',
      headers: { cookie: `${AUTH_CONSTANTS.refreshTokenCookie}=${refreshToken}` },
      cache: 'no-store',
    });

    if (!response.ok) return null;

    const setCookies = response.headers.getSetCookie();
    return setCookies.length > 0 ? setCookies : null;
  } catch {
    return null;
  }
};

export const appendSetCookies = <T extends NextResponse>(
  response: T,
  setCookies: string[],
): T => {
  for (const setCookie of setCookies) {
    response.headers.append('set-cookie', setCookie);
  }
  return response;
};

export const clearAuthCookies = <T extends NextResponse>(response: T): T => {
  response.cookies.delete(AUTH_CONSTANTS.accessTokenCookie);
  response.cookies.delete(AUTH_CONSTANTS.refreshTokenCookie);
  return response;
};
