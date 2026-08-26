import { describe, expect, it } from 'vitest';
import { articles } from '@/content/articles';
import { industries } from '@/content/industries';
import { partners } from '@/content/partners';
import { products } from '@/content/products';
import { projects } from '@/content/projects';
import { services } from '@/content/services';
import { solutions } from '@/content/solutions';
import { technologies } from '@/content/technologies';
import { footerNav, primaryNav } from '@/content/site';
import { LOCALES } from '@/lib/i18n';

/**
 * Content integrity.
 *
 * These are the checks that protect the two properties the brief is strictest
 * about: that nothing is fabricated, and that Arabic is a real first-class
 * locale rather than a gap. They run against the content modules directly, so
 * a bad edit fails the suite rather than reaching the site.
 */

const collections = {
  solutions,
  industries,
  technologies,
  products,
  partners,
  services,
  projects,
  articles,
};

/** Recursively collect every `{ en, ar }` pair in a content record. */
function localizedPairs(node: unknown, path = ''): { path: string; en: unknown; ar: unknown }[] {
  if (node === null || typeof node !== 'object') return [];
  if (Array.isArray(node)) {
    return node.flatMap((item, i) => localizedPairs(item, `${path}[${i}]`));
  }
  const record = node as Record<string, unknown>;
  const keys = Object.keys(record);
  if (keys.length === 2 && keys.includes('en') && keys.includes('ar')) {
    return [{ path, en: record.en, ar: record.ar }];
  }
  return keys.flatMap((key) => localizedPairs(record[key], path ? `${path}.${key}` : key));
}

describe('slugs and relationships', () => {
  it('every slug is unique within its collection', () => {
    for (const [name, items] of Object.entries(collections)) {
      const slugs = items.map((item) => item.slug);
      expect(new Set(slugs).size, `${name} has duplicate slugs`).toBe(slugs.length);
    }
  });

  it('every slug is URL-safe', () => {
    for (const [name, items] of Object.entries(collections)) {
      for (const item of items) {
        expect(item.slug, `${name}/${item.slug}`).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
      }
    }
  });

  it('every cross-reference points at a record that exists', () => {
    const known = {
      solutions: new Set(solutions.map((s) => s.slug)),
      industries: new Set(industries.map((i) => i.slug)),
      technologies: new Set(technologies.map((t) => t.slug)),
      products: new Set(products.map((p) => p.slug)),
      services: new Set(services.map((s) => s.slug)),
      projects: new Set(projects.map((p) => p.slug)),
      articles: new Set(articles.map((a) => a.slug)),
      partners: new Set<string>(partners.map((p) => p.slug)),
    };

    const check = (from: string, kind: keyof typeof known, refs: string[]) => {
      for (const ref of refs) {
        expect(known[kind].has(ref), `${from} -> ${kind}/${ref} does not exist`).toBe(true);
      }
    };

    for (const s of solutions) {
      check(`solution/${s.slug}`, 'technologies', s.technologies);
      check(`solution/${s.slug}`, 'services', s.services);
      check(`solution/${s.slug}`, 'industries', s.industries);
      check(`solution/${s.slug}`, 'products', s.products);
      check(`solution/${s.slug}`, 'projects', s.projects);
      check(`solution/${s.slug}`, 'articles', s.articles);
    }
    for (const i of industries) {
      check(`industry/${i.slug}`, 'solutions', i.solutions);
      check(`industry/${i.slug}`, 'technologies', i.technologies);
      check(`industry/${i.slug}`, 'products', i.products);
      check(`industry/${i.slug}`, 'services', i.services);
      check(`industry/${i.slug}`, 'projects', i.projects);
      check(`industry/${i.slug}`, 'articles', i.articles);
    }
    for (const t of technologies) {
      check(`technology/${t.slug}`, 'solutions', t.solutions);
      check(`technology/${t.slug}`, 'products', t.products);
      check(`technology/${t.slug}`, 'services', t.services);
      check(`technology/${t.slug}`, 'articles', t.articles);
      if (t.partner) check(`technology/${t.slug}`, 'partners', [t.partner]);
    }
    for (const p of products) {
      check(`product/${p.slug}`, 'partners', [p.partner]);
      check(`product/${p.slug}`, 'technologies', [p.technology]);
      check(`product/${p.slug}`, 'solutions', p.solutions);
      check(`product/${p.slug}`, 'industries', p.industries);
      check(`product/${p.slug}`, 'products', p.relatedProducts);
    }
    for (const s of services) {
      check(`service/${s.slug}`, 'technologies', s.technologies);
      check(`service/${s.slug}`, 'solutions', s.solutions);
    }
    for (const p of projects) {
      check(`project/${p.slug}`, 'industries', [p.industry]);
      check(`project/${p.slug}`, 'solutions', [p.solution]);
      check(`project/${p.slug}`, 'technologies', p.technologies);
      check(`project/${p.slug}`, 'products', p.products);
      check(`project/${p.slug}`, 'articles', p.articles);
    }
    for (const a of articles) {
      check(`article/${a.slug}`, 'solutions', a.solutions);
      check(`article/${a.slug}`, 'technologies', a.technologies);
      check(`article/${a.slug}`, 'products', a.products);
    }
  });

  it('a product never references itself as a related product', () => {
    for (const p of products) {
      expect(p.relatedProducts, `product/${p.slug}`).not.toContain(p.slug);
    }
  });
});

