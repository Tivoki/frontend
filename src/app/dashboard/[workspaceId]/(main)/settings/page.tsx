import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import {
  getWorkspaceMembers,
  seedWorkspaceMembers,
} from '~/entities/workspace/index.server';
import { SettingsPage } from '~/views/settings';

export default async function Page({
  params,
}: {
  params: Promise<{ workspaceId: string }>;
}) {
  const { workspaceId } = await params;
  const membersResult = await getWorkspaceMembers(workspaceId);

  const queryClient = new QueryClient();
  if (membersResult.ok)
    seedWorkspaceMembers(queryClient, workspaceId, membersResult.data);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SettingsPage />
    </HydrationBoundary>
  );
}
