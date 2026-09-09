import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageHero } from '@/components/layout/PageHero';
import { aboutStoreImage } from '@/content/imagery';
import { PageCta } from '@/components/layout/RelatedSections';
import { Band, SectionHeading } from '@/components/ui/Section';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { PartnerCard } from '@/components/cards/Cards';
import { Icon } from '@/components/ui/Icon';
import { dictionary as D } from '@/content/dictionary';
import { partners } from '@/content/partners';
import { company, operatingModel } from '@/content/site';
import type { IconKey } from '@/content/types';
import { isLocale, localePath, t, type Locale, type Localized } from '@/lib/i18n';
import { breadcrumbSchema, pageMetadata } from '@/lib/seo';
import { pad } from '@/lib/utils';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata({
    locale,
    path: 'about',
    title: { en: 'About C-Water | Water Treatment Engineering', ar: 'عن C-Water | هندسة معالجة المياه' },
    description: {
      en: 'C-Water combines local engineering knowledge with proven international technologies to design treatment programmes that protect assets and improve reliability.',
      ar: 'تجمع C-Water بين المعرفة الهندسية المحلية والتقنيات العالمية المُثبتة لتصميم برامج معالجة تحمي الأصول وترفع الموثوقية وتدعم الأداء التشغيلي.',
    },
  });
}

const CAPABILITIES: { id: string; label: Localized; body: Localized; icon: IconKey }[] = [
  {
    id: 'analysis',
    icon: 'lab',
    label: { en: 'Water Analysis', ar: 'تحليل المياه' },
    body: { en: 'Sampling, analysis and interpretation against the system the water is actually in.', ar: 'أخذ العينات والتحليل والتفسير في ضوء النظام الذي توجد فيه المياه فعلًا.' },
  },
  {
    id: 'engineering',
    icon: 'blueprint',
    label: { en: 'Engineering & Design', ar: 'الهندسة والتصميم' },
    body: { en: 'Treatment schemes sized from measured data and specified so they can be built and run.', ar: 'مخططات معالجة محجّمة من بيانات مقاسة وموصّفة بحيث يمكن بناؤها وتشغيلها.' },
  },
  {
    id: 'filtration',
    icon: 'filter',
    label: { en: 'Filtration', ar: 'الترشيح' },
    body: { en: 'Selected against measured solids load, flow and pressure — not against pipe size.', ar: 'يُختار وفق حمل المواد الصلبة والتدفق والضغط المقاسة — لا وفق قطر الخط.' },
  },
  {
    id: 'chemistry',
    icon: 'flask',
    label: { en: 'Treatment Chemistry', ar: 'كيمياء المعالجة' },
    body: { en: 'Programmes matched to metallurgy, water chemistry and the duty they protect.', ar: 'برامج تُوائم المعادن وكيمياء المياه وظروف التشغيل التي تحميها.' },
  },
  {
    id: 'dosing',
    icon: 'pump',
    label: { en: 'Dosing & Control', ar: 'الجرعات والتحكم' },
    body: { en: 'Feed driven by a measured parameter, with verification that the dose was delivered.', ar: 'ضخ مدفوع بمتغير مقاس، مع التحقق من وصول الجرعة فعلًا.' },
  },
  {
    id: 'monitoring',
    icon: 'monitor',
    label: { en: 'Monitoring & Reporting', ar: 'المراقبة والتقارير' },
    body: { en: 'Continuous measurement turned into reporting that says what changed and what to do.', ar: 'قياس مستمر يتحول إلى تقارير تبيّن ما تغيّر وما ينبغي فعله.' },
  },
  {
    id: 'service',
    icon: 'wrench',
    label: { en: 'Service & Support', ar: 'الخدمة والدعم' },
    body: { en: 'Commissioning, calibration, preventive maintenance and technical response.', ar: 'التشغيل الابتدائي والمعايرة والصيانة الوقائية والاستجابة الفنية.' },
  },
  {
    id: 'optimisation',
    icon: 'optimize',
    label: { en: 'Optimisation', ar: 'التحسين' },
    body: { en: 'Finding the margin in a system that works but is not running at its best.', ar: 'إيجاد الهامش في نظام يعمل لكن ليس بأفضل ما يمكن.' },
  },
];

