import type { WorkspaceRole } from './types';

export const WORKSPACE_PAGE_SIZE = 20;

export const WORKSPACE_ROLE_LABELS: Record<WorkspaceRole, string> = {
  OWNER: 'Owner',
  ADMIN: 'Admin',
  AGENT: 'Agent',
  VIEWER: 'Viewer',
};
