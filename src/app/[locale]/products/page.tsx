import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { PageHero } from '@/components/layout/PageHero';
import { PageCta } from '@/components/layout/RelatedSections';
import { Band } from '@/components/ui/Section';
import {
  ProductCatalogue,
  type CatalogueFacets,
  type CatalogueProduct,
} from '@/components/products/ProductCatalogue';
import { partnerBySlug, partners } from '@/content/partners';
import { productCategories, products } from '@/content/products';
import { solutions } from '@/content/solutions';
import { technologies } from '@/content/technologies';
import type { Product } from '@/content/types';
import { dictionary as D } from '@/content/dictionary';
import { isLocale, localePath, t, type Locale } from '@/lib/i18n';
import { breadcrumbSchema, pageMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata({
    locale,
    path: 'products',
    title: {
      en: 'Water Treatment Products & Technologies | C-Water',
      ar: 'منتجات وتقنيات معالجة المياه | C-Water',
    },
    description: {
      en: 'Controllers, sensors, metering pumps, filtration, separators and treatment chemistry from Walchem, TIMEX and Kurita — applied through C-Water engineering.',
      ar: 'وحدات تحكم ومستشعرات ومضخات جرعات وترشيح ذاتي التنظيف وبالخراطيش وفواصل وتعويم وكيمياء معالجة من Walchem وTIMEX وKurita — عبر هندسة C-Water.',
    },
  });
}

export default async function ProductsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;

  const label = t({ en: 'Products', ar: 'المنتجات' }, locale);

  /* Flatten on the server: the catalogue renders cards and filters, none of
     which need the full product records in the browser. */
  const catalogue: CatalogueProduct[] = products.map((product) => ({
    slug: product.slug,
    name: product.name,
    positioning: t(product.positioning, locale),
    partner: product.partner,
    partnerName: partnerBySlug[product.partner].legalName,
    category: product.category,
    categoryLabel: t(productCategories[product.category], locale),
    technology: product.technology,
    solutions: product.solutions,
    haystack: [
      product.name,
      t(product.positioning, locale),
      t(product.overview, locale),
      ...product.applications.map((a) => t(a, locale)),
    ]
      .join(' ')
      .toLowerCase(),
  }));

  /* Only facets that actually match a product are offered — an empty filter is
     worse than no filter. */
  const facets: CatalogueFacets = {
    partners: partners
      .filter((p) => products.some((product) => product.partner === p.slug))
      .map((p) => ({ id: p.slug, label: p.legalName })),
    categories: (Object.keys(productCategories) as Product['category'][])
      .filter((key) => products.some((product) => product.category === key))
      .map((key) => ({ id: key, label: t(productCategories[key], locale) })),
    technologies: technologies
      .filter((tech) => products.some((product) => product.technology === tech.slug))
      .map((tech) => ({ id: tech.slug, label: t(tech.title, locale) })),
    solutions: solutions
      .filter((sol) => products.some((product) => product.solutions.includes(sol.slug)))
      .map((sol) => ({ id: sol.slug, label: t(sol.title, locale) })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { label: t(D.home, locale), href: localePath(locale) },
              { label, href: localePath(locale, 'products') },
            ]),
          ),
        }}
      />

      <PageHero
        locale={locale}
        breadcrumbs={[{ label: t(D.home, locale), href: localePath(locale) }, { label }]}
        eyebrow={label}
        title={t({ en: 'Find the Technology Behind the Solution.', ar: 'اعثر على التقنية وراء الحل.' }, locale)}
        lead={t(
          {
            en: 'Browse by partner, category, technology or application. You do not need to know the product to find the right one — filter by the problem you are solving and talk to an engineer about the rest.',
            ar: 'تصفّح حسب الشريك أو الفئة أو التقنية أو التطبيق. لست بحاجة لمعرفة المنتج لتجد المناسب — صفِّ حسب المشكلة التي تعالجها وناقش البقية مع مهندس.',
          },
          locale,
        )}
        primaryCta={{ label: t(D.requestQuote, locale), href: localePath(locale, 'request-quote') }}
        secondaryCta={{ label: t(D.talkToEngineer, locale), href: localePath(locale, 'contact?intent=engineer') }}
      />

      <Band tone="paper" className="section">
        <div className="container-page">
          <Suspense fallback={<p className="u-label text-ink-500">…</p>}>
            <ProductCatalogue locale={locale} products={catalogue} facets={facets} />
          </Suspense>
        </div>
      </Band>

      <PageCta
        locale={locale}
        title={t({ en: 'Need something specified?', ar: 'تحتاج تحديد مواصفة؟' }, locale)}
        body={t(
          {
            en: 'Tell us the duty — flow, operating conditions, what you are protecting — and we will select against it rather than against a catalogue line.',
            ar: 'أخبرنا بظروف التشغيل — التدفق والظروف وما تريد حمايته — وسنختار وفقها لا وفق بند كتالوج.',
          },
          locale,
        )}
        primary={{ label: t(D.requestQuote, locale), href: localePath(locale, 'request-quote') }}
        secondary={{ label: t(D.requestSolution, locale), href: localePath(locale, 'request-solution') }}
      />
    </>
  );
}
