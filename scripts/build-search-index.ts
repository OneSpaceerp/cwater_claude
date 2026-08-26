import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { buildSearchIndex } from '../src/lib/search-index.server';
import { LOCALES } from '../src/lib/i18n';

/**
 * Writes the search index to `public/` as static JSON, one file per locale.
 *
 * A static export has no route handlers, so the index cannot be served from
 * /api/search-index/[locale] as it is on a Node deployment. Generating it here
 * — before `next build` — puts plain files in the output that Apache serves
 * directly, which is both simpler and faster than a route ever was.
 *
 * Run automatically by the `prebuild` npm script.
 */
async function main() {
  const outDir = join(process.cwd(), 'public');
  await mkdir(outDir, { recursive: true });

  for (const locale of LOCALES) {
    const index = await buildSearchIndex(locale);
    const file = join(outDir, `search-index-${locale}.json`);
    // No pretty-printing: this file is downloaded by the browser.
    await writeFile(file, JSON.stringify(index), 'utf8');
    const bytes = Buffer.byteLength(JSON.stringify(index));
    console.log(`  search-index-${locale}.json  ${index.length} records, ${(bytes / 1024).toFixed(0)} KB`);
  }
}

main().catch((error) => {
  console.error('Failed to build the search index:', error);
  process.exit(1);
});
