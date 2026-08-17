# Copy before the rewrite (Phase 0, item 5)

Recorded before any content changed, so the rewrite can be compared against it.
Banned words from §3.1 are marked **like this**.

---

## `<head>`

- Title: `Tufail Akram - Full Stack Developer`
- Description: `Tufail Akram - Full Stack Developer specializing in JavaScript, React, Django, and cloud technologies. Creating **innovative** digital **solutions**.`

## Hero (Home.tsx)

- H1: `Tufail Akram` (gradient-clipped text, no role in the heading)
- Subtitle: `Backend & Full-Stack Engineer | AI/ML Specialist`
- Tech chips: Python, FastAPI, Django, React.js, Node.js, AWS, Docker, Kubernetes, PostgreSQL, Snowflake
- CTAs: `View My Work`, `Get In Touch` (both JS scroll buttons, not links)
- Social icons: LinkedIn, GitHub, Instagram, Twitter

## About

- H2: `About Me`
- H3: `Hello, I'm Tufail Akram`
- P1: "**Accomplished** Software Engineer with 5 years of expertise in backend and full-stack development, specializing in Python, FastAPI, Django, and **scalable** cloud architectures. **Proven track record** in engineering AI-powered **solutions**, including LLM integration, RAG pipelines, and autonomous AI agents."
- P2: "I have deep expertise in Snowflake, Snowpark, and building high-performance ETL pipelines to optimize large-scale data transformation. Skilled in AWS, Docker, Kubernetes, and CI/CD with a focus on designing resilient microservices and production-grade systems. Collaborative developer with additional proficiency in React.js and Node.js for **comprehensive** full-stack delivery."
- P3: "I believe in continuous learning and staying updated with the latest technologies. My goal is to create meaningful digital experiences that solve real-world problems and drive business impact."
- Stat tiles: `5+ Years Experience`, `30+ Projects Completed`
- Education: BCA, NIIS Institute of Business Administration, 2018–2021 — "**Comprehensive** study of computer science fundamentals, programming languages, and software development principles."

## Skills

- H2: `Skills & Expertise`
- Intro: "A **comprehensive** overview of my technical skills and proficiency levels across various technologies and platforms."
- Six categories with **percentage bars**: Backend (Python 95, FastAPI 90, Django 90, Node.js 80, REST APIs 95) · Frontend (React.js 90, JavaScript 95, TypeScript 85, HTML/CSS 95, Tailwind 90) · AI/ML & Data (ML 85, LLM Integration 88, RAG 87, AI Agents 85, Python Data Science 90) · Cloud & DevOps (AWS 90, Docker 85, Kubernetes 80, CI/CD 85, Jenkins 75) · Data Engineering (Snowflake 88, Snowpark 85, ETL 90, PostgreSQL 90, SQL 95) · Tools (Git 95, VS Code 95, Postman 90, Docker Compose 85, SonarQube 80)
- Additional Technologies cloud: Microservices, GraphQL, Socket.io, Redis, MongoDB, WebRTC, Jest, Pytest, AWS Lambda, Location-Intelligence

## Experience

- H2: `Professional Experience`
- Intro: "My professional **journey** showcasing growth, achievements, and contributions across different organizations."
- **BayRock Labs** — Software Engineer — Oct 2025-Present — Remote — "Technology **solutions** company specializing in **scalable**, data-driven, and AI-powered software for global clients." + 6 achievement bullets
- **Fin Infocom PVT LTD** — Full-Stack Python Developer — Oct 2024-Oct 2025 — Hyderabad — "Offshore development services provider delivering high-quality web and mobile **solutions**…" + 6 bullets
- **KozyKreativeConceptsPvt Ltd** — Full-Stack Developer — May 2023-Oct 2024 — Hyderabad — "Leading web design and development company focusing on **innovative** digital **solutions**…" + 6 bullets (incl. "**seamless** communication")
- **Ai Infotech** — Backend Developer (Contract) — Aug 2021-Apr 2023 — Remote + 6 bullets
- CTA: `Ready to Work Together?` — "…**Let's connect and see how we can create something amazing together.**" + Download Resume

