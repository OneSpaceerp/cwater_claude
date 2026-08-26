import { Band, SectionHeading } from '@/components/ui/Section';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { MetricTile } from '@/components/cards/Cards';
import { DashboardDemo } from '@/components/interactive/DashboardDemo';
import type { IconKey } from '@/content/types';
import { t, type Locale, type Localized } from '@/lib/i18n';

/**
 * Results.
 *
 * DATA RULE: no numeric performance claim appears here. C-Water has not
 * supplied validated measurement data, and an invented percentage would
 * undermine everything else on the page. These tiles state what the
 * engineering is aimed at; figures get added per-project once measured.
 */

const RESULTS: { id: string; label: Localized; body: Localized; icon: IconKey }[] = [
  {
    id: 'protect',
    icon: 'shield',
    label: { en: 'Protect', ar: 'الحماية' },
    body: {
      en: 'Keep heat-transfer surfaces, membranes and metal in the condition they were specified to be in.',
      ar: 'إبقاء أسطح التبادل الحراري والأغشية والمعادن في الحالة التي حُددت لها.',
    },
  },
  {
    id: 'perform',
    icon: 'gauge',
    label: { en: 'Perform', ar: 'الأداء' },
    body: {
      en: 'Support stable process performance by removing the variability that water introduces.',
      ar: 'دعم استقرار أداء العملية بإزالة التذبذب الذي تُدخله المياه.',
    },
  },
  {
    id: 'reduce',
    icon: 'droplet',
    label: { en: 'Reduce', ar: 'الخفض' },
    body: {
      en: 'Identify where water, chemical and energy are being consumed without producing anything.',
      ar: 'تحديد أين تُستهلك المياه والكيماويات والطاقة دون أن تنتج شيئًا.',
    },
  },
  {
    id: 'control',
    icon: 'controller',
    label: { en: 'Control', ar: 'التحكم' },
    body: {
      en: 'Hold the variables that matter at a measured value rather than a fixed schedule.',
      ar: 'تثبيت المتغيرات المؤثرة عند قيمة مقاسة بدل جدول ثابت.',
    },
  },
  {
    id: 'optimise',
    icon: 'optimize',
    label: { en: 'Optimise', ar: 'التحسين' },
    body: {
      en: 'Improve the programme across its operating life as loads, seasons and source water change.',
      ar: 'تحسين البرنامج طوال عمره التشغيلي مع تغير الأحمال والفصول ومياه المصدر.',
    },
  },
  {
    id: 'sustain',
    icon: 'recycle',
    label: { en: 'Sustain', ar: 'الاستدامة' },
    body: {
      en: 'Use water and energy more deliberately, with a record that shows what actually changed.',
      ar: 'استخدام المياه والطاقة بوعي أكبر، مع سجل يبيّن ما تغيّر فعلًا.',
    },
  },
];

export function ResultsSection({ locale }: { locale: Locale }) {
  return (
    <Band tone="ink" className="section">
      <div className="container-page">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <Reveal>
              <SectionHeading
                index={6}
                eyebrow={t({ en: 'Results', ar: 'النتائج' }, locale)}
                title={t(
                  { en: 'Technology Means More When It Produces Results.', ar: 'التقنية تعني أكثر حين تُنتج نتائج.' },
                  locale,
                )}
                lead={t(
                  {
                    en: 'Treatment is judged by what happens to the system, not by what was supplied to it. Measurement is what makes the difference visible.',
                    ar: 'تُقاس المعالجة بما يحدث للنظام لا بما وُرِّد له. والقياس هو ما يجعل الفارق مرئيًا.',
                  },
                  locale,
                )}
                tone="light"
              />
            </Reveal>

            <Reveal delay={0.08}>
              <div className="mt-10">
                <DashboardDemo locale={locale} />
              </div>
            </Reveal>
          </div>

          <RevealGroup className="grid gap-px self-start bg-white/10 sm:grid-cols-2">
            {RESULTS.map((result, i) => (
              <RevealItem key={result.id}>
                <MetricTile
                  label={t(result.label, locale)}
                  body={t(result.body, locale)}
                  icon={result.icon}
                  index={i + 1}
                  tone="dark"
                />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </Band>
  );
}
