import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Arrow } from './Icon';

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline-light' | 'quiet';
type Size = 'sm' | 'md' | 'lg';

const base =
  /* Pill, not a 2px radius. This is the single most visible carrier of the
     new language — every control on the page reads as water-rounded. */
  'group/btn relative inline-flex items-center justify-center gap-2.5 rounded-full font-medium ' +
  'transition-[background-color,border-color,color,transform] duration-300 ease-[var(--ease-out-expo)] ' +
  'disabled:pointer-events-none disabled:opacity-45 whitespace-nowrap';

const variants: Record<Variant, string> = {
  /* Solid brand blue, one step down the same ramp.
     White on signal-500 is 3.62:1 — below AA for the 15px button label — so the
     solid fill uses signal-600 (5.21:1). signal-500 remains the brand accent
     everywhere it carries no text: flow lines, icons, focus rings and marks. */
  primary: 'bg-signal-600 text-white hover:bg-signal-700 active:bg-signal-800',
  /* Ink-filled. Pairs with primary without competing for the same attention. */
  secondary: 'bg-ink-950 text-white hover:bg-ink-800 active:bg-ink-900',
  /* Hairline on light canvases. */
  ghost: 'border border-ink-300 text-ink-900 hover:border-ink-950 hover:bg-ink-50 active:bg-ink-100',
  /* Hairline on dark canvases. */
  'outline-light':
    'border border-white/25 text-white hover:border-signal-300 hover:bg-signal-500/12 active:bg-signal-500/20',
  /* Text-only, for tertiary in-flow links. */
  quiet: 'text-signal-700 hover:text-signal-500 underline-offset-4 hover:underline px-0',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-5 text-[0.8125rem]',
  md: 'h-11 px-7 text-[0.9375rem]',
  lg: 'h-[3.25rem] px-9 text-base',
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  /** Appends the directional arrow that slides on hover. */
  withArrow?: boolean;
  className?: string;
  children: ReactNode;
}

function content(children: ReactNode, withArrow?: boolean) {
  return (
    <>
      <span>{children}</span>
      {withArrow ? (
        <Arrow className="transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover/btn:translate-x-1 rtl:group-hover/btn:-translate-x-1" />
      ) : null}
    </>
  );
}

export function Button({
  variant = 'primary',
  size = 'md',
  withArrow,
  className,
  children,
  ...rest
}: CommonProps & Omit<ComponentProps<'button'>, 'children' | 'className'>) {
  return (
    <button
      className={cn(base, variants[variant], variant !== 'quiet' && sizes[size], className)}
      {...rest}
    >
      {content(children, withArrow)}
    </button>
  );
}

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  withArrow,
  className,
  children,
  href,
  ...rest
}: CommonProps & Omit<ComponentProps<typeof Link>, 'children' | 'className'>) {
  return (
    <Link
      href={href}
      className={cn(base, variants[variant], variant !== 'quiet' && sizes[size], className)}
      {...rest}
    >
      {content(children, withArrow)}
    </Link>
  );
}

/**
 * The in-flow text link used at the foot of cards and sections.
 * A hairline underline grows from the leading edge on hover.
 */
export function LinkCta({
  href,
  children,
  className,
  tone = 'signal',
  ...rest
}: Omit<ComponentProps<typeof Link>, 'className'> & {
  className?: string;
  tone?: 'signal' | 'light';
}) {
  return (
    <Link
      href={href}
      className={cn(
        'group/cta inline-flex items-center gap-2 text-[0.9375rem] font-medium',
        tone === 'signal' ? 'text-signal-700 hover:text-signal-500' : 'text-signal-200 hover:text-white',
        className,
      )}
      {...rest}
    >
      <span className="relative">
        {children}
        <span
          aria-hidden
          className="absolute -bottom-0.5 start-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-400 ease-[var(--ease-out-expo)] group-hover/cta:scale-x-100 rtl:origin-right"
        />
      </span>
      <Arrow
        size={14}
        className="transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover/cta:translate-x-1 rtl:group-hover/cta:-translate-x-1"
      />
    </Link>
  );
}
