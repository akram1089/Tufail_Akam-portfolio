# tufailakram-portfolio.netlify.app — SEO, Content & Design Audit + Action Plan

> **How to use this file with Claude Code**
> Open the portfolio repo, drop this file in the root, and say:
> `Read PORTFOLIO_SEO_AUDIT_AND_PLAN.md. Start with Phase 0, report findings, then execute Phase 1 → 5 in order. Ask me for any FACT you need before writing copy.`
>
> Everything marked `[FACT NEEDED]` must be filled by Tufail — never invented.

---

## 0. What was observed from outside (baseline)

Fetched `https://tufailakram-portfolio.netlify.app/` twice (raw + markdown extraction) and checked Google's cached view.

| Check | Result |
|---|---|
| Crawlable text in HTML | **None.** Only `<title>` and `<meta name="description">` are visible. Everything else is injected by JavaScript. Google's index entry shows only the meta description. |
| `<title>` | `Tufail Akram - Full Stack Developer` (37 chars) — OK length, no location, no differentiator |
| Meta description | `Tufail Akram - Full Stack Developer specializing in JavaScript, React, Django, and cloud technologies. Creating innovative digital solutions.` (140 chars) — generic; "Creating innovative digital solutions" is filler |
| Open Graph / Twitter tags | Not observed in `<head>` |
| Canonical | Not observed |
| JSON-LD structured data | Not observed |
| robots.txt / sitemap.xml | Could not be fetched (not linked from anywhere) — likely default/absent |
| Domain | Netlify subdomain (`*.netlify.app`) — weak brand signal, shared-domain reputation |
| Rendering | Client-side rendered SPA (Vite/CRA/React) |

**Verdict:** the site is essentially invisible to search engines and link previews. This is the #1 problem and dwarfs everything else. Fixing it is Phase 1.

---

## Phase 0 — Discovery (Claude Code does this first, reports back, changes nothing)

Run and record answers to every line:

1. Framework + build tool: check `package.json` (`react-scripts`? `vite`? `next`?). Output directory (`build/`, `dist/`).
2. `index.html` `<head>` contents — list every meta tag present.
3. Is there `public/robots.txt`, `public/sitemap.xml`, `public/_redirects`, `netlify.toml`?
4. Is there `public/og-image.*` or any social image?
5. Component tree: list every section (Hero, About, Skills, Projects, Experience, Contact, Footer). For each, dump the current text content into `content/current-copy.md`.
6. Count `<h1>` on the rendered page (`npm run build && grep -o "<h1" dist/index.html` — will be 0 for CSR; note that).
7. List every `<img>` and whether it has `alt`, `width`, `height`, `loading="lazy"`.
8. List fonts (Google Fonts links, `@import`, or self-hosted).
9. List all animation libraries (framer-motion, AOS, GSAP, typed.js…) and where they're used.
10. Third-party scripts (analytics, fonts, icons CDNs).
11. Total JS bundle size after build (`du -sh dist/assets/*.js`).
12. Run `npx lighthouse https://tufailakram-portfolio.netlify.app --output=json --output-path=./lighthouse-before.json --only-categories=performance,seo,accessibility,best-practices` and save scores.

Deliver a table: **Finding → Severity (Critical / High / Medium / Low) → Fix phase.**

---

## Phase 1 — Make the site indexable (CRITICAL)

Goal: full HTML in the response body, no JS required to read it.

### Option A (recommended): migrate to Astro
- One-page portfolio → Astro is ideal: zero JS by default, keep React components as islands only where interactive.
- `npm create astro@latest`, move sections into `src/components/*.astro` (or `.tsx` with `client:visible` only for interactive bits).
- Output: static HTML in `dist/`, deploy to Netlify unchanged.

### Option B (least change): keep React, add prerendering
- Vite: `vite-plugin-ssr` / `vite-ssg`, or `react-snap` as a postbuild step.
- Verify with `curl -s https://<url> | grep -c "<h2"` > 0 after deploy.

### Option C: Next.js `output: 'export'`
- Fine if you also want a `/blog` later.

