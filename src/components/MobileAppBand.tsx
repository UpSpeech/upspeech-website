import { useEffect, useRef } from "react";
import { useReveal } from "./useReveal";
import { reveal, EASE } from "./motion";

// Bare device renders (phone only, transparent background) so they float on the
// section with no baked panel or caption. Cropped from the app-mobile store art.
const SCREENSHOTS = [
  {
    src: "/screenshots/mobile/patient-journey-device.png",
    alt: "UpSpeech mobile app learning path showing the steps the therapist set",
  },
  {
    src: "/screenshots/mobile/patient-practice-device.png",
    alt: "UpSpeech mobile app practice screen with guided stuttering exercises",
  },
  {
    src: "/screenshots/mobile/patient-home-device.png",
    alt: "UpSpeech mobile app home screen showing the patient's exercise for the day",
  },
];

// The hero (centre) phone: a bare screen-recording of the real app played BEHIND
// a bezel-frame PNG whose screen is cut out (transparent). The frame's real edges
// mask the video, so the visible screen shape is always perfect.
const HERO_VIDEO = { mp4: "/videos/app-screen.mp4" };
const PHONE_FRAME = "/screenshots/mobile/phone-frame.png";

// Where the live video sits inside the frame, as a % of the phone box. The frame
// masks any overshoot, so this only needs to fill the screen hole. TWEAK HERE to
// align the recording: top/left move it, width/height resize it.
const SCREEN = { top: "0.8%", left: "2.2%", width: "95.6%", height: "97.6%" };

// translateX(%) / translateY(px) / translateZ(px) / rotateY(deg) / scale per
// phone in the desktop fan. Side phones drop down and back so they fan out from
// behind and below the hero.
const FAN = [
  { x: -50, y: 48, z: -110, ry: 22, scale: 0.8, zIndex: 10 },
  { x: 0, y: 0, z: 70, ry: -6, scale: 1, zIndex: 30 },
  { x: 50, y: 48, z: -110, ry: -22, scale: 0.8, zIndex: 10 },
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
    <section className="bg-white py-12 sm:py-16 overflow-hidden">
      <div
        ref={ref}
        className="mx-auto grid max-w-6xl items-center gap-10 px-[max(1.5rem,5vw)] lg:grid-cols-[5fr_6fr]"
      >
        <div className="max-w-xl">
          <span
            className="font-body text-[11px] font-semibold tracking-[0.3em] uppercase text-calm-lavender"
            style={reveal(revealed, 0)}
          >
            In the patient's pocket
          </span>
          <h2
            className="mt-4 font-heading font-bold text-calm-charcoal tracking-tight"
            style={{
              fontSize: "clamp(1.875rem, 3.4vw, 3.25rem)",
              lineHeight: 1.05,
              ...reveal(revealed, 80),
            }}
          >
            The practice happens in the app, between sessions.
          </h2>
          <p
            className="mt-5 max-w-md font-body text-lg text-calm-charcoal/80 leading-relaxed"
            style={reveal(revealed, 160)}
          >
            Patients follow the plan their therapist set, practise with guided
            exercises, and check in from their phone. The therapist sees the
            activity behind it.
          </p>

          {/* Mobile + tablet: a simple, accessible scroll row of the devices. */}
          <div className="mt-10 flex gap-6 overflow-x-auto pb-4 sm:gap-8 lg:hidden">
            {SCREENSHOTS.map((shot, i) => (
              <img
                key={shot.src}
                src={shot.src}
                alt={shot.alt}
                loading="lazy"
                className={`h-auto w-auto max-h-[460px] shrink-0 drop-shadow-[0_24px_50px_-20px_rgba(41,53,135,0.35)] ${
                  i === 1 ? "translate-y-4" : ""
                }`}
              />
            ))}
          </div>
        </div>

        {/* Desktop: an overlapping 3D fan with depth + pointer parallax. */}
        <div
          className="hidden lg:block"
          style={{ perspective: "1700px" }}
          aria-hidden="true"
        >
          <div
            ref={stageRef}
            className="relative mx-auto h-[600px]"
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
                    // phone box: a fixed height, width derived from the frame's
                    // aspect ratio. Video behind, frame PNG on top.
                    <div
                      className="relative"
                      style={{ height: "560px", aspectRatio: "503 / 1036" }}
                    >
                      <video
                        className="absolute object-cover"
                        style={{
                          top: SCREEN.top,
                          left: SCREEN.left,
                          width: SCREEN.width,
                          height: SCREEN.height,
                        }}
                        src={HERO_VIDEO.mp4}
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                      <img
                        src={PHONE_FRAME}
                        alt=""
                        className="absolute inset-0 h-full w-full drop-shadow-[0_40px_70px_-25px_rgba(41,53,135,0.5)]"
                      />
                    </div>
                  ) : (
                    <img
                      src={shot.src}
                      alt=""
                      loading="lazy"
                      className="h-[560px] w-auto drop-shadow-[0_30px_60px_-30px_rgba(41,53,135,0.4)]"
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
