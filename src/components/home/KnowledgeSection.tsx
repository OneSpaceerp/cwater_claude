import { Band, SectionHeading } from '@/components/ui/Section';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Button';
import { KnowledgeCard } from '@/components/cards/Cards';
import { articles } from '@/content/articles';
import { dictionary as D } from '@/content/dictionary';
import { localePath, t, type Locale } from '@/lib/i18n';

export function KnowledgeSection({ locale }: { locale: Locale }) {
  const featured = articles.slice(0, 3);

  return (
    <Band tone="mist" className="section">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            index={9}
            eyebrow={t({ en: 'Knowledge Center', ar: 'مركز المعرفة' }, locale)}
            title={t(
              { en: 'Water Is Technical. Your Answers Should Be Too.', ar: 'المياه مسألة فنية. وينبغي أن تكون إجاباتك كذلك.' },
              locale,
            )}
            lead={t(
              {
                en: 'Straight answers to the questions engineers and plant managers actually search for.',
                ar: 'إجابات مباشرة عن الأسئلة التي يبحث عنها المهندسون ومديرو المنشآت فعلًا.',
              },
              locale,
            )}
            actions={
              <ButtonLink href={localePath(locale, 'knowledge')} variant="ghost" size="sm" withArrow>
                {t(D.viewAll, locale)}
              </ButtonLink>
            }
          />
        </Reveal>

        <RevealGroup className="mt-14 grid gap-5 md:grid-cols-3">
          {featured.map((article) => (
            <RevealItem key={article.slug}>
              <KnowledgeCard article={article} locale={locale} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Band>
  );
}
