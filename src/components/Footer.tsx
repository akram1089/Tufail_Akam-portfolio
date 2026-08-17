import React from 'react';
import { SECTIONS, SITE, SOCIALS } from '../data/site';

const Footer: React.FC = () => (
  <footer className="border-t border-line">
    <div className="mx-auto w-full max-w-page px-5 py-10 sm:px-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-h3 font-bold">
            {SITE.name}
            <span className="text-accent">.</span>
          </p>
          <p className="mt-1 text-sm text-muted">
            {SITE.role} · {SITE.locality}, {SITE.countryName}
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted sm:justify-end">
            {SECTIONS.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`} className="transition-colors hover:text-accent">
                  {section.label}
                </a>
              </li>
            ))}
            {SOCIALS.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer me"
                  className="transition-colors hover:text-accent"
                >
                  {social.label}
                </a>
              </li>
            ))}
            <li>
              <a href={SITE.resume} className="transition-colors hover:text-accent">
                Résumé
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <p className="mt-8 border-t border-line pt-6 text-sm text-muted">
        Last updated: {SITE.lastUpdated}. Built with React and Vite, prerendered to static HTML.
      </p>
    </div>
  </footer>
);

export default Footer;
