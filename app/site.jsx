import { Icon, Mark } from './icons';
import { chrome, paths } from './locales.mjs';
import MobileNav from './mobile-nav';

function Brand({ locale }) {
  return <a href={paths.home[locale]} className="brand" aria-label={`Marvel apartamentai · ${chrome[locale].home}`}><Mark /><span><strong>Marvel</strong><small lang="lt">Apartamentai</small></span></a>;
}

export function SiteHeader({ locale, page = 'home' }) {
  const text = chrome[locale];
  const home = page === 'home' ? '' : paths.home[locale];
  const links = [
    { href: paths.gallery[locale], text: locale === 'lt' ? 'Erdvės' : 'Spaces', current: page === 'gallery' },
    { href: `${home}#atsiliepimai`, text: text.reviews },
    { href: `${home}#vieta`, text: text.location },
  ];
  const dates = { href: `${home}#rezervacija`, text: text.dates, dates: true };
  return <>
    <a href="#turinys" className="skip-link">{text.skip}</a>
    <header className="site-header">
      <div className="frame header-inner">
        <Brand locale={locale} />
        <nav className="section-nav" aria-label={text.nav}>
          {links.map(({ href, text: label, current }) => <a key={href} href={href} aria-current={current ? 'page' : undefined}>{label}</a>)}
          <a href={dates.href} className="button header-cta">
            <span className="dates-full">{dates.text}</span>
            <span className="dates-short">{locale === 'lt' ? 'Datos' : 'Dates'}</span>
            <Icon name="chevron" />
          </a>
        </nav>
        <MobileNav label={locale === 'lt' ? 'Meniu' : 'Menu'} navLabel={text.nav} links={[...links, dates]} />
        <nav className="language" aria-label={text.language}>
          {Object.entries({ lt: 'Lietuvių', en: 'English' }).map(([lang, name]) => (
            <a key={lang} href={paths[page][lang]} hrefLang={lang} lang={lang} aria-label={name} aria-current={locale === lang ? 'page' : undefined} rel={locale === lang ? undefined : 'alternate'}>{lang.toUpperCase()}</a>
          ))}
        </nav>
      </div>
    </header>
  </>;
}

export function SiteFooter({ locale }) {
  const email = 'info@marvelapartamentai.lt';
  return <footer className="site-footer" id="kontaktai">
    <div className="frame footer-inner">
      <Brand locale={locale} />
      <div className="footer-contact"><a href={`mailto:${email}`}>{email}</a><a href="tel:+37060932496">+370 609 32496</a></div>
      <div className="footer-social"><a href="https://www.instagram.com/marvel_apartamentai/">Instagram <Icon name="external" /></a><a href="https://www.facebook.com/p/Marvel-apartamentai-61563980918531/">Facebook <Icon name="external" /></a></div>
    </div>
  </footer>;
}
