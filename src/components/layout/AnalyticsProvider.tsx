'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { dataLayerProvider, registerAnalyticsProvider, track } from '@/lib/analytics';

/**
 * Registers the analytics destination once and records page views on route
 * change. Swapping providers means changing the registered adapter here —
 * no component that calls `track()` needs to know which tool is in use.
 */
export function AnalyticsProvider() {
  useEffect(() => {
    registerAnalyticsProvider(dataLayerProvider);
  }, []);

  const pathname = usePathname();
  useEffect(() => {
    track('page_view');
  }, [pathname]);

  return null;
}
