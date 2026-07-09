# Starter Source Images - 2026-06-25

Planned source-image prompts for the UpSpeech starter Instagram set. The current
exports are safe without these files because the templates fall back to brand
gradients, but the reference projects become stronger when the chosen source
plates and exact prompts are logged here.

Use these prompts for square source plates that sit underneath deterministic
HTML/CSS text and UI overlays. Do not ask an image model to create readable app
screens, logos, technique names, clinical notes, or final post copy.

## hand-phone-practice-plate-v01.jpg

- Target path: `marketing/instagram/source-images/phone-scenes/hand-phone-practice-plate-v01.jpg`
- Suggested source size: square, at least 1080 x 1080
- Use: `feed-photo-01-phone-practice.png` and `story-photo-02-phone.png`

Prompt:

```text
Use case: ads-marketing
Asset type: Instagram square source image for UpSpeech speech-practice posts.
Primary request: Create a photorealistic hand-holding-phone plate for later deterministic overlay.
Scene/backdrop: An adult hand holding a modern smartphone in a calm home or clinic-adjacent setting, soft natural daylight, neutral background, no face visible.
Composition/framing: Square crop. Phone screen blank, dark, fully visible, and large enough for later screenshot replacement. Leave calm negative space in the upper half for an HTML overlay card.
Style/medium: Premium editorial lifestyle photography, 50mm prime lens feel, shallow depth of field, soft but realistic texture.
Lighting/mood: Calm, warm daylight, reassuring, never medical or anxious.
Constraints: No readable text, no app UI, no logos, no brand marks, no watermark, no identifiable person, no distorted hands, no extra fingers, no clinical outcome implication.
```

## calm-desk-morning-v01.jpg

- Target path: `marketing/instagram/source-images/backgrounds/calm-desk-morning-v01.jpg`
- Suggested source size: square, at least 1080 x 1080
- Use: `feed-photo-02-calm-desk.png` and `story-photo-01-calm.png`

Prompt:

```text
Use case: ads-marketing
Asset type: Instagram square source image for UpSpeech between-session practice posts.
Primary request: Create a calm morning desk background for a speech-practice app.
Scene/backdrop: Light desk near a window, phone resting face-up with a blank dark screen, glass of water, small plant, and notebook with no readable writing.
Composition/framing: Square crop with open negative space across the upper and middle area for deterministic text overlays. No important detail near the outer edge.
Style/medium: Editorial lifestyle photography, soft clinical-modern feel, tactile but clean.
Lighting/mood: Soft natural morning light, calm, focused, encouraging.
Constraints: No readable text, no logos, no app UI, no people, no watermark, no medical props, no clinical outcome implication.
```

## clinician-desk-v01.jpg

- Target path: `marketing/instagram/source-images/backgrounds/clinician-desk-v01.jpg`
- Suggested source size: square, at least 1080 x 1080
- Use: `feed-photo-03-clinician.png`

Prompt:

```text
Use case: ads-marketing
Asset type: Instagram square source image for UpSpeech clinician-facing posts.
Primary request: Create a tidy speech-language pathologist desk scene for a documentation workflow post.
Scene/backdrop: Calm professional desk with a laptop showing a blank dark screen, notebook, pen, and soft daylight. Clinic-adjacent but not sterile.
Composition/framing: Square crop. Keep the laptop screen blank and avoid any readable notes. Leave space for a deterministic overlay card on the left or right.
Style/medium: Premium editorial commercial photography, clean and credible, shallow depth of field.
Lighting/mood: Calm, professional, low-pressure, warm daylight.
Constraints: No readable text, no logos, no app UI, no identifiable people, no patient files, no clinic names, no watermark, no clinical outcome implication.
```

## Product screenshots

The product-proof posts now use deterministic screenshot assets under
`marketing/instagram/templates/assets/screenshots/`. Those screenshots must stay
demo-only and sanitized: no real patient names, no real emails, no real clinic
names, no client recordings, and no identifiable session data.
