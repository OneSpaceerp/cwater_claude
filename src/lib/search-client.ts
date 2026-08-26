import type { SlimRecord } from '@/lib/search';
import type { Locale } from '@/lib/i18n';
import { withBasePath } from '@/lib/base-path';

/**
 * Fetches the prebuilt search index, once per locale per page load.
 *
 * The index is a static file emitted by `scripts/build-search-index.ts` before
 * the build, so on a static host it is served straight off disk with the same
 * immutable caching as any other asset. Both the header dialog and the results
 * page go through here, which means arriving at /search from the dialog costs
 * no second request.
 */

const cache = new Map<Locale, SlimRecord[]>();
const inFlight = new Map<Locale, Promise<SlimRecord[]>>();

export function cachedSearchIndex(locale: Locale): SlimRecord[] | undefined {
  return cache.get(locale);
}

export function loadSearchIndex(locale: Locale): Promise<SlimRecord[]> {
  const cached = cache.get(locale);
  if (cached) return Promise.resolve(cached);

  const pending = inFlight.get(locale);
  if (pending) return pending;

  const request = fetch(withBasePath(`/search-index-${locale}.json`))
    .then((res) => {
      if (!res.ok) throw new Error(`search index ${res.status}`);
      return res.json() as Promise<SlimRecord[]>;
    })
    .then((records) => {
      cache.set(locale, records);
      inFlight.delete(locale);
      return records;
    })
    .catch((error) => {
      inFlight.delete(locale);
      throw error;
    });

  inFlight.set(locale, request);
  return request;
}
