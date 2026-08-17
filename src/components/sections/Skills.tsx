import React from 'react';
import { Layers, Rocket, Terminal } from 'lucide-react';
import Section from '../Section';
import { SKILLS } from '../../data/content';

const ICONS = [Terminal, Layers, Rocket];

/** Three plain lists — no percentages, no bars, no star ratings (§3.5). */
const Skills: React.FC = () => (
  <Section
    id="skills"
    eyebrow="What I work with"
    title="Skills"
    intro="Grouped by how often I actually use them, not by a made-up percentage."
  >
    <div className="grid items-start gap-6 md:grid-cols-2 lg:grid-cols-3">
      {SKILLS.filter((group) => group.items.length > 0).map((group, index) => {
        const Icon = ICONS[index % ICONS.length];
        return (
          <div key={group.title} className="card card-hover p-6 sm:p-7">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg accent-soft">
                <Icon size={20} aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-h3 font-bold">{group.title}</h3>
                <p className="text-sm text-muted">{group.note}</p>
              </div>
            </div>

            <ul className="mt-6 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-lg border border-line bg-card px-3 py-1.5 text-sm text-ink/90"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  </Section>
);

export default Skills;
