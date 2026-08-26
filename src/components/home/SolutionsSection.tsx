import { Band, SectionHeading } from '@/components/ui/Section';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Button';
import { SolutionCard } from '@/components/cards/Cards';
import { dictionary as D } from '@/content/dictionary';
import { solutions } from '@/content/solutions';
import { localePath, t, type Locale } from '@/lib/i18n';
import { pickBySlug } from '@/lib/utils';

/** The six headline applications, ordered by commercial priority. */
const FEATURED = ['cooling-water', 'boiler-steam', 'ro-membranes', 'process-water', 'wastewater', 'industrial-water'];

export function SolutionsSection({ locale }: { locale: Locale }) {
  const featured = pickBySlug(solutions, FEATURED);

  return (
    <Band tone="paper" className="section">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            index={3}
            eyebrow={t({ en: 'Solutions', ar: 'الحلول' }, locale)}
            title={t({ en: 'Built Around Your Water Challenge.', ar: 'مبنية حول تحدي المياه لديك.' }, locale)}
            lead={t(
              {
                en: 'Start with the application you operate. Every route leads to the same engineering, applied to your system.',
                ar: 'ابدأ من التطبيق الذي تشغّله. وكل مسار يقود إلى الهندسة نفسها، مطبَّقة على نظامك.',
              },
              locale,
            )}
            actions={
              <ButtonLink href={localePath(locale, 'solutions')} variant="ghost" size="sm" withArrow>
                {t(D.exploreSolutions, locale)}
              </ButtonLink>
            }
          />
        </Reveal>

        <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((solution, i) => (
            <RevealItem key={solution.slug}>
              <SolutionCard solution={solution} locale={locale} index={i + 1} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Band>
  );
}
