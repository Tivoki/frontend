import { Mail01Icon, TelegramIcon, WebhookIcon } from '@hugeicons/core-free-icons';
import type { IconSvgElement } from '@hugeicons/react';
import type { IntegrationType } from './types';

interface IntegrationCatalogEntry {
  type: IntegrationType;
  name: string;
  description: string;
  icon: IconSvgElement;
}

/** Static display metadata for the fixed set of channel types the backend supports. */
export const INTEGRATION_CATALOG: Record<IntegrationType, IntegrationCatalogEntry> = {
  EMAIL: {
    type: 'EMAIL',
    name: 'Email',
    description: 'Forward escalations to your support inbox.',
    icon: Mail01Icon,
  },
  WEBHOOK: {
    type: 'WEBHOOK',
    name: 'Webhook',
    description: 'Send escalations as JSON to your own endpoint.',
    icon: WebhookIcon,
  },
  TELEGRAM: {
    type: 'TELEGRAM',
    name: 'Telegram',
    description:
      'Get escalations as topics in a connected Telegram group, and reply from there.',
    icon: TelegramIcon,
  },
};

export const INTEGRATION_TYPES = Object.keys(
  INTEGRATION_CATALOG,
) as IntegrationType[];
