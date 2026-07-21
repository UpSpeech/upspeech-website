import {
  BuildingOffice2Icon,
  LockClosedIcon,
  GlobeEuropeAfricaIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { useReveal } from "./useReveal";
import { reveal } from "./motion";
import { useLocale, useT, localizedPath } from "@/i18n";

// Icons stay in code; title/copy come from the dictionary by index
// (home.security.points).
const POINT_ICONS: React.ComponentType<React.SVGProps<SVGSVGElement>>[] = [
  BuildingOffice2Icon,
  LockClosedIcon,
  GlobeEuropeAfricaIcon,
  ShieldCheckIcon,
];

const SecuritySection = () => {
  const locale = useLocale();
  const t = useT().home.security;
  const { ref, revealed } = useReveal<HTMLDivElement>({ threshold: 0.05 });

  return (
    <section className="relative bg-calm-light px-[max(1.5rem,5vw)] py-[clamp(5rem,10vw,10rem)] overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(800px 600px at 92% 12%, rgba(152,165,254,0.12), transparent 60%)",
        }}
      />

      <div ref={ref} className="relative max-w-6xl mx-auto">
        <p
          className="font-body text-[11px] font-semibold tracking-[0.3em] uppercase text-calm-lavender"
          style={reveal(revealed, 0)}
        >
          {t.eyebrow}
        </p>
        <h2
          className="mt-5 font-heading font-bold text-calm-charcoal tracking-tight max-w-3xl"
          style={{
            fontSize: "clamp(2rem, 5vw, 3.75rem)",
            lineHeight: 1.08,
            ...reveal(revealed, 80),
          }}
        >
          {t.headline}
        </h2>
        <p
          className="mt-5 max-w-2xl font-body text-lg text-calm-charcoal/70 leading-relaxed"
          style={reveal(revealed, 160)}
        >
          {t.body}
        </p>

        <ul className="mt-[clamp(2.5rem,5vw,4rem)] grid grid-cols-1 gap-6 sm:grid-cols-2">
          {t.points.map((point, index) => {
            const Icon = POINT_ICONS[index];
            return (
              <li
                key={point.title}
                className="flex gap-4 rounded-2xl border border-calm-navy/10 bg-white p-6 shadow-[0_20px_50px_-30px_rgba(41,53,135,0.35)]"
                style={reveal(revealed, 240 + index * 90)}
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-calm-lavender/15 text-calm-navy">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-heading font-semibold text-calm-charcoal text-lg leading-tight">
                    {point.title}
                  </h3>
                  <p className="mt-2 font-body text-sm text-calm-charcoal/70 leading-relaxed">
                    {point.copy}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>

        <p
          className="mt-10 font-body text-sm text-calm-charcoal/70"
          style={reveal(revealed, 640)}
        >
          <a
            href={localizedPath("/privacy", locale)}
            className="font-semibold text-calm-navy underline decoration-calm-navy/30 underline-offset-4 transition-colors hover:decoration-calm-navy"
          >
            {t.readPrivacy}
          </a>
        </p>
      </div>
    </section>
  );
};

export default SecuritySection;
