import ProductScene from "./ProductScene";
import { useT } from "@/i18n";

const PatientScene = () => {
  const t = useT().home.patient;
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
      image="/screenshots/app/client-dashboard.png"
      imageAlt={t.imageAlt}
      url="app.upspeech.app"
      tone="light"
      align="right"
      points={t.points}
    />
  );
};

export default PatientScene;
