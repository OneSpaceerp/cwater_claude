import { z } from 'zod';

/**
 * Lead submission schemas.
 *
 * Shared by the client forms and the API route, so validation cannot drift
 * between the two — the browser check is a convenience, and the server check
 * is the one that counts.
 */

/* Upload policy: extension and MIME must agree, and both must be on the list.
   Checking only one of the two is how a mislabelled file gets through. */
export const ALLOWED_FILE_TYPES: Record<string, string[]> = {
  pdf: ['application/pdf'],
  jpg: ['image/jpeg'],
  jpeg: ['image/jpeg'],
  png: ['image/png'],
  docx: ['application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  xlsx: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
};

export const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10 MB
export const MAX_FILES = 5;

export function fileExtension(name: string): string {
  const parts = name.toLowerCase().split('.');
  return parts.length > 1 ? parts.pop()! : '';
}

/** True when the extension is allowed and the declared MIME type matches it. */
export function isAllowedUpload(name: string, mime: string): boolean {
  const ext = fileExtension(name);
  const allowed = ALLOWED_FILE_TYPES[ext];
  if (!allowed) return false;
  // Some browsers send an empty type for .docx/.xlsx; accept on extension then.
  if (!mime) return ext === 'docx' || ext === 'xlsx';
  return allowed.includes(mime);
}

/* -------------------------------------------------------------------------- */

const phonePattern = /^[+()\d\s.-]{6,24}$/;

/**
 * Honeypot field.
 *
 * Deliberately permissive: rejecting a non-empty value at the schema level
 * would return a validation error naming `website`, which tells a bot exactly
 * which field is the trap. Instead the value is accepted here and handled by
 * the route, which responds with an ordinary success so a bot learns nothing
 * from the difference.
 */
const honeypot = z.string().max(200).optional().or(z.literal(''));

const contactShape = {
  name: z.string().trim().min(2).max(120),
  company: z.string().trim().min(1).max(160),
  jobTitle: z.string().trim().max(120).optional().or(z.literal('')),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().regex(phonePattern).max(40).optional().or(z.literal('')),
  country: z.string().trim().max(80).optional().or(z.literal('')),
  city: z.string().trim().max(80).optional().or(z.literal('')),
  consent: z.literal(true),
};

export const solutionRequestSchema = z.object({
  kind: z.literal('solution'),
  needs: z.array(z.string().max(60)).min(1).max(10),
  systemType: z.string().trim().max(80).optional().or(z.literal('')),
  systemDetail: z.string().trim().max(4000).optional().or(z.literal('')),
  problems: z.array(z.string().max(60)).max(12).default([]),
  objectives: z.array(z.string().max(60)).max(12).default([]),
  industry: z.string().trim().max(80).optional().or(z.literal('')),
  projectStage: z.string().trim().max(80).optional().or(z.literal('')),
  requiredBy: z.string().trim().max(40).optional().or(z.literal('')),
  message: z.string().trim().max(4000).optional().or(z.literal('')),
  locale: z.enum(['en', 'ar']),
  website: honeypot,
  ...contactShape,
});

export const quoteRequestSchema = z.object({
  kind: z.literal('quote'),
  items: z
    .array(
      z.object({
        slug: z.string().max(80),
        name: z.string().max(160),
        quantity: z.coerce.number().int().min(1).max(9999).default(1),
      }),
    )
    .max(30)
    .default([]),
  application: z.string().trim().max(120).optional().or(z.literal('')),
  industry: z.string().trim().max(80).optional().or(z.literal('')),
  projectStage: z.string().trim().max(80).optional().or(z.literal('')),
  requiredBy: z.string().trim().max(40).optional().or(z.literal('')),
  message: z.string().trim().max(4000).optional().or(z.literal('')),
  locale: z.enum(['en', 'ar']),
  website: honeypot,
  ...contactShape,
});

export const contactRequestSchema = z.object({
  kind: z.literal('contact'),
  intent: z.enum(['sales', 'engineer', 'support', 'general']),
  message: z.string().trim().min(10).max(4000),
  locale: z.enum(['en', 'ar']),
  website: honeypot,
  ...contactShape,
});

export const leadSchema = z.discriminatedUnion('kind', [
  solutionRequestSchema,
  quoteRequestSchema,
  contactRequestSchema,
]);

export type SolutionRequest = z.infer<typeof solutionRequestSchema>;
export type QuoteRequest = z.infer<typeof quoteRequestSchema>;
export type ContactRequest = z.infer<typeof contactRequestSchema>;
export type Lead = z.infer<typeof leadSchema>;

/** Human-readable reference returned to the visitor on success. */
export function referenceFor(kind: Lead['kind']): string {
  const prefix = kind === 'quote' ? 'RFQ' : kind === 'solution' ? 'SOL' : 'ENQ';
  const stamp = new Date().toISOString().slice(2, 10).replace(/-/g, '');
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${prefix}-${stamp}-${random}`;
}
