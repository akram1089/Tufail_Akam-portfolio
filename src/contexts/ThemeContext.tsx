import React, { createContext, useContext, useEffect, useState } from 'react';

interface ThemeContextType {
  isLight: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};

/**
 * Dark navy is the default and light is an explicit opt-in, so the `light` class
 * on <html> is the single switch. The inline script in index.html applies it
 * before first paint; this provider reads it after hydration and owns the toggle.
 * Server and first client render both start at dark, so hydration stays clean.
 */
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    setIsLight(document.documentElement.classList.contains('light'));
  }, []);

  const toggleTheme = () => {
    const next = !isLight;
    setIsLight(next);
    document.documentElement.classList.toggle('light', next);
    try {
      localStorage.setItem('theme', next ? 'light' : 'dark');
    } catch {
      // Storage blocked — the toggle still works for this page view.
    }
  };

  return <ThemeContext.Provider value={{ isLight, toggleTheme }}>{children}</ThemeContext.Provider>;
};
