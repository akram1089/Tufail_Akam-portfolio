/**
 * Everything that goes in <head>, plus robots.txt and sitemap.xml, generated from
 * src/data/site.ts and src/data/content.ts by the vite plugin in vite.config.ts.
 *
 * One source of truth: change SITE.url and every URL below follows.
 */
import { SITE, SOCIALS } from './data/site';
import { EDUCATION, PROJECTS, ROLES, SKILLS } from './data/content';

const origin = SITE.url.replace(/\/$/, '');
const abs = (p: string) => `${origin}${p}`;

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function jsonLd() {
  const person = {
    '@type': 'Person',
    '@id': `${origin}/#person`,
    name: SITE.name,
    url: `${origin}/`,
    image: abs(SITE.avatar),
    jobTitle: SITE.role,
    description: SITE.description,
    email: `mailto:${SITE.email}`,
    telephone: SITE.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: SITE.locality,
      addressRegion: SITE.region,
      addressCountry: SITE.country,
    },
    knowsAbout: SKILLS.flatMap((group) => group.items),
    sameAs: SOCIALS.map((social) => social.href),
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: EDUCATION[0].institution,
    },
    worksFor: {
      '@type': 'Organization',
      name: ROLES[0].company,
    },
  };

  const website = {
    '@type': 'WebSite',
    '@id': `${origin}/#website`,
    url: `${origin}/`,
    name: `${SITE.name} — Portfolio`,
    publisher: { '@id': `${origin}/#person` },
    inLanguage: 'en',
  };

  const profilePage = {
    '@type': 'ProfilePage',
    '@id': `${origin}/#profilepage`,
    url: `${origin}/`,
    name: SITE.title,
    description: SITE.description,
    mainEntity: { '@id': `${origin}/#person` },
    isPartOf: { '@id': `${origin}/#website` },
    dateModified: SITE.lastmod,
  };

  const works = PROJECTS.map((project) => ({
    '@type': 'CreativeWork',
    '@id': `${origin}/#${project.slug}`,
    name: project.title,
    description: `${project.problem} ${project.built}`,
    creator: { '@id': `${origin}/#person` },
    keywords: project.stack.join(', '),
    ...(project.links?.live ? { url: project.links.live } : {}),
    ...(project.links?.repo ? { codeRepository: project.links.repo } : {}),
    isPartOf: { '@id': `${origin}/#website` },
  }));

  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [person, website, profilePage, ...works],
  });
}

export function renderHead(): string {
  return [
    `<title>${esc(SITE.title)}</title>`,
    `<meta name="description" content="${esc(SITE.description)}" />`,
    `<link rel="canonical" href="${origin}/" />`,
    `<meta name="robots" content="index,follow,max-image-preview:large" />`,
    `<meta name="author" content="${esc(SITE.name)}" />`,
    `<meta name="theme-color" content="${SITE.themeColor}" />`,
    ``,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:url" content="${origin}/" />`,
    `<meta property="og:title" content="${esc(SITE.title)}" />`,
    `<meta property="og:description" content="${esc(SITE.description)}" />`,
    `<meta property="og:image" content="${abs(SITE.ogImage)}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(`${SITE.name} — ${SITE.role}`)}" />`,
    `<meta property="og:site_name" content="${esc(SITE.name)}" />`,
    `<meta property="og:locale" content="en_US" />`,
    ``,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(SITE.title)}" />`,
    `<meta name="twitter:description" content="${esc(SITE.description)}" />`,
    `<meta name="twitter:image" content="${abs(SITE.ogImage)}" />`,
    `<meta name="twitter:creator" content="@tufailakram1089" />`,
    ``,
    `<link rel="preload" href="/fonts/inter-latin-var.woff2" as="font" type="font/woff2" crossorigin />`,
    `<link rel="preload" as="image" type="image/webp" imagesrcset="${SITE.avatarWebpSrcset}" imagesizes="${SITE.avatarSizes}" />`,
    `<link rel="icon" href="/favicon.svg" type="image/svg+xml" />`,
    `<link rel="apple-touch-icon" href="/apple-touch-icon.png" />`,
    `<link rel="manifest" href="/site.webmanifest" />`,
    ``,
    `<script type="application/ld+json">${jsonLd()}</script>`,
  ].join('\n    ');
}

export function renderRobots(): string {
  return ['User-agent: *', 'Allow: /', '', `Sitemap: ${origin}/sitemap.xml`, ''].join('\n');
}

export function renderSitemap(): string {
  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    `  <url>`,
    `    <loc>${origin}/</loc>`,
    `    <lastmod>${SITE.lastmod}</lastmod>`,
    `    <changefreq>monthly</changefreq>`,
    `    <priority>1.0</priority>`,
    `  </url>`,
    `</urlset>`,
    ``,
  ].join('\n');
}

export function renderWebmanifest(): string {
  return JSON.stringify(
    {
      name: `${SITE.name} — ${SITE.role}`,
      short_name: SITE.name,
      start_url: '/',
      display: 'browser',
      background_color: '#121110',
      theme_color: SITE.themeColor,
      icons: [
        { src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' },
        { src: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      ],
    },
    null,
    2,
  );
}
