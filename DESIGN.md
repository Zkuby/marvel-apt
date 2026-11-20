---
name: Marvel apartamentai
description: Daylight, real property photography, and a clear path to previewing a stay in Kaunas.
colors:
  pine: "#253c36"
  pine-hover: "#3e564a"
  brass: "#c8b28b"
  ink: "#26372f"
  muted: "#5b6a60"
  paper: "#f8f9f6"
  limestone: "#ecefe8"
  line: "#d8ded5"
  white: "#ffffff"
  footer: "#e8ece3"
typography:
  display:
    fontFamily: "Onest, Arial, sans-serif"
    fontSize: "clamp(3.75rem, 7.4vw, 6rem)"
    fontWeight: 350
    lineHeight: 1.04
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Onest, Arial, sans-serif"
    fontSize: "clamp(2.25rem, 4.2vw, 4rem)"
    fontWeight: 400
    lineHeight: 1.12
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Onest, Arial, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.65
rounded:
  control: "4px"
  photo: "3px"
  round: "50%"
spacing:
  gutter: "clamp(1.25rem, 5vw, 5rem)"
  nav-gap: "clamp(.75rem, 2vw, 2rem)"
  ribbon-gap: "2rem"
components:
  button-primary:
    backgroundColor: "{colors.pine}"
    textColor: "{colors.white}"
    rounded: "{rounded.control}"
    padding: "0.7rem 1.75rem"
  button-primary-hover:
    backgroundColor: "{colors.pine-hover}"
  date-field:
    backgroundColor: "transparent"
    textColor: "{colors.pine}"
    rounded: "0px"
  date-strip:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.control}"
  masthead:
    backgroundColor: "{colors.pine}"
    textColor: "{colors.white}"
  photo-viewer:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
  guest-ribbon:
    backgroundColor: "{colors.pine}"
    textColor: "{colors.white}"
---

# Design System: Marvel apartamentai

## Overview

**Creative North Star: "Daylight house"**

Show the real house before asking visitors to act. The façade, natural timber, and light in the photographs set the tone; pale surfaces, light sans-serif type, and fine rules leave room for the property to speak for itself.

**Key Characteristics:**
- Full-width, façade-first photography with copy and review proof held steady over the image.
- One deep-pine masthead row and one white date strip joined to the photograph.
- Ordered photography, attributed guest notes, and a light footer.

## Colors

- **Pine** is the main action color and the masthead, mobile-menu and guest-section ground. White masthead links and a pale green inactive locale retain contrast. The lighter pine is the date action's hover state; brass is reserved for small review-star accents.
- **Paper** is the page and viewer ground; **white** lifts the date strip and calendar out of it. **Limestone** supports calendar ranges and photo surfaces; the footer is a pale green-grey.
- **Ink** is for reading; **muted** is for secondary copy and captions; **line** divides rather than boxes. Guest notes use lighter attribution and translucent rules on pine.

## Typography

Use Onest for display, wordmark, body, and controls. It is self-hosted with Latin and Latin Extended WOFF2 subsets and `font-display: swap`; Arial and sans-serif are the fallbacks. No external font request is needed.

The hero uses weight 350 and an intentional two-line headline in both locales; at ≤700px it switches to `clamp(2.65rem, 11.5vw, 4.5rem)`. Its intro stays 1.125rem, including narrow screens. Section headings use weight 400. Body copy is 1.125rem. Navigation, supporting copy, captions, date values, and control labels are at least 1rem, including narrow screens; the small wordmark subline is a logo exception. Guest notes use 1.125rem at weight 400. Keep LT diacritics and give EN copy room to wrap.

## Layout

- Use the 1280px frame and fluid gutters for editorial content; let the hero photograph and riverside location spread bleed. On narrow hero screens the copy stays on the photo, with a bottom-weighted scrim rather than a separate panel.
- Keep the sticky masthead one row: brand left, links centered, LT/EN right. At ≤880px its minimum height drops from 4.75rem to 4rem and the date label shortens; at ≤560px the section links move into a disclosure overlay. Anchor offsets clear the sticky row.
- The date strip overlaps the photo by 40px (30px at ≤560px). Above 820px the fields, guest stepper, and action share a row; at ≤820px the dates span row one and the stepper and action share row two.
- Keep the spaces overview compact through spacing rather than smaller text: section padding is `clamp(3rem, 6vw, 5rem)`, with tighter introduction/fact/link gaps. Above 700px, cap its existing asymmetric photo grid at `clamp(20rem, 48svh, 29rem)` so heading, facts, photographs and the gallery link can share the usable desktop viewport below the sticky masthead. Narrow screens keep the natural photographic stack and readable captions.
- At ≤1000px, stack the review heading above its platform proof. At ≤700px, stack the section intro; let the home gallery's lead image span both columns. The dedicated gallery alternates 7/5 then 5/7 spans on a 12-column grid without reordering the images; at ≤540px it becomes one column.
- The location spread follows the approved Riverside editorial composition at 1672:941: panorama above a pale contact band, heading at upper left, a smaller rear façade frame, and a larger terrace frame bridging the photograph and band. Above 1000px, cap the scene to the viewport below the sticky masthead and anchor offset, with a 34rem minimum for legibility; size the overlapping photos and map against that height budget while retaining the full-width panorama. Very short windows may scroll. At ≤1000px, reflow the same content into a photographic stack, followed by facts, address/action, and the map; do not shrink reading text to force the desktop arrangement.

