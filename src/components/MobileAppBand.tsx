import { useEffect, useRef } from "react";
import { useReveal } from "./useReveal";
import { reveal, EASE } from "./motion";
import Companion from "./Companion";
import CutOut from "./CutOut";
import PhoneShot from "./PhoneShot";
import { useT, useLocale, localizedAsset, localizedHref } from "@/i18n";

const SCREENSHOTS = [
  { src: "/screenshots/mobile/patient-journey-screen.webp" },
  { src: "/screenshots/mobile/patient-practice-screen.webp" },
  { src: "/screenshots/mobile/patient-home-screen.webp" },
];

const HERO_VIDEO = { mp4: "/videos/app-screen.mp4" };
const PHONE_FRAME = "/screenshots/mobile/iphone-frame.webp";
const PHONE_SCREEN = {
  insetBlockStart: "2.2%",
  insetInlineStart: "5.1%",
  inlineSize: "89.8%",
  blockSize: "95.6%",
  borderRadius: "12% / 5.4%",
};

// translateX(%) / translateY(px) / translateZ(px) / rotateY(deg) / scale per
// phone in the desktop fan. Side phones drop down and back so they fan out from
// behind and below the hero.
const FAN = [
  { x: -50, y: 48, z: -110, ry: 22, scale: 0.8, zIndex: 10 },
  { x: 0, y: 0, z: 70, ry: -6, scale: 1, zIndex: 30 },
  { x: 50, y: 48, z: -110, ry: -22, scale: 0.8, zIndex: 10 },
];

/**
 * Tilt written straight to the stage element (no React re-render per frame),
 * rAF-throttled and reduced-motion safe.
 *
 * A phone has no pointer to follow, so touch gets the same tilt driven by the
 * stage's position in the viewport instead. Without it the fan sat completely
 * still on mobile, which is the one place the section is about.
 */
function useStageTilt(stageRef: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;

    if (window.matchMedia("(hover: none)").matches) {
      // -1 entering from the bottom, 0 centred, 1 leaving the top.
      const update = () => {
        const rect = stage.getBoundingClientRect();
        const vh = window.innerHeight;
        const p = Math.max(
          -1,
          Math.min(1, (rect.top + rect.height / 2 - vh / 2) / (vh / 2)),
        );
        stage.style.transform = `rotateX(${p * 4}deg) rotateY(${-p * 6}deg)`;
      };
      const onScroll = () => {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(update);
      };
      update();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      return () => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
        cancelAnimationFrame(frame);
      };
    }

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
  const t = useT().home.mobile;
  const locale = useLocale();
  // Localized variants when present, else the English base (see i18n/assets).
  // The device frame is UI-neutral and stays shared across locales.
  const screenshots = SCREENSHOTS.map((shot) => ({
    src: localizedAsset(shot.src, locale),
  }));
  const heroVideo = localizedAsset(HERO_VIDEO.mp4, locale);
  const { ref, revealed } = useReveal<HTMLDivElement>();
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  useStageTilt(stageRef);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      if (motion.matches) video.pause();
      else void video.play().catch(() => video.pause());
    };
    update();
    motion.addEventListener("change", update);
    return () => {
      motion.removeEventListener("change", update);
      video.pause();
    };
  }, [heroVideo]);

  return (
    <section className="bg-white py-12 sm:py-16 overflow-hidden">
      <div
        ref={ref}
        className="gutter grid items-center gap-10 lg:grid-cols-[5fr_6fr]"
      >
        <div className="min-w-0 max-w-xl">
          <h2
            className="t-h2 font-heading font-bold text-calm-navy tracking-tight"
            style={{ ...reveal(revealed, 80) }}
          >
            {t.headline}
          </h2>
          <p
            className="mt-5 max-w-md font-body t-lead text-calm-charcoal/80"
            style={reveal(revealed, 160)}
          >
            {t.body}
          </p>

          <div className="family-practice-link">
            <Companion
              species="tumbo"
              size={120}
              accent="#cca163"
              eyes="wide"
              brows="soft"
              bellyShape="round"
              bellySize="l"
            />
            <a
              href={`${localizedHref("/for-patients", locale)}#with-your-child`}
              className="family-practice-action font-body font-semibold text-calm-navy underline underline-offset-4"
            >
              {t.familyLink}
            </a>
          </div>
          <CutOut
            name="home-family"
            alt={t.familyAlt}
            renderHeight={{ base: 220, sm: 260 }}
            className="mt-3 h-[220px] sm:h-[260px]"
          />

          {/* Mobile + tablet: a simple, accessible scroll row of the devices. */}
          <div className="mt-10 flex gap-6 overflow-x-auto pb-4 sm:gap-8 lg:hidden">
            {screenshots.map((shot, i) => (
              <PhoneShot
                key={shot.src}
                src={shot.src}
                alt={t.screenshots[i]}
                className={`w-[225px] shrink-0 ${
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
            {screenshots.map((shot, i) => {
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
                    // phone box: fixed height, width from the frame aspect ratio.
                    // Live screen behind, official device frame on top.
                    <div
                      className="relative"
                      style={{ height: "560px", aspectRatio: "1470 / 3000" }}
                    >
                      <video
                        ref={videoRef}
                        className="absolute object-cover"
                        style={PHONE_SCREEN}
                        src={heroVideo}
                        poster={screenshots[1].src}
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
                    <PhoneShot src={shot.src} alt="" className="w-[274px]" />
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
