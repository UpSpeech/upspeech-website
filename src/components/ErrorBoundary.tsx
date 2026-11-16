import { Component, type ReactNode } from "react";
import { getDictionary, localizedHref, splitLocaleFromPath } from "@/i18n";

type Props = { children: ReactNode };

/**
 * The last catch for a render error anywhere in the app. It sits outside the
 * router and the locale provider, so it reads the locale from the URL.
 */
export class ErrorBoundary extends Component<Props, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    console.error("Render error:", error);
  }

  render() {
    if (!this.state.failed) return this.props.children;

    const { locale } = splitLocaleFromPath(window.location.pathname);
    const t = getDictionary(locale);
    return (
      <main
        id="main"
        className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 text-center font-body bg-white"
      >
        <h1 className="t-display font-accent font-bold text-calm-navy tracking-tight">
          {t.crash.title}
        </h1>
        <div className="flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="inline-flex items-center justify-center rounded-full bg-calm-navy px-6 py-3 font-bold text-white"
          >
            {t.crash.reload}
          </button>
          <a
            href={localizedHref("/", locale)}
            className="inline-flex items-center justify-center rounded-full px-6 py-3 font-bold text-calm-navy underline"
          >
            {t.notFound.backHome}
          </a>
        </div>
      </main>
    );
  }
}
