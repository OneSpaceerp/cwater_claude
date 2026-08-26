import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageHero } from '@/components/layout/PageHero';
import { PageCta } from '@/components/layout/RelatedSections';
import { Band, SectionHeading } from '@/components/ui/Section';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { SolutionCard } from '@/components/cards/Cards';
import { SolutionFinder, type FinderSolution } from '@/components/interactive/SolutionFinder';
import { dictionary as D } from '@/content/dictionary';
import { solutions } from '@/content/solutions';
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
    path: 'solutions',
    title: {
      en: 'Water Treatment Solutions by Application | C-Water',
      ar: 'حلول معالجة المياه حسب التطبيق | C-Water',
    },
    description: {
      en: 'Cooling water, boiler and steam, RO and membranes, process water, wastewater, potable and industrial water — treatment engineered around the system you actually operate.',
      ar: 'مياه التبريد والغلايات والبخار والتناضح العكسي والأغشية ومياه العمليات ومياه الصرف والشرب والمياه الصناعية — معالجة مُهندَسة حول النظام الذي تشغّله فعلًا.',
    },
  });
}

export default async function SolutionsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;

  /* The finder scores against tags and renders three strings; it does not need
     the full solution records in the browser. */
  const finderSolutions: FinderSolution[] = solutions.map((solution) => ({
    slug: solution.slug,
    title: t(solution.title, locale),
    headline: t(solution.headline, locale),
    summary: t(solution.summary, locale),
    cta: t(solution.cta, locale),
    problemTags: solution.problemTags,
    goalTags: solution.goalTags,
  }));

  const crumbs = [
    { label: t(D.home, locale), href: localePath(locale) },
    { label: t({ en: 'Solutions', ar: 'الحلول' }, locale) },
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
            ]),
          ),
        }}
      />

      <PageHero
        locale={locale}
        breadcrumbs={crumbs}
        eyebrow={t({ en: 'Solutions', ar: 'الحلول' }, locale)}
        title={t({ en: 'Solutions Built Around Your Water System.', ar: 'حلول مبنية حول نظام المياه لديك.' }, locale)}
        lead={t(
          {
            en: 'Every application has different chemistry, equipment, risks and operating conditions. C-Water connects engineering, chemistry, filtration, monitoring and control around the real system — not around a product list.',
            ar: 'لكل تطبيق كيمياء ومعدات ومخاطر وظروف تشغيل مختلفة. تربط C-Water الهندسة والكيمياء والترشيح والمراقبة والتحكم حول النظام الحقيقي — لا حول قائمة منتجات.',
          },
          locale,
        )}
        primaryCta={{ label: t({ en: 'Find My Solution', ar: 'اعثر على الحل المناسب' }, locale), href: '#finder' }}
        secondaryCta={{ label: t(D.talkToEngineer, locale), href: localePath(locale, 'contact?intent=engineer') }}
        size="large"
      />

      {/* ---- All solutions ---- */}
      <Band tone="paper" className="section">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              index={1}
              eyebrow={t({ en: 'By application', ar: 'حسب التطبيق' }, locale)}
              title={t({ en: 'Start With What You Operate.', ar: 'ابدأ مما تشغّله.' }, locale)}
            />
          </Reveal>
          <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {solutions.map((solution, i) => (
              <RevealItem key={solution.slug}>
                <SolutionCard solution={solution} locale={locale} index={i + 1} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Band>

      {/* ---- Solution finder ---- */}
      <Band tone="ink" blueprint className="section" id="finder">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
            <Reveal>
              <SectionHeading
                index={2}
                eyebrow={t(D.finder.eyebrow, locale)}
                title={t(D.finder.title, locale)}
                lead={t(D.finder.intro, locale)}
                tone="light"
              />
            </Reveal>
            <Reveal delay={0.08}>
              <SolutionFinder locale={locale} solutions={finderSolutions} />
            </Reveal>
          </div>
        </div>
      </Band>

      <PageCta
        locale={locale}
        title={t({ en: 'Not sure which applies?', ar: 'لست متأكدًا أيها ينطبق؟' }, locale)}
        body={t(
          {
            en: 'Describe the system and what it is doing. An engineer will tell you where to start.',
            ar: 'صف النظام وما يحدث فيه، وسيخبرك أحد المهندسين من أين تبدأ.',
          },
          locale,
        )}
        primary={{ label: t(D.requestSolution, locale), href: localePath(locale, 'request-solution') }}
        secondary={{ label: t(D.talkToEngineer, locale), href: localePath(locale, 'contact?intent=engineer') }}
      />
    </>
  );
}
