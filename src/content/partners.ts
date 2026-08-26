import type { Partner } from './types';

/**
 * Technology partners.
 *
 * Every capability area, product-category name and application listed here is
 * taken from the partner's own published material. Nothing describes
 * distribution rights, territory, exclusivity or commercial availability,
 * because none of that is verifiable from public sources — those claims are
 * left for C-Water to add after commercial review.
 *
 * Sources: walchem.com · timex.com.tr · kurita.eu
 */
export const partners: Partner[] = [
  /* ---------------------------------------------------------------------- */
  {
    slug: 'walchem',
    status: 'published',
    legalName: 'Walchem',
    website: 'https://www.walchem.com',
    title: { en: 'Walchem', ar: 'Walchem' },
    motto: { en: 'Sense. Dose. Control. Connect.', ar: 'استشعار. جرعة. تحكم. اتصال.' },
    headline: {
      en: 'Intelligent Monitoring. Precise Chemical Control.',
      ar: 'مراقبة ذكية. تحكم دقيق في الجرعات الكيميائية.',
    },
    summary: {
      en: 'Instrumentation, dosing and connected control technologies that make water treatment measurable.',
      ar: 'أجهزة قياس وجرعات وتحكم متصل تجعل معالجة المياه قابلة للقياس.',
    },
    capability: { en: 'Sensing · Dosing · Control · Monitoring', ar: 'الاستشعار · الجرعات · التحكم · المراقبة' },
    origin: { en: 'United States', ar: 'الولايات المتحدة' },
    metaTitle: {
      en: 'Walchem Controllers, Sensors & Metering Pumps | C-Water',
      ar: 'وحدات تحكم ومستشعرات ومضخات جرعات Walchem | C-Water',
    },
    metaDescription: {
      en: 'Walchem instrumentation in C-Water treatment programmes: controllers, pH/ORP and conductivity sensors, metering pumps and the Fluent monitoring platform.',
      ar: 'أجهزة Walchem ضمن برامج المعالجة لدى C-Water: وحدات تحكم في معالجة المياه، ومستشعرات pH وORP والتوصيلية، ومضخات جرعات، ومنصة Walchem Fluent للمراقبة.',
    },
    capabilityAreas: [
      {
        id: 'controllers',
        icon: 'controller',
        label: { en: 'Water treatment controllers', ar: 'وحدات التحكم في معالجة المياه' },
        body: {
          en: 'Online analytical controllers that read process conditions, act on setpoints and log what happened. The Intuition and W100 families cover cooling tower, boiler and general water-treatment duties.',
          ar: 'وحدات تحكم تحليلية متصلة تقرأ ظروف العملية وتتصرف وفق نقاط الضبط وتسجّل ما حدث. تغطي عائلتا Intuition وW100 تطبيقات أبراج التبريد والغلايات ومعالجة المياه العامة.',
        },
      },
      {
        id: 'sensors',
        icon: 'sensor',
        label: { en: 'Sensors and measurement', ar: 'المستشعرات والقياس' },
        body: {
          en: 'pH and ORP electrodes, contacting and electrodeless conductivity, disinfection sensors, turbidity, dissolved oxygen, corrosion rate and fluorometric measurement.',
          ar: 'أقطاب pH وORP، وقياس التوصيلية بالتلامس وبدون تلامس، ومستشعرات التطهير، والعكارة، والأكسجين الذائب، ومعدل التآكل، والقياس الفلوري.',
        },
      },
      {
        id: 'pumps',
        icon: 'pump',
        label: { en: 'Electronic metering pumps', ar: 'مضخات الجرعات الإلكترونية' },
        body: {
          en: 'Solenoid and motor-driven metering pumps across the IX, E-Series and LK families, including high-viscosity duties, sized to the chemical programme rather than to a standard catalogue line.',
          ar: 'مضخات جرعات سولينويد ومُدارة بمحرك ضمن عائلات IX وE-Series وLK، بما في ذلك السوائل عالية اللزوجة، تُختار وفق برنامج المعالجة لا وفق بند كتالوج قياسي.',
        },
      },
      {
        id: 'connectivity',
        icon: 'network',
        label: { en: 'Connected water management', ar: 'إدارة المياه المتصلة' },
        body: {
          en: 'Walchem Fluent is a cloud platform for remote visibility of controller data — trends, alarms and treatment status made available away from the plant room.',
          ar: 'Walchem Fluent منصة سحابية تتيح رؤية بيانات وحدات التحكم عن بُعد — الاتجاهات والإنذارات وحالة المعالجة، متاحة خارج غرفة المعدات.',
        },
      },
    ],
    categories: [
      { en: 'Controllers', ar: 'وحدات التحكم' },
      { en: 'Sensors & Electrodes', ar: 'المستشعرات والأقطاب' },
      { en: 'Metering Pumps', ar: 'مضخات الجرعات' },
      { en: 'Controller & Pump Accessories', ar: 'ملحقات وحدات التحكم والمضخات' },
      { en: 'Remote Monitoring Software', ar: 'برمجيات المراقبة عن بُعد' },
    ],
    flow: [
      { id: 'sensor', label: { en: 'Sensor', ar: 'المستشعر' }, caption: { en: 'Reads the water', ar: 'يقرأ حالة المياه' }, icon: 'sensor' },
      { id: 'controller', label: { en: 'Controller', ar: 'وحدة التحكم' }, caption: { en: 'Compares to setpoint', ar: 'يقارن بنقطة الضبط' }, icon: 'controller' },
      { id: 'decision', label: { en: 'Decision', ar: 'القرار' }, caption: { en: 'Calls for dose or alarm', ar: 'يطلب جرعة أو ينذر' }, icon: 'gauge' },
      { id: 'pump', label: { en: 'Pump', ar: 'المضخة' }, caption: { en: 'Delivers the chemical', ar: 'تضخ الكيماوي' }, icon: 'pump' },
      { id: 'water', label: { en: 'Water', ar: 'المياه' }, caption: { en: 'Condition changes', ar: 'تتغير الحالة' }, icon: 'droplet' },
      { id: 'data', label: { en: 'Data', ar: 'البيانات' }, caption: { en: 'Logged and visible', ar: 'تُسجَّل وتُعرض' }, icon: 'monitor' },
    ],
    cwaterRole: {
      en: 'C-Water specifies the measurement points, sets the control strategy against the actual treatment programme, commissions the loop and supports it in service. The instrument is the tool; the control philosophy is the engineering.',
      ar: 'تحدد C-Water نقاط القياس، وتضع استراتيجية التحكم وفق برنامج المعالجة الفعلي، وتتولى التشغيل الابتدائي للحلقة ودعمها أثناء الخدمة. الجهاز هو الأداة، أما فلسفة التحكم فهي العمل الهندسي.',
    },
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: 'timex',
    status: 'published',
    legalName: 'TIMEX',
    website: 'https://timex.com.tr',
    title: { en: 'TIMEX', ar: 'TIMEX' },
    motto: { en: 'Filter. Protect. Perform.', ar: 'ترشيح. حماية. أداء.' },
    headline: { en: 'Filtration Engineered for the Process.', ar: 'ترشيح مُهندَس وفق العملية الإنتاجية.' },
    summary: {
      en: 'A broad industrial filtration portfolio spanning self-cleaning, cartridge, disc, drum and flotation technologies.',
      ar: 'محفظة ترشيح صناعي واسعة تشمل التنظيف الذاتي والخراطيش والأقراص والأسطوانات والتعويم.',
    },
    capability: { en: 'Industrial Filtration', ar: 'الترشيح الصناعي' },
    origin: { en: 'Türkiye', ar: 'تركيا' },
    metaTitle: {
      en: 'TIMEX Industrial Filtration Technologies | C-Water',
      ar: 'ترشيح TIMEX الصناعي — تنظيف ذاتي وأقراص وخراطيش | C-Water',
    },
    metaDescription: {
      en: 'TIMEX filtration through C-Water engineering: self-cleaning filters, separators, disc and drum filters, dissolved air flotation and cartridge filtration.',
      ar: 'تقنيات ترشيح TIMEX من خلال هندسة C-Water: مرشحات ذاتية التنظيف، وفواصل، ومرشحات أقراص وأسطوانات، وتعويم بالهواء المذاب، وترشيح بالخراطيش لأنظمة المياه الصناعية.',
    },
    capabilityAreas: [
      {
        id: 'self-cleaning',
        icon: 'filter',
        label: { en: 'Self-cleaning filtration', ar: 'الترشيح ذاتي التنظيف' },
        body: {
          en: 'Automatic screen filters that clear the element without interrupting flow — the KMF, MAP, SVF and SHF series, plus the Sinus Flow and modular HydroSpin designs.',
          ar: 'مرشحات شبكية أوتوماتيكية تنظّف العنصر دون قطع التدفق — سلاسل KMF وMAP وSVF وSHF، إضافة إلى تصميمي Sinus Flow وHydroSpin النمطي.',
        },
      },
      {
        id: 'separation',
        icon: 'flow',
        label: { en: 'Separation and pre-screening', ar: 'الفصل والغربلة الأولية' },
        body: {
          en: 'Hydrocyclone separator filters (TMN–TMF), air and dirt separators, intake screens, rotostrainers, mechanical bar screens and manual strainers for coarse load removal.',
          ar: 'مرشحات فصل هيدروسيكلونية (TMN–TMF)، وفواصل الهواء والأتربة، وشاشات السحب، ومصافي دوارة، وشاشات قضبان ميكانيكية، ومصافي يدوية لإزالة الأحمال الخشنة.',
        },
      },
      {
        id: 'fine',
        icon: 'membrane',
        label: { en: 'Fine and polishing filtration', ar: 'الترشيح الدقيق والنهائي' },
        body: {
          en: 'Cartridge, bag, disc, drum and leaf filters for the finer end of the duty — typically protecting membranes, nozzles, heat exchangers and instrumentation.',
          ar: 'مرشحات خراطيش وأكياس وأقراص وأسطوانات وألواح للأحمال الدقيقة — عادةً لحماية الأغشية والفوهات والمبادلات الحرارية وأجهزة القياس.',
        },
      },
      {
        id: 'systems',
        icon: 'network',
        label: { en: 'Engineered systems', ar: 'أنظمة مُهندَسة' },
        body: {
          en: 'Dissolved air flotation, CTSS, oil skimmers and packaged treatment systems for produced water, injection water, cooling tower side-stream, irrigation networks and wastewater recovery.',
          ar: 'تعويم بالهواء المذاب، وأنظمة CTSS، وكاشطات الزيوت، وأنظمة معالجة مجمّعة لمياه الإنتاج ومياه الحقن والتيار الجانبي لأبراج التبريد وشبكات الري واستعادة مياه الصرف.',
        },
      },
    ],
    categories: [
      { en: 'Self-Cleaning Filters', ar: 'مرشحات ذاتية التنظيف' },
      { en: 'Cartridge & Bag Filters', ar: 'مرشحات الخراطيش والأكياس' },
      { en: 'Disc & Drum Filters', ar: 'مرشحات الأقراص والأسطوانات' },
      { en: 'Separator Filters', ar: 'مرشحات الفصل' },
      { en: 'Dissolved Air Flotation', ar: 'التعويم بالهواء المذاب' },
      { en: 'Screens & Strainers', ar: 'الشاشات والمصافي' },
      { en: 'Water Treatment Systems', ar: 'أنظمة معالجة المياه' },
    ],
    flow: [
      { id: 'load', label: { en: 'Raw load', ar: 'الحمل الخام' }, caption: { en: 'Solids enter', ar: 'دخول المواد الصلبة' }, icon: 'droplet' },
      { id: 'screen', label: { en: 'Screen', ar: 'الشاشة' }, caption: { en: 'Retains particles', ar: 'تحتجز الجسيمات' }, icon: 'filter' },
      { id: 'clean', label: { en: 'Self-clean', ar: 'التنظيف الذاتي' }, caption: { en: 'Element clears on ΔP', ar: 'ينظف العنصر عند فرق الضغط' }, icon: 'recycle' },
      { id: 'protect', label: { en: 'Protected', ar: 'محمي' }, caption: { en: 'Downstream stays clean', ar: 'يبقى ما بعده نظيفًا' }, icon: 'shield' },
    ],
    cwaterRole: {
      en: 'C-Water sizes the filter to measured solids load, flow and operating pressure — not to nominal pipe size. Selecting the wrong filtration degree is one of the most common and most expensive errors in industrial water systems.',
      ar: 'تختار C-Water المرشح وفق حمل المواد الصلبة والتدفق وضغط التشغيل المقاسة — لا وفق قطر الخط الاسمي. واختيار درجة الترشيح الخاطئة من أكثر الأخطاء شيوعًا وتكلفة في أنظمة المياه الصناعية.',
    },
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: 'kurita',
    status: 'published',
    legalName: 'Kurita Europe',
    website: 'https://www.kurita.eu/en/',
    title: { en: 'Kurita Europe', ar: 'Kurita Europe' },
    motto: { en: 'Treat. Protect. Optimize.', ar: 'معالجة. حماية. تحسين.' },
    headline: {
      en: 'Advanced Water Chemistry. Engineered for Performance.',
      ar: 'كيمياء مياه متقدمة. مُهندَسة من أجل الأداء.',
    },
    summary: {
      en: 'Application-led water and process treatment chemistry, with a strong emphasis on measurable system optimisation.',
      ar: 'كيمياء معالجة مياه وعمليات قائمة على التطبيق، مع تركيز واضح على تحسين الأداء القابل للقياس.',
    },
    capability: { en: 'Water Chemistry · Treatment Optimisation', ar: 'كيمياء المياه · تحسين المعالجة' },
    origin: { en: 'Europe / Japan', ar: 'أوروبا / اليابان' },
    metaTitle: {
      en: 'Kurita Water Treatment Chemistry | C-Water',
      ar: 'كيمياء معالجة المياه من Kurita — تبريد وغلايات وأغشية | C-Water',
    },
    metaDescription: {
      en: 'Kurita treatment chemistry applied through C-Water engineering across cooling water, boiler and steam, membrane systems, process water and wastewater.',
      ar: 'كيمياء المعالجة من Kurita عبر هندسة C-Water في مياه التبريد والغلايات والبخار وأنظمة الأغشية ومياه العمليات ومياه الصرف.',
    },
    capabilityAreas: [
      {
        id: 'cooling',
        icon: 'tower',
        label: { en: 'Cooling water treatment', ar: 'معالجة مياه التبريد' },
        body: {
          en: 'Scale, corrosion and biofouling control programmes for open recirculating and closed cooling systems. The Dilurit® BC S-System applies monochloramine chemistry to microbiological control.',
          ar: 'برامج للتحكم في الترسبات والتآكل والنمو البيولوجي لأنظمة التبريد المفتوحة والمغلقة. ويطبّق نظام Dilurit® BC S-System كيمياء المونوكلورامين للتحكم الميكروبيولوجي.',
        },
      },
      {
        id: 'boiler',
        icon: 'boiler',
        label: { en: 'Boiler and steam treatment', ar: 'معالجة الغلايات والبخار' },
        body: {
          en: 'Feedwater, boiler, steam and condensate protection. Cetamine® film-forming chemistry is positioned around reduced conductivity and blowdown demand.',
          ar: 'حماية مياه التغذية والغلاية والبخار والمتكثفات. وتُوجَّه كيمياء Cetamine® المكوِّنة للأغشية نحو خفض التوصيلية ومعدل التصريف.',
        },
      },
      {
        id: 'membrane',
        icon: 'membrane',
        label: { en: 'Membrane treatment', ar: 'معالجة الأغشية' },
        body: {
          en: 'Antiscalant, dispersant and cleaning chemistry for RO and related membrane processes. Kuriverter® IK-110 addresses biofouling in desalination duty.',
          ar: 'كيمياء مانعة للترسب ومشتتة ومنظفة لأنظمة التناضح العكسي وما يرتبط بها. ويعالج Kuriverter® IK-110 النمو البيولوجي في تطبيقات التحلية.',
        },
      },
      {
        id: 'process',
        icon: 'factory',
        label: { en: 'Process and wastewater', ar: 'مياه العمليات والصرف' },
        body: {
          en: 'Process water and effluent treatment programmes. S.sensing® CS links wastewater treatment chemistry to continuous measurement so dosing follows actual load.',
          ar: 'برامج معالجة مياه العمليات والمخلفات السائلة. ويربط S.sensing® CS كيمياء معالجة مياه الصرف بالقياس المستمر بحيث تتبع الجرعة الحمل الفعلي.',
        },
      },
    ],
    categories: [
      { en: 'Cooling Water Programmes', ar: 'برامج مياه التبريد' },
      { en: 'Boiler & Steam Programmes', ar: 'برامج الغلايات والبخار' },
      { en: 'Membrane Chemicals', ar: 'كيماويات الأغشية' },
      { en: 'Process Water Treatment', ar: 'معالجة مياه العمليات' },
      { en: 'Wastewater Treatment', ar: 'معالجة مياه الصرف' },
      { en: 'Cleaning & Passivation', ar: 'التنظيف والتخميل' },
    ],
    flow: [
      { id: 'analyse', label: { en: 'Analyse', ar: 'التحليل' }, caption: { en: 'Water and system data', ar: 'بيانات المياه والنظام' }, icon: 'lab' },
      { id: 'program', label: { en: 'Programme', ar: 'البرنامج' }, caption: { en: 'Chemistry selected', ar: 'اختيار الكيمياء' }, icon: 'flask' },
      { id: 'apply', label: { en: 'Apply', ar: 'التطبيق' }, caption: { en: 'Controlled dosing', ar: 'جرعات محكومة' }, icon: 'pump' },
      { id: 'verify', label: { en: 'Verify', ar: 'التحقق' }, caption: { en: 'Measured response', ar: 'استجابة مقاسة' }, icon: 'gauge' },
      { id: 'optimise', label: { en: 'Optimise', ar: 'التحسين' }, caption: { en: 'Programme adjusted', ar: 'تعديل البرنامج' }, icon: 'optimize' },
    ],
    cwaterRole: {
      en: 'Chemistry only performs against the system it was chosen for. C-Water carries out the water analysis, matches the programme to the metallurgy, cycles and duty on site, and keeps verifying the result once the programme is running.',
      ar: 'لا تؤدي الكيمياء دورها إلا مع النظام الذي اختيرت من أجله. تُجري C-Water تحليل المياه، وتوائم البرنامج مع المعادن المستخدمة ودورات التركيز وظروف التشغيل في الموقع، وتواصل التحقق من النتيجة بعد بدء التشغيل.',
    },
  },
];

export const partnerBySlug = Object.fromEntries(partners.map((p) => [p.slug, p])) as Record<
  Partner['slug'],
  Partner
>;
