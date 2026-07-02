import ProductScene from "./ProductScene";
import { useT, useLocale, localizedAsset } from "@/i18n";

const TherapistScene = () => {
  const t = useT().home.therapist;
  const locale = useLocale();
  return (
    <ProductScene
      eyebrow={t.eyebrow}
      headline={
        <>
          {t.headlineLine1}
          <br />
          <span className="text-calm-lavender">{t.headlineLine2}</span>
        </>
      }
      body={t.body}
      image={localizedAsset(
        "/screenshots/app/therapist-patient-progress.jpg",
        locale,
      )}
      imageAlt={t.imageAlt}
      url="app.upspeech.app/therapist"
      tone="offwhite"
      align="left"
      points={t.points}
    />
  );
};

export default TherapistScene;
