import type { Industry } from './types';

/**
 * Industry pages.
 *
 * Each answers the same five questions in the same order: which water systems
 * exist on this kind of site, what goes wrong in them, what that costs, which
 * C-Water solutions apply, and what to do next.
 */
export const industries: Industry[] = [
  /* ====================================================================== */
  {
    slug: 'manufacturing',
    status: 'published',
    title: { en: 'Manufacturing', ar: 'الصناعات التحويلية' },
    headline: { en: 'Water Treatment That Supports Production.', ar: 'معالجة مياه تدعم الإنتاج.' },
    summary: {
      en: 'Cooling, steam, process water and effluent treated as one utility system serving one production line.',
      ar: 'التبريد والبخار ومياه العمليات والمخلفات تُعالَج كنظام مرافق واحد يخدم خط إنتاج واحد.',
    },
    metaTitle: { en: 'Water Treatment for Manufacturing | C-Water Egypt', ar: 'معالجة المياه للصناعات التحويلية | C-Water مصر' },
    metaDescription: {
      en: 'Industrial water treatment for manufacturing plants: cooling water, boiler and steam, process water and effluent, with monitoring and control that keeps utilities available.',
      ar: 'معالجة مياه صناعية لمصانع الإنتاج: مياه التبريد، والغلايات والبخار، ومياه العمليات، والمخلفات، مع مراقبة وتحكم يحافظان على جاهزية المرافق.',
    },
    intro: {
      en: 'In a manufacturing plant, water is a utility until it stops working — then it is a production problem. The treatment programme is judged by availability first and by cost second.',
      ar: 'في المصنع، تبقى المياه مرفقًا حتى تتعطل — عندها تصبح مشكلة إنتاج. ويُقاس برنامج المعالجة بالجاهزية أولًا وبالتكلفة ثانيًا.',
    },
    typicalSystems: [
      { id: 'cooling', icon: 'tower', label: { en: 'Cooling towers and chillers', ar: 'أبراج التبريد والمبرّدات' }, body: { en: 'Serving process cooling, compressors and air conditioning, often on one shared circuit.', ar: 'تخدم تبريد العمليات والضواغط والتكييف، وغالبًا على دائرة مشتركة واحدة.' } },
      { id: 'boiler', icon: 'boiler', label: { en: 'Steam boilers', ar: 'غلايات البخار' }, body: { en: 'Process heat, cleaning and space heating, with variable condensate return.', ar: 'حرارة العمليات والتنظيف والتدفئة، مع عودة متكثفات متغيرة.' } },
      { id: 'process', icon: 'factory', label: { en: 'Process water', ar: 'مياه العمليات' }, body: { en: 'Rinsing, make-up and product-contact duties with their own quality specification.', ar: 'الشطف والتعويض والاستخدامات الملامسة للمنتج، ولكل منها مواصفة جودة خاصة.' } },
      { id: 'effluent', icon: 'recycle', label: { en: 'Effluent treatment', ar: 'معالجة المخلفات السائلة' }, body: { en: 'Combined discharge from process and utility streams, subject to consent limits.', ar: 'تصريف مجمّع من تيارات العمليات والمرافق، خاضع لحدود التصريف.' } },
    ],
    challenges: [
      { id: 'availability', icon: 'factory', label: { en: 'Utilities availability', ar: 'جاهزية المرافق' }, body: { en: 'Cooling or steam unavailability stops the line regardless of the reason. Treatment reliability is production reliability.', ar: 'عدم توفر التبريد أو البخار يوقف الخط أيًا كان السبب. فموثوقية المعالجة هي موثوقية الإنتاج.' } },
      { id: 'load', icon: 'flow', label: { en: 'Variable load', ar: 'حمل متغير' }, body: { en: 'Shift patterns and product changes move the thermal and hydraulic load a treatment programme has to follow.', ar: 'تُغيّر أنماط الورديات وتبديل المنتجات الحملَ الحراري والهيدروليكي الذي يجب أن يتبعه برنامج المعالجة.' } },
      { id: 'deposits', icon: 'scale', label: { en: 'Deposits and fouling', ar: 'الرواسب والاتساخ' }, body: { en: 'Heat exchangers, jackets and condensers lose duty gradually, and the loss is usually attributed to something else first.', ar: 'تفقد المبادلات والأقمصة والمكثفات أداءها تدريجيًا، ويُنسب الفقد عادةً إلى سبب آخر أولًا.' } },
      { id: 'water-cost', icon: 'droplet', label: { en: 'Water and effluent cost', ar: 'تكلفة المياه والصرف' }, body: { en: 'Intake charges, treatment cost and discharge charges together make water a visible line on the operating budget.', ar: 'تجعل رسوم المأخذ وتكلفة المعالجة ورسوم التصريف مجتمعةً المياهَ بندًا ظاهرًا في موازنة التشغيل.' } },
    ],
    risks: [
      { id: 'downtime', icon: 'wrench', label: { en: 'Unplanned downtime', ar: 'توقف غير مخطط' }, body: { en: 'Exchanger cleaning and boiler repair are shutdown activities.', ar: 'تنظيف المبادلات وإصلاح الغلايات أنشطة تستلزم إيقافًا.' } },
      { id: 'energy', icon: 'energy', label: { en: 'Rising energy consumption', ar: 'ارتفاع استهلاك الطاقة' }, body: { en: 'Fouled heat transfer shows up as higher energy long before it shows up as a fault.', ar: 'يظهر ضعف التبادل الحراري كطاقة أعلى قبل أن يظهر كعطل بوقت طويل.' } },
      { id: 'compliance', icon: 'clipboard', label: { en: 'Discharge compliance', ar: 'مطابقة التصريف' }, body: { en: 'Effluent quality is externally audited and externally consequential.', ar: 'جودة المخلفات السائلة تخضع لتدقيق خارجي ولها تبعات خارجية.' } },
    ],
    solutions: ['cooling-water', 'boiler-steam', 'process-water', 'wastewater', 'industrial-water'],
    technologies: ['water-treatment-chemicals', 'filtration', 'chemical-dosing', 'monitoring-control', 'automation-remote-monitoring'],
    products: ['walchem-intuition-9', 'kurita-cooling-programme', 'timex-svf-series', 'walchem-fluent', 'kurita-cetamine'],
    services: ['system-assessment', 'chemical-treatment-programmes', 'preventive-maintenance', 'monitoring-reporting', 'optimization'],
    projects: ['cooling-system-control-upgrade', 'multi-system-site-review'],
    articles: ['what-causes-scale-in-cooling-towers', 'boiler-blowdown-energy', 'designing-a-treatment-program'],
    cta: { en: 'Discuss Your Manufacturing Facility', ar: 'ناقش منشأتك الصناعية' },
  },

  /* ====================================================================== */
  {
    slug: 'food-beverage',
    status: 'published',
    title: { en: 'Food & Beverage', ar: 'الأغذية والمشروبات' },
    headline: { en: 'Water Quality Behind Every Process.', ar: 'جودة المياه خلف كل عملية إنتاجية.' },
    summary: {
      en: 'Process, utility and hygiene water treated to standards the product and the auditor both accept.',
      ar: 'مياه العمليات والمرافق والنظافة تُعالَج وفق معايير يقبلها المنتج والمدقق معًا.',
    },
    metaTitle: { en: 'Water Treatment for Food & Beverage | C-Water Egypt', ar: 'معالجة المياه لقطاع الأغذية والمشروبات | C-Water مصر' },
    metaDescription: {
      en: 'Food and beverage water treatment: process water quality, CIP and utility water, cooling and steam systems, effluent treatment and hygiene-critical monitoring.',
      ar: 'معالجة مياه الأغذية والمشروبات: جودة مياه العمليات، ومياه التنظيف الموضعي والمرافق، وأنظمة التبريد والبخار، ومعالجة المخلفات، والمراقبة الحرجة للنظافة.',
    },
    intro: {
      en: 'In food and beverage production, water is both a utility and an ingredient. That doubles the specification and removes most of the tolerance.',
      ar: 'في إنتاج الأغذية والمشروبات، المياه مرفق ومكوّن في آن واحد. وهذا يضاعف المواصفة ويُلغي معظم هامش التسامح.',
    },
    typicalSystems: [
      { id: 'process', icon: 'droplet', label: { en: 'Product and process water', ar: 'مياه المنتج والعمليات' }, body: { en: 'Water entering the product or contacting it directly, held to a defined quality at the point of use.', ar: 'مياه تدخل المنتج أو تلامسه مباشرة، وتُحفظ بجودة محددة عند نقطة الاستخدام.' } },
      { id: 'cip', icon: 'flask', label: { en: 'CIP and hygiene water', ar: 'مياه التنظيف الموضعي والنظافة' }, body: { en: 'Cleaning cycles whose effectiveness depends on water hardness and temperature as much as on detergent.', ar: 'دورات تنظيف تعتمد فعاليتها على عسر المياه ودرجة حرارتها بقدر اعتمادها على المنظف.' } },
      { id: 'utility', icon: 'tower', label: { en: 'Cooling and refrigeration', ar: 'التبريد والتبريد العميق' }, body: { en: 'Process cooling, chilled water and condenser duty across production and storage.', ar: 'تبريد العمليات والمياه المبردة وأحمال المكثفات عبر الإنتاج والتخزين.' } },
      { id: 'steam', icon: 'boiler', label: { en: 'Steam', ar: 'البخار' }, body: { en: 'Process heat and sterilisation, sometimes including culinary steam duty.', ar: 'حرارة العمليات والتعقيم، وأحيانًا بخار ملامس للأغذية.' } },
      { id: 'effluent', icon: 'recycle', label: { en: 'High-strength effluent', ar: 'مخلفات سائلة عالية التركيز' }, body: { en: 'Organic and fat load that varies sharply between products and clean-down cycles.', ar: 'حمل عضوي ودهني يتفاوت بحدة بين المنتجات ودورات التنظيف.' } },
    ],
    challenges: [
      { id: 'consistency', icon: 'gauge', label: { en: 'Quality consistency', ar: 'ثبات الجودة' }, body: { en: 'Water variability becomes product variability wherever water is an ingredient.', ar: 'يتحول تذبذب المياه إلى تذبذب في المنتج حيثما كانت المياه مكوّنًا.' } },
      { id: 'micro', icon: 'biology', label: { en: 'Microbiological control', ar: 'التحكم الميكروبيولوجي' }, body: { en: 'Storage, dead legs and intermittent demand between production runs all create growth opportunity.', ar: 'يخلق التخزين والفروع الميتة والطلب المتقطع بين دورات الإنتاج فرصةً للنمو.' } },
      { id: 'cip-load', icon: 'flow', label: { en: 'CIP water demand', ar: 'استهلاك مياه التنظيف الموضعي' }, body: { en: 'Cleaning is often the largest single water use and the largest contributor to effluent load.', ar: 'غالبًا ما يكون التنظيف أكبر استخدام مفرد للمياه وأكبر مساهم في حمل المخلفات.' } },
      { id: 'effluent', icon: 'recycle', label: { en: 'Variable effluent strength', ar: 'تفاوت تركيز المخلفات' }, body: { en: 'Product changeovers move the organic load faster than a fixed-dose treatment plant can follow.', ar: 'تنقل تغييرات المنتج الحملَ العضوي أسرع مما تستطيع محطة بجرعة ثابتة أن تتبعه.' } },
    ],
    risks: [
      { id: 'product', icon: 'shield', label: { en: 'Product quality and safety', ar: 'جودة المنتج وسلامته' }, body: { en: 'The consequence of a water fault reaches the consumer, not just the plant.', ar: 'تصل عواقب خلل المياه إلى المستهلك لا إلى المصنع فقط.' } },
      { id: 'audit', icon: 'clipboard', label: { en: 'Audit and certification', ar: 'التدقيق والاعتماد' }, body: { en: 'Water systems are examined during food-safety audit, and records are part of the evidence.', ar: 'تُفحَص أنظمة المياه خلال تدقيق سلامة الغذاء، وتشكل السجلات جزءًا من الأدلة.' } },
      { id: 'discharge', icon: 'energy', label: { en: 'Effluent charges', ar: 'رسوم التصريف' }, body: { en: 'High-strength discharge is charged on load, making treatment performance a direct cost.', ar: 'تُحتسب رسوم التصريف عالي التركيز على الحمل، فيصبح أداء المعالجة تكلفة مباشرة.' } },
    ],
    solutions: ['process-water', 'cooling-water', 'boiler-steam', 'wastewater', 'ro-membranes', 'potable-water'],
    technologies: ['filtration', 'reverse-osmosis', 'water-treatment-chemicals', 'sensors-measurement', 'monitoring-control', 'water-analysis'],
    products: ['timex-cartridge-filter', 'walchem-disinfection-sensors', 'kurita-cetamine', 'timex-daf', 'walchem-intuition-6'],
    services: ['water-analysis', 'system-assessment', 'chemical-treatment-programmes', 'monitoring-reporting', 'preventive-maintenance'],
    projects: ['process-water-standardisation', 'effluent-dosing-control'],
    articles: ['water-analysis-before-treatment', 'filtration-protects-downstream', 'boiler-blowdown-energy'],
    cta: { en: 'Discuss Your Facility', ar: 'ناقش منشأتك' },
  },

  /* ====================================================================== */
  {
    slug: 'hospitality',
    status: 'published',
    title: { en: 'Hospitality', ar: 'الضيافة' },
    headline: { en: 'Reliable Water. Reliable Operations.', ar: 'مياه موثوقة. تشغيل موثوق.' },
    summary: {
      en: 'Cooling, hot water, domestic supply and pool systems kept reliable in a building that never closes.',
      ar: 'أنظمة التبريد والمياه الساخنة والإمداد المنزلي وحمامات السباحة تبقى موثوقة في مبنى لا يغلق أبوابه.',
    },
    metaTitle: { en: 'Water Treatment for Hotels & Hospitality | C-Water Egypt', ar: 'معالجة المياه للفنادق وقطاع الضيافة | C-Water مصر' },
    metaDescription: {
      en: 'Hotel and hospitality water treatment: cooling tower and chiller protection, domestic hot and cold water systems, filtration, monitoring and preventive maintenance.',
      ar: 'معالجة المياه للفنادق وقطاع الضيافة: حماية أبراج التبريد والمبرّدات، وأنظمة المياه الساخنة والباردة، والترشيح، والمراقبة، والصيانة الوقائية.',
    },
    intro: {
      en: 'A hotel’s water systems have two audiences: the engineering team who maintain them, and the guests who notice immediately when they stop performing.',
      ar: 'لأنظمة المياه في الفندق جمهوران: فريق الهندسة الذي يصونها، والنزلاء الذين يلاحظون فورًا حين تتوقف عن الأداء.',
    },
    typicalSystems: [
      { id: 'cooling', icon: 'tower', label: { en: 'Cooling towers and chillers', ar: 'أبراج التبريد والمبرّدات' }, body: { en: 'Air conditioning across guest rooms and public areas, running through the hottest part of the year at full load.', ar: 'تكييف غرف النزلاء والمناطق العامة، ويعمل بحمل كامل في أشد شهور السنة حرارة.' } },
      { id: 'domestic-hot', icon: 'boiler', label: { en: 'Domestic hot water', ar: 'المياه الساخنة المنزلية' }, body: { en: 'Calorifiers, circulation loops and long distribution runs with variable demand.', ar: 'سخانات ودوائر تدوير وخطوط توزيع طويلة بطلب متغير.' } },
      { id: 'domestic-cold', icon: 'droplet', label: { en: 'Domestic cold water', ar: 'المياه الباردة المنزلية' }, body: { en: 'Storage tanks and risers where turnover varies with occupancy.', ar: 'خزانات ومواسير صاعدة يتغير معدل تدويرها بحسب نسبة الإشغال.' } },
      { id: 'kitchen', icon: 'flask', label: { en: 'Kitchen and laundry', ar: 'المطبخ والمغسلة' }, body: { en: 'Hardness affects dishwashing, steam equipment and laundry chemical consumption directly.', ar: 'يؤثر العسر مباشرة في غسل الأواني ومعدات البخار واستهلاك كيماويات المغسلة.' } },
      { id: 'pools', icon: 'membrane', label: { en: 'Pool and leisure water', ar: 'مياه المسابح والترفيه' }, body: { en: 'Filtration, circulation and disinfection with a visible quality standard.', ar: 'ترشيح وتدوير وتطهير بمعيار جودة ظاهر للعين.' } },
    ],
    challenges: [
      { id: 'seasonal', icon: 'flow', label: { en: 'Occupancy-driven variability', ar: 'تغير مرتبط بالإشغال' }, body: { en: 'Demand swings between seasons change residence time in every stored volume in the building.', ar: 'تُغيّر تقلبات الطلب بين المواسم زمنَ المكوث في كل حجم مخزَّن بالمبنى.' } },
      { id: 'stagnation', icon: 'biology', label: { en: 'Low-use branches', ar: 'الفروع قليلة الاستخدام' }, body: { en: 'Unoccupied floors and seasonal outlets create stagnant legs that need managing, not just treating.', ar: 'تخلق الطوابق غير المشغولة والمنافذ الموسمية فروعًا راكدة تحتاج إدارة لا مجرد معالجة.' } },
      { id: 'scale', icon: 'scale', label: { en: 'Scale in hot water', ar: 'الترسبات في المياه الساخنة' }, body: { en: 'Calorifiers, showers and kitchen equipment scale first, and the guest experiences it before engineering measures it.', ar: 'تترسب السخانات والدُشات ومعدات المطبخ أولًا، ويشعر بها النزيل قبل أن تقيسها الهندسة.' } },
      { id: 'access', icon: 'wrench', label: { en: 'Restricted access', ar: 'صعوبة الوصول' }, body: { en: 'Plant rooms serving occupied floors offer narrow maintenance windows.', ar: 'تتيح غرف المعدات التي تخدم طوابق مشغولة نوافذ صيانة ضيقة.' } },
    ],
    risks: [
      { id: 'guest', icon: 'shield', label: { en: 'Guest experience', ar: 'تجربة النزيل' }, body: { en: 'Water problems are among the most visible faults in a hotel.', ar: 'مشكلات المياه من أكثر الأعطال ظهورًا في الفندق.' } },
      { id: 'energy', icon: 'energy', label: { en: 'Chiller efficiency', ar: 'كفاءة المبرّدات' }, body: { en: 'Condenser fouling raises energy consumption during exactly the months of highest demand.', ar: 'يرفع اتساخ المكثف استهلاكَ الطاقة في الشهور ذاتها التي يبلغ فيها الطلب ذروته.' } },
      { id: 'health', icon: 'biology', label: { en: 'Water safety obligations', ar: 'التزامات سلامة المياه' }, body: { en: 'Building water systems carry duties around monitoring and record-keeping that apply continuously.', ar: 'تحمل أنظمة المياه بالمباني التزامات مستمرة تتعلق بالمراقبة وحفظ السجلات.' } },
    ],
    solutions: ['cooling-water', 'potable-water', 'boiler-steam', 'ro-membranes'],
    technologies: ['water-treatment-chemicals', 'filtration', 'sensors-measurement', 'monitoring-control', 'chemical-dosing'],
    products: ['walchem-intuition-6', 'kurita-cooling-programme', 'timex-svf-series', 'walchem-disinfection-sensors', 'timex-cartridge-filter'],
    services: ['preventive-maintenance', 'water-analysis', 'monitoring-reporting', 'technical-support', 'chemical-treatment-programmes'],
    projects: ['cooling-system-control-upgrade'],
    articles: ['what-causes-scale-in-cooling-towers', 'how-remote-monitoring-improves-control', 'filtration-protects-downstream'],
    cta: { en: 'Talk to a Hospitality Water Specialist', ar: 'تحدث إلى متخصص مياه الضيافة' },
  },

  /* ====================================================================== */
  {
    slug: 'healthcare',
    status: 'published',
    title: { en: 'Healthcare', ar: 'الرعاية الصحية' },
    headline: { en: 'Water Systems Where Reliability Matters.', ar: 'أنظمة مياه تكون الموثوقية فيها حاسمة.' },
    summary: {
      en: 'Clinical, utility and domestic water systems in buildings that cannot be taken out of service.',
      ar: 'أنظمة مياه سريرية ومرافق ومنزلية في مبانٍ لا يمكن إخراجها من الخدمة.',
    },
    metaTitle: { en: 'Water Treatment for Hospitals & Healthcare | C-Water Egypt', ar: 'معالجة المياه للمستشفيات والرعاية الصحية | C-Water مصر' },
    metaDescription: {
      en: 'Healthcare water treatment: clinical water quality, RO systems, cooling and steam plant, domestic water monitoring and preventive maintenance for continuous operation.',
      ar: 'معالجة المياه في الرعاية الصحية: جودة المياه السريرية، وأنظمة التناضح العكسي، ومحطات التبريد والبخار، ومراقبة المياه المنزلية، والصيانة الوقائية للتشغيل المستمر.',
    },
    intro: {
      en: 'Healthcare water systems combine the highest consequence of failure with the least tolerance for downtime. Redundancy, monitoring and documented condition matter as much as the treatment itself.',
      ar: 'تجمع أنظمة المياه في الرعاية الصحية بين أشد عواقب الفشل وأقل تسامح مع التوقف. فالاحتياطية والمراقبة والحالة الموثقة لا تقل أهمية عن المعالجة نفسها.',
    },
    typicalSystems: [
      { id: 'clinical', icon: 'membrane', label: { en: 'Clinical water systems', ar: 'أنظمة المياه السريرية' }, body: { en: 'RO and polished water for specific clinical applications, each with its own specification and verification regime.', ar: 'مياه تناضح عكسي ومياه منقّاة لتطبيقات سريرية محددة، لكل منها مواصفته ونظام تحققه.' } },
      { id: 'domestic', icon: 'droplet', label: { en: 'Domestic hot and cold water', ar: 'المياه الساخنة والباردة المنزلية' }, body: { en: 'Extensive distribution with varying use patterns across wards and departments.', ar: 'توزيع واسع بأنماط استخدام متفاوتة بين الأجنحة والأقسام.' } },
      { id: 'steam', icon: 'boiler', label: { en: 'Steam and sterilisation', ar: 'البخار والتعقيم' }, body: { en: 'Sterilisation plant and space heating, with steam quality requirements of their own.', ar: 'محطات التعقيم والتدفئة، ولها متطلبات جودة بخار خاصة.' } },
      { id: 'cooling', icon: 'tower', label: { en: 'Cooling systems', ar: 'أنظمة التبريد' }, body: { en: 'Air conditioning and equipment cooling that has to remain available continuously.', ar: 'تكييف وتبريد معدات يجب أن يبقى متاحًا باستمرار.' } },
    ],
    challenges: [
      { id: 'continuity', icon: 'shield', label: { en: 'No acceptable outage', ar: 'لا انقطاع مقبول' }, body: { en: 'Maintenance has to be planned around a building that stays occupied and operating.', ar: 'يجب تخطيط الصيانة حول مبنى يبقى مشغولًا وعاملًا.' } },
      { id: 'verification', icon: 'clipboard', label: { en: 'Documented verification', ar: 'تحقق موثّق' }, body: { en: 'Clinical systems require evidence that quality was maintained, not simply that treatment was in place.', ar: 'تتطلب الأنظمة السريرية دليلًا على أن الجودة حُفظت، لا مجرد وجود معالجة.' } },
      { id: 'micro', icon: 'biology', label: { en: 'Microbiological risk', ar: 'المخاطر الميكروبيولوجية' }, body: { en: 'Large distribution systems with variable use are the highest-risk configuration for building water.', ar: 'أنظمة التوزيع الكبيرة ذات الاستخدام المتغير هي التكوين الأعلى خطرًا لمياه المباني.' } },
      { id: 'ro', icon: 'membrane', label: { en: 'RO availability', ar: 'جاهزية أنظمة التناضح العكسي' }, body: { en: 'Where clinical water depends on RO, its availability is a clinical dependency.', ar: 'حيث تعتمد المياه السريرية على التناضح العكسي، تصبح جاهزيته اعتمادية سريرية.' } },
    ],
    risks: [
      { id: 'patient', icon: 'shield', label: { en: 'Patient safety', ar: 'سلامة المرضى' }, body: { en: 'The consequence category is different from every other sector.', ar: 'فئة العواقب هنا مختلفة عن كل القطاعات الأخرى.' } },
      { id: 'service', icon: 'factory', label: { en: 'Service interruption', ar: 'انقطاع الخدمة' }, body: { en: 'A water fault can suspend a clinical service, not just an area of a building.', ar: 'قد يوقف خلل المياه خدمة سريرية لا مجرد جزء من المبنى.' } },
      { id: 'compliance', icon: 'clipboard', label: { en: 'Regulatory scrutiny', ar: 'الرقابة التنظيمية' }, body: { en: 'Water systems are inspected and records are expected to be complete.', ar: 'تُفتَّش أنظمة المياه ويُتوقع أن تكون السجلات كاملة.' } },
    ],
    solutions: ['ro-membranes', 'potable-water', 'boiler-steam', 'cooling-water', 'process-water'],
    technologies: ['reverse-osmosis', 'filtration', 'sensors-measurement', 'monitoring-control', 'water-analysis'],
    products: ['timex-cartridge-filter', 'walchem-conductivity-sensors', 'walchem-intuition-6', 'kurita-kuriverter-ik110', 'walchem-disinfection-sensors'],
    services: ['preventive-maintenance', 'monitoring-reporting', 'water-analysis', 'technical-support', 'system-assessment'],
    projects: [],
    articles: ['what-causes-ro-fouling', 'water-analysis-before-treatment', 'how-remote-monitoring-improves-control'],
    cta: { en: 'Discuss Your Facility', ar: 'ناقش منشأتك' },
  },

  /* ====================================================================== */
  {
    slug: 'pharmaceutical-cosmetics',
    status: 'published',
    title: { en: 'Pharmaceutical & Cosmetics', ar: 'الأدوية ومستحضرات التجميل' },
    headline: { en: 'Water as a Qualified Input.', ar: 'المياه كمُدخل مؤهَّل.' },
    summary: {
      en: 'Purified water systems, utilities and effluent in an environment where everything is documented.',
      ar: 'أنظمة المياه النقية والمرافق والمخلفات في بيئة يُوثَّق فيها كل شيء.',
    },
    metaTitle: { en: 'Water Treatment for Pharmaceutical & Cosmetics | C-Water Egypt', ar: 'معالجة المياه لصناعة الأدوية ومستحضرات التجميل | C-Water مصر' },
    metaDescription: {
      en: 'Pharmaceutical and cosmetics water treatment: purified water generation and distribution, pretreatment, utility systems and monitoring designed for a documented environment.',
      ar: 'معالجة المياه لصناعة الأدوية ومستحضرات التجميل: إنتاج المياه النقية وتوزيعها، والمعالجة الأولية، وأنظمة المرافق، والمراقبة المصممة لبيئة موثقة.',
    },
    intro: {
      en: 'In a regulated manufacturing environment, a water system is not judged only by what it produces but by whether it can be shown to have produced it consistently.',
      ar: 'في بيئة تصنيع منظَّمة، لا يُقاس نظام المياه بما ينتجه فحسب، بل بما إذا كان يمكن إثبات أنه أنتجه بثبات.',
    },
    typicalSystems: [
      { id: 'purified', icon: 'membrane', label: { en: 'Purified water generation', ar: 'إنتاج المياه النقية' }, body: { en: 'Multi-stage treatment producing water to a defined pharmacopoeial or internal specification.', ar: 'معالجة متعددة المراحل تنتج مياهًا وفق مواصفة دستورية أو داخلية محددة.' } },
      { id: 'distribution', icon: 'flow', label: { en: 'Distribution loops', ar: 'دوائر التوزيع' }, body: { en: 'Continuously circulated systems designed to prevent stagnation and maintain quality at every point of use.', ar: 'أنظمة دائرة باستمرار مصممة لمنع الركود والحفاظ على الجودة عند كل نقطة استخدام.' } },
      { id: 'pretreatment', icon: 'filter', label: { en: 'Pretreatment', ar: 'المعالجة الأولية' }, body: { en: 'Filtration, softening and dechlorination protecting the purification stages downstream.', ar: 'ترشيح وتليين وإزالة الكلور لحماية مراحل التنقية اللاحقة.' } },
      { id: 'utilities', icon: 'boiler', label: { en: 'Utilities', ar: 'المرافق' }, body: { en: 'Steam, cooling and HVAC systems supporting the production environment.', ar: 'أنظمة البخار والتبريد والتكييف الداعمة لبيئة الإنتاج.' } },
    ],
    challenges: [
      { id: 'qualification', icon: 'clipboard', label: { en: 'Qualification and change control', ar: 'التأهيل وضبط التغيير' }, body: { en: 'Any modification to a qualified system carries a documentation burden that has to be planned into the work.', ar: 'أي تعديل على نظام مؤهَّل يحمل عبء توثيق يجب تخطيطه ضمن الأعمال.' } },
      { id: 'micro', icon: 'biology', label: { en: 'Microbiological control in loops', ar: 'التحكم الميكروبيولوجي في الدوائر' }, body: { en: 'Biofilm in a distribution loop is difficult to eliminate once established, which is why velocity and sanitisation regime are design decisions.', ar: 'يصعب القضاء على الغشاء الحيوي في دائرة توزيع بعد استقراره، ولهذا تُعد السرعة ونظام التعقيم قرارات تصميمية.' } },
      { id: 'pretreatment', icon: 'filter', label: { en: 'Pretreatment reliability', ar: 'موثوقية المعالجة الأولية' }, body: { en: 'The purification stages are the expensive part; pretreatment failure is what shortens their life.', ar: 'مراحل التنقية هي الجزء المكلف، وفشل المعالجة الأولية هو ما يقصّر عمرها.' } },
      { id: 'records', icon: 'monitor', label: { en: 'Continuous evidence', ar: 'أدلة مستمرة' }, body: { en: 'Online monitoring with reliable logging is usually a requirement rather than an improvement.', ar: 'عادةً ما تكون المراقبة المتصلة مع تسجيل موثوق متطلبًا لا تحسينًا.' } },
    ],
    risks: [
      { id: 'batch', icon: 'shield', label: { en: 'Batch impact', ar: 'الأثر على التشغيلة' }, body: { en: 'A water excursion can affect product already made, not just product being made.', ar: 'قد يؤثر انحراف المياه في منتج جرى تصنيعه بالفعل لا في المنتج قيد التصنيع فقط.' } },
      { id: 'inspection', icon: 'clipboard', label: { en: 'Inspection findings', ar: 'ملاحظات التفتيش' }, body: { en: 'Water systems are a standard focus of regulatory inspection.', ar: 'أنظمة المياه محور معتاد للتفتيش التنظيمي.' } },
      { id: 'downtime', icon: 'factory', label: { en: 'Requalification downtime', ar: 'توقف إعادة التأهيل' }, body: { en: 'Returning a system to qualified status after an intervention takes time as well as work.', ar: 'إعادة نظام إلى حالة التأهيل بعد تدخل تستغرق وقتًا إضافة إلى العمل.' } },
    ],
    solutions: ['ro-membranes', 'process-water', 'boiler-steam', 'wastewater', 'cooling-water'],
    technologies: ['reverse-osmosis', 'filtration', 'sensors-measurement', 'monitoring-control', 'water-analysis', 'engineering-integration'],
    products: ['timex-cartridge-filter', 'walchem-conductivity-sensors', 'kurita-kuriverter-ik110', 'walchem-intuition-9', 'timex-treatment-systems'],
    services: ['engineering-design', 'water-analysis', 'monitoring-reporting', 'preventive-maintenance', 'system-assessment'],
    projects: ['process-water-standardisation'],
    articles: ['what-causes-ro-fouling', 'ro-pretreatment-failure', 'water-analysis-before-treatment'],
    cta: { en: 'Start a Technical Discussion', ar: 'ابدأ نقاشًا فنيًا' },
  },

  /* ====================================================================== */
  {
    slug: 'oil-gas',
    status: 'published',
    title: { en: 'Oil & Gas', ar: 'البترول والغاز' },
    headline: { en: 'Water Treatment for Demanding Environments.', ar: 'معالجة مياه لبيئات تشغيل قاسية.' },
    summary: {
      en: 'Produced water, injection water, utility systems and filtration built for difficult duty.',
      ar: 'مياه الإنتاج ومياه الحقن وأنظمة المرافق والترشيح، مبنية لظروف تشغيل صعبة.',
    },
    metaTitle: { en: 'Water Treatment for Oil & Gas | C-Water Egypt', ar: 'معالجة المياه لقطاع البترول والغاز | C-Water مصر' },
    metaDescription: {
      en: 'Oil and gas water treatment: produced and injection water filtration, oil removal, corrosion control, cooling systems and monitoring for remote and demanding sites.',
      ar: 'معالجة المياه للبترول والغاز: ترشيح مياه الإنتاج والحقن، وإزالة الزيوت، والتحكم في التآكل، وأنظمة التبريد، والمراقبة للمواقع النائية والصعبة.',
    },
    intro: {
      en: 'Oil and gas water duties combine high solids, variable oil content, aggressive chemistry and often remote locations. Equipment selection has to survive the duty, and the support model has to survive the distance.',
      ar: 'تجمع تطبيقات المياه في البترول والغاز بين محتوى صلب عالٍ ومحتوى زيتي متغير وكيمياء عدوانية ومواقع نائية غالبًا. فاختيار المعدات يجب أن يصمد أمام الظروف، ونموذج الدعم يجب أن يصمد أمام المسافة.',
    },
    typicalSystems: [
      { id: 'produced', icon: 'recycle', label: { en: 'Produced water treatment', ar: 'معالجة مياه الإنتاج' }, body: { en: 'Oil removal, solids separation and conditioning before disposal or reuse.', ar: 'إزالة الزيوت وفصل المواد الصلبة والتهيئة قبل التخلص أو إعادة الاستخدام.' } },
      { id: 'injection', icon: 'flow', label: { en: 'Injection water', ar: 'مياه الحقن' }, body: { en: 'Fine filtration and chemical conditioning to protect formation and injection equipment.', ar: 'ترشيح دقيق وتهيئة كيميائية لحماية التكوين ومعدات الحقن.' } },
      { id: 'cooling', icon: 'tower', label: { en: 'Utility cooling', ar: 'تبريد المرافق' }, body: { en: 'Process cooling under high ambient temperatures and often with limited make-up water.', ar: 'تبريد العمليات في درجات حرارة محيطة عالية وغالبًا بمياه تعويض محدودة.' } },
      { id: 'utility', icon: 'droplet', label: { en: 'Utility and potable supply', ar: 'المرافق ومياه الشرب' }, body: { en: 'Site water for personnel and services, frequently from a treated or brackish source.', ar: 'مياه الموقع للأفراد والخدمات، وغالبًا من مصدر معالَج أو قليل الملوحة.' } },
    ],
    challenges: [
      { id: 'solids', icon: 'filter', label: { en: 'High and variable solids', ar: 'مواد صلبة عالية ومتغيرة' }, body: { en: 'Filtration has to handle a load that changes with the well, not a design average.', ar: 'يجب أن يتعامل الترشيح مع حمل يتغير بتغير البئر لا مع متوسط تصميمي.' } },
      { id: 'oil', icon: 'fouling', label: { en: 'Oil carryover', ar: 'انجراف الزيت' }, body: { en: 'Free and emulsified oil blinds filtration media and disrupts downstream treatment.', ar: 'يسد الزيت الحر والمستحلب وسائط الترشيح ويعطّل المعالجة اللاحقة.' } },
      { id: 'corrosion', icon: 'corrosion', label: { en: 'Corrosive chemistry', ar: 'كيمياء تآكلية' }, body: { en: 'Chloride, H₂S and dissolved gases make material selection as important as treatment.', ar: 'يجعل الكلوريد وكبريتيد الهيدروجين والغازات الذائبة اختيارَ المواد بأهمية المعالجة نفسها.' } },
      { id: 'remote', icon: 'network', label: { en: 'Remote operation', ar: 'التشغيل النائي' }, body: { en: 'Sites with limited attendance need equipment that runs unattended and reports when it cannot.', ar: 'تحتاج المواقع محدودة الإشراف معدات تعمل دون حضور وتبلّغ حين تعجز عن ذلك.' } },
    ],
    risks: [
      { id: 'injectivity', icon: 'shield', label: { en: 'Formation damage', ar: 'الإضرار بالتكوين' }, body: { en: 'Injection water quality has consequences that are expensive and slow to reverse.', ar: 'لجودة مياه الحقن عواقب باهظة وبطيئة التصحيح.' } },
      { id: 'compliance', icon: 'clipboard', label: { en: 'Discharge limits', ar: 'حدود التصريف' }, body: { en: 'Produced water disposal is closely regulated and monitored.', ar: 'التخلص من مياه الإنتاج خاضع لتنظيم ومراقبة دقيقين.' } },
      { id: 'uptime', icon: 'factory', label: { en: 'Production uptime', ar: 'استمرارية الإنتاج' }, body: { en: 'Water handling capacity can become the constraint on production rate.', ar: 'قد تصبح سعة التعامل مع المياه قيدًا على معدل الإنتاج.' } },
    ],
    solutions: ['wastewater', 'industrial-water', 'cooling-water', 'process-water', 'specialised-treatment'],
    technologies: ['filtration', 'water-treatment-chemicals', 'chemical-dosing', 'monitoring-control', 'automation-remote-monitoring'],
    products: ['timex-kmf-series', 'timex-separator-filter', 'timex-daf', 'walchem-fluent', 'walchem-ix-series'],
    services: ['system-assessment', 'engineering-design', 'technical-support', 'monitoring-reporting', 'preventive-maintenance'],
    projects: [],
    articles: ['when-self-cleaning-filter', 'how-corrosion-develops', 'how-remote-monitoring-improves-control'],
    cta: { en: 'Talk to an Engineer', ar: 'تحدث إلى مهندس' },
  },

  /* ====================================================================== */
  {
    slug: 'power-utilities',
    status: 'published',
    title: { en: 'Power & Utilities', ar: 'الطاقة والمرافق' },
    headline: { en: 'Protect the Water Systems Behind Reliable Generation.', ar: 'احمِ أنظمة المياه خلف توليد موثوق.' },
    summary: {
      en: 'Boiler, condensate, cooling and pretreatment systems where efficiency and availability are the product.',
      ar: 'أنظمة الغلايات والمتكثفات والتبريد والمعالجة الأولية، حيث الكفاءة والجاهزية هما المنتج.',
    },
    metaTitle: { en: 'Water Treatment for Power & Utilities | C-Water Egypt', ar: 'معالجة المياه لقطاع الطاقة والمرافق | C-Water مصر' },
    metaDescription: {
      en: 'Power plant water treatment: boiler and condensate chemistry, cooling water programmes, pretreatment and demineralisation, filtration and continuous monitoring.',
      ar: 'معالجة المياه في محطات الطاقة: كيمياء الغلايات والمتكثفات، وبرامج مياه التبريد، والمعالجة الأولية وإزالة الأملاح، والترشيح، والمراقبة المستمرة.',
    },
    intro: {
      en: 'In generation, water chemistry sits directly on the efficiency and availability of the plant. Small, sustained deviations cost more over a year than most single failures.',
      ar: 'في التوليد، تؤثر كيمياء المياه مباشرة في كفاءة المحطة وجاهزيتها. والانحرافات الصغيرة المستمرة تكلف على مدى عام أكثر من معظم الأعطال المفردة.',
    },
    typicalSystems: [
      { id: 'boiler', icon: 'boiler', label: { en: 'Boiler and steam cycle', ar: 'دورة الغلاية والبخار' }, body: { en: 'High-purity water chemistry with tight control limits and continuous verification.', ar: 'كيمياء مياه عالية النقاء بحدود تحكم ضيقة وتحقق مستمر.' } },
      { id: 'condensate', icon: 'recycle', label: { en: 'Condensate and feedwater', ar: 'المتكثفات ومياه التغذية' }, body: { en: 'Return quality, iron and copper transport, and oxygen control across the cycle.', ar: 'جودة العودة، وانتقال الحديد والنحاس، والتحكم في الأكسجين عبر الدورة.' } },
      { id: 'cooling', icon: 'tower', label: { en: 'Circulating cooling water', ar: 'مياه التبريد الدائرة' }, body: { en: 'Large-volume systems where a small efficiency change has a large absolute value.', ar: 'أنظمة كبيرة الحجم يكون فيها لتغير صغير في الكفاءة قيمة مطلقة كبيرة.' } },
      { id: 'demin', icon: 'membrane', label: { en: 'Pretreatment and demineralisation', ar: 'المعالجة الأولية وإزالة الأملاح' }, body: { en: 'Producing make-up to the purity the cycle requires, reliably and at volume.', ar: 'إنتاج مياه تعويض بالنقاء الذي تتطلبه الدورة، بموثوقية وبكميات كبيرة.' } },
    ],
    challenges: [
      { id: 'purity', icon: 'gauge', label: { en: 'Tight chemistry limits', ar: 'حدود كيميائية ضيقة' }, body: { en: 'High-pressure cycles allow very little dissolved solids, which places the burden on make-up treatment.', ar: 'تسمح الدورات عالية الضغط بقدر ضئيل جدًا من المواد الصلبة الذائبة، مما يلقي العبء على معالجة مياه التعويض.' } },
      { id: 'transport', icon: 'corrosion', label: { en: 'Corrosion product transport', ar: 'انتقال نواتج التآكل' }, body: { en: 'Iron and copper moving through the cycle deposit where heat flux is highest.', ar: 'ينتقل الحديد والنحاس عبر الدورة فيترسبان حيث يكون التدفق الحراري أعلى.' } },
      { id: 'volume', icon: 'droplet', label: { en: 'Cooling water volume', ar: 'حجم مياه التبريد' }, body: { en: 'Large circulating systems make both treatment cost and water consumption significant absolute numbers.', ar: 'تجعل الأنظمة الدائرة الكبيرة تكلفةَ المعالجة واستهلاك المياه أرقامًا مطلقة كبيرة.' } },
      { id: 'availability', icon: 'factory', label: { en: 'Availability requirements', ar: 'متطلبات الجاهزية' }, body: { en: 'Outages are planned far ahead; unplanned chemistry-driven outages are expensive in every direction.', ar: 'تُخطَّط فترات التوقف مسبقًا بوقت طويل، أما التوقف غير المخطط بسبب الكيمياء فمكلف من كل الجهات.' } },
    ],
    risks: [
      { id: 'heat-rate', icon: 'energy', label: { en: 'Heat rate degradation', ar: 'تدهور المعدل الحراري' }, body: { en: 'Fouled condensers and scaled tubes both show up as fuel.', ar: 'يظهر اتساخ المكثفات وترسب الأنابيب كلاهما في صورة وقود.' } },
      { id: 'tube', icon: 'shield', label: { en: 'Tube damage', ar: 'تلف الأنابيب' }, body: { en: 'Chemistry excursions in high-pressure plant have consequences measured in weeks of outage.', ar: 'انحرافات الكيمياء في المحطات عالية الضغط لها عواقب تُقاس بأسابيع من التوقف.' } },
      { id: 'water', icon: 'droplet', label: { en: 'Water availability', ar: 'توفر المياه' }, body: { en: 'Where supply is constrained, cooling water consumption becomes a generation constraint.', ar: 'حيث يكون الإمداد محدودًا، يصبح استهلاك مياه التبريد قيدًا على التوليد.' } },
    ],
    solutions: ['boiler-steam', 'cooling-water', 'ro-membranes', 'industrial-water', 'process-water'],
    technologies: ['water-treatment-chemicals', 'sensors-measurement', 'monitoring-control', 'filtration', 'reverse-osmosis', 'water-analysis'],
    products: ['kurita-cetamine', 'walchem-intuition-9', 'walchem-conductivity-sensors', 'timex-kmf-series', 'kurita-cooling-programme'],
    services: ['water-analysis', 'monitoring-reporting', 'chemical-treatment-programmes', 'optimization', 'system-assessment'],
    projects: ['boiler-programme-review'],
    articles: ['boiler-blowdown-energy', 'what-causes-scale-in-cooling-towers', 'how-corrosion-develops'],
    cta: { en: 'Discuss Your Plant', ar: 'ناقش محطتك' },
  },

  /* ====================================================================== */
  {
    slug: 'chemical-petrochemical',
    status: 'published',
    title: { en: 'Chemical & Petrochemical', ar: 'الكيماويات والبتروكيماويات' },
    headline: { en: 'Treatment That Holds Under Process Conditions.', ar: 'معالجة تصمد تحت ظروف العملية.' },
    summary: {
      en: 'Cooling, steam, process and effluent systems operating at the limits of what treatment can tolerate.',
      ar: 'أنظمة التبريد والبخار والعمليات والمخلفات تعمل عند حدود ما تتحمله المعالجة.',
    },
    metaTitle: { en: 'Water Treatment for Chemical & Petrochemical | C-Water Egypt', ar: 'معالجة المياه للكيماويات والبتروكيماويات | C-Water مصر' },
    metaDescription: {
      en: 'Chemical and petrochemical water treatment: high-duty cooling systems, process contamination management, steam generation and complex effluent treatment.',
      ar: 'معالجة المياه للكيماويات والبتروكيماويات: أنظمة تبريد عالية الحمل، وإدارة تلوث العمليات، وتوليد البخار، ومعالجة مخلفات معقدة.',
    },
    intro: {
      en: 'Process plants stress water systems in ways utility buildings do not: high heat flux, process leaks into cooling water, aggressive effluent and mixed metallurgy in the same circuit.',
      ar: 'تُجهد المنشآت الكيميائية أنظمةَ المياه بطرق لا تفعلها مباني المرافق: تدفق حراري عالٍ، وتسرب عمليات إلى مياه التبريد، ومخلفات عدوانية، ومعادن مختلطة في الدائرة نفسها.',
    },
    typicalSystems: [
      { id: 'cooling', icon: 'tower', label: { en: 'High-duty cooling', ar: 'تبريد عالي الحمل' }, body: { en: 'Large circuits serving reactors, condensers and compressors at high heat flux.', ar: 'دوائر كبيرة تخدم المفاعلات والمكثفات والضواغط عند تدفق حراري عالٍ.' } },
      { id: 'steam', icon: 'boiler', label: { en: 'Steam generation', ar: 'توليد البخار' }, body: { en: 'Process steam at varying pressures with condensate that may be contaminated.', ar: 'بخار عمليات بضغوط متفاوتة ومتكثفات قد تكون ملوثة.' } },
      { id: 'process', icon: 'factory', label: { en: 'Process water', ar: 'مياه العمليات' }, body: { en: 'Quality requirements defined by reaction chemistry and product specification.', ar: 'متطلبات جودة تحددها كيمياء التفاعل ومواصفة المنتج.' } },
      { id: 'effluent', icon: 'recycle', label: { en: 'Complex effluent', ar: 'مخلفات معقدة' }, body: { en: 'Variable composition requiring characterisation before any treatment decision.', ar: 'تركيب متغير يتطلب توصيفًا قبل أي قرار معالجة.' } },
    ],
    challenges: [
      { id: 'contamination', icon: 'fouling', label: { en: 'Process contamination', ar: 'تلوث من العمليات' }, body: { en: 'A leaking exchanger puts process material into the cooling circuit, changing the treatment problem overnight.', ar: 'يُدخل مبادل مسرِّب موادَّ العملية إلى دائرة التبريد، فتتغير مشكلة المعالجة بين ليلة وضحاها.' } },
      { id: 'flux', icon: 'energy', label: { en: 'High heat flux', ar: 'تدفق حراري عالٍ' }, body: { en: 'Deposits form faster and matter more where surface temperature is highest.', ar: 'تتكوّن الرواسب أسرع وتكون أشد أثرًا حيث تكون درجة حرارة السطح أعلى.' } },
      { id: 'metallurgy', icon: 'corrosion', label: { en: 'Mixed metallurgy', ar: 'معادن مختلطة' }, body: { en: 'Carbon steel, stainless, copper alloys and titanium in one circuit narrow the usable chemistry window.', ar: 'وجود الفولاذ الكربوني والمقاوم للصدأ وسبائك النحاس والتيتانيوم في دائرة واحدة يضيّق نافذة الكيمياء القابلة للاستخدام.' } },
      { id: 'effluent', icon: 'lab', label: { en: 'Effluent variability', ar: 'تفاوت المخلفات' }, body: { en: 'Batch operations produce a load profile no fixed-dose plant can follow.', ar: 'تُنتج العمليات على دفعات منحنى حمل لا تستطيع محطة بجرعة ثابتة أن تتبعه.' } },
    ],
    risks: [
      { id: 'safety', icon: 'shield', label: { en: 'Process safety interaction', ar: 'تداخل مع سلامة العمليات' }, body: { en: 'Cooling water is a safety system as much as a utility in many process plants.', ar: 'مياه التبريد نظام سلامة بقدر ما هي مرفق في كثير من المنشآت الكيميائية.' } },
      { id: 'shutdown', icon: 'factory', label: { en: 'Turnaround-driven repair', ar: 'إصلاح مرتبط بالتوقف الدوري' }, body: { en: 'Exchanger condition determines turnaround scope and duration.', ar: 'تحدد حالة المبادلات نطاق التوقف الدوري ومدته.' } },
      { id: 'compliance', icon: 'clipboard', label: { en: 'Environmental compliance', ar: 'المطابقة البيئية' }, body: { en: 'Discharge quality is monitored closely and publicly consequential.', ar: 'تُراقَب جودة التصريف عن كثب ولها تبعات أمام الرأي العام.' } },
    ],
    solutions: ['cooling-water', 'boiler-steam', 'wastewater', 'process-water', 'industrial-water', 'specialised-treatment'],
    technologies: ['water-treatment-chemicals', 'filtration', 'monitoring-control', 'chemical-dosing', 'engineering-integration', 'water-analysis'],
    products: ['kurita-cooling-programme', 'walchem-intuition-9', 'timex-kmf-series', 'timex-daf', 'walchem-ph-orp-sensors'],
    services: ['system-assessment', 'chemical-treatment-programmes', 'engineering-design', 'technical-support', 'optimization'],
    projects: ['multi-system-site-review', 'effluent-dosing-control'],
    articles: ['how-corrosion-develops', 'what-causes-scale-in-cooling-towers', 'designing-a-treatment-program'],
    cta: { en: 'Start a Technical Discussion', ar: 'ابدأ نقاشًا فنيًا' },
  },

  /* ====================================================================== */
  {
    slug: 'commercial-buildings',
    status: 'published',
    title: { en: 'Commercial Buildings', ar: 'المباني التجارية' },
    headline: { en: 'The Water Systems Nobody Sees Until They Fail.', ar: 'أنظمة المياه التي لا يراها أحد حتى تتعطل.' },
    summary: {
      en: 'HVAC, domestic water and heating systems in offices, malls and mixed-use developments.',
      ar: 'أنظمة التكييف والمياه المنزلية والتدفئة في المكاتب والمراكز التجارية والمشروعات متعددة الاستخدام.',
    },
    metaTitle: { en: 'Water Treatment for Commercial Buildings | C-Water Egypt', ar: 'معالجة المياه للمباني التجارية | C-Water مصر' },
    metaDescription: {
      en: 'Commercial building water treatment: cooling towers and chillers, closed heating and chilled circuits, domestic water systems, filtration and monitoring.',
      ar: 'معالجة المياه للمباني التجارية: أبراج التبريد والمبرّدات، ودوائر التدفئة والتبريد المغلقة، وأنظمة المياه المنزلية، والترشيح، والمراقبة.',
    },
    intro: {
      en: 'Commercial buildings run water systems that receive attention only when a tenant complains. Treatment is best judged here by how rarely it produces an event.',
      ar: 'تُشغّل المباني التجارية أنظمة مياه لا تنال اهتمامًا إلا عند شكوى مستأجر. وتُقاس المعالجة هنا بمدى ندرة الأحداث التي تنتج عنها.',
    },
    typicalSystems: [
      { id: 'cooling', icon: 'tower', label: { en: 'Cooling towers and chillers', ar: 'أبراج التبريد والمبرّدات' }, body: { en: 'The largest single energy consumer in most commercial buildings.', ar: 'أكبر مستهلك مفرد للطاقة في معظم المباني التجارية.' } },
      { id: 'closed', icon: 'flow', label: { en: 'Closed heating and chilled circuits', ar: 'دوائر التدفئة والتبريد المغلقة' }, body: { en: 'Low make-up systems where corrosion product accumulation is the usual failure mode.', ar: 'أنظمة قليلة التعويض يكون تراكم نواتج التآكل فيها هو نمط الفشل المعتاد.' } },
      { id: 'domestic', icon: 'droplet', label: { en: 'Domestic water', ar: 'المياه المنزلية' }, body: { en: 'Storage, boosting and distribution across many tenancies with uneven demand.', ar: 'تخزين وتعزيز وتوزيع عبر إيجارات متعددة بطلب غير متساوٍ.' } },
    ],
    challenges: [
      { id: 'neglect', icon: 'wrench', label: { en: 'Deferred attention', ar: 'اهتمام مؤجَّل' }, body: { en: 'Closed circuits in particular are often not sampled for years, and their condition is invisible until a pump or valve fails.', ar: 'كثيرًا ما تُترك الدوائر المغلقة بلا عينات لسنوات، وتبقى حالتها خفية حتى تتعطل مضخة أو صمام.' } },
      { id: 'energy', icon: 'energy', label: { en: 'Chiller efficiency', ar: 'كفاءة المبرّدات' }, body: { en: 'Condenser approach temperature is a direct, measurable indicator that is rarely trended.', ar: 'درجة حرارة اقتراب المكثف مؤشر مباشر وقابل للقياس نادرًا ما تُتابَع اتجاهاته.' } },
      { id: 'stagnation', icon: 'biology', label: { en: 'Variable occupancy', ar: 'إشغال متغير' }, body: { en: 'Partially occupied floors leave sections of the domestic system with very long residence times.', ar: 'تترك الطوابق المشغولة جزئيًا أجزاءً من النظام المنزلي بأزمنة مكوث طويلة جدًا.' } },
      { id: 'responsibility', icon: 'clipboard', label: { en: 'Split responsibility', ar: 'مسؤولية موزّعة' }, body: { en: 'Landlord, managing agent and tenant boundaries can leave a system without a clear owner.', ar: 'قد تترك حدود المالك ومدير العقار والمستأجر النظامَ بلا مالك واضح.' } },
    ],
    risks: [
      { id: 'tenant', icon: 'factory', label: { en: 'Tenant impact', ar: 'الأثر على المستأجرين' }, body: { en: 'HVAC and hot water faults are immediately visible to occupiers.', ar: 'أعطال التكييف والمياه الساخنة ظاهرة فورًا للشاغلين.' } },
      { id: 'cost', icon: 'energy', label: { en: 'Operating cost drift', ar: 'انحراف تكلفة التشغيل' }, body: { en: 'Efficiency loss accumulates quietly across a building’s service life.', ar: 'يتراكم فقد الكفاءة بهدوء على مدى عمر خدمة المبنى.' } },
      { id: 'compliance', icon: 'shield', label: { en: 'Water safety duties', ar: 'واجبات سلامة المياه' }, body: { en: 'Building water systems carry ongoing monitoring and record-keeping obligations.', ar: 'تحمل أنظمة المياه بالمباني التزامات مستمرة بالمراقبة وحفظ السجلات.' } },
    ],
    solutions: ['cooling-water', 'potable-water', 'boiler-steam'],
    technologies: ['water-treatment-chemicals', 'filtration', 'monitoring-control', 'sensors-measurement', 'automation-remote-monitoring'],
    products: ['walchem-intuition-6', 'kurita-cooling-programme', 'timex-svf-series', 'walchem-fluent', 'walchem-w100'],
    services: ['preventive-maintenance', 'water-analysis', 'monitoring-reporting', 'system-assessment'],
    projects: ['cooling-system-control-upgrade'],
    articles: ['what-causes-scale-in-cooling-towers', 'how-remote-monitoring-improves-control', 'cooling-tower-cycles'],
    cta: { en: 'Discuss Your Building', ar: 'ناقش مبناك' },
  },

  /* ====================================================================== */
  {
    slug: 'government-municipal',
    status: 'published',
    title: { en: 'Government & Municipal', ar: 'الحكومي والبلديات' },
    headline: { en: 'Public Water Systems, Engineered to Last.', ar: 'أنظمة مياه عامة مُهندَسة لتدوم.' },
    summary: {
      en: 'Potable supply, wastewater and public facility water systems with long service lives and public accountability.',
      ar: 'إمداد مياه الشرب ومياه الصرف وأنظمة مياه المرافق العامة، بأعمار خدمة طويلة ومساءلة عامة.',
    },
    metaTitle: { en: 'Water Treatment for Government & Municipal | C-Water Egypt', ar: 'معالجة المياه للجهات الحكومية والبلديات | C-Water مصر' },
    metaDescription: {
      en: 'Municipal and government water treatment: potable water filtration and disinfection, wastewater treatment, public building systems and long-life equipment selection.',
      ar: 'معالجة المياه للبلديات والجهات الحكومية: ترشيح وتطهير مياه الشرب، ومعالجة مياه الصرف، وأنظمة المباني العامة، واختيار معدات طويلة العمر.',
    },
    intro: {
      en: 'Public sector water infrastructure is specified once and operated for decades. Serviceability, spare-part availability and clear documentation carry as much weight as initial performance.',
      ar: 'تُحدَّد مواصفات البنية التحتية للمياه في القطاع العام مرة واحدة وتُشغَّل لعقود. ولذلك تحمل قابليةُ الخدمة وتوفر قطع الغيار ووضوح التوثيق وزنًا لا يقل عن الأداء الابتدائي.',
    },
    typicalSystems: [
      { id: 'potable', icon: 'droplet', label: { en: 'Potable supply and distribution', ar: 'إمداد وتوزيع مياه الشرب' }, body: { en: 'Filtration, disinfection and residual maintenance across a distribution network.', ar: 'ترشيح وتطهير وحفظ المتبقي عبر شبكة توزيع.' } },
      { id: 'wastewater', icon: 'recycle', label: { en: 'Wastewater treatment', ar: 'معالجة مياه الصرف' }, body: { en: 'Screening, separation, chemical treatment and discharge monitoring.', ar: 'غربلة وفصل ومعالجة كيميائية ومراقبة تصريف.' } },
      { id: 'facilities', icon: 'factory', label: { en: 'Public facility systems', ar: 'أنظمة المرافق العامة' }, body: { en: 'HVAC, heating and domestic water in schools, hospitals and administrative buildings.', ar: 'تكييف وتدفئة ومياه منزلية في المدارس والمستشفيات والمباني الإدارية.' } },
      { id: 'irrigation', icon: 'flow', label: { en: 'Landscape and irrigation', ar: 'التشجير والري' }, body: { en: 'Filtration protecting emitters and distribution networks.', ar: 'ترشيح يحمي النقاطات وشبكات التوزيع.' } },
    ],
    challenges: [
      { id: 'lifecycle', icon: 'shield', label: { en: 'Long service life', ar: 'عمر خدمة طويل' }, body: { en: 'Equipment has to remain serviceable and supportable long after the project team has moved on.', ar: 'يجب أن تبقى المعدات قابلة للخدمة والدعم بعد انتقال فريق المشروع بوقت طويل.' } },
      { id: 'scale', icon: 'network', label: { en: 'Distributed assets', ar: 'أصول موزعة' }, body: { en: 'Many sites with limited on-site technical attendance make remote visibility valuable.', ar: 'تعدد المواقع مع حضور فني محدود يجعل الرؤية عن بُعد ذات قيمة.' } },
      { id: 'procurement', icon: 'clipboard', label: { en: 'Specification and tender', ar: 'المواصفة والمناقصة' }, body: { en: 'Technical specification has to be complete and defensible before procurement begins.', ar: 'يجب أن تكون المواصفة الفنية كاملة وقابلة للدفاع عنها قبل بدء الشراء.' } },
      { id: 'variability', icon: 'lab', label: { en: 'Source variability', ar: 'تغير المصدر' }, body: { en: 'Surface and mixed sources change seasonally, and the treatment has to hold across the range.', ar: 'تتغير المصادر السطحية والمختلطة موسميًا، ويجب أن تصمد المعالجة عبر النطاق كله.' } },
    ],
    risks: [
      { id: 'public', icon: 'shield', label: { en: 'Public health', ar: 'الصحة العامة' }, body: { en: 'Potable supply failures affect populations rather than facilities.', ar: 'تؤثر أعطال إمداد مياه الشرب في السكان لا في المنشآت.' } },
      { id: 'continuity', icon: 'factory', label: { en: 'Service continuity', ar: 'استمرارية الخدمة' }, body: { en: 'Public services are expected to be available without interruption.', ar: 'يُتوقع أن تكون الخدمات العامة متاحة دون انقطاع.' } },
      { id: 'budget', icon: 'energy', label: { en: 'Whole-life cost', ar: 'تكلفة العمر الكامل' }, body: { en: 'Operating and replacement cost over decades outweighs initial capital difference.', ar: 'تتفوق تكلفة التشغيل والاستبدال على مدى عقود على فارق التكلفة الرأسمالية الابتدائية.' } },
    ],
    solutions: ['potable-water', 'wastewater', 'cooling-water', 'industrial-water'],
    technologies: ['filtration', 'sensors-measurement', 'monitoring-control', 'water-analysis', 'automation-remote-monitoring', 'engineering-integration'],
    products: ['timex-treatment-systems', 'timex-drum-filter', 'walchem-disinfection-sensors', 'walchem-fluent', 'timex-kmf-series'],
    services: ['engineering-design', 'water-analysis', 'monitoring-reporting', 'preventive-maintenance', 'technical-support'],
    projects: [],
    articles: ['filtration-protects-downstream', 'water-analysis-before-treatment', 'how-remote-monitoring-improves-control'],
    cta: { en: 'Start a Technical Discussion', ar: 'ابدأ نقاشًا فنيًا' },
  },

  /* ====================================================================== */
  {
    slug: 'agriculture-irrigation',
    status: 'published',
    title: { en: 'Agriculture & Irrigation', ar: 'الزراعة والري' },
    headline: { en: 'Protect the Network. Protect the Yield.', ar: 'احمِ الشبكة. احمِ المحصول.' },
    summary: {
      en: 'Filtration and water conditioning that keep emitters open and distribution uniform.',
      ar: 'ترشيح وتهيئة مياه تُبقي النقاطات مفتوحة والتوزيع منتظمًا.',
    },
    metaTitle: { en: 'Irrigation Water Filtration & Treatment | C-Water Egypt', ar: 'ترشيح ومعالجة مياه الري | C-Water مصر' },
    metaDescription: {
      en: 'Irrigation water treatment: automatic self-cleaning and disc filtration, sand separation, fertigation compatibility and emitter protection for agricultural networks.',
      ar: 'معالجة مياه الري: ترشيح أوتوماتيكي ذاتي التنظيف وبالأقراص، وفصل الرمال، وتوافق التسميد بالري، وحماية النقاطات في الشبكات الزراعية.',
    },
    intro: {
      en: 'An irrigation network is a distribution problem before it is a water problem. Uniformity across the field depends almost entirely on keeping every emitter clear.',
      ar: 'شبكة الري مشكلة توزيع قبل أن تكون مشكلة مياه. فانتظام الري عبر الحقل يعتمد كليًا تقريبًا على إبقاء كل نقّاط مفتوحًا.',
    },
    typicalSystems: [
      { id: 'intake', icon: 'droplet', label: { en: 'Surface and well intake', ar: 'المآخذ السطحية والآبار' }, body: { en: 'Canal, river or borehole sources carrying sand, silt, algae and organic matter.', ar: 'مصادر من الترع أو الأنهار أو الآبار تحمل الرمال والطمي والطحالب والمواد العضوية.' } },
      { id: 'filtration', icon: 'filter', label: { en: 'Filtration station', ar: 'محطة الترشيح' }, body: { en: 'Automatic screen, disc or media filtration sized to the emitter and the load.', ar: 'ترشيح أوتوماتيكي بالشاشة أو الأقراص أو الوسائط بحجم يناسب النقّاط والحمل.' } },
      { id: 'fertigation', icon: 'flask', label: { en: 'Fertigation', ar: 'التسميد بالري' }, body: { en: 'Nutrient injection whose chemistry can itself cause precipitation in the line.', ar: 'حقن مغذيات قد تسبب كيمياؤها نفسها ترسبًا داخل الخط.' } },
      { id: 'network', icon: 'network', label: { en: 'Distribution network', ar: 'شبكة التوزيع' }, body: { en: 'Mains, sub-mains and laterals where uniformity is the performance measure.', ar: 'خطوط رئيسية وفرعية وجانبية يكون فيها الانتظام هو مقياس الأداء.' } },
    ],
    challenges: [
      { id: 'clogging', icon: 'fouling', label: { en: 'Emitter clogging', ar: 'انسداد النقاطات' }, body: { en: 'Physical, chemical and biological clogging each require a different response, and they often occur together.', ar: 'يتطلب الانسداد الفيزيائي والكيميائي والبيولوجي استجابةً مختلفة لكل منه، وغالبًا ما تحدث معًا.' } },
      { id: 'sand', icon: 'filter', label: { en: 'Sand and silt', ar: 'الرمال والطمي' }, body: { en: 'Well sources deliver abrasive load that damages pumps and valves as well as blocking emitters.', ar: 'تُوصل مصادر الآبار حملًا كاشطًا يتلف المضخات والصمامات إضافة إلى سد النقاطات.' } },
      { id: 'algae', icon: 'biology', label: { en: 'Algae and organics', ar: 'الطحالب والمواد العضوية' }, body: { en: 'Open sources carry biological load that grows within the network itself.', ar: 'تحمل المصادر المفتوحة حملًا بيولوجيًا ينمو داخل الشبكة نفسها.' } },
      { id: 'power', icon: 'energy', label: { en: 'Limited utilities', ar: 'مرافق محدودة' }, body: { en: 'Remote stations often have limited power and no permanent attendance.', ar: 'كثيرًا ما تعاني المحطات النائية من طاقة محدودة وغياب إشراف دائم.' } },
    ],
    risks: [
      { id: 'yield', icon: 'factory', label: { en: 'Uneven application', ar: 'ري غير منتظم' }, body: { en: 'Partial blockage shows up as variable growth across the field long before it shows up as a fault.', ar: 'يظهر الانسداد الجزئي كنمو متفاوت عبر الحقل قبل أن يظهر كعطل بوقت طويل.' } },
      { id: 'labour', icon: 'wrench', label: { en: 'Manual cleaning burden', ar: 'عبء التنظيف اليدوي' }, body: { en: 'Networks that need manual flushing consume labour continuously through the season.', ar: 'الشبكات التي تحتاج غسيلًا يدويًا تستهلك عمالة باستمرار طوال الموسم.' } },
      { id: 'water', icon: 'droplet', label: { en: 'Water efficiency', ar: 'كفاءة استخدام المياه' }, body: { en: 'Poor uniformity means over-irrigating part of the field to adequately irrigate the rest.', ar: 'ضعف الانتظام يعني الإفراط في ري جزء من الحقل لري بقيته بشكل كافٍ.' } },
    ],
    solutions: ['industrial-water', 'potable-water', 'specialised-treatment', 'process-water'],
    technologies: ['filtration', 'chemical-dosing', 'monitoring-control', 'water-analysis'],
    products: ['timex-disc-filter', 'timex-kmf-series', 'timex-separator-filter', 'walchem-e-series', 'timex-svf-series'],
    services: ['system-assessment', 'engineering-design', 'preventive-maintenance', 'technical-support'],
    projects: [],
    articles: ['when-self-cleaning-filter', 'filtration-protects-downstream'],
    cta: { en: 'Talk to a Filtration Engineer', ar: 'تحدث إلى مهندس ترشيح' },
  },

  /* ====================================================================== */
  {
    slug: 'aquaculture',
    status: 'published',
    title: { en: 'Aquaculture', ar: 'الاستزراع المائي' },
    headline: { en: 'Water Quality Is the Growing Environment.', ar: 'جودة المياه هي بيئة النمو نفسها.' },
    summary: {
      en: 'Filtration and water quality management where the water is not a utility but the habitat.',
      ar: 'ترشيح وإدارة جودة المياه حيث لا تكون المياه مرفقًا بل هي الموئل نفسه.',
    },
    metaTitle: { en: 'Aquaculture Water Filtration & Quality | C-Water Egypt', ar: 'ترشيح المياه وجودتها في الاستزراع المائي | C-Water مصر' },
    metaDescription: {
      en: 'Aquaculture water treatment: intake screening, solids removal, drum and disc filtration, recirculation support and continuous water quality monitoring.',
      ar: 'معالجة مياه الاستزراع المائي: غربلة المآخذ، وإزالة المواد الصلبة، والترشيح بالأسطوانات والأقراص، ودعم إعادة التدوير، والمراقبة المستمرة لجودة المياه.',
    },
    intro: {
      en: 'In aquaculture the treatment system does not protect equipment — it maintains a living environment. That changes both the tolerance and the urgency.',
      ar: 'في الاستزراع المائي، لا يحمي نظام المعالجة معدات — بل يحافظ على بيئة حية. وهذا يغيّر هامش التسامح ودرجة الإلحاح معًا.',
    },
    typicalSystems: [
      { id: 'intake', icon: 'droplet', label: { en: 'Intake treatment', ar: 'معالجة المأخذ' }, body: { en: 'Screening and filtration of incoming water, protecting stock from what the source carries.', ar: 'غربلة وترشيح المياه الواردة لحماية المخزون مما يحمله المصدر.' } },
      { id: 'solids', icon: 'filter', label: { en: 'Solids removal', ar: 'إزالة المواد الصلبة' }, body: { en: 'Drum and disc filtration removing uneaten feed and waste solids continuously.', ar: 'ترشيح بالأسطوانات والأقراص لإزالة العلف غير المستهلك والمخلفات الصلبة باستمرار.' } },
      { id: 'recirculation', icon: 'recycle', label: { en: 'Recirculation support', ar: 'دعم إعادة التدوير' }, body: { en: 'Mechanical filtration ahead of biological treatment in recirculating systems.', ar: 'ترشيح ميكانيكي قبل المعالجة البيولوجية في أنظمة إعادة التدوير.' } },
      { id: 'monitoring', icon: 'sensor', label: { en: 'Water quality monitoring', ar: 'مراقبة جودة المياه' }, body: { en: 'Dissolved oxygen, pH and temperature measured continuously because the margin is small.', ar: 'قياس الأكسجين الذائب ودرجة الحموضة والحرارة باستمرار لأن هامش الأمان ضيق.' } },
    ],
    challenges: [
      { id: 'continuous', icon: 'shield', label: { en: 'No tolerance for interruption', ar: 'لا تسامح مع الانقطاع' }, body: { en: 'A filtration or oxygenation failure has consequences within hours.', ar: 'لعطل الترشيح أو الأكسجة عواقب خلال ساعات.' } },
      { id: 'load', icon: 'flow', label: { en: 'Load rises with the stock', ar: 'الحمل يرتفع مع نمو المخزون' }, body: { en: 'Solids and nutrient load grow through the production cycle, so the system has to be sized for the end of it.', ar: 'ينمو حمل المواد الصلبة والمغذيات خلال دورة الإنتاج، فيجب تحجيم النظام لنهايتها.' } },
      { id: 'chemical', icon: 'flask', label: { en: 'Limited chemical options', ar: 'خيارات كيميائية محدودة' }, body: { en: 'Most conventional treatment chemistry is unavailable where stock is present, which puts the weight on mechanical treatment.', ar: 'معظم كيمياء المعالجة التقليدية غير متاحة بوجود المخزون، مما يلقي الثقل على المعالجة الميكانيكية.' } },
      { id: 'source', icon: 'lab', label: { en: 'Source variability', ar: 'تغير المصدر' }, body: { en: 'Open intakes bring seasonal changes in turbidity, temperature and biological content.', ar: 'تجلب المآخذ المفتوحة تغيرات موسمية في العكارة ودرجة الحرارة والمحتوى البيولوجي.' } },
    ],
    risks: [
      { id: 'stock', icon: 'shield', label: { en: 'Stock loss', ar: 'فقد المخزون' }, body: { en: 'The asset at risk is biological, and losses are not recoverable.', ar: 'الأصل المعرض للخطر بيولوجي، والخسائر غير قابلة للاسترداد.' } },
      { id: 'growth', icon: 'optimize', label: { en: 'Growth rate impact', ar: 'الأثر على معدل النمو' }, body: { en: 'Suboptimal water quality reduces performance long before it causes visible harm.', ar: 'تقلل جودة المياه غير المثلى الأداءَ قبل أن تسبب ضررًا ظاهرًا بوقت طويل.' } },
      { id: 'discharge', icon: 'recycle', label: { en: 'Discharge quality', ar: 'جودة التصريف' }, body: { en: 'Effluent from production is subject to environmental limits.', ar: 'تخضع مخلفات الإنتاج السائلة لحدود بيئية.' } },
    ],
    solutions: ['industrial-water', 'wastewater', 'process-water', 'specialised-treatment'],
    technologies: ['filtration', 'sensors-measurement', 'monitoring-control', 'water-analysis'],
    products: ['timex-drum-filter', 'timex-disc-filter', 'timex-kmf-series', 'walchem-intuition-6', 'timex-treatment-systems'],
    services: ['system-assessment', 'engineering-design', 'preventive-maintenance', 'monitoring-reporting'],
    projects: [],
    articles: ['filtration-protects-downstream', 'when-self-cleaning-filter'],
    cta: { en: 'Talk to an Engineer', ar: 'تحدث إلى مهندس' },
  },
];

export const industryBySlug = Object.fromEntries(industries.map((i) => [i.slug, i]));
