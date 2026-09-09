/**
 * Builds a deployable copy of the site for one named target.
 *
 *   npm run deploy -- staging
 *   npm run deploy -- production
 *
 * Targets live in deploy.targets.json. They exist because the site URL, the
 * subdirectory prefix, the indexing rule and the form recipients are all baked
 * into the build and cannot be corrected after upload — so getting one wrong is
 * silent until someone notices the canonical tags point at the wrong host. One
 * command, one named destination, no environment variables to remember.
 *
 * (Passing NEXT_PUBLIC_BASE_PATH by hand is its own trap on Windows: Git Bash
 * rewrites a value starting with `/` into a Windows path, so `/cwaterv2`
 * arrives as `C:/Program Files/Git/cwaterv2`. This script sets it in-process,
 * where nothing can mangle it.)
 *
 * Output: out/ — ready to zip and upload, including .htaccess, api/leads.php
 * with the target's addresses substituted, and an index.html redirect.
 */
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'out');

/* -------------------------------------------------------------------------- */
/*  Target                                                                    */
/* -------------------------------------------------------------------------- */

const name = process.argv[2];
const targets = JSON.parse(fs.readFileSync(path.join(ROOT, 'deploy.targets.json'), 'utf8'));
const available = Object.keys(targets).filter((k) => !k.startsWith('$'));

if (!name || !targets[name]) {
  console.error(`\nUsage: npm run deploy -- <target>\n\nTargets: ${available.join(', ')}\n`);
  process.exit(1);
}

const target = targets[name];
const basePath = target.basePath ? `/${target.basePath.replace(/^\/+|\/+$/g, '')}` : '';
const siteUrl = target.siteUrl.replace(/\/+$/, '');

/* The two must agree, or canonical URLs point somewhere the pages are not. */
if (basePath && !siteUrl.endsWith(basePath)) {
  console.error(`\n  siteUrl "${siteUrl}" does not end with basePath "${basePath}".`);
  console.error('  Canonical tags would point at URLs that do not exist. Fix deploy.targets.json.\n');
  process.exit(1);
}
if (!basePath && new URL(siteUrl).pathname !== '/') {
  console.error(`\n  siteUrl "${siteUrl}" has a path but basePath is empty. Fix deploy.targets.json.\n`);
  process.exit(1);
}

/*
 * Two deployment shapes. A Node host runs the app, so the lead route handler is
 * compiled in and the forms post to /api/leads. A static export has no server,
 * so the handler is excluded (see `pageExtensions` in next.config.ts) and the
 * forms post to the PHP script instead.
 */
const isNodeHost = target.platform === 'vercel';
const leadsEndpoint = isNodeHost ? '/api/leads' : '/api/leads.php';

console.log(`\n▸ Building for "${name}" — ${target.label}`);
console.log(`  shape     ${isNodeHost ? 'Node app (route handlers, image optimisation)' : 'static export'}`);
console.log(`  site      ${siteUrl}`);
console.log(`  basePath  ${basePath || '(domain root)'}`);
console.log(`  indexing  ${target.noindex ? 'BLOCKED (X-Robots-Tag: noindex)' : 'allowed'}`);
console.log(`  forms     POST ${leadsEndpoint}`);
console.log(
  `  leads     ${isNodeHost ? 'from the deployment environment (see below)' : `${target.leads.commercial} / ${target.leads.technical}, from ${target.leads.from}`}\n`,
);

/* -------------------------------------------------------------------------- */
/*  Build                                                                     */
/* -------------------------------------------------------------------------- */

/* maxRetries: on Windows an indexer or a lingering watcher can hold a handle
   in .next for a moment after the previous build, and rmSync then throws
   ENOTEMPTY on a directory that is about to be free. */
const wipe = (dir) => fs.rmSync(dir, { recursive: true, force: true, maxRetries: 8, retryDelay: 250 });
wipe(OUT);
wipe(path.join(ROOT, '.next'));

/* A single command string through execSync, not execFileSync: Node refuses to
   spawn a .cmd shim without a shell on Windows, and passing an args array to a
   shell is the pattern that earns a deprecation warning. Nothing here is
   interpolated, so there is nothing for the shell to mangle. */
execSync('npm run build', {
  cwd: ROOT,
  stdio: 'inherit',
  env: {
    ...process.env,
    NEXT_OUTPUT_EXPORT: isNodeHost ? '' : '1',
    NEXT_PUBLIC_SITE_URL: siteUrl,
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_LEADS_ENDPOINT: leadsEndpoint,
    SITE_NOINDEX: target.noindex ? '1' : '',
  },
});

