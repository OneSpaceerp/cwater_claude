import type { Localized } from '@/lib/i18n';
import type { IconKey } from './types';

/* -------------------------------------------------------------------------- */
/* Company                                                                     */
/* -------------------------------------------------------------------------- */

/**
 * Verified company facts only.
 *
 * `yearsOfOperation` and `email` come from C-Water's published site (cw-eg.com);
 * the address and telephone numbers were supplied directly by C-Water. Working
 * hours are still outstanding and render as a "published once confirmed" state
 * rather than being invented. See docs/CLIENT-DATA-REQUIRED.md.
 */
export const company = {
  name: 'C-Water',
  legalName: 'C-Water',
  tagline: {
    en: 'Water Treatment, Engineered Around Your Operation.',
    ar: 'معالجة المياه، مُهندَسة حول طبيعة تشغيلك.',
  } satisfies Localized,
  descriptor: {
    en: 'Water Treatment',
    ar: 'معالجة المياه',
  } satisfies Localized,
  /** Published on cw-eg.com: "serving … for over 18 years". */
  yearsOfOperation: 18,
  email: 'info@cw-eg.com',

  /**
   * Telephone numbers, supplied by C-Water.
   *
   * `display` is the human-readable form; `tel` is the E.164 form used in the
   * `tel:` href, because a dialler cannot parse spaces or brackets.
   */
  phones: [
    { display: '(+20) 112 229 9044', tel: '+201122299044' },
    { display: '(+20) 111 771 1444', tel: '+201117711444' },
  ],

  /**
   * Registered address, supplied by C-Water.
   *
   * The Arabic rendering of the development name ("Bosla 3") is a best
   * transliteration and should be confirmed by C-Water before launch — see
   * docs/CLIENT-DATA-REQUIRED.md.
   */
  address: {
    street: { en: 'Bosla 3, Unit No. I 21', ar: 'بوصلة 3، وحدة رقم I 21' } satisfies Localized,
    locality: { en: '6th of October City', ar: 'مدينة السادس من أكتوبر' } satisfies Localized,
    countryCode: 'EG',
    full: {
      en: '6th of October, Bosla 3, Unit No. I 21',
      ar: 'السادس من أكتوبر، بوصلة 3، وحدة رقم I 21',
    } satisfies Localized,
  },

  /** Awaiting client confirmation — never invent contact details. */
  workingHours: null as Localized | null,
  country: { en: 'Egypt', ar: 'مصر' } satisfies Localized,
  social: {
    linkedin: 'https://www.linkedin.com/company/c-water-egypt',
    facebook: 'https://www.facebook.com/cwateregypt',
    instagram: 'https://www.instagram.com/cwateregypt',
  },
  /** Sectors named on C-Water's current site. */
  publishedSectors: ['government', 'commercial', 'hospitality', 'manufacturing', 'healthcare'],
} as const;

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://cw-eg.com';

/* -------------------------------------------------------------------------- */
/* Navigation                                                                  */
/* -------------------------------------------------------------------------- */

export interface NavLink {
  label: Localized;
  href: string;
  description?: Localized;
  icon?: IconKey;
}

export interface NavColumn {
  heading: Localized;
  links: NavLink[];
}

export interface NavSection {
  id: string;
  label: Localized;
  href: string;
  /** Mega-menu columns. Absent for simple links. */
  columns?: NavColumn[];
  /** Right-hand promotional panel inside the mega-menu. */
  feature?: {
    eyebrow: Localized;
    heading: Localized;
    body: Localized;
    cta: Localized;
    href: string;
  };
}

