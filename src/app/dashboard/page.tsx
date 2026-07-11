import { getMe } from '~/entities/user/index.server';
import { getWorkspaces } from '~/entities/workspace/index.server';
import { toRoute } from '~/shared/lib';
import { redirect } from 'next/navigation';

export default async function DashboardIndexPage() {
  const meResult = await getMe();

  if (!meResult.ok) {
    throw new Error(`Failed to load the profile (status ${meResult.status})`);
  }

  const { lastActiveWorkspaceId } = meResult.data;
  if (lastActiveWorkspaceId) redirect(toRoute(`/dashboard/${lastActiveWorkspaceId}`));

  const workspacesResult = await getWorkspaces();

  if (!workspacesResult.ok) {
    throw new Error(`Failed to load workspaces (status ${workspacesResult.status})`);
  }

  const workspaces = workspacesResult.data.data;
  if (workspaces.length === 0) redirect('/dashboard/new');

  redirect(toRoute(`/dashboard/${workspaces[0].id}`));
}
