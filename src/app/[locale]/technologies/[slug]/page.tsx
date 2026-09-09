import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageHero } from '@/components/layout/PageHero';
import {
  PageCta,
  RelatedKnowledge,
  RelatedProducts,
  RelatedServices,
  RelatedSolutions,
} from '@/components/layout/RelatedSections';
import { Band, SectionHeading } from '@/components/ui/Section';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { Arrow, Icon } from '@/components/ui/Icon';
import { dictionary as D } from '@/content/dictionary';
import { partnerBySlug } from '@/content/partners';
import { technologyImages } from '@/content/imagery';
import { technologies, technologyBySlug } from '@/content/technologies';
import { isLocale, localePath, LOCALES, t, type Locale } from '@/lib/i18n';
import { breadcrumbSchema, pageMetadata } from '@/lib/seo';
import { pad } from '@/lib/utils';

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => technologies.map((tech) => ({ locale, slug: tech.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const tech = technologyBySlug[slug];
  if (!isLocale(locale) || !tech) return {};
  return pageMetadata({ locale, path: `technologies/${slug}`, title: tech.metaTitle, description: tech.metaDescription });
}

export default async function TechnologyPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const tech = technologyBySlug[slug];
  if (!tech) notFound();

  const partner = tech.partner ? partnerBySlug[tech.partner] : null;
  const parentLabel = t({ en: 'Technologies', ar: 'التقنيات' }, locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { label: t(D.home, locale), href: localePath(locale) },
              { label: parentLabel, href: localePath(locale, 'technologies') },
              { label: t(tech.title, locale), href: localePath(locale, `technologies/${slug}`) },
            ]),
          ),
        }}
      />

      <PageHero
        locale={locale}
        breadcrumbs={[
          { label: t(D.home, locale), href: localePath(locale) },
          { label: parentLabel, href: localePath(locale, 'technologies') },
          { label: t(tech.title, locale) },
        ]}
        eyebrow={t(tech.title, locale)}
        icon={tech.howItWorks[0]?.icon}
        title={t(tech.headline, locale)}
        lead={t(tech.intro, locale)}
        primaryCta={{ label: t(tech.cta, locale), href: localePath(locale, 'request-solution') }}
        secondaryCta={{ label: t(D.requestQuote, locale), href: localePath(locale, 'request-quote') }}
        size="large"
        image={technologyImages[tech.slug]}
        aside={
          partner ? (
            <Link
              href={localePath(locale, `partners/${partner.slug}`)}
              className="group relative block border border-signal-500/25 bg-ink-950/85 p-6 backdrop-blur-sm transition-colors hover:border-signal-400/50"
            >
              <span aria-hidden className="absolute -top-px start-0 h-0.5 w-12 bg-signal-400" />
              <p className="u-label text-signal-300">{t(D.explorer.technologyPartner, locale)}</p>
              <p className="latin mt-3 font-display text-xl font-bold tracking-tight text-white">
                {partner.legalName}
              </p>
              <p className="mt-1.5 text-sm text-signal-200">{t(partner.motto, locale)}</p>
              <p className="mt-4 flex items-center gap-2 text-[0.8125rem] font-medium text-signal-300">
                {t({ en: 'How C-Water applies it', ar: 'كيف تطبّقها C-Water' }, locale)}
                <Arrow size={13} className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
              </p>
            </Link>
          ) : null
        }
      />

      {/* ---- What it solves ---- */}
      <Band tone="paper" className="section">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
            <Reveal>
              <SectionHeading
                index={1}
                eyebrow={t(D.whatItSolves, locale)}
                title={t({ en: 'The Problem It Addresses.', ar: 'المشكلة التي تعالجها.' }, locale)}
              />
            </Reveal>
            <Reveal delay={0.06}>
              <p className="text-lead leading-relaxed text-ink-600">{t(tech.whatItSolves, locale)}</p>
            </Reveal>
          </div>
        </div>
      </Band>

      {/* ---- How it works ---- */}
      <Band tone="ink" blueprint className="section">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              index={2}
              eyebrow={t(D.howItWorks, locale)}
              title={t({ en: 'How It Actually Works.', ar: 'كيف تعمل فعليًا.' }, locale)}
              tone="light"
            />
          </Reveal>
          <RevealGroup as="ol" className="mt-12 grid gap-px bg-white/10 sm:grid-cols-2">
            {tech.howItWorks.map((point, i) => (
              <RevealItem as="li" key={point.id}>
                <div className="flex h-full flex-col bg-ink-950 p-7 sm:p-8">
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <span className="u-label text-signal-300">{pad(i + 1)}</span>
                    {point.icon ? <Icon name={point.icon} size={24} className="text-signal-400" /> : null}
                  </div>
                  <h3 className="font-display text-lg leading-snug font-semibold tracking-tight text-white">
                    {t(point.label, locale)}
                  </h3>
                  <p className="mt-3 leading-relaxed text-ink-300">{t(point.body, locale)}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Band>

      {/* ---- Applications ---- */}
      <Band tone="mist" className="section-tight">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
            <Reveal>
              <SectionHeading index={3} eyebrow={t(D.applications, locale)} title={t({ en: 'Where It Is Used.', ar: 'أين تُستخدم.' }, locale)} />
            </Reveal>
            <Reveal delay={0.06}>
              <ul className="grid gap-x-10 gap-y-0 sm:grid-cols-2">
                {tech.applications.map((app) => (
                  <li key={app.en} className="flex items-start gap-3 border-b border-ink-200 py-4">
                    <span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-signal-500" />
                    <span className="text-ink-800">{t(app, locale)}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </Band>

      {/* ---- Partner role ---- */}
      {partner ? (
        <Band tone="mist" className="section-tight">
          <div className="container-page">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
              <Reveal>
                <SectionHeading
                  index={4}
                  eyebrow={t(D.explorer.technologyPartner, locale)}
                  title={<span className="latin">{partner.legalName}</span>}
                  tone="dark"
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
      ) : null}

      <RelatedSolutions slugs={tech.solutions} locale={locale} tone="light" />
      <RelatedProducts slugs={tech.products} locale={locale} tone="dark" />
      <RelatedServices slugs={tech.services} locale={locale} tone="light" />
      <RelatedKnowledge slugs={tech.articles} locale={locale} tone="light" />

      <PageCta
        locale={locale}
        title={t({ en: 'Is this the right technology for your system?', ar: 'هل هذه التقنية المناسبة لنظامك؟' }, locale)}
        body={t(
          {
            en: 'That question is answered by the water analysis and the operating conditions, not by a catalogue. Start there.',
            ar: 'يجيب عن هذا السؤال تحليلُ المياه وظروف التشغيل، لا الكتالوج. ابدأ من هناك.',
          },
          locale,
        )}
        primary={{ label: t(tech.cta, locale), href: localePath(locale, 'request-solution') }}
        secondary={{ label: t(D.talkToEngineer, locale), href: localePath(locale, 'contact?intent=engineer') }}
      />
    </>
  );
}
