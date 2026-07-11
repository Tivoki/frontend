'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

import { VerifyOtpForm } from '~/features/auth-verify-otp';
import { AuthBrandPanel } from '~/shared/ui/primitives';

export function VerifyOtpPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') ?? '';

  return (
    <div className="flex h-full min-h-svh">
      <AuthBrandPanel />

      <div className="auth-right-bg flex flex-1 flex-col">
        <main className="flex flex-1 flex-col items-center justify-center px-6 py-12">
          <div className="bg-card ring-foreground/10 w-full max-w-sm rounded-2xl px-8 py-8 ring-1 xl:max-w-md xl:px-10 xl:py-10">
            <div className="mb-6 text-center">
              <h1 className="text-2xl font-bold tracking-tight">Check your email</h1>
              <p className="text-muted-foreground mt-1.5 text-sm">
                We sent a 6-digit code to{' '}
                <span className="text-foreground font-medium">{email}</span>
              </p>
            </div>

            <VerifyOtpForm email={email} />

            <p className="text-muted-foreground mt-5 text-center text-sm">
              Wrong email?{' '}
              <Link
                href="/auth/register"
                className="text-foreground font-medium underline-offset-4 hover:underline"
              >
                Go back
              </Link>
            </p>
          </div>
        </main>

        <footer className="text-muted-foreground pb-6 text-center text-xs">
          © 2026 Tikketi. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
