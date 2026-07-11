import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getMe, seedMe } from '~/entities/user/index.server';
import { getWorkspaces, seedWorkspaceList } from '~/entities/workspace/index.server';
import { DashboardShell } from '~/widgets/dashboard-shell';
import type { ReactNode } from 'react';

const AccountLayout = async ({ children }: Readonly<{ children: ReactNode }>) => {
  const [meResult, workspacesResult] = await Promise.all([getMe(), getWorkspaces()]);

  const queryClient = new QueryClient();
  if (meResult.ok) seedMe(queryClient, meResult.data);
  if (workspacesResult.ok) seedWorkspaceList(queryClient, workspacesResult.data);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashboardShell>{children}</DashboardShell>
    </HydrationBoundary>
  );
};

export default AccountLayout;