**Acceptance criteria**
- `curl` of the deployed URL returns the hero H1, all section headings, project names, and contact links in raw HTML.
- Google Rich Results Test / "View page source" shows real content.

---

## Phase 2 — Technical SEO (do all)

### 2.1 `<head>` — final spec
```html
<title>Tufail Akram — Full Stack Developer (React, Django) in [FACT NEEDED: City, Country]</title>
<meta name="description" content="[FACT NEEDED — 150–160 chars, concrete: e.g. 'Full stack developer building React + Django products. Recent: X for Y (result). Open to remote roles / freelance from [City].']">
<link rel="canonical" href="https://[final-domain]/">
<meta name="robots" content="index,follow,max-image-preview:large">
<meta name="theme-color" content="[accent hex]">

<!-- Open Graph -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://[final-domain]/">
<meta property="og:title" content="Tufail Akram — Full Stack Developer">
<meta property="og:description" content="[same as meta description]">
<meta property="og:image" content="https://[final-domain]/og.png">   <!-- 1200×630, <300 KB -->
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:site_name" content="Tufail Akram">

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Tufail Akram — Full Stack Developer">
<meta name="twitter:description" content="[same]">
<meta name="twitter:image" content="https://[final-domain]/og.png">
<meta name="twitter:creator" content="@[FACT NEEDED handle]">

<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
```

### 2.2 JSON-LD (inject in `<head>`)
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://[final-domain]/#person",
      "name": "Tufail Akram",
      "url": "https://[final-domain]/",
      "image": "https://[final-domain]/tufail.jpg",
      "jobTitle": "Full Stack Developer",
      "description": "[same as meta description]",
      "address": { "@type": "PostalAddress", "addressLocality": "[FACT]", "addressCountry": "[FACT]" },
      "email": "mailto:[FACT]",
      "knowsAbout": ["React", "JavaScript", "TypeScript", "Django", "Python", "PostgreSQL", "AWS", "[FACT: real list]"],
      "sameAs": [
        "https://github.com/[FACT]",
        "https://www.linkedin.com/in/[FACT]",
        "https://twitter.com/[FACT]"
      ],
      "alumniOf": { "@type": "CollegeOrUniversity", "name": "[FACT or remove]" },
      "worksFor": { "@type": "Organization", "name": "[FACT or remove]" }
    },
    {
      "@type": "WebSite",
      "@id": "https://[final-domain]/#website",
      "url": "https://[final-domain]/",
      "name": "Tufail Akram — Portfolio",
      "publisher": { "@id": "https://[final-domain]/#person" },
      "inLanguage": "en"
    },
    {
      "@type": "ProfilePage",
      "@id": "https://[final-domain]/#profilepage",
      "url": "https://[final-domain]/",
      "mainEntity": { "@id": "https://[final-domain]/#person" },
      "isPartOf": { "@id": "https://[final-domain]/#website" }
    }
  ]
}
```
Add one `CreativeWork` (or `SoftwareSourceCode`) node per featured project with `name`, `url`, `codeRepository`, `programmingLanguage`, `description`.
Validate at https://validator.schema.org and Google Rich Results Test.

### 2.3 Files in `public/`
```
robots.txt
  User-agent: *
  Allow: /
  Sitemap: https://[final-domain]/sitemap.xml

sitemap.xml   (single URL is fine; add /projects/<slug> pages if created in Phase 3)
_redirects    (Netlify)
  https://tufailakram-portfolio.netlify.app/*  https://[final-domain]/:splat  301!
netlify.toml
  [[headers]]
    for = "/*"
    [headers.values]
      X-Content-Type-Options = "nosniff"
      X-Frame-Options = "DENY"
      Referrer-Policy = "strict-origin-when-cross-origin"
      Permissions-Policy = "camera=(), microphone=(), geolocation=()"
  [[headers]]
    for = "/assets/*"
    [headers.values]
      Cache-Control = "public, max-age=31536000, immutable"
