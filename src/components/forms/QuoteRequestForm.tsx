'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ConsentCheckbox, ErrorSummary, FileField, SelectField, TextArea, TextField } from './Fields';
import { useLeadSubmit } from './useLeadSubmit';
import { Button, ButtonLink } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { dictionary as D } from '@/content/dictionary';
import { localePath, t, type Locale, type Localized } from '@/lib/i18n';
import { track } from '@/lib/analytics';
import { cn, pad } from '@/lib/utils';

/**
 * Request a Quote.
 *
 * Supports a single product, several products, or a general enquiry with no
 * product at all. When a product page links here with `?product=slug`, that
 * item is pre-selected and stays visible in the request context throughout,
 * so the visitor never loses sight of what they are asking about.
 */

interface QuoteItem {
  slug: string;
  name: string;
  quantity: number;
}

/**
 * Option lists arrive from the server page. Importing the product, partner,
 * solution and industry modules here would pull ~255 KB of source into the
 * browser to populate four <select> elements.
 */
export interface QuoteOption {
  value: string;
  label: string;
}

export interface QuoteProductOption extends QuoteOption {
  /** Partner and category, shown beside a selected line item. */
  partnerName: string;
  categoryLabel: string;
}

export interface QuoteFormData {
  products: QuoteProductOption[];
  solutions: QuoteOption[];
  industries: QuoteOption[];
}

const PROJECT_STAGES: { value: string; label: Localized }[] = [
  { value: 'exploring', label: { en: 'Exploring options', ar: 'استكشاف الخيارات' } },
  { value: 'budgeting', label: { en: 'Budgeting', ar: 'إعداد الموازنة' } },
  { value: 'specifying', label: { en: 'Specifying', ar: 'إعداد المواصفات' } },
  { value: 'tendering', label: { en: 'Tendering', ar: 'طرح مناقصة' } },
  { value: 'ready', label: { en: 'Ready to order', ar: 'جاهز للطلب' } },
];

