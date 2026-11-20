'use client';

import { useRef, useState } from 'react';
import { flushSync } from 'react-dom';

export default function GalleryPhotos({ views, index, viewer }) {
  const [active, setActive] = useState(null);
  const dialog = useRef(null);
  const opener = useRef(null);
  const view = views[active];

  function open(event, position) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || !dialog.current.showModal) return;
    event.preventDefault();
    opener.current = event.currentTarget;
    flushSync(() => setActive(position));
    dialog.current.showModal();
  }

  function step(offset) {
    setActive(position => Math.max(0, Math.min(views.length - 1, position + offset)));
  }

  function handleKey(event) {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    step(event.key === 'ArrowLeft' ? -1 : 1);
  }

  return <>
    <section className="gallery-section frame" aria-labelledby="gallery-index">
      <h2 id="gallery-index">{index}</h2>
      <div className="gallery-tiles">
        {views.map(({ src, name, caption, crop }, i) => <figure key={src} data-reveal="photo">
          <a href={src} aria-labelledby={`gallery-photo-${i}`} onClick={event => open(event, i)}>
            <img src={src} alt={caption} style={{ objectPosition: crop }} loading={i < 2 ? undefined : 'lazy'} />
          </a>
          <figcaption>
            <h3 id={`gallery-photo-${i}`}>{name}</h3>
            <p>{caption}</p>
          </figcaption>
        </figure>)}
      </div>
    </section>
    <dialog className="gallery-viewer" ref={dialog} aria-label={viewer.title} onKeyDown={handleKey} onClose={() => {
      setActive(null);
      opener.current?.focus();
    }}>
      {view && <>
        <div className="gallery-viewer-bar">
          <span>{active + 1} / {views.length}</span>
          <button type="button" onClick={() => dialog.current.close()}>{viewer.close}</button>
        </div>
        <figure>
          <div className="gallery-viewer-image"><img key={view.src} src={view.src} alt={view.caption} /></div>
          <figcaption aria-live="polite">
            <h2>{view.name}</h2>
            <p>{view.caption}</p>
          </figcaption>
        </figure>
        <div className="gallery-viewer-controls">
          <button type="button" aria-disabled={active === 0} onClick={() => step(-1)}>{viewer.previous}</button>
          <button type="button" aria-disabled={active === views.length - 1} onClick={() => step(1)}>{viewer.next}</button>
        </div>
      </>}
    </dialog>
  </>;
}