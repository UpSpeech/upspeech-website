# Instagram Visual Production Pipeline

How to add photographic and motion polish to the social assets without letting
generative models invent product UI, text, logos, numbers, or anything that
could read as a clinical claim.

Model references below follow the local fal.ai pipeline notes (re-check
endpoint names if this doc is more than ~3 months old). fal.ai is available in
this workspace via the MCP tools.

## Core rules

1. Keep final text, headlines, technique names, numbers, app UI, and the logo
   in deterministic tools: the HTML/CSS templates, SVG, ImageMagick, or ffmpeg.
2. Use AI generation for source imagery only: calm desks, a hand holding a
   phone, soft daylight, abstract texture, campaign atmosphere.
3. For product posts, prefer the self-contained CSS mocks (`post-mock`) or a
   real sanitized screenshot composited pixel-for-pixel. Never ask a model to
   redraw a readable progress screen or report.
4. Animate from a finished still. Text-to-video is too loose for branded work.
5. Source images are disposable inputs. The PNGs in `exports/` are the
   publishing source of truth.
6. Nothing generated may imply an outcome, a cure, or a real identifiable
   patient. See `../brand-voice.md`.

## Asset routes

### Static text or data card

For manifesto, practice, progress, companion, scenario, statement, and any
copy-led or number-led post.

```text
optional generated texture
  -> HTML/CSS template (templates/index.html)
  -> Chrome PNG export (export.mjs)
  -> phone-size review
```

Generation: `fal-ai/flux-2-pro` for calm desk / texture; `fal-ai/imagen4` for
quick clean editorial drafts. Text always lives in the template.

### Product proof with readable UI

Three options, by how load-bearing the on-screen content is:

- **Browser frame + real screenshot (default).** The `post-mock` templates drop
  a real, sanitized app screenshot into a clean browser frame. This is what the
  current product-proof posts use. Screenshots are vendored under
  `templates/assets/screenshots/` (the same ones the website ships); swap in a
  newer sanitized capture and re-export. Crisp UI, real branding, ships today.
- **Real screenshot composite.** Sanitize a real app screen (no client data, no
  real names), then composite it into a generated phone/desk plate with
  ImageMagick perspective `-distort` so the UI stays crisp. Use this when you
  want the screen sitting in a photographed scene, not a flat browser frame.
- **AI edit.** `fal-ai/flux-2-pro/edit` (scene + screenshot) when the device
  sits near head-on. Fast, but small text regenerates and garbles, so only for
  posts where the screen is atmosphere, not content.

### Reel or story video

After a still already works as a static post.

```text
final still (e.g. a story export, already 9:16)
  -> upload via tmpfiles.org /dl/ form (catbox is silently rejected by veo/kling)
  -> fal-ai/veo3.1/fast/image-to-video  (subtle motion, preserve text)
  -> ffmpeg caption/logo overlay if needed
  -> 1080x1920 export
```

Cheaper batches: `fal-ai/veo3.1/lite/image-to-video` or
`fal-ai/kling-video/v2.5-turbo/pro/image-to-video`. Animate the strongest one or
two stills per week.

Prompt pattern that keeps HTML text crisp:

```text
Subtle ambient motion on a calm speech-practice reel. The on-screen UI is
preserved. The headline text "<exact text>" stays exactly in place, perfectly
readable, no warping or morphing of any letter. Soft daylight shifts very
slightly. No camera movement.
```

Negative (Kling): `morphing text, warping letters, distorted typography,
drifting words, text changing, font changing, camera zoom`.

#### 9:16-from-1:1 cropping trap

Veo with `aspect_ratio: "9:16"` against a 1080x1080 source crops ~43% off each
side and destroys edge text (a centered "UpSpeech" becomes "Spee"). Fixes:

- **Vertical reel from a square design:** pad to 1080x1920 with a brand bar
  first: `magick in.png -gravity center -background "#f3f5fd" -extent 1080x1920
  padded.png`, then run veo 9:16.
- **Native 9:16 source:** the `story-*` exports are already 1080x1920. Use as-is.
- **Square loop:** use `kling_master_image` at `1:1`.

### Companion animation (UpSpeech-specific)

The product already ships a CompanionAvatar (an animated logo-character with
nine states). That is the best motion asset this brand has.

- Prefer exporting real companion animation frames/clips from the app over
  generating a character. A generated mascot will drift off-model.
- For social, loop a short companion reaction (nod, celebrate a streak) under a
  calm caption. Keep it 2 to 4 seconds, muted-friendly, captioned.

## Source-image folder convention

```text
source-images/
  backgrounds/   calm desks, home surfaces, soft daylight, textures
  phone-scenes/  hand-holding-phone and desk-with-phone plates (blank screens)
  screenshots/   sanitized real app screens for compositing
  composites/    ImageMagick / fal-edit intermediates
  video-stills/  finished stills queued for animation
  prompts/       prompt, model endpoint, seed, and source URLs per batch
```

Name files to preserve publishing context, e.g.
`week-02-progress-phone-plate-v01.jpg`,
`week-02-progress-screenshot-v01.png`,
`week-02-progress-composite-v01.jpg`.

## Quality checklist

- Text, numbers, technique names, and UI are deterministic, not generated.
- Product screenshots are real and sanitized (no client data, no real names).
- No generated person is identifiable as a real person.
- Nothing implies a clinical outcome, cure, or fluency-as-goal.
- The idea reads at phone and thumbnail size; critical copy clears the 80px edge.
- Real alt text is written; video has captions.
- Model endpoint, prompt, seed, and source path are logged in
  `source-images/prompts/`.
- Premium video cost is checked before a batch run.