/*
 * A Node host builds from the repository, not from a folder of files: Vercel
 * runs `next build` itself on every push. So there is nothing to write into
 * out/ and nothing to upload — what it needs is the environment.
 */
if (isNodeHost) {
  reportNodeHost();
  process.exit(0);
}

function reportNodeHost() {
  console.log('\n▸ Build verified. Nothing to upload — Vercel builds from the repository.\n');
  console.log('  Set these in the Vercel project (Settings → Environment Variables),');
  console.log('  for Production, Preview and Development:\n');
  const vars = [
    ['NEXT_PUBLIC_SITE_URL', siteUrl],
    ['LEAD_FROM_EMAIL', target.leads.from],
    ['LEAD_TO_COMMERCIAL', target.leads.commercial],
    ['LEAD_TO_TECHNICAL', target.leads.technical],
    ['RESEND_API_KEY', '(from resend.com — not stored in this repo)'],
    ...(target.noindex ? [['SITE_NOINDEX', '1']] : []),
  ];
  for (const [key, value] of vars) console.log(`    ${key.padEnd(22)} ${value}`);
  console.log('\n  Until RESEND_API_KEY is set, the forms return an error rather than');
  console.log('  a false success — an enquiry that reaches nobody is the worse outcome.\n');
  if (target.noindex) {
    console.log('  NOTE: this target is marked noindex, which a Node build serves from');
    console.log('  next.config.ts headers — confirm with:');
    console.log(`    curl -sI ${siteUrl}/en | grep -i x-robots-tag\n`);
  }
}

/* -------------------------------------------------------------------------- */
/*  .htaccess                                                                 */
/* -------------------------------------------------------------------------- */

/*
 * Only the export reaches this far. It is inert HTML, so Apache has to be told
 * four things about it: serve `en.html` at `/en`, send `/` to `/en`, set the
 * security headers, and cache the hashed assets forever. A Node deployment gets
 * all four from next.config.ts instead, which is why the Vercel path exits
 * above rather than writing a second config file nobody reads.
 */
const noindexBlock = target.noindex
  ? `  # ---------------------------------------------------------------------
  #  THIS IS NOT THE LIVE SITE.
  #
  #  A full second copy of the site, reachable and crawlable, would compete
  #  with the real one in search results and split its ranking signals. This
  #  header keeps it out of every index. Remove it only on the real domain —
  #  or rather, build the "production" target, which omits it.
  # ---------------------------------------------------------------------
  Header always set X-Robots-Tag "noindex, nofollow"`
  : '  # Indexing is allowed: this is the live site.';

const deployNote = [
  `#  Generated for target "${name}" — ${target.label}`,
  `#  Site: ${siteUrl}`,
  `#  Serve from: ${basePath ? `the ${basePath} directory` : 'the document root'}`,
].join('\n');

let htaccess = fs.readFileSync(path.join(ROOT, 'scripts', 'htaccess.template'), 'utf8');
htaccess = htaccess
  .replaceAll('{{REWRITE_BASE}}', `${basePath}/`)
  .replaceAll('{{BASE}}', basePath)
  .replaceAll('{{NOINDEX}}', noindexBlock)
  .replaceAll('{{DEPLOY_NOTE}}', deployNote);

if (htaccess.includes('{{')) {
  throw new Error('htaccess.template still has unfilled placeholders');
}
fs.writeFileSync(path.join(OUT, '.htaccess'), htaccess, 'utf8');

/* -------------------------------------------------------------------------- */
/*  index.html                                                                */
/* -------------------------------------------------------------------------- */

/*
 * The site has no locale-neutral homepage, so `/` is a redirect. .htaccess
 * does it properly with a 302; this file is what answers when mod_rewrite is
 * unavailable, and — more usefully — when the directory itself is requested
 * without a trailing slash, which no rewrite rule reliably catches.
 *
 * The target is absolute for exactly that reason: at /cwaterv2 (no slash) a
 * relative link would resolve against the parent directory.
 */
const home = `${basePath}/en`;
fs.writeFileSync(
  path.join(OUT, 'index.html'),
  `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>C-Water</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="refresh" content="0; url=${home}">
<link rel="canonical" href="${siteUrl}/en">
${target.noindex ? '<meta name="robots" content="noindex, nofollow">\n' : ''}<script>location.replace(${JSON.stringify(home)});</script>
<style>body{font-family:system-ui,sans-serif;background:#050B12;color:#b1afb1;display:grid;place-items:center;height:100vh;margin:0}a{color:#188ece}</style>
</head>
<body><p>Redirecting to <a href="${home}">C-Water</a>&hellip;</p></body>
</html>
`,
  'utf8',
);