describe('bilingual completeness', () => {
  it('every localized field has non-empty content in both languages', () => {
    for (const [name, items] of Object.entries(collections)) {
      for (const item of items) {
        for (const pair of localizedPairs(item)) {
          for (const locale of LOCALES) {
            const value = pair[locale];
            expect(value, `${name}/${item.slug} :: ${pair.path}.${locale} is missing`).toBeDefined();
            if (typeof value === 'string') {
              expect(value.trim().length, `${name}/${item.slug} :: ${pair.path}.${locale} is empty`).toBeGreaterThan(0);
            }
          }
        }
      }
    }
  });

  it('Arabic is authored, not copied from English', () => {
    /* A handful of fields are legitimately identical: trademarks and
       international parameter names are not translated. Everything else
       differing between locales is what proves Arabic was written, not cloned. */
    const allowedIdentical = /^(Walchem|TIMEX|Kurita|Kurita Europe|pH|ORP|RO)$/;
    let identical = 0;
    let total = 0;

    for (const items of Object.values(collections)) {
      for (const item of items) {
        for (const pair of localizedPairs(item)) {
          if (typeof pair.en !== 'string' || typeof pair.ar !== 'string') continue;
          total += 1;
          if (pair.en === pair.ar && !allowedIdentical.test(pair.en.trim())) identical += 1;
        }
      }
    }

    expect(total).toBeGreaterThan(500);
    // Under 2% identical: the remainder are product names inside longer strings.
    expect(identical / total, `${identical}/${total} localized strings are identical`).toBeLessThan(0.02);
  });

  it('Arabic strings actually contain Arabic script', () => {
    const arabic = /[؀-ۿ]/;

    /**
     * Trademarks and product designations stay in Latin script in both locales
     * — "TIMEX HydroSpin®" is a registered name, not a phrase to translate, and
     * an Arabic transliteration would make it unsearchable for the engineer
     * holding the datasheet.
     *
     * The exemption is deliberately narrow: the value must be identical in both
     * locales AND read as a proper designation — capitalised words, series
     * letters, digits, ® / ™ and separators only. Any lowercase prose word
     * fails the pattern and the string is required to carry Arabic.
     */
    const isTrademark = (value: string) =>
      /^[A-Z0-9][A-Za-z0-9®™&./–—-]*(\s+[A-Z0-9][A-Za-z0-9®™&./–—-]*)*$/.test(value.trim());

    for (const [name, items] of Object.entries(collections)) {
      for (const item of items) {
        for (const pair of localizedPairs(item)) {
          if (typeof pair.ar !== 'string' || pair.ar.length < 12) continue;
          if (pair.en === pair.ar && isTrademark(pair.ar)) continue;
          expect(arabic.test(pair.ar), `${name}/${item.slug} :: ${pair.path}.ar has no Arabic script`).toBe(true);
        }
      }
    }
  });
});

describe('SEO fields', () => {
  it('every record carries a meta title and description in both languages', () => {
    for (const [name, items] of Object.entries(collections)) {
      for (const item of items) {
        for (const locale of LOCALES) {
          expect(item.metaTitle[locale]?.length, `${name}/${item.slug} metaTitle.${locale}`).toBeGreaterThan(10);
          expect(
            item.metaDescription[locale]?.length,
            `${name}/${item.slug} metaDescription.${locale}`,
          ).toBeGreaterThan(40);
        }
      }
    }
  });

  it('meta titles stay within the SERP display limit', () => {
    for (const [name, items] of Object.entries(collections)) {
      for (const item of items) {
        for (const locale of LOCALES) {
          expect(item.metaTitle[locale].length, `${name}/${item.slug} metaTitle.${locale} too long`).toBeLessThanOrEqual(
            70,
          );
        }
      }
    }
  });

  it('meta descriptions stay within the SERP display limit', () => {
    for (const [name, items] of Object.entries(collections)) {
      for (const item of items) {
        for (const locale of LOCALES) {
          expect(
            item.metaDescription[locale].length,
            `${name}/${item.slug} metaDescription.${locale} too long`,
          ).toBeLessThanOrEqual(180);
        }
      }
    }
  });

  it('no meta title duplicates the brand suffix', () => {
    for (const items of Object.values(collections)) {
      for (const item of items) {
        for (const locale of LOCALES) {
          expect(item.metaTitle[locale]).not.toMatch(/C-Water\s*\|\s*C-Water/);
        }
      }
    }
  });
});

