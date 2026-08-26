import Link from 'next/link';
import type { ReactNode } from 'react';
import { Arrow, Icon } from '@/components/ui/Icon';
import { dictionary as D } from '@/content/dictionary';
import { partnerBySlug } from '@/content/partners';
import { productCategories } from '@/content/products';
import type { Article, Industry, Partner, Product, Project, Service, Solution, Technology } from '@/content/types';
import { localePath, t, type Locale } from '@/lib/i18n';
import { cn, pad } from '@/lib/utils';

/**
 * The card system.
 *
 * Every card is a technical module: a hairline border, no drop shadow, an
 * index in mono, and a leading accent tick that extends on hover. The whole
 * surface is the link target, with the visible affordance on the title.
 */

function CardShell({
  href,
  children,
  className,
  tone = 'light',
}: {
  href: string;
  children: ReactNode;
  className?: string;
  tone?: 'light' | 'dark';
}) {
  return (
    <Link
      href={href}
      className={cn(
        'module group/card relative flex h-full flex-col p-6 sm:p-7',
        tone === 'dark' && 'on-dark',
        className,
      )}
    >
      {children}
    </Link>
  );
}

function CardIndex({ index, tone }: { index?: number; tone: 'light' | 'dark' }) {
  if (index === undefined) return null;
  return (
    <span className={cn('u-label', tone === 'dark' ? 'text-ink-400' : 'text-ink-500')}>{pad(index)}</span>
  );
}

function CardArrow({ tone }: { tone: 'light' | 'dark' }) {
  return (
    <Arrow
      className={cn(
        'mt-auto transition-transform duration-400 ease-[var(--ease-out-expo)] group-hover/card:translate-x-1.5 rtl:group-hover/card:-translate-x-1.5',
        tone === 'dark' ? 'text-signal-300' : 'text-signal-600',
      )}
    />
  );
}

/* -------------------------------------------------------------------------- */

export function SolutionCard({
  solution,
  locale,
  index,
  tone = 'light',
}: {
  solution: Solution;
  locale: Locale;
  index?: number;
  tone?: 'light' | 'dark';
}) {
  return (
    <CardShell href={localePath(locale, `solutions/${solution.slug}`)} tone={tone}>
      <div className="mb-5 flex items-start justify-between gap-4">
        <CardIndex index={index} tone={tone} />
        <Icon
          name={solution.systemFlow[0]?.icon ?? 'droplet'}
          size={26}
          className={cn(
            'transition-colors duration-400',
            tone === 'dark' ? 'text-signal-400 group-hover/card:text-signal-300' : 'text-signal-600',
          )}
        />
      </div>
      <h3
        className={cn(
          'font-display text-xl leading-tight font-semibold tracking-tight',
          tone === 'dark' ? 'text-white' : 'text-ink-950',
        )}
      >
        {t(solution.title, locale)}
      </h3>
      <p className={cn('mt-3 mb-6 text-sm leading-relaxed', tone === 'dark' ? 'text-ink-300' : 'text-ink-600')}>
        {t(solution.summary, locale)}
      </p>
      <CardArrow tone={tone} />
    </CardShell>
  );
}

export function IndustryCard({
  industry,
  locale,
  tone = 'light',
}: {
  industry: Industry;
  locale: Locale;
  tone?: 'light' | 'dark';
}) {
  return (
    <CardShell href={localePath(locale, `industries/${industry.slug}`)} tone={tone} className="min-h-[13.5rem]">
      <Icon
        name={industry.typicalSystems[0]?.icon ?? 'factory'}
        size={24}
        className={cn('mb-5', tone === 'dark' ? 'text-signal-400' : 'text-signal-600')}
      />
      <h3
        className={cn(
          'font-display text-lg leading-tight font-semibold tracking-tight',
          tone === 'dark' ? 'text-white' : 'text-ink-950',
        )}
      >
        {t(industry.title, locale)}
      </h3>
      <p className={cn('mt-2.5 mb-6 text-sm leading-relaxed', tone === 'dark' ? 'text-ink-300' : 'text-ink-600')}>
        {t(industry.summary, locale)}
      </p>
      <CardArrow tone={tone} />
    </CardShell>
  );
}

