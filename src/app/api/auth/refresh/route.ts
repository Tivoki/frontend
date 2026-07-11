import {
  appendSetCookies,
  REFRESH_TOKEN_COOKIE,
  refreshAuthCookies,
} from '~/shared/api/index.server';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Client-side session renewal: in-page requests that hit a 401 call this
 * same-origin endpoint, which rotates the tokens and sets the new cookies.
 * (Page navigations never need it — the proxy refreshes inline.)
 *
 * A failed refresh does NOT clear the cookies: the failure may be a lost
 * rotation race against the proxy, and deleting would wipe the winner's
 * fresh session. The caller redirects to login, where the proxy re-checks
 * the current jar and lets a raced loser straight back in.
 */
export async function POST(request: NextRequest) {
  const refreshToken = request.cookies.get(REFRESH_TOKEN_COOKIE)?.value;

  const setCookies = refreshToken ? await refreshAuthCookies(refreshToken) : null;

  if (!setCookies) return NextResponse.json({ ok: false }, { status: 401 });

  return appendSetCookies(NextResponse.json({ ok: true }), setCookies);
}
