# Client-Provided Data Required

Everything on the site is either verified against a published source or written
as engineering explanation. Nothing has been invented. This document lists every
place where the build is deliberately holding a gap open, waiting on data only
C-Water can supply.

Each item states **where it lives in the code**, **what happens today**, and
**what to change** once the data arrives.

---

## 1 · Company contact details — mostly supplied

**File:** `src/content/site.ts` → `company`

| Field | Status |
| --- | --- |
| `email` | `info@cw-eg.com` — published on cw-eg.com. **Confirm this is the right inbound address.** |
| `phones` | `(+20) 112 229 9044` and `(+20) 111 771 1444` — supplied by C-Water ✅ |
| `address` | 6th of October City, Bosla 3, Unit No. I 21 — supplied by C-Water ✅ |
| `workingHours` | `null` — **still outstanding** |
| `social` | Best-guess profile URLs — **confirm or replace** the LinkedIn / Facebook / Instagram links |

**Two things still need C-Water:**

1. **Working hours.** The contact page shows a line saying they are published
   once confirmed. Set `workingHours` to a `{ en, ar }` value and the page
   switches to a proper entry automatically.

2. **The Arabic rendering of the address.** "Bosla 3" is transliterated as
   "بوصلة 3", which is the most likely reading of the development name but has
   not been confirmed. Correct `company.address.street.ar` if it differs.

**Now live everywhere:** the contact page lists both numbers as `tel:` links in
E.164 form, the footer carries the numbers and the address, and the
`Organization` structured data emits `telephone`, a full `PostalAddress` and a
`contactPoint` per number.

---

## 2 · Product specifications — BLOCKING for the catalogue's technical value

**File:** `src/content/products.ts`

Every product record carries `specsPendingReview: true`. The `specs` array holds
only **definitional** rows — what the product *is* (product family, type,
measurement principle, published variants) — all taken from the partners' own
catalogues.

No capacity, flow rate, filtration degree, pressure rating, dose rate, material
or performance figure has been entered anywhere, because none of those are
verifiable from public sources at the confidence a technical buyer is entitled
to. A wrong filtration degree in a specification is a commercial liability, not
a content gap.

**What happens today:** product pages render the definitional table plus a
prominent "Technical information available on request" panel that routes to an
engineer.

**To fix, per product:**

1. Add the approved rows to `specs` from current partner documentation.
2. Set `specsPendingReview: false`.

There is a test that will fail if a record marked `specsPendingReview` publishes
a measured value — see `tests/content-integrity.test.ts`.

---

## 3 · Technical documents — 24 placeholders

**File:** `src/content/products.ts` → each product's `documents` array

Every document is declared with `file: null`, `size: null` and
`availableOnRequest: true`. The PDFs themselves have not been supplied, and
redistribution rights for partner documentation have not been confirmed.

**What happens today:** document cards render with an "Available on request"
label and link to the engineer contact route instead of a dead download. The
`document_requested` analytics event fires so demand for specific datasheets is
measurable before the files are sourced.

**To fix:**

1. Place the approved PDF in `public/documents/`.
2. Set `file: '/documents/<name>.pdf'`, `size: '1.4 MB'`, and remove
   `availableOnRequest`.

The card switches to a real download and fires `document_download` instead.

---

## 4 · Projects and case studies — all six are illustrative

**File:** `src/content/projects.ts`

All six records have `isIllustrative: true`. They demonstrate the case-study
*structure* — challenge, existing system, approach, technology, outcome — using
engineering scenarios typical of the application. They are **not** records of
specific C-Water projects.

Accordingly none contains a customer name, a site name, a location, a date or a
performance figure, and `metrics` is empty throughout. The `outcomes` array
states what the described approach addresses, not results claimed.

**What happens today:** the projects index and every project page carry a visible
"Illustrative format example" notice, and illustrative records are excluded from
structured data so they cannot be indexed as real case studies.

**To fix, per project:**

1. Replace the content with the cleared project record.
2. Set `isIllustrative: false` and fill `location`.
3. Populate `metrics` **only** from validated measurement data.

A test enforces that illustrative records carry no metrics and no named
location.

---

## 5 · Certifications and accreditations — none published

No certification, accreditation, licence or membership appears anywhere on the
site, because none could be verified. A content-integrity test actively fails
the build if strings like "ISO 9001" or "certified to" appear in any content
module.

**To fix:** supply the certificate scans and the exact scope wording. Add an
accreditation block to the About page and, where appropriate, `hasCredential`
to the `Organization` schema in `src/lib/seo.ts`. Relax the test's `forbidden`
pattern at the same time so it continues to guard against unsupported claims.

