import { decodeJwt } from 'jose';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
  ACCESS_TOKEN_COOKIE,
  appendSetCookies,
  REFRESH_TOKEN_COOKIE,
  refreshAuthCookies,
} from '~/shared/api/index.server';

// A token about to expire is as good as expired: don't let a request start
// with an access token that dies mid-flight.
const EXPIRY_LEEWAY_MS = 10_000;

type AuthStatus = 'authenticated' | 'expired' | 'unauthenticated';

const getAuthStatus = (request: NextRequest): AuthStatus => {
  const accessToken = request.cookies.get(ACCESS_TOKEN_COOKIE)?.value;

  if (accessToken) {
    try {
      const { exp } = decodeJwt(accessToken);
      if (exp && exp * 1000 > Date.now() + EXPIRY_LEEWAY_MS) return 'authenticated';
    } catch {
      // Malformed token — treat it like an expired one.
    }
  }

  return request.cookies.has(REFRESH_TOKEN_COOKIE) ? 'expired' : 'unauthenticated';
};

const tryRefresh = (request: NextRequest): Promise<string[] | null> => {
  const refreshToken = request.cookies.get(REFRESH_TOKEN_COOKIE)?.value;
  return refreshToken ? refreshAuthCookies(refreshToken) : Promise.resolve(null);
};

/**
 * Continues to the requested page with a just-refreshed session: the browser
 * receives the new cookies, and the request forwarded to the render is
 * rewritten so Server Components fetch with the new access token, not the
 * expired one the browser sent.
 */
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

  // Gated documents must never be reusable from the browser's disk cache
  // (history navigations may replay `no-cache` responses without hydration —
  // the root layout's reload script is the client-side half of this policy).
  response.headers.set('cache-control', 'no-store, must-revalidate');

  return response;
}

async function gate(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;
  const status = getAuthStatus(request);

  // Signed-in (or renewable) sessions don't belong on the auth pages.
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

  // Deliberately does NOT clear the cookies here: a parallel request may have
  // just won the refresh race (rotation invalidates the loser's token), and a
  // delete would wipe the winner's fresh session. With cookies intact, the
  // login page re-runs this gate against the current jar and bounces a raced
  // loser straight back into the dashboard.
  const loginUrl = new URL('/auth/login', request.url);
  loginUrl.searchParams.set('redirect', pathname);
  return NextResponse.redirect(loginUrl);
}

// Prefetches bypass the proxy (the `missing` blocks): refreshing on them
// would race the refresh-token rotation, and Next.js hides the prefetch
// headers inside the proxy precisely so it can't fork behavior per request.
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