export function TechnologyCard({
  technology,
  locale,
  index,
  tone = 'light',
}: {
  technology: Technology;
  locale: Locale;
  index?: number;
  tone?: 'light' | 'dark';
}) {
  const partner = technology.partner ? partnerBySlug[technology.partner] : null;
  return (
    <CardShell href={localePath(locale, `technologies/${technology.slug}`)} tone={tone}>
      <div className="mb-5 flex items-start justify-between gap-4">
        <CardIndex index={index} tone={tone} />
        {partner ? (
          <span className={cn('u-label latin', tone === 'dark' ? 'text-signal-300/70' : 'text-signal-700/80')}>
            {partner.legalName}
          </span>
        ) : null}
      </div>
      <h3
        className={cn(
          'font-display text-lg leading-tight font-semibold tracking-tight',
          tone === 'dark' ? 'text-white' : 'text-ink-950',
        )}
      >
        {t(technology.title, locale)}
      </h3>
      <p className={cn('mt-2.5 mb-6 text-sm leading-relaxed', tone === 'dark' ? 'text-ink-300' : 'text-ink-600')}>
        {t(technology.summary, locale)}
      </p>
      <CardArrow tone={tone} />
    </CardShell>
  );
}

export function ProductCard({
  product,
  locale,
  tone = 'light',
}: {
  product: Product;
  locale: Locale;
  tone?: 'light' | 'dark';
}) {
  const partner = partnerBySlug[product.partner];
  return (
    <CardShell href={localePath(locale, `products/${product.slug}`)} tone={tone}>
      <div className="mb-4 flex items-center gap-2.5">
        <span className={cn('u-label latin', tone === 'dark' ? 'text-signal-300' : 'text-signal-700')}>
          {partner.legalName}
        </span>
        <span aria-hidden className={cn('h-px w-4', tone === 'dark' ? 'bg-white/20' : 'bg-ink-300')} />
        <span className={cn('u-label', tone === 'dark' ? 'text-ink-400' : 'text-ink-500')}>
          {t(productCategories[product.category], locale)}
        </span>
      </div>
      <h3
        className={cn(
          'latin font-display text-lg leading-tight font-semibold tracking-tight',
          tone === 'dark' ? 'text-white' : 'text-ink-950',
        )}
      >
        {product.name}
      </h3>
      <p className={cn('mt-2.5 text-sm leading-relaxed', tone === 'dark' ? 'text-ink-300' : 'text-ink-600')}>
        {t(product.positioning, locale)}
      </p>
      <div
        className={cn(
          'mt-6 flex items-center justify-between border-t pt-4',
          tone === 'dark' ? 'border-white/10' : 'border-ink-200',
        )}
      >
        <span className={cn('text-[0.8125rem] font-medium', tone === 'dark' ? 'text-signal-300' : 'text-signal-700')}>
          {t(D.viewProduct, locale)}
        </span>
        <CardArrow tone={tone} />
      </div>
    </CardShell>
  );
}

export function PartnerCard({
  partner,
  locale,
  tone = 'dark',
}: {
  partner: Partner;
  locale: Locale;
  tone?: 'light' | 'dark';
}) {
  return (
    <CardShell href={localePath(locale, `partners/${partner.slug}`)} tone={tone} className="min-h-[16rem]">
      <div className="mb-6">
        {/* Partner names are set as type, not as logos: C-Water stays the
            master brand and the partner reads as a credential. */}
        <p
          className={cn(
            'latin font-display text-2xl font-bold tracking-tight',
            tone === 'dark' ? 'text-white' : 'text-ink-950',
          )}
        >
          {partner.legalName}
        </p>
        <p className={cn('mt-1.5 text-sm font-medium', tone === 'dark' ? 'text-signal-300' : 'text-signal-700')}>
          {t(partner.motto, locale)}
        </p>
      </div>
      <p className={cn('mb-6 text-sm leading-relaxed', tone === 'dark' ? 'text-ink-300' : 'text-ink-600')}>
        {t(partner.summary, locale)}
      </p>
      <div
        className={cn(
          'mt-auto flex items-center justify-between border-t pt-4',
          tone === 'dark' ? 'border-white/10' : 'border-ink-200',
        )}
      >
        <span className={cn('u-label', tone === 'dark' ? 'text-ink-400' : 'text-ink-500')}>
          {t(partner.capability, locale)}
        </span>
        <CardArrow tone={tone} />
      </div>
    </CardShell>
  );
}

export function ServiceCard({
  service,
  locale,
  index,
  tone = 'light',
}: {
  service: Service;
  locale: Locale;
  index?: number;
  tone?: 'light' | 'dark';
}) {
  return (
    <CardShell href={localePath(locale, `services/${service.slug}`)} tone={tone}>
      <div className="mb-5 flex items-start justify-between gap-4">
        <CardIndex index={index} tone={tone} />
        <Icon name={service.icon} size={24} className={tone === 'dark' ? 'text-signal-400' : 'text-signal-600'} />
      </div>
      <p className={cn('u-label mb-2', tone === 'dark' ? 'text-signal-300' : 'text-signal-700')}>
        {t(service.verb, locale)}
      </p>
      <h3
        className={cn(
          'font-display text-lg leading-tight font-semibold tracking-tight',
          tone === 'dark' ? 'text-white' : 'text-ink-950',
        )}
      >
        {t(service.title, locale)}
      </h3>
      <p className={cn('mt-2.5 mb-6 text-sm leading-relaxed', tone === 'dark' ? 'text-ink-300' : 'text-ink-600')}>
        {t(service.summary, locale)}
      </p>
      <CardArrow tone={tone} />
    </CardShell>
  );
}

