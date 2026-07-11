import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
  appendSetCookies,
  refreshAuthCookies,
} from '~/shared/api/index.server';
import { AUTH_CONSTANTS } from '~/shared/lib';

export async function POST(request: NextRequest) {
  const refreshToken = request.cookies.get(AUTH_CONSTANTS.refreshTokenCookie)?.value;

  const setCookies = refreshToken ? await refreshAuthCookies(refreshToken) : null;
  if (!setCookies) return NextResponse.json({ ok: false }, { status: 401 });

  return appendSetCookies(NextResponse.json({ ok: true }), setCookies);
}
