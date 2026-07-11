import type { Route } from 'next';
import type { IconSvgElement } from '@hugeicons/react';

export interface SearchItem {
  id: string;
  label: string;
  description?: string;
  icon?: IconSvgElement;
  /** External/absolute target, or an internal href resolved at read time. */
  href?: Route;
  /** Internal target relative to its scope; resolved to an href by useSearchItems. */
  sub?: string;
  scope?: 'workspace' | 'account';
  onSelect?: () => void;
  keywords?: string[];
}

export interface SearchGroup {
  id: string;
  label: string;
  items: SearchItem[];
}
