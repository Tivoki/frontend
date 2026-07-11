import { ConversationsPage } from '~/views/conversations';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense>
      <ConversationsPage />
    </Suspense>
  );
}
