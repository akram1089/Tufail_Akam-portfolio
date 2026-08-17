import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = { hasError: false, error: null };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      // No <h1> here — the page already has one, and a second would break the
      // heading hierarchy for anyone who lands in this state.
      return (
        <div className="mx-auto max-w-page px-5 py-20 sm:px-8">
          <p className="text-h2 font-extrabold">Something broke on this page.</p>
          <p className="mt-4 max-w-prose text-muted">
            The content is still in the HTML — try reloading. If it keeps happening, email
            tufailakram81@gmail.com.
          </p>
          {this.state.error && (
            <pre className="card mt-6 overflow-x-auto p-4 font-mono text-sm text-muted">
              {this.state.error.toString()}
            </pre>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