/* -------------------------------------------------------------------------- */
/*  api/leads.php — substitute the target's addresses                         */
/* -------------------------------------------------------------------------- */

/*
 * The script is copied in from server/, not kept in public/.
 *
 * Anything in public/ is a static asset of EVERY build, including the Node one
 * — and a host with no PHP runtime does not execute a .php file, it serves it,
 * publishing the mail configuration to anyone who asks for the URL. Keeping it
 * outside public/ means only the target that can actually run it ever receives
 * a copy.
 */
const phpSource = path.join(ROOT, 'server', 'leads.php');
const phpPath = path.join(OUT, 'api', 'leads.php');

let php = fs.readFileSync(phpSource, 'utf8');

const swap = (constant, value) => {
  const pattern = new RegExp(`(const ${constant}\\s*=\\s*)'[^']*'`);
  if (!pattern.test(php)) throw new Error(`leads.php: could not find ${constant}`);
  php = php.replace(pattern, `$1'${value}'`);
};

swap('LEAD_TO_COMMERCIAL', target.leads.commercial);
swap('LEAD_TO_TECHNICAL', target.leads.technical);
swap('LEAD_FROM_EMAIL', target.leads.from);

php = php.replace(
  ' * WHAT TO EDIT: only the CONFIGURATION block below. Everything after it is\n * logic and should be left alone.',
  ` * Addresses below were written by scripts/build-deploy.mjs for the "${name}"\n * target. To change them, edit deploy.targets.json and rebuild — editing this\n * copy works, but the next deploy overwrites it.`,
);

fs.mkdirSync(path.dirname(phpPath), { recursive: true });
fs.writeFileSync(phpPath, php, 'utf8');

/* -------------------------------------------------------------------------- */
/*  Verify the base path was applied everywhere                               */
/* -------------------------------------------------------------------------- */

/*
 * Next prefixes what it generates — <Link>, route files, _next assets — but not
 * a hand-written <a href>, a next/image src under `unoptimized`, a metadata
 * icon URL, or anything handed to fetch(). Each of those is easy to add without
 * noticing, and the failure only appears once the site is on the host, in a
 * subdirectory, as a 404 on a link nobody happened to click before uploading.
 *
 * So the export is scanned before it ships: any site-absolute URL that is not
 * under the base path fails the build.
 */
if (basePath) {
  const allowed = new RegExp(`^(${basePath}/|#|mailto:|tel:|https?:|//|data:)`);
  const attr = /(?:href|src|start_url)"?\s*[=:]\s*"(\/[^"]*)"/g;
  const offenders = new Map();

  const scan = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        scan(full);
        continue;
      }
      if (!/\.(html|webmanifest)$/.test(entry.name)) continue;
      const text = fs.readFileSync(full, 'utf8');
      for (const m of text.matchAll(attr)) {
        if (allowed.test(m[1])) continue;
        const key = m[1].split('?')[0];
        offenders.set(key, (offenders.get(key) ?? 0) + 1);
      }
    }
  };
  scan(OUT);

  if (offenders.size > 0) {
    console.error(`\n  ${offenders.size} URL(s) in the export are missing the ${basePath} prefix:\n`);
    for (const [url, n] of [...offenders].sort((a, b) => b[1] - a[1]).slice(0, 20)) {
      console.error(`    ${String(n).padStart(5)} x  ${url}`);
    }
    console.error('\n  These 404 once the site is in a subdirectory. Route them through');
    console.error('  withBasePath() from src/lib/base-path.ts, or use <Link> instead of <a>.\n');
    process.exit(1);
  }
  console.log(`\n▸ Base path verified — every URL in the export is under ${basePath}`);
}

/* -------------------------------------------------------------------------- */
/*  Report                                                                    */
/* -------------------------------------------------------------------------- */

const count = (dir, ext) => {
  let n = 0;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) n += count(path.join(dir, entry.name), ext);
    else if (entry.name.endsWith(ext)) n++;
  }
  return n;
};

console.log('\n▸ Deploy files written');
console.log(`  out/.htaccess       RewriteBase ${basePath}/`);
console.log(`  out/index.html      → ${home}`);
console.log(`  out/api/leads.php   ${target.leads.from} → ${target.leads.commercial} / ${target.leads.technical}`);
console.log(`  ${count(OUT, '.html')} HTML files\n`);
console.log(`  Upload the CONTENTS of out/ into ${basePath ? `public_html${basePath}` : 'public_html'}\n`);
