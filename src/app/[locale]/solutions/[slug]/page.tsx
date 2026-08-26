import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageHero } from '@/components/layout/PageHero';
import {
  PageCta,
  RelatedIndustries,
  RelatedKnowledge,
  RelatedProducts,
  RelatedProjects,
  RelatedServices,
  RelatedTechnologies,
} from '@/components/layout/RelatedSections';
import { Band, SectionHeading } from '@/components/ui/Section';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { PointGrid } from '@/components/ui/Pieces';
import { Icon } from '@/components/ui/Icon';
import { dictionary as D } from '@/content/dictionary';
import { partnerBySlug } from '@/content/partners';
import { solutions, solutionBySlug } from '@/content/solutions';
import { isLocale, localePath, LOCALES, t, type Locale } from '@/lib/i18n';
import { breadcrumbSchema, pageMetadata } from '@/lib/seo';
import { pad } from '@/lib/utils';

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => solutions.map((s) => ({ locale, slug: s.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const solution = solutionBySlug[slug];
  if (!isLocale(locale) || !solution) return {};
  return pageMetadata({
    locale,
    path: `solutions/${slug}`,
    title: solution.metaTitle,
    description: solution.metaDescription,
  });
}

export default async function SolutionPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const solution = solutionBySlug[slug];
  if (!solution) notFound();

  const crumbs = [
    { label: t(D.home, locale), href: localePath(locale) },
    { label: t({ en: 'Solutions', ar: 'الحلول' }, locale), href: localePath(locale, 'solutions') },
    { label: t(solution.title, locale) },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { label: t(D.home, locale), href: localePath(locale) },
              { label: t({ en: 'Solutions', ar: 'الحلول' }, locale), href: localePath(locale, 'solutions') },
              { label: t(solution.title, locale), href: localePath(locale, `solutions/${slug}`) },
            ]),
          ),
        }}
      />

      <PageHero
        locale={locale}
        breadcrumbs={crumbs}
        eyebrow={t({ en: 'Solution', ar: 'حل' }, locale)}
        icon={solution.systemFlow[0]?.icon}
        title={t(solution.headline, locale)}
        lead={t(solution.intro, locale)}
        primaryCta={{ label: t(solution.cta, locale), href: localePath(locale, 'request-solution') }}
        secondaryCta={{ label: t(D.requestQuote, locale), href: localePath(locale, 'request-quote') }}
        size="large"
      />

      {/* ---- 01 Why it matters ---- */}
      <Band tone="paper" className="section">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
            <Reveal>
              <SectionHeading index={1} eyebrow={t(D.whyItMatters, locale)} title={t(solution.title, locale)} />
            </Reveal>
            <Reveal delay={0.06}>
              <p className="text-lead leading-relaxed text-ink-600">{t(solution.whyItMatters, locale)}</p>
            </Reveal>
          </div>
        </div>
      </Band>

      {/* ---- 02 Common problems ---- */}
      <Band tone="mist" className="section">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              index={2}
              eyebrow={t(D.commonProblems, locale)}
              title={t({ en: 'What Goes Wrong.', ar: 'ما الذي يحدث من خلل.' }, locale)}
            />
          </Reveal>
          <div className="mt-12 border border-ink-200">
            <PointGrid points={solution.problems} locale={locale} />
          </div>
        </div>
      </Band>

      {/* ---- 03 Risks ---- */}
      <Band tone="ink" className="section-tight">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              index={3}
              eyebrow={t(D.operationalRisks, locale)}
              title={t({ en: 'What It Costs the Operation.', ar: 'ما الذي يكلفه ذلك للتشغيل.' }, locale)}
              tone="light"
            />
          </Reveal>
          <RevealGroup className="mt-10 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {solution.risks.map((risk) => (
              <RevealItem key={risk.id}>
                <div className="flex h-full flex-col bg-ink-950 p-6">
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

      {/* ---- 04 The C-Water approach ---- */}
      <Band tone="paper" className="section">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              index={4}
              eyebrow={t(D.ourApproach, locale)}
              title={t({ en: 'How We Work the Problem.', ar: 'كيف نعالج المشكلة.' }, locale)}
            />
          </Reveal>
          <RevealGroup as="ol" className="mt-12 flex flex-col">
            {solution.approach.map((step, i) => (
              <RevealItem as="li" key={step.id}>
                <div className="group grid gap-5 border-b border-ink-200 py-8 first:border-t sm:grid-cols-[auto_minmax(0,1fr)_minmax(0,1.6fr)] sm:gap-10 sm:py-9">
                  <span className="u-label pt-1 text-signal-700">{pad(i + 1)}</span>
                  <div className="flex items-start gap-4">
                    {step.icon ? (
                      <Icon
                        name={step.icon}
                        size={24}
                        className="mt-0.5 shrink-0 text-ink-300 transition-colors duration-500 group-hover:text-signal-500"
                      />
                    ) : null}
                    <h3 className="font-display text-h4 leading-tight font-semibold tracking-tight text-ink-950">
                      {t(step.label, locale)}
                    </h3>
                  </div>
                  <p className="leading-relaxed text-ink-600">{t(step.body, locale)}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Band>

      {/* ---- 05 System flow ---- */}
      <Band tone="ink-deep" blueprint className="section">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              index={5}
              eyebrow={t(D.technologyStack, locale)}
              title={t({ en: 'The System, Stage by Stage.', ar: 'النظام، مرحلة بمرحلة.' }, locale)}
              lead={t(
                {
                  en: 'Each stage changes what the next one has to deal with. This is the sequence C-Water engineers around.',
                  ar: 'كل مرحلة تغيّر ما يجب أن تتعامل معه المرحلة التالية. وهذا هو التسلسل الذي تصمم C-Water حوله.',
                },
                locale,
              )}
              tone="light"
            />
          </Reveal>

          <RevealGroup as="ol" className="mt-12 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {solution.systemFlow.map((stage, i) => {
              const partner = stage.partner ? partnerBySlug[stage.partner] : null;
              const cardClass =
                'group flex h-full flex-col bg-ink-950 p-6 transition-colors duration-500 hover:bg-ink-900';
              const body = (
                <>
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <span className="u-label text-ink-500">{pad(i + 1)}</span>
                    <Icon name={stage.icon} size={22} className="text-signal-400" />
                  </div>
                  <p className="font-display text-[0.9375rem] leading-snug font-semibold tracking-tight text-white">
                    {t(stage.label, locale)}
                  </p>
                  <p className="mt-1.5 text-[0.8125rem] leading-snug text-ink-400">{t(stage.caption, locale)}</p>
                  {partner ? (
                    <span className="u-label latin mt-auto pt-4 text-signal-300/70">{partner.legalName}</span>
                  ) : null}
                </>
              );
              /* A stage links onward only when it maps to a page. Link rather
                 than a raw anchor, so the href picks up the base path when the
                 site is served from a subdirectory. */
              return (
                <RevealItem as="li" key={stage.id}>
                  {stage.href ? (
                    <Link href={localePath(locale, stage.href)} className={cardClass}>
                      {body}
                    </Link>
                  ) : (
                    <div className={cardClass}>{body}</div>
                  )}
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </Band>

      <RelatedTechnologies slugs={solution.technologies} locale={locale} tone="light" />
      <RelatedProducts slugs={solution.products} locale={locale} tone="dark" />
      <RelatedServices slugs={solution.services} locale={locale} tone="light" />
      <RelatedIndustries slugs={solution.industries} locale={locale} tone="dark" />
      <RelatedProjects slugs={solution.projects} locale={locale} tone="light" />
      <RelatedKnowledge slugs={solution.articles} locale={locale} tone="dark" />

      <PageCta
        locale={locale}
        title={t({ en: 'Let’s Talk About Your System.', ar: 'لنتحدث عن نظامك.' }, locale)}
        body={t(
          {
            en: 'Tell us the operating conditions and what you are seeing. We will confirm the water chemistry before recommending anything.',
            ar: 'أخبرنا بظروف التشغيل وبما تلاحظه. وسنؤكد كيمياء المياه قبل التوصية بأي شيء.',
          },
          locale,
        )}
        primary={{ label: t(solution.cta, locale), href: localePath(locale, 'request-solution') }}
        secondary={{ label: t(D.requestQuote, locale), href: localePath(locale, 'request-quote') }}
      />
    </>
  );
}
