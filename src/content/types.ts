/**
 * Content model.
 *
 * Every entity below is a plain, serialisable record with stable slugs and
 * explicit relationships expressed as slug arrays. Nothing here depends on
 * React or Next, so a headless CMS (Sanity, Payload, Strapi) can become the
 * source of these objects without touching a single component.
 *
 * Relationship graph:
 *   Solution  ─ technologies, products, services, industries, projects, articles
 *   Industry  ─ solutions, technologies, products, projects, articles
 *   Technology─ partner, solutions, products, articles
 *   Product   ─ partner, technology, solutions, industries, documents
 *   Service   ─ technologies, solutions
 *   Project   ─ industry, solution, technologies, products
 *   Article   ─ solutions, technologies, products
 */

import type { Localized } from '@/lib/i18n';

/** Publication state — lets a CMS gate drafts without deleting records. */
export type PublicationStatus = 'published' | 'draft';

export interface SeoFields {
  /** Page <title>. Kept separate from the display headline. */
  metaTitle: Localized;
  metaDescription: Localized;
  /** Optional override for the OG image path. */
  ogImage?: string;
}

export interface BaseEntity extends SeoFields {
  slug: string;
  status: PublicationStatus;
  title: Localized;
  /** One-line summary used on cards and in search results. */
  summary: Localized;
}

/* -------------------------------------------------------------------------- */
/* Shared value objects                                                        */
/* -------------------------------------------------------------------------- */

/** A named point with a short explanation — problems, benefits, risks, steps. */
export interface Point {
  id: string;
  label: Localized;
  body: Localized;
  /** Icon key resolved by the icon registry. */
  icon?: IconKey;
}

/** A stage in a process or system flow diagram. */
export interface FlowStage {
  id: string;
  label: Localized;
  /** Short caption shown under the node. */
  caption: Localized;
  icon: IconKey;
  /** Partner whose technology sits at this stage, if any. */
  partner?: PartnerSlug;
  /** Where clicking the node leads. */
  href?: string;
}

/** A row in a technical specification table. */
export interface SpecRow {
  key: Localized;
  value: Localized;
}

/** A downloadable technical document. */
export interface TechnicalDocument {
  id: string;
  title: Localized;
  kind: DocumentKind;
  /** Null when the document is available on request rather than as a file. */
  file: string | null;
  /** Human-readable size, e.g. "1.4 MB". Null when no file is attached. */
  size: string | null;
  /** Set when the asset must be supplied by C-Water before launch. */
  availableOnRequest?: boolean;
}

export type DocumentKind =
  | 'datasheet'
  | 'brochure'
  | 'technical-guide'
  | 'catalogue'
  | 'certificate'
  | 'application-note'
  | 'case-study';

export type IconKey =
  | 'droplet'
  | 'filter'
  | 'flask'
  | 'pump'
  | 'sensor'
  | 'controller'
  | 'monitor'
  | 'optimize'
  | 'scale'
  | 'corrosion'
  | 'biology'
  | 'fouling'
  | 'gauge'
  | 'flow'
  | 'energy'
  | 'shield'
  | 'wrench'
  | 'lab'
  | 'blueprint'
  | 'network'
  | 'boiler'
  | 'tower'
  | 'membrane'
  | 'recycle'
  | 'factory'
  | 'clipboard';

/* -------------------------------------------------------------------------- */
/* Partners                                                                    */
/* -------------------------------------------------------------------------- */

export type PartnerSlug = 'walchem' | 'timex' | 'kurita';

export interface Partner extends BaseEntity {
  slug: PartnerSlug;
  /** Legal/marketing name exactly as the partner writes it. */
  legalName: string;
  /** Hero headline — distinct from `title`, which is the nav label. */
  headline: Localized;
  /** Four-beat positioning line, e.g. "Sense. Dose. Control. Connect." */
  motto: Localized;
  /** The capability C-Water draws from this partner. */
  capability: Localized;
  origin: Localized;
  website: string;
  /** Verified capability areas, sourced from the partner's official site. */
  capabilityAreas: Point[];
  /** Product-category names as published by the partner. */
  categories: Localized[];
  /** Signal-path diagram shown on the partner page. */
  flow: FlowStage[];
  /** How C-Water adds engineering value on top of the technology. */
  cwaterRole: Localized;
}

