'use client';

import { Icon } from './icons';

export default function MobileNav({ label, navLabel, links }) {
  return <details className="mobile-nav" onKeyDown={event => {
    if (event.key !== 'Escape' || !event.currentTarget.open) return;
    event.preventDefault();
    event.currentTarget.open = false;
    event.currentTarget.querySelector('summary').focus();
  }}>
    <summary>{label}<svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 8h16M4 16h16" /></svg></summary>
    <nav aria-label={navLabel}>
      {links.map(({ href, text, current, dates }) => <a key={href} href={href}
        aria-current={current ? 'page' : undefined} className={dates ? 'menu-dates' : undefined}
        onClick={event => {
          const menu = event.currentTarget.closest('details');
          menu.open = false;
          menu.querySelector('summary').focus({ preventScroll: true });
        }}>{text}{dates && <Icon name="chevron" />}</a>)}
    </nav>
  </details>;
}