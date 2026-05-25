import type { IconSvgElement } from '@hugeicons/react';

export interface SearchItem {
  id: string;
  label: string;
  description?: string;
  icon?: IconSvgElement;
  href?: string;
  onSelect?: () => void;
  keywords?: string[];
}

export interface SearchGroup {
  id: string;
  label: string;
  items: SearchItem[];
}

export interface SearchProvider {
  getGroups: (query: string) => SearchGroup[] | Promise<SearchGroup[]>;
}
