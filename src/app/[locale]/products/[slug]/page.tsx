import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageHero } from '@/components/layout/PageHero';
import { PageCta, RelatedProducts, RelatedSolutions } from '@/components/layout/RelatedSections';
import { Band, SectionHeading } from '@/components/ui/Section';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { DocumentCard, SpecTable, SpecsOnRequest } from '@/components/ui/Pieces';
import { Arrow, Icon } from '@/components/ui/Icon';
import { dictionary as D } from '@/content/dictionary';
import { partnerBySlug } from '@/content/partners';
import { productCategories, products, productBySlug } from '@/content/products';
import { technologyBySlug } from '@/content/technologies';
import { isLocale, localePath, LOCALES, t, type Locale } from '@/lib/i18n';
import { breadcrumbSchema, pageMetadata, productSchema } from '@/lib/seo';
import { pad } from '@/lib/utils';

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => products.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = productBySlug[slug];
  if (!isLocale(locale) || !product) return {};
  return pageMetadata({ locale, path: `products/${slug}`, title: product.metaTitle, description: product.metaDescription });
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const product = productBySlug[slug];
  if (!product) notFound();

  const partner = partnerBySlug[product.partner];
  const technology = technologyBySlug[product.technology];
  const parentLabel = t({ en: 'Products', ar: 'المنتجات' }, locale);
  const quoteHref = `${localePath(locale, 'request-quote')}?product=${product.slug}`;
  const engineerHref = localePath(locale, 'contact?intent=engineer');

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            breadcrumbSchema([
              { label: t(D.home, locale), href: localePath(locale) },
              { label: parentLabel, href: localePath(locale, 'products') },
              { label: product.name, href: localePath(locale, `products/${slug}`) },
            ]),
            /* No offers/price/rating: this is a technical catalogue with an
               RFQ flow, and emitting commercial properties that do not exist
               would misrepresent it. */
            productSchema({
              locale,
              slug,
              name: product.name,
              description: t(product.positioning, locale),
              brand: partner.legalName,
              category: t(productCategories[product.category], locale),
            }),
          ]),
        }}
      />

      <PageHero
        locale={locale}
        breadcrumbs={[
          { label: t(D.home, locale), href: localePath(locale) },
          { label: parentLabel, href: localePath(locale, 'products') },
          { label: product.name },
        ]}
        eyebrow={partner.legalName}
        title={product.name}
        lead={t(product.positioning, locale)}
        primaryCta={{ label: t(D.requestQuote, locale), href: quoteHref }}
        secondaryCta={{ label: t(D.talkToEngineer, locale), href: engineerHref }}
        aside={
          <dl className="border border-white/12 bg-ink-900/85 divide-y divide-white/10">
            <div className="flex items-baseline justify-between gap-4 p-4">
              <dt className="u-label text-ink-500">{t(D.partner, locale)}</dt>
              <dd className="latin text-[0.9375rem] font-medium text-white">{partner.legalName}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-4 p-4">
              <dt className="u-label text-ink-500">{t(D.category, locale)}</dt>
              <dd className="text-[0.9375rem] text-ink-100">{t(productCategories[product.category], locale)}</dd>
            </div>
            {technology ? (
              <div className="flex items-baseline justify-between gap-4 p-4">
                <dt className="u-label text-ink-500">{t(D.technology, locale)}</dt>
                <dd className="text-end text-[0.9375rem] text-ink-100">
                  <Link
                    href={localePath(locale, `technologies/${technology.slug}`)}
                    className="transition-colors hover:text-signal-300"
                  >
                    {t(technology.title, locale)}
                  </Link>
                </dd>
              </div>
            ) : null}
            <div className="flex items-baseline justify-between gap-4 p-4">
              <dt className="u-label text-ink-500">{t(D.documents, locale)}</dt>
              <dd className="text-[0.9375rem] text-ink-100">
                {product.documents.length > 0 ? t(D.documentOnRequest, locale) : '—'}
              </dd>
            </div>
          </dl>
        }
      />

      {/* ---- Overview ---- */}
      <Band tone="paper" className="section">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
            <Reveal>
              <SectionHeading index={1} eyebrow={t(D.overview, locale)} title={t({ en: 'What It Is.', ar: 'ما هو.' }, locale)} />
            </Reveal>
            <Reveal delay={0.06}>
              <p className="text-lead leading-relaxed text-ink-600">{t(product.overview, locale)}</p>
            </Reveal>
          </div>
        </div>
      </Band>

      {/* ---- Benefits ---- */}
      <Band tone="brand" waveFrom="paper" waveTo="paper" className="section">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              index={2}
              eyebrow={t(D.keyBenefits, locale)}
              title={t({ en: 'Why It Is Specified.', ar: 'لماذا يُحدَّد في المواصفة.' }, locale)}
              tone="light"
            />
          </Reveal>
          <RevealGroup className="mt-10 grid gap-px bg-white/10 sm:grid-cols-2">
            {product.benefits.map((benefit, i) => (
              <RevealItem key={benefit.id}>
                <div className="flex h-full flex-col bg-white/[0.08] p-6 sm:p-7">
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <span className="u-label text-signal-300">{pad(i + 1)}</span>
                    {benefit.icon ? <Icon name={benefit.icon} size={22} className="text-signal-400" /> : null}
                  </div>
                  <h3 className="font-display text-base leading-snug font-semibold tracking-tight text-white">
                    {t(benefit.label, locale)}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink-300">{t(benefit.body, locale)}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Band>

      {/* ---- Applications + specifications ---- */}
      <Band tone="paper" className="section" id="specifications">
        <div className="container-page">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <SectionHeading index={3} eyebrow={t(D.applications, locale)} title={t({ en: 'Where It Is Used.', ar: 'أين يُستخدم.' }, locale)} />
              <ul className="mt-8">
                {product.applications.map((app) => (
                  <li key={app.en} className="flex items-start gap-3 border-b border-ink-200 py-3.5 first:border-t">
                    <span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-signal-500" />
                    <span className="text-ink-800">{t(app, locale)}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.06}>
              <SectionHeading index={4} eyebrow={t(D.specifications, locale)} title={t({ en: 'Technical Detail.', ar: 'التفاصيل الفنية.' }, locale)} />
              <div className="mt-8">
                <SpecTable rows={product.specs} locale={locale} />
              </div>
              {/* Performance data is not published until it has been confirmed
                  against the manufacturer's current documentation. */}
              {product.specsPendingReview ? (
                <div className="mt-6">
                  <SpecsOnRequest locale={locale} href={engineerHref} />
                </div>
              ) : null}
            </Reveal>
          </div>
        </div>
      </Band>

      {/* ---- Documents ---- */}
      {product.documents.length > 0 ? (
        <Band tone="mist" className="section-tight" id="documents">
          <div className="container-page">
            <Reveal>
              <SectionHeading index={5} eyebrow={t(D.documents, locale)} title={t({ en: 'Technical Documentation.', ar: 'الوثائق الفنية.' }, locale)} />
            </Reveal>
            <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {product.documents.map((doc) => (
                <RevealItem key={doc.id}>
                  <DocumentCard document={doc} locale={locale} requestHref={engineerHref} productName={product.name} />
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </Band>
      ) : null}

      {/* ---- Partner ---- */}
      <Band tone="mist" className="section-tight">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
            <Reveal>
              <SectionHeading
                eyebrow={t(D.explorer.technologyPartner, locale)}
                title={<span className="latin">{partner.legalName}</span>}
                tone="dark"
                as="h2"
              />
            </Reveal>
            <Reveal delay={0.06}>
              <p className="text-lead leading-relaxed text-ink-600">{t(partner.cwaterRole, locale)}</p>
              <Link
                href={localePath(locale, `partners/${partner.slug}`)}
                className="group mt-6 inline-flex items-center gap-2 text-[0.9375rem] font-medium text-signal-700 transition-colors hover:text-signal-500"
              >
                {t({ en: 'Explore the partnership', ar: 'استكشف الشراكة' }, locale)}
                <Arrow size={14} className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
              </Link>
            </Reveal>
          </div>
        </div>
      </Band>

      <RelatedSolutions slugs={product.solutions} locale={locale} tone="light" />
      <RelatedProducts slugs={product.relatedProducts} locale={locale} tone="dark" />

      <PageCta
        locale={locale}
        title={t({ en: 'Request a Quote.', ar: 'اطلب عرض سعر.' }, locale)}
        body={t(
          {
            en: 'Include the operating conditions and what you are protecting. We will confirm the selection before quoting rather than after.',
            ar: 'أرفق ظروف التشغيل وما تريد حمايته. وسنؤكد الاختيار قبل التسعير لا بعده.',
          },
          locale,
        )}
        primary={{ label: t(D.requestQuote, locale), href: quoteHref }}
        secondary={{ label: t(D.talkToEngineer, locale), href: engineerHref }}
      />
    </>
  );
}
