import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Hero } from '@/components/home/Hero';
import { ProblemSection } from '@/components/home/ProblemSection';
import { ApproachSection } from '@/components/home/ApproachSection';
import { SolutionsSection } from '@/components/home/SolutionsSection';
import { SystemSection } from '@/components/home/SystemSection';
import { PartnersSection } from '@/components/home/PartnersSection';
import { ResultsSection } from '@/components/home/ResultsSection';
import { IndustriesSection } from '@/components/home/IndustriesSection';
import { ProjectsSection } from '@/components/home/ProjectsSection';
import { KnowledgeSection } from '@/components/home/KnowledgeSection';
import { FinalCta } from '@/components/home/FinalCta';
import { isLocale, type Locale } from '@/lib/i18n';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata({
    locale,
    path: '',
    title: {
      en: 'C-Water | Water Treatment & Industrial Water Solutions in Egypt',
      ar: 'C-Water | معالجة المياه والحلول المائية الصناعية في مصر',
    },
    description: {
      en: 'Water treatment engineered around your operation. C-Water combines chemistry, filtration, dosing, measurement and control with local engineering expertise.',
      ar: 'معالجة مياه مصممة حول طبيعة تشغيلك. تجمع C-Water بين الكيمياء والترشيح والجرعات والقياس والتحكم مع خبرة هندسية محلية لأنظمة المياه الصناعية والتجارية.',
    },
  });
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;

  return (
    <>
      <Hero locale={locale} />
      <ProblemSection locale={locale} />
      <ApproachSection locale={locale} />
      <SolutionsSection locale={locale} />
      <SystemSection locale={locale} />
      <PartnersSection locale={locale} />
      <ResultsSection locale={locale} />
      <IndustriesSection locale={locale} />
      <ProjectsSection locale={locale} />
      <KnowledgeSection locale={locale} />
      <FinalCta locale={locale} />
    </>
  );
}
