import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageHero } from '@/components/layout/PageHero';
import { PageCta } from '@/components/layout/RelatedSections';
import { Band } from '@/components/ui/Section';
import { KnowledgeIndex, type ArticleCard } from '@/components/knowledge/KnowledgeIndex';
import { articles, knowledgeCategories } from '@/content/articles';
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
    path: 'knowledge',
    title: { en: 'Water Treatment Knowledge Center | C-Water', ar: 'مركز معرفة معالجة المياه | C-Water' },
    description: {
      en: 'Technical articles on cooling water scale, corrosion mechanisms, RO fouling, boiler blowdown, conductivity, ORP, pH, filtration selection and treatment programme design.',
      ar: 'مقالات فنية عن ترسبات مياه التبريد، وآليات التآكل، واتساخ الأغشية، وتصريف الغلايات، والتوصيلية، وORP، ودرجة الحموضة، واختيار الترشيح، وتصميم برامج المعالجة.',
    },
  });
}

export default async function KnowledgePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;

  const label = t({ en: 'Knowledge Center', ar: 'مركز المعرفة' }, locale);

  /* Flatten to card data on the server. The client filter needs a title, a
     summary and something to match against — not the article bodies. */
  const cards: ArticleCard[] = articles.map((article) => ({
    slug: article.slug,
    title: t(article.title, locale),
    summary: t(article.summary, locale),
    category: article.category,
    readingMinutes: article.readingMinutes,
    haystack: [
      t(article.title, locale),
      t(article.question, locale),
      t(article.summary, locale),
      ...article.sections.map((section) => t(section.heading, locale)),
    ]
      .join(' ')
      .toLowerCase(),
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { label: t(D.home, locale), href: localePath(locale) },
              { label, href: localePath(locale, 'knowledge') },
            ]),
          ),
        }}
      />

      <PageHero
        locale={locale}
        breadcrumbs={[{ label: t(D.home, locale), href: localePath(locale) }, { label }]}
        eyebrow={label}
        title={t({ en: 'Understand the Water. Understand the System.', ar: 'افهم المياه. افهم النظام.' }, locale)}
        lead={t(
          {
            en: 'Straight technical answers to the questions engineers and plant managers actually search for — written to be useful on site, and clear about where an article stops and an engineer starts.',
            ar: 'إجابات فنية مباشرة عن الأسئلة التي يبحث عنها المهندسون ومديرو المنشآت فعلًا — مكتوبة لتكون نافعة في الموقع، وواضحة بشأن أين ينتهي المقال ويبدأ دور المهندس.',
          },
          locale,
        )}
        size="large"
      />

      <Band tone="paper" className="section">
        <div className="container-page">
          <KnowledgeIndex locale={locale} articles={cards} categories={knowledgeCategories} />
        </div>
      </Band>

      <PageCta
        locale={locale}
        title={t({ en: 'Question not answered here?', ar: 'سؤالك غير مُجاب عنه هنا؟' }, locale)}
        body={t(
          {
            en: 'Most treatment questions are answerable from the right data. Tell us what you are seeing and what you have measured.',
            ar: 'معظم أسئلة المعالجة يمكن الإجابة عنها من البيانات الصحيحة. أخبرنا بما تلاحظه وبما قِسته.',
          },
          locale,
        )}
        primary={{ label: t(D.talkToEngineer, locale), href: localePath(locale, 'contact?intent=engineer') }}
        secondary={{ label: t(D.exploreSolutions, locale), href: localePath(locale, 'solutions') }}
      />
    </>
  );
}
