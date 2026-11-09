import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import config from '../vite.config.js';

const routes = config.plugins.find(plugin => plugin.name === 'invitation-routes');
const metadata = config.plugins.find(plugin => plugin.name === 'wedding-metadata');

test('homepage loads the wedding and the archive loads the save-the-date film', async () => {
  const home = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  const archive = await readFile(new URL('../savethedate/index.html', import.meta.url), 'utf8');
  assert(home.includes('src="/src/wedding/main.jsx"'));
  assert(archive.includes('src="/src/main.jsx"'));
  const invitation = await readFile(new URL('../src/wedding/WeddingInvite.jsx', import.meta.url), 'utf8');
  assert(invitation.includes('href="/savethedate/"'));
});

test('each page gets its own canonical URL and social preview', () => {
  for (const [filename, path, title, image] of [
    [config.build.rollupOptions.input.invitation, '/', 'You’re invited', '/wedding/og-invitation.jpg?v=2'],
    [config.build.rollupOptions.input.savethedate, '/savethedate/', 'Ek love story.', '/og-card.jpg'],
  ]) {
    const html = metadata.transformIndexHtml('<!-- wedding-metadata -->', { filename });
    assert(html.includes(title));
    const canonical = html.match(/rel="canonical" href="([^"]+)"/)[1];
    assert.equal(new URL(canonical, 'https://example.test').pathname, path);
    const shareImage = html.match(/property="og:image" content="([^"]+)"/)[1];
    const imageUrl = new URL(shareImage, 'https://example.test');
    assert.equal(imageUrl.pathname + imageUrl.search, image);
  }
});

test('development and preview keep old wedding links and query parameters working', () => {
  for (const hook of ['configureServer', 'configurePreviewServer']) {
    let middleware;
    routes[hook]({ middlewares: { use(fn) { middleware = fn; } } });
    for (const [url, expected] of [
      ['/wedding', '/'], ['/wedding/', '/'], ['/wedding/index.html', '/'],
      ['/wedding?guest=family', '/?guest=family'], ['/savethedate', '/savethedate/'],
      ['/savethedate?guest=family', '/savethedate/?guest=family'],
    ]) {
      let ended = false;
      middleware({ url }, {
        writeHead(status, headers) {
          assert.equal(status, 308);
          assert.equal(headers.Location, expected);
        },
        end() { ended = true; },
      }, () => assert.fail(`Unexpected pass-through for ${url}`));
      assert(ended);
    }
    for (const url of ['/', '/savethedate/', '/wedding/art/courtyard.webp', '/wedding/og-invitation.jpg?v=2']) {
      let passed = false;
      middleware({ url }, { writeHead() { assert.fail(`Unexpected redirect for ${url}`); } }, () => { passed = true; });
      assert(passed);
    }
  }
});

test('Netlify redirects old invitation links without redirecting artwork', async () => {
  const redirects = await readFile(new URL('../public/_redirects', import.meta.url), 'utf8');
  const rules = redirects.trim().split('\n').map(line => line.trim().split(/\s+/));
  assert.deepEqual(rules, [
    ['/wedding', '/', '301'],
    ['/wedding/', '/', '301'],
    ['/wedding/index.html', '/', '301'],
    ['/savethedate', '/savethedate/', '301'],
  ]);
});
