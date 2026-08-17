# tufail-akram-portfolio

One-page portfolio. React 18 + Vite + Tailwind, **prerendered to static HTML** at build
time so the whole page is readable without JavaScript.

## Commands

```bash
npm install
npm run dev       # dev server (empty #root, client-rendered)
npm run build     # client build → SSR build → prerender → dist/
npm run verify    # 53 checks against dist/ — exits non-zero on failure
npm run images    # regenerate public/ images (needs Python + Pillow)
npm run lint
npm run preview   # serve dist/ locally on :4173
```

## How the prerender works

`npm run build` runs three steps:

1. `vite build` — client bundle plus `dist/index.html`, still holding
   `<div id="root"><!--app-html--></div>`.
2. `vite build --ssr src/entry-server.tsx` — the same components compiled for Node,
   into `dist/server/`.
3. `scripts/prerender.mjs` — calls `render()`, injects the HTML into the placeholder,
   inlines the stylesheet, then deletes `dist/server/`.

`src/main.tsx` calls `hydrateRoot` when `#root` already has children and `createRoot`
when it doesn't, so dev and production both work from one entry point. The build fails
loudly rather than shipping a broken page: `prerender.mjs` throws if the rendered output
has no `<h1>` or the placeholder is missing.

Entrance animations are CSS-only and time-based — never gated on JavaScript or
IntersectionObserver — so prerendered text is readable with JS off and by crawlers.

## Where things live

| What | File |
|---|---|
| Name, role, URL, email, socials, image paths | `src/data/site.ts` |
| Every word on the page | `src/data/content.ts` |
| `<head>`, JSON-LD, robots.txt, sitemap.xml, webmanifest | `src/seo.ts` |
| Colours, type scale, motion | `src/index.css`, `tailwind.config.js` |
| Constellation background (canvas) | `src/components/ParticleBackground.tsx` |
| Floating navigation | `src/components/Dock.tsx` |
| Facts still needed from Tufail | `content/FACTS.md` |
| Copy as it was before the rewrite | `content/current-copy.md` |

**Changing the domain is a one-line edit**: `SITE.url` in `src/data/site.ts`. Canonical,
OG tags, Twitter tags, JSON-LD, `robots.txt` and `sitemap.xml` are all generated from it
by the `portfolio-seo` plugin in `vite.config.ts` — which also injects the whole `<head>`
into `index.html` in dev and in build.

## Design system

**Charcoal and one amber. No gradients anywhere.** The blue→purple gradient this
replaced is the default palette of every AI-generated portfolio, and the audit doc
banned it outright ("no purple-blue gradients, no glassmorphism cards, no neon glow").
What went with it: gradient text, gradient-filled pills, the translucent `backdrop-blur`
cards, and the glow behind the portrait. Surfaces are solid; the accent is the only
colour on the page.

The accent appears on exactly six things — links, the active dock item, the primary
button, the rule under each section title, list markers, and the full stop after the
name. Icon tiles and project tags use `.accent-soft` (10% tint + 25% border) so they
read as quiet, not as six more buttons.

**Changing the accent is a two-line edit**: `--accent` under `:root` and under `.light`
in `src/index.css`. Both values are needed — `#E0A03C` is 8.2:1 on charcoal but only
1.9:1 on paper, so the light theme uses a darker amber (`#9A6212`, 4.8:1).

| | charcoal (default) | paper (`.light`) |
|---|---|---|
| page | `#121110` | `#FAF8F4` |
| card | `#1E1C1A` | `#FFFFFF` |
| text | `#EDEAE4` — 15.7:1 | `#1A1815` — 15.2:1 |
| muted | `#A39E94` — 7.1:1 | `#6B6459` — 5.5:1 |
| accent | `#E0A03C` — 8.2:1 | `#9A6212` — 4.8:1 |

Dark is the default; light is an explicit opt-in stored in `localStorage` and applied by
an inline script before first paint, so there is no flash. Both themes are driven by CSS
variables on `:root` / `.light` — components never use `dark:` variants.

Inter is self-hosted (one variable file, latin subset, 48 kB, preloaded), so the page
makes **zero third-party requests**.

The constellation canvas is decoration: `aria-hidden`, started on `requestIdleCallback`
so it never competes with hydration, paused when the tab is hidden, capped at 55
particles and DPR 2, and reduced to a single static frame under
`prefers-reduced-motion`.

## Measured (Lighthouse 13, mobile, local preview of `dist/`)

| | Performance | Accessibility | Best practices | SEO |
|---|---|---|---|---|
| live site, before | 68 | 94 | 77 | 100 |
| this build | **96–100** | **100** | **100** | **100** |

FCP 1.1–1.3 s · LCP 1.8–2.0 s · CLS 0 · TBT 10–130 ms · 137 kB total · 0 third-party
requests. Performance swings run to run on a busy machine (96, 97, 100, 100 across four
local runs); the other three categories were 100 every time.

Full report: `lighthouse-after.report.html`. Re-run with:

```bash
npm run build && npm run preview &
npx lighthouse http://localhost:4173/ --output=html --output-path=./lighthouse-after \
  --only-categories=performance,seo,accessibility,best-practices --chrome-flags="--headless=new"
```

## Deploying

Netlify builds with `netlify.toml` (`npm run build` → publish `dist`). Security and cache
headers are set there; `public/_redirects` holds the `/resume` and `/cv` short links plus
the commented-out 301 to use once a custom domain is live.

After deploying, check **View Source** in the browser — the hero `<h1>`, every section
`<h2>`, all project copy and the contact links must be visible there, not only in the
inspector.
