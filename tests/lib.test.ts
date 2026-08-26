import { describe, expect, it } from 'vitest';
import { dirFor, isLocale, localePath, swapLocale, t } from '@/lib/i18n';
import { groupHits, normalise, searchRecords, type SlimRecord } from '@/lib/search';
import {
  contactRequestSchema,
  fileExtension,
  isAllowedUpload,
  leadSchema,
  quoteRequestSchema,
  referenceFor,
  solutionRequestSchema,
} from '@/lib/leads';
import { pad, pickBySlug, slugify } from '@/lib/utils';

describe('i18n', () => {
  it('recognises the launch locales and rejects anything else', () => {
    expect(isLocale('en')).toBe(true);
    expect(isLocale('ar')).toBe(true);
    expect(isLocale('fr')).toBe(false);
    expect(isLocale('EN')).toBe(false);
  });

  it('maps locale to writing direction', () => {
    expect(dirFor('en')).toBe('ltr');
    expect(dirFor('ar')).toBe('rtl');
  });

  it('builds locale-prefixed paths consistently', () => {
    expect(localePath('en')).toBe('/en');
    expect(localePath('ar', 'solutions')).toBe('/ar/solutions');
    expect(localePath('en', '/solutions/')).toBe('/en/solutions');
    expect(localePath('en', 'solutions/cooling-water')).toBe('/en/solutions/cooling-water');
  });

  it('swaps the locale segment without losing the rest of the route', () => {
    expect(swapLocale('/en/solutions/cooling-water', 'ar')).toBe('/ar/solutions/cooling-water');
    expect(swapLocale('/ar/products', 'en')).toBe('/en/products');
    // A path with no locale segment gains one rather than being corrupted.
    expect(swapLocale('/solutions', 'ar')).toBe('/ar/solutions');
  });

  it('falls back to English when an Arabic value is missing', () => {
    expect(t({ en: 'Cooling Water', ar: 'مياه التبريد' }, 'ar')).toBe('مياه التبريد');
    expect(t({ en: 'Cooling Water', ar: '' }, 'ar')).toBe('Cooling Water');
  });
});

describe('search matching', () => {
  const index: SlimRecord[] = [
    {
      i: 'solution:ro',
      k: 'solution',
      t: 'RO & Membranes',
      s: 'Protect membrane systems against fouling and scaling.',
      h: 'solutions/ro-membranes',
      w: 'reverse osmosis antiscalant pretreatment',
    },
    {
      i: 'article:fouling',
      k: 'article',
      t: 'What Causes RO Membrane Fouling?',
      s: 'Fouling, scaling and biological growth produce different signatures.',
      h: 'knowledge/what-causes-ro-fouling',
      w: 'particulate biological organic colloidal',
    },
    {
      i: 'product:filter',
      k: 'product',
      t: 'TIMEX KMF Series',
      s: 'Automatic screen filtration for continuous duty.',
      h: 'products/timex-kmf-series',
      w: 'self-cleaning filter solids',
    },
    {
      i: 'solution:cooling-ar',
      k: 'solution',
      t: 'مياه التبريد',
      s: 'التحكم في الترسبات والتآكل',
      h: 'solutions/cooling-water',
      w: 'أبراج التبريد الترشيح',
    },
  ];

  it('returns nothing for an empty or single-character query', () => {
    expect(searchRecords(index, '')).toHaveLength(0);
    expect(searchRecords(index, 'a')).toHaveLength(0);
  });

  it('ranks a title match above a keyword-only match', () => {
    const hits = searchRecords(index, 'RO');
    // 'RO' is 2 chars so it tokenises; the two RO records should lead.
    expect(hits[0].record.i).toMatch(/^(solution:ro|article:fouling)$/);
  });

  it('rewards records matching every token in the query', () => {
    const hits = searchRecords(index, 'RO fouling');
    expect(hits[0].record.i).toBe('article:fouling');
  });

  it('matches Arabic regardless of diacritics and letterform variants', () => {
    expect(normalise('الأغشية')).toBe(normalise('الاغشيه'));
    expect(normalise('مِيَاه')).toBe(normalise('مياه'));
    const hits = searchRecords(index, 'الترسبات');
    expect(hits.some((h) => h.record.i === 'solution:cooling-ar')).toBe(true);
  });

  it('is case-insensitive and ignores punctuation', () => {
    expect(searchRecords(index, 'timex kmf').length).toBeGreaterThan(0);
    expect(searchRecords(index, 'TIMEX, KMF!').length).toBeGreaterThan(0);
  });

  it('honours the result limit', () => {
    expect(searchRecords(index, 'the fouling scaling filtration', 2).length).toBeLessThanOrEqual(2);
  });

  it('groups hits by content type in a stable order', () => {
    const groups = groupHits(searchRecords(index, 'fouling filtration'));
    const kinds = groups.map((g) => g.kind);
    // Solutions always precede articles, which precede nothing lower here.
    expect(kinds.indexOf('solution')).toBeLessThan(kinds.indexOf('article') === -1 ? 99 : kinds.indexOf('article'));
  });
});