export const primaryNav: NavSection[] = [
  {
    id: 'solutions',
    label: { en: 'Solutions', ar: 'الحلول' },
    href: '/solutions',
    columns: [
      {
        heading: { en: 'By application', ar: 'حسب التطبيق' },
        links: [
          {
            label: { en: 'Cooling Water', ar: 'مياه التبريد' },
            href: '/solutions/cooling-water',
            description: { en: 'Scale, corrosion and biofouling control', ar: 'التحكم في الترسبات والتآكل والنمو البيولوجي' },
            icon: 'tower',
          },
          {
            label: { en: 'Boiler & Steam', ar: 'الغلايات والبخار' },
            href: '/solutions/boiler-steam',
            description: { en: 'Feedwater, boiler and condensate protection', ar: 'حماية مياه التغذية والغلاية والمتكثفات' },
            icon: 'boiler',
          },
          {
            label: { en: 'RO & Membranes', ar: 'التناضح العكسي والأغشية' },
            href: '/solutions/ro-membranes',
            description: { en: 'Pretreatment, antiscalant and cleaning strategy', ar: 'المعالجة الأولية ومانع الترسب واستراتيجية التنظيف' },
            icon: 'membrane',
          },
          {
            label: { en: 'Process Water', ar: 'مياه العمليات' },
            href: '/solutions/process-water',
            description: { en: 'Water quality engineered to the process', ar: 'جودة مياه مصممة وفق العملية الإنتاجية' },
            icon: 'factory',
          },
        ],
      },
      {
        heading: { en: 'More applications', ar: 'تطبيقات أخرى' },
        links: [
          {
            label: { en: 'Wastewater', ar: 'مياه الصرف' },
            href: '/solutions/wastewater',
            description: { en: 'Characterisation, treatment and control', ar: 'التوصيف والمعالجة والتحكم' },
            icon: 'recycle',
          },
          {
            label: { en: 'Potable Water', ar: 'مياه الشرب' },
            href: '/solutions/potable-water',
            description: { en: 'Filtration, disinfection and compliance', ar: 'الترشيح والتطهير والمطابقة' },
            icon: 'droplet',
          },
          {
            label: { en: 'Industrial Water', ar: 'المياه الصناعية' },
            href: '/solutions/industrial-water',
            description: { en: 'Integrated multi-system strategies', ar: 'استراتيجيات متكاملة لأنظمة متعددة' },
            icon: 'network',
          },
          {
            label: { en: 'Specialised Treatment', ar: 'المعالجة المتخصصة' },
            href: '/solutions/specialised-treatment',
            description: { en: 'Non-standard and difficult waters', ar: 'المياه غير النمطية والصعبة' },
            icon: 'flask',
          },
        ],
      },
      {
        heading: { en: 'Explore', ar: 'استكشف' },
        links: [
          { label: { en: 'All Solutions', ar: 'كل الحلول' }, href: '/solutions' },
          { label: { en: 'Solution Finder', ar: 'مرشد الحلول' }, href: '/solutions#finder' },
          { label: { en: 'Services', ar: 'الخدمات' }, href: '/services' },
          { label: { en: 'Projects', ar: 'المشروعات' }, href: '/projects' },
        ],
      },
    ],
    feature: {
      eyebrow: { en: 'Not sure where to start?', ar: 'لست متأكدًا من أين تبدأ؟' },
      heading: { en: 'Start with the problem, not the product.', ar: 'ابدأ من المشكلة، لا من المنتج.' },
      body: {
        en: 'Answer three questions about your system and we will point you to the right starting assessment.',
        ar: 'أجب عن ثلاثة أسئلة حول نظامك وسنوجهك إلى نقطة البدء الصحيحة للتقييم.',
      },
      cta: { en: 'Open the Solution Finder', ar: 'افتح مرشد الحلول' },
      href: '/solutions#finder',
    },
  },
  {
    id: 'industries',
    label: { en: 'Industries', ar: 'القطاعات' },
    href: '/industries',
    columns: [
      {
        heading: { en: 'Process & production', ar: 'الإنتاج والعمليات' },
        links: [
          { label: { en: 'Manufacturing', ar: 'الصناعات التحويلية' }, href: '/industries/manufacturing' },
          { label: { en: 'Food & Beverage', ar: 'الأغذية والمشروبات' }, href: '/industries/food-beverage' },
          { label: { en: 'Pharmaceutical & Cosmetics', ar: 'الأدوية ومستحضرات التجميل' }, href: '/industries/pharmaceutical-cosmetics' },
          { label: { en: 'Chemical & Petrochemical', ar: 'الكيماويات والبتروكيماويات' }, href: '/industries/chemical-petrochemical' },
        ],
      },
      {
        heading: { en: 'Energy & heavy industry', ar: 'الطاقة والصناعات الثقيلة' },
        links: [
          { label: { en: 'Oil & Gas', ar: 'البترول والغاز' }, href: '/industries/oil-gas' },
          { label: { en: 'Power & Utilities', ar: 'الطاقة والمرافق' }, href: '/industries/power-utilities' },
          { label: { en: 'Agriculture & Irrigation', ar: 'الزراعة والري' }, href: '/industries/agriculture-irrigation' },
          { label: { en: 'Aquaculture', ar: 'الاستزراع المائي' }, href: '/industries/aquaculture' },
        ],
      },
      {
        heading: { en: 'Buildings & public sector', ar: 'المباني والقطاع العام' },
        links: [
          { label: { en: 'Hospitality', ar: 'الضيافة' }, href: '/industries/hospitality' },
          { label: { en: 'Healthcare', ar: 'الرعاية الصحية' }, href: '/industries/healthcare' },
          { label: { en: 'Commercial Buildings', ar: 'المباني التجارية' }, href: '/industries/commercial-buildings' },
          { label: { en: 'Government & Municipal', ar: 'الحكومي والبلديات' }, href: '/industries/government-municipal' },
        ],
      },
    ],
  },
  {
    id: 'technologies',
    label: { en: 'Technologies', ar: 'التقنيات' },
    href: '/technologies',
    columns: [
      {
        heading: { en: 'Treat', ar: 'المعالجة' },
        links: [
          { label: { en: 'Water Treatment Chemicals', ar: 'كيماويات معالجة المياه' }, href: '/technologies/water-treatment-chemicals', icon: 'flask' },
          { label: { en: 'Filtration', ar: 'الترشيح' }, href: '/technologies/filtration', icon: 'filter' },
          { label: { en: 'RO & Membrane Treatment', ar: 'التناضح العكسي ومعالجة الأغشية' }, href: '/technologies/reverse-osmosis', icon: 'membrane' },
        ],
      },
      {
        heading: { en: 'Control', ar: 'التحكم' },
        links: [
          { label: { en: 'Chemical Dosing', ar: 'الجرعات الكيميائية' }, href: '/technologies/chemical-dosing', icon: 'pump' },
          { label: { en: 'Sensors & Measurement', ar: 'المستشعرات والقياس' }, href: '/technologies/sensors-measurement', icon: 'sensor' },
          { label: { en: 'Monitoring & Control', ar: 'المراقبة والتحكم' }, href: '/technologies/monitoring-control', icon: 'controller' },
          { label: { en: 'Automation & Remote Monitoring', ar: 'الأتمتة والمراقبة عن بُعد' }, href: '/technologies/automation-remote-monitoring', icon: 'network' },
        ],
      },
      {
        heading: { en: 'Understand', ar: 'الفهم' },
        links: [
          { label: { en: 'Water Analysis', ar: 'تحليل المياه' }, href: '/technologies/water-analysis', icon: 'lab' },
          { label: { en: 'Engineering & Integration', ar: 'الهندسة والتكامل' }, href: '/technologies/engineering-integration', icon: 'blueprint' },
          { label: { en: 'Technology Partners', ar: 'شركاء التقنية' }, href: '/partners' },
        ],
      },
    ],
    feature: {
      eyebrow: { en: 'Technology partners', ar: 'شركاء التقنية' },
      heading: { en: 'Global technology. Delivered by C-Water.', ar: 'تقنية عالمية. يقدّمها فريق C-Water.' },
      body: {
        en: 'Walchem instrumentation, TIMEX filtration and Kurita chemistry — integrated by C-Water engineering.',
        ar: 'أجهزة Walchem وترشيح TIMEX وكيمياء Kurita — يجمعها التصميم الهندسي لدى C-Water.',
      },
      cta: { en: 'Explore the partner ecosystem', ar: 'استكشف منظومة الشركاء' },
      href: '/partners',
    },
  },
  {
    id: 'products',
    label: { en: 'Products', ar: 'المنتجات' },
    href: '/products',
    columns: [
      {
        heading: { en: 'By technology', ar: 'حسب التقنية' },
        links: [
          { label: { en: 'Controllers', ar: 'وحدات التحكم' }, href: '/products?category=controllers' },
          { label: { en: 'Sensors', ar: 'المستشعرات' }, href: '/products?category=sensors' },
          { label: { en: 'Metering Pumps', ar: 'مضخات الجرعات' }, href: '/products?category=metering-pumps' },
          { label: { en: 'Filtration', ar: 'الترشيح' }, href: '/products?technology=filtration' },
          { label: { en: 'Chemicals', ar: 'الكيماويات' }, href: '/products?technology=water-treatment-chemicals' },
        ],
      },
      {
        heading: { en: 'By partner', ar: 'حسب الشريك' },
        links: [
          { label: { en: 'Walchem', ar: 'Walchem' }, href: '/products?partner=walchem' },
          { label: { en: 'TIMEX', ar: 'TIMEX' }, href: '/products?partner=timex' },
          { label: { en: 'Kurita', ar: 'Kurita' }, href: '/products?partner=kurita' },
        ],
      },
      {
        heading: { en: 'By application', ar: 'حسب التطبيق' },
        links: [
          { label: { en: 'Cooling Water', ar: 'مياه التبريد' }, href: '/products?solution=cooling-water' },
          { label: { en: 'Boiler & Steam', ar: 'الغلايات والبخار' }, href: '/products?solution=boiler-steam' },
          { label: { en: 'RO & Membranes', ar: 'التناضح العكسي والأغشية' }, href: '/products?solution=ro-membranes' },
          { label: { en: 'Wastewater', ar: 'مياه الصرف' }, href: '/products?solution=wastewater' },
        ],
      },
    ],
  },
  {
    id: 'services',
    label: { en: 'Services', ar: 'الخدمات' },
    href: '/services',
  },
  {
    id: 'projects',
    label: { en: 'Projects', ar: 'المشروعات' },
    href: '/projects',
  },
  {
    id: 'knowledge',
    label: { en: 'Knowledge', ar: 'المعرفة' },
    href: '/knowledge',
  },
  {
    id: 'about',
    label: { en: 'About', ar: 'عن الشركة' },
    href: '/about',
  },
];

