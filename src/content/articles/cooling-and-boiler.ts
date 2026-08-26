import type { Article } from '../types';

/**
 * Knowledge Center — cooling water and boiler topics.
 *
 * Each article answers one question an engineer or plant manager actually
 * searches for, in enough depth to be useful on site, and ends by saying
 * plainly where a website article stops and an engineer starts.
 */
export const coolingAndBoilerArticles: Article[] = [
  /* ====================================================================== */
  {
    slug: 'what-causes-scale-in-cooling-towers',
    status: 'published',
    category: 'cooling-water',
    readingMinutes: 7,
    publishedAt: '2026-02-10',
    title: { en: 'What Causes Scale in Cooling Towers?', ar: 'ما الذي يسبب الترسبات في أبراج التبريد؟' },
    question: {
      en: 'Why does scale form in a cooling tower, and what actually determines how much of it you get?',
      ar: 'لماذا تتكوّن الترسبات في برج التبريد، وما الذي يحدد فعليًا كميتها؟',
    },
    summary: {
      en: 'Evaporation concentrates dissolved minerals until they exceed their solubility — and the hottest surface is where they come out of solution first.',
      ar: 'يركّز التبخر المعادنَ الذائبة حتى تتجاوز حد ذوبانها — وأسخن سطح هو أول ما تترسب عليه.',
    },
    metaTitle: { en: 'What Causes Scale in Cooling Towers? | C-Water', ar: 'ما الذي يسبب الترسبات في أبراج التبريد؟ | C-Water' },
    metaDescription: {
      en: 'Why cooling tower scale forms: evaporation, cycles of concentration, inverse solubility and surface temperature — and what determines how much scale a system gets.',
      ar: 'لماذا تتكوّن ترسبات أبراج التبريد: التبخر، ودورات التركيز، والذوبانية العكسية، ودرجة حرارة السطح — وما الذي يحدد كمية الترسبات في النظام.',
    },
    sections: [
      {
        id: 'mechanism',
        heading: { en: 'The mechanism: evaporation without removal', ar: 'الآلية: تبخر بلا إزالة' },
        blocks: [
          {
            type: 'p',
            text: {
              en: 'A cooling tower rejects heat by evaporating water. What evaporates is pure water; every dissolved mineral that came in with the make-up stays behind. Replace the evaporated volume with fresh make-up, and you have added another dose of the same minerals to a system that is already carrying the last one.',
              ar: 'يطرد برج التبريد الحرارة بتبخير المياه. وما يتبخر هو ماء نقي، بينما يبقى كل معدن ذائب دخل مع مياه التعويض. وعند تعويض الحجم المتبخر بمياه جديدة، تكون قد أضفت جرعة أخرى من المعادن نفسها إلى نظام يحمل الجرعة السابقة بالفعل.',
            },
          },
          {
            type: 'p',
            text: {
              en: 'Concentration therefore rises continuously unless water is deliberately removed. That deliberate removal is blowdown, and the ratio between the concentration in the system and the concentration in the make-up is the cycles of concentration.',
              ar: 'ولذلك يرتفع التركيز باستمرار ما لم تُزَل المياه عمدًا. وهذه الإزالة المتعمدة هي التصريف، والنسبة بين التركيز في النظام والتركيز في مياه التعويض هي دورات التركيز.',
            },
          },
          {
            type: 'p',
            text: {
              en: 'Scale forms when a dissolved salt exceeds its solubility at the conditions it finds itself in. Calcium carbonate is the usual culprit, because it is abundant in most supply waters and because it becomes *less* soluble as temperature rises.',
              ar: 'تتكوّن الترسبات حين يتجاوز ملح ذائب حدَّ ذوبانه في الظروف التي يوجد فيها. وكربونات الكالسيوم هي المتهم المعتاد، لوفرتها في معظم مياه الإمداد ولأن ذوبانها *ينخفض* مع ارتفاع درجة الحرارة.',
            },
          },
        ],
      },
      {
        id: 'inverse',
        heading: { en: 'Why it appears on the surfaces you care about', ar: 'لماذا تظهر على الأسطح التي تهمك' },
        blocks: [
          {
            type: 'p',
            text: {
              en: 'That inverse solubility is why cooling tower scale is such an expensive problem. The salt precipitates preferentially where the water is hottest — which is the heat-transfer surface, which is the one part of the system whose performance you are paying for.',
              ar: 'هذه الذوبانية العكسية هي سبب كون ترسبات أبراج التبريد مشكلة باهظة. فالملح يترسب تفضيليًا حيث تكون المياه أسخن — أي على سطح التبادل الحراري، وهو الجزء الوحيد من النظام الذي تدفع مقابل أدائه.',
            },
          },
          {
            type: 'p',
            text: {
              en: 'Bulk water temperature is not the number that matters here. Skin temperature at the tube wall is higher than the bulk, and it is the skin temperature that determines whether precipitation occurs. A system can look comfortable on a bulk measurement and still be scaling at the tube.',
              ar: 'ودرجة حرارة الكتلة المائية ليست الرقم المهم هنا. فدرجة حرارة السطح عند جدار الأنبوب أعلى من الكتلة، وهي التي تحدد وقوع الترسب. وقد يبدو النظام مطمئنًا بحسب قياس الكتلة بينما يترسب عند الأنبوب.',
            },
          },
          {
            type: 'note',
            text: {
              en: 'Scale is an insulator. A deposit layer on a condenser tube raises the temperature difference needed to reject the same heat, which the plant experiences as a compressor working harder — usually long before anyone opens the exchanger.',
              ar: 'الترسبات مادة عازلة. فطبقة راسبة على أنبوب مكثف ترفع فرق الحرارة اللازم لطرد القدر نفسه من الحرارة، وتشعر به المنشأة في صورة ضاغط يعمل بجهد أكبر — غالبًا قبل أن يفتح أحد المبادل بوقت طويل.',
            },
          },
        ],
      },
      {
        id: 'factors',
        heading: { en: 'The four things that decide how much scale you get', ar: 'الأمور الأربعة التي تحدد كمية الترسبات' },
        blocks: [
          {
            type: 'ol',
            items: [
              {
                en: '**Make-up water chemistry.** Calcium, magnesium, alkalinity and silica in the incoming supply set the starting point. Two identical towers on different supplies are not the same problem.',
                ar: '**كيمياء مياه التعويض.** يحدد الكالسيوم والمغنيسيوم والقلوية والسيليكا في الإمداد الوارد نقطةَ البداية. فبرجان متطابقان على مصدرين مختلفين ليسا المشكلة نفسها.',
              },
              {
                en: '**Cycles of concentration.** Every cycle multiplies the dissolved concentration. Running higher cycles saves water and chemical, but it moves the system closer to the point where salts precipitate.',
                ar: '**دورات التركيز.** كل دورة تضاعف تركيز الذائبات. وتشغيل دورات أعلى يوفر المياه والكيماويات، لكنه يقرّب النظام من نقطة ترسب الأملاح.',
              },
              {
                en: '**pH.** Carbonate equilibrium shifts with pH. As pH rises, more of the dissolved carbon species is present as carbonate, and calcium carbonate becomes more likely to precipitate.',
                ar: '**درجة الحموضة.** يتغير اتزان الكربونات مع pH. فمع ارتفاعها، يوجد قدر أكبر من الكربون الذائب على هيئة كربونات، ويصبح ترسب كربونات الكالسيوم أكثر احتمالًا.',
              },
              {
                en: '**Surface temperature.** The hottest surface in the circuit sets where and how fast deposition happens, regardless of what the bulk water reading says.',
                ar: '**درجة حرارة السطح.** يحدد أسخن سطح في الدائرة أين وبأي سرعة يحدث الترسب، بغض النظر عن قراءة الكتلة المائية.',
              },
            ],
          },
          {
            type: 'p',
            text: {
              en: 'Indices such as the Langelier or Ryznar Saturation Index combine several of these into a single number. They are useful for direction — is this water scaling or corrosive — but they are indicators, not predictions, and they do not account for the inhibitor programme in the system.',
              ar: 'تجمع مؤشرات مثل Langelier أو Ryznar عدة عوامل من هذه في رقم واحد. وهي مفيدة لتحديد الاتجاه — هل هذه المياه مرسِّبة أم تآكلية — لكنها مؤشرات لا تنبؤات، ولا تأخذ في الحسبان برنامج المثبطات في النظام.',
            },
          },
        ],
      },
      {
        id: 'control',
        heading: { en: 'How scale is actually controlled', ar: 'كيف يُتحكَّم في الترسبات فعليًا' },
        blocks: [
          {
            type: 'p',
            text: {
              en: 'Threshold inhibitors work sub-stoichiometrically: a small dose interferes with crystal growth so that the salt stays in solution above the point where it would normally precipitate. This is what makes higher cycles of concentration possible without depositing on the exchanger.',
              ar: 'تعمل المثبطات الحدّية بجرعات أقل من النسبة المكافئة: فجرعة صغيرة تتداخل مع نمو البلورات لتبقى الأملاح ذائبة فوق النقطة التي كانت ستترسب عندها عادةً. وهذا ما يجعل دورات التركيز الأعلى ممكنة دون ترسب على المبادل.',
            },
          },
          {
            type: 'p',
            text: {
              en: 'Dispersants handle what does form, keeping particles mobile so they leave with the blowdown rather than settling in low-velocity areas. Side-stream filtration removes the settled and suspended load mechanically, which reduces the demand placed on the chemical programme.',
              ar: 'تتعامل المشتتات مع ما يتكوّن فعلًا، فتبقي الجسيمات متحركة لتخرج مع التصريف بدل أن تستقر في مناطق السرعة المنخفضة. ويزيل الترشيح الجانبي الحملَ المستقر والعالق ميكانيكيًا، فيقلل الطلب على البرنامج الكيميائي.',
            },
          },
          {
            type: 'p',
            text: {
              en: 'And control ties it together: conductivity-driven blowdown holds cycles at the value the chemistry supports, rather than at a conservative fixed setting that wastes water or an optimistic one that scales the plant.',
              ar: 'ويربط التحكم ذلك كله: فالتصريف المدفوع بالتوصيلية يثبّت دورات التركيز عند القيمة التي تدعمها الكيمياء، بدل إعداد ثابت متحفظ يهدر المياه أو إعداد متفائل يُرسّب المنشأة.',
            },
          },
        ],
      },
    ],
    checklist: [
      { en: 'Obtain a current make-up water analysis — calcium, magnesium, alkalinity, silica, chloride, sulphate and conductivity.', ar: 'احصل على تحليل حديث لمياه التعويض — الكالسيوم والمغنيسيوم والقلوية والسيليكا والكلوريد والكبريتات والتوصيلية.' },
      { en: 'Calculate actual cycles of concentration from the ratio of system to make-up conductivity, and compare it with the design figure.', ar: 'احسب دورات التركيز الفعلية من نسبة توصيلية النظام إلى مياه التعويض، وقارنها بالرقم التصميمي.' },
      { en: 'Confirm blowdown is controlled on a measurement rather than a timer.', ar: 'تأكد أن التصريف يُتحكَّم فيه بقياس لا بمؤقت.' },
      { en: 'Check condenser or exchanger approach temperature and trend it — a rising approach is an early deposition signal.', ar: 'افحص درجة حرارة الاقتراب للمكثف أو المبادل وتتبع اتجاهها — فارتفاعها إشارة مبكرة على الترسب.' },
      { en: 'Verify that a call for inhibitor dose actually results in chemical being delivered.', ar: 'تحقق من أن طلب جرعة المثبط ينتج عنه ضخ فعلي للكيماوي.' },
      { en: 'Inspect low-velocity areas and the tower basin for settled solids.', ar: 'افحص مناطق السرعة المنخفضة وحوض البرج بحثًا عن مواد صلبة مستقرة.' },
    ],
    escalation: {
      en: 'If deposits are already present, the question is no longer prevention but what the deposit is made of. Carbonate scale, corrosion product and biological deposit look similar to the eye and are removed by different chemistry — using the wrong cleaner can damage the surface underneath. A deposit sample analysis before cleaning is worth far more than the cost of the test.',
      ar: 'إذا كانت الرواسب موجودة بالفعل، فالسؤال لم يعد عن المنع بل عن مكوّن الراسب. فترسبات الكربونات ونواتج التآكل والرواسب البيولوجية تتشابه للعين وتُزال بكيمياء مختلفة — واستخدام المنظف الخاطئ قد يتلف السطح أسفلها. وتحليل عينة من الراسب قبل التنظيف يستحق أضعاف تكلفة الاختبار.',
    },
    solutions: ['cooling-water', 'industrial-water'],
    technologies: ['water-treatment-chemicals', 'filtration', 'monitoring-control', 'water-analysis'],
    products: ['kurita-cooling-programme', 'walchem-intuition-9', 'timex-svf-series', 'walchem-conductivity-sensors'],
    faqs: [
      {
        id: 'q1',
        question: { en: 'Does softening the make-up water eliminate scale?', ar: 'هل تليين مياه التعويض يمنع الترسبات نهائيًا؟' },
        answer: {
          en: 'It removes calcium and magnesium hardness, which addresses carbonate scaling. It does not remove silica, alkalinity or dissolved solids, and softened make-up in an open recirculating system can raise the corrosion risk instead. Softening is a design decision, not a default.',
          ar: 'يزيل التليين عسر الكالسيوم والمغنيسيوم، وهو ما يعالج ترسبات الكربونات. لكنه لا يزيل السيليكا ولا القلوية ولا المواد الصلبة الذائبة، وقد ترفع مياه التعويض المُليَّنة في نظام مفتوح خطرَ التآكل بدلًا من ذلك. فالتليين قرار تصميمي لا خيار افتراضي.',
        },
      },
      {
        id: 'q2',
        question: { en: 'Can we just run at lower cycles to avoid scaling?', ar: 'هل يمكننا التشغيل عند دورات تركيز أقل لتجنب الترسب؟' },
        answer: {
          en: 'Yes, and it works — at the cost of more make-up water, more blowdown, more chemical discharged with it and more energy spent treating and heating the replacement. Lower cycles trade a treatment problem for a permanent operating cost.',
          ar: 'نعم، وهو ينجح — لكن بتكلفة مياه تعويض أكثر، وتصريف أكبر، وكيماويات أكثر تُصرَّف معه، وطاقة إضافية لمعالجة وتسخين البديل. فالدورات الأقل تستبدل مشكلةَ معالجة بتكلفة تشغيلية دائمة.',
        },
      },
      {
        id: 'q3',
        question: { en: 'Why does scale appear even though our test results are in range?', ar: 'لماذا تظهر الترسبات رغم أن نتائج اختباراتنا ضمن النطاق؟' },
        answer: {
          en: 'Test results describe the bulk water at the sample point at the moment of sampling. Deposition happens at the hottest surface, at skin temperature, continuously. The two can disagree — particularly if the sample point is not representative or the inhibitor feed has been interrupted between tests.',
          ar: 'تصف نتائج الاختبار الكتلةَ المائية عند نقطة أخذ العينة في لحظة أخذها. أما الترسب فيحدث عند أسخن سطح، عند درجة حرارة السطح، وباستمرار. وقد يتعارض الاثنان — خاصة إذا كانت نقطة العينة غير تمثيلية أو انقطع ضخ المثبط بين الاختبارات.',
        },
      },
    ],
  },

  /* ====================================================================== */
  {
    slug: 'cooling-tower-cycles',
    status: 'published',
    category: 'cooling-water',
    readingMinutes: 6,
    publishedAt: '2026-02-24',
    title: { en: 'Understanding Cooling Tower Cycles of Concentration', ar: 'فهم دورات التركيز في أبراج التبريد' },
    question: {
      en: 'What are cycles of concentration, how do you work out what yours actually are, and how high can you safely run?',
      ar: 'ما دورات التركيز، وكيف تحسب قيمتها الفعلية لديك، وإلى أي حد يمكنك التشغيل بأمان؟',
    },
    summary: {
      en: 'Cycles decide your water consumption, your chemical consumption and your scaling risk at the same time. Most systems run below the value their chemistry would support.',
      ar: 'تحدد دورات التركيز استهلاكك للمياه والكيماويات وخطر الترسب في آن واحد. ومعظم الأنظمة تعمل دون القيمة التي تدعمها كيمياؤها.',
    },
    metaTitle: { en: 'Cooling Tower Cycles of Concentration Explained | C-Water', ar: 'شرح دورات التركيز في أبراج التبريد | C-Water' },
    metaDescription: {
      en: 'How to calculate cooling tower cycles of concentration, what limits them, and why running below the achievable value wastes water, chemical and energy.',
      ar: 'كيفية حساب دورات التركيز في أبراج التبريد، وما الذي يحدها، ولماذا يهدر التشغيل دون القيمة الممكنة المياهَ والكيماويات والطاقة.',
    },
    sections: [
      {
        id: 'definition',
        heading: { en: 'What the number actually is', ar: 'ما هو هذا الرقم فعليًا' },
        blocks: [
          {
            type: 'p',
            text: {
              en: 'Cycles of concentration is the ratio between the concentration of a dissolved species in the circulating water and its concentration in the make-up. Run at four cycles and the circulating water carries roughly four times the dissolved solids of the water you feed in.',
              ar: 'دورات التركيز هي النسبة بين تركيز نوع ذائب في المياه الدائرة وتركيزه في مياه التعويض. فعند أربع دورات، تحمل المياه الدائرة نحو أربعة أضعاف المواد الصلبة الذائبة في المياه التي تغذيها.',
            },
          },
          {
            type: 'p',
            text: {
              en: 'The same ratio describes the water balance. At four cycles, one quarter of the water leaving the system leaves as blowdown and three quarters as evaporation. Raise the cycles and the blowdown share falls; lower them and it rises sharply.',
              ar: 'وتصف النسبة نفسها الميزان المائي. فعند أربع دورات، يخرج ربع المياه المغادرة للنظام كتصريف وثلاثة أرباعها كتبخر. ورفع الدورات يخفض حصة التصريف، وخفضها يرفعها بحدة.',
            },
          },
          {
            type: 'note',
            text: {
              en: 'The relationship is not linear. Going from two cycles to four roughly halves blowdown volume. Going from six to eight changes it far less. Most of the available saving sits at the low end.',
              ar: 'العلاقة ليست خطية. فالانتقال من دورتين إلى أربع يخفض حجم التصريف إلى النصف تقريبًا، بينما الانتقال من ست إلى ثماني يغيّره أقل بكثير. ومعظم الوفر المتاح يقع في الطرف المنخفض.',
            },
          },
        ],
      },
      {
        id: 'measuring',
        heading: { en: 'Working out what yours really are', ar: 'حساب قيمتها الحقيقية لديك' },
        blocks: [
          {
            type: 'p',
            text: {
              en: 'The practical method is the ratio of system conductivity to make-up conductivity. It is quick, it can be read continuously, and it is what most controllers actually use.',
              ar: 'الطريقة العملية هي نسبة توصيلية النظام إلى توصيلية مياه التعويض. وهي سريعة ويمكن قراءتها باستمرار، وهي ما تستخدمه معظم وحدات التحكم فعلًا.',
            },
          },
          {
            type: 'p',
            text: {
              en: 'A chemical tracer such as chloride gives a cross-check, because it is conservative — it is not consumed, precipitated or added by the treatment programme. Where the conductivity ratio and the chloride ratio disagree significantly, something is entering or leaving the system that has not been accounted for.',
              ar: 'ويعطي متتبع كيميائي مثل الكلوريد تحققًا مقارنًا، لأنه محافظ — فلا يُستهلك ولا يترسب ولا يضيفه برنامج المعالجة. وحين تتباين نسبة التوصيلية ونسبة الكلوريد بشكل ملموس، فهناك شيء يدخل النظام أو يخرج منه لم يُحتسب.',
            },
          },
          {
            type: 'p',
            text: {
              en: 'That disagreement is worth investigating. Unmetered make-up, an unnoticed overflow, drift losses higher than design, or a process leak into the circuit all show up here first.',
              ar: 'ويستحق ذلك التباين التحقيق. فمياه تعويض غير مقيسة، أو فيض غير ملحوظ، أو فواقد انجراف أعلى من التصميم، أو تسرب من العملية إلى الدائرة — كلها تظهر هنا أولًا.',
            },
          },
        ],
      },
      {
        id: 'limit',
        heading: { en: 'What sets the ceiling', ar: 'ما الذي يحدد السقف' },
        blocks: [
          {
            type: 'p',
            text: {
              en: 'The limit is not a general number. It is whichever species in your particular make-up water reaches its practical limit first as concentration rises.',
              ar: 'الحد ليس رقمًا عامًا، بل هو النوع الذي يبلغ حدَّه العملي أولًا في مياه التعويض لديك تحديدًا مع ارتفاع التركيز.',
            },
          },
          {
            type: 'ul',
            items: [
              { en: '**Calcium and alkalinity** together set the carbonate scaling limit — usually the first constraint on a hard supply.', ar: '**الكالسيوم والقلوية** معًا يحددان حد ترسب الكربونات — وهو عادةً القيد الأول على مصدر عسر.' },
              { en: '**Silica** has a hard practical ceiling and is difficult to inhibit, so a high-silica supply often limits cycles before hardness does.', ar: '**السيليكا** لها سقف عملي صارم ويصعب تثبيطها، ولذلك يحد المصدر عالي السيليكا الدوراتِ قبل العسر غالبًا.' },
              { en: '**Chloride and sulphate** drive corrosivity rather than scaling, and can become the constraint where stainless steel is present in the circuit.', ar: '**الكلوريد والكبريتات** يقودان التآكلية لا الترسب، وقد يصبحان القيد حيث يوجد فولاذ مقاوم للصدأ في الدائرة.' },
              { en: '**The inhibitor programme** raises the achievable ceiling — that is precisely what threshold inhibitors are for.', ar: '**برنامج المثبطات** يرفع السقف الممكن — وهذا بالضبط الغرض من المثبطات الحدّية.' },
            ],
          },
          {
            type: 'p',
            text: {
              en: 'Because those constraints differ by supply and by metallurgy, the achievable ceiling is specific to your system. It is established from an analysis, not from a rule of thumb.',
              ar: 'ولأن هذه القيود تختلف بحسب المصدر والمعادن، فإن السقف الممكن خاص بنظامك. ويُحدَّد من تحليل لا من قاعدة تقريبية.',
            },
          },
        ],
      },
      {
        id: 'operating',
        heading: { en: 'Running near the limit safely', ar: 'التشغيل قرب الحد بأمان' },
        blocks: [
          {
            type: 'p',
            text: {
              en: 'Higher cycles reduce water use, chemical discharge and the energy spent treating replacement water. They also reduce the margin between normal operation and precipitation, which makes control quality the deciding factor.',
              ar: 'تقلل الدورات الأعلى استهلاك المياه وتصريف الكيماويات والطاقة المنفقة على معالجة مياه الاستبدال. لكنها تقلل أيضًا الهامش بين التشغيل الطبيعي والترسب، مما يجعل جودة التحكم هي العامل الحاسم.',
            },
          },
          {
            type: 'p',
            text: {
              en: 'A system with reliable conductivity measurement, verified chemical feed and a logged history can be operated closer to its limit than one running on a timer, because a deviation will be visible while there is still time to correct it.',
              ar: 'ويمكن تشغيل نظام لديه قياس توصيلية موثوق وضخ كيميائي مُتحقَّق منه وسجل تاريخي أقربَ إلى حده من نظام يعمل بمؤقت، لأن الانحراف سيكون مرئيًا بينما لا يزال هناك وقت لتصحيحه.',
            },
          },
          {
            type: 'p',
            text: {
              en: 'The practical approach is to move the setpoint in steps, monitoring at each one, so the limit is approached deliberately rather than discovered by finding deposits.',
              ar: 'والمنهج العملي هو تحريك نقطة الضبط على خطوات مع المراقبة عند كل خطوة، ليُقترب من الحد عن قصد لا أن يُكتشف باكتشاف الرواسب.',
            },
          },
        ],
      },
    ],
    checklist: [
      { en: 'Measure conductivity in both the circulating water and the make-up, and calculate the ratio.', ar: 'قِس التوصيلية في المياه الدائرة وفي مياه التعويض، واحسب النسبة.' },
      { en: 'Cross-check with a conservative tracer such as chloride.', ar: 'تحقق مقارنةً بمتتبع محافظ مثل الكلوريد.' },
      { en: 'Investigate any significant disagreement between the two ratios.', ar: 'حقّق في أي تباين ملموس بين النسبتين.' },
      { en: 'Confirm the make-up supply is metered.', ar: 'تأكد من وجود عدّاد لمياه التعويض.' },
      { en: 'Check for overflow, excessive drift or an unrecorded bleed path.', ar: 'ابحث عن فيض أو انجراف زائد أو مسار تصريف غير مسجل.' },
      { en: 'Compare the calculated cycles with what the current water analysis would support.', ar: 'قارن الدورات المحسوبة بما يدعمه تحليل المياه الحالي.' },
    ],
    escalation: {
      en: 'Raising cycles changes the scaling and corrosion balance at the same time — the two move in opposite directions, and the safe ceiling depends on the metallurgy in the circuit as much as on the water. Establish the achievable limit from a current analysis and the inhibitor programme before moving the setpoint, and move it in monitored steps rather than in one adjustment.',
      ar: 'يغيّر رفع الدورات توازنَ الترسب والتآكل في آن واحد — فالاثنان يتحركان في اتجاهين متعاكسين، والسقف الآمن يعتمد على معادن الدائرة بقدر اعتماده على المياه. حدد الحد الممكن من تحليل حديث ومن برنامج المثبطات قبل تحريك نقطة الضبط، وحرّكها على خطوات مراقَبة لا بتعديل واحد.',
    },
    solutions: ['cooling-water'],
    technologies: ['monitoring-control', 'sensors-measurement', 'water-treatment-chemicals', 'water-analysis'],
    products: ['walchem-conductivity-sensors', 'walchem-intuition-9', 'kurita-cooling-programme'],
    faqs: [
      {
        id: 'q1',
        question: { en: 'Is there a normal number of cycles?', ar: 'هل هناك عدد دورات معتاد؟' },
        answer: {
          en: 'No. The achievable figure depends entirely on the make-up water chemistry, the metallurgy in the circuit and the inhibitor programme. Any general number quoted without an analysis behind it is a guess.',
          ar: 'لا. فالرقم الممكن يعتمد كليًا على كيمياء مياه التعويض ومعادن الدائرة وبرنامج المثبطات. وأي رقم عام يُذكر دون تحليل خلفه هو تخمين.',
        },
      },
      {
        id: 'q2',
        question: { en: 'Our conductivity ratio and chloride ratio disagree. What does that mean?', ar: 'نسبة التوصيلية ونسبة الكلوريد لدينا متباينتان. ماذا يعني ذلك؟' },
        answer: {
          en: 'Something is entering or leaving the system that the water balance does not account for. Common causes are unmetered make-up, an overflow, drift losses above design, or a process leak into the circuit. It is worth tracing — it usually indicates a real loss.',
          ar: 'هناك شيء يدخل النظام أو يخرج منه لا يحتسبه الميزان المائي. والأسباب الشائعة مياه تعويض غير مقيسة، أو فيض، أو فواقد انجراف أعلى من التصميم، أو تسرب من العملية إلى الدائرة. ويستحق التتبع، فهو يشير عادةً إلى فقد حقيقي.',
        },
      },
    ],
  },

  /* ====================================================================== */
  {
    slug: 'how-corrosion-develops',
    status: 'published',
    category: 'water-chemistry',
    readingMinutes: 8,
    publishedAt: '2026-01-27',
    title: { en: 'How Corrosion Develops in Industrial Water Systems', ar: 'كيف يتطور التآكل في أنظمة المياه الصناعية' },
    question: {
      en: 'What drives corrosion in a water system, why is localised attack so much worse than general attack, and how is it actually controlled?',
      ar: 'ما الذي يدفع التآكل في نظام مياه، ولماذا يكون الهجوم الموضعي أسوأ بكثير من العام، وكيف يُتحكم فيه فعليًا؟',
    },
    summary: {
      en: 'Corrosion is an electrochemical process. The dangerous forms are the ones that concentrate the attack in a small area — under a deposit, in a crevice, or where two metals meet.',
      ar: 'التآكل عملية كهروكيميائية. وأخطر أشكاله تلك التي تركّز الهجوم في مساحة صغيرة — تحت راسب، أو في شق، أو عند التقاء معدنين.',
    },
    metaTitle: { en: 'How Corrosion Develops in Water Systems | C-Water', ar: 'كيف يتطور التآكل في أنظمة المياه | C-Water' },
    metaDescription: {
      en: 'The mechanisms behind water system corrosion: oxygen, chloride, pH, galvanic couples, under-deposit attack and microbial corrosion — and how inhibitors work.',
      ar: 'آليات التآكل في أنظمة المياه الصناعية: الأكسجين والكلوريد ودرجة الحموضة والأزواج الجلفانية والتآكل تحت الرواسب والتآكل المتأثر بالميكروبات — وكيف تعمل المثبطات.',
    },
    sections: [
      {
        id: 'basics',
        heading: { en: 'The electrochemical picture', ar: 'الصورة الكهروكيميائية' },
        blocks: [
          {
            type: 'p',
            text: {
              en: 'Corrosion in water is an electrochemical reaction. At the anode, metal gives up electrons and passes into solution as an ion. At the cathode, those electrons are consumed — in near-neutral aerated water, usually by dissolved oxygen. The water itself completes the circuit.',
              ar: 'التآكل في المياه تفاعل كهروكيميائي. فعند الأنود يفقد المعدن إلكترونات ويمر إلى المحلول على هيئة أيون. وعند الكاثود تُستهلك تلك الإلكترونات — وفي المياه المهواة قريبة التعادل، يستهلكها الأكسجين الذائب عادةً. وتُكمل المياه نفسها الدائرة.',
            },
          },
          {
            type: 'p',
            text: {
              en: 'That is why removing any one of the four requirements stops it. No anode, no cathode, no electrolyte or no electron path means no corrosion. Practical control works by interfering with the anodic or cathodic reaction rather than by removing the water.',
              ar: 'ولهذا فإن إزالة أي من المتطلبات الأربعة توقفه. فلا أنود أو لا كاثود أو لا إلكتروليت أو لا مسار للإلكترونات يعني لا تآكل. والتحكم العملي يعمل بالتداخل مع التفاعل الأنودي أو الكاثودي لا بإزالة المياه.',
            },
          },
        ],
      },
      {
        id: 'drivers',
        heading: { en: 'What accelerates it', ar: 'ما الذي يسرّعه' },
        blocks: [
          {
            type: 'ul',
            items: [
              { en: '**Dissolved oxygen** feeds the cathodic reaction. It is the single most important driver in most open cooling and untreated feedwater systems.', ar: '**الأكسجين الذائب** يغذّي التفاعل الكاثودي، وهو أهم محرك منفرد في معظم أنظمة التبريد المفتوحة ومياه التغذية غير المعالجة.' },
              { en: '**Chloride** breaks down passive oxide films locally, which is why it is associated with pitting rather than general thinning.', ar: '**الكلوريد** يكسر الأغشية الأكسيدية الخاملة موضعيًا، ولهذا يرتبط بالتنقّر لا بالترقق العام.' },
              { en: '**Low pH** removes the protective film that would otherwise form and slow the reaction.', ar: '**انخفاض درجة الحموضة** يزيل الغشاء الواقي الذي كان سيتكوّن ويبطئ التفاعل.' },
              { en: '**Temperature** speeds up reaction rate, as it does with most chemistry.', ar: '**درجة الحرارة** ترفع معدل التفاعل، كما هو الحال في معظم الكيمياء.' },
              { en: '**Flow velocity** matters at both extremes: too low allows deposits and stagnation, too high causes erosion-corrosion.', ar: '**سرعة التدفق** مهمة عند الطرفين: فالمنخفضة جدًا تسمح بالرواسب والركود، والمرتفعة جدًا تسبب تآكلًا بالتعرية.' },
            ],
          },
        ],
      },
      {
        id: 'localised',
        heading: { en: 'Why localised attack is the real problem', ar: 'لماذا يمثل الهجوم الموضعي المشكلة الحقيقية' },
        blocks: [
          {
            type: 'p',
            text: {
              en: 'General corrosion removes metal evenly and slowly. It is measurable, predictable and can be designed around with a corrosion allowance. It is not usually what takes equipment out of service.',
              ar: 'يزيل التآكل العام المعدن بانتظام وببطء. وهو قابل للقياس والتنبؤ ويمكن التصميم حوله بهامش تآكل. وليس عادةً ما يُخرج المعدات من الخدمة.',
            },
          },
          {
            type: 'p',
            text: {
              en: 'Localised corrosion concentrates the entire anodic reaction into a very small area. The metal loss per unit area is enormous compared with general attack, and the overall thickness measurement barely moves — so a wall thickness survey can look reassuring right up until a tube perforates.',
              ar: 'أما التآكل الموضعي فيركّز التفاعل الأنودي كله في مساحة صغيرة جدًا. ففقد المعدن لكل وحدة مساحة هائل مقارنة بالهجوم العام، بينما لا يكاد قياس السماكة الإجمالية يتغير — فقد يبدو مسح سماكة الجدار مطمئنًا حتى اللحظة التي يثقب فيها أنبوب.',
            },
          },
          {
            type: 'ul',
            items: [
              { en: '**Pitting** — chloride breaks the passive film at a point, and the pit chemistry becomes self-sustaining once established.', ar: '**التنقّر** — يكسر الكلوريد الغشاء الخامل عند نقطة، وتصبح كيمياء النقرة ذاتية الاستدامة بعد نشوئها.' },
              { en: '**Under-deposit corrosion** — a deposit creates an oxygen-depleted zone beneath it, and the metal under the deposit becomes anodic to the metal around it.', ar: '**التآكل تحت الرواسب** — يخلق الراسب منطقة فقيرة بالأكسجين تحته، فيصبح المعدن تحته أنوديًا بالنسبة للمعدن حوله.' },
              { en: '**Crevice corrosion** — the same differential aeration mechanism at a gasket face, a joint or a tube-to-tubesheet gap.', ar: '**تآكل الشقوق** — الآلية نفسها للتهوية التفاضلية عند وجه حشية أو وصلة أو فجوة بين أنبوب ولوح الأنابيب.' },
              { en: '**Galvanic corrosion** — where two different metals share an electrolyte, the less noble one corrodes preferentially.', ar: '**التآكل الجلفاني** — حيث يتشارك معدنان مختلفان إلكتروليتًا واحدًا، يتآكل الأقل نبلًا تفضيليًا.' },
              { en: '**Microbiologically influenced corrosion** — biofilm creates its own local chemistry, and some organisms produce corrosive metabolic products directly.', ar: '**التآكل المتأثر بالميكروبات** — يخلق الغشاء الحيوي كيمياء موضعية خاصة به، وتنتج بعض الكائنات نواتج أيضية تآكلية مباشرة.' },
            ],
          },
          {
            type: 'note',
            text: {
              en: 'Deposits and corrosion are not separate problems. A deposit creates the differential aeration cell that drives under-deposit attack, and corrosion product then becomes a deposit that shelters the next one. Scale control and corrosion control are the same programme.',
              ar: 'الرواسب والتآكل ليسا مشكلتين منفصلتين. فالراسب يخلق خلية التهوية التفاضلية التي تدفع الهجوم تحته، ثم يصبح ناتج التآكل راسبًا يحمي التالي. فالتحكم في الترسبات والتحكم في التآكل برنامج واحد.',
            },
          },
        ],
      },
      {
        id: 'control',
        heading: { en: 'How inhibitors work — and how they fail', ar: 'كيف تعمل المثبطات — وكيف تفشل' },
        blocks: [
          {
            type: 'p',
            text: {
              en: 'Anodic inhibitors form a protective film at anodic sites. They are effective, but they carry a specific risk: at insufficient dose they can protect most of the surface while leaving small unprotected areas, concentrating the attack there. An underdosed anodic inhibitor can be worse than none.',
              ar: 'تكوّن المثبطات الأنودية غشاءً واقيًا عند المواقع الأنودية. وهي فعالة لكنها تحمل خطرًا محددًا: فعند جرعة غير كافية قد تحمي معظم السطح وتترك مساحات صغيرة بلا حماية، فيتركّز الهجوم هناك. والمثبط الأنودي ناقص الجرعة قد يكون أسوأ من عدمه.',
            },
          },
          {
            type: 'p',
            text: {
              en: 'Cathodic inhibitors reduce the cathodic reaction rate and are more forgiving of underdosing, though generally slower to establish. Film-forming inhibitors coat the metal surface as a physical barrier.',
              ar: 'وتقلل المثبطات الكاثودية معدل التفاعل الكاثودي وهي أكثر تسامحًا مع نقص الجرعة، وإن كانت أبطأ في التكوّن عمومًا. أما المثبطات المكوِّنة للأغشية فتغطي سطح المعدن كحاجز فيزيائي.',
            },
          },
          {
            type: 'p',
            text: {
              en: 'All of them share one requirement: the film has to be established and then maintained. Interrupted dosing does not simply pause protection — it can leave a system in a worse condition than a system that never had a programme, because a partially broken film concentrates the attack.',
              ar: 'وتشترك جميعها في متطلب واحد: يجب تكوين الغشاء ثم الحفاظ عليه. فتوقف الجرعات لا يوقف الحماية فحسب — بل قد يترك النظام في حالة أسوأ من نظام لم يكن لديه برنامج أصلًا، لأن الغشاء المكسور جزئيًا يركّز الهجوم.',
            },
          },
        ],
      },
      {
        id: 'measuring',
        heading: { en: 'Measuring what is actually happening', ar: 'قياس ما يحدث فعليًا' },
        blocks: [
          {
            type: 'p',
            text: {
              en: 'Corrosion coupons remain the standard method: pre-weighed metal specimens of the relevant alloys exposed in a representative flow for a defined period, then cleaned and re-weighed. They give an average rate over the exposure, and — importantly — the visual condition shows whether the attack was general or localised.',
              ar: 'تبقى شرائح التآكل الطريقة المعيارية: عينات معدنية موزونة مسبقًا من السبائك المعنية تُعرَّض في تدفق تمثيلي لمدة محددة، ثم تُنظَّف وتُوزن مجددًا. وتعطي معدلًا متوسطًا خلال فترة التعريض، والأهم أن حالتها الظاهرية تبيّن ما إذا كان الهجوم عامًا أم موضعيًا.',
            },
          },
          {
            type: 'p',
            text: {
              en: 'Online corrosion-rate sensors give a live reading, which is useful for seeing the response to a change rather than waiting for the next coupon interval. Iron and copper levels in the water indicate what is being lost from the system, and rising values point to where.',
              ar: 'وتعطي مستشعرات معدل التآكل المتصلة قراءة آنية، وهي مفيدة لرؤية الاستجابة لتغيير ما بدل انتظار فترة الشريحة التالية. أما مستويات الحديد والنحاس في المياه فتشير إلى ما يُفقد من النظام، وارتفاعها يدل على موضع الفقد.',
            },
          },
          {
            type: 'note',
            text: {
              en: 'A coupon showing a low average rate but visible pitting is a more serious finding than a coupon showing a higher general rate. Read the surface, not just the number.',
              ar: 'الشريحة التي تُظهر معدلًا متوسطًا منخفضًا مع تنقّر ظاهر نتيجة أخطر من شريحة تُظهر معدلًا عامًا أعلى. اقرأ السطح لا الرقم وحده.',
            },
          },
        ],
      },
    ],
    checklist: [
      { en: 'Identify every metal in the circuit, including fittings, gaskets and any replacement components fitted over the years.', ar: 'حدد كل معدن في الدائرة، بما في ذلك التركيبات والحشيات وأي مكونات استُبدلت على مر السنين.' },
      { en: 'Check chloride and sulphate against the tolerance of the most sensitive alloy present.', ar: 'افحص الكلوريد والكبريتات مقابل تحمّل أكثر السبائك حساسية في النظام.' },
      { en: 'Confirm inhibitor residual is within its control range — and that it has been continuously, not just at the last test.', ar: 'تأكد أن متبقي المثبط ضمن نطاق التحكم — وأنه كان كذلك باستمرار لا عند آخر اختبار فقط.' },
      { en: 'Install corrosion coupons of the relevant alloys in a representative flow.', ar: 'ركّب شرائح تآكل من السبائك المعنية في تدفق تمثيلي.' },
      { en: 'Inspect low-velocity and dead-leg areas, where deposits and under-deposit attack begin.', ar: 'افحص مناطق السرعة المنخفضة والفروع الميتة، حيث تبدأ الرواسب والهجوم تحتها.' },
      { en: 'Trend dissolved iron and copper in the system water.', ar: 'تتبع اتجاه الحديد والنحاس الذائبين في مياه النظام.' },
      { en: 'Check for any period when chemical feed was interrupted.', ar: 'ابحث عن أي فترة انقطع فيها ضخ الكيماويات.' },
    ],
    escalation: {
      en: 'Corrosion that has already caused a failure needs a root-cause investigation, not a change of chemical. The morphology of the attack — pitting, crevice, galvanic, erosion or microbiologically influenced — points to a specific mechanism, and each has a different remedy. Photographs of the failed surface and a deposit analysis are worth more than a general water test. Where mixed metallurgy or a sensitive alloy is involved, confirm chemistry compatibility before changing any programme.',
      ar: 'التآكل الذي تسبب في عطل بالفعل يحتاج تحقيقًا في السبب الجذري لا تغييرًا للكيماوي. فشكل الهجوم — تنقّر أو شقوق أو جلفاني أو بالتعرية أو متأثر بالميكروبات — يشير إلى آلية محددة، ولكل منها علاج مختلف. وصور السطح المتضرر وتحليل الراسب أثمن من اختبار مياه عام. وحيث توجد معادن مختلطة أو سبيكة حساسة، تأكد من توافق الكيمياء قبل تغيير أي برنامج.',
    },
    solutions: ['cooling-water', 'boiler-steam', 'process-water', 'industrial-water', 'specialised-treatment'],
    technologies: ['water-treatment-chemicals', 'water-analysis', 'sensors-measurement', 'monitoring-control'],
    products: ['kurita-cooling-programme', 'kurita-cetamine', 'walchem-ph-orp-sensors', 'walchem-intuition-9'],
    faqs: [
      {
        id: 'q1',
        question: { en: 'Our corrosion rate reads low but we still had a tube failure. How?', ar: 'معدل التآكل لدينا منخفض لكن حدث ثقب في أنبوب. كيف؟' },
        answer: {
          en: 'A corrosion rate derived from mass loss is an average across the whole coupon surface. Localised attack concentrates the same total metal loss into a tiny area, so the average stays low while a pit penetrates. Always read the coupon surface condition alongside the calculated rate.',
          ar: 'معدل التآكل المستخرج من فقد الكتلة متوسط على كامل سطح الشريحة. والهجوم الموضعي يركّز فقد المعدن نفسه في مساحة ضئيلة، فيبقى المتوسط منخفضًا بينما تخترق نقرة الجدار. اقرأ دائمًا حالة سطح الشريحة إلى جانب المعدل المحسوب.',
        },
      },
      {
        id: 'q2',
        question: { en: 'Can raising pH stop corrosion?', ar: 'هل رفع درجة الحموضة يوقف التآكل؟' },
        answer: {
          en: 'Raising pH generally reduces the corrosion rate of carbon steel, but it simultaneously increases carbonate scaling tendency and can attack aluminium and some copper alloys. pH is a balance point between two failure modes, not a single-direction control.',
          ar: 'يقلل رفع درجة الحموضة عمومًا معدل تآكل الفولاذ الكربوني، لكنه يزيد في الوقت نفسه ميل ترسب الكربونات وقد يهاجم الألومنيوم وبعض سبائك النحاس. فدرجة الحموضة نقطة توازن بين نمطي فشل لا وسيلة تحكم أحادية الاتجاه.',
        },
      },
      {
        id: 'q3',
        question: { en: 'Is a closed system safe without treatment because it has no oxygen?', ar: 'هل النظام المغلق آمن بلا معالجة لأنه خالٍ من الأكسجين؟' },
        answer: {
          en: 'Only if it is genuinely closed. Most closed circuits have some make-up, and every litre brings dissolved oxygen with it. Closed systems that are never sampled are a common place to find accumulated corrosion product — and the first symptom is usually a failed pump seal or a blocked valve, not a water test.',
          ar: 'فقط إذا كان مغلقًا فعلًا. فمعظم الدوائر المغلقة لها مياه تعويض، وكل لتر يجلب معه أكسجينًا ذائبًا. والأنظمة المغلقة التي لا تُؤخذ منها عينات موضع شائع لتراكم نواتج التآكل — وأول عرَض عادةً حشية مضخة تالفة أو صمام مسدود لا اختبار مياه.',
        },
      },
    ],
  },

  /* ====================================================================== */
  {
    slug: 'boiler-blowdown-energy',
    status: 'published',
    category: 'boiler-water',
    readingMinutes: 6,
    publishedAt: '2026-03-09',
    title: { en: 'How Boiler Blowdown Affects Water and Energy Use', ar: 'كيف يؤثر تصريف الغلايات في استهلاك المياه والطاقة' },
    question: {
      en: 'Why does blowdown cost so much more than the water it discharges, and how do you get it right?',
      ar: 'لماذا يكلف التصريف أكثر بكثير من قيمة المياه التي يُخرجها، وكيف تضبطه بشكل صحيح؟',
    },
    summary: {
      en: 'Blowdown discharges water that has been softened, deaerated, chemically treated and heated to saturation. It is a thermal loss before it is a water loss.',
      ar: 'يُخرج التصريف مياهًا جرى تليينها ونزع غازاتها ومعالجتها كيميائيًا وتسخينها حتى التشبع. فهو فقد حراري قبل أن يكون فقدًا مائيًا.',
    },
    metaTitle: { en: 'Boiler Blowdown, Water and Energy Use | C-Water', ar: 'تصريف الغلايات واستهلاك المياه والطاقة | C-Water' },
    metaDescription: {
      en: 'Why boiler blowdown is a thermal loss as much as a water loss, how continuous and intermittent blowdown differ, and how conductivity control sets the right rate.',
      ar: 'لماذا يُعد تصريف الغلايات فقدًا حراريًا بقدر ما هو فقد مائي، وكيف يختلف التصريف المستمر عن المتقطع، وكيف يحدد التحكم بالتوصيلية المعدلَ الصحيح.',
    },
    sections: [
      {
        id: 'why',
        heading: { en: 'Why blowdown is necessary at all', ar: 'لماذا التصريف ضروري أصلًا' },
        blocks: [
          {
            type: 'p',
            text: {
              en: 'A boiler concentrates its feedwater by design. Water leaves as steam; every dissolved and suspended solid that came in with the feedwater stays in the drum. Without removal, concentration would rise until solids deposit on heating surfaces or carry over into the steam.',
              ar: 'تركّز الغلاية مياه تغذيتها بحكم تصميمها. فالمياه تغادر كبخار، ويبقى في الجسم كل ما دخل معها من مواد صلبة ذائبة وعالقة. وبلا إزالة، سيرتفع التركيز حتى تترسب المواد الصلبة على أسطح التسخين أو تنجرف مع البخار.',
            },
          },
          {
            type: 'p',
            text: {
              en: 'Blowdown is that removal. The rate required is a direct function of feedwater quality: a boiler on high-quality make-up needs far less blowdown than one running on partially treated water, for the same steam output.',
              ar: 'والتصريف هو تلك الإزالة. والمعدل المطلوب دالة مباشرة في جودة مياه التغذية: فغلاية تعمل على مياه تعويض عالية الجودة تحتاج تصريفًا أقل بكثير من أخرى تعمل على مياه معالجة جزئيًا، لإنتاج القدر نفسه من البخار.',
            },
          },
        ],
      },
      {
        id: 'cost',
        heading: { en: 'Where the cost actually is', ar: 'أين تكمن التكلفة فعلًا' },
        blocks: [
          {
            type: 'p',
            text: {
              en: 'The water itself is usually the smallest part of the cost. Blowdown discharges water that has already been through every treatment step and has been heated all the way to saturation temperature at boiler pressure.',
              ar: 'المياه نفسها عادةً أصغر جزء من التكلفة. فالتصريف يُخرج مياهًا مرّت بالفعل بكل خطوات المعالجة وسُخّنت حتى درجة حرارة التشبع عند ضغط الغلاية.',
            },
          },
          {
            type: 'ul',
            items: [
              { en: 'The thermal energy in the discharged water, which leaves the system entirely unless heat is recovered.', ar: 'الطاقة الحرارية في المياه المصرَّفة، وتغادر النظام كليًا ما لم تُستعاد الحرارة.' },
              { en: 'The treatment chemical dissolved in it, discharged at the concentration the boiler was holding.', ar: 'الكيماويات المذابة فيها، وتُصرَّف بالتركيز الذي كانت الغلاية تحتفظ به.' },
              { en: 'The cost of producing the replacement make-up — softening, filtration, deaeration and the chemical it needs.', ar: 'تكلفة إنتاج مياه التعويض البديلة — التليين والترشيح ونزع الغازات والكيماويات اللازمة.' },
              { en: 'The fuel required to heat that replacement from make-up temperature back to saturation.', ar: 'الوقود اللازم لتسخين ذلك البديل من درجة حرارة مياه التعويض إلى التشبع.' },
            ],
          },
          {
            type: 'note',
            text: {
              en: 'This is why excess blowdown shows up as a fuel figure rather than a water figure — and why it is easy to miss when it is being watched from the water side alone.',
              ar: 'ولهذا يظهر التصريف الزائد كرقم وقود لا كرقم مياه — ولهذا يسهل إغفاله حين يُراقب من جانب المياه وحده.',
            },
          },
        ],
      },
      {
        id: 'types',
        heading: { en: 'Continuous and intermittent blowdown', ar: 'التصريف المستمر والمتقطع' },
        blocks: [
          {
            type: 'p',
            text: {
              en: 'Continuous blowdown, usually drawn from the steam drum at the level where dissolved solids concentrate, controls the dissolved solids concentration. This is the flow that should be controlled on conductivity.',
              ar: 'يتحكم التصريف المستمر، ويُسحب عادةً من جسم البخار عند المستوى الذي تتركز فيه المواد الصلبة الذائبة، في تركيز تلك المواد. وهذا هو التدفق الذي ينبغي التحكم فيه بالتوصيلية.',
            },
          },
          {
            type: 'p',
            text: {
              en: 'Intermittent or bottom blowdown is a short, sharp discharge from the lowest point, and its purpose is different: it removes settled sludge and suspended solids. It cannot be replaced by continuous blowdown, and a system that has stopped doing it accumulates sludge in the mud drum.',
              ar: 'أما التصريف المتقطع أو السفلي فتفريغ قصير وحاد من أدنى نقطة، وغرضه مختلف: إزالة الحمأة المستقرة والمواد الصلبة العالقة. ولا يمكن أن يحل التصريف المستمر محله، والنظام الذي توقف عنه يراكم الحمأة في جسم الطين.',
            },
          },
          {
            type: 'p',
            text: {
              en: 'Confusing the two is common. A plant that increases continuous blowdown because it is finding sludge is spending thermal energy on a problem that a short bottom blowdown would address directly.',
              ar: 'والخلط بينهما شائع. فالمنشأة التي تزيد التصريف المستمر لأنها تجد حمأة تنفق طاقة حرارية على مشكلة يعالجها تصريف سفلي قصير مباشرةً.',
            },
          },
        ],
      },
      {
        id: 'control',
        heading: { en: 'Getting the rate right', ar: 'ضبط المعدل الصحيح' },
        blocks: [
          {
            type: 'p',
            text: {
              en: 'Blowdown on a fixed schedule is wrong in one direction or the other almost all the time. Steam demand varies, condensate return varies, and feedwater quality varies — so the required blowdown rate varies with them.',
              ar: 'التصريف وفق جدول ثابت خاطئ في اتجاه أو آخر في معظم الأوقات تقريبًا. فالطلب على البخار يتغير، وعودة المتكثفات تتغير، وجودة مياه التغذية تتغير — ومعها يتغير معدل التصريف المطلوب.',
            },
          },
          {
            type: 'p',
            text: {
              en: 'Conductivity-controlled blowdown holds dissolved solids at the specified limit continuously. When steam demand rises, blowdown rises with it; when condensate return improves, blowdown falls automatically because the feedwater is cleaner.',
              ar: 'ويُبقي التصريف المحكوم بالتوصيلية المواد الصلبة الذائبة عند الحد المحدد باستمرار. فحين يرتفع الطلب على البخار يرتفع التصريف معه، وحين تتحسن عودة المتكثفات ينخفض تلقائيًا لأن مياه التغذية أنظف.',
            },
          },
          {
            type: 'p',
            text: {
              en: 'Two further improvements are usually available. Heat recovery from the continuous blowdown stream recovers part of the thermal loss. And improving condensate return reduces the required blowdown at source, because returned condensate is high-quality feedwater that carries almost no dissolved solids.',
              ar: 'وعادةً ما يتاح تحسينان إضافيان. فاستعادة الحرارة من تيار التصريف المستمر تستعيد جزءًا من الفقد الحراري. وتحسين عودة المتكثفات يقلل التصريف المطلوب من المنبع، لأن المتكثفات العائدة مياه تغذية عالية الجودة لا تكاد تحمل مواد صلبة ذائبة.',
            },
          },
        ],
      },
    ],
    checklist: [
      { en: 'Confirm whether continuous blowdown is controlled on a measurement or a fixed setting.', ar: 'تأكد ما إذا كان التصريف المستمر محكومًا بقياس أم بإعداد ثابت.' },
      { en: 'Measure boiler water conductivity and compare it with the control limit for the operating pressure.', ar: 'قِس توصيلية مياه الغلاية وقارنها بحد التحكم الخاص بضغط التشغيل.' },
      { en: 'Check that bottom blowdown is still being carried out — it is not replaceable by continuous blowdown.', ar: 'تأكد أن التصريف السفلي لا يزال يُنفَّذ — فهو غير قابل للاستبدال بالتصريف المستمر.' },
      { en: 'Measure the condensate return percentage, and test the returned condensate for iron and conductivity.', ar: 'قِس نسبة عودة المتكثفات، واختبر المتكثفات العائدة للحديد والتوصيلية.' },
      { en: 'Check whether blowdown heat recovery is fitted, and whether it is actually in service.', ar: 'تحقق من وجود استعادة حرارة من التصريف، ومما إذا كانت في الخدمة فعلًا.' },
      { en: 'Review the make-up treatment — poor feedwater quality raises the required blowdown rate permanently.', ar: 'راجع معالجة مياه التعويض — فرداءة جودة مياه التغذية ترفع معدل التصريف المطلوب بشكل دائم.' },
    ],
    escalation: {
      en: 'Boiler water control limits depend on operating pressure, boiler design and the applicable standard, and they are not interchangeable between installations. Reducing blowdown below the correct rate risks deposition and carryover — consequences measured in outage rather than in savings. Confirm the limits for your specific boiler before changing a setpoint.',
      ar: 'تعتمد حدود التحكم في مياه الغلايات على ضغط التشغيل وتصميم الغلاية والمعيار المطبق، وهي غير قابلة للتبادل بين التركيبات. وخفض التصريف دون المعدل الصحيح يخاطر بالترسب والانجراف — وهي عواقب تُقاس بالتوقف لا بالوفر. تأكد من الحدود الخاصة بغلايتك تحديدًا قبل تغيير أي نقطة ضبط.',
    },
    solutions: ['boiler-steam', 'industrial-water'],
    technologies: ['sensors-measurement', 'monitoring-control', 'water-treatment-chemicals', 'water-analysis'],
    products: ['walchem-w100', 'walchem-conductivity-sensors', 'kurita-cetamine', 'walchem-intuition-6'],
    faqs: [
      {
        id: 'q1',
        question: { en: 'Can we reduce blowdown by improving condensate return?', ar: 'هل يمكن خفض التصريف بتحسين عودة المتكثفات؟' },
        answer: {
          en: 'Yes, and it is usually the most effective route. Returned condensate is high-quality feedwater carrying almost no dissolved solids, so a higher return percentage lowers the required blowdown rate directly. It has to be tested though — a contaminated or corroding return line can bring iron back with it.',
          ar: 'نعم، وهو عادةً أنجع الطرق. فالمتكثفات العائدة مياه تغذية عالية الجودة لا تكاد تحمل مواد صلبة ذائبة، فترفع نسبةُ العودة الأعلى خفضَ معدل التصريف المطلوب مباشرة. لكن يجب اختبارها — فخط عودة ملوث أو متآكل قد يعيد الحديد معه.',
        },
      },
      {
        id: 'q2',
        question: { en: 'Is a fixed blowdown valve setting acceptable on a stable load?', ar: 'هل إعداد صمام تصريف ثابت مقبول عند حمل مستقر؟' },
        answer: {
          en: 'It is workable if the load, the make-up quality and the condensate return are all genuinely constant — which is rarer than it sounds. Even then a fixed setting has no way of responding to a change, so it has to be set conservatively, which means paying for margin continuously.',
          ar: 'يصلح إذا كان الحمل وجودة مياه التعويض وعودة المتكثفات كلها ثابتة فعلًا — وهو أندر مما يبدو. وحتى حينها لا يملك الإعداد الثابت وسيلة للاستجابة لأي تغير، فيجب ضبطه بتحفظ، ما يعني دفع ثمن الهامش باستمرار.',
        },
      },
    ],
  },
];