/* -------------------------------------------------------------------------- */
/* Solutions                                                                   */
/* -------------------------------------------------------------------------- */

export interface Solution extends BaseEntity {
  /** Hero headline — distinct from `title`, which is the nav label. */
  headline: Localized;
  intro: Localized;
  /** Why the application matters operationally. */
  whyItMatters: Localized;
  problems: Point[];
  risks: Point[];
  /** The C-Water method, rendered as a numbered sequence. */
  approach: Point[];
  /** Stage-by-stage system diagram for this application. */
  systemFlow: FlowStage[];
  technologies: string[];
  services: string[];
  industries: string[];
  products: string[];
  projects: string[];
  articles: string[];
  /** Problem tags consumed by the Solution Finder. */
  problemTags: ProblemTag[];
  /** Objective tags consumed by the Solution Finder. */
  goalTags: GoalTag[];
  cta: Localized;
}

export type ProblemTag =
  | 'scale'
  | 'corrosion'
  | 'fouling'
  | 'microbiology'
  | 'filtration'
  | 'water-loss'
  | 'chemical-consumption'
  | 'reliability'
  | 'maintenance'
  | 'performance';

export type GoalTag =
  | 'protect-equipment'
  | 'improve-efficiency'
  | 'reduce-water'
  | 'improve-control'
  | 'reduce-maintenance'
  | 'improve-reliability'
  | 'optimize-existing'
  | 'design-new';

/* -------------------------------------------------------------------------- */
/* Industries                                                                  */
/* -------------------------------------------------------------------------- */

export interface Industry extends BaseEntity {
  headline: Localized;
  intro: Localized;
  /** Water systems typically found on site in this sector. */
  typicalSystems: Point[];
  challenges: Point[];
  risks: Point[];
  solutions: string[];
  technologies: string[];
  products: string[];
  services: string[];
  projects: string[];
  articles: string[];
  cta: Localized;
}

/* -------------------------------------------------------------------------- */
/* Technologies                                                                */
/* -------------------------------------------------------------------------- */

export interface Technology extends BaseEntity {
  headline: Localized;
  intro: Localized;
  /** What problem the technology solves. */
  whatItSolves: Localized;
  /** Conceptual explanation of how it works. */
  howItWorks: Point[];
  /** Where it sits in the treatment chain (0-based index into the site flow). */
  chainPosition: number;
  applications: Localized[];
  partner?: PartnerSlug;
  solutions: string[];
  products: string[];
  services: string[];
  articles: string[];
  cta: Localized;
}

/* -------------------------------------------------------------------------- */
/* Products                                                                    */
/* -------------------------------------------------------------------------- */

export interface Product extends BaseEntity {
  /** Product name exactly as the manufacturer publishes it. Not localized. */
  name: string;
  partner: PartnerSlug;
  /** Catalogue category slug. */
  category: ProductCategory;
  technology: string;
  /** One-line technical positioning shown under the name. */
  positioning: Localized;
  overview: Localized;
  benefits: Point[];
  applications: Localized[];
  /**
   * Verified specifications only. Where a value is not confirmed by an
   * official partner source it is omitted entirely rather than estimated —
   * the product page then renders the "available on request" state.
   */
  specs: SpecRow[];
  documents: TechnicalDocument[];
  solutions: string[];
  industries: string[];
  relatedProducts: string[];
  /** Marks records whose specification set still needs C-Water sign-off. */
  specsPendingReview: boolean;
}

