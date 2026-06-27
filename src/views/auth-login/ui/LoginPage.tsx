import Link from 'next/link';

import { LoginForm } from '~/features/auth-login';
import { AuthBrandPanel } from '~/shared/ui/primitives';

export function LoginPage() {
  return (
    <div className="flex h-full min-h-svh">
      <AuthBrandPanel />

      <div className="auth-right-bg flex flex-1 flex-col">
        <main className="flex flex-1 flex-col items-center justify-center px-6 py-12">
          <div className="w-full max-w-sm rounded-2xl bg-card px-8 py-8 ring-1 ring-foreground/10 xl:max-w-md xl:px-10 xl:py-10">
            <div className="mb-6 text-center">
              <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
              <p className="mt-1.5 text-sm text-muted-foreground">
                Sign in to your Tikketi account
              </p>
            </div>

            <LoginForm />

            <p className="mt-5 text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{' '}
              <Link
                href="/auth/register"
                className="font-medium text-foreground underline-offset-4 hover:underline"
              >
                Create account →
              </Link>
            </p>
          </div>
        </main>

        <footer className="pb-6 text-center text-xs text-muted-foreground">
          © 2026 Tikketi. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
