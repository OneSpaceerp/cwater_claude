'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { Arrow, Icon } from '@/components/ui/Icon';
import { dictionary as D } from '@/content/dictionary';
import { groupHits, searchRecords, searchSuggestions, type SlimRecord } from '@/lib/search';
import { cachedSearchIndex, loadSearchIndex } from '@/lib/search-client';
import { localePath, t, type Locale } from '@/lib/i18n';
import { track } from '@/lib/analytics';

/**
 * Search results.
 *
 * Runs on the client so the page itself can be prerendered: a static export has
 * no server to read `?q=` on, and the whole site is otherwise static HTML. The
 * index is the same prebuilt JSON the header dialog uses, so by the time a
 * visitor lands here from the dialog it is already cached.
 *
 * The form above it is a plain GET form that works without JavaScript; only the
 * result list needs the client.
 */
export function SearchResults({ locale }: { locale: Locale }) {
  const searchParams = useSearchParams();
  const query = (searchParams.get('q') ?? '').trim();

  /* A cache hit is resolved in the initialiser, so arriving here from the
     header dialog renders results on the first paint. */
  const [index, setIndex] = useState<SlimRecord[]>(() => cachedSearchIndex(locale) ?? []);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (query.length <= 1) return;
    let cancelled = false;
    loadSearchIndex(locale)
      .then((records) => {
        if (!cancelled) setIndex(records);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, [locale, query]);

  /* Both flags are derived rather than stored: writing them from inside the
     effect would set state during commit and cascade an extra render. */
  const ready = index.length > 0;
  const loading = query.length > 1 && !ready && !failed;

  const hits = useMemo(
    () => (query.length > 1 && ready ? searchRecords(index, query, 60) : []),
    [index, query, ready],
  );
  const groups = useMemo(() => groupHits(hits), [hits]);

  useEffect(() => {
    if (ready && query.length > 1) track('search_used', { query, results: hits.length });
  }, [ready, query, hits.length]);

  /* ---- No query yet: offer the suggested topics ---- */
  if (query.length <= 1) {
    return (
      <div className="mt-12">
        <p className="u-label mb-4 text-ink-500">{t(D.searchSuggestions, locale)}</p>
        <div className="flex flex-wrap gap-2">
          {searchSuggestions[locale].map((suggestion) => (
            <Link
              key={suggestion}
              href={`${localePath(locale, 'search')}?q=${encodeURIComponent(suggestion)}`}
              className="rounded-sm border border-ink-300 px-3.5 py-2 text-[0.875rem] text-ink-700 transition-colors hover:border-signal-500 hover:text-signal-700"
            >
              {suggestion}
            </Link>
          ))}
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <p aria-live="polite" className="u-label mt-12 text-ink-500">
        {t(D.form.submitting, locale)}
      </p>
    );
  }

  if (failed || hits.length === 0) {
    return (
      <div className="mt-14 border border-ink-200 bg-ink-50 p-10 text-center">
        <Icon name="lab" size={28} className="mx-auto text-ink-300" />
        <p className="mt-5 font-display text-lg font-semibold tracking-tight text-ink-950">
          {t(D.searchNoMatch, locale)}
        </p>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-600">{t(D.noResultsHelp, locale)}</p>
        <div className="mt-7">
          <p className="u-label mb-3 text-ink-500">{t(D.searchSuggestions, locale)}</p>
          <div className="flex flex-wrap justify-center gap-2">
            {searchSuggestions[locale].map((suggestion) => (
              <Link
                key={suggestion}
                href={`${localePath(locale, 'search')}?q=${encodeURIComponent(suggestion)}`}
                className="rounded-sm border border-ink-300 px-3 py-1.5 text-[0.8125rem] text-ink-700 transition-colors hover:border-signal-500 hover:text-signal-700"
              >
                {suggestion}
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <p aria-live="polite" className="u-label mt-10 text-ink-500">
        {D.resultsCount[locale](hits.length)}
      </p>

      <div className="mt-8 flex flex-col gap-12">
        {groups.map((group) => (
          <section key={group.kind}>
            <h2 className="u-label border-b border-ink-200 pb-3 text-signal-700">
              {t(D.kind[group.kind], locale)}
              <span className="tnum ms-2 text-ink-500">{group.hits.length}</span>
            </h2>
            <ul>
              {group.hits.map((hit) => (
                <li key={hit.record.i}>
                  <Link
                    href={localePath(locale, hit.record.h)}
                    className="group flex items-start justify-between gap-6 border-b border-ink-200 py-5 transition-colors hover:bg-ink-50"
                  >
                    <span className="min-w-0">
                      <span className="block font-display text-[1.0625rem] leading-snug font-semibold tracking-tight text-ink-950 transition-colors group-hover:text-signal-700">
                        {hit.record.t}
                      </span>
                      <span className="mt-1.5 block text-sm leading-relaxed text-ink-600">{hit.record.s}</span>
                    </span>
                    <Arrow
                      size={15}
                      className="mt-1 shrink-0 text-ink-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-signal-600 rtl:group-hover:-translate-x-1"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
