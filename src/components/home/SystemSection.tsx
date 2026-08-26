import { Band, SectionHeading } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { SystemExplorer } from '@/components/interactive/SystemExplorer';
import { t, type Locale } from '@/lib/i18n';

/**
 * The interactive system. This is where the combined C-Water + partner
 * proposition becomes legible: one chain, several technologies, one owner.
 */
export function SystemSection({ locale }: { locale: Locale }) {
  return (
    <Band tone="ink-deep" blueprint className="section" id="system">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            index={4}
            eyebrow={t({ en: 'The system', ar: 'النظام' }, locale)}
            title={t({ en: 'See How the Pieces Work Together.', ar: 'شاهد كيف تعمل الأجزاء معًا.' }, locale)}
            lead={t(
              {
                en: 'Your water system is a chain. A change in one part affects everything downstream — which is why C-Water engineers the whole sequence rather than supplying one component of it.',
                ar: 'نظام المياه لديك سلسلة. وأي تغيير في جزء منه يؤثر في كل ما يليه — ولهذا تصمم C-Water التسلسل بأكمله بدل توريد مكوّن واحد منه.',
              },
              locale,
            )}
            tone="light"
          />
        </Reveal>

        <div className="mt-14">
          <SystemExplorer locale={locale} />
        </div>
      </div>
    </Band>
  );
}
