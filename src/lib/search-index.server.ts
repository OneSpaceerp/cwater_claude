import type { Locale } from '@/lib/i18n';
import type { SlimRecord } from '@/lib/search';

/**
 * Search index construction.
 *
 * BUILD-TIME ONLY. Importing this from a client component would pull the whole
 * content corpus (~700 KB of source) into the browser bundle — the reason the
 * matching logic lives separately in `search.ts`.
 *
 * The `server-only` guard is deliberately absent: `scripts/build-search-index.ts`
 * runs this in plain Node, outside the Next module graph, to emit the static
 * JSON a static export serves. The separation is enforced by the module split
 * and by the fact that nothing under `components/` imports this file.
 */
/** Trim keyword blobs so the downloaded index stays small. */
function trim(value: string, max = 260): string {
  return value.length <= max ? value : value.slice(0, max);
}

/**
 * Build the slim index for one locale.
 *
 * Server-only: this pulls in every content module. Call it from a server
 * component, a route handler or `generateStaticParams` — never from a
 * component marked `'use client'`.
 */
export async function buildSearchIndex(locale: Locale): Promise<SlimRecord[]> {
  const [
    { solutions },
    { industries },
    { technologies },
    { products },
    { partners },
    { services },
    { projects },
    { articles },
  ] = await Promise.all([
    import('@/content/solutions'),
    import('@/content/industries'),
    import('@/content/technologies'),
    import('@/content/products'),
    import('@/content/partners'),
    import('@/content/services'),
    import('@/content/projects'),
    import('@/content/articles'),
  ]);

  const out: SlimRecord[] = [];
  const L = <T>(value: Record<Locale, T>) => value[locale] ?? value.en;

  for (const s of solutions) {
    out.push({
      i: `solution:${s.slug}`,
      k: 'solution',
      t: L(s.title),
      s: L(s.summary),
      h: `solutions/${s.slug}`,
      w: trim([L(s.headline), L(s.intro), ...s.problems.map((p) => L(p.label)), ...s.problemTags].join(' ')),
    });
  }

  for (const i of industries) {
    out.push({
      i: `industry:${i.slug}`,
      k: 'industry',
      t: L(i.title),
      s: L(i.summary),
      h: `industries/${i.slug}`,
      w: trim([L(i.headline), L(i.intro), ...i.challenges.map((c) => L(c.label))].join(' ')),
    });
  }

  for (const tech of technologies) {
    out.push({
      i: `technology:${tech.slug}`,
      k: 'technology',
      t: L(tech.title),
      s: L(tech.summary),
      h: `technologies/${tech.slug}`,
      w: trim([L(tech.headline), L(tech.whatItSolves), ...tech.applications.map((a) => L(a))].join(' ')),
    });
  }

  for (const p of products) {
    out.push({
      i: `product:${p.slug}`,
      k: 'product',
      t: p.name,
      s: L(p.positioning),
      h: `products/${p.slug}`,
      w: trim([p.name, p.partner, p.category, L(p.overview), ...p.applications.map((a) => L(a))].join(' ')),
    });
    for (const doc of p.documents) {
      out.push({
        i: `document:${p.slug}:${doc.id}`,
        k: 'document',
        t: L(doc.title),
        s: p.name,
        h: `products/${p.slug}#documents`,
        w: trim(`${L(doc.title)} ${p.name} ${doc.kind}`, 120),
      });
    }
  }

  for (const p of partners) {
    out.push({
      i: `partner:${p.slug}`,
      k: 'partner',
      t: L(p.title),
      s: L(p.summary),
      h: `partners/${p.slug}`,
      w: trim([p.legalName, L(p.motto), L(p.capability), ...p.categories.map((c) => L(c))].join(' ')),
    });
  }

  for (const s of services) {
    out.push({
      i: `service:${s.slug}`,
      k: 'service',
      t: L(s.title),
      s: L(s.summary),
      h: `services/${s.slug}`,
      w: trim([L(s.headline), L(s.whatItIs), L(s.verb)].join(' ')),
    });
  }

  for (const p of projects) {
    out.push({
      i: `project:${p.slug}`,
      k: 'project',
      t: L(p.title),
      s: L(p.summary),
      h: `projects/${p.slug}`,
      w: trim([L(p.challenge), L(p.insight), p.industry, p.solution].join(' ')),
    });
  }

  for (const a of articles) {
    out.push({
      i: `article:${a.slug}`,
      k: 'article',
      t: L(a.title),
      s: L(a.summary),
      h: `knowledge/${a.slug}`,
      w: trim(
        [L(a.question), a.category, ...a.sections.map((s) => L(s.heading)), ...a.faqs.map((f) => L(f.question))].join(
          ' ',
        ),
      ),
    });
  }

  return out;
}
