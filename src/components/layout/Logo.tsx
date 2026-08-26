import Image from 'next/image';
import Link from 'next/link';
import { withBasePath } from '@/lib/base-path';
import { localePath, type Locale } from '@/lib/i18n';
import { cn } from '@/lib/utils';

/**
 * The C-Water mark, used unaltered.
 *
 * The supplied artwork has a transparent ground and both of its colours —
 * the signal blue mark and the steel wordmark — hold contrast on the light
 * paper and dark ink canvases alike, so a single asset serves every context.
 */
export function Logo({
  locale,
  className,
  height = 34,
  priority,
}: {
  locale: Locale;
  className?: string;
  height?: number;
  priority?: boolean;
}) {
  const ratio = 294 / 111;
  return (
    <Link
      href={localePath(locale)}
      className={cn('inline-flex shrink-0 items-center', className)}
      aria-label="C-Water — home"
    >
      <Image
        src={withBasePath('/brand/c-water-logo.png')}
        alt="C-Water"
        width={Math.round(height * ratio)}
        height={height}
        priority={priority}
        className="h-auto w-auto"
        style={{ height, width: 'auto' }}
      />
    </Link>
  );
}