describe('upload policy', () => {
  it('reads the extension case-insensitively', () => {
    expect(fileExtension('Water Analysis.PDF')).toBe('pdf');
    expect(fileExtension('drawing.rev2.dwg')).toBe('dwg');
    expect(fileExtension('noextension')).toBe('');
  });

  it('accepts the documented types when extension and MIME agree', () => {
    expect(isAllowedUpload('pid.pdf', 'application/pdf')).toBe(true);
    expect(isAllowedUpload('photo.jpg', 'image/jpeg')).toBe(true);
    expect(isAllowedUpload('photo.png', 'image/png')).toBe(true);
    expect(
      isAllowedUpload('spec.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'),
    ).toBe(true);
  });

  it('rejects executables and unlisted types', () => {
    expect(isAllowedUpload('malware.exe', 'application/x-msdownload')).toBe(false);
    expect(isAllowedUpload('script.js', 'text/javascript')).toBe(false);
    expect(isAllowedUpload('archive.zip', 'application/zip')).toBe(false);
  });

  it('rejects a file whose MIME type contradicts its extension', () => {
    // The whole point of checking both: a renamed executable must not pass.
    expect(isAllowedUpload('invoice.pdf', 'application/x-msdownload')).toBe(false);
    expect(isAllowedUpload('photo.png', 'application/pdf')).toBe(false);
  });

  it('accepts Office files when the browser reports no MIME type', () => {
    expect(isAllowedUpload('spec.docx', '')).toBe(true);
    expect(isAllowedUpload('data.xlsx', '')).toBe(true);
    expect(isAllowedUpload('script.exe', '')).toBe(false);
  });
});

