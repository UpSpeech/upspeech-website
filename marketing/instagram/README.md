# Instagram System

The starter Instagram system for UpSpeech: strategy, art direction, planning,
and an exportable visual template engine.

## Structure

- `strategy.md`: positioning, audiences, content pillars, cadence, first grid.
- `art-direction.md`: social visual rules derived from the product design system.
- `content-calendar.md`: first four weeks of feed, carousel, story, and reel
  ideas with caption drafts.
- `alt-text.md`: draft accessibility text for every starter export.
- `posting-playbook.md`: cadence, channel guidance, and when to request a batch.
- `visual-production-pipeline.md`: fal.ai source-image, screenshot-composite,
  reel, and companion-animation workflow.
- `templates/`: browser-rendered layouts (`index.html` + `styles.css`), local
  fonts/logo/screenshot assets, and the PNG exporter (`export.mjs`).
- `exports/`: generated PNGs, ready to post.
- `source-images/`: generated/curated source imagery before final layout.

## Recommended workflow

1. Confirm the strategy and the 9-post grid.
2. For photo or product-proof posts, follow `visual-production-pipeline.md`
   before touching the templates.
3. Edit copy and layout in `templates/index.html`; restyle in `styles.css`.
4. Run the exporter:

   ```bash
   cd marketing/instagram/templates
   npm install   # first time only
   npm run export
   ```

5. Review the PNGs in `exports/`.
6. Copy the relevant line from `alt-text.md` into the platform alt-text field.
7. Use AI image generation only for atmospheric source imagery. Keep text,
   numbers, UI, screenshots, fonts, and the logo deterministic.

## Export sizes

- Feed posts and highlight covers: 1080 x 1080.
- Stories: 1080 x 1920.
- Profile grid preview: 3240 x 3240.

Set `STRICT_SOURCE_IMAGES=1` when exporting if a batch should fail when any
referenced source plate is missing. Without it, missing plates warn and use the
template's gradient fallback.

## Current direction

**Calm Practice Studio:** a calm, encouraging, stutter-positive social system
built on the product's "Soft Clinical Modern" aesthetic (navy, sky, mint,
Outfit headings, progress rings, the companion character), pushed to feel more
editorial and memorable than the app UI. Calm, scientific, encouraging.
