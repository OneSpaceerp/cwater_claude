import { Band, SectionHeading } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Button';
import { IndustryCard } from '@/components/cards/Cards';
import { industries } from '@/content/industries';
import { localePath, t, type Locale } from '@/lib/i18n';

/**
 * Industries.
 *
 * A horizontal rail rather than a grid: the sector list is long enough that a
 * grid would dominate the homepage, and a rail reads as a continuing sequence
 * that the visitor can scan or swipe.
 */
export function IndustriesSection({ locale }: { locale: Locale }) {
  return (
    <Band tone="mist" className="section overflow-hidden">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            index={7}
            eyebrow={t({ en: 'Industries', ar: 'القطاعات' }, locale)}
            title={t({ en: 'Engineered for the Way You Operate.', ar: 'مُهندَسة وفق طريقة تشغيلك.' }, locale)}
            lead={t(
              {
                en: 'The right treatment approach depends on the process, the assets and the operating reality of the site.',
                ar: 'يعتمد منهج المعالجة الصحيح على العملية والأصول والواقع التشغيلي للموقع.',
              },
              locale,
            )}
            actions={
              <ButtonLink href={localePath(locale, 'industries')} variant="ghost" size="sm" withArrow>
                {t({ en: 'All industries', ar: 'كل القطاعات' }, locale)}
              </ButtonLink>
            }
          />
        </Reveal>
      </div>

      <Reveal delay={0.08}>
        {/* Full-bleed rail: scrolls past the container edge so it reads as a
            continuing sequence rather than a clipped grid. */}
        <div className="no-scrollbar mt-12 flex gap-5 overflow-x-auto px-5 pb-2 md:px-10 xl:px-16">
          {industries.map((industry) => (
            <div key={industry.slug} className="w-[17rem] shrink-0 sm:w-[19rem]">
              <IndustryCard industry={industry} locale={locale} />
            </div>
          ))}
        </div>
      </Reveal>
    </Band>
  );
}
