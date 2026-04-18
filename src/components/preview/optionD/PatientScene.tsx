import ProductScene from "./ProductScene";

const PatientScene = () => (
  <ProductScene
    act="Act III"
    eyebrow="Outside the room"
    headline={
      <>
        Practice that holds.
        <br />
        <span className="text-calm-lavender">Feedback that understands.</span>
      </>
    }
    body="Patients open UpSpeech to a plan — not a blank page. Every exercise is prescribed by their clinician, calibrated to their therapeutic stage, and paired with real-time fluency feedback that keeps momentum between visits."
    image="/screenshots/app/client-dashboard.png"
    imageAlt="UpSpeech patient dashboard with daily practice exercises and progress"
    url="app.upspeech.io"
    tone="light"
    align="right"
    points={[
      {
        label: "A plan, prescribed",
        copy: "Every step set by the clinician, then surfaced to the patient without decision fatigue.",
      },
      {
        label: "Feedback, in real time",
        copy: "Fluency analysis from sound, context, and facial cues — reviewed and adjusted by the therapist.",
      },
      {
        label: "Momentum, visible",
        copy: "Streaks and longitudinal signal keep patients engaged; therapists see every data point.",
      },
    ]}
  />
);

export default PatientScene;
