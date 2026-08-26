import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Merge conditional class names with Tailwind conflict resolution. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Zero-padded sequence label used throughout the technical layouts: 01, 02… */
export function pad(n: number): string {
  return String(n).padStart(2, '0');
}

/** Stable, dependency-free id for form fields and aria wiring. */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/[\s_]+/g, '-');
}

/** Pick entries from a record by slug, preserving the requested order. */
export function pickBySlug<T extends { slug: string }>(all: readonly T[], slugs: readonly string[]): T[] {
  const index = new Map(all.map((item) => [item.slug, item]));
  return slugs.map((slug) => index.get(slug)).filter((item): item is T => Boolean(item));
}

/** Format an ISO date for display in the active locale. */
export function formatDate(iso: string, locale: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat(locale === 'ar' ? 'ar-EG' : 'en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}
