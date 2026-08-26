import type { Article } from '../types';

/** Knowledge Center — RO, membrane and filtration topics. */
export const membraneAndFiltrationArticles: Article[] = [
  /* ====================================================================== */
  {
    slug: 'what-causes-ro-fouling',
    status: 'published',
    category: 'ro-membranes',
    readingMinutes: 8,
    publishedAt: '2026-01-13',
    title: { en: 'What Causes RO Membrane Fouling?', ar: 'ما الذي يسبب اتساخ أغشية التناضح العكسي؟' },
    question: {
      en: 'What are the different things that accumulate on an RO membrane, and how do you tell them apart from the control room?',
      ar: 'ما الأشياء المختلفة التي تتراكم على غشاء التناضح العكسي، وكيف تميّز بينها من غرفة التحكم؟',
    },
    summary: {
      en: 'Fouling, scaling and biological growth produce different signatures in normalised data. Reading the signature correctly decides both the cleaning chemistry and the real fix.',
      ar: 'ينتج الاتساخ والترسب والنمو البيولوجي بصمات مختلفة في البيانات المعيارية. وقراءة البصمة بشكل صحيح تحدد كيمياء التنظيف والحل الحقيقي معًا.',
    },
    metaTitle: { en: 'What Causes RO Membrane Fouling? | C-Water', ar: 'ما الذي يسبب اتساخ أغشية التناضح العكسي؟ | C-Water' },
    metaDescription: {
      en: 'RO membrane fouling explained: particulate, biological, organic, colloidal and metal oxide fouling versus scaling — how normalised data distinguishes them and what each requires.',
      ar: 'شرح اتساخ أغشية التناضح العكسي: الاتساخ الجسيمي والبيولوجي والعضوي والغروي وأكاسيد المعادن مقابل الترسب — كيف تميّز البيانات المعيارية بينها وما يتطلبه كل نوع.',
    },
    sections: [
      {
        id: 'distinction',
        heading: { en: 'Fouling and scaling are not the same thing', ar: 'الاتساخ والترسب ليسا الشيء نفسه' },
        blocks: [
          {
            type: 'p',
            text: {
              en: 'The terms are often used interchangeably on site, but the distinction decides the response. Fouling is accumulation of material that arrived at the membrane in the feed. Scaling is precipitation of dissolved salts that exceeded their solubility inside the system.',
              ar: 'كثيرًا ما يُستخدم المصطلحان بالتبادل في الموقع، لكن التمييز بينهما يحدد الاستجابة. فالاتساخ تراكم مواد وصلت إلى الغشاء مع التغذية، والترسب هو ترسّب أملاح ذائبة تجاوزت حد ذوبانها داخل النظام.',
            },
          },
          {
            type: 'p',
            text: {
              en: 'That difference matters because the remedies are opposite in direction. Fouling is fixed upstream, by improving pretreatment. Scaling is fixed by changing the antiscalant or lowering the recovery — nothing upstream will help once the concentrate chemistry is beyond its limit.',
              ar: 'ويهم هذا الفارق لأن العلاجين متعاكسان في الاتجاه. فالاتساخ يُعالج قبل النظام بتحسين المعالجة الأولية. أما الترسب فيُعالج بتغيير مانع الترسب أو خفض معدل الاستعادة — ولن يفيد أي شيء قبل النظام متى تجاوزت كيمياء المركّز حدها.',
            },
          },
        ],
      },
      {
        id: 'types',
        heading: { en: 'The five things that foul a membrane', ar: 'الأشياء الخمسة التي تُوسّخ الغشاء' },
        blocks: [
          {
            type: 'ul',
            items: [
              {
                en: '**Particulate fouling** — suspended solids that pretreatment did not remove. Usually shows first as rising differential pressure across the lead elements.',
                ar: '**اتساخ جسيمي** — مواد صلبة عالقة لم تزلها المعالجة الأولية. ويظهر عادةً أولًا كارتفاع في فرق الضغط عبر العناصر الأولى.',
              },
              {
                en: '**Biological fouling** — biofilm establishing on the membrane surface. Self-propagating, hardest to reverse, and often traceable to a dechlorination step that removed the residual too early.',
                ar: '**اتساخ بيولوجي** — غشاء حيوي يستقر على سطح الغشاء. ذاتي التكاثر، وأصعبها في التصحيح، وغالبًا ما يمكن ردّه إلى خطوة إزالة كلور أزالت المتبقي مبكرًا جدًا.',
              },
              {
                en: '**Organic fouling** — natural organic matter and hydrocarbons adsorbing onto the membrane. Common on surface water sources and where any oil is present.',
                ar: '**اتساخ عضوي** — مواد عضوية طبيعية وهيدروكربونات تمتز على الغشاء. شائع في مصادر المياه السطحية وحيثما وُجد أي زيت.',
              },
              {
                en: '**Colloidal fouling** — very fine particles that pass a conventional filter but agglomerate at the membrane surface. This is what SDI is measuring.',
                ar: '**اتساخ غروي** — جسيمات دقيقة جدًا تعبر المرشح التقليدي لكنها تتكتل عند سطح الغشاء. وهذا ما يقيسه مؤشر SDI.',
              },
              {
                en: '**Metal oxide fouling** — iron, manganese and aluminium oxidising and depositing. Frequently the result of oxidation between the well and the membrane rather than of high raw levels.',
                ar: '**اتساخ بأكاسيد المعادن** — حديد ومنجنيز وألومنيوم تتأكسد وتترسب. وغالبًا ما تكون نتيجة أكسدة بين البئر والغشاء لا نتيجة مستويات خام مرتفعة.',
              },
            ],
          },
          {
            type: 'note',
            text: {
              en: 'Biological fouling deserves separate attention because it is the only one that reproduces. A particulate load stops when the source stops; a biofilm continues to grow on what it has already colonised.',
              ar: 'يستحق الاتساخ البيولوجي انتباهًا خاصًا لأنه الوحيد الذي يتكاثر. فالحمل الجسيمي يتوقف بتوقف مصدره، أما الغشاء الحيوي فيواصل النمو على ما استوطنه بالفعل.',
            },
          },
        ],
      },
      {
        id: 'reading',
        heading: { en: 'Reading the signature in the data', ar: 'قراءة البصمة في البيانات' },
        blocks: [
          {
            type: 'p',
            text: {
              en: 'None of this is visible in raw readings, because raw flow and pressure move with temperature and feed conditions. The data has to be normalised to reference conditions first. Until that is done, seasonal variation and genuine decline look identical.',
              ar: 'لا شيء من ذلك مرئي في القراءات الخام، لأن التدفق والضغط الخامين يتغيران مع الحرارة وظروف التغذية. فيجب معايرة البيانات إلى ظروف مرجعية أولًا. وقبل ذلك يبدو التغير الموسمي والتدهور الحقيقي متطابقين.',
            },
          },
          {
            type: 'table',
            head: [
              { en: 'What you observe', ar: 'ما تلاحظه' },
              { en: 'Most likely mechanism', ar: 'الآلية الأرجح' },
              { en: 'Where to look', ar: 'أين تبحث' },
            ],
            rows: [
              [
                { en: 'Differential pressure rising, salt passage steady', ar: 'ارتفاع فرق الضغط مع ثبات تسرب الأملاح' },
                { en: 'Particulate or biological fouling', ar: 'اتساخ جسيمي أو بيولوجي' },
                { en: 'Lead elements, pretreatment, SDI', ar: 'العناصر الأولى، المعالجة الأولية، SDI' },
              ],
              [
                { en: 'Normalised flow falling, salt passage rising', ar: 'انخفاض التدفق المعياري مع ارتفاع تسرب الأملاح' },
                { en: 'Scaling', ar: 'ترسب' },
                { en: 'Tail elements, recovery, antiscalant selection', ar: 'العناصر الأخيرة، معدل الاستعادة، اختيار مانع الترسب' },
              ],
              [
                { en: 'Salt passage rising sharply, differential pressure flat', ar: 'ارتفاع حاد في تسرب الأملاح مع ثبات فرق الضغط' },
                { en: 'Membrane damage or o-ring leak', ar: 'تلف في الغشاء أو تسرب في حلقة الإحكام' },
                { en: 'Probe the vessels to locate it', ar: 'افحص الأوعية لتحديد الموضع' },
              ],
              [
                { en: 'Differential pressure rising after every clean, faster each time', ar: 'ارتفاع فرق الضغط بعد كل تنظيف وبوتيرة أسرع' },
                { en: 'Biological fouling', ar: 'اتساخ بيولوجي' },
                { en: 'Dechlorination point, stagnant sections, feed biology', ar: 'نقطة إزالة الكلور، الأقسام الراكدة، الحمل البيولوجي في التغذية' },
              ],
            ],
          },
        ],
      },
      {
        id: 'response',
        heading: { en: 'What to do about it', ar: 'ما الذي ينبغي فعله' },
        blocks: [
          {
            type: 'p',
            text: {
              en: 'Cleaning chemistry follows the diagnosis. High-pH cleaners address organic and biological fouling; low-pH cleaners address scale and metal oxides. Using the wrong one wastes a cleaning cycle and can set the deposit harder.',
              ar: 'تتبع كيمياء التنظيف التشخيصَ. فالمنظفات عالية القلوية تعالج الاتساخ العضوي والبيولوجي، والمنظفات الحمضية تعالج الترسبات وأكاسيد المعادن. واستخدام الخاطئ منها يهدر دورة تنظيف وقد يزيد الراسب صلابة.',
            },
          },
          {
            type: 'p',
            text: {
              en: 'But cleaning is the symptom-level response. If cleaning frequency is rising, the system is telling you that something upstream has changed — the source water, the pretreatment performance, or a step that was bypassed and never restored.',
              ar: 'لكن التنظيف استجابة على مستوى العرَض. فإذا كان تكرار التنظيف يرتفع، فالنظام يخبرك بأن شيئًا قبله قد تغيّر — مياه المصدر، أو أداء المعالجة الأولية، أو خطوة جرى تجاوزها ولم تُعَد.',
            },
          },
          {
            type: 'p',
            text: {
              en: 'The most valuable thing you can do is clean early. A membrane cleaned at a 10–15% change in normalised performance recovers far better than one left until the system can no longer meet demand.',
              ar: 'وأنفع ما يمكنك فعله هو التنظيف مبكرًا. فالغشاء الذي يُنظَّف عند تغير 10–15% في الأداء المعياري يستعيد أداءه أفضل بكثير من غشاء تُرك حتى يعجز النظام عن تلبية الطلب.',
            },
          },
        ],
      },
    ],
    checklist: [
      { en: 'Normalise operating data before drawing any conclusion from it.', ar: 'عايِر بيانات التشغيل قبل استخلاص أي استنتاج منها.' },
      { en: 'Trend differential pressure per stage, not just across the whole system.', ar: 'تتبع فرق الضغط لكل مرحلة، لا عبر النظام كله فقط.' },
      { en: 'Measure SDI and turbidity at the membrane feed point, not at the plant inlet.', ar: 'قِس SDI والعكارة عند نقطة تغذية الغشاء لا عند مدخل المحطة.' },
      { en: 'Record cartridge filter element life — a shortening life is a pretreatment message.', ar: 'سجّل عمر عنصر مرشح الخراطيش — فقِصره رسالة من المعالجة الأولية.' },
      { en: 'Verify antiscalant is actually being delivered, and at the correct rate for the current recovery.', ar: 'تحقق من ضخ مانع الترسب فعليًا وبالمعدل الصحيح لمعدل الاستعادة الحالي.' },
      { en: 'Check the dechlorination point and confirm there is no oxidant reaching the membrane.', ar: 'افحص نقطة إزالة الكلور وتأكد من عدم وصول أي مؤكسد إلى الغشاء.' },
      { en: 'Confirm no section of the plant stands stagnant between production runs.', ar: 'تأكد من عدم بقاء أي قسم من المحطة راكدًا بين دورات الإنتاج.' },
    ],
    escalation: {
      en: 'Where cleaning no longer restores normalised performance, an element autopsy identifies the deposit directly and removes the guesswork. It is a destructive test on one element, but it is far cheaper than replacing a full set on the wrong diagnosis. Where salt passage has risen sharply without a differential pressure change, probing the vessels locates the fault before anything is replaced.',
      ar: 'حيث لم يعد التنظيف يستعيد الأداء المعياري، يحدد تشريح أحد العناصر الراسبَ مباشرة ويُلغي التخمين. وهو اختبار متلف لعنصر واحد، لكنه أرخص كثيرًا من استبدال مجموعة كاملة بناءً على تشخيص خاطئ. وحيث ارتفع تسرب الأملاح بحدة دون تغير في فرق الضغط، يحدد فحص الأوعية موضع العطل قبل استبدال أي شيء.',
    },
    solutions: ['ro-membranes', 'process-water', 'potable-water'],
    technologies: ['reverse-osmosis', 'filtration', 'water-treatment-chemicals', 'monitoring-control'],
    products: ['kurita-kuriverter-ik110', 'timex-cartridge-filter', 'timex-svf-series', 'walchem-conductivity-sensors'],
    faqs: [
      {
        id: 'q1',
        question: { en: 'How often should an RO system need cleaning?', ar: 'كل كم ينبغي أن يحتاج نظام التناضح العكسي إلى تنظيف؟' },
        answer: {
          en: 'There is no universal interval — it depends on feed quality, recovery and pretreatment. What matters more than the absolute number is the trend. A stable interval is a healthy system; a shortening interval is the system telling you something upstream has changed.',
          ar: 'لا توجد فترة عامة — فالأمر يعتمد على جودة التغذية ومعدل الاستعادة والمعالجة الأولية. والأهم من الرقم المطلق هو الاتجاه. فالفترة الثابتة تعني نظامًا سليمًا، والفترة المتناقصة تعني أن النظام يخبرك بتغيّر شيء قبله.',
        },
      },
      {
        id: 'q2',
        question: { en: 'Can we run at higher recovery to save water?', ar: 'هل يمكننا التشغيل عند استعادة أعلى لتوفير المياه؟' },
        answer: {
          en: 'Higher recovery concentrates the reject stream further, which moves the tail elements closer to their scaling limit. It may be possible with a different antiscalant, but it must be checked against the concentrate chemistry at the intended recovery first — not assumed from the feed analysis.',
          ar: 'يزيد معدل الاستعادة الأعلى تركيزَ تيار الرفض، فيقرّب العناصر الأخيرة من حد الترسب. وقد يكون ممكنًا بمانع ترسب مختلف، لكن يجب التحقق منه مقابل كيمياء المركّز عند معدل الاستعادة المستهدف أولًا — لا افتراضه من تحليل التغذية.',
        },
      },
      {
        id: 'q3',
        question: { en: 'Our SDI is acceptable but we still foul. Why?', ar: 'مؤشر SDI لدينا مقبول لكن الاتساخ مستمر. لماذا؟' },
        answer: {
          en: 'SDI measures colloidal and particulate plugging tendency. It does not capture biological or organic fouling potential at all. A feed can pass SDI comfortably and still carry the nutrient load and organisms needed to establish a biofilm.',
          ar: 'يقيس SDI ميل الانسداد الغروي والجسيمي، ولا يلتقط إطلاقًا احتمالية الاتساخ البيولوجي أو العضوي. فقد تجتاز مياه التغذية اختبار SDI بأريحية وتظل تحمل حمل المغذيات والكائنات اللازمة لتكوين غشاء حيوي.',
        },
      },
    ],
  },

  /* ====================================================================== */
  {
    slug: 'ro-pretreatment-failure',
    status: 'published',
    category: 'ro-membranes',
    readingMinutes: 7,
    publishedAt: '2026-03-23',
    title: { en: 'Common Causes of RO Pretreatment Failure', ar: 'أسباب شائعة لفشل المعالجة الأولية للتناضح العكسي' },
    question: {
      en: 'Pretreatment was designed correctly. Why is the membrane still fouling?',
      ar: 'صُممت المعالجة الأولية بشكل صحيح. فلماذا لا يزال الغشاء يتسخ؟',
    },
    summary: {
      en: 'Most pretreatment failures are not design failures. They are things that were changed, bypassed or stopped being verified — and nobody connected the change to the membrane.',
      ar: 'معظم حالات فشل المعالجة الأولية ليست فشلًا في التصميم، بل أمور غُيّرت أو جرى تجاوزها أو توقف التحقق منها — ولم يربط أحد التغيير بالغشاء.',
    },
    metaTitle: { en: 'Common Causes of RO Pretreatment Failure | C-Water', ar: 'أسباب شائعة لفشل المعالجة الأولية للتناضح العكسي | C-Water' },
    metaDescription: {
      en: 'Why RO pretreatment stops working: bypassed stages, dechlorination faults, oxidised iron, backwash carryover, unmonitored SDI and source water changes.',
      ar: 'لماذا تتوقف المعالجة الأولية للتناضح العكسي عن العمل: مراحل جرى تجاوزها، وأعطال إزالة الكلور، وحديد متأكسد، وانجراف الغسيل العكسي، وSDI غير مراقب، وتغيرات مياه المصدر.',
    },
    sections: [
      {
        id: 'premise',
        heading: { en: 'Start by assuming nothing has stayed the same', ar: 'ابدأ بافتراض أن شيئًا لم يبقَ على حاله' },
        blocks: [
          {
            type: 'p',
            text: {
              en: 'An RO plant that fouled from the day it was commissioned has a design problem. An RO plant that ran well and then began fouling has a change problem — and the useful question is what changed, not what to dose.',
              ar: 'محطة تناضح عكسي اتسخت منذ يوم تشغيلها لديها مشكلة تصميم. أما محطة عملت جيدًا ثم بدأت تتسخ فلديها مشكلة تغيير — والسؤال المفيد هو ما الذي تغيّر، لا ماذا نضخ.',
            },
          },
          {
            type: 'p',
            text: {
              en: 'Establishing the timeline is usually more productive than any single test. When did the trend turn, and what else happened around that date — a new supply, a shutdown, a maintenance job, a staff change?',
              ar: 'وتحديد التسلسل الزمني أجدى عادةً من أي اختبار منفرد. متى انقلب الاتجاه، وماذا حدث أيضًا حول ذلك التاريخ — إمداد جديد، أو توقف، أو عمل صيانة، أو تغيّر في الكوادر؟',
            },
          },
        ],
      },
      {
        id: 'causes',
        heading: { en: 'What usually turns out to be the cause', ar: 'ما يتبين عادةً أنه السبب' },
        blocks: [
          {
            type: 'ol',
            items: [
              {
                en: '**A stage was bypassed and never restored.** A filter isolated during a shutdown, a media vessel taken offline for a repair. The bypass works, the plant keeps running, and nobody records it.',
                ar: '**مرحلة جرى تجاوزها ولم تُعَد.** مرشح عُزل أثناء توقف، أو وعاء وسائط أُخرج للإصلاح. يعمل المسار البديل، وتستمر المحطة، ولا يسجل أحد ذلك.',
              },
              {
                en: '**Dechlorination is failing.** Exhausted carbon or underdosed bisulphite lets oxidant reach the membrane, which damages it permanently. Overdosed bisulphite is the opposite problem — it removes the residual so early that the pretreatment train itself becomes a biological growth environment.',
                ar: '**فشل إزالة الكلور.** فكربون مستنفد أو بيسلفيت ناقص الجرعة يسمح بوصول مؤكسد إلى الغشاء فيتلفه بشكل دائم. أما البيسلفيت الزائد فمشكلة معاكسة — إذ يزيل المتبقي مبكرًا جدًا حتى تصبح سلسلة المعالجة الأولية نفسها بيئة للنمو البيولوجي.',
              },
              {
                en: '**Iron and manganese are oxidising before the membrane.** Raw levels look acceptable, but exposure to air between the well and the plant converts dissolved iron into a particulate that arrives as an oxide deposit.',
                ar: '**الحديد والمنجنيز يتأكسدان قبل الغشاء.** تبدو المستويات الخام مقبولة، لكن التعرض للهواء بين البئر والمحطة يحوّل الحديد الذائب إلى جسيمات تصل كراسب أكسيدي.',
              },
              {
                en: '**Backwash is carrying over.** A media filter returned to service too quickly after backwash passes a slug of solids straight to the cartridge filters and then to the membrane.',
                ar: '**انجراف الغسيل العكسي.** فمرشح وسائط أُعيد إلى الخدمة سريعًا بعد الغسيل العكسي يمرر دفعة من المواد الصلبة مباشرة إلى مرشحات الخراطيش ثم إلى الغشاء.',
              },
              {
                en: '**SDI is not being measured.** Without it there is no way to know whether pretreatment is achieving what it was designed to achieve — only whether the membrane has already suffered.',
                ar: '**عدم قياس SDI.** فبدونه لا سبيل لمعرفة ما إذا كانت المعالجة الأولية تحقق ما صُممت له — بل فقط ما إذا كان الغشاء قد تضرر بالفعل.',
              },
              {
                en: '**The source water changed.** A new well, a different blend, a seasonal shift. The pretreatment was correct for the water it was designed for and is now treating something else.',
                ar: '**تغيّر مياه المصدر.** بئر جديد أو خلطة مختلفة أو تحول موسمي. فالمعالجة الأولية كانت صحيحة للمياه التي صُممت لها، وهي الآن تعالج شيئًا آخر.',
              },
              {
                en: '**Antiscalant is not actually being delivered.** A pump running dry, a blocked injection point or a suction lost to degassing. The controller reports a call for dose; nothing confirms the dose arrived.',
                ar: '**عدم ضخ مانع الترسب فعليًا.** مضخة تعمل جافة، أو نقطة حقن مسدودة، أو فقد سحب بسبب تحرر الغازات. تُبلّغ وحدة التحكم بطلب جرعة، ولا شيء يؤكد وصولها.',
              },
            ],
          },
        ],
      },
      {
        id: 'stagnation',
        heading: { en: 'The one nobody looks at: stagnation', ar: 'ما لا ينظر إليه أحد: الركود' },
        blocks: [
          {
            type: 'p',
            text: {
              en: 'An RO plant that runs intermittently spends most of its life full of stationary water at ambient temperature, with the oxidant residual already removed by the dechlorination step. That is close to an ideal culture environment.',
              ar: 'محطة تناضح عكسي تعمل بشكل متقطع تقضي معظم عمرها مملوءة بمياه ساكنة عند درجة حرارة الجو، وقد أُزيل المتبقي المؤكسد بخطوة إزالة الكلور. وهذا قريب من بيئة استزراع مثالية.',
            },
          },
          {
            type: 'p',
            text: {
              en: 'Biological fouling in a plant with a good SDI and clean pretreatment is very often a stagnation problem rather than a feed problem. Standby flushing regimes and preservation procedures exist for exactly this reason, and they are among the first things to lapse.',
              ar: 'والاتساخ البيولوجي في محطة ذات SDI جيد ومعالجة أولية نظيفة كثيرًا ما يكون مشكلة ركود لا مشكلة تغذية. ولهذا السبب بالضبط توجد إجراءات الغسيل أثناء التوقف والحفظ، وهي من أوائل ما يُهمَل.',
            },
          },
          {
            type: 'note',
            text: {
              en: 'If the plant has an automatic standby flush programmed, verify it is actually running. It is a common casualty of a controller replacement or a configuration reset.',
              ar: 'إذا كان لدى المحطة غسيل تلقائي مبرمج أثناء التوقف، فتحقق من أنه يعمل فعلًا. فهو ضحية شائعة لاستبدال وحدة تحكم أو إعادة ضبط التهيئة.',
            },
          },
        ],
      },
    ],
    checklist: [
      { en: 'Walk the pretreatment train physically and confirm every stage is in service and not bypassed.', ar: 'تفقّد سلسلة المعالجة الأولية ميدانيًا وتأكد أن كل مرحلة في الخدمة وغير متجاوَزة.' },
      { en: 'Test for oxidant residual immediately upstream of the membrane.', ar: 'اختبر المتبقي المؤكسد مباشرة قبل الغشاء.' },
      { en: 'Measure SDI at the membrane feed and record it, not just the plant inlet turbidity.', ar: 'قِس SDI عند تغذية الغشاء وسجّله، لا عكارة مدخل المحطة فقط.' },
      { en: 'Check cartridge element life against its historic value.', ar: 'قارن عمر عنصر الخرطوشة بقيمته التاريخية.' },
      { en: 'Verify antiscalant is physically leaving the drum — check level against calculated consumption.', ar: 'تحقق من مغادرة مانع الترسب للبرميل فعليًا — قارن المستوى بالاستهلاك المحسوب.' },
      { en: 'Confirm standby flushing is programmed and actually running.', ar: 'تأكد أن غسيل التوقف مبرمج ويعمل فعلًا.' },
      { en: 'Compare the current feed analysis with the one the plant was designed against.', ar: 'قارن تحليل التغذية الحالي بالتحليل الذي صُممت عليه المحطة.' },
    ],
    escalation: {
      en: 'Oxidant exposure permanently damages a polyamide membrane, and no cleaning reverses it — a rising salt passage after a dechlorination fault usually means replacement, and confirming the cause matters before the new elements are exposed to the same condition. Where the source water has genuinely changed, the pretreatment train needs re-evaluating against the new analysis rather than adjusting.',
      ar: 'يُتلف التعرض للمؤكسدات غشاء البولي أميد بشكل دائم، ولا يعكس ذلك أي تنظيف — فارتفاع تسرب الأملاح بعد عطل في إزالة الكلور يعني عادةً الاستبدال، ويهم تأكيد السبب قبل تعريض العناصر الجديدة للحالة نفسها. وحيث تغيّرت مياه المصدر فعلًا، تحتاج سلسلة المعالجة الأولية إلى إعادة تقييم مقابل التحليل الجديد لا إلى تعديل.',
    },
    solutions: ['ro-membranes', 'process-water'],
    technologies: ['filtration', 'reverse-osmosis', 'water-analysis', 'chemical-dosing', 'monitoring-control'],
    products: ['timex-cartridge-filter', 'timex-svf-series', 'timex-kmf-series', 'walchem-e-series'],
    faqs: [
      {
        id: 'q1',
        question: { en: 'Can a damaged membrane be recovered?', ar: 'هل يمكن استعادة غشاء تالف؟' },
        answer: {
          en: 'Fouling can usually be cleaned. Oxidative damage to the polyamide layer cannot — the separation performance is permanently changed, and cleaning will not restore it. Distinguishing between the two before ordering replacements is worth the diagnostic effort.',
          ar: 'يمكن عادةً تنظيف الاتساخ. أما التلف التأكسدي لطبقة البولي أميد فلا — إذ يتغير أداء الفصل بشكل دائم ولا يستعيده التنظيف. والتمييز بين الحالتين قبل طلب البدائل يستحق جهد التشخيص.',
        },
      },
      {
        id: 'q2',
        question: { en: 'Is a cartridge filter enough pretreatment on a clean supply?', ar: 'هل يكفي مرشح الخراطيش كمعالجة أولية لمصدر نظيف؟' },
        answer: {
          en: 'A cartridge filter is a barrier, not a treatment stage. It has limited holding capacity and is designed to catch what gets through, not to carry the main solids load. Where it is doing the bulk removal, element life will be short — and short element life is the plant telling you the upstream stages are missing.',
          ar: 'مرشح الخراطيش حاجز لا مرحلة معالجة. فسعته الاحتجازية محدودة وهو مصمم لالتقاط ما يمر لا لحمل العبء الرئيسي من المواد الصلبة. وحيث يقوم بالإزالة الأساسية سيكون عمر العنصر قصيرًا — وقِصر عمر العنصر هو رسالة المحطة بأن المراحل السابقة ناقصة.',
        },
      },
    ],
  },

  /* ====================================================================== */
  {
    slug: 'when-self-cleaning-filter',
    status: 'published',
    category: 'filtration',
    readingMinutes: 6,
    publishedAt: '2026-02-17',
    title: { en: 'When Should You Use a Self-Cleaning Filter?', ar: 'متى ينبغي استخدام مرشح ذاتي التنظيف؟' },
    question: {
      en: 'When does an automatic self-cleaning filter earn its cost over a manual or replaceable element?',
      ar: 'متى يستحق المرشح الأوتوماتيكي ذاتي التنظيف تكلفته مقارنة بعنصر يدوي أو قابل للاستبدال؟',
    },
    summary: {
      en: 'The decision turns on solids load, how much interruption the process tolerates, and what manual cleaning actually costs in labour and downtime.',
      ar: 'يتوقف القرار على حمل المواد الصلبة، ومدى تحمّل العملية للانقطاع، وما يكلفه التنظيف اليدوي فعليًا من عمالة وتوقف.',
    },
    metaTitle: { en: 'When to Use a Self-Cleaning Filter | C-Water', ar: 'متى تستخدم مرشحًا ذاتي التنظيف | C-Water' },
    metaDescription: {
      en: 'Choosing between automatic self-cleaning, cartridge and manual filtration: solids load, cleaning frequency, process interruption, backwash water and total cost of ownership.',
      ar: 'الاختيار بين الترشيح الأوتوماتيكي ذاتي التنظيف والخراطيش واليدوي: حمل المواد الصلبة، وتكرار التنظيف، وانقطاع العملية، ومياه الغسيل العكسي، والتكلفة الإجمالية للملكية.',
    },
    sections: [
      {
        id: 'question',
        heading: { en: 'The real question is cleaning frequency', ar: 'السؤال الحقيقي هو تكرار التنظيف' },
        blocks: [
          {
            type: 'p',
            text: {
              en: 'Every filter needs cleaning. The only decision is whether that happens automatically, or whether somebody has to stop the process, isolate the vessel and do it by hand.',
              ar: 'كل مرشح يحتاج تنظيفًا. والقرار الوحيد هو ما إذا كان ذلك يحدث تلقائيًا، أم يتعين على شخص إيقاف العملية وعزل الوعاء وتنظيفه يدويًا.',
            },
          },
          {
            type: 'p',
            text: {
              en: 'That makes the deciding variable the mass of solids arriving per hour, not the flow rate. A high flow of clean water may need cleaning once a month. A modest flow of dirty water may need it twice a shift.',
              ar: 'وهذا يجعل المتغير الحاسم هو كتلة المواد الصلبة الواصلة في الساعة، لا معدل التدفق. فقد يحتاج تدفق كبير من مياه نظيفة تنظيفًا مرة شهريًا، بينما يحتاج تدفق متوسط من مياه متسخة تنظيفًا مرتين في الوردية.',
            },
          },
        ],
      },
      {
        id: 'when',
        heading: { en: 'Where automatic cleaning is the right answer', ar: 'أين يكون التنظيف الأوتوماتيكي هو الجواب الصحيح' },
        blocks: [
          {
            type: 'ul',
            items: [
              { en: 'Solids load is high enough that manual cleaning would be needed daily or more often.', ar: 'حمل المواد الصلبة مرتفع بدرجة تستلزم تنظيفًا يدويًا يوميًا أو أكثر.' },
              { en: 'The process cannot be interrupted to service a filter.', ar: 'لا يمكن مقاطعة العملية لخدمة مرشح.' },
              { en: 'Load is variable or unpredictable, so a fixed maintenance interval would be wrong most of the time.', ar: 'الحمل متغير أو غير متوقع، فيكون أي جدول صيانة ثابت خاطئًا في معظم الأوقات.' },
              { en: 'The site is remote or has limited technical attendance.', ar: 'الموقع نائٍ أو ذو إشراف فني محدود.' },
              { en: 'Manual cleaning is a confined space, hot work or awkward access task.', ar: 'التنظيف اليدوي عمل في حيز محصور أو عمل ساخن أو صعب الوصول.' },
              { en: 'Consumable element cost has become a significant recurring spend.', ar: 'أصبحت تكلفة العناصر الاستهلاكية إنفاقًا متكررًا كبيرًا.' },
            ],
          },
          {
            type: 'note',
            text: {
              en: 'On many sites the labour cost of manual cleaning alone justifies automation, before any consideration of downtime or consumables. It is worth counting the hours actually spent before comparing capital costs.',
              ar: 'في كثير من المواقع، تبرر تكلفةُ عمالة التنظيف اليدوي وحدها الأتمتةَ قبل أي اعتبار للتوقف أو المواد الاستهلاكية. ويستحق الأمر حساب الساعات المنفقة فعلًا قبل مقارنة التكاليف الرأسمالية.',
            },
          },
        ],
      },
      {
        id: 'when-not',
        heading: { en: 'Where it is not', ar: 'وأين لا يكون كذلك' },
        blocks: [
          {
            type: 'ul',
            items: [
              { en: 'Solids load is genuinely low and elements last months. Automation adds complexity for no benefit.', ar: 'حمل المواد الصلبة منخفض فعلًا وتدوم العناصر شهورًا. فالأتمتة تضيف تعقيدًا بلا فائدة.' },
              { en: 'The required filtration degree is finer than a screen filter can practically achieve.', ar: 'درجة الترشيح المطلوبة أدق مما يمكن للمرشح الشبكي تحقيقه عمليًا.' },
              { en: 'There is not enough differential pressure available to drive the cleaning cycle.', ar: 'لا يتوفر فرق ضغط كافٍ لتشغيل دورة التنظيف.' },
              { en: 'The application needs absolute retention rather than nominal — a barrier duty ahead of a membrane, for instance.', ar: 'يتطلب التطبيق احتجازًا مطلقًا لا اسميًا — مثل مهمة حاجز قبل غشاء.' },
              { en: 'Backwash water cannot be accommodated, or its discharge is itself a problem.', ar: 'لا يمكن استيعاب مياه الغسيل العكسي، أو أن تصريفها مشكلة في حد ذاتها.' },
            ],
          },
        ],
      },
      {
        id: 'sizing',
        heading: { en: 'Sizing it properly', ar: 'التحجيم الصحيح' },
        blocks: [
          {
            type: 'p',
            text: {
              en: 'The single most common sizing error is selecting on pipe diameter. A filter sized to match the line is sized to nothing in particular — the correct basis is the solids load, its nature, the required filtration degree and the available differential pressure.',
              ar: 'أشيع خطأ في التحجيم هو الاختيار وفق قطر الخط. فالمرشح المُختار ليطابق الخط مُحجَّم على لا شيء بعينه — والأساس الصحيح هو حمل المواد الصلبة وطبيعته ودرجة الترشيح المطلوبة وفرق الضغط المتاح.',
            },
          },
          {
            type: 'p',
            text: {
              en: 'The nature of the solids matters as much as the quantity. Sand behaves differently from biological floc, which behaves differently from corrosion product. A screen that handles one may blind on another, which is why disc filtration is often the answer on organic-loaded sources.',
              ar: 'وطبيعة المواد الصلبة لا تقل أهمية عن كميتها. فالرمل يختلف سلوكه عن الندف البيولوجية، والتي تختلف عن نواتج التآكل. وقد تنسد شاشة تتعامل مع أحدها أمام الآخر، ولهذا يكون الترشيح بالأقراص غالبًا هو الجواب للمصادر ذات الحمل العضوي.',
            },
          },
          {
            type: 'p',
            text: {
              en: 'Backwash water is a real design item, not a detail. It has to be available at the required rate and pressure, and it has to go somewhere. On a system with a discharge consent, that somewhere needs deciding at design stage.',
              ar: 'ومياه الغسيل العكسي بند تصميمي حقيقي لا تفصيلة. فيجب أن تتوفر بالمعدل والضغط المطلوبين، ويجب أن تذهب إلى مكان ما. وفي نظام له إذن تصريف، يجب تحديد ذلك المكان في مرحلة التصميم.',
            },
          },
          {
            type: 'note',
            text: {
              en: 'Once installed, cleaning frequency becomes a free diagnostic. A filter that suddenly starts cleaning twice as often is reporting a change in the source water before anything downstream notices it.',
              ar: 'وبعد التركيب، يصبح تكرار التنظيف تشخيصًا مجانيًا. فالمرشح الذي يبدأ فجأة بالتنظيف بضعف الوتيرة يبلّغ عن تغير في مياه المصدر قبل أن يلاحظه أي شيء بعده.',
            },
          },
        ],
      },
    ],
    checklist: [
      { en: 'Measure the actual solids load — concentration and particle size distribution, not just turbidity.', ar: 'قِس حمل المواد الصلبة الفعلي — التركيز وتوزيع أحجام الجسيمات، لا العكارة فقط.' },
      { en: 'Define the filtration degree from what needs protecting downstream.', ar: 'حدد درجة الترشيح انطلاقًا مما يجب حمايته بعدها.' },
      { en: 'Record how many hours a month are currently spent on manual cleaning.', ar: 'سجّل عدد الساعات المنفقة شهريًا حاليًا على التنظيف اليدوي.' },
      { en: 'Confirm the differential pressure available to drive a cleaning cycle.', ar: 'تأكد من فرق الضغط المتاح لتشغيل دورة التنظيف.' },
      { en: 'Decide where backwash water goes before selecting the filter.', ar: 'حدد وجهة مياه الغسيل العكسي قبل اختيار المرشح.' },
      { en: 'Check whether side-stream filtration would meet the need more economically than full-flow.', ar: 'تحقق مما إذا كان الترشيح الجانبي يلبي الحاجة بشكل أوفر من الترشيح الكلي.' },
    ],
    escalation: {
      en: 'Filter selection is straightforward when the solids load is characterised and difficult when it is assumed. Where the load has never been measured — which is most of the time — a short sampling exercise before specifying is far cheaper than replacing an undersized filter after commissioning, or running an oversized one for twenty years.',
      ar: 'اختيار المرشح سهل حين يكون حمل المواد الصلبة موصَّفًا، وصعب حين يكون مفترضًا. وحيث لم يُقَس الحمل قط — وهو الغالب — يكون إجراء قياس قصير قبل تحديد المواصفة أرخص كثيرًا من استبدال مرشح صغير بعد التشغيل، أو تشغيل مرشح مفرط الحجم لعشرين عامًا.',
    },
    solutions: ['cooling-water', 'ro-membranes', 'industrial-water', 'wastewater', 'process-water'],
    technologies: ['filtration', 'engineering-integration'],
    products: ['timex-kmf-series', 'timex-svf-series', 'timex-disc-filter', 'timex-hydrospin', 'timex-separator-filter'],
    faqs: [
      {
        id: 'q1',
        question: { en: 'Does a self-cleaning filter waste water?', ar: 'هل يهدر المرشح ذاتي التنظيف المياه؟' },
        answer: {
          en: 'It uses backwash water on each cleaning cycle. Whether that is waste depends on the alternative: manual cleaning also involves draining and flushing, and on a recirculating system the backwash volume is often small against the blowdown the deposits would otherwise force.',
          ar: 'يستخدم مياه غسيل عكسي في كل دورة تنظيف. وما إذا كان ذلك هدرًا يعتمد على البديل: فالتنظيف اليدوي يشمل أيضًا تفريغًا وغسيلًا، وفي نظام دائر يكون حجم الغسيل العكسي غالبًا صغيرًا مقابل التصريف الذي كانت الرواسب ستفرضه.',
        },
      },
      {
        id: 'q2',
        question: { en: 'Full-flow or side-stream for a cooling tower?', ar: 'ترشيح كلي أم جانبي لبرج التبريد؟' },
        answer: {
          en: 'Side-stream is usually the more economical answer for a cooling tower basin. Treating a fraction of a recirculating volume continuously removes far more solids over a season than the instantaneous flow rate suggests, at a fraction of the capital cost of full-flow filtration.',
          ar: 'الترشيح الجانبي عادةً الحل الأوفر لحوض برج التبريد. فمعالجة جزء من الحجم الدائر باستمرار تزيل مواد صلبة أكثر بكثير على مدى موسم مما يوحي به معدل التدفق اللحظي، وبجزء من التكلفة الرأسمالية للترشيح الكلي.',
        },
      },
    ],
  },

  /* ====================================================================== */
  {
    slug: 'filtration-protects-downstream',
    status: 'published',
    category: 'filtration',
    readingMinutes: 6,
    publishedAt: '2026-03-02',
    title: { en: 'How Filtration Protects Downstream Equipment', ar: 'كيف يحمي الترشيح المعدات اللاحقة' },
    question: {
      en: 'What does removing suspended solids actually save, beyond the obvious blockage?',
      ar: 'ما الذي توفّره إزالة المواد الصلبة العالقة فعليًا، بعيدًا عن الانسداد الظاهر؟',
    },
    summary: {
      en: 'Solids cost you three times over: they foul heat transfer, they shelter microbiology, and they consume treatment chemical that should have been protecting metal.',
      ar: 'تكلفك المواد الصلبة ثلاث مرات: تُلوّث التبادل الحراري، وتوفر ملاذًا للميكروبات، وتستهلك كيماويات المعالجة التي كان يجب أن تحمي المعدن.',
    },
    metaTitle: { en: 'How Filtration Protects Downstream Equipment | C-Water', ar: 'كيف يحمي الترشيح المعدات اللاحقة | C-Water' },
    metaDescription: {
      en: 'Why suspended solids removal matters: heat transfer fouling, under-deposit corrosion, biofilm shelter, chemical consumption and instrument reliability.',
      ar: 'لماذا تهم إزالة المواد الصلبة العالقة: اتساخ التبادل الحراري، والتآكل تحت الرواسب، وملاذ الأغشية الحيوية، واستهلاك الكيماويات، وموثوقية أجهزة القياس.',
    },
    sections: [
      {
        id: 'compound',
        heading: { en: 'Solids do more than block things', ar: 'المواد الصلبة تفعل أكثر من مجرد الانسداد' },
        blocks: [
          {
            type: 'p',
            text: {
              en: 'Blockage is the visible consequence, and it is the least of it. Suspended solids in a water system have three further effects, and they compound each other.',
              ar: 'الانسداد هو النتيجة الظاهرة، وهو أقلها شأنًا. فللمواد الصلبة العالقة في نظام مياه ثلاثة آثار إضافية، وتتضاعف آثارها معًا.',
            },
          },
          {
            type: 'ol',
            items: [
              {
                en: '**They insulate heat-transfer surfaces.** A deposit layer on a tube reduces heat transfer as effectively as scale does, and it forms preferentially in low-velocity areas where nobody is looking.',
                ar: '**تعزل أسطح التبادل الحراري.** فطبقة راسبة على أنبوب تقلل التبادل الحراري بفعالية الترسبات نفسها، وتتكوّن تفضيليًا في مناطق السرعة المنخفضة حيث لا ينظر أحد.',
              },
              {
                en: '**They create under-deposit corrosion cells.** Metal beneath a deposit is oxygen-depleted relative to the metal around it, which makes it anodic. This is localised attack, and it is far more damaging than general corrosion.',
                ar: '**تخلق خلايا تآكل تحت الرواسب.** فالمعدن تحت الراسب فقير بالأكسجين مقارنة بالمعدن حوله، مما يجعله أنوديًا. وهذا هجوم موضعي، وهو أشد ضررًا بكثير من التآكل العام.',
              },
              {
                en: '**They shelter microbiology.** A settled deposit is a physical refuge from biocide. This is why systems with poor filtration often show high biological counts despite a well-run biocide programme.',
                ar: '**توفر ملاذًا للميكروبات.** فالراسب المستقر ملجأ فيزيائي من المبيدات. ولهذا كثيرًا ما تُظهر الأنظمة ضعيفة الترشيح أعدادًا بيولوجية مرتفعة رغم برنامج مبيدات جيد الإدارة.',
              },
              {
                en: '**They consume treatment chemical.** Dispersant spent keeping particles mobile is dispersant not available for anything else, and it raises the chemical demand of the whole programme.',
                ar: '**تستهلك كيماويات المعالجة.** فالمشتت المستهلك في إبقاء الجسيمات متحركة مشتت غير متاح لغرض آخر، ويرفع الطلب الكيميائي للبرنامج كله.',
              },
            ],
          },
        ],
      },
      {
        id: 'protected',
        heading: { en: 'What is actually being protected', ar: 'ما الذي يُحمى فعليًا' },
        blocks: [
          {
            type: 'ul',
            items: [
              { en: '**Heat exchangers and condensers** — where fouling appears first as a rising approach temperature and only later as a fault.', ar: '**المبادلات الحرارية والمكثفات** — حيث يظهر الاتساخ أولًا كارتفاع في درجة حرارة الاقتراب ولاحقًا فقط كعطل.' },
              { en: '**RO membranes** — where suspended and colloidal load determines cleaning frequency and, over time, element life.', ar: '**أغشية التناضح العكسي** — حيث يحدد الحمل العالق والغروي تكرار التنظيف، ومع الوقت عمر العنصر.' },
              { en: '**Spray nozzles and emitters** — where partial blockage shows up as uneven distribution rather than as an obvious failure.', ar: '**فوهات الرش والنقاطات** — حيث يظهر الانسداد الجزئي كتوزيع غير منتظم لا كعطل واضح.' },
              { en: '**Pumps, seals and valves** — where abrasive solids cause wear that is attributed to age.', ar: '**المضخات والحشيات والصمامات** — حيث تسبب المواد الصلبة الكاشطة تآكلًا يُنسب إلى العمر.' },
              { en: '**Instrumentation** — where a fouled sensor produces a wrong reading, and every control decision downstream of it inherits that error.', ar: '**أجهزة القياس** — حيث يعطي مستشعر متسخ قراءة خاطئة، فيرث كل قرار تحكم بعده ذلك الخطأ.' },
            ],
          },
          {
            type: 'note',
            text: {
              en: 'The instrument case is worth dwelling on. A fouled conductivity cell or pH electrode does not announce itself. It quietly makes every dosing and blowdown decision slightly wrong — for as long as it takes somebody to notice.',
              ar: 'وتستحق حالة أجهزة القياس وقفة. فخلية توصيلية أو قطب pH متسخ لا يعلن عن نفسه، بل يجعل بهدوء كل قرار ضخ وتصريف خاطئًا قليلًا — طوال المدة التي يستغرقها أحدهم لملاحظة ذلك.',
            },
          },
        ],
      },
      {
        id: 'degree',
        heading: { en: 'Choosing the degree', ar: 'اختيار درجة الترشيح' },
        blocks: [
          {
            type: 'p',
            text: {
              en: 'The retained particle size should be set by what needs protecting, not by what sounds thorough. Both errors are expensive in different ways.',
              ar: 'ينبغي أن يُحدَّد حجم الجسيمات المحتجزة بما يجب حمايته، لا بما يبدو شاملًا. وكلا الخطأين مكلف بطريقة مختلفة.',
            },
          },
          {
            type: 'p',
            text: {
              en: 'Over-filtering raises differential pressure, increases cleaning frequency, consumes more backwash water and costs energy continuously — for retention the downstream equipment never needed. Under-filtering simply passes the problem on, and the problem gets more expensive the further downstream it travels.',
              ar: 'فالمبالغة في الترشيح ترفع فرق الضغط، وتزيد تكرار التنظيف، وتستهلك مياه غسيل أكثر، وتكلف طاقة باستمرار — مقابل احتجاز لم تحتجه المعدات اللاحقة. أما التقصير فيمرر المشكلة فحسب، وتزداد تكلفتها كلما ابتعدت.',
            },
          },
          {
            type: 'p',
            text: {
              en: 'Position matters as much as degree. Full-flow filtration treats everything passing a point. Side-stream treats a fraction of a recirculating volume continuously, which over a season removes far more than its instantaneous rate suggests — usually at a fraction of the capital cost.',
              ar: 'والموضع لا يقل أهمية عن الدرجة. فالترشيح الكلي يعالج كل ما يمر بنقطة، والجانبي يعالج جزءًا من حجم دائر باستمرار، فيزيل على مدى موسم أكثر بكثير مما يوحي به معدله اللحظي — وبجزء من التكلفة الرأسمالية عادةً.',
            },
          },
        ],
      },
    ],
    checklist: [
      { en: 'List what is downstream and what each item can actually tolerate.', ar: 'أدرج ما يقع بعد المرشح وما يتحمله كل بند فعليًا.' },
      { en: 'Measure the solids load rather than estimating it from appearance.', ar: 'قِس حمل المواد الصلبة بدل تقديره من المظهر.' },
      { en: 'Trend heat exchanger approach temperature — it is the earliest fouling indicator you already have.', ar: 'تتبع درجة حرارة الاقتراب في المبادل — فهي أبكر مؤشر اتساخ متاح لديك بالفعل.' },
      { en: 'Inspect low-velocity areas and dead legs, where deposits accumulate first.', ar: 'افحص مناطق السرعة المنخفضة والفروع الميتة، حيث تتراكم الرواسب أولًا.' },
      { en: 'Check whether biological counts correlate with settled solids rather than with biocide dose.', ar: 'تحقق مما إذا كانت الأعداد البيولوجية ترتبط بالمواد الصلبة المستقرة لا بجرعة المبيد.' },
      { en: 'Review dispersant consumption — high demand often indicates a mechanical removal opportunity.', ar: 'راجع استهلاك المشتتات — فالطلب المرتفع يشير غالبًا إلى فرصة للإزالة الميكانيكية.' },
    ],
    escalation: {
      en: 'Where deposits are already present, identify what they are made of before selecting a filter or a cleaning method. Corrosion product, biological deposit and carbonate scale look similar, arrive by different routes and call for different responses — and filtration only addresses one of the three.',
      ar: 'حيث توجد رواسب بالفعل، حدد مكوّنها قبل اختيار مرشح أو طريقة تنظيف. فنواتج التآكل والرواسب البيولوجية وترسبات الكربونات تتشابه، وتصل بطرق مختلفة، وتستدعي استجابات مختلفة — والترشيح يعالج واحدة فقط من الثلاث.',
    },
    solutions: ['cooling-water', 'ro-membranes', 'process-water', 'industrial-water', 'potable-water'],
    technologies: ['filtration', 'water-treatment-chemicals', 'sensors-measurement'],
    products: ['timex-svf-series', 'timex-kmf-series', 'timex-cartridge-filter', 'timex-disc-filter'],
    faqs: [
      {
        id: 'q1',
        question: { en: 'Will filtration reduce our chemical consumption?', ar: 'هل سيقلل الترشيح استهلاكنا للكيماويات؟' },
        answer: {
          en: 'It reduces the demand placed on the dispersant part of the programme, because solids removed mechanically are solids the chemistry no longer has to keep in suspension. It does not reduce the inhibitor or biocide requirement, which are set by the water chemistry and the biological load.',
          ar: 'يقلل الطلب على الجزء المشتت من البرنامج، لأن المواد الصلبة المزالة ميكانيكيًا لم تعد الكيمياء مضطرة لإبقائها معلّقة. لكنه لا يقلل متطلب المثبطات أو المبيدات، فهما يتحددان بكيمياء المياه والحمل البيولوجي.',
        },
      },
      {
        id: 'q2',
        question: { en: 'Our water looks clear. Do we still need filtration?', ar: 'مياهنا تبدو صافية. هل ما زلنا نحتاج ترشيحًا؟' },
        answer: {
          en: 'Visual clarity says very little. Colloidal and fine particulate load is not visible and is exactly what fouls membranes and settles in low-velocity areas. Turbidity or SDI measurement answers the question; appearance does not.',
          ar: 'الصفاء الظاهري لا يعني الكثير. فالحمل الغروي والجسيمي الدقيق غير مرئي، وهو بالضبط ما يُوسّخ الأغشية ويستقر في مناطق السرعة المنخفضة. وقياس العكارة أو SDI هو ما يجيب عن السؤال لا المظهر.',
        },
      },
    ],
  },
];
