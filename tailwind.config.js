/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  // Dark is the default; `.light` is the opt-in class the dock toggle sets.
  darkMode: ['class', '.light *'],
  theme: {
    extend: {
      colors: {
        page: 'rgb(var(--page) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        card: 'rgb(var(--card) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        mono: ['ui-monospace', 'SFMono-Regular', 'Consolas', 'Liberation Mono', 'monospace'],
      },
      // Fluid, five steps.
      fontSize: {
        display: ['clamp(2.75rem, 8vw, 5.25rem)', { lineHeight: '1.04', letterSpacing: '-0.03em' }],
        h2: ['clamp(1.875rem, 4vw, 2.75rem)', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        h3: ['clamp(1.125rem, 1.8vw, 1.375rem)', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        lead: ['clamp(1.0625rem, 1.5vw, 1.25rem)', { lineHeight: '1.65' }],
        base: ['1rem', { lineHeight: '1.7' }],
        sm: ['0.875rem', { lineHeight: '1.6' }],
      },
      maxWidth: {
        page: '72rem',
        prose: '68ch',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};
