import { cn } from '@/lib/utils';

/**
 * The curved transitions between bands.
 *
 * The old design cut sections with hairline rules — a drafting convention. This
 * one lets them flow into each other, which is the whole point of the reference:
 * the page reads as water rather than as a spec sheet.
 *
 * Mechanically each divider is a strip painted in the OUTGOING colour with a
 * path painted in the INCOMING one, so it belongs to neither band and can sit
 * between any two. `preserveAspectRatio="none"` lets the curve stretch to any
 * width without the path being re-authored.
 *
 * The shapes are deliberately shallow. A deep wave eats vertical rhythm and
 * starts to look like a template; these read as a change of ground.
 */

/** Every surface a divider can bridge, in the C-Water palette. */
export type Surface = 'paper' | 'tint' | 'brand' | 'deep';

const FILL: Record<Surface, string> = {
  paper: 'fill-white',
  tint: 'fill-signal-50',
  brand: 'fill-signal-800',
  deep: 'fill-ink-950',
};

const BG: Record<Surface, string> = {
  paper: 'bg-white',
  tint: 'bg-signal-50',
  brand: 'bg-signal-800',
  deep: 'bg-ink-950',
};

/* Two crests, offset so the curve never reads as a symmetrical arc. */
const SINE =
  'M0,64 C180,8 360,8 540,52 C740,101 900,101 1080,60 C1230,26 1350,26 1440,44 L1440,120 L0,120 Z';

/* The same wave with its crests and troughs swapped. It still fills downward —
   the incoming colour always sits below the curve — so only the shape changes,
   which is what stops two dividers on one page reading as a repeat. */
const SINE_FLIP =
  'M0,56 C180,112 360,112 540,68 C740,19 900,19 1080,60 C1230,94 1350,94 1440,76 L1440,120 L0,120 Z';

export function Wave({
  from,
  to,
  flip = false,
  className,
}: {
  /** The band above. */
  from: Surface;
  /** The band below. */
  to: Surface;
  /** Dips into the section below rather than rising into the one above. */
  flip?: boolean;
  className?: string;
}) {
  return (
    <div aria-hidden className={cn('relative isolate w-full', BG[from], className)}>
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="block h-[52px] w-full sm:h-[72px] lg:h-[100px]"
      >
        <path d={flip ? SINE_FLIP : SINE} className={FILL[to]} />
      </svg>
    </div>
  );
}

/**
 * The hero's closing sweep — a single wide arc rather than a wave.
 *
 * In the reference this is what separates the photographic hero from the page,
 * and it is much larger than the dividers: a quarter-ellipse rising from the
 * leading edge. It flips under RTL so the sweep always opens away from the
 * text, which sits on the leading side in both directions.
 */
export function HeroSweep({ to = 'paper', className }: { to?: Surface; className?: string }) {
  return (
    <div aria-hidden className={cn('pointer-events-none absolute inset-x-0 bottom-0 z-10', className)}>
      <svg
        viewBox="0 0 1440 160"
        preserveAspectRatio="none"
        className="block h-[64px] w-full ltr:scale-x-100 rtl:-scale-x-100 sm:h-[96px] lg:h-[132px]"
      >
        <path d="M0,160 L0,96 C260,4 780,-24 1440,44 L1440,160 Z" className={FILL[to]} />
      </svg>
    </div>
  );
}
