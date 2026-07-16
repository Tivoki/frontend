import type { components } from './schema';

export type PageMeta = components['schemas']['PageMetaDto'];

export interface Page<T> {
  data: T[];
  meta: PageMeta;
}

/** Shared page-number arithmetic for paginated infinite queries. */
export const nextPage = (lastPage: Page<unknown>): number | undefined =>
  lastPage.meta.page < lastPage.meta.pageCount ? lastPage.meta.page + 1 : undefined;
