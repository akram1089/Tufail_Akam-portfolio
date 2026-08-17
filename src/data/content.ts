/**
 * All page copy.
 *
 * Every fact here comes from the LinkedIn profile (Profile.pdf, Aug 2026).
 * Nothing is invented — in particular, no metric appears anywhere, because the
 * LinkedIn summary's own numbers are still unfilled placeholders
 * ("[X] assets across [Y] locations", "[volume, e.g. millions of rows daily]").
 *
 * Style rules (PORTFOLIO_SEO_AUDIT_AND_PLAN.md §3.1): no "innovative / seamless /
 * robust / crafting / journey", every sentence carries a name, a decision or a
 * result. `npm run verify` fails the build if a banned word gets in.
 *
 * See content/FACTS.md for what is still missing.
 */

export const HERO = {
  name: 'Tufail Akram',
  role: 'Backend & AI Engineer',
  tagline:
    'I build Python services, Snowflake data pipelines and LLM/RAG systems — currently the Cisco asset platform at BayRock Labs.',
  /**
   * The chip row — eight, so it holds one or two tidy rows at every width.
   * LinkedIn-backed only; Docker, Kubernetes and the rest are in the Skills
   * section rather than crowding the hero.
   */
  stack: ['Python', 'FastAPI', 'Django', 'PostgreSQL', 'Snowflake', 'AWS', 'React', 'Node.js'],
  status: 'Open to backend, data and AI engineering roles',
};

export const ABOUT = {
  paragraphs: [
    'I’m a backend engineer with 5+ years of turning messy, high-volume problems into Python systems that stay up: REST APIs, data pipelines, and increasingly AI-driven automation.',
    'At BayRock Labs I build the backend and data layer for Cisco’s enterprise asset-management platform — FastAPI services, the PostgreSQL schema underneath them, and the integrations that keep hardware and software records in sync with enterprise inventory and ITSM systems.',
    'Before that I built ETL on Snowflake and Snowpark at FinInfocom for financial reporting and analytics, and spent three and a half years at Kozy Kreative Concepts shipping client applications end to end with Django, React and Node.',
    'What I like most is the part that has to hold up in production — clean APIs, sane data models, observability, and wiring LLMs and RAG into real workflows instead of demos.',
  ],
  /** FACT NEEDED — one strong tool opinion. Renders only when filled. */
  opinion: '',
  /** FACT NEEDED — one non-technical detail. Renders only when filled. */
  personal: '',
};

export interface Project {
  slug: string;
  title: string;
  /** Where the work happened — grounds the claim. */
  context: string;
  tag: string;
  problem: string;
  built: string;
  stack: string[];
  /** 2–3 decisions and why. FACT NEEDED — renders only when filled. */
  decisions?: string[];
  /** One measurable outcome. FACT NEEDED — renders only when filled. */
  result?: string;
  /** One honest "what I'd do differently". FACT NEEDED — renders only when filled. */
  retro?: string;
  links?: { live?: string; repo?: string };
  /** Real screenshot, once one exists. Stock photos were removed on purpose. */
  image?: { src: string; alt: string; width: number; height: number };
}

export const PROJECTS: Project[] = [
  {
    slug: 'cisco-asset-platform',
    title: 'Cisco Enterprise Asset Management Platform',
    context: 'BayRock Labs · 2025 — present',
    tag: 'Backend',
    problem:
      'Hardware and software assets sat with different Cisco teams, regions and systems of record, and no single service kept them agreeing with each other.',
    built:
      'FastAPI services over a PostgreSQL schema I own — migrations, indexing and query tuning included — plus asynchronous, API-driven workflows for ingestion, synchronisation, validation and lifecycle, each with retry and error handling.',
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'Docker', 'Kubernetes', 'CI/CD'],
  },
  {
    slug: 'asset-intelligence-rag',
    title: 'LLM/RAG asset intelligence',
    context: 'BayRock Labs · 2025 — present',
    tag: 'AI',
    problem:
      'Finding an asset meant knowing its identifier and the right filter, so anyone outside the team had to ask someone who did.',
    built:
      'A retrieval layer over the asset data that answers in natural language — search, classification and retrieval — built into the same platform rather than bolted on as a separate tool.',
    stack: ['Python', 'LLM', 'RAG', 'FastAPI', 'PostgreSQL'],
  },
  {
    slug: 'snowflake-financial-etl',
    title: 'Financial ETL on Snowflake',
    context: 'FinInfocom · 2024 — 2025',
    tag: 'Data',
    problem:
      'Financial and transactional data arrived in volume and had to be validated before reporting or analytics could rely on it.',
    built:
      'Snowpark pipelines for ingestion, transformation and validation, with FastAPI and Django endpoints exposing the processed datasets to internal dashboards. Queries, warehouse usage and data models were tuned to bring compute cost down.',
    stack: ['Snowflake', 'Snowpark', 'Python', 'FastAPI', 'Django', 'AWS'],
  },
  {
    slug: 'reconciliation-automation',
    title: 'Reconciliation & reporting automation',
    context: 'FinInfocom · 2024 — 2025',
    tag: 'Data',
    problem:
      'Reconciliation, validation and report generation were manual steps that had to happen before every reporting cycle.',
    built:
      'Python workflows that run those steps end to end, deployed on AWS EC2, S3 and Lambda with logging and alerting on pipeline health and data quality. A separate LLM/RAG prototype answers questions over the financial documents and reports.',
    stack: ['Python', 'AWS Lambda', 'S3', 'EC2', 'LLM', 'RAG'],
  },
  {
    slug: 'geolocation-features',
    title: 'Geolocation & mapping features',
    context: 'Kozy Kreative Concepts · 2021 — 2024',
    tag: 'Full-stack',
    problem:
      'Client products needed location search and distance-based results, not just an address stored on a record.',
    built:
      'Location search, mapping and distance-based services using Google Maps APIs and geospatial queries, inside Django REST Framework backends with React front ends.',
    stack: ['Django', 'DRF', 'React.js', 'Google Maps API', 'PostgreSQL', 'MySQL'],
  },
];

