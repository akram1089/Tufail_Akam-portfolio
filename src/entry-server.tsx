import { renderToString } from 'react-dom/server';
import App from './App';

/**
 * SSR entry used only at build time by scripts/prerender.mjs.
 * Output is injected into dist/index.html so the deployed page ships real HTML.
 *
 * The client hydrates <StrictMode><ErrorBoundary><App /></ErrorBoundary></StrictMode>;
 * both wrappers render children transparently, so the DOM matches this output.
 */
export function render(): string {
  return renderToString(<App />);
}
