import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageHero } from '@/components/layout/PageHero';
import { PageCta, RelatedProducts, RelatedTechnologies } from '@/components/layout/RelatedSections';
import { Band, SectionHeading } from '@/components/ui/Section';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { Icon } from '@/components/ui/Icon';
import { dictionary as D } from '@/content/dictionary';
import { partners, partnerBySlug } from '@/content/partners';
import { products } from '@/content/products';
import { technologies } from '@/content/technologies';
import { isLocale, localePath, LOCALES, t, type Locale } from '@/lib/i18n';
import { breadcrumbSchema, pageMetadata } from '@/lib/seo';
import { pad } from '@/lib/utils';

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => partners.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const partner = partnerBySlug[slug as keyof typeof partnerBySlug];
  if (!isLocale(locale) || !partner) return {};
  return pageMetadata({ locale, path: `partners/${slug}`, title: partner.metaTitle, description: partner.metaDescription });
}

export default async function PartnerPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const partner = partnerBySlug[slug as keyof typeof partnerBySlug];
  if (!partner) notFound();

  const partnerProducts = products.filter((p) => p.partner === partner.slug).map((p) => p.slug);
  const partnerTechnologies = technologies.filter((tech) => tech.partner === partner.slug).map((tech) => tech.slug);
  const parentLabel = t({ en: 'Technology Partners', ar: 'شركاء التقنية' }, locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { label: t(D.home, locale), href: localePath(locale) },
              { label: parentLabel, href: localePath(locale, 'partners') },
              { label: partner.legalName, href: localePath(locale, `partners/${slug}`) },
            ]),
          ),
        }}
      />

      <PageHero
        locale={locale}
        breadcrumbs={[
          { label: t(D.home, locale), href: localePath(locale) },
          { label: parentLabel, href: localePath(locale, 'partners') },
          { label: partner.legalName },
        ]}
        eyebrow={`${partner.legalName} · ${t(partner.motto, locale)}`}
        title={t(partner.headline, locale)}
        lead={t(partner.summary, locale)}
        primaryCta={{ label: t(D.talkToEngineer, locale), href: localePath(locale, 'contact?intent=engineer') }}
        secondaryCta={{
          label: t({ en: 'Browse Products', ar: 'استعرض المنتجات' }, locale),
          href: `${localePath(locale, 'products')}?partner=${partner.slug}`,
        }}
        size="large"
        aside={
          <dl className="divide-y divide-white/10 border border-white/12 bg-ink-900/85 backdrop-blur-md">
            <div className="flex items-baseline justify-between gap-4 p-4">
              <dt className="u-label text-ink-500">{t({ en: 'Capability', ar: 'القدرة' }, locale)}</dt>
              <dd className="text-end text-[0.875rem] text-ink-100">{t(partner.capability, locale)}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-4 p-4">
              <dt className="u-label text-ink-500">{t({ en: 'Origin', ar: 'المنشأ' }, locale)}</dt>
              <dd className="text-[0.875rem] text-ink-100">{t(partner.origin, locale)}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-4 p-4">
              <dt className="u-label text-ink-500">{t({ en: 'Manufacturer site', ar: 'موقع الشركة' }, locale)}</dt>
              <dd className="text-end text-[0.875rem]">
                <a
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="latin text-signal-300 underline-offset-4 transition-colors hover:text-white hover:underline"
                >
                  {partner.website.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
                </a>
              </dd>
            </div>
          </dl>
        }
      />

      {/* ---- Capability areas ---- */}
      <Band tone="paper" className="section">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              index={1}
              eyebrow={t({ en: 'Capability areas', ar: 'مجالات القدرة' }, locale)}
              title={t({ en: 'What This Technology Contributes.', ar: 'ما تضيفه هذه التقنية.' }, locale)}
            />
          </Reveal>
          <RevealGroup className="mt-12 grid gap-px border border-ink-200 bg-ink-200 sm:grid-cols-2">
            {partner.capabilityAreas.map((area, i) => (
              <RevealItem key={area.id}>
                <div className="flex h-full flex-col bg-white p-7 sm:p-8">
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <span className="u-label text-signal-700">{pad(i + 1)}</span>
                    {area.icon ? <Icon name={area.icon} size={24} className="text-signal-600" /> : null}
                  </div>
                  <h3 className="font-display text-lg leading-snug font-semibold tracking-tight text-ink-950">
                    {t(area.label, locale)}
                  </h3>
                  <p className="mt-3 leading-relaxed text-ink-600">{t(area.body, locale)}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Band>

      {/* ---- Signal path ---- */}
      <Band tone="brand" waveFrom="paper" waveTo="tint" className="section">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              index={2}
              eyebrow={t({ en: 'How it fits the chain', ar: 'كيف تندرج في السلسلة' }, locale)}
              title={t(partner.motto, locale)}
              tone="light"
            />
          </Reveal>
          <RevealGroup as="ol" className="mt-12 grid gap-px bg-white/10 sm:grid-cols-3 lg:grid-cols-6">
            {partner.flow.map((stage, i) => (
              <RevealItem as="li" key={stage.id}>
                <div className="flex h-full flex-col bg-white/[0.08] p-5 sm:p-6">
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <span className="u-label text-ink-500">{pad(i + 1)}</span>
                    <Icon name={stage.icon} size={20} className="text-signal-400" />
                  </div>
                  <p className="font-display text-[0.9375rem] leading-snug font-semibold tracking-tight text-white">
                    {t(stage.label, locale)}
                  </p>
                  <p className="mt-1.5 text-[0.8125rem] leading-snug text-ink-400">{t(stage.caption, locale)}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Band>

      {/* ---- Categories ---- */}
      <Band tone="mist" className="section-tight">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
            <Reveal>
              <SectionHeading
                index={3}
                eyebrow={t({ en: 'Product categories', ar: 'فئات المنتجات' }, locale)}
                title={t({ en: 'Published Range.', ar: 'المدى المنشور.' }, locale)}
              />
            </Reveal>
            <Reveal delay={0.06}>
              <ul className="grid gap-x-10 sm:grid-cols-2">
                {partner.categories.map((category) => (
                  <li key={category.en} className="flex items-start gap-3 border-b border-ink-200 py-4">
                    <span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-signal-500" />
                    <span className="text-ink-800">{t(category, locale)}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm leading-relaxed text-ink-500">
                {t(D.contactForGuidance, locale)}
              </p>
            </Reveal>
          </div>
        </div>
      </Band>

      {/* ---- The C-Water role ---- */}
      <Band tone="ink" className="section">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
            <Reveal>
              <SectionHeading
                index={4}
                eyebrow={t({ en: 'The C-Water role', ar: 'دور C-Water' }, locale)}
                title={t({ en: 'What We Add.', ar: 'ما الذي نضيفه.' }, locale)}
                tone="light"
              />
            </Reveal>
            <Reveal delay={0.06}>
              <p className="text-lead leading-relaxed text-ink-200">{t(partner.cwaterRole, locale)}</p>
            </Reveal>
          </div>
        </div>
      </Band>

      <RelatedTechnologies
        slugs={partnerTechnologies}
        locale={locale}
        tone="light"
        heading={t(D.relatedTechnologies, locale)}
      />
      <RelatedProducts slugs={partnerProducts} locale={locale} tone="light" />

      <PageCta
        locale={locale}
        title={t({ en: 'Global technology, applied locally.', ar: 'تقنية عالمية، مطبَّقة محليًا.' }, locale)}
        body={t(
          {
            en: 'Tell us the system and the conditions. We will select against them, commission it, and support it afterwards.',
            ar: 'أخبرنا بالنظام والظروف. وسنختار وفقها، ونتولى التشغيل الابتدائي، والدعم بعده.',
          },
          locale,
        )}
        primary={{ label: t(D.requestQuote, locale), href: localePath(locale, 'request-quote') }}
        secondary={{ label: t(D.talkToEngineer, locale), href: localePath(locale, 'contact?intent=engineer') }}
      />
    </>
  );
}
