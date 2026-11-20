'use client';

import { useEffect, useRef, useState } from 'react';
import { Icon } from './icons';
import { sources } from './data.mjs';
import { homeCopy } from './locales.mjs';
import './home-motion.css';

const copy = {
  lt: {
    title: ['Ramybė prie', 'santakos'],
    intro: 'Privatūs apartamentai Kaune su vaizdu į Nemuno ir Neries santaką.',
    reviews: 'Daugiau nei 40 teigiamų atsiliepimų',
  },
  en: {
    title: ['Quiet by the', 'confluence'],
    intro: 'Private apartments in Kaunas overlooking the confluence of the Nemunas and Neris.',
    reviews: '40+ positive reviews',
  },
};

const slides = [
  ['namas', 1920, 1387],
  ['svetaine', 1440, 1115],
  ['terasa', 1000, 667],
  ['miegamasis', 950, 581],
];
const facade = { index: 0, last: null };

export default function Hero({ locale }) {
  const text = copy[locale];
  const photos = useRef(null);
  const [{ index, last }, setSlide] = useState(facade);
  const [focused, setFocused] = useState(false);
  const [reduced, setReduced] = useState(null);
  const [inView, setInView] = useState(false);
  const [foreground, setForeground] = useState(false);

  useEffect(() => {
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const syncMotion = () => {
      setReduced(motion.matches);
      if (motion.matches) setSlide(facade);
    };
    const syncVisibility = () => setForeground(!document.hidden);
    syncMotion();
    syncVisibility();
    motion.addEventListener('change', syncMotion);
    document.addEventListener('visibilitychange', syncVisibility);
    const observer = window.IntersectionObserver && new IntersectionObserver(([entry]) => setInView(entry.intersectionRatio >= .15), { rootMargin: '-100px 0px 0px', threshold: .15 });
    observer?.observe(photos.current);
    return () => {
      motion.removeEventListener('change', syncMotion);
      document.removeEventListener('visibilitychange', syncVisibility);
      observer?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (reduced !== false || !foreground || !inView || focused) return;
    let cancelled = false;
    const timer = setTimeout(async () => {
      const next = (index + 1) % slides.length;
      const images = photos.current.querySelectorAll('img');
      try {
        await Promise.all([images[index].decode(), images[next].decode()]);
      } catch {
        return;
      }
      if (!cancelled && !document.hidden) setSlide({ index: next, last: index });
    }, 5500);
    return () => { cancelled = true; clearTimeout(timer); };
  }, [reduced, foreground, inView, focused, index]);

  return <section className="hero" aria-labelledby="hero-title"
    onFocusCapture={() => setFocused(true)}
    onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
    <div className="frame hero-content" data-reveal="hero">
      <div className="hero-copy">
        <h1 id="hero-title">{text.title[0]}<br />{text.title[1]}</h1>
        <p className="hero-intro">{text.intro}</p>
      </div>
      <div className="hero-bottom">
        <a className="hero-proof" href="#atsiliepimai">
          <span className="hero-review-meta">
            <span className="hero-stars" aria-hidden="true">{Array.from({ length: 5 }, (_, i) => <Icon name="star" key={i} />)}</span>
            <span className="hero-count">{text.reviews}</span>
          </span>
          <strong className="hero-ratings"><span>Airbnb <b>{sources.airbnb.rating}</b></span> <span>Booking.com <b>{sources.booking.rating}</b></span></strong>
        </a>
        <a className="hero-address" href="#vieta"><Icon name="pin" /> Marvelė, Kaunas</a>
      </div>
    </div>
    <div className="hero-photos" ref={photos}>
      {slides.slice(0, reduced === false ? slides.length : 1).map(([file, width, height], i) => <picture key={file}
        data-active={i === index} data-previous={i === last}>
        {i === 0 && <source media="(max-width: 700px)" srcSet="/photos/namas-small.webp" />}
        <img src={`/photos/${file}.webp`} alt={i === 0 ? homeCopy[locale].heroAlt : ''} width={width} height={height}
          loading={i === 0 ? undefined : 'lazy'} fetchPriority={i === 0 ? 'high' : 'low'} />
      </picture>)}
    </div>
  </section>;
}
