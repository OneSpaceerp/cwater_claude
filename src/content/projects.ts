import type { Project } from './types';

/**
 * Projects and case studies.
 *
 * DATA RULE — read before editing.
 *
 * Every record below has `isIllustrative: true`. They demonstrate the
 * case-study *structure* — challenge, existing system, approach, technology,
 * outcome — using engineering scenarios that are typical of the application.
 * They are not records of specific C-Water projects.
 *
 * Accordingly, none of them contains a customer name, a site name, a location,
 * a date, or a performance figure, and `metrics` is empty throughout. The
 * `outcomes` array carries qualitative statements about what the described
 * approach addresses, not claimed results.
 *
 * Illustrative records render with a visible notice and are excluded from
 * structured data. Replace them with cleared project data — set
 * `isIllustrative: false`, add `location`, and populate `metrics` only from
 * validated measurements — once C-Water has customer permission.
 */
export const projects: Project[] = [
  {
    slug: 'cooling-system-control-upgrade',
    status: 'published',
    isIllustrative: true,
    industry: 'manufacturing',
    solution: 'cooling-water',
    location: { en: 'Illustrative — no site identified', ar: 'توضيحي — لا يشير إلى موقع محدد' },
    title: { en: 'Bringing a Cooling System Under Measured Control', ar: 'إخضاع نظام تبريد لتحكم مقاس' },
    summary: {
      en: 'How a timer-dosed cooling system is moved onto measured control, and what that changes.',
      ar: 'كيف يُنقل نظام تبريد يعمل بجرعات مؤقتة إلى تحكم مقاس، وما الذي يتغير بذلك.',
    },
    metaTitle: { en: 'Cooling Water Control Upgrade — Case Study Format | C-Water', ar: 'ترقية التحكم في مياه التبريد — صيغة دراسة حالة | C-Water' },
    metaDescription: {
      en: 'An illustrative case-study format showing how C-Water approaches moving a cooling water system from timer-based dosing to measured, verified control.',
      ar: 'صيغة توضيحية لدراسة حالة تبيّن كيف تتعامل C-Water مع نقل نظام مياه تبريد من الجرعات المؤقتة إلى تحكم مقاس ومُتحقَّق منه.',
    },
    challenge: {
      en: 'A cooling system is dosed on a timer and blown down on a fixed schedule. Chemical consumption is steady regardless of load, deposits are found at every exchanger inspection, and nobody can say what the cycles of concentration actually are at any given moment.',
      ar: 'نظام تبريد تُضخ فيه الكيماويات بمؤقت ويُصرَّف وفق جدول ثابت. استهلاك الكيماويات ثابت بغض النظر عن الحمل، وتُكتشف رواسب عند كل فحص للمبادلات، ولا يستطيع أحد تحديد دورات التركيز الفعلية في أي لحظة.',
    },
    existingSystem: {
      en: 'Open recirculating tower serving process cooling and air conditioning. Chemical fed by a solenoid pump on a repeat timer. Blowdown on a solenoid valve controlled by a second timer. No conductivity measurement, no side-stream filtration, and no logged history.',
      ar: 'برج مفتوح ذو دوران يخدم تبريد العمليات والتكييف. تُضخ الكيماويات بمضخة سولينويد على مؤقت متكرر، والتصريف عبر صمام سولينويد يتحكم فيه مؤقت ثانٍ. لا قياس للتوصيلية، ولا ترشيح جانبي، ولا سجل تاريخي.',
    },
    approach: [
      {
        id: 'analysis',
        icon: 'lab',
        label: { en: 'Establish the achievable cycles', ar: 'تحديد دورات التركيز الممكنة' },
        body: {
          en: 'Make-up and system water are analysed. The scaling and corrosion tendencies at a range of concentration factors determine the highest cycles the chemistry can safely hold — the number the whole upgrade is designed around.',
          ar: 'تُحلَّل مياه التعويض ومياه النظام. ويحدد ميل الترسب والتآكل عند نطاق من معاملات التركيز أعلى دورات يمكن للكيمياء تثبيتها بأمان — وهو الرقم الذي تُصمَّم حوله الترقية بأكملها.',
        },
      },
      {
        id: 'instrument',
        icon: 'sensor',
        label: { en: 'Install measurement', ar: 'تركيب القياس' },
        body: {
          en: 'Conductivity and pH measurement installed in a representative, well-mixed location — not in a dead leg, and not immediately downstream of the chemical injection point.',
          ar: 'يُركَّب قياس التوصيلية ودرجة الحموضة في موضع تمثيلي جيد الخلط — لا في فرع ميت، ولا مباشرة بعد نقطة حقن الكيماويات.',
        },
      },
      {
        id: 'control',
        icon: 'controller',
        label: { en: 'Move to measured control', ar: 'الانتقال إلى تحكم مقاس' },
        body: {
          en: 'Blowdown driven by conductivity against a setpoint and deadband. Chemical feed proportioned to make-up volume, with feed verification so a call for dose can be shown to have produced one.',
          ar: 'يُدار التصريف بالتوصيلية مقابل نقطة ضبط ونطاق ميت. ويُنسَّب ضخ الكيماويات إلى حجم مياه التعويض، مع التحقق من الضخ بحيث يمكن إثبات أن طلب الجرعة نتج عنه ضخ فعلي.',
        },
      },
      {
        id: 'filtration',
        icon: 'filter',
        label: { en: 'Add side-stream filtration', ar: 'إضافة ترشيح جانبي' },
        body: {
          en: 'A self-cleaning filter on a side-stream removes the settled and suspended load continuously, reducing the demand the chemical programme has to meet.',
          ar: 'يزيل مرشح ذاتي التنظيف على تيار جانبي الحملَ المستقر والعالق باستمرار، فيقلل الطلب الذي يجب أن يلبيه البرنامج الكيميائي.',
        },
      },
      {
        id: 'verify',
        icon: 'gauge',
        label: { en: 'Verify and review', ar: 'التحقق والمراجعة' },
        body: {
          en: 'Corrosion coupons and periodic analysis confirm the new operating point is holding. Logged trend data makes the next review a matter of evidence rather than recollection.',
          ar: 'تؤكد شرائح التآكل والتحليل الدوري ثبات نقطة التشغيل الجديدة. وتجعل بيانات الاتجاه المسجلة المراجعةَ التالية مسألة أدلة لا استذكار.',
        },
      },
    ],
    outcomes: [
      {
        id: 'cycles',
        icon: 'droplet',
        label: { en: 'Cycles held at a known value', ar: 'تثبيت دورات التركيز عند قيمة معلومة' },
        body: {
          en: 'Concentration is controlled against a measurement rather than a schedule, so the system runs at the point the chemistry allows instead of a conservative guess.',
          ar: 'يُتحكم في التركيز مقابل قياس لا وفق جدول، فيعمل النظام عند النقطة التي تسمح بها الكيمياء بدل تقدير متحفظ.',
        },
      },
      {
        id: 'demand',
        icon: 'flask',
        label: { en: 'Chemical follows demand', ar: 'الكيماويات تتبع الطلب' },
        body: {
          en: 'Feed proportioned to make-up means consumption tracks how hard the system is working rather than how long the timer has been running.',
          ar: 'تنسيب الضخ إلى مياه التعويض يعني أن الاستهلاك يتبع مقدار عمل النظام لا مدة تشغيل المؤقت.',
        },
      },
      {
        id: 'visibility',
        icon: 'monitor',
        label: { en: 'A record exists', ar: 'وجود سجل' },
        body: {
          en: 'When a deviation occurs there is trend data to investigate it with, which is the difference between finding a cause and forming an opinion.',
          ar: 'عند وقوع انحراف تتوفر بيانات اتجاه للتحقيق فيه، وهذا هو الفارق بين إيجاد سبب وتكوين رأي.',
        },
      },
    ],
    metrics: [],
    insight: {
      en: 'The most common finding on a cooling system is not that the chemistry is wrong. It is that nobody can demonstrate what the chemistry has actually been doing. Measurement usually has to come before any decision about treatment.',
      ar: 'أشيع ما يُكتشف في أنظمة التبريد ليس أن الكيمياء خاطئة، بل أن لا أحد يستطيع إثبات ما كانت الكيمياء تفعله فعلًا. ولذلك يجب أن يسبق القياسُ عادةً أي قرار بشأن المعالجة.',
    },
    technologies: ['monitoring-control', 'sensors-measurement', 'chemical-dosing', 'filtration', 'water-treatment-chemicals'],
    products: ['walchem-intuition-9', 'walchem-conductivity-sensors', 'timex-svf-series', 'kurita-cooling-programme'],
    articles: ['cooling-tower-cycles', 'what-conductivity-tells-you', 'what-causes-scale-in-cooling-towers'],
  },

  {
    slug: 'boiler-programme-review',
    status: 'published',
    isIllustrative: true,
    industry: 'food-beverage',
    solution: 'boiler-steam',
    location: { en: 'Illustrative — no site identified', ar: 'توضيحي — لا يشير إلى موقع محدد' },
    title: { en: 'Reviewing a Boiler Programme That Looks Fine on Paper', ar: 'مراجعة برنامج غلايات يبدو سليمًا على الورق' },
    summary: {
      en: 'When boiler water test results are in range but the equipment tells a different story.',
      ar: 'حين تكون نتائج اختبار مياه الغلاية ضمن النطاق لكن حالة المعدات تروي قصة أخرى.',
    },
    metaTitle: { en: 'Boiler Water Programme Review — Case Study Format | C-Water', ar: 'مراجعة برنامج مياه الغلايات — صيغة دراسة حالة | C-Water' },
    metaDescription: {
      en: 'An illustrative case-study format showing how C-Water reviews a boiler water treatment programme where routine results are in range but system condition is not.',
      ar: 'صيغة توضيحية لدراسة حالة تبيّن كيف تراجع C-Water برنامج معالجة مياه غلايات تكون فيه النتائج الروتينية ضمن النطاق بينما حالة النظام ليست كذلك.',
    },
    challenge: {
      en: 'Routine boiler water tests are within their control limits, but the annual inspection reports deposits, and iron is being found in the boiler that the feedwater analysis does not explain.',
      ar: 'اختبارات مياه الغلاية الروتينية ضمن حدود التحكم، لكن الفحص السنوي يسجّل رواسب، ويُوجد حديد في الغلاية لا يفسره تحليل مياه التغذية.',
    },
    existingSystem: {
      en: 'Steam boiler with partial condensate return. Softened make-up, internal chemical treatment, blowdown on a manual schedule. Testing is done on the boiler water only; the condensate return is not tested.',
      ar: 'غلاية بخار بعودة جزئية للمتكثفات. مياه تعويض مُليَّنة، ومعالجة كيميائية داخلية، وتصريف وفق جدول يدوي. تُجرى الاختبارات على مياه الغلاية فقط، ولا يُختبر خط عودة المتكثفات.',
    },
    approach: [
      {
        id: 'scope',
        icon: 'clipboard',
        label: { en: 'Widen what is measured', ar: 'توسيع نطاق ما يُقاس' },
        body: {
          en: 'Testing extended to the feedwater and the condensate return. Iron appearing in the boiler that the make-up does not account for has to be arriving from somewhere, and the return line is the usual answer.',
          ar: 'يمتد الاختبار إلى مياه التغذية وعودة المتكثفات. فالحديد الظاهر في الغلاية والذي لا تفسره مياه التعويض لا بد أن يأتي من مكان ما، وخط العودة هو الجواب المعتاد.',
        },
      },
      {
        id: 'condensate',
        icon: 'recycle',
        label: { en: 'Treat the return, not just the boiler', ar: 'معالجة خط العودة لا الغلاية فقط' },
        body: {
          en: 'Carbon dioxide released in the boiler forms carbonic acid when the steam condenses. The resulting corrosion thins the return line and delivers its own iron back to the boiler.',
          ar: 'يكوّن ثاني أكسيد الكربون المتحرر في الغلاية حمض الكربونيك عند تكثّف البخار. ويرقّق التآكل الناتج خط العودة ويعيد حديده إلى الغلاية.',
        },
      },
      {
        id: 'blowdown',
        icon: 'controller',
        label: { en: 'Control blowdown on conductivity', ar: 'التحكم في التصريف بالتوصيلية' },
        body: {
          en: 'A manual schedule cannot follow a variable steam load. Conductivity-controlled blowdown holds dissolved solids at the limit without discharging more heat than the specification requires.',
          ar: 'لا يستطيع الجدول اليدوي تتبع حمل بخار متغير. أما التصريف المحكوم بالتوصيلية فيُبقي المواد الصلبة الذائبة عند الحد دون تصريف حرارة أكثر مما تتطلبه المواصفة.',
        },
      },
      {
        id: 'programme',
        icon: 'flask',
        label: { en: 'Select for the whole cycle', ar: 'الاختيار وفق الدورة كاملة' },
        body: {
          en: 'Treatment chosen to act across feedwater, boiler, steam and condensate rather than only within the boiler drum.',
          ar: 'تُختار المعالجة لتعمل عبر مياه التغذية والغلاية والبخار والمتكثفات لا داخل جسم الغلاية فقط.',
        },
      },
    ],
    outcomes: [
      {
        id: 'source',
        icon: 'lab',
        label: { en: 'The iron source is identified', ar: 'تحديد مصدر الحديد' },
        body: {
          en: 'Testing the return rather than only the boiler distinguishes a feedwater problem from a condensate corrosion problem — two conditions with completely different remedies.',
          ar: 'اختبار خط العودة لا الغلاية وحدها يميّز بين مشكلة في مياه التغذية ومشكلة تآكل في المتكثفات — حالتان علاجهما مختلف تمامًا.',
        },
      },
      {
        id: 'energy',
        icon: 'energy',
        label: { en: 'Blowdown matches requirement', ar: 'التصريف يطابق المتطلب' },
        body: {
          en: 'Blowdown discharges water that has been softened, deaerated, treated and heated to saturation. Controlling it on a measurement rather than a schedule stops that being decided by habit.',
          ar: 'يُخرج التصريف مياهًا جرى تليينها ونزع غازاتها ومعالجتها وتسخينها حتى التشبع. والتحكم فيه بقياس بدل جدول يمنع أن تحدده العادة.',
        },
      },
      {
        id: 'evidence',
        icon: 'clipboard',
        label: { en: 'Inspection has a record behind it', ar: 'وجود سجل يدعم الفحص' },
        body: {
          en: 'Logged results across the whole cycle mean the annual inspection finding can be traced to a period and a cause.',
          ar: 'تعني النتائج المسجلة عبر الدورة كاملة أن ملاحظة الفحص السنوي يمكن ربطها بفترة وسبب.',
        },
      },
    ],
    metrics: [],
    insight: {
      en: 'Boiler water results within their limits describe the boiler water. They do not describe the feedwater, the steam or the condensate — and in a system with partial return, the condensate is usually where the story is.',
      ar: 'نتائج مياه الغلاية ضمن حدودها تصف مياه الغلاية فقط. ولا تصف مياه التغذية ولا البخار ولا المتكثفات — وفي نظام بعودة جزئية، تكون المتكثفات عادةً حيث تكمن القصة.',
    },
    technologies: ['water-treatment-chemicals', 'sensors-measurement', 'monitoring-control', 'water-analysis'],
    products: ['kurita-cetamine', 'walchem-w100', 'walchem-conductivity-sensors'],
    articles: ['boiler-blowdown-energy', 'how-corrosion-develops', 'water-analysis-before-treatment'],
  },

  {
    slug: 'ro-pretreatment-redesign',
    status: 'published',
    isIllustrative: true,
    industry: 'manufacturing',
    solution: 'ro-membranes',
    location: { en: 'Illustrative — no site identified', ar: 'توضيحي — لا يشير إلى موقع محدد' },
    title: { en: 'When the RO Problem Is Not the RO', ar: 'حين لا تكون مشكلة التناضح العكسي في التناضح العكسي' },
    summary: {
      en: 'Rising cleaning frequency is usually a pretreatment message. Reading it correctly is the whole exercise.',
      ar: 'ارتفاع تكرار التنظيف رسالة من المعالجة الأولية عادةً. وقراءتها بشكل صحيح هي جوهر العمل.',
    },
    metaTitle: { en: 'RO Pretreatment Redesign — Case Study Format | C-Water', ar: 'إعادة تصميم المعالجة الأولية — دراسة حالة | C-Water' },
    metaDescription: {
      en: 'An illustrative case-study format showing how C-Water diagnoses rising RO cleaning frequency by separating fouling from scaling using normalised data.',
      ar: 'صيغة توضيحية لدراسة حالة تبيّن كيف تشخّص C-Water ارتفاع تكرار تنظيف التناضح العكسي بالفصل بين الاتساخ والترسب باستخدام بيانات معيارية.',
    },
    challenge: {
      en: 'An RO system is being cleaned far more often than it was designed to be. Each clean restores performance for a while, then the interval shortens again. Membrane replacement has been proposed.',
      ar: 'يُنظَّف نظام تناضح عكسي بوتيرة أعلى بكثير مما صُمم له. ويستعيد كل تنظيف الأداء لفترة، ثم تقصر الفترة مجددًا. وقد اقتُرح استبدال الأغشية.',
    },
    existingSystem: {
      en: 'Multi-stage RO with media filtration and cartridge filtration upstream, antiscalant dosed at a fixed rate. Operating data is recorded as raw readings; nothing is normalised.',
      ar: 'نظام تناضح عكسي متعدد المراحل بترشيح بالوسائط وبالخراطيش قبله، ومانع ترسب يُضخ بمعدل ثابت. وتُسجَّل بيانات التشغيل كقراءات خام دون أي معايرة.',
    },
    approach: [
      {
        id: 'normalise',
        icon: 'monitor',
        label: { en: 'Normalise before diagnosing', ar: 'المعايرة قبل التشخيص' },
        body: {
          en: 'Raw readings move with temperature and feed pressure. Normalised flow, salt passage and differential pressure separate a genuine decline from seasonal variation — and separate fouling from scaling.',
          ar: 'تتغير القراءات الخام مع الحرارة وضغط التغذية. أما التدفق وتسرب الأملاح وفرق الضغط المعيارية فتفصل التدهور الحقيقي عن التغير الموسمي، وتفصل الاتساخ عن الترسب.',
        },
      },
      {
        id: 'read',
        icon: 'gauge',
        label: { en: 'Read the signature', ar: 'قراءة البصمة' },
        body: {
          en: 'Rising differential pressure across a stage points to particulate or biological fouling. Falling normalised flow with rising salt passage points to scaling. The two require different cleaning chemistry and different upstream fixes.',
          ar: 'يشير ارتفاع فرق الضغط عبر مرحلة إلى اتساخ جسيمي أو بيولوجي. وانخفاض التدفق المعياري مع ارتفاع تسرب الأملاح يشير إلى الترسب. ويتطلب الاثنان كيمياء تنظيف مختلفة ومعالجات مختلفة قبل النظام.',
        },
      },
      {
        id: 'feed',
        icon: 'filter',
        label: { en: 'Measure what reaches the membrane', ar: 'قياس ما يصل إلى الغشاء' },
        body: {
          en: 'SDI and turbidity at the feed point are the honest measures of whether pretreatment is doing its job. Cartridge element life is a second, cheaper indicator that says the same thing.',
          ar: 'مؤشر كثافة الترسيب SDI والعكارة عند نقطة التغذية هما القياسان الصادقان لأداء المعالجة الأولية. وعمر عنصر الخرطوشة مؤشر ثانٍ أرخص يقول الشيء نفسه.',
        },
      },
      {
        id: 'antiscalant',
        icon: 'flask',
        label: { en: 'Select against the concentrate', ar: 'الاختيار وفق كيمياء المركّز' },
        body: {
          en: 'Antiscalant has to be chosen for the chemistry at the tail of the system at the intended recovery, not for the feed. Scaling appears at the last elements first for exactly this reason.',
          ar: 'يجب اختيار مانع الترسب وفق الكيمياء في نهاية المنظومة عند معدل الاستعادة المستهدف، لا وفق التغذية. ولهذا السبب بالضبط يظهر الترسب في العناصر الأخيرة أولًا.',
        },
      },
    ],
    outcomes: [
      {
        id: 'diagnosis',
        icon: 'lab',
        label: { en: 'The mechanism is identified', ar: 'تحديد آلية المشكلة' },
        body: {
          en: 'Fouling and scaling look similar from the control room and are addressed completely differently. Normalised data is what tells them apart.',
          ar: 'يبدو الاتساخ والترسب متشابهين من غرفة التحكم، ويُعالجان بطريقتين مختلفتين تمامًا. والبيانات المعيارية هي ما يميّز بينهما.',
        },
      },
      {
        id: 'upstream',
        icon: 'filter',
        label: { en: 'The fix moves upstream', ar: 'انتقال الحل إلى ما قبل الغشاء' },
        body: {
          en: 'Where the diagnosis points to pretreatment, replacing membranes treats the symptom and leaves the cause in place to do the same thing again.',
          ar: 'حيث يشير التشخيص إلى المعالجة الأولية، يكون استبدال الأغشية علاجًا للعرض ويترك السبب قائمًا ليكرر الأمر نفسه.',
        },
      },
      {
        id: 'early',
        icon: 'optimize',
        label: { en: 'Decline is caught earlier', ar: 'اكتشاف التدهور مبكرًا' },
        body: {
          en: 'Normalised trending reveals a real decline while a clean is still cheap and effective, rather than after recovery has already been reduced to compensate.',
          ar: 'يكشف تتبع الاتجاه المعياري التدهورَ الحقيقي بينما لا يزال التنظيف رخيصًا وفعالًا، بدل اكتشافه بعد خفض معدل الاستعادة للتعويض.',
        },
      },
    ],
    metrics: [],
    insight: {
      en: 'Most RO problems are not membrane problems. They are pretreatment problems that arrived at the membrane, and the membrane is simply where they became visible.',
      ar: 'معظم مشكلات التناضح العكسي ليست مشكلات أغشية، بل مشكلات معالجة أولية وصلت إلى الغشاء، والغشاء هو فقط حيث أصبحت مرئية.',
    },
    technologies: ['reverse-osmosis', 'filtration', 'water-treatment-chemicals', 'monitoring-control', 'water-analysis'],
    products: ['timex-cartridge-filter', 'timex-svf-series', 'kurita-kuriverter-ik110', 'walchem-conductivity-sensors'],
    articles: ['what-causes-ro-fouling', 'ro-pretreatment-failure', 'filtration-protects-downstream'],
  },

  {
    slug: 'process-water-standardisation',
    status: 'published',
    isIllustrative: true,
    industry: 'food-beverage',
    solution: 'process-water',
    location: { en: 'Illustrative — no site identified', ar: 'توضيحي — لا يشير إلى موقع محدد' },
    title: { en: 'Deriving a Process Water Specification Instead of Inheriting One', ar: 'اشتقاق مواصفة مياه العمليات بدل توارثها' },
    summary: {
      en: 'What happens when a plant works out what its process actually requires from the water.',
      ar: 'ماذا يحدث حين تحدد المنشأة ما تحتاجه عمليتها فعلًا من المياه.',
    },
    metaTitle: { en: 'Process Water Specification — Case Study Format | C-Water', ar: 'مواصفة مياه العمليات — صيغة دراسة حالة | C-Water' },
    metaDescription: {
      en: 'An illustrative case-study format showing how C-Water derives a process water specification from the process requirement rather than an inherited standard.',
      ar: 'صيغة توضيحية لدراسة حالة تبيّن كيف تشتق C-Water مواصفة مياه العمليات من متطلب العملية لا من معيار موروث.',
    },
    challenge: {
      en: 'A plant treats all process water to a single high standard because that is what the original specification said. Nobody currently working there knows where the specification came from or which process step it was written for.',
      ar: 'تعالج منشأة كل مياه العمليات وفق معيار واحد مرتفع لأن ذلك ما نصت عليه المواصفة الأصلية. ولا يعرف أحد من العاملين حاليًا من أين جاءت المواصفة ولا لأي خطوة إنتاجية كُتبت.',
    },
    existingSystem: {
      en: 'A single treatment train feeding several process uses with different requirements. Every litre is treated to the standard of the most demanding step, including the water used for the least demanding.',
      ar: 'سلسلة معالجة واحدة تغذي عدة استخدامات إنتاجية بمتطلبات مختلفة. فيُعالج كل لتر وفق معيار أكثر الخطوات تطلبًا، بما في ذلك المياه المستخدمة في أقلها تطلبًا.',
    },
    approach: [
      {
        id: 'map',
        icon: 'blueprint',
        label: { en: 'Map demand against requirement', ar: 'مقارنة الطلب بالمتطلب' },
        body: {
          en: 'Each point of use is listed with the parameters it genuinely cares about and the tolerance around each. This is usually the first time the site has seen that comparison written down.',
          ar: 'تُدرَج كل نقطة استخدام مع المتغيرات التي تهمها فعلًا ومدى التفاوت المسموح لكل منها. وغالبًا ما تكون هذه أول مرة يرى فيها الموقع تلك المقارنة مكتوبة.',
        },
      },
      {
        id: 'source',
        icon: 'lab',
        label: { en: 'Characterise the source across a year', ar: 'توصيف المصدر على مدار عام' },
        body: {
          en: 'A single sample on a good day describes a good day. The design has to hold across the range the supply actually delivers, including its seasonal worst.',
          ar: 'العينة الواحدة في يوم جيد تصف يومًا جيدًا. ويجب أن يصمد التصميم عبر النطاق الذي يقدمه الإمداد فعلًا، بما في ذلك أسوأ حالاته الموسمية.',
        },
      },
      {
        id: 'segregate',
        icon: 'network',
        label: { en: 'Consider segregation', ar: 'النظر في الفصل' },
        body: {
          en: 'Where demands differ significantly, treating separate streams to separate standards can cost less to run than treating everything to the highest one.',
          ar: 'حيث تتباين المتطلبات بشكل ملموس، قد يكون تشغيل تيارات منفصلة بمعايير منفصلة أقل تكلفة من معالجة كل شيء وفق أعلى معيار.',
        },
      },
      {
        id: 'verify',
        icon: 'gauge',
        label: { en: 'Verify at the point of use', ar: 'التحقق عند نقطة الاستخدام' },
        body: {
          en: 'Online measurement at the point of use confirms the specification is being met when production needs it — not on average, and not at the plant outlet.',
          ar: 'يؤكد القياس المتصل عند نقطة الاستخدام تحقق المواصفة عند حاجة الإنتاج إليها — لا في المتوسط ولا عند مخرج المحطة.',
        },
      },
    ],
    outcomes: [
      {
        id: 'defensible',
        icon: 'clipboard',
        label: { en: 'A specification that can be explained', ar: 'مواصفة يمكن تفسيرها' },
        body: {
          en: 'Each requirement traces to a process reason, which makes it possible to review it when the process changes.',
          ar: 'يرتبط كل متطلب بسبب إنتاجي، مما يتيح مراجعته عند تغير العملية.',
        },
      },
      {
        id: 'cost',
        icon: 'energy',
        label: { en: 'Over-treatment becomes visible', ar: 'ظهور الإفراط في المعالجة' },
        body: {
          en: 'Treating to a higher standard than the process requires is a permanent operating cost, and it is invisible until the requirement is written down.',
          ar: 'المعالجة إلى معيار أعلى مما تتطلبه العملية تكلفة تشغيلية دائمة، وتبقى خفية حتى يُكتب المتطلب.',
        },
      },
      {
        id: 'confidence',
        icon: 'shield',
        label: { en: 'Verification where it counts', ar: 'تحقق في الموضع الذي يهم' },
        body: {
          en: 'Measuring at the point of use rather than at the plant outlet is what turns a specification into evidence.',
          ar: 'القياس عند نقطة الاستخدام لا عند مخرج المحطة هو ما يحوّل المواصفة إلى دليل.',
        },
      },
    ],
    metrics: [],
    insight: {
      en: 'Inherited specifications are among the most expensive documents in a plant. They are rarely wrong in a way that causes a failure, which is exactly why nobody revisits them.',
      ar: 'المواصفات الموروثة من أكثر الوثائق تكلفة في المنشأة. فنادرًا ما تكون خاطئة بشكل يسبب عطلًا، ولهذا السبب بالذات لا يعيد أحد النظر فيها.',
    },
    technologies: ['filtration', 'reverse-osmosis', 'water-analysis', 'sensors-measurement', 'engineering-integration'],
    products: ['timex-treatment-systems', 'timex-cartridge-filter', 'walchem-conductivity-sensors', 'walchem-intuition-9'],
    articles: ['water-analysis-before-treatment', 'designing-a-treatment-program'],
  },

  {
    slug: 'effluent-dosing-control',
    status: 'published',
    isIllustrative: true,
    industry: 'food-beverage',
    solution: 'wastewater',
    location: { en: 'Illustrative — no site identified', ar: 'توضيحي — لا يشير إلى موقع محدد' },
    title: { en: 'Letting Effluent Dosing Follow the Load', ar: 'جعل جرعات معالجة المخلفات تتبع الحمل' },
    summary: {
      en: 'A treatment plant dosing for its worst day, every day, and what it takes to change that safely.',
      ar: 'محطة معالجة تضخ وفق أسوأ أيامها كل يوم، وما يلزم لتغيير ذلك بأمان.',
    },
    metaTitle: { en: 'Effluent Dosing Control — Case Study Format | C-Water', ar: 'التحكم في جرعات معالجة المخلفات — صيغة دراسة حالة | C-Water' },
    metaDescription: {
      en: 'An illustrative case-study format showing how C-Water moves an effluent plant from worst-case fixed dosing to load-following controlled dosing.',
      ar: 'صيغة توضيحية لدراسة حالة تبيّن كيف تنقل C-Water محطة مخلفات من جرعات ثابتة لأسوأ الحالات إلى جرعات محكومة تتبع الحمل.',
    },
    challenge: {
      en: 'An effluent plant doses coagulant and polymer at a fixed rate set for the worst load the site produces. Most of the time the actual load is well below that, and the plant pays for the difference in chemical and in sludge.',
      ar: 'تضخ محطة مخلفات المروّب والبوليمر بمعدل ثابت مضبوط لأسوأ حمل ينتجه الموقع. وفي معظم الوقت يكون الحمل الفعلي أقل بكثير، فتدفع المحطة الفارق كيماوياتٍ وحمأة.',
    },
    existingSystem: {
      en: 'Physical and chemical treatment with fixed-rate dosing. Load varies sharply between shifts, products and clean-down cycles. Discharge is sampled periodically for compliance.',
      ar: 'معالجة فيزيائية وكيميائية بجرعات ثابتة المعدل. ويتفاوت الحمل بحدة بين الورديات والمنتجات ودورات التنظيف. ويُؤخذ من التصريف عينات دورية للمطابقة.',
    },
    approach: [
      {
        id: 'characterise',
        icon: 'lab',
        label: { en: 'Characterise the real load profile', ar: 'توصيف منحنى الحمل الفعلي' },
        body: {
          en: 'Composite and grab sampling across the shifts, products and clean-down cycles that produce the peaks. The gap between the average and the peak is where the opportunity is.',
          ar: 'أخذ عينات مركّبة ولحظية عبر الورديات والمنتجات ودورات التنظيف التي تنتج الذروات. والفجوة بين المتوسط والذروة هي موضع الفرصة.',
        },
      },
      {
        id: 'jar',
        icon: 'flask',
        label: { en: 'Select chemistry by jar test', ar: 'اختيار الكيمياء باختبار الجرّة' },
        body: {
          en: 'Coagulant and polymer chosen against the actual effluent rather than a general specification. Sludge volume and dewaterability are usually the largest running cost and are decided here.',
          ar: 'يُختار المروّب والبوليمر وفق المخلفات الفعلية لا وفق مواصفة عامة. وحجم الحمأة وقابليتها لنزع الماء عادةً أكبر تكلفة تشغيلية، ويُحسمان هنا.',
        },
      },
      {
        id: 'pretreat',
        icon: 'recycle',
        label: { en: 'Remove load mechanically first', ar: 'إزالة الحمل ميكانيكيًا أولًا' },
        body: {
          en: 'Screening, separation and flotation take out load that would otherwise be treated chemically at higher cost further down the train.',
          ar: 'تُخرج الغربلة والفصل والتعويم حملًا كان سيُعالَج كيميائيًا بتكلفة أعلى في مرحلة لاحقة.',
        },
      },
      {
        id: 'control',
        icon: 'controller',
        label: { en: 'Dose against a measurement', ar: 'الضخ وفق قياس' },
        body: {
          en: 'Feed driven by a measured load indicator lets consumption follow the plant. Compliance is maintained by monitoring the outcome, not by adding margin to the dose.',
          ar: 'الضخ المدفوع بمؤشر حمل مقاس يجعل الاستهلاك يتبع المنشأة. وتُحفظ المطابقة بمراقبة النتيجة لا بإضافة هامش إلى الجرعة.',
        },
      },
    ],
    outcomes: [
      {
        id: 'follows',
        icon: 'flow',
        label: { en: 'Consumption follows the plant', ar: 'الاستهلاك يتبع المنشأة' },
        body: {
          en: 'Dosing against a measured indicator means the plant stops paying continuously for a condition that occurs occasionally.',
          ar: 'الضخ وفق مؤشر مقاس يعني توقف المنشأة عن الدفع المستمر مقابل حالة تحدث أحيانًا.',
        },
      },
      {
        id: 'sludge',
        icon: 'recycle',
        label: { en: 'Sludge is treated as a cost', ar: 'التعامل مع الحمأة كتكلفة' },
        body: {
          en: 'Chemistry selected with dewaterability in mind changes the largest running cost, not just the dose rate.',
          ar: 'اختيار الكيمياء مع مراعاة قابلية نزع الماء يغيّر أكبر تكلفة تشغيلية، لا معدل الجرعة فقط.',
        },
      },
      {
        id: 'compliance',
        icon: 'clipboard',
        label: { en: 'Compliance is monitored, not assumed', ar: 'مراقبة المطابقة لا افتراضها' },
        body: {
          en: 'Continuous measurement at the discharge point provides both the evidence and an early warning that periodic sampling cannot.',
          ar: 'يوفر القياس المستمر عند نقطة التصريف الدليلَ وإنذارًا مبكرًا لا توفرهما العينات الدورية.',
        },
      },
    ],
    metrics: [],
    insight: {
      en: 'Dosing for the worst case is a rational response to not knowing the load. The way out is not a braver dose rate — it is measuring the load.',
      ar: 'الضخ لأسوأ الحالات استجابة منطقية لعدم معرفة الحمل. والمخرج ليس معدل جرعة أكثر جرأة، بل قياس الحمل.',
    },
    technologies: ['chemical-dosing', 'filtration', 'water-treatment-chemicals', 'monitoring-control', 'sensors-measurement'],
    products: ['timex-daf', 'walchem-ix-series', 'walchem-intuition-9', 'timex-drum-filter'],
    articles: ['designing-a-treatment-program', 'water-analysis-before-treatment'],
  },

  {
    slug: 'multi-system-site-review',
    status: 'published',
    isIllustrative: true,
    industry: 'manufacturing',
    solution: 'industrial-water',
    location: { en: 'Illustrative — no site identified', ar: 'توضيحي — لا يشير إلى موقع محدد' },
    title: { en: 'Reviewing Four Water Systems as One Water Balance', ar: 'مراجعة أربعة أنظمة مياه كميزان مائي واحد' },
    summary: {
      en: 'What a site sees when its cooling, boiler, process and effluent systems are reviewed together.',
      ar: 'ما يراه الموقع حين تُراجَع أنظمة التبريد والغلايات والعمليات والمخلفات معًا.',
    },
    metaTitle: { en: 'Site-Wide Water Review — Case Study Format | C-Water', ar: 'مراجعة المياه على مستوى الموقع — صيغة دراسة حالة | C-Water' },
    metaDescription: {
      en: 'An illustrative case-study format showing how C-Water reviews cooling, boiler, process and effluent systems together as one site water balance.',
      ar: 'صيغة توضيحية لدراسة حالة تبيّن كيف تراجع C-Water أنظمة التبريد والغلايات والعمليات والمخلفات معًا كميزان مائي واحد للموقع.',
    },
    challenge: {
      en: 'A site runs a cooling system, a boiler house, a process water plant and an effluent plant. Each has its own supplier, its own programme and its own reporting. Nobody holds a picture of the site as one water balance.',
      ar: 'يُشغّل موقع نظام تبريد وغرفة غلايات ومحطة مياه عمليات ومحطة مخلفات. ولكل منها مورده وبرنامجه وتقاريره. ولا أحد يملك صورة للموقع كميزان مائي واحد.',
    },
    existingSystem: {
      en: 'Four systems, four contracts, four reporting formats. Interactions between them — blowdown quality, shared make-up, effluent loading from utility streams — are nobody’s defined responsibility.',
      ar: 'أربعة أنظمة، وأربعة عقود، وأربع صيغ تقارير. أما التفاعلات بينها — جودة التصريف، ومياه التعويض المشتركة، وتحميل المخلفات من تيارات المرافق — فليست مسؤولية محددة لأحد.',
    },
    approach: [
      {
        id: 'balance',
        icon: 'blueprint',
        label: { en: 'Build the water balance', ar: 'بناء الميزان المائي' },
        body: {
          en: 'Every intake, transfer, concentration point and discharge quantified. Until this exists, reduction opportunities are invisible because nobody can see where the water goes.',
          ar: 'تحديد كمي لكل مأخذ ونقل ونقطة تركيز وتصريف. وقبل وجود ذلك تبقى فرص الخفض غير مرئية لأن لا أحد يرى إلى أين تذهب المياه.',
        },
      },
      {
        id: 'assess',
        icon: 'gauge',
        label: { en: 'Assess each system, then compare', ar: 'تقييم كل نظام ثم المقارنة' },
        body: {
          en: 'Condition, control quality and treatment performance judged individually and then against each other, which is where inconsistencies in standard become obvious.',
          ar: 'تُقيَّم الحالة وجودة التحكم وأداء المعالجة لكل نظام على حدة ثم في مقارنة بينها، وعندها يتضح التفاوت في المستوى.',
        },
      },
      {
        id: 'reuse',
        icon: 'recycle',
        label: { en: 'Match quality to demand', ar: 'مواءمة الجودة مع الطلب' },
        body: {
          en: 'A stream leaving one system is often good enough to feed a lower-grade duty elsewhere. It is usually discharged instead, because nobody has mapped the qualities against the demands.',
          ar: 'كثيرًا ما يكون تيار خارج من نظام صالحًا لتغذية استخدام أقل جودة في مكان آخر. لكنه يُصرَّف عادةً لأن أحدًا لم يقارن الجودات بالاحتياجات.',
        },
      },
      {
        id: 'standardise',
        icon: 'controller',
        label: { en: 'Standardise instrumentation and reporting', ar: 'توحيد الأجهزة والتقارير' },
        body: {
          en: 'Common measurement and one reporting format across systems makes the site legible to the people running it, and makes the systems comparable to each other.',
          ar: 'يجعل القياس الموحد وصيغة التقارير الواحدة عبر الأنظمة الموقعَ مفهومًا لمن يشغّلونه، ويجعل الأنظمة قابلة للمقارنة.',
        },
      },
      {
        id: 'sequence',
        icon: 'clipboard',
        label: { en: 'Sequence by risk and return', ar: 'الترتيب وفق المخاطر والعائد' },
        body: {
          en: 'Not everything is worth doing at once. The order follows consequence and payback rather than which system is largest or most visible.',
          ar: 'ليس كل شيء يستحق التنفيذ دفعة واحدة. ويتبع الترتيب الأثرَ والعائد لا حجم النظام أو مدى ظهوره.',
        },
      },
    ],
    outcomes: [
      {
        id: 'picture',
        icon: 'network',
        label: { en: 'One picture instead of four', ar: 'صورة واحدة بدل أربع' },
        body: {
          en: 'Interactions between systems become visible — and interactions are where the findings that four separate reports miss tend to be.',
          ar: 'تصبح التفاعلات بين الأنظمة مرئية — وفي التفاعلات تكمن عادةً النتائج التي تفوتها أربعة تقارير منفصلة.',
        },
      },
      {
        id: 'priority',
        icon: 'clipboard',
        label: { en: 'A defensible order of work', ar: 'ترتيب عمل قابل للتبرير' },
        body: {
          en: 'A limited budget goes to the item with the highest consequence rather than the one that was raised most recently.',
          ar: 'تذهب الميزانية المحدودة إلى البند الأعلى أثرًا لا إلى آخر بند أُثير.',
        },
      },
      {
        id: 'legible',
        icon: 'monitor',
        label: { en: 'The site becomes legible', ar: 'الموقع يصبح مفهومًا' },
        body: {
          en: 'Consistent measurement and reporting is what allows a site team to compare, question and improve its own systems.',
          ar: 'القياس والتقارير المتسقة هي ما يتيح لفريق الموقع مقارنة أنظمته ومساءلتها وتحسينها.',
        },
      },
    ],
    metrics: [],
    insight: {
      en: 'Four water systems on one site are one water balance managed as four contracts. Most of the available improvement sits in the interactions, which is exactly what a per-system review is structured not to see.',
      ar: 'أربعة أنظمة مياه في موقع واحد هي ميزان مائي واحد يُدار كأربعة عقود. ومعظم التحسين المتاح يكمن في التفاعلات، وهي بالضبط ما لا تراه المراجعة المنفصلة لكل نظام.',
    },
    technologies: ['engineering-integration', 'monitoring-control', 'automation-remote-monitoring', 'water-analysis', 'filtration'],
    products: ['walchem-fluent', 'walchem-intuition-9', 'timex-kmf-series', 'timex-treatment-systems'],
    articles: ['designing-a-treatment-program', 'how-remote-monitoring-improves-control'],
  },
];

export const projectBySlug = Object.fromEntries(projects.map((p) => [p.slug, p]));
