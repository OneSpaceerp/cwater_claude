'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Arrow } from '@/components/ui/Icon';
import { dictionary as D } from '@/content/dictionary';
import { groupHits, searchRecords, searchSuggestions, type SlimRecord } from '@/lib/search';
import { cachedSearchIndex, loadSearchIndex } from '@/lib/search-client';
import { localePath, t, type Locale } from '@/lib/i18n';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/utils';

/**
 * Global search overlay.
 *
 * The index is fetched on first open rather than bundled: this component sits
 * in the header on every page, so importing the content modules directly would
 * put the whole corpus into the initial JavaScript payload sitewide. It is a
 * static file emitted before the build and shared with the results page, so
 * arriving at /search from here costs no second request.
 *
 * Results are grouped by content type so a visitor can tell a product from an
 * article at a glance. Arrow keys move through the flattened result list and
 * Enter opens the highlighted item, so the whole thing is usable without a mouse.
 */

export function SearchDialog({
  open,
  onClose,
  locale,
}: {
  open: boolean;
  onClose: () => void;
  locale: Locale;
}) {
  const [query, setQuery] = useState('');
  const [highlight, setHighlight] = useState(0);
  const [index, setIndex] = useState<SlimRecord[]>(() => cachedSearchIndex(locale) ?? []);
  /* Only the failure is stored; "loading" is derived below, which avoids a
     synchronous setState in the effect body just to flip a spinner on. */
  const [indexFailed, setIndexFailed] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const reduce = useReducedMotion();

  /* Load the index the first time search is opened. A cache hit is resolved in
     the state initialiser above, so the effect only runs for a real fetch. */
  useEffect(() => {
    if (!open || cachedSearchIndex(locale)) return;
    let cancelled = false;
    loadSearchIndex(locale)
      .then((data) => {
        if (!cancelled) setIndex(data);
      })
      .catch(() => {
        /* Search degrades to the plain results page, which offers the suggested
           topics and a working GET form even with no index. */
        if (!cancelled) setIndexFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, [open, locale]);

  /* Derived: the index is loading while the dialog is open, nothing has
     arrived, and the fetch has not failed. */
  const loading = open && index.length === 0 && !indexFailed;

  const hits = useMemo(
    () => (query.trim().length > 1 ? searchRecords(index, query, 24) : []),
    [query, index],
  );
  const groups = useMemo(() => groupHits(hits), [hits]);
  const flat = useMemo(() => groups.flatMap((g) => g.hits), [groups]);

  /* Reset the highlighted row whenever the query changes, and clear the query
     when the dialog closes — both are state derived from something that just
     changed, so they are adjusted during render rather than after commit. */
  const [lastQuery, setLastQuery] = useState(query);
  if (query !== lastQuery) {
    setLastQuery(query);
    setHighlight(0);
  }

  const [wasOpen, setWasOpen] = useState(open);
  if (open !== wasOpen) {
    setWasOpen(open);
    if (!open) setQuery('');
  }

  /* Focus the field, lock the page, and restore focus on close. */
  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    const timer = window.setTimeout(() => inputRef.current?.focus(), 40);
    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, [open]);

  const goToResults = () => {
    track('search_used', { query, result: 'results_page' });
    router.push(`${localePath(locale, 'search')}?q=${encodeURIComponent(query)}`);
    onClose();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlight((h) => Math.min(h + 1, Math.max(flat.length - 1, 0)));
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlight((h) => Math.max(h - 1, 0));
      return;
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      const target = flat[highlight];
      if (target) {
        track('search_used', { query, result: target.record.i });
        router.push(localePath(locale, target.record.h));
        onClose();
      } else if (query.trim()) {
        goToResults();
      }
    }
  };

  /* Keep the focus trap inside the panel. */
  useEffect(() => {
    if (!open) return;
    const onTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>('a[href], button, input');
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onTab);
    return () => document.removeEventListener('keydown', onTab);
  }, [open]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="theme-dark fixed inset-0 z-[70]"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          role="dialog"
          aria-modal="true"
          aria-label={t(D.search, locale)}
        >
          <div className="absolute inset-0 bg-ink-950/80 backdrop-blur-sm" onClick={onClose} />

          <motion.div
            ref={panelRef}
            initial={reduce ? false : { opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -16 }}
            transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-0 top-0 mx-auto max-h-[85vh] w-full max-w-3xl overflow-hidden border-b border-white/12 bg-ink-950 sm:top-[8vh] sm:border sm:border-white/12"
            onKeyDown={onKeyDown}
          >
            <div aria-hidden className="flow-rule" />

            {/* ---- Field ---- */}
            <div className="flex items-center gap-4 border-b border-white/10 px-5 py-4 sm:px-6">
              <svg
                viewBox="0 0 20 20"
                width={19}
                height={19}
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                aria-hidden
                className="shrink-0 text-signal-400"
              >
                <circle cx="8.75" cy="8.75" r="5.25" />
                <path d="m12.75 12.75 4 4" />
              </svg>
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t(D.searchPlaceholder, locale)}
                aria-label={t(D.search, locale)}
                autoComplete="off"
                className="w-full bg-transparent text-base text-white outline-none placeholder:text-ink-400"
              />
              <button
                type="button"
                onClick={onClose}
                aria-label={t(D.close, locale)}
                className="shrink-0 rounded-sm border border-white/15 px-2 py-1 font-mono text-[0.625rem] tracking-wider text-ink-400 uppercase transition-colors hover:text-white"
              >
                esc
              </button>
            </div>

            {/* ---- Results ---- */}
            <div className="max-h-[60vh] overflow-y-auto overscroll-contain">
              {query.trim().length <= 1 ? (
                <div className="px-5 py-8 sm:px-6">
                  <p className="font-display text-lg font-semibold tracking-tight text-white">
                    {t(D.searchEmptyTitle, locale)}
                  </p>
                  <p className="mt-2 text-sm text-ink-400">{t(D.searchEmptyBody, locale)}</p>
                  <p className="u-label mt-6 mb-3 text-ink-400">{t(D.searchSuggestions, locale)}</p>
                  <div className="flex flex-wrap gap-2">
                    {searchSuggestions[locale].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setQuery(s)}
                        className="rounded-sm border border-white/14 px-3 py-1.5 text-[0.8125rem] text-ink-200 transition-colors hover:border-signal-400 hover:text-white"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              ) : loading && index.length === 0 ? (
                <div className="px-5 py-10 text-center sm:px-6">
                  <p aria-live="polite" className="u-label text-ink-400">
                    {t(D.form.submitting, locale)}
                  </p>
                </div>
              ) : flat.length === 0 ? (
                <div className="px-5 py-10 text-center sm:px-6">
                  <p className="text-ink-300">{t(D.searchNoMatch, locale)}</p>
                  <p className="mt-2 text-sm text-ink-400">{t(D.noResultsHelp, locale)}</p>
                </div>
              ) : (
                <>
                  {groups.map((group) => (
                    <div key={group.kind}>
                      <p className="u-label sticky top-0 z-10 bg-ink-950/95 px-5 py-2.5 text-ink-400 backdrop-blur sm:px-6">
                        {t(D.kind[group.kind], locale)}
                      </p>
                      <ul>
                        {group.hits.map((hit) => {
                          /* Position in the flattened list, derived rather than
                             accumulated, so arrow-key navigation stays correct
                             across re-renders. */
                          const index = flat.indexOf(hit);
                          const isHighlighted = index === highlight;
                          return (
                            <li key={hit.record.i}>
                              <Link
                                href={localePath(locale, hit.record.h)}
                                onClick={() => {
                                  track('search_used', { query, result: hit.record.i });
                                  onClose();
                                }}
                                onMouseEnter={() => setHighlight(index)}
                                className={cn(
                                  'flex items-start gap-4 px-5 py-3.5 transition-colors sm:px-6',
                                  isHighlighted ? 'bg-signal-500/12' : 'hover:bg-white/5',
                                )}
                              >
                                <span className="min-w-0 flex-1">
                                  <span className="block text-[0.9375rem] leading-snug font-medium text-white">
                                    {hit.record.t}
                                  </span>
                                  <span className="mt-1 block truncate text-[0.8125rem] text-ink-400">
                                    {hit.record.s}
                                  </span>
                                </span>
                                <Arrow
                                  size={14}
                                  className={cn('mt-1 shrink-0', isHighlighted ? 'text-signal-300' : 'text-ink-500')}
                                />
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                  <div className="border-t border-white/10 px-5 py-3.5 sm:px-6">
                    <button
                      type="button"
                      onClick={goToResults}
                      className="inline-flex items-center gap-2 text-[0.8125rem] font-medium text-signal-300 transition-colors hover:text-white"
                    >
                      {t(D.viewAll, locale)}
                      <Arrow size={13} />
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
