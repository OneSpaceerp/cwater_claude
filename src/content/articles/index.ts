import type { Article, KnowledgeCategory } from '../types';
import type { Localized } from '@/lib/i18n';
import { coolingAndBoilerArticles } from './cooling-and-boiler';
import { membraneAndFiltrationArticles } from './membranes-and-filtration';
import { measurementAndControlArticles } from './measurement-and-control';
import { programmeDesignArticles } from './programme-design';

/** All Knowledge Center articles, newest first. */
export const articles: Article[] = [
  ...coolingAndBoilerArticles,
  ...membraneAndFiltrationArticles,
  ...measurementAndControlArticles,
  ...programmeDesignArticles,
].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

export const articleBySlug = Object.fromEntries(articles.map((a) => [a.slug, a]));

/** Knowledge categories, in the order they appear on the hub. */
export const knowledgeCategories: { id: KnowledgeCategory; label: Localized }[] = [
  { id: 'cooling-water', label: { en: 'Cooling Water', ar: 'مياه التبريد' } },
  { id: 'boiler-water', label: { en: 'Boiler Water', ar: 'مياه الغلايات' } },
  { id: 'ro-membranes', label: { en: 'RO & Membranes', ar: 'التناضح العكسي والأغشية' } },
  { id: 'filtration', label: { en: 'Filtration', ar: 'الترشيح' } },
  { id: 'water-chemistry', label: { en: 'Water Chemistry', ar: 'كيمياء المياه' } },
  { id: 'monitoring-control', label: { en: 'Monitoring & Control', ar: 'المراقبة والتحكم' } },
];
