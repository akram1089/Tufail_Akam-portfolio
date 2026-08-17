import React from 'react';
import { ArrowRight, Download, Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { HERO } from '../../data/content';
import { SITE, SOCIALS } from '../../data/site';

const SOCIAL_ICONS = { GitHub: Github, LinkedIn: Linkedin, X: Twitter } as const;

const Hero: React.FC = () => (
  <section id="home" className="relative flex min-h-[100svh] items-center justify-center px-5 py-20 sm:px-8 sm:py-24">
    <div className="mx-auto w-full max-w-4xl text-center">
      {/* Portrait */}
      <div className="rise relative mx-auto mb-8 h-40 w-40 sm:mb-10 sm:h-52 sm:w-52 md:h-64 md:w-64">
        <div
          aria-hidden="true"
          className="ring-dashed absolute -inset-4 rounded-full border border-dashed border-accent/45"
        />
        <picture>
          <source type="image/webp" srcSet={SITE.avatarWebpSrcset} sizes={SITE.avatarSizes} />
          <img
            src={SITE.avatar}
            alt={`${SITE.name}, ${SITE.role.toLowerCase()}`}
            width={SITE.avatarSize}
            height={SITE.avatarSize}
            decoding="async"
            className="relative h-full w-full rounded-full border-2 border-line object-cover object-top shadow-xl shadow-black/25"
          />
        </picture>
      </div>

      {/* Name + role in a single h1 */}
      <h1 className="rise [animation-delay:70ms]">
        <span className="inline-block text-display font-extrabold">
          {HERO.name}
          <span className="text-accent">.</span>
        </span>
        <span className="sr-only"> — </span>
        <span className="mt-3 block text-lead font-semibold text-ink sm:text-2xl">{HERO.role}</span>
      </h1>

      <p className="rise mx-auto mt-5 max-w-2xl text-sm text-muted sm:mt-6 sm:text-base [animation-delay:130ms]">{HERO.tagline}</p>

      <p className="rise mt-5 inline-flex items-center gap-2 rounded-full border border-line bg-card px-4 py-2 text-xs text-muted sm:mt-6 sm:text-sm [animation-delay:180ms]">
        <span aria-hidden="true" className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-50" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
        </span>
        {HERO.status}
      </p>

      {/* Stack chips */}
      <ul className="rise mt-6 flex flex-wrap justify-center gap-2 sm:mt-9 sm:gap-2.5 [animation-delay:230ms]">
        {HERO.stack.map((tech, index) => (
          <li key={tech} className={index >= 6 ? 'chip hidden sm:block' : 'chip'}>
            {tech}
          </li>
        ))}
      </ul>

      {/* Calls to action */}
      <div className="rise mt-7 flex items-center justify-center gap-3 sm:mt-10 [animation-delay:280ms]">
        <a
          href="#projects"
          className="group inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-accent px-5 py-3.5 font-semibold text-page transition-opacity duration-300 hover:opacity-90 sm:flex-none sm:px-8"
        >
          View My Work
          <ArrowRight
            size={18}
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-0.5"
          />
        </a>
        <a
          href="#contact"
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-line px-5 py-3.5 font-semibold text-ink transition-colors duration-300 hover:border-accent/60 hover:text-accent sm:flex-none sm:px-8"
        >
          <Mail size={18} aria-hidden="true" />
          Get In Touch
        </a>
      </div>

      {/* Elsewhere */}
      <ul className="rise mt-6 flex flex-wrap items-center justify-center gap-3 sm:mt-8 [animation-delay:330ms]">
        {SOCIALS.map((social) => {
          const Icon = SOCIAL_ICONS[social.label];
          return (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer me"
                aria-label={social.label}
                title={social.label}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-card text-muted transition-colors duration-300 hover:border-accent/40 hover:text-accent"
              >
                <Icon size={18} aria-hidden="true" />
              </a>
            </li>
          );
        })}
        <li>
          <a
            href={SITE.resume}
            className="inline-flex h-11 items-center gap-2 rounded-full border border-line bg-card px-5 text-sm font-medium text-muted transition-colors duration-300 hover:border-accent/40 hover:text-accent"
          >
            <Download size={16} aria-hidden="true" />
            Résumé
          </a>
        </li>
      </ul>
    </div>
  </section>
);

export default Hero;
