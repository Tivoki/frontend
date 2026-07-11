import type { ReactNode } from 'react';
import { SidebarInset, SidebarProvider } from '~/shared/ui/kit';
import { BottomNav } from '~/widgets/bottom-nav';
import { Header } from '~/widgets/header';
import { LeftSidebar } from '~/widgets/left-sidebar';

export const DashboardShell = ({ children }: { children: ReactNode }) => (
  <SidebarProvider className="h-svh">
    <LeftSidebar />
    <SidebarInset className="min-h-0 min-w-0 overflow-hidden">
      <Header />
      <div className="flex min-h-0 flex-1 gap-4 overflow-clip">
        <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-4 overflow-y-auto">
          {children}
        </div>
      </div>
      <BottomNav />
    </SidebarInset>
  </SidebarProvider>
);
