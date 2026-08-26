import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageHero } from '@/components/layout/PageHero';
import { PageCta } from '@/components/layout/RelatedSections';
import { Band, SectionHeading } from '@/components/ui/Section';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { ServiceCard } from '@/components/cards/Cards';
import { Icon } from '@/components/ui/Icon';
import { dictionary as D } from '@/content/dictionary';
import { services } from '@/content/services';
import { isLocale, localePath, t, type Locale } from '@/lib/i18n';
import { breadcrumbSchema, pageMetadata } from '@/lib/seo';
import { pad } from '@/lib/utils';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata({
    locale,
    path: 'services',
    title: { en: 'Water Treatment Services | C-Water', ar: 'خدمات معالجة المياه | C-Water' },
    description: {
      en: 'Water analysis, system assessment, engineering design, installation and commissioning, treatment programmes, preventive maintenance, monitoring and optimisation.',
      ar: 'تحليل المياه، وتقييم الأنظمة، والتصميم الهندسي، والتركيب والتشغيل، وبرامج المعالجة الكيميائية، والصيانة الوقائية، والدعم الفني، والمراقبة، والتحسين.',
    },
  });
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;

  const label = t({ en: 'Services', ar: 'الخدمات' }, locale);

  /* The six-verb lifecycle shown as a sequence above the full service list. */
  const lifecycle = services.slice(0, 6);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { label: t(D.home, locale), href: localePath(locale) },
              { label, href: localePath(locale, 'services') },
            ]),
          ),
        }}
      />

      <PageHero
        locale={locale}
        breadcrumbs={[{ label: t(D.home, locale), href: localePath(locale) }, { label }]}
        eyebrow={label}
        title={t({ en: 'The Equipment Is Only One Part of the Solution.', ar: 'المعدات جزء واحد فقط من الحل.' }, locale)}
        lead={t(
          {
            en: 'A treatment programme that nobody verifies stops being a programme. C-Water stays with the system across its lifecycle — from the first water analysis to the periodic review that keeps it matched to the plant.',
            ar: 'برنامج المعالجة الذي لا يتحقق منه أحد يتوقف عن كونه برنامجًا. تبقى C-Water مع النظام طوال دورة حياته — من أول تحليل مياه إلى المراجعة الدورية التي تُبقيه ملائمًا للمنشأة.',
          },
          locale,
        )}
        primaryCta={{ label: t(D.requestTechnicalSupport, locale), href: localePath(locale, 'contact?intent=support') }}
        secondaryCta={{ label: t(D.talkToEngineer, locale), href: localePath(locale, 'contact?intent=engineer') }}
        size="large"
      />

      {/* ---- Lifecycle ---- */}
      <Band tone="ink" blueprint className="section">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              index={1}
              eyebrow={t({ en: 'The lifecycle', ar: 'دورة الحياة' }, locale)}
              title={t({ en: 'Analyse · Assess · Engineer · Install · Monitor · Optimise', ar: 'تحليل · تقييم · تصميم · تركيب · مراقبة · تحسين' }, locale)}
              tone="light"
            />
          </Reveal>
          <RevealGroup as="ol" className="mt-12 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {lifecycle.map((service, i) => (
              <RevealItem as="li" key={service.slug}>
                <Link
                  href={localePath(locale, `services/${service.slug}`)}
                  className="group flex h-full flex-col bg-ink-950 p-7 transition-colors duration-500 hover:bg-ink-900 sm:p-8"
                >
                  <div className="mb-6 flex items-center justify-between gap-4">
                    <span className="u-label text-signal-300">{pad(i + 1)}</span>
                    <Icon name={service.icon} size={26} className="text-signal-400" />
                  </div>
                  <span aria-hidden className="mb-6 block h-px w-full bg-white/12">
                    <span className="block h-px w-0 bg-signal-400 transition-[width] duration-700 ease-[var(--ease-out-expo)] group-hover:w-full" />
                  </span>
                  <h3 className="font-display text-xl font-bold tracking-tight text-white">{t(service.verb, locale)}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-300">{t(service.summary, locale)}</p>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Band>

      {/* ---- All services ---- */}
      <Band tone="paper" className="section">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              index={2}
              eyebrow={t({ en: 'All services', ar: 'كل الخدمات' }, locale)}
              title={t({ en: 'What We Actually Do.', ar: 'ما نقوم به فعليًا.' }, locale)}
            />
          </Reveal>
          <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <RevealItem key={service.slug}>
                <ServiceCard service={service} locale={locale} index={i + 1} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Band>

      <PageCta
        locale={locale}
        title={t({ en: 'Need a system looked at?', ar: 'تحتاج فحص نظام؟' }, locale)}
        body={t(
          {
            en: 'Whether it is a programme review, a persistent problem or a system nobody has assessed in years — start with what the water is doing.',
            ar: 'سواء كانت مراجعة برنامج أو مشكلة مستمرة أو نظامًا لم يُقيَّم منذ سنوات — ابدأ بما تفعله المياه.',
          },
          locale,
        )}
        primary={{ label: t(D.requestSolution, locale), href: localePath(locale, 'request-solution') }}
        secondary={{ label: t(D.requestTechnicalSupport, locale), href: localePath(locale, 'contact?intent=support') }}
      />
    </>
  );
}
