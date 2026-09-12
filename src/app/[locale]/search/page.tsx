import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { PageHero } from '@/components/layout/PageHero';
import { PageCta } from '@/components/layout/RelatedSections';
import { Band } from '@/components/ui/Section';
import { SearchResults } from '@/components/search/SearchResults';
import { dictionary as D } from '@/content/dictionary';
import { isLocale, localePath, LOCALES, t, type Locale } from '@/lib/i18n';
import { pageMetadata } from '@/lib/seo';

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata({
    locale,
    path: 'search',
    title: { en: 'Search | C-Water', ar: 'البحث | C-Water' },
    description: {
      en: 'Search C-Water solutions, technologies, products, services, projects and technical articles.',
      ar: 'ابحث في حلول C-Water وتقنياتها ومنتجاتها وخدماتها ومشروعاتها ومقالاتها الفنية.',
    },
    /* A results page has no stable content of its own to index. */
    noIndex: true,
  });
}

/**
 * Search results.
 *
 * The page shell is prerendered and the matching runs in the browser against
 * the prebuilt index — the query lives in `?q=`, which a static host cannot
 * read server-side. The form below is a plain GET form, so submitting a search
 * works with JavaScript disabled even though the result list needs it.
 */
export default async function SearchPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;

  const label = t(D.search, locale);

  return (
    <>
      <PageHero
        locale={locale}
        breadcrumbs={[{ label: t(D.home, locale), href: localePath(locale) }, { label }]}
        eyebrow={label}
        title={t(D.searchEmptyTitle, locale)}
        lead={t(D.searchEmptyBody, locale)}
      />

      <Band tone="paper" className="section">
        <div className="container-page">
          {/* Plain GET form — works without JavaScript. */}
          <form action={localePath(locale, 'search')} method="get" className="max-w-2xl">
            <label htmlFor="q" className="u-label mb-3 block text-ink-500">
              {label}
            </label>
            <div className="flex gap-2.5">
              <input
                id="q"
                name="q"
                type="search"
                placeholder={t(D.searchPlaceholder, locale)}
                className="w-full rounded-sm border border-ink-300 bg-white px-4 py-3 text-[0.9375rem] text-ink-900 outline-none transition-colors placeholder:text-ink-500 focus-visible:border-signal-500"
              />
              <button
                type="submit"
                className="shrink-0 rounded-full bg-signal-400 px-7 text-[0.9375rem] font-semibold text-signal-950 transition-colors hover:bg-signal-300"
              >
                {label}
              </button>
            </div>
          </form>

          <Suspense fallback={<p className="u-label mt-12 text-ink-500">…</p>}>
            <SearchResults locale={locale} />
          </Suspense>
        </div>
      </Band>

      <PageCta
        locale={locale}
        title={t({ en: 'Didn’t find it?', ar: 'لم تجد ما تبحث عنه؟' }, locale)}
        body={t(
          {
            en: 'Describe what you are trying to solve. An engineer will point you to the right technology.',
            ar: 'صف ما تحاول حله، وسيوجّهك أحد المهندسين إلى التقنية المناسبة.',
          },
          locale,
        )}
        primary={{ label: t(D.talkToEngineer, locale), href: localePath(locale, 'contact?intent=engineer') }}
        secondary={{ label: t(D.exploreSolutions, locale), href: localePath(locale, 'solutions') }}
      />
    </>
  );
}
