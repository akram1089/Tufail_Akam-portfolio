# FACTS still needed from Tufail

All site content now matches your LinkedIn profile (`Profile.pdf`, Aug 2026).
Nothing below was invented — no metric, client name or repo URL appears on the site
unless you put it there.

Fields marked *(renders only when filled)* are already wired: type the text into
`src/data/content.ts`, run `npm run build`, and the block appears. Leave it empty and
the page stays exactly as it is — no placeholder text ever reaches the live site.

---

## 0. Two things to fix outside this repo

- [ ] **Your LinkedIn summary still has unfilled template brackets.** Live on your
      profile right now: `[service design / database modelling / integrations]`,
      `track [X] assets across [Y] locations`, `[volume, e.g. millions of rows daily]`,
      `[financial reporting / analytics / a specific product]`, `[type of products]`.
      Recruiters read that as a copy-paste left half-done. I did not carry any of it
      onto the site — the About section works around those gaps.
- [ ] **`public/Tufail-Akram-Resume.pdf` is the old CV and now contradicts the site.**
      It lists *Ai Infotech (Aug 2021 – Apr 2023)* and dates Kozy Kreative as
      *May 2023 – Oct 2024*; LinkedIn says Kozy Kreative *May 2021 – Oct 2024* and has
      no Ai Infotech at all. The site follows LinkedIn. Export a fresh CV from
      LinkedIn and overwrite that file, keeping the filename — `/resume` and `/cv`
      redirect to it.

## 1. Priority — the three that change how the site reads

### 1.1 A measurable result per project *(renders only when filled)*

`src/data/content.ts` → each entry in `PROJECTS` accepts `result: '…'`.

One number each — the numbers your LinkedIn leaves as `[X]` and `[Y]` are exactly the
ones missing here:

- [ ] `cisco-asset-platform` — assets tracked, teams or regions covered, sync volume.
- [ ] `asset-intelligence-rag` — queries served, retrieval accuracy, time saved per lookup.
- [ ] `snowflake-financial-etl` — rows per night, pipeline runtime, compute cost saved
      (you say you reduced it — by how much?).
- [ ] `reconciliation-automation` — hours of manual work removed per reporting cycle.
- [ ] `geolocation-features` — searches served, or how many client products shipped with it.

