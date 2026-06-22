import ProductScene from "./ProductScene";
import { useT } from "@/i18n";

const TherapistScene = () => {
  const t = useT().home.therapist;
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
      image="/screenshots/app/therapist-patient-progress.jpg"
      imageAlt={t.imageAlt}
      url="app.upspeech.app/therapist"
      tone="offwhite"
      align="left"
      points={t.points}
    />
  );
};

export default TherapistScene;
