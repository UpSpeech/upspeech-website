import Companion from "./Companion";
import CutOut from "./CutOut";
import PhoneShot from "./PhoneShot";
import { localizedAsset, useLocale, useT } from "@/i18n";

const SCREENS = [
  "caregiver-today.webp",
  "caregiver-guide.webp",
  "child-practice.webp",
  "caregiver-messages.webp",
];

export default function CaregiverWalkthrough() {
  const locale = useLocale();
  const t = useT().forPatients.withAParent;

  return (
    <section id="with-your-child" className="caregiver-walkthrough">
      <div className="gutter">
        <div className="caregiver-intro">
          <div>
            <h2 className="t-h2 max-w-2xl font-heading font-bold text-calm-navy text-balance">
              {t.headline}
            </h2>
            <p className="t-lead max-w-2xl font-body text-calm-charcoal/90">
              {t.line}
            </p>
            <div className="caregiver-companion">
              <Companion
                species="lumo"
                size={104}
                eyes="narrow"
                brows="soft"
                bellyShape="round"
              />
              <p className="max-w-[24ch] font-body text-sm text-calm-charcoal/90">
                {t.companion}
              </p>
            </div>
          </div>
          <div className="relative mx-auto flex h-[330px] w-full max-w-[420px] items-end justify-center sm:h-[420px]">
            <div className="absolute bottom-14 left-0 hidden w-[124px] -rotate-6 sm:block">
              <PhoneShot
                src={localizedAsset(
                  "/screenshots/mobile/caregiver-today.webp",
                  locale,
                )}
              />
            </div>
            <CutOut
              name="patients-listen"
              alt={t.photoAlt}
              renderHeight={{ base: 300, sm: 340 }}
              className="relative z-10 h-[300px] sm:h-[340px]"
            />
            <div className="absolute -bottom-7 right-4 z-20 w-[104px] rotate-3 sm:-bottom-10 sm:-right-2 sm:w-[122px]">
              <PhoneShot
                src={localizedAsset(
                  "/screenshots/mobile/child-practice.webp",
                  locale,
                )}
              />
            </div>
          </div>
        </div>
        <ol className="caregiver-screens" tabIndex={0} aria-label={t.headline}>
          {SCREENS.map((file, index) => (
            <li key={file}>
              <figure>
                <a
                  href={localizedAsset(`/screenshots/mobile/${file}`, locale)}
                  className="caregiver-screenshot-link"
                >
                  <PhoneShot
                    src={localizedAsset(`/screenshots/mobile/${file}`, locale)}
                    alt={t.steps[index].alt}
                    className="w-full"
                  />
                </a>
                <figcaption>
                  <h3 className="font-heading text-xl font-bold text-calm-navy">
                    <span className="caregiver-step font-body text-sm tabular-nums text-calm-lavender-ink">
                      {index + 1}
                    </span>{" "}
                    {t.steps[index].title}
                  </h3>
                  <p className="font-body text-base text-calm-charcoal/90">
                    {t.steps[index].line}
                  </p>
                </figcaption>
              </figure>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
