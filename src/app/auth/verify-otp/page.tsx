import { Suspense } from 'react';

import { VerifyOtpPage } from '~/views/auth-verify-otp';

export default function Page() {
  return (
    <Suspense>
      <VerifyOtpPage />
    </Suspense>
  );
}
