'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { TreatmentLine, TreatmentLineStack } from './TreatmentLine';
import { LinkCta } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { dictionary as D } from '@/content/dictionary';
import type { IconKey, PartnerSlug } from '@/content/types';

import { localePath, t, type Locale, type Localized } from '@/lib/i18n';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/utils';

/**
 * Partner display names, hard-coded rather than imported.
 *
 * These are trademarks written exactly as their owners write them, so they are
 * not translated and do not change. Importing the partners module for three
 * strings would ship every partner record to the browser.
 */
const PARTNER_NAMES: Record<PartnerSlug, string> = {
  walchem: 'Walchem',
  timex: 'TIMEX',
  kurita: 'Kurita Europe',
};

/**
 * Signature interaction 02 — the System Explorer.
 *
 * Selecting a stage of the treatment line opens its purpose, the partner
 * technology that sits there, the applications it serves and a route deeper
 * into the site. On mobile the diagram becomes a vertical sequence and the
 * detail panel sits beneath it.
 */

interface Stage {
  id: string;
  label: Localized;
  caption: Localized;
  purpose: Localized;
  icon: IconKey;
  partner?: PartnerSlug;
  applications: Localized[];
  href: string;
  cta: Localized;
}

export const systemStages: Stage[] = [
  {
    id: 'source',
    label: { en: 'Source Water', ar: 'مياه المصدر' },
    caption: { en: 'What you start with', ar: 'ما تبدأ به' },
    icon: 'droplet',
    purpose: {
      en: 'Everything downstream is decided here. The source water chemistry sets the scaling and corrosion tendency, the achievable cycles of concentration and the filtration degree the rest of the system will need.',
      ar: 'كل ما يلي يتحدد هنا. فكيمياء مياه المصدر تحدد ميل الترسب والتآكل، ودورات التركيز الممكنة، ودرجة الترشيح التي سيحتاجها بقية النظام.',
    },
    applications: [
      { en: 'Municipal supply', ar: 'الإمداد البلدي' },
      { en: 'Well and borehole', ar: 'الآبار' },
      { en: 'Surface water', ar: 'المياه السطحية' },
      { en: 'Recovered water', ar: 'المياه المستعادة' },
    ],
    href: '/technologies/water-analysis',
    cta: { en: 'Water Analysis', ar: 'تحليل المياه' },
  },
  {
    id: 'filtration',
    label: { en: 'Filtration', ar: 'الترشيح' },
    caption: { en: 'Remove what should not be there', ar: 'إزالة ما لا ينبغي وجوده' },
    icon: 'filter',
    partner: 'timex',
    purpose: {
      en: 'Suspended solids foul heat-transfer surfaces, shelter microbiological growth and consume treatment chemical that should be protecting metal. Removing them at the right degree reduces all three loads at once.',
      ar: 'تُلوّث المواد الصلبة العالقة أسطح التبادل الحراري، وتوفر ملاذًا للنمو البيولوجي، وتستهلك كيماويات المعالجة التي يجب أن تحمي المعدن. وإزالتها بالدرجة الصحيحة تقلل هذه الأحمال الثلاثة معًا.',
    },
    applications: [
      { en: 'Cooling tower side-stream', ar: 'التيار الجانبي لأبراج التبريد' },
      { en: 'RO pretreatment', ar: 'المعالجة الأولية للتناضح العكسي' },
      { en: 'Process water', ar: 'مياه العمليات' },
      { en: 'Irrigation networks', ar: 'شبكات الري' },
    ],
    href: '/technologies/filtration',
    cta: { en: 'Explore Filtration', ar: 'استكشف الترشيح' },
  },
  {
    id: 'chemical',
    label: { en: 'Chemical Treatment', ar: 'المعالجة الكيميائية' },
    caption: { en: 'Control the chemistry', ar: 'التحكم في الكيمياء' },
    icon: 'flask',
    partner: 'kurita',
    purpose: {
      en: 'Treatment chemistry addresses what a water system cannot avoid: minerals coming out of solution, metal surfaces losing material, and biological populations establishing wherever water is warm and slow-moving.',
      ar: 'تعالج كيمياء المعالجة ما لا يمكن لنظام مياه تجنبه: ترسّب المعادن، وفقد الأسطح المعدنية لمادتها، ونمو التجمعات البيولوجية حيثما كانت المياه دافئة وبطيئة الحركة.',
    },
    applications: [
      { en: 'Cooling water', ar: 'مياه التبريد' },
      { en: 'Boiler and steam', ar: 'الغلايات والبخار' },
      { en: 'Membrane protection', ar: 'حماية الأغشية' },
      { en: 'Effluent treatment', ar: 'معالجة المخلفات' },
    ],
    href: '/technologies/water-treatment-chemicals',
    cta: { en: 'Explore Treatment Chemistry', ar: 'استكشف كيمياء المعالجة' },
  },
  {
    id: 'dosing',
    label: { en: 'Dosing', ar: 'الجرعات' },
    caption: { en: 'Deliver it accurately', ar: 'ضخها بدقة' },
    icon: 'pump',
    partner: 'walchem',
    purpose: {
      en: 'A correctly chosen chemical dosed incorrectly does not work. Feed driven by a measured parameter follows the system as load, make-up quality and season change, instead of assuming the demand is constant.',
      ar: 'الكيماوي المختار بشكل صحيح والمضخوخ بشكل خاطئ لا يعمل. والضخ المدفوع بمتغير مقاس يتبع النظام مع تغير الحمل وجودة مياه التعويض والفصول، بدل افتراض ثبات الطلب.',
    },
    applications: [
      { en: 'Inhibitor and biocide feed', ar: 'ضخ المثبطات والمبيدات' },
      { en: 'Antiscalant injection', ar: 'حقن مانع الترسب' },
      { en: 'pH correction', ar: 'تصحيح الحموضة' },
      { en: 'Coagulant dosing', ar: 'ضخ المروّبات' },
    ],
    href: '/technologies/chemical-dosing',
    cta: { en: 'Explore Dosing', ar: 'استكشف الجرعات' },
  },
  {
    id: 'sensing',
    label: { en: 'Sensing', ar: 'الاستشعار' },
    caption: { en: 'Measure what matters', ar: 'قياس ما يهم' },
    icon: 'sensor',
    partner: 'walchem',
    purpose: {
      en: 'Every treatment decision rests on a number that came from a sensor. Online measurement replaces a weekly grab sample with continuous visibility — including at three in the morning.',
      ar: 'يستند كل قرار معالجة إلى رقم جاء من مستشعر. والقياس المتصل يستبدل العينة الأسبوعية برؤية مستمرة — بما في ذلك الساعة الثالثة فجرًا.',
    },
    applications: [
      { en: 'pH and ORP', ar: 'pH وORP' },
      { en: 'Conductivity', ar: 'التوصيلية' },
      { en: 'Disinfection residual', ar: 'متبقي التطهير' },
      { en: 'Corrosion rate', ar: 'معدل التآكل' },
    ],
    href: '/technologies/sensors-measurement',
    cta: { en: 'Explore Measurement', ar: 'استكشف القياس' },
  },
  {
    id: 'control',
    label: { en: 'Control', ar: 'التحكم' },
    caption: { en: 'Act on the reading', ar: 'التصرف وفق القراءة' },
    icon: 'controller',
    partner: 'walchem',
    purpose: {
      en: 'A controller is not the same thing as control. The instrument reads and acts; the control strategy decides what it should read, what it should act on, and what it should do when the two disagree.',
      ar: 'وحدة التحكم ليست هي التحكم. فالجهاز يقرأ ويتصرف، أما استراتيجية التحكم فتقرر ما ينبغي أن يقرأه، وعلامَ يتصرف، وماذا يفعل حين يتعارض الاثنان.',
    },
    applications: [
      { en: 'Blowdown control', ar: 'التحكم في التصريف' },
      { en: 'Chemical feed control', ar: 'التحكم في ضخ الكيماويات' },
      { en: 'Alarm handling', ar: 'معالجة الإنذارات' },
      { en: 'Feed verification', ar: 'التحقق من الضخ' },
    ],
    href: '/technologies/monitoring-control',
    cta: { en: 'Explore Control', ar: 'استكشف التحكم' },
  },
  {
    id: 'output',
    label: { en: 'Monitoring & Optimisation', ar: 'المراقبة والتحسين' },
    caption: { en: 'Keep improving it', ar: 'الاستمرار في التحسين' },
    icon: 'optimize',
    purpose: {
      en: 'Between service visits a treatment system is unobserved, and most conditions that cause real damage develop inside that gap. Logged history is what turns a periodic report into a decision rather than a reading.',
      ar: 'بين زيارات الخدمة يبقى نظام المعالجة دون مراقبة، ومعظم الحالات التي تسبب ضررًا حقيقيًا تنشأ داخل تلك الفجوة. والسجل المسجَّل هو ما يحوّل التقرير الدوري إلى قرار لا مجرد قراءة.',
    },
    applications: [
      { en: 'Remote monitoring', ar: 'المراقبة عن بُعد' },
      { en: 'Trend analysis', ar: 'تحليل الاتجاهات' },
      { en: 'Technical reporting', ar: 'التقارير الفنية' },
      { en: 'Programme review', ar: 'مراجعة البرنامج' },
    ],
    href: '/technologies/automation-remote-monitoring',
    cta: { en: 'Explore Monitoring', ar: 'استكشف المراقبة' },
  },
];

