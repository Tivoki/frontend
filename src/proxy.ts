import { decodeJwt } from 'jose';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { appendSetCookies, refreshAuthCookies } from '~/shared/api/index.server';
import { AUTH_CONSTANTS } from '~/shared/lib';

const EXPIRY_LEEWAY_MS = 10_000;

type AuthStatus = 'authenticated' | 'expired' | 'unauthenticated';

const getAuthStatus = (request: NextRequest): AuthStatus => {
  const accessToken = request.cookies.get(AUTH_CONSTANTS.accessTokenCookie)?.value;

  if (accessToken) {
    try {
      const { exp } = decodeJwt(accessToken);
      if (exp && exp * 1000 > Date.now() + EXPIRY_LEEWAY_MS) return 'authenticated';
    } catch {
      // Malformed token — treat it like an expired one.
    }
  }

  return request.cookies.has(AUTH_CONSTANTS.refreshTokenCookie)
    ? 'expired'
    : 'unauthenticated';
};

const tryRefresh = (request: NextRequest): Promise<string[] | null> => {
  const refreshToken = request.cookies.get(AUTH_CONSTANTS.refreshTokenCookie)?.value;
  return refreshToken ? refreshAuthCookies(refreshToken) : Promise.resolve(null);
};

const continueWithRefreshedSession = (
  request: NextRequest,
  setCookies: string[],
): NextResponse => {
  const cookieJar = new Map(
    request.cookies.getAll().map(({ name, value }) => [name, value]),
  );
  for (const setCookie of setCookies) {
    const [name, ...value] = setCookie.split(';')[0].split('=');
    cookieJar.set(name.trim(), value.join('='));
  }

  const headers = new Headers(request.headers);
  headers.set(
    'cookie',
    [...cookieJar].map(([name, value]) => `${name}=${value}`).join('; '),
  );

  return appendSetCookies(NextResponse.next({ request: { headers } }), setCookies);
};

export async function proxy(request: NextRequest) {
  const response = await gate(request);

  response.headers.set('cache-control', 'no-store, must-revalidate');
  return response;
}

async function gate(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;
  const status = getAuthStatus(request);

  if (pathname.startsWith('/auth')) {
    if (status === 'authenticated') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    if (status === 'expired') {
      const setCookies = await tryRefresh(request);
      if (setCookies) {
        return appendSetCookies(
          NextResponse.redirect(new URL('/dashboard', request.url)),
          setCookies,
        );
      }
    }
    return NextResponse.next();
  }

  // /dashboard/*
  if (status === 'authenticated') return NextResponse.next();

  if (status === 'expired') {
    const setCookies = await tryRefresh(request);
    if (setCookies) return continueWithRefreshedSession(request, setCookies);
  }

  const loginUrl = new URL('/auth/login', request.url);
  loginUrl.searchParams.set('redirect', pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    {
      source: '/dashboard/:path*',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
    {
      source: '/auth/:path*',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};
