import React from 'react';
import {
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Twitter,
} from 'lucide-react';
import Section from '../Section';
import { SITE, SOCIALS } from '../../data/site';
import { HERO } from '../../data/content';

const SOCIAL_ICONS = { GitHub: Github, LinkedIn: Linkedin, X: Twitter } as const;

/**
 * A mailto, not a form (§3.2). The form this replaced ran a 2-second timeout and
 * then said "Message sent successfully!" — every message was discarded.
 */
const Contact: React.FC = () => (
  <Section
    id="contact"
    eyebrow="Say hello"
    title="Get In Touch"
    intro={`${HERO.status}. Email is the fastest way to reach me — I reply to anything specific.`}
  >
    <div className="grid gap-6 lg:grid-cols-12">
      <div className="card h-full p-7 sm:p-9 lg:col-span-7">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">Email</p>
        <a
          href={`mailto:${SITE.email}`}
          className="mt-2 inline-block break-words text-h3 font-bold hover:text-accent transition-colors"
        >
          {SITE.email}
        </a>

        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          <li>
            <a
              href={SITE.phoneHref}
              className="flex items-center gap-3 rounded-xl border border-line bg-card p-4 transition-colors hover:border-accent/40"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg accent-soft">
                <Phone size={17} aria-hidden="true" />
              </span>
              <span>
                <span className="block text-sm text-muted">Phone</span>
                <span className="font-medium">{SITE.phone}</span>
              </span>
            </a>
          </li>
          <li>
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl border border-line bg-card p-4 transition-colors hover:border-accent/40"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg accent-soft">
                <MessageCircle size={17} aria-hidden="true" />
              </span>
              <span>
                <span className="block text-sm text-muted">WhatsApp</span>
                <span className="font-medium">{SITE.phone}</span>
              </span>
            </a>
          </li>
          <li className="sm:col-span-2">
            <div className="flex items-center gap-3 rounded-xl border border-line bg-card p-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg accent-soft">
                <MapPin size={17} aria-hidden="true" />
              </span>
              <span>
                <span className="block text-sm text-muted">Location</span>
                <span className="font-medium">
                  {SITE.locality}, {SITE.region}, {SITE.countryName} · {SITE.timezone}
                </span>
              </span>
            </div>
          </li>
        </ul>
      </div>

      <div className="lg:col-span-5">
        <div className="card h-full p-7 sm:p-8">
          <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">Elsewhere</h3>
          <ul className="mt-5 space-y-3">
            {SOCIALS.map((social) => {
              const Icon = SOCIAL_ICONS[social.label];
              return (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer me"
                    className="group flex items-center gap-3 text-muted transition-colors hover:text-accent"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-line bg-card transition-colors group-hover:border-accent/40">
                      <Icon size={17} aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block font-medium text-ink">{social.label}</span>
                      <span className="block text-sm">{social.handle}</span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

      </div>

      <div className="card flex flex-col items-center gap-5 p-7 text-center sm:p-8 lg:col-span-12 lg:flex-row lg:justify-between lg:text-left">
        <p className="text-muted">
          Prefer the short version? The CV covers the same ground in two pages.
        </p>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <a
            href={SITE.resume}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 font-semibold text-page transition-opacity duration-300 hover:opacity-90"
          >
            <Download size={17} aria-hidden="true" />
            Download Résumé
          </a>
          <a
            href={`mailto:${SITE.email}`}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-line px-6 py-3 font-semibold text-ink transition-colors hover:border-accent/60 hover:text-accent"
          >
            <Mail size={17} aria-hidden="true" />
            Email me
          </a>
        </div>
      </div>
    </div>
  </Section>
);

export default Contact;