## Projects

- H2: `Featured Projects`
- Intro: "A showcase of my recent work, demonstrating expertise across various domains and technologies."
- Category filter: all / AI/ML / Data Engineering / Finance / Business / Healthcare
- Six cards, each with a **hot-linked Pexels stock photo**, `liveUrl: '#'`, `githubUrl: '#'`:
  1. ML-Driven Geolocation Intelligence Platform
  2. AI Workflow-Driven Customer Support System
  3. Data Pipeline and ETL System (**robust**, high-performance)
  4. OptionPerks - Algorithmic Trading Platform
  5. Medical Consultancy Platform
  6. POS Enterprise System
- CTA: `Have a Project in Mind?` — "I'm always excited to work on new and challenging projects. Let's discuss how we can **bring your ideas to life**." + `Start a Project` button (no handler — did nothing)

## Contact

- H2: `Get In Touch`
- Intro: "Ready to start your next project? Let's discuss how we can work together to **bring your ideas to life**."
- Email tufailakram81@gmail.com · Phone +91-7008566127 · Location Hyderabad, India
- Socials: LinkedIn, GitHub, Instagram, Twitter, WhatsApp
- **Contact form (name/email/subject/message) that discarded every submission** — `setTimeout(2000)` then `alert('Message sent successfully!')`

## Footer

- "**Crafted** with ❤️ by Tufail Akram"
- "**Turning Ideas into** Digital Reality"

---

## Source of truth for the current copy

The site now follows **LinkedIn** (`Profile.pdf`, Aug 2026), not the résumé PDF that was
in `src/assets/`. Where the two disagreed, LinkedIn won:

| | Old résumé / old site | LinkedIn — what the site says now |
|---|---|---|
| Role | Backend & Full-Stack Engineer / "Software Engineer" | **Backend & AI Engineer** |
| Kozy Kreative | May 2023 – Oct 2024 | **May 2021 – Oct 2024** (3 yrs 6 mos) |
| Ai Infotech | Aug 2021 – Apr 2023 | **not on LinkedIn — removed** |
| Fin Infocom | "Fin Infocom PVT LTD", Full-Stack Python Developer | **FinInfocom Pvt. Ltd., Python Developer** |
| BayRock work | generic "asset management platforms" | **Cisco enterprise asset-management platform** |
| Projects | ML geolocation, AI support, ETL, OptionPerks, telemedicine, POS | **Cisco platform, LLM/RAG asset intelligence, Snowflake ETL, reconciliation automation, geolocation features** |
| Education | BCA only | **BCA + wemakecoders (Oct 2022 – May 2023)** |
| Certifications / languages | absent | **5 certifications, 4 languages** |
| Availability | not stated | **"Open to backend, data and AI engineering roles"** |

Not carried across: the five unfilled `[bracket]` placeholders still sitting in the
LinkedIn summary. See `content/FACTS.md` §0.

## What changed and why

| Before | After | Reason |
|---|---|---|
| H1 = name only | H1 = name + role | §2.5, §3.9 — the H1 is the strongest on-page signal |
| Skill % bars | Use daily / Comfortable / Learning now | §3.5 — invented precision reads as a template |
| `5+ years`, `30+ projects` tiles | removed | unverifiable round numbers; the roles carry the dates |
| 6 stock-photo cards | 5 case-study rows: Problem → What I built | §3.3 — hiring decisions happen here |
| Fake contact form | `mailto:` link | messages were being thrown away |
| Company blurbs (marketing copy) | dropped | said nothing about the work |
| "Crafted with ❤️ / Turning Ideas into Digital Reality" | "Last updated: August 2026" | §4.6 |
| Category filter | dropped | 5 projects do not need filtering |
