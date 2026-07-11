import { getWorkspaces } from '~/entities/workspace/index.server';
import { NewWorkspacePage } from '~/views/new-workspace';
import { redirect } from 'next/navigation';

export default async function Page() {
  const workspacesResult = await getWorkspaces();

  if (workspacesResult.ok && workspacesResult.data.data.length > 0) {
    redirect('/dashboard');
  }

  return <NewWorkspacePage />;
}
