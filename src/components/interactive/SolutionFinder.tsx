'use client';

import { useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Button, ButtonLink } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { dictionary as D } from '@/content/dictionary';
import type { GoalTag, IconKey, ProblemTag } from '@/content/types';
import { localePath, t, type Locale, type Localized } from '@/lib/i18n';
import { track } from '@/lib/analytics';
import { cn, pad } from '@/lib/utils';

/**
 * Signature interaction 05 — the Solution Finder.
 *
 * Three questions, scored against the solution records' `problemTags` and
 * `goalTags`. The result narrows the starting point and routes to an engineer;
 * it is explicitly not presented as an engineering assessment, and the
 * disclaimer stays on screen with the result rather than being buried.
 */

const SYSTEMS: { slug: string; label: Localized; icon: IconKey }[] = [
  { slug: 'cooling-water', label: { en: 'Cooling Water', ar: 'مياه التبريد' }, icon: 'tower' },
  { slug: 'boiler-steam', label: { en: 'Boiler & Steam', ar: 'الغلايات والبخار' }, icon: 'boiler' },
  { slug: 'ro-membranes', label: { en: 'RO / Membrane', ar: 'التناضح العكسي / الأغشية' }, icon: 'membrane' },
  { slug: 'process-water', label: { en: 'Process Water', ar: 'مياه العمليات' }, icon: 'factory' },
  { slug: 'wastewater', label: { en: 'Wastewater', ar: 'مياه الصرف' }, icon: 'recycle' },
  { slug: 'potable-water', label: { en: 'Potable Water', ar: 'مياه الشرب' }, icon: 'droplet' },
  { slug: 'industrial-water', label: { en: 'Industrial Water', ar: 'المياه الصناعية' }, icon: 'network' },
];

const PROBLEMS: { tag: ProblemTag; label: Localized; icon: IconKey }[] = [
  { tag: 'scale', label: { en: 'Scale', ar: 'الترسبات' }, icon: 'scale' },
  { tag: 'corrosion', label: { en: 'Corrosion', ar: 'التآكل' }, icon: 'corrosion' },
  { tag: 'fouling', label: { en: 'Fouling', ar: 'الاتساخ' }, icon: 'fouling' },
  { tag: 'microbiology', label: { en: 'Microbiology', ar: 'النمو البيولوجي' }, icon: 'biology' },
  { tag: 'filtration', label: { en: 'Poor Filtration', ar: 'ضعف الترشيح' }, icon: 'filter' },
  { tag: 'water-loss', label: { en: 'Water Loss', ar: 'فقد المياه' }, icon: 'droplet' },
  { tag: 'chemical-consumption', label: { en: 'Chemical Consumption', ar: 'استهلاك الكيماويات' }, icon: 'flask' },
  { tag: 'reliability', label: { en: 'Reliability', ar: 'الموثوقية' }, icon: 'shield' },
  { tag: 'maintenance', label: { en: 'Maintenance', ar: 'الصيانة' }, icon: 'wrench' },
  { tag: 'performance', label: { en: 'Performance', ar: 'الأداء' }, icon: 'gauge' },
];

const GOALS: { tag: GoalTag; label: Localized; icon: IconKey }[] = [
  { tag: 'protect-equipment', label: { en: 'Protect equipment', ar: 'حماية المعدات' }, icon: 'shield' },
  { tag: 'improve-efficiency', label: { en: 'Improve efficiency', ar: 'تحسين الكفاءة' }, icon: 'energy' },
  { tag: 'reduce-water', label: { en: 'Reduce water use', ar: 'خفض استهلاك المياه' }, icon: 'droplet' },
  { tag: 'improve-control', label: { en: 'Improve treatment control', ar: 'تحسين التحكم في المعالجة' }, icon: 'controller' },
  { tag: 'reduce-maintenance', label: { en: 'Reduce maintenance', ar: 'تقليل الصيانة' }, icon: 'wrench' },
  { tag: 'improve-reliability', label: { en: 'Improve reliability', ar: 'رفع الموثوقية' }, icon: 'gauge' },
  { tag: 'optimize-existing', label: { en: 'Optimise an existing system', ar: 'تحسين نظام قائم' }, icon: 'optimize' },
  { tag: 'design-new', label: { en: 'Design a new system', ar: 'تصميم نظام جديد' }, icon: 'blueprint' },
];

