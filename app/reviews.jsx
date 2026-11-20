'use client';

import { useEffect, useRef, useState } from 'react';
import { Icon } from './icons';
import { reviews, sources } from './data.mjs';
import { reviewCopy } from './locales.mjs';

export default function ReviewRibbon({ locale }) {
  const text = reviewCopy[locale];
  const viewport = useRef(null);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setPlaying(!motion.matches);
    sync();
    motion.addEventListener('change', sync);
    return () => motion.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (!playing) return;
    const el = viewport.current;
    const section = el.closest('.reviews');
    let frame, last = 0, carry = 0;
    function advance(now) {
      if (!el.matches(':focus-within') && !section.matches(':has(.review-controls :focus-visible)') && last) {
        carry += Math.min(now - last, 40) * 0.016;
        if (carry >= 1) {
          const width = el.children[1].offsetLeft - el.children[0].offsetLeft;
          if (width > 0) el.scrollLeft = (el.scrollLeft + Math.floor(carry)) % width;
          carry %= 1;
        }
      }
      last = now;
      frame = requestAnimationFrame(advance);
    }
    const observer = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(frame);
      last = 0;
      if (entry.isIntersecting) frame = requestAnimationFrame(advance);
    });
    observer.observe(el);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [playing]);

  function step(direction) {
    setPlaying(false);
    const el = viewport.current;
    const width = el.children[1].offsetLeft - el.children[0].offsetLeft;
    const cardWidth = el.children[0].children[1].offsetLeft - el.children[0].children[0].offsetLeft;
    if (el.scrollLeft >= width) el.scrollLeft -= width;
    if (direction < 0 && el.scrollLeft < 1) el.scrollLeft = width;
    el.scrollBy({ left: direction * cardWidth, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  }

  return <>
    <div className="review-toolbar frame" role="group" aria-label={text.controls}>
      <p>{text.summaries}</p>
      <div className="review-controls">
        <button type="button" aria-controls="review-ribbon" aria-label={text.previous} onClick={() => step(-1)}><Icon name="left" /></button>
        <button type="button" aria-controls="review-ribbon" aria-label={playing ? text.pause : text.play} onClick={() => setPlaying(!playing)}><Icon name={playing ? 'pause' : 'play'} /></button>
        <button type="button" aria-controls="review-ribbon" aria-label={text.next} onClick={() => step(1)}><Icon name="arrow" /></button>
      </div>
    </div>
    <div className="review-ribbon" id="review-ribbon" ref={viewport} tabIndex={0} role="region" aria-label={text.ribbon} onPointerDown={() => setPlaying(false)} onKeyDown={e => { if (['ArrowLeft', 'ArrowRight'].includes(e.key)) { e.preventDefault(); step(e.key === 'ArrowLeft' ? -1 : 1); } }}>
      {[false, true].map(copy => <ul className="review-list" key={String(copy)} aria-hidden={copy ? true : undefined}>
        {reviews.map(({ author, source, summary }) => <li className="review" key={author}>
          <span className="review-stars" aria-hidden="true">{Array.from({ length: 5 }, (_, index) => <Icon name="star" key={index} />)}</span>
          <p>{summary[locale]}</p>
          <span className="review-credit"><strong>{author}</strong><span>{sources[source].label}</span></span>
        </li>)}
      </ul>)}
    </div>
  </>;
}
