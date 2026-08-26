'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Logo } from './Logo';
import { MobileMenu } from './MobileMenu';
import { SearchDialog } from './SearchDialog';
import { ButtonLink } from '@/components/ui/Button';
import { Arrow, Icon } from '@/components/ui/Icon';
import { dictionary as D } from '@/content/dictionary';
import { primaryNav, type NavSection } from '@/content/site';
import { localePath, swapLocale, t, LOCALES, type Locale } from '@/lib/i18n';
import { cn } from '@/lib/utils';

export function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const [openId, setOpenId] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const menuId = useId();

  /* Condense the header once the visitor leaves the hero. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Any navigation closes every overlay.
     Adjusted during render rather than in an effect: React re-renders
     immediately with the corrected state instead of painting the open overlay
     first and closing it on commit. */
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpenId(null);
    setMobileOpen(false);
    setSearchOpen(false);
  }

  /* Escape closes the mega-menu and returns focus to its trigger. */
  useEffect(() => {
    if (!openId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        const trigger = navRef.current?.querySelector<HTMLElement>(`[data-nav-trigger="${openId}"]`);
        setOpenId(null);
        trigger?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [openId]);

  /* Pointer intent: a short grace period stops the panel flickering when the
     cursor crosses the gap between the trigger and the panel. */
  const scheduleClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenId(null), 140);
  }, []);
  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  const isActive = (href: string) => {
    const full = localePath(locale, href);
    return pathname === full || pathname.startsWith(`${full}/`);
  };

  const openSection = primaryNav.find((s) => s.id === openId && s.columns);

  return (
    <>
      <a
        href="#main"
        className="sr-only-focusable fixed start-4 top-4 z-[100] rounded-sm bg-signal-600 px-4 py-2.5 text-sm font-medium text-white"
      >
        {t(D.skipToContent, locale)}
      </a>

      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ease-[var(--ease-out-expo)]',
          scrolled || openId
            ? 'border-b border-white/10 bg-ink-950/92 backdrop-blur-xl'
            : 'border-b border-transparent bg-gradient-to-b from-ink-950/70 to-transparent',
        )}
        onMouseLeave={scheduleClose}
      >
        <div className="container-page">
          <div
            className={cn(
              'flex items-center justify-between gap-6 transition-[height] duration-500 ease-[var(--ease-out-expo)]',
              scrolled ? 'h-16' : 'h-[4.5rem] lg:h-20',
            )}
          >
            <Logo locale={locale} height={scrolled ? 28 : 32} priority />

            {/* ---------------- Desktop navigation ---------------- */}
            <nav
              ref={navRef}
              aria-label={t(D.mainNavigation, locale)}
              className="hidden xl:flex xl:items-center xl:gap-0.5"
            >
              {primaryNav.map((section) => (
                <NavTrigger
                  key={section.id}
                  section={section}
                  locale={locale}
                  active={isActive(section.href)}
                  expanded={openId === section.id}
                  panelId={`${menuId}-${section.id}`}
                  onOpen={() => {
                    cancelClose();
                    setOpenId(section.columns ? section.id : null);
                  }}
                  onClose={scheduleClose}
                />
              ))}
            </nav>

            {/* ---------------- Utilities ---------------- */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                aria-label={t(D.search, locale)}
                className="flex h-10 w-10 items-center justify-center rounded-sm text-ink-200 transition-colors hover:bg-white/8 hover:text-white"
              >
                <SearchGlyph />
              </button>

              <LocaleSwitch locale={locale} pathname={pathname} />

              <ButtonLink
                href={localePath(locale, 'request-solution')}
                size="sm"
                className="hidden lg:inline-flex"
              >
                {t(D.requestSolution, locale)}
              </ButtonLink>

              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                aria-label={t(D.openMenu, locale)}
                aria-expanded={mobileOpen}
                className="flex h-10 w-10 items-center justify-center rounded-sm text-white transition-colors hover:bg-white/8 xl:hidden"
              >
                <span className="flex flex-col items-center gap-[5px]" aria-hidden>
                  <span className="block h-px w-5 bg-current" />
                  <span className="block h-px w-5 bg-current" />
                  <span className="block h-px w-3.5 bg-current" />
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* ---------------- Mega-menu panel ---------------- */}
        <AnimatePresence>
          {openSection ? (
            <motion.div
              key={openSection.id}
              id={`${menuId}-${openSection.id}`}
              initial={reduce ? false : { opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={cancelClose}
              onMouseLeave={scheduleClose}
              className="theme-dark absolute inset-x-0 top-full hidden border-b border-white/10 bg-ink-950/97 backdrop-blur-xl xl:block"
            >
              <div aria-hidden className="flow-rule" />
              <MegaPanel section={openSection} locale={locale} />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} locale={locale} />
      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} locale={locale} />
    </>
  );
}

/* -------------------------------------------------------------------------- */