export type ProductCategory =
  | 'controllers'
  | 'sensors'
  | 'metering-pumps'
  | 'software'
  | 'self-cleaning-filters'
  | 'cartridge-filters'
  | 'disc-filters'
  | 'separators'
  | 'flotation'
  | 'screens-strainers'
  | 'treatment-systems'
  | 'cooling-chemicals'
  | 'boiler-chemicals'
  | 'membrane-chemicals'
  | 'wastewater-chemicals';

/* -------------------------------------------------------------------------- */
/* Services                                                                    */
/* -------------------------------------------------------------------------- */

export interface Service extends BaseEntity {
  headline: Localized;
  /** Verb form used in the six-step services diagram: Analyze, Assess… */
  verb: Localized;
  icon: IconKey;
  whatItIs: Localized;
  whyItMatters: Localized;
  whenYouNeedIt: Point[];
  approach: Point[];
  /** Concrete deliverables the customer receives. */
  deliverables: Localized[];
  technologies: string[];
  solutions: string[];
  cta: Localized;
}

/* -------------------------------------------------------------------------- */
/* Projects                                                                    */
/* -------------------------------------------------------------------------- */

export interface Project extends BaseEntity {
  /**
   * Sample records illustrate the case-study format before C-Water supplies
   * cleared project data. They render with a visible "illustrative" notice and
   * are excluded from structured data. No customer names, locations or
   * performance figures are ever invented.
   */
  isIllustrative: boolean;
  industry: string;
  solution: string;
  /** Region only — never a named customer site unless cleared. */
  location: Localized;
  challenge: Localized;
  existingSystem: Localized;
  approach: Point[];
  technologies: string[];
  products: string[];
  /**
   * Qualitative outcomes only. Numeric results require validated C-Water
   * measurement data and are added per-project after review.
   */
  outcomes: Point[];
  /** Populated only from validated measurement data. */
  metrics: ProjectMetric[];
  insight: Localized;
  articles: string[];
}

export interface ProjectMetric {
  label: Localized;
  /** Only ever set from validated data. */
  value: string;
  unit?: string;
  direction: 'up' | 'down';
}

/* -------------------------------------------------------------------------- */
/* Knowledge                                                                   */
/* -------------------------------------------------------------------------- */

export interface Article extends BaseEntity {
  category: KnowledgeCategory;
  /** Estimated reading time in minutes. */
  readingMinutes: number;
  publishedAt: string;
  updatedAt?: string;
  /** The reader's actual question, restated. */
  question: Localized;
  /** Body sections rendered through the technical prose style. */
  sections: ArticleSection[];
  /** Actionable checklist the reader can take to the plant. */
  checklist: Localized[];
  /** The point at which a website article stops and an engineer starts. */
  escalation: Localized;
  solutions: string[];
  technologies: string[];
  products: string[];
  faqs: Faq[];
}

export interface ArticleSection {
  id: string;
  heading: Localized;
  /** Paragraphs and lists. Kept structured so a CMS can map to rich text. */
  blocks: ArticleBlock[];
}

export type ArticleBlock =
  | { type: 'p'; text: Localized }
  | { type: 'ul'; items: Localized[] }
  | { type: 'ol'; items: Localized[] }
  | { type: 'note'; text: Localized }
  | { type: 'table'; head: Localized[]; rows: Localized[][] };

export type KnowledgeCategory =
  | 'cooling-water'
  | 'boiler-water'
  | 'ro-membranes'
  | 'filtration'
  | 'water-chemistry'
  | 'monitoring-control';

export interface Faq {
  id: string;
  question: Localized;
  answer: Localized;
}

/* -------------------------------------------------------------------------- */
/* Search                                                                      */
/* -------------------------------------------------------------------------- */

export type SearchKind =
  | 'solution'
  | 'industry'
  | 'technology'
  | 'product'
  | 'partner'
  | 'service'
  | 'project'
  | 'article'
  | 'document';

export interface SearchRecord {
  id: string;
  kind: SearchKind;
  title: Localized;
  summary: Localized;
  href: Localized;
  /** Free-text keywords folded into the match, both languages. */
  keywords: Localized;
}