If a figure is under NDA, an order of magnitude still beats nothing ("high five figures
of rows nightly"). If you genuinely don't have one, leave it blank.

### 1.2 Two or three decisions per project *(renders only when filled)*

`PROJECTS[n].decisions: ['…', '…']` — the *why* is the valuable half:

> "Kept the asset rules in Python rather than SQL because they changed weekly and we
> needed them reviewable in a PR."

- [ ] Cisco platform — why async workflows over a queue/worker setup? Where does retry state live?
- [ ] Asset intelligence — why RAG over fine-tuning? Which vector store, and why that one?
- [ ] Snowflake ETL — why Snowpark over dbt or plain SQL?
- [ ] Reconciliation — why Lambda over a scheduled container?
- [ ] Geolocation — why Google Maps APIs over PostGIS alone?

### 1.3 "What I'd do differently" *(renders only when filled)*

`PROJECTS[n].retro: '…'` — one honest sentence each. Highest-trust, lowest-effort item
on this list, and nobody else's portfolio has it.

## 2. About — two sentences

`src/data/content.ts` → `ABOUT` *(both render only when filled)*

- [ ] `opinion:` one strong tool opinion — a position with a reason, not a preference.
      e.g. "I'd still reach for Postgres before a queue for most job scheduling; one
      fewer thing to run, and `SELECT … FOR UPDATE SKIP LOCKED` covers more than people expect."
- [ ] `personal:` one non-technical detail. A place, a sport, a habit — anything real.

## 3. Skills split

`src/data/content.ts` → `SKILLS`. Built from your LinkedIn core stack:

- **Use daily** = assumed to be the current Cisco/BayRock stack.
- **Comfortable** = shipped in earlier roles.
- **Building with now** = LLM/RAG/agents, from "increasingly, AI-driven automation".

- [ ] Move anything that landed in the wrong column. Snowflake sits in *Comfortable*
      because your current role is Postgres-first — correct me if you're still in it daily.

## 4. Links

- [ ] `PROJECTS[n].links = { live: '…', repo: '…' }` — Live/Code buttons appear only
      when set. All the old `'#'` placeholders are gone.
- [ ] `ROLES[n].url` — company websites; the org name becomes a link once set.
- [ ] Anything public on `github.com/akram1089`? A repo a stranger can open is the one
      kind of proof that needs no trust.

## 5. Screenshots *(renders only when filled)*

`PROJECTS[n].image = { src: '/shots/x.webp', alt: '…', width: 1200, height: 750 }`

- [ ] One real screenshot per project in `public/shots/`, ≤ 150 kB, WebP.
- [ ] Alt text = what the picture shows ("Snowflake task graph for the nightly load"),
      not a keyword list.
- Every stock photo was deleted — the old cards hot-linked Pexels images of other
  people's offices from a third-party CDN.

## 6. Domain

Currently `https://tufailakram-portfolio.netlify.app`, set in **one place**:
`SITE.url` in `src/data/site.ts`. Change it there and the canonical, OG tags, JSON-LD,
`robots.txt` and `sitemap.xml` all follow on the next build.

- [ ] Buy `tufailakram.dev` or `.com` (~$10–15/yr), set it as Netlify's primary domain,
      force HTTPS.
- [ ] Update `SITE.url`, then uncomment the 301 in `public/_redirects` so the
      netlify.app subdomain stops competing with the new domain in search.
- [ ] Add the property in [Google Search Console](https://search.google.com/search-console)
      and [Bing Webmaster Tools](https://www.bing.com/webmasters), submit `/sitemap.xml`,
      request indexing for `/`.

## 7. Decisions I made — say the word and I'll change any of them

| Decision | Why | To reverse |
|---|---|---|
| Dropped **Ai Infotech** and used Kozy Kreative *May 2021 – Oct 2024* | Your LinkedIn has no Ai Infotech and dates Kozy Kreative from May 2021 | add a fourth entry to `ROLES` |
| Dropped **OptionPerks**, the telemedicine portal and the POS system as projects | None appear on LinkedIn; the POS work is covered by the FinInfocom entry | add them back to `PROJECTS` |
| Removed the **GCP** chip that's on the live site | GCP appears nowhere in your LinkedIn — AWS does, repeatedly | add `'GCP'` to `HERO.stack` |
| Dropped **Instagram** from the links | Personal account, and the URL carried an `igsh` tracking parameter | add it to `SOCIALS` in `src/data/site.ts` |
| **Charcoal + one amber**, no gradients anywhere | The blue→purple gradient is the default palette of AI-generated sites, and the audit doc banned it. Gradient text, gradient pills, glass cards and the portrait glow all went with it | `--accent` in `src/index.css`, two lines (`:root` and `.light`) |
| **Dark is the default theme**, light is an opt-in via the dock toggle | The design is dark-first; a light default would show the weaker of the two | flip the check in the inline script in `index.html` |
| Hero shows **6 chips on phones**, 8 from `sm:` up | Eight pushed the buttons below the fold on a 375 px screen | drop the `index >= 6` class in `Hero.tsx` |
| No **contact form** | The old one ran a 2-second timeout, said "Message sent successfully!" and discarded every message | — |

## 8. Post-deploy checks (Phase 5)

These need the live URL; everything else is verified locally by `npm run verify` (53 checks).

- [ ] View Source on the live page — hero `<h1>`, all five `<h2>`, project copy and
      contact links must be in the source, not just the inspector.
- [ ] [Rich Results Test](https://search.google.com/test/rich-results) and
      [validator.schema.org](https://validator.schema.org) — Person / ProfilePage valid.
- [ ] [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) and X — the
      card must show `og.png` (1200×630, 149 kB).
- [ ] Search Console: submit the sitemap, request indexing, watch Pages weekly.
- [ ] Analytics: see the commented block at the bottom of `index.html`. Nothing is
      installed, so the page makes zero third-party requests today.

### Lighthouse, mobile

| | Performance | Accessibility | Best practices | SEO | LCP | TBT | Page weight |
|---|---|---|---|---|---|---|---|
| live site, before | 68 | 94 | 77 | 100 | 4.8 s | 430 ms | 507 kB |
| this build, local | **96–100** | **100** | **100** | **100** | **1.8–2.0 s** | **10–130 ms** | **137 kB** |

Performance varies run to run on this machine (four local runs: 96, 97, 100, 100) —
the swing is the idle-scheduled canvas competing with whatever else is running, not a
change in the page. Accessibility, best practices and SEO were 100 on every run.

Reports: `lighthouse-before.report.json`, `lighthouse-after.report.html`. The old site
also scored SEO 100 — Lighthouse audits the *rendered* DOM, so it never saw the real
problem. That is why `npm run verify` checks the raw HTML instead.

## 9. Optional, biggest long-term SEO lever

- [ ] Two or three short posts would give the site pages that rank for real queries
      instead of only your name. Straight out of your work: "Getting reporting off
      Postgres and onto Snowpark", "Multi-step LLM agents that close a ticket instead of
      drafting one", "Owning a Postgres schema on a platform four teams write to". This
      needs routing, which the single-page setup doesn't have — worth doing as its own change.

---

## Two humans test (§5.8)

Before calling it done: show the page to one developer and one non-developer and ask
each to say what you do in one sentence. If they can't, the hero needs another pass.
