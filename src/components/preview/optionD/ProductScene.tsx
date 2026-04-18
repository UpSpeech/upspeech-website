import { useReveal } from "./useReveal";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

export type ValuePoint = {
  label: string;
  copy: string;
};

type Props = {
  act: string;
  eyebrow: string;
  headline: React.ReactNode;
  body: string;
  image: string;
  imageAlt: string;
  url?: string;
  points: ValuePoint[];
  tone: "light" | "offwhite";
  align?: "left" | "right";
};

const ProductScene = ({
  act,
  eyebrow,
  headline,
  body,
  image,
  imageAlt,
  url = "app.upspeech.io",
  points,
  tone,
  align = "left",
}: Props) => {
  const { ref, revealed } = useReveal<HTMLDivElement>({ threshold: 0.2 });

  const bg = tone === "light" ? "bg-calm-light" : "bg-white";

  const style = (delay: number): React.CSSProperties => ({
    transition: `opacity 900ms ${EASE}, transform 900ms ${EASE}`,
    transitionDelay: `${delay}ms`,
    opacity: revealed ? 1 : 0,
    transform: revealed ? "translateY(0)" : "translateY(24px)",
  });

  return (
    <section
      className={`relative ${bg} py-[clamp(5rem,10vw,10rem)] px-[max(1.5rem,5vw)] overflow-hidden`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            align === "left"
              ? "radial-gradient(900px 600px at 85% 10%, rgba(152,165,254,0.15), transparent 55%)"
              : "radial-gradient(900px 600px at 15% 10%, rgba(152,165,254,0.15), transparent 55%)",
        }}
      />

      <div ref={ref} className="relative max-w-6xl mx-auto">
        <div className={align === "right" ? "text-right ml-auto" : ""}>
          <p
            className="font-body text-[11px] font-semibold tracking-[0.3em] uppercase text-calm-lavender"
            style={style(0)}
          >
            {act} · {eyebrow}
          </p>
          <h2
            className="mt-5 font-heading font-bold text-calm-charcoal tracking-tight max-w-4xl"
            style={{
              fontSize: "clamp(2rem, 5.5vw, 4.5rem)",
              lineHeight: 1.05,
              marginLeft: align === "right" ? "auto" : undefined,
              ...style(80),
            }}
          >
            {headline}
          </h2>
          <p
            className="mt-6 max-w-2xl font-body text-base sm:text-lg text-calm-charcoal/65 leading-relaxed"
            style={{
              marginLeft: align === "right" ? "auto" : undefined,
              ...style(160),
            }}
          >
            {body}
          </p>
        </div>

        {/* Product shot */}
        <div
          className="mt-[clamp(3rem,6vw,5rem)]"
          style={{
            transition: `opacity 1200ms ${EASE}, transform 1200ms ${EASE}`,
            transitionDelay: "260ms",
            opacity: revealed ? 1 : 0,
            transform: revealed
              ? "translateY(0) scale(1)"
              : "translateY(40px) scale(0.98)",
          }}
        >
          <div className="relative rounded-[1.25rem] sm:rounded-[1.5rem] overflow-hidden border border-calm-navy/10 bg-white shadow-[0_30px_80px_-30px_rgba(41,53,135,0.35)]">
            <div className="flex items-center gap-2 px-4 py-3 bg-calm-light/80 border-b border-calm-charcoal/5">
              <span className="w-2.5 h-2.5 rounded-full bg-calm-charcoal/15" />
              <span className="w-2.5 h-2.5 rounded-full bg-calm-charcoal/15" />
              <span className="w-2.5 h-2.5 rounded-full bg-calm-charcoal/15" />
              <div className="ml-3 flex-1 h-5 rounded-md bg-white/90 max-w-[260px] border border-calm-charcoal/5 flex items-center justify-center">
                <span className="font-body text-[10px] text-calm-charcoal/40 tabular-nums">
                  {url}
                </span>
              </div>
            </div>
            <img
              src={image}
              alt={imageAlt}
              className="w-full h-auto block"
              loading="lazy"
            />
          </div>
        </div>

        {/* Value points */}
        <div className="mt-[clamp(2.5rem,5vw,4rem)] grid gap-x-10 gap-y-6 sm:grid-cols-3">
          {points.map((p, i) => (
            <div
              key={p.label}
              className="border-t border-calm-charcoal/15 pt-5"
              style={{
                transition: `opacity 900ms ${EASE}, transform 900ms ${EASE}`,
                transitionDelay: `${400 + i * 100}ms`,
                opacity: revealed ? 1 : 0,
                transform: revealed ? "translateY(0)" : "translateY(20px)",
              }}
            >
              <div className="font-body text-[11px] font-semibold tracking-[0.2em] uppercase text-calm-lavender">
                {p.label}
              </div>
              <p className="mt-2 font-body text-sm sm:text-base text-calm-charcoal/75 leading-relaxed">
                {p.copy}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductScene;
