'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ButtonLink } from '@/components/ui/Button';
import { Arrow, Icon } from '@/components/ui/Icon';
import { dictionary as D } from '@/content/dictionary';
import { primaryNav } from '@/content/site';
import { localePath, swapLocale, t, LOCALES, LOCALE_META, type Locale } from '@/lib/i18n';
import { cn } from '@/lib/utils';

/**
 * Mobile navigation.
 *
 * Ordered by the priorities set in the brief: conversion first, then
 * solutions and products. Sections with children become accordions rather
 * than a second stacked screen, so the visitor never loses their place.
 */
export function MobileMenu({
  open,
  onClose,
  locale,
}: {
  open: boolean;
  onClose: () => void;
  locale: Locale;
}) {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();

  /* Lock the page behind the sheet and trap focus inside it. */
  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="theme-dark fixed inset-0 z-[60] xl:hidden"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-label={t(D.mainNavigation, locale)}
        >
          <div className="absolute inset-0 bg-ink-950/70 backdrop-blur-sm" onClick={onClose} />

          <motion.div
            ref={panelRef}
            className="absolute inset-y-0 end-0 flex w-full max-w-[26rem] flex-col border-s border-white/10 bg-ink-950"
            initial={reduce ? false : { x: '100%' }}
            animate={{ x: 0 }}
            exit={reduce ? { opacity: 0 } : { x: '100%' }}
            transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
            style={{ ['--tw-exit' as string]: undefined }}
          >
            <div className="flex h-[4.5rem] shrink-0 items-center justify-between gap-4 border-b border-white/10 px-5">
              <span className="u-label text-ink-400">{t(D.menu, locale)}</span>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label={t(D.closeMenu, locale)}
                className="flex h-10 w-10 items-center justify-center rounded-sm text-white transition-colors hover:bg-white/10"
              >
                <svg viewBox="0 0 20 20" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden>
                  <path d="m5 5 10 10M15 5 5 15" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain">
              {/* Conversion sits above navigation on mobile, within thumb reach. */}
              <div className="grid grid-cols-2 gap-2.5 border-b border-white/10 p-5">
                <ButtonLink href={localePath(locale, 'request-solution')} size="sm" className="w-full">
                  {t(D.requestSolution, locale)}
                </ButtonLink>
                <ButtonLink
                  href={localePath(locale, 'contact?intent=engineer')}
                  variant="outline-light"
                  size="sm"
                  className="w-full"
                >
                  {t(D.talkToEngineer, locale)}
                </ButtonLink>
              </div>

              <nav className="px-5 py-2">
                <ul>
                  {primaryNav.map((section) => {
                    const isOpen = expanded === section.id;
                    if (!section.columns) {
                      return (
                        <li key={section.id} className="border-b border-white/8">
                          <Link
                            href={localePath(locale, section.href)}
                            className="flex items-center justify-between py-4 font-display text-lg font-semibold tracking-tight text-white"
                          >
                            {t(section.label, locale)}
                            <Arrow size={15} className="text-ink-400" />
                          </Link>
                        </li>
                      );
                    }
                    return (
                      <li key={section.id} className="border-b border-white/8">
                        <button
                          type="button"
                          onClick={() => setExpanded(isOpen ? null : section.id)}
                          aria-expanded={isOpen}
                          aria-controls={`m-${section.id}`}
                          className="flex w-full items-center justify-between py-4 text-start font-display text-lg font-semibold tracking-tight text-white"
                        >
                          {t(section.label, locale)}
                          <span
                            aria-hidden
                            className={cn(
                              'relative h-4 w-4 text-ink-400 transition-transform duration-300',
                              isOpen && 'rotate-45',
                            )}
                          >
                            <span className="absolute top-1/2 left-0 h-px w-4 -translate-y-1/2 bg-current" />
                            <span className="absolute top-0 left-1/2 h-4 w-px -translate-x-1/2 bg-current" />
                          </span>
                        </button>
                        <AnimatePresence initial={false}>
                          {isOpen ? (
                            <motion.div
                              id={`m-${section.id}`}
                              initial={reduce ? false : { height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                              className="overflow-hidden"
                            >
                              <div className="flex flex-col gap-5 pb-5">
                                {section.columns?.map((col) => (
                                  <div key={t(col.heading, locale)}>
                                    <p className="u-label mb-2.5 text-ink-400">{t(col.heading, locale)}</p>
                                    <ul className="flex flex-col">
                                      {col.links.map((link) => (
                                        <li key={link.href}>
                                          <Link
                                            href={localePath(locale, link.href)}
                                            className="flex items-center gap-2.5 py-2 text-[0.9375rem] text-ink-200 transition-colors hover:text-white"
                                          >
                                            {link.icon ? (
                                              <Icon name={link.icon} size={16} className="text-signal-400" />
                                            ) : null}
                                            {t(link.label, locale)}
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          ) : null}
                        </AnimatePresence>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>

            <div className="flex shrink-0 items-center justify-between gap-4 border-t border-white/10 px-5 py-4">
              <Link
                href={localePath(locale, 'contact')}
                className="text-sm text-ink-300 transition-colors hover:text-white"
              >
                {t(D.kind.service, locale) === 'Service' ? 'Contact' : 'اتصل بنا'}
              </Link>
              <div className="flex items-center rounded-sm border border-white/15 p-0.5">
                {LOCALES.map((code) => (
                  <Link
                    key={code}
                    href={swapLocale(pathname, code)}
                    hrefLang={code}
                    aria-current={code === locale ? 'true' : undefined}
                    className={cn(
                      'rounded-[1px] px-3 py-1.5 text-[0.8125rem] transition-colors',
                      code === locale ? 'bg-white/15 text-white' : 'text-ink-300',
                    )}
                  >
                    {LOCALE_META[code].nativeLabel}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
