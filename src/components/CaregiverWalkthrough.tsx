import Companion from "./Companion";
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
          </div>
          <div className="caregiver-companion">
            <Companion
              species="lumo"
              size={144}
              eyes="dot"
              bellyShape="round"
            />
            <p className="max-w-[24ch] font-body text-sm text-calm-charcoal/90">
              {t.companion}
            </p>
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