export const footerNav: NavColumn[] = [
  {
    heading: { en: 'Solutions', ar: 'الحلول' },
    links: [
      { label: { en: 'Cooling Water', ar: 'مياه التبريد' }, href: '/solutions/cooling-water' },
      { label: { en: 'Boiler & Steam', ar: 'الغلايات والبخار' }, href: '/solutions/boiler-steam' },
      { label: { en: 'RO & Membranes', ar: 'التناضح العكسي والأغشية' }, href: '/solutions/ro-membranes' },
      { label: { en: 'Process Water', ar: 'مياه العمليات' }, href: '/solutions/process-water' },
      { label: { en: 'Wastewater', ar: 'مياه الصرف' }, href: '/solutions/wastewater' },
      { label: { en: 'Industrial Water', ar: 'المياه الصناعية' }, href: '/solutions/industrial-water' },
    ],
  },
  {
    heading: { en: 'Technologies', ar: 'التقنيات' },
    links: [
      { label: { en: 'Filtration', ar: 'الترشيح' }, href: '/technologies/filtration' },
      { label: { en: 'Treatment Chemicals', ar: 'كيماويات المعالجة' }, href: '/technologies/water-treatment-chemicals' },
      { label: { en: 'Chemical Dosing', ar: 'الجرعات الكيميائية' }, href: '/technologies/chemical-dosing' },
      { label: { en: 'Monitoring & Control', ar: 'المراقبة والتحكم' }, href: '/technologies/monitoring-control' },
      { label: { en: 'Water Analysis', ar: 'تحليل المياه' }, href: '/technologies/water-analysis' },
    ],
  },
  {
    heading: { en: 'Company', ar: 'الشركة' },
    links: [
      { label: { en: 'About C-Water', ar: 'عن C-Water' }, href: '/about' },
      { label: { en: 'Technology Partners', ar: 'شركاء التقنية' }, href: '/partners' },
      { label: { en: 'Services', ar: 'الخدمات' }, href: '/services' },
      { label: { en: 'Projects', ar: 'المشروعات' }, href: '/projects' },
      { label: { en: 'Knowledge Center', ar: 'مركز المعرفة' }, href: '/knowledge' },
    ],
  },
  {
    heading: { en: 'Get in touch', ar: 'تواصل معنا' },
    links: [
      { label: { en: 'Request a Solution', ar: 'اطلب حلاً' }, href: '/request-solution' },
      { label: { en: 'Request a Quote', ar: 'اطلب عرض سعر' }, href: '/request-quote' },
      { label: { en: 'Talk to an Engineer', ar: 'تحدث إلى مهندس' }, href: '/contact?intent=engineer' },
      { label: { en: 'Technical Support', ar: 'الدعم الفني' }, href: '/contact?intent=support' },
      { label: { en: 'Contact', ar: 'اتصل بنا' }, href: '/contact' },
    ],
  },
];

