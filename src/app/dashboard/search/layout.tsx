import type React from 'react';
import { Suspense } from 'react';
import { BottomNav } from '~/widgets/bottom-nav/index';

const SearchLayout = ({ children }: { children: React.ReactNode }) => (
  <main className="flex min-h-svh flex-col">
    <div className="min-h-0 flex-1 overflow-y-auto p-4">
      {children}
    </div>
    <Suspense fallback={null}>
      <BottomNav />
    </Suspense>
  </main>
);

export default SearchLayout;
