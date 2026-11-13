export interface Reading {
  title: string;
  publisher: string;
  url: string;
}

const ASHA: Reading = {
  title: "Stuttering, Cluttering, and Fluency",
  publisher: "American Speech-Language-Hearing Association, Practice Portal",
  url: "https://www.asha.org/practice-portal/clinical-topics/fluency-disorders/",
};

const SELF_THERAPY: Reading = {
  title: "Self-Therapy for the Stutterer, 11th edition",
  publisher: "The Stuttering Foundation",
  url: "https://www.stutteringhelp.org/sites/default/files/Migrate/book0012_11th_ed.pdf",
};

const REVIEW: Reading = {
  title: "Behavioral treatments for children and adults who stutter: a review",
  publisher: "Psychology Research and Behavior Management, 2013",
  url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3682852/",
};

// A source is listed only where it discusses the technique by name. Holding
// has none that does, so its page shows no list.
export const TECHNIQUE_READING: Record<string, Reading[]> = {
  "voluntary-stuttering": [ASHA, SELF_THERAPY, REVIEW],
  cancelation: [ASHA, SELF_THERAPY],
  "pull-out": [ASHA, SELF_THERAPY],
  "preparatory-set": [ASHA, SELF_THERAPY],
  "soft-starts": [ASHA, SELF_THERAPY, REVIEW],
  "soft-articulation-contact": [ASHA, SELF_THERAPY],
  "prolonged-speech": [ASHA, REVIEW],
  "speech-speed-management": [ASHA, SELF_THERAPY, REVIEW],
  pauses: [ASHA, SELF_THERAPY, REVIEW],
  "identification-desensitization": [ASHA, SELF_THERAPY, REVIEW],
};
