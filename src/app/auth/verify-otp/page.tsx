import { VerifyOtpPage } from '~/views/auth-verify-otp';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense>
      <VerifyOtpPage />
    </Suspense>
  );
}
