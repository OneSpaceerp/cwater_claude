# Deploying

One codebase, two deployment shapes. The target you name decides which.

| | **Node** (Vercel) | **Static export** (cPanel) |
| --- | --- | --- |
| What runs | the Next app | nothing — prerendered HTML |
| Forms | `/api/leads` route handler → Resend | `/api/leads.php` → PHP `mail()` |
| Headers, redirects | `next.config.ts` | `.htaccess` |
| Images | optimised (AVIF/WebP, resized) | served as authored |
| Deployed by | pushing to the repo; Vercel builds | uploading `out/` |
| Config lives in | environment variables | `deploy.targets.json`, baked in |

The two shapes are mutually exclusive in one build: a POST handler cannot be
prerendered, so its presence would fail `output: 'export'` outright. The route
is therefore named `route.node.ts`, and `node.ts` is only a recognised page
extension when the export is off — the export build simply does not see the
file. That is the whole mechanism; nothing is moved or copied.

---

## Targets

There are two destinations, and four values differ between them — the site URL,
the subdirectory, whether search engines may index it, and where the forms
deliver. Every one of those is **baked into the build** and cannot be corrected
after upload, so they live in [`deploy.targets.json`](../deploy.targets.json)
and a build names its destination rather than inheriting whatever environment
variables happen to be set.

| | `vercel` | `production` | `staging` |
| --- | --- | --- | --- |
| URL | `cwater-claude.vercel.app` | `cw-eg.com` | `nsd-eg.com/cwaterv2` |
| Shape | Node app | static export | static export |
| Deploy by | pushing the repo | uploading to `public_html` | uploading to `public_html/cwaterv2` |
| Indexed | **no** — see below | yes | **no** |
| Forms deliver via | Resend | PHP `mail()` | PHP `mail()` |

`vercel` is marked `noindex` because `*.vercel.app` is not the address the
brand should be found at; a full crawlable copy there would compete with
cw-eg.com. **Once a real domain points at Vercel, set that target's `siteUrl`
to the domain and `noindex` to `false`.**

```bash
npm run deploy -- staging
```

That regenerates the search index, builds the export, writes `.htaccess` and
`index.html` for that destination, substitutes the mail addresses into
`api/leads.php`, and verifies that every URL in the output carries the
subdirectory prefix. It stops with a list if any does not.

To change an address or a URL, edit `deploy.targets.json` and rebuild. Editing
`out/` directly works until the next deploy overwrites it.

### A build cannot be moved between targets

Every asset URL is written into the HTML at build time. A build made for
`/cwaterv2` serves nothing but 404s at a domain root — the pages load and then
ask for `/cwaterv2/_next/…`, which is not there — and a root build 404s
entirely inside a subdirectory. Rebuild for the destination; do not copy an
`out/` between them.

### Why staging and vercel are set to noindex

A complete, crawlable second copy of the site would compete with the real one in
search results and split its ranking signals between two hosts. The header is
written only for targets marked `"noindex": true`; the `production` target
omits it.

---

## Before the first deploy

Two things need to be true on the hosting account.

### 1. Create the sending mailbox

In cPanel → **Email Accounts**, create the mailbox named in the target's
`leads.from` — `website@nsd-eg.com` for staging, `website@cw-eg.com` for
production.

This is the address the form emails are *sent from*, and it must be on the
domain actually serving the site. Send as anything else and the host's mail
server produces a message that fails SPF and lands in spam — or is refused
outright. The visitor's own address goes into `Reply-To`, so replying from the
inbox still reaches them.

### 2. Set the two destination inboxes

`deploy.targets.json` currently routes both commercial and technical enquiries
to `info@cw-eg.com`, so **every enquiry lands in one inbox until it is
changed**. The routing itself is already wired:

| Form | Goes to |
| --- | --- |
| Request a Quote | `leads.commercial` |
| Contact → *Talk to sales* | `leads.commercial` |
| Contact → *General enquiry* | `leads.commercial` |
| Request a Solution | `leads.technical` |
| Contact → *Talk to an engineer* | `leads.technical` |
| Contact → *Technical support* | `leads.technical` |

