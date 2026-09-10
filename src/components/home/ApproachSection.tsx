import { Band, SectionHeading } from '@/components/ui/Section';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { Icon } from '@/components/ui/Icon';
import { operatingModel } from '@/content/site';
import { t, type Locale } from '@/lib/i18n';
import { pad } from '@/lib/utils';

/**
 * Diagnose → Design → Treat → Control → Monitor → Optimize.
 *
 * The conceptual backbone of the whole site, rendered as a connected sequence.
 * The hairline that runs through the six steps carries the same visual logic
 * as the treatment line in the hero.
 */
export function ApproachSection({ locale }: { locale: Locale }) {
  return (
    <Band tone="brand" waveFrom="paper" waveTo="paper" className="section">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            index={2}
            eyebrow={t({ en: 'The C-Water approach', ar: 'منهج C-Water' }, locale)}
            title={t({ en: 'One Water System. One Integrated Approach.', ar: 'نظام مياه واحد. منهج متكامل واحد.' }, locale)}
            lead={t(
              {
                en: 'The same sequence runs through every application we work on, whatever the technology involved.',
                ar: 'التسلسل نفسه يسري في كل تطبيق نعمل عليه، أيًا كانت التقنية المستخدمة.',
              },
              locale,
            )}
            tone="light"
          />
        </Reveal>

        <RevealGroup as="ol" className="relative mt-14 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {operatingModel.map((step, i) => (
            <RevealItem as="li" key={step.id}>
              <div className="group relative flex h-full flex-col bg-white/[0.08] p-7 transition-colors duration-500 hover:bg-white/[0.14] sm:p-8">
                <div className="mb-6 flex items-center justify-between gap-4">
                  <span className="u-label text-signal-300">{pad(i + 1)}</span>
                  <Icon
                    name={step.icon}
                    size={26}
                    className="text-signal-400 transition-colors duration-500 group-hover:text-signal-300"
                  />
                </div>

                {/* Connector: a hairline that fills on hover, echoing the
                    signal travelling through the hero diagram. */}
                <span aria-hidden className="mb-6 block h-px w-full bg-white/12">
                  <span className="block h-px w-0 bg-signal-400 transition-[width] duration-700 ease-[var(--ease-out-expo)] group-hover:w-full" />
                </span>

                <h3 className="font-display text-xl font-bold tracking-tight text-white">{t(step.label, locale)}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-300">{t(step.body, locale)}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Band>
  );
}