type Step = 0 | 1 | 2 | 3;

/**
 * The scoring inputs, supplied by the server page. Only the title, headline,
 * summary and the two tag arrays are needed — importing the solutions module
 * would ship all eight long-form bilingual records to the browser.
 */
export interface FinderSolution {
  slug: string;
  title: string;
  headline: string;
  summary: string;
  cta: string;
  problemTags: ProblemTag[];
  goalTags: GoalTag[];
}

export function SolutionFinder({
  locale,
  solutions,
  className,
}: {
  locale: Locale;
  solutions: FinderSolution[];
  className?: string;
}) {
  const [step, setStep] = useState<Step>(0);
  const [system, setSystem] = useState<string | null>(null);
  const [problems, setProblems] = useState<ProblemTag[]>([]);
  const [goals, setGoals] = useState<GoalTag[]>([]);
  const [started, setStarted] = useState(false);
  const headingRef = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();

  const markStarted = () => {
    if (!started) {
      setStarted(true);
      track('solution_finder_started');
    }
  };

  const goTo = (next: Step) => {
    setStep(next);
    track('solution_finder_step', { step: next });
    // Move focus to the new question so screen readers announce the change.
    requestAnimationFrame(() => headingRef.current?.focus());
  };

  const toggle = <T,>(list: T[], value: T, setter: (next: T[]) => void) => {
    markStarted();
    setter(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  };

  /**
   * Score every solution against the answers. The chosen system is weighted
   * most heavily, then matching problems, then matching goals — so a visitor
   * who picks "cooling water" gets a cooling answer even if their problems
   * also appear elsewhere.
   */
  const result = useMemo(() => {
    const scored = solutions.map((solution) => {
      let score = 0;
      if (system && solution.slug === system) score += 60;
      for (const p of problems) if (solution.problemTags.includes(p)) score += 8;
      for (const g of goals) if (solution.goalTags.includes(g)) score += 5;
      return { solution, score };
    });
    scored.sort((a, b) => b.score - a.score);
    return scored[0]?.score > 0 ? scored[0].solution : null;
  }, [solutions, system, problems, goals]);

  const restart = () => {
    setSystem(null);
    setProblems([]);
    setGoals([]);
    setStep(0);
    requestAnimationFrame(() => headingRef.current?.focus());
  };

  const complete = () => {
    goTo(3);
    track('solution_finder_completed', {
      system: system ?? 'none',
      problems: problems.join(','),
      goals: goals.join(','),
      result: result?.slug ?? 'none',
    });
  };

  const questions = [
    t(D.finder.q1, locale),
    t(D.finder.q2, locale),
    t(D.finder.q3, locale),
  ];

  const canAdvance = step === 0 ? Boolean(system) : step === 1 ? problems.length > 0 : goals.length > 0;

  return (
    <div className={cn('relative border border-white/12 bg-ink-900/70', className)}>
      <span aria-hidden className="absolute -top-px start-0 h-0.5 w-20 bg-signal-400" />

      {/* ---- Progress ---- */}
      <div className="flex items-center justify-between gap-6 border-b border-white/10 px-6 py-4 sm:px-8">
        <p className="u-label text-ink-400">
          {step < 3 ? (
            <>
              {t(D.finder.step, locale)} {pad(step + 1)} {t(D.finder.of, locale)} {pad(3)}
            </>
          ) : (
            t(D.finder.resultEyebrow, locale)
          )}
        </p>
        <div className="flex gap-1.5" aria-hidden>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={cn(
                'h-0.5 w-8 transition-colors duration-500',
                step > i || step === 3 ? 'bg-signal-400' : step === i ? 'bg-signal-500/50' : 'bg-white/15',
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
          >
            {step < 3 ? (
              <>
                <p
                  ref={headingRef}
                  tabIndex={-1}
                  className="font-display text-xl font-bold tracking-tight text-white outline-none sm:text-2xl"
                >
                  {questions[step]}
                </p>
                <p className="mt-2 text-sm text-ink-400">
                  {step === 0 ? t(D.form.selectOne, locale) : t(D.form.selectAllThatApply, locale)}
                </p>

                <div className="mt-6 flex flex-wrap gap-2.5">
                  {step === 0
                    ? SYSTEMS.map((s) => (
                        <Choice
                          key={s.slug}
                          selected={system === s.slug}
                          icon={s.icon}
                          onClick={() => {
                            markStarted();
                            setSystem(s.slug);
                          }}
                        >
                          {t(s.label, locale)}
                        </Choice>
                      ))
                    : step === 1
                      ? PROBLEMS.map((p) => (
                          <Choice
                            key={p.tag}
                            selected={problems.includes(p.tag)}
                            icon={p.icon}
                            onClick={() => toggle(problems, p.tag, setProblems)}
                          >
                            {t(p.label, locale)}
                          </Choice>
                        ))
                      : GOALS.map((g) => (
                          <Choice
                            key={g.tag}
                            selected={goals.includes(g.tag)}
                            icon={g.icon}
                            onClick={() => toggle(goals, g.tag, setGoals)}
                          >
                            {t(g.label, locale)}
                          </Choice>
                        ))}
                </div>

                <div className="mt-8 flex items-center gap-3">
                  {step > 0 ? (
                    <Button variant="outline-light" size="sm" onClick={() => goTo((step - 1) as Step)}>
                      {t(D.finder.previous, locale)}
                    </Button>
                  ) : null}
                  <Button
                    size="sm"
                    disabled={!canAdvance}
                    withArrow
                    onClick={() => (step === 2 ? complete() : goTo((step + 1) as Step))}
                  >
                    {t(D.finder.next, locale)}
                  </Button>
                </div>
              </>
            ) : (
              <div role="status">
                <p
                  ref={headingRef}
                  tabIndex={-1}
                  className="font-display text-xl leading-snug font-bold tracking-tight text-white outline-none sm:text-2xl"
                >
                  {t(D.finder.resultLead, locale)}{' '}
                  <span className="text-signal-300">{result ? result.title : '—'}</span>.
                </p>
                <p className="mt-4 max-w-2xl leading-relaxed text-ink-200">{t(D.finder.resultBody, locale)}</p>

                {result ? (
                  <div className="mt-6 border border-white/10 bg-ink-950/50 p-5">
                    <p className="u-label text-ink-400">{t(D.kind.solution, locale)}</p>
                    <p className="mt-2 font-display text-lg font-semibold tracking-tight text-white">
                      {result.headline}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-ink-300">{result.summary}</p>
                  </div>
                ) : null}

                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <ButtonLink href={localePath(locale, 'request-solution')} size="sm" withArrow>
                    {t(D.finder.discussWithEngineer, locale)}
                  </ButtonLink>
                  {result ? (
                    <ButtonLink
                      href={localePath(locale, `solutions/${result.slug}`)}
                      variant="outline-light"
                      size="sm"
                    >
                      {t(D.finder.viewSolution, locale)}
                    </ButtonLink>
                  ) : null}
                  <Button variant="quiet" onClick={restart} className="text-signal-300 hover:text-white">
                    {t(D.finder.restart, locale)}
                  </Button>
                </div>

                {/* The honesty note stays with the result, not in a footnote. */}
                <p className="mt-7 flex items-start gap-2.5 border-t border-white/10 pt-5 text-[0.8125rem] leading-relaxed text-ink-400">
                  <Icon name="clipboard" size={15} className="mt-0.5 shrink-0 text-ink-400" />
                  {t(D.finder.disclaimer, locale)}
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function Choice({
  children,
  selected,
  icon,
  onClick,
}: {
  children: React.ReactNode;
  selected: boolean;
  icon: IconKey;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        'flex items-center gap-2.5 rounded-sm border px-3.5 py-2.5 text-[0.875rem] transition-colors duration-250',
        selected
          ? 'border-signal-400 bg-signal-500/14 text-white'
          : 'border-white/14 text-ink-200 hover:border-white/34 hover:text-white',
      )}
    >
      <Icon name={icon} size={17} className={selected ? 'text-signal-300' : 'text-ink-400'} />
      {children}
    </button>
  );
}
