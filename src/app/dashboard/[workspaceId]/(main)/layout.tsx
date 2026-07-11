import { DashboardShell } from '~/widgets/dashboard-shell';
import type { ReactNode } from 'react';

const MainLayout = ({ children }: Readonly<{ children: ReactNode }>) => (
  <DashboardShell>{children}</DashboardShell>
);

export default MainLayout;
