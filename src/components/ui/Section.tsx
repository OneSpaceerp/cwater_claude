import type { ElementType, ReactNode } from 'react';
import { cn } from '@/lib/utils';
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
          <span className={tone === 'dark' ? 'text-ink-400' : 'text-ink-300/70'}>{pad(index)}</span>
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
export function Band({
  tone = 'paper',
  blueprint,
  children,
  className,
  id,
  as: Tag = 'section',
  ...rest
}: {
  tone?: 'paper' | 'mist' | 'ink' | 'ink-deep';
  /** Lays the fine drafting grid behind the band. Dark tones only. */
  blueprint?: boolean;
  children: ReactNode;
  className?: string;
  id?: string;
  as?: ElementType;
} & Record<string, unknown>) {
  const tones: Record<string, string> = {
    paper: 'bg-white text-ink-900',
    mist: 'bg-ink-50 text-ink-900',
    ink: 'theme-dark bg-ink-950 text-ink-100',
    'ink-deep': 'theme-dark bg-[#03070C] text-ink-100',
  };
  return (
    <Tag
      id={id}
      className={cn('relative', tones[tone], blueprint && 'blueprint', className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}
