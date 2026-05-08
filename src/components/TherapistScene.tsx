import ProductScene from "./ProductScene";

const TherapistScene = () => (
  <ProductScene
    eyebrow="In the room"
    headline={
      <>
        The session belongs to the clinician.
        <br />
        <span className="text-calm-lavender">
          The platform handles the rest.
        </span>
      </>
    }
    body="Clinical reports drafted from session data. Patient activity visible outside the appointment. Therapists arrive at each session with the context they need to plan it."
    image="/screenshots/app/therapist-patient-progress.jpg"
    imageAlt="UpSpeech therapist view of a patient's progress: activity stats, learning path milestone, and current step"
    url="app.upspeech.app/therapist"
    tone="offwhite"
    align="left"
    points={[
      {
        label: "Session prep",
        copy: "Walk into the appointment knowing what the patient practised since the last visit.",
      },
      {
        label: "Reports, drafted",
        copy: "Session data becomes a structured clinical draft for the therapist to review and sign.",
      },
      {
        label: "Between sessions",
        copy: "Patients follow a plan set by the clinician, with structured practice between visits.",
      },
    ]}
  />
);

export default TherapistScene;
