'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { TreatmentLine, TreatmentLineStack } from '@/components/interactive/TreatmentLine';
import { HeroSweep } from '@/components/ui/Wave';
import { ButtonLink } from '@/components/ui/Button';
import { dictionary as D } from '@/content/dictionary';
import { systemStages } from '@/components/interactive/SystemExplorer';
import { homeHeroImage } from '@/content/imagery';
import { withBasePath } from '@/lib/base-path';
import { localePath, t, type Locale } from '@/lib/i18n';

/**
 * The homepage hero.
 *
 * A dark technical canvas carrying the treatment line: water moves, the
 * sensor reads, the controller signals the dosing pump. The proposition sits
 * above it, the system below — so a visitor sees what C-Water does before
 * reading a word of explanation.
 */
export function Hero({ locale }: { locale: Locale }) {
  const reduce = useReducedMotion();

  const labels = Object.fromEntries(systemStages.map((s) => [s.id, t(s.label, locale)]));
  const captions = Object.fromEntries(systemStages.map((s) => [s.id, t(s.caption, locale)]));

  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <section className="theme-dark water-ground water-shimmer relative overflow-hidden pt-[var(--header-h)]">
      {/*
        The photograph sits behind the proposition only. Its vertical gradient
        reaches solid ink well before the treatment line below, because that
        schematic is drawn in hairlines and a lit background eats them.

        Horizontal gradient measured against this image: white 8.8:1,
        ink-200 5.4:1, signal-300 4.7:1 in the text column. It flips under RTL
        with the copy. The trust line below the buttons is ink-200 rather than
        the ink-400 used elsewhere — ink-400 clears AA on flat ink by only
        5.4:1, which no image can sit behind.
      */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Image
          src={withBasePath(homeHeroImage.src)}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-[0.85]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/[0.82] to-ink-950/15 rtl:bg-gradient-to-l" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ink-950/[0.88] to-ink-950" />
      </div>

      {/* Atmospheric wash: a single controlled gradient derived from the brand
          blue, not a decorative particle field. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_50%_-5%,rgba(24,142,206,0.22),transparent_65%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-950 to-transparent"
      />

      <div className="container-page relative">
        <div className="flex flex-col pt-16 pb-28 sm:pt-20 lg:pt-24 lg:pb-40">
          {/* ---- Proposition ---- */}
          <div className="max-w-4xl">
            <motion.p {...rise(0)} className="u-label flex items-center gap-3 text-signal-300">
              <span aria-hidden className="h-px w-8 bg-signal-400/60" />
              {t(
                { en: 'C-Water · Water Treatment Engineered Differently', ar: 'C-Water · معالجة مياه بمنهج هندسي مختلف' },
                locale,
              )}
            </motion.p>

            <motion.h1 {...rise(0.08)} className="mt-7 text-display text-white text-balance">
              {t(
                { en: 'Water Treatment, Engineered Around Your Operation.', ar: 'معالجة المياه، مُهندَسة حول طبيعة تشغيلك.' },
                locale,
              )}
            </motion.h1>

            <motion.p {...rise(0.16)} className="mt-7 max-w-2xl text-lead text-ink-200">
              {t(
                {
                  en: 'Advanced chemistry, filtration, monitoring and control—combined with local engineering expertise to help your water systems perform with greater reliability, efficiency and control.',
                  ar: 'كيمياء متقدمة وترشيح ومراقبة وتحكم — مع خبرة هندسية محلية، لمساعدة أنظمة المياه لديك على العمل بموثوقية وكفاءة وتحكم أعلى.',
                },
                locale,
              )}
            </motion.p>

            <motion.div {...rise(0.24)} className="mt-9 flex flex-wrap items-center gap-3">
              <ButtonLink href={localePath(locale, 'contact?intent=engineer')} size="lg" withArrow>
                {t(D.talkToEngineer, locale)}
              </ButtonLink>
              <ButtonLink href={localePath(locale, 'solutions')} variant="outline-light" size="lg">
                {t(D.exploreSolutions, locale)}
              </ButtonLink>
            </motion.div>

            <motion.p {...rise(0.32)} className="u-label mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-ink-200">
              <span>{t({ en: 'Global Technology', ar: 'تقنية عالمية' }, locale)}</span>
              <span aria-hidden className="text-signal-500">·</span>
              <span>{t({ en: 'Local Engineering', ar: 'هندسة محلية' }, locale)}</span>
              <span aria-hidden className="text-signal-500">·</span>
              <span>{t({ en: 'Complete Support', ar: 'دعم متكامل' }, locale)}</span>
            </motion.p>
          </div>

          {/* ---- The treatment line ---- */}
          <motion.div
            {...(reduce
              ? {}
              : {
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  transition: { duration: 1.1, delay: 0.42, ease: [0.16, 1, 0.3, 1] as const },
                })}
            className="mt-16 lg:mt-20"
          >
            {/* Desktop: horizontal schematic. */}
            <div className="hidden lg:block">
              <TreatmentLine labels={labels} />
            </div>
            {/* Mobile/tablet: the same system, vertically. It transforms
                rather than disappearing. */}
            <div className="lg:hidden">
              <div className="rule mb-8" />
              <TreatmentLineStack labels={labels} captions={captions} />
            </div>
          </motion.div>
        </div>
      </div>
      <HeroSweep to="paper" />
    </section>
  );
}
