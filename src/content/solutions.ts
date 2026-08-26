import type { Solution } from './types';

/**
 * Solution pages — organised by application, because that is how a plant
 * describes its problem. Products appear only after the problem, the risk and
 * the approach have been set out.
 *
 * `problemTags` and `goalTags` are what the Solution Finder scores against.
 */
export const solutions: Solution[] = [
  /* ====================================================================== */
  {
    slug: 'cooling-water',
    status: 'published',
    title: { en: 'Cooling Water', ar: 'مياه التبريد' },
    headline: { en: 'Keep Heat Transfer Working at Its Best.', ar: 'حافظ على أداء التبادل الحراري في أفضل حالاته.' },
    summary: {
      en: 'Control scale, corrosion and microbiological risk while protecting heat-transfer performance.',
      ar: 'التحكم في الترسبات والتآكل والمخاطر الميكروبيولوجية مع حماية أداء التبادل الحراري.',
    },
    metaTitle: { en: 'Cooling Water Treatment Solutions | C-Water Egypt', ar: 'حلول معالجة مياه التبريد | C-Water مصر' },
    metaDescription: {
      en: 'Cooling water treatment engineered around the whole system: scale and corrosion control, biofouling management, side-stream filtration, automated dosing and conductivity control.',
      ar: 'معالجة مياه التبريد مُهندَسة حول النظام بأكمله: التحكم في الترسبات والتآكل، وإدارة النمو البيولوجي، والترشيح الجانبي، والجرعات الآلية، والتحكم في التوصيلية.',
    },
    intro: {
      en: 'Cooling systems are designed to move heat — not scale, corrosion, deposits and microbiological growth. C-Water brings treatment chemistry, filtration, monitoring, dosing and control together around the full cooling-water system.',
      ar: 'أنظمة التبريد مصممة لنقل الحرارة — لا لحمل الترسبات والتآكل والرواسب والنمو البيولوجي. تجمع C-Water بين كيمياء المعالجة والترشيح والمراقبة والجرعات والتحكم حول نظام مياه التبريد بأكمله.',
    },
    whyItMatters: {
      en: 'An open recirculating cooling system concentrates everything it does not evaporate. Dissolved solids build up, temperature and residence time favour biological growth, and the surfaces that matter most — the hottest ones — are exactly where deposits form first. A millimetre of scale on a condenser tube can measurably raise the energy required to reject the same heat, and the plant usually feels it as a compressor working harder long before anyone opens the exchanger.',
      ar: 'يركّز نظام التبريد المفتوح كل ما لا يتبخر منه. فترتفع المواد الصلبة الذائبة، وتُهيئ الحرارة وزمن المكوث بيئة للنمو البيولوجي، وتكون الأسطح الأهم — أي الأسخن — هي بالضبط حيث تتكوّن الرواسب أولًا. وقد يرفع مليمتر واحد من الترسبات على أنبوب المكثف الطاقةَ اللازمة لطرد القدر نفسه من الحرارة بشكل ملموس، وعادةً ما تشعر المنشأة بذلك في ضاغط يعمل بجهد أكبر قبل وقت طويل من فتح المبادل.',
    },
    problems: [
      {
        id: 'scale',
        icon: 'scale',
        label: { en: 'Scale', ar: 'الترسبات' },
        body: {
          en: 'Calcium carbonate and other sparingly soluble salts deposit on the hottest surfaces as the water concentrates. Heat transfer falls, approach temperature rises and energy consumption follows.',
          ar: 'تترسب كربونات الكالسيوم وأملاح أخرى ضعيفة الذوبان على أسخن الأسطح مع تركّز المياه. فينخفض التبادل الحراري، وترتفع درجة حرارة الاقتراب، ويتبعها استهلاك الطاقة.',
        },
      },
      {
        id: 'corrosion',
        icon: 'corrosion',
        label: { en: 'Corrosion', ar: 'التآكل' },
        body: {
          en: 'Dissolved oxygen, chloride, low pH and mixed metallurgy all drive metal loss. Under-deposit corrosion is the most damaging form because it is localised, hidden and progressive.',
          ar: 'يدفع الأكسجين الذائب والكلوريد وانخفاض الحموضة وتعدد المعادن إلى فقد المعدن. وأشد الأشكال ضررًا هو التآكل تحت الرواسب لأنه موضعي وخفي ومتفاقم.',
        },
      },
      {
        id: 'micro',
        icon: 'biology',
        label: { en: 'Microbiological growth', ar: 'النمو البيولوجي' },
        body: {
          en: 'Warm, aerated, nutrient-bearing water is an ideal culture medium. Biofilm insulates heat-transfer surfaces, shelters corrosion beneath it and is far harder to remove than to prevent.',
          ar: 'المياه الدافئة المهواة الحاملة للمغذيات وسط مثالي للنمو. ويعزل الغشاء الحيوي أسطح التبادل الحراري، ويحمي التآكل تحته، وإزالته أصعب كثيرًا من منعه.',
        },
      },
      {
        id: 'filtration',
        icon: 'filter',
        label: { en: 'Poor filtration', ar: 'ضعف الترشيح' },
        body: {
          en: 'A tower is an efficient air scrubber. Airborne dust and debris collect in the basin, settle in low-velocity areas and consume treatment chemical that should have been protecting metal.',
          ar: 'برج التبريد غسّال هواء فعّال. فيتجمع الغبار والشوائب المحمولة جوًا في الحوض، وتستقر في مناطق السرعة المنخفضة، وتستهلك كيماويات المعالجة التي كان يجب أن تحمي المعدن.',
        },
      },
      {
        id: 'chemistry',
        icon: 'flask',
        label: { en: 'Uncontrolled chemistry', ar: 'كيمياء غير محكومة' },
        body: {
          en: 'Dosing by timer assumes constant load. When production, ambient conditions or make-up quality change, the programme is either overdosing or leaving the system unprotected.',
          ar: 'الجرعات بالمؤقت تفترض حملًا ثابتًا. وعند تغيّر الإنتاج أو الظروف الجوية أو جودة مياه التعويض، يصبح البرنامج إما مفرطًا في الجرعة أو تاركًا النظام بلا حماية.',
        },
      },
      {
        id: 'blowdown',
        icon: 'flow',
        label: { en: 'Excessive blowdown', ar: 'التصريف الزائد' },
        body: {
          en: 'Running at unnecessarily low cycles of concentration wastes water, wastes the chemical dissolved in it, and wastes the energy that went into treating the make-up.',
          ar: 'التشغيل عند دورات تركيز منخفضة دون داعٍ يهدر المياه، ويهدر الكيماويات المذابة فيها، ويهدر الطاقة التي أُنفقت على معالجة مياه التعويض.',
        },
      },
    ],
    risks: [
      {
        id: 'efficiency',
        icon: 'energy',
        label: { en: 'Lost thermal efficiency', ar: 'فقد الكفاءة الحرارية' },
        body: {
          en: 'Deposits and biofilm both act as insulation exactly where the system can least afford it.',
          ar: 'تعمل الرواسب والأغشية الحيوية كعازل في المكان الذي لا يحتمل فيه النظام ذلك إطلاقًا.',
        },
      },
      {
        id: 'asset',
        icon: 'shield',
        label: { en: 'Shortened asset life', ar: 'قِصر عمر الأصول' },
        body: {
          en: 'Localised corrosion can take an exchanger or a chiller out of service long before the rest of the plant is due for renewal.',
          ar: 'قد يخرج التآكل الموضعي مبادلًا أو مبرّدًا من الخدمة قبل موعد تجديد بقية المنشأة بوقت طويل.',
        },
      },
      {
        id: 'downtime',
        icon: 'wrench',
        label: { en: 'Unplanned downtime', ar: 'توقف غير مخطط' },
        body: {
          en: 'Cleaning a fouled condenser is a shutdown activity. It is almost always scheduled by the fouling, not by the plant.',
          ar: 'تنظيف مكثف متسخ نشاط يستلزم إيقافًا، وغالبًا ما يحدد موعده الاتساخ لا المنشأة.',
        },
      },
      {
        id: 'water',
        icon: 'droplet',
        label: { en: 'Water and chemical waste', ar: 'هدر المياه والكيماويات' },
        body: {
          en: 'Poorly controlled cycles waste both at once, and the cost compounds across a cooling season.',
          ar: 'دورات التركيز غير المضبوطة تهدر الاثنين معًا، وتتراكم التكلفة على مدى موسم التبريد.',
        },
      },
    ],
    approach: [
      {
        id: 'analyse',
        icon: 'lab',
        label: { en: 'Analyse', ar: 'التحليل' },
        body: {
          en: 'Make-up and system water are analysed and read against the metallurgy, temperatures and duty of the actual plant. This establishes the achievable cycles of concentration before any chemical is selected.',
          ar: 'تُحلَّل مياه التعويض ومياه النظام وتُقرأ في ضوء معادن المنشأة الفعلية ودرجات حرارتها وظروف تشغيلها، ليتحدد بذلك معدل دورات التركيز الممكن قبل اختيار أي كيماوي.',
        },
      },
      {
        id: 'filter',
        icon: 'filter',
        label: { en: 'Filter', ar: 'الترشيح' },
        body: {
          en: 'Side-stream filtration removes the settled and suspended load continuously, reducing the demand placed on the chemical programme and keeping low-velocity areas clean.',
          ar: 'يزيل الترشيح الجانبي الحمل المستقر والعالق باستمرار، فيقلل الطلب على البرنامج الكيميائي ويُبقي مناطق السرعة المنخفضة نظيفة.',
        },
      },
      {
        id: 'treat',
        icon: 'flask',
        label: { en: 'Treat', ar: 'المعالجة' },
        body: {
          en: 'Inhibitor, dispersant and biocide chemistry is selected as one programme, so the components support rather than degrade each other.',
          ar: 'تُختار كيمياء المثبطات والمشتتات والمبيدات كبرنامج واحد، بحيث تدعم مكوناته بعضها بدل أن تُفكك بعضها.',
        },
      },
      {
        id: 'dose',
        icon: 'pump',
        label: { en: 'Dose', ar: 'الجرعات' },
        body: {
          en: 'Feed is driven by make-up volume, conductivity or ORP rather than by a timer, and verified so that a call for dose can be shown to have produced one.',
          ar: 'يُدار الضخ بحجم مياه التعويض أو التوصيلية أو ORP بدل المؤقت، ويُتحقَّق منه بحيث يمكن إثبات أن طلب الجرعة قد نتج عنه ضخ فعلي.',
        },
      },
      {
        id: 'control',
        icon: 'controller',
        label: { en: 'Control', ar: 'التحكم' },
        body: {
          en: 'Blowdown follows measured conductivity, holding cycles at the highest value the water chemistry safely allows instead of a conservative fixed setting.',
          ar: 'يتبع التصريف التوصيلية المقاسة، فيثبّت دورات التركيز عند أعلى قيمة تسمح بها كيمياء المياه بأمان بدل إعداد ثابت متحفظ.',
        },
      },
      {
        id: 'optimise',
        icon: 'optimize',
        label: { en: 'Optimise', ar: 'التحسين' },
        body: {
          en: 'Trend data, corrosion coupons and periodic analysis show whether the programme is still matched to the system as loads and seasons change.',
          ar: 'تُظهر بيانات الاتجاه وشرائح التآكل والتحليل الدوري ما إذا كان البرنامج لا يزال ملائمًا للنظام مع تغيّر الأحمال والفصول.',
        },
      },
    ],
    systemFlow: [
      { id: 'makeup', label: { en: 'Make-up Water', ar: 'مياه التعويض' }, caption: { en: 'Enters the system', ar: 'تدخل النظام' }, icon: 'droplet' },
      { id: 'filtration', label: { en: 'Side-stream Filtration', ar: 'الترشيح الجانبي' }, caption: { en: 'Solids removed', ar: 'إزالة المواد الصلبة' }, icon: 'filter', partner: 'timex', href: '/technologies/filtration' },
      { id: 'chemistry', label: { en: 'Treatment Chemistry', ar: 'كيمياء المعالجة' }, caption: { en: 'Inhibitor and biocide', ar: 'مثبطات ومبيدات' }, icon: 'flask', partner: 'kurita', href: '/technologies/water-treatment-chemicals' },
      { id: 'dosing', label: { en: 'Controlled Dosing', ar: 'جرعات محكومة' }, caption: { en: 'Feed on demand', ar: 'ضخ حسب الطلب' }, icon: 'pump', partner: 'walchem', href: '/technologies/chemical-dosing' },
      { id: 'sensing', label: { en: 'pH · Conductivity · ORP', ar: 'pH · التوصيلية · ORP' }, caption: { en: 'Continuous reading', ar: 'قراءة مستمرة' }, icon: 'sensor', partner: 'walchem', href: '/technologies/sensors-measurement' },
      { id: 'control', label: { en: 'Blowdown Control', ar: 'التحكم في التصريف' }, caption: { en: 'Cycles held', ar: 'تثبيت دورات التركيز' }, icon: 'controller', partner: 'walchem', href: '/technologies/monitoring-control' },
      { id: 'tower', label: { en: 'Cooling Tower', ar: 'برج التبريد' }, caption: { en: 'Heat rejected', ar: 'طرد الحرارة' }, icon: 'tower' },
      { id: 'optimise', label: { en: 'Optimisation', ar: 'التحسين' }, caption: { en: 'Programme reviewed', ar: 'مراجعة البرنامج' }, icon: 'optimize', href: '/services/optimization' },
    ],
    technologies: ['water-treatment-chemicals', 'filtration', 'chemical-dosing', 'sensors-measurement', 'monitoring-control', 'automation-remote-monitoring'],
    services: ['water-analysis', 'system-assessment', 'chemical-treatment-programmes', 'monitoring-reporting', 'optimization'],
    industries: ['manufacturing', 'hospitality', 'power-utilities', 'commercial-buildings', 'food-beverage', 'healthcare'],
    products: ['walchem-intuition-9', 'kurita-cooling-programme', 'kurita-dilurit-bc', 'timex-svf-series', 'walchem-conductivity-sensors', 'walchem-ix-series'],
    projects: ['cooling-system-control-upgrade'],
    articles: ['what-causes-scale-in-cooling-towers', 'cooling-tower-cycles', 'what-conductivity-tells-you', 'how-corrosion-develops'],
    problemTags: ['scale', 'corrosion', 'microbiology', 'fouling', 'filtration', 'water-loss', 'chemical-consumption', 'performance'],
    goalTags: ['protect-equipment', 'improve-efficiency', 'reduce-water', 'improve-control', 'optimize-existing'],
    cta: { en: 'Discuss Your Cooling System', ar: 'ناقش نظام التبريد لديك' },
  },

  /* ====================================================================== */
  {
    slug: 'boiler-steam',
    status: 'published',
    title: { en: 'Boiler & Steam', ar: 'الغلايات والبخار' },
    headline: { en: 'Protect the System That Keeps Production Moving.', ar: 'احمِ النظام الذي يبقي الإنتاج مستمرًا.' },
    summary: {
      en: 'Protect boiler, feedwater and condensate systems against deposits and corrosion.',
      ar: 'حماية أنظمة الغلاية ومياه التغذية والمتكثفات من الرواسب والتآكل.',
    },
    metaTitle: { en: 'Boiler Water Treatment Solutions | C-Water Egypt', ar: 'حلول معالجة مياه الغلايات | C-Water مصر' },
    metaDescription: {
      en: 'Boiler water treatment across the full cycle — make-up, feedwater, boiler, steam and condensate return. Deposit and corrosion control, blowdown management and monitoring.',
      ar: 'معالجة مياه الغلايات عبر الدورة الكاملة — التعويض ومياه التغذية والغلاية والبخار وعودة المتكثفات. التحكم في الرواسب والتآكل، وإدارة التصريف، والمراقبة.',
    },
    intro: {
      en: 'Water quality affects boiler efficiency, equipment life, maintenance and operational reliability. C-Water integrates treatment chemistry, monitoring and control around the boiler-water cycle.',
      ar: 'تؤثر جودة المياه في كفاءة الغلاية وعمر المعدات والصيانة وموثوقية التشغيل. تدمج C-Water كيمياء المعالجة والمراقبة والتحكم حول دورة مياه الغلاية.',
    },
    whyItMatters: {
      en: 'A boiler concentrates its feedwater by design: water leaves as steam and everything dissolved in it stays behind. That makes the boiler the least forgiving component in most utility systems. Deposits form on the highest-heat-flux surfaces, where they impede heat transfer and can raise tube metal temperature. Corrosion in the condensate return is often invisible until the returned iron shows up in the boiler itself.',
      ar: 'تركّز الغلاية مياه تغذيتها بحكم تصميمها: تغادر المياه على شكل بخار ويبقى كل ما ذاب فيها. وهذا يجعلها أقل مكونات أنظمة المرافق تسامحًا. فتتكوّن الرواسب على أسطح أعلى تدفق حراري، حيث تعوق التبادل الحراري وقد ترفع درجة حرارة معدن الأنبوب. أما التآكل في خط عودة المتكثفات فغالبًا ما يبقى خفيًا حتى يظهر الحديد العائد داخل الغلاية نفسها.',
    },
    problems: [
      {
        id: 'scale',
        icon: 'scale',
        label: { en: 'Deposits on heat-transfer surfaces', ar: 'رواسب على أسطح التبادل الحراري' },
        body: {
          en: 'Hardness and iron entering with the feedwater deposit where heat flux is highest, insulating the tube from the water that is supposed to be cooling it.',
          ar: 'يترسب العسر والحديد الداخلان مع مياه التغذية حيث يكون التدفق الحراري أعلى، فيعزلان الأنبوب عن المياه التي يُفترض أنها تبرّده.',
        },
      },
      {
        id: 'oxygen',
        icon: 'corrosion',
        label: { en: 'Dissolved oxygen corrosion', ar: 'التآكل بالأكسجين الذائب' },
        body: {
          en: 'Oxygen carried in with the make-up attacks the feedwater system and the boiler itself, typically as pitting rather than uniform loss.',
          ar: 'يهاجم الأكسجين الداخل مع مياه التعويض نظام التغذية والغلاية نفسها، وعادةً على شكل تنقّر لا فقد منتظم.',
        },
      },
      {
        id: 'condensate',
        icon: 'recycle',
        label: { en: 'Condensate line corrosion', ar: 'تآكل خطوط المتكثفات' },
        body: {
          en: 'Carbon dioxide released in the boiler forms carbonic acid when the steam condenses, thinning return lines and carrying iron back to the boiler.',
          ar: 'يكوّن ثاني أكسيد الكربون المتحرر في الغلاية حمض الكربونيك عند تكثّف البخار، فيرقّق خطوط العودة ويحمل الحديد إلى الغلاية.',
        },
      },
      {
        id: 'carryover',
        icon: 'flow',
        label: { en: 'Carryover', ar: 'الانجراف مع البخار' },
        body: {
          en: 'High dissolved solids or poor drum conditions allow boiler water to carry over into the steam, contaminating the process and depositing in the steam system.',
          ar: 'يسمح ارتفاع المواد الصلبة الذائبة أو سوء ظروف الجسم بانجراف مياه الغلاية مع البخار، فيلوث العملية ويترسب في نظام البخار.',
        },
      },
      {
        id: 'blowdown',
        icon: 'energy',
        label: { en: 'Blowdown losses', ar: 'فواقد التصريف' },
        body: {
          en: 'Every unit of blowdown discharges water that has been softened, deaerated, chemically treated and heated to saturation. Blowdown is a thermal loss as much as a water loss.',
          ar: 'كل وحدة تصريف تُخرج مياهًا جرى تليينها ونزع الغازات منها ومعالجتها كيميائيًا وتسخينها حتى التشبع. فالتصريف فقد حراري بقدر ما هو فقد مائي.',
        },
      },
      {
        id: 'control',
        icon: 'controller',
        label: { en: 'Manual blowdown control', ar: 'التحكم اليدوي في التصريف' },
        body: {
          en: 'Blowdown on a fixed schedule is either wasting energy or allowing dissolved solids to climb. Only a measured value can hold the correct level.',
          ar: 'التصريف بجدول ثابت إما يهدر الطاقة أو يسمح بارتفاع المواد الصلبة الذائبة. ولا يثبّت المستوى الصحيح إلا قيمة مقاسة.',
        },
      },
    ],
    risks: [
      { id: 'tube', icon: 'shield', label: { en: 'Tube failure', ar: 'تلف الأنابيب' }, body: { en: 'Under-deposit overheating and oxygen pitting are the two most common causes of boiler tube damage.', ar: 'فرط التسخين تحت الرواسب والتنقّر بالأكسجين أكثر سببين شيوعًا لتلف أنابيب الغلايات.' } },
      { id: 'fuel', icon: 'energy', label: { en: 'Higher fuel consumption', ar: 'ارتفاع استهلاك الوقود' }, body: { en: 'Insulating deposits and excessive blowdown both increase the fuel needed for the same steam output.', ar: 'ترفع الرواسب العازلة والتصريف الزائد كلاهما الوقود اللازم لإنتاج القدر نفسه من البخار.' } },
      { id: 'production', icon: 'factory', label: { en: 'Interrupted steam supply', ar: 'انقطاع إمداد البخار' }, body: { en: 'For most process plants the boiler is a single point of failure for production.', ar: 'في معظم المنشآت الإنتاجية، تمثل الغلاية نقطة فشل منفردة للإنتاج.' } },
      { id: 'safety', icon: 'wrench', label: { en: 'Inspection and compliance findings', ar: 'ملاحظات الفحص والمطابقة' }, body: { en: 'Internal condition is examined at statutory inspection, and deposits or corrosion become a documented problem.', ar: 'تُفحَص الحالة الداخلية في التفتيش النظامي، فتتحول الرواسب أو التآكل إلى مشكلة موثقة.' } },
    ],
    approach: [
      { id: 'pretreat', icon: 'filter', label: { en: 'Protect the feedwater', ar: 'حماية مياه التغذية' }, body: { en: 'Softening, filtration and deaeration are assessed first — chemistry cannot economically correct a make-up problem that should have been removed upstream.', ar: 'تُقيَّم التلبية والترشيح ونزع الغازات أولًا — فالكيمياء لا تصحح اقتصاديًا مشكلة في مياه التعويض كان ينبغي إزالتها قبلها.' } },
      { id: 'internal', icon: 'flask', label: { en: 'Internal treatment', ar: 'المعالجة الداخلية' }, body: { en: 'Oxygen scavenging, deposit control and alkalinity management are selected for the operating pressure and the actual feedwater quality.', ar: 'يُختار كاسح الأكسجين والتحكم في الرواسب وإدارة القلوية وفق ضغط التشغيل وجودة مياه التغذية الفعلية.' } },
      { id: 'condensate', icon: 'recycle', label: { en: 'Treat the return', ar: 'معالجة خط العودة' }, body: { en: 'Condensate protection keeps returned water usable and stops the return line becoming the boiler’s iron source.', ar: 'تحافظ حماية المتكثفات على صلاحية المياه العائدة وتمنع خط العودة من أن يصبح مصدر الحديد للغلاية.' } },
      { id: 'control', icon: 'controller', label: { en: 'Control blowdown', ar: 'التحكم في التصريف' }, body: { en: 'Conductivity-controlled blowdown holds dissolved solids at the specified limit without discharging more heat than necessary.', ar: 'يُبقي التصريف المحكوم بالتوصيلية المواد الصلبة الذائبة عند الحد المحدد دون تصريف حرارة أكثر من اللازم.' } },
      { id: 'verify', icon: 'gauge', label: { en: 'Verify and record', ar: 'التحقق والتسجيل' }, body: { en: 'Routine testing against the programme’s control limits, logged, so drift is visible before it becomes damage.', ar: 'اختبار روتيني مقابل حدود تحكم البرنامج، مع التسجيل، ليصبح الانحراف مرئيًا قبل أن يتحول إلى ضرر.' } },
    ],
    systemFlow: [
      { id: 'makeup', label: { en: 'Make-Up Water', ar: 'مياه التعويض' }, caption: { en: 'Softened and filtered', ar: 'مُليّنة ومرشّحة' }, icon: 'droplet' },
      { id: 'feedwater', label: { en: 'Feedwater', ar: 'مياه التغذية' }, caption: { en: 'Deaerated and treated', ar: 'منزوعة الغازات ومعالجة' }, icon: 'flask', partner: 'kurita' },
      { id: 'boiler', label: { en: 'Boiler', ar: 'الغلاية' }, caption: { en: 'Concentration occurs', ar: 'يحدث التركيز' }, icon: 'boiler' },
      { id: 'steam', label: { en: 'Steam', ar: 'البخار' }, caption: { en: 'Delivered to process', ar: 'يُسلَّم للعملية' }, icon: 'energy' },
      { id: 'condensate', label: { en: 'Condensate', ar: 'المتكثفات' }, caption: { en: 'Protected from CO₂', ar: 'محمية من ثاني أكسيد الكربون' }, icon: 'recycle' },
      { id: 'return', label: { en: 'Return', ar: 'العودة' }, caption: { en: 'Recovered to feedwater', ar: 'تُستعاد لمياه التغذية' }, icon: 'flow' },
      { id: 'blowdown', label: { en: 'Blowdown Control', ar: 'التحكم في التصريف' }, caption: { en: 'By conductivity', ar: 'وفق التوصيلية' }, icon: 'controller', partner: 'walchem', href: '/technologies/monitoring-control' },
    ],
    technologies: ['water-treatment-chemicals', 'chemical-dosing', 'sensors-measurement', 'monitoring-control', 'water-analysis'],
    services: ['water-analysis', 'chemical-treatment-programmes', 'system-assessment', 'preventive-maintenance', 'monitoring-reporting'],
    industries: ['manufacturing', 'food-beverage', 'pharmaceutical-cosmetics', 'power-utilities', 'hospitality', 'chemical-petrochemical'],
    products: ['kurita-cetamine', 'walchem-w100', 'walchem-conductivity-sensors', 'walchem-e-series', 'walchem-intuition-6'],
    projects: ['boiler-programme-review'],
    articles: ['boiler-blowdown-energy', 'how-corrosion-develops', 'water-analysis-before-treatment'],
    problemTags: ['scale', 'corrosion', 'reliability', 'performance', 'water-loss', 'chemical-consumption'],
    goalTags: ['protect-equipment', 'improve-efficiency', 'reduce-water', 'improve-reliability', 'improve-control'],
    cta: { en: 'Talk to a Boiler Water Specialist', ar: 'تحدث إلى متخصص مياه غلايات' },
  },

  /* ====================================================================== */
  {
    slug: 'ro-membranes',
    status: 'published',
    title: { en: 'RO & Membranes', ar: 'التناضح العكسي والأغشية' },
    headline: { en: 'Protect Membranes. Preserve Performance.', ar: 'احمِ الأغشية. حافظ على الأداء.' },
    summary: {
      en: 'Protect membrane systems against fouling and scaling while supporting consistent performance.',
      ar: 'حماية أنظمة الأغشية من الاتساخ والترسب مع الحفاظ على أداء ثابت.',
    },
    metaTitle: { en: 'RO & Membrane Treatment Solutions | C-Water Egypt', ar: 'حلول التناضح العكسي ومعالجة الأغشية | C-Water مصر' },
    metaDescription: {
      en: 'RO treatment as one strategy: pretreatment and filtration, antiscalant selection, cleaning regime, normalised monitoring and recovery optimisation.',
      ar: 'معالجة التناضح العكسي كاستراتيجية واحدة: المعالجة الأولية والترشيح، واختيار مانع الترسب، ونظام التنظيف، والمراقبة المعيارية، وتحسين معدل الاستعادة.',
    },
    intro: {
      en: 'RO performance depends on everything that happens before and around the membrane. C-Water connects pretreatment, filtration, chemical protection, RO, monitoring and optimisation into one treatment strategy.',
      ar: 'يعتمد أداء التناضح العكسي على كل ما يحدث قبل الغشاء وحوله. تربط C-Water المعالجة الأولية والترشيح والحماية الكيميائية والتناضح العكسي والمراقبة والتحسين في استراتيجية معالجة واحدة.',
    },
    whyItMatters: {
      en: 'Membranes are consumables with a long expected life and a short achieved one when the conditions are wrong. Replacement cost is visible; the cost that usually dominates is the energy spent pushing water through a fouled element, the water lost to a reduced recovery, and the production interrupted by an unplanned clean.',
      ar: 'الأغشية مواد استهلاكية بعمر متوقع طويل وعمر فعلي قصير حين تكون الظروف خاطئة. وتكلفة الاستبدال ظاهرة، لكن ما يهيمن عادةً هو الطاقة المبذولة لدفع المياه عبر عنصر متسخ، والمياه المفقودة بانخفاض معدل الاستعادة، والإنتاج المتوقف بسبب تنظيف غير مخطط.',
    },
    problems: [
      { id: 'fouling', icon: 'fouling', label: { en: 'Particulate and biological fouling', ar: 'اتساخ جسيمي وبيولوجي' }, body: { en: 'Solids and biofilm accumulate on the feed side, raising differential pressure across the stage and reducing the flow the system can produce.', ar: 'تتراكم المواد الصلبة والأغشية الحيوية على جانب التغذية، فيرتفع فرق الضغط عبر المرحلة وينخفض التدفق الذي ينتجه النظام.' } },
      { id: 'scaling', icon: 'scale', label: { en: 'Scaling in the concentrate', ar: 'ترسب في تيار المركّز' }, body: { en: 'Sparingly soluble salts exceed saturation in the reject stream and deposit on the last elements first.', ar: 'تتجاوز الأملاح ضعيفة الذوبان حد التشبع في تيار الرفض فتترسب على العناصر الأخيرة أولًا.' } },
      { id: 'dp', icon: 'gauge', label: { en: 'Rising differential pressure', ar: 'ارتفاع فرق الضغط' }, body: { en: 'The clearest early signal that something is accumulating — and the one most often noticed only after it has become expensive.', ar: 'أوضح إشارة مبكرة على تراكم شيء ما — وهي الأكثر شيوعًا في ملاحظتها بعد أن تصبح مكلفة.' } },
      { id: 'cleaning', icon: 'recycle', label: { en: 'Frequent cleaning', ar: 'تكرار التنظيف' }, body: { en: 'Every clean costs downtime, chemical and a small amount of membrane life. Rising frequency is a pretreatment message, not a cleaning problem.', ar: 'كل تنظيف يكلف توقفًا وكيماويات وقدرًا صغيرًا من عمر الغشاء. وارتفاع التكرار رسالة من المعالجة الأولية لا مشكلة في التنظيف.' } },
      { id: 'recovery', icon: 'droplet', label: { en: 'Reduced recovery', ar: 'انخفاض معدل الاستعادة' }, body: { en: 'Operating at lower recovery to avoid scaling means producing the same permeate from more feed water.', ar: 'التشغيل عند استعادة أقل لتجنب الترسب يعني إنتاج القدر نفسه من النفاذ من كمية تغذية أكبر.' } },
      { id: 'quality', icon: 'flow', label: { en: 'Inconsistent permeate quality', ar: 'تذبذب جودة المياه المنتجة' }, body: { en: 'Rising salt passage points to membrane damage or scaling rather than to fouling, and the distinction changes the response entirely.', ar: 'يشير ارتفاع تسرب الأملاح إلى تلف الغشاء أو الترسب لا إلى الاتساخ، وهذا التمييز يغيّر الاستجابة كليًا.' } },
    ],
    risks: [
      { id: 'life', icon: 'shield', label: { en: 'Shortened membrane life', ar: 'قِصر عمر الغشاء' }, body: { en: 'Repeated aggressive cleaning and chronic fouling both shorten the element’s useful life.', ar: 'يقصّر التنظيف العنيف المتكرر والاتساخ المزمن كلاهما عمر العنصر المفيد.' } },
      { id: 'energy', icon: 'energy', label: { en: 'Higher specific energy', ar: 'ارتفاع الطاقة النوعية' }, body: { en: 'A fouled system needs more pressure for the same output.', ar: 'يحتاج النظام المتسخ ضغطًا أعلى للحصول على الإنتاج نفسه.' } },
      { id: 'supply', icon: 'factory', label: { en: 'Interrupted water supply', ar: 'انقطاع إمداد المياه' }, body: { en: 'Where RO feeds a process or a boiler, its availability defines the plant’s availability.', ar: 'حيث يغذي التناضح العكسي عملية أو غلاية، تحدد جاهزيته جاهزية المنشأة.' } },
      { id: 'cost', icon: 'wrench', label: { en: 'Unplanned intervention', ar: 'تدخل غير مخطط' }, body: { en: 'Emergency cleaning and element replacement rarely happen at a convenient moment.', ar: 'نادرًا ما يقع التنظيف الطارئ واستبدال العناصر في وقت مناسب.' } },
    ],
    approach: [
      { id: 'characterise', icon: 'lab', label: { en: 'Characterise the feed', ar: 'توصيف مياه التغذية' }, body: { en: 'Full analysis plus SDI, turbidity and organic load. Projection software is only as good as the water data behind it.', ar: 'تحليل كامل إضافة إلى SDI والعكارة والحمل العضوي. فبرنامج التوقعات لا يفوق جودة بيانات المياه التي يستند إليها.' } },
      { id: 'pretreat', icon: 'filter', label: { en: 'Fix pretreatment first', ar: 'إصلاح المعالجة الأولية أولًا' }, body: { en: 'Filtration degree, oxidant removal and biological control are settled before antiscalant is considered.', ar: 'تُحسم درجة الترشيح وإزالة المؤكسدات والتحكم البيولوجي قبل التفكير في مانع الترسب.' } },
      { id: 'protect', icon: 'flask', label: { en: 'Select against the concentrate', ar: 'الاختيار وفق كيمياء المركّز' }, body: { en: 'Antiscalant is chosen for the chemistry at the tail of the system at the intended recovery, not for the feed.', ar: 'يُختار مانع الترسب وفق الكيمياء في نهاية المنظومة عند معدل الاستعادة المستهدف، لا وفق التغذية.' } },
      { id: 'monitor', icon: 'monitor', label: { en: 'Normalise the data', ar: 'معايرة البيانات' }, body: { en: 'Normalised flow, salt passage and differential pressure separate real decline from temperature and pressure variation.', ar: 'يفصل التدفق وتسرب الأملاح وفرق الضغط المعيارية بين التدهور الحقيقي وتغيرات الحرارة والضغط.' } },
      { id: 'clean', icon: 'recycle', label: { en: 'Clean on diagnosis', ar: 'التنظيف بناءً على تشخيص' }, body: { en: 'The cleaning chemistry follows what the data says is accumulating, and is triggered by a threshold rather than a calendar.', ar: 'تتبع كيمياء التنظيف ما تشير إليه البيانات من تراكم، ويُطلق التنظيف بعتبة محددة لا بجدول زمني.' } },
    ],
    systemFlow: [
      { id: 'source', label: { en: 'Source Water', ar: 'مياه المصدر' }, caption: { en: 'Characterised', ar: 'مُوصّفة' }, icon: 'droplet' },
      { id: 'pretreatment', label: { en: 'Pretreatment', ar: 'المعالجة الأولية' }, caption: { en: 'Bulk load removed', ar: 'إزالة الحمل الأكبر' }, icon: 'filter', partner: 'timex', href: '/technologies/filtration' },
      { id: 'cartridge', label: { en: 'Cartridge Filtration', ar: 'الترشيح بالخراطيش' }, caption: { en: 'Final barrier', ar: 'الحاجز الأخير' }, icon: 'filter', partner: 'timex' },
      { id: 'antiscalant', label: { en: 'Chemical Protection', ar: 'الحماية الكيميائية' }, caption: { en: 'Antiscalant dosed', ar: 'ضخ مانع الترسب' }, icon: 'flask', partner: 'kurita', href: '/technologies/water-treatment-chemicals' },
      { id: 'ro', label: { en: 'RO', ar: 'التناضح العكسي' }, caption: { en: 'Separation', ar: 'الفصل' }, icon: 'membrane', href: '/technologies/reverse-osmosis' },
      { id: 'monitoring', label: { en: 'Monitoring', ar: 'المراقبة' }, caption: { en: 'Normalised data', ar: 'بيانات معيارية' }, icon: 'monitor', partner: 'walchem', href: '/technologies/monitoring-control' },
      { id: 'cip', label: { en: 'Cleaning', ar: 'التنظيف' }, caption: { en: 'On diagnosis', ar: 'وفق التشخيص' }, icon: 'recycle' },
      { id: 'optimise', label: { en: 'Optimisation', ar: 'التحسين' }, caption: { en: 'Recovery reviewed', ar: 'مراجعة معدل الاستعادة' }, icon: 'optimize' },
    ],
    technologies: ['reverse-osmosis', 'filtration', 'water-treatment-chemicals', 'sensors-measurement', 'monitoring-control', 'water-analysis'],
    services: ['water-analysis', 'system-assessment', 'engineering-design', 'optimization', 'technical-support'],
    industries: ['manufacturing', 'food-beverage', 'pharmaceutical-cosmetics', 'healthcare', 'power-utilities', 'oil-gas'],
    products: ['kurita-kuriverter-ik110', 'timex-cartridge-filter', 'timex-svf-series', 'walchem-conductivity-sensors', 'walchem-e-series'],
    projects: ['ro-pretreatment-redesign'],
    articles: ['what-causes-ro-fouling', 'ro-pretreatment-failure', 'filtration-protects-downstream'],
    problemTags: ['fouling', 'scale', 'microbiology', 'filtration', 'performance', 'maintenance', 'water-loss'],
    goalTags: ['protect-equipment', 'improve-efficiency', 'reduce-water', 'optimize-existing', 'reduce-maintenance'],
    cta: { en: 'Discuss Your RO System', ar: 'ناقش نظام التناضح العكسي لديك' },
  },

  /* ====================================================================== */
  {
    slug: 'process-water',
    status: 'published',
    title: { en: 'Process Water', ar: 'مياه العمليات' },
    headline: { en: 'Water Quality Built Around Your Process.', ar: 'جودة مياه مبنية حول عمليتك الإنتاجية.' },
    summary: {
      en: 'Engineer water quality around the needs of the process, not around a standard specification.',
      ar: 'هندسة جودة المياه وفق احتياجات العملية، لا وفق مواصفة قياسية جاهزة.',
    },
    metaTitle: { en: 'Process Water Treatment Solutions | C-Water Egypt', ar: 'حلول معالجة مياه العمليات | C-Water مصر' },
    metaDescription: {
      en: 'Process water treatment designed from the quality target backwards: source characterisation, treatment train selection, control strategy and verification.',
      ar: 'معالجة مياه العمليات مصممة انطلاقًا من هدف الجودة إلى الوراء: توصيف المصدر، واختيار سلسلة المعالجة، واستراتيجية التحكم، والتحقق.',
    },
    intro: {
      en: 'Your process determines the water requirements. C-Water designs treatment strategies around source water, process requirements, equipment, chemistry, quality targets and operating constraints.',
      ar: 'عمليتك الإنتاجية هي التي تحدد متطلبات المياه. تصمم C-Water استراتيجيات المعالجة حول مياه المصدر ومتطلبات العملية والمعدات والكيمياء وأهداف الجودة وقيود التشغيل.',
    },
    whyItMatters: {
      en: 'Process water is the only water in a plant whose specification is written by something other than the water itself. A rinse step, a formulation, a cooling jacket or a product-contact surface each define what "good enough" means — and defining it too tightly is as costly as defining it too loosely.',
      ar: 'مياه العمليات هي المياه الوحيدة في المنشأة التي تكتب مواصفتها جهة أخرى غير المياه نفسها. فخطوة شطف أو تركيبة أو قميص تبريد أو سطح ملامس للمنتج، كل منها يحدد معنى «جيد بما يكفي» — والمبالغة في التشدد مكلفة بقدر المبالغة في التساهل.',
    },
    problems: [
      { id: 'variability', icon: 'flow', label: { en: 'Source water variability', ar: 'تذبذب مياه المصدر' }, body: { en: 'Seasonal or supply-driven changes in the incoming water push a fixed treatment train outside the range it was designed for.', ar: 'تدفع التغيرات الموسمية أو المرتبطة بالإمداد في المياه الواردة سلسلةَ معالجة ثابتة خارج النطاق الذي صُممت له.' } },
      { id: 'spec', icon: 'clipboard', label: { en: 'Unclear quality target', ar: 'هدف جودة غير واضح' }, body: { en: 'Where the specification is inherited rather than derived, plants often treat to a standard the process never required.', ar: 'حين تكون المواصفة موروثة لا مشتقة، تعالج المنشآت غالبًا وفق معيار لم تطلبه العملية أصلًا.' } },
      { id: 'hardness', icon: 'scale', label: { en: 'Hardness and deposits', ar: 'العسر والرواسب' }, body: { en: 'Deposits on product-contact and heat-transfer surfaces affect both equipment and, in some processes, the product.', ar: 'تؤثر الرواسب على الأسطح الملامسة للمنتج وأسطح التبادل الحراري في المعدات، وفي بعض العمليات في المنتج نفسه.' } },
      { id: 'micro', icon: 'biology', label: { en: 'Microbiological control', ar: 'التحكم الميكروبيولوجي' }, body: { en: 'Storage volumes, dead legs and intermittent demand create the conditions for growth between production runs.', ar: 'تخلق أحجام التخزين والفروع الميتة والطلب المتقطع ظروف النمو بين دورات الإنتاج.' } },
      { id: 'reuse', icon: 'recycle', label: { en: 'Reuse constraints', ar: 'قيود إعادة الاستخدام' }, body: { en: 'Recovering water changes its chemistry each pass, and the accumulation has to be designed for rather than discovered.', ar: 'تغيّر استعادة المياه كيمياءها في كل دورة، ويجب تصميم النظام لهذا التراكم لا اكتشافه لاحقًا.' } },
    ],
    risks: [
      { id: 'quality', icon: 'shield', label: { en: 'Product quality deviation', ar: 'انحراف جودة المنتج' }, body: { en: 'Where water touches the product, water variability becomes product variability.', ar: 'حيث تلامس المياه المنتج، يتحول تذبذب المياه إلى تذبذب في المنتج.' } },
      { id: 'equipment', icon: 'wrench', label: { en: 'Equipment fouling', ar: 'اتساخ المعدات' }, body: { en: 'Process equipment is often harder and more costly to clean than a utility system.', ar: 'غالبًا ما يكون تنظيف معدات الإنتاج أصعب وأكثر كلفة من أنظمة المرافق.' } },
      { id: 'cost', icon: 'energy', label: { en: 'Over-treatment cost', ar: 'تكلفة الإفراط في المعالجة' }, body: { en: 'Treating to a higher standard than the process needs is a permanent operating cost.', ar: 'المعالجة إلى معيار أعلى مما تحتاجه العملية تكلفة تشغيلية دائمة.' } },
    ],
    approach: [
      { id: 'target', icon: 'clipboard', label: { en: 'Define the target', ar: 'تحديد الهدف' }, body: { en: 'Start from the parameters the process actually cares about and the tolerance around each one.', ar: 'ابدأ من المتغيرات التي تهم العملية فعلًا ومدى التفاوت المسموح لكل منها.' } },
      { id: 'source', icon: 'lab', label: { en: 'Characterise the source', ar: 'توصيف المصدر' }, body: { en: 'Including its range across a year, not a single sample on a good day.', ar: 'بما في ذلك نطاقه على مدار عام، لا عينة واحدة في يوم جيد.' } },
      { id: 'train', icon: 'network', label: { en: 'Select the treatment train', ar: 'اختيار سلسلة المعالجة' }, body: { en: 'Sequence and redundancy are chosen against the gap between source and target, with the cost of each stage understood.', ar: 'يُختار التسلسل والاحتياطية وفق الفجوة بين المصدر والهدف، مع فهم تكلفة كل مرحلة.' } },
      { id: 'control', icon: 'controller', label: { en: 'Control and verify', ar: 'التحكم والتحقق' }, body: { en: 'Online measurement at the point of use confirms the specification is being met when production needs it, not on average.', ar: 'يؤكد القياس المتصل عند نقطة الاستخدام تحقق المواصفة عند حاجة الإنتاج إليها، لا في المتوسط.' } },
    ],
    systemFlow: [
      { id: 'source', label: { en: 'Source Water', ar: 'مياه المصدر' }, caption: { en: 'Range established', ar: 'تحديد النطاق' }, icon: 'droplet' },
      { id: 'filtration', label: { en: 'Filtration', ar: 'الترشيح' }, caption: { en: 'Solids removed', ar: 'إزالة المواد الصلبة' }, icon: 'filter', partner: 'timex' },
      { id: 'softening', label: { en: 'Conditioning', ar: 'التهيئة' }, caption: { en: 'Hardness managed', ar: 'إدارة العسر' }, icon: 'flask' },
      { id: 'polish', label: { en: 'Polishing', ar: 'التنقية النهائية' }, caption: { en: 'To specification', ar: 'حتى المواصفة' }, icon: 'membrane' },
      { id: 'storage', label: { en: 'Storage', ar: 'التخزين' }, caption: { en: 'Protected volume', ar: 'حجم محمي' }, icon: 'shield' },
      { id: 'point-of-use', label: { en: 'Point of Use', ar: 'نقطة الاستخدام' }, caption: { en: 'Verified quality', ar: 'جودة مُتحقَّق منها' }, icon: 'gauge', partner: 'walchem' },
    ],
    technologies: ['filtration', 'reverse-osmosis', 'water-treatment-chemicals', 'sensors-measurement', 'water-analysis', 'engineering-integration'],
    services: ['water-analysis', 'engineering-design', 'system-assessment', 'installation-commissioning', 'optimization'],
    industries: ['manufacturing', 'food-beverage', 'pharmaceutical-cosmetics', 'chemical-petrochemical', 'healthcare'],
    products: ['timex-treatment-systems', 'timex-cartridge-filter', 'walchem-intuition-9', 'walchem-conductivity-sensors'],
    projects: ['process-water-standardisation'],
    articles: ['water-analysis-before-treatment', 'designing-a-treatment-program', 'filtration-protects-downstream'],
    problemTags: ['filtration', 'scale', 'microbiology', 'performance', 'reliability', 'chemical-consumption'],
    goalTags: ['design-new', 'improve-reliability', 'improve-efficiency', 'optimize-existing', 'improve-control'],
    cta: { en: 'Discuss Your Process', ar: 'ناقش عمليتك الإنتاجية' },
  },

  /* ====================================================================== */
  {
    slug: 'wastewater',
    status: 'published',
    title: { en: 'Wastewater', ar: 'مياه الصرف' },
    headline: { en: 'Better Treatment Starts With the Right Understanding.', ar: 'المعالجة الأفضل تبدأ من الفهم الصحيح.' },
    summary: {
      en: 'Treatment strategies that support water quality, compliance and operational reliability.',
      ar: 'استراتيجيات معالجة تدعم جودة المياه والمطابقة وموثوقية التشغيل.',
    },
    metaTitle: { en: 'Industrial Wastewater Treatment Solutions | C-Water Egypt', ar: 'حلول معالجة مياه الصرف الصناعي | C-Water مصر' },
    metaDescription: {
      en: 'Industrial wastewater treatment from characterisation onwards: pretreatment, chemical treatment, filtration, flotation, process control and monitoring.',
      ar: 'معالجة مياه الصرف الصناعي بدءًا من التوصيف: المعالجة الأولية، والمعالجة الكيميائية، والترشيح، والتعويم، والتحكم في العملية، والمراقبة.',
    },
    intro: {
      en: 'C-Water approaches wastewater as both a treatment challenge and an operational system — characterisation, pretreatment, filtration, chemical treatment, control, monitoring and optimisation.',
      ar: 'تتعامل C-Water مع مياه الصرف بوصفها تحديًا للمعالجة ونظامًا تشغيليًا في آنٍ واحد — التوصيف، والمعالجة الأولية، والترشيح، والمعالجة الكيميائية، والتحكم، والمراقبة، والتحسين.',
    },
    whyItMatters: {
      en: 'Effluent treatment is the part of a plant most often designed for a load that no longer exists. Production changes, product mixes shift, and a plant built for a steady average finds itself handling a variable peak. The result is usually chemical overdosing to stay compliant, because the alternative is a discharge that is not.',
      ar: 'معالجة المخلفات السائلة هي الجزء الأكثر شيوعًا في المنشآت من حيث تصميمه لحمل لم يعد قائمًا. فالإنتاج يتغير، ومزيج المنتجات يتبدل، فتجد محطة بُنيت لمتوسط ثابت نفسها تتعامل مع ذروة متغيرة. والنتيجة غالبًا إفراط في الجرعات للحفاظ على المطابقة، لأن البديل تصريف غير مطابق.',
    },
    problems: [
      { id: 'characterisation', icon: 'lab', label: { en: 'Unknown load', ar: 'حمل غير معروف' }, body: { en: 'Without a current characterisation, treatment is designed against an assumption. Load varies by shift, product and season.', ar: 'بلا توصيف حديث، تُصمَّم المعالجة على افتراض. والحمل يتغير بحسب الوردية والمنتج والموسم.' } },
      { id: 'solids', icon: 'filter', label: { en: 'Suspended solids and oil', ar: 'مواد صلبة عالقة وزيوت' }, body: { en: 'Solids and free oil overload downstream stages that were never intended to remove them.', ar: 'تُحمّل المواد الصلبة والزيوت الحرة المراحل اللاحقة بما لم تُصمَّم لإزالته.' } },
      { id: 'chemical', icon: 'flask', label: { en: 'Chemical overconsumption', ar: 'الإفراط في استهلاك الكيماويات' }, body: { en: 'Coagulant and polymer dosed to worst-case load costs continuously, even when the actual load is well below it.', ar: 'ضخ المروّبات والبوليمرات وفق أسوأ حمل يكلّف باستمرار، حتى حين يكون الحمل الفعلي أقل بكثير.' } },
      { id: 'compliance', icon: 'clipboard', label: { en: 'Discharge compliance', ar: 'مطابقة التصريف' }, body: { en: 'Consent limits are checked at a point in time; a treatment system has to hold them across every operating condition.', ar: 'تُفحَص حدود التصريف في لحظة معينة، بينما يجب أن يحافظ نظام المعالجة عليها في كل ظروف التشغيل.' } },
      { id: 'sludge', icon: 'recycle', label: { en: 'Sludge handling', ar: 'التعامل مع الحمأة' }, body: { en: 'Volume and dewaterability are decided by the chemistry chosen upstream, and are often the largest running cost.', ar: 'يحدد الاختيار الكيميائي في المراحل السابقة حجم الحمأة وقابليتها لنزع الماء، وهي غالبًا أكبر تكلفة تشغيلية.' } },
    ],
    risks: [
      { id: 'regulatory', icon: 'shield', label: { en: 'Regulatory exposure', ar: 'التعرض التنظيمي' }, body: { en: 'A non-compliant discharge is a reportable event with consequences beyond the treatment plant.', ar: 'التصريف غير المطابق حدث يستوجب الإبلاغ وله تبعات تتجاوز محطة المعالجة.' } },
      { id: 'cost', icon: 'energy', label: { en: 'Operating cost', ar: 'تكلفة التشغيل' }, body: { en: 'Chemical, energy and sludge disposal together usually exceed the capital cost within a few years.', ar: 'تتجاوز الكيماويات والطاقة والتخلص من الحمأة مجتمعةً تكلفةَ رأس المال عادةً خلال بضع سنوات.' } },
      { id: 'production', icon: 'factory', label: { en: 'Production constraint', ar: 'قيد على الإنتاج' }, body: { en: 'When effluent capacity is the bottleneck, it limits what the plant can produce.', ar: 'حين تكون سعة المعالجة هي عنق الزجاجة، فإنها تحد مما يمكن للمنشأة إنتاجه.' } },
    ],
    approach: [
      { id: 'characterise', icon: 'lab', label: { en: 'Characterise', ar: 'التوصيف' }, body: { en: 'Composite and grab sampling across real operating conditions, including the shifts and products that produce the peaks.', ar: 'أخذ عينات مركّبة ولحظية عبر ظروف تشغيل حقيقية، بما فيها الورديات والمنتجات التي تنتج الذروات.' } },
      { id: 'pretreat', icon: 'filter', label: { en: 'Pretreat', ar: 'المعالجة الأولية' }, body: { en: 'Screening, separation and flotation remove the load that would otherwise be treated chemically at higher cost.', ar: 'تزيل الغربلة والفصل والتعويم الحملَ الذي كان سيُعالج كيميائيًا بتكلفة أعلى.' } },
      { id: 'treat', icon: 'flask', label: { en: 'Treat', ar: 'المعالجة' }, body: { en: 'Coagulant and polymer selected by jar testing against the actual effluent, not by general specification.', ar: 'يُختار المروّب والبوليمر باختبار الجرّة على المخلفات الفعلية، لا وفق مواصفة عامة.' } },
      { id: 'control', icon: 'controller', label: { en: 'Control', ar: 'التحكم' }, body: { en: 'Dosing driven by measured load lets chemical consumption follow the plant rather than its worst day.', ar: 'الجرعات المدفوعة بالحمل المقاس تجعل استهلاك الكيماويات يتبع المنشأة لا أسوأ أيامها.' } },
      { id: 'monitor', icon: 'monitor', label: { en: 'Monitor', ar: 'المراقبة' }, body: { en: 'Continuous measurement at the discharge point provides both compliance evidence and early warning.', ar: 'يوفر القياس المستمر عند نقطة التصريف دليل المطابقة وإنذارًا مبكرًا في آن واحد.' } },
    ],
    systemFlow: [
      { id: 'influent', label: { en: 'Influent', ar: 'المياه الواردة' }, caption: { en: 'Load characterised', ar: 'توصيف الحمل' }, icon: 'droplet' },
      { id: 'screening', label: { en: 'Screening', ar: 'الغربلة' }, caption: { en: 'Coarse solids out', ar: 'إخراج الصلب الخشن' }, icon: 'filter', partner: 'timex' },
      { id: 'flotation', label: { en: 'Flotation / Separation', ar: 'التعويم / الفصل' }, caption: { en: 'Oil and fines removed', ar: 'إزالة الزيوت والدقائق' }, icon: 'recycle', partner: 'timex' },
      { id: 'chemical', label: { en: 'Chemical Treatment', ar: 'المعالجة الكيميائية' }, caption: { en: 'Coagulation and floc', ar: 'الترويب والتندّف' }, icon: 'flask', partner: 'kurita' },
      { id: 'dosing', label: { en: 'Dosing Control', ar: 'التحكم في الجرعات' }, caption: { en: 'Follows load', ar: 'يتبع الحمل' }, icon: 'pump', partner: 'walchem' },
      { id: 'polish', label: { en: 'Polishing', ar: 'التنقية النهائية' }, caption: { en: 'To consent limit', ar: 'حتى حد التصريف' }, icon: 'membrane' },
      { id: 'discharge', label: { en: 'Discharge / Reuse', ar: 'التصريف / إعادة الاستخدام' }, caption: { en: 'Monitored', ar: 'مُراقَب' }, icon: 'monitor' },
    ],
    technologies: ['filtration', 'water-treatment-chemicals', 'chemical-dosing', 'sensors-measurement', 'monitoring-control', 'engineering-integration'],
    services: ['water-analysis', 'system-assessment', 'engineering-design', 'optimization', 'technical-support'],
    industries: ['manufacturing', 'food-beverage', 'chemical-petrochemical', 'oil-gas', 'government-municipal', 'pharmaceutical-cosmetics'],
    products: ['timex-daf', 'timex-drum-filter', 'timex-disc-filter', 'walchem-ix-series', 'walchem-intuition-9'],
    projects: ['effluent-dosing-control'],
    articles: ['designing-a-treatment-program', 'water-analysis-before-treatment'],
    problemTags: ['fouling', 'chemical-consumption', 'filtration', 'reliability', 'maintenance', 'performance'],
    goalTags: ['improve-control', 'improve-efficiency', 'reduce-water', 'optimize-existing', 'design-new'],
    cta: { en: 'Discuss Your Wastewater System', ar: 'ناقش نظام معالجة الصرف لديك' },
  },

  /* ====================================================================== */
  {
    slug: 'potable-water',
    status: 'published',
    title: { en: 'Potable Water', ar: 'مياه الشرب' },
    headline: { en: 'Water Quality You Can Rely On.', ar: 'جودة مياه يمكن الاعتماد عليها.' },
    summary: {
      en: 'Filtration, disinfection and monitoring for drinking water systems that have to be right every day.',
      ar: 'ترشيح وتطهير ومراقبة لأنظمة مياه الشرب التي يجب أن تكون سليمة كل يوم.',
    },
    metaTitle: { en: 'Potable & Drinking Water Treatment | C-Water Egypt', ar: 'معالجة مياه الشرب | C-Water مصر' },
    metaDescription: {
      en: 'Potable water treatment for commercial and institutional buildings: filtration, disinfection, residual control, storage protection and continuous monitoring.',
      ar: 'معالجة مياه الشرب للمباني التجارية والمؤسسية: الترشيح، والتطهير، والتحكم في المتبقي، وحماية التخزين، والمراقبة المستمرة.',
    },
    intro: {
      en: 'Drinking water systems are judged by their worst day. C-Water builds potable treatment around the source, the storage, the distribution and the point at which quality is actually verified.',
      ar: 'تُقاس أنظمة مياه الشرب بأسوأ أيامها. تبني C-Water معالجة مياه الشرب حول المصدر والتخزين والتوزيع والنقطة التي تُتحقَّق عندها الجودة فعليًا.',
    },
    whyItMatters: {
      en: 'In most buildings the treatment plant is not where potable quality is lost — the storage tank and the distribution network are. Residence time, temperature, stagnant branches and inadequate disinfectant residual do more damage than the incoming supply.',
      ar: 'في معظم المباني، لا تُفقد جودة مياه الشرب في محطة المعالجة، بل في خزان التخزين وشبكة التوزيع. فزمن المكوث ودرجة الحرارة والفروع الراكدة وضعف المتبقي المطهر تُحدث ضررًا أكبر من الإمداد الوارد.',
    },
    problems: [
      { id: 'turbidity', icon: 'filter', label: { en: 'Turbidity and particulates', ar: 'العكارة والجسيمات' }, body: { en: 'Particles shield organisms from disinfection and affect both appearance and taste.', ar: 'تحمي الجسيماتُ الكائناتِ من التطهير وتؤثر في المظهر والطعم معًا.' } },
      { id: 'residual', icon: 'sensor', label: { en: 'Inconsistent disinfectant residual', ar: 'تذبذب المتبقي المطهر' }, body: { en: 'Residual decays with time and temperature. A correct dose at the plant is not a correct residual at the far end of the network.', ar: 'يتحلل المتبقي مع الزمن والحرارة. فالجرعة الصحيحة عند المحطة ليست متبقيًا صحيحًا في أطراف الشبكة.' } },
      { id: 'storage', icon: 'droplet', label: { en: 'Storage and stagnation', ar: 'التخزين والركود' }, body: { en: 'Oversized tanks and low-demand branches increase residence time and give growth an opportunity.', ar: 'تزيد الخزانات المفرطة الحجم والفروع منخفضة الطلب زمنَ المكوث وتمنح النمو فرصته.' } },
      { id: 'taste', icon: 'flask', label: { en: 'Taste, odour and hardness', ar: 'الطعم والرائحة والعسر' }, body: { en: 'Acceptability matters. Water that meets a standard but is not drunk has not solved the problem.', ar: 'القبول مهم. فالمياه المطابقة للمعيار التي لا يشربها أحد لم تحل المشكلة.' } },
    ],
    risks: [
      { id: 'health', icon: 'shield', label: { en: 'Public health exposure', ar: 'التعرض لمخاطر الصحة العامة' }, body: { en: 'The consequence of failure in a potable system is categorically different from a utility system.', ar: 'عواقب الفشل في نظام مياه شرب تختلف نوعيًا عن نظام مرافق.' } },
      { id: 'compliance', icon: 'clipboard', label: { en: 'Regulatory and audit findings', ar: 'ملاحظات الجهات الرقابية والتدقيق' }, body: { en: 'Records and continuous evidence are usually required, not just periodic test certificates.', ar: 'عادةً ما تُطلب سجلات وأدلة مستمرة، لا مجرد شهادات فحص دورية.' } },
      { id: 'reputation', icon: 'factory', label: { en: 'Guest and occupant confidence', ar: 'ثقة النزلاء والشاغلين' }, body: { en: 'In hospitality and healthcare, water quality is visible to the customer.', ar: 'في الضيافة والرعاية الصحية، جودة المياه ظاهرة للعميل.' } },
    ],
    approach: [
      { id: 'source', icon: 'lab', label: { en: 'Verify the source', ar: 'التحقق من المصدر' }, body: { en: 'Full analysis of the incoming supply across its normal range, including microbiological indicators.', ar: 'تحليل كامل للإمداد الوارد عبر نطاقه المعتاد، بما في ذلك المؤشرات الميكروبيولوجية.' } },
      { id: 'barrier', icon: 'filter', label: { en: 'Establish barriers', ar: 'إقامة الحواجز' }, body: { en: 'Filtration and disinfection sized so that no single failure removes all protection.', ar: 'ترشيح وتطهير بأحجام تضمن ألا يزيل عطل واحد كل الحماية.' } },
      { id: 'residual', icon: 'controller', label: { en: 'Control the residual', ar: 'التحكم في المتبقي' }, body: { en: 'Dosing controlled against a measured residual, verified at the far point of the network rather than at the plant.', ar: 'جرعات محكومة وفق متبقٍ مقاس، ويُتحقَّق منها عند أبعد نقطة في الشبكة لا عند المحطة.' } },
      { id: 'storage', icon: 'shield', label: { en: 'Manage storage', ar: 'إدارة التخزين' }, body: { en: 'Turnover, temperature and tank condition reviewed alongside the treatment itself.', ar: 'مراجعة معدل التدوير ودرجة الحرارة وحالة الخزان جنبًا إلى جنب مع المعالجة نفسها.' } },
      { id: 'record', icon: 'monitor', label: { en: 'Record continuously', ar: 'التسجيل المستمر' }, body: { en: 'Logged online measurement provides the evidence trail that periodic sampling cannot.', ar: 'يوفر القياس المتصل المسجَّل مسار الأدلة الذي لا توفره العينات الدورية.' } },
    ],
    systemFlow: [
      { id: 'source', label: { en: 'Supply', ar: 'الإمداد' }, caption: { en: 'Verified', ar: 'مُتحقَّق منه' }, icon: 'droplet' },
      { id: 'filtration', label: { en: 'Filtration', ar: 'الترشيح' }, caption: { en: 'Turbidity barrier', ar: 'حاجز العكارة' }, icon: 'filter', partner: 'timex' },
      { id: 'disinfection', label: { en: 'Disinfection', ar: 'التطهير' }, caption: { en: 'Primary barrier', ar: 'الحاجز الأساسي' }, icon: 'flask' },
      { id: 'residual', label: { en: 'Residual Control', ar: 'التحكم في المتبقي' }, caption: { en: 'Measured feed', ar: 'ضخ مقاس' }, icon: 'sensor', partner: 'walchem' },
      { id: 'storage', label: { en: 'Storage', ar: 'التخزين' }, caption: { en: 'Turnover managed', ar: 'إدارة التدوير' }, icon: 'shield' },
      { id: 'network', label: { en: 'Distribution', ar: 'التوزيع' }, caption: { en: 'Verified at far point', ar: 'تحقق عند أبعد نقطة' }, icon: 'monitor' },
    ],
    technologies: ['filtration', 'sensors-measurement', 'monitoring-control', 'water-analysis', 'reverse-osmosis'],
    services: ['water-analysis', 'system-assessment', 'preventive-maintenance', 'monitoring-reporting'],
    industries: ['hospitality', 'healthcare', 'commercial-buildings', 'government-municipal', 'food-beverage'],
    products: ['timex-cartridge-filter', 'walchem-disinfection-sensors', 'walchem-intuition-6', 'timex-treatment-systems'],
    projects: [],
    articles: ['water-analysis-before-treatment', 'filtration-protects-downstream'],
    problemTags: ['microbiology', 'filtration', 'reliability', 'performance', 'maintenance'],
    goalTags: ['improve-reliability', 'improve-control', 'protect-equipment', 'design-new'],
    cta: { en: 'Discuss Your Water Quality Requirements', ar: 'ناقش متطلبات جودة المياه لديك' },
  },

  /* ====================================================================== */
  {
    slug: 'industrial-water',
    status: 'published',
    title: { en: 'Industrial Water', ar: 'المياه الصناعية' },
    headline: { en: 'Complex Systems Need Integrated Thinking.', ar: 'الأنظمة المعقدة تحتاج تفكيرًا متكاملًا.' },
    summary: {
      en: 'Integrated treatment strategies for sites running several water systems at once.',
      ar: 'استراتيجيات معالجة متكاملة للمواقع التي تشغّل عدة أنظمة مياه في آن واحد.',
    },
    metaTitle: { en: 'Industrial Water Treatment Solutions | C-Water Egypt', ar: 'حلول معالجة المياه الصناعية | C-Water مصر' },
    metaDescription: {
      en: 'Site-wide industrial water treatment: cooling, boiler, process and effluent systems assessed and controlled as one connected water balance.',
      ar: 'معالجة مياه صناعية على مستوى الموقع: أنظمة التبريد والغلايات والعمليات والمخلفات تُقيَّم وتُدار كميزان مائي واحد مترابط.',
    },
    intro: {
      en: 'For demanding industrial operations, treatment must account for process, chemistry, equipment, water, energy, risk, maintenance and production together.',
      ar: 'في العمليات الصناعية الشاقة، يجب أن تراعي المعالجة العملية والكيمياء والمعدات والمياه والطاقة والمخاطر والصيانة والإنتاج معًا.',
    },
    whyItMatters: {
      en: 'On a site with a cooling system, a boiler house, a process water plant and an effluent plant, the four are usually managed as four contracts. They are one water balance. Blowdown from one is often a candidate feed for another, and a change in make-up quality affects all of them at once.',
      ar: 'في موقع به نظام تبريد وغرفة غلايات ومحطة مياه عمليات ومحطة مخلفات، تُدار الأربعة عادةً كأربعة عقود. لكنها ميزان مائي واحد. فتصريف أحدها كثيرًا ما يصلح تغذية لآخر، وتغيّر جودة مياه التعويض يؤثر فيها جميعًا دفعة واحدة.',
    },
    problems: [
      { id: 'silos', icon: 'network', label: { en: 'Systems managed in isolation', ar: 'أنظمة تُدار بمعزل' }, body: { en: 'Separate suppliers, separate programmes and separate reporting hide the interactions between systems.', ar: 'تعدد الموردين والبرامج والتقارير يُخفي التفاعلات بين الأنظمة.' } },
      { id: 'balance', icon: 'flow', label: { en: 'No site water balance', ar: 'غياب ميزان مائي للموقع' }, body: { en: 'Without knowing where water enters, concentrates and leaves, reduction opportunities are invisible.', ar: 'بلا معرفة أين تدخل المياه وأين تتركز وأين تخرج، تبقى فرص الخفض غير مرئية.' } },
      { id: 'reuse', icon: 'recycle', label: { en: 'Unrealised reuse', ar: 'إعادة استخدام غير مُستغلة' }, body: { en: 'Streams that could feed a lower-grade duty are discharged because nobody has mapped the qualities against the demands.', ar: 'تُصرَّف تيارات كان يمكن أن تغذي استخدامًا أقل جودة لأن أحدًا لم يقارن الجودات بالاحتياجات.' } },
      { id: 'capability', icon: 'wrench', label: { en: 'Fragmented technical support', ar: 'دعم فني مجزّأ' }, body: { en: 'When something crosses system boundaries, no single supplier owns the answer.', ar: 'حين تتقاطع المشكلة مع حدود الأنظمة، لا يملك أي مورد منفرد الإجابة.' } },
    ],
    risks: [
      { id: 'cost', icon: 'energy', label: { en: 'Compounded operating cost', ar: 'تكلفة تشغيل مركّبة' }, body: { en: 'Inefficiency in each system adds up across water, chemical, energy and maintenance.', ar: 'تتراكم عدم الكفاءة في كل نظام عبر المياه والكيماويات والطاقة والصيانة.' } },
      { id: 'availability', icon: 'factory', label: { en: 'Production availability', ar: 'جاهزية الإنتاج' }, body: { en: 'Utilities failures stop production regardless of which utility failed.', ar: 'أعطال المرافق توقف الإنتاج أيًا كان المرفق المتعطل.' } },
      { id: 'water', icon: 'droplet', label: { en: 'Water security', ar: 'أمن المياه' }, body: { en: 'Sites with constrained or variable supply carry that risk into every system.', ar: 'المواقع ذات الإمداد المحدود أو المتقلب تحمل ذلك الخطر إلى كل نظام.' } },
    ],
    approach: [
      { id: 'map', icon: 'blueprint', label: { en: 'Map the water balance', ar: 'رسم الميزان المائي' }, body: { en: 'Every intake, transfer, concentration point and discharge across the site, quantified.', ar: 'تحديد كمي لكل مأخذ ونقل ونقطة تركيز وتصريف عبر الموقع.' } },
      { id: 'assess', icon: 'gauge', label: { en: 'Assess each system', ar: 'تقييم كل نظام' }, body: { en: 'Condition, control quality and treatment performance judged individually and then against each other.', ar: 'تُقيَّم الحالة وجودة التحكم وأداء المعالجة لكل نظام على حدة ثم في مقارنة بينها.' } },
      { id: 'prioritise', icon: 'clipboard', label: { en: 'Prioritise by impact', ar: 'الترتيب وفق الأثر' }, body: { en: 'Not everything is worth doing at once. The sequence follows risk and return, not system size.', ar: 'ليس كل شيء يستحق التنفيذ دفعة واحدة. ويتبع التسلسل المخاطر والعائد لا حجم النظام.' } },
      { id: 'standardise', icon: 'controller', label: { en: 'Standardise control', ar: 'توحيد التحكم' }, body: { en: 'Common instrumentation and reporting across systems makes the site legible to the people running it.', ar: 'توحيد الأجهزة والتقارير عبر الأنظمة يجعل الموقع مفهومًا لمن يشغّلونه.' } },
      { id: 'review', icon: 'optimize', label: { en: 'Review as one', ar: 'المراجعة ككل واحد' }, body: { en: 'A single technical review across all systems catches what four separate reports do not.', ar: 'مراجعة فنية واحدة لكل الأنظمة تلتقط ما تفوته أربعة تقارير منفصلة.' } },
    ],
    systemFlow: [
      { id: 'intake', label: { en: 'Site Intake', ar: 'مأخذ الموقع' }, caption: { en: 'Common source', ar: 'مصدر مشترك' }, icon: 'droplet' },
      { id: 'pretreatment', label: { en: 'Central Pretreatment', ar: 'معالجة أولية مركزية' }, caption: { en: 'Shared barrier', ar: 'حاجز مشترك' }, icon: 'filter', partner: 'timex' },
      { id: 'process', label: { en: 'Process Water', ar: 'مياه العمليات' }, caption: { en: 'To specification', ar: 'حتى المواصفة' }, icon: 'factory', href: '/solutions/process-water' },
      { id: 'cooling', label: { en: 'Cooling', ar: 'التبريد' }, caption: { en: 'Cycles controlled', ar: 'تحكم في دورات التركيز' }, icon: 'tower', href: '/solutions/cooling-water' },
      { id: 'boiler', label: { en: 'Boiler', ar: 'الغلايات' }, caption: { en: 'Protected', ar: 'محمية' }, icon: 'boiler', href: '/solutions/boiler-steam' },
      { id: 'effluent', label: { en: 'Effluent', ar: 'المخلفات السائلة' }, caption: { en: 'Treated and measured', ar: 'مُعالجة ومقاسة' }, icon: 'recycle', href: '/solutions/wastewater' },
      { id: 'supervision', label: { en: 'Site Supervision', ar: 'الإشراف على الموقع' }, caption: { en: 'One picture', ar: 'صورة واحدة' }, icon: 'monitor', partner: 'walchem' },
    ],
    technologies: ['engineering-integration', 'filtration', 'water-treatment-chemicals', 'monitoring-control', 'automation-remote-monitoring', 'water-analysis'],
    services: ['system-assessment', 'engineering-design', 'monitoring-reporting', 'optimization', 'technical-support'],
    industries: ['manufacturing', 'chemical-petrochemical', 'oil-gas', 'power-utilities', 'food-beverage', 'pharmaceutical-cosmetics'],
    products: ['walchem-fluent', 'walchem-intuition-9', 'timex-treatment-systems', 'timex-kmf-series'],
    projects: ['multi-system-site-review'],
    articles: ['designing-a-treatment-program', 'how-remote-monitoring-improves-control'],
    problemTags: ['reliability', 'performance', 'maintenance', 'chemical-consumption', 'water-loss', 'filtration'],
    goalTags: ['optimize-existing', 'improve-reliability', 'reduce-water', 'improve-efficiency', 'improve-control', 'design-new'],
    cta: { en: 'Start a Technical Discussion', ar: 'ابدأ نقاشًا فنيًا' },
  },

  /* ====================================================================== */
  {
    slug: 'specialised-treatment',
    status: 'published',
    title: { en: 'Specialised Water Treatment', ar: 'المعالجة المتخصصة للمياه' },
    headline: { en: 'When the Standard Answer Does Not Apply.', ar: 'حين لا ينطبق الحل النمطي.' },
    summary: {
      en: 'Non-standard waters, difficult duties and systems where a catalogue solution has already been tried.',
      ar: 'مياه غير نمطية وتطبيقات صعبة وأنظمة سبق أن جُرّب فيها حل جاهز من كتالوج.',
    },
    metaTitle: { en: 'Specialised Water Treatment Applications | C-Water Egypt', ar: 'تطبيقات معالجة المياه المتخصصة | C-Water مصر' },
    metaDescription: {
      en: 'Specialised water treatment for difficult and non-standard applications: unusual source chemistry, high-temperature duty, mixed metallurgy and constrained sites.',
      ar: 'معالجة مياه متخصصة للتطبيقات الصعبة وغير النمطية: كيمياء مصدر غير معتادة، وتطبيقات عالية الحرارة، ومعادن مختلطة، ومواقع ذات قيود.',
    },
    intro: {
      en: 'Some systems do not fit a standard programme — because of the source chemistry, the operating envelope, the metallurgy, the site constraints, or the history of what has already been tried.',
      ar: 'بعض الأنظمة لا تناسبها البرامج النمطية — بسبب كيمياء المصدر، أو نطاق التشغيل، أو المعادن المستخدمة، أو قيود الموقع، أو تاريخ ما جُرّب من قبل.',
    },
    whyItMatters: {
      en: 'A programme that has already failed twice is diagnostic information. The most useful thing a specialist can do on a difficult system is establish what has actually been happening before proposing anything new.',
      ar: 'البرنامج الذي فشل مرتين من قبل معلومة تشخيصية. وأنفع ما يمكن أن يفعله متخصص في نظام صعب هو تحديد ما كان يحدث فعليًا قبل اقتراح أي شيء جديد.',
    },
    problems: [
      { id: 'source', icon: 'lab', label: { en: 'Unusual source chemistry', ar: 'كيمياء مصدر غير معتادة' }, body: { en: 'High silica, high chloride, elevated iron or manganese, or a brackish source with seasonal variation.', ar: 'سيليكا عالية أو كلوريد مرتفع أو حديد ومنجنيز مرتفعان، أو مصدر قليل الملوحة متغير موسميًا.' } },
      { id: 'envelope', icon: 'energy', label: { en: 'Demanding operating envelope', ar: 'نطاق تشغيل شاق' }, body: { en: 'High temperature, high concentration, intermittent operation or very long residence times.', ar: 'حرارة عالية أو تركيز مرتفع أو تشغيل متقطع أو أزمنة مكوث طويلة جدًا.' } },
      { id: 'metallurgy', icon: 'corrosion', label: { en: 'Mixed or sensitive metallurgy', ar: 'معادن مختلطة أو حساسة' }, body: { en: 'Galvanic couples and materials with narrow chemistry windows constrain which programmes are usable at all.', ar: 'تحد الأزواج الجلفانية والمواد ذات نوافذ الكيمياء الضيقة من البرامج القابلة للاستخدام أصلًا.' } },
      { id: 'history', icon: 'clipboard', label: { en: 'A history of failed attempts', ar: 'تاريخ من المحاولات الفاشلة' }, body: { en: 'Previous programmes leave residues, altered surfaces and habits that a new programme has to account for.', ar: 'تترك البرامج السابقة رواسب وأسطحًا متغيرة وعادات تشغيلية يجب أن يراعيها أي برنامج جديد.' } },
    ],
    risks: [
      { id: 'repeat', icon: 'wrench', label: { en: 'Repeating the previous failure', ar: 'تكرار الفشل السابق' }, body: { en: 'Changing supplier without changing the diagnosis usually reproduces the same result.', ar: 'تغيير المورد دون تغيير التشخيص يعيد غالبًا النتيجة نفسها.' } },
      { id: 'damage', icon: 'shield', label: { en: 'Accumulated damage', ar: 'ضرر متراكم' }, body: { en: 'Long-running problems leave asset condition that has to be assessed before it can be treated.', ar: 'تترك المشكلات المزمنة حالة أصول يجب تقييمها قبل معالجتها.' } },
    ],
    approach: [
      { id: 'history', icon: 'clipboard', label: { en: 'Establish the history', ar: 'توثيق التاريخ' }, body: { en: 'What has been dosed, what was measured, what changed and when. Often the most informative step.', ar: 'ما الذي ضُخّ، وما الذي قيس، وما الذي تغيّر ومتى. غالبًا أكثر الخطوات إفادة.' } },
      { id: 'analysis', icon: 'lab', label: { en: 'Extended analysis', ar: 'تحليل موسّع' }, body: { en: 'Beyond the routine parameter set, including deposit analysis where samples can be recovered.', ar: 'أبعد من مجموعة المتغيرات الروتينية، بما في ذلك تحليل الرواسب حيث يمكن استخلاص عينات.' } },
      { id: 'trial', icon: 'flask', label: { en: 'Controlled trial', ar: 'تجربة محكومة' }, body: { en: 'Where the duty allows, a monitored trial with defined success criteria before full implementation.', ar: 'حيث تسمح ظروف التشغيل، تجربة مراقَبة بمعايير نجاح محددة قبل التطبيق الكامل.' } },
      { id: 'review', icon: 'optimize', label: { en: 'Close review', ar: 'مراجعة لصيقة' }, body: { en: 'Difficult systems justify shorter review intervals until the response is understood.', ar: 'تبرر الأنظمة الصعبة فترات مراجعة أقصر حتى تُفهم استجابتها.' } },
    ],
    systemFlow: [
      { id: 'history', label: { en: 'History', ar: 'التاريخ' }, caption: { en: 'What was tried', ar: 'ما جُرّب' }, icon: 'clipboard' },
      { id: 'analysis', label: { en: 'Extended Analysis', ar: 'تحليل موسّع' }, caption: { en: 'Water and deposit', ar: 'المياه والرواسب' }, icon: 'lab' },
      { id: 'diagnosis', label: { en: 'Diagnosis', ar: 'التشخيص' }, caption: { en: 'Root cause', ar: 'السبب الجذري' }, icon: 'blueprint' },
      { id: 'trial', label: { en: 'Controlled Trial', ar: 'تجربة محكومة' }, caption: { en: 'Defined criteria', ar: 'معايير محددة' }, icon: 'flask' },
      { id: 'implement', label: { en: 'Implementation', ar: 'التنفيذ' }, caption: { en: 'With monitoring', ar: 'مع المراقبة' }, icon: 'controller' },
      { id: 'review', label: { en: 'Close Review', ar: 'مراجعة لصيقة' }, caption: { en: 'Short intervals', ar: 'فترات قصيرة' }, icon: 'optimize' },
    ],
    technologies: ['water-analysis', 'water-treatment-chemicals', 'engineering-integration', 'filtration', 'monitoring-control'],
    services: ['water-analysis', 'system-assessment', 'technical-support', 'optimization', 'engineering-design'],
    industries: ['chemical-petrochemical', 'oil-gas', 'manufacturing', 'power-utilities', 'agriculture-irrigation', 'aquaculture'],
    products: ['walchem-intuition-9', 'timex-kmf-series', 'kurita-cooling-programme'],
    projects: [],
    articles: ['water-analysis-before-treatment', 'designing-a-treatment-program', 'how-corrosion-develops'],
    problemTags: ['scale', 'corrosion', 'fouling', 'microbiology', 'reliability', 'performance', 'maintenance'],
    goalTags: ['optimize-existing', 'protect-equipment', 'improve-reliability', 'design-new'],
    cta: { en: 'Start a Technical Discussion', ar: 'ابدأ نقاشًا فنيًا' },
  },
];

export const solutionBySlug = Object.fromEntries(solutions.map((s) => [s.slug, s]));
