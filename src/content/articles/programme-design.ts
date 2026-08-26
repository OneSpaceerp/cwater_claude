import type { Article } from '../types';

/** Knowledge Center — analysis, programme design and remote monitoring. */
export const programmeDesignArticles: Article[] = [
  /* ====================================================================== */
  {
    slug: 'water-analysis-before-treatment',
    status: 'published',
    category: 'water-chemistry',
    readingMinutes: 6,
    publishedAt: '2026-01-20',
    title: { en: 'Why Water Analysis Should Come Before Chemical Treatment', ar: 'لماذا يجب أن يسبق تحليل المياه المعالجة الكيميائية' },
    question: {
      en: 'What does an analysis actually tell you that a treatment supplier cannot assume?',
      ar: 'ما الذي يخبرك به التحليل ولا يستطيع مورّد المعالجة افتراضه؟',
    },
    summary: {
      en: 'Analysis is the cheapest step in a treatment programme and the one that determines whether the rest of it was correctly chosen.',
      ar: 'التحليل أرخص خطوة في برنامج المعالجة، وهو الذي يحدد ما إذا كان اختيار بقيته صحيحًا.',
    },
    metaTitle: { en: 'Why Water Analysis Comes First | C-Water', ar: 'لماذا يأتي تحليل المياه أولًا | C-Water' },
    metaDescription: {
      en: 'What an industrial water analysis reveals, which parameters drive treatment decisions, how sampling affects the result, and why interpretation matters more than the numbers.',
      ar: 'ما يكشفه تحليل المياه الصناعية، وأي المتغيرات تقود قرارات المعالجة، وكيف يؤثر أخذ العينة في النتيجة، ولماذا التفسير أهم من الأرقام.',
    },
    sections: [
      {
        id: 'why',
        heading: { en: 'Treatment chosen without analysis is treatment chosen from a catalogue', ar: 'المعالجة المختارة بلا تحليل مختارة من كتالوج' },
        blocks: [
          {
            type: 'p',
            text: {
              en: 'The same cooling tower in two cities, fed from two different supplies, needs two different programmes. The equipment is identical; the water is not, and the water is what the chemistry has to deal with.',
              ar: 'برج التبريد نفسه في مدينتين، بمصدرين مختلفين، يحتاج برنامجين مختلفين. فالمعدات متطابقة، أما المياه فلا، والمياه هي ما يجب على الكيمياء التعامل معه.',
            },
          },
          {
            type: 'p',
            text: {
              en: 'Without analysis there is no basis for choosing an inhibitor, no way to establish achievable cycles of concentration, no basis for a filtration degree and nothing to compare against when something later goes wrong.',
              ar: 'وبلا تحليل، لا أساس لاختيار مثبط، ولا سبيل لتحديد دورات التركيز الممكنة، ولا أساس لدرجة الترشيح، ولا شيء للمقارنة عليه حين يسوء شيء لاحقًا.',
            },
          },
          {
            type: 'note',
            text: {
              en: 'That last point is worth its own emphasis. The first analysis becomes the reference. Every subsequent one shows whether the programme is holding — and gives early warning when the source water itself has changed.',
              ar: 'وتستحق النقطة الأخيرة تأكيدًا خاصًا. فالتحليل الأول يصبح مرجعًا، ويُظهر كل تحليل تالٍ ما إذا كان البرنامج صامدًا — ويعطي إنذارًا مبكرًا عند تغيّر مياه المصدر نفسها.',
            },
          },
        ],
      },
      {
        id: 'parameters',
        heading: { en: 'The parameters that drive decisions', ar: 'المتغيرات التي تقود القرارات' },
        blocks: [
          {
            type: 'table',
            head: [
              { en: 'Parameter', ar: 'المتغير' },
              { en: 'What it decides', ar: 'ما الذي يحدده' },
            ],
            rows: [
              [
                { en: 'Calcium hardness and alkalinity', ar: 'عسر الكالسيوم والقلوية' },
                { en: 'Carbonate scaling tendency and achievable cycles of concentration', ar: 'ميل ترسب الكربونات ودورات التركيز الممكنة' },
              ],
              [
                { en: 'Chloride and sulphate', ar: 'الكلوريد والكبريتات' },
                { en: 'Corrosivity, and whether the metallurgy present is suitable', ar: 'التآكلية، ومدى ملاءمة المعادن الموجودة' },
              ],
              [
                { en: 'Silica', ar: 'السيليكا' },
                { en: 'A hard ceiling on concentration; often the real cycles limit', ar: 'سقف صارم للتركيز؛ وغالبًا الحد الفعلي لدورات التركيز' },
              ],
              [
                { en: 'Iron and manganese', ar: 'الحديد والمنجنيز' },
                { en: 'Deposition risk and whether pretreatment is required', ar: 'خطر الترسب ومدى الحاجة إلى معالجة أولية' },
              ],
              [
                { en: 'pH and conductivity', ar: 'درجة الحموضة والتوصيلية' },
                { en: 'Control setpoints and inhibitor window', ar: 'نقاط ضبط التحكم ونافذة عمل المثبط' },
              ],
              [
                { en: 'Suspended solids and turbidity', ar: 'المواد الصلبة العالقة والعكارة' },
                { en: 'Filtration requirement and degree', ar: 'متطلب الترشيح ودرجته' },
              ],
              [
                { en: 'Microbiological indicators', ar: 'المؤشرات الميكروبيولوجية' },
                { en: 'Biocide selection and control strategy', ar: 'اختيار المبيد واستراتيجية التحكم' },
              ],
            ],
          },
        ],
      },
      {
        id: 'sampling',
        heading: { en: 'The sample decides the answer', ar: 'العينة هي التي تحدد الجواب' },
        blocks: [
          {
            type: 'p',
            text: {
              en: 'Where and when a sample is taken matters as much as the analysis performed on it. A sample from a dead leg describes the dead leg. A sample drawn immediately after a chemical slug describes the slug. A sample taken on a single good day describes a single good day.',
              ar: 'موضع أخذ العينة وتوقيتها لا يقلان أهمية عن التحليل المُجرى عليها. فالعينة من فرع ميت تصف الفرع الميت، والمأخوذة مباشرة بعد دفعة كيميائية تصف الدفعة، والمأخوذة في يوم جيد واحد تصف يومًا جيدًا واحدًا.',
            },
          },
          {
            type: 'p',
            text: {
              en: 'Some parameters change between the tap and the laboratory. pH shifts as dissolved gases equilibrate. Iron oxidises on exposure to air. Microbiological samples change in transport. Where these matter, they are measured on site or the sample is preserved appropriately.',
              ar: 'وبعض المتغيرات تتغير بين الصنبور والمعمل. فدرجة الحموضة تتحول مع اتزان الغازات الذائبة، والحديد يتأكسد عند التعرض للهواء، والعينات الميكروبيولوجية تتغير أثناء النقل. وحيث تهم هذه، تُقاس في الموقع أو تُحفظ العينة بشكل مناسب.',
            },
          },
          {
            type: 'p',
            text: {
              en: 'For a cooling or boiler system, both the make-up and the system water are needed. The make-up defines the starting point; the system water shows what has actually happened to it inside the plant. Either alone answers half the question.',
              ar: 'ولنظام تبريد أو غلاية، تلزم عينتان: مياه التعويض ومياه النظام. فالتعويض يحدد نقطة البداية، ومياه النظام تُظهر ما جرى لها فعليًا داخل المنشأة. وأي منهما وحده يجيب عن نصف السؤال.',
            },
          },
        ],
      },
      {
        id: 'interpretation',
        heading: { en: 'Results are not an answer', ar: 'النتائج ليست جوابًا' },
        blocks: [
          {
            type: 'p',
            text: {
              en: 'A results sheet is data. It becomes a treatment decision only when read against the metallurgy, the operating temperatures, the cycles, the residence time and the duty of the actual system.',
              ar: 'ورقة النتائج بيانات. ولا تتحول إلى قرار معالجة إلا حين تُقرأ في ضوء المعادن ودرجات حرارة التشغيل ودورات التركيز وزمن المكوث وظروف تشغيل النظام الفعلي.',
            },
          },
          {
            type: 'p',
            text: {
              en: 'The same chloride figure is unremarkable in an all-carbon-steel circuit and a serious constraint where stainless steel is present at temperature. The same alkalinity is manageable at three cycles and a scaling problem at six. Context is the whole of the interpretation.',
              ar: 'فرقم الكلوريد نفسه عادي في دائرة فولاذ كربوني بالكامل، وقيد خطير حيث يوجد فولاذ مقاوم للصدأ عند حرارة مرتفعة. والقلوية نفسها قابلة للإدارة عند ثلاث دورات ومشكلة ترسب عند ست. فالسياق هو التفسير كله.',
            },
          },
        ],
      },
    ],
    checklist: [
      { en: 'Sample both the make-up and the system water for cooling and boiler systems.', ar: 'خذ عينة من مياه التعويض ومياه النظام لأنظمة التبريد والغلايات.' },
      { en: 'Take the sample from a flowing, representative point — not a dead leg or a post-injection point.', ar: 'خذ العينة من نقطة متدفقة تمثيلية — لا من فرع ميت أو بعد نقطة الحقن.' },
      { en: 'Record operating conditions at the time of sampling: load, temperature, recent chemical additions.', ar: 'سجّل ظروف التشغيل عند أخذ العينة: الحمل ودرجة الحرارة والإضافات الكيميائية الأخيرة.' },
      { en: 'Measure the parameters that change in transit on site.', ar: 'قِس في الموقع المتغيرات التي تتغير أثناء النقل.' },
      { en: 'Match the parameter set to the application rather than ordering a standard panel.', ar: 'واءِم مجموعة المتغيرات مع التطبيق بدل طلب لوحة قياسية.' },
      { en: 'Read the results against your metallurgy, temperatures and cycles.', ar: 'اقرأ النتائج في ضوء معادنك ودرجات حرارتك ودورات تركيزك.' },
      { en: 'Keep the results — the first analysis is the baseline everything later is compared against.', ar: 'احتفظ بالنتائج — فالتحليل الأول هو خط الأساس الذي يُقارن به كل ما يليه.' },
    ],
    escalation: {
      en: 'If the analysis and the observed system condition disagree — good results but visible deposits, or poor results but no evident damage — the sampling regime is usually the first thing to question rather than the laboratory. Where deposits or corrosion are already present, a deposit sample analysis alongside the water analysis identifies the mechanism directly, and it is worth far more than either test alone.',
      ar: 'إذا تعارض التحليل مع حالة النظام المُلاحَظة — نتائج جيدة مع رواسب ظاهرة، أو نتائج سيئة دون ضرر واضح — فإن أسلوب أخذ العينات هو أول ما ينبغي مساءلته لا المعمل. وحيث توجد رواسب أو تآكل بالفعل، يحدد تحليل عينة الراسب إلى جانب تحليل المياه الآليةَ مباشرة، وهو أثمن بكثير من أي من الاختبارين منفردًا.',
    },
    solutions: ['cooling-water', 'boiler-steam', 'ro-membranes', 'process-water', 'wastewater', 'potable-water'],
    technologies: ['water-analysis', 'water-treatment-chemicals', 'sensors-measurement'],
    products: ['walchem-conductivity-sensors', 'walchem-ph-orp-sensors'],
    faqs: [
      {
        id: 'q1',
        question: { en: 'How often should we analyse?', ar: 'كل كم ينبغي أن نُجري التحليل؟' },
        answer: {
          en: 'It depends on how stable the source is and how critical the system is. A stable supply on a non-critical system needs less frequent analysis than a variable surface source feeding a production-critical plant. What matters is that the interval is short enough to catch a change before it causes damage.',
          ar: 'يعتمد على مدى استقرار المصدر وأهمية النظام. فمصدر مستقر يغذي نظامًا غير حرج يحتاج تحليلًا أقل تكرارًا من مصدر سطحي متغير يغذي منشأة حرجة للإنتاج. والمهم أن تكون الفترة قصيرة بما يكفي لاكتشاف التغيّر قبل أن يسبب ضررًا.',
        },
      },
      {
        id: 'q2',
        question: { en: 'Is an on-site test kit enough?', ar: 'هل تكفي عدّة اختبار ميدانية؟' },
        answer: {
          en: 'Test kits are essential for routine control — pH, conductivity, inhibitor residual and hardness between visits. They do not replace a full laboratory analysis for programme selection, which needs the complete ionic picture and a lower detection limit than a field kit provides.',
          ar: 'عدد الاختبار الميدانية أساسية للتحكم الروتيني — الحموضة والتوصيلية ومتبقي المثبط والعسر بين الزيارات. لكنها لا تحل محل تحليل معملي كامل لاختيار البرنامج، الذي يحتاج الصورة الأيونية الكاملة وحد كشف أدنى مما توفره العدة الميدانية.',
        },
      },
    ],
  },

  /* ====================================================================== */
  {
    slug: 'how-remote-monitoring-improves-control',
    status: 'published',
    category: 'monitoring-control',
    readingMinutes: 6,
    publishedAt: '2026-03-16',
    title: { en: 'How Remote Monitoring Can Improve Treatment Control', ar: 'كيف تحسّن المراقبة عن بُعد التحكم في المعالجة' },
    question: {
      en: 'What does remote monitoring change, beyond letting somebody look at a dashboard?',
      ar: 'ما الذي تغيّره المراقبة عن بُعد، بعيدًا عن إتاحة النظر إلى لوحة عرض؟',
    },
    summary: {
      en: 'The value is not the dashboard. It is the shortened distance between a parameter drifting and somebody who understands it noticing.',
      ar: 'القيمة ليست في لوحة العرض، بل في تقصير المسافة بين انحراف متغير وملاحظة شخص يفهمه.',
    },
    metaTitle: { en: 'How Remote Monitoring Improves Treatment Control | C-Water', ar: 'كيف تحسّن المراقبة عن بُعد التحكم في المعالجة | C-Water' },
    metaDescription: {
      en: 'What remote water treatment monitoring changes: the gap between service visits, alarm discipline, trend analysis across seasons and evidence for reporting.',
      ar: 'ما تغيّره المراقبة عن بُعد لمعالجة المياه: الفجوة بين زيارات الخدمة، وانضباط الإنذارات، وتحليل الاتجاهات عبر الفصول، والأدلة اللازمة للتقارير.',
    },
    sections: [
      {
        id: 'gap',
        heading: { en: 'The gap between visits', ar: 'الفجوة بين الزيارات' },
        blocks: [
          {
            type: 'p',
            text: {
              en: 'On a monthly service interval, a treatment system is unobserved for roughly ninety-five percent of its operating life. Most conditions that cause real damage develop and do their work entirely inside that gap.',
              ar: 'بفترة خدمة شهرية، يبقى نظام المعالجة دون مراقبة نحو خمسة وتسعين بالمئة من عمره التشغيلي. ومعظم الحالات التي تسبب ضررًا حقيقيًا تنشأ وتفعل فعلها داخل تلك الفجوة بالكامل.',
            },
          },
          {
            type: 'p',
            text: {
              en: 'A chemical pump that fails the day after a visit goes undetected for four weeks. A conductivity sensor that begins to drift produces plausible readings while every blowdown decision based on them is wrong. A make-up water change is invisible until the next analysis.',
              ar: 'فمضخة كيماويات تتعطل في اليوم التالي للزيارة تبقى غير مكتشفة أربعة أسابيع. ومستشعر توصيلية يبدأ بالانحراف ينتج قراءات معقولة بينما كل قرار تصريف مبني عليها خاطئ. وتغيّر في مياه التعويض يبقى خفيًا حتى التحليل التالي.',
            },
          },
          {
            type: 'p',
            text: {
              en: 'Remote monitoring does not add a capability the controller did not have. It removes the delay between the controller knowing something and a person who can act on it knowing it too.',
              ar: 'ولا تضيف المراقبة عن بُعد قدرة لم تكن لدى وحدة التحكم، بل تزيل التأخير بين معرفة وحدة التحكم بشيء ما ومعرفة من يستطيع التصرف بشأنه.',
            },
          },
        ],
      },
      {
        id: 'alarms',
        heading: { en: 'Alarm discipline', ar: 'انضباط الإنذارات' },
        blocks: [
          {
            type: 'p',
            text: {
              en: 'An alarm nobody acts on is noise, and noise trains people to ignore the next one. The discipline is in alerting on few enough conditions that the alerts still get read.',
              ar: 'الإنذار الذي لا يتصرف أحد بناءً عليه ضجيج، والضجيج يعوّد الناس على تجاهل التالي. والانضباط هو التنبيه على حالات قليلة بما يكفي ليبقى للتنبيهات من يقرأها.',
            },
          },
          {
            type: 'p',
            text: {
              en: 'A useful alarm indicates a condition that requires a decision — a drum at low level, a failed feed verification, a sensor reading outside its plausible range, a control loop unable to reach setpoint. A normal excursion within the deadband is not an alarm; it is the system working.',
              ar: 'والإنذار المفيد يشير إلى حالة تستدعي قرارًا — برميل عند مستوى منخفض، أو فشل في التحقق من الضخ، أو مستشعر يقرأ خارج نطاقه المعقول، أو حلقة تحكم عاجزة عن بلوغ نقطة الضبط. أما التذبذب الطبيعي داخل النطاق الميت فليس إنذارًا، بل هو النظام وهو يعمل.',
            },
          },
        ],
      },
      {
        id: 'trend',
        heading: { en: 'What history makes possible', ar: 'ما يتيحه السجل التاريخي' },
        blocks: [
          {
            type: 'p',
            text: {
              en: 'A spot reading tells you the value. A trend tells you the story: whether the change was gradual or sudden, whether it tracks production, whether it started when the make-up source changed.',
              ar: 'تخبرك القراءة اللحظية بالقيمة، ويخبرك الاتجاه بالقصة: هل كان التغير تدريجيًا أم مفاجئًا، وهل يتبع الإنتاج، وهل بدأ عند تغيّر مصدر مياه التعويض.',
            },
          },
          {
            type: 'p',
            text: {
              en: 'That distinction is the difference between finding a cause and forming an opinion. Without logged history, an investigation into why something went wrong last month relies on recollection.',
              ar: 'وهذا التمييز هو الفارق بين إيجاد سبب وتكوين رأي. فبلا سجل مسجَّل، يعتمد التحقيق في سبب خلل حدث الشهر الماضي على الاستذكار.',
            },
          },
          {
            type: 'p',
            text: {
              en: 'History across seasons exposes patterns that no single visit can see: chemical consumption tracking production volume, conductivity drifting as a surface source changes through the year, cleaning frequency shortening month by month.',
              ar: 'ويكشف السجل عبر الفصول أنماطًا لا تراها زيارة واحدة: استهلاك كيماويات يتبع حجم الإنتاج، وتوصيلية تنحرف مع تغيّر مصدر سطحي على مدار العام، وتكرار تنظيف يتقلص شهرًا بعد شهر.',
            },
          },
          {
            type: 'note',
            text: {
              en: 'A logged record is also what makes a periodic technical report worth reading. A report that says what changed and why is a different document from one that reports the values on the day of the visit.',
              ar: 'والسجل المسجَّل هو أيضًا ما يجعل التقرير الفني الدوري يستحق القراءة. فالتقرير الذي يبيّن ما تغيّر ولماذا وثيقة مختلفة عن تقرير يذكر القيم في يوم الزيارة.',
            },
          },
        ],
      },
      {
        id: 'limits',
        heading: { en: 'What it does not do', ar: 'ما لا تفعله' },
        blocks: [
          {
            type: 'p',
            text: {
              en: 'Remote monitoring reports what the instruments report. If a sensor is fouled or out of calibration, remote access delivers the wrong number faster and to more people. It does not replace physical inspection or calibration.',
              ar: 'تنقل المراقبة عن بُعد ما تنقله الأجهزة. فإذا كان مستشعر متسخًا أو خارج المعايرة، فإن الوصول عن بُعد يوصل الرقم الخاطئ أسرع وإلى عدد أكبر من الناس. وهي لا تحل محل الفحص الميداني أو المعايرة.',
            },
          },
          {
            type: 'p',
            text: {
              en: 'It also cannot see what is not instrumented. Deposit condition, corrosion coupons, biological counts and the physical state of the plant remain site activities — and they are where several of the most important findings come from.',
              ar: 'ولا تستطيع رؤية ما ليس مزودًا بأجهزة قياس. فحالة الرواسب وشرائح التآكل والأعداد البيولوجية والحالة الفعلية للمنشأة تبقى أنشطة ميدانية — ومنها تأتي عدة من أهم النتائج.',
            },
          },
          {
            type: 'p',
            text: {
              en: 'The realistic value is a better-targeted visit: the specialist arrives already knowing what the trend has been doing, and spends the time on the thing that needs attention rather than on establishing what happened.',
              ar: 'والقيمة الواقعية هي زيارة أدق استهدافًا: فيصل المختص وهو يعرف بالفعل ما فعله الاتجاه، ويقضي الوقت على ما يحتاج انتباهًا بدل استقصاء ما حدث.',
            },
          },
        ],
      },
    ],
    checklist: [
      { en: 'Decide which conditions genuinely require a notification, and alarm only on those.', ar: 'حدد الحالات التي تستدعي تنبيهًا فعلًا، وأنذر عليها وحدها.' },
      { en: 'Confirm alarms reach a named person who can act, not a shared inbox.', ar: 'تأكد أن الإنذارات تصل إلى شخص محدد يستطيع التصرف، لا إلى بريد مشترك.' },
      { en: 'Verify sensor calibration on schedule — remote access does not detect a drifting sensor.', ar: 'تحقق من معايرة المستشعرات وفق جدول — فالوصول عن بُعد لا يكتشف مستشعرًا منحرفًا.' },
      { en: 'Review trends periodically rather than only when something goes wrong.', ar: 'راجع الاتجاهات دوريًا لا عند حدوث خلل فقط.' },
      { en: 'Keep physical inspection in the routine — deposits and coupons are not visible remotely.', ar: 'أبقِ الفحص الميداني ضمن الروتين — فالرواسب والشرائح غير مرئية عن بُعد.' },
      { en: 'Use the logged history to make the periodic technical report say what changed.', ar: 'استخدم السجل التاريخي ليبيّن التقرير الفني الدوري ما الذي تغيّر.' },
    ],
    escalation: {
      en: 'Remote data is most valuable when someone technical reviews it regularly rather than only when an alarm fires. Data that nobody reviews is storage, not monitoring — and the difference between the two is a person looking at the trend and saying what it means.',
      ar: 'تبلغ البيانات عن بُعد أقصى قيمتها حين يراجعها مختص فني بانتظام لا عند إطلاق إنذار فقط. فالبيانات التي لا يراجعها أحد تخزين لا مراقبة — والفارق بينهما شخص ينظر إلى الاتجاه ويقول ما يعنيه.',
    },
    solutions: ['cooling-water', 'boiler-steam', 'industrial-water'],
    technologies: ['automation-remote-monitoring', 'monitoring-control', 'sensors-measurement'],
    products: ['walchem-fluent', 'walchem-intuition-9', 'walchem-intuition-6'],
    faqs: [
      {
        id: 'q1',
        question: { en: 'Does remote monitoring reduce the need for site visits?', ar: 'هل تقلل المراقبة عن بُعد الحاجة إلى الزيارات الميدانية؟' },
        answer: {
          en: 'It changes what a visit is for more than how often one is needed. Calibration, physical inspection, deposit assessment and coupon exchange all still require attendance. What changes is that the specialist arrives knowing what to look at.',
          ar: 'تغيّر الغرض من الزيارة أكثر مما تغيّر عدد الزيارات اللازمة. فالمعايرة والفحص الميداني وتقييم الرواسب وتبديل الشرائح تحتاج حضورًا. وما يتغير هو أن المختص يصل عارفًا بما ينبغي النظر إليه.',
        },
      },
      {
        id: 'q2',
        question: { en: 'Can it control the system remotely?', ar: 'هل يمكنها التحكم في النظام عن بُعد؟' },
        answer: {
          en: 'Remote visibility and remote control are different capabilities with different risk profiles. Visibility of trends and alarms carries little risk; changing a live setpoint remotely on a plant nobody is standing next to is a decision that needs deliberate scoping, not a default.',
          ar: 'الرؤية عن بُعد والتحكم عن بُعد قدرتان مختلفتان بمستويي مخاطر مختلفين. فرؤية الاتجاهات والإنذارات لا تحمل خطرًا يُذكر، أما تغيير نقطة ضبط حية عن بُعد في منشأة لا يقف أحد بجوارها فقرار يحتاج تحديد نطاق متعمدًا لا أن يكون خيارًا افتراضيًا.',
        },
      },
    ],
  },

  /* ====================================================================== */
  {
    slug: 'designing-a-treatment-program',
    status: 'published',
    category: 'water-chemistry',
    readingMinutes: 8,
    publishedAt: '2026-04-20',
    title: { en: 'Designing a Practical Water Treatment Programme', ar: 'تصميم برنامج معالجة مياه عملي' },
    question: {
      en: 'What separates a treatment programme that holds from one that looks correct on paper?',
      ar: 'ما الذي يفصل بين برنامج معالجة يصمد وآخر يبدو صحيحًا على الورق؟',
    },
    summary: {
      en: 'A programme is a chemistry, a control strategy, a verification method and a review cycle. Leave out any one of the four and the other three eventually stop working.',
      ar: 'البرنامج هو كيمياء واستراتيجية تحكم وطريقة تحقق ودورة مراجعة. وإسقاط أي من الأربعة يوقف الثلاثة الأخرى في النهاية.',
    },
    metaTitle: { en: 'Designing a Practical Water Treatment Programme | C-Water', ar: 'تصميم برنامج معالجة مياه عملي | C-Water' },
    metaDescription: {
      en: 'How a water treatment programme is put together: defining the objective, analysis, mechanical versus chemical removal, control strategy, verification and review.',
      ar: 'كيف يُبنى برنامج معالجة المياه: تحديد الهدف، والتحليل، والإزالة الميكانيكية مقابل الكيميائية، واستراتيجية التحكم، والتحقق، والمراجعة.',
    },
    sections: [
      {
        id: 'objective',
        heading: { en: 'Start with what has to be protected', ar: 'ابدأ بما يجب حمايته' },
        blocks: [
          {
            type: 'p',
            text: {
              en: '"Treat the water" is not an objective. The objective is protecting a specific asset from a specific mechanism, and stating it that precisely is what makes the programme reviewable later.',
              ar: '«معالجة المياه» ليست هدفًا. فالهدف هو حماية أصل محدد من آلية محددة، وصياغة ذلك بهذه الدقة هي ما يجعل البرنامج قابلًا للمراجعة لاحقًا.',
            },
          },
          {
            type: 'p',
            text: {
              en: 'Protecting condenser tubes from carbonate scale at high heat flux is a different problem from protecting a mild steel closed loop from oxygen corrosion, even though both are described as corrosion and scale control.',
              ar: 'فحماية أنابيب مكثف من ترسبات الكربونات عند تدفق حراري عالٍ مشكلة مختلفة عن حماية دائرة مغلقة من الفولاذ الطري من تآكل الأكسجين، رغم وصف كليهما بالتحكم في التآكل والترسبات.',
            },
          },
          {
            type: 'p',
            text: {
              en: 'A clear objective also tells you what success looks like — and a programme without a definition of success cannot be assessed, only continued.',
              ar: 'كما يخبرك الهدف الواضح بشكل النجاح — والبرنامج بلا تعريف للنجاح لا يمكن تقييمه، بل الاستمرار فيه فقط.',
            },
          },
        ],
      },
      {
        id: 'sequence',
        heading: { en: 'The order the work goes in', ar: 'ترتيب سير العمل' },
        blocks: [
          {
            type: 'ol',
            items: [
              { en: '**Analyse.** Make-up and system water, read against the actual metallurgy, temperatures and duty. Everything downstream rests on this.', ar: '**التحليل.** مياه التعويض ومياه النظام، مقروءة في ضوء المعادن الفعلية ودرجات الحرارة وظروف التشغيل. وكل ما يليه يستند إليه.' },
              { en: '**Establish the limits.** Achievable cycles, the pH window the metallurgy allows, the maximum concentration each critical species can reach.', ar: '**تحديد الحدود.** دورات التركيز الممكنة، ونافذة الحموضة التي تسمح بها المعادن، وأقصى تركيز يمكن أن يبلغه كل نوع حرج.' },
              { en: '**Remove mechanically what you can.** Filtration, separation and pretreatment are usually cheaper per unit of load removed than chemistry, and they reduce what the chemistry has to carry.', ar: '**أزل ميكانيكيًا ما يمكنك إزالته.** فالترشيح والفصل والمعالجة الأولية أرخص عادةً لكل وحدة حمل مزالة من الكيمياء، وتقلل ما يجب أن تحمله الكيمياء.' },
              { en: '**Select the chemistry as a set.** Inhibitor, dispersant and biocide chosen together, so an oxidiser does not degrade the inhibitor protecting the metal.', ar: '**اختر الكيمياء كمجموعة.** فالمثبط والمشتت والمبيد تُختار معًا، بحيث لا يُفكك المؤكسد المثبطَ الذي يحمي المعدن.' },
              { en: '**Design the control.** Which parameter drives which output, with what deadband, what feed limit and what interlock.', ar: '**صمّم التحكم.** أي متغير يقود أي مخرج، وبأي نطاق ميت، وأي حد ضخ، وأي تعشيق.' },
              { en: '**Define verification.** How you will confirm the programme is achieving the objective, and how often.', ar: '**حدد التحقق.** كيف ستؤكد أن البرنامج يحقق الهدف، وبأي وتيرة.' },
              { en: '**Set the review cycle.** When the programme will be reassessed against the system as it then is.', ar: '**حدد دورة المراجعة.** متى سيُعاد تقييم البرنامج مقابل النظام بحالته آنذاك.' },
            ],
          },
          {
            type: 'note',
            text: {
              en: 'Steps three and four are the ones most often reversed. Reaching for chemistry to solve a load that could have been removed mechanically is a decision that costs money every month for the life of the system.',
              ar: 'والخطوتان الثالثة والرابعة أكثر ما يُعكس ترتيبه. فاللجوء إلى الكيمياء لمعالجة حمل كان يمكن إزالته ميكانيكيًا قرار يكلف مالًا كل شهر طوال عمر النظام.',
            },
          },
        ],
      },
      {
        id: 'control',
        heading: { en: 'Control is part of the programme, not an accessory', ar: 'التحكم جزء من البرنامج لا ملحق به' },
        blocks: [
          {
            type: 'p',
            text: {
              en: 'A programme designed to hold a parameter within a range needs something capable of holding it there. Specifying chemistry that requires close control and then feeding it on a timer is specifying a programme that will not perform.',
              ar: 'البرنامج المصمم لإبقاء متغير ضمن نطاق يحتاج ما يستطيع إبقاءه هناك. فتحديد كيمياء تتطلب تحكمًا دقيقًا ثم ضخها بمؤقت هو تحديد برنامج لن يؤدي دوره.',
            },
          },
          {
            type: 'p',
            text: {
              en: 'The control strategy has to be written down: which measurement drives which output, what the setpoint and deadband are, what happens on a lost signal, and what the operator is expected to do when an alarm appears. A system nobody can explain in two years will be run on defaults.',
              ar: 'ويجب كتابة استراتيجية التحكم: أي قياس يقود أي مخرج، وما نقطة الضبط والنطاق الميت، وماذا يحدث عند فقد إشارة، وما المتوقع من المشغّل عند ظهور إنذار. فالنظام الذي لا يستطيع أحد شرحه بعد عامين سيُشغَّل بالإعدادات الافتراضية.',
            },
          },
        ],
      },
      {
        id: 'verification',
        heading: { en: 'Verification is what makes it a programme', ar: 'التحقق هو ما يجعله برنامجًا' },
        blocks: [
          {
            type: 'p',
            text: {
              en: 'Without verification you have a dosing arrangement and a hope. Verification operates at two levels, and both are needed.',
              ar: 'بلا تحقق، لديك ترتيب ضخ وأمل. ويعمل التحقق على مستويين، وكلاهما مطلوب.',
            },
          },
          {
            type: 'ul',
            items: [
              { en: '**Did the chemical arrive?** Feed verification, residual testing or drum level against calculated consumption. A controller calling for a dose is not evidence that a dose was delivered.', ar: '**هل وصل الكيماوي؟** تحقق من الضخ، أو اختبار متبقٍ، أو مستوى البرميل مقارنة بالاستهلاك المحسوب. فطلب وحدة التحكم لجرعة ليس دليلًا على ضخها.' },
              { en: '**Is it achieving the objective?** Corrosion coupons, deposit inspection, heat exchanger approach temperature, biological counts. These measure the outcome rather than the input.', ar: '**هل يحقق الهدف؟** شرائح التآكل، وفحص الرواسب، ودرجة حرارة الاقتراب في المبادل، والأعداد البيولوجية. وهذه تقيس النتيجة لا المدخل.' },
            ],
          },
          {
            type: 'p',
            text: {
              en: 'The second level is the one that gets dropped, because it is slower and less convenient. It is also the only one that answers whether the programme is worth what it costs.',
              ar: 'والمستوى الثاني هو الذي يُسقَط عادةً لأنه أبطأ وأقل ملاءمة. وهو أيضًا الوحيد الذي يجيب عمّا إذا كان البرنامج يستحق ما يكلفه.',
            },
          },
        ],
      },
      {
        id: 'review',
        heading: { en: 'Programmes drift because systems change', ar: 'البرامج تنحرف لأن الأنظمة تتغير' },
        blocks: [
          {
            type: 'p',
            text: {
              en: 'A programme correct at commissioning slowly stops being correct. Production changes, a heat exchanger is replaced with a different alloy, the make-up supply changes, an operator adjusts a setpoint for a good reason that nobody records.',
              ar: 'البرنامج الصحيح عند التشغيل الابتدائي يتوقف تدريجيًا عن كونه صحيحًا. فالإنتاج يتغير، ويُستبدل مبادل حراري بسبيكة مختلفة، ويتغير مصدر مياه التعويض، ويعدّل مشغّل نقطة ضبط لسبب وجيه لا يسجله أحد.',
            },
          },
          {
            type: 'p',
            text: {
              en: 'A review cycle exists to catch that. It compares the current system with the one the programme was designed for and asks whether the assumptions still hold. Where they do not, the programme changes — not because it failed, but because the system moved.',
              ar: 'ودورة المراجعة موجودة لالتقاط ذلك. فهي تقارن النظام الحالي بالنظام الذي صُمم البرنامج له وتسأل ما إذا كانت الافتراضات لا تزال قائمة. وحيث لا تكون كذلك، يتغير البرنامج — لا لأنه فشل بل لأن النظام تحرك.',
            },
          },
        ],
      },
    ],
    checklist: [
      { en: 'Write down the objective as a specific asset protected from a specific mechanism.', ar: 'اكتب الهدف كأصل محدد يُحمى من آلية محددة.' },
      { en: 'Obtain a current analysis of both make-up and system water.', ar: 'احصل على تحليل حديث لمياه التعويض ومياه النظام.' },
      { en: 'Establish the achievable limits before selecting any chemistry.', ar: 'حدد الحدود الممكنة قبل اختيار أي كيمياء.' },
      { en: 'Check what can be removed mechanically before deciding what to dose.', ar: 'تحقق مما يمكن إزالته ميكانيكيًا قبل تحديد ما ستضخه.' },
      { en: 'Confirm the chemistry components are compatible with each other.', ar: 'تأكد من توافق مكونات الكيمياء مع بعضها.' },
      { en: 'Write the control philosophy down, including what happens on a fault.', ar: 'اكتب فلسفة التحكم، بما في ذلك ما يحدث عند عطل.' },
      { en: 'Define both levels of verification and who performs each.', ar: 'حدد مستويي التحقق ومن يقوم بكل منهما.' },
      { en: 'Set a review interval and a trigger for early review after any system change.', ar: 'حدد فترة مراجعة ومحفزًا لمراجعة مبكرة بعد أي تغيير في النظام.' },
    ],
    escalation: {
      en: 'A programme that has failed twice is diagnostic information, and the most useful step on a difficult system is establishing what has actually been happening before proposing anything new. Where mixed metallurgy, an unusual source chemistry or a demanding operating envelope is involved, the acceptable chemistry window may be much narrower than a standard programme assumes — and confirming that before implementation is considerably cheaper than discovering it afterwards.',
      ar: 'البرنامج الذي فشل مرتين معلومة تشخيصية، وأنفع خطوة في نظام صعب هي تحديد ما كان يحدث فعليًا قبل اقتراح أي جديد. وحيث توجد معادن مختلطة أو كيمياء مصدر غير معتادة أو نطاق تشغيل شاق، قد تكون نافذة الكيمياء المقبولة أضيق كثيرًا مما يفترضه برنامج نمطي — وتأكيد ذلك قبل التنفيذ أرخص كثيرًا من اكتشافه بعده.',
    },
    solutions: ['cooling-water', 'boiler-steam', 'ro-membranes', 'process-water', 'wastewater', 'industrial-water', 'specialised-treatment'],
    technologies: ['water-analysis', 'water-treatment-chemicals', 'filtration', 'chemical-dosing', 'monitoring-control', 'engineering-integration'],
    products: ['kurita-cooling-programme', 'walchem-intuition-9', 'timex-svf-series', 'walchem-ix-series'],
    faqs: [
      {
        id: 'q1',
        question: { en: 'How often should a programme be reviewed?', ar: 'كل كم ينبغي مراجعة البرنامج؟' },
        answer: {
          en: 'On a defined interval, and additionally whenever the system changes — a new make-up source, a capacity change, replaced equipment or a change in operating pattern. The scheduled review catches drift; the triggered review catches the change that caused it.',
          ar: 'وفق فترة محددة، وإضافةً إلى ذلك كلما تغير النظام — مصدر تعويض جديد، أو تغيير في السعة، أو معدات مستبدلة، أو تغير في نمط التشغيل. فالمراجعة المجدولة تلتقط الانحراف، والمراجعة المُحفَّزة تلتقط التغيير الذي سببه.',
        },
      },
      {
        id: 'q2',
        question: { en: 'Can we reduce chemical cost without changing the programme?', ar: 'هل يمكن خفض تكلفة الكيماويات دون تغيير البرنامج؟' },
        answer: {
          en: 'Often, yes — but through control rather than dose reduction. Better control raises achievable cycles, feed verification stops chemical being wasted or not delivered, and mechanical removal reduces the demand. Cutting the dose without addressing the demand simply removes protection.',
          ar: 'غالبًا نعم — لكن عبر التحكم لا عبر خفض الجرعة. فالتحكم الأفضل يرفع دورات التركيز الممكنة، والتحقق من الضخ يمنع هدر الكيماويات أو عدم وصولها، والإزالة الميكانيكية تقلل الطلب. أما خفض الجرعة دون معالجة الطلب فيزيل الحماية فحسب.',
        },
      },
    ],
  },
];
