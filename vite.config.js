import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { wedding, imageUrl } from './src/data/wedding.js';
const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
const title = `${wedding.bride} & ${wedding.groom} — ${wedding.filmTitle}`;
const description = `${wedding.socialDescription} ${wedding.bride} & ${wedding.groom}, ${wedding.dateLong}.`;
export default defineConfig({
  plugins: [react(), {
    name: 'wedding-metadata',
    transformIndexHtml(html) {
      return html.replace('<!-- wedding-metadata -->', `<title>${escape(title)}</title><meta name="description" content="${escape(description)}"/><meta property="og:type" content="website"/><meta property="og:title" content="${escape(title)}"/><meta property="og:description" content="${escape(description)}"/><meta property="og:image" content="${escape(imageUrl(wedding.photos.coupleHero, 1200))}"/><meta name="twitter:card" content="summary_large_image"/>`);
    }
  }],
  server: { watch: { useFsEvents: false, usePolling: true } },
  build: { outDir: 'dist' }
});
