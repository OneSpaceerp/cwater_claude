'use client';

import { useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChoiceGroup, ConsentCheckbox, ErrorSummary, FileField, SelectField, TextArea, TextField } from './Fields';
import { useLeadSubmit } from './useLeadSubmit';
import { Button, ButtonLink } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { dictionary as D } from '@/content/dictionary';
import type { IconKey } from '@/content/types';
import { localePath, t, type Locale, type Localized } from '@/lib/i18n';
import { track } from '@/lib/analytics';
import { cn, pad } from '@/lib/utils';

/**
 * Request a Solution — the primary conversion journey.
 *
 * Seven steps, each asking only what is relevant to the objective chosen in
 * step one. The visitor never needs to know which product they want; the form
 * collects enough technical context for the C-Water team to classify the lead
 * before anyone picks up the phone.
 */

const NEEDS: { value: string; label: Localized; icon: IconKey }[] = [
  { value: 'existing-problem', label: { en: 'A solution for an existing problem', ar: 'حل لمشكلة قائمة' }, icon: 'wrench' },
  { value: 'new-system', label: { en: 'A new treatment system', ar: 'نظام معالجة جديد' }, icon: 'blueprint' },
  { value: 'optimisation', label: { en: 'Optimisation of an existing system', ar: 'تحسين نظام قائم' }, icon: 'optimize' },
  { value: 'chemical', label: { en: 'A chemical treatment programme', ar: 'برنامج معالجة كيميائية' }, icon: 'flask' },
  { value: 'filtration', label: { en: 'Filtration', ar: 'ترشيح' }, icon: 'filter' },
  { value: 'monitoring', label: { en: 'Monitoring & control', ar: 'مراقبة وتحكم' }, icon: 'controller' },
  { value: 'product', label: { en: 'A specific product', ar: 'منتج محدد' }, icon: 'network' },
  { value: 'support', label: { en: 'Technical support', ar: 'دعم فني' }, icon: 'shield' },
];

const PROBLEMS: { value: string; label: Localized; icon: IconKey }[] = [
  { value: 'scale', label: { en: 'Scale / deposits', ar: 'ترسبات / رواسب' }, icon: 'scale' },
  { value: 'corrosion', label: { en: 'Corrosion', ar: 'تآكل' }, icon: 'corrosion' },
  { value: 'fouling', label: { en: 'Fouling', ar: 'اتساخ' }, icon: 'fouling' },
  { value: 'microbiology', label: { en: 'Microbiological growth', ar: 'نمو بيولوجي' }, icon: 'biology' },
  { value: 'filtration', label: { en: 'Poor filtration', ar: 'ضعف ترشيح' }, icon: 'filter' },
  { value: 'water-loss', label: { en: 'Water consumption', ar: 'استهلاك المياه' }, icon: 'droplet' },
  { value: 'chemical', label: { en: 'Chemical consumption', ar: 'استهلاك الكيماويات' }, icon: 'flask' },
  { value: 'reliability', label: { en: 'Reliability / downtime', ar: 'موثوقية / توقف' }, icon: 'shield' },
  { value: 'compliance', label: { en: 'Discharge compliance', ar: 'مطابقة التصريف' }, icon: 'clipboard' },
  { value: 'unknown', label: { en: 'Not sure yet', ar: 'غير محدد بعد' }, icon: 'gauge' },
];

const OBJECTIVES: { value: string; label: Localized; icon: IconKey }[] = [
  { value: 'protect', label: { en: 'Protect equipment', ar: 'حماية المعدات' }, icon: 'shield' },
  { value: 'efficiency', label: { en: 'Improve efficiency', ar: 'تحسين الكفاءة' }, icon: 'energy' },
  { value: 'water', label: { en: 'Reduce water use', ar: 'خفض استهلاك المياه' }, icon: 'droplet' },
  { value: 'control', label: { en: 'Improve treatment control', ar: 'تحسين التحكم' }, icon: 'controller' },
  { value: 'maintenance', label: { en: 'Reduce maintenance', ar: 'تقليل الصيانة' }, icon: 'wrench' },
  { value: 'reliability', label: { en: 'Improve reliability', ar: 'رفع الموثوقية' }, icon: 'gauge' },
  { value: 'compliance', label: { en: 'Meet a compliance requirement', ar: 'تحقيق متطلب مطابقة' }, icon: 'clipboard' },
  { value: 'design', label: { en: 'Design a new system', ar: 'تصميم نظام جديد' }, icon: 'blueprint' },
];