function NavTrigger({
  section,
  locale,
  active,
  expanded,
  panelId,
  onOpen,
  onClose,
}: {
  section: NavSection;
  locale: Locale;
  active: boolean;
  expanded: boolean;
  panelId: string;
  onOpen: () => void;
  onClose: () => void;
}) {
  const className = cn(
    'relative flex h-10 items-center gap-1.5 rounded-sm px-3.5 text-[0.875rem] font-medium transition-colors duration-200',
    active || expanded ? 'text-white' : 'text-ink-200 hover:text-white',
  );

  const underline = (
    <span
      aria-hidden
      className={cn(
        'absolute inset-x-3.5 bottom-1 h-px origin-left bg-signal-400 transition-transform duration-300 ease-[var(--ease-out-expo)] rtl:origin-right',
        active || expanded ? 'scale-x-100' : 'scale-x-0',
      )}
    />
  );

  /* Sections with a panel are buttons (they open a disclosure); plain
     sections stay links so they keep native navigation semantics. */
  if (!section.columns) {
    return (
      <Link href={localePath(locale, section.href)} className={className} onMouseEnter={onClose}>
        {t(section.label, locale)}
        {underline}
      </Link>
    );
  }

  return (
    <button
      type="button"
      data-nav-trigger={section.id}
      aria-expanded={expanded}
      aria-controls={expanded ? panelId : undefined}
      className={className}
      onMouseEnter={onOpen}
      onFocus={onOpen}
      onClick={(e) => {
        e.preventDefault();
        if (expanded) onClose();
        else onOpen();
      }}
    >
      {t(section.label, locale)}
      <Chevron className={cn('transition-transform duration-300', expanded && 'rotate-180')} />
      {underline}
    </button>
  );
}

function MegaPanel({ section, locale }: { section: NavSection; locale: Locale }) {
  return (
    <div className="container-page">
      <div
        className={cn(
          'grid gap-x-10 gap-y-8 py-10',
          section.feature ? 'grid-cols-[repeat(3,minmax(0,1fr))_22rem]' : 'grid-cols-3',
        )}
      >
        {section.columns?.map((col) => (
          <div key={t(col.heading, locale)}>
            <p className="u-label mb-5 border-b border-white/10 pb-3 text-ink-400">{t(col.heading, locale)}</p>
            <ul className="flex flex-col gap-0.5">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={localePath(locale, link.href)}
                    className="group/link -mx-3 flex items-start gap-3 rounded-sm px-3 py-2.5 transition-colors hover:bg-white/5"
                  >
                    {link.icon ? (
                      <Icon
                        name={link.icon}
                        size={18}
                        className="mt-0.5 text-signal-400 transition-colors group-hover/link:text-signal-300"
                      />
                    ) : null}
                    <span className="min-w-0">
                      <span className="flex items-center gap-1.5 text-[0.9375rem] font-medium text-ink-100 transition-colors group-hover/link:text-white">
                        {t(link.label, locale)}
                        <Arrow
                          size={12}
                          className="opacity-0 transition-all duration-300 group-hover/link:translate-x-0.5 group-hover/link:opacity-100 rtl:group-hover/link:-translate-x-0.5"
                        />
                      </span>
                      {link.description ? (
                        <span className="mt-0.5 block text-[0.8125rem] leading-snug text-ink-400">
                          {t(link.description, locale)}
                        </span>
                      ) : null}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {section.feature ? (
          <div className="relative flex flex-col justify-between gap-6 border border-signal-500/25 bg-signal-500/[0.07] p-7">
            <span
              aria-hidden
              className="absolute -top-px start-0 h-0.5 w-12 bg-signal-400"
            />
            <div>
              <p className="u-label text-signal-300">{t(section.feature.eyebrow, locale)}</p>
              <p className="mt-4 font-display text-[1.375rem] leading-tight font-semibold tracking-tight text-white">
                {t(section.feature.heading, locale)}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink-300">{t(section.feature.body, locale)}</p>
            </div>
            <ButtonLink href={localePath(locale, section.feature.href)} variant="outline-light" size="sm" withArrow>
              {t(section.feature.cta, locale)}
            </ButtonLink>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function LocaleSwitch({ locale, pathname }: { locale: Locale; pathname: string }) {
  return (
    <div
      className="hidden items-center rounded-sm border border-white/15 p-0.5 sm:flex"
      role="group"
      aria-label={t(D.languageSwitch, locale)}
    >
      {LOCALES.map((code) => (
        <Link
          key={code}
          href={swapLocale(pathname, code)}
          hrefLang={code}
          aria-current={code === locale ? 'true' : undefined}
          className={cn(
            'rounded-[1px] px-2.5 py-1 font-mono text-[0.6875rem] tracking-[0.12em] uppercase transition-colors',
            code === locale ? 'bg-white/15 text-white' : 'text-ink-300 hover:text-white',
          )}
        >
          {code}
        </Link>
      ))}
    </div>
  );
}

function Chevron({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" width={11} height={11} fill="none" stroke="currentColor" strokeWidth={1.4} aria-hidden className={className}>
      <path d="m3 4.5 3 3 3-3" />
    </svg>
  );
}

function SearchGlyph() {
  return (
    <svg viewBox="0 0 20 20" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <circle cx="8.75" cy="8.75" r="5.25" />
      <path d="m12.75 12.75 4 4" />
    </svg>
  );
}
