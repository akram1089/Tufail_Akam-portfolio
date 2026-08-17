import React from 'react';
import { Award, Calendar, GraduationCap, MapPin } from 'lucide-react';
import Section from '../Section';
import { CERTIFICATIONS, EDUCATION, ROLES } from '../../data/content';

/**
 * Single left rail, one card per role — the alternating left/right timeline never
 * lined up on any screen size and read as decoration.
 */
const Experience: React.FC = () => (
  <Section
    id="experience"
    eyebrow="Where I've worked"
    title="Experience"
    intro="Three roles, five years: client full-stack work, then a financial data platform, now enterprise backend and AI."
  >
    <ol className="relative space-y-6">
      <div
        aria-hidden="true"
        className="absolute -left-6 top-4 hidden h-[calc(100%-2rem)] w-px bg-line sm:block"
      />

      {ROLES.map((role) => (
        <li key={`${role.company}-${role.period}`} className="relative">
          <span
            aria-hidden="true"
            className="absolute -left-[1.79rem] top-8 hidden h-2.5 w-2.5 rounded-full bg-accent ring-4 ring-page sm:block"
          />

          <article className="card card-hover p-6 sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
              <div>
                <h3 className="text-h3 font-bold">
                  {role.url ? (
                    <a
                      href={role.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-accent transition-colors"
                    >
                      {role.company}
                    </a>
                  ) : (
                    role.company
                  )}
                </h3>
                <p className="mt-1 font-semibold text-accent">{role.position}</p>
              </div>

              <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted">
                <li className="flex items-center gap-1.5">
                  <Calendar size={15} aria-hidden="true" />
                  {role.period}
                </li>
                <li className="flex items-center gap-1.5">
                  <MapPin size={15} aria-hidden="true" />
                  {role.location}
                </li>
              </ul>
            </div>

            <p className="mt-4 border-l-2 border-accent pl-4 text-muted">{role.focus}</p>

            <ul className="mt-5 space-y-2.5">
              {role.bullets.map((bullet) => (
                <li key={bullet.slice(0, 28)} className="relative pl-6 text-ink/90">
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-[0.7em] h-1 w-1 rounded-full bg-accent"
                  />
                  {bullet}
                </li>
              ))}
            </ul>

            <ul className="mt-6 flex flex-wrap gap-2">
              {role.stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-lg border border-line bg-card px-2.5 py-1 text-sm text-muted"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </article>
        </li>
      ))}
    </ol>

    <div className="mt-6 grid gap-6 md:grid-cols-2">
      <div className="card p-6 sm:p-7">
        <h3 className="flex items-center gap-2 text-h3 font-bold">
          <GraduationCap size={20} className="text-accent" aria-hidden="true" />
          Education
        </h3>
        <ul className="mt-5 space-y-5">
          {EDUCATION.map((item) => (
            <li key={item.institution}>
              <p className="font-semibold">{item.qualification}</p>
              <p className="mt-1 text-sm text-muted">{item.institution}</p>
              <p className="mt-0.5 text-sm text-accent">{item.period}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="card p-6 sm:p-7">
        <h3 className="flex items-center gap-2 text-h3 font-bold">
          <Award size={20} className="text-accent" aria-hidden="true" />
          Certifications
        </h3>
        <ul className="mt-5 space-y-2.5">
          {CERTIFICATIONS.map((certification) => (
            <li key={certification} className="relative pl-6 text-muted">
              <span
                aria-hidden="true"
                className="absolute left-0 top-[0.7em] h-1 w-1 rounded-full bg-accent"
              />
              {certification}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </Section>
);

export default Experience;
