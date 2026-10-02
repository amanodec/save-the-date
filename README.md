# Ek Love Story. Full Filmy.

A mobile-first, scroll-directed Save the Date film, built with Vite, React, JavaScript, CSS, GSAP and ScrollTrigger. No backend, Next.js, or smooth-scrolling library.

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
