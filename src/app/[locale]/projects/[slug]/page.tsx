import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageHero } from '@/components/layout/PageHero';
import { PageCta, RelatedKnowledge, RelatedProducts, RelatedTechnologies } from '@/components/layout/RelatedSections';
import { Band, SectionHeading } from '@/components/ui/Section';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { Icon } from '@/components/ui/Icon';
import { dictionary as D } from '@/content/dictionary';
import { industryBySlug } from '@/content/industries';
import { projects, projectBySlug } from '@/content/projects';
import { solutionBySlug } from '@/content/solutions';
import { isLocale, localePath, LOCALES, t, type Locale } from '@/lib/i18n';
import { breadcrumbSchema, pageMetadata } from '@/lib/seo';
import { pad } from '@/lib/utils';

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => projects.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = projectBySlug[slug];
  if (!isLocale(locale) || !project) return {};
  return pageMetadata({ locale, path: `projects/${slug}`, title: project.metaTitle, description: project.metaDescription });
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const project = projectBySlug[slug];
  if (!project) notFound();

  const industry = industryBySlug[project.industry];
  const solution = solutionBySlug[project.solution];
  const parentLabel = t({ en: 'Projects', ar: 'المشروعات' }, locale);

  return (
    <>
      {/* Illustrative records are deliberately excluded from structured data:
          marking a format example as a real case study would be misleading. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { label: t(D.home, locale), href: localePath(locale) },
              { label: parentLabel, href: localePath(locale, 'projects') },
              { label: t(project.title, locale), href: localePath(locale, `projects/${slug}`) },
            ]),
          ),
        }}
      />

      <PageHero
        locale={locale}
        breadcrumbs={[
          { label: t(D.home, locale), href: localePath(locale) },
          { label: parentLabel, href: localePath(locale, 'projects') },
          { label: t(project.title, locale) },
        ]}
        eyebrow={[industry ? t(industry.title, locale) : null, solution ? t(solution.title, locale) : null]
          .filter(Boolean)
          .join(' · ')}
        title={t(project.title, locale)}
        lead={t(project.summary, locale)}
        primaryCta={{ label: t(D.discussSimilarChallenge, locale), href: localePath(locale, 'request-solution') }}
        size="large"
        aside={
          <dl className="divide-y divide-white/10 border border-white/12 bg-ink-900/85">
            <div className="flex items-baseline justify-between gap-4 p-4">
              <dt className="u-label text-ink-500">{t(D.industry, locale)}</dt>
              <dd className="text-end text-[0.875rem] text-ink-100">{industry ? t(industry.title, locale) : '—'}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-4 p-4">
              <dt className="u-label text-ink-500">{t(D.application, locale)}</dt>
              <dd className="text-end text-[0.875rem] text-ink-100">{solution ? t(solution.title, locale) : '—'}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-4 p-4">
              <dt className="u-label text-ink-500">{t({ en: 'Location', ar: 'الموقع' }, locale)}</dt>
              <dd className="text-end text-[0.875rem] text-ink-300">{t(project.location, locale)}</dd>
            </div>
          </dl>
        }
      />

      {/* ---- Illustrative notice ---- */}
      {project.isIllustrative ? (
        <Band tone="mist" className="py-8">
          <div className="container-page">
            <div className="flex items-start gap-4 border border-warn-700/35 bg-warn-700/[0.06] p-5">
              <Icon name="clipboard" size={20} className="mt-0.5 shrink-0 text-warn-700" />
              <div>
                <p className="font-display text-[0.9375rem] font-semibold tracking-tight text-ink-950">
                  {t(D.illustrativeProject, locale)}
                </p>
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-600">
                  {t(D.illustrativeProjectNote, locale)}
                </p>
              </div>
            </div>
          </div>
        </Band>
      ) : null}

      {/* ---- Challenge and existing system ---- */}
      <Band tone="paper" className="section">
        <div className="container-page">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <SectionHeading index={1} eyebrow={t({ en: 'The challenge', ar: 'التحدي' }, locale)} title={t({ en: 'What Was Wrong.', ar: 'ما كان الخلل.' }, locale)} />
              <p className="mt-8 text-lead leading-relaxed text-ink-600">{t(project.challenge, locale)}</p>
            </Reveal>
            <Reveal delay={0.06}>
              <SectionHeading index={2} eyebrow={t({ en: 'The existing system', ar: 'النظام القائم' }, locale)} title={t({ en: 'What Was There.', ar: 'ما كان موجودًا.' }, locale)} />
              <p className="mt-8 text-lead leading-relaxed text-ink-600">{t(project.existingSystem, locale)}</p>
            </Reveal>
          </div>
        </div>
      </Band>

      {/* ---- Approach ---- */}
      <Band tone="ink" blueprint className="section">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              index={3}
              eyebrow={t({ en: 'What C-Water did', ar: 'ما قامت به C-Water' }, locale)}
              title={t({ en: 'The Approach.', ar: 'المنهج.' }, locale)}
              tone="light"
            />
          </Reveal>
          <RevealGroup as="ol" className="mt-12 flex flex-col">
            {project.approach.map((step, i) => (
              <RevealItem as="li" key={step.id}>
                <div className="grid gap-5 border-b border-white/10 py-8 first:border-t sm:grid-cols-[auto_minmax(0,1fr)_minmax(0,1.6fr)] sm:gap-10">
                  <span className="u-label pt-1 text-signal-300">{pad(i + 1)}</span>
                  <div className="flex items-start gap-4">
                    {step.icon ? <Icon name={step.icon} size={24} className="mt-0.5 shrink-0 text-signal-400" /> : null}
                    <h3 className="font-display text-h4 leading-tight font-semibold tracking-tight text-white">
                      {t(step.label, locale)}
                    </h3>
                  </div>
                  <p className="leading-relaxed text-ink-300">{t(step.body, locale)}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Band>

      {/* ---- Outcomes ---- */}
      <Band tone="paper" className="section">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              index={4}
              eyebrow={t({ en: 'What it addresses', ar: 'ما الذي يعالجه' }, locale)}
              title={t({ en: 'The Outcome.', ar: 'النتيجة.' }, locale)}
            />
          </Reveal>

          {/* Validated metrics render only where measurement data exists. */}
          {project.metrics.length > 0 ? (
            <RevealGroup className="mt-10 grid gap-px border border-ink-200 bg-ink-200 sm:grid-cols-3">
              {project.metrics.map((metric) => (
                <RevealItem key={metric.label.en}>
                  <div className="bg-white p-7">
                    <p className="u-label text-ink-500">{t(metric.label, locale)}</p>
                    <p className="tnum mt-3 font-display text-3xl font-bold tracking-tight text-signal-700">
                      {metric.value}
                      {metric.unit ? <span className="ms-1 text-lg text-ink-500">{metric.unit}</span> : null}
                    </p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          ) : null}

          <RevealGroup className="mt-10 grid gap-px border border-ink-200 bg-ink-200 sm:grid-cols-3">
            {project.outcomes.map((outcome) => (
              <RevealItem key={outcome.id}>
                <div className="flex h-full flex-col bg-white p-7">
                  {outcome.icon ? <Icon name={outcome.icon} size={22} className="mb-4 text-signal-600" /> : null}
                  <p className="font-display text-base leading-snug font-semibold tracking-tight text-ink-950">
                    {t(outcome.label, locale)}
                  </p>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink-600">{t(outcome.body, locale)}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Band>

      {/* ---- Insight ---- */}
      <Band tone="ink-deep" className="section-tight">
        <div className="container-page">
          <Reveal>
            <div className="mx-auto max-w-3xl">
              <p className="u-label text-signal-300">{t({ en: 'The insight', ar: 'الخلاصة' }, locale)}</p>
              <blockquote className="mt-6 border-s-2 border-signal-500 ps-6 font-display text-h3 leading-snug font-semibold tracking-tight text-white text-balance">
                {t(project.insight, locale)}
              </blockquote>
            </div>
          </Reveal>
        </div>
      </Band>

      <RelatedTechnologies slugs={project.technologies} locale={locale} tone="light" heading={t(D.relatedTechnologies, locale)} />
      <RelatedProducts slugs={project.products} locale={locale} tone="dark" />
      <RelatedKnowledge slugs={project.articles} locale={locale} tone="light" />

      <PageCta
        locale={locale}
        title={t({ en: 'Working Through a Similar Challenge?', ar: 'تواجه تحديًا مشابهًا؟' }, locale)}
        body={t(
          {
            en: 'Tell us what you are seeing and what has already been tried. We will start by establishing what is actually happening.',
            ar: 'أخبرنا بما تلاحظه وبما جُرّب بالفعل. وسنبدأ بتحديد ما يحدث فعليًا.',
          },
          locale,
        )}
        primary={{ label: t(D.talkToEngineer, locale), href: localePath(locale, 'request-solution') }}
        secondary={
          solution
            ? { label: t(solution.cta, locale), href: localePath(locale, `solutions/${solution.slug}`) }
            : undefined
        }
      />
    </>
  );
}
