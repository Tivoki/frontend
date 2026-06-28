import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const ACCESS_COOKIE = 'accessToken';
const REFRESH_COOKIE = 'refreshToken';
const CSRF_COOKIE = 'csrfToken';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const accessSecret = process.env.AT_SECRET
  ? new TextEncoder().encode(process.env.AT_SECRET)
  : null;

async function isAccessTokenValid(token: string | undefined): Promise<boolean> {
  if (!token || !accessSecret) return false;
  try {
    await jwtVerify(token, accessSecret, { algorithms: ['HS256'] });
    return true;
  } catch {
    return false;
  }
}

async function refreshSession(request: NextRequest): Promise<string[] | null> {
  const refreshToken = request.cookies.get(REFRESH_COOKIE)?.value;
  const csrfToken = request.cookies.get(CSRF_COOKIE)?.value;

  if (!refreshToken || !csrfToken || !API_URL) return null;

  try {
    const response = await fetch(`${API_URL}/api/v1/auth/refresh`, {
      method: 'POST',
      headers: {
        'x-csrf-token': csrfToken,
        cookie: `${REFRESH_COOKIE}=${refreshToken}; ${CSRF_COOKIE}=${csrfToken}`,
      },
    });

    if (!response.ok) return null;
    return response.headers.getSetCookie();
  } catch {
    return null;
  }
}

function forwardCookies(response: NextResponse, cookies: string[] | null): NextResponse {
  if (cookies) {
    for (const cookie of cookies) {
      response.headers.append('set-cookie', cookie);
    }
  }
  return response;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isDashboardRoute = pathname.startsWith('/dashboard');
  const isAuthRoute = pathname.startsWith('/auth');

  if (!isDashboardRoute && !isAuthRoute) {
    return NextResponse.next();
  }

  const isPrefetch =
    request.headers.get('next-router-prefetch') !== null ||
    request.headers.get('purpose') === 'prefetch';

  let isAuthenticated = await isAccessTokenValid(request.cookies.get(ACCESS_COOKIE)?.value);
  let refreshedCookies: string[] | null = null;

  if (!isAuthenticated && !isPrefetch) {
    refreshedCookies = await refreshSession(request);
    isAuthenticated = refreshedCookies !== null;
  }

  if (isDashboardRoute && !isAuthenticated) {
    if (isPrefetch) return NextResponse.next();

    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthRoute && isAuthenticated) {
    return forwardCookies(NextResponse.redirect(new URL('/dashboard', request.url)), refreshedCookies);
  }

  return forwardCookies(NextResponse.next(), refreshedCookies);
}

export const config = {
  matcher: ['/dashboard/:path*', '/auth/:path*'],
};
