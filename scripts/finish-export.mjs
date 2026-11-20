import { copyFileSync } from 'node:fs';

// Cloudflare Pages looks for a literal 404.html in the nearest directory.
copyFileSync(new URL('../out/en/404/index.html', import.meta.url), new URL('../out/en/404.html', import.meta.url));