export function ProjectCard({
  project,
  locale,
  tone = 'light',
}: {
  project: Project;
  locale: Locale;
  tone?: 'light' | 'dark';
}) {
  return (
    <CardShell href={localePath(locale, `projects/${project.slug}`)} tone={tone}>
      {project.isIllustrative ? (
        <span
          className={cn(
            'mb-4 inline-flex w-fit items-center gap-1.5 rounded-sm border px-2 py-1 font-mono text-[0.625rem] tracking-[0.12em] uppercase',
            tone === 'dark'
              ? 'border-warn-500/35 bg-warn-500/10 text-warn-500'
              : 'border-warn-500/40 bg-warn-500/8 text-warn-500',
          )}
        >
          {t(D.illustrativeProject, locale)}
        </span>
      ) : null}
      <h3
        className={cn(
          'font-display text-lg leading-tight font-semibold tracking-tight',
          tone === 'dark' ? 'text-white' : 'text-ink-950',
        )}
      >
        {t(project.title, locale)}
      </h3>
      <p className={cn('mt-3 text-sm leading-relaxed', tone === 'dark' ? 'text-ink-300' : 'text-ink-600')}>
        {t(project.summary, locale)}
      </p>
      <div
        className={cn(
          'mt-6 flex items-center justify-between border-t pt-4',
          tone === 'dark' ? 'border-white/10' : 'border-ink-200',
        )}
      >
        <span className={cn('u-label', tone === 'dark' ? 'text-ink-400' : 'text-ink-500')}>
          {t(D.kind.project, locale)}
        </span>
        <CardArrow tone={tone} />
      </div>
    </CardShell>
  );
}

export function KnowledgeCard({
  article,
  locale,
  tone = 'light',
}: {
  article: Article;
  locale: Locale;
  tone?: 'light' | 'dark';
}) {
  return (
    <CardShell href={localePath(locale, `knowledge/${article.slug}`)} tone={tone}>
      <div className="mb-4 flex items-center gap-2.5">
        <span className={cn('u-label', tone === 'dark' ? 'text-signal-300' : 'text-signal-700')}>
          {article.category.replace('-', ' ')}
        </span>
        <span aria-hidden className={cn('h-px w-4', tone === 'dark' ? 'bg-white/20' : 'bg-ink-300')} />
        <span className={cn('u-label', tone === 'dark' ? 'text-ink-400' : 'text-ink-500')}>
          {D.readingTime[locale](article.readingMinutes)}
        </span>
      </div>
      <h3
        className={cn(
          'font-display text-lg leading-snug font-semibold tracking-tight',
          tone === 'dark' ? 'text-white' : 'text-ink-950',
        )}
      >
        {t(article.title, locale)}
      </h3>
      <p className={cn('mt-3 mb-6 text-sm leading-relaxed', tone === 'dark' ? 'text-ink-300' : 'text-ink-600')}>
        {t(article.summary, locale)}
      </p>
      <CardArrow tone={tone} />
    </CardShell>
  );
}

/** A metric tile. Renders qualitative outcomes; numbers only where validated. */
export function MetricTile({
  label,
  body,
  icon,
  index,
  tone = 'dark',
}: {
  label: string;
  body: string;
  icon: Parameters<typeof Icon>[0]['name'];
  index?: number;
  tone?: 'light' | 'dark';
}) {
  return (
    <div className={cn('module h-full p-6 sm:p-7', tone === 'dark' && 'on-dark')}>
      <div className="mb-5 flex items-start justify-between gap-4">
        <CardIndex index={index} tone={tone} />
        <Icon name={icon} size={24} className={tone === 'dark' ? 'text-signal-400' : 'text-signal-600'} />
      </div>
      <p
        className={cn(
          'font-display text-base font-semibold tracking-tight uppercase',
          tone === 'dark' ? 'text-white' : 'text-ink-950',
        )}
      >
        {label}
      </p>
      <p className={cn('mt-2.5 text-sm leading-relaxed', tone === 'dark' ? 'text-ink-300' : 'text-ink-600')}>{body}</p>
    </div>
  );
}
