'use client';

import { useSyncExternalStore } from 'react';

const MOBILE_BREAKPOINT = 768;

const subscribeWidth = (cb: () => void) => {
  const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
  mql.addEventListener('change', cb);
  return () => mql.removeEventListener('change', cb);
};

export const useIsMobile = () =>
  useSyncExternalStore(
    subscribeWidth,
    () => window.innerWidth < MOBILE_BREAKPOINT,
    () => false,
  );

const TOUCH_QUERY = '(pointer: coarse)';

const subscribePointer = (cb: () => void) => {
  const mql = window.matchMedia(TOUCH_QUERY);
  mql.addEventListener('change', cb);
  return () => mql.removeEventListener('change', cb);
};

export const useIsTouchPointer = () =>
  useSyncExternalStore(
    subscribePointer,
    () => window.matchMedia(TOUCH_QUERY).matches,
    () => false,
  );

const subscribeMediaQuery = (query: string) => (callback: () => void) => {
  const mediaQueryList = window.matchMedia(query);
  mediaQueryList.addEventListener('change', callback);
  return () => mediaQueryList.removeEventListener('change', callback);
};

export const useMediaQuery = (query: string) =>
  useSyncExternalStore(
    subscribeMediaQuery(query),
    () => window.matchMedia(query).matches,
    () => false,
  );
