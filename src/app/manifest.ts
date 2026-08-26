import type { MetadataRoute } from 'next';
import { withBasePath } from '@/lib/base-path';

/* Emitted as a file at build time — the static export has no route handlers. */
export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'C-Water — Water Treatment',
    short_name: 'C-Water',
    description:
      'Water treatment engineered around your operation. Chemistry, filtration, dosing, measurement and control for industrial and commercial water systems.',
    start_url: withBasePath('/en'),
    display: 'standalone',
    background_color: '#050B12',
    theme_color: '#050B12',
    icons: [
      { src: withBasePath('/brand/icon-192.png'), sizes: '192x192', type: 'image/png' },
      { src: withBasePath('/brand/c-water-mark.png'), sizes: '512x512', type: 'image/png' },
    ],
  };
}
