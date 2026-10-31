import type { components } from '~/shared/api';

type Schemas = components['schemas'];

/** API models (generated from the backend OpenAPI schema). */
export type InboxItem = Schemas['InboxItemDto'];
export type InboxPage = Schemas['InboxPageDto'];
export type InboxFilter = Schemas['InboxFilter'];
export type ConversationDetail = Schemas['ConversationDetailDto'];
export type ConversationCapabilities = Schemas['ConversationCapabilitiesDto'];
export type ActiveEscalation = Schemas['InboxActiveEscalationDto'];
export type HistoryMessage = Schemas['HistoryMessageDto'];
export type HistoryPage = Schemas['HistoryPageDto'];
export type ConversationActivity = Schemas['ConversationActivityDto'];
export type ActivityPage = Schemas['ActivityPageDto'];
export type ReadState = Schemas['ReadStateResponseDto'];

export type ConversationStatus = InboxItem['status'];
export type HandlingMode = InboxItem['handlingMode'];
export type EscalationStatus = ActiveEscalation['status'];
export type MessageRole = HistoryMessage['role'];

/** Inbox tab in the URL (`?tab=`); `escalated` = any active escalation. */
export type InboxTab =
  | 'all'
  | 'active'
  | 'closed'
  | 'waiting'
  | 'in_progress'
  | 'escalated';

export interface InboxQuery {
  filter: InboxFilter;
  q?: string;
  assignee?: string;
}
