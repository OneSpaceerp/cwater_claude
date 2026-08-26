import type { SVGProps } from 'react';
import type { IconKey } from '@/content/types';
import { cn } from '@/lib/utils';

/**
 * Technical icon set.
 *
 * Drawn as schematic line glyphs on a 24-unit grid with a uniform 1.5 stroke,
 * so they read as instrumentation symbols on a P&ID rather than as generic
 * interface icons. Geometry is deliberately orthogonal; curves appear only
 * where the subject is water.
 */

const PATHS: Record<IconKey, React.ReactNode> = {
  droplet: (
    <>
      <path d="M12 3.5c3 3.9 5 6.7 5 9.1a5 5 0 0 1-10 0c0-2.4 2-5.2 5-9.1Z" />
      <path d="M9.5 13.4a2.6 2.6 0 0 0 2.5 2.9" />
    </>
  ),
  filter: (
    <>
      <rect x="4" y="3.5" width="16" height="17" rx="1" />
      <path d="M4 8h16M4 16h16" />
      <path d="M7.5 8v8M12 8v8M16.5 8v8" strokeDasharray="1.5 2" />
      <path d="M12 1.5v2M12 20.5v2" />
    </>
  ),
  flask: (
    <>
      <path d="M9.5 3v6.2L4.6 17.8A1.7 1.7 0 0 0 6.1 20.5h11.8a1.7 1.7 0 0 0 1.5-2.7L14.5 9.2V3" />
      <path d="M8 3h8" />
      <path d="M7.2 15h9.6" />
      <circle cx="10.5" cy="17.2" r=".9" />
      <circle cx="13.8" cy="18" r=".6" />
    </>
  ),
  pump: (
    <>
      <rect x="3.5" y="9" width="10" height="9" rx="1" />
      <path d="M13.5 13.5h5.5a1.5 1.5 0 0 0 1.5-1.5V4.5" />
      <path d="M8.5 9V5.5h6" />
      <circle cx="8.5" cy="13.5" r="2.4" />
      <path d="M8.5 11.1v2.4l1.8 1" />
      <path d="M18.5 2.5 20.5 4.5 18.5 6.5" />
    </>
  ),
  sensor: (
    <>
      <path d="M11 3.5h2v9h-2z" />
      <path d="M10 12.5h4l-2 8-2-8Z" />
      <path d="M16 5.5a5.5 5.5 0 0 1 0 6M19 3.5a9 9 0 0 1 0 10" />
      <path d="M8 5.5a5.5 5.5 0 0 0 0 6M5 3.5a9 9 0 0 0 0 10" />
    </>
  ),
  controller: (
    <>
      <rect x="3" y="4" width="18" height="14" rx="1.2" />
      <path d="M3 8.5h18" />
      <path d="M6.5 12h4M6.5 14.8h6.5" />
      <circle cx="17" cy="13.4" r="2.2" />
      <path d="M17 11.6v1.8l1.2.8" />
      <path d="M6 6.2h1.5M9.5 6.2H11" />
      <path d="M8 18v2.5M16 18v2.5M6 20.5h12" />
    </>
  ),
  monitor: (
    <>
      <rect x="2.5" y="4.5" width="19" height="12.5" rx="1.2" />
      <path d="M5.5 13.5 8 10l2.4 2.6L13 7.5l2.4 4.4 1.6-1.9h1.5" />
      <path d="M8.5 20.5h7M12 17v3.5" />
    </>
  ),
  optimize: (
    <>
      <path d="M3 20.5V4" />
      <path d="M3 20.5h18" />
      <path d="M6 16.5c2.8 0 3.6-5.4 6-5.4s3.4 3 6-3.6" />
      <path d="M15.6 7.5H18v2.4" />
      <circle cx="12" cy="11.1" r="1.3" />
    </>
  ),
  scale: (
    <>
      <path d="M3.5 18.5h17" />
      <path d="M3.5 18.5V9.5h17v9" />
      <path d="M5.5 18.5c0-2.2 1.2-3.4 2.6-3.4s2 1.4 3.4 1.4 2-1.9 3.5-1.9 2.4 1.6 3.5 1.6" />
      <path d="M6.5 12.4h2.2M11 12.4h2.4M15.6 12.4h2" />
      <path d="M12 3v4.5M9.4 5.2 12 7.6l2.6-2.4" />
    </>
  ),
  corrosion: (
    <>
      <path d="M3.5 6.5h17v11h-17z" />
      <path d="M3.5 12.6c1.6.1 2-1.4 3.4-1.4 1.5 0 1.6 2 3.2 2s1.9-2.4 3.4-2.4 2 1.8 3.4 1.8 1.9-1.2 3.6-1.1" />
      <path d="M7 16.4l1.1-1.6M11 16.8l.9-1.4M15.4 16.2l1-1.5" strokeLinecap="round" />
      <path d="M6.4 9.2h1.4M10.8 9.2h2M16 9.2h1.6" strokeLinecap="round" />
    </>
  ),
  biology: (
    <>
      <circle cx="8" cy="9" r="3.2" />
      <circle cx="15.6" cy="14.4" r="4" />
      <path d="M8 5.8V3.4M8 12.2v2M4.8 9H2.6M11.2 9h1.6" />
      <circle cx="8" cy="9" r=".9" />
      <circle cx="15.6" cy="14.4" r="1.1" />
      <path d="M18.6 11.4 20.8 9.2M12.6 17.4l-2.2 2.2" />
    </>
  ),
  fouling: (
    <>
      <path d="M4 4.5v15M20 4.5v15" />
      <path d="M4 8.6c2.4 0 2.6 2 5 2s2.6-2 5-2 2.6 1.6 6 1.6" />
      <path d="M4 15.4c3.4 0 3.2-1.8 6-1.8s3 1.8 5.4 1.8 3-1.2 4.6-1.2" />
      <circle cx="8.5" cy="12" r=".8" />
      <circle cx="13" cy="12.4" r="1.1" />
      <circle cx="17" cy="11.6" r=".7" />
    </>
  ),
  gauge: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 12l4.4-3.6" />
      <circle cx="12" cy="12" r="1.2" />
      <path d="M6.2 17.8 7.6 16.4M17.8 17.8l-1.4-1.4M12 3.5v2M4 12h1.8M18.2 12H20" />
    </>
  ),
  flow: (
    <>
      <path d="M2.5 8.5h19M2.5 15.5h19" />
      <path d="M6 12h6" />
      <path d="M10.4 10 12.5 12l-2.1 2" />
      <path d="M15 12h3.5" />
      <path d="M16.9 10 19 12l-2.1 2" />
    </>
  ),
  energy: (
    <>
      <path d="M13.4 2.5 5.5 13.5h5.4l-.8 8 8-11.2h-5.4l.7-7.8Z" />
    </>
  ),
  shield: (
    <>
      <path d="M12 2.8 4.5 6v6.2c0 4.3 3 7.6 7.5 9 4.5-1.4 7.5-4.7 7.5-9V6L12 2.8Z" />
      <path d="M8.8 11.8 11.2 14.3l4-4.6" />
    </>
  ),
  wrench: (
    <>
      <path d="M15.6 3.4a5.2 5.2 0 0 0-6 7.3L3.4 16.9a2 2 0 0 0 0 2.8l.9.9a2 2 0 0 0 2.8 0l6.2-6.2a5.2 5.2 0 0 0 7.3-6l-3.2 3.2-2.9-.8-.8-2.9 3.2-3.2Z" />
    </>
  ),
  lab: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="1" />
      <path d="M8 3v5.4a2 2 0 0 1-.4 1.2L6.2 11.4" />
      <path d="M13 7h4M13 10.5h4M7 15h10M7 18h6" />
      <circle cx="9.6" cy="8.2" r="1.6" />
    </>
  ),
  blueprint: (
    <>
      <rect x="2.5" y="4" width="19" height="16" rx="1" />
      <path d="M2.5 8h19" />
      <path d="M6 11.5h5v5H6z" />
      <path d="M14 11.5h4M14 14.5h4M14 17.5h2.5" />
      <path d="M5 6h1.4M8 6h1.4" />
    </>
  ),
  network: (
    <>
      <circle cx="12" cy="4.6" r="2.1" />
      <circle cx="4.6" cy="18" r="2.1" />
      <circle cx="19.4" cy="18" r="2.1" />
      <circle cx="12" cy="12" r="2.1" />
      <path d="M12 6.7v3.2M10.4 13.6 6.2 16.6M13.6 13.6l4.2 3" />
      <path d="M6.7 18h10.6" strokeDasharray="1.5 2" />
    </>
  ),
  boiler: (
    <>
      <rect x="5" y="7" width="14" height="13" rx="1.4" />
      <path d="M5 11.5h14" />
      <path d="M9 20v1.5M15 20v1.5" />
      <path d="M8.5 15.2c1.2 0 1.2 1.4 2.4 1.4s1.2-1.4 2.4-1.4 1.2 1.2 2.2 1.2" />
      <path d="M9.5 7V4.4M14.5 7V4.4" />
      <path d="M9.5 4.4c0-1.2 1-1.2 1-2M14.5 4.4c0-1.2 1-1.2 1-2" />
    </>
  ),
  tower: (
    <>
      <path d="M5.5 3.5h13l-2.4 17H7.9L5.5 3.5Z" />
      <path d="M6.4 9.5h11.2" />
      <path d="M7.6 14.4h8.8" />
      <path d="M9 3.5c0-1 .8-1.6 1.4-2.2M13 3.5c0-1 .8-1.6 1.4-2.2" />
      <path d="M3 20.5h18" />
    </>
  ),
  membrane: (
    <>
      <rect x="2.5" y="7" width="19" height="10" rx="5" />
      <path d="M8 7v10M13 7v10" strokeDasharray="1.5 2" />
      <path d="M2.5 12h3M18 12h3.5" />
      <path d="M15.5 9.6h3.4M15.5 14.4h2.2" />
    </>
  ),
  recycle: (
    <>
      <path d="M7.5 5.6 9.8 9.6H5.2L7.5 5.6Z" />
      <path d="M5.2 9.6 3.2 13a2 2 0 0 0 1.7 3h3.3" />
      <path d="M9.8 9.6h4.4l2 3.4" />
      <path d="M16.2 13h4.6l-2.3 4-2.3-4Z" />
      <path d="M8.2 16 6.4 19M18.5 17l-2 3.4a2 2 0 0 1-1.7 1h-3.6" />
      <path d="M12.8 19.4 11 21.4l1.8 1.4" />
    </>
  ),
  factory: (
    <>
      <path d="M2.5 20.5V10l6 3.6V10l6 3.6V6.5h7v14h-19Z" />
      <path d="M17.5 6.5V3h2v3.5" />
      <path d="M6 16.6h1.6M11 16.6h1.6M16 16.6h2.4" />
    </>
  ),
  clipboard: (
    <>
      <rect x="4.5" y="4" width="15" height="17" rx="1.2" />
      <path d="M9 4V2.8h6V4" />
      <path d="M8 10h8M8 13.5h8M8 17h5" />
    </>
  ),
};

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  name: IconKey;
  /** Rendered size in px. Stroke stays optically even across sizes. */
  size?: number;
  /** Accessible label. When omitted the icon is hidden from assistive tech. */
  title?: string;
}

export function Icon({ name, size = 24, title, className, ...rest }: IconProps) {
  const node = PATHS[name];
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
      className={cn('shrink-0', className)}
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      {node}
    </svg>
  );
}

/** Directional chevron that flips with writing direction. */
export function Arrow({ size = 16, className, ...rest }: Omit<SVGProps<SVGSVGElement>, 'name'> & { size?: number }) {
  return (
    <svg
      viewBox="0 0 16 16"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden
      className={cn('dir-flip shrink-0', className)}
      {...rest}
    >
      <path d="M2 8h11M9.5 4.5 13 8l-3.5 3.5" />
    </svg>
  );
}
