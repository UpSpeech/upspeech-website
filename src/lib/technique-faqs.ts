import { TECHNIQUE_FAQS_PT } from "./technique-faqs-pt";
import { TECHNIQUE_FAQS_ES } from "./technique-faqs-es";

export interface FAQ {
  question: string;
  answer: string;
}

export const TECHNIQUE_FAQS: Record<string, FAQ[]> = {
  "voluntary-stuttering": [
    {
      question: "What is voluntary stuttering?",
      answer:
        "Voluntary stuttering is a speech therapy technique where a person intentionally stutters in a controlled, easy manner. By choosing to stutter on purpose, the speaker reduces fear, shame, and avoidance behaviors associated with stuttering, and gains a greater sense of control over their speech.",
    },
    {
      question: "How does voluntary stuttering help reduce stuttering?",
      answer:
        "Voluntary stuttering works by desensitizing the speaker to the experience of stuttering. When you stutter on purpose, the fear and tension that typically worsen stuttering are reduced. Over time, this decreases avoidance behaviors and makes involuntary stuttering moments less severe.",
    },
    {
      question: "Is voluntary stuttering the same as faking a stutter?",
      answer:
        "No. Voluntary stuttering is a therapeutic technique practiced under the guidance of a speech-language pathologist. It involves producing easy, relaxed repetitions or prolongations — not imitating or mocking stuttering. The goal is to build openness, reduce tension, and improve overall communication.",
    },
    {
      question: "When should I practice voluntary stuttering?",
      answer:
        "Your speech-language pathologist will guide you on when and how to practice. Typically, you start in low-pressure situations — such as with a trusted friend or during a therapy session — and gradually progress to more challenging speaking contexts as your confidence grows.",
    },
  ],
  cancelation: [
    {
      question: "What is the cancellation technique in stuttering therapy?",
      answer:
        "Cancellation is a stuttering modification technique where, after stuttering on a word, you pause, identify what went wrong, and then say the word again using easier, more relaxed speech. It helps you learn from each stuttering moment and gradually produce smoother speech.",
    },
    {
      question: "How do you practice the cancellation technique?",
      answer:
        "After you stutter on a word, stop completely. Take a moment to feel what your mouth, jaw, and throat were doing during the stutter. Then, deliberately repeat the word using a slower, more relaxed approach — such as a gentle onset or light articulatory contact.",
    },
    {
      question: "What is the difference between cancellation and pull-out?",
      answer:
        "Cancellation happens after the stutter — you finish the stuttered word, pause, then retry it with easier speech. Pull-out happens during the stutter — you modify the stutter in real time while you are still on the word, transitioning into smoother speech mid-moment.",
    },
  ],
  "pull-out": [
    {
      question: "What is the pull-out technique for stuttering?",
      answer:
        "The pull-out technique is a stuttering modification strategy where you modify a stutter while it is happening. Instead of pushing through or stopping, you ease out of the stutter mid-word by reducing tension and transitioning into smoother, more controlled speech.",
    },
    {
      question: "How do you perform a pull-out during a stutter?",
      answer:
        "When you feel yourself stuttering on a word, slow down rather than forcing through. Gradually relax the muscles involved in speech — your lips, tongue, jaw, or vocal folds — and ease into the rest of the word with a slower, lighter touch. The goal is to finish the word smoothly.",
    },
    {
      question: "Is the pull-out technique difficult to learn?",
      answer:
        "Pull-outs require practice because they happen in real time during speech. Most people learn cancellation first (modifying after the stutter), then progress to pull-outs as they develop greater awareness of their stuttering patterns. A speech-language pathologist guides this progression.",
    },
  ],
  "preparatory-set": [
    {
      question: "What is a preparatory set in speech therapy?",
      answer:
        "A preparatory set is a technique where you plan how you will say a word before you begin speaking it. You mentally and physically prepare your articulators — lips, tongue, jaw — for a relaxed, easy start, reducing the likelihood of a stuttering block.",
    },
    {
      question:
        "How does preparatory set differ from other stuttering techniques?",
      answer:
        "Preparatory set is proactive — it happens before you speak the word. Cancellation is used after a stutter, and pull-out is used during a stutter. Preparatory set aims to prevent the stutter from occurring in the first place by preparing for smooth speech production.",
    },
    {
      question: "When should I use preparatory set?",
      answer:
        "Use preparatory set when you anticipate difficulty on an upcoming word. As you become more skilled, you can use it naturally in everyday speech without noticeable pauses. It is especially useful for words or sounds that you know tend to trigger stuttering.",
    },
  ],
  holding: [
    {
      question: "What is the holding technique in stuttering therapy?",
      answer:
        "The holding technique involves maintaining your articulatory position during a block rather than pushing through or retreating. By holding the position calmly and then releasing with reduced tension, you learn to manage blocks without struggle and transition into smoother speech.",
    },
    {
      question: "How does holding help with stuttering blocks?",
      answer:
        "During a block, the natural instinct is to push harder or stop entirely. Holding teaches you to stay in the moment, maintain your position without added tension, and then release into the rest of the word gently. This reduces the severity of blocks and builds confidence.",
    },
    {
      question: "Is holding the same as freezing during a block?",
      answer:
        "No. Freezing is an involuntary response where tension increases. Holding is a deliberate, controlled choice to maintain your position while consciously relaxing tension. The goal is to move from the hold into easy, forward-moving speech.",
    },
  ],
  "soft-starts": [
    {
      question: "What are soft starts in speech therapy?",
      answer:
        "Soft starts (also called easy onsets or gentle onsets) involve beginning voicing with relaxed vocal folds and a gradual buildup of airflow. Instead of a hard, abrupt start, you ease into the sound gently, reducing the likelihood of a block or repetition at the beginning of a word.",
    },
    {
      question: "How do you practice soft starts?",
      answer:
        "Begin by exhaling gently, then gradually engage your voice with a breathy, relaxed quality. Start words with a soft, easy initiation rather than a forceful or sudden onset. Practice first on isolated words, then phrases, and eventually in conversation.",
    },
    {
      question: "Are soft starts only for words that begin with vowels?",
      answer:
        "No. While soft starts are most commonly associated with vowel-initial words (where hard glottal attacks are common), the principle of gentle initiation applies to all sounds. For consonants, you use light articulatory contact in combination with the soft onset.",
    },
  ],
  "soft-articulation-contact": [
    {
      question: "What is soft articulation contact?",
      answer:
        "Soft articulation contact is a fluency shaping technique where you use light, relaxed pressure when your articulators (lips, tongue, teeth, palate) make contact during speech. Instead of pressing hard, you touch lightly, reducing tension that can trigger stuttering.",
    },
    {
      question:
        "How does soft articulation contact differ from soft starts?",
      answer:
        "Soft starts focus on how you initiate voicing — beginning gently with relaxed vocal folds. Soft articulation contact focuses on how your articulators physically touch during consonant production. Both reduce tension, but they target different parts of the speech mechanism.",
    },
    {
      question: "Which sounds benefit most from soft articulation contact?",
      answer:
        "Plosive sounds (p, b, t, d, k, g) benefit most because they require full closure of the articulators. By using light contact instead of firm closure, you reduce the buildup of pressure that can lead to blocks. However, the technique can be applied to any consonant sound.",
    },
  ],
  "prolonged-speech": [
    {
      question: "What is prolonged speech in stuttering therapy?",
      answer:
        "Prolonged speech is a fluency shaping technique where you extend vowels and continuant consonants to slow your speaking rate. By stretching sounds, you create a smoother, more continuous airflow that reduces the interruptions characteristic of stuttering.",
    },
    {
      question: "Does prolonged speech sound natural?",
      answer:
        "Initially, prolonged speech may sound slow or exaggerated. With practice, you learn to use it more subtly — applying slight prolongations that maintain fluency without sounding unnatural. The goal is to gradually increase your speaking rate while maintaining the smoothness.",
    },
    {
      question:
        "Is prolonged speech the same as speaking slowly?",
      answer:
        "Not exactly. Simply speaking slowly does not address the underlying tension patterns in stuttering. Prolonged speech specifically involves stretching sounds and maintaining continuous phonation, which changes how you produce speech at a motor level, not just the speed.",
    },
  ],
  "speech-speed-management": [
    {
      question: "What is speech speed management?",
      answer:
        "Speech speed management is a technique for controlling your speaking rate to maintain fluency. It involves learning to monitor and adjust how fast you speak in different situations, using strategies like phrasing, pausing, and rate reduction to prevent stuttering from escalating.",
    },
    {
      question: "Why does speaking faster make stuttering worse?",
      answer:
        "Faster speaking rates increase the demands on your speech motor system. When you speak quickly, there is less time to coordinate breathing, voicing, and articulation, which can trigger stuttering. Managing your speed gives your system more time to produce smooth speech.",
    },
    {
      question:
        "How do I manage my speech speed without sounding unnatural?",
      answer:
        "Focus on natural phrasing — break your speech into shorter thought groups with brief pauses between them. This sounds conversational and is how many fluent speakers naturally talk. You are not slowing every word; you are organizing your speech into manageable chunks.",
    },
  ],
  pauses: [
    {
      question: "How do pauses help with stuttering?",
      answer:
        "Strategic pauses reduce time pressure, one of the key factors that can worsen stuttering. By incorporating natural breaks between phrases, you give yourself time to plan your next words, relax your speech muscles, and maintain a sense of control over your communication.",
    },
    {
      question: "Where should I place pauses in my speech?",
      answer:
        "Place pauses at natural linguistic boundaries — between phrases, clauses, or sentences. Pause after a complete thought, before starting a new idea, or before a word you anticipate difficulty with. Natural pauses make your speech sound thoughtful and organized, not hesitant.",
    },
    {
      question: "Is pausing the same as avoiding words?",
      answer:
        "No. Avoidance means substituting or skipping words you fear stuttering on. Strategic pausing means deliberately inserting brief breaks at natural points to manage your speaking rate and reduce pressure. Pausing is a positive technique; avoidance is a behavior that reinforces fear.",
    },
  ],
  "identification-desensitization": [
    {
      question: "What is identification and desensitization in stuttering therapy?",
      answer:
        "Identification involves learning to recognize your specific stuttering patterns — the sounds, words, situations, and physical tensions associated with your stuttering. Desensitization involves gradually reducing your emotional reactions (fear, shame, embarrassment) to stuttering through structured exposure.",
    },
    {
      question:
        "Why is desensitization important for people who stutter?",
      answer:
        "Many of the difficulties associated with stuttering are driven by emotional reactions — fear of speaking, shame about stuttering, avoidance of social situations. Desensitization reduces these reactions, which in turn often reduces the frequency and severity of stuttering itself.",
    },
    {
      question:
        "How does identification help improve speech fluency?",
      answer:
        "When you can identify exactly what happens during your stuttering moments — which muscles tense, which sounds are difficult, what situations trigger anxiety — you can apply targeted techniques more effectively. Self-awareness is the foundation for all stuttering modification strategies.",
    },
    {
      question:
        "Is identification and desensitization used alone or with other techniques?",
      answer:
        "It is typically used as a foundation alongside other techniques. Identification and desensitization prepare you psychologically and build self-awareness, while motor techniques like cancellation, pull-out, and soft starts address the physical aspects of stuttering. Together, they form a comprehensive approach.",
    },
  ],
};

const FAQS_BY_LOCALE: Record<string, Record<string, FAQ[]>> = {
  en: TECHNIQUE_FAQS,
  pt: TECHNIQUE_FAQS_PT,
  es: TECHNIQUE_FAQS_ES,
};

export function getTechniqueFAQs(slug: string, locale: string = "en"): FAQ[] {
  const faqs = FAQS_BY_LOCALE[locale] || TECHNIQUE_FAQS;
  return faqs[slug] || TECHNIQUE_FAQS[slug] || [];
}
