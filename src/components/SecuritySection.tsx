import {
  BuildingOffice2Icon,
  LockClosedIcon,
  GlobeEuropeAfricaIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { useReveal } from "./useReveal";
import { reveal } from "./motion";

type Point = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  copy: string;
};

const POINTS: Point[] = [
  {
    icon: BuildingOffice2Icon,
    title: "Per-organisation isolation",
    copy: "Every clinic's data is isolated at the database level. One organisation can never see another's patients or recordings.",
  },
  {
    icon: LockClosedIcon,
    title: "Encrypted in transit and at rest",
    copy: "Data travels over TLS, and recordings and databases are encrypted while stored.",
  },
  {
    icon: GlobeEuropeAfricaIcon,
    title: "Hosted in the EU",
    copy: "Our servers and file storage are in the European Union, and we handle personal data under the GDPR.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Private recordings",
    copy: "Recordings are reached through short-lived, signed links, never from a public location.",
  },
];

const SecuritySection = () => {
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
          Security and data
        </p>
        <h2
          className="mt-5 font-heading font-bold text-calm-charcoal tracking-tight max-w-3xl"
          style={{
            fontSize: "clamp(2rem, 5vw, 3.75rem)",
            lineHeight: 1.08,
            ...reveal(revealed, 80),
          }}
        >
          Patient data, handled with care.
        </h2>
        <p
          className="mt-5 max-w-2xl font-body text-lg text-calm-charcoal/70 leading-relaxed"
          style={reveal(revealed, 160)}
        >
          Clinics trust us with sensitive recordings. We treat that data the way
          a clinic would, and a therapist always has the final say on what the
          AI produces.
        </p>

        <ul className="mt-[clamp(2.5rem,5vw,4rem)] grid grid-cols-1 gap-6 sm:grid-cols-2">
          {POINTS.map((point, index) => {
            const Icon = point.icon;
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
            href="/privacy"
            className="font-semibold text-calm-navy underline decoration-calm-navy/30 underline-offset-4 transition-colors hover:decoration-calm-navy"
          >
            Read our Privacy Policy
          </a>
        </p>
      </div>
    </section>
  );
};

export default SecuritySection;