describe('lead validation', () => {
  const contact = {
    kind: 'contact' as const,
    intent: 'engineer' as const,
    message: 'We are seeing scale on the condenser tubes and need an assessment.',
    locale: 'en' as const,
    name: 'Sara Hassan',
    company: 'Delta Manufacturing',
    email: 'sara@delta.example',
    consent: true as const,
  };

  it('accepts a complete enquiry', () => {
    expect(contactRequestSchema.safeParse(contact).success).toBe(true);
  });

  it('requires a name, a company, an email and consent', () => {
    expect(contactRequestSchema.safeParse({ ...contact, name: 'A' }).success).toBe(false);
    expect(contactRequestSchema.safeParse({ ...contact, company: '' }).success).toBe(false);
    expect(contactRequestSchema.safeParse({ ...contact, email: 'not-an-email' }).success).toBe(false);
    expect(contactRequestSchema.safeParse({ ...contact, consent: false }).success).toBe(false);
  });

  it('accepts international phone formats and rejects nonsense', () => {
    expect(contactRequestSchema.safeParse({ ...contact, phone: '+20 100 123 4567' }).success).toBe(true);
    expect(contactRequestSchema.safeParse({ ...contact, phone: '(02) 555-0134' }).success).toBe(true);
    expect(contactRequestSchema.safeParse({ ...contact, phone: 'call me' }).success).toBe(false);
  });

  it('accepts Arabic input', () => {
    const arabic = {
      ...contact,
      locale: 'ar' as const,
      name: 'محمد عبد الله',
      company: 'الشركة المصرية للصناعات',
      message: 'لدينا مشكلة ترسبات في برج التبريد ونحتاج تقييمًا فنيًا.',
    };
    expect(contactRequestSchema.safeParse(arabic).success).toBe(true);
  });

  it('rejects over-long free text', () => {
    expect(contactRequestSchema.safeParse({ ...contact, message: 'x'.repeat(4001) }).success).toBe(false);
  });

  it('accepts a filled honeypot at the schema level so the route can fake success', () => {
    /* Rejecting here would return an error naming the trap field, which tells a
       bot exactly which input to leave blank next time. */
    const result = contactRequestSchema.safeParse({ ...contact, website: 'http://spam.example' });
    expect(result.success).toBe(true);
  });

  it('requires at least one selected need on a solution request', () => {
    const base = {
      kind: 'solution' as const,
      needs: ['existing-problem'],
      problems: [],
      objectives: [],
      locale: 'en' as const,
      name: 'Sara Hassan',
      company: 'Delta',
      email: 'sara@delta.example',
      consent: true as const,
    };
    expect(solutionRequestSchema.safeParse(base).success).toBe(true);
    expect(solutionRequestSchema.safeParse({ ...base, needs: [] }).success).toBe(false);
  });

  it('coerces and bounds quote quantities', () => {
    const base = {
      kind: 'quote' as const,
      items: [{ slug: 'walchem-intuition-9', name: 'Walchem Intuition-9', quantity: '3' }],
      locale: 'en' as const,
      name: 'Sara Hassan',
      company: 'Delta',
      email: 'sara@delta.example',
      consent: true as const,
    };
    const ok = quoteRequestSchema.safeParse(base);
    expect(ok.success).toBe(true);
    if (ok.success) expect(ok.data.items[0].quantity).toBe(3);

    expect(quoteRequestSchema.safeParse({ ...base, items: [{ ...base.items[0], quantity: 0 }] }).success).toBe(false);
    expect(quoteRequestSchema.safeParse({ ...base, items: [{ ...base.items[0], quantity: 99999 }] }).success).toBe(
      false,
    );
  });

  it('discriminates lead kinds through the union', () => {
    expect(leadSchema.safeParse(contact).success).toBe(true);
    expect(leadSchema.safeParse({ ...contact, kind: 'unknown' }).success).toBe(false);
  });

  it('generates a reference with the right prefix per kind', () => {
    expect(referenceFor('quote')).toMatch(/^RFQ-\d{6}-[A-Z0-9]{4}$/);
    expect(referenceFor('solution')).toMatch(/^SOL-\d{6}-[A-Z0-9]{4}$/);
    expect(referenceFor('contact')).toMatch(/^ENQ-\d{6}-[A-Z0-9]{4}$/);
  });
});

describe('utils', () => {
  it('zero-pads sequence labels', () => {
    expect(pad(1)).toBe('01');
    expect(pad(12)).toBe('12');
  });

  it('slugifies text safely', () => {
    expect(slugify('Cooling Water Treatment')).toBe('cooling-water-treatment');
    expect(slugify('pH & ORP!')).toBe('ph-orp');
  });

  it('picks records by slug preserving the requested order and skipping unknowns', () => {
    const all = [{ slug: 'a' }, { slug: 'b' }, { slug: 'c' }];
    expect(pickBySlug(all, ['c', 'a'])).toEqual([{ slug: 'c' }, { slug: 'a' }]);
    expect(pickBySlug(all, ['a', 'missing'])).toEqual([{ slug: 'a' }]);
  });
});
