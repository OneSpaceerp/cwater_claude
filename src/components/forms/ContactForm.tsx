'use client';

import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ConsentCheckbox, ErrorSummary, TextArea, TextField } from './Fields';
import { useLeadSubmit } from './useLeadSubmit';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { dictionary as D } from '@/content/dictionary';
import type { IconKey } from '@/content/types';
import { t, type Locale, type Localized } from '@/lib/i18n';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/utils';

type Intent = 'sales' | 'engineer' | 'support' | 'general';

const INTENTS: { value: Intent; label: Localized; body: Localized; icon: IconKey }[] = [
  {
    value: 'sales',
    icon: 'clipboard',
    label: { en: 'Talk to Sales', ar: 'تحدث إلى المبيعات' },
    body: { en: 'Pricing, availability and commercial requirements.', ar: 'الأسعار والتوفر والمتطلبات التجارية.' },
  },
  {
    value: 'engineer',
    icon: 'blueprint',
    label: { en: 'Talk to an Engineer', ar: 'تحدث إلى مهندس' },
    body: { en: 'Application, technical and system questions.', ar: 'أسئلة التطبيق والنواحي الفنية والأنظمة.' },
  },
  {
    value: 'support',
    icon: 'wrench',
    label: { en: 'Request Support', ar: 'اطلب الدعم' },
    body: { en: 'Existing systems, service and troubleshooting.', ar: 'الأنظمة القائمة والخدمة واستكشاف الأعطال.' },
  },
  {
    value: 'general',
    icon: 'network',
    label: { en: 'General Enquiry', ar: 'استفسار عام' },
    body: { en: 'Anything that does not fit the other three.', ar: 'أي أمر لا يندرج تحت الثلاثة السابقة.' },
  },
];

/**
 * Contact form.
 *
 * The three routes the brief asks for — sales, engineering and support —
 * plus a general fallback. The intent is preselected from the query string so
 * a "Talk to an Engineer" link anywhere on the site lands on the right path.
 */
export function ContactForm({ locale }: { locale: Locale }) {
  const searchParams = useSearchParams();
  /* The route carries the intent ("Talk to an Engineer" links land here with
     ?intent=engineer). Reading it in the state initialiser derives the value on
     the first render instead of rendering the wrong tab and correcting it. */
  const requestedIntent = searchParams.get('intent');
  const [intent, setIntent] = useState<Intent>(
    INTENTS.some((option) => option.value === requestedIntent) ? (requestedIntent as Intent) : 'engineer',
  );
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const successRef = useRef<HTMLDivElement>(null);

  const { state, reference, submit, retry } = useLeadSubmit('contact_submitted');

  useEffect(() => {
    if (state === 'success') successRef.current?.focus();
  }, [state]);

  const req = t(D.form.errors.requiredField, locale);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const found: Record<string, string | undefined> = {};
    if (name.trim().length < 2) found.name = req;
    if (company.trim().length < 1) found.company = req;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) found.email = t(D.form.errors.email, locale);
    if (phone.trim() && !/^[+()\d\s.-]{6,24}$/.test(phone.trim())) found.phone = t(D.form.errors.phone, locale);
    if (message.trim().length < 10) found.message = req;
    if (!consent) found.consent = t(D.form.errors.consent, locale);

    setErrors(found);
    if (Object.keys(found).length > 0) return;

    if (intent === 'support') track('support_request');

    await submit({
      kind: 'contact',
      intent,
      message,
      locale,
      website: honeypot,
      name,
      company,
      jobTitle,
      email,
      phone,
      country,
      city: '',
      consent: true,
    });
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
        <Icon name="shield" size={30} className="text-ok-500" />
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
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative border border-white/12 bg-ink-900/70 p-6 sm:p-8">
      <span aria-hidden className="absolute -top-px start-0 h-0.5 w-20 bg-signal-400" />

      {/* ---- Route ---- */}
      <fieldset>
        <legend className="font-display text-lg font-bold tracking-tight text-white">
          {t({ en: 'What do you need?', ar: 'ما الذي تحتاجه؟' }, locale)}
        </legend>
        <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
          {INTENTS.map((option) => {
            const selected = intent === option.value;
            return (
              <button
                key={option.value}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => setIntent(option.value)}
                className={cn(
                  'flex items-start gap-3.5 rounded-sm border p-4 text-start transition-colors duration-250',
                  selected
                    ? 'border-signal-400 bg-signal-500/12'
                    : 'border-white/14 hover:border-white/34',
                )}
              >
                <Icon
                  name={option.icon}
                  size={20}
                  className={cn('mt-0.5 shrink-0', selected ? 'text-signal-300' : 'text-ink-400')}
                />
                <span>
                  <span className={cn('block text-[0.9375rem] font-medium', selected ? 'text-white' : 'text-ink-100')}>
                    {t(option.label, locale)}
                  </span>
                  <span className="mt-1 block text-[0.8125rem] leading-snug text-ink-400">{t(option.body, locale)}</span>
                </span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-8">
        <ErrorSummary errors={errors} locale={locale} />
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <TextField label={t(D.form.name, locale)} value={name} onChange={setName} locale={locale} required error={errors.name} autoComplete="name" />
        <TextField label={t(D.form.company, locale)} value={company} onChange={setCompany} locale={locale} required error={errors.company} autoComplete="organization" />
        <TextField label={t(D.form.jobTitle, locale)} value={jobTitle} onChange={setJobTitle} locale={locale} autoComplete="organization-title" />
        <TextField label={t(D.form.email, locale)} value={email} onChange={setEmail} locale={locale} required error={errors.email} type="email" inputMode="email" autoComplete="email" />
        <TextField label={t(D.form.phone, locale)} value={phone} onChange={setPhone} locale={locale} error={errors.phone} type="tel" inputMode="tel" autoComplete="tel" />
        <TextField label={t(D.form.country, locale)} value={country} onChange={setCountry} locale={locale} autoComplete="country-name" />
      </div>

      <div className="mt-6">
        <TextArea
          label={t({ en: 'How can we help?', ar: 'كيف يمكننا المساعدة؟' }, locale)}
          value={message}
          onChange={setMessage}
          locale={locale}
          required
          error={errors.message}
          rows={6}
          hint={
            intent === 'engineer'
              ? t(
                  {
                    en: 'The system, the operating conditions, and what you are seeing. Include any analysis results if you have them.',
                    ar: 'النظام وظروف التشغيل وما تلاحظه. وأرفق نتائج أي تحليل إن توفرت.',
                  },
                  locale,
                )
              : undefined
          }
        />
      </div>

      <div className="mt-7">
        <ConsentCheckbox checked={consent} onChange={setConsent} locale={locale} error={errors.consent} />
      </div>

      <div aria-hidden className="sr-only-focusable absolute h-px w-px overflow-hidden">
        <label htmlFor="cw-contact-website">Website</label>
        <input id="cw-contact-website" type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
      </div>

      {state === 'error' ? (
        <div role="alert" className="mt-6 border border-alert-500/40 bg-alert-500/10 p-4">
          <p className="text-[0.875rem] text-white">{t(D.form.errors.submitFailed, locale)}</p>
          <Button variant="quiet" onClick={retry} className="mt-2 text-signal-300 hover:text-white">
            {t(D.form.retry, locale)}
          </Button>
        </div>
      ) : null}

      <div className="mt-8 border-t border-white/10 pt-6">
        <Button type="submit" withArrow disabled={state === 'submitting'}>
          {state === 'submitting' ? t(D.form.submitting, locale) : t(D.form.submit, locale)}
        </Button>
      </div>
    </form>
  );
}
