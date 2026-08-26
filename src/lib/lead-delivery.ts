import 'server-only';
import type { Lead } from '@/lib/leads';

/**
 * Lead delivery for the Node deployment.
 *
 * The cPanel build has no server, so it delivers through `public/api/leads.php`
 * and PHP's `mail()`. This is the equivalent for a host that runs Node: same
 * two-inbox routing, same message, delivered over a transactional email API
 * instead.
 *
 * Serverless has no writable disk, so there is no on-disk log to fall back on
 * the way the PHP has. That makes the failure mode different and worth being
 * deliberate about: if delivery fails, the visitor is told, rather than shown a
 * success screen for an enquiry that went nowhere.
 */

/* -------------------------------------------------------------------------- *
 *  Configuration — all from the environment, none of it in the repo.
 * -------------------------------------------------------------------------- */

interface MailConfig {
  apiKey: string;
  from: string;
  commercial: string;
  technical: string;
  cc: string[];
}

/**
 * Reads the mail configuration, or returns null when it is incomplete.
 *
 * Deliberately not cached at module scope: on a serverless platform the module
 * may be evaluated before the environment is fully populated, and a null cached
 * at cold start would persist for the life of the instance.
 */
function readConfig(): MailConfig | null {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.LEAD_FROM_EMAIL;
  const commercial = process.env.LEAD_TO_COMMERCIAL;
  const technical = process.env.LEAD_TO_TECHNICAL;

  if (!apiKey || !from || !commercial || !technical) return null;

  return {
    apiKey,
    from,
    commercial,
    technical,
    cc: (process.env.LEAD_CC ?? '').split(',').map((s) => s.trim()).filter(Boolean),
  };
}

export function deliveryConfigured(): boolean {
  return readConfig() !== null;
}

/* -------------------------------------------------------------------------- *
 *  Routing — mirrors route_for() in public/api/leads.php
 * -------------------------------------------------------------------------- */

/** Commercial enquiries to one inbox, technical to the other. */
function recipientFor(lead: Lead, config: MailConfig): string {
  if (lead.kind === 'solution') return config.technical;
  if (lead.kind === 'quote') return config.commercial;
  return lead.intent === 'engineer' || lead.intent === 'support'
    ? config.technical
    : config.commercial;
}

/* -------------------------------------------------------------------------- *
 *  Message body — mirrors build_lead_body() in public/api/leads.php
 * -------------------------------------------------------------------------- */

function buildBody(reference: string, lead: Lead, files: File[]): string {
  const lines: string[] = [];
  const row = (label: string, value: string | string[] | undefined) => {
    if (!value || value.length === 0) return;
    lines.push(`${`${label}:`.padEnd(16)}${Array.isArray(value) ? value.join(', ') : value}`);
  };

  lines.push('C-WATER WEBSITE ENQUIRY', '='.repeat(60));
  row('Reference', reference);
  row('Type', lead.kind);
  row('Received', `${new Date().toISOString().slice(0, 16).replace('T', ' ')} UTC`);
  row('Language', lead.locale === 'ar' ? 'Arabic' : 'English');
  lines.push('');

  lines.push('CONTACT', '-'.repeat(60));
  row('Name', lead.name);
  row('Job title', lead.jobTitle);
  row('Company', lead.company);
  row('Email', lead.email);
  row('Phone', lead.phone);
  row('City', lead.city);
  row('Country', lead.country);
  lines.push('');

  lines.push('REQUEST', '-'.repeat(60));

  if (lead.kind === 'solution') {
    row('Needs', lead.needs);
    row('System type', lead.systemType);
    row('Problems', lead.problems);
    row('Objectives', lead.objectives);
    row('Industry', lead.industry);
    row('Stage', lead.projectStage);
    row('Required by', lead.requiredBy);
    if (lead.systemDetail) lines.push('', 'System detail:', lead.systemDetail);
  } else if (lead.kind === 'quote') {
    row('Application', lead.application);
    row('Industry', lead.industry);
    row('Stage', lead.projectStage);
    row('Required by', lead.requiredBy);
    if (lead.items.length > 0) {
      lines.push('', 'Items:');
      for (const item of lead.items) {
        lines.push(`  ${item.quantity} x ${item.name}  (${item.slug})`);
      }
    }
  } else {
    row('Intent', lead.intent);
  }

  if (lead.message) lines.push('', 'Message:', lead.message);

  lines.push('', 'ATTACHMENTS', '-'.repeat(60));
  if (files.length === 0) {
    lines.push('None.');
  } else {
    for (const file of files) {
      lines.push(`  ${file.name}  (${Math.round(file.size / 1024)} KB)`);
    }
  }

  lines.push(
    '',
    '='.repeat(60),
    'Sent by the C-Water website. Reply to this message to answer the sender.',
  );

  return lines.join('\n');
}

/* -------------------------------------------------------------------------- *
 *  Send
 * -------------------------------------------------------------------------- */

/** Attachments beyond this are named in the body but not attached. */
const MAX_ATTACHED_BYTES = 15 * 1024 * 1024;

export class DeliveryError extends Error {}

/**
 * Sends the enquiry. Throws on any failure — the caller turns that into an
 * error response, because a success screen over a failed send is worse than an
 * error the visitor can act on.
 */
export async function deliverLead(lead: Lead, files: File[], reference: string): Promise<void> {
  const config = readConfig();
  if (!config) {
    throw new DeliveryError(
      'Lead delivery is not configured. Set RESEND_API_KEY, LEAD_FROM_EMAIL, ' +
        'LEAD_TO_COMMERCIAL and LEAD_TO_TECHNICAL in the deployment environment.',
    );
  }

  let attachmentBytes = 0;
  const attachments: { filename: string; content: string }[] = [];
  for (const file of files) {
    if (attachmentBytes + file.size > MAX_ATTACHED_BYTES) break;
    attachmentBytes += file.size;
    const buffer = Buffer.from(await file.arrayBuffer());
    attachments.push({ filename: file.name, content: buffer.toString('base64') });
  }

  const kindLabel = { solution: 'Solution request', quote: 'Quote request', contact: 'Enquiry' }[
    lead.kind
  ];

  /* RESEND_API_URL overrides the endpoint. Left unset in every deployment; it
     exists so the composed request — routing, reply-to, attachments — can be
     asserted against a local receiver instead of being sent to real inboxes. */
  const endpoint = process.env.RESEND_API_URL || 'https://api.resend.com/emails';

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: `C-Water Website <${config.from}>`,
      to: [recipientFor(lead, config)],
      ...(config.cc.length > 0 ? { cc: config.cc } : {}),
      /* The visitor's own address, so Reply in the mail client reaches them.
         Sending *as* them would fail SPF and land the message in spam. */
      reply_to: `${lead.name} <${lead.email}>`,
      subject: `[${reference}] ${kindLabel} — ${lead.company}`,
      text: buildBody(reference, lead, files),
      ...(attachments.length > 0 ? { attachments } : {}),
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => '');
    throw new DeliveryError(`Mail provider returned ${response.status}: ${detail.slice(0, 300)}`);
  }
}
