import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageHero } from '@/components/layout/PageHero';
import { PageCta, RelatedProducts, RelatedSolutions } from '@/components/layout/RelatedSections';
import { Band } from '@/components/ui/Section';
import { FaqList } from '@/components/ui/Pieces';
import { Icon } from '@/components/ui/Icon';
import { dictionary as D } from '@/content/dictionary';
import { articles, articleBySlug, knowledgeCategories } from '@/content/articles';
import type { ArticleBlock } from '@/content/types';
import { isLocale, localePath, LOCALES, t, type Locale } from '@/lib/i18n';
import { articleSchema, breadcrumbSchema, faqSchema, pageMetadata } from '@/lib/seo';
import { formatDate } from '@/lib/utils';

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => articles.map((a) => ({ locale, slug: a.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = articleBySlug[slug];
  if (!isLocale(locale) || !article) return {};
  return pageMetadata({
    locale,
    path: `knowledge/${slug}`,
    title: article.metaTitle,
    description: article.metaDescription,
    type: 'article',
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt,
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const article = articleBySlug[slug];
  if (!article) notFound();

  const category = knowledgeCategories.find((c) => c.id === article.category);
  const parentLabel = t({ en: 'Knowledge Center', ar: 'مركز المعرفة' }, locale);

  const faqs = article.faqs.map((faq) => ({
    question: t(faq.question, locale),
    answer: t(faq.answer, locale),
  }));
  const faqLd = faqSchema(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            [
              breadcrumbSchema([
                { label: t(D.home, locale), href: localePath(locale) },
                { label: parentLabel, href: localePath(locale, 'knowledge') },
                { label: t(article.title, locale), href: localePath(locale, `knowledge/${slug}`) },
              ]),
              articleSchema({
                locale,
                slug,
                headline: t(article.title, locale),
                description: t(article.summary, locale),
                publishedAt: article.publishedAt,
                updatedAt: article.updatedAt,
              }),
              faqLd,
            ].filter(Boolean),
          ),
        }}
      />

      <PageHero
        locale={locale}
        breadcrumbs={[
          { label: t(D.home, locale), href: localePath(locale) },
          { label: parentLabel, href: localePath(locale, 'knowledge') },
          { label: t(article.title, locale) },
        ]}
        eyebrow={`${category ? t(category.label, locale) : ''} · ${D.readingTime[locale](article.readingMinutes)}`}
        title={t(article.title, locale)}
        lead={t(article.summary, locale)}
      />

      <Band tone="paper" className="section">
        <div className="container-page">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-16">
            {/* min-w-0: a grid item defaults to min-width:auto, which lets the
                wide comparison tables inside the prose stretch the column past
                the viewport on mobile instead of scrolling within their own
                overflow container. */}
            <article className="min-w-0">
              {/* ---- The question ---- */}
              <div className="border-s-2 border-signal-500 ps-6">
                <p className="u-label text-signal-700">{t({ en: 'The question', ar: 'السؤال' }, locale)}</p>
                <p className="mt-3 font-display text-h4 leading-snug font-semibold tracking-tight text-ink-950">
                  {t(article.question, locale)}
                </p>
              </div>

              {/* ---- Body ---- */}
              <div className="prose-tech mt-12 max-w-none">
                {article.sections.map((section) => (
                  <section key={section.id} id={section.id}>
                    <h2>{t(section.heading, locale)}</h2>
                    {section.blocks.map((block, i) => (
                      <Block key={i} block={block} locale={locale} />
                    ))}
                  </section>
                ))}
              </div>

              {/* ---- Checklist ---- */}
              <div className="mt-16 border border-ink-200 bg-ink-50 p-7 sm:p-8">
                <div className="flex items-center gap-3">
                  <Icon name="clipboard" size={22} className="text-signal-600" />
                  <h2 className="font-display text-h4 font-semibold tracking-tight text-ink-950">
                    {t({ en: 'What to check', ar: 'ما ينبغي فحصه' }, locale)}
                  </h2>
                </div>
                <ul className="mt-6 flex flex-col">
                  {article.checklist.map((item, i) => (
                    <li key={i} className="flex items-start gap-4 border-b border-ink-200 py-3.5 first:border-t">
                      <span className="u-label mt-1 shrink-0 text-signal-700">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="text-[0.9375rem] leading-relaxed text-ink-800">{t(item, locale)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* ---- Escalation: where the article stops ---- */}
              <div className="relative mt-10 border border-signal-500/30 bg-signal-500/[0.05] p-7 sm:p-8">
                <span aria-hidden className="absolute -top-px start-0 h-0.5 w-14 bg-signal-500" />
                <h2 className="font-display text-h4 font-semibold tracking-tight text-ink-950">
                  {t({ en: 'When to get technical support', ar: 'متى تطلب الدعم الفني' }, locale)}
                </h2>
                <p className="mt-4 leading-relaxed text-ink-700">{t(article.escalation, locale)}</p>
                <Link
                  href={localePath(locale, 'contact?intent=engineer')}
                  className="mt-5 inline-flex items-center gap-2 text-[0.9375rem] font-medium text-signal-700 underline-offset-4 hover:underline"
                >
                  {t(D.talkToEngineer, locale)}
                </Link>
              </div>

              {/* ---- FAQs ---- */}
              {article.faqs.length > 0 ? (
                <div className="mt-16">
                  <h2 className="font-display text-h3 font-bold tracking-tight text-ink-950">
                    {t(D.faqTitle, locale)}
                  </h2>
                  <div className="mt-6">
                    <FaqList faqs={article.faqs} locale={locale} />
                  </div>
                </div>
              ) : null}
            </article>

            {/* ---- On this page ---- */}
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <nav aria-labelledby="toc-heading">
                <p id="toc-heading" className="u-label border-b border-ink-200 pb-3 text-ink-500">
                  {t(D.onThisPage, locale)}
                </p>
                <ol className="mt-4 flex flex-col gap-2.5">
                  {article.sections.map((section, i) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="flex gap-3 text-[0.875rem] leading-snug text-ink-600 transition-colors hover:text-signal-700"
                      >
                        <span className="u-label shrink-0 pt-1 text-ink-500">{String(i + 1).padStart(2, '0')}</span>
                        {t(section.heading, locale)}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>

              <dl className="mt-8 divide-y divide-ink-200 border-t border-ink-200">
                <div className="flex items-baseline justify-between gap-4 py-3">
                  <dt className="u-label text-ink-500">{t(D.published, locale)}</dt>
                  <dd className="text-[0.8125rem] text-ink-700">{formatDate(article.publishedAt, locale)}</dd>
                </div>
                {article.updatedAt ? (
                  <div className="flex items-baseline justify-between gap-4 py-3">
                    <dt className="u-label text-ink-500">{t(D.updated, locale)}</dt>
                    <dd className="text-[0.8125rem] text-ink-700">{formatDate(article.updatedAt, locale)}</dd>
                  </div>
                ) : null}
              </dl>
            </aside>
          </div>
        </div>
      </Band>

      <RelatedSolutions slugs={article.solutions} locale={locale} tone="dark" />
      <RelatedProducts slugs={article.products} locale={locale} tone="light" />

      <PageCta
        locale={locale}
        title={t({ en: 'Discuss Your System With C-Water.', ar: 'ناقش نظامك مع C-Water.' }, locale)}
        body={t(
          {
            en: 'An article can explain the mechanism. Confirming what is happening in your system takes an analysis and a look at the operating conditions.',
            ar: 'يستطيع المقال شرح الآلية. أما تأكيد ما يحدث في نظامك فيحتاج تحليلًا واطلاعًا على ظروف التشغيل.',
          },
          locale,
        )}
        primary={{ label: t(D.talkToEngineer, locale), href: localePath(locale, 'request-solution') }}
        secondary={{ label: t({ en: 'More articles', ar: 'مزيد من المقالات' }, locale), href: localePath(locale, 'knowledge') }}
      />
    </>
  );
}

/** Renders one structured article block through the technical prose styles. */
function Block({ block, locale }: { block: ArticleBlock; locale: Locale }) {
  switch (block.type) {
    case 'p':
      return <p dangerouslySetInnerHTML={{ __html: inline(t(block.text, locale)) }} />;
    case 'ul':
      return (
        <ul>
          {block.items.map((item, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: inline(t(item, locale)) }} />
          ))}
        </ul>
      );
    case 'ol':
      return (
        <ol>
          {block.items.map((item, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: inline(t(item, locale)) }} />
          ))}
        </ol>
      );
    case 'note':
      return (
        <aside className="not-prose my-8 border-s-2 border-signal-500 bg-ink-50 py-5 pe-5 ps-6">
          <p className="text-[0.9375rem] leading-relaxed text-ink-700">{t(block.text, locale)}</p>
        </aside>
      );
    case 'table':
      return (
        <div className="not-prose my-8 overflow-x-auto">
          <table className="w-full min-w-[32rem] border-collapse text-start text-[0.9375rem]">
            <thead>
              <tr className="border-b-2 border-ink-300">
                {block.head.map((cell, i) => (
                  <th key={i} scope="col" className="py-3 pe-6 text-start font-mono text-[0.75rem] font-medium tracking-wide text-ink-500 uppercase last:pe-0">
                    {t(cell, locale)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i} className="border-b border-ink-200">
                  {row.map((cell, j) => (
                    <td key={j} className="py-3.5 pe-6 align-top leading-relaxed text-ink-700 last:pe-0">
                      {t(cell, locale)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    default:
      return null;
  }
}

/**
 * Minimal inline formatting for authored content: `**bold**` only.
 * Input comes from the content modules, not from user submissions, and every
 * other character is HTML-escaped before the bold markers are applied.
 */
function inline(text: string): string {
  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
  return escaped.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
}