---

## 6 · Partnership scope — described as capability only

**File:** `src/content/partners.ts`

Partner pages describe **what the technology does** and **what C-Water adds**.
They deliberately say nothing about distribution rights, territory, exclusivity
or commercial availability, none of which is verifiable from public sources. A
test fails the build on phrases like "exclusive distributor" or "sole agent".

**To fix:** supply the agreed wording for each partnership, cleared by both
parties, and add it to `cwaterRole` or a new field. Note that a fourth brand,
**Etatron**, appears on C-Water's current site but is not in the brief — confirm
whether it should be added.

---

## 7 · Photography — none used

The site currently uses no photography. Its visual language is built from
typography, the engineering diagram system and the brand palette, so it looks
complete and intentional without images rather than showing placeholder frames.

The brief asks for treatment plants, cooling towers, filtration, instrumentation
and engineers in the field. Generic stock photography would weaken it; licensed
or C-Water-owned photography would strengthen it.

**To fix:** supply images with confirmed usage rights. Natural insertion points:

- Hero — a full-bleed plant image behind the treatment line
- Solution pages — one image per application, below the hero
- Industry pages — a sector-representative image
- Project pages — site photography once projects are cleared
- About — the team and the laboratory

Use `next/image`; the config already emits AVIF and WebP at responsive sizes.

---

## 8 · Lead delivery — wired, but both inboxes are placeholders

**Files:** `deploy.targets.json` (static export) and the Vercel environment
(Node deployment). See [`docs/DEPLOYMENT.md`](DEPLOYMENT.md).

Delivery is now built. The endpoint validates every field, enforces the upload
policy, rate-limits by IP, writes each submission to disk outside the web root,
and emails it to one of two inboxes depending on what the enquiry is:

| Form / intent | Routed to |
| --- | --- |
| Request a Quote, Contact → sales, Contact → general | `LEAD_TO_COMMERCIAL` |
| Request a Solution, Contact → engineer, Contact → support | `LEAD_TO_TECHNICAL` |

**Three values still need C-Water:**

1. **The commercial inbox.** `LEAD_TO_COMMERCIAL` currently falls back to
   `info@cw-eg.com`.
2. **The technical inbox.** `LEAD_TO_TECHNICAL`, same fallback. Until both are
   set, the routing works but every enquiry arrives in the same place.
3. **A sending mailbox on the domain.** `LEAD_FROM_EMAIL` is set to
   `website@cw-eg.com`; that mailbox must actually exist in cPanel, or the host
   will send messages that fail SPF and land in spam.

**Also needed:** a retention and privacy position for submitted data and
attachments — the script keeps both indefinitely in
`/home/<user>/cwater-leads/` — and the privacy-policy URL to link from the
consent checkbox.

---

## 9 · Analytics provider — event layer ready, no destination

**File:** `src/lib/analytics.ts`, `src/components/layout/AnalyticsProvider.tsx`

Every event in the brief is implemented and fires at the right moment. The
default adapter pushes to `window.dataLayer`, which GTM and GA4 consume without
further configuration.

**To fix:** add the GTM container or GA4 measurement ID, or register a different
adapter in `AnalyticsProvider`. No call site needs to change — components call
`track()` and never reference a vendor.

---

## 10 · Deployment values

| Item | Where | Note |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `.env.production` | Defaults to `https://cw-eg.com`; canonical URLs, hreflang and the sitemap all derive from it, and it is **baked in at build time** — it cannot be corrected after upload |
| Open Graph image | `public/brand/og-default.png` | Generated from the brand assets; replace with a designed card if preferred |
| Arabic review | `src/content/**` | Arabic was authored rather than machine-translated, but should still be read by a C-Water engineer for terminology preference before launch |

---

## Summary

| # | Item | Blocking launch? |
| --- | --- | --- |
| 1 | Working hours + Arabic address confirmation | No — everything else is live |
| 2 | Product specifications | **Yes** — catalogue works, but its technical value is limited without them |
| 3 | Technical documents | No — degrades to "on request" |
| 4 | Project case studies | No — clearly labelled as illustrative |
| 5 | Certifications | No — absent by design |
| 6 | Partnership scope wording | No — capability-only is accurate |
| 7 | Photography | No — the design does not depend on it |
| 8 | Two inbox addresses + a sending mailbox | **Yes** — delivery is built, but both routes fall back to one address |
| 9 | Analytics destination | No — events buffer until a provider is registered |
| 10 | Deployment values | **Yes** for the site URL |
