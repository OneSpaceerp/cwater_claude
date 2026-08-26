/**
 * Analytics event layer.
 *
 * Provider-agnostic by design: components call `track()` and never reference a
 * vendor. Events are pushed to a `dataLayer`-style queue and forwarded to
 * whichever provider is registered at runtime, so swapping GA4 for Plausible,
 * Matomo or a first-party endpoint means changing one adapter — not the call
 * sites scattered across the site.
 */

export type AnalyticsEvent =
  | 'page_view'
  | 'solution_view'
  | 'industry_view'
  | 'technology_view'
  | 'product_view'
  | 'partner_view'
  | 'service_view'
  | 'project_view'
  | 'article_view'
  | 'search_used'
  | 'document_download'
  | 'document_requested'
  | 'solution_finder_started'
  | 'solution_finder_step'
  | 'solution_finder_completed'
  | 'quote_started'
  | 'quote_item_added'
  | 'quote_submitted'
  | 'engineering_request_started'
  | 'engineering_request_step'
  | 'engineering_request_submitted'
  | 'support_request'
  | 'contact_submitted'
  | 'cta_click'
  | 'language_switched';

export type EventPayload = Record<string, string | number | boolean | undefined>;

interface QueuedEvent {
  event: AnalyticsEvent;
  payload: EventPayload;
  ts: number;
}

type Provider = (event: AnalyticsEvent, payload: EventPayload) => void;

const queue: QueuedEvent[] = [];
let provider: Provider | null = null;

/**
 * Register the analytics destination. Call once from a client component in the
 * root layout. Any events fired before registration are replayed in order.
 */
export function registerAnalyticsProvider(next: Provider): void {
  provider = next;
  while (queue.length > 0) {
    const queued = queue.shift()!;
    try {
      provider(queued.event, queued.payload);
    } catch {
      // A failing analytics provider must never break the page.
    }
  }
}

/** Record an event. Safe to call during SSR — it becomes a no-op. */
export function track(event: AnalyticsEvent, payload: EventPayload = {}): void {
  if (typeof window === 'undefined') return;

  const enriched: EventPayload = {
    ...payload,
    locale: document.documentElement.lang || undefined,
    path: window.location.pathname,
  };

  if (provider) {
    try {
      provider(event, enriched);
    } catch {
      /* ignore */
    }
    return;
  }

  queue.push({ event, payload: enriched, ts: Date.now() });
  // Cap the buffer so a page with no provider registered cannot grow unbounded.
  if (queue.length > 100) queue.shift();
}

/**
 * Default adapter: pushes to `window.dataLayer`, which GTM, GA4 and several
 * other tools consume without further configuration. Register a different
 * adapter to send events elsewhere.
 */
export function dataLayerProvider(event: AnalyticsEvent, payload: EventPayload): void {
  const w = window as unknown as { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer ?? [];
  w.dataLayer.push({ event, ...payload });
}

/** Content-type view events, keyed so page components stay declarative. */
export const viewEventFor: Record<string, AnalyticsEvent> = {
  solution: 'solution_view',
  industry: 'industry_view',
  technology: 'technology_view',
  product: 'product_view',
  partner: 'partner_view',
  service: 'service_view',
  project: 'project_view',
  article: 'article_view',
};
