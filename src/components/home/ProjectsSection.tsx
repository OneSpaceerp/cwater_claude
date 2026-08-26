import { Band, SectionHeading } from '@/components/ui/Section';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Button';
import { ProjectCard } from '@/components/cards/Cards';
import { projects } from '@/content/projects';
import { localePath, t, type Locale } from '@/lib/i18n';

export function ProjectsSection({ locale }: { locale: Locale }) {
  const featured = projects.slice(0, 3);

  return (
    <Band tone="paper" className="section">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            index={8}
            eyebrow={t({ en: 'Projects', ar: 'المشروعات' }, locale)}
            title={t({ en: 'Real Water Problems. Engineered Solutions.', ar: 'مشكلات مياه حقيقية. حلول مُهندَسة.' }, locale)}
            lead={t(
              {
                en: 'How C-Water works through a treatment problem — the challenge, the existing system, the approach, and what it addresses.',
                ar: 'كيف تعالج C-Water مشكلة معالجة — التحدي، والنظام القائم، والمنهج، وما الذي يعالجه.',
              },
              locale,
            )}
            actions={
              <ButtonLink href={localePath(locale, 'projects')} variant="ghost" size="sm" withArrow>
                {t({ en: 'All projects', ar: 'كل المشروعات' }, locale)}
              </ButtonLink>
            }
          />
        </Reveal>

        <RevealGroup className="mt-14 grid gap-5 md:grid-cols-3">
          {featured.map((project) => (
            <RevealItem key={project.slug}>
              <ProjectCard project={project} locale={locale} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Band>
  );
}
