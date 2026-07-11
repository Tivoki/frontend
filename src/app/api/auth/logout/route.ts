import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { clearAuthCookies } from '~/shared/api/index.server';

export function GET(request: NextRequest) {
  return clearAuthCookies(NextResponse.redirect(new URL('/auth/login', request.url)));
}