const DIFFERENCES: { id: string; label: Localized; body: Localized; icon: IconKey }[] = [
  {
    id: 'local',
    icon: 'factory',
    label: { en: 'Local', ar: 'محليون' },
    body: {
      en: 'We work in the operating environment our customers work in — the same source waters, the same ambient conditions, the same supply realities.',
      ar: 'نعمل في البيئة التشغيلية نفسها التي يعمل فيها عملاؤنا — المصادر ذاتها والظروف الجوية ذاتها وواقع الإمداد ذاته.',
    },
  },
  {
    id: 'technical',
    icon: 'blueprint',
    label: { en: 'Technical', ar: 'فنيون' },
    body: {
      en: 'We treat water treatment as an engineering discipline. That means measurement before recommendation, and a reason behind every selection.',
      ar: 'نتعامل مع معالجة المياه كتخصص هندسي. أي القياس قبل التوصية، وسبب وراء كل اختيار.',
    },
  },
  {
    id: 'integrated',
    icon: 'network',
    label: { en: 'Integrated', ar: 'متكاملون' },
    body: {
      en: 'Chemistry, filtration, dosing, measurement and control are connected. We engineer the sequence rather than supplying one component of it.',
      ar: 'الكيمياء والترشيح والجرعات والقياس والتحكم مترابطة. ونحن نصمم التسلسل بدل توريد مكوّن واحد منه.',
    },
  },
  {
    id: 'supported',
    icon: 'shield',
    label: { en: 'Supported', ar: 'داعمون' },
    body: {
      en: 'Equipment delivery is where the relationship starts. Verification, service and periodic review are what make a programme hold.',
      ar: 'تسليم المعدات بداية العلاقة. والتحقق والخدمة والمراجعة الدورية هي ما يجعل البرنامج يصمد.',
    },
  },
  {
    id: 'connected',
    icon: 'monitor',
    label: { en: 'Connected', ar: 'متصلون' },
    body: {
      en: 'We increasingly connect treatment with measurement, control and useful operating data — so a deviation is visible before it becomes damage.',
      ar: 'نربط المعالجة أكثر فأكثر بالقياس والتحكم وبيانات التشغيل المفيدة — ليصبح الانحراف مرئيًا قبل أن يتحول إلى ضرر.',
    },
  },
];

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;

  const label = t({ en: 'About', ar: 'عن الشركة' }, locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { label: t(D.home, locale), href: localePath(locale) },
              { label, href: localePath(locale, 'about') },
            ]),
          ),
        }}
      />

      <PageHero
        locale={locale}
        breadcrumbs={[{ label: t(D.home, locale), href: localePath(locale) }, { label }]}
        eyebrow={t({ en: 'About C-Water', ar: 'عن C-Water' }, locale)}
        title={t({ en: 'Engineering Water With Purpose.', ar: 'هندسة المياه بغاية واضحة.' }, locale)}
        lead={t(
          {
            en: 'C-Water helps organisations manage one of their most important operating resources. We combine local engineering knowledge with proven international technologies to design treatment programmes that protect equipment, improve reliability and support operational performance.',
            ar: 'تساعد C-Water المؤسسات على إدارة أحد أهم مواردها التشغيلية. ونجمع بين المعرفة الهندسية المحلية والتقنيات العالمية المُثبتة لتصميم برامج معالجة تحمي المعدات وترفع الموثوقية وتدعم الأداء التشغيلي.',
          },
          locale,
        )}
        primaryCta={{ label: t(D.talkToEngineer, locale), href: localePath(locale, 'contact?intent=engineer') }}
        size="large"
        image={aboutStoreImage}
        aside={
          <div className="border border-white/12 bg-ink-900/60 p-6">
            <p className="u-label text-signal-300">{t({ en: 'Serving industry since', ar: 'نخدم الصناعة منذ' }, locale)}</p>
            {/* Published on C-Water's current site: "over 18 years". */}
            <p className="tnum mt-3 font-display text-5xl font-bold tracking-tight text-white">
              {company.yearsOfOperation}+
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink-300">
              {t(
                {
                  en: 'years serving commercial and industrial water systems in Egypt.',
                  ar: 'عامًا في خدمة أنظمة المياه التجارية والصناعية في مصر.',
                },
                locale,
              )}
            </p>
          </div>
        }
      />

      {/* ---- Capability ---- */}
      <Band tone="paper" className="section">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              index={1}
              eyebrow={t({ en: 'Our capability', ar: 'قدراتنا' }, locale)}
              title={t({ en: 'From Water Chemistry to System Control.', ar: 'من كيمياء المياه إلى التحكم في النظام.' }, locale)}
              lead={t(
                {
                  en: 'These are not separate services sold separately. They are the parts of one method, and the value is in how they connect.',
                  ar: 'هذه ليست خدمات منفصلة تُباع منفصلة، بل أجزاء منهج واحد، والقيمة في كيفية ترابطها.',
                },
                locale,
              )}
            />
          </Reveal>
          <RevealGroup className="mt-12 grid gap-px border border-ink-200 bg-ink-200 sm:grid-cols-2 lg:grid-cols-4">
            {CAPABILITIES.map((item) => (
              <RevealItem key={item.id}>
                <div className="flex h-full flex-col bg-white p-6">
                  <Icon name={item.icon} size={24} className="mb-5 text-signal-600" />
                  <p className="font-display text-base leading-snug font-semibold tracking-tight text-ink-950">
                    {t(item.label, locale)}
                  </p>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink-600">{t(item.body, locale)}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Band>

      {/* ---- Method ---- */}
      <Band tone="ink" blueprint className="section">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              index={2}
              eyebrow={t({ en: 'How we work', ar: 'كيف نعمل' }, locale)}
              title={t({ en: 'Diagnose → Design → Treat → Control → Monitor → Optimize', ar: 'تشخيص ← تصميم ← معالجة ← تحكم ← مراقبة ← تحسين' }, locale)}
              tone="light"
            />
          </Reveal>
          <RevealGroup as="ol" className="mt-12 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {operatingModel.map((step, i) => (
              <RevealItem as="li" key={step.id}>
                <div className="flex h-full flex-col bg-ink-950 p-7">
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <span className="u-label text-signal-300">{pad(i + 1)}</span>
                    <Icon name={step.icon} size={24} className="text-signal-400" />
                  </div>
                  <h3 className="font-display text-lg font-bold tracking-tight text-white">{t(step.label, locale)}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-300">{t(step.body, locale)}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Band>

      {/* ---- Difference ---- */}
      <Band tone="mist" className="section">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              index={3}
              eyebrow={t({ en: 'Our difference', ar: 'ما يميزنا' }, locale)}
              title={t({ en: 'Why Customers Choose Us.', ar: 'لماذا يختارنا العملاء.' }, locale)}
            />
          </Reveal>
          <RevealGroup as="ol" className="mt-12 flex flex-col">
            {DIFFERENCES.map((item, i) => (
              <RevealItem as="li" key={item.id}>
                <div className="group grid gap-5 border-b border-ink-200 py-8 first:border-t sm:grid-cols-[auto_minmax(0,1fr)_minmax(0,1.8fr)] sm:gap-10">
                  <span className="u-label pt-1 text-signal-700">{pad(i + 1)}</span>
                  <div className="flex items-start gap-4">
                    <Icon
                      name={item.icon}
                      size={24}
                      className="mt-0.5 shrink-0 text-ink-300 transition-colors duration-500 group-hover:text-signal-500"
                    />
                    <h3 className="font-display text-h4 leading-tight font-semibold tracking-tight text-ink-950">
                      {t(item.label, locale)}
                    </h3>
                  </div>
                  <p className="leading-relaxed text-ink-600">{t(item.body, locale)}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Band>

      {/* ---- Partners ---- */}
      <Band tone="paper" className="section">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              index={4}
              eyebrow={t({ en: 'Technology partners', ar: 'شركاء التقنية' }, locale)}
              title={t({ en: 'Global Technology. Delivered by C-Water.', ar: 'تقنية عالمية. يقدّمها فريق C-Water.' }, locale)}
            />
          </Reveal>
          <RevealGroup className="mt-12 grid gap-5 md:grid-cols-3">
            {partners.map((partner) => (
              <RevealItem key={partner.slug}>
                <PartnerCard partner={partner} locale={locale} tone="light" />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Band>

      <PageCta
        locale={locale}
        title={t({ en: 'Start With the Problem.', ar: 'ابدأ من المشكلة.' }, locale)}
        body={t(
          {
            en: 'Tell us what your water system is doing. We will tell you what we would need to establish before recommending anything.',
            ar: 'أخبرنا بما يحدث في نظام المياه لديك. وسنخبرك بما نحتاج تحديده قبل التوصية بأي شيء.',
          },
          locale,
        )}
        primary={{ label: t(D.requestSolution, locale), href: localePath(locale, 'request-solution') }}
        secondary={{ label: t(D.talkToEngineer, locale), href: localePath(locale, 'contact?intent=engineer') }}
      />
    </>
  );
}
