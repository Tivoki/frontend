import type { IconSvgElement } from '@hugeicons/react';

export type IntegrationStatus = 'connected' | 'available';
export type IntegrationCustomIcon = 'discord' | 'google-sheet' | 'notion' | 'slack';

export type IntegrationCategory =
  | 'communication'
  | 'support'
  | 'automation'
  | 'data'
  | 'productivity'
  | 'sales';

export interface IntegrationBrand {
  icon?: IconSvgElement;
  customIcon?: IntegrationCustomIcon;
  mark?: string;
  foreground: string;
  background: string;
  border?: string;
}

export interface Integration {
  id: string;
  name: string;
  description: string;
  status: IntegrationStatus;
  category: IntegrationCategory;
  brand: IntegrationBrand;
}