---

## Build

```bash
npm ci
npm run deploy -- staging
```

`out/` *is* the website — nothing else is uploaded. The script prints what it
wrote; a run that ends with **"Base path verified"** and **201 HTML files** is
the one to upload.

---

## Upload

### Where it goes

| Target | Upload into |
| --- | --- |
| `staging` | `public_html/cwaterv2` — create the folder if it is not there |
| `production`, primary domain | `public_html` |
| `production`, addon domain | that domain's own root, e.g. `public_html/cw-eg.com` |

The staging directory sits alongside the WordPress install already in
`public_html`. It does not disturb it: WordPress's own `.htaccess` rules stop
applying inside `cwaterv2` the moment ours turns `RewriteEngine On`, and
nothing in the upload touches a file outside that folder.

### Steps (cPanel File Manager)

1. Zip the **contents** of `out/`, not the folder itself — you want
   `en.html` at the top level of the archive, not `out/en.html`.

   On Windows, use the `tar` that ships with the OS (PowerShell):

   ```powershell
   cd out; & "$env:SystemRoot\System32\tar.exe" -a -cf ..\cwater-site.zip *
   ```

   On macOS or Linux:

   ```bash
   cd out && zip -r ../cwater-site.zip .
   ```

   **Do not use PowerShell's `Compress-Archive`, and do not right-click →
   *Send to → Compressed folder*.** Compress-Archive writes Windows path
   separators into the archive, so extracting it on the Linux host produces a
   single file literally named `api\leads.php` instead of an `api` directory —
   the forms then 404 with nothing obviously wrong in File Manager. Explorer's
   own zip skips dotfiles, so `.htaccess` never makes it either.

   Whichever you use, verify before uploading. The archive must contain
   `.htaccess`, `api/leads.php` and about 200 `.html` files, with forward
   slashes throughout.

2. In File Manager, open the destination folder. For staging that is
   `public_html/cwaterv2` — use **+ Folder** to create it first if needed. For
   production, delete the placeholder `index.html` / `default.html` if the host
   put one there, and leave `cgi-bin` and any `.well-known` directory alone —
   certificate renewal uses the latter.

3. Upload `cwater-site.zip`, then **Extract** it in place.

4. Turn on **Settings → Show Hidden Files (dotfiles)** and confirm `.htaccess`
   is there. If it is missing, the site will still load but `/` will not
   redirect to `/en` and no page URL will resolve — create it by uploading
   `public/.htaccess` on its own.

5. Delete the zip.

### Permissions

The defaults are almost always right. If anything 403s, set directories to
`755` and files to `644` (File Manager → Select All → Permissions). Never set
anything to `777` — several hosts refuse to execute PHP in a world-writable
directory, so it breaks the forms rather than fixing them.

---

## After the first deploy — verify, in this order

### 1. Routing

Staging URLs below; for production drop the `/cwaterv2`.

| URL | Expected |
| --- | --- |
| `nsd-eg.com/cwaterv2` | the English homepage (via `index.html`) |
| `nsd-eg.com/cwaterv2/` | 302 → `/cwaterv2/en` |
| `nsd-eg.com/cwaterv2/en` | English homepage |
| `nsd-eg.com/cwaterv2/ar` | Arabic homepage, right-to-left |
| `nsd-eg.com/cwaterv2/en/solutions/cooling-water` | loads without `.html` |
| `nsd-eg.com/cwaterv2/en/solutions.html` | 301 → `/cwaterv2/en/solutions` |
| `nsd-eg.com/cwaterv2/en/does-not-exist` | the styled 404 page |
| `nsd-eg.com/cwaterv2/sitemap.xml` | XML, 196 URLs |

If every page 404s, `.htaccess` did not upload. If `/cwaterv2/en` 403s
instead, the host is ignoring `DirectorySlash Off` — ask support to allow it,
or the pages resolve but the two homepages do not.

