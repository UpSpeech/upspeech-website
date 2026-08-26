# Image Prompts

Model routing, cost, and the locked prompts for generated imagery.

This extends `../instagram/visual-production-pipeline.md`, which holds the rules
about what may be generated at all. The short version of those rules, because they
outrank everything below: **final text, headlines, technique names, numbers, app
UI, and the logo are never generated.** They live in the HTML templates. AI
generates atmosphere and source plates only.

**Prices checked 26 August 2026.** They move. Re-check before any batch large
enough to matter.

---

## Two tracks, two quality bars

Everything splits into photographic and illustrated, and they are judged
differently.

### Photographic: realism is the bar

Desks, hands holding a phone, clinician workspaces, home surfaces, daylight.

These have to look like a photograph somebody took. Not "good for AI". A generated
look undermines a brand whose whole argument is that it is honest, and it reads as
cheap next to the real product screenshots sitting beside it in the same post.

**Realism outranks cost here.** If the cheap tier produces a generated-looking
plate, escalate a tier, and log why in the batch notes.

**The realism checklist.** A plate ships only if all of these hold.

- Light has one direction, and the shadows agree with it.
- Surfaces have wear. A desk with no marks on it is a render.
- Depth of field is shallow and falls off naturally, not as a uniform blur ring.
- Hands survive a zoom to 200%. Count the fingers. Check the nail beds and the
  knuckles.
- No glow, no bloom, no halo around the subject.
- Nothing is perfectly symmetrical or perfectly centered.
- Colors sit in a real camera's range. If it looks HDR, it is out.
- No text anywhere in the frame, readable or otherwise.

**The shared negative list**, used on every photographic prompt:

```text
3d render, cgi, illustration, digital art, plastic skin, airbrushed, glossy,
waxy, overly symmetrical, hdr, oversaturated, bloom, glow, lens flare, extra
fingers, deformed hands, smooth artificial lighting, watermark, text, logo,
signage, ui, screen content
```

### Illustrated: freedom is fine

Companion scenes, conceptual marks, abstract texture, the scribble-as-feeling
device from `brand-signature.md`.

No realism constraint. The only rules are the palette, the type stack, and the
sensitivity rules. Illustration is often the better answer anyway: it never has to
pretend to be real, and it cannot accidentally resemble an identifiable person.

---

## Routing table

Cheapest model that clears the bar, per asset type. Escalate only when the cheap
tier visibly fails, and record why.

| Asset | Default model | Price | Escalate to | Why |
| --- | --- | --- | --- | --- |
| Abstract texture, gradient ground | `fal-ai/flux/schnell` | ~$0.003/MP | `fal-ai/qwen-image` (~$0.02/MP) | Texture has no realism bar. Cheapest tier is correct. |
| Calm desk, home surface, daylight scene | `fal-ai/bytedance/seedream/v4` (~$0.03/image) | ~$0.03 | `fal-ai/flux-2/pro` (~$0.03/MP) | Realism bar applies. Both sit around three cents, so pick on output, not price. |
| Hand holding a phone, blank screen | `fal-ai/flux-2/pro` | ~$0.03/MP | Seedream V4.5 (~$0.04/image) | Hands are where cheap models fail. Start one tier up and save the retries. |
| Clinician desk, professional scene | `fal-ai/bytedance/seedream/v4` | ~$0.03 | `fal-ai/flux-2/pro` | As the desk row. |
| Compositing a real screenshot into a plate | ImageMagick `-distort` | free | `fal-ai/flux-pro/kontext` (~$0.04/image) | Deterministic first, always. The model edit regenerates small text and garbles it. |
| Companion or conceptual illustration | `fal-ai/flux/schnell` | ~$0.003/MP | Any image model | No realism bar. Iterate cheaply and often. |

**A 1080 x 1080 export is roughly 1.2 MP**, so per-megapixel and per-image prices
land in the same place at our sizes.

### Rough batch cost

A normal two-week batch needs three to five photographic plates and a handful of
texture passes, with two or three retries each. That is **under $1**. The
generation cost is not the constraint. Your review time is, so generate four
variants at once rather than one at a time.

---

## Video

**On request only.** There is no standing quota and no weekly video.

It is the most expensive thing in the pipeline by an order of magnitude, and it is
the least reusable. When you ask for one, the routing is:

| Model | Price | Use |
| --- | --- | --- |
| `fal-ai/wan/v2.5/image-to-video` | ~$0.05/sec | Cheapest usable ambient motion |
| `fal-ai/kling-video/v2.5-turbo/pro/image-to-video` | ~$0.07/sec | Better motion, holds a still steadier |
| `fal-ai/veo3.1/fast/image-to-video` | ~$0.10/sec silent, ~$0.15/sec with audio | When text in the frame has to survive |
| `fal-ai/veo3.1/image-to-video` | ~$0.20/sec silent, ~$0.40/sec with audio | Rarely worth the multiple |

