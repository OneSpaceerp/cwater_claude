import type { ElementType, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Wave, type Surface } from './Wave';
import { pad } from '@/lib/utils';

/**
 * The section heading system.
 *
 * Every major band on the site opens the same way: a mono eyebrow above a
 * hairline rule, then an editorial headline. The repetition is the point —
 * it gives long technical pages a predictable reading rhythm.
 */

export function Eyebrow({
  children,
  index,
  tone = 'dark',
  className,
}: {
  children: ReactNode;
  /** Optional sequence number rendered as 01 / 02 / 03. */
  index?: number;
  tone?: 'dark' | 'light';
  className?: string;
}) {
  return (
    <p
      className={cn(
        'u-label flex items-center gap-3',
        tone === 'dark' ? 'text-signal-700' : 'text-signal-300',
        className,
      )}
    >
      {index !== undefined ? (
        <>
          {/* ink-400 reads 3.6:1 on paper — below AA for a numeral this small.
              ink-500 is the muted step meant for light canvases, and the
              .theme-dark remap lifts it again on ink. */}
          <span className={tone === 'dark' ? 'text-ink-500' : 'text-ink-300/70'}>{pad(index)}</span>
          <span aria-hidden className={cn('h-px w-6', tone === 'dark' ? 'bg-ink-300' : 'bg-signal-300/40')} />
        </>
      ) : null}
      <span>{children}</span>
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  index,
  title,
  lead,
  tone = 'dark',
  align = 'start',
  as: Tag = 'h2',
  actions,
  className,
  id,
}: {
  eyebrow?: ReactNode;
  index?: number;
  title: ReactNode;
  lead?: ReactNode;
  tone?: 'dark' | 'light';
  align?: 'start' | 'center';
  as?: ElementType;
  /** Right-aligned CTA slot on the heading row (desktop). */
  actions?: ReactNode;
  className?: string;
  id?: string;
}) {
  const isLight = tone === 'light';
  return (
    <div
      className={cn(
        'flex flex-col gap-6',
        align === 'center' && 'items-center text-center',
        actions && 'lg:flex-row lg:items-end lg:justify-between lg:gap-12',
        className,
      )}
    >
      <div className={cn('flex flex-col gap-5', align === 'center' ? 'max-w-3xl' : 'max-w-3xl')}>
        {eyebrow ? (
          <Eyebrow index={index} tone={tone}>
            {eyebrow}
          </Eyebrow>
        ) : null}
        <Tag
          id={id}
          className={cn('text-h2', isLight ? 'text-white' : 'text-ink-950')}
        >
          {title}
        </Tag>
        {/* The short rule under the heading. It replaces the drafting tick that
            used to sit on the card corner: same job — marking where a section
            starts — in the softer register the rest of the page now speaks. */}
        <span
          aria-hidden
          className={cn(
            'block h-0.5 w-14 rounded-full',
            align === 'center' && 'mx-auto',
            isLight ? 'bg-signal-300' : 'bg-signal-500',
          )}
        />
        {lead ? (
          <p className={cn('text-lead max-w-2xl', isLight ? 'text-ink-200' : 'text-ink-600')}>{lead}</p>
        ) : null}
      </div>
      {actions ? <div className="flex shrink-0 items-center gap-3">{actions}</div> : null}
    </div>
  );
}

/**
 * A full-bleed band. `tone="ink"` switches the whole subtree to the dark
 * technical canvas, including cards, rules and focus rings.
 */
/** Which divider surface each band tone paints as. */
const SURFACE: Record<string, Surface> = {
  paper: 'paper',
  mist: 'tint',
  brand: 'brand',
  ink: 'deep',
  'ink-deep': 'deep',
};

export function Band({
  tone = 'paper',
  waveFrom,
  waveTo,
  blueprint,
  children,
  className,
  id,
  as: Tag = 'section',
  ...rest
}: {
  tone?: 'paper' | 'mist' | 'brand' | 'ink' | 'ink-deep';
  /** Curve into this band from the surface above it. */
  waveFrom?: Surface;
  /** Curve out of this band into the surface below it. */
  waveTo?: Surface;
  /** Lays the fine drafting grid behind the band. Dark tones only. */
  blueprint?: boolean;
  children: ReactNode;
  className?: string;
  id?: string;
  as?: ElementType;
} & Record<string, unknown>) {
  const tones: Record<string, string> = {
    paper: 'bg-white text-ink-900',
    /* Was ink-50, a neutral slate. The tint now carries the brand hue, which
       is what makes an alternating page read as water rather than as grey. */
    mist: 'bg-signal-50 text-ink-900',
    /* The saturated brand band — the section that states the proposition in
       full-bleed colour. signal-800 rather than the brighter 600: at 600 the
       eyebrow colour used on every dark band reads 2.75:1, so the band would
       have needed its own set of text colours. At 800 every colour already in
       use on ink clears AA unchanged, down to signal-300 at 4.8:1. */
    brand: 'theme-dark on-brand water-gradient text-white',
    ink: 'theme-dark water-ground text-ink-100',
    'ink-deep': 'theme-dark water-ground text-ink-100',
  };
  const surface = SURFACE[tone];
  return (
    <>
      {waveFrom ? <Wave from={waveFrom} to={surface} /> : null}
      <Tag
        id={id}
        className={cn('relative', tones[tone], blueprint && 'blueprint', className)}
        {...rest}
      >
        {children}
      </Tag>
      {/* Flipped, so the curve dips out of this band rather than repeating the
          same rise twice and reading as a pattern. */}
      {waveTo ? <Wave from={surface} to={waveTo} flip /> : null}
    </>
  );
}
