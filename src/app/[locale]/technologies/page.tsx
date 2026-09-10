import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageHero } from '@/components/layout/PageHero';
import { PageCta } from '@/components/layout/RelatedSections';
import { Band, SectionHeading } from '@/components/ui/Section';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { TechnologyCard, PartnerCard } from '@/components/cards/Cards';
import { SystemExplorer } from '@/components/interactive/SystemExplorer';
import { dictionary as D } from '@/content/dictionary';
import { partners } from '@/content/partners';
import { technologies } from '@/content/technologies';
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
    path: 'technologies',
    title: {
      en: 'Water Treatment Technologies | C-Water',
      ar: 'تقنيات معالجة المياه | C-Water',
    },
    description: {
      en: 'Treatment chemistry, filtration, chemical dosing, sensors and measurement, monitoring and control, reverse osmosis, remote monitoring, water analysis and system integration.',
      ar: 'كيمياء المعالجة، والترشيح، والجرعات الكيميائية، والمستشعرات والقياس، والمراقبة والتحكم، والتناضح العكسي، والمراقبة عن بُعد، وتحليل المياه، وتكامل الأنظمة.',
    },
  });
}

export default async function TechnologiesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;

  const label = t({ en: 'Technologies', ar: 'التقنيات' }, locale);

  /* Ordered by position in the treatment chain, so the hub reads as a system
     rather than an alphabetical list. */
  const ordered = [...technologies].sort((a, b) => a.chainPosition - b.chainPosition);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { label: t(D.home, locale), href: localePath(locale) },
              { label, href: localePath(locale, 'technologies') },
            ]),
          ),
        }}
      />

      <PageHero
        locale={locale}
        breadcrumbs={[{ label: t(D.home, locale), href: localePath(locale) }, { label }]}
        eyebrow={label}
        title={t({ en: 'Technology That Works Together.', ar: 'تقنيات تعمل معًا.' }, locale)}
        lead={t(
          {
            en: 'No single technology solves every water-treatment problem. The strongest solution combines the right technologies in the right sequence — which is the part that has to be engineered.',
            ar: 'لا توجد تقنية واحدة تحل كل مشكلات معالجة المياه. فالحل الأقوى يجمع التقنيات الصحيحة بالتسلسل الصحيح — وهذا هو الجزء الذي يحتاج تصميمًا هندسيًا.',
          },
          locale,
        )}
        primaryCta={{ label: t(D.talkToEngineer, locale), href: localePath(locale, 'contact?intent=engineer') }}
        size="large"
        sweepTo="none"
      />

      {/* ---- The connected system ---- */}
      <Band tone="ink-deep" blueprint className="section">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              index={1}
              eyebrow={t({ en: 'The technology map', ar: 'خريطة التقنيات' }, locale)}
              title={t({ en: 'One Chain, Several Technologies.', ar: 'سلسلة واحدة، تقنيات متعددة.' }, locale)}
              lead={t(
                {
                  en: 'Select a stage to see what happens there, which partner technology sits at it, and where it leads.',
                  ar: 'اختر مرحلة لترى ما يحدث فيها، وأي تقنية شريك توجد بها، وإلى أين تقود.',
                },
                locale,
              )}
              tone="light"
            />
          </Reveal>
          <div className="mt-14">
            <SystemExplorer locale={locale} />
          </div>
        </div>
      </Band>

      {/* ---- All technologies ---- */}
      <Band tone="paper" className="section">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              index={2}
              eyebrow={t({ en: 'Capabilities', ar: 'القدرات' }, locale)}
              title={t({ en: 'Explore Each Technology.', ar: 'استكشف كل تقنية.' }, locale)}
              lead={t(
                {
                  en: 'Listed in the order they appear in a treatment train — understand the water, remove what should not be there, control the chemistry, then measure and improve.',
                  ar: 'مرتبة بحسب ظهورها في سلسلة المعالجة — افهم المياه، وأزل ما لا ينبغي وجوده، وتحكّم في الكيمياء، ثم قِس وحسّن.',
                },
                locale,
              )}
            />
          </Reveal>
          <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {ordered.map((tech, i) => (
              <RevealItem key={tech.slug}>
                <TechnologyCard technology={tech} locale={locale} index={i + 1} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Band>

      {/* ---- Partners ---- */}
      <Band tone="mist" className="section">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              index={3}
              eyebrow={t({ en: 'Technology partners', ar: 'شركاء التقنية' }, locale)}
              title={t({ en: 'Where the Technology Comes From.', ar: 'من أين تأتي التقنية.' }, locale)}
            />
          </Reveal>
          <RevealGroup className="mt-12 grid gap-5 md:grid-cols-3">
            {partners.map((partner) => (
              <RevealItem key={partner.slug}>
                <PartnerCard partner={partner} locale={locale} tone="light" />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Band>

      <PageCta
        locale={locale}
        title={t({ en: 'Which technology applies to your system?', ar: 'أي تقنية تنطبق على نظامك؟' }, locale)}
        body={t(
          {
            en: 'That depends on the water, the equipment and what you are trying to achieve. Start with a technical assessment.',
            ar: 'يعتمد ذلك على المياه والمعدات وما تسعى لتحقيقه. ابدأ بتقييم فني.',
          },
          locale,
        )}
        primary={{ label: t(D.requestSolution, locale), href: localePath(locale, 'request-solution') }}
        secondary={{ label: t({ en: 'Browse Products', ar: 'استعرض المنتجات' }, locale), href: localePath(locale, 'products') }}
      />
    </>
  );
}
