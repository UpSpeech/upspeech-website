# Instagram Visual Production Pipeline

How to add photographic and motion polish to the social assets without letting
generative models invent product UI, text, logos, numbers, or anything that
could read as a clinical claim.

fal.ai runs through the `genmedia` CLI. See [Tooling](#tooling) for the install,
the four commands this pipeline uses, and the endpoint for each step.

## Core rules

1. Keep final text, headlines, technique names, numbers, app UI, and the logo
   in deterministic tools: the HTML/CSS templates, SVG, ImageMagick, or ffmpeg.
2. Use AI generation for source imagery only: calm desks, a hand holding a
   phone, soft daylight, abstract texture, campaign atmosphere.
3. For product posts, prefer the self-contained CSS mocks (`post-mock`) or a
   real sanitized screenshot composited pixel-for-pixel. Never ask a model to
   redraw a readable progress screen or report.
4. Animate from a finished still. Text-to-video is too loose for branded work.
5. Source plates are disposable inputs unless explicitly curated and tracked.
   The PNGs in `exports/` are the publishing source of truth. Deterministic
   renderer assets such as logos, local fonts, and sanitized screenshots live in
   `templates/assets/`.
6. Nothing generated may imply an outcome, a cure, or a real identifiable
   patient. See `../brand-voice.md`.

## Tooling

Use the `genmedia` CLI. It reaches every fal endpoint (~1200), uploads local
files, and downloads results to disk, which the MCP tools cannot do.

```bash
curl https://genmedia.sh/install -fsS | bash
genmedia setup --non-interactive --api-key "$FAL_KEY"
```

Four commands carry the pipeline:

| Command | Use |
|---|---|
| `genmedia models "<query>" --category image-to-image` | Find an endpoint. Add `--endpoint_id a,b` to look up known ones |
| `genmedia schema <endpoint>` | Real parameter names, types, and enums before you guess |
| `genmedia pricing <endpoint>` | Cost per unit, which the checklist below asks for |
| `genmedia run <endpoint> --<param> --download <path>` | Run it and write the result to disk |

`genmedia upload ./file.png` returns JSON with a `cdn_url`. That is how a local
still becomes an `image_url` an endpoint can read, and it replaces the old
tmpfiles.org step.

Endpoints this pipeline uses:

| Step | Endpoint |
|---|---|
| Source plates, texture | `fal-ai/flux/dev`, `fal-ai/flux/schnell` (cheap drafts) |
| Illustrated plates | `fal-ai/recraft/v3/text-to-image`, `fal-ai/ideogram/v3` |
| Cut a subject out | `fal-ai/birefnet`, `fal-ai/imageutils/rembg` |
| Animate a still | `fal-ai/kling-video/v2.1/master/image-to-video`, `fal-ai/ltx-video-13b-distilled/image-to-video` |

Three habits worth keeping. Category inference on a bare search is unreliable,
so pass `--category` when you know it ("background removal" alone infers
text-to-image and returns nothing). `--output-format json` is the default here,
so pipe into `python3 -c` or `jq` rather than parsing the pretty view.

And **read the written path back from `downloaded_files[0].path`** rather than
assuming the name you passed to `--download`. When the target already exists the
CLI writes `name_1.png`, `name_2.png` instead of overwriting. Miss that and you
will keep editing a stale file while every command reports success. Generate
into an empty directory to avoid it entirely.

The MCP `fal-ai` tools still work and need no install, but they only expose 22
models with fixed `image_size` and `aspect_ratio` enums, they cannot read a
local file, and they hand back URLs rather than files. Treat them as the
fallback when the CLI is missing.

Log the endpoint, prompt, seed, and source path in `source-images/prompts/`.

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

Generation: `fal-ai/flux/dev` for calm desk and texture plates,
`fal-ai/flux/schnell` for cheap drafts, `fal-ai/recraft/v3/text-to-image` when
the plate is illustrated rather than photographic. The template decides the
final size, so generate square and let CSS crop. Text always lives in the
template.

Endpoints move. `genmedia models --endpoint_id <id>` returns a count of 1 when
one is live, and a batch lookup 404s wholesale if any single entry is missing,
so check them one at a time.

### Cut-out objects composited in CSS

Preferred over baking a subject into a flat plate, because the result stays
editable: move it in CSS, re-run `npm run export`, done.

```bash
# 1. generate the object on a plain background
genmedia run fal-ai/flux/schnell \
  --prompt "a single ceramic mug on a plain white seamless background, soft daylight" \
  --image_size square --download ./

# 2. cut it out; png is what carries the alpha channel
genmedia run fal-ai/birefnet \
  --image_url "$(genmedia upload ./plate.jpg | python3 -c 'import sys,json;print(json.load(sys.stdin)["cdn_url"])')" \
  --output_format png --download templates/assets/objects/mug.png
```

Verify the alpha before using it: `magick identify -format '%[channels]\n'`
should report `srgba`. Then place it in `templates/index.html` as an `<img>` and
position it with CSS like any other asset.

Ask for the object on a **plain seamless background**. A busy generated scene
cuts out badly at the edges. `fal-ai/imageutils/rembg` is the faster, rougher
alternative; `fal-ai/bria/background/remove` and
`fal-ai/ideogram/remove-background` are there if an edge gives trouble.

Cut-outs are objects and atmosphere. Do not cut out a generated person and place
them in a post, per rule 5 in `../brand-voice.md`.

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
- **AI edit.** Find one with `genmedia models "image edit" --category
  image-to-image`, then check `genmedia schema` for how it takes the second
  image. Use when the device sits near head-on. Fast, but small text
  regenerates and garbles, so only for posts where the screen is atmosphere,
  not content.

### Reel or story video

After a still already works as a static post.

```text
final still (e.g. a story export, already 9:16)
  -> genmedia upload  (returns cdn_url)
  -> fal-ai/kling-video/v2.1/master/image-to-video
       --image_url --aspect_ratio 9:16 --negative_prompt --download
  -> ffmpeg caption/logo overlay if needed
  -> 1080x1920 export
```

Kling is the default because it takes `negative_prompt`, which is what holds the
typography still. `fal-ai/ltx-video-13b-distilled/image-to-video` is the fast,
cheap alternative for a batch. Run `genmedia pricing` on whichever you pick
before a run. Animate the strongest one or two stills per week.

Prompt pattern that keeps HTML text crisp:

```text
Subtle ambient motion on a calm speech-practice reel. The on-screen UI is
preserved. The headline text "<exact text>" stays exactly in place, perfectly
readable, no warping or morphing of any letter. Soft daylight shifts very
slightly. No camera movement.
```

Pass as `negative_prompt`: `morphing text, warping letters, distorted typography,
drifting words, text changing, font changing, camera zoom`.

#### 9:16-from-1:1 cropping trap

`aspect_ratio: "9:16"` against a 1080x1080 source crops ~43% off each side and
destroys edge text (a centered "UpSpeech" becomes "Spee"). This is a property of
the ratio, not of one model, so it applies to every image-to-video tool here.
Fixes:

- **Vertical reel from a square design:** pad to 1080x1920 with a brand bar
  first: `magick in.png -gravity center -background "#f3f5fd" -extent 1080x1920
padded.png`, then animate at 9:16.
- **Native 9:16 source:** the `story-*` exports are already 1080x1920. Use as-is.
- **Square loop:** run Kling image-to-video with `--aspect_ratio 1:1`.

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
- Tool name, endpoint, prompt, seed, and source path are logged in
  `source-images/prompts/`.
- Missing source plates were reviewed. Run `STRICT_SOURCE_IMAGES=1 npm run
export` from `templates/` when fallback gradients should be treated as a
  failure.
- Premium video cost is checked before a batch run.
