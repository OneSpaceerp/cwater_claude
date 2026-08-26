'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Arrow, Icon } from '@/components/ui/Icon';
import { dictionary as D } from '@/content/dictionary';
import type { KnowledgeCategory } from '@/content/types';
import { localePath, t, type Locale, type Localized } from '@/lib/i18n';
import { cn } from '@/lib/utils';

/**
 * Knowledge Center index with category filtering and a topic search.
 *
 * Takes pre-flattened card data from the server page rather than importing the
 * articles module: the full corpus is ~190 KB of source, and none of the
 * long-form bodies are needed to render a card grid.
 */
export interface ArticleCard {
  slug: string;
  title: string;
  summary: string;
  category: KnowledgeCategory;
  readingMinutes: number;
  /** Title, question and headings, pre-joined for client-side filtering. */
  haystack: string;
}

export function KnowledgeIndex({
  locale,
  articles,
  categories,
}: {
  locale: Locale;
  articles: ArticleCard[];
  categories: { id: KnowledgeCategory; label: Localized }[];
}) {
  const [category, setCategory] = useState<KnowledgeCategory | null>(null);
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles.filter((article) => {
      if (category && article.category !== category) return false;
      if (!q) return true;
      return article.haystack.includes(q);
    });
  }, [category, query, articles]);

  return (
    <div>
      {/* ---- Controls ---- */}
      <div className="flex flex-col gap-6 border-b border-ink-200 pb-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 lg:mx-0 lg:flex-wrap lg:px-0">
          <CategoryChip active={category === null} onClick={() => setCategory(null)}>
            {t({ en: 'All topics', ar: 'كل الموضوعات' }, locale)}
          </CategoryChip>
          {categories.map((cat) => (
            <CategoryChip key={cat.id} active={category === cat.id} onClick={() => setCategory(cat.id)}>
              {t(cat.label, locale)}
            </CategoryChip>
          ))}
        </div>

        <div className="lg:w-72">
          <label htmlFor="knowledge-search" className="sr-only">
            {t(D.search, locale)}
          </label>
          <input
            id="knowledge-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t({ en: 'Search technical topics', ar: 'ابحث في الموضوعات الفنية' }, locale)}
            className="w-full rounded-sm border border-ink-300 bg-white px-3.5 py-2.5 text-sm text-ink-900 outline-none transition-colors placeholder:text-ink-400 focus-visible:border-signal-500"
          />
        </div>
      </div>

      {/* The card titles are h3s; without this the page would jump h1 → h3.
          The heading is visually redundant next to the result count, so it is
          exposed to assistive technology only. */}
      <h2 className="sr-only">{t({ en: 'Articles', ar: 'المقالات' }, locale)}</h2>

      <p aria-live="polite" className="u-label mt-6 text-ink-500">
        {D.resultsCount[locale](filtered.length)}
      </p>

      {filtered.length === 0 ? (
        <div className="mt-10 border border-ink-200 bg-ink-50 p-10 text-center">
          <Icon name="lab" size={28} className="mx-auto text-ink-300" />
          <p className="mt-5 font-display text-lg font-semibold tracking-tight text-ink-950">
            {t(D.searchNoMatch, locale)}
          </p>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-600">{t(D.noResultsHelp, locale)}</p>
        </div>
      ) : (
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((article) => (
            <li key={article.slug}>
              <Link
                href={localePath(locale, `knowledge/${article.slug}`)}
                className="module group/card relative flex h-full flex-col p-6 sm:p-7"
              >
                <div className="mb-4 flex items-center gap-2.5">
                  <span className="u-label text-signal-700">{article.category.replace('-', ' ')}</span>
                  <span aria-hidden className="h-px w-4 bg-ink-300" />
                  <span className="u-label text-ink-500">{D.readingTime[locale](article.readingMinutes)}</span>
                </div>
                <h3 className="font-display text-lg leading-snug font-semibold tracking-tight text-ink-950">
                  {article.title}
                </h3>
                <p className="mt-3 mb-6 text-sm leading-relaxed text-ink-600">{article.summary}</p>
                <Arrow className="mt-auto text-signal-600 transition-transform duration-400 ease-[var(--ease-out-expo)] group-hover/card:translate-x-1.5 rtl:group-hover/card:-translate-x-1.5" />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function CategoryChip({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        'shrink-0 rounded-sm border px-3.5 py-2 text-[0.8125rem] font-medium transition-colors duration-250',
        active
          ? 'border-signal-500 bg-signal-500/10 text-signal-700'
          : 'border-ink-300 text-ink-600 hover:border-ink-950 hover:text-ink-950',
      )}
    >
      {children}
    </button>
  );
}