Note that `robots.txt` is only read at a domain root, so the staging copy's
copy is ignored by crawlers. The `X-Robots-Tag` header is what actually keeps
it out of search results — confirm it with:

```bash
curl -sI https://nsd-eg.com/cwaterv2/en | grep -i x-robots-tag
```

### 2. Search

Open any page, click the search icon, type `cooling tower`. Results should
appear. If they do not, check the browser's network tab for
`/search-index-en.json` — a 404 there means the JSON files did not upload.

### 3. The forms — do this before announcing the site

Send one real submission through **each** of the three forms, including one
with a PDF attached:

- `…/en/contact` with *Talk to an engineer* → should arrive at the technical inbox
- `…/en/request-quote` → should arrive at the commercial inbox
- `…/en/request-solution` → technical inbox, with the attachment

**This is the part that has not been tested anywhere but on the host.** The PHP
parses cleanly and every function it calls is a standard builtin, but there is
no PHP runtime in the development environment, so it has never actually run.
Everything else in this document was verified against the built output.

Each should end on a success panel showing a reference like `ENQ-260825-4K2P`.

**If the success panel appears but no email arrives**, the enquiry is not lost.
Every submission is written to a log outside the web root before delivery is
attempted:

```
/home/<cpanel-user>/cwater-leads/leads.jsonl
/home/<cpanel-user>/cwater-leads/attachments/
```

Open the log in File Manager. A line with `"event":"MAIL_FAILED"` means PHP's
`mail()` was refused — usually because `LEAD_FROM_EMAIL` is not a real mailbox
on the domain, or the host requires SMTP authentication. Fix the mailbox first;
if the host blocks `mail()` entirely, ask them to enable it or switch the
script to SMTP.

If the directory does not exist at all, PHP could not create it. Create
`cwater-leads` manually next to `public_html`, set it to `755`, and resubmit.

### 4. Security headers

```bash
curl -sI https://cw-eg.com/en | grep -i -E 'x-content-type|x-frame|referrer|permissions|strict-transport'
```

All five should be present. `Strict-Transport-Security` only appears over
HTTPS, which is correct.

### 5. HTTPS

Install the free AutoSSL certificate in cPanel → **SSL/TLS Status** first.
The `.htaccess` forces HTTPS, so a missing certificate produces a warning on
every page rather than a quiet downgrade.

---

## Updating the site later

Rebuild and re-upload. Nothing on the server holds state that a deploy would
destroy, with two exceptions worth knowing:

- `cwater-leads/` lives **outside** the document root and is untouched by a
  deploy. Leave it there.
- Re-uploading replaces `api/leads.php`, `.htaccess` and `index.html`, all
  three of which are generated. Any change made on the server is lost; make it
  in `deploy.targets.json` or `scripts/htaccess.template` instead.

```bash
npm run deploy -- staging
```

Extract over the existing files. Deleting the old `_next` directory first is
tidier — its filenames are content-hashed, so old chunks accumulate otherwise —
but it is not required for correctness.

---

## Vercel

**Push the source, not `out/`.** Vercel runs `next build` itself on every
push; there is nothing to upload. If the repository currently holds a built
`out/` folder, replace its contents with the project source — `out/` is
gitignored precisely so it cannot be deployed by accident.

Verify the build locally first:

```bash
npm run deploy -- vercel
```

That builds exactly what Vercel will build and prints the environment it needs.

### Project configuration

[`vercel.json`](../vercel.json) is committed, and its settings take precedence
over anything in the dashboard:

```json
{
  "framework": "nextjs",
  "installCommand": "npm ci",
  "buildCommand": "npm run deploy -- vercel"
}
```

This matters because Vercel auto-detected the project while the repository still
held a built static export, and settled on framework **Other** with no build
step — a deployment that finished in a second and copied files. Committing the
configuration means the correct build is version-controlled rather than
remembered in a dashboard.

