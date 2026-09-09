import { Band, SectionHeading } from '@/components/ui/Section';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Button';
import {
  IndustryCard,
  KnowledgeCard,
  ProductCard,
  ProjectCard,
  ServiceCard,
  SolutionCard,
  TechnologyCard,
} from '@/components/cards/Cards';
import { dictionary as D } from '@/content/dictionary';
import { articles } from '@/content/articles';
import { industries } from '@/content/industries';
import { products } from '@/content/products';
import { projects } from '@/content/projects';
import { services } from '@/content/services';
import { solutions } from '@/content/solutions';
import { technologies } from '@/content/technologies';
import { localePath, t, type Locale } from '@/lib/i18n';
import { pickBySlug } from '@/lib/utils';

/**
 * Relationship blocks.
 *
 * These are what make the site behave as a connected knowledge platform rather
 * than a set of isolated pages: every detail page ends by routing the visitor
 * to the adjacent content in the graph.
 */

type Tone = 'light' | 'dark';

function Wrapper({
  tone,
  heading,
  children,
  action,
}: {
  tone: Tone;
  heading: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <Band tone={tone === 'dark' ? 'ink' : 'mist'} className="section-tight">
      <div className="container-page">
        <Reveal>
          <SectionHeading title={heading} tone={tone === 'dark' ? 'light' : 'dark'} as="h2" actions={action} />
        </Reveal>
        <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{children}</RevealGroup>
      </div>
    </Band>
  );
}

export function RelatedSolutions({
  slugs,
  locale,
  tone = 'light',
}: {
  slugs: string[];
  locale: Locale;
  tone?: Tone;
}) {
  const items = pickBySlug(solutions, slugs).slice(0, 6);
  if (items.length === 0) return null;
  return (
    <Wrapper
      tone={tone}
      heading={t(D.relatedSolutions, locale)}
      action={
        <ButtonLink href={localePath(locale, 'solutions')} variant={tone === 'dark' ? 'outline-light' : 'ghost'} size="sm" withArrow>
          {t(D.viewAll, locale)}
        </ButtonLink>
      }
    >
      {items.map((item) => (
        <RevealItem key={item.slug}>
          <SolutionCard solution={item} locale={locale} tone={tone} />
        </RevealItem>
      ))}
    </Wrapper>
  );
}

export function RelatedTechnologies({
  slugs,
  locale,
  tone = 'dark',
  heading,
}: {
  slugs: string[];
  locale: Locale;
  tone?: Tone;
  heading?: string;
}) {
  const items = pickBySlug(technologies, slugs).slice(0, 6);
  if (items.length === 0) return null;
  return (
    <Wrapper
      tone={tone}
      heading={heading ?? t(D.technologyStack, locale)}
      action={
        <ButtonLink href={localePath(locale, 'technologies')} variant={tone === 'dark' ? 'outline-light' : 'ghost'} size="sm" withArrow>
          {t(D.viewAll, locale)}
        </ButtonLink>
      }
    >
      {items.map((item, i) => (
        <RevealItem key={item.slug}>
          <TechnologyCard technology={item} locale={locale} index={i + 1} tone={tone} />
        </RevealItem>
      ))}
    </Wrapper>
  );
}

export function RelatedProducts({
  slugs,
  locale,
  tone = 'light',
}: {
  slugs: string[];
  locale: Locale;
  tone?: Tone;
}) {
  const items = pickBySlug(products, slugs).slice(0, 6);
  if (items.length === 0) return null;
  return (
    <Wrapper
      tone={tone}
      heading={t(D.relatedProducts, locale)}
      action={
        <ButtonLink href={localePath(locale, 'products')} variant={tone === 'dark' ? 'outline-light' : 'ghost'} size="sm" withArrow>
          {t(D.viewAll, locale)}
        </ButtonLink>
      }
    >
      {items.map((item) => (
        <RevealItem key={item.slug}>
          <ProductCard product={item} locale={locale} tone={tone} />
        </RevealItem>
      ))}
    </Wrapper>
  );
}

