import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { PageHero } from '@/components/layout/PageHero';
import { Band } from '@/components/ui/Section';
import { QuoteRequestForm, type QuoteFormData } from '@/components/forms/QuoteRequestForm';
import { industries } from '@/content/industries';
import { partnerBySlug } from '@/content/partners';
import { productCategories, products } from '@/content/products';
import { solutions } from '@/content/solutions';
import { Icon } from '@/components/ui/Icon';
import { dictionary as D } from '@/content/dictionary';
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
    path: 'request-quote',
    title: { en: 'Request a Quote | C-Water', ar: 'اطلب عرض سعر | C-Water' },
    description: {
      en: 'Select the products or technologies you are interested in and provide the operating conditions our team needs to prepare the next step.',
      ar: 'اختر المنتجات أو التقنيات التي تهمك وقدّم ظروف التشغيل التي يحتاجها فريقنا لتحضير الخطوة التالية.',
    },
  });
}

export default async function RequestQuotePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;

  const label = t(D.requestQuote, locale);

  const formData: QuoteFormData = {
    products: products.map((product) => ({
      value: product.slug,
      label: product.name,
      partnerName: partnerBySlug[product.partner].legalName,
      categoryLabel: t(productCategories[product.category], locale),
    })),
    solutions: solutions.map((s) => ({ value: s.slug, label: t(s.title, locale) })),
    industries: industries.map((i) => ({ value: i.slug, label: t(i.title, locale) })),
  };

  const steps = [
    {
      en: 'We check the selection against the duty you describe before pricing it.',
      ar: 'نراجع الاختيار مقابل ظروف التشغيل التي تصفها قبل تسعيره.',
    },
    {
      en: 'Where something is missing, we come back with a specific question rather than a generic reply.',
      ar: 'وحيث تنقص معلومة، نعود إليك بسؤال محدد لا برد عام.',
    },
    {
      en: 'You receive a quotation with the technical basis it was prepared on.',
      ar: 'تتلقى عرض سعر مصحوبًا بالأساس الفني الذي أُعدّ عليه.',
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
              { label, href: localePath(locale, 'request-quote') },
            ]),
          ),
        }}
      />

      <PageHero
        locale={locale}
        breadcrumbs={[{ label: t(D.home, locale), href: localePath(locale) }, { label }]}
        eyebrow={label}
        title={t({ en: 'Request a Quote.', ar: 'اطلب عرض سعر.' }, locale)}
        lead={t(
          {
            en: 'Select the products you are interested in, or describe the requirement and let us select against it. Either way, the operating conditions are what make the quotation useful.',
            ar: 'اختر المنتجات التي تهمك، أو صف المتطلب ودعنا نختار وفقه. وفي الحالتين، ظروف التشغيل هي ما يجعل عرض السعر مفيدًا.',
          },
          locale,
        )}
      />

      <Band tone="ink" blueprint className="section">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)] lg:gap-16">
            <Suspense fallback={<p className="u-label text-ink-500">…</p>}>
              <QuoteRequestForm locale={locale} data={formData} />
            </Suspense>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <p className="u-label border-b border-white/10 pb-3 text-ink-400">
                {t(D.form.successNext, locale)}
              </p>
              <ol className="mt-6 flex flex-col gap-6">
                {steps.map((step, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="u-label shrink-0 pt-0.5 text-signal-300">{pad(i + 1)}</span>
                    <p className="text-sm leading-relaxed text-ink-300">{t(step, locale)}</p>
                  </li>
                ))}
              </ol>

              <div className="mt-8 flex items-start gap-3.5 border-t border-white/10 pt-6">
                <Icon name="clipboard" size={20} className="mt-0.5 shrink-0 text-ink-500" />
                <p className="text-[0.8125rem] leading-relaxed text-ink-400">
                  {t(
                    {
                      en: 'Where a specification has not been confirmed against the manufacturer’s current documentation, we say so rather than estimate it.',
                      ar: 'وحيث لم تُؤكَّد مواصفة مقابل وثائق الشركة المصنّعة الحالية، نوضّح ذلك بدل تقديرها.',
                    },
                    locale,
                  )}
                </p>
              </div>
            </aside>
          </div>
        </div>
      </Band>
    </>
  );
}
