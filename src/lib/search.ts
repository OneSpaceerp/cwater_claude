import type { SearchKind } from '@/content/types';
import type { Localized } from '@/lib/i18n';

/**
 * Site search — matching half.
 *
 * This module is imported by the header's search dialog, so it must stay free
 * of content imports. Index construction lives in `search-index.server.ts`:
 * keeping the two together put every content module into the client graph,
 * because the dynamic `import()` calls inside the builder are still part of
 * this module's dependency graph even when the function is never called.
 *
 * `SlimRecord` is what crosses the wire: short field names and truncated
 * keywords, because the index is downloaded by the browser.
 */

export interface SlimRecord {
  /** id */
  i: string;
  /** kind */
  k: SearchKind;
  /** title */
  t: string;
  /** summary */
  s: string;
  /** href, without the locale prefix */
  h: string;
  /** keywords */
  w: string;
}

export interface SearchHit {
  record: SlimRecord;
  score: number;
}

/* -------------------------------------------------------------------------- */
/* Matching — pure, shared by server and client                                */
/* -------------------------------------------------------------------------- */

/** Normalise for matching: lowercase, strip Arabic diacritics, unify letterforms. */
export function normalise(input: string): string {
  return input
    .toLowerCase()
    .replace(/[ً-ٰٟ]/g, '') // Arabic diacritics
    .replace(/[آأإٱ]/g, 'ا') // alef variants → bare alef
    .replace(/ى/g, 'ي') // alef maqsura → ya
    .replace(/ة/g, 'ه') // ta marbuta → ha
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Score each record against the query tokens.
 * Title matches weigh most, then summary, then keywords — so a product name
 * outranks an article that merely mentions it.
 */
export function searchRecords(records: readonly SlimRecord[], query: string, limit = 40): SearchHit[] {
  const tokens = normalise(query).split(' ').filter((token) => token.length > 1);
  if (tokens.length === 0) return [];

  const hits: SearchHit[] = [];

  for (const record of records) {
    const title = normalise(record.t);
    const summary = normalise(record.s);
    const keywords = normalise(record.w);

    let score = 0;
    let matched = 0;

    for (const token of tokens) {
      let tokenScore = 0;
      if (title.includes(token)) tokenScore += title.startsWith(token) ? 14 : 10;
      if (summary.includes(token)) tokenScore += 4;
      if (keywords.includes(token)) tokenScore += 2;
      if (tokenScore > 0) matched += 1;
      score += tokenScore;
    }

    if (matched === 0) continue;
    // Reward records that matched every token in the query.
    if (matched === tokens.length) score *= 1.6;
    hits.push({ record, score });
  }

  return hits.sort((a, b) => b.score - a.score).slice(0, limit);
}

/** Group hits by content type, preserving relevance order within each group. */
export function groupHits(hits: SearchHit[]): { kind: SearchKind; hits: SearchHit[] }[] {
  const order: SearchKind[] = [
    'solution',
    'technology',
    'product',
    'industry',
    'service',
    'article',
    'project',
    'partner',
    'document',
  ];
  const grouped = new Map<SearchKind, SearchHit[]>();
  for (const hit of hits) {
    const list = grouped.get(hit.record.k) ?? [];
    list.push(hit);
    grouped.set(hit.record.k, list);
  }
  return order.filter((kind) => grouped.has(kind)).map((kind) => ({ kind, hits: grouped.get(kind)! }));
}

/** Suggested queries shown when the search box is empty. */
export const searchSuggestions: Localized<string[]> = {
  en: ['cooling tower scale', 'RO fouling', 'self-cleaning filter', 'boiler blowdown', 'conductivity control'],
  ar: ['ترسبات أبراج التبريد', 'اتساخ الأغشية', 'مرشح ذاتي التنظيف', 'تصريف الغلايات', 'التحكم في التوصيلية'],
};
