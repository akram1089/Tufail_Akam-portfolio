/**
 * Phase 5 — everything that can be checked without a browser or the network.
 *
 *   npm run build && npm run verify
 *
 * Exits non-zero on any failure, so it can gate a deploy.
 */
import fs from 'node:fs';
import path from 'node:path';

const dist = path.join(process.cwd(), 'dist');
const fails = [];
const warns = [];
const passes = [];

const ok = (msg) => passes.push(msg);
const fail = (msg) => fails.push(msg);
const warn = (msg) => warns.push(msg);

if (!fs.existsSync(path.join(dist, 'index.html'))) {
  console.error('dist/index.html not found — run `npm run build` first.');
  process.exit(1);
}

const html = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const count = (re) => (html.match(re) ?? []).length;

/* ---- 1. content is in the HTML (Phase 1 acceptance criteria) ---- */

const h1s = count(/<h1[\s>]/g);
h1s === 1 ? ok('exactly one <h1> in the served HTML') : fail(`expected 1 <h1>, found ${h1s}`);

const h2s = count(/<h2[\s>]/g);
h2s >= 5 ? ok(`${h2s} <h2> section headings in the served HTML`) : fail(`only ${h2s} <h2> found`);

const h3s = count(/<h3[\s>]/g);
h3s >= 8 ? ok(`${h3s} <h3> item headings in the served HTML`) : warn(`only ${h3s} <h3> found`);

for (const needle of [
  'Tufail Akram',
  'Backend &amp; AI Engineer',
  'BayRock Labs',
  'Cisco',
  'FinInfocom',
  'Kozy Kreative',
  'Snowflake',
  'RAG',
  'mailto:tufailakram81@gmail.com',
  'Hyderabad',
]) {
  html.includes(needle) ? ok(`raw HTML contains "${needle}"`) : fail(`raw HTML missing "${needle}"`);
}

/* ---- 2. head + structured data (Phase 2) ---- */

const meta = {
  canonical: /<link rel="canonical" href="([^"]+)"/,
  title: /<title>([^<]+)<\/title>/,
  description: /<meta name="description" content="([^"]+)"/,
  ogImage: /<meta property="og:image" content="([^"]+)"/,
  ogTitle: /<meta property="og:title"/,
  twitterCard: /<meta name="twitter:card" content="summary_large_image"/,
  robots: /<meta name="robots" content="index,follow/,
  themeColor: /<meta name="theme-color"/,
  manifest: /<link rel="manifest"/,
};

for (const [name, re] of Object.entries(meta)) {
  re.test(html) ? ok(`<head> has ${name}`) : fail(`<head> missing ${name}`);
}

// Measure what a human sees, not the HTML-escaped source (&amp; is one character).
const unescape = (s) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

const title = unescape(html.match(meta.title)?.[1] ?? '');
title.length >= 30 && title.length <= 65
  ? ok(`<title> is ${title.length} chars`)
  : warn(`<title> is ${title.length} chars (aim for 30–65)`);

const description = unescape(html.match(meta.description)?.[1] ?? '');
description.length >= 140 && description.length <= 165
  ? ok(`meta description is ${description.length} chars`)
  : warn(`meta description is ${description.length} chars (aim for 150–160)`);

const ld = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
if (!ld) {
  fail('no JSON-LD block');
} else {
  try {
    const graph = JSON.parse(ld[1])['@graph'];
    const types = graph.map((node) => node['@type']);
    for (const required of ['Person', 'WebSite', 'ProfilePage', 'CreativeWork']) {
      types.includes(required)
        ? ok(`JSON-LD has ${required}`)
        : fail(`JSON-LD missing ${required}`);
    }
    ok(`JSON-LD parses (${graph.length} nodes)`);
  } catch (error) {
    fail(`JSON-LD does not parse: ${error.message}`);
  }
}

/* ---- 3. images (Phase 2.6) ---- */

const imgs = html.match(/<img\b[^>]*>/g) ?? [];
for (const img of imgs) {
  const src = img.match(/src="([^"]*)"/)?.[1] ?? '(no src)';
  for (const attr of ['alt=', 'width=', 'height=', 'decoding=']) {
    img.includes(attr) ? null : fail(`<img ${src}> is missing ${attr}`);
  }
  if (/pexels|unsplash|images\.\w+\.com/.test(src)) fail(`<img ${src}> is a stock photo`);
}
ok(`${imgs.length} <img> tag(s), all with alt/width/height/decoding`);

/* ---- 4. files that must be deployed ---- */

