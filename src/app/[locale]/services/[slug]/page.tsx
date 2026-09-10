import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageHero } from '@/components/layout/PageHero';
import { PageCta, RelatedSolutions, RelatedTechnologies } from '@/components/layout/RelatedSections';
import { Band, SectionHeading } from '@/components/ui/Section';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { PointGrid } from '@/components/ui/Pieces';
import { Icon } from '@/components/ui/Icon';
import { dictionary as D } from '@/content/dictionary';
import { services, serviceBySlug } from '@/content/services';
import { isLocale, localePath, LOCALES, t, type Locale } from '@/lib/i18n';
import { breadcrumbSchema, pageMetadata, serviceSchema } from '@/lib/seo';
import { pad } from '@/lib/utils';

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => services.map((s) => ({ locale, slug: s.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = serviceBySlug[slug];
  if (!isLocale(locale) || !service) return {};
  return pageMetadata({ locale, path: `services/${slug}`, title: service.metaTitle, description: service.metaDescription });
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const service = serviceBySlug[slug];
  if (!service) notFound();

  const parentLabel = t({ en: 'Services', ar: 'الخدمات' }, locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            breadcrumbSchema([
              { label: t(D.home, locale), href: localePath(locale) },
              { label: parentLabel, href: localePath(locale, 'services') },
              { label: t(service.title, locale), href: localePath(locale, `services/${slug}`) },
            ]),
            serviceSchema({
              locale,
              slug,
              name: t(service.title, locale),
              description: t(service.summary, locale),
            }),
          ]),
        }}
      />

      <PageHero
        locale={locale}
        breadcrumbs={[
          { label: t(D.home, locale), href: localePath(locale) },
          { label: parentLabel, href: localePath(locale, 'services') },
          { label: t(service.title, locale) },
        ]}
        eyebrow={`${t(service.verb, locale)} · ${t(service.title, locale)}`}
        icon={service.icon}
        title={t(service.headline, locale)}
        lead={t(service.summary, locale)}
        primaryCta={{ label: t(service.cta, locale), href: localePath(locale, 'request-solution') }}
        secondaryCta={{ label: t(D.talkToEngineer, locale), href: localePath(locale, 'contact?intent=engineer') }}
        size="large"
      />

      {/* ---- What it is / why it matters ---- */}
      <Band tone="paper" className="section">
        <div className="container-page">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <SectionHeading index={1} eyebrow={t(D.whatItIs, locale)} title={t({ en: 'The Service.', ar: 'الخدمة.' }, locale)} />
              <p className="mt-8 text-lead leading-relaxed text-ink-600">{t(service.whatItIs, locale)}</p>
            </Reveal>
            <Reveal delay={0.06}>
              <SectionHeading index={2} eyebrow={t(D.whyItMatters, locale)} title={t({ en: 'Why It Matters.', ar: 'لماذا يهم ذلك.' }, locale)} />
              <p className="mt-8 text-lead leading-relaxed text-ink-600">{t(service.whyItMatters, locale)}</p>
            </Reveal>
          </div>
        </div>
      </Band>

      {/* ---- When you need it ---- */}
      <Band tone="mist" className="section">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              index={3}
              eyebrow={t(D.whenYouNeedIt, locale)}
              title={t({ en: 'When to Ask for It.', ar: 'متى تطلبها.' }, locale)}
            />
          </Reveal>
          <div className="mt-12 border border-ink-200">
            <PointGrid points={service.whenYouNeedIt} locale={locale} columns={2} />
          </div>
        </div>
      </Band>

      {/* ---- Approach ---- */}
      <Band tone="brand" waveFrom="tint" waveTo="paper" className="section">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              index={4}
              eyebrow={t(D.ourApproach, locale)}
              title={t({ en: 'How It Is Carried Out.', ar: 'كيف تُنفَّذ.' }, locale)}
              tone="light"
            />
          </Reveal>
          <RevealGroup as="ol" className="mt-12 flex flex-col">
            {service.approach.map((step, i) => (
              <RevealItem as="li" key={step.id}>
                <div className="group grid gap-5 border-b border-white/10 py-8 first:border-t sm:grid-cols-[auto_minmax(0,1fr)_minmax(0,1.6fr)] sm:gap-10">
                  <span className="u-label pt-1 text-signal-300">{pad(i + 1)}</span>
                  <div className="flex items-start gap-4">
                    {step.icon ? <Icon name={step.icon} size={24} className="mt-0.5 shrink-0 text-signal-400" /> : null}
                    <h3 className="font-display text-h4 leading-tight font-semibold tracking-tight text-white">
                      {t(step.label, locale)}
                    </h3>
                  </div>
                  <p className="leading-relaxed text-ink-300">{t(step.body, locale)}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Band>

      {/* ---- Deliverables ---- */}
      <Band tone="paper" className="section-tight">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
            <Reveal>
              <SectionHeading
                index={5}
                eyebrow={t(D.whatYouReceive, locale)}
                title={t({ en: 'The Output.', ar: 'المُخرَج.' }, locale)}
              />
            </Reveal>
            <Reveal delay={0.06}>
              <ul>
                {service.deliverables.map((item) => (
                  <li key={item.en} className="flex items-start gap-4 border-b border-ink-200 py-4 first:border-t">
                    <Icon name="clipboard" size={18} className="mt-1 shrink-0 text-signal-600" />
                    <span className="text-ink-800">{t(item, locale)}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </Band>

      <RelatedTechnologies slugs={service.technologies} locale={locale} tone="light" heading={t(D.relatedTechnologies, locale)} />
      <RelatedSolutions slugs={service.solutions} locale={locale} tone="light" />

      <PageCta
        locale={locale}
        title={t(service.cta, locale)}
        body={t(
          {
            en: 'Describe the system, what it is doing and what you need to establish. We will tell you what the service would involve.',
            ar: 'صف النظام وما يحدث فيه وما تحتاج إلى تحديده. وسنخبرك بما تتضمنه الخدمة.',
          },
          locale,
        )}
        primary={{ label: t(D.requestSolution, locale), href: localePath(locale, 'request-solution') }}
        secondary={{ label: t(D.talkToEngineer, locale), href: localePath(locale, 'contact?intent=engineer') }}
      />
    </>
  );
}