export function SystemExplorer({ locale }: { locale: Locale }) {
  const [activeId, setActiveId] = useState<string>('filtration');
  const reduce = useReducedMotion();
  const active = systemStages.find((s) => s.id === activeId)!;

  const labels = Object.fromEntries(systemStages.map((s) => [s.id, t(s.label, locale)]));
  const captions = Object.fromEntries(systemStages.map((s) => [s.id, t(s.caption, locale)]));

  const select = (id: string) => {
    setActiveId(id);
    track('cta_click', { component: 'system_explorer', stage: id });
  };

  return (
    <div className="flex flex-col gap-10">
      {/* ---- Desktop: the horizontal treatment line ---- */}
      <div className="hidden lg:block">
        <TreatmentLine labels={labels} activeStage={activeId} onStageSelect={select} />
      </div>

      {/* ---- Mobile / tablet: vertical sequence ---- */}
      <div className="lg:hidden">
        <TreatmentLineStack labels={labels} captions={captions} />
      </div>

      {/* ---- Stage selector: keyboard-navigable tab list ---- */}
      <div
        role="tablist"
        aria-label={t(D.explorer.selectStage, locale)}
        className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 md:mx-0 md:flex-wrap md:px-0"
      >
        {systemStages.map((stage) => {
          const isActive = stage.id === activeId;
          return (
            <button
              key={stage.id}
              role="tab"
              type="button"
              aria-selected={isActive}
              aria-controls={`stage-panel-${stage.id}`}
              id={`stage-tab-${stage.id}`}
              onClick={() => select(stage.id)}
              className={cn(
                'flex shrink-0 items-center gap-2 rounded-sm border px-3.5 py-2 text-[0.8125rem] font-medium transition-colors duration-300',
                isActive
                  ? 'border-signal-400 bg-signal-500/12 text-white'
                  : 'border-white/12 text-ink-300 hover:border-white/30 hover:text-white',
              )}
            >
              <Icon name={stage.icon} size={16} className={isActive ? 'text-signal-300' : 'text-ink-400'} />
              {t(stage.label, locale)}
            </button>
          );
        })}
      </div>

      {/* ---- Detail panel ---- */}
      <div className="relative min-h-[19rem] border border-white/10 bg-ink-900/60 sm:min-h-[15rem]">
        <span aria-hidden className="absolute -top-px start-0 h-0.5 w-16 bg-signal-400" />
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            id={`stage-panel-${active.id}`}
            role="tabpanel"
            aria-labelledby={`stage-tab-${active.id}`}
            tabIndex={0}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.4fr_1fr] lg:gap-12"
          >
            <div>
              <div className="flex items-center gap-3">
                <p className="u-label text-signal-300">
                  {t(D.explorer.stageOf, locale)} {String(systemStages.indexOf(active) + 1).padStart(2, '0')}
                </p>
                {active.partner ? (
                  <>
                    <span aria-hidden className="h-px w-5 bg-white/20" />
                    <span className="u-label text-ink-400">
                      {t(D.explorer.technologyPartner, locale)} ·{' '}
                      <span className="latin text-ink-200">{PARTNER_NAMES[active.partner]}</span>
                    </span>
                  </>
                ) : null}
              </div>

              <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
                {t(active.label, locale)}
              </h3>
              <p className="mt-4 max-w-xl leading-relaxed text-ink-200">{t(active.purpose, locale)}</p>

              <div className="mt-6">
                <LinkCta href={localePath(locale, active.href)} tone="light">
                  {t(active.cta, locale)}
                </LinkCta>
              </div>
            </div>

            <div className="border-t border-white/10 pt-6 lg:border-s lg:border-t-0 lg:ps-10 lg:pt-0">
              <p className="u-label text-ink-400">{t(D.applications, locale)}</p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {active.applications.map((app) => (
                  <li key={app.en} className="flex items-start gap-2.5 text-sm text-ink-200">
                    <span aria-hidden className="mt-2 h-px w-3 shrink-0 bg-signal-400" />
                    {t(app, locale)}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