export function RelatedServices({
  slugs,
  locale,
  tone = 'light',
}: {
  slugs: string[];
  locale: Locale;
  tone?: Tone;
}) {
  const items = pickBySlug(services, slugs).slice(0, 6);
  if (items.length === 0) return null;
  return (
    <Wrapper
      tone={tone}
      heading={t(D.relatedServices, locale)}
      action={
        <ButtonLink href={localePath(locale, 'services')} variant={tone === 'dark' ? 'outline-light' : 'ghost'} size="sm" withArrow>
          {t(D.viewAll, locale)}
        </ButtonLink>
      }
    >
      {items.map((item, i) => (
        <RevealItem key={item.slug}>
          <ServiceCard service={item} locale={locale} index={i + 1} tone={tone} />
        </RevealItem>
      ))}
    </Wrapper>
  );
}

export function RelatedIndustries({
  slugs,
  locale,
  tone = 'light',
}: {
  slugs: string[];
  locale: Locale;
  tone?: Tone;
}) {
  const items = pickBySlug(industries, slugs).slice(0, 6);
  if (items.length === 0) return null;
  return (
    <Wrapper
      tone={tone}
      heading={t(D.relatedIndustries, locale)}
      action={
        <ButtonLink href={localePath(locale, 'industries')} variant={tone === 'dark' ? 'outline-light' : 'ghost'} size="sm" withArrow>
          {t(D.viewAll, locale)}
        </ButtonLink>
      }
    >
      {items.map((item) => (
        <RevealItem key={item.slug}>
          <IndustryCard industry={item} locale={locale} tone={tone} />
        </RevealItem>
      ))}
    </Wrapper>
  );
}

export function RelatedProjects({
  slugs,
  locale,
  tone = 'light',
}: {
  slugs: string[];
  locale: Locale;
  tone?: Tone;
}) {
  const items = pickBySlug(projects, slugs).slice(0, 3);
  if (items.length === 0) return null;
  return (
    <Wrapper
      tone={tone}
      heading={t(D.relatedProjects, locale)}
      action={
        <ButtonLink href={localePath(locale, 'projects')} variant={tone === 'dark' ? 'outline-light' : 'ghost'} size="sm" withArrow>
          {t(D.viewAll, locale)}
        </ButtonLink>
      }
    >
      {items.map((item) => (
        <RevealItem key={item.slug}>
          <ProjectCard project={item} locale={locale} tone={tone} />
        </RevealItem>
      ))}
    </Wrapper>
  );
}

export function RelatedKnowledge({
  slugs,
  locale,
  tone = 'light',
}: {
  slugs: string[];
  locale: Locale;
  tone?: Tone;
}) {
  const items = pickBySlug(articles, slugs).slice(0, 3);
  if (items.length === 0) return null;
  return (
    <Wrapper
      tone={tone}
      heading={t(D.relatedKnowledge, locale)}
      action={
        <ButtonLink href={localePath(locale, 'knowledge')} variant={tone === 'dark' ? 'outline-light' : 'ghost'} size="sm" withArrow>
          {t(D.viewAll, locale)}
        </ButtonLink>
      }
    >
      {items.map((item) => (
        <RevealItem key={item.slug}>
          <KnowledgeCard article={item} locale={locale} tone={tone} />
        </RevealItem>
      ))}
    </Wrapper>
  );
}

/** The closing conversion band used at the foot of every detail page. */
export function PageCta({
  title,
  body,
  primary,
  secondary,
}: {
  /** Accepted so every call site reads the same; the band itself is locale-agnostic. */
  locale?: Locale;
  title: string;
  body?: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    /* Light, not ink. This band closes nearly every page on the site, so as a
       dark block it set the overall temperature more than any single section —
       every page opened dark and ended dark. On mist it still reads as a
       deliberate closing moment because of the centred measure and the solid
       primary button, without the whole site feeling like a night scene. */
    <Band tone="mist" className="section relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_75%_at_50%_100%,rgba(24,142,206,0.09),transparent_70%)]"
      />
      <div className="container-page relative">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-h2 text-ink-950 text-balance">{title}</h2>
            {body ? <p className="mt-6 text-lead text-ink-600">{body}</p> : null}
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <ButtonLink href={primary.href} size="lg" withArrow>
                {primary.label}
              </ButtonLink>
              {secondary ? (
                <ButtonLink href={secondary.href} variant="ghost" size="lg">
                  {secondary.label}
                </ButtonLink>
              ) : null}
            </div>
          </div>
        </Reveal>
      </div>
    </Band>
  );
}