A five-second clip is roughly $0.25 on Wan, $0.35 on Kling, $0.50 on Veo fast.

**Animate from a finished still, never from text.** Text-to-video is too loose for
branded work and it invents UI.

**The 9:16 crop trap.** Veo at `aspect_ratio: "9:16"` against a 1080 x 1080 source
crops roughly 43% off each side and destroys edge text. Pad first:

```bash
magick in.png -gravity center -background "#f3f5fd" -extent 1080x1920 padded.png
```

The `story-*` exports are already 1080 x 1920 and need no padding.

---

## The locked prompt skeleton

Every photographic prompt is built in this order. Deviating produces
inconsistent plates across a batch.

```text
[subject, concrete and specific]
[what is on or around it, two or three items maximum]
[light: source, direction, quality]
[mood, one or two words]
editorial lifestyle photography, shallow depth of field, natural color
no readable text, no logos, no identifiable people
```

The last line is mandatory on every photographic prompt, without exception. The
negative list goes in the negative field, not in the prompt.

---

## Prompt bank

Copy, adjust the bracketed part, keep the rest.

### Calm morning desk

```text
A calm morning desk beside a window, a phone resting face-up with a completely
blank dark screen, a glass of water and a small plant, worn wooden surface with
visible grain, soft directional daylight from the left, quiet and unhurried,
editorial lifestyle photography, shallow depth of field, natural color,
no readable text, no logos, no identifiable people
```

### Hand holding a phone

```text
A close warm photograph of an adult hand holding a modern phone with a completely
blank dark screen, relaxed grip, soft daylight from one side, calm neutral
background falling out of focus, editorial lifestyle photography, shallow depth of
field, natural color, no readable text, no logos, no identifiable people, no face
```

Check the hand at 200% before accepting. This is the prompt that fails most often.

### Clinician desk

```text
A tidy speech and language therapist's desk, an open notebook and a laptop with a
completely blank dark screen, a mug set slightly off center, soft daylight,
professional and calm rather than clinical, editorial lifestyle photography,
shallow depth of field, natural color, no readable text, no logos,
no identifiable people
```

### Home surface at dusk, standing for the week

Accepted first time on `fal-ai/flux/schnell`, the cheapest tier. A scene with no
hands and no faces usually does clear the bar down there, which is why the
routing table starts cheap rather than starting safe.

```text
A kitchen table at dusk in an ordinary home, a phone lying face down on the worn
wooden surface beside a half-finished mug of tea and a set of keys, low warm light
coming from one window out of frame, quiet and lived in, nobody present, editorial
lifestyle photography, shallow depth of field, natural color, no readable text,
no logos, no identifiable people
```

Generate four at once and pick on composition. For anything with a text overlay,
the one to choose is the one whose subject sits at mid height, leaving the lower
third free.

### Home surface for a parent-facing post

```text
A kitchen table in the late afternoon, a child's drawing and a couple of crayons
resting on it, warm low daylight from a window out of frame, ordinary and lived
in, editorial lifestyle photography, shallow depth of field, natural color,
no readable text, no logos, no identifiable people, no children in frame
```

No child ever appears in frame. Suggest the child through their things.

### Abstract texture

```text
Soft abstract gradient texture in pale blue and off white, gentle organic
movement, very low contrast, no discernible objects, no text
```

---

## A generated image may stand for an idea, never for an event

The rule that decides whether a generated plate is atmosphere or a forgery.

A generated kitchen table standing for "the week between sessions" is atmosphere.
A generated conference stage attached to a post about a talk that really happened
is a fabricated record of that event, and no prompt wording makes it otherwise.

When a post refers to something that actually took place, either use the real
photograph or use a plate that clearly stands for an idea instead. Never generate
a substitute for the event itself.

## Rules that override anything above

From `../brand-voice.md` and `../instagram/visual-production-pipeline.md`.

1. No generated person is identifiable as a real person. When in doubt, no face.
2. No generated app UI, ever. Real sanitized screenshots or the CSS mocks.
3. No generated text, numbers, technique names, or logos. Templates only.
4. Nothing that implies an outcome, a cure, or fluency as the goal.
5. No child in frame.
6. Contrast is checked before shipping. Accessibility is part of the brand.

---

## Logging

Every batch writes a note into `../instagram/source-images/prompts/`:

```text
batch:      week-08-progress
date:       2026-08-26
model:      fal-ai/flux-2/pro
prompt:     <the exact prompt>
negative:   <the exact negative>
seed:       <seed>
outputs:    week-08-progress-phone-plate-v01.jpg, ...-v02.jpg
accepted:   v02
escalated:  yes, schnell produced plastic-looking hands
cost:       ~$0.12
```

Without the seed the plate cannot be reproduced, and a batch you cannot reproduce
is a batch you will regenerate from scratch in three weeks.
