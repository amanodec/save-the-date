import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { wedding } from './src/data/wedding.js';
import { fileURLToPath } from 'node:url';
const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
const title = `${wedding.bride} & ${wedding.groom} | ${wedding.filmTitle}`;
const description = `${wedding.socialDescription} ${wedding.bride} & ${wedding.groom}, ${wedding.dateLong}.`;
const configuredSiteUrl = process.env.VITE_SITE_URL || process.env.URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '');
const siteUrl = configuredSiteUrl.replace(/\/+$/, '');
const sitePath = path => siteUrl ? `${siteUrl}${path}` : path;
const pageEntries = {
  invitation: fileURLToPath(new URL('./index.html', import.meta.url)),
  savethedate: fileURLToPath(new URL('./savethedate/index.html', import.meta.url)),
};
// Keep old invitation links working and normalize the film's directory URL.
const redirectPages = (request, response, next) => {
  const url = new URL(request.url || '/', 'http://localhost');
  const destination = {
    '/wedding': '/',
    '/wedding/': '/',
    '/wedding/index.html': '/',
    '/savethedate': '/savethedate/',
  }[url.pathname];
  if (destination) {
    response.writeHead(308, { Location: `${destination}${url.search}` });
    response.end();
    return;
  }
  next();
};
export default defineConfig({
  plugins: [react(), {
    name: 'invitation-routes',
    configureServer(server) { server.middlewares.use(redirectPages); },
    configurePreviewServer(server) { server.middlewares.use(redirectPages); },
  }, {
    name: 'wedding-metadata',
    transformIndexHtml(html, context) {
      const isInvitation = context.filename === pageEntries.invitation;
      const pageTitle = isInvitation ? 'Meenakshi & Divyam | You’re invited | 1 & 2 December 2026' : title;
      const pageDescription = isInvitation ? 'With love, the Sharma & Thapa families invite you to celebrate Meenakshi & Divyam. Engagement: 1 December. Baraat: 2 December 2026. Both evenings, 7:00 PM onwards at Gulati Bhawan.' : description;
      const pageUrl = sitePath(isInvitation ? '/' : '/savethedate/');
      const shareImage = sitePath(isInvitation ? '/wedding/og-invitation.jpg?v=2' : '/og-card.jpg');
      const imageAlt = isInvitation ? 'Meenakshi & Divyam | Wedding celebrations, 1 & 2 December 2026, Gulati Bhawan' : `${wedding.bride} & ${wedding.groom} | Save the Date`;
      return html.replace('<!-- wedding-metadata -->', [
        `<title>${escape(pageTitle)}</title>`,
        `<meta name="description" content="${escape(pageDescription)}"/>`,
        `<link rel="canonical" href="${escape(pageUrl)}"/>`,
        `<meta property="og:type" content="website"/>`,
        `<meta property="og:url" content="${escape(pageUrl)}"/>`,
        `<meta property="og:site_name" content="${escape(`${wedding.bride} & ${wedding.groom}`)}"/>`,
        `<meta property="og:title" content="${escape(pageTitle)}"/>`,
        `<meta property="og:description" content="${escape(pageDescription)}"/>`,
        `<meta property="og:image" content="${escape(shareImage)}"/>`,
        `<meta property="og:image:type" content="image/jpeg"/>`,
        `<meta property="og:image:width" content="${isInvitation ? 1200 : 1020}"/>`,
        `<meta property="og:image:height" content="${isInvitation ? 630 : 1541}"/>`,
        `<meta property="og:image:alt" content="${escape(imageAlt)}"/>`,
        `<meta name="twitter:card" content="summary_large_image"/>`,
        `<meta name="twitter:title" content="${escape(pageTitle)}"/>`,
        `<meta name="twitter:description" content="${escape(pageDescription)}"/>`,
        `<meta name="twitter:image" content="${escape(shareImage)}"/>`,
        `<meta name="twitter:image:alt" content="${escape(imageAlt)}"/>`,
      ].join(''));
    }
  }],
  server: { watch: { useFsEvents: false, usePolling: true } },
  build: { outDir: 'dist', rollupOptions: { input: pageEntries } }
});
