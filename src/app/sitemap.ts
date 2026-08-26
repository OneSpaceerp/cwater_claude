import type { MetadataRoute } from 'next';
import { articles } from '@/content/articles';
import { industries } from '@/content/industries';
import { partners } from '@/content/partners';
import { products } from '@/content/products';
import { projects } from '@/content/projects';
import { services } from '@/content/services';
import { SITE_URL } from '@/content/site';
import { solutions } from '@/content/solutions';
import { technologies } from '@/content/technologies';
import { LOCALES, localePath } from '@/lib/i18n';

/* Emitted as a file at build time — the static export has no route handlers. */
export const dynamic = 'force-static';

/**
 * XML sitemap.
 *
 * Every URL is emitted once per locale with a complete `alternates.languages`
 * map, so search engines see the two language versions as equivalents rather
 * than as duplicates.
 */
interface SitemapEntry {
  path: string;
  priority: number;
  changeFrequency: 'weekly' | 'monthly' | 'yearly';
  lastModified?: Date;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths: SitemapEntry[] = [
    { path: '', priority: 1, changeFrequency: 'weekly' as const },
    { path: 'solutions', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: 'industries', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: 'technologies', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: 'products', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: 'partners', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: 'services', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: 'projects', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: 'knowledge', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: 'about', priority: 0.6, changeFrequency: 'yearly' as const },
    { path: 'contact', priority: 0.8, changeFrequency: 'yearly' as const },
    { path: 'request-solution', priority: 0.9, changeFrequency: 'yearly' as const },
    { path: 'request-quote', priority: 0.9, changeFrequency: 'yearly' as const },
  ];

  const collections: SitemapEntry[] = [
    ...solutions.map((s) => ({ path: `solutions/${s.slug}`, priority: 0.85, changeFrequency: 'monthly' as const })),
    ...industries.map((i) => ({ path: `industries/${i.slug}`, priority: 0.8, changeFrequency: 'monthly' as const })),
    ...technologies.map((t) => ({ path: `technologies/${t.slug}`, priority: 0.8, changeFrequency: 'monthly' as const })),
    ...products.map((p) => ({ path: `products/${p.slug}`, priority: 0.75, changeFrequency: 'monthly' as const })),
    ...partners.map((p) => ({ path: `partners/${p.slug}`, priority: 0.7, changeFrequency: 'monthly' as const })),
    ...services.map((s) => ({ path: `services/${s.slug}`, priority: 0.75, changeFrequency: 'monthly' as const })),
    ...projects.map((p) => ({ path: `projects/${p.slug}`, priority: 0.6, changeFrequency: 'monthly' as const })),
    ...articles.map((a) => ({
      path: `knowledge/${a.slug}`,
      priority: 0.7,
      changeFrequency: 'monthly' as const,
      lastModified: new Date(a.updatedAt ?? a.publishedAt),
    })),
  ];

  const all = [...staticPaths, ...collections];
  const now = new Date();

  return all.flatMap((entry) =>
    LOCALES.map((locale) => ({
      url: `${SITE_URL}${localePath(locale, entry.path)}`,
      lastModified: entry.lastModified ?? now,
      changeFrequency: entry.changeFrequency,
      priority: entry.priority,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((alt) => [alt, `${SITE_URL}${localePath(alt, entry.path)}`]),
        ),
      },
    })),
  );
}
