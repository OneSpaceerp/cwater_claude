import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/content/site';
import { withBasePath } from '@/lib/base-path';

/* Emitted as a file at build time — the static export has no route handlers. */
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Search results have no stable content of their own to index.
        disallow: [withBasePath('/api/'), withBasePath('/en/search'), withBasePath('/ar/search')],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
