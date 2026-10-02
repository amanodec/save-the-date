import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { wedding } from './src/data/wedding.js';
const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
const title = `${wedding.bride} & ${wedding.groom} — ${wedding.filmTitle}`;
const description = `${wedding.socialDescription} ${wedding.bride} & ${wedding.groom}, ${wedding.dateLong}.`;
const configuredSiteUrl = process.env.VITE_SITE_URL || process.env.URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '');
const siteUrl = configuredSiteUrl.replace(/\/+$/, '');
const sitePath = path => siteUrl ? `${siteUrl}${path}` : path;
export default defineConfig({
  plugins: [react(), {
    name: 'wedding-metadata',
    transformIndexHtml(html) {
      const shareImage = sitePath('/og-card.png');
      return html.replace('<!-- wedding-metadata -->', [
        `<title>${escape(title)}</title>`,
        `<meta name="description" content="${escape(description)}"/>`,
        `<link rel="canonical" href="${escape(sitePath('/'))}"/>`,
        `<meta property="og:type" content="website"/>`,
        `<meta property="og:url" content="${escape(sitePath('/'))}"/>`,
        `<meta property="og:site_name" content="${escape(`${wedding.bride} & ${wedding.groom}`)}"/>`,
        `<meta property="og:title" content="${escape(title)}"/>`,
        `<meta property="og:description" content="${escape(description)}"/>`,
        `<meta property="og:image" content="${escape(shareImage)}"/>`,
        `<meta property="og:image:type" content="image/png"/>`,
        `<meta property="og:image:width" content="1020"/>`,
        `<meta property="og:image:height" content="1541"/>`,
        `<meta property="og:image:alt" content="${escape(`${wedding.bride} & ${wedding.groom} — Save the Date`)}"/>`,
        `<meta name="twitter:card" content="summary_large_image"/>`,
        `<meta name="twitter:title" content="${escape(title)}"/>`,
        `<meta name="twitter:description" content="${escape(description)}"/>`,
        `<meta name="twitter:image" content="${escape(shareImage)}"/>`,
        `<meta name="twitter:image:alt" content="${escape(`${wedding.bride} & ${wedding.groom} — Save the Date`)}"/>`,
      ].join(''));
    }
  }],
  server: { watch: { useFsEvents: false, usePolling: true } },
  build: { outDir: 'dist' }
});
