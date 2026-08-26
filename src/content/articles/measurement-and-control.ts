import type { Article } from '../types';

/** Knowledge Center — measurement, dosing, control and programme design. */
export const measurementAndControlArticles: Article[] = [
  /* ====================================================================== */
  {
    slug: 'what-conductivity-tells-you',
    status: 'published',
    category: 'monitoring-control',
    readingMinutes: 6,
    publishedAt: '2026-02-03',
    title: { en: 'What Does Conductivity Tell You About a Cooling Tower?', ar: 'ماذا تخبرك التوصيلية عن برج التبريد؟' },
    question: {
      en: 'What is conductivity actually measuring, and what can and cannot be concluded from it?',
      ar: 'ماذا تقيس التوصيلية فعليًا، وما الذي يمكن وما الذي لا يمكن استنتاجه منها؟',
    },
    summary: {
      en: 'Conductivity is a proxy for dissolved ion concentration. It is the most useful single measurement on a cooling system, and the most commonly over-interpreted.',
      ar: 'التوصيلية مؤشر بديل لتركيز الأيونات الذائبة. وهي أنفع قياس منفرد في نظام التبريد، وأكثرها تعرضًا للمبالغة في التفسير.',
    },
    metaTitle: { en: 'What Does Conductivity Tell You? | C-Water', ar: 'ماذا تخبرك التوصيلية؟ | C-Water' },
    metaDescription: {
      en: 'How conductivity measurement works in cooling water, what it can and cannot tell you, why temperature compensation matters, and how it drives blowdown control.',
      ar: 'كيف يعمل قياس التوصيلية في مياه التبريد، وما الذي يمكن وما لا يمكن أن يخبرك به، ولماذا يهم التعويض الحراري، وكيف يقود التحكم في التصريف.',
    },
    sections: [
      {
        id: 'what',
        heading: { en: 'What the measurement is', ar: 'ماهية القياس' },
        blocks: [
          {
            type: 'p',
            text: {
              en: 'Conductivity measures how readily water conducts an electric current, which depends on the concentration of dissolved ions in it. More dissolved salts, more conductivity.',
              ar: 'تقيس التوصيلية مدى سهولة توصيل المياه لتيار كهربائي، وهو ما يعتمد على تركيز الأيونات الذائبة فيها. فكلما زادت الأملاح الذائبة زادت التوصيلية.',
            },
          },
          {
            type: 'p',
            text: {
              en: 'That makes it a practical stand-in for total dissolved solids, and therefore the basis on which cycles of concentration and blowdown are controlled. It is fast, continuous, cheap to measure and robust enough for a plant room, which is why it is the parameter most cooling systems are actually run on.',
              ar: 'وهذا يجعلها بديلًا عمليًا للمواد الصلبة الذائبة الكلية، ومن ثم الأساس الذي تُدار عليه دورات التركيز والتصريف. وهي سريعة ومستمرة ورخيصة القياس ومتينة بما يكفي لغرفة المعدات، ولهذا فهي المتغير الذي تُشغَّل عليه معظم أنظمة التبريد فعليًا.',
            },
          },
        ],
      },
      {
        id: 'cannot',
        heading: { en: 'What it cannot tell you', ar: 'ما لا تستطيع أن تخبرك به' },
        blocks: [
          {
            type: 'p',
            text: {
              en: 'Conductivity is a sum, not a breakdown. It responds to total ionic content and says nothing about which ions are present.',
              ar: 'التوصيلية مجموع لا تفصيل. فهي تستجيب للمحتوى الأيوني الكلي ولا تقول شيئًا عن نوع الأيونات الموجودة.',
            },
          },
          {
            type: 'ul',
            items: [
              { en: 'It cannot distinguish scaling species from corrosive ones. The same reading could be mostly calcium and alkalinity, or mostly chloride — two very different problems.', ar: 'لا تميز بين الأنواع المرسِّبة والتآكلية. فالقراءة نفسها قد تكون في معظمها كالسيوم وقلوية، أو في معظمها كلوريد — وهما مشكلتان مختلفتان تمامًا.' },
              { en: 'It does not measure inhibitor residual. Treatment chemical contributes to conductivity, but the reading is not a check on the programme.', ar: 'لا تقيس متبقي المثبط. فالكيماوي يساهم في التوصيلية، لكن القراءة ليست فحصًا للبرنامج.' },
              { en: 'It does not see suspended solids or biological load, neither of which is ionic.', ar: 'لا ترى المواد الصلبة العالقة ولا الحمل البيولوجي، وكلاهما غير أيوني.' },
              { en: 'It does not indicate scaling tendency on its own — that requires the specific ion balance, temperature and pH.', ar: 'لا تدل وحدها على ميل الترسب — فذلك يتطلب التوازن الأيوني المحدد ودرجة الحرارة والحموضة.' },
            ],
          },
          {
            type: 'note',
            text: {
              en: 'A cooling system can hold a perfect conductivity reading and still be scaling, corroding or growing biofilm. Conductivity controls concentration; it does not confirm the treatment programme is working.',
              ar: 'قد يحافظ نظام تبريد على قراءة توصيلية مثالية وهو مع ذلك يترسب أو يتآكل أو ينمي غشاءً حيويًا. فالتوصيلية تتحكم في التركيز، ولا تؤكد أن برنامج المعالجة يعمل.',
            },
          },
        ],
      },
      {
        id: 'practical',
        heading: { en: 'Getting a reading you can trust', ar: 'الحصول على قراءة يمكن الوثوق بها' },
        blocks: [
          {
            type: 'p',
            text: {
              en: 'Conductivity varies significantly with temperature, so a compensated reading is essential — and the compensation has to be set for the water being measured, not left at a default that assumes something else.',
              ar: 'تتغير التوصيلية بشكل ملموس مع درجة الحرارة، فالقراءة المعوَّضة ضرورية — ويجب ضبط التعويض للمياه المقاسة لا تركه على إعداد افتراضي يفترض غير ذلك.',
            },
          },
          {
            type: 'p',
            text: {
              en: 'Sensor type follows the duty. Contacting cells are accurate in clean water at lower ranges but are affected by fouling and coating. Electrodeless sensors tolerate fouling and higher conductivity, which is why they suit dirtier recirculating systems.',
              ar: 'ويتبع نوع المستشعر ظروف التشغيل. فالخلايا التلامسية دقيقة في المياه النظيفة عند النطاقات الأدنى لكنها تتأثر بالاتساخ والتغطية. أما المستشعرات غير التلامسية فتتحمل الاتساخ والتوصيلية الأعلى، ولهذا تناسب الأنظمة الدائرة الأكثر اتساخًا.',
            },
          },
          {
            type: 'p',
            text: {
              en: 'Location decides whether the number means anything. The sensor needs to sit in flowing, well-mixed water — not in a dead leg, and not immediately downstream of the chemical injection point, where it will read a slug of concentrate rather than the system.',
              ar: 'والموضع يحدد ما إذا كان الرقم يعني شيئًا. فالمستشعر يجب أن يكون في مياه متدفقة جيدة الخلط — لا في فرع ميت، ولا مباشرة بعد نقطة حقن الكيماويات، حيث سيقرأ دفعة مركّزة لا حالة النظام.',
            },
          },
        ],
      },
      {
        id: 'control',
        heading: { en: 'Using it for control', ar: 'استخدامها في التحكم' },
        blocks: [
          {
            type: 'p',
            text: {
              en: 'Blowdown driven by conductivity holds cycles of concentration at a measured value. When evaporation raises the concentration above setpoint, the valve opens; when concentration falls back into the deadband, it closes.',
              ar: 'يثبّت التصريف المدفوع بالتوصيلية دورات التركيز عند قيمة مقاسة. فحين يرفع التبخر التركيزَ فوق نقطة الضبط يفتح الصمام، وحين يعود التركيز إلى النطاق الميت يُغلق.',
            },
          },
          {
            type: 'p',
            text: {
              en: 'The deadband is not a detail. A setpoint without one produces a valve that cycles constantly, wearing the actuator and destabilising the reading. Feed limits and lockout timers serve the same purpose — they are what make an automatic system stable rather than merely automatic.',
              ar: 'والنطاق الميت ليس تفصيلة. فنقطة ضبط بلا نطاق ميت تنتج صمامًا يعمل ويتوقف باستمرار، فيتآكل المشغّل وتضطرب القراءة. وتؤدي حدود الضخ ومؤقتات الحجب الغرض نفسه — فهي ما يجعل النظام الأوتوماتيكي مستقرًا لا مجرد أوتوماتيكي.',
            },
          },
          {
            type: 'p',
            text: {
              en: 'The most useful thing conductivity gives you is not the instantaneous number but the trend. A slow upward drift points to blowdown not keeping up or a valve partially blocked. A sudden fall suggests dilution — a leak, an overflow, or make-up entering somewhere it should not.',
              ar: 'وأنفع ما تمنحه التوصيلية ليس الرقم اللحظي بل الاتجاه. فانحراف بطيء صاعد يشير إلى تصريف لا يواكب أو صمام مسدود جزئيًا. وانخفاض مفاجئ يوحي بتخفيف — تسرب أو فيض أو مياه تعويض تدخل من موضع لا ينبغي.',
            },
          },
        ],
      },
    ],
    checklist: [
      { en: 'Confirm temperature compensation is enabled and correctly configured.', ar: 'تأكد أن التعويض الحراري مُفعَّل ومضبوط بشكل صحيح.' },
      { en: 'Calibrate the sensor against a known standard and record the pre-calibration reading.', ar: 'عايِر المستشعر مقابل معيار معلوم وسجّل القراءة قبل المعايرة.' },
      { en: 'Check the sensor is in flowing, representative water — not a dead leg or a post-injection point.', ar: 'تأكد أن المستشعر في مياه متدفقة وتمثيلية — لا في فرع ميت أو بعد نقطة الحقن.' },
      { en: 'Verify the sensor type suits the water: electrodeless where fouling is likely.', ar: 'تحقق من ملاءمة نوع المستشعر للمياه: غير تلامسي حيث يُرجَّح الاتساخ.' },
      { en: 'Compare the controller reading against a handheld meter periodically.', ar: 'قارن قراءة وحدة التحكم بجهاز محمول بشكل دوري.' },
      { en: 'Confirm the blowdown setpoint has a sensible deadband.', ar: 'تأكد أن نقطة ضبط التصريف لها نطاق ميت معقول.' },
      { en: 'Trend the reading rather than reading it — the shape carries more information than the value.', ar: 'تتبع اتجاه القراءة بدل قراءتها لحظيًا — فالشكل يحمل معلومات أكثر من القيمة.' },
    ],
    escalation: {
      en: 'If the controller reading and a calibrated handheld disagree, resolve that before making any control decision — a drifting sensor makes every dosing and blowdown decision downstream of it wrong, quietly, for as long as it goes unnoticed. And if conductivity is stable but deposits or corrosion are appearing, the answer is not in this measurement: a full water analysis is needed to see which ions are actually present.',
      ar: 'إذا تباينت قراءة وحدة التحكم وجهاز محمول معايَر، فاحسم ذلك قبل أي قرار تحكم — فالمستشعر المنحرف يجعل كل قرار ضخ وتصريف بعده خاطئًا بهدوء طوال بقائه دون ملاحظة. وإذا كانت التوصيلية مستقرة بينما تظهر رواسب أو تآكل، فالجواب ليس في هذا القياس: يلزم تحليل مياه كامل لمعرفة الأيونات الموجودة فعلًا.',
    },
    solutions: ['cooling-water', 'boiler-steam', 'ro-membranes'],
    technologies: ['sensors-measurement', 'monitoring-control', 'water-analysis'],
    products: ['walchem-conductivity-sensors', 'walchem-intuition-9', 'walchem-w100'],
    faqs: [
      {
        id: 'q1',
        question: { en: 'Can conductivity replace a full water analysis?', ar: 'هل يمكن أن تحل التوصيلية محل تحليل مياه كامل؟' },
        answer: {
          en: 'No. It gives you the total, not the composition. Two waters with identical conductivity can have completely different scaling and corrosion behaviour depending on which ions make up that total. Conductivity is for control between analyses, not instead of them.',
          ar: 'لا. فهي تعطيك المجموع لا التركيب. وقد يكون لمياه متطابقة التوصيلية سلوك ترسب وتآكل مختلف تمامًا بحسب الأيونات المكوّنة لذلك المجموع. فالتوصيلية للتحكم بين التحاليل لا بديلًا عنها.',
        },
      },
      {
        id: 'q2',
        question: { en: 'Why does our reading drift over a few weeks?', ar: 'لماذا تنحرف قراءتنا خلال بضعة أسابيع؟' },
        answer: {
          en: 'Usually sensor fouling or coating, particularly on a contacting cell in a system carrying suspended solids. Compare against a calibrated handheld to confirm, then either shorten the cleaning interval or change to an electrodeless sensor better suited to the duty.',
          ar: 'عادةً اتساخ المستشعر أو تغطيته، خاصة في خلية تلامسية داخل نظام يحمل مواد صلبة عالقة. قارن بجهاز محمول معايَر للتأكد، ثم إما أن تقصّر فترة التنظيف أو تنتقل إلى مستشعر غير تلامسي أنسب للتطبيق.',
        },
      },
    ],
  },

  /* ====================================================================== */
  {
    slug: 'role-of-orp',
    status: 'published',
    category: 'monitoring-control',
    readingMinutes: 6,
    publishedAt: '2026-04-06',
    title: { en: 'The Role of ORP in Water Treatment', ar: 'دور ORP في معالجة المياه' },
    question: {
      en: 'What does an ORP reading actually mean, and can it be used to control biocide dosing?',
      ar: 'ماذا تعني قراءة ORP فعليًا، وهل يمكن استخدامها للتحكم في ضخ المبيدات؟',
    },
    summary: {
      en: 'ORP measures oxidising capacity, not disinfectant concentration. It is an excellent control input and a poor substitute for a residual test.',
      ar: 'يقيس ORP القدرة على الأكسدة لا تركيز المطهر. وهو مدخل تحكم ممتاز وبديل رديء عن اختبار المتبقي.',
    },
    metaTitle: { en: 'The Role of ORP in Water Treatment | C-Water', ar: 'دور ORP في معالجة المياه | C-Water' },
    metaDescription: {
      en: 'Understanding ORP in water treatment: what oxidation-reduction potential measures, how pH and temperature affect it, and how to use it for halogen feed control.',
      ar: 'فهم ORP في معالجة المياه: ما الذي يقيسه جهد الأكسدة والاختزال، وكيف تؤثر الحموضة والحرارة فيه، وكيفية استخدامه للتحكم في ضخ الهالوجينات.',
    },
    sections: [
      {
        id: 'what',
        heading: { en: 'What is being measured', ar: 'ما الذي يُقاس' },
        blocks: [
          {
            type: 'p',
            text: {
              en: 'Oxidation-reduction potential is a voltage — the tendency of the water to gain or lose electrons, measured against a reference electrode. A high positive reading means the water is in an oxidising state and will readily take electrons from whatever it contacts, including microbial cell walls.',
              ar: 'جهد الأكسدة والاختزال جهد كهربائي — أي ميل المياه لاكتساب الإلكترونات أو فقدها، مقاسًا مقابل قطب مرجعي. والقراءة الموجبة المرتفعة تعني أن المياه في حالة مؤكسِدة وستأخذ الإلكترونات بسهولة مما تلامسه، بما في ذلك جدران الخلايا الميكروبية.',
            },
          },
          {
            type: 'p',
            text: {
              en: 'That relationship to biological activity is what makes ORP interesting. It reflects the water’s actual oxidising capability at that moment, which is closer to what matters biologically than a concentration figure is.',
              ar: 'وهذه العلاقة بالنشاط البيولوجي هي ما يجعل ORP مثيرًا للاهتمام. فهو يعكس القدرة الفعلية للمياه على الأكسدة في تلك اللحظة، وهو أقرب إلى ما يهم بيولوجيًا من رقم التركيز.',
            },
          },
        ],
      },
      {
        id: 'not',
        heading: { en: 'What it is not', ar: 'ما ليس هو' },
        blocks: [
          {
            type: 'p',
            text: {
              en: 'ORP is not a concentration measurement. It responds to the oxidising environment as a whole, and several things shift the relationship between ORP and the actual halogen residual.',
              ar: 'ORP ليس قياسًا للتركيز. فهو يستجيب للبيئة المؤكسدة ككل، وعدة عوامل تُزيح العلاقة بينه وبين متبقي الهالوجين الفعلي.',
            },
          },
          {
            type: 'ul',
            items: [
              { en: '**pH.** The proportion of hypochlorous acid to hypochlorite shifts with pH, and the two have very different oxidising strength. The same residual reads differently at different pH.', ar: '**درجة الحموضة.** تتغير نسبة حمض الهيبوكلوروز إلى الهيبوكلوريت مع pH، ولهما قوة أكسدة مختلفة جدًا. فالمتبقي نفسه يُقرأ بشكل مختلف عند حموضات مختلفة.' },
              { en: '**Reducing agents in the water.** Organics, sulphide, iron and ammonia all consume oxidant and suppress ORP independently of how much has been dosed.', ar: '**العوامل المختزلة في المياه.** فالعضويات والكبريتيد والحديد والأمونيا تستهلك المؤكسد وتخفض ORP بمعزل عن الجرعة المضخوخة.' },
              { en: '**Temperature.** The electrode response and the underlying equilibria both move with it.', ar: '**درجة الحرارة.** تتغير استجابة القطب والاتزانات الكامنة معها.' },
              { en: '**Electrode condition.** ORP electrodes foul and age, and a coated reference junction drifts without any obvious sign.', ar: '**حالة القطب.** تتسخ أقطاب ORP وتشيخ، وينحرف الوصل المرجعي المغطى دون علامة واضحة.' },
            ],
          },
          {
            type: 'note',
            text: {
              en: 'Because of pH dependence in particular, an ORP setpoint that was correct at one pH is not correct at another. This is the single most common reason an ORP-controlled system stops behaving as expected.',
              ar: 'وبسبب الاعتماد على الحموضة تحديدًا، فإن نقطة ضبط ORP التي كانت صحيحة عند حموضة معينة ليست صحيحة عند أخرى. وهذا أشيع سبب منفرد لتوقف نظام محكوم بـORP عن التصرف كما هو متوقع.',
            },
          },
        ],
      },
      {
        id: 'using',
        heading: { en: 'Using it well', ar: 'استخدامه بشكل صحيح' },
        blocks: [
          {
            type: 'p',
            text: {
              en: 'ORP works well as a control input for halogen feed. It responds quickly, it reflects the oxidising state directly, and it holds a condition rather than delivering a fixed dose regardless of demand.',
              ar: 'يعمل ORP جيدًا كمدخل تحكم لضخ الهالوجينات. فهو يستجيب بسرعة، ويعكس حالة الأكسدة مباشرة، ويحافظ على حالة معينة بدل ضخ جرعة ثابتة بغض النظر عن الطلب.',
            },
          },
          {
            type: 'p',
            text: {
              en: 'The correct way to use it is to establish the relationship on your system: run the system, measure the actual halogen residual by test kit, and record the corresponding ORP. That correlation — at your pH, in your water — is what makes an ORP setpoint meaningful.',
              ar: 'والطريقة الصحيحة لاستخدامه هي تحديد العلاقة على نظامك: شغّل النظام، وقِس متبقي الهالوجين الفعلي بعدّة اختبار، وسجّل قيمة ORP المقابلة. وهذا الارتباط — عند حموضتك وفي مياهك — هو ما يجعل نقطة ضبط ORP ذات معنى.',
            },
          },
          {
            type: 'p',
            text: {
              en: 'Then keep verifying it. Periodic residual testing alongside the ORP reading confirms the relationship still holds, and it is the check that catches a drifting electrode before the drift becomes a biological problem.',
              ar: 'ثم واصل التحقق منه. فاختبار المتبقي الدوري إلى جانب قراءة ORP يؤكد أن العلاقة لا تزال قائمة، وهو الفحص الذي يكتشف انحراف القطب قبل أن يتحول إلى مشكلة بيولوجية.',
            },
          },
        ],
      },
      {
        id: 'limits',
        heading: { en: 'What ORP will never tell you', ar: 'ما لن يخبرك به ORP أبدًا' },
        blocks: [
          {
            type: 'p',
            text: {
              en: 'ORP describes the bulk water. Biofilm lives on surfaces, and an established film both shelters the organisms beneath it and creates its own local chemistry. A system can hold an excellent ORP in the bulk while a mature biofilm continues untroubled on the exchanger.',
              ar: 'يصف ORP الكتلة المائية. أما الغشاء الحيوي فيعيش على الأسطح، والغشاء المستقر يحمي الكائنات أسفله ويخلق كيمياء موضعية خاصة به. فقد يحافظ نظام على ORP ممتاز في الكتلة بينما يستمر غشاء حيوي ناضج دون إزعاج على المبادل.',
            },
          },
          {
            type: 'p',
            text: {
              en: 'This is why microbiological control is assessed on surface condition and biological counts, not on an oxidant reading alone — and why systems with poor filtration frequently show biological problems despite a well-controlled ORP.',
              ar: 'ولهذا يُقيَّم التحكم الميكروبيولوجي بحالة السطح والأعداد البيولوجية لا بقراءة المؤكسد وحدها — ولهذا كثيرًا ما تُظهر الأنظمة ضعيفة الترشيح مشكلات بيولوجية رغم ORP جيد التحكم.',
            },
          },
        ],
      },
    ],
    checklist: [
      { en: 'Record pH alongside every ORP reading — the two cannot be interpreted separately.', ar: 'سجّل درجة الحموضة مع كل قراءة ORP — فلا يمكن تفسير أحدهما بمعزل عن الآخر.' },
      { en: 'Establish the ORP-to-residual relationship on your own system by parallel testing.', ar: 'حدد العلاقة بين ORP والمتبقي على نظامك عبر اختبار متوازٍ.' },
      { en: 'Verify that relationship periodically rather than assuming it holds.', ar: 'تحقق من تلك العلاقة دوريًا بدل افتراض ثباتها.' },
      { en: 'Clean and calibrate the ORP electrode on a defined schedule.', ar: 'نظّف قطب ORP وعايره وفق جدول محدد.' },
      { en: 'Check for reducing agents in the water that may be suppressing the reading.', ar: 'ابحث عن عوامل مختزلة في المياه قد تخفض القراءة.' },
      { en: 'Assess biological control on surface condition and counts, not on ORP alone.', ar: 'قيّم التحكم البيولوجي بحالة السطح والأعداد لا بـORP وحده.' },
    ],
    escalation: {
      en: 'If ORP is at setpoint but biological counts are high or biofilm is visible, the issue is not the oxidant level — it is access. Established biofilm, settled deposits and low-velocity areas all shelter organisms from an oxidant that is present in the bulk water. That is a filtration, hydraulic or cleaning problem, and increasing the ORP setpoint will not reach it.',
      ar: 'إذا كان ORP عند نقطة الضبط بينما الأعداد البيولوجية مرتفعة أو الغشاء الحيوي ظاهر، فالمشكلة ليست في مستوى المؤكسد بل في الوصول. فالأغشية الحيوية المستقرة والرواسب ومناطق السرعة المنخفضة تحمي الكائنات من مؤكسد موجود في الكتلة المائية. وهذه مشكلة ترشيح أو هيدروليكا أو تنظيف، ولن يصل إليها رفع نقطة ضبط ORP.',
    },
    solutions: ['cooling-water', 'potable-water', 'process-water'],
    technologies: ['sensors-measurement', 'monitoring-control', 'chemical-dosing', 'water-treatment-chemicals'],
    products: ['walchem-ph-orp-sensors', 'walchem-intuition-9', 'walchem-disinfection-sensors', 'kurita-dilurit-bc'],
    faqs: [
      {
        id: 'q1',
        question: { en: 'Is there a universal ORP setpoint for cooling water?', ar: 'هل توجد نقطة ضبط ORP عامة لمياه التبريد؟' },
        answer: {
          en: 'No. The relationship between ORP and effective residual depends on your pH, your water composition and your electrode. A setpoint copied from another system is a guess. Establish it by parallel residual testing on the system it will control.',
          ar: 'لا. فالعلاقة بين ORP والمتبقي الفعّال تعتمد على حموضتك وتركيب مياهك وقطبك. ونقطة ضبط منسوخة من نظام آخر مجرد تخمين. حدّدها باختبار متبقٍ متوازٍ على النظام الذي ستتحكم فيه.',
        },
      },
      {
        id: 'q2',
        question: { en: 'Does ORP work for non-oxidising biocides?', ar: 'هل يصلح ORP للمبيدات غير المؤكسدة؟' },
        answer: {
          en: 'No. Non-oxidising biocides work by a different mechanism and do not raise oxidising potential, so ORP gives no indication of their presence or effectiveness. They are dosed on a timed or volume basis and verified differently.',
          ar: 'لا. فالمبيدات غير المؤكسدة تعمل بآلية مختلفة ولا ترفع جهد الأكسدة، فلا يعطي ORP أي دلالة على وجودها أو فعاليتها. وتُضخ على أساس زمني أو حجمي ويُتحقق منها بطرق أخرى.',
        },
      },
    ],
  },

  /* ====================================================================== */
  {
    slug: 'how-ph-affects-treatment',
    status: 'published',
    category: 'water-chemistry',
    readingMinutes: 7,
    publishedAt: '2026-04-13',
    title: { en: 'How pH Affects Industrial Water Treatment', ar: 'كيف تؤثر درجة الحموضة في معالجة المياه الصناعية' },
    question: {
      en: 'Why does pH matter so much, and why is there no single correct value?',
      ar: 'لماذا تهم درجة الحموضة إلى هذا الحد، ولماذا لا توجد قيمة صحيحة واحدة؟',
    },
    summary: {
      en: 'pH sets the behaviour of nearly every other reaction in a water system. It is a balance point between competing failure modes, not a target to be maximised.',
      ar: 'تحدد درجة الحموضة سلوك كل تفاعل آخر في نظام المياه تقريبًا. وهي نقطة توازن بين أنماط فشل متنافسة، لا هدف يُرفع إلى أقصاه.',
    },
    metaTitle: { en: 'How pH Affects Industrial Water Treatment | C-Water', ar: 'كيف تؤثر درجة الحموضة في معالجة المياه الصناعية | C-Water' },
    metaDescription: {
      en: 'How pH influences scaling tendency, corrosion rate, inhibitor performance, biocide effectiveness and coagulation — and why the correct value depends on the system.',
      ar: 'كيف تؤثر درجة الحموضة في ميل الترسب ومعدل التآكل وأداء المثبطات وفعالية المبيدات والترويب — ولماذا تعتمد القيمة الصحيحة على النظام.',
    },
    sections: [
      {
        id: 'why',
        heading: { en: 'Why one number moves everything else', ar: 'لماذا يحرك رقم واحد كل شيء آخر' },
        blocks: [
          {
            type: 'p',
            text: {
              en: 'pH is the logarithmic measure of hydrogen ion activity. A change of one pH unit is a tenfold change in that activity — which is why an apparently small shift produces a disproportionate effect on the reactions that depend on it.',
              ar: 'درجة الحموضة قياس لوغاريتمي لنشاط أيون الهيدروجين. وتغيّر وحدة واحدة يعني تغيرًا عشرة أضعاف في ذلك النشاط — ولهذا ينتج تحول يبدو صغيرًا أثرًا غير متناسب على التفاعلات المعتمدة عليه.',
            },
          },
          {
            type: 'p',
            text: {
              en: 'Almost every process in a treated water system is pH-dependent, and — critically — they do not all prefer the same direction.',
              ar: 'وكل عملية تقريبًا في نظام مياه معالَج تعتمد على درجة الحموضة، والأهم أنها لا تفضّل جميعها الاتجاه نفسه.',
            },
          },
        ],
      },
      {
        id: 'effects',
        heading: { en: 'What pH controls', ar: 'ما الذي تتحكم فيه درجة الحموضة' },
        blocks: [
          {
            type: 'ul',
            items: [
              { en: '**Scaling tendency.** Carbonate equilibrium shifts with pH. Higher pH means more carbonate available, and calcium carbonate becomes more likely to precipitate.', ar: '**ميل الترسب.** يتغير اتزان الكربونات مع الحموضة. فارتفاعها يعني توفر كربونات أكثر، ويصبح ترسب كربونات الكالسيوم أرجح.' },
              { en: '**Corrosion rate.** Low pH removes the protective film on carbon steel and accelerates metal loss.', ar: '**معدل التآكل.** يزيل انخفاض الحموضة الغشاء الواقي على الفولاذ الكربوني ويسرّع فقد المعدن.' },
              { en: '**Inhibitor performance.** Most corrosion inhibitors have a defined pH window. Outside it they underperform or stop working entirely.', ar: '**أداء المثبطات.** لمعظم مثبطات التآكل نافذة حموضة محددة. وخارجها يضعف أداؤها أو تتوقف تمامًا.' },
              { en: '**Biocide effectiveness.** Chlorine chemistry is strongly pH-dependent: the proportion present as hypochlorous acid, the more active form, falls as pH rises.', ar: '**فعالية المبيدات.** كيمياء الكلور شديدة الاعتماد على الحموضة: فنسبة الموجود على هيئة حمض الهيبوكلوروز، وهو الشكل الأنشط، تنخفض مع ارتفاعها.' },
              { en: '**Coagulation.** Coagulants have an optimum pH range for floc formation, and outside it the same dose achieves much less.', ar: '**الترويب.** للمروّبات نطاق حموضة أمثل لتكوين الندف، وخارجه تحقق الجرعة نفسها أقل بكثير.' },
              { en: '**Metal solubility.** Iron, copper, aluminium and zinc all change solubility with pH, which affects both what dissolves and what deposits.', ar: '**ذوبانية المعادن.** تتغير ذوبانية الحديد والنحاس والألومنيوم والزنك مع الحموضة، مما يؤثر فيما يذوب وما يترسب.' },
            ],
          },
        ],
      },
      {
        id: 'tension',
        heading: { en: 'The tension you cannot design away', ar: 'التوتر الذي لا يمكن التخلص منه بالتصميم' },
        blocks: [
          {
            type: 'p',
            text: {
              en: 'Scaling and corrosion respond to pH in opposite directions. Raising pH suppresses corrosion of carbon steel and promotes carbonate scaling. Lowering it suppresses scaling and promotes corrosion.',
              ar: 'يستجيب الترسب والتآكل للحموضة في اتجاهين متعاكسين. فرفعها يكبح تآكل الفولاذ الكربوني ويشجع ترسب الكربونات، وخفضها يكبح الترسب ويشجع التآكل.',
            },
          },
          {
            type: 'p',
            text: {
              en: 'There is therefore no universally correct pH. The right value is a compromise, and where the compromise sits depends on the metallurgy present, the water chemistry, the operating temperature and the inhibitor programme in use.',
              ar: 'ولذلك لا توجد درجة حموضة صحيحة عالميًا. فالقيمة الصحيحة حل وسط، وموضع هذا الحل يعتمد على المعادن الموجودة وكيمياء المياه ودرجة حرارة التشغيل وبرنامج المثبطات المستخدم.',
            },
          },
          {
            type: 'note',
            text: {
              en: 'Mixed metallurgy narrows the window considerably. A circuit containing aluminium or certain copper alloys alongside carbon steel has a much smaller acceptable range than one built entirely from steel — because the pH that protects one may attack another.',
              ar: 'وتضيّق المعادن المختلطة النافذةَ كثيرًا. فدائرة تحتوي ألومنيوم أو سبائك نحاس معينة إلى جانب الفولاذ الكربوني لها نطاق مقبول أصغر بكثير من دائرة مبنية بالكامل من الفولاذ — لأن الحموضة التي تحمي أحدهما قد تهاجم الآخر.',
            },
          },
        ],
      },
      {
        id: 'measuring',
        heading: { en: 'Getting a pH reading you can rely on', ar: 'الحصول على قراءة حموضة يمكن الاعتماد عليها' },
        blocks: [
          {
            type: 'p',
            text: {
              en: 'pH electrodes are consumable items. They drift, they foul and they eventually fail, and they rarely announce any of it. A drifting pH reading is one of the most common root causes of unexplained treatment problems, precisely because it produces plausible numbers while being wrong.',
              ar: 'أقطاب pH مواد استهلاكية. فهي تنحرف وتتسخ وتتلف في النهاية، ونادرًا ما تعلن عن أي من ذلك. وانحراف قراءة pH من أشيع الأسباب الجذرية لمشكلات المعالجة غير المفسّرة، تحديدًا لأنه ينتج أرقامًا معقولة وهي خاطئة.',
            },
          },
          {
            type: 'p',
            text: {
              en: 'Two-point calibration against fresh buffers is the minimum discipline, and recording the pre-calibration reading each time turns calibration into a drift record. An electrode that needs a large correction every visit is telling you it is near the end of its life.',
              ar: 'والمعايرة بنقطتين مقابل محاليل منظّمة حديثة هي الحد الأدنى من الانضباط، وتسجيل القراءة قبل المعايرة في كل مرة يحوّل المعايرة إلى سجل انحراف. فالقطب الذي يحتاج تصحيحًا كبيرًا في كل زيارة يخبرك بأنه قارب نهاية عمره.',
            },
          },
          {
            type: 'p',
            text: {
              en: 'Sensor placement matters as much as calibration. An electrode immediately downstream of an acid or caustic injection point reads the injection, not the system. Give it enough distance for mixing.',
              ar: 'وموضع المستشعر لا يقل أهمية عن المعايرة. فالقطب الموجود مباشرة بعد نقطة حقن حمض أو قلوي يقرأ الحقن لا النظام. امنحه مسافة كافية للخلط.',
            },
          },
        ],
      },
    ],
    checklist: [
      { en: 'Calibrate with fresh two-point buffers and record the pre-calibration reading each time.', ar: 'عايِر بمحلولين منظّمين حديثين وسجّل القراءة قبل المعايرة في كل مرة.' },
      { en: 'Check the electrode is not immediately downstream of a chemical injection point.', ar: 'تأكد أن القطب ليس مباشرة بعد نقطة حقن كيميائي.' },
      { en: 'Confirm the operating pH sits within the inhibitor programme’s effective window.', ar: 'تأكد أن حموضة التشغيل ضمن النافذة الفعالة لبرنامج المثبطات.' },
      { en: 'List every metal in the circuit and confirm the pH suits the most sensitive one.', ar: 'أدرج كل معدن في الدائرة وتأكد أن الحموضة تناسب أكثرها حساسية.' },
      { en: 'Cross-check the reading against a calibrated portable meter.', ar: 'قارن القراءة بجهاز محمول معايَر.' },
      { en: 'Where chlorination is used, account for pH when interpreting biocide effectiveness.', ar: 'حيث يُستخدم الكلور، احتسب أثر الحموضة عند تفسير فعالية المبيد.' },
      { en: 'Trend pH alongside conductivity — divergence between them is informative.', ar: 'تتبع اتجاه الحموضة إلى جانب التوصيلية — فتباعدهما يحمل معلومة.' },
    ],
    escalation: {
      en: 'Do not adjust operating pH without checking the metallurgy and the inhibitor programme first. A change that improves one failure mode reliably worsens the other, and in a circuit with mixed metals the acceptable window may be narrower than the adjustment you were considering. Where pH is unstable rather than simply wrong, the cause is usually alkalinity, an unmeasured process ingress or a dosing fault — and stabilising it matters more than moving it.',
      ar: 'لا تعدّل حموضة التشغيل قبل فحص المعادن وبرنامج المثبطات. فالتغيير الذي يحسّن نمط فشل يفاقم الآخر حتمًا، وفي دائرة بمعادن مختلطة قد تكون النافذة المقبولة أضيق من التعديل الذي كنت تفكر فيه. وحيث تكون الحموضة غير مستقرة لا خاطئة فحسب، يكون السبب عادةً القلوية أو دخول غير مقيس من العملية أو عطل في الضخ — وتثبيتها أهم من تحريكها.',
    },
    solutions: ['cooling-water', 'boiler-steam', 'wastewater', 'process-water', 'potable-water'],
    technologies: ['sensors-measurement', 'water-treatment-chemicals', 'monitoring-control', 'water-analysis'],
    products: ['walchem-ph-orp-sensors', 'walchem-intuition-9', 'kurita-cooling-programme'],
    faqs: [
      {
        id: 'q1',
        question: { en: 'What pH should a cooling tower run at?', ar: 'عند أي درجة حموضة ينبغي أن يعمل برج التبريد؟' },
        answer: {
          en: 'It depends on the make-up water chemistry, the metallurgy in the circuit and the inhibitor programme. Any figure quoted without those three is a guess — and in a circuit with mixed metals, the acceptable range can be narrow.',
          ar: 'يعتمد على كيمياء مياه التعويض ومعادن الدائرة وبرنامج المثبطات. وأي رقم يُذكر دون هذه الثلاثة تخمين — وفي دائرة بمعادن مختلطة قد يكون النطاق المقبول ضيقًا.',
        },
      },
      {
        id: 'q2',
        question: { en: 'Our pH keeps drifting upward. Why?', ar: 'حموضتنا تنحرف صعودًا باستمرار. لماذا؟' },
        answer: {
          en: 'In an open recirculating system, concentration of alkalinity through evaporation is the usual cause. Process ingress, an acid feed fault or a failing electrode are the other common explanations. Check the electrode against a portable meter before concluding the water has changed.',
          ar: 'في نظام مفتوح ذي دوران، يكون تركّز القلوية بالتبخر هو السبب المعتاد. أما دخول من العملية أو عطل في ضخ الحمض أو قطب متدهور فهي التفسيرات الشائعة الأخرى. افحص القطب مقابل جهاز محمول قبل استنتاج أن المياه تغيّرت.',
        },
      },
    ],
  },

  /* ====================================================================== */
  {
    slug: 'how-automated-dosing-works',
    status: 'published',
    category: 'monitoring-control',
    readingMinutes: 7,
    publishedAt: '2026-02-28',
    title: { en: 'How Automated Chemical Dosing Works', ar: 'كيف يعمل الضخ الكيميائي الآلي' },
    question: {
      en: 'What makes automated dosing more reliable than a timer, and where does it still go wrong?',
      ar: 'ما الذي يجعل الضخ الآلي أكثر موثوقية من المؤقت، وأين يظل عرضة للخطأ؟',
    },
    summary: {
      en: 'Automation replaces an assumption about demand with a measurement of it. The failure modes move from dosing errors to verification gaps.',
      ar: 'تستبدل الأتمتة افتراضًا عن الطلب بقياس له. وتنتقل أنماط الفشل من أخطاء الجرعة إلى فجوات التحقق.',
    },
    metaTitle: { en: 'How Automated Chemical Dosing Works | C-Water', ar: 'كيف يعمل الضخ الكيميائي الآلي | C-Water' },
    metaDescription: {
      en: 'Automated chemical dosing explained: control modes, injection point design, pump selection, feed verification and the failure modes automation does not remove.',
      ar: 'شرح الضخ الكيميائي الآلي: أنماط التحكم، وتصميم نقطة الحقن، واختيار المضخة، والتحقق من الضخ، وأنماط الفشل التي لا تلغيها الأتمتة.',
    },
    sections: [
      {
        id: 'why',
        heading: { en: 'Why timers stop being adequate', ar: 'لماذا لم تعد المؤقتات كافية' },
        blocks: [
          {
            type: 'p',
            text: {
              en: 'A timer-based dosing regime assumes the system is always in the same condition. It never is. Production load changes, ambient temperature changes, make-up water quality changes, and the demand for treatment chemical changes with all of them.',
              ar: 'يفترض نظام الضخ بالمؤقت أن النظام في الحالة نفسها دائمًا، وهو ليس كذلك أبدًا. فحمل الإنتاج يتغير، ودرجة الحرارة المحيطة تتغير، وجودة مياه التعويض تتغير، ويتغير معها الطلب على كيماويات المعالجة.',
            },
          },
          {
            type: 'p',
            text: {
              en: 'A fixed dose is therefore either too much or too little most of the time. Too much wastes chemical and can cause its own problems; too little leaves the system unprotected, which with a corrosion inhibitor can be worse than no programme at all.',
              ar: 'ولذلك تكون الجرعة الثابتة إما زائدة أو ناقصة في معظم الأوقات. فالزائدة تهدر الكيماويات وقد تسبب مشكلات خاصة بها، والناقصة تترك النظام بلا حماية، وهو ما قد يكون مع مثبط التآكل أسوأ من عدم وجود برنامج أصلًا.',
            },
          },
        ],
      },
      {
        id: 'modes',
        heading: { en: 'How the feed is driven', ar: 'كيف يُدار الضخ' },
        blocks: [
          {
            type: 'ul',
            items: [
              { en: '**Proportional to make-up volume.** A meter on the make-up line drives the pump, so chemical enters in proportion to the water it needs to treat. The standard method for inhibitor feed.', ar: '**تناسبيًا مع حجم مياه التعويض.** عدّاد على خط التعويض يقود المضخة، فيدخل الكيماوي بنسبة المياه التي يجب معالجتها. وهي الطريقة المعيارية لضخ المثبطات.' },
              { en: '**Proportional to blowdown.** Feed follows what is being lost from the system rather than what is entering it.', ar: '**تناسبيًا مع التصريف.** يتبع الضخ ما يُفقد من النظام لا ما يدخله.' },
              { en: '**On a measured parameter.** Conductivity, pH or ORP drives the output directly, holding a condition rather than delivering a quantity.', ar: '**وفق متغير مقاس.** تقود التوصيلية أو pH أو ORP المخرجَ مباشرة، فتحافظ على حالة بدل ضخ كمية.' },
              { en: '**Timed with a limit.** Some biocides are dosed on a schedule by design; the automation adds feed limits, lockouts and verification rather than replacing the schedule.', ar: '**زمنيًا مع حد أقصى.** تُضخ بعض المبيدات وفق جدول بحكم تصميمها، وتضيف الأتمتة حدود ضخ وحجبًا وتحققًا بدل استبدال الجدول.' },
            ],
          },
        ],
      },
      {
        id: 'stability',
        heading: { en: 'What makes an automatic system stable', ar: 'ما الذي يجعل النظام الأوتوماتيكي مستقرًا' },
        blocks: [
          {
            type: 'p',
            text: {
              en: 'A setpoint alone produces an unstable system. Three settings turn an automatic system into a controlled one.',
              ar: 'نقطة الضبط وحدها تنتج نظامًا غير مستقر. وثلاثة إعدادات تحوّل النظام الأوتوماتيكي إلى نظام محكوم.',
            },
          },
          {
            type: 'ol',
            items: [
              { en: '**Deadband.** Without it the output switches constantly around the setpoint, wearing the pump or valve and destabilising the reading.', ar: '**النطاق الميت.** بدونه يتبدّل المخرج باستمرار حول نقطة الضبط، فيتآكل المضخة أو الصمام وتضطرب القراءة.' },
              { en: '**Feed limit.** A maximum run time per period. If a sensor fails or a leak develops, this is what stops the system emptying a drum into the water.', ar: '**حد الضخ.** أقصى زمن تشغيل لكل فترة. فإذا تعطل مستشعر أو حدث تسرب، هذا ما يمنع النظام من إفراغ برميل في المياه.' },
              { en: '**Lockout and interlock.** No dosing without flow; no dosing during a backwash; no dosing when the drum is empty. Each removes a specific way the system could dose into nothing or into the wrong place.', ar: '**الحجب والتعشيق.** لا ضخ بلا تدفق، ولا ضخ أثناء غسيل عكسي، ولا ضخ عند فراغ البرميل. ويزيل كل منها طريقة محددة قد يضخ بها النظام في الفراغ أو في الموضع الخطأ.' },
            ],
          },
        ],
      },
      {
        id: 'injection',
        heading: { en: 'The injection point decides the outcome', ar: 'نقطة الحقن هي التي تحدد النتيجة' },
        blocks: [
          {
            type: 'p',
            text: {
              en: 'A correctly chosen chemical injected in the wrong place is a correctly chosen chemical that does not work. Three requirements have to be met at once.',
              ar: 'الكيماوي المختار بشكل صحيح والمحقون في الموضع الخطأ كيماوي لا يعمل. ويجب تحقق ثلاثة متطلبات في آن واحد.',
            },
          },
          {
            type: 'ul',
            items: [
              { en: 'Turbulent, well-mixed flow, so the chemical disperses rather than travelling as a concentrated slug.', ar: 'تدفق مضطرب جيد الخلط، ليتشتت الكيماوي بدل أن ينتقل كدفعة مركّزة.' },
              { en: 'Away from surfaces the chemical could attack at neat strength — concentrated acid or caustic against a fitting is a common cause of unexplained localised damage.', ar: 'بعيدًا عن أسطح قد يهاجمها الكيماوي وهو مركّز — فالحمض أو القلوي المركّز أمام تركيبة سبب شائع لضرر موضعي غير مفسّر.' },
              { en: 'Far enough upstream of the measurement point that the sensor reads the mixed system rather than the injection itself.', ar: 'قبل نقطة القياس بمسافة كافية ليقرأ المستشعر النظام المخلوط لا الحقن نفسه.' },
            ],
          },
          {
            type: 'p',
            text: {
              en: 'Chemical compatibility applies to the injection assembly too. Quill, non-return valve, tubing and any isolating valve all see the chemical undiluted, and the wrong material fails quietly.',
              ar: 'ويسري توافق الكيماويات على مجموعة الحقن أيضًا. فالماسورة الغاطسة وصمام عدم الرجوع والخراطيم وأي صمام عزل ترى الكيماوي غير مخفف، والمادة الخاطئة تتلف بصمت.',
            },
          },
        ],
      },
      {
        id: 'verification',
        heading: { en: 'The gap automation does not close by itself', ar: 'الفجوة التي لا تسدّها الأتمتة وحدها' },
        blocks: [
          {
            type: 'p',
            text: {
              en: 'This is the point most often missed. A controller calling for a dose is not evidence that a dose was delivered. The pump may be airlocked, the suction line degassed, the injection quill blocked or the drum empty — and in every one of those cases the controller reports normal operation.',
              ar: 'وهذه النقطة الأكثر إغفالًا. فطلب وحدة التحكم لجرعة ليس دليلًا على ضخها. فقد تكون المضخة محتبسة بالهواء، أو خط السحب متحررًا من الغازات، أو الماسورة الغاطسة مسدودة، أو البرميل فارغًا — وفي كل هذه الحالات تبلّغ وحدة التحكم بتشغيل طبيعي.',
            },
          },
          {
            type: 'p',
            text: {
              en: 'Feed verification closes that gap: flow verification on the discharge line, pulse feedback from the pump, or level tracking on the drum compared against calculated consumption.',
              ar: 'ويسد التحقق من الضخ تلك الفجوة: تحقق من التدفق على خط الطرد، أو تغذية راجعة بالنبضات من المضخة، أو تتبع المستوى في البرميل مقارنة بالاستهلاك المحسوب.',
            },
          },
          {
            type: 'p',
            text: {
              en: 'A separate chemical check completes it. A residual test, an inhibitor level or a corrosion coupon confirms that the chemical not only left the drum but is doing what it was chosen to do.',
              ar: 'ويُكمل ذلك فحص كيميائي مستقل. فاختبار المتبقي أو مستوى المثبط أو شريحة التآكل يؤكد أن الكيماوي لم يغادر البرميل فحسب بل يؤدي ما اختير من أجله.',
            },
          },
          {
            type: 'note',
            text: {
              en: 'Low-level detection on the drum is the cheapest reliability improvement available on most dosing systems. Without it, the most common silent failure is a pump that has been running dry for a week.',
              ar: 'وكشف المستوى المنخفض في البرميل هو أرخص تحسين للموثوقية متاح في معظم أنظمة الضخ. فبدونه يكون أشيع عطل صامت مضخة تعمل جافة منذ أسبوع.',
            },
          },
        ],
      },
    ],
    checklist: [
      { en: 'Confirm which parameter drives the feed and that it is the right one for that chemical.', ar: 'تأكد من المتغير الذي يقود الضخ وأنه المتغير الصحيح لذلك الكيماوي.' },
      { en: 'Check the deadband, feed limit and lockout settings are configured, not left at default.', ar: 'تحقق من ضبط النطاق الميت وحد الضخ وإعدادات الحجب، وعدم تركها على الإعدادات الافتراضية.' },
      { en: 'Verify feed by an independent means, not by the controller’s own output record.', ar: 'تحقق من الضخ بوسيلة مستقلة، لا بسجل مخرجات وحدة التحكم نفسها.' },
      { en: 'Inspect the injection point for blockage, and check the assembly materials against the chemical.', ar: 'افحص نقطة الحقن بحثًا عن انسداد، وتحقق من مواد المجموعة مقابل الكيماوي.' },
      { en: 'Compare actual chemical consumption against calculated demand.', ar: 'قارن الاستهلاك الفعلي للكيماويات بالطلب المحسوب.' },
      { en: 'Confirm low-level detection is fitted and functional.', ar: 'تأكد من تركيب كشف المستوى المنخفض وعمله.' },
      { en: 'Check the pump’s turndown covers the range the programme actually needs.', ar: 'تحقق من أن نطاق تعديل المضخة يغطي المدى الذي يحتاجه البرنامج فعلًا.' },
    ],
    escalation: {
      en: 'Where chemical consumption does not match calculated demand, resolve the discrepancy before adjusting any setpoint. Overconsumption usually means a leak, a wrong pump setting or a wrongly configured proportional input; underconsumption usually means the chemical is not reaching the system at all — and increasing the setpoint on a pump that is not delivering achieves nothing except a larger number on a screen.',
      ar: 'حيث لا يطابق استهلاك الكيماويات الطلبَ المحسوب، احسم التباين قبل تعديل أي نقطة ضبط. فالاستهلاك الزائد يعني عادةً تسربًا أو إعداد مضخة خاطئًا أو مدخلًا تناسبيًا مضبوطًا بشكل خاطئ، والاستهلاك الناقص يعني عادةً أن الكيماوي لا يصل إلى النظام أصلًا — ورفع نقطة الضبط لمضخة لا تضخ لا يحقق شيئًا سوى رقم أكبر على الشاشة.',
    },
    solutions: ['cooling-water', 'boiler-steam', 'wastewater', 'ro-membranes'],
    technologies: ['chemical-dosing', 'monitoring-control', 'sensors-measurement'],
    products: ['walchem-ix-series', 'walchem-e-series', 'walchem-intuition-9', 'walchem-lk-series'],
    faqs: [
      {
        id: 'q1',
        question: { en: 'Can one pump feed two chemicals?', ar: 'هل يمكن لمضخة واحدة ضخ كيماويين؟' },
        answer: {
          en: 'It should not. Beyond the compatibility risk of mixing in a shared line, the two chemicals almost certainly need different feed rates and different control inputs. Sharing a pump means at least one of them is being dosed incorrectly.',
          ar: 'لا ينبغي ذلك. فبعيدًا عن خطر التوافق عند الاختلاط في خط مشترك، يحتاج الكيماويان بشبه يقين معدلي ضخ مختلفين ومدخلي تحكم مختلفين. ومشاركة المضخة تعني أن أحدهما على الأقل يُضخ بشكل خاطئ.',
        },
      },
      {
        id: 'q2',
        question: { en: 'Our pump is set correctly but consumption is low. What should we check?', ar: 'مضختنا مضبوطة بشكل صحيح لكن الاستهلاك منخفض. ماذا نفحص؟' },
        answer: {
          en: 'Airlock in the suction line, degassing of the chemical, a blocked injection quill, a failed non-return valve, or a lockout preventing the pump from running as often as you think. Check for actual delivered volume rather than the controller output record — the two are not the same thing.',
          ar: 'احتباس هواء في خط السحب، أو تحرر غازات من الكيماوي، أو ماسورة حقن مسدودة، أو صمام عدم رجوع تالف، أو حجب يمنع المضخة من العمل بالوتيرة التي تظنها. افحص الحجم المضخوخ فعليًا لا سجل مخرجات وحدة التحكم — فالاثنان ليسا الشيء نفسه.',
        },
      },
    ],
  },
];
