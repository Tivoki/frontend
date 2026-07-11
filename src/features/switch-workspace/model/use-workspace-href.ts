'use client';

import type { Route } from 'next';

import { toRoute } from '~/shared/lib';

import { useActiveWorkspaceId } from './use-active-workspace-id';

export const useWorkspaceHref = () => {
  const workspaceId = useActiveWorkspaceId();

  return (sub = ''): Route => {
    if (!workspaceId) return toRoute('/dashboard');
    return toRoute(
      sub ? `/dashboard/${workspaceId}/${sub}` : `/dashboard/${workspaceId}`,
    );
  };
};
