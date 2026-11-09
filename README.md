# Ek Love Story. Full Filmy.

A mobile-first, scroll-directed Save the Date film, built with Vite, React, JavaScript, CSS, GSAP and ScrollTrigger. No backend, Next.js, or smooth-scrolling library.

## Full wedding invitation

The full invitation lives at `/wedding/` (also accessible as `/wedding`). The original save-the-date stays at `/`. Both are built into the same `dist/` directory and can use the existing Netlify site: build command `npm run build`, publish directory `dist`. A second repository or Netlify project is unnecessary. There is no SPA catch-all redirect requirement; Vite builds a separate HTML entry at `dist/wedding/index.html` so the invitation has its own server-rendered social metadata.

The invitation uses illustrated moonlit courtyard artwork, opening doors, the Laavan soundtrack from `src/music/laavan.mp3` (started only after a tap), the couple’s original photo, family introductions, two event chapters, a live countdown, Google Maps directions, WhatsApp RSVP and a downloadable invitation JPG. Reduced-motion preferences disable the opening and decorative motion. An always-available mobile dock links to event details and RSVP.

Confirmed details live in `src/wedding/invitation.js`: Meenakshi Sharma and Divyam Thapa; engagement on 1 December 2026 and baraat on 2 December 2026, both from 7 PM IST at Gulati Bhawan. The countdown switches to the baraat when the engagement starts, then displays a celebration message when the baraat begins. RSVP opens an editable WhatsApp message to +91 8334907636; nothing is sent automatically.

Custom generated illustrations are stored as compressed WebP assets in `public/wedding/art/`. They depict an imagined wedding setting, not photographs of the venue. The original couple photo is reused without alteration. To regenerate the downloadable card and social sharing image after updating details or artwork, run `npm run invitation:exports`. Family names are drawn from the invitation data; event wording and the exported card layout can be adjusted in `scripts/create-invitation-exports.mjs`.

Run `npm run test:wedding` to verify countdown boundaries and the WhatsApp destination. Set `VITE_SITE_URL` to the public site URL for absolute canonical and sharing-image links; Netlify’s `URL` environment variable is also supported automatically.

## Run

```sh
npm install
npm run dev
```

```sh
npm run build
npm run preview
```

## Personalize

All story content, names, dates and the eight image slots live in `src/data/wedding.js`.

Put original photographs in `public/photos/` and replace a placeholder URL with `/photos/your-photo.jpg`. Unsplash placeholders use responsive widths and gracefully fall back to an analogue-style placeholder if unavailable. The placeholder people are illustrative; they do not depict the named couple.

The soundtrack is the supplied FOREVER MP3 in `src/music/`, referenced by `audio.src` in the wedding config and bundled by Vite. Replace that reference to change the song; an empty source restores the quiet, locally synthesized ambient chord. Audio starts only following a tap, can be muted in the top corner, and pauses while the page is hidden.

Social titles, descriptions and the sharing photo are generated from the same wedding config. `npm run build` creates a standalone static website in `dist/`. Upload that folder to any static web host. For the best WhatsApp preview, set the public site URL when building, for example `VITE_SITE_URL=https://your-domain.com npm run build`. The project has no hosting-provider dependency or authentication gate.

## Experience

Nine connected scenes with a cheeky Bollywood rom-com feel: poster-style opening credits, two scrapbook childhoods, parallel lives carried by paper characters, a camera-snap plot twist, an expanding cinema frame, five kinetic collage titles, a quiet announcement, the leading names, and a cinema-ticket save-the-date. Warm ivory, rani pink, marigold, and green carry through the finale and the small post-credit moment. Playful Hinglish, handwritten notes, taped photos, filmy stickers, and light confetti make the story feel personal and celebratory. Scrolling backwards reverses the story animation. Reduced-motion preferences show a simplified, readable film without pinning or animation.

Google Fonts supplies Bricolage Grotesque for bold poster titles, Kalam for handwritten notes, and DM Sans for supporting text. Cormorant Garamond remains available for legacy serif details; local fallback fonts are included. Photos and fonts are the only external runtime resources. Replace and self-host them for an offline deployment.

Paper cutouts are CSS masks of the existing photographs, with an ivory edge and a light physical shadow. Flowers and sparkles are small inline SVGs; stickers, tape, and confetti are CSS. They need no additional photo slots or runtime image-processing dependency. The camera exposure, collage movement, and confetti are disabled for reduced-motion visitors.
