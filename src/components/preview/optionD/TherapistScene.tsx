import ProductScene from "./ProductScene";

const TherapistScene = () => (
  <ProductScene
    act="Act II"
    eyebrow="In the room"
    headline={
      <>
        The session belongs to the clinician.
        <br />
        <span className="text-calm-lavender">We take care of the rest.</span>
      </>
    }
    body="Automated clinical reports, patient-level analytics, and a continuous picture of what's happening outside the room — so therapists walk into every session already knowing where to focus."
    image="/screenshots/app/therapist-dashboard.png"
    imageAlt="UpSpeech therapist dashboard with patient analytics and report tools"
    url="app.upspeech.io/therapist"
    tone="offwhite"
    align="left"
    points={[
      {
        label: "Reports, drafted",
        copy: "AI turns session data into a clinical report. The therapist reads, edits, signs.",
      },
      {
        label: "Capacity, reclaimed",
        copy: "Hours of admin per week collapse into minutes — reinvested in patients.",
      },
      {
        label: "Decisions, informed",
        copy: "Every assignment is grounded in actual outside-the-room data, not recall.",
      },
    ]}
  />
);

export default TherapistScene;
