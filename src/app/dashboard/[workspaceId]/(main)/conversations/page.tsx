import { Suspense } from 'react';
import { ConversationsPage } from '~/views/conversations';

export default function Page() {
  return (
    <Suspense>
      <ConversationsPage />
    </Suspense>
  );
}
