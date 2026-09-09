import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageHero } from '@/components/layout/PageHero';
import { PageCta } from '@/components/layout/RelatedSections';
import { Band, SectionHeading } from '@/components/ui/Section';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { ProjectCard } from '@/components/cards/Cards';
import { Icon } from '@/components/ui/Icon';
import { dictionary as D } from '@/content/dictionary';
import { projects } from '@/content/projects';
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
    path: 'projects',
    title: { en: 'Projects & Case Studies | C-Water', ar: 'المشروعات ودراسات الحالة | C-Water' },
    description: {
      en: 'How C-Water works through industrial water treatment problems — the challenge, the existing system, the engineering approach and what it addresses.',
      ar: 'كيف تعالج C-Water مشكلات معالجة المياه الصناعية — التحدي، والنظام القائم، والمنهج الهندسي، وما الذي يعالجه.',
    },
  });
}

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;

  const label = t({ en: 'Projects', ar: 'المشروعات' }, locale);
  const allIllustrative = projects.every((p) => p.isIllustrative);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { label: t(D.home, locale), href: localePath(locale) },
              { label, href: localePath(locale, 'projects') },
            ]),
          ),
        }}
      />

      <PageHero
        locale={locale}
        breadcrumbs={[{ label: t(D.home, locale), href: localePath(locale) }, { label }]}
        eyebrow={label}
        title={t({ en: 'Engineering That Shows Up in the Results.', ar: 'هندسة تظهر في النتائج.' }, locale)}
        lead={t(
          {
            en: 'Each entry follows the same structure: the challenge, the system as found, the approach taken, the technology involved and what it addresses.',
            ar: 'يتبع كل مدخل الهيكل نفسه: التحدي، والنظام كما وُجد، والمنهج المتبع، والتقنية المستخدمة، وما الذي يعالجه.',
          },
          locale,
        )}
        primaryCta={{ label: t(D.discussSimilarChallenge, locale), href: localePath(locale, 'request-solution') }}
        size="large"
      />

      {/* Stated once, at the top of the index, rather than buried per card. */}
      {allIllustrative ? (
        <Band tone="mist" className="py-8">
          <div className="container-page">
            <div className="flex items-start gap-4 border border-warn-700/35 bg-warn-700/[0.06] p-5">
              <Icon name="clipboard" size={20} className="mt-0.5 shrink-0 text-warn-700" />
              <div>
                <p className="font-display text-[0.9375rem] font-semibold tracking-tight text-ink-950">
                  {t(D.illustrativeProject, locale)}
                </p>
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-600">
                  {t(D.illustrativeProjectNote, locale)}{' '}
                  {t(
                    {
                      en: 'Cleared project records with validated results will replace these entries as customer permissions are obtained.',
                      ar: 'وستحل سجلات مشروعات معتمدة بنتائج مُتحقَّق منها محل هذه المدخلات فور الحصول على موافقات العملاء.',
                    },
                    locale,
                  )}
                </p>
              </div>
            </div>
          </div>
        </Band>
      ) : null}

      <Band tone="paper" className="section">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              index={1}
              eyebrow={t({ en: 'Case studies', ar: 'دراسات الحالة' }, locale)}
              title={t({ en: 'Real Water Problems. Engineered Solutions.', ar: 'مشكلات مياه حقيقية. حلول مُهندَسة.' }, locale)}
            />
          </Reveal>
          <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <RevealItem key={project.slug}>
                <ProjectCard project={project} locale={locale} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Band>

      <PageCta
        locale={locale}
        title={t({ en: 'Working Through a Similar Challenge?', ar: 'تواجه تحديًا مشابهًا؟' }, locale)}
        body={t(
          {
            en: 'Describe what you are seeing and what has already been tried. The second part is usually the more useful of the two.',
            ar: 'صف ما تلاحظه وما جُرّب بالفعل. والجزء الثاني عادةً هو الأنفع من بينهما.',
          },
          locale,
        )}
        primary={{ label: t(D.talkToEngineer, locale), href: localePath(locale, 'request-solution') }}
        secondary={{ label: t(D.exploreSolutions, locale), href: localePath(locale, 'solutions') }}
      />
    </>
  );
}