export interface Role {
  company: string;
  /** Company website. FACT NEEDED — renders as plain text until set. */
  url?: string;
  position: string;
  period: string;
  location: string;
  /** One line on what the work was. */
  focus: string;
  bullets: string[];
  stack: string[];
}

export const ROLES: Role[] = [
  {
    company: 'BayRock Labs',
    position: 'Software Engineer',
    period: 'Oct 2025 — Present',
    location: 'India',
    focus: 'Cisco — Enterprise Asset Management Platform',
    bullets: [
      'Design and build the FastAPI backend for an asset-management platform covering hardware and software across multiple Cisco teams and regions.',
      'Own the PostgreSQL layer: schema design, migrations, indexing and query optimisation for the asset and reporting paths.',
      'Built integrations with enterprise inventory and ITSM systems, and asynchronous workflows for ingestion, synchronisation, validation and lifecycle with retries.',
      'Added an LLM/RAG asset intelligence feature — natural-language search, classification and retrieval across enterprise asset data.',
      'Containerised the services with Docker on Kubernetes, and set up Git-based CI/CD for build, test and deploy.',
    ],
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'LLM/RAG', 'Docker', 'Kubernetes', 'CI/CD'],
  },
  {
    company: 'FinInfocom Pvt. Ltd.',
    position: 'Python Developer',
    period: 'Oct 2024 — Oct 2025',
    location: 'India',
    focus: 'Financial data platform — ETL, analytics and APIs',
    bullets: [
      'Built ETL pipelines on Snowflake and Snowpark to ingest, transform and validate financial and transactional data for reporting and analytics.',
      'Exposed the processed datasets to internal dashboards through REST APIs in FastAPI and Django.',
      'Automated reconciliation, validation and report generation in Python, cutting the manual work out of each reporting cycle.',
      'Tuned Snowflake queries, warehouse usage and data models to improve pipeline performance and reduce compute cost.',
      'Ran the services on AWS EC2, S3 and Lambda with logging and alerting for pipeline health and data quality.',
    ],
    stack: ['Python', 'Snowflake', 'Snowpark', 'FastAPI', 'Django', 'AWS'],
  },
  {
    company: 'Kozy Kreative Concepts Pvt Ltd',
    position: 'Full Stack Engineer',
    period: 'May 2021 — Oct 2024',
    location: 'India',
    focus: 'Client web applications, end to end',
    bullets: [
      'Shipped production web applications with Django, Django REST Framework, React.js and Node.js for e-commerce, services and content clients.',
      'Designed REST APIs, authentication systems and relational data models on PostgreSQL and MySQL.',
      'Implemented geolocation features — location search, mapping, distance-based services — with Google Maps APIs and geospatial queries.',
      'Set up Docker-based deployments and CI/CD on AWS, and mentored junior developers on the same codebases.',
    ],
    stack: ['Django', 'DRF', 'React.js', 'Node.js', 'PostgreSQL', 'MySQL', 'Docker', 'AWS'],
  },
];

/**
 * Three plain lists, no percentage bars (§3.5).
 * Split follows the LinkedIn core stack and top skills.
 */
export const SKILLS: { title: string; note: string; items: string[] }[] = [
  {
    title: 'Use daily',
    note: 'The current stack at BayRock Labs',
    items: ['Python', 'FastAPI', 'PostgreSQL', 'REST APIs', 'Docker', 'Git', 'SQL'],
  },
  {
    title: 'Comfortable',
    note: 'Shipped in production, earlier roles',
    items: [
      'Django',
      'Django REST Framework',
      'Snowflake',
      'Snowpark',
      'Kubernetes',
      'AWS (EC2, S3, Lambda)',
      'React.js',
      'Node.js',
      'MySQL',
      'CI/CD',
      'Google Maps APIs',
    ],
  },
  {
    title: 'Building with now',
    note: 'Where the work is heading',
    items: ['LLM integration', 'RAG pipelines', 'AI agents', 'Natural-language search'],
  },
];

export const EDUCATION = [
  {
    qualification: 'BCA, Computer Software and Media Applications',
    institution: 'NIIS Institute of Business Administration (IBA), Bhubaneswar',
    period: '2018 — 2021',
  },
  {
    qualification: 'Full Stack Development, Information Technology',
    institution: 'wemakecoders',
    period: 'Oct 2022 — May 2023',
  },
];

export const CERTIFICATIONS = [
  'AI Coding Agents with GitHub Copilot and Cursor',
  'Advanced Django Project: Build High-Traffic Websites with Django',
  'Advanced Python: Practical Database Examples',
  'Building RESTful Web APIs with Django',
  'Vibe Coding Fundamentals: Tools and Best Practices',
];

export const LANGUAGES = [
  { name: 'Urdu', level: 'Native or bilingual' },
  { name: 'Hindi', level: 'Native or bilingual' },
  { name: 'Odia', level: 'Native or bilingual' },
  { name: 'English', level: 'Full professional' },
];
