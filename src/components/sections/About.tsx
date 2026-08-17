import React from 'react';
import { Briefcase, Languages as LanguagesIcon, MapPin, Sparkles } from 'lucide-react';
import Section from '../Section';
import { ABOUT, HERO, LANGUAGES } from '../../data/content';
import { SITE } from '../../data/site';

const FACTS = [
  { icon: MapPin, label: 'Based in', value: `${SITE.locality}, ${SITE.countryName} · ${SITE.timezone}` },
  { icon: Briefcase, label: 'Experience', value: '5+ years — backend, data, AI' },
  { icon: Sparkles, label: 'Right now', value: 'Cisco asset platform @ BayRock Labs' },
];

const About: React.FC = () => (
  <Section
    id="about"
    eyebrow="Who I am"
    title="About Me"
    intro="Backend first, data close behind, and lately a lot of LLM plumbing."
  >
    <div className="grid gap-6 lg:grid-cols-12">
      <div className="card p-7 sm:p-9 lg:col-span-7">
        {ABOUT.paragraphs.map((paragraph, index) => (
          <p key={paragraph.slice(0, 24)} className={index === 0 ? 'text-lead' : 'mt-4 text-muted'}>
            {paragraph}
          </p>
        ))}
        {ABOUT.opinion && <p className="mt-4 text-muted">{ABOUT.opinion}</p>}
        {ABOUT.personal && <p className="mt-4 text-muted">{ABOUT.personal}</p>}

        <p className="mt-6 border-t border-line pt-6 text-sm text-muted">{HERO.status}.</p>
      </div>

      <div className="flex flex-col gap-6 lg:col-span-5">
        <ul className="card shrink-0 divide-y divide-line">
          {FACTS.map((fact) => (
            <li key={fact.label} className="flex items-start gap-4 p-5 sm:p-6">
              <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg accent-soft">
                <fact.icon size={18} aria-hidden="true" />
              </span>
              <span>
                <span className="block text-sm text-muted">{fact.label}</span>
                <span className="mt-0.5 block font-medium">{fact.value}</span>
              </span>
            </li>
          ))}
        </ul>

        <div className="card flex-1 p-5 sm:p-6">
          <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-muted">
            <LanguagesIcon size={16} aria-hidden="true" />
            Languages
          </h3>
          <dl className="mt-4 space-y-2.5">
            {LANGUAGES.map((language) => (
              <div key={language.name} className="flex items-baseline justify-between gap-4">
                <dt className="font-medium">{language.name}</dt>
                <dd className="text-right text-sm text-muted">{language.level}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  </Section>
);

export default About;
