import type { components } from '~/shared/api';

export type Escalation = components['schemas']['EscalationResponseDto'];
export type EscalationStatus = Escalation['status'];
export type EscalationReason = Escalation['reason'];
