import type { Locale } from '@/lib/i18n';

/**
 * Interface copy.
 *
 * Arabic here is authored, not machine-translated: CTA verbs follow the
 * imperative forms C-Water's audience expects (اطلب / تحدث / استكشف), and
 * international product and parameter names (Walchem, TIMEX, Kurita, RO, pH,
 * ORP) are deliberately preserved in Latin script.
 */
export const dictionary = {
  /* --- Global chrome ---------------------------------------------------- */
  skipToContent: { en: 'Skip to main content', ar: 'تخطَّ إلى المحتوى الرئيسي' },
  mainNavigation: { en: 'Main navigation', ar: 'التنقل الرئيسي' },
  openMenu: { en: 'Open menu', ar: 'افتح القائمة' },
  closeMenu: { en: 'Close menu', ar: 'أغلق القائمة' },
  close: { en: 'Close', ar: 'إغلاق' },
  back: { en: 'Back', ar: 'رجوع' },
  home: { en: 'Home', ar: 'الرئيسية' },
  breadcrumb: { en: 'Breadcrumb', ar: 'مسار التصفح' },
  languageSwitch: { en: 'Change language', ar: 'تغيير اللغة' },
  menu: { en: 'Menu', ar: 'القائمة' },

  /* --- Calls to action -------------------------------------------------- */
  talkToEngineer: { en: 'Talk to an Engineer', ar: 'تحدث إلى مهندس' },
  talkToCWaterEngineer: { en: 'Talk to a C-Water Engineer', ar: 'تحدث إلى مهندس C-Water' },
  requestSolution: { en: 'Request a Solution', ar: 'اطلب حلاً' },
  requestQuote: { en: 'Request a Quote', ar: 'اطلب عرض سعر' },
  exploreSolutions: { en: 'Explore Solutions', ar: 'استكشف الحلول' },
  exploreTechnology: { en: 'Explore the Technology', ar: 'استكشف التقنيات' },
  discussYourSystem: { en: 'Discuss Your System', ar: 'ناقش نظام المياه الخاص بك' },
  viewTechnicalDetails: { en: 'View Technical Details', ar: 'اعرض التفاصيل الفنية' },
  requestTechnicalSupport: { en: 'Request Technical Support', ar: 'اطلب الدعم الفني' },
  startTechnicalDiscussion: { en: 'Start a Technical Discussion', ar: 'ابدأ نقاشًا فنيًا' },
  exploreTopic: { en: 'Explore the Topic', ar: 'استكشف الموضوع' },
  discussSimilarChallenge: { en: 'Discuss a Similar Challenge', ar: 'ناقش تحديًا مشابهًا' },
  viewProduct: { en: 'View Product', ar: 'اعرض المنتج' },
  viewAll: { en: 'View all', ar: 'اعرض الكل' },
  readArticle: { en: 'Read the article', ar: 'اقرأ المقال' },
  downloadDatasheet: { en: 'Download Datasheet', ar: 'حمّل ورقة البيانات' },

  /* --- Sections --------------------------------------------------------- */
  relatedSolutions: { en: 'Related Solutions', ar: 'حلول ذات صلة' },
  relatedProducts: { en: 'Related Products', ar: 'منتجات ذات صلة' },
  relatedTechnologies: { en: 'Related Technologies', ar: 'تقنيات ذات صلة' },
  relatedServices: { en: 'Related Services', ar: 'خدمات ذات صلة' },
  relatedProjects: { en: 'Related Projects', ar: 'مشروعات ذات صلة' },
  relatedIndustries: { en: 'Related Industries', ar: 'قطاعات ذات صلة' },
  relatedKnowledge: { en: 'Related Knowledge', ar: 'محتوى معرفي ذو صلة' },
  technologyStack: { en: 'Technology Stack', ar: 'منظومة التقنيات' },
  commonProblems: { en: 'Common Problems', ar: 'المشكلات الشائعة' },
  operationalRisks: { en: 'Operational Risks', ar: 'المخاطر التشغيلية' },
  whyItMatters: { en: 'Why It Matters', ar: 'لماذا يهم ذلك' },
  ourApproach: { en: 'The C-Water Approach', ar: 'منهج C-Water' },
  documents: { en: 'Documents', ar: 'المستندات' },
  specifications: { en: 'Technical Specifications', ar: 'المواصفات الفنية' },
  applications: { en: 'Applications', ar: 'التطبيقات' },
  overview: { en: 'Overview', ar: 'نظرة عامة' },
  keyBenefits: { en: 'Key Benefits', ar: 'المزايا الرئيسية' },
  typicalSystems: { en: 'Typical Water Systems', ar: 'أنظمة المياه المعتادة' },
  industryChallenges: { en: 'Industry Water Challenges', ar: 'تحديات المياه في القطاع' },
  howItWorks: { en: 'How It Works', ar: 'كيف تعمل' },
  whatItSolves: { en: 'What It Solves', ar: 'ما الذي تعالجه' },
  whatItIs: { en: 'What It Is', ar: 'ما هي' },
  whenYouNeedIt: { en: 'When You Need It', ar: 'متى تحتاجها' },
  whatYouReceive: { en: 'What You Receive', ar: 'ما الذي تحصل عليه' },
  onThisPage: { en: 'On this page', ar: 'في هذه الصفحة' },

  /* --- Catalogue -------------------------------------------------------- */
  filters: { en: 'Filters', ar: 'عوامل التصفية' },
  clearFilters: { en: 'Clear all', ar: 'مسح الكل' },
  partner: { en: 'Partner', ar: 'الشريك' },
  category: { en: 'Category', ar: 'الفئة' },
  technology: { en: 'Technology', ar: 'التقنية' },
  application: { en: 'Application', ar: 'التطبيق' },
  industry: { en: 'Industry', ar: 'القطاع' },
  sortBy: { en: 'Sort by', ar: 'ترتيب حسب' },
  sortRelevance: { en: 'Relevance', ar: 'الأكثر صلة' },
  sortNameAsc: { en: 'Name A–Z', ar: 'الاسم أ–ي' },
  sortPartner: { en: 'Partner', ar: 'الشريك' },
  resultsCount: {
    en: (n: number) => `${n} ${n === 1 ? 'result' : 'results'}`,
    ar: (n: number) => (n === 1 ? 'نتيجة واحدة' : n === 2 ? 'نتيجتان' : `${n} نتيجة`),
  },
  noResults: { en: 'No results match those filters.', ar: 'لا توجد نتائج تطابق عوامل التصفية.' },
  noResultsHelp: {
    en: 'Try removing a filter, or tell us what you are trying to solve and an engineer will point you to the right technology.',
    ar: 'جرّب إزالة أحد عوامل التصفية، أو أخبرنا بما تحاول حله وسيوجّهك أحد المهندسين إلى التقنية المناسبة.',
  },
  addToQuote: { en: 'Add to quote', ar: 'أضف إلى طلب السعر' },
  inQuote: { en: 'In quote', ar: 'مضاف' },

  /* --- Data-availability language --------------------------------------
     Used wherever a specification is not confirmed by an official source.  */
  specsOnRequest: { en: 'Technical information available on request.', ar: 'المعلومات الفنية متاحة عند الطلب.' },
  specsOnRequestBody: {
    en: 'Detailed specifications for this product are confirmed against the manufacturer’s current documentation before they are issued. Tell us your operating conditions and we will send the applicable data.',
    ar: 'تُراجَع المواصفات التفصيلية لهذا المنتج مقابل وثائق الشركة المصنّعة الحالية قبل إصدارها. أخبرنا بظروف التشغيل لديك وسنرسل البيانات المنطبقة.',
  },
  documentOnRequest: { en: 'Available on request', ar: 'متاح عند الطلب' },
  contactForGuidance: { en: 'Contact C-Water for application-specific guidance.', ar: 'تواصل مع C-Water للحصول على إرشاد خاص بالتطبيق.' },

  /* --- Search ----------------------------------------------------------- */
  search: { en: 'Search', ar: 'بحث' },
  searchPlaceholder: {
    en: 'Search products, technologies, applications or technical topics',
    ar: 'ابحث في المنتجات أو التقنيات أو التطبيقات أو الموضوعات الفنية',
  },
  searchShort: { en: 'Search…', ar: 'ابحث…' },
  searchResultsFor: { en: 'Results for', ar: 'نتائج البحث عن' },
  searchEmptyTitle: { en: 'Search the C-Water knowledge base', ar: 'ابحث في قاعدة معرفة C-Water' },
  searchEmptyBody: {
    en: 'Look up an application, a treatment problem, a technology or a product name.',
    ar: 'ابحث عن تطبيق أو مشكلة معالجة أو تقنية أو اسم منتج.',
  },
  searchNoMatch: { en: 'Nothing matched that search.', ar: 'لا توجد نتائج مطابقة لهذا البحث.' },
  searchSuggestions: { en: 'Try', ar: 'جرّب' },

  /* --- Content kinds ---------------------------------------------------- */
  kind: {
    solution: { en: 'Solution', ar: 'حل' },
    industry: { en: 'Industry', ar: 'قطاع' },
    technology: { en: 'Technology', ar: 'تقنية' },
    product: { en: 'Product', ar: 'منتج' },
    partner: { en: 'Partner', ar: 'شريك' },
    service: { en: 'Service', ar: 'خدمة' },
    project: { en: 'Project', ar: 'مشروع' },
    article: { en: 'Article', ar: 'مقال' },
    document: { en: 'Document', ar: 'مستند' },
  },

  /* --- Solution finder --------------------------------------------------- */
  finder: {
    eyebrow: { en: 'Solution Finder', ar: 'مرشد الحلول' },
    title: { en: 'Start with the problem, not the product.', ar: 'ابدأ من المشكلة، لا من المنتج.' },
    intro: {
      en: 'Three questions. We will point you to the most relevant starting assessment — not a substitute for engineering review.',
      ar: 'ثلاثة أسئلة. سنوجّهك إلى نقطة البدء الأنسب للتقييم — وهذا لا يغني عن المراجعة الهندسية.',
    },
    q1: { en: 'What are you working with?', ar: 'ما النظام الذي تعمل عليه؟' },
    q2: { en: 'What problem are you seeing?', ar: 'ما المشكلة التي تلاحظها؟' },
    q3: { en: 'What are you trying to achieve?', ar: 'ما الهدف الذي تسعى إليه؟' },
    step: { en: 'Step', ar: 'الخطوة' },
    of: { en: 'of', ar: 'من' },
    next: { en: 'Continue', ar: 'متابعة' },
    previous: { en: 'Back', ar: 'رجوع' },
    restart: { en: 'Start again', ar: 'ابدأ من جديد' },
    resultEyebrow: { en: 'Suggested starting point', ar: 'نقطة البدء المقترحة' },
    resultLead: {
      en: 'Your challenge appears to be primarily related to',
      ar: 'يبدو أن التحدي لديك يرتبط بشكل أساسي بـ',
    },
    resultBody: {
      en: 'A C-Water technical assessment is the best starting point. It confirms the actual water chemistry and operating conditions before any treatment decision is made.',
      ar: 'يُعد التقييم الفني من C-Water أفضل نقطة بدء، إذ يؤكد كيمياء المياه وظروف التشغيل الفعلية قبل اتخاذ أي قرار بشأن المعالجة.',
    },
    disclaimer: {
      en: 'This guide narrows the starting point. It does not replace water analysis or professional engineering assessment.',
      ar: 'يساعد هذا المرشد على تضييق نقطة البدء فقط، ولا يحل محل تحليل المياه أو التقييم الهندسي المتخصص.',
    },
    viewSolution: { en: 'View the solution', ar: 'اعرض الحل' },
    discussWithEngineer: { en: 'Discuss With an Engineer', ar: 'ناقش مع مهندس' },
  },

  /* --- System explorer ---------------------------------------------------- */
  explorer: {
    selectStage: { en: 'Select a stage', ar: 'اختر مرحلة' },
    purpose: { en: 'Purpose', ar: 'الغرض' },
    technologyPartner: { en: 'Technology Partner', ar: 'شريك التقنية' },
    stageOf: { en: 'Stage', ar: 'مرحلة' },
    hint: { en: 'Select a stage to see what happens there.', ar: 'اختر مرحلة لمعرفة ما يحدث فيها.' },
  },

  /* --- Dashboard demo ----------------------------------------------------- */
  dashboard: {
    simulated: { en: 'Simulated data — illustration only', ar: 'بيانات محاكاة — للتوضيح فقط' },
    simulatedNote: {
      en: 'The values below are generated for demonstration. They do not represent any customer installation.',
      ar: 'القيم أدناه مُولَّدة لأغراض العرض، ولا تمثل أي تركيب لدى عميل.',
    },
    systemStatus: { en: 'System status', ar: 'حالة النظام' },
    healthy: { en: 'Nominal', ar: 'طبيعي' },
    trend: { en: 'Trend — last 60 minutes', ar: 'الاتجاه — آخر 60 دقيقة' },
    dosing: { en: 'Dosing', ar: 'الجرعات' },
    active: { en: 'Active', ar: 'يعمل' },
    sensor: { en: 'Sensor', ar: 'المستشعر' },
    normal: { en: 'Normal', ar: 'طبيعي' },
    alarm: { en: 'Alarm', ar: 'الإنذار' },
    none: { en: 'None', ar: 'لا يوجد' },
    data: { en: 'Data', ar: 'البيانات' },
    live: { en: 'Streaming', ar: 'مُتدفق' },
    pause: { en: 'Pause simulation', ar: 'أوقف المحاكاة' },
    play: { en: 'Resume simulation', ar: 'استأنف المحاكاة' },
  },

  /* --- Forms -------------------------------------------------------------- */
  form: {
    step: { en: 'Step', ar: 'الخطوة' },
    of: { en: 'of', ar: 'من' },
    next: { en: 'Continue', ar: 'متابعة' },
    previous: { en: 'Back', ar: 'رجوع' },
    submit: { en: 'Send My Request', ar: 'أرسل طلبي' },
    submitQuote: { en: 'Submit Quote Request', ar: 'أرسل طلب عرض السعر' },
    submitting: { en: 'Sending…', ar: 'جارٍ الإرسال…' },
    required: { en: 'Required', ar: 'مطلوب' },
    optional: { en: 'Optional', ar: 'اختياري' },
    selectAllThatApply: { en: 'Select all that apply', ar: 'اختر كل ما ينطبق' },
    selectOne: { en: 'Select one', ar: 'اختر واحدًا' },
    name: { en: 'Full name', ar: 'الاسم الكامل' },
    company: { en: 'Company', ar: 'الشركة' },
    jobTitle: { en: 'Job title', ar: 'المسمى الوظيفي' },
    email: { en: 'Work email', ar: 'البريد الإلكتروني للعمل' },
    phone: { en: 'Phone', ar: 'رقم الهاتف' },
    country: { en: 'Country', ar: 'الدولة' },
    city: { en: 'City', ar: 'المدينة' },
    projectStage: { en: 'Project stage', ar: 'مرحلة المشروع' },
    requiredBy: { en: 'Required by', ar: 'مطلوب بحلول' },
    quantity: { en: 'Quantity', ar: 'الكمية' },
    message: { en: 'Technical requirements or additional detail', ar: 'المتطلبات الفنية أو تفاصيل إضافية' },
    attachments: { en: 'Technical documents', ar: 'المستندات الفنية' },
    attachmentsHelp: {
      en: 'P&ID, water analysis, specification or existing equipment details. PDF, JPG, PNG, DOCX or XLSX, up to 10 MB each.',
      ar: 'مخطط P&ID أو تحليل المياه أو المواصفات أو بيانات المعدات القائمة. صيغ PDF أو JPG أو PNG أو DOCX أو XLSX، بحد أقصى 10 ميجابايت لكل ملف.',
    },
    addFiles: { en: 'Add files', ar: 'أضف ملفات' },
    removeFile: { en: 'Remove file', ar: 'إزالة الملف' },
    consent: {
      en: 'I agree that C-Water may use these details to respond to my enquiry.',
      ar: 'أوافق على استخدام C-Water لهذه البيانات للرد على استفساري.',
    },
    errorSummary: { en: 'Please correct the following before continuing:', ar: 'يُرجى تصحيح ما يلي قبل المتابعة:' },
    errors: {
      requiredField: { en: 'This field is required.', ar: 'هذا الحقل مطلوب.' },
      selectOption: { en: 'Select at least one option.', ar: 'اختر خيارًا واحدًا على الأقل.' },
      email: { en: 'Enter a valid email address, for example name@company.com.', ar: 'أدخل بريدًا إلكترونيًا صحيحًا، مثل name@company.com.' },
      phone: { en: 'Enter a valid phone number, including country code.', ar: 'أدخل رقم هاتف صحيح مع رمز الدولة.' },
      tooLong: { en: 'This entry is too long.', ar: 'هذا الإدخال طويل جدًا.' },
      fileType: { en: 'Unsupported file type. Use PDF, JPG, PNG, DOCX or XLSX.', ar: 'نوع الملف غير مدعوم. استخدم PDF أو JPG أو PNG أو DOCX أو XLSX.' },
      fileSize: { en: 'File is larger than 10 MB.', ar: 'حجم الملف يتجاوز 10 ميجابايت.' },
      tooManyFiles: { en: 'Attach up to 5 files.', ar: 'أرفق حتى 5 ملفات.' },
      consent: { en: 'Please confirm before sending.', ar: 'يُرجى التأكيد قبل الإرسال.' },
      submitFailed: { en: 'The request could not be sent. Please try again.', ar: 'تعذّر إرسال الطلب. يُرجى المحاولة مرة أخرى.' },
    },
    retry: { en: 'Try again', ar: 'أعد المحاولة' },
    successTitle: { en: 'Your request has been sent.', ar: 'تم إرسال طلبك.' },
    successBody: {
      en: 'Your information has reached the C-Water team. A technical or commercial specialist will review the details and contact you to confirm the next step.',
      ar: 'وصلت بياناتك إلى فريق C-Water. سيراجع أحد المتخصصين الفنيين أو التجاريين التفاصيل ويتواصل معك لتأكيد الخطوة التالية.',
    },
    successNext: { en: 'What happens next', ar: 'ما الذي يحدث بعد ذلك' },
    reference: { en: 'Reference', ar: 'الرقم المرجعي' },
    backToSolutions: { en: 'Return to Solutions', ar: 'العودة إلى الحلول' },
  },

  /* --- Misc --------------------------------------------------------------- */
  readingTime: { en: (n: number) => `${n} min read`, ar: (n: number) => `قراءة ${n} دقائق` },
  published: { en: 'Published', ar: 'نُشر في' },
  updated: { en: 'Updated', ar: 'حُدّث في' },
  illustrativeProject: { en: 'Illustrative format example', ar: 'مثال توضيحي للصيغة' },
  illustrativeProjectNote: {
    en: 'This entry demonstrates the case-study structure. It is not a record of a specific C-Water project, and contains no customer names or performance figures.',
    ar: 'يوضح هذا المدخل هيكل دراسة الحالة فقط، وهو ليس سجلًا لمشروع محدد لدى C-Water، ولا يتضمن أسماء عملاء أو أرقام أداء.',
  },
  faqTitle: { en: 'Frequently asked', ar: 'أسئلة متكررة' },
  copyright: {
    en: (y: number) => `© ${y} C-Water. All rights reserved.`,
    ar: (y: number) => `© ${y} C-Water. جميع الحقوق محفوظة.`,
  },
  partnerDisclaimer: {
    en: 'Walchem, TIMEX and Kurita are trademarks of their respective owners. C-Water presents these technologies as a solution partner and does not claim ownership of partner intellectual property.',
    ar: 'Walchem وTIMEX وKurita علامات تجارية مملوكة لأصحابها. تقدّم C-Water هذه التقنيات بصفتها شريك حلول، ولا تدّعي ملكية الملكية الفكرية للشركاء.',
  },
  notFoundTitle: { en: 'That page could not be found.', ar: 'تعذّر العثور على هذه الصفحة.' },
  notFoundBody: {
    en: 'The address may have changed. Try the solutions index, the product catalogue, or search for what you need.',
    ar: 'ربما تغيّر العنوان. جرّب فهرس الحلول أو كتالوج المنتجات أو ابحث عمّا تحتاجه.',
  },
  conversionBar: {
    prompt: { en: 'Need help choosing the right approach?', ar: 'تحتاج مساعدة في اختيار المنهج المناسب؟' },
    dismiss: { en: 'Dismiss', ar: 'إخفاء' },
  },
} as const;

/** Narrow helper for the plain string entries above. */
export function d(entry: { en: string; ar: string }, locale: Locale): string {
  return entry[locale] || entry.en;
}
