# Source Images

Store AI-generated, photographed, or curated image sources here before they are
placed into final templates.

Keep final text, headlines, technique names, numbers, product UI, and the logo
in the HTML/CSS templates. Source images should be atmospheric layers, textures,
or non-critical campaign visuals only.

Subfolders:

- `backgrounds/`: calm desks, home surfaces, soft daylight, textures.
- `phone-scenes/`: hand-holding-phone and desk-with-phone plates (blank screens).
- `screenshots/`: sanitized real app screenshots for compositing.
- `composites/`: ImageMagick or fal-edit outputs with real screenshots placed in.
- `video-stills/`: finished stills queued for animation.
- `prompts/`: prompt, model endpoint, seed, and source URLs per batch.

For readable product UI, prefer the self-contained CSS mocks in the templates,
or composite a real sanitized screenshot deterministically. Do not rely on an
image model to redraw a progress screen, technique score, or report.

The template engine may also keep small deterministic assets under
`../templates/assets/`, including logos, local fonts, and demo-only screenshots.
Those assets are part of the renderer, not disposable source media.

The photo-overlay templates reference filenames here (for example
`phone-scenes/hand-phone-practice-plate-v01.jpg`). Until those files exist the
posts export with a clean navy-to-sky gradient fallback, which is intentional
and safe to post. Drop in the real plate, re-run the export, and the photo
appears under the same overlay card.

When generating source plates, log the prompt and model details in `prompts/`.
The starter prompt log is
`prompts/2026-06-25-starter-source-images.md`.

Never store or composite real client data, real session recordings, or any
identifiable person who has not given written consent. See
[`../../brand-voice.md`](../../brand-voice.md).
