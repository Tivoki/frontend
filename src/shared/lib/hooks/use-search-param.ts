'use client';

import { useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { toRoute } from '../utils';

interface Options {
  /** Use router.replace (default) instead of router.push — avoids polluting history */
  replace?: boolean;
}

export function useSearchParam(
  key: string,
  defaultValue: string,
  options?: Options,
): [string, (value: string | undefined) => void];

export function useSearchParam(
  key: string,
  defaultValue?: undefined,
  options?: Options,
): [string | undefined, (value: string | undefined) => void];

export function useSearchParam(key: string, defaultValue?: string, options: Options = {}) {
  const { replace = true } = options;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const value = searchParams.get(key) ?? defaultValue;

  const setValue = useCallback(
    (newValue: string | undefined) => {
      const params = new URLSearchParams(searchParams.toString());
      if (newValue === undefined) {
        params.delete(key);
      } else {
        params.set(key, newValue);
      }
      const query = params.toString();
      const url = query ? `${pathname}?${query}` : pathname;
      if (replace) {
        router.replace(toRoute(url));
      } else {
        router.push(toRoute(url));
      }
    },
    [key, pathname, replace, router, searchParams],
  );

  return [value, setValue] as const;
}
