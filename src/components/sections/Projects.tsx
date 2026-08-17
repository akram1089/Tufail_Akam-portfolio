import React from 'react';
import { ExternalLink, Github } from 'lucide-react';
import Section from '../Section';
import { PROJECTS } from '../../data/content';

/**
 * Problem → what I built, for each project. `decisions`, `result` and `retro`
 * render only when content.ts has them, so the page never shows a placeholder.
 * The first card spans the grid: it is the current, largest piece of work.
 */
const Projects: React.FC = () => (
  <Section
    id="projects"
    eyebrow="What I've built"
    title="Projects"
    intro="Client and enterprise work, so most of it has no public URL. Problem first, then what I actually built."
  >
    <ul className="grid gap-6 md:grid-cols-2">
      {PROJECTS.map((project, index) => (
        <li key={project.slug} className={index === 0 ? 'md:col-span-2' : undefined}>
          <article className="card card-hover flex h-full flex-col p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="accent-soft rounded-full px-3 py-1 text-sm font-semibold">
                {project.tag}
              </span>
              <span className="font-mono text-sm text-muted">
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>

            <h3 className="mt-4 text-h3 font-bold">{project.title}</h3>
            <p className="mt-1 text-sm text-muted">{project.context}</p>

            <dl className={`mt-5 flex-1 ${index === 0 ? 'grid gap-5 lg:grid-cols-2' : 'space-y-4'}`}>
              <div>
                <dt className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">
                  Problem
                </dt>
                <dd className="mt-1.5 text-muted">{project.problem}</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">
                  What I built
                </dt>
                <dd className="mt-1.5 text-muted">{project.built}</dd>
              </div>

              {project.decisions && project.decisions.length > 0 && (
                <div>
                  <dt className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">
                    Decisions
                  </dt>
                  <dd className="mt-1.5">
                    <ul className="space-y-2">
                      {project.decisions.map((decision) => (
                        <li key={decision.slice(0, 24)} className="relative pl-6 text-muted">
                          <span
                            aria-hidden="true"
                            className="absolute left-0 top-[0.7em] h-1 w-1 rounded-full bg-accent"
                          />
                          {decision}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              )}
              {project.result && (
                <div>
                  <dt className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">
                    Result
                  </dt>
                  <dd className="mt-1.5 text-muted">{project.result}</dd>
                </div>
              )}
              {project.retro && (
                <div>
                  <dt className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">
                    What I&rsquo;d do differently
                  </dt>
                  <dd className="mt-1.5 text-muted">{project.retro}</dd>
                </div>
              )}
            </dl>

            {project.image && (
              <img
                src={project.image.src}
                alt={project.image.alt}
                width={project.image.width}
                height={project.image.height}
                loading="lazy"
                decoding="async"
                className="mt-6 w-full rounded-xl border border-line"
              />
            )}

            <ul className="mt-6 flex flex-wrap gap-2 border-t border-line pt-5">
              {project.stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-lg border border-line bg-card px-2.5 py-1 text-sm text-muted"
                >
                  {tech}
                </li>
              ))}
            </ul>

            {(project.links?.live || project.links?.repo) && (
              <div className="mt-5 flex flex-wrap gap-3">
                {project.links.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2 text-sm font-semibold text-page"
                  >
                    <ExternalLink size={15} aria-hidden="true" />
                    Live
                  </a>
                )}
                {project.links.repo && (
                  <a
                    href={project.links.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2 text-sm font-semibold text-muted transition-colors hover:border-accent/40 hover:text-accent"
                  >
                    <Github size={15} aria-hidden="true" />
                    Code
                  </a>
                )}
              </div>
            )}
          </article>
        </li>
      ))}
    </ul>
  </Section>
);

export default Projects;
