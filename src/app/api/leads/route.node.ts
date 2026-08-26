import { NextResponse } from 'next/server';
import { deliverLead, DeliveryError } from '@/lib/lead-delivery';
import { isAllowedUpload, leadSchema, MAX_FILE_BYTES, MAX_FILES, referenceFor } from '@/lib/leads';

/**
 * Lead intake for the Node deployment.
 *
 * Accepts multipart form data so technical documents can travel with the
 * enquiry, revalidates every field against the shared schema (the browser check
 * is a convenience, this one is the control), enforces the upload policy, then
 * delivers to one of two inboxes.
 *
 * `public/api/leads.php` is the same endpoint for the cPanel build, where there
 * is no Node process. The two are commented as a pair: a limit changed in one
 * has to change in the other.
 *
 * FILENAME: `route.node.ts`, not `route.ts`. `node.ts` is only a recognised
 * page extension when NEXT_OUTPUT_EXPORT is unset, so this file simply does not
 * exist as far as the static export build is concerned — a POST handler cannot
 * be prerendered, and its presence would fail that build outright. See
 * next.config.ts.
 */

export const runtime = 'nodejs';
/* Uploads are read in full before delivery; the default 10s is not enough for
   five files over a slow connection. */
export const maxDuration = 30;

/*
 * A small in-memory rate limit.
 *
 * On serverless this is per-instance, so it throttles a single attacker
 * unevenly rather than absolutely — enough to stop casual abuse of a public
 * form, and honest about not being a defence against a distributed flood. That
 * belongs at the platform edge.
 */
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((ts) => now - ts < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  // Keep the map from growing without bound on a long-lived instance.
  if (hits.size > 5000) {
    for (const [k, v] of hits) {
      if (v.every((ts) => now - ts >= WINDOW_MS)) hits.delete(k);
    }
  }
  return recent.length > MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown';

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: 'rate_limited' },
      { status: 429, headers: { 'Retry-After': '60' } },
    );
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ ok: false, error: 'bad_request' }, { status: 400 });
  }

  const rawPayload = form.get('payload');
  if (typeof rawPayload !== 'string') {
    return NextResponse.json({ ok: false, error: 'missing_payload' }, { status: 400 });
  }

  let parsedJson: unknown;
  try {
    parsedJson = JSON.parse(rawPayload);
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  const result = leadSchema.safeParse(parsedJson);
  if (!result.success) {
    return NextResponse.json(
      { ok: false, error: 'validation_failed', issues: result.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const lead = result.data;

  /* Honeypot: a real visitor never fills this. Respond as success so a bot
     gains no signal from the difference — and send nothing. */
  if (lead.website) {
    return NextResponse.json({ ok: true, reference: referenceFor(lead.kind) });
  }

  /* ---- Attachment validation ------------------------------------------- */
  /* The client posts `files[]` so PHP collects it as an array; the brackets
     are part of the field name here too. */
  const files = [...form.getAll('files[]'), ...form.getAll('files')].filter(
    (entry): entry is File => entry instanceof File,
  );

  if (files.length > MAX_FILES) {
    return NextResponse.json({ ok: false, error: 'too_many_files' }, { status: 422 });
  }

  for (const file of files) {
    if (file.size > MAX_FILE_BYTES) {
      return NextResponse.json(
        { ok: false, error: 'file_too_large', file: file.name },
        { status: 422 },
      );
    }
    if (!isAllowedUpload(file.name, file.type)) {
      return NextResponse.json(
        { ok: false, error: 'unsupported_file_type', file: file.name },
        { status: 422 },
      );
    }
  }

  /* ---- Delivery -------------------------------------------------------- */
  const reference = referenceFor(lead.kind);

  try {
    await deliverLead(lead, files, reference);
  } catch (error) {
    /* There is no writable disk to fall back on here, so the enquiry really has
       not reached anyone. Say so: a success screen over a failed send loses the
       lead silently, which is the one outcome worth avoiding. */
    console.error('[lead] delivery failed', reference, error instanceof Error ? error.message : error);
    return NextResponse.json(
      { ok: false, error: error instanceof DeliveryError ? 'delivery_failed' : 'submit_failed' },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, reference });
}
