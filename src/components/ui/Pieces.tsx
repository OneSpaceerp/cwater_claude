'use client';

import Link from 'next/link';
import { useId, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Arrow, Icon } from './Icon';
import { dictionary as D } from '@/content/dictionary';
import type { Faq, SpecRow, TechnicalDocument } from '@/content/types';
import { t, type Locale } from '@/lib/i18n';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/utils';

/* -------------------------------------------------------------------------- */
/* Breadcrumb                                                                  */
/* -------------------------------------------------------------------------- */

export function Breadcrumb({
  items,
  locale,
  tone = 'light',
}: {
  items: { label: string; href?: string }[];
  locale: Locale;
  tone?: 'light' | 'dark';
}) {
  return (
    <nav aria-label={t(D.breadcrumb, locale)}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={`${item.label}-${i}`} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className={cn(
                    'u-label transition-colors',
                    tone === 'dark' ? 'text-ink-400 hover:text-white' : 'text-ink-500 hover:text-ink-950',
                  )}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? 'page' : undefined}
                  className={cn('u-label', tone === 'dark' ? 'text-signal-300' : 'text-signal-700')}
                >
                  {item.label}
                </span>
              )}
              {!isLast ? (
                <span aria-hidden className={cn('dir-flip', tone === 'dark' ? 'text-ink-600' : 'text-ink-300')}>
                  /
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/* -------------------------------------------------------------------------- */
/* Technical specification table                                               */
/* -------------------------------------------------------------------------- */

export function SpecTable({
  rows,
  locale,
  caption,
  tone = 'light',
}: {
  rows: SpecRow[];
  locale: Locale;
  caption?: string;
  tone?: 'light' | 'dark';
}) {
  if (rows.length === 0) return null;
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[28rem] border-collapse text-start">
        {caption ? <caption className="u-label mb-3 text-start text-ink-400">{caption}</caption> : null}
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className={cn('border-b last:border-b-0', tone === 'dark' ? 'border-white/10' : 'border-ink-200')}
            >
              <th
                scope="row"
                className={cn(
                  'w-2/5 py-3.5 pe-6 text-start align-top font-mono text-[0.75rem] leading-relaxed font-normal tracking-wide',
                  tone === 'dark' ? 'text-ink-400' : 'text-ink-500',
                )}
              >
                {t(row.key, locale)}
              </th>
              <td
                className={cn(
                  'py-3.5 align-top text-[0.9375rem] leading-relaxed',
                  tone === 'dark' ? 'text-ink-100' : 'text-ink-900',
                )}
              >
                {t(row.value, locale)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * The "available on request" panel.
 *
 * Shown wherever a specification has not been confirmed against the
 * manufacturer's current documentation. Stating that plainly is more useful to
 * a technical buyer than an estimated figure would be.
 */
export function SpecsOnRequest({
  locale,
  href,
  tone = 'light',
}: {
  locale: Locale;
  href: string;
  tone?: 'light' | 'dark';
}) {
  return (
    <div
      className={cn(
        'relative border p-6 sm:p-7',
        tone === 'dark' ? 'border-white/12 bg-ink-900/60' : 'border-ink-200 bg-ink-50',
      )}
    >
      <span aria-hidden className="absolute -top-px start-0 h-0.5 w-12 bg-signal-500" />
      <div className="flex items-start gap-4">
        <Icon name="clipboard" size={22} className={tone === 'dark' ? 'text-signal-400' : 'text-signal-600'} />
        <div>
          <p
            className={cn(
              'font-display text-base font-semibold tracking-tight',
              tone === 'dark' ? 'text-white' : 'text-ink-950',
            )}
          >
            {t(D.specsOnRequest, locale)}
          </p>
          <p className={cn('mt-2 max-w-xl text-sm leading-relaxed', tone === 'dark' ? 'text-ink-300' : 'text-ink-600')}>
            {t(D.specsOnRequestBody, locale)}
          </p>
          <Link
            href={href}
            className={cn(
              'mt-4 inline-flex items-center gap-2 text-[0.9375rem] font-medium transition-colors',
              tone === 'dark' ? 'text-signal-300 hover:text-white' : 'text-signal-700 hover:text-signal-500',
            )}
          >
            {t(D.talkToEngineer, locale)}
            <Arrow size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Document card                                                               */
/* -------------------------------------------------------------------------- */

export function DocumentCard({
  document: doc,
  locale,
  requestHref,
  productName,
  tone = 'light',
}: {
  document: TechnicalDocument;
  locale: Locale;
  requestHref: string;
  productName?: string;
  tone?: 'light' | 'dark';
}) {
  const kindLabels: Record<TechnicalDocument['kind'], { en: string; ar: string }> = {
    datasheet: { en: 'Datasheet', ar: 'ورقة بيانات' },
    brochure: { en: 'Brochure', ar: 'كتيّب' },
    'technical-guide': { en: 'Technical Guide', ar: 'دليل فني' },
    catalogue: { en: 'Catalogue', ar: 'كتالوج' },
    certificate: { en: 'Certificate', ar: 'شهادة' },
    'application-note': { en: 'Application Note', ar: 'مذكرة تطبيقية' },
    'case-study': { en: 'Case Study', ar: 'دراسة حالة' },
  };

  const isDownloadable = Boolean(doc.file);

  const inner = (
    <>
      <Icon
        name="clipboard"
        size={20}
        className={cn('mt-0.5 shrink-0', tone === 'dark' ? 'text-signal-400' : 'text-signal-600')}
      />
      <span className="min-w-0 flex-1">
        <span
          className={cn(
            'block text-[0.9375rem] leading-snug font-medium',
            tone === 'dark' ? 'text-white' : 'text-ink-950',
          )}
        >
          {t(doc.title, locale)}
        </span>
        <span className={cn('u-label mt-1.5 block', tone === 'dark' ? 'text-ink-400' : 'text-ink-500')}>
          {t(kindLabels[doc.kind], locale)}
          {isDownloadable && doc.size ? ` · ${doc.size}` : ` · ${t(D.documentOnRequest, locale)}`}
        </span>
      </span>
      <Arrow
        size={14}
        className={cn(
          'mt-1 transition-transform duration-300 group-hover/doc:translate-x-1 rtl:group-hover/doc:-translate-x-1',
          tone === 'dark' ? 'text-signal-300' : 'text-signal-600',
        )}
      />
    </>
  );

  const className = cn(
    'module group/doc flex items-start gap-4 p-5',
    tone === 'dark' && 'on-dark',
  );

  /* A document with no file yet routes to the request flow rather than to a
     dead link — the visitor still gets what they came for. */
  return isDownloadable ? (
    <a
      href={doc.file!}
      download
      className={className}
      onClick={() => track('document_download', { document: doc.id, product: productName })}
    >
      {inner}
    </a>
  ) : (
    <Link
      href={requestHref}
      className={className}
      onClick={() => track('document_requested', { document: doc.id, product: productName })}
    >
      {inner}
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/* Accordion / FAQ                                                             */
/* -------------------------------------------------------------------------- */

export function FaqList({
  faqs,
  locale,
  tone = 'light',
}: {
  faqs: Faq[];
  locale: Locale;
  tone?: 'light' | 'dark';
}) {
  const [open, setOpen] = useState<string | null>(faqs[0]?.id ?? null);
  const reduce = useReducedMotion();
  const uid = useId();

  if (faqs.length === 0) return null;

  return (
    <div className={cn('border-t', tone === 'dark' ? 'border-white/10' : 'border-ink-200')}>
      {faqs.map((faq) => {
        const isOpen = open === faq.id;
        return (
          <div key={faq.id} className={cn('border-b', tone === 'dark' ? 'border-white/10' : 'border-ink-200')}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`${uid}-${faq.id}`}
                onClick={() => setOpen(isOpen ? null : faq.id)}
                className={cn(
                  'flex w-full items-start justify-between gap-6 py-5 text-start transition-colors',
                  tone === 'dark' ? 'text-white hover:text-signal-200' : 'text-ink-950 hover:text-signal-700',
                )}
              >
                <span className="font-display text-base leading-snug font-semibold tracking-tight sm:text-lg">
                  {t(faq.question, locale)}
                </span>
                <span
                  aria-hidden
                  className={cn(
                    'relative mt-1 h-4 w-4 shrink-0 transition-transform duration-300',
                    isOpen && 'rotate-45',
                    tone === 'dark' ? 'text-signal-400' : 'text-signal-600',
                  )}
                >
                  <span className="absolute top-1/2 left-0 h-px w-4 -translate-y-1/2 bg-current" />
                  <span className="absolute top-0 left-1/2 h-4 w-px -translate-x-1/2 bg-current" />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  id={`${uid}-${faq.id}`}
                  initial={reduce ? false : { height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p
                    className={cn(
                      'max-w-3xl pb-6 leading-relaxed',
                      tone === 'dark' ? 'text-ink-300' : 'text-ink-600',
                    )}
                  >
                    {t(faq.answer, locale)}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Point list — problems, risks, benefits, approach steps                      */
/* -------------------------------------------------------------------------- */

export function PointGrid({
  points,
  locale,
  tone = 'light',
  numbered,
  columns = 3,
}: {
  points: { id: string; label: { en: string; ar: string }; body: { en: string; ar: string }; icon?: Parameters<typeof Icon>[0]['name'] }[];
  locale: Locale;
  tone?: 'light' | 'dark';
  numbered?: boolean;
  columns?: 2 | 3;
}) {
  return (
    <ul
      className={cn(
        'grid gap-px',
        tone === 'dark' ? 'bg-white/10' : 'bg-ink-200',
        columns === 3 ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2',
      )}
    >
      {points.map((point, i) => (
        <li
          key={point.id}
          className={cn('flex flex-col p-6 sm:p-7', tone === 'dark' ? 'bg-ink-950' : 'bg-white')}
        >
          <div className="mb-4 flex items-center justify-between gap-4">
            {numbered ? (
              <span className={cn('u-label', tone === 'dark' ? 'text-signal-300' : 'text-signal-700')}>
                {String(i + 1).padStart(2, '0')}
              </span>
            ) : (
              <span />
            )}
            {point.icon ? (
              <Icon
                name={point.icon}
                size={22}
                className={tone === 'dark' ? 'text-signal-400' : 'text-signal-600'}
              />
            ) : null}
          </div>
          <p
            className={cn(
              'font-display text-base leading-snug font-semibold tracking-tight',
              tone === 'dark' ? 'text-white' : 'text-ink-950',
            )}
          >
            {t(point.label, locale)}
          </p>
          <p className={cn('mt-2.5 text-sm leading-relaxed', tone === 'dark' ? 'text-ink-300' : 'text-ink-600')}>
            {t(point.body, locale)}
          </p>
        </li>
      ))}
    </ul>
  );
}
