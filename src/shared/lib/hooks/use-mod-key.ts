'use client';

import { useSyncExternalStore } from 'react';

const isMac = () => /mac|iphone|ipad|ipod/i.test(navigator.userAgent);

export const useModKey = (): '⌘' | 'Ctrl' =>
  useSyncExternalStore(() => () => {}, isMac, () => false) ? '⌘' : 'Ctrl';
