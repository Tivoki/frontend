import { type IconSvgElement } from '@hugeicons/react';

export interface Stat {
  id: string;
  label: string;
  value: string | number;
  change?: {
    value: string;
    trend: 'up' | 'down' | 'neutral';
  };
  icon: IconSvgElement;
}