/**
 * The site-wide treatment chain. This sequence is the conceptual backbone
 * referenced by the hero, the system explorer, the technology hub and every
 * solution page, so it is declared once here.
 */
export const treatmentChain = [
  { id: 'source', label: { en: 'Source Water', ar: 'مياه المصدر' }, icon: 'droplet' as IconKey },
  { id: 'filtration', label: { en: 'Filtration', ar: 'الترشيح' }, icon: 'filter' as IconKey, partner: 'timex' as const },
  { id: 'chemical', label: { en: 'Chemical Treatment', ar: 'المعالجة الكيميائية' }, icon: 'flask' as IconKey, partner: 'kurita' as const },
  { id: 'dosing', label: { en: 'Dosing', ar: 'الجرعات' }, icon: 'pump' as IconKey, partner: 'walchem' as const },
  { id: 'sensing', label: { en: 'Sensing', ar: 'الاستشعار' }, icon: 'sensor' as IconKey, partner: 'walchem' as const },
  { id: 'control', label: { en: 'Control', ar: 'التحكم' }, icon: 'controller' as IconKey, partner: 'walchem' as const },
  { id: 'monitoring', label: { en: 'Monitoring', ar: 'المراقبة' }, icon: 'monitor' as IconKey },
  { id: 'optimization', label: { en: 'Optimization', ar: 'التحسين' }, icon: 'optimize' as IconKey },
] as const;

