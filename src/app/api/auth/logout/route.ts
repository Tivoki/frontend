import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { clearAuthCookies } from '~/shared/api/index.server';

/**
 * Local session teardown: drops the auth cookies and lands on the login page.
 * Server renders bounce here on a 401 (see serverApiGet) — the cookie cleanup
 * is what breaks the /dashboard ↔ /auth/login redirect loop a stale-but-
 * unexpired token would otherwise cause.
 */
export function GET(request: NextRequest) {
  return clearAuthCookies(
    NextResponse.redirect(new URL('/auth/login', request.url)),
  );
}
