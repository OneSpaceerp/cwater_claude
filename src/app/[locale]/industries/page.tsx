import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageHero } from '@/components/layout/PageHero';
import { PageCta } from '@/components/layout/RelatedSections';
import { Band, SectionHeading } from '@/components/ui/Section';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { IndustryCard } from '@/components/cards/Cards';
import { dictionary as D } from '@/content/dictionary';
import { industries } from '@/content/industries';
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
    path: 'industries',
    title: {
      en: 'Water Treatment by Industry | C-Water Egypt',
      ar: 'معالجة المياه حسب القطاع | C-Water مصر',
    },
    description: {
      en: 'Water treatment for manufacturing, food and beverage, hospitality, healthcare, oil and gas, power, pharmaceutical, commercial buildings, municipal, agriculture and aquaculture.',
      ar: 'معالجة المياه للصناعات التحويلية والأغذية والمشروبات والضيافة والرعاية الصحية والبترول والغاز والطاقة والأدوية والمباني التجارية والبلديات والزراعة والاستزراع المائي.',
    },
  });
}

export default async function IndustriesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;

  const label = t({ en: 'Industries', ar: 'القطاعات' }, locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { label: t(D.home, locale), href: localePath(locale) },
              { label, href: localePath(locale, 'industries') },
            ]),
          ),
        }}
      />

      <PageHero
        locale={locale}
        breadcrumbs={[{ label: t(D.home, locale), href: localePath(locale) }, { label }]}
        eyebrow={label}
        title={t({ en: 'Your Industry Changes the Water Problem.', ar: 'قطاعك يغيّر طبيعة مشكلة المياه.' }, locale)}
        lead={t(
          {
            en: 'The right treatment approach depends on the process, the regulations, the assets and the operating reality of the site. Choose a sector to see the systems, the risks and what applies.',
            ar: 'يعتمد منهج المعالجة الصحيح على العملية واللوائح والأصول والواقع التشغيلي للموقع. اختر قطاعًا لترى الأنظمة والمخاطر وما ينطبق عليها.',
          },
          locale,
        )}
        primaryCta={{ label: t(D.talkToEngineer, locale), href: localePath(locale, 'contact?intent=engineer') }}
        size="large"
      />

      <Band tone="paper" className="section">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              index={1}
              eyebrow={t({ en: 'All sectors', ar: 'كل القطاعات' }, locale)}
              title={t({ en: 'Choose Your Industry.', ar: 'اختر قطاعك.' }, locale)}
            />
          </Reveal>
          <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {industries.map((industry) => (
              <RevealItem key={industry.slug}>
                <IndustryCard industry={industry} locale={locale} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Band>

      <PageCta
        locale={locale}
        title={t({ en: 'Operating something not listed?', ar: 'تشغّل شيئًا غير مدرج؟' }, locale)}
        body={t(
          {
            en: 'The application matters more than the sector label. Describe the system and we will tell you what applies.',
            ar: 'التطبيق أهم من مسمى القطاع. صف النظام وسنخبرك بما ينطبق عليه.',
          },
          locale,
        )}
        primary={{ label: t(D.requestSolution, locale), href: localePath(locale, 'request-solution') }}
        secondary={{ label: t(D.exploreSolutions, locale), href: localePath(locale, 'solutions') }}
      />
    </>
  );
}