/** Diagnose → Design → Treat → Control → Monitor → Optimize. */
export const operatingModel = [
  {
    id: 'diagnose',
    label: { en: 'Diagnose', ar: 'التشخيص' },
    body: { en: 'Understand the water, the process and the operating conditions.', ar: 'فهم المياه والعملية وظروف التشغيل.' },
    icon: 'lab' as IconKey,
  },
  {
    id: 'design',
    label: { en: 'Design', ar: 'التصميم' },
    body: { en: 'Develop the treatment strategy around the actual system.', ar: 'وضع استراتيجية المعالجة حول النظام الفعلي.' },
    icon: 'blueprint' as IconKey,
  },
  {
    id: 'treat',
    label: { en: 'Treat', ar: 'المعالجة' },
    body: { en: 'Apply the right chemistry and treatment technologies.', ar: 'تطبيق الكيمياء وتقنيات المعالجة المناسبة.' },
    icon: 'flask' as IconKey,
  },
  {
    id: 'control',
    label: { en: 'Control', ar: 'التحكم' },
    body: { en: 'Measure, dose and control the parameters that matter.', ar: 'قياس وضخ والتحكم في المتغيرات المؤثرة.' },
    icon: 'controller' as IconKey,
  },
  {
    id: 'monitor',
    label: { en: 'Monitor', ar: 'المراقبة' },
    body: { en: 'Turn operating conditions into useful information.', ar: 'تحويل ظروف التشغيل إلى معلومات مفيدة.' },
    icon: 'monitor' as IconKey,
  },
  {
    id: 'optimize',
    label: { en: 'Optimize', ar: 'التحسين' },
    body: { en: 'Keep improving system performance over its operating life.', ar: 'الاستمرار في تحسين أداء النظام طوال عمره التشغيلي.' },
    icon: 'optimize' as IconKey,
  },
] as const;
