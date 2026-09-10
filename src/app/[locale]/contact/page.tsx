import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { PageHero } from '@/components/layout/PageHero';
import { Band } from '@/components/ui/Section';
import { ContactForm } from '@/components/forms/ContactForm';
import { Icon } from '@/components/ui/Icon';
import { dictionary as D } from '@/content/dictionary';
import { company } from '@/content/site';
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
    path: 'contact',
    title: { en: 'Contact C-Water | Talk to Sales, an Engineer or Support', ar: 'تواصل مع C-Water | المبيعات أو مهندس أو الدعم' },
    description: {
      en: 'Three routes into C-Water: commercial enquiries, technical and application questions, and support for systems already in service.',
      ar: 'ثلاثة مسارات للتواصل مع C-Water: الاستفسارات التجارية، والأسئلة الفنية والتطبيقية، ودعم الأنظمة القائمة في الخدمة.',
    },
  });
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;

  const label = t({ en: 'Contact', ar: 'اتصل بنا' }, locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { label: t(D.home, locale), href: localePath(locale) },
              { label, href: localePath(locale, 'contact') },
            ]),
          ),
        }}
      />

      <PageHero
        locale={locale}
        breadcrumbs={[{ label: t(D.home, locale), href: localePath(locale) }, { label }]}
        eyebrow={label}
        title={t({ en: 'Let’s Talk About Water.', ar: 'لنتحدث عن المياه.' }, locale)}
        lead={t(
          {
            en: 'Choose the route that fits what you need. A technical question reaches an engineer; a commercial one reaches the people who can price it.',
            ar: 'اختر المسار الذي يناسب حاجتك. فالسؤال الفني يصل إلى مهندس، والتجاري يصل إلى من يستطيع تسعيره.',
          },
          locale,
        )}
        sweepTo="none"
      />

      <Band tone="ink" blueprint className="section">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:gap-16">
            <Suspense fallback={<p className="u-label text-ink-500">…</p>}>
              <ContactForm locale={locale} />
            </Suspense>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <p className="u-label border-b border-white/10 pb-3 text-ink-400">
                {t({ en: 'Direct contact', ar: 'التواصل المباشر' }, locale)}
              </p>

              <dl className="mt-6 flex flex-col gap-6">
                <div className="flex gap-4">
                  <Icon name="network" size={20} className="mt-0.5 shrink-0 text-signal-400" />
                  <div>
                    <dt className="u-label text-ink-500">{t({ en: 'Email', ar: 'البريد الإلكتروني' }, locale)}</dt>
                    <dd className="mt-1.5">
                      <a
                        href={`mailto:${company.email}`}
                        className="latin text-[0.9375rem] text-white underline-offset-4 transition-colors hover:text-signal-300 hover:underline"
                      >
                        {company.email}
                      </a>
                    </dd>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Icon name="gauge" size={20} className="mt-0.5 shrink-0 text-signal-400" />
                  <div>
                    <dt className="u-label text-ink-500">{t({ en: 'Telephone', ar: 'الهاتف' }, locale)}</dt>
                    {company.phones.map((phone) => (
                      <dd key={phone.tel} className="mt-1.5">
                        <a
                          href={`tel:${phone.tel}`}
                          className="latin text-[0.9375rem] text-white underline-offset-4 transition-colors hover:text-signal-300 hover:underline"
                        >
                          {phone.display}
                        </a>
                      </dd>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <Icon name="factory" size={20} className="mt-0.5 shrink-0 text-signal-400" />
                  <div>
                    <dt className="u-label text-ink-500">{t({ en: 'Address', ar: 'العنوان' }, locale)}</dt>
                    {/* The Arabic street line mixes scripts ("وحدة رقم I 21").
                        No wrapper is applied: the unit designation is a short
                        Latin run and the browser's bidi algorithm orders it
                        correctly inside the surrounding RTL text. */}
                    <dd className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-100">
                      {t(company.address.locality, locale)}
                      <br />
                      {t(company.address.street, locale)}
                      <br />
                      {t(company.country, locale)}
                    </dd>
                  </div>
                </div>
              </dl>

              {/* Working hours are the one contact field C-Water has not yet
                  confirmed, so they are marked pending rather than invented.
                  See docs/CLIENT-DATA-REQUIRED.md. */}
              {company.workingHours ? (
                <div className="mt-6 flex gap-4">
                  <Icon name="clipboard" size={20} className="mt-0.5 shrink-0 text-signal-400" />
                  <div>
                    <p className="u-label text-ink-500">{t({ en: 'Working hours', ar: 'ساعات العمل' }, locale)}</p>
                    <p className="mt-1.5 text-[0.9375rem] text-ink-100">{t(company.workingHours, locale)}</p>
                  </div>
                </div>
              ) : (
                <p className="mt-8 border-t border-white/10 pt-6 text-[0.8125rem] leading-relaxed text-ink-500">
                  {t(
                    {
                      en: 'Working hours are published once confirmed. Phone and email reach the team in the meantime.',
                      ar: 'تُنشر ساعات العمل فور تأكيدها. وفي هذه الأثناء، يصل إليك الفريق عبر الهاتف والبريد الإلكتروني.',
                    },
                    locale,
                  )}
                </p>
              )}

              <div className="mt-8 border-t border-white/10 pt-6">
                <p className="u-label mb-4 text-ink-400">{t({ en: 'Other routes', ar: 'مسارات أخرى' }, locale)}</p>
                <ul className="flex flex-col gap-2.5">
                  <li>
                    <Link
                      href={localePath(locale, 'request-solution')}
                      className="text-[0.9375rem] text-signal-300 underline-offset-4 transition-colors hover:text-white hover:underline"
                    >
                      {t(D.requestSolution, locale)}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={localePath(locale, 'request-quote')}
                      className="text-[0.9375rem] text-signal-300 underline-offset-4 transition-colors hover:text-white hover:underline"
                    >
                      {t(D.requestQuote, locale)}
                    </Link>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </Band>
    </>
  );
}
