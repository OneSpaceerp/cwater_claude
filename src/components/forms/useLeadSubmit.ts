'use client';

import { useState } from 'react';
import { track, type AnalyticsEvent } from '@/lib/analytics';
import { withBasePath } from '@/lib/base-path';

export type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

/**
 * Where enquiries are posted.
 *
 * The two deployments answer at different paths: a Node host runs the route
 * handler at `/api/leads`, while the cPanel static export has no server and
 * uses a PHP script at `/api/leads.php`. Both validate against the same rules
 * and return the same `{ ok, reference }` shape, so nothing below this line
 * cares which is in play.
 *
 * `scripts/build-deploy.mjs` sets the variable for the export build; the Node
 * default applies everywhere else, including `npm run dev`.
 */
const LEADS_ENDPOINT = withBasePath(process.env.NEXT_PUBLIC_LEADS_ENDPOINT || '/api/leads');

/**
 * Shared submission handling for every lead form.
 *
 * Posts multipart form data so attachments travel with the payload, and keeps
 * the four UI states the brief asks for — loading, success, error and retry —
 * in one place rather than reimplemented per form.
 */
export function useLeadSubmit(successEvent: AnalyticsEvent) {
  const [state, setState] = useState<SubmitState>('idle');
  const [reference, setReference] = useState<string | null>(null);
  const [errorCode, setErrorCode] = useState<string | null>(null);

  async function submit(payload: unknown, files: File[] = []): Promise<boolean> {
    setState('submitting');
    setErrorCode(null);

    try {
      const body = new FormData();
      body.append('payload', JSON.stringify(payload));
      /* `files[]`, not `files` — PHP only collects repeated fields into an
         array when the name carries the brackets. */
      for (const file of files) body.append('files[]', file);

      const response = await fetch(LEADS_ENDPOINT, { method: 'POST', body });
      const data = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        reference?: string;
        error?: string;
      };

      if (!response.ok || !data.ok) {
        setErrorCode(data.error ?? 'submit_failed');
        setState('error');
        return false;
      }

      setReference(data.reference ?? null);
      setState('success');
      track(successEvent);
      return true;
    } catch {
      setErrorCode('network');
      setState('error');
      return false;
    }
  }

  const retry = () => setState('idle');

  return { state, reference, errorCode, submit, retry };
}
