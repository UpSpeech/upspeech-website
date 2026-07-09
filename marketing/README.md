# UpSpeech Marketing

The social and discovery system for UpSpeech: an AI-powered speech-therapy
platform for stuttering, used by speech-language pathologists and the people
they treat.

This folder mirrors the structure used across the other personal projects: a
small set of strategy docs, a deterministic HTML-to-PNG template engine, and an
AEO track. It is built so any future session can produce a new batch of
on-brand posts without re-deriving the brand each time.

## Why two platforms

UpSpeech has two audiences with different homes:

- **Instagram** carries the patient, parent, and awareness story: practice,
  progress, encouragement, and stutter-positive education. Warmer, more
  visual, more shareable.
- **LinkedIn** carries the clinical B2B story: SLP time savings, clinical
  credibility, between-session adherence, and product proof. Peer-to-peer and
  evidence-aware.

The voice rules in [`brand-voice.md`](brand-voice.md) are shared. The framing,
cadence, and formats differ per platform.

## Structure

```
marketing/
├── README.md                  this file
├── brand-voice.md             shared voice + the sensitivity rules for stuttering content
├── creative-concepts.md       out-of-the-box campaign and post ideas
├── aeo.md                     Answer Engine Optimization (ChatGPT / Perplexity / Gemini)
├── instagram/
│   ├── strategy.md            positioning, audiences, content pillars, cadence
│   ├── art-direction.md       social visual rules derived from the product design system
│   ├── content-calendar.md    first weeks of feed, carousel, story, reel ideas + captions
│   ├── alt-text.md            draft accessibility text for each starter export
│   ├── posting-playbook.md     what to post where, how often, when to ask for more
│   ├── visual-production-pipeline.md   fal.ai source-image, screenshot-composite, reel workflow
│   ├── templates/             index.html + styles.css + export.mjs + local assets
│   ├── exports/               generated PNGs, ready to post
│   └── source-images/         generated/curated source imagery before final layout
└── linkedin/
    ├── strategy.md            B2B positioning, pillars, formats, cadence
    └── content-calendar.md    first weeks of LinkedIn posts + drafts
```

## Producing a batch

From the repo root:

```bash
cd marketing/instagram/templates
npm install        # first time only (installs sharp)
npm run export     # renders every template to ../exports/*.png
```

Each post is an `<article data-export="...">` in `templates/index.html`. The
exporter renders one at a time in headless Chrome and crops to the exact size:

- Feed posts / highlights: 1080 × 1080
- Stories: 1080 × 1920
- Profile grid preview: 3240 × 3240

Edit copy and layout in `index.html`, restyle in `styles.css`, re-run the
export. Keep all final text, numbers, UI, logos, fonts, and screenshots
deterministic; use AI generation only for atmospheric source imagery (see the
production pipeline). The exporter warns when referenced local source plates are
missing; set `STRICT_SOURCE_IMAGES=1 npm run export` to fail instead.

## Non-negotiables

UpSpeech markets a clinical product in a sensitive space. Before anything ships,
read [`brand-voice.md`](brand-voice.md). The short version: never promise
clinical outcomes or cures, never mock or imitate stuttering, never imply
fluency is the goal, and never use a real patient or session without written
consent.