## Elevation & Depth

Photo light and localized scrims supply most of the depth. Use soft shadows only where surfaces overlap: the date strip, the calendar popup, the open mobile menu, and the location spread's white photo mats. The native photo viewer uses a dark backdrop rather than a card shadow.

## Shapes

Keep photos and controls close to square: 3px photo corners and 4px for the date strip, popup, primary action, and viewer. Date fields are square and transparent with a shared rule; guest notes are separated by vertical rules, not individual cards. Keep round controls for review transport and the guest stepper.

## Components

- **Masthead:** Use the same opaque pine accent on both homes, both galleries and the mobile disclosure, with white links and focus outlines. Text links underline on hover or current page; the language switch marks the active locale with a short rule. The mobile disclosure overlays rather than growing the row; Escape closes it and returns focus to its summary. Keep the skip link and 44px link targets.
- **Hero and proof:** Open on the real façade. Group the two-line headline and intro, then separate the lower proof band with a quiet rule. Put five brass stars beside the localized review count (stacked at ≤700px), native Airbnb and Booking.com scores underneath, and the opaque pine location link at the band's far edge above 700px. The shared controller stages headline, intro, proof and address once without animating the façade. After that entrance, copy and proof stay fixed while only the photograph dissolves (550ms). Auto-advance waits 5.5s and requires both outgoing and incoming images to decode, an in-view hero, and a visible tab. Keep the outgoing image opaque beneath the incoming photo and its own scrim. Keyboard focus pauses playback; no pause or arrow controls appear in the hero. Reduced motion and no JavaScript show a still façade with readable copy. The localized “40+ positive reviews” proof uses the two source snapshots without blending their scales; the reviews section also shows Google Maps without adding it to that count.
- **Date strip:** Two button fields share one localized DayPicker range popup. Check-in leads to check-out; Escape or completed selection closes the popup and returns focus. Validate against Kaunas-local dates and any configured blocked nights, allowing check-out on a blocked date if no occupied night is blocked. Past unselected days use .45 opacity and a not-allowed cursor; selected dates stay fully opaque. Demo booked nights stay legible with a strike-through and an explicit demo legend; the permitted checkout boundary uses a dashed outline. Keep today, blocked nights, checkout-only boundaries, and keyboard focus distinct. Keep 1–8 guests, field-level errors, a polite local result, and the no-script host-contact fallback. Keep the white strip compact through spacing and 44px controls, not smaller type. Placeholder blocks live in `app/availability.mjs`; each end date is the first unblocked night. The pine action previews dates; it does not check live availability, take payment, or submit a reservation.
- **Photo gallery and viewer:** Keep captions and the original photo links. Enhance them with a native modal dialog showing a contained image, position, caption, close, and bounded previous/next. Support arrow keys, native Escape, and focus return to the photo link. The tile zoom and short viewer fade are opt-in via no-preference; no autoplay.
- **Guest ribbon:** Place attributed summaries on transparent notes against pine. Keep touch scrolling, keyboard arrows, and previous/pause/next controls. Show five brass star icons per note. Drift runs at 16px/s while visible and continues on pointer hover; keyboard focus pauses it, and pointer interaction or manual stepping stops playback. At ≤560px, one full note occupies the rail's content width, without a clipped next-note sliver; wider screens retain the peek. Reduced motion defaults to stopped and manual steps are immediate.
- **Supporting motion:** Where supported, navigation uses a 240ms crossfade without animating the masthead. An early capability-gated marker hides eligible content before first paint; the single shared controller reveals it once from zero opacity, including stagger delays. Individual photos (900ms) combine a soft top-edge opening and a 22px entrance. Hero copy, related text, facts, platform proof and footer details enter in 650ms with 90ms sibling staggering. Focus exposes pending content and cancels its running entrance. Reduced motion, no JavaScript and missing APIs retain visible static content. If hydration misses the 1.8s startup deadline, show the content without restaging it later. Menu, link and preview feedback remain brief.
- **Riverside location:** Retain Onest and authentic panorama, façade and terrace photos, not architectural changes from the generated concept. Its local heading is `clamp(2.25rem, 4.07vw, 4.25rem)`; the two straight-cornered photo mats use `clamp(4.5px, .45vw, 7.5px)` white borders, 25% thinner than their original formula, and an offset soft shadow. Only the panorama receives `sepia(.11) saturate(1.04)` for subtle warmth; keep the foreground photos and map unfiltered. Use a stronger pale sky fade on narrow layouts to protect the 18px intro. Keep the approximate Old Town distance qualified. The small north-up OSM map is capped at 30% of the desktop spread width and scales with the scene's height budget, with a 300px floor. It stays uncropped at 9:5 so the property pin and geographic labels remain aligned; show a visible 16px OpenStreetMap credit with a 44px link target, unobscured by the photo mats. Both map actions retain the existing property destination and work without JavaScript.

## Do's and Don'ts

- Do use authentic property photos, informative captions, and visible keyboard focus.
- Do keep LT and EN controls equivalent and preserve no-script paths to photos and host contact.
- Don't move narrow hero copy onto a separate panel or darken the whole façade just to back the address link.
- Don't describe the date preview as a booking or the summed source counts as unique guests.
