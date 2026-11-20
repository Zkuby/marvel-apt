import { Icon } from './icons';
import { sources } from './data.mjs';
import { homeCopy } from './locales.mjs';
import './location.css';

export default function Location({ locale }) {
  const text = homeCopy[locale];
  return <section className="location" id="vieta" aria-labelledby="location-title">
    <div className="location-scene">
      <figure className="location-panorama" data-reveal="photo">
        <img src="/photos/santaka.webp" width="1280" height="853" alt={text.view[1]} loading="lazy" />
      </figure>
      <div className="location-info" data-reveal="text">
        <h2 id="location-title">{text.location}</h2>
        <p>{text.locationIntro}</p>
      </div>
      <figure className="location-house" data-reveal="photo">
        <img src="/photos/namas-small.webp" width="920" height="665" alt={text.heroAlt} loading="lazy" />
      </figure>
      <figure className="location-terrace" data-reveal="photo" data-reveal-order="1">
        <img src="/photos/terasa.webp" width="1000" height="667" alt={text.terrace[1]} loading="lazy" />
      </figure>
      <div className="location-details" data-reveal="group">
        <ul className="location-facts">{text.locationFacts.map(fact => <li key={fact}>{fact}</li>)}</ul>
        <div className="location-contact">
          <address><Icon name="pin" />Marvelės g. 33A-2, Kaunas</address>
          <a href={sources.google.url} className="button button-dark">{text.map} <Icon name="arrow" /></a>
        </div>
      </div>
      <figure className="location-map" data-reveal="photo">
        <a className="location-map-link" href={sources.google.url} aria-label={`${text.map}: Marvel apartamentai`}>
          <img src="/photos/location-map.webp" width="1260" height="700" alt="" loading="lazy" />
          <span className="location-map-label" style={{ left: '60.8357%', top: '31.1887%' }} aria-hidden="true">Neris</span>
          <span className="location-map-label" style={{ left: '57.2994%', top: '84.7403%' }} aria-hidden="true">Nemunas</span>
          <span className="location-map-label" style={{ left: '73.2589%', top: '64.216%' }} aria-hidden="true">{text.oldTown}</span>
          <span className="location-pin" style={{ left: '36.5089%', top: '69.6553%' }} aria-hidden="true"><span>Marvel</span><Icon name="pin" /></span>
        </a>
        <figcaption><a href="https://www.openstreetmap.org/copyright">© OpenStreetMap contributors</a></figcaption>
      </figure>
    </div>
  </section>;
}