describe('data-accuracy rules', () => {
  /**
   * The brief forbids inventing specifications, certifications, customers,
   * project results and performance figures. These tests encode that.
   */

  it('every product whose specs are unverified is flagged for review', () => {
    for (const product of products) {
      if (!product.specsPendingReview) continue;
      // A pending record may only carry definitional rows, never measured values.
      for (const row of product.specs) {
        const value = row.value.en;
        expect(
          /\d+\s*(mm|m³|m3|µm|um|bar|psi|kW|kg|l\/h|L\/h|lph|%|°C)/i.test(value),
          `product/${product.slug} publishes an unverified measured value: "${value}"`,
        ).toBe(false);
      }
    }
  });

  it('no product document claims a downloadable file that does not exist', () => {
    for (const product of products) {
      for (const doc of product.documents) {
        if (doc.file === null) {
          expect(doc.availableOnRequest, `product/${product.slug} doc ${doc.id}`).toBe(true);
          expect(doc.size).toBeNull();
        }
      }
    }
  });

  it('illustrative projects carry no performance metrics or named locations', () => {
    for (const project of projects) {
      if (!project.isIllustrative) continue;
      expect(project.metrics, `project/${project.slug} must not claim metrics`).toHaveLength(0);
      expect(
        project.location.en.toLowerCase(),
        `project/${project.slug} must not name a location`,
      ).toContain('illustrative');
    }
  });

  it('no content claims a certification or an unsupported superlative', () => {
    const forbidden =
      /\b(ISO ?9001|ISO ?14001|ISO ?45001|certified to|award-winning|market[- ]leading|number one|the best|world[- ]class|guaranteed savings)\b/i;

    for (const [name, items] of Object.entries(collections)) {
      for (const item of items) {
        for (const pair of localizedPairs(item)) {
          if (typeof pair.en !== 'string') continue;
          expect(forbidden.test(pair.en), `${name}/${item.slug} :: ${pair.path} — "${pair.en.slice(0, 80)}"`).toBe(
            false,
          );
        }
      }
    }
  });

  it('partner records describe capability, never distribution rights', () => {
    const forbidden = /\b(exclusive distributor|sole agent|authorised distributor|exclusive rights|master distributor)\b/i;
    for (const partner of partners) {
      for (const pair of localizedPairs(partner)) {
        if (typeof pair.en !== 'string') continue;
        expect(forbidden.test(pair.en), `partner/${partner.slug} :: ${pair.path}`).toBe(false);
      }
    }
  });
});

describe('navigation', () => {
  it('every navigation href resolves to a real route', () => {
    const staticRoutes = new Set([
      '/solutions',
      '/industries',
      '/technologies',
      '/products',
      '/partners',
      '/services',
      '/projects',
      '/knowledge',
      '/about',
      '/contact',
      '/request-solution',
      '/request-quote',
      '/search',
    ]);

    const detailExists = (href: string) => {
      const [collection, slug] = href.replace(/^\//, '').split('/');
      const lookup: Record<string, { slug: string }[]> = {
        solutions,
        industries,
        technologies,
        products,
        partners,
        services,
        projects,
        knowledge: articles,
      };
      return Boolean(lookup[collection]?.some((item) => item.slug === slug));
    };

    const assertHref = (href: string, where: string) => {
      const path = href.split('?')[0].split('#')[0];
      if (path === '' || path === '/') return;
      const ok = staticRoutes.has(path) || detailExists(path);
      expect(ok, `${where}: ${href} does not resolve`).toBe(true);
    };

    for (const section of primaryNav) {
      assertHref(section.href, `primaryNav/${section.id}`);
      for (const column of section.columns ?? []) {
        for (const link of column.links) assertHref(link.href, `primaryNav/${section.id}`);
      }
      if (section.feature) assertHref(section.feature.href, `primaryNav/${section.id}/feature`);
    }
    for (const column of footerNav) {
      for (const link of column.links) assertHref(link.href, 'footerNav');
    }
  });
});

describe('articles', () => {
  it('each article has body sections, a checklist and an escalation note', () => {
    for (const article of articles) {
      expect(article.sections.length, `article/${article.slug}`).toBeGreaterThanOrEqual(3);
      expect(article.checklist.length, `article/${article.slug}`).toBeGreaterThanOrEqual(4);
      expect(article.escalation.en.length, `article/${article.slug}`).toBeGreaterThan(80);
      expect(article.publishedAt, `article/${article.slug}`).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  it('section ids are unique within an article so the table of contents works', () => {
    for (const article of articles) {
      const ids = article.sections.map((s) => s.id);
      expect(new Set(ids).size, `article/${article.slug} has duplicate section ids`).toBe(ids.length);
    }
  });

  it('the launch library covers the committed topic count', () => {
    expect(articles.length).toBeGreaterThanOrEqual(15);
  });
});