```

### 2.4 Domain
Buy `tufailakram.dev` / `.com` (~$10–15/yr). Set as Netlify primary domain, force HTTPS, redirect the netlify.app subdomain. Register in Google Search Console + Bing Webmaster Tools, submit sitemap.

### 2.5 Heading hierarchy
- Exactly **one `<h1>`** — the hero statement (contains "Full Stack Developer" + name).
- Each section = `<section aria-labelledby>` with an `<h2>`; project titles `<h3>`. No skipping levels. No headings used just for styling.

### 2.6 Images
- Convert to WebP/AVIF; `<img>` with `alt`, `width`, `height`, `loading="lazy"` (except hero), `decoding="async"`.
- Alt text = what the image shows for a screen reader, not keywords ("Screenshot of the booking dashboard showing weekly calendar view").
- Project screenshots ≤ 150 KB each; use `<picture>` with 1x/2x srcset.

### 2.7 Performance targets (Lighthouse mobile)
- Performance ≥ 90, SEO 100, Accessibility ≥ 95, Best Practices 100.
- LCP < 2.5 s, CLS < 0.1, INP < 200 ms.
- Self-host fonts (2 files max, `font-display: swap`, `<link rel="preload">` for the display font).
- Remove unused animation libraries; ship < 100 KB of JS total, ideally near 0 with Astro.
- Inline critical CSS; defer everything else.

### 2.8 Accessibility (SEO-adjacent, recruiters use it as a signal)
- Skip link, focus styles visible, contrast ≥ 4.5:1, `prefers-reduced-motion` respected, all icons have labels, form fields have `<label>`.

---

## Phase 3 — Content rewrite (removes the "AI-generated" feel)

### 3.1 The rules (give these to Claude Code as hard constraints)
- **Banned words/phrases:** innovative, passionate, seamless, cutting-edge, leverage, robust, scalable solutions, digital solutions, delve, elevate, empower, dynamic, results-driven, "I am a highly motivated", "turning ideas into reality", "crafting", "journey".
- Every sentence must contain at least one of: a number, a name (client/product/tool), a decision, or a result.
- First person, contractions allowed, short sentences. Read it aloud — if it sounds like a LinkedIn bio, rewrite.
- No skill percentages, no star ratings, no "90% React".
- No fake testimonials. Real ones with name + role + link or none.

### 3.2 Hero (`<h1>` + one paragraph + two CTAs)
Template:
> **[Name] — full stack developer. I build [React + Django] products for [type of client / problem].**
> Most recently: [FACT: one project, one measurable outcome]. Based in [FACT: city], working [remote / open to relocation]. Currently [FACT: learning X / available from Y].
> CTAs: `View work ↓` · `Email me` (mailto, not a form)

### 3.3 Projects — 3 to 5, each a mini case study (this is where hiring decisions happen)
For each project, collect `[FACT]`:
- Name, one-line summary, live URL, repo URL
- **Problem** (2 sentences — who needed what)
- **What I built** (stack in one line, then 2–3 concrete decisions and *why*: "chose Postgres row-level locking over Redis because…")
- **Result** (number: users, latency, revenue, time saved, bugs removed, Lighthouse score)
- **What I'd do differently** (one honest sentence — huge trust signal)
- 1–2 real screenshots or a 10-second screen recording (WebM/MP4, muted, `poster` attribute)

Optional but strong for SEO: give each project its own URL (`/projects/<slug>`) with its own title/description/OG image → more indexable pages, more long-tail keywords.

### 3.4 About (150–250 words)
Where you're from, how you started coding, what you work on now, one strong tool opinion, one non-tech detail. Include a real photo (`alt="Tufail Akram"`).

### 3.5 Skills
Replace grids/bars with three plain lists: **Use daily** · **Comfortable** · **Learning now**. Or drop the section and let projects speak.

### 3.6 Experience / Education
Reverse-chronological, each item: role, org, dates, 1–2 bullets with outcomes. Link org names.

### 3.7 Writing / Notes (optional, best long-term SEO lever)
Even 2–3 posts ("How I set up Django + React auth without JWT pain", "Debugging X on Netlify") turn a one-page site into something that ranks for real queries. Astro content collections make this trivial.

### 3.8 Contact / Footer
Plain `mailto:`, GitHub, LinkedIn, resume PDF (`/Tufail-Akram-Resume.pdf`, dated), location, "Last updated: <month year>".

### 3.9 Keyword targets (natural placement, not stuffing)
- Primary: `Tufail Akram`, `Tufail Akram developer`, `Tufail Akram portfolio`
- Secondary: `full stack developer [city]`, `React Django developer`, `freelance full stack developer [country]`
- Long-tail via project pages / posts: `[project problem] + React/Django`
Place primary in `<title>`, H1, first paragraph, OG title, JSON-LD name. Secondary in H2s and project copy.

---

## Phase 4 — Visual redesign (kill the template look)

Guiding rule: **one strong choice in each of type, colour, layout, motion — everything else restrained.**

### 4.1 Typography
- Display font with character (e.g. Instrument Serif, Fraunces, Clash Display, Space Grotesk, Newsreader) for H1/H2 only.
- Body: one neutral sans (Inter/Geist/system-ui) 16–18 px, line-height 1.6, max width 65–72ch.
- Fluid scale with `clamp()`. No more than 5 sizes.

### 4.2 Colour
- Off-white or near-black background, **one** accent used sparingly (links, one hero element). No purple-blue gradients, no glassmorphism cards, no neon glow.
- Provide `prefers-color-scheme` dark mode via CSS variables.

### 4.3 Layout
- Editorial / left-aligned rather than everything centered. Generous whitespace, 12-col grid, intentional asymmetry (e.g., project text 5 cols + image 7 cols, alternating).
- Sticky minimal nav or none (single page → anchor links in footer is enough).
- Project cards → full-width rows with big screenshot; not 3 identical cards.

### 4.4 Motion
- Remove scroll-triggered fade-in on every element. Allow: hero text reveal once, hover state on project rows, smooth anchor scroll. All under `prefers-reduced-motion`.
- No typing-effect hero, no particle background, no cursor followers.

### 4.5 Imagery
- Real screenshots (device-frame optional, consistent), real photo of you, custom OG image (name + title + accent, 1200×630).
- Favicon = initials in the display font, SVG.

### 4.6 Micro-details that read "human"
- "Last updated" line, a "now" line, honest "what I'd change" notes, real numbers, one opinion.

---

## Phase 5 — Verify & measure

1. `curl -s <url> | grep -E "<h1|<h2|og:image|application/ld\+json"` — all present.
2. Lighthouse mobile ≥ 90/100/95/100. Save `lighthouse-after.json`, diff with before.
3. https://search.google.com/test/rich-results → Person / ProfilePage valid.
4. https://cards-dev.twitter.com/validator + LinkedIn Post Inspector → preview shows OG image.
5. Google Search Console: submit sitemap, request indexing, watch "Pages" report weekly.
6. Add privacy-friendly analytics (Plausible / Umami / Cloudflare) — no cookie banner needed.
7. Manual read-through: search the built HTML for every banned word in 3.1 → zero hits.
8. Ask two humans (one dev, one non-dev) to read it and say what you do in one sentence. If they can't, rewrite the hero.

---

## Priority order (if time is short)

1. Prerender / Astro (Phase 1) — nothing else matters until content is in HTML
2. Custom domain + Search Console
3. Rewrite hero + 3 project case studies with real numbers
4. `<head>` meta + OG image + JSON-LD
5. Typography + colour + remove animations
6. Everything else

---

## FACT NEEDED — checklist for Tufail to fill before Claude Code writes copy

- [ ] City, country, timezone; remote / relocation preference
- [ ] Email, GitHub, LinkedIn, Twitter/X handles
- [ ] Final domain name
- [ ] Current status (student / employed at ___ / freelancing / job-seeking, available from ___)
- [ ] For each of 3–5 projects: name, live URL, repo, problem, 2–3 decisions, one measurable result, one thing you'd change, screenshots
- [ ] Real skill lists: daily / comfortable / learning
- [ ] Education + roles with dates
- [ ] One personal detail + one tool opinion for About
- [ ] Headshot (≥ 800 px, WebP)
- [ ] Resume PDF (dated)
