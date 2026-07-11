'use client';

import { CreateWorkspaceDialog } from '~/features/create-workspace';
import { toRoute } from '~/shared/lib';
import { useRouter } from 'next/navigation';

export const NewWorkspacePage = () => {
  const router = useRouter();

  return (
    <CreateWorkspaceDialog
      open
      dismissible={false}
      onOpenChange={() => {}}
      onCreated={(workspace) => {
        router.replace(toRoute(`/dashboard/${workspace.id}`));
      }}
    />
  );
};
