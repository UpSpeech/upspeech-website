---
name: upspeech-marketing
description: Produce or review UpSpeech marketing content - Instagram and LinkedIn posts, captions, carousels, stories, alt text, campaign ideas, AEO work, and rendered PNG batches. Use whenever writing anything that will be posted publicly for UpSpeech, or when importing outside growth or GTM advice. Loads the brand voice and the sensitivity rules before drafting, and gates the batch on them before export.
---

# UpSpeech marketing

UpSpeech markets a clinical product for stuttering therapy to three audiences at
once: people who stutter, their parents, and speech-language pathologists. The
brand system lives in `marketing/`. It is authoritative. This skill makes sure
you read it before you write, and check against it before anything ships.

## Step 1: load the brand before drafting

Read, in this order, before writing a single line of copy:

1. `marketing/brand-voice.md` - the three words, the good and avoid examples, and
   the seven sensitivity rules. Read all of it, including the rules.
2. The strategy for the platform you are writing for:
   - Instagram: `marketing/instagram/strategy.md` (patients, parents, awareness)
   - LinkedIn: `marketing/linkedin/strategy.md` (SLPs, clinics, digital health)
3. The content calendar for that platform, so you extend the plan instead of
   restarting it.

Done when you can name the platform's audience, its content pillars, and at
least three of the seven sensitivity rules without looking back at the file.

Add `marketing/instagram/art-direction.md` when the post will be rendered as an
image, and `marketing/instagram/visual-production-pipeline.md` when it needs new
source imagery.

## Generated imagery goes through the genmedia CLI

`genmedia` reaches every fal.ai endpoint, uploads local files, and downloads
results to disk. Read the Tooling section of
`marketing/instagram/visual-production-pipeline.md` for the full command set.
The short version:

- `genmedia models "<query>" --category <cat>` to find an endpoint, and
  `genmedia schema <endpoint>` for its real parameters. Do not guess parameter
  names.
- `genmedia pricing <endpoint>` before any video run.
- `genmedia run <endpoint> --<param> --download <path>` to generate.
- `genmedia upload ./file.png` returns a `cdn_url` for endpoints that need an
  `image_url`.

**Prefer cut-outs over baked-in scenes.** Generate the object on a plain
background, cut it with `fal-ai/birefnet --output_format png`, then position the
transparent PNG in the HTML template with CSS. That keeps the composition
editable across re-exports.

The `fal-ai` MCP tools are the fallback if the CLI is unavailable. They cover 22
models with fixed size enums and cannot read local files.

Generation is for atmosphere only. Final text, numbers, technique names, app UI,
and the logo stay deterministic in the HTML templates, per rule 1 of the
pipeline. Never ask a model to redraw a readable progress screen or report, and
never generate or cut out a person who could read as an identifiable real
patient.

Log the endpoint, prompt, seed, and source path in
`marketing/instagram/source-images/prompts/` for every batch.

## Step 2: draft

Write to the platform strategy's pillars and cadence. Voice is Calm, Scientific,
Encouraging, with calm first.

Copy rules that are easy to break by accident:

- No em dashes in any copy. Commas, periods, or parentheses.
- Palette and type are fixed. Navy `#293587` primary, Outfit and Plus Jakarta
  Sans and Bricolage Grotesque. Never an off-palette hex.
- Second person for patients. Peer-to-peer for clinicians.
- Every image post needs real alt text. Add it to
  `marketing/instagram/alt-text.md` in the same pass, not later.

## Step 3: gate the draft on the sensitivity rules

Check every draft against the seven numbered rules in `brand-voice.md`. These
are hard requirements, not preferences. Verify each one by opening the file, not
from memory:

| Rule | What to verify in this draft |
|---|---|
| 1 | No clinical claim, outcome promise, timeframe, or implied diagnosis |
| 2 | Nothing implies fluency is the goal or that stuttering should stop |
| 3 | No imitation of stuttering, in text or in any visual |
| 4 | "People who stutter", never "stutterer" and never "suffers from" |
| 5 | No real patient, session, clinic name, or client data without documented written consent, and no generated person who resembles a real one |
| 6 | No fear or anxiety hook, especially aimed at parents |
| 7 | Alt text written, captions on video, contrast holds |

A draft that fails any row does not ship. Fix it or cut it.

## Step 4: render and export

Copy lives in `marketing/instagram/templates/index.html` as one
`<article data-export="...">` per post. Layout is in `styles.css`.

```bash
cd marketing/instagram/templates
npm install                        # first time only
npm run export                     # renders every template to ../exports/
npm run export -- doc-refer-early  # or pass names/prefixes for a subset
```

Sizes come from the name: feed and highlights 1080x1080, `story-*` 1080x1920,
`doc-*` 1080x1350 (also assembled into a PDF for LinkedIn document posts),
`profile-grid` 3240x3240.

Keep all final text, numbers, UI, logos, fonts, and screenshots deterministic.
Use AI generation only for atmospheric source imagery, per the production
pipeline. Run with `STRICT_SOURCE_IMAGES=1` to fail rather than warn on missing
source plates.

## Importing outside growth advice

Any GTM, growth, or SaaS playbook from outside gets checked against
`marketing/gtm-laws.md` before it is acted on. That file already sorts 48 laws
into adopt, rewrite, reject, and not yet, with the reason recorded for each.
Five are rejected because they are harmful for a product holding patient data.
If a suggestion matches a rejected law, say so and stop. If it is genuinely new,
add it to the file with its verdict and reason so the next session inherits the
judgment.

The same applies to advice from a generic marketing agent or skill. Where it
disagrees with `brand-voice.md`, `brand-voice.md` wins.

## Answer engines

For work on how UpSpeech appears in ChatGPT, Perplexity, and Gemini answers, use
`marketing/aeo.md`. It holds a dated baseline table and marks which engines are
still untested. Update the table with the date whenever you run a real pass, and
keep untested cells honest rather than filling them in by inference.
