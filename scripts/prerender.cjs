/* Static-render the built SPA so each route ships its own <head> tags
 * and visible content for crawlers that don't execute JS (social link
 * previews, some bots). Vite stays a pure CSR build — this is a
 * post-build snapshot step, not SSR.
 */
const { chromium } = require('playwright');
const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');

const DIST = path.resolve(__dirname, '..', 'dist');
const PREVIEW_PORT = 4321;
const PREVIEW_BASE = `http://localhost:${PREVIEW_PORT}`;
const SITEMAP_URL = process.env.SITEMAP_URL || 'http://127.0.0.1:8000/sitemap.xml';
const SITE_URL = process.env.SITE_URL || 'https://engineerstechbd.com';

function fetchText(url) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? https : http;
    lib.get(url, (res) => {
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function getRoutePaths() {
  const xml = await fetchText(SITEMAP_URL);
  const locs = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
  const paths = locs.map((l) => l.replace(SITE_URL, '') || '/');
  return [...new Set(paths)];
}

function waitForServer(url, timeoutMs = 15000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const tick = () => {
      http
        .get(url, (res) => {
          res.resume();
          resolve();
        })
        .on('error', () => {
          if (Date.now() - start > timeoutMs) reject(new Error('preview server did not start'));
          else setTimeout(tick, 300);
        });
    };
    tick();
  });
}

function outputFileFor(routePath) {
  if (routePath === '/' || routePath === '') return path.join(DIST, 'index.html');
  const clean = routePath.replace(/^\//, '').replace(/\/$/, '');
  return path.join(DIST, clean, 'index.html');
}

async function main() {
  console.log('[prerender] cleaning dist...');
  fs.rmSync(DIST, { recursive: true, force: true });

  console.log('[prerender] building app...');
  execSync('npx vite build', { cwd: path.resolve(__dirname, '..'), stdio: 'inherit' });

  console.log('[prerender] fetching route list from', SITEMAP_URL);
  const routes = await getRoutePaths();
  console.log(`[prerender] ${routes.length} routes to render`);

  console.log('[prerender] starting preview server...');
  let previewFailed = false;
  const preview = spawn(
    'npx',
    ['vite', 'preview', '--port', String(PREVIEW_PORT), '--strictPort'],
    { cwd: path.resolve(__dirname, '..'), stdio: 'pipe', shell: true }
  );
  preview.stderr.on('data', (d) => {
    process.stderr.write(d);
    if (d.toString().includes('EADDRINUSE') || d.toString().includes('already in use')) {
      previewFailed = true;
    }
  });
  preview.on('exit', (code) => {
    if (code !== null && code !== 0) previewFailed = true;
  });

  try {
    await waitForServer(PREVIEW_BASE);
    if (previewFailed) {
      throw new Error('preview server failed to bind (port in use or crashed) — aborting, not rendering against a stale server');
    }

    const browser = await chromium.launch();
    const page = await browser.newPage();

    for (const routePath of routes) {
      const url = `${PREVIEW_BASE}${routePath}`;
      try {
        await page.goto(url, { waitUntil: 'networkidle', timeout: 20000 });
        await page.waitForTimeout(150); // settle post-hydration head writes
        const html = await page.content();
        const outFile = outputFileFor(routePath);
        fs.mkdirSync(path.dirname(outFile), { recursive: true });
        fs.writeFileSync(outFile, html);
        console.log(`[prerender] ${routePath} -> ${path.relative(DIST, outFile)}`);
      } catch (err) {
        console.warn(`[prerender] FAILED ${routePath}: ${err.message}`);
      }
    }

    await browser.close();
  } finally {
    preview.kill();
  }

  console.log('[prerender] done.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
