import React from 'react';

interface SectionProps {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}

/**
 * Every section uses the same container width, vertical rhythm and heading block,
 * so the sections line up with each other down the page.
 * Heading order: one h1 in the hero → one h2 per section → h3 per card.
 */
const Section: React.FC<SectionProps> = ({ id, eyebrow, title, intro, children }) => (
  <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24 py-20 sm:py-28">
    <div className="mx-auto w-full max-w-page px-5 sm:px-8">
      <header className="mb-12 text-center sm:mb-16">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted">{eyebrow}</p>
        <h2 id={`${id}-title`} className="mt-3 text-h2 font-extrabold">{title}</h2>
        <div className="mx-auto mt-4 h-0.5 w-14 bg-accent" />
        {intro && <p className="mx-auto mt-5 max-w-prose text-muted">{intro}</p>}
      </header>
      {children}
    </div>
  </section>
);

export default Section;
