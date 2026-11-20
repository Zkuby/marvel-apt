import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';
import { paths } from '../app/locales.mjs';

const path = file => new URL(`../out/${file}`, import.meta.url);
const read = file => readFileSync(path(file), 'utf8');
const markup = file => read(file).replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');

for (const [file, lang, title, alternate, review] of [
  ['index.html', 'lt', 'Ramybė prie<br/>santakos', '/en/', 'Atrinktų atsiliepimų santraukos'],
  ['en/index.html', 'en', 'Quiet by the<br/>confluence', '/', 'Summaries of selected reviews'],
]) {
  test(`${lang} home is static and links to its counterpart`, () => {
    assert.ok(existsSync(path(file)), `Missing static ${file}`);
    const html = markup(file);
    assert.ok(html.includes(`<html lang="${lang}">`), `Incorrect document language in ${file}`);
    assert.ok(html.includes(title) && html.includes(review), `Missing localized home copy in ${file}`);
    assert.ok(new RegExp(`<a[^>]+href="${alternate}"[^>]*>[A-Z]{2}</a>`).test(html), `Missing language link in ${file}`);
    for (const id of ['turinys', 'erdves', 'atsiliepimai', 'vieta', 'rezervacija', 'kontaktai']) {
      assert.ok(html.includes(`id="${id}"`), `Missing #${id} in ${file}`);
    }
    const hero = html.match(/<section class="hero"[^>]*>[\s\S]*?<\/section>/)?.[0];
    assert.ok(hero?.includes('src="/photos/namas.webp"'), 'The opening façade photo must be available before hydration');
    assert.match(hero, /Airbnb.*5 \/ 5.*Booking\.com.*10 \/ 10/s);
    assert.ok(hero.includes(lang === 'lt' ? 'Daugiau nei 40 teigiamų atsiliepimų' : '40+ positive reviews'), 'Localized positive-review proof');
    assert.doesNotMatch(hero, /<button\b/, 'Hero remains an automatic photo backdrop without controls');
    assert.equal((html.match(/<li class="review">/g) || []).length, 16, 'Eight attributed summaries plus the ribbon loop');
  });
}

for (const [file, lang, heading, distance, action] of [
  ['index.html', 'lt', 'Upės ritmu. Miesto kaimynystėje.', 'Apie 1,5 km iki senamiesčio', 'Atidaryti žemėlapį'],
  ['en/index.html', 'en', 'By the river. Close to the city.', 'About 1.5 km to the Old Town', 'Open map'],
]) {
  test(`${lang} location exports the approved riverside composition without JavaScript`, () => {
    const location = markup(file).match(/<section[^>]+id="vieta"[\s\S]*?<\/section>/)?.[0] ?? '';
    assert.ok(location.includes(heading), 'Approved location heading is missing');
    for (const photo of ['santaka', 'terasa', 'namas-small', 'location-map']) {
      assert.ok(location.includes(`/photos/${photo}.webp`), `Missing location image: ${photo}`);
    }
    assert.ok(location.includes(distance) && location.includes('Marvelės g. 33A-2, Kaunas'));
    assert.match(location, new RegExp(`<a[^>]+href="https://maps\\.app\\.goo\\.gl/DeFLHTQiG99E4xKw9"[^>]*>${action}`));
    assert.ok(location.includes('OpenStreetMap'), 'Map attribution is missing');
  });
}

for (const [lang, other] of [['lt', 'en'], ['en', 'lt']]) {
  test(`${lang} gallery is exported and linked in both languages`, () => {
    const route = paths.gallery[lang];
    const file = `${route.slice(1)}index.html`;
    assert.ok(existsSync(path(file)), `Missing static gallery: ${route}`);
    const html = markup(file);
    const home = markup(`${paths.home[lang].slice(1)}index.html`);
    assert.ok(html.includes(`<html lang="${lang}">`));
    assert.ok(html.includes(`href="${paths.gallery[other]}"`), 'Gallery language switch leaves the gallery');
    assert.ok(html.includes(`href="${paths.home[lang]}#rezervacija"`), 'Gallery dates link is missing or has the wrong language');
    assert.ok(home.includes(`href="${route}"`), 'Home does not link to the gallery');
    const main = html.match(/<main\b[^>]*>[\s\S]*?<\/main>/)?.[0] ?? '';
    const photos = [...new Set([...main.matchAll(/<img\b[^>]*src="\/photos\/([^"/]+)\.webp"/g)].map(match => match[1]))];
    assert.match(photos.join(' '), /^svetaine virtuve miegamasis vonia (?:kiemo-)?terasa (?:terasa )?namas(?:-small)?$/, 'Gallery photos are present without JavaScript and ordered from shared interiors to outdoor views');
    assert.doesNotMatch(main, /class="[^"]*\bwalk-point\b/, 'Gallery must not render walk-through hotspots');
  });
}

test('Cloudflare gets localized fallback documents', () => {
  assert.match(markup('404.html'), /<html lang="lt">.*Puslapis nerastas/s);
  assert.ok(existsSync(path('en/404.html')), 'Missing static English 404');
  assert.match(markup('en/404.html'), /<html lang="en">.*Page not found/s);
  assert.ok(markup('en/404.html').includes('href="/en/"'));
});

test('the display font is bundled, including the Lithuanian subset', () => {
  const css = read('fonts.css');
  assert.match(css, /Onest/);
  assert.doesNotMatch(css, /Source Serif|Manrope|Bodoni|https?:/i);
  for (const file of ['onest-latin.woff2', 'onest-latin-ext.woff2']) {
    assert.equal(readFileSync(path(`fonts/${file}`)).subarray(0, 4).toString(), 'wOF2');
  }
  assert.match(read('fonts/OFL-onest.txt'), /SIL OPEN FONT LICENSE Version 1\.1/i);
});
