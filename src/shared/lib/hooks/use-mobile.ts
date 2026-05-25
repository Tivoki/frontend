'use client';

import { useSyncExternalStore } from 'react';

// `pointer: coarse` = primary input is imprecise (finger).
// More reliable than screen width: a rotated tablet stays "mobile"
// regardless of viewport size; a desktop with a touchscreen stays "desktop".
const QUERY = '(pointer: coarse)';

const subscribe = (cb: () => void) => {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener('change', cb);
  return () => mql.removeEventListener('change', cb);
};

export const useIsMobile = () =>
  useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
