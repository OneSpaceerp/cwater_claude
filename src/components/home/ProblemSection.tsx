import { Band, SectionHeading } from '@/components/ui/Section';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { Icon } from '@/components/ui/Icon';
import type { IconKey } from '@/content/types';
import { t, type Locale, type Localized } from '@/lib/i18n';

/**
 * "Water problems don't happen one component at a time."
 *
 * Each line states a cause and its operational consequence — the connective
 * logic the whole site rests on. The pairs are rendered as a ladder so the
 * cause→effect relationship is visible, not merely stated.
 */

const CHAIN: { id: string; cause: Localized; effect: Localized; icon: IconKey }[] = [
  {
    id: 'scale',
    icon: 'scale',
    cause: { en: 'Scale', ar: 'الترسبات' },
    effect: { en: 'can become lost efficiency.', ar: 'قد تتحول إلى كفاءة مفقودة.' },
  },
  {
    id: 'corrosion',
    icon: 'corrosion',
    cause: { en: 'Corrosion', ar: 'التآكل' },
    effect: { en: 'can become equipment failure.', ar: 'قد يتحول إلى عطل في المعدات.' },
  },
  {
    id: 'filtration',
    icon: 'filter',
    cause: { en: 'Poor filtration', ar: 'ضعف الترشيح' },
    effect: { en: 'affects everything downstream.', ar: 'يؤثر في كل ما يليه.' },
  },
  {
    id: 'dosing',
    icon: 'pump',
    cause: { en: 'Uncontrolled dosing', ar: 'الجرعات غير المحكومة' },
    effect: { en: 'increases chemical consumption.', ar: 'ترفع استهلاك الكيماويات.' },
  },
  {
    id: 'monitoring',
    icon: 'monitor',
    cause: { en: 'Weak monitoring', ar: 'ضعف المراقبة' },
    effect: { en: 'turns small deviations into operational problems.', ar: 'يحوّل الانحرافات الصغيرة إلى مشكلات تشغيلية.' },
  },
];

export function ProblemSection({ locale }: { locale: Locale }) {
  return (
    <Band tone="paper" className="section">
      <div className="container-page">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-20">
          <Reveal>
            <SectionHeading
              index={1}
              eyebrow={t({ en: 'The problem', ar: 'المشكلة' }, locale)}
              title={t(
                { en: 'Water Problems Don’t Happen One Component at a Time.', ar: 'مشكلات المياه لا تحدث في مكوّن واحد فقط.' },
                locale,
              )}
            />
            <div className="mt-10 border-t border-ink-200 pt-8">
              <p className="max-w-md font-display text-h4 leading-snug font-semibold tracking-tight text-signal-700">
                {t({ en: 'C-Water connects the entire treatment chain.', ar: 'تربط C-Water سلسلة المعالجة بأكملها.' }, locale)}
              </p>
            </div>
          </Reveal>

          <RevealGroup as="ul" className="flex flex-col">
            {CHAIN.map((item) => (
              <RevealItem as="li" key={item.id}>
                <div className="group flex items-baseline gap-5 border-b border-ink-200 py-6 first:border-t sm:gap-7">
                  <Icon
                    name={item.icon}
                    size={24}
                    className="shrink-0 translate-y-1 text-ink-300 transition-colors duration-500 group-hover:text-signal-500"
                  />
                  <p className="text-lead leading-snug text-ink-600">
                    <span className="font-display font-semibold tracking-tight text-ink-950">
                      {t(item.cause, locale)}
                    </span>{' '}
                    {t(item.effect, locale)}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </Band>
  );
}
