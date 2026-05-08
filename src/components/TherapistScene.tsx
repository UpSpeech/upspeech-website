import ProductScene from "./ProductScene";

const TherapistScene = () => (
  <ProductScene
    eyebrow="In the room"
    headline={
      <>
        The session belongs to the clinician.
        <br />
        <span className="text-calm-lavender">We take care of the rest.</span>
      </>
    }
    body="Automated clinical reports, patient-level analytics, and a continuous picture of what's happening outside the room, so therapists walk into every session already knowing where to focus."
    image="/screenshots/app/therapist-dashboard.png"
    imageAlt="UpSpeech therapist dashboard with patient analytics and report tools"
    url="app.upspeech.app/therapist"
    tone="offwhite"
    align="left"
    points={[
      {
        label: "Prep, with context",
        copy: "Walk into every session already knowing the week, what was practiced, where the patient struggled, what to focus on.",
      },
      {
        label: "Reports, drafted",
        copy: "Session data becomes a structured clinical draft. The therapist reads, edits, signs.",
      },
      {
        label: "Capacity, returned",
        copy: "Less time on admin. More time with patients.",
      },
    ]}
  />
);

export default TherapistScene;
