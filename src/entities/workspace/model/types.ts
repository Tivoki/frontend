import type { components } from '~/shared/api';

export type WorkspaceRole = components['schemas']['WorkspaceSummaryResponseDto']['role'];

export type Workspace = components['schemas']['WorkspaceSummaryResponseDto'];

export type WorkspaceMember = components['schemas']['WorkspaceMemberResponseDto'];

export type WorkspaceMemberWithUser =
  components['schemas']['WorkspaceMemberWithUserResponseDto'];

export type WorkspaceWithMembers =
  components['schemas']['WorkspaceWithMembersResponseDto'];

export type { Page, PageMeta } from '~/shared/api';
