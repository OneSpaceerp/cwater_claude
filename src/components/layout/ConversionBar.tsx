'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ButtonLink } from '@/components/ui/Button';
import { dictionary as D } from '@/content/dictionary';
import { localePath, t, type Locale } from '@/lib/i18n';

/**
 * The floating conversion bar.
 *
 * Appears only after the visitor has actually read something — 45% of the
 * page — so it reads as a helpful next step rather than an interruption. It is
 * dismissible, and the dismissal persists for the session.
 */
const DISMISS_KEY = 'cw-conversion-dismissed';

/* sessionStorage is external mutable state, so it is read through
   useSyncExternalStore rather than copied into React state by an effect. The
   server snapshot is `true` (dismissed) so the bar never appears in the
   prerendered HTML and cannot flash before hydration. */
const dismissStore = {
  listeners: new Set<() => void>(),
  subscribe(listener: () => void) {
    dismissStore.listeners.add(listener);
    return () => dismissStore.listeners.delete(listener);
  },
  getSnapshot: () => sessionStorage.getItem(DISMISS_KEY) === '1',
  getServerSnapshot: () => true,
  dismiss() {
    sessionStorage.setItem(DISMISS_KEY, '1');
    dismissStore.listeners.forEach((listener) => listener());
  },
};

export function ConversionBar({ locale }: { locale: Locale }) {
  const [visible, setVisible] = useState(false);
  const dismissed = useSyncExternalStore(
    dismissStore.subscribe,
    dismissStore.getSnapshot,
    dismissStore.getServerSnapshot,
  );
  const reduce = useReducedMotion();

  useEffect(() => {
    if (dismissed) return;
    const onScroll = () => {
      const scrollable = document.body.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      setVisible(window.scrollY / scrollable > 0.45);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [dismissed]);

  const dismiss = () => {
    setVisible(false);
    dismissStore.dismiss();
  };

  return (
    <AnimatePresence>
      {visible && !dismissed ? (
        <motion.div
          initial={reduce ? false : { y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduce ? { opacity: 0 } : { y: 80, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="theme-dark fixed inset-x-0 bottom-0 z-40 border-t border-white/12 bg-ink-950/95 backdrop-blur-xl print:hidden"
        >
          <div className="container-page flex flex-wrap items-center justify-between gap-4 py-3.5">
            <p className="text-sm font-medium text-white">{t(D.conversionBar.prompt, locale)}</p>
            <div className="flex items-center gap-2.5">
              <ButtonLink href={localePath(locale, 'contact?intent=engineer')} size="sm">
                {t(D.talkToEngineer, locale)}
              </ButtonLink>
              <ButtonLink href={localePath(locale, 'request-quote')} variant="outline-light" size="sm">
                {t(D.requestQuote, locale)}
              </ButtonLink>
              <button
                type="button"
                onClick={dismiss}
                aria-label={t(D.conversionBar.dismiss, locale)}
                className="flex h-9 w-9 items-center justify-center rounded-sm text-ink-400 transition-colors hover:bg-white/10 hover:text-white"
              >
                <svg viewBox="0 0 20 20" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden>
                  <path d="m5 5 10 10M15 5 5 15" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