export function QuoteRequestForm({ locale, data }: { locale: Locale; data: QuoteFormData }) {
  const searchParams = useSearchParams();
  const productBySlug = useMemo(
    () => Object.fromEntries(data.products.map((p) => [p.value, p])),
    [data.products],
  );
  /* A product page links here with ?product=slug. Seeding the initial state
     from the URL puts the line item in the request on the first render. */
  const requestedProduct = searchParams.get('product');
  const [items, setItems] = useState<QuoteItem[]>(() => {
    const seeded = data.products.find((p) => p.value === requestedProduct);
    return seeded ? [{ slug: seeded.value, name: seeded.label, quantity: 1 }] : [];
  });
  const [picker, setPicker] = useState('');
  const [application, setApplication] = useState('');
  const [industry, setIndustry] = useState('');
  const [projectStage, setProjectStage] = useState('');
  const [requiredBy, setRequiredBy] = useState('');
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [started, setStarted] = useState(false);
  const successRef = useRef<HTMLDivElement>(null);

  const { state, reference, submit, retry } = useLeadSubmit('quote_submitted');

  useEffect(() => {
    if (state === 'success') successRef.current?.focus();
  }, [state]);

  const markStarted = () => {
    if (!started) {
      setStarted(true);
      track('quote_started');
    }
  };

  const addItem = (slug: string) => {
    if (!slug) return;
    const product = productBySlug[slug];
    if (!product) return;
    markStarted();
    setItems((current) =>
      current.some((i) => i.slug === slug) ? current : [...current, { slug, name: product.label, quantity: 1 }],
    );
    track('quote_item_added', { product: slug });
    setPicker('');
  };

  const setQuantity = (slug: string, quantity: number) =>
    setItems((current) => current.map((i) => (i.slug === slug ? { ...i, quantity: Math.max(1, quantity) } : i)));

  const removeItem = (slug: string) => setItems((current) => current.filter((i) => i.slug !== slug));

  const req = t(D.form.errors.requiredField, locale);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const found: Record<string, string | undefined> = {};
    if (name.trim().length < 2) found.name = req;
    if (company.trim().length < 1) found.company = req;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) found.email = t(D.form.errors.email, locale);
    if (phone.trim() && !/^[+()\d\s.-]{6,24}$/.test(phone.trim())) found.phone = t(D.form.errors.phone, locale);
    if (!consent) found.consent = t(D.form.errors.consent, locale);
    /* No product is a valid RFQ — a general technical enquiry — but then the
       message has to carry the requirement. */
    if (items.length === 0 && message.trim().length < 10) {
      found.message = t(
        {
          en: 'Add at least one product, or describe what you need quoted.',
          ar: 'أضف منتجًا واحدًا على الأقل، أو صف ما تريد تسعيره.',
        },
        locale,
      );
    }

    setErrors(found);
    if (Object.keys(found).length > 0) return;

    await submit(
      {
        kind: 'quote',
        items,
        application,
        industry,
        projectStage,
        requiredBy,
        message,
        locale,
        website: honeypot,
        name,
        company,
        jobTitle,
        email,
        phone,
        country,
        city,
        consent: true,
      },
      files,
    );
  };

  if (state === 'success') {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="relative border border-white/12 bg-ink-900/70 p-8 outline-none sm:p-10"
      >
        <span aria-hidden className="absolute -top-px start-0 h-0.5 w-20 bg-ok-500" />
        <Icon name="clipboard" size={30} className="text-ok-500" />
        <h2 className="mt-6 font-display text-h3 font-bold tracking-tight text-white">
          {t(D.form.successTitle, locale)}
        </h2>
        <p className="mt-4 max-w-xl leading-relaxed text-ink-200">{t(D.form.successBody, locale)}</p>
        {reference ? (
          <p className="mt-6 inline-flex items-center gap-3 border border-white/15 px-4 py-2.5">
            <span className="u-label text-ink-400">{t(D.form.reference, locale)}</span>
            <span className="latin font-mono text-[0.9375rem] text-white">{reference}</span>
          </p>
        ) : null}
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href={localePath(locale, 'products')} variant="outline-light" size="sm">
            {t({ en: 'Back to products', ar: 'العودة إلى المنتجات' }, locale)}
          </ButtonLink>
        </div>
      </div>
    );
  }

  const availableProducts = data.products.filter((p) => !items.some((i) => i.slug === p.value));

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-8">
      {/* ---- Selected items: stays visible throughout ---- */}
      <section className="relative border border-white/12 bg-ink-900/70 p-6 sm:p-8">
        <span aria-hidden className="absolute -top-px start-0 h-0.5 w-16 bg-signal-400" />
        <h2 className="font-display text-lg font-bold tracking-tight text-white">
          {t({ en: 'What are you asking about?', ar: 'عمّ تستفسر؟' }, locale)}
        </h2>

        {items.length > 0 ? (
          <ul className="mt-6 flex flex-col gap-3">
            {items.map((item) => {
              const product = productBySlug[item.slug];
              return (
                <li key={item.slug} className="flex flex-wrap items-center gap-4 border border-white/12 p-4">
                  <div className="min-w-0 flex-1">
                    <p className="latin text-[0.9375rem] font-medium text-white">{item.name}</p>
                    <p className="u-label mt-1 text-ink-400">
                      {product ? <span className="latin">{product.partnerName}</span> : null}
                      {product ? ` · ${product.categoryLabel}` : null}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <label htmlFor={`qty-${item.slug}`} className="u-label text-ink-400">
                      {t(D.form.quantity, locale)}
                    </label>
                    <input
                      id={`qty-${item.slug}`}
                      type="number"
                      min={1}
                      max={9999}
                      value={item.quantity}
                      onChange={(e) => setQuantity(item.slug, Number(e.target.value))}
                      className="tnum w-20 rounded-sm border border-white/15 bg-ink-950/60 px-2.5 py-1.5 text-center text-[0.875rem] text-white outline-none focus-visible:border-signal-400"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.slug)}
                    aria-label={`${t(D.form.removeFile, locale)}: ${item.name}`}
                    className="rounded-sm p-1.5 text-ink-400 transition-colors hover:text-white"
                  >
                    <svg viewBox="0 0 16 16" width={15} height={15} fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden>
                      <path d="m4 4 8 8M12 4l-8 8" />
                    </svg>
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="mt-4 text-sm leading-relaxed text-ink-400">
            {t(
              {
                en: 'Add products below, or leave this empty and describe the requirement — a general technical enquiry is a perfectly good starting point.',
                ar: 'أضف منتجات أدناه، أو اترك هذا فارغًا وصف المتطلب — فالاستفسار الفني العام نقطة بدء جيدة تمامًا.',
              },
              locale,
            )}
          </p>
        )}

        <div className="mt-6">
          <SelectField
            label={t({ en: 'Add a product', ar: 'أضف منتجًا' }, locale)}
            value={picker}
            onChange={addItem}
            options={availableProducts.map((p) => ({
              value: p.value,
              label: `${p.label} — ${p.partnerName}`,
            }))}
            locale={locale}
            placeholder={t({ en: 'Select a product', ar: 'اختر منتجًا' }, locale)}
          />
        </div>
      </section>

      {/* ---- Application context ---- */}
      <section className="border border-white/12 bg-ink-900/70 p-6 sm:p-8">
        <h2 className="font-display text-lg font-bold tracking-tight text-white">
          {t({ en: 'Where will it be used?', ar: 'أين سيُستخدم؟' }, locale)}
        </h2>
        <p className="mt-2 text-sm text-ink-400">
          {t(
            {
              en: 'The duty decides the selection. Anything you can tell us here shortens the process considerably.',
              ar: 'ظروف التشغيل هي التي تحدد الاختيار. وأي معلومة تقدمها هنا تختصر العملية كثيرًا.',
            },
            locale,
          )}
        </p>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <SelectField
            label={t(D.application, locale)}
            value={application}
            onChange={setApplication}
            options={data.solutions}
            locale={locale}
          />
          <SelectField
            label={t(D.industry, locale)}
            value={industry}
            onChange={setIndustry}
            options={data.industries}
            locale={locale}
          />
          <SelectField
            label={t(D.form.projectStage, locale)}
            value={projectStage}
            onChange={setProjectStage}
            options={PROJECT_STAGES.map((s) => ({ value: s.value, label: t(s.label, locale) }))}
            locale={locale}
          />
          <TextField label={t(D.form.requiredBy, locale)} value={requiredBy} onChange={setRequiredBy} locale={locale} type="month" />
          <TextField label={t(D.form.country, locale)} value={country} onChange={setCountry} locale={locale} autoComplete="country-name" />
          <TextField label={t(D.form.city, locale)} value={city} onChange={setCity} locale={locale} autoComplete="address-level2" />
        </div>
        <div className="mt-6">
          <TextArea
            label={t(D.form.message, locale)}
            value={message}
            onChange={(v) => {
              markStarted();
              setMessage(v);
            }}
            locale={locale}
            error={errors.message}
            rows={5}
            hint={t(
              {
                en: 'Flow rate, operating pressure and temperature, solids load, what you are protecting, existing equipment.',
                ar: 'معدل التدفق وضغط ودرجة حرارة التشغيل وحمل المواد الصلبة وما تريد حمايته والمعدات القائمة.',
              },
              locale,
            )}
          />
        </div>
        <div className="mt-6">
          <FileField files={files} onChange={setFiles} locale={locale} />
        </div>
      </section>

      {/* ---- Contact ---- */}
      <section className="border border-white/12 bg-ink-900/70 p-6 sm:p-8">
        <h2 className="font-display text-lg font-bold tracking-tight text-white">
          {t({ en: 'Who should we reply to?', ar: 'إلى من نرسل الرد؟' }, locale)}
        </h2>

        <div className="mt-6">
          <ErrorSummary errors={errors} locale={locale} />
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <TextField label={t(D.form.name, locale)} value={name} onChange={setName} locale={locale} required error={errors.name} autoComplete="name" />
          <TextField label={t(D.form.company, locale)} value={company} onChange={setCompany} locale={locale} required error={errors.company} autoComplete="organization" />
          <TextField label={t(D.form.jobTitle, locale)} value={jobTitle} onChange={setJobTitle} locale={locale} autoComplete="organization-title" />
          <TextField label={t(D.form.email, locale)} value={email} onChange={setEmail} locale={locale} required error={errors.email} type="email" inputMode="email" autoComplete="email" />
          <TextField label={t(D.form.phone, locale)} value={phone} onChange={setPhone} locale={locale} error={errors.phone} type="tel" inputMode="tel" autoComplete="tel" />
        </div>

        <div className="mt-7">
          <ConsentCheckbox checked={consent} onChange={setConsent} locale={locale} error={errors.consent} />
        </div>

        <div aria-hidden className="sr-only-focusable absolute h-px w-px overflow-hidden">
          <label htmlFor="cw-quote-website">Website</label>
          <input id="cw-quote-website" type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
        </div>

        {state === 'error' ? (
          <div role="alert" className="mt-6 border border-alert-500/40 bg-alert-500/10 p-4">
            <p className="text-[0.875rem] text-white">{t(D.form.errors.submitFailed, locale)}</p>
            <Button variant="quiet" onClick={retry} className="mt-2 text-signal-300 hover:text-white">
              {t(D.form.retry, locale)}
            </Button>
          </div>
        ) : null}

        <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-white/10 pt-6">
          <Button type="submit" withArrow disabled={state === 'submitting'}>
            {state === 'submitting' ? t(D.form.submitting, locale) : t(D.form.submitQuote, locale)}
          </Button>
          <p className={cn('text-[0.8125rem] text-ink-400', items.length > 0 && 'tnum')}>
            {items.length > 0
              ? `${pad(items.length)} ${t({ en: 'item(s) in this request', ar: 'بند/بنود في هذا الطلب' }, locale)}`
              : t({ en: 'General technical enquiry', ar: 'استفسار فني عام' }, locale)}
          </p>
        </div>
      </section>
    </form>
  );
}
