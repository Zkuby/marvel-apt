# Marvel apartamentai

Lithuanian and English Next.js website. This project does not modify the existing property website.

## Local preview

Requires Node.js 22 or newer.

```sh
npm ci
npm run dev
```

Open `http://localhost:3000/` (Lithuanian) or `http://localhost:3000/en/` (English). Run `npm test` for date validation, `npm run build` for the static output in `out/`, and `npm run test:export` to verify the exported documents.

## Locale routes

`app/(lt)` and `app/(en)` own their document languages. The homes are `/` and `/en/`; the photo galleries are `/galerija/` and `/en/gallery/`. The language switch keeps visitors on the equivalent home or gallery route. `app/locales.mjs` defines the route pairs.

## Cloudflare Pages

Push this folder as its own repository to GitHub, then import it in Pages. Select the **Next.js (Static HTML Export)** preset, use `npm run build` as the build command and `out` as the output directory. Set `NODE_VERSION=22` in the build environment if needed. No server or secret is required for this version.

Cloudflare Pages uses `out/404.html` for the default Lithuanian error and `out/en/404.html` for missing routes under `/en/`. The build copies the rendered English error page from `out/en/404/index.html` to that fallback filename.

## Reservation demo

`app/reservation.jsx` validates dates and guests with `app/stay.mjs`, then renders a local summary. It does not check inventory, collect personal information, submit a booking, or charge guests. The `setPreview(result)` call is the integration point for a future booking provider. Keep provider credentials out of the static bundle.

The calendar uses Kaunas local dates. It currently marks **demo-only** booked nights for December 4–6 and 18–20, 2026, with a visible demo label in both languages. These are not real reservations. To mark known unavailable nights, edit `blockedDates` in `app/availability.mjs` and rebuild. Each entry is `['YYYY-MM-DD', 'YYYY-MM-DD']`: the first date is the first unavailable night, and the second is the first unblocked night after it. A guest can check out on the first unavailable night. Replace the sample list with confirmed blocks and change `availabilityMode` from `demo` only when using real data. That flag only controls the demo label; it does not connect a provider. Leave the list empty if no blocks are known; unmarked dates still need the host’s confirmation.

## Riverside location section

`app/location.jsx` and `app/location.css` implement the shared location spread on both home routes: authentic panorama, overlapping terrace and house photographs, facts/address, and the existing Google Maps destination. Copy lives in `app/locales.mjs`. The static map uses OpenStreetMap river/street data, not the concept image's illustrative geography, and includes visible attribution. Its raster and overlay points must stay aligned in an uncropped 9:5 box; changing its bounds requires recalculating the label/pin positions. No map SDK or external map request is needed to display it.

## Sources

- [Original property website](https://www.marvelapartamentai.lt/): property details, contacts, and property photographs; their WebPs record exact source URLs in XMP and in adjacent provenance files.
- [OpenStreetMap contributors](https://www.openstreetmap.org/copyright): the static location-map raster, rendered from a November 20, 2026 Overpass data snapshot; its adjacent provenance file records the source and bounds. The map is a geographic illustration, not a walking route or live feed.
- [Airbnb listing](https://www.airbnb.com/rooms/1208412626408508372): 5.0/5 from 14 reviews as shown in the live browser on November 19, 2026.
- [Booking.com listing](https://www.booking.com/hotel/lt/marvel-apartments.lt.html): 10/10 from 27 reviews as shown in the indexed listing. The hero preserves each platform's scale and uses the combined snapshot to say 40+ positive reviews.
- [Google Maps](https://maps.app.goo.gl/DeFLHTQiG99E4xKw9): 4.8/5 in the accessible listing view. It did not expose a review count, so it is not included in the hero total.
- [Instagram](https://www.instagram.com/marvel_apartamentai/) and [Facebook](https://www.facebook.com/p/Marvel-apartamentai-61563980918531/): linked social profiles, not included in the rating totals. Review cards are attributed summaries in both languages, not verbatim quotations. Rating figures are a snapshot maintained in `app/data.mjs`, not fetched live. Counts are platform totals, not a count of distinct guests.
- [Onest](https://github.com/google/fonts/tree/main/ofl/onest): self-hosted Latin and Latin Extended variable WOFF2 subsets for all headings, navigation and body text, with the [SIL Open Font License 1.1](public/fonts/OFL-onest.txt) bundled locally. The site does not request fonts from an external provider.

Confirm photo reuse rights and refresh the figures before publishing.