const PROJECT_STAGES: { value: string; label: Localized }[] = [
  { value: 'exploring', label: { en: 'Exploring options', ar: 'استكشاف الخيارات' } },
  { value: 'budgeting', label: { en: 'Budgeting', ar: 'إعداد الموازنة' } },
  { value: 'specifying', label: { en: 'Specifying', ar: 'إعداد المواصفات' } },
  { value: 'tendering', label: { en: 'Tendering', ar: 'طرح مناقصة' } },
  { value: 'ready', label: { en: 'Ready to proceed', ar: 'جاهز للتنفيذ' } },
  { value: 'urgent', label: { en: 'Urgent operational issue', ar: 'مشكلة تشغيلية عاجلة' } },
];

const TOTAL_STEPS = 7;

/** Option lists come from the server page; see QuoteRequestForm for the reasoning. */
export interface SolutionFormOptions {
  systems: { value: string; label: string }[];
  industries: { value: string; label: string }[];
}

export function SolutionRequestForm({
  locale,
  options,
}: {
  locale: Locale;
  options: SolutionFormOptions;
}) {
  const [step, setStep] = useState(0);
  const [started, setStarted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const headingRef = useRef<HTMLHeadingElement>(null);
  const reduce = useReducedMotion();
  const { state, reference, submit, retry } = useLeadSubmit('engineering_request_submitted');

  const [needs, setNeeds] = useState<string[]>([]);
  const [systemType, setSystemType] = useState('');
  const [systemDetail, setSystemDetail] = useState('');
  const [problems, setProblems] = useState<string[]>([]);
  const [objectives, setObjectives] = useState<string[]>([]);
  const [industry, setIndustry] = useState('');
  const [projectStage, setProjectStage] = useState('');
  const [requiredBy, setRequiredBy] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState('');

  const markStarted = () => {
    if (!started) {
      setStarted(true);
      track('engineering_request_started');
    }
  };

  const toggle = (list: string[], value: string, setter: (next: string[]) => void) => {
    markStarted();
    setter(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  };

  const req = t(D.form.errors.requiredField, locale);

  function validate(current: number): Record<string, string | undefined> {
    const next: Record<string, string | undefined> = {};
    if (current === 0 && needs.length === 0) next.needs = t(D.form.errors.selectOption, locale);
    if (current === 2 && problems.length === 0) next.problems = t(D.form.errors.selectOption, locale);
    if (current === 3 && objectives.length === 0) next.objectives = t(D.form.errors.selectOption, locale);
    if (current === 5) {
      if (name.trim().length < 2) next.name = req;
      if (company.trim().length < 1) next.company = req;
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) next.email = t(D.form.errors.email, locale);
      if (phone.trim() && !/^[+()\d\s.-]{6,24}$/.test(phone.trim())) next.phone = t(D.form.errors.phone, locale);
    }
    if (current === 6 && !consent) next.consent = t(D.form.errors.consent, locale);
    return next;
  }

  const goTo = (next: number) => {
    setStep(next);
    setErrors({});
    requestAnimationFrame(() => headingRef.current?.focus());
  };

  const advance = () => {
    const found = validate(step);
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    if (step < TOTAL_STEPS - 1) goTo(step + 1);
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const found = validate(6);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    await submit(
      {
        kind: 'solution',
        needs,
        systemType,
        systemDetail,
        problems,
        objectives,
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

  /* ---- Success ---- */
  if (state === 'success') {
    return (
      <div role="status" className="relative border border-white/12 bg-ink-900/70 p-8 sm:p-10">
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

        <div className="mt-8 border-t border-white/10 pt-6">
          <p className="u-label text-ink-400">{t(D.form.successNext, locale)}</p>
          <ol className="mt-4 flex flex-col gap-3">
            {[
              { en: 'A technical or commercial specialist reviews the details you provided.', ar: 'يراجع متخصص فني أو تجاري التفاصيل التي قدّمتها.' },
              { en: 'We come back with clarifying questions, or with a proposed starting point.', ar: 'نعود إليك بأسئلة توضيحية أو بنقطة بدء مقترحة.' },
              { en: 'Where a water analysis is needed first, we will say so — it usually is.', ar: 'وحيث يلزم تحليل مياه أولًا، سنوضح ذلك — وهو الحال غالبًا.' },
            ].map((line, i) => (
              <li key={i} className="flex gap-3.5 text-[0.9375rem] text-ink-200">
                <span className="u-label shrink-0 pt-1 text-signal-300">{pad(i + 1)}</span>
                {t(line, locale)}
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href={localePath(locale, 'solutions')} variant="outline-light" size="sm">
            {t(D.form.backToSolutions, locale)}
          </ButtonLink>
          <ButtonLink href={localePath(locale, 'knowledge')} variant="quiet" className="text-signal-300 hover:text-white">
            {t({ en: 'Read the Knowledge Center', ar: 'اطّلع على مركز المعرفة' }, locale)}
          </ButtonLink>
        </div>
      </div>
    );
  }

  const stepTitles = [
    { en: 'What do you need help with?', ar: 'بماذا تحتاج المساعدة؟' },
    { en: 'Tell us about the system.', ar: 'أخبرنا عن النظام.' },
    { en: 'What are you experiencing?', ar: 'ما الذي تلاحظه؟' },
    { en: 'What are you trying to achieve?', ar: 'ما الهدف الذي تسعى إليه؟' },
    { en: 'Project information.', ar: 'معلومات المشروع.' },
    { en: 'How can we contact you?', ar: 'كيف نتواصل معك؟' },
    { en: 'Anything else we should see?', ar: 'هل هناك ما ينبغي أن نطلع عليه؟' },
  ];

  return (
    <form onSubmit={onSubmit} noValidate className="relative border border-white/12 bg-ink-900/70">
      <span aria-hidden className="absolute -top-px start-0 h-0.5 w-20 bg-signal-400" />

      {/* ---- Progress ---- */}
      <div className="flex items-center justify-between gap-6 border-b border-white/10 px-6 py-4 sm:px-8">
        <p className="u-label text-ink-400">
          {t(D.form.step, locale)} {pad(step + 1)} {t(D.form.of, locale)} {pad(TOTAL_STEPS)}
        </p>
        <div className="flex gap-1.5" aria-hidden>
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <span
              key={i}
              className={cn(
                'h-0.5 w-5 transition-colors duration-500 sm:w-7',
                step > i ? 'bg-signal-400' : step === i ? 'bg-signal-500/50' : 'bg-white/15',
              )}
            />
          ))}
        </div>
      </div>

      <div className="p-6 sm:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={reduce ? false : { opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, x: -12 }}
            transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-7"
          >
            <h2
              ref={headingRef}
              tabIndex={-1}
              className="font-display text-xl font-bold tracking-tight text-white outline-none sm:text-2xl"
            >
              {t(stepTitles[step], locale)}
            </h2>

            <ErrorSummary errors={errors} locale={locale} />

            {step === 0 ? (
              <ChoiceGroup
                legend={t({ en: 'Objective', ar: 'الهدف' }, locale)}
                options={NEEDS.map((n) => ({ value: n.value, label: t(n.label, locale), icon: n.icon }))}
                selected={needs}
                onToggle={(v) => toggle(needs, v, setNeeds)}
                locale={locale}
                required
                error={errors.needs}
              />
            ) : null}

            {step === 1 ? (
              <>
                <SelectField
                  label={t({ en: 'System type', ar: 'نوع النظام' }, locale)}
                  value={systemType}
                  onChange={setSystemType}
                  options={options.systems}
                  locale={locale}
                  placeholder={t({ en: 'Select the closest match', ar: 'اختر الأقرب' }, locale)}
                />
                <TextArea
                  label={t({ en: 'System detail', ar: 'تفاصيل النظام' }, locale)}
                  value={systemDetail}
                  onChange={(v) => {
                    markStarted();
                    setSystemDetail(v);
                  }}
                  locale={locale}
                  hint={t(
                    {
                      en: 'Capacity, flow rate, operating temperature, materials, existing treatment, source water — whatever you have.',
                      ar: 'السعة ومعدل التدفق ودرجة حرارة التشغيل والمواد والمعالجة القائمة ومياه المصدر — أي بيانات متاحة لديك.',
                    },
                    locale,
                  )}
                />
              </>
            ) : null}

            {step === 2 ? (
              <ChoiceGroup
                legend={t({ en: 'What you are seeing', ar: 'ما تلاحظه' }, locale)}
                options={PROBLEMS.map((p) => ({ value: p.value, label: t(p.label, locale), icon: p.icon }))}
                selected={problems}
                onToggle={(v) => toggle(problems, v, setProblems)}
                locale={locale}
                required
                error={errors.problems}
              />
            ) : null}

            {step === 3 ? (
              <ChoiceGroup
                legend={t({ en: 'Objectives', ar: 'الأهداف' }, locale)}
                options={OBJECTIVES.map((o) => ({ value: o.value, label: t(o.label, locale), icon: o.icon }))}
                selected={objectives}
                onToggle={(v) => toggle(objectives, v, setObjectives)}
                locale={locale}
                required
                error={errors.objectives}
              />
            ) : null}

            {step === 4 ? (
              <div className="grid gap-6 sm:grid-cols-2">
                <SelectField
                  label={t(D.industry, locale)}
                  value={industry}
                  onChange={setIndustry}
                  options={options.industries}
                  locale={locale}
                />
                <SelectField
                  label={t(D.form.projectStage, locale)}
                  value={projectStage}
                  onChange={setProjectStage}
                  options={PROJECT_STAGES.map((s) => ({ value: s.value, label: t(s.label, locale) }))}
                  locale={locale}
                />
                <TextField label={t(D.form.country, locale)} value={country} onChange={setCountry} locale={locale} autoComplete="country-name" />
                <TextField label={t(D.form.city, locale)} value={city} onChange={setCity} locale={locale} autoComplete="address-level2" />
                <TextField
                  label={t(D.form.requiredBy, locale)}
                  value={requiredBy}
                  onChange={setRequiredBy}
                  locale={locale}
                  type="month"
                />
              </div>
            ) : null}

            {step === 5 ? (
              <div className="grid gap-6 sm:grid-cols-2">
                <TextField label={t(D.form.name, locale)} value={name} onChange={setName} locale={locale} required error={errors.name} autoComplete="name" />
                <TextField label={t(D.form.company, locale)} value={company} onChange={setCompany} locale={locale} required error={errors.company} autoComplete="organization" />
                <TextField label={t(D.form.jobTitle, locale)} value={jobTitle} onChange={setJobTitle} locale={locale} autoComplete="organization-title" />
                <TextField label={t(D.form.email, locale)} value={email} onChange={setEmail} locale={locale} required error={errors.email} type="email" inputMode="email" autoComplete="email" />
                <TextField label={t(D.form.phone, locale)} value={phone} onChange={setPhone} locale={locale} error={errors.phone} type="tel" inputMode="tel" autoComplete="tel" />
              </div>
            ) : null}

            {step === 6 ? (
              <>
                <TextArea
                  label={t(D.form.message, locale)}
                  value={message}
                  onChange={setMessage}
                  locale={locale}
                  rows={5}
                />
                <FileField files={files} onChange={setFiles} locale={locale} />
                <ConsentCheckbox checked={consent} onChange={setConsent} locale={locale} error={errors.consent} />

                {/* Honeypot: visually hidden and off the tab order. */}
                <div aria-hidden className="sr-only-focusable absolute h-px w-px overflow-hidden">
                  <label htmlFor="cw-website">Website</label>
                  <input
                    id="cw-website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                {state === 'error' ? (
                  <div role="alert" className="border border-alert-500/40 bg-alert-500/10 p-4">
                    <p className="text-[0.875rem] text-white">{t(D.form.errors.submitFailed, locale)}</p>
                    <Button variant="quiet" onClick={retry} className="mt-2 text-signal-300 hover:text-white">
                      {t(D.form.retry, locale)}
                    </Button>
                  </div>
                ) : null}
              </>
            ) : null}

            {/* ---- Navigation ---- */}
            <div className="flex flex-wrap items-center gap-3 border-t border-white/10 pt-6">
              {step > 0 ? (
                <Button type="button" variant="outline-light" size="sm" onClick={() => goTo(step - 1)}>
                  {t(D.form.previous, locale)}
                </Button>
              ) : null}
              {step < TOTAL_STEPS - 1 ? (
                <Button type="button" size="sm" withArrow onClick={advance}>
                  {t(D.form.next, locale)}
                </Button>
              ) : (
                <Button type="submit" size="sm" withArrow disabled={state === 'submitting'}>
                  {state === 'submitting' ? t(D.form.submitting, locale) : t(D.form.submit, locale)}
                </Button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </form>
  );
}
