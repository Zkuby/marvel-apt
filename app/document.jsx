import './globals.css';
import './site-motion.css';
import SiteReveal from './site-reveal';

// The marker has to run before body paint, even if every Next chunk is delayed.
const revealStartup = `(() => {
  if (!window.IntersectionObserver || !Element.prototype.animate || !window.matchMedia) return;
  if (!window.CSS || !CSS.supports('selector(:is(div):not(.foo, :focus-within))')) return;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  if (motion.matches || !motion.addEventListener) return;
  const root = document.documentElement;
  const show = () => {
    if (root.dataset.revealStage === 'pending') delete root.dataset.revealStage;
    document.removeEventListener('focusin', onFocus);
    motion.removeEventListener('change', show);
  };
  const onFocus = ({ target }) => {
    if (root.dataset.revealStage === 'pending' && target.closest('[data-reveal], .footer-inner')) show();
  };
  document.addEventListener('focusin', onFocus);
  motion.addEventListener('change', show);
  setTimeout(show, 1800);
  root.dataset.revealStage = 'pending';
})();`;

export default function Document({ locale, children }) {
  return <html lang={locale} suppressHydrationWarning>
    <head>
      <script dangerouslySetInnerHTML={{ __html: revealStartup }} />
      <link rel="stylesheet" href="/fonts.css" />
    </head>
    <body>{children}<SiteReveal /></body>
  </html>;
}