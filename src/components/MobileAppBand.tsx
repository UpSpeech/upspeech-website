import { useEffect, useRef } from "react";
import { useReveal } from "./useReveal";
import { reveal, EASE } from "./motion";

// Framed iPhone store screenshots (the device bezel is baked into the art, so
// they render as real devices, no extra CSS frame). Downscaled WebP copies of
// the app-mobile store art; width/height are intrinsic pixels (layout stability).
const SCREENSHOTS = [
  {
    src: "/screenshots/mobile/patient-journey.webp",
    alt: "UpSpeech mobile app learning path showing the steps the therapist set",
  },
  {
    src: "/screenshots/mobile/patient-practice.webp",
    alt: "UpSpeech mobile app practice screen with guided stuttering exercises",
  },
  {
    src: "/screenshots/mobile/patient-home.webp",
    alt: "UpSpeech mobile app home screen showing the patient's exercise for the day",
  },
];

// The hero (centre) phone: a muted screen-recording of the real app composited
// into the same bezel art as the stills, so the live screen aligns to the pixel
// with no runtime overlay maths. Same intrinsic aspect as the stills.
const HERO_VIDEO = {
  mp4: "/videos/app-loop.mp4",
  poster: "/videos/app-loop-poster.jpg",
};

// translateX(%) / translateY(px) / translateZ(px) / rotateY(deg) / scale for
// each phone in the desktop fan. Side phones drop down and back so their baked
// captions tuck behind the hero and they fan out from below it.
const FAN = [
  { x: -52, y: 54, z: -100, ry: 20, scale: 0.82, zIndex: 10 },
  { x: 0, y: 0, z: 70, ry: -6, scale: 1, zIndex: 30 },
  { x: 52, y: 54, z: -100, ry: -20, scale: 0.82, zIndex: 10 },
];

/**
 * Pointer-driven tilt written straight to the stage element (no React re-render
 * per frame), rAF-throttled and reduced-motion safe. The pointer listener is
 * only attached while the stage is in view, so scrolling elsewhere costs nothing.
 */
function useStageTilt(stageRef: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(hover: none)").matches) return;

    let frame = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        stage.style.transform = `rotateX(${-ny * 5}deg) rotateY(${nx * 7}deg)`;
      });
    };
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        window.addEventListener("pointermove", onMove, { passive: true });
      } else {
        window.removeEventListener("pointermove", onMove);
        stage.style.transform = "";
      }
    });
    io.observe(stage);
    return () => {
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, [stageRef]);
}

const MobileAppBand = () => {
  const { ref, revealed } = useReveal<HTMLDivElement>();
  const stageRef = useRef<HTMLDivElement>(null);
  useStageTilt(stageRef);

  return (
    <section className="bg-white py-20 sm:py-28 overflow-hidden">
      <div ref={ref} className="mx-auto max-w-6xl px-[max(1.5rem,5vw)]">
        <div className="max-w-2xl">
          <span
            className="font-body text-[11px] font-semibold tracking-[0.3em] uppercase text-calm-lavender"
            style={reveal(revealed, 0)}
          >
            In the patient's pocket
          </span>
          <h2
            className="mt-4 font-heading font-bold text-calm-charcoal tracking-tight"
            style={{
              fontSize: "clamp(1.75rem, 4vw, 3rem)",
              lineHeight: 1.05,
              ...reveal(revealed, 80),
            }}
          >
            The practice happens in the app, between sessions.
          </h2>
          <p
            className="mt-5 max-w-xl font-body text-lg text-calm-charcoal/80 leading-relaxed"
            style={reveal(revealed, 160)}
          >
            Patients follow the plan their therapist set, practise with guided
            exercises, and check in from their phone. The therapist sees the
            activity behind it.
          </p>
        </div>

        {/* Mobile + tablet: a simple, accessible scroll row of the real devices. */}
        <div className="mt-12 flex gap-6 overflow-x-auto pb-4 sm:gap-8 lg:hidden">
          {SCREENSHOTS.map((shot, i) => (
            <img
              key={shot.src}
              src={shot.src}
              alt={shot.alt}
              loading="lazy"
              width={660}
              height={1434}
              className={`h-auto w-auto max-h-[480px] shrink-0 drop-shadow-[0_24px_50px_-20px_rgba(41,53,135,0.35)] ${
                i === 1 ? "translate-y-4" : ""
              }`}
            />
          ))}
        </div>

        {/* Desktop: an overlapping 3D fan with depth + pointer parallax. */}
        <div
          className="mt-16 hidden lg:block"
          style={{ perspective: "1600px" }}
          aria-hidden="true"
        >
          <div
            ref={stageRef}
            className="relative mx-auto h-[560px] max-w-3xl"
            style={{
              transformStyle: "preserve-3d",
              transition: `transform 400ms ${EASE}`,
            }}
          >
            {SCREENSHOTS.map((shot, i) => {
              const fan = FAN[i];
              const isHero = i === 1;
              return (
                <div
                  key={shot.src}
                  className="absolute left-1/2 top-1/2"
                  style={{
                    zIndex: fan.zIndex,
                    transform: `translate(-50%, -50%) translateX(${fan.x}%) translateY(${fan.y}px) translateZ(${fan.z}px) rotateY(${fan.ry}deg) scale(${fan.scale})`,
                    transition: `opacity 900ms ${EASE} ${i * 90}ms, transform 900ms ${EASE} ${i * 90}ms`,
                    opacity: revealed ? 1 : 0,
                  }}
                >
                  {isHero ? (
                    <video
                      className="h-[520px] w-auto drop-shadow-[0_40px_70px_-25px_rgba(41,53,135,0.5)]"
                      src={HERO_VIDEO.mp4}
                      poster={HERO_VIDEO.poster}
                      preload="none"
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  ) : (
                    <img
                      src={shot.src}
                      alt=""
                      loading="lazy"
                      width={660}
                      height={1434}
                      className="h-[520px] w-auto drop-shadow-[0_30px_60px_-30px_rgba(41,53,135,0.4)]"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileAppBand;
