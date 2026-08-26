import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageHero } from '@/components/layout/PageHero';
import { PageCta } from '@/components/layout/RelatedSections';
import { Band, SectionHeading } from '@/components/ui/Section';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { PartnerCard } from '@/components/cards/Cards';
import { dictionary as D } from '@/content/dictionary';
import { partners } from '@/content/partners';
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
    path: 'partners',
    title: { en: 'Technology Partners — Walchem, TIMEX & Kurita | C-Water', ar: 'شركاء التقنية — Walchem وTIMEX وKurita | C-Water' },
    description: {
      en: 'C-Water combines Walchem instrumentation and control, TIMEX filtration, and Kurita water treatment chemistry with local engineering and technical support.',
      ar: 'تجمع C-Water بين أجهزة القياس والتحكم من Walchem وترشيح TIMEX وكيمياء معالجة المياه من Kurita مع الهندسة المحلية والدعم الفني.',
    },
  });
}

export default async function PartnersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;

  const label = t({ en: 'Technology Partners', ar: 'شركاء التقنية' }, locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { label: t(D.home, locale), href: localePath(locale) },
              { label, href: localePath(locale, 'partners') },
            ]),
          ),
        }}
      />

      <PageHero
        locale={locale}
        breadcrumbs={[{ label: t(D.home, locale), href: localePath(locale) }, { label }]}
        eyebrow={label}
        title={t({ en: 'Proven Technology. One C-Water Solution.', ar: 'تقنية مُثبتة. حل واحد من C-Water.' }, locale)}
        lead={t(
          {
            en: 'C-Water works with established technology partners to bring specialised water-treatment capabilities together under one engineering approach — and one point of responsibility.',
            ar: 'تعمل C-Water مع شركاء تقنية راسخين لجمع قدرات معالجة مياه متخصصة تحت منهج هندسي واحد — ومسؤولية واحدة.',
          },
          locale,
        )}
        primaryCta={{ label: t(D.talkToEngineer, locale), href: localePath(locale, 'contact?intent=engineer') }}
        size="large"
      />

      <Band tone="paper" className="section">
        <div className="container-page">
          <RevealGroup className="grid gap-5 md:grid-cols-3">
            {partners.map((partner) => (
              <RevealItem key={partner.slug}>
                <PartnerCard partner={partner} locale={locale} tone="light" />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Band>

      {/* ---- How the relationship works ---- */}
      <Band tone="ink" blueprint className="section">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              index={1}
              eyebrow={t({ en: 'How it works', ar: 'كيف تعمل الشراكة' }, locale)}
              title={t({ en: 'Technology Is Not the Same as a Solution.', ar: 'التقنية ليست هي الحل.' }, locale)}
              lead={t(
                {
                  en: 'Each of these partners builds excellent equipment or chemistry. None of them can tell you what your water is doing, which combination suits your metallurgy, or what to change when the source water shifts. That is the part C-Water owns.',
                  ar: 'يصنع كل من هؤلاء الشركاء معدات أو كيمياء ممتازة. لكن لا أحد منهم يستطيع إخبارك بما يحدث في مياهك، أو أي تركيبة تناسب معادنك، أو ما الذي تغيّره عند تحوّل مياه المصدر. وهذا هو الجزء الذي تتولاه C-Water.',
                },
                locale,
              )}
              tone="light"
            />
          </Reveal>

          <RevealGroup as="ol" className="mt-12 grid gap-px bg-white/10 sm:grid-cols-3">
            {[
              {
                id: 'analysis',
                label: { en: 'We establish the requirement', ar: 'نحدد المتطلب' },
                body: {
                  en: 'Water analysis, system assessment and operating conditions come first. The technology decision follows from them, not the other way round.',
                  ar: 'يأتي تحليل المياه وتقييم النظام وظروف التشغيل أولًا. ويترتب قرار التقنية عليها لا العكس.',
                },
              },
              {
                id: 'select',
                label: { en: 'We select and integrate', ar: 'نختار ونُدمج' },
                body: {
                  en: 'Filtration degree, chemistry, dosing capacity and control strategy are chosen as one set, so the components support rather than undermine each other.',
                  ar: 'تُختار درجة الترشيح والكيمياء وسعة الضخ واستراتيجية التحكم كمجموعة واحدة، لتدعم المكونات بعضها بدل أن تُقوّضه.',
                },
              },
              {
                id: 'support',
                label: { en: 'We stay with the system', ar: 'نبقى مع النظام' },
                body: {
                  en: 'Commissioning, verification, routine service and periodic review. Equipment delivery is where the relationship starts, not where it ends.',
                  ar: 'التشغيل الابتدائي والتحقق والخدمة الدورية والمراجعة المنتظمة. فتسليم المعدات بداية العلاقة لا نهايتها.',
                },
              },
            ].map((step, i) => (
              <RevealItem as="li" key={step.id}>
                <div className="flex h-full flex-col bg-ink-950 p-7 sm:p-8">
                  <span className="u-label mb-5 text-signal-300">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="font-display text-lg leading-snug font-semibold tracking-tight text-white">
                    {t(step.label, locale)}
                  </h3>
                  <p className="mt-3 leading-relaxed text-ink-300">{t(step.body, locale)}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.1}>
            <p className="mt-10 flex items-start gap-4 border-t border-white/10 pt-8 text-sm leading-relaxed text-ink-400">
              <span aria-hidden className="mt-2.5 h-px w-10 shrink-0 bg-signal-500" />
              {t(D.partnerDisclaimer, locale)}
            </p>
          </Reveal>
        </div>
      </Band>

      <PageCta
        locale={locale}
        title={t({ en: 'Powered by proven technology. Delivered by C-Water.', ar: 'مدعومة بتقنية مُثبتة. يقدّمها فريق C-Water.' }, locale)}
        primary={{ label: t(D.requestSolution, locale), href: localePath(locale, 'request-solution') }}
        secondary={{ label: t({ en: 'Browse Products', ar: 'استعرض المنتجات' }, locale), href: localePath(locale, 'products') }}
      />
    </>
  );
}
