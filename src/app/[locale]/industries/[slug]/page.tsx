import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageHero } from '@/components/layout/PageHero';
import {
  PageCta,
  RelatedKnowledge,
  RelatedProducts,
  RelatedProjects,
  RelatedServices,
  RelatedSolutions,
  RelatedTechnologies,
} from '@/components/layout/RelatedSections';
import { Band, SectionHeading } from '@/components/ui/Section';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { PointGrid } from '@/components/ui/Pieces';
import { Icon } from '@/components/ui/Icon';
import { dictionary as D } from '@/content/dictionary';
import { industries, industryBySlug } from '@/content/industries';
import { isLocale, localePath, LOCALES, t, type Locale } from '@/lib/i18n';
import { breadcrumbSchema, pageMetadata } from '@/lib/seo';

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => industries.map((i) => ({ locale, slug: i.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const industry = industryBySlug[slug];
  if (!isLocale(locale) || !industry) return {};
  return pageMetadata({
    locale,
    path: `industries/${slug}`,
    title: industry.metaTitle,
    description: industry.metaDescription,
  });
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const industry = industryBySlug[slug];
  if (!industry) notFound();

  const parentLabel = t({ en: 'Industries', ar: 'القطاعات' }, locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { label: t(D.home, locale), href: localePath(locale) },
              { label: parentLabel, href: localePath(locale, 'industries') },
              { label: t(industry.title, locale), href: localePath(locale, `industries/${slug}`) },
            ]),
          ),
        }}
      />

      <PageHero
        locale={locale}
        breadcrumbs={[
          { label: t(D.home, locale), href: localePath(locale) },
          { label: parentLabel, href: localePath(locale, 'industries') },
          { label: t(industry.title, locale) },
        ]}
        eyebrow={t(industry.title, locale)}
        icon={industry.typicalSystems[0]?.icon}
        title={t(industry.headline, locale)}
        lead={t(industry.intro, locale)}
        primaryCta={{ label: t(industry.cta, locale), href: localePath(locale, 'request-solution') }}
        secondaryCta={{ label: t(D.talkToEngineer, locale), href: localePath(locale, 'contact?intent=engineer') }}
        size="large"
      />

      {/* ---- Typical systems ---- */}
      <Band tone="paper" className="section">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              index={1}
              eyebrow={t(D.typicalSystems, locale)}
              title={t({ en: 'What Is Usually on Site.', ar: 'ما يوجد عادةً في الموقع.' }, locale)}
            />
          </Reveal>
          <div className="mt-12 border border-ink-200">
            <PointGrid points={industry.typicalSystems} locale={locale} columns={2} />
          </div>
        </div>
      </Band>

      {/* ---- Challenges ---- */}
      <Band tone="mist" className="section">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              index={2}
              eyebrow={t(D.industryChallenges, locale)}
              title={t({ en: 'What Makes It Difficult.', ar: 'ما الذي يجعل الأمر صعبًا.' }, locale)}
            />
          </Reveal>
          <div className="mt-12 border border-ink-200">
            <PointGrid points={industry.challenges} locale={locale} columns={2} />
          </div>
        </div>
      </Band>

      {/* ---- Risks ---- */}
      <Band tone="ink" className="section-tight">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              index={3}
              eyebrow={t(D.operationalRisks, locale)}
              title={t({ en: 'What Is at Stake.', ar: 'ما هو على المحك.' }, locale)}
              tone="light"
            />
          </Reveal>
          <RevealGroup className="mt-10 grid gap-px bg-white/10 sm:grid-cols-3">
            {industry.risks.map((risk) => (
              <RevealItem key={risk.id}>
                <div className="flex h-full flex-col bg-ink-950 p-6 sm:p-7">
                  {risk.icon ? <Icon name={risk.icon} size={22} className="mb-4 text-signal-400" /> : null}
                  <p className="font-display text-base leading-snug font-semibold tracking-tight text-white">
                    {t(risk.label, locale)}
                  </p>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink-300">{t(risk.body, locale)}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Band>

      <RelatedSolutions slugs={industry.solutions} locale={locale} tone="light" />
      <RelatedTechnologies slugs={industry.technologies} locale={locale} tone="dark" />
      <RelatedProducts slugs={industry.products} locale={locale} tone="light" />
      <RelatedServices slugs={industry.services} locale={locale} tone="dark" />
      <RelatedProjects slugs={industry.projects} locale={locale} tone="light" />
      <RelatedKnowledge slugs={industry.articles} locale={locale} tone="light" />

      <PageCta
        locale={locale}
        title={t({ en: 'Discuss Your Facility.', ar: 'ناقش منشأتك.' }, locale)}
        body={t(
          {
            en: 'Every site is different, even within a sector. Tell us what you operate and what it is doing.',
            ar: 'كل موقع مختلف حتى داخل القطاع الواحد. أخبرنا بما تشغّله وبما يحدث فيه.',
          },
          locale,
        )}
        primary={{ label: t(industry.cta, locale), href: localePath(locale, 'request-solution') }}
        secondary={{ label: t(D.requestQuote, locale), href: localePath(locale, 'request-quote') }}
      />
    </>
  );
}
