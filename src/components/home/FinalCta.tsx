import Image from 'next/image';
import { Band } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Button';
import { dictionary as D } from '@/content/dictionary';
import { homeFlowImage } from '@/content/imagery';
import { withBasePath } from '@/lib/base-path';
import { localePath, t, type Locale } from '@/lib/i18n';

/** The closing conversion band — large, quiet, and unambiguous about the next step. */
export function FinalCta({ locale }: { locale: Locale }) {
  return (
    <Band tone="ink-deep" blueprint className="section relative overflow-hidden">
      {/*
        A flat wash rather than the directional gradient the page heroes use:
        this band centres its copy, so there is no quiet side to release the
        image into. Measured at 5.9:1 for the lightest text on it.
      */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Image
          src={withBasePath(homeFlowImage.src)}
          alt=""
          fill
          loading="lazy"
          sizes="100vw"
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-ink-950/60" />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_65%_80%_at_50%_100%,rgba(24,142,206,0.18),transparent_70%)]"
      />
      <div className="container-page relative">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="u-label text-signal-300">{t({ en: 'Start here', ar: 'ابدأ من هنا' }, locale)}</p>
            <h2 className="mt-6 text-h1 text-white text-balance">
              {t({ en: 'Have a Water Problem?', ar: 'لديك مشكلة في المياه؟' }, locale)}
            </h2>
            <p className="mt-6 text-lead text-ink-200">
              {t(
                {
                  en: 'Tell us what you are dealing with. Whether you are protecting an existing system, planning a new one, or working through a treatment problem that keeps coming back — start with the problem, not the product.',
                  ar: 'أخبرنا بما تواجهه. سواء كنت تحمي نظامًا قائمًا أو تخطط لنظام جديد أو تعالج مشكلة معالجة تتكرر — ابدأ من المشكلة لا من المنتج.',
                },
                locale,
              )}
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <ButtonLink href={localePath(locale, 'request-solution')} size="lg" withArrow>
                {t(D.talkToCWaterEngineer, locale)}
              </ButtonLink>
              <ButtonLink href={localePath(locale, 'request-quote')} variant="outline-light" size="lg">
                {t(D.requestQuote, locale)}
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </div>
    </Band>
  );
}
