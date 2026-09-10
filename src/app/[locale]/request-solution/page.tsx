import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { PageHero } from '@/components/layout/PageHero';
import { Band } from '@/components/ui/Section';
import { SolutionRequestForm, type SolutionFormOptions } from '@/components/forms/SolutionRequestForm';
import { industries } from '@/content/industries';
import { solutions } from '@/content/solutions';
import { Icon } from '@/components/ui/Icon';
import { dictionary as D } from '@/content/dictionary';
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
    path: 'request-solution',
    title: { en: 'Request a Solution | C-Water', ar: 'اطلب حلاً | C-Water' },
    description: {
      en: 'Tell us about your water system, the problem you are seeing and what you need to achieve. You do not need to know which product you need.',
      ar: 'أخبرنا عن نظام المياه لديك والمشكلة التي تلاحظها وما تحتاج تحقيقه. ولست بحاجة لمعرفة المنتج الذي تحتاجه.',
    },
  });
}

export default async function RequestSolutionPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;

  const label = t(D.requestSolution, locale);

  const options: SolutionFormOptions = {
    systems: solutions.map((s) => ({ value: s.slug, label: t(s.title, locale) })),
    industries: industries.map((i) => ({ value: i.slug, label: t(i.title, locale) })),
  };

  const assurances = [
    {
      icon: 'lab' as const,
      label: { en: 'We start with the water', ar: 'نبدأ من المياه' },
      body: {
        en: 'Almost every recommendation begins with an analysis. If we say you need one first, that is why.',
        ar: 'تبدأ كل توصية تقريبًا بتحليل. وإذا قلنا إنك تحتاج تحليلًا أولًا، فهذا هو السبب.',
      },
    },
    {
      icon: 'blueprint' as const,
      label: { en: 'No product until the problem is clear', ar: 'لا منتج قبل وضوح المشكلة' },
      body: {
        en: 'We would rather ask another question than quote something that will not hold.',
        ar: 'نفضّل طرح سؤال إضافي على تسعير شيء لن يصمد.',
      },
    },
    {
      icon: 'shield' as const,
      label: { en: 'Your details stay with C-Water', ar: 'بياناتك تبقى لدى C-Water' },
      body: {
        en: 'What you send is used to respond to your enquiry and nothing else.',
        ar: 'يُستخدم ما ترسله للرد على استفسارك فقط لا غير.',
      },
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { label: t(D.home, locale), href: localePath(locale) },
              { label, href: localePath(locale, 'request-solution') },
            ]),
          ),
        }}
      />

      <PageHero
        locale={locale}
        breadcrumbs={[{ label: t(D.home, locale), href: localePath(locale) }, { label }]}
        eyebrow={label}
        title={t({ en: 'Tell Us What You’re Trying to Solve.', ar: 'أخبرنا بما تحاول حله.' }, locale)}
        lead={t(
          {
            en: 'You do not need to know which product you need. Describe the water system, the challenge and the outcome you are after — our team will define the right starting point.',
            ar: 'لست بحاجة لمعرفة المنتج الذي تحتاجه. صف نظام المياه والتحدي والنتيجة التي تسعى إليها — وسيحدد فريقنا نقطة البدء الصحيحة.',
          },
          locale,
        )}
        sweepTo="none"
      />

      <Band tone="ink" blueprint className="section">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)] lg:gap-16">
            <Suspense fallback={<p className="u-label text-ink-500">…</p>}>
              <SolutionRequestForm locale={locale} options={options} />
            </Suspense>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <p className="u-label border-b border-white/10 pb-3 text-ink-400">
                {t({ en: 'How we work', ar: 'كيف نعمل' }, locale)}
              </p>
              <ul className="mt-6 flex flex-col gap-7">
                {assurances.map((item) => (
                  <li key={item.label.en} className="flex gap-4">
                    <Icon name={item.icon} size={22} className="mt-0.5 shrink-0 text-signal-400" />
                    <div>
                      <p className="font-display text-[0.9375rem] leading-snug font-semibold tracking-tight text-white">
                        {t(item.label, locale)}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-ink-300">{t(item.body, locale)}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </Band>
    </>
  );
}
