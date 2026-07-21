import type { components } from '~/shared/api';

export type Integration = components['schemas']['IntegrationResponseDto'];
export type IntegrationType = Integration['type'];
export type IntegrationStatus = Integration['status'];

export interface EmailIntegrationConfig {
  email?: string;
}

export interface WebhookIntegrationConfig {
  url?: string;
}

export interface TelegramIntegrationConfig {
  connectCode?: string;
  chatId?: string;
  groupTitle?: string;
}
