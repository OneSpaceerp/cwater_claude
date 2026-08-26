'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Arrow, Icon } from '@/components/ui/Icon';
import { dictionary as D } from '@/content/dictionary';
import type { Product } from '@/content/types';
import { localePath, t, type Locale } from '@/lib/i18n';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/utils';

/**
 * The product catalogue.
 *
 * Supports the two discovery levels the brief asks for: human-friendly browsing
 * by application, technology or partner, and a technical filter set for a buyer
 * who already knows what they need. Filters read from the URL on first load so
 * the mega-menu can link straight into a filtered view.
 *
 * Data arrives pre-flattened from the server page. Importing the product,
 * partner, solution and technology modules directly would put ~235 KB of source
 * into the browser bundle to render what is, visually, a list of cards.
 */

export interface CatalogueProduct {
  slug: string;
  name: string;
  positioning: string;
  partner: string;
  partnerName: string;
  category: Product['category'];
  categoryLabel: string;
  technology: string;
  solutions: string[];
  /** Name, positioning, overview and applications, pre-joined and lowercased. */
  haystack: string;
}

export interface Facet {
  id: string;
  label: string;
}

export interface CatalogueFacets {
  partners: Facet[];
  categories: Facet[];
  technologies: Facet[];
  solutions: Facet[];
}

type SortKey = 'relevance' | 'name' | 'partner';