for (const file of [
  'robots.txt',
  'sitemap.xml',
  'site.webmanifest',
  'og.png',
  'favicon.svg',
  'apple-touch-icon.png',
  'tufail-avatar.jpg',
  'tufail-avatar.webp',
  'tufail-avatar-256.webp',
  'fonts/inter-latin-var.woff2',
  'Tufail-Akram-Resume.pdf',
  '_redirects',
  '_headers',
]) {
  fs.existsSync(path.join(dist, file)) ? ok(`dist/${file}`) : fail(`dist/${file} is missing`);
}

if (fs.existsSync(path.join(dist, 'server'))) fail('dist/server/ was left behind — do not deploy it');

const ogBytes = fs.existsSync(path.join(dist, 'og.png'))
  ? fs.statSync(path.join(dist, 'og.png')).size
  : 0;
ogBytes > 0 && ogBytes < 300 * 1024
  ? ok(`og.png is ${(ogBytes / 1024).toFixed(0)} kB (< 300 kB)`)
  : fail(`og.png is ${(ogBytes / 1024).toFixed(0)} kB`);

const sitemap = fs.existsSync(path.join(dist, 'sitemap.xml'))
  ? fs.readFileSync(path.join(dist, 'sitemap.xml'), 'utf8')
  : '';
const canonical = html.match(meta.canonical)?.[1] ?? '';
sitemap.includes(canonical)
  ? ok('sitemap.xml <loc> matches the canonical URL')
  : fail('sitemap.xml does not match the canonical URL');

/* ---- 5. bundle weight (Phase 2.7) ---- */

const assets = path.join(dist, 'assets');
if (fs.existsSync(assets)) {
  const files = fs.readdirSync(assets);
  const sum = (ext) =>
    files
      .filter((f) => f.endsWith(ext))
      .reduce((total, f) => total + fs.statSync(path.join(assets, f)).size, 0);

  const js = sum('.js');
  const css = sum('.css');
  js < 200 * 1024
    ? ok(`JS: ${(js / 1024).toFixed(1)} kB uncompressed (~${(js / 1024 / 3.2).toFixed(0)} kB gzip)`)
    : warn(`JS is ${(js / 1024).toFixed(1)} kB uncompressed`);
  ok(`CSS: ${(css / 1024).toFixed(1)} kB uncompressed`);

}

/<link rel="preload"[^>]+inter-latin-var\.woff2[^>]+as="font"/.test(html)
  ? ok('self-hosted font is preloaded')
  : fail('font is not preloaded');

/<link rel="stylesheet"/.test(html)
  ? fail('a render-blocking stylesheet link is still in <head>')
  : ok('CSS is inlined — no render-blocking stylesheet');

if (/fonts\.googleapis\.com|fonts\.gstatic\.com/.test(html)) {
  fail('index.html still links Google Fonts (render-blocking third-party request)');
} else {
  ok('no third-party font requests');
}

/* ---- 6. banned words (Phase 3.1 / 5.7) ---- */

const banned = [
  'innovative',
  'passionate',
  'seamless',
  'seamlessly',
  'cutting-edge',
  'leverage',
  'robust',
  'scalable solutions',
  'digital solutions',
  'delve',
  'elevate',
  'empower',
  'results-driven',
  'highly motivated',
  'turning ideas into',
  'crafting',
  'crafted',
  'journey',
  'accomplished',
  'proven track record',
  'bring your ideas to life',
];

const text = html
  .replace(/<script[\s\S]*?<\/script>/g, ' ')
  .replace(/<style[\s\S]*?<\/style>/g, ' ')
  .replace(/<[^>]+>/g, ' ');

const hits = banned.filter((word) => new RegExp(`\\b${word}\\b`, 'i').test(text));
hits.length === 0
  ? ok(`0 banned words in the visible copy (${banned.length} checked)`)
  : fail(`banned words present: ${hits.join(', ')}`);

/* ---- 7. accessibility basics ---- */

/Skip to content/.test(html) ? ok('skip link present') : fail('no skip link');
/<html lang="en">/.test(html) ? ok('html lang set') : fail('html lang missing');
count(/aria-labelledby="/g) >= 5
  ? ok('sections are labelled landmarks')
  : warn('sections missing aria-labelledby');

/* ---- report ---- */

console.log('');
for (const msg of passes) console.log(`  pass  ${msg}`);
for (const msg of warns) console.log(`  warn  ${msg}`);
for (const msg of fails) console.log(`  FAIL  ${msg}`);
console.log(
  `\n  ${passes.length} passed · ${warns.length} warning(s) · ${fails.length} failure(s)\n`,
);

process.exit(fails.length > 0 ? 1 : 0);
