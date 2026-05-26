import type React from 'react';
import { LeftSidebar } from '~/widgets/left-sidebar';
import { Header } from '~/widgets/header';
import { SidebarInset, SidebarProvider } from '~/shared/ui/kit';

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <SidebarProvider className="h-svh">
      <LeftSidebar />
      <SidebarInset className="min-h-0">
        <Header />
        <div className="flex min-h-0 flex-1 gap-4 overflow-clip">
          <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-4 overflow-y-auto p-4">
            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default MainLayout;
