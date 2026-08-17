/**
 * Phase 1 — turn the CSR build into static HTML.
 *
 * Runs after both Vite passes:
 *   1. `vite build`                     → dist/ (client bundle + index.html shell)
 *   2. `vite build --ssr src/entry-server.tsx --outDir dist/server`
 *   3. this script                      → renders <App /> into dist/index.html
 *
 * The result is a page whose h1, every h2, all project copy and contact links are
 * in the response body, with no JavaScript required to read them.
 */
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const templatePath = path.join(root, 'dist', 'index.html');
const serverDir = path.join(root, 'dist', 'server');
const entry = path.join(serverDir, 'entry-server.js');

if (!fs.existsSync(templatePath)) {
  throw new Error('dist/index.html is missing — run `vite build` first.');
}
if (!fs.existsSync(entry)) {
  throw new Error(`${entry} is missing — run the --ssr build first.`);
}

const { render } = await import(pathToFileURL(entry).href);
const appHtml = render();

if (!appHtml.includes('<h1')) {
  throw new Error('Prerendered output has no <h1> — refusing to write a broken page.');
}

let template = fs.readFileSync(templatePath, 'utf8');

if (!template.includes('<!--app-html-->')) {
  throw new Error('dist/index.html has no <!--app-html--> placeholder.');
}

template = template.replace('<!--app-html-->', appHtml);

/*
 * Inline the stylesheet. The whole sheet is ~13 kB (3.7 kB gzipped), so inlining
 * it removes a render-blocking request instead of only the critical part of one.
 * The hashed file stays in dist/assets/ so previously-cached HTML keeps working.
 */
const cssLink = template.match(/<link rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/);
if (cssLink) {
  const cssPath = path.join(root, 'dist', cssLink[1]);
  const css = fs.readFileSync(cssPath, 'utf8');
  if (css.includes('</style')) {
    throw new Error('Stylesheet contains "</style" — cannot be inlined safely.');
  }
  template = template.replace(cssLink[0], `<style>${css}</style>`);
  console.log(`prerender: inlined ${cssLink[1]} (${(css.length / 1024).toFixed(1)} kB)`);
} else {
  console.warn('prerender: no stylesheet link found to inline');
}

fs.writeFileSync(templatePath, template, 'utf8');

// The SSR bundle is a build artefact only; it must not be deployed.
fs.rmSync(serverDir, { recursive: true, force: true });

const bytes = fs.statSync(templatePath).size;
console.log(`prerender: dist/index.html written (${(bytes / 1024).toFixed(1)} kB of HTML)`);
