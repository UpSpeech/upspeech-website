import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const rootElement = document.getElementById("root")!;

// createRoot, deliberately, even though every route ships prerendered markup.
//
// hydrateRoot is worth about 2.5s of LCP here. The prerendered text paints at
// ~1.7s, createRoot deletes it at ~3.9s and repaints at ~4.2s, and that repaint
// is what Chrome reports as LCP. Hydrating would keep the first paint instead.
//
// It does not work, because scripts/prerender.mjs produces HTML by serializing a
// live DOM rather than through renderToString, and three things do not survive
// that trip:
//
//   1. Suspense boundaries. React matches them against <!--$--> markers, and a
//      serialized DOM has none, so hydration throws at the boundary in App.
//   2. Adjacent text nodes. renderToString writes <!-- --> between them; see
//      GapSection, where `{t.headlineWithPrefix}{" "}` sits before a <span>.
//      Serialization merges the two into one run, so React finds one text node
//      where it expects two.
//   3. Inline styles. The browser re-serializes `pointer-events:none` as
//      `pointer-events: none;`, which React reports as a prop mismatch.
//
// React recovers from all three by throwing the markup away and client
// rendering, which is what createRoot does directly, so switching buys nothing
// and only adds a failed hydration pass first. Closing that 2.5s means
// prerendering through renderToString, which is a real piece of work: the app
// has to become server-renderable before any of it helps.
createRoot(rootElement).render(<App />);
