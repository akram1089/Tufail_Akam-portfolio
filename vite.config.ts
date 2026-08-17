import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import {
  renderHead,
  renderHeaders,
  renderRobots,
  renderSitemap,
  renderWebmanifest,
} from './src/seo';

/**
 * Injects the generated <head> into index.html (dev and build alike) and emits
 * robots.txt, sitemap.xml and site.webmanifest during the client build.
 * All of it derives from src/data/site.ts, so the domain lives in exactly one place.
 *
 * Only registered for the client build — the SSR pass writes to dist/server,
 * which prerender.mjs deletes.
 */
function seo(): Plugin {
  return {
    name: 'portfolio-seo',
    transformIndexHtml: {
      order: 'pre',
      handler: (html) => html.replace('<!--app-head-->', renderHead()),
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: '_headers', source: renderHeaders() });
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: renderRobots() });
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: renderSitemap() });
      this.emitFile({ type: 'asset', fileName: 'site.webmanifest', source: renderWebmanifest() });
    },
  };
}

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), ...(isSsrBuild ? [] : [seo()])],
  build: {
    target: 'es2020',
    // Hashed asset filenames are served with a 1-year immutable cache (netlify.toml).
    assetsInlineLimit: 2048,
  },
}));
