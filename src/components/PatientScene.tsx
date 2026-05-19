import ProductScene from "./ProductScene";

const PatientScene = () => (
  <ProductScene
    eyebrow="Outside the room"
    headline={
      <>
        Structured practice between visits,
        <br />
        <span className="text-calm-lavender">
          guided by the therapist throughout.
        </span>
      </>
    }
    body="Each patient receives a plan from their clinician, with exercises matched to their stage of treatment. Real-time fluency feedback supports practice between visits."
    image="/screenshots/app/client-dashboard.png"
    imageAlt="UpSpeech patient dashboard with daily practice exercises and progress"
    url="app.upspeech.app"
    tone="light"
    align="right"
    points={[
      {
        label: "A plan, set by the therapist",
        copy: "Each step is selected by the clinician. Patients see only what they should practise.",
      },
      {
        label: "Real-time feedback",
        copy: "Fluency analysis from sound, context, and facial cues. Reviewed and adjusted by the therapist.",
      },
      {
        label: "Progress, recorded",
        copy: "Streaks and progress over time keep patients engaged. The therapist sees the activity behind them.",
      },
    ]}
  />
);

export default PatientScene;
