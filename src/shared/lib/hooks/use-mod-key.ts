'use client';

import { useSyncExternalStore } from 'react';

const isMac = () =>
  typeof navigator !== 'undefined' && /mac/i.test(navigator.platform);

const subscribe = () => () => {};

export const useModKey = (): '⌘' | 'Ctrl' =>
  useSyncExternalStore(subscribe, isMac, () => false)
    ? '⌘'
    : 'Ctrl';
