import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { redirect } from 'next/navigation';
import type { ReactNode } from 'react';
import { getMe, seedMe } from '~/entities/user/index.server';
import {
  getWorkspace,
  getWorkspaces,
  seedWorkspaceDetail,
  seedWorkspaceList,
} from '~/entities/workspace/index.server';
import { toRoute } from '~/shared/lib';

const WorkspaceLayout = async ({
  params,
  children,
}: Readonly<{ params: Promise<{ workspaceId: string }>; children: ReactNode }>) => {
  const { workspaceId } = await params;

  const [workspaceResult, workspacesResult, meResult] = await Promise.all([
    getWorkspace(workspaceId),
    getWorkspaces(),
    getMe(),
  ]);

  if (!workspaceResult.ok) {
    const fallback = workspacesResult.ok ? workspacesResult.data.data[0] : null;
    redirect(fallback ? toRoute(`/dashboard/${fallback.id}`) : '/dashboard/new');
  }

  const queryClient = new QueryClient();
  seedWorkspaceDetail(queryClient, workspaceResult.data);
  if (workspacesResult.ok) seedWorkspaceList(queryClient, workspacesResult.data);
  if (meResult.ok) seedMe(queryClient, meResult.data);

  return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>;
};

export default WorkspaceLayout;
