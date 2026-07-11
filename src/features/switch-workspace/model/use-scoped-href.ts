'use client';

import { toRoute } from '~/shared/lib';
import type { Route } from 'next';
import { useWorkspaceHref } from './use-workspace-href';

export type NavScope = 'workspace' | 'account';

/**
 * Resolves navigation targets that live either under the active workspace
 * (`scope: 'workspace'`) or at the account level (`scope: 'account'`), e.g.
 * `scopedHref('account', 'billing')` → `/dashboard/billing`.
 */
export const useScopedHref = () => {
  const workspaceHref = useWorkspaceHref();

  return (scope: NavScope, sub = ''): Route =>
    scope === 'account' ? toRoute(`/dashboard/${sub}`) : workspaceHref(sub);
};
