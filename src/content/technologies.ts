import type { Technology } from './types';

/**
 * Technology pages.
 *
 * `chainPosition` places each technology on the site-wide treatment chain
 * (source → filtration → chemistry → dosing → sensing → control → monitoring
 * → optimisation), which is what lets the technology hub render as a
 * connected system rather than a list of tiles.
 */
export const technologies: Technology[] = [
  /* ====================================================================== */
  {
    slug: 'water-treatment-chemicals',
    status: 'published',
    chainPosition: 2,
    partner: 'kurita',
    title: { en: 'Water Treatment Chemicals', ar: 'كيماويات معالجة المياه' },
    headline: { en: 'Chemistry Designed for the System.', ar: 'كيمياء مصممة وفق النظام.' },
    summary: {
      en: 'Treatment programmes matched to the metallurgy, water chemistry and duty of the system they protect.',
      ar: 'برامج معالجة تُوائم معادن النظام وكيمياء المياه وظروف التشغيل التي تحميها.',
    },
    metaTitle: { en: 'Water Treatment Chemicals & Programmes | C-Water', ar: 'كيماويات وبرامج معالجة المياه | C-Water' },
    metaDescription: {
      en: 'Cooling, boiler, membrane and wastewater treatment chemistry engineered around measured water analysis, system metallurgy and operating conditions.',
      ar: 'كيمياء معالجة لمياه التبريد والغلايات والأغشية والصرف، مُهندَسة وفق تحليل مياه مقاس ومعادن النظام وظروف التشغيل.',
    },
    intro: {
      en: 'A treatment chemical is not a product decision. It is the output of knowing what is in the water, what the system is made of, how hard it is being worked and what has to be protected.',
      ar: 'اختيار الكيماوي ليس قرار شراء منتج، بل نتيجة معرفة ما تحتويه المياه، ومم صُنع النظام، وكيف يُشغَّل، وما الذي يجب حمايته.',
    },
    whatItSolves: {
      en: 'Chemical treatment addresses the reactions a water system cannot avoid: minerals coming out of solution as scale, metal surfaces losing material to corrosion, and biological populations establishing themselves wherever water is warm, nutrient-rich and slow-moving.',
      ar: 'تعالج الكيمياء التفاعلات التي لا يمكن لأي نظام مياه تجنبها: ترسّب المعادن من المحلول، وفقد الأسطح المعدنية لمادتها بالتآكل، ونمو التجمعات البيولوجية حيثما كانت المياه دافئة وغنية بالمغذيات وبطيئة الحركة.',
    },
    howItWorks: [
      {
        id: 'scale',
        icon: 'scale',
        label: { en: 'Scale control', ar: 'التحكم في الترسبات' },
        body: {
          en: 'Threshold inhibitors interfere with crystal growth so that sparingly soluble salts stay dispersed above their normal saturation point. Dispersants keep the resulting particles mobile so they leave with the blowdown instead of settling on the hottest surface.',
          ar: 'تتداخل المثبطات الحدّية مع نمو البلورات لتبقى الأملاح ضعيفة الذوبان منتشرة فوق نقطة تشبعها المعتادة. وتُبقي المشتتات الجسيمات الناتجة متحركة لتخرج مع التصريف بدل أن تستقر على أسخن سطح.',
        },
      },
      {
        id: 'corrosion',
        icon: 'shield',
        label: { en: 'Corrosion control', ar: 'التحكم في التآكل' },
        body: {
          en: 'Inhibitors form a thin protective layer at the metal surface — anodic, cathodic or film-forming depending on chemistry and metallurgy. The layer has to be established and then maintained; interrupted dosing can leave a system less protected than no programme at all.',
          ar: 'تكوّن المثبطات طبقة حماية رقيقة على سطح المعدن — أنودية أو كاثودية أو مكوِّنة لغشاء بحسب الكيمياء والمعادن. ويجب تكوين الطبقة ثم الحفاظ عليها؛ فتوقف الجرعات قد يترك النظام أقل حماية مما لو لم يكن هناك برنامج أصلًا.',
        },
      },
      {
        id: 'micro',
        icon: 'biology',
        label: { en: 'Microbiological control', ar: 'التحكم الميكروبيولوجي' },
        body: {
          en: 'Oxidising and non-oxidising biocides limit planktonic and sessile populations. Biofilm matters more than free-floating count: an established film insulates heat-transfer surfaces and shelters the organisms underneath it from the biocide.',
          ar: 'تحدّ المبيدات الحيوية المؤكسدة وغير المؤكسدة من التجمعات العالقة والملتصقة. والغشاء الحيوي أهم من العدّ الطليق: فالغشاء المستقر يعزل أسطح التبادل الحراري ويحمي الكائنات أسفله من المبيد.',
        },
      },
      {
        id: 'programme',
        icon: 'clipboard',
        label: { en: 'Programme design', ar: 'تصميم البرنامج' },
        body: {
          en: 'The individual chemistries have to work together. An inhibitor that performs at one pH may be ineffective at another; an oxidising biocide can degrade an organic inhibitor. Programme design is where those interactions are resolved.',
          ar: 'يجب أن تعمل الكيمياويات المفردة معًا. فالمثبط الفعّال عند درجة حموضة معينة قد يكون بلا أثر عند غيرها، وقد يُفكك المبيد المؤكسد مثبطًا عضويًا. وهنا يأتي دور تصميم البرنامج لحل هذه التداخلات.',
        },
      },
    ],
    applications: [
      { en: 'Open recirculating cooling systems', ar: 'أنظمة التبريد المفتوحة ذات الدوران' },
      { en: 'Closed loop heating and chilled water', ar: 'دوائر التسخين والتبريد المغلقة' },
      { en: 'Steam boilers and condensate return', ar: 'غلايات البخار وعودة المتكثفات' },
      { en: 'RO and membrane pretreatment', ar: 'المعالجة الأولية للتناضح العكسي والأغشية' },
      { en: 'Process and effluent treatment', ar: 'معالجة مياه العمليات والمخلفات السائلة' },
    ],
    solutions: ['cooling-water', 'boiler-steam', 'ro-membranes', 'process-water', 'wastewater'],
    products: ['kurita-cooling-programme', 'kurita-cetamine', 'kurita-dilurit-bc', 'kurita-kuriverter-ik110'],
    services: ['water-analysis', 'chemical-treatment-programmes', 'optimization'],
    articles: ['what-causes-scale-in-cooling-towers', 'how-corrosion-develops', 'water-analysis-before-treatment'],
    cta: { en: 'Request a Technical Assessment', ar: 'اطلب تقييمًا فنيًا' },
  },

  /* ====================================================================== */
  {
    slug: 'filtration',
    status: 'published',
    chainPosition: 1,
    partner: 'timex',
    title: { en: 'Filtration', ar: 'الترشيح' },
    headline: { en: 'Filtration Engineered Around the Application.', ar: 'ترشيح مُهندَس حول التطبيق.' },
    summary: {
      en: 'Removing what should not be there, at the degree the downstream equipment actually requires.',
      ar: 'إزالة ما لا ينبغي وجوده، بالدرجة التي تحتاجها فعلًا المعدات اللاحقة.',
    },
    metaTitle: { en: 'Industrial Water Filtration Solutions | C-Water', ar: 'حلول ترشيح المياه الصناعية | C-Water' },
    metaDescription: {
      en: 'Self-cleaning, cartridge, disc, drum and separator filtration selected against measured solids load, flow and operating pressure for industrial water systems.',
      ar: 'ترشيح ذاتي التنظيف وبالخراطيش والأقراص والأسطوانات والفواصل، يُختار وفق حمل مواد صلبة وتدفق وضغط تشغيل مقاسة لأنظمة المياه الصناعية.',
    },
    intro: {
      en: 'Filtration is rarely the point of a water system, but it decides how well the rest of it works. Every heat exchanger, nozzle, membrane and instrument downstream is protected — or not — by the decision made here.',
      ar: 'نادرًا ما يكون الترشيح غاية نظام المياه، لكنه يحدد مدى جودة عمل بقيته. فكل مبادل حراري وفوهة وغشاء وجهاز قياس بعده محمي — أو غير محمي — بحسب القرار المتخذ هنا.',
    },
    whatItSolves: {
      en: 'Suspended solids do three things: they foul heat-transfer surfaces, they shelter microbiological growth, and they consume treatment chemical that should have been protecting metal. Removing them at the right degree reduces all three loads at once.',
      ar: 'تفعل المواد الصلبة العالقة ثلاثة أشياء: تُلوّث أسطح التبادل الحراري، وتُوفر ملاذًا للنمو البيولوجي، وتستهلك كيماويات المعالجة التي كان يجب أن تحمي المعدن. وإزالتها بالدرجة الصحيحة تقلل هذه الأحمال الثلاثة معًا.',
    },
    howItWorks: [
      {
        id: 'degree',
        icon: 'filter',
        label: { en: 'Filtration degree', ar: 'درجة الترشيح' },
        body: {
          en: 'The retained particle size is set by what has to be protected, not by what is convenient. Over-filtering raises differential pressure, cleaning frequency and energy cost; under-filtering passes the problem downstream.',
          ar: 'يُحدَّد حجم الجسيمات المحتجزة بما يجب حمايته، لا بما هو أسهل. فالمبالغة في الترشيح ترفع فرق الضغط وتكرار التنظيف وتكلفة الطاقة، والتقصير فيه يمرر المشكلة إلى ما بعده.',
        },
      },
      {
        id: 'self-clean',
        icon: 'recycle',
        label: { en: 'Self-cleaning cycles', ar: 'دورات التنظيف الذاتي' },
        body: {
          en: 'Automatic filters clear the element on differential pressure, elapsed time or manual command, usually without interrupting the main flow. Cleaning frequency is a direct readout of the actual solids load.',
          ar: 'تنظّف المرشحات الأوتوماتيكية العنصر عند فرق الضغط أو انقضاء الزمن أو بأمر يدوي، وغالبًا دون قطع التدفق الرئيسي. وتكرار التنظيف مؤشر مباشر على حمل المواد الصلبة الفعلي.',
        },
      },
      {
        id: 'placement',
        icon: 'network',
        label: { en: 'Where it sits', ar: 'موضعه في النظام' },
        body: {
          en: 'Full-flow filtration treats everything passing a point. Side-stream filtration treats a fraction of a recirculating volume continuously, which is often the more economical answer for a cooling tower basin.',
          ar: 'يعالج الترشيح الكلي كل ما يمر بنقطة معينة، بينما يعالج الترشيح الجانبي جزءًا من الحجم الدائر بشكل مستمر، وهو غالبًا الحل الأجدى اقتصاديًا لحوض برج التبريد.',
        },
      },
      {
        id: 'load',
        icon: 'gauge',
        label: { en: 'Solids load, not pipe size', ar: 'حمل المواد الصلبة لا قطر الخط' },
        body: {
          en: 'Sizing follows the mass of solids arriving per hour and the nature of those solids — sand behaves differently from biological floc or corrosion product. Pipe diameter tells you almost nothing about that.',
          ar: 'يعتمد التحجيم على كتلة المواد الصلبة الواصلة في الساعة وطبيعتها — فالرمل يختلف سلوكه عن الندف البيولوجية أو نواتج التآكل. أما قطر الخط فلا يخبرك بذلك تقريبًا.',
        },
      },
    ],
    applications: [
      { en: 'Cooling tower side-stream filtration', ar: 'الترشيح الجانبي لأبراج التبريد' },
      { en: 'RO and membrane pretreatment', ar: 'المعالجة الأولية للتناضح العكسي والأغشية' },
      { en: 'Process water polishing', ar: 'التنقية النهائية لمياه العمليات' },
      { en: 'Irrigation network protection', ar: 'حماية شبكات الري' },
      { en: 'Produced and injection water', ar: 'مياه الإنتاج والحقن' },
      { en: 'Wastewater and recovery duty', ar: 'مياه الصرف والاستعادة' },
    ],
    solutions: ['cooling-water', 'ro-membranes', 'process-water', 'wastewater', 'industrial-water'],
    products: ['timex-kmf-series', 'timex-svf-series', 'timex-hydrospin', 'timex-disc-filter', 'timex-cartridge-filter', 'timex-daf'],
    services: ['system-assessment', 'engineering-design', 'preventive-maintenance'],
    articles: ['when-self-cleaning-filter', 'filtration-protects-downstream', 'ro-pretreatment-failure'],
    cta: { en: 'Talk to a Filtration Engineer', ar: 'تحدث إلى مهندس ترشيح' },
  },

  /* ====================================================================== */
  {
    slug: 'chemical-dosing',
    status: 'published',
    chainPosition: 3,
    partner: 'walchem',
    title: { en: 'Chemical Dosing', ar: 'الجرعات الكيميائية' },
    headline: { en: 'Precise Chemical Delivery Starts With Control.', ar: 'الضخ الكيميائي الدقيق يبدأ من التحكم.' },
    summary: {
      en: 'Getting the right amount of chemical to the right point, at the moment the system actually needs it.',
      ar: 'إيصال الكمية الصحيحة من الكيماوي إلى النقطة الصحيحة، في اللحظة التي يحتاجها النظام فعلًا.',
    },
    metaTitle: { en: 'Chemical Dosing Systems & Metering Pumps | C-Water', ar: 'أنظمة الجرعات الكيميائية ومضخات القياس | C-Water' },
    metaDescription: {
      en: 'Engineered chemical dosing: metering pump selection, injection point design, feedback control and verification for industrial water treatment programmes.',
      ar: 'جرعات كيميائية مُهندَسة: اختيار مضخة القياس، وتصميم نقطة الحقن، والتحكم بالتغذية الراجعة، والتحقق لبرامج معالجة المياه الصناعية.',
    },
    intro: {
      en: 'A correctly chosen chemical dosed incorrectly is a correctly chosen chemical that does not work. Dosing is where treatment design either survives contact with the plant or does not.',
      ar: 'الكيماوي المختار بشكل صحيح والمضخوخ بشكل خاطئ هو كيماوي لا يعمل. والجرعات هي الموضع الذي ينجو فيه تصميم المعالجة عند احتكاكه بالواقع التشغيلي — أو لا ينجو.',
    },
    whatItSolves: {
      en: 'Manual and timer-based dosing assumes the system is always in the same condition. It is not. Load changes, make-up water changes, seasons change. Dosing tied to a measured parameter follows the system instead of guessing at it.',
      ar: 'تفترض الجرعات اليدوية أو المعتمدة على المؤقت أن النظام في الحالة نفسها دائمًا، وهذا غير صحيح. فالحمل يتغير، ومياه التعويض تتغير، والفصول تتغير. أما الجرعات المرتبطة بمتغير مقاس فتتبع النظام بدلًا من تخمينه.',
    },
    howItWorks: [
      {
        id: 'storage',
        icon: 'flask',
        label: { en: 'Storage and containment', ar: 'التخزين والاحتواء' },
        body: {
          en: 'Chemical compatibility, bunding, level indication and safe access. Low-level detection prevents the most common silent failure: a pump that has been running dry for a week.',
          ar: 'توافق الكيماويات، وأحواض الاحتواء، وبيان المستوى، والوصول الآمن. ويمنع الكشف عن المستوى المنخفض أكثر الأعطال الصامتة شيوعًا: مضخة تعمل جافة منذ أسبوع.',
        },
      },
      {
        id: 'pump',
        icon: 'pump',
        label: { en: 'Metering pump selection', ar: 'اختيار مضخة القياس' },
        body: {
          en: 'Sized to the turndown the programme needs, not just to peak dose. Viscosity, back pressure, degassing behaviour and duty cycle all narrow the choice before capacity does.',
          ar: 'تُختار وفق نطاق التعديل الذي يحتاجه البرنامج، لا وفق الجرعة القصوى فقط. فاللزوجة والضغط المعاكس وسلوك تحرر الغازات ودورة التشغيل كلها تضيّق الخيار قبل السعة.',
        },
      },
      {
        id: 'injection',
        icon: 'flow',
        label: { en: 'Injection point design', ar: 'تصميم نقطة الحقن' },
        body: {
          en: 'The chemical has to reach a turbulent, well-mixed part of the system, away from surfaces it could attack in concentrated form, and far enough upstream of the measurement point to represent a real reading.',
          ar: 'يجب أن يصل الكيماوي إلى جزء مضطرب جيد الخلط من النظام، بعيدًا عن الأسطح التي قد يهاجمها وهو مركّز، وقبل نقطة القياس بمسافة كافية لتعطي قراءة معبّرة.',
        },
      },
      {
        id: 'feedback',
        icon: 'controller',
        label: { en: 'Feedback and verification', ar: 'التغذية الراجعة والتحقق' },
        body: {
          en: 'Dosing driven by conductivity, ORP, pH, flow or make-up volume closes the loop. A separate check — residual test, inhibitor level, corrosion coupon — confirms the loop is telling the truth.',
          ar: 'تغلق الجرعات المدفوعة بالتوصيلية أو ORP أو pH أو التدفق أو حجم التعويض الحلقة. ويؤكد فحص مستقل — اختبار المتبقي أو مستوى المثبط أو شرائح التآكل — أن الحلقة تعطي قراءة صادقة.',
        },
      },
    ],
    applications: [
      { en: 'Cooling tower inhibitor and biocide feed', ar: 'ضخ المثبطات والمبيدات لأبراج التبريد' },
      { en: 'Boiler feedwater and condensate treatment', ar: 'معالجة مياه تغذية الغلايات والمتكثفات' },
      { en: 'RO antiscalant injection', ar: 'حقن مانع الترسب للتناضح العكسي' },
      { en: 'pH correction and neutralisation', ar: 'تصحيح الحموضة والتعادل' },
      { en: 'Coagulant and polymer dosing', ar: 'ضخ المروّبات والبوليمرات' },
    ],
    solutions: ['cooling-water', 'boiler-steam', 'ro-membranes', 'wastewater'],
    products: ['walchem-ix-series', 'walchem-e-series', 'walchem-lk-series', 'walchem-intuition-9'],
    services: ['installation-commissioning', 'chemical-treatment-programmes', 'preventive-maintenance'],
    articles: ['how-automated-dosing-works', 'role-of-orp', 'how-ph-affects-treatment'],
    cta: { en: 'Explore Dosing Technology', ar: 'استكشف تقنيات الجرعات' },
  },

  /* ====================================================================== */
  {
    slug: 'sensors-measurement',
    status: 'published',
    chainPosition: 4,
    partner: 'walchem',
    title: { en: 'Sensors & Measurement', ar: 'المستشعرات والقياس' },
    headline: { en: 'You Cannot Control What You Do Not Measure.', ar: 'لا يمكنك التحكم فيما لا تقيسه.' },
    summary: {
      en: 'The parameters that reveal what a water system is doing, and what it takes to measure them reliably.',
      ar: 'المتغيرات التي تكشف ما يفعله نظام المياه، وما يلزم لقياسها بشكل موثوق.',
    },
    metaTitle: { en: 'Water Treatment Sensors & Online Measurement | C-Water', ar: 'مستشعرات معالجة المياه والقياس المتصل | C-Water' },
    metaDescription: {
      en: 'pH, ORP, conductivity, turbidity, corrosion rate and disinfection measurement for industrial water systems — selection, installation and calibration.',
      ar: 'قياس pH وORP والتوصيلية والعكارة ومعدل التآكل والتطهير لأنظمة المياه الصناعية — الاختيار والتركيب والمعايرة.',
    },
    intro: {
      en: 'Every treatment decision rests on a number that came from a sensor. If the sensor is in the wrong place, fouled, or out of calibration, every decision downstream of it inherits that error.',
      ar: 'يستند كل قرار معالجة إلى رقم جاء من مستشعر. وإذا كان المستشعر في مكان خاطئ أو متسخًا أو خارج المعايرة، فإن كل قرار بعده يرث ذلك الخطأ.',
    },
    whatItSolves: {
      en: 'Online measurement replaces periodic sampling with continuous visibility. A weekly grab sample tells you what the water was doing at one moment; a properly installed sensor tells you what it has been doing all week, including at three in the morning.',
      ar: 'يستبدل القياس المتصل أخذ العينات الدوري برؤية مستمرة. فالعينة الأسبوعية تخبرك بحال المياه في لحظة واحدة، أما المستشعر المركّب جيدًا فيخبرك بحالها طوال الأسبوع، بما في ذلك الساعة الثالثة فجرًا.',
    },
    howItWorks: [
      {
        id: 'ph',
        icon: 'gauge',
        label: { en: 'pH', ar: 'درجة الحموضة pH' },
        body: {
          en: 'Sets the behaviour of nearly every other reaction in the system — inhibitor performance, scaling tendency, biocide effectiveness and corrosion rate all shift with it. Electrodes need regular calibration and eventually fail; a drifting pH reading is a common root cause of unexplained treatment problems.',
          ar: 'تحدد سلوك كل تفاعل آخر في النظام تقريبًا — أداء المثبطات وميل الترسب وفعالية المبيدات ومعدل التآكل تتغير جميعها معها. وتحتاج الأقطاب إلى معايرة منتظمة وتتلف في النهاية؛ وانحراف قراءة pH سبب جذري شائع لمشكلات معالجة غير مفسّرة.',
        },
      },
      {
        id: 'conductivity',
        icon: 'flow',
        label: { en: 'Conductivity', ar: 'التوصيلية' },
        body: {
          en: 'A proxy for dissolved solids concentration, and therefore the practical basis for controlling cycles of concentration and boiler blowdown. Contacting cells suit clean water; electrodeless sensors tolerate fouling and higher conductivity ranges.',
          ar: 'مؤشر بديل لتركيز المواد الصلبة الذائبة، ومن ثم الأساس العملي للتحكم في دورات التركيز وتصريف الغلايات. تناسب الخلايا التلامسية المياه النظيفة، بينما تتحمل المستشعرات غير التلامسية الاتساخ والنطاقات الأعلى.',
        },
      },
      {
        id: 'orp',
        icon: 'sensor',
        label: { en: 'ORP', ar: 'جهد الأكسدة والاختزال ORP' },
        body: {
          en: 'Measures oxidising capacity rather than biocide concentration. It answers whether the water is currently in an oxidising state — useful for controlling halogen feed, but it is not a direct substitute for a residual test.',
          ar: 'يقيس القدرة على الأكسدة لا تركيز المبيد. ويجيب عمّا إذا كانت المياه في حالة مؤكسِدة حاليًا — وهو مفيد للتحكم في ضخ الهالوجينات، لكنه ليس بديلًا مباشرًا عن اختبار المتبقي.',
        },
      },
      {
        id: 'others',
        icon: 'lab',
        label: { en: 'Beyond the core three', ar: 'ما وراء المتغيرات الثلاثة الأساسية' },
        body: {
          en: 'Turbidity indicates filtration performance. Corrosion-rate sensors give a live view of what the inhibitor programme is actually achieving. Fluorometric measurement tracks a tagged inhibitor directly rather than inferring its concentration.',
          ar: 'تدل العكارة على أداء الترشيح. وتعطي مستشعرات معدل التآكل رؤية آنية لما يحققه برنامج المثبطات فعليًا. ويتتبع القياس الفلوري مثبطًا موسومًا مباشرة بدل استنتاج تركيزه.',
        },
      },
    ],
    applications: [
      { en: 'Cooling tower conductivity and pH control', ar: 'التحكم في توصيلية وحموضة أبراج التبريد' },
      { en: 'Boiler blowdown control', ar: 'التحكم في تصريف الغلايات' },
      { en: 'Disinfection and halogen residual', ar: 'التطهير ومتبقي الهالوجينات' },
      { en: 'RO permeate and feed monitoring', ar: 'مراقبة تغذية ونفاذ التناضح العكسي' },
      { en: 'Effluent discharge compliance', ar: 'مطابقة تصريف المخلفات السائلة' },
    ],
    solutions: ['cooling-water', 'boiler-steam', 'ro-membranes', 'potable-water', 'wastewater'],
    products: ['walchem-ph-orp-sensors', 'walchem-conductivity-sensors', 'walchem-disinfection-sensors', 'walchem-intuition-9'],
    services: ['water-analysis', 'monitoring-reporting', 'preventive-maintenance'],
    articles: ['what-conductivity-tells-you', 'role-of-orp', 'how-ph-affects-treatment'],
    cta: { en: 'View Technical Details', ar: 'اعرض التفاصيل الفنية' },
  },

  /* ====================================================================== */
  {
    slug: 'monitoring-control',
    status: 'published',
    chainPosition: 5,
    partner: 'walchem',
    title: { en: 'Monitoring & Control', ar: 'المراقبة والتحكم' },
    headline: { en: 'Don’t Guess What Your Water Is Doing.', ar: 'لا تخمّن ما يحدث في مياهك.' },
    summary: {
      en: 'Measure what matters, control what drifts, and keep a record of what actually happened.',
      ar: 'قِس ما يهم، وتحكّم فيما ينحرف، واحتفظ بسجل لما حدث فعلًا.',
    },
    metaTitle: { en: 'Water Treatment Monitoring & Control | C-Water', ar: 'مراقبة معالجة المياه والتحكم فيها | C-Water' },
    metaDescription: {
      en: 'Water treatment controllers, control strategy design, alarm handling and data logging that turn a chemical programme into a measurable, repeatable operation.',
      ar: 'وحدات تحكم في معالجة المياه، وتصميم استراتيجية التحكم، ومعالجة الإنذارات، وتسجيل البيانات — لتحويل البرنامج الكيميائي إلى عملية قابلة للقياس والتكرار.',
    },
    intro: {
      en: 'A controller is not the same thing as control. The instrument reads and acts; the control strategy decides what it should read, what it should act on, and what it should do when the two disagree.',
      ar: 'وحدة التحكم ليست هي التحكم. فالجهاز يقرأ ويتصرف، أما استراتيجية التحكم فتقرر ما ينبغي أن يقرأه، وعلامَ يتصرف، وماذا يفعل حين يتعارض الاثنان.',
    },
    whatItSolves: {
      en: 'Without control, a treatment programme is a set of intentions. With it, chemical consumption follows demand rather than habit, blowdown follows conductivity rather than the clock, and deviations announce themselves rather than being discovered at the next service visit.',
      ar: 'بلا تحكم، يبقى برنامج المعالجة مجرد نوايا. ومعه، يتبع استهلاك الكيماويات الطلبَ لا العادة، ويتبع التصريف التوصيليةَ لا الساعة، وتُعلن الانحرافات عن نفسها بدلًا من اكتشافها في زيارة الخدمة التالية.',
    },
    howItWorks: [
      {
        id: 'setpoints',
        icon: 'controller',
        label: { en: 'Setpoints and deadbands', ar: 'نقاط الضبط والنطاقات الميتة' },
        body: {
          en: 'A setpoint without a deadband produces a valve that cycles constantly. Deadband, feed limits and lockout timers are what make an automatic system stable rather than merely automatic.',
          ar: 'نقطة الضبط بلا نطاق ميت تنتج صمامًا يعمل ويتوقف باستمرار. فالنطاق الميت وحدود الضخ ومؤقتات الحجب هي ما يجعل النظام الأوتوماتيكي مستقرًا لا مجرد أوتوماتيكي.',
        },
      },
      {
        id: 'alarms',
        icon: 'gauge',
        label: { en: 'Alarms that mean something', ar: 'إنذارات ذات معنى' },
        body: {
          en: 'An alarm nobody acts on is noise. Limits should be set so that an alarm indicates a condition requiring a decision — low drum level, failed feed verification, sensor out of range — not a normal excursion.',
          ar: 'الإنذار الذي لا يتصرف أحد بناءً عليه ضجيج. وينبغي ضبط الحدود بحيث يشير الإنذار إلى حالة تستدعي قرارًا — مستوى برميل منخفض، أو فشل التحقق من الضخ، أو مستشعر خارج النطاق — لا إلى تذبذب طبيعي.',
        },
      },
      {
        id: 'logging',
        icon: 'monitor',
        label: { en: 'Logging and trend', ar: 'التسجيل والاتجاه' },
        body: {
          en: 'A trend line answers questions a spot reading cannot: was this gradual or sudden, does it track production, did it start when the make-up source changed. Logged history is what makes an investigation possible at all.',
          ar: 'يجيب خط الاتجاه عن أسئلة لا تجيب عنها القراءة اللحظية: هل كان التغير تدريجيًا أم مفاجئًا، وهل يتبع الإنتاج، وهل بدأ عند تغيّر مصدر مياه التعويض. والسجل التاريخي هو ما يجعل أي تحقيق ممكنًا أصلًا.',
        },
      },
      {
        id: 'verification',
        icon: 'shield',
        label: { en: 'Feed verification', ar: 'التحقق من الضخ' },
        body: {
          en: 'The controller calling for a dose is not proof that a dose was delivered. Flow verification, pulse feedback or level tracking confirms the chemical actually left the drum.',
          ar: 'طلب وحدة التحكم لجرعة ليس دليلًا على أن الجرعة قد ضُخّت. فالتحقق من التدفق أو التغذية الراجعة بالنبضات أو تتبع المستوى يؤكد أن الكيماوي غادر البرميل فعلًا.',
        },
      },
    ],
    applications: [
      { en: 'Cooling tower control', ar: 'التحكم في أبراج التبريد' },
      { en: 'Boiler blowdown and chemical feed', ar: 'تصريف الغلايات وضخ الكيماويات' },
      { en: 'Disinfection control', ar: 'التحكم في التطهير' },
      { en: 'Multi-system plant supervision', ar: 'الإشراف على أنظمة متعددة بالمنشأة' },
    ],
    solutions: ['cooling-water', 'boiler-steam', 'ro-membranes', 'process-water', 'industrial-water'],
    products: ['walchem-intuition-9', 'walchem-intuition-6', 'walchem-w100', 'walchem-fluent'],
    services: ['monitoring-reporting', 'installation-commissioning', 'optimization'],
    articles: ['how-remote-monitoring-improves-control', 'what-conductivity-tells-you', 'cooling-tower-cycles'],
    cta: { en: 'View Technical Details', ar: 'اعرض التفاصيل الفنية' },
  },

  /* ====================================================================== */
  {
    slug: 'reverse-osmosis',
    status: 'published',
    chainPosition: 2,
    title: { en: 'Reverse Osmosis & Membrane Treatment', ar: 'التناضح العكسي ومعالجة الأغشية' },
    headline: { en: 'Separation That Depends on Everything Before It.', ar: 'فصل يعتمد على كل ما يسبقه.' },
    summary: {
      en: 'Membrane systems that hold their performance because the pretreatment, chemistry and monitoring around them were designed together.',
      ar: 'أنظمة أغشية تحافظ على أدائها لأن المعالجة الأولية والكيمياء والمراقبة حولها صُممت معًا.',
    },
    metaTitle: { en: 'Reverse Osmosis & Membrane Treatment | C-Water', ar: 'التناضح العكسي ومعالجة الأغشية | C-Water' },
    metaDescription: {
      en: 'RO and membrane treatment engineered as a complete system: pretreatment, antiscalant selection, cleaning strategy, monitoring and recovery optimisation.',
      ar: 'معالجة التناضح العكسي والأغشية كنظام متكامل: المعالجة الأولية، واختيار مانع الترسب، واستراتيجية التنظيف، والمراقبة، وتحسين معدل الاستعادة.',
    },
    intro: {
      en: 'A membrane is a very precise filter operating under pressure at the limits of what the feed water will tolerate. It is also unforgiving: most RO problems are not membrane problems, they are pretreatment problems that arrived at the membrane.',
      ar: 'الغشاء مرشح بالغ الدقة يعمل تحت الضغط عند حدود ما تتحمله مياه التغذية. وهو أيضًا غير متسامح: فمعظم مشكلات التناضح العكسي ليست مشكلات أغشية، بل مشكلات معالجة أولية وصلت إلى الغشاء.',
    },
    whatItSolves: {
      en: 'RO removes dissolved salts, and with them most of what makes a water unsuitable for a demanding process. The engineering question is not whether it works but at what recovery, at what energy cost, and for how long between cleans.',
      ar: 'يزيل التناضح العكسي الأملاح الذائبة، ومعها معظم ما يجعل المياه غير صالحة لعملية دقيقة. والسؤال الهندسي ليس هل يعمل، بل عند أي معدل استعادة، وبأي تكلفة طاقة، ولأي مدة بين تنظيف وآخر.',
    },
    howItWorks: [
      {
        id: 'pretreatment',
        icon: 'filter',
        label: { en: 'Pretreatment sets the ceiling', ar: 'المعالجة الأولية تحدد السقف' },
        body: {
          en: 'Suspended solids, organics, oxidants and biological load all have to be dealt with before the membrane. SDI and turbidity at the feed point are the honest measures of whether that has been done.',
          ar: 'يجب التعامل مع المواد الصلبة العالقة والعضويات والمؤكسدات والحمل البيولوجي قبل الغشاء. ومؤشر كثافة الترسيب SDI والعكارة عند نقطة التغذية هما القياسان الصادقان لمدى تحقق ذلك.',
        },
      },
      {
        id: 'scaling',
        icon: 'scale',
        label: { en: 'Concentration at the tail', ar: 'التركيز عند نهاية المنظومة' },
        body: {
          en: 'Recovery concentrates everything that does not pass the membrane into a shrinking reject stream. Scaling appears at the last elements first, which is why antiscalant selection follows the concentrate chemistry rather than the feed.',
          ar: 'يركّز معدل الاستعادة كل ما لا يعبر الغشاء في تيار رفض متقلص. ويظهر الترسب في العناصر الأخيرة أولًا، ولهذا يتبع اختيار مانع الترسب كيمياء المركّز لا كيمياء التغذية.',
        },
      },
      {
        id: 'fouling',
        icon: 'fouling',
        label: { en: 'Fouling has a signature', ar: 'لكل نوع اتساخ بصمة' },
        body: {
          en: 'Normalised data distinguishes the causes: rising differential pressure across a stage points to particulate or biological fouling, falling normalised flow with rising salt passage points to scaling. The cleaning chemistry follows the diagnosis.',
          ar: 'تميّز البيانات المعيارية بين الأسباب: فارتفاع فرق الضغط عبر مرحلة يشير إلى اتساخ جسيمي أو بيولوجي، وانخفاض التدفق المعياري مع ارتفاع تسرب الأملاح يشير إلى الترسب. وتتبع كيمياء التنظيف التشخيصَ.',
        },
      },
      {
        id: 'normalisation',
        icon: 'optimize',
        label: { en: 'Normalised performance', ar: 'الأداء المعياري' },
        body: {
          en: 'Raw readings move with temperature and feed pressure. Normalising to reference conditions is what reveals a genuine decline early, while a clean is still cheap and effective.',
          ar: 'تتغير القراءات الخام مع الحرارة وضغط التغذية. والمعايرة إلى ظروف مرجعية هي ما يكشف التدهور الحقيقي مبكرًا، بينما لا يزال التنظيف رخيصًا وفعالًا.',
        },
      },
    ],
    applications: [
      { en: 'Process water production', ar: 'إنتاج مياه العمليات' },
      { en: 'Boiler feedwater preparation', ar: 'تحضير مياه تغذية الغلايات' },
      { en: 'Brackish water desalination', ar: 'تحلية المياه قليلة الملوحة' },
      { en: 'Wastewater recovery and reuse', ar: 'استعادة مياه الصرف وإعادة استخدامها' },
    ],
    solutions: ['ro-membranes', 'process-water', 'potable-water', 'industrial-water'],
    products: ['kurita-kuriverter-ik110', 'timex-cartridge-filter', 'timex-svf-series', 'walchem-conductivity-sensors'],
    services: ['engineering-design', 'system-assessment', 'optimization'],
    articles: ['what-causes-ro-fouling', 'ro-pretreatment-failure', 'filtration-protects-downstream'],
    cta: { en: 'Discuss Your RO System', ar: 'ناقش نظام التناضح العكسي لديك' },
  },

  /* ====================================================================== */
  {
    slug: 'automation-remote-monitoring',
    status: 'published',
    chainPosition: 6,
    partner: 'walchem',
    title: { en: 'Automation & Remote Monitoring', ar: 'الأتمتة والمراقبة عن بُعد' },
    headline: { en: 'Turn Water Data Into Operational Intelligence.', ar: 'حوّل بيانات المياه إلى معرفة تشغيلية.' },
    summary: {
      en: 'Treatment status, trends and alarms available away from the plant room — so problems are found before they are felt.',
      ar: 'حالة المعالجة والاتجاهات والإنذارات متاحة خارج غرفة المعدات — لاكتشاف المشكلات قبل الشعور بها.',
    },
    metaTitle: { en: 'Remote Water Treatment Monitoring & Automation | C-Water', ar: 'المراقبة عن بُعد وأتمتة معالجة المياه | C-Water' },
    metaDescription: {
      en: 'Remote monitoring for industrial water treatment: connected controller data, trend analysis, alarm notification and reporting that supports faster technical response.',
      ar: 'مراقبة عن بُعد لمعالجة المياه الصناعية: بيانات وحدات تحكم متصلة، وتحليل اتجاهات، وتنبيهات إنذار، وتقارير تدعم استجابة فنية أسرع.',
    },
    intro: {
      en: 'The value of remote monitoring is not the dashboard. It is the shortened distance between a parameter drifting and somebody who understands it noticing.',
      ar: 'قيمة المراقبة عن بُعد ليست في لوحة العرض، بل في تقصير المسافة بين انحراف متغير ما وملاحظة شخص يفهمه.',
    },
    whatItSolves: {
      en: 'Between service visits, a treatment system is unobserved. Most of the conditions that cause real damage — a failed pump, a fouled sensor, a make-up water change — develop and do their work inside that gap.',
      ar: 'بين زيارات الخدمة، يظل نظام المعالجة دون مراقبة. ومعظم الحالات التي تسبب ضررًا حقيقيًا — مضخة معطلة، مستشعر متسخ، تغيّر في مياه التعويض — تنشأ وتفعل فعلها داخل تلك الفجوة.',
    },
    howItWorks: [
      {
        id: 'measure',
        icon: 'sensor',
        label: { en: 'Measure', ar: 'القياس' },
        body: {
          en: 'Controller inputs, pump status, level, flow and alarm state are gathered continuously at the point of treatment.',
          ar: 'تُجمَع مدخلات وحدة التحكم وحالة المضخة والمستوى والتدفق وحالة الإنذار باستمرار عند نقطة المعالجة.',
        },
      },
      {
        id: 'alert',
        icon: 'gauge',
        label: { en: 'Alert', ar: 'التنبيه' },
        body: {
          en: 'Conditions that need a decision are pushed out rather than waiting to be found. The discipline is in alerting on few enough things that the alerts still get read.',
          ar: 'تُرسَل الحالات التي تحتاج قرارًا بدلًا من انتظار اكتشافها. والانضباط هو التنبيه على عدد محدود بما يكفي ليبقى للتنبيهات من يقرأها.',
        },
      },
      {
        id: 'analyse',
        icon: 'monitor',
        label: { en: 'Analyse', ar: 'التحليل' },
        body: {
          en: 'History across weeks and seasons exposes patterns a single visit cannot see — chemical consumption tracking production, conductivity drifting with source water.',
          ar: 'يكشف السجل عبر الأسابيع والفصول أنماطًا لا تراها زيارة واحدة — كاستهلاك كيماويات يتبع الإنتاج، أو توصيلية تنحرف مع تغير مياه المصدر.',
        },
      },
      {
        id: 'improve',
        icon: 'optimize',
        label: { en: 'Improve', ar: 'التحسين' },
        body: {
          en: 'Reporting turns the record into decisions: adjusted setpoints, revised service intervals, a different filtration degree, a changed programme.',
          ar: 'تحوّل التقارير السجل إلى قرارات: تعديل نقاط الضبط، ومراجعة فترات الخدمة، وتغيير درجة الترشيح، وتبديل البرنامج.',
        },
      },
    ],
    applications: [
      { en: 'Multi-site facility management', ar: 'إدارة منشآت متعددة المواقع' },
      { en: 'Unmanned or remote plant', ar: 'المنشآت غير المأهولة أو النائية' },
      { en: 'Treatment programme reporting', ar: 'تقارير برامج المعالجة' },
      { en: 'Service scheduling by condition', ar: 'جدولة الخدمة وفق الحالة' },
    ],
    solutions: ['cooling-water', 'boiler-steam', 'industrial-water', 'process-water'],
    products: ['walchem-fluent', 'walchem-intuition-9', 'walchem-intuition-6'],
    services: ['monitoring-reporting', 'technical-support', 'optimization'],
    articles: ['how-remote-monitoring-improves-control', 'designing-a-treatment-program'],
    cta: { en: 'Explore Intelligent Monitoring', ar: 'استكشف المراقبة الذكية' },
  },

  /* ====================================================================== */
  {
    slug: 'water-analysis',
    status: 'published',
    chainPosition: 0,
    title: { en: 'Water Analysis', ar: 'تحليل المياه' },
    headline: { en: 'Better Treatment Starts With Better Data.', ar: 'المعالجة الأفضل تبدأ ببيانات أفضل.' },
    summary: {
      en: 'Knowing what is actually in the water, before deciding what to do about it.',
      ar: 'معرفة ما تحتويه المياه فعلًا، قبل تقرير ما يجب فعله حيالها.',
    },
    metaTitle: { en: 'Industrial Water Analysis & Interpretation | C-Water', ar: 'تحليل المياه الصناعية وتفسير نتائجها | C-Water' },
    metaDescription: {
      en: 'Water sampling, analysis and interpretation for industrial systems — the basis on which a treatment programme, filtration degree and control strategy are chosen.',
      ar: 'أخذ عينات المياه وتحليلها وتفسيرها للأنظمة الصناعية — الأساس الذي يُختار عليه برنامج المعالجة ودرجة الترشيح واستراتيجية التحكم.',
    },
    intro: {
      en: 'Analysis is the cheapest step in a treatment programme and the one that determines whether the rest of it was worth doing.',
      ar: 'التحليل أرخص خطوة في برنامج المعالجة، وهو الذي يحدد ما إذا كان بقيته يستحق العناء.',
    },
    whatItSolves: {
      en: 'Treatment chosen without analysis is treatment chosen from a catalogue. The same cooling tower in two cities, fed from two different sources, needs two different programmes — and the difference is only visible in the numbers.',
      ar: 'المعالجة المختارة بلا تحليل هي معالجة مختارة من كتالوج. فبرج التبريد نفسه في مدينتين، بمصدرين مختلفين، يحتاج برنامجين مختلفين — والفارق لا يظهر إلا في الأرقام.',
    },
    howItWorks: [
      {
        id: 'sample',
        icon: 'flask',
        label: { en: 'Sampling that represents the system', ar: 'عينة تمثّل النظام' },
        body: {
          en: 'Where and when the sample is taken matters as much as the analysis. A sample from a dead leg, or drawn immediately after a chemical slug, describes something other than the system.',
          ar: 'موضع أخذ العينة وتوقيتها لا يقلان أهمية عن التحليل نفسه. فالعينة المأخوذة من فرع ميت، أو مباشرة بعد جرعة كيميائية، تصف شيئًا آخر غير النظام.',
        },
      },
      {
        id: 'parameters',
        icon: 'lab',
        label: { en: 'The parameters that drive decisions', ar: 'المتغيرات التي تقود القرارات' },
        body: {
          en: 'Hardness, alkalinity, chloride, sulphate, silica, iron, conductivity, pH and microbiological indicators between them determine scaling tendency, corrosivity and the treatment approach that follows.',
          ar: 'تحدد العسر والقلوية والكلوريد والكبريتات والسيليكا والحديد والتوصيلية ودرجة الحموضة والمؤشرات الميكروبيولوجية — مجتمعة — ميل الترسب ودرجة التآكلية والمنهج العلاجي المترتب عليها.',
        },
      },
      {
        id: 'interpret',
        icon: 'blueprint',
        label: { en: 'Interpretation, not just results', ar: 'تفسير لا مجرد نتائج' },
        body: {
          en: 'A results sheet is not an answer. Reading it against the metallurgy, temperatures, cycles and duty of the actual system is what converts data into a treatment decision.',
          ar: 'ورقة النتائج ليست جوابًا. وقراءتها في ضوء معادن النظام الفعلي ودرجات حرارته ودورات تركيزه وظروف تشغيله هي ما يحوّل البيانات إلى قرار معالجة.',
        },
      },
      {
        id: 'baseline',
        icon: 'optimize',
        label: { en: 'A baseline to measure against', ar: 'خط أساس للقياس عليه' },
        body: {
          en: 'The first analysis becomes the reference. Every subsequent set shows whether the programme is holding, and gives an early warning when the source water itself has changed.',
          ar: 'يصبح التحليل الأول مرجعًا. وتُظهر كل مجموعة تالية ما إذا كان البرنامج صامدًا، وتعطي إنذارًا مبكرًا عند تغيّر مياه المصدر نفسها.',
        },
      },
    ],
    applications: [
      { en: 'New system design', ar: 'تصميم نظام جديد' },
      { en: 'Treatment programme review', ar: 'مراجعة برنامج المعالجة' },
      { en: 'Troubleshooting and root cause', ar: 'استكشاف الأعطال وتحديد السبب الجذري' },
      { en: 'Source water change assessment', ar: 'تقييم تغيّر مياه المصدر' },
    ],
    solutions: ['cooling-water', 'boiler-steam', 'ro-membranes', 'process-water', 'wastewater', 'potable-water'],
    products: ['walchem-ph-orp-sensors', 'walchem-conductivity-sensors'],
    services: ['water-analysis', 'system-assessment'],
    articles: ['water-analysis-before-treatment', 'designing-a-treatment-program'],
    cta: { en: 'Request Water Analysis', ar: 'اطلب تحليل مياه' },
  },

  /* ====================================================================== */
  {
    slug: 'engineering-integration',
    status: 'published',
    chainPosition: 7,
    title: { en: 'Engineering & System Integration', ar: 'الهندسة وتكامل الأنظمة' },
    headline: { en: 'The Part That Makes the Rest Work Together.', ar: 'الجزء الذي يجعل البقية تعمل معًا.' },
    summary: {
      en: 'Turning individual technologies into one system that can be operated, maintained and improved.',
      ar: 'تحويل التقنيات المنفردة إلى نظام واحد يمكن تشغيله وصيانته وتحسينه.',
    },
    metaTitle: { en: 'Water Treatment Engineering & System Integration | C-Water', ar: 'هندسة معالجة المياه وتكامل الأنظمة | C-Water' },
    metaDescription: {
      en: 'System integration for industrial water treatment: sequencing, hydraulic and control interfaces, commissioning and the documentation that keeps a system operable.',
      ar: 'تكامل الأنظمة لمعالجة المياه الصناعية: الترتيب التسلسلي، والوصلات الهيدروليكية والتحكمية، والتشغيل الابتدائي، والتوثيق الذي يبقي النظام قابلًا للتشغيل.',
    },
    intro: {
      en: 'Most water systems are assembled from good components that were never asked to work together. Integration is the discipline of deciding sequence, interfaces and responsibility before anything is installed.',
      ar: 'تُجمَّع معظم أنظمة المياه من مكونات جيدة لم يُطلب منها يومًا أن تعمل معًا. والتكامل هو الانضباط في تحديد التسلسل والوصلات والمسؤوليات قبل تركيب أي شيء.',
    },
    whatItSolves: {
      en: 'Interfaces are where systems fail. A filter that backwashes into a line the controller is measuring, a dosing point too close to a sample point, a pump sized for a chemical that was later changed — none of these are component faults.',
      ar: 'الوصلات هي موضع فشل الأنظمة. مرشح يغسل عكسيًا في خط تقيسه وحدة التحكم، ونقطة ضخ قريبة جدًا من نقطة أخذ العينة، ومضخة اختيرت لكيماوي تغيّر لاحقًا — لا شيء من ذلك عيب في المكوّن.',
    },
    howItWorks: [
      {
        id: 'sequence',
        icon: 'network',
        label: { en: 'Treatment sequence', ar: 'تسلسل المعالجة' },
        body: {
          en: 'What is removed first changes what the next stage has to handle. Getting the order right is usually cheaper than getting the equipment bigger.',
          ar: 'ما يُزال أولًا يغيّر ما يجب أن تتعامل معه المرحلة التالية. وضبط الترتيب عادةً أرخص من تكبير المعدات.',
        },
      },
      {
        id: 'hydraulics',
        icon: 'flow',
        label: { en: 'Hydraulic reality', ar: 'الواقع الهيدروليكي' },
        body: {
          en: 'Available head, turndown, backwash demand and the effect of an automatic clean cycle on the rest of the circuit all have to be checked against the actual pump curve, not the nominal duty.',
          ar: 'يجب التحقق من الضاغط المتاح ونطاق التعديل ومتطلب الغسيل العكسي وأثر دورة التنظيف الأوتوماتيكية على بقية الدائرة، مقابل منحنى المضخة الفعلي لا الحمل الاسمي.',
        },
      },
      {
        id: 'control',
        icon: 'controller',
        label: { en: 'Control interfaces', ar: 'وصلات التحكم' },
        body: {
          en: 'Which device owns which decision, what happens on a lost signal, and how the treatment system reports to the plant’s existing supervision — decided in design, not on site.',
          ar: 'أي جهاز يملك أي قرار، وماذا يحدث عند فقد إشارة، وكيف يبلّغ نظام المعالجة نظام الإشراف القائم بالمنشأة — تُحدَّد في التصميم لا في الموقع.',
        },
      },
      {
        id: 'handover',
        icon: 'clipboard',
        label: { en: 'Documentation and handover', ar: 'التوثيق والتسليم' },
        body: {
          en: 'Setpoint records, control philosophy, test values and a clear operating description. A system nobody can explain in two years is a system that will be run on defaults.',
          ar: 'سجلات نقاط الضبط، وفلسفة التحكم، وقيم الاختبار، ووصف تشغيلي واضح. فالنظام الذي لا يستطيع أحد شرحه بعد عامين هو نظام سيُشغَّل بالإعدادات الافتراضية.',
        },
      },
    ],
    applications: [
      { en: 'New treatment plant design', ar: 'تصميم محطة معالجة جديدة' },
      { en: 'Retrofit and upgrade', ar: 'التحديث وإعادة التأهيل' },
      { en: 'Multi-technology integration', ar: 'تكامل تقنيات متعددة' },
      { en: 'Capacity or process change', ar: 'تغيير السعة أو العملية' },
    ],
    solutions: ['industrial-water', 'process-water', 'wastewater', 'specialised-treatment'],
    products: ['walchem-intuition-9', 'timex-treatment-systems'],
    services: ['engineering-design', 'installation-commissioning', 'system-assessment'],
    articles: ['designing-a-treatment-program', 'filtration-protects-downstream'],
    cta: { en: 'Start a Technical Discussion', ar: 'ابدأ نقاشًا فنيًا' },
  },
];

export const technologyBySlug = Object.fromEntries(technologies.map((t) => [t.slug, t]));
