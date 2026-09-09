import type { Localized } from '@/lib/i18n';

/**
 * Photography, keyed by the page it belongs to.
 *
 * Kept in the content layer rather than hard-coded into components for the same
 * reason as everything else here: a page asks for its image by slug, so adding
 * or replacing one is a data change. A slug with no entry renders the page
 * exactly as it did before — coverage can be partial without looking broken.
 *
 * The files are prepared before they land in public/images: cropped where a
 * source carried something that did not belong, resized to a single width, and
 * encoded as WebP. That matters because the cPanel export has no image
 * optimiser and serves whatever is on disk.
 *
 * `alt` is authored in both languages for the places an image carries meaning.
 * Where an image is decoration behind a heading it is rendered `aria-hidden`
 * with an empty alt instead, which is the correct treatment — a screen reader
 * announcing a background texture is noise, not access.
 */
export interface SiteImage {
  /** Path under public/, without the base path — components add that. */
  src: string;
  width: number;
  height: number;
  alt: Localized;
}

const image = (src: string, width: number, height: number, en: string, ar: string): SiteImage => ({
  src,
  width,
  height,
  alt: { en, ar },
});

/* -------------------------------------------------------------------------- */
/*  Solutions                                                                 */
/* -------------------------------------------------------------------------- */

export const solutionImages: Record<string, SiteImage> = {
  'cooling-water': image(
    '/images/solutions/cooling-water.webp', 1600, 892,
    'An open cooling tower beside media filters and two dosing tanks, piped together as one system.',
    'برج تبريد مفتوح بجانب مرشحات وسائط وخزاني تغذية كيميائية، موصولة معًا كمنظومة واحدة.',
  ),
  'boiler-steam': image(
    '/images/solutions/boiler-steam.webp', 1600, 892,
    'A plant room with bulk chemical tanks, stainless pressure vessels and a dosing control panel.',
    'غرفة معدات تضم خزانات كيميائية وأوعية ضغط من الفولاذ المقاوم للصدأ ولوحة تحكم في الجرعات.',
  ),
  'ro-membranes': image(
    '/images/solutions/ro-membranes.webp', 1376, 768,
    'A spiral-wound membrane element in a clear housing, with its monitoring panel alongside.',
    'عنصر غشائي حلزوني داخل حاوية شفافة، وإلى جانبه لوحة المراقبة الخاصة به.',
  ),
  'process-water': image(
    '/images/solutions/process-water.webp', 1376, 768,
    'Industrial filtration vessels and pumps arranged along a treated-water line.',
    'أوعية ترشيح صناعية ومضخات مرتبة على امتداد خط مياه معالجة.',
  ),
  wastewater: image(
    '/images/solutions/wastewater.webp', 1376, 768,
    'An aerial view of circular clarifiers and settlement basins at a treatment works.',
    'منظر جوي لأحواض ترويق دائرية وأحواض ترسيب في محطة معالجة.',
  ),
  'potable-water': image(
    '/images/solutions/potable-water.webp', 1376, 768,
    'Treated drinking water running clear from a dispenser into a glass.',
    'مياه شرب معالجة تتدفق صافية من موزّع إلى كوب زجاجي.',
  ),
  'industrial-water': image(
    '/images/solutions/industrial-water.webp', 1376, 768,
    'A water treatment building at dusk, with storage tanks behind it.',
    'مبنى معالجة مياه عند الغروب، وخلفه خزانات تخزين.',
  ),
  'specialised-treatment': image(
    '/images/solutions/specialised-treatment.webp', 1376, 768,
    'A water sample being drawn by pipette into a test tube in a laboratory.',
    'سحب عينة مياه بماصّة إلى أنبوب اختبار داخل مختبر.',
  ),
};

/* -------------------------------------------------------------------------- */
/*  Technologies                                                              */
/* -------------------------------------------------------------------------- */

export const technologyImages: Record<string, SiteImage> = {
  'water-treatment-chemicals': image(
    '/images/technologies/water-treatment-chemicals.webp', 1199, 928,
    'A ventilated chemical store with drums, intermediate bulk containers and a transfer pump.',
    'مخزن كيميائي جيد التهوية يضم براميل وحاويات سائبة ومضخة نقل.',
  ),
  filtration: image(
    '/images/technologies/filtration.webp', 1376, 768,
    'A pleated filter cartridge shown in section, its media open to the flow path.',
    'خرطوشة مرشح مطوية معروضة بالمقطع، ووسائطها مفتوحة على مسار التدفق.',
  ),
  'chemical-dosing': image(
    '/images/technologies/chemical-dosing.webp', 1376, 768,
    'Gloved hands setting a dosing valve on a treatment tank.',
    'يدان بقفازين تضبطان صمام جرعات على خزان معالجة.',
  ),
  'sensors-measurement': image(
    '/images/technologies/sensors-measurement.webp', 1376, 768,
    'A submerged water quality sensor reading conditions below the surface.',
    'مستشعر جودة مياه مغمور يقيس الظروف تحت السطح.',
  ),
  'monitoring-control': image(
    '/images/technologies/monitoring-control.webp', 1376, 768,
    'An engineer reading a live system schematic on a tablet beside a dosing skid.',
    'مهندس يقرأ مخططًا حيًا للمنظومة على جهاز لوحي بجوار وحدة تغذية كيميائية.',
  ),
  'reverse-osmosis': image(
    '/images/technologies/reverse-osmosis.webp', 1376, 768,
    'An engineer inspecting the pressure vessels of a reverse osmosis skid.',
    'مهندس يفحص أوعية الضغط في وحدة تناضح عكسي.',
  ),
  'automation-remote-monitoring': image(
    '/images/technologies/automation-remote-monitoring.webp', 1376, 768,
    'Monitoring instruments installed at a natural watercourse, logging unattended.',
    'أجهزة مراقبة مركّبة عند مجرى مائي طبيعي، تسجّل دون تدخل.',
  ),
  'water-analysis': image(
    '/images/technologies/water-analysis.webp', 1376, 768,
    'A technician holding a flask of sample water up to the light.',
    'فني يرفع دورقًا يحتوي عينة مياه نحو الضوء.',
  ),
  'engineering-integration': image(
    '/images/technologies/engineering-integration.webp', 1376, 768,
    'An engineer checking drawings against installed pumps and pipework on site.',
    'مهندس يقارن الرسومات بالمضخات والمواسير المركّبة في الموقع.',
  ),
};

/* -------------------------------------------------------------------------- */
/*  Standalone                                                                */
/* -------------------------------------------------------------------------- */

export const homeHeroImage = image(
  '/images/home/hero.webp', 1376, 768,
  'An engineer inspecting the pressure vessels of a reverse osmosis skid.',
  'مهندس يفحص أوعية الضغط في وحدة تناضح عكسي.',
);

export const homeFlowImage = image(
  '/images/home/flow.webp', 1376, 768,
  'Treated water running through a stainless manifold.',
  'مياه معالجة تجري عبر مشعب من الفولاذ المقاوم للصدأ.',
);

export const aboutStoreImage = image(
  '/images/about/store.webp', 1376, 768,
  'A treatment chemical store, stock checked against the delivery record.',
  'مخزن كيماويات معالجة، تُراجع فيه الكميات مقابل سجل التوريد.',
);
