import Image from 'next/image';
import type { ReactNode } from 'react';
import type { SiteImage } from '@/content/imagery';
import { withBasePath } from '@/lib/base-path';
import { Breadcrumb } from '@/components/ui/Pieces';
import { ButtonLink } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import type { IconKey } from '@/content/types';
import { type Locale } from '@/lib/i18n';
import { cn } from '@/lib/utils';

/**
 * The standard page hero.
 *
 * Every non-home page opens the same way: breadcrumb, eyebrow, editorial
 * headline, lead paragraph, then the primary action. Keeping the composition
 * fixed is what makes a site of this size feel designed rather than assembled.
 */
export function PageHero({
  locale,
  breadcrumbs,
  eyebrow,
  title,
  lead,
  icon,
  primaryCta,
  secondaryCta,
  aside,
  size = 'default',
  image,
}: {
  locale: Locale;
  breadcrumbs: { label: string; href?: string }[];
  eyebrow?: string;
  title: string;
  lead?: string;
  icon?: IconKey;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  /** Optional panel occupying the right column on wide screens. */
  aside?: ReactNode;
  size?: 'default' | 'large';
  /**
   * Optional photograph behind the heading. Decoration, not content: it is
   * hidden from assistive technology and the page reads identically without
   * it, which is why partial coverage across the site is not a defect.
   */
  image?: SiteImage;
}) {
  return (
    <section className="theme-dark blueprint relative overflow-hidden bg-ink-950 pt-[var(--header-h)]">
      {image ? (
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <Image
            src={withBasePath(image.src)}
            alt=""
            fill
            priority
            sizes="100vw"
            className="scale-105 object-cover opacity-[0.85]"
          />
          {/*
            Two gradients, and the split matters. The horizontal one buries the
            image behind the text column and releases it towards the far edge,
            so the photograph is actually visible instead of being a grey wash;
            it flips under RTL because the copy moves to the other side. The
            vertical one lands the buttons on near-solid ink and keeps a bright
            sky off the breadcrumb.

            Measured against all 19 images: worst case 6.1:1 for the eyebrow,
            the lightest of the three text colours used here. A flat wash strong
            enough to guarantee that everywhere left the image invisible.
          */}
          <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/80 to-ink-950/15 rtl:bg-gradient-to-l" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-ink-950/40" />
        </div>
      ) : null}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_-10%,rgba(24,142,206,0.18),transparent_65%)]"
      />
      <div className="container-page relative">
        <div
          className={cn(
            'flex flex-col gap-12 pb-14 lg:flex-row lg:items-end lg:justify-between lg:gap-16',
            size === 'large' ? 'pt-14 lg:pt-20' : 'pt-12 lg:pt-16',
          )}
        >
          <div className="max-w-3xl">
            <Breadcrumb items={breadcrumbs} locale={locale} tone="dark" />

            {eyebrow ? (
              <p className="u-label mt-8 flex items-center gap-3 text-signal-300">
                {icon ? <Icon name={icon} size={17} /> : <span aria-hidden className="h-px w-7 bg-signal-400/60" />}
                {eyebrow}
              </p>
            ) : null}

            <h1
              className={cn(
                'mt-6 text-white text-balance',
                size === 'large' ? 'text-display' : 'text-h1',
              )}
            >
              {title}
            </h1>

            {lead ? <p className="mt-7 max-w-2xl text-lead text-ink-200">{lead}</p> : null}

            {primaryCta || secondaryCta ? (
              <div className="mt-9 flex flex-wrap items-center gap-3">
                {primaryCta ? (
                  <ButtonLink href={primaryCta.href} size="lg" withArrow>
                    {primaryCta.label}
                  </ButtonLink>
                ) : null}
                {secondaryCta ? (
                  <ButtonLink href={secondaryCta.href} variant="outline-light" size="lg">
                    {secondaryCta.label}
                  </ButtonLink>
                ) : null}
              </div>
            ) : null}
          </div>

          {aside ? <div className="w-full lg:max-w-sm">{aside}</div> : null}
        </div>
      </div>
      <div aria-hidden className="flow-rule" />
    </section>
  );
}
