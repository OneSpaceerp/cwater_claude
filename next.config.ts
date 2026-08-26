import type { NextConfig } from 'next';

/**
 * One codebase, two deployment shapes.
 *
 *   Vercel (default)      A normal Next build. Route handlers run, images are
 *                         optimised, headers and redirects are served by Next.
 *
 *   NEXT_OUTPUT_EXPORT=1  A static export for cPanel shared hosting: prerendered
 *                         HTML only, no Node process. Route handlers cannot
 *                         exist in this build — see `pageExtensions` below — so
 *                         the forms post to public/api/leads.php instead, and
 *                         headers and redirects move to .htaccess.
 *
 * `scripts/build-deploy.mjs` sets the variable; nothing else should.
 */
const isExport = process.env.NEXT_OUTPUT_EXPORT === '1';

/**
 * Set NEXT_PUBLIC_BASE_PATH when the site is served from a subdirectory rather
 * than a domain root — `/cwaterv2` for the cPanel test copy, empty everywhere
 * else. Read here and, for the handful of URLs Next cannot rewrite on its own,
 * in `src/lib/base-path.ts`.
 */
const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const basePath = rawBasePath ? `/${rawBasePath.replace(/^\/+/, '').replace(/\/+$/, '')}` : '';

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
];

/*
 * SITE_NOINDEX=1 keeps a deployment out of every search index. Set it on
 * anything that is not the address the brand is meant to be found at — a
 * *.vercel.app URL serving the whole site would otherwise compete with the real
 * domain and split its ranking signals. The static export carries the same
 * header through .htaccess instead.
 */
const noindex = process.env.SITE_NOINDEX === '1';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  ...(basePath ? { basePath } : {}),

  /**
   * The lead route is named `route.node.ts`, and `node.ts` is only a recognised
   * page extension outside the export build. A POST handler cannot be
   * prerendered, so its mere presence would fail `output: 'export'` — this is
   * how one app directory serves both shapes without moving files around.
   */
  pageExtensions: isExport
    ? ['tsx', 'ts', 'jsx', 'js']
    : ['node.ts', 'tsx', 'ts', 'jsx', 'js'],

  ...(isExport
    ? {
        output: 'export' as const,
        /* No image optimiser in a static export: files are served as authored. */
        images: { unoptimized: true },
      }
    : {
        images: {
          formats: ['image/avif' as const, 'image/webp' as const],
          deviceSizes: [360, 480, 640, 828, 1080, 1280, 1600, 1920, 2560],
        },
        async headers() {
          const headers = noindex
            ? [...securityHeaders, { key: 'X-Robots-Tag', value: 'noindex, nofollow' }]
            : securityHeaders;
          return [{ source: '/:path*', headers }];
        },
        async redirects() {
          /* The site has no locale-neutral homepage; English is the default
             entry. Temporary, so adding language negotiation later is not
             fighting a permanent redirect cached in every browser. */
          return [{ source: '/', destination: '/en', permanent: false }];
        },
      }),
};

export default nextConfig;
