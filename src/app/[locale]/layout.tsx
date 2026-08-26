import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { Archivo, Inter, IBM_Plex_Mono, Cairo } from 'next/font/google';
import type { ReactNode } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ConversionBar } from '@/components/layout/ConversionBar';
import { AnalyticsProvider } from '@/components/layout/AnalyticsProvider';
import { company, SITE_URL } from '@/content/site';
import { withBasePath } from '@/lib/base-path';
import { isLocale, LOCALES, LOCALE_META, type Locale } from '@/lib/i18n';
import { organizationSchema, websiteSchema } from '@/lib/seo';
import { cn } from '@/lib/utils';

/**
 * Typography.
 *
 * Archivo carries the editorial headlines — an industrial grotesque with tight
 * apertures that holds up at display sizes. Inter takes the technical body
 * copy. IBM Plex Mono handles every label, spec key and instrument readout,
 * which is what gives the interface its measured, engineered register.
 *
 * Cairo carries the Arabic locale — a contemporary Arabic sans with a low,
 * even stroke contrast and open counters that hold up from 11px labels to a
 * 96px display headline. Arabic is set in a typeface designed for it, not in a
 * Latin face with fallback glyphs.
 *
 * All four are self-hosted by next/font: no external requests, no layout shift.
 */
const archivo = Archivo({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-archivo',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
  display: 'swap',
});

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cairo',
  display: 'swap',
});

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: '#050B12',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default:
        locale === 'ar'
          ? 'C-Water | معالجة المياه والحلول المائية الصناعية في مصر'
          : 'C-Water | Water Treatment & Industrial Water Solutions in Egypt',
      template: locale === 'ar' ? '%s | C-Water' : '%s | C-Water',
    },
    description:
      locale === 'ar'
        ? 'تجمع C-Water بين الخبرة الهندسية المحلية وتقنيات معالجة المياه العالمية — كيمياء وترشيح وجرعات وقياس وتحكم — لتصميم أنظمة مياه صناعية وتجارية تعمل بموثوقية أعلى.'
        : 'C-Water combines local engineering expertise with international water-treatment technologies — chemistry, filtration, dosing, measurement and control — to design industrial and commercial water systems that perform.',
    applicationName: company.name,
    authors: [{ name: company.name }],
    creator: company.name,
    publisher: company.name,
    formatDetection: { telephone: false, address: false, email: false },
    icons: {
      icon: [
        { url: withBasePath('/brand/icon-32.png'), sizes: '32x32', type: 'image/png' },
        { url: withBasePath('/brand/icon-192.png'), sizes: '192x192', type: 'image/png' },
      ],
      apple: [{ url: withBasePath('/brand/icon-180.png'), sizes: '180x180', type: 'image/png' }],
    },
    manifest: withBasePath('/manifest.webmanifest'),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const { dir, htmlLang } = LOCALE_META[locale];

  return (
    <html
      lang={htmlLang}
      dir={dir}
      className={cn(archivo.variable, inter.variable, plexMono.variable, cairo.variable)}
      suppressHydrationWarning
    >
      <body className="min-h-screen antialiased">
        {/* Organization and WebSite schema, emitted once per document. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationSchema(locale), websiteSchema(locale)]),
          }}
        />
        <AnalyticsProvider />
        <Header locale={locale} />
        <main id="main">{children}</main>
        <Footer locale={locale} />
        <ConversionBar locale={locale} />
      </body>
    </html>
  );
}
