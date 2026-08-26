import Link from 'next/link';
import { Logo } from './Logo';
import { ButtonLink } from '@/components/ui/Button';
import { dictionary as D } from '@/content/dictionary';
import { company, footerNav } from '@/content/site';
import { localePath, t, type Locale } from '@/lib/i18n';

export function Footer({ locale }: { locale: Locale }) {
  const year = new Date().getFullYear();

  return (
    <footer className="theme-dark border-t border-white/10 bg-ink-950">
      {/* ---- Conversion band ---- */}
      <div className="border-b border-white/10">
        <div className="container-page py-12 lg:py-16">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="u-label text-signal-300">{t(company.descriptor, locale)}</p>
              <p className="mt-4 font-display text-h3 leading-tight font-bold tracking-tight text-white">
                {t(company.tagline, locale)}
              </p>
              <p className="mt-3 text-ink-300">
                {t(
                  {
                    en: 'Global technology. Local engineering. One integrated solution.',
                    ar: 'تقنية عالمية. هندسة محلية. حل واحد متكامل.',
                  },
                  locale,
                )}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={localePath(locale, 'request-solution')} withArrow>
                {t(D.requestSolution, locale)}
              </ButtonLink>
              <ButtonLink href={localePath(locale, 'contact?intent=engineer')} variant="outline-light">
                {t(D.talkToEngineer, locale)}
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>

      {/* ---- Link columns ---- */}
      <div className="container-page py-14">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_repeat(4,minmax(0,1fr))] lg:gap-8">
          <div>
            <Logo locale={locale} height={30} />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-400">
              {t(
                {
                  en: 'Water treatment engineering for industrial and commercial systems — chemistry, filtration, dosing, measurement and control, integrated around your operation.',
                  ar: 'هندسة معالجة المياه للأنظمة الصناعية والتجارية — كيمياء وترشيح وجرعات وقياس وتحكم، متكاملة حول طبيعة تشغيلك.',
                },
                locale,
              )}
            </p>
            <p className="mt-5 text-sm text-ink-400">
              <a href={`mailto:${company.email}`} className="latin transition-colors hover:text-white">
                {company.email}
              </a>
            </p>
            {company.phones.map((phone) => (
              <p key={phone.tel} className="mt-1 text-sm text-ink-400">
                <a href={`tel:${phone.tel}`} className="latin transition-colors hover:text-white">
                  {phone.display}
                </a>
              </p>
            ))}
            <p className="mt-4 text-sm leading-relaxed text-ink-400">{t(company.address.full, locale)}</p>
          </div>

          {footerNav.map((column) => (
            <nav key={t(column.heading, locale)} aria-label={t(column.heading, locale)}>
              <p className="u-label mb-4 text-ink-400">{t(column.heading, locale)}</p>
              <ul className="flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={localePath(locale, link.href)}
                      className="text-sm text-ink-300 transition-colors hover:text-white"
                    >
                      {t(link.label, locale)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      {/* ---- Legal ---- */}
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-4 py-6 lg:flex-row lg:items-start lg:justify-between">
          <p className="text-[0.8125rem] text-ink-400">{D.copyright[locale](year)}</p>
          <p className="max-w-2xl text-[0.75rem] leading-relaxed text-ink-600">
            {t(D.partnerDisclaimer, locale)}
          </p>
        </div>
      </div>
    </footer>
  );
}
