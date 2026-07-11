'use client';

import { useMe } from '~/entities/user';
import { useParams } from 'next/navigation';

export const useActiveWorkspaceId = (): string | null => {
  const params = useParams<{ workspaceId?: string }>();
  const { data: me } = useMe({ enabled: params.workspaceId === undefined });

  return params.workspaceId ?? me?.lastActiveWorkspaceId ?? null;
};
