# A Film Years in the Making

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

Add licensed background music to `public/audio/` and set `audio.src` to `/audio/score.mp3`. Until then, opting into sound starts a quiet, locally synthesized ambient chord. Audio starts only following a tap, can be muted in the top corner, and pauses while the page is hidden.

Social titles, descriptions and the sharing photo are generated from the same wedding config. `scripts/build-worker.js` adds a small optional Cloudflare-compatible hosting wrapper; the core site is a normal Vite static app in `dist/client`.

## Experience

Nine connected scenes: opening credits, her childhood, his childhood, parallel lives, the meeting, an expanding cinema frame, trailer titles, names, and the release date. A small post-credit moment closes the film. Scrolling backwards reverses the story animation. Reduced-motion preferences show a simplified, readable film without pinning or animation.

Google Fonts supplies Cormorant Garamond and DM Sans; local fallback fonts are included. Photos and fonts are the only external runtime resources. Replace and self-host them for an offline deployment.
