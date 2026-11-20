'use client';

import { useEffect } from 'react';

const targets = '[data-reveal], .footer-inner';
const wrappers = '.sources, .hero-copy, .hero-bottom';

export default function SiteReveal() {
  useEffect(() => {
    const root = document.documentElement;
    if (root.dataset.revealStage !== 'pending') return;
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const running = new Map();
    const settle = target => {
      observer.unobserve(target);
      target.dataset.revealed = '';
    };
    const cancelOnFocus = ({ target }) => {
      const pending = target.closest(targets);
      if (pending) settle(pending);
      for (const [element, animation] of running) {
        if (element.contains(target)) animation.cancel();
      }
    };
    const showAll = () => {
      delete root.dataset.revealStage;
      observer.disconnect();
      running.forEach(animation => animation.cancel());
    };
    const observer = new IntersectionObserver(entries => {
      if (root.dataset.revealStage !== 'active') return;
      for (const { target, isIntersecting } of entries) {
        if (!isIntersecting || target.hasAttribute('data-revealed')) continue;
        if (!preference.matches && !document.hidden && !target.matches(':focus-within')) {
          const group = target.matches('[data-reveal="group"], [data-reveal="hero"], .footer-inner');
          const elements = group ? [...target.children].flatMap(child => child.matches(wrappers) ? [...child.children] : [child]) : [target];
          elements.forEach((element, index) => {
            const photo = element.dataset.reveal === 'photo';
            const frames = photo
              ? [{ opacity: 0, clipPath: 'inset(6% 0 0 0)', transform: 'translateY(22px) scale(.985)' }, { opacity: 1, clipPath: 'inset(0)', transform: 'none' }]
              : [{ opacity: 0, transform: 'translateY(22px)' }, { opacity: 1, transform: 'none' }];
            const order = group ? index : Number(element.dataset.revealOrder || 0);
            const animation = element.animate(frames, { duration: photo ? 900 : 650, delay: order * 90, fill: 'backwards', easing: 'cubic-bezier(.16, 1, .3, 1)' });
            running.set(element, animation);
            animation.finished.then(() => running.delete(element), () => running.delete(element));
          });
        }
        settle(target);
      }
    }, { rootMargin: '0px 0px -6% 0px', threshold: .08 });
    document.querySelectorAll(targets).forEach(target => observer.observe(target));
    document.addEventListener('focusin', cancelOnFocus);
    preference.addEventListener('change', showAll);
    root.dataset.revealStage = 'active';
    return () => {
      showAll();
      document.removeEventListener('focusin', cancelOnFocus);
      preference.removeEventListener('change', showAll);
    };
  }, []);
  return null;
}