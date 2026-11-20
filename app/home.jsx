import { Icon } from './icons';
import { sources } from './data.mjs';
import { homeCopy, paths } from './locales.mjs';
import Hero from './hero';
import Reservation from './reservation';
import ReviewRibbon from './reviews';
import Location from './location';
import { SiteHeader, SiteFooter } from './site';

export default function Home({ locale }) {
  const text = homeCopy[locale];
  const score = rating => locale === 'en' ? rating.replace(',', '.') : rating;
  return <>
    <SiteHeader locale={locale} />
    <main id="turinys" tabIndex={-1}>
      <Hero locale={locale} />
      <Reservation locale={locale} />
      <section className="spaces frame" id="erdves" aria-labelledby="spaces-title">
        <div className="section-intro" data-reveal="group">
          <h2 id="spaces-title">{text.spaces}</h2>
          <p>{text.spacesIntro}</p>
        </div>
        <ul className="facts">{text.facts.map(([value, label], index) => <li key={label} data-reveal="fact" data-reveal-order={index}><strong>{value}</strong> {label}</li>)}</ul>
        <div className="gallery">
          <figure className="living" data-reveal="photo"><img src="/photos/svetaine.webp" width="1440" height="1115" alt={text.living[1]} loading="lazy" /><figcaption>{text.living[0]} <span>{text.living[2]}</span></figcaption></figure>
          <figure data-reveal="photo" data-reveal-order="1"><img src="/photos/miegamasis.webp" width="950" height="581" alt={text.bedroom[1]} loading="lazy" /><figcaption>{text.bedroom[0]}</figcaption></figure>
          <figure data-reveal="photo"><img src="/photos/terasa.webp" width="1000" height="667" alt={text.terrace[1]} loading="lazy" /><figcaption>{text.terrace[0]}</figcaption></figure>
        </div>
        <a className="text-link spaces-gallery-link" href={paths.gallery[locale]}>{locale === 'lt' ? 'Peržiūrėti nuotraukų galeriją' : 'Explore the photo gallery'} <Icon name="arrow" /></a>
      </section>
      <section className="reviews" id="atsiliepimai" aria-labelledby="reviews-title">
        <div className="frame review-head" data-reveal="group">
          <h2 id="reviews-title">{text.reviews}</h2>
          <ul className="sources" aria-label={text.platformRatings}>
            {Object.values(sources).map(({ label, rating, count, url }) => <li key={label}><a href={url}><span>{label} <Icon name="external" /></span><strong>{score(rating)}</strong>{count && <small>{text.reviewCount} {count}</small>}</a></li>)}
          </ul>
        </div>
        <ReviewRibbon locale={locale} />
      </section>
      <Location locale={locale} />
    </main>
    <SiteFooter locale={locale} />
  </>;
}
