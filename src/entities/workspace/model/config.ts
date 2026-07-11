import type { Page, WorkspaceRole } from './types';

export const WORKSPACE_PAGE_SIZE = 20;

/** Shared page-number arithmetic for the workspace infinite queries. */
export const nextWorkspacePage = (lastPage: Page<unknown>): number | undefined =>
  lastPage.meta.page < lastPage.meta.pageCount ? lastPage.meta.page + 1 : undefined;

export const WORKSPACE_ROLE_LABELS: Record<WorkspaceRole, string> = {
  OWNER: 'Owner',
  ADMIN: 'Admin',
  AGENT: 'Agent',
  VIEWER: 'Viewer',
};