export function ProductCatalogue({
  locale,
  products,
  facets,
}: {
  locale: Locale;
  products: CatalogueProduct[];
  facets: CatalogueFacets;
}) {
  const searchParams = useSearchParams();

  const [partner, setPartner] = useState<string | null>(searchParams.get('partner'));
  const [category, setCategory] = useState<string | null>(searchParams.get('category'));
  const [technology, setTechnology] = useState<string | null>(searchParams.get('technology'));
  const [solution, setSolution] = useState<string | null>(searchParams.get('solution'));
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<SortKey>('relevance');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = products.filter((product) => {
      if (partner && product.partner !== partner) return false;
      if (category && product.category !== category) return false;
      if (technology && product.technology !== technology) return false;
      if (solution && !product.solutions.includes(solution)) return false;
      if (q && !product.haystack.includes(q)) return false;
      return true;
    });

    if (sort === 'name') list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    if (sort === 'partner') {
      list = [...list].sort((a, b) => a.partner.localeCompare(b.partner) || a.name.localeCompare(b.name));
    }
    return list;
  }, [products, partner, category, technology, solution, query, sort]);

  const activeCount = [partner, category, technology, solution].filter(Boolean).length + (query ? 1 : 0);

  const clearAll = () => {
    setPartner(null);
    setCategory(null);
    setTechnology(null);
    setSolution(null);
    setQuery('');
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-14">
      {/* ---- Filter rail ---- */}
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="flex items-center justify-between gap-4 border-b border-ink-200 pb-3">
          <p className="u-label text-ink-500">{t(D.filters, locale)}</p>
          {activeCount > 0 ? (
            <Button variant="quiet" onClick={clearAll} className="text-[0.8125rem]">
              {t(D.clearFilters, locale)}
            </Button>
          ) : null}
        </div>

        <div className="mt-5">
          <label htmlFor="catalogue-search" className="sr-only">
            {t(D.search, locale)}
          </label>
          <input
            id="catalogue-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t(D.searchShort, locale)}
            className="w-full rounded-sm border border-ink-300 bg-white px-3.5 py-2.5 text-sm text-ink-900 outline-none transition-colors placeholder:text-ink-500 focus-visible:border-signal-500"
          />
        </div>

        <FacetGroup title={t(D.partner, locale)} facets={facets.partners} value={partner} onChange={setPartner} latin />
        <FacetGroup title={t(D.category, locale)} facets={facets.categories} value={category} onChange={setCategory} />
        <FacetGroup title={t(D.technology, locale)} facets={facets.technologies} value={technology} onChange={setTechnology} />
        <FacetGroup title={t(D.application, locale)} facets={facets.solutions} value={solution} onChange={setSolution} />
      </aside>

      {/* ---- Results ---- */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ink-200 pb-4">
          <p aria-live="polite" className="u-label text-ink-500">
            {D.resultsCount[locale](filtered.length)}
          </p>
          <div className="flex items-center gap-2.5">
            <label htmlFor="catalogue-sort" className="u-label text-ink-500">
              {t(D.sortBy, locale)}
            </label>
            <select
              id="catalogue-sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="rounded-sm border border-ink-300 bg-white px-3 py-1.5 text-[0.8125rem] text-ink-900 outline-none focus-visible:border-signal-500"
            >
              <option value="relevance">{t(D.sortRelevance, locale)}</option>
              <option value="name">{t(D.sortNameAsc, locale)}</option>
              <option value="partner">{t(D.sortPartner, locale)}</option>
            </select>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="mt-14 border border-ink-200 bg-ink-50 p-10 text-center">
            <Icon name="filter" size={28} className="mx-auto text-ink-300" />
            <p className="mt-5 font-display text-lg font-semibold tracking-tight text-ink-950">
              {t(D.noResults, locale)}
            </p>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-600">{t(D.noResultsHelp, locale)}</p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Button variant="ghost" size="sm" onClick={clearAll}>
                {t(D.clearFilters, locale)}
              </Button>
              <Link
                href={localePath(locale, 'contact?intent=engineer')}
                className="text-[0.9375rem] font-medium text-signal-700 underline-offset-4 hover:underline"
                onClick={() => track('cta_click', { component: 'catalogue_empty' })}
              >
                {t(D.talkToEngineer, locale)}
              </Link>
            </div>
          </div>
        ) : (
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((product) => (
              <li key={product.slug}>
                <Link
                  href={localePath(locale, `products/${product.slug}`)}
                  className="module group/card relative flex h-full flex-col p-6 sm:p-7"
                >
                  <div className="mb-4 flex items-center gap-2.5">
                    <span className="u-label latin text-signal-700">{product.partnerName}</span>
                    <span aria-hidden className="h-px w-4 bg-ink-300" />
                    <span className="u-label text-ink-500">{product.categoryLabel}</span>
                  </div>
                  <h3 className="latin font-display text-lg leading-tight font-semibold tracking-tight text-ink-950">
                    {product.name}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink-600">{product.positioning}</p>
                  <div className="mt-6 flex items-center justify-between border-t border-ink-200 pt-4">
                    <span className="text-[0.8125rem] font-medium text-signal-700">{t(D.viewProduct, locale)}</span>
                    <Arrow className="text-signal-600 transition-transform duration-400 ease-[var(--ease-out-expo)] group-hover/card:translate-x-1.5 rtl:group-hover/card:-translate-x-1.5" />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function FacetGroup({
  title,
  facets,
  value,
  onChange,
  latin,
}: {
  title: string;
  facets: Facet[];
  value: string | null;
  onChange: (next: string | null) => void;
  latin?: boolean;
}) {
  if (facets.length === 0) return null;
  return (
    <fieldset className="mt-7">
      <legend className="u-label mb-3 text-ink-500">{title}</legend>
      <div className="flex flex-col gap-1">
        {facets.map((facet) => {
          const selected = value === facet.id;
          return (
            <button
              key={facet.id}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(selected ? null : facet.id)}
              className={cn(
                'flex items-center gap-2.5 rounded-sm px-2.5 py-1.5 text-start text-[0.875rem] transition-colors',
                selected ? 'bg-signal-500/10 text-signal-700' : 'text-ink-600 hover:bg-ink-50 hover:text-ink-950',
              )}
            >
              <span
                aria-hidden
                className={cn(
                  'h-3 w-3 shrink-0 rounded-[1px] border transition-colors',
                  selected ? 'border-signal-500 bg-signal-500' : 'border-ink-300',
                )}
              />
              <span className={latin ? 'latin' : undefined}>{facet.label}</span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
