import type { ReactNode } from 'react';

import { DashboardShell } from '~/widgets/dashboard-shell';

const MainLayout = ({ children }: Readonly<{ children: ReactNode }>) => (
  <DashboardShell>{children}</DashboardShell>
);

export default MainLayout;
