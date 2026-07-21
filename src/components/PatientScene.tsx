import ProductScene from "./ProductScene";
import { useT, useLocale, localizedAsset } from "@/i18n";

const PatientScene = () => {
  const t = useT().home.patient;
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
      image={localizedAsset("/screenshots/app/client-dashboard.png", locale)}
      imageAlt={t.imageAlt}
      url="app.upspeech.app"
      tone="light"
      align="right"
      points={t.points}
    />
  );
};

export default PatientScene;
