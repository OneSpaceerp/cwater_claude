import { Band, SectionHeading } from '@/components/ui/Section';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Button';
import { PartnerCard } from '@/components/cards/Cards';
import { partners } from '@/content/partners';
import { localePath, t, type Locale } from '@/lib/i18n';

/**
 * Technology partners.
 *
 * Presented as one capability delivered by C-Water, not as three logos in a
 * row. Partner names are set in type at a deliberately restrained scale — the
 * heading above them keeps C-Water as the master brand, and the closing line
 * states the relationship explicitly.
 */
export function PartnersSection({ locale }: { locale: Locale }) {
  return (
    <Band tone="paper" className="section">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            index={5}
            eyebrow={t({ en: 'Technology partners', ar: 'شركاء التقنية' }, locale)}
            title={t({ en: 'Global Technology. Delivered by C-Water.', ar: 'تقنية عالمية. يقدّمها فريق C-Water.' }, locale)}
            lead={t(
              {
                en: 'We combine specialised technologies from established international partners with local engineering, application knowledge and technical support.',
                ar: 'نجمع بين تقنيات متخصصة من شركاء دوليين راسخين وبين الهندسة المحلية والمعرفة التطبيقية والدعم الفني.',
              },
              locale,
            )}
            actions={
              <ButtonLink href={localePath(locale, 'partners')} variant="ghost" size="sm" withArrow>
                {t({ en: 'Explore the ecosystem', ar: 'استكشف المنظومة' }, locale)}
              </ButtonLink>
            }
          />
        </Reveal>

        <RevealGroup className="mt-14 grid gap-5 md:grid-cols-3">
          {partners.map((partner) => (
            <RevealItem key={partner.slug}>
              <PartnerCard partner={partner} locale={locale} tone="light" />
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.1}>
          <p className="mt-10 flex items-center gap-4 border-t border-ink-200 pt-8 text-sm text-ink-500">
            <span aria-hidden className="h-px w-10 shrink-0 bg-signal-500" />
            {t(
              {
                en: 'Powered by proven global technology. Delivered through C-Water engineering — one partner, one point of responsibility.',
                ar: 'مدعومة بتقنيات عالمية مُثبتة. تُقدَّم عبر هندسة C-Water — شريك واحد ومسؤولية واحدة.',
              },
              locale,
            )}
          </p>
        </Reveal>
      </div>
    </Band>
  );
}
