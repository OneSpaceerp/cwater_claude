import type { Metadata } from 'next';
import { company, SITE_URL } from '@/content/site';
import { LOCALES, LOCALE_META, localePath, t, type Locale, type Localized } from '@/lib/i18n';

/**
 * Metadata and structured data.
 *
 * Every page builds its metadata through `pageMetadata`, which guarantees a
 * canonical URL, a complete hreflang set covering both locales plus x-default,
 * and Open Graph / Twitter cards that agree with the page's own title.
 */

interface PageMetaInput {
  locale: Locale;
  /** Path without the locale prefix, e.g. "solutions/cooling-water". */
  path: string;
  title: Localized;
  description: Localized;
  /** Absolute or root-relative image path. Falls back to the brand card. */
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  noIndex?: boolean;
}

export function pageMetadata({
  locale,
  path,
  title,
  description,
  image = '/brand/og-default.png',
  type = 'website',
  publishedTime,
  modifiedTime,
  noIndex,
}: PageMetaInput): Metadata {
  const canonical = `${SITE_URL}${localePath(locale, path)}`;
  const languages = Object.fromEntries(
    LOCALES.map((code) => [LOCALE_META[code].htmlLang, `${SITE_URL}${localePath(code, path)}`]),
  );

  const resolvedTitle = t(title, locale);
  const resolvedDescription = t(description, locale);

  return {
    /* `absolute` bypasses the layout's title template: every page title in the
       content model already carries the "| C-Water" suffix, and letting the
       template append a second one produced "… | C-Water | C-Water". */
    title: { absolute: resolvedTitle },
    description: resolvedDescription,
    alternates: {
      canonical,
      languages: { ...languages, 'x-default': `${SITE_URL}${localePath('en', path)}` },
    },
    openGraph: {
      type,
      title: resolvedTitle,
      description: resolvedDescription,
      url: canonical,
      siteName: company.name,
      locale: LOCALE_META[locale].ogLocale,
      alternateLocale: LOCALES.filter((c) => c !== locale).map((c) => LOCALE_META[c].ogLocale),
      images: [{ url: image, width: 1200, height: 630, alt: resolvedTitle }],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: resolvedTitle,
      description: resolvedDescription,
      images: [image],
    },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}

/* -------------------------------------------------------------------------- */
/* Structured data                                                             */
/* -------------------------------------------------------------------------- */

type Json = Record<string, unknown>;

/**
 * Organization schema.
 *
 * Contact points, addresses and identifiers are emitted only where C-Water
 * publishes them. Nothing is invented to satisfy a schema property — an absent
 * field is preferable to a fabricated one.
 */
export function organizationSchema(locale: Locale): Json {
  const schema: Json = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: company.name,
    url: SITE_URL,
    logo: `${SITE_URL}/brand/c-water-logo.png`,
    description: t(
      {
        en: 'C-Water combines local engineering expertise with international water-treatment technologies to design, control, optimise and support industrial and commercial water systems.',
        ar: 'تجمع C-Water بين الخبرة الهندسية المحلية وتقنيات معالجة المياه العالمية لتصميم أنظمة المياه الصناعية والتجارية والتحكم فيها وتحسينها ودعمها.',
      },
      locale,
    ),
    email: company.email,
    areaServed: t(company.country, locale),
    sameAs: Object.values(company.social),
  };

  schema.telephone = company.phones.map((phone) => phone.tel);
  schema.address = {
    '@type': 'PostalAddress',
    streetAddress: t(company.address.street, locale),
    addressLocality: t(company.address.locality, locale),
    addressCountry: company.address.countryCode,
  };
  schema.contactPoint = company.phones.map((phone) => ({
    '@type': 'ContactPoint',
    telephone: phone.tel,
    email: company.email,
    contactType: 'sales',
    areaServed: company.address.countryCode,
    availableLanguage: ['en', 'ar'],
  }));
  return schema;
}

export function websiteSchema(locale: Locale): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: `${SITE_URL}${localePath(locale)}`,
    name: company.name,
    inLanguage: LOCALE_META[locale].htmlLang,
    publisher: { '@id': `${SITE_URL}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}${localePath(locale, 'search')}?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  };
}

export interface Crumb {
  label: string;
  href: string;
}

export function breadcrumbSchema(crumbs: Crumb[]): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.label,
      item: `${SITE_URL}${crumb.href}`,
    })),
  };
}

export function articleSchema({
  locale,
  slug,
  headline,
  description,
  publishedAt,
  updatedAt,
}: {
  locale: Locale;
  slug: string;
  headline: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
}): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline,
    description,
    inLanguage: LOCALE_META[locale].htmlLang,
    datePublished: publishedAt,
    dateModified: updatedAt ?? publishedAt,
    author: { '@id': `${SITE_URL}/#organization` },
    publisher: { '@id': `${SITE_URL}/#organization` },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}${localePath(locale, `knowledge/${slug}`)}` },
  };
}

/**
 * Product schema.
 *
 * Deliberately omits `offers`, `price` and `aggregateRating`: this is a
 * technical catalogue with an RFQ flow, not a shop, and emitting commercial
 * properties that do not exist would be misleading to both search engines and
 * buyers.
 */
export function productSchema({
  locale,
  slug,
  name,
  description,
  brand,
  category,
}: {
  locale: Locale;
  slug: string;
  name: string;
  description: string;
  brand: string;
  category: string;
}): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    brand: { '@type': 'Brand', name: brand },
    category,
    url: `${SITE_URL}${localePath(locale, `products/${slug}`)}`,
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]): Json | null {
  if (faqs.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

export function serviceSchema({
  locale,
  slug,
  name,
  description,
}: {
  locale: Locale;
  slug: string;
  name: string;
  description: string;
}): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: t(company.country, locale),
    url: `${SITE_URL}${localePath(locale, `services/${slug}`)}`,
  };
}