The build command runs the deploy script rather than `next build` directly, for
two reasons: it guarantees `prebuild` regenerates the search index, and it takes
the site URL, the indexing rule and the forms endpoint from the `vercel` entry
in `deploy.targets.json` — one source of truth shared with the cPanel targets.

**So `NEXT_PUBLIC_SITE_URL` and `SITE_NOINDEX` do not need to be set by hand.**
Change them in `deploy.targets.json` and push.

### Environment variables

Only the mail settings, because only they are secret. Set them in **Settings →
Environment Variables** for Production, Preview and Development;
[`.env.example`](../.env.example) documents every variable the app reads.

| Variable | Value |
| --- | --- |
| `RESEND_API_KEY` | from [resend.com](https://resend.com) |
| `LEAD_FROM_EMAIL` | `website@cw-eg.com` |
| `LEAD_TO_COMMERCIAL` | the sales inbox |
| `LEAD_TO_TECHNICAL` | the engineering inbox |

These are read per request, so changing one takes effect without a rebuild.

### Mail

Delivery goes through [Resend](https://resend.com): an HTTP API rather than
SMTP, because a serverless function has no local mail transport. There is no
new dependency — the route calls it with `fetch`.

Two things have to be true before a message will arrive:

1. **The sending domain is verified with Resend** (Domains → Add Domain, then
   the DNS records it gives you). Until then Resend accepts nothing from
   `@cw-eg.com`.
2. **`LEAD_FROM_EMAIL` is on that domain.** The visitor's own address goes into
   `Reply-To`; sending *as* them fails SPF and lands in spam.

**If delivery is not configured, the forms return an error rather than a
success.** That is deliberate. On serverless there is no writable disk to fall
back on the way the PHP has, so a success screen would mean an enquiry that
reached nobody and left no trace. An error the visitor can act on is the better
failure.

### Verify after deploying

| Check | Expected |
| --- | --- |
| `/` | 307 → `/en` |
| `/en`, `/ar` | homepages, Arabic right-to-left |
| `curl -sI …/en \| grep -i x-robots` | `noindex, nofollow` while `SITE_NOINDEX=1` |
| a real contact submission | success panel **and** a message in the inbox |

If the form shows its error state, open the deployment's **Runtime Logs** in
Vercel — the route logs the reason, and an unconfigured or unverified sender is
by far the most likely one.

---

## Things that do not work on this host, by design

Static hosting trades a few Next.js features away. All of them were either
unused or moved:

| Feature | Status |
| --- | --- |
| Image optimisation (`next/image` resizing) | Off. Images are served as authored; the site uses SVG and a single OG card, so nothing regresses. |
| Route handlers (`/api/*` in Next) | Replaced by `api/leads.php`. |
| Server-side `searchParams` | The search page reads `?q=` in the browser instead. |
| `headers()` / `redirects()` in `next.config.ts` | Moved to `.htaccess`. |
| Incremental revalidation | Not used — content is code, so a content change is a rebuild. |

One thing a subdirectory adds rather than removes: **every URL has to carry the
prefix**. Next handles `<Link>`, route files and `_next` assets from
`basePath`; a hand-written `<a href>`, a `next/image` src under
`unoptimized`, a metadata icon and anything passed to `fetch()` do not, and go
through `withBasePath()` in [`src/lib/base-path.ts`](../src/lib/base-path.ts)
instead. The deploy script scans the finished export and fails the build if it
finds a site-absolute URL outside the prefix, so this cannot regress quietly.

---

## Where the two shapes are decided

Four files, and nothing else in the codebase knows which host it is on:

| File | Decides |
| --- | --- |
| `deploy.targets.json` | the destinations, and what differs between them |
| `scripts/build-deploy.mjs` | sets the environment for one target and builds it |
| `next.config.ts` | export vs Node app, and the `pageExtensions` that follow |
| `scripts/htaccess.template` | what Apache is told — export targets only |

Adding a destination is one entry in `deploy.targets.json`. Adding a *platform*
means one more branch in `build-deploy.mjs`; everything downstream already
reads from the target.
