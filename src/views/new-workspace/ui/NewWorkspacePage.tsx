'use client';

import { useRouter } from 'next/navigation';

import { CreateWorkspaceDialog } from '~/features/create-workspace';
import { toRoute } from '~/shared/lib';

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
