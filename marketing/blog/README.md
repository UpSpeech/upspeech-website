# Blog System

The compounding channel. Instagram carries the patient story, LinkedIn carries the
clinician story, and the blog carries the part that has to be findable in six
months, both in search and inside ChatGPT, Perplexity, and Gemini.

## Structure

- `strategy.md`: what to write, the pillars, the first ten posts, cadence.
- Writing rules: [`../CONTENT_DIRECTIVES.md`](../CONTENT_DIRECTIVES.md), which
  covers article anatomy, the direct-answer paragraph, sourcing, internal
  linking, and the Portuguese rules.
- AEO context and the buyer prompts we are losing: [`../aeo.md`](../aeo.md).

## Where posts live

Not built yet. The site currently has `/techniques` and no `/blog`. When the
blog is built, mirror the techniques pattern: a route in `src/App.tsx`, a page
component, shared layout.

Required before any post goes live, listed in full in `CONTENT_DIRECTIVES.md`:
route under `/blog/<slug>`, distinct meta title and description, canonical URL,
Open Graph image at 1200 x 630 built with the Instagram template engine, sitemap
entry, Article and FAQPage structured data, and visible published and updated
dates.

If a post is published externally as well (Substack, Medium, LinkedIn articles),
the external copy carries a canonical tag pointing back to upspeech.app.

## Before publishing

Run the ship checklist in `CONTENT_DIRECTIVES.md`. The blog-specific failures to
watch for are an unsourced claim, a direct-answer paragraph that does not stand
alone when quoted, and a post that links to no technique page.

## Non-negotiables

The sensitivity rules in [`../brand-voice.md`](../brand-voice.md) apply to long
form exactly as they apply to a caption, and long form gives you more room to
break them. No outcome claims, no cures, fluency is never the goal, no patient
without written consent, and no fear-based hook aimed at a parent.
