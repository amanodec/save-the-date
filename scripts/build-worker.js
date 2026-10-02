import { mkdir, writeFile } from 'node:fs/promises';
await mkdir('dist/server', { recursive: true });
await writeFile('dist/server/index.js', `export default { async fetch(request, env) { return env.ASSETS.fetch(request); } };`);
await writeFile('dist/wrangler.json', JSON.stringify({name:'a-film-years-in-the-making',main:'server/index.js',compatibility_date:'2026-01-01',assets:{directory:'./client',binding:'ASSETS',not_found_handling:'single-page-application'}},null,2));
