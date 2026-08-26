# C-Water

**Water Treatment, Engineered Around Your Operation.**

A bilingual (English / Arabic) technical platform for C-Water — an Egyptian
water-treatment engineering company — combining solution-led discovery, a
technical product catalogue, a knowledge centre and three lead-capture journeys.

---

## Running it

```bash
npm install
npm run dev          # http://localhost:3000 → redirects to /en
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run deploy -- <target>` | Build for a named destination — see Deployment |
| `npm run build:index` | Rebuild the search index only |
| `npm run lint` | ESLint, including the React hook rules |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | Vitest — 50 unit and content-integrity tests |

The default build is a Node app. `npm run deploy -- staging` (or `production`)
builds the static export for cPanel instead. See **[Deployment](#deployment)**.

---

## Stack

- **Next.js 16** (App Router, Turbopack) · **React 19** · **TypeScript** (strict)
- **Tailwind CSS v4** — design tokens declared in `@theme`, no config file
- **Framer Motion** — every animation gated on `prefers-reduced-motion`
- **Zod** — one schema shared by the client forms and the API route

---

## How it is organised

```
src/
  app/[locale]/          Routes. `[locale]` is 'en' | 'ar'.
  app/api/leads/         Lead intake for the Node deployment (route.node.ts)
  components/
    layout/              Header, mega-menu, footer, page hero, related blocks
    ui/                  Buttons, icons, section system, cards, tables, FAQ
    interactive/         Treatment line, system explorer, solution finder, dashboard
    forms/               Request a Solution, Request a Quote, Contact
    home/                The eleven homepage bands
  content/               All site content — the CMS boundary (see below)
  lib/                   i18n, search, SEO, analytics, lead schemas
public/
  api/leads.php          Lead intake for the static export (no Node available)
  .htaccess              Headers, redirects, extensionless URLs, caching
  search-index-*.json    Built by `prebuild`, fetched by the client on demand
scripts/                 Build-time generators
tests/                   Unit and content-integrity tests
docs/                    Brief, PRD, spec, DEPLOYMENT.md, CLIENT-DATA-REQUIRED.md
```

### Content is data, not markup

Everything a CMS would own lives in `src/content/` as plain, serialisable
records with stable slugs and relationships expressed as slug arrays. Nothing in
there imports React or Next, so a headless CMS can become the source of these
objects without touching a component.

```
Solution ─ technologies, products, services, industries, projects, articles
Product  ─ partner, technology, solutions, industries, documents
Article  ─ solutions, technologies, products, faqs
```

`src/content/types.ts` is the schema. Every field is `{ en, ar }`.

---

## Bilingual

Arabic is a first-class locale, not a translation layer.

- Both languages are authored in the same record; the type system will not let
  one be omitted.
- Direction comes from the route segment — `<html dir>` is set server-side, not
  patched on the client.
- Layout uses CSS logical properties throughout (`ps-`/`pe-`, `start-`/`end-`),
  so RTL is a direction change rather than a stylesheet fork.
- Arabic is set in **Cairo** — a contemporary Arabic sans with even stroke
  contrast and open counters, used at display sizes too, so hierarchy reads
  identically in both directions.
- Uppercase letterspaced mono labels are neutralised under RTL, because Arabic
  has no uppercase and a Latin mono face has no Arabic glyphs.
- **Arabic gets its own heading metrics.** The Latin scale is set tight — 0.94
  line-height, −0.035em tracking at display size — which is right for Archivo
  and wrong for Arabic. Negative tracking closes the joins of a connected
  script, and Cairo's Arabic ink measures up to 1.47× the font size from the top
  of a mark to the bottom of a descender, so at 0.94 the lines overlap by nearly
  half a line. Arabic headings therefore run at 1.5 with tracking reset, and
  body copy at 1.8. Sizes are unchanged, so both languages keep the same
  hierarchy and the same page rhythm.
- Latin runs inside Arabic copy (Walchem, TIMEX, Kurita, pH, ORP, RO) are
  isolated back to LTR and to the Latin face.
- Directional glyphs flip with writing direction.

Tests enforce that every localized field is populated, that Arabic actually
contains Arabic script, and that under 2% of strings are identical across
locales (the remainder being trademarks, which are correctly not translated).

---

## The design system

**Brand source of truth is the supplied logo.** Two colours were sampled from it
and everything else derives from them:

- Signal blue `#188ECE` — the droplet mark
- Wordmark grey `#B1AFB1` — the C-WATER lettering

The `ink` ramp is a slate carrying the brand hue (~205°) so dark canvases read as
water rather than as generic charcoal.

**Typography.** Archivo for editorial headlines, Inter for technical body copy,
IBM Plex Mono for every label, spec key and instrument readout — that mono
register is what gives the interface its measured, engineered feel. All
self-hosted via `next/font`: no external requests, no layout shift.

**Shape.** Radii of 1–4px only. Cards are hairline-bordered technical modules
with a leading accent tick, never soft SaaS cards with drop shadows.

**The flow line.** A hairline carrying a travelling luminous packet, used in the
hero, section dividers and diagrams. It encodes "signals move" and is the
visual through-line of the whole site.

### Contrast

A single mid-grey cannot clear 4.5:1 against both white and near-black, so the
muted steps are canvas-dependent: `ink-500`/`600` on paper, `ink-400`/`300` on
ink. Every dark band carries `.theme-dark`, and a rule in `globals.css` remaps
the muted steps inside that context — so contrast stays correct without each
call site having to know its background.

The whole palette passes WCAG 2.2 AA. Solid brand fills carrying white text use
`signal-600` (5.21:1); `signal-500` remains the accent everywhere it carries no
text — flow lines, icons, focus rings, marks.

---

## Signature interactions

| | |
| --- | --- |
| **Treatment line** | SVG schematic of a working system: water travels the pipe, the sensor reads, the controller returns a signal packet to the dosing pump. No WebGL, no canvas, no per-frame JS. Becomes a vertical sequence below `lg`. |
| **System explorer** | Select a stage to see its purpose, the partner technology there, and where it leads. Keyboard-navigable tab list. |
| **Solution finder** | Three questions scored against `problemTags` and `goalTags`. States plainly that it does not replace water analysis — the disclaimer sits with the result, not in a footnote. |
| **Monitoring dashboard** | Parameters wander within plausible bands. Carries a permanent "simulated data" label; every value is generated in the browser and represents no customer installation. |

### Motion

Everything respects `prefers-reduced-motion`. CSS animations are neutralised
globally; SVG `<animate>` is SMIL and ignores that reset, so animated decoration
also carries `.motion-only`, which is hidden under reduced motion — covering the
window before hydration and the JS-disabled case.

---

## Performance

Per-page transfer for a modern browser:

| | gzipped |
| --- | --- |
| HTML | 12–33 KB |
| JavaScript | **214–236 KB** |
| CSS | ~14 KB |

Of the JavaScript, ~114 KB is the React 19 + App Router baseline and ~85 KB is
Framer Motion, which the interaction design depends on.

Getting there took two structural decisions:

1. **Server components own the content.** Client components receive
   pre-flattened view models as props. Importing the content modules into the
   catalogue, the knowledge index or the forms would have shipped ~700 KB of
   source to the browser.
2. **The search index is a separate artefact.** `src/lib/search.ts` holds only
   matching logic; `search-index.server.ts` builds the index and is imported by
   nothing in the browser graph — a `scripts/` generator writes it to
   `public/` before the build. The dialog fetches that 47 KB file on first open
   and the results page reuses the same cached copy.

Next also emits a `noModule` core-js bundle for legacy browsers; the
`browserslist` target keeps modern browsers from ever requesting it.

---

## Accessibility

Targets WCAG 2.2 AA. Verified across all 196 pages in both locales:

- One `<h1>` per page, no heading-level skips
- Skip link, `<main>`, labelled landmarks, every `<nav>` named
- Every form control labelled; errors wired through `aria-describedby` /
  `aria-invalid`, with an error summary announced via `role="alert"`
- Focus trapped in the mobile menu and search dialog; Escape closes and restores
  focus to the trigger
- Mega-menu triggers are buttons with `aria-expanded` and `aria-controls`
- Visible focus ring on every interactive surface, brightened on dark canvases
- Wide tables scroll inside their own container; no page scrolls horizontally at
  360px

---

## SEO

Every page carries a canonical URL, a complete hreflang set (both locales plus
`x-default`), Open Graph and Twitter cards, and JSON-LD. Verified: 196/196.

Structured data: `Organization`, `WebSite` with `SearchAction`, `BreadcrumbList`,
`TechArticle`, `FAQPage`, `Service` and `Product`.

`Product` deliberately omits `offers`, `price` and `aggregateRating` — this is a
technical catalogue with an RFQ flow, not a shop. Illustrative projects are
excluded from structured data entirely.

---

## Data accuracy

The brief forbids inventing specifications, certifications, customers, project
results and performance figures. That is enforced, not just intended:

- No numeric performance claim appears anywhere on the site.
- Product specs hold only definitional rows; performance data is marked
  `specsPendingReview` and renders as "available on request".
- All six projects are `isIllustrative`, carry a visible notice, hold no metrics
  and name no customer or location.
- Documents with no file link to the request flow rather than to a dead
  download.

`tests/content-integrity.test.ts` fails the build on unverified measured values,
certification claims, unsupported superlatives, distribution-rights language, and
illustrative projects carrying metrics.

**See [`docs/CLIENT-DATA-REQUIRED.md`](docs/CLIENT-DATA-REQUIRED.md)** for every
gap being held open and what closes it.

---

## Analytics

Provider-agnostic: components call `track()` and never name a vendor. Events
buffer until a provider is registered, then replay in order. The default adapter
pushes to `window.dataLayer`.

All events from the brief are implemented: `page_view`, `solution_view`,
`industry_view`, `technology_view`, `product_view`, `partner_view`,
`search_used`, `document_download`, `document_requested`,
`solution_finder_started` / `_step` / `_completed`, `quote_started` /
`_item_added` / `_submitted`, `engineering_request_started` / `_step` /
`_submitted`, `support_request`, `contact_submitted`, `cta_click`.

---

## Forms and security

Three journeys — Request a Solution (7 steps), Request a Quote, Contact —
posting to whichever endpoint the deployment provides: the route handler at
`/api/leads` on a Node host, or `public/api/leads.php` on the static export.
Both enforce the same rules and return the same `{ ok, reference }`.

- Uploads: PDF / JPG / PNG / DOCX / XLSX, ≤10 MB, ≤5 files. **Extension,
  declared MIME type and sniffed content must all agree** — checking only one
  is how a renamed executable gets through
- Rate limited to 5 submissions per minute per IP
- Honeypot accepted at the schema level and answered with an ordinary success,
  so a bot learns nothing from the difference
- Every submission is written outside the web root before delivery is
  attempted, so a mail misconfiguration cannot silently lose an enquiry
- Security headers set in `.htaccess`

`src/lib/leads.ts` holds the Zod schemas both the browser and the Node route
validate against; `leads.php` re-implements the same rules for the host that
has no Node. All three are commented as a set — changing a limit in one means
changing it in the others.

Routing is the same everywhere: quotes, sales and general enquiries to the
commercial inbox; solution requests, engineering and support to the technical
one.

**The two destination inboxes still need to be set** — see item 8 in the
client-data document.

---

## Deployment

One codebase, two shapes, chosen by target in `deploy.targets.json`:

| | **Node** (`vercel`) | **Static export** (`production`, `staging`) |
| --- | --- | --- |
| What runs | the Next app | nothing — prerendered HTML |
| Forms | `/api/leads` → Resend | `/api/leads.php` → PHP `mail()` |
| Headers, redirects | `next.config.ts` | `.htaccess` |
| Images | optimised | served as authored |
| Deployed by | pushing the repo | uploading `out/` |

The two cannot coexist in one build: a POST handler cannot be prerendered, so
its presence would fail `output: 'export'`. The route is therefore named
`route.node.ts`, and `node.ts` is only a recognised page extension when the
export is off — the export build does not see the file at all. No file is
moved or copied to switch between them.

Everything that differs between destinations — site URL, subdirectory,
indexing, form recipients — lives in `deploy.targets.json`, because for the
static export all four are baked in at build time and cannot be corrected
after upload. Anything that is not the address the brand should be found at
sends `X-Robots-Tag: noindex`, so a second crawlable copy of the site cannot
compete with the real one in search.

`.htaccess` carries what `next.config.ts` used to: the five security headers,
the `/` → `/en` redirect, extensionless URLs, immutable caching for
`/_next/static`, compression and the 404 document.

**Full instructions, including the pre-launch checks that matter, are in
[`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md).**

A subdirectory deploy needs every URL to carry the prefix. Next handles
`<Link>`, route files and `_next` assets from `basePath`; a hand-written
`<a href>`, a `next/image` src under `unoptimized`, a metadata icon and
anything passed to `fetch()` do not, and go through `withBasePath()` in
`src/lib/base-path.ts`. The deploy script scans the finished export and fails
the build on any site-absolute URL outside the prefix, so this cannot regress
quietly.
