import React, { useEffect, useState } from 'react';
import {
  Braces,
  Briefcase,
  FolderOpen,
  Home,
  Mail,
  Moon,
  Sun,
  User,
} from 'lucide-react';
import { SECTIONS, SITE } from '../data/site';
import { useTheme } from '../contexts/ThemeContext';

const ICONS = {
  home: Home,
  user: User,
  code: Braces,
  briefcase: Briefcase,
  folder: FolderOpen,
  mail: Mail,
} as const;

/**
 * Floating navigation. Every item is a real <a href="#section"> so it works
 * without JavaScript and gives crawlers internal links; the active state is a
 * progressive enhancement driven by IntersectionObserver.
 */
const Dock: React.FC = () => {
  const { isLight, toggleTheme } = useTheme();
  const [active, setActive] = useState<string>(SECTIONS[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.5, 1] },
    );

    for (const section of SECTIONS) {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Sections"
      className="no-print fixed inset-x-0 bottom-4 z-50 flex justify-center px-4 sm:bottom-6"
    >
      <ul className="flex items-center gap-0.5 rounded-full border border-line bg-card p-1.5 shadow-lg shadow-black/20 sm:gap-1 sm:p-2">
        {SECTIONS.map((section) => {
          const Icon = ICONS[section.icon];
          const isActive = active === section.id;
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-label={section.label}
                aria-current={isActive ? 'true' : undefined}
                title={section.label}
                className={`relative flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-300 sm:h-11 sm:w-11 ${
                  isActive
                    ? 'bg-accent text-page'
                    : 'text-muted hover:bg-card hover:text-ink'
                }`}
              >
                <Icon size={18} aria-hidden="true" />
              </a>
            </li>
          );
        })}

        <li aria-hidden="true" className="mx-1 h-5 w-px bg-line" />

        <li>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isLight ? 'Switch to dark theme' : 'Switch to light theme'}
            title={isLight ? 'Dark theme' : 'Light theme'}
            className="flex h-10 w-10 items-center justify-center rounded-full text-muted transition-colors duration-300 hover:bg-card hover:text-ink sm:h-11 sm:w-11"
          >
            {isLight ? <Moon size={18} aria-hidden="true" /> : <Sun size={18} aria-hidden="true" />}
          </button>
        </li>

        <li className="hidden sm:block">
          <a
            href={SITE.resume}
            className="ml-1 mr-1 rounded-full px-3 py-2 text-sm font-medium text-muted transition-colors duration-300 hover:text-ink"
          >
            CV
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Dock;
