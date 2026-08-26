/**
 * Bilingual routing and dictionary access.
 *
 * Arabic is a first-class locale, not a translation layer: every content
 * record carries an `ar` field authored alongside `en`, and layout direction
 * is derived from the locale rather than patched on afterwards.
 */

export const LOCALES = ['en', 'ar'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';

export const LOCALE_META: Record<
  Locale,
  { label: string; nativeLabel: string; dir: 'ltr' | 'rtl'; htmlLang: string; ogLocale: string }
> = {
  en: { label: 'English', nativeLabel: 'English', dir: 'ltr', htmlLang: 'en', ogLocale: 'en_US' },
  ar: { label: 'Arabic', nativeLabel: 'العربية', dir: 'rtl', htmlLang: 'ar', ogLocale: 'ar_EG' },
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export function dirFor(locale: Locale): 'ltr' | 'rtl' {
  return LOCALE_META[locale].dir;
}

/** A value authored in both launch languages. */
export type Localized<T = string> = Record<Locale, T>;

/** Resolve a localized value, falling back to English if a field is empty. */
export function t<T>(value: Localized<T>, locale: Locale): T {
  const resolved = value[locale];
  if (resolved === undefined || resolved === null || resolved === '') {
    return value[DEFAULT_LOCALE];
  }
  return resolved;
}

/** Build a locale-prefixed href. Accepts paths with or without a leading slash. */
export function localePath(locale: Locale, path = ''): string {
  const clean = path.replace(/^\/+/, '').replace(/\/+$/, '');
  return clean ? `/${locale}/${clean}` : `/${locale}`;
}

/** Swap the locale segment of a pathname, preserving the rest of the route. */
export function swapLocale(pathname: string, next: Locale): string {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length > 0 && isLocale(segments[0])) {
    segments[0] = next;
    return `/${segments.join('/')}`;
  }
  return localePath(next, pathname);
}
