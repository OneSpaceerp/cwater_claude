/**
 * The subdirectory the site is served from, or '' at a domain root.
 *
 * Next applies `basePath` to everything it generates — `<Link>`, `next/image`,
 * script and stylesheet URLs — but it cannot touch a string handed to `fetch()`
 * or written into a manifest by hand. Those few places import from here so the
 * prefix comes from one source instead of being remembered case by case.
 *
 * Read from the environment rather than from next.config.ts because
 * `NEXT_PUBLIC_*` variables are inlined into the client bundle at build time,
 * which is the only way a browser-side `fetch` can know the prefix in a static
 * export.
 */
const raw = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

/** '' or '/segment' — never a trailing slash, always a leading one. */
export const BASE_PATH = raw ? `/${raw.replace(/^\/+/, '').replace(/\/+$/, '')}` : '';

/** Prefixes an absolute site path with the base path. */
export function withBasePath(path: string): string {
  return `${BASE_PATH}${path.startsWith('/') ? path : `/${path}`}`;
}
