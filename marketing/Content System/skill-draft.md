# Skill Draft (inert)

A proposed replacement for `.claude/skills/content/SKILL.md` in the umbrella repo.

**Nothing loads this file.** It is not installed, not registered, and not
referenced by any skill. The live `/content` skill is unchanged and still points
at `../` only.

## Why it is not installed

The live skill and this prototype disagree on four facts: the MVP date, the
regulatory position, pricing, and the European market figures. See the divergence
table in [`README.md`](README.md). Installing this now would give the live
automation two contradictory sets of directives, and any bad output would be
impossible to attribute to either one.

## How to test the prototype without installing anything

Start a session and point it at [`README.md`](README.md) by hand. Ask for a post.
Compare it to what the live `/content` skill produces from the same brief.

## How to promote it, if it wins

1. Make the four corrections in the divergence table to `../CONTENT_DIRECTIVES.md`
   and the root `CLAUDE.md`.
2. Copy the block below over `.claude/skills/content/SKILL.md`.
3. Adjust the paths in it if this folder has moved by then.
4. Delete this file.

## What differs from the live skill

Three things.

- It loads the prototype files instead of working from a hardcoded list.
- It points at [`proof-library.md`](proof-library.md) rather than carrying its own
  copy of the facts, so the numbers have exactly one home.
- Its hard-stops list adds pricing and regulatory framing, which the live skill
  does not cover and which are the two most likely ways a draft causes real
  trouble.

---

## The proposed file

````markdown
---
name: content
description: Draft UpSpeech marketing content for Instagram, LinkedIn, or the blog, in English or European Portuguese. Use whenever the user asks for a caption, a social post, a carousel, a LinkedIn document, a blog article, or a batch of posts for UpSpeech. Enforces the brand voice, the sensitivity rules, the claim limits, and the proof library.
---

# UpSpeech Content

Draft social and blog content that passes the UpSpeech standard on the first try,
without re-deriving the brand each session.

## Load these first, every time

Read before writing a line. Do not work from memory of a previous session.

**The rules layer**, in `upspeech-website/marketing/`:

1. `brand-voice.md`. Voice and the seven sensitivity rules. Never overridden.
2. `CONTENT_DIRECTIVES.md`. The four-line brief, house style, claim discipline,
   per-channel anatomy, the European Portuguese rules, the ship checklist.

**The operating layer**, in `upspeech-website/marketing/Content System/`:

3. `proof-library.md`. Every number you are allowed to use, and the never-public
   list. **Read this before writing any factual sentence.**
4. `messaging-map.md` and `audiences.md`. What we say, and to whom.
5. `post-formats.md`. Pick a format by name and write to its grammar.

Then the channel strategy for whatever is being written, and `brand-signature.md`
plus `image-prompts.md` when the task involves a graphic.

On conflict: sensitivity rules, then claim discipline and the never-public list,
then house style, then everything else.

## Workflow

### 1. Fill the brief before drafting

Reader (exactly one persona from `audiences.md`), idea (one concrete sentence),
evidence (a `proof-library.md` entry, a product behavior, a clinician's words, or
a cited source), next step.

Infer what you reasonably can and state what you assumed. Ask only when the reader
is genuinely ambiguous.

**Never invent evidence.** If the draft needs a number that is not in
`proof-library.md`, restructure the post around a mechanism. Mechanism is
checkable and more convincing to a clinician than a result we cannot support.

### 2. Draft to a named format

Name the format from `post-formats.md` in the output. Match its grammar and its
length range.

Instagram: write the first line last. LinkedIn: check the hook truncated at 140
characters. Blog: write the direct-answer paragraph so it stands alone when quoted
with nothing around it.

### 3. Run the ship checklist and show it

All nine items from the end of `CONTENT_DIRECTIVES.md`, plus four from this
prototype:

10. **No pricing.** No number, no range, no currency.
11. **No regulatory framing.** Nothing that implies medical-device status.
12. **Consent**, whenever a real identifiable person is in an asset, including a
    member of the team.
13. **No investor material**, including something caught in the background of a
    photograph. Read the whole frame, not just the subject.

Report the result. Do not claim a pass without checking. If an item fails, fix the
draft and say what changed.

### 4. Deliver alt text and metadata

Instagram ships with alt text. Blog ships with a meta title, a meta description, a
slug, and the two technique pages it links to. Not left for later.

## Output format

```
BRIEF
Reader / Idea / Evidence / Next step, one line each.
Format: the code from post-formats.md.

DRAFT
The post, exactly as it will be pasted. No commentary inside it.

ALT TEXT or METADATA

CHECKLIST
Thirteen items, pass or fail, with a note on anything that needed fixing.
```

One strong draft, not three options. If a real choice exists, draft the stronger
one and describe the other in a sentence.

## Portuguese

Never a translation of the English draft. Same brief, written again in European
Portuguese. Terminology and the Brazilian tells are in `CONTENT_DIRECTIVES.md`.
The four that slip through most: `gagueira` for `gaguez`, `fonoaudiólogo` for
`terapeuta da fala`, `você` for `tu`, and `está praticando` for `está a praticar`.

Portuguese runs 15 to 25 percent longer. Re-check every length limit after
writing.

## The facts you may use

**All of them are in `proof-library.md`, and none of them are here.** That file is
the only place numbers live, so there is one thing to update when a number changes.

If a fact is not in `proof-library.md`, you may not use it. Say so, and offer the
mechanism version of the sentence instead.

## Hard stops

Refuse and explain rather than drafting.

- Any claim that the product improves fluency, reduces stuttering, or produces a
  clinical outcome.
- Fluency framed as the goal, or stuttering framed as a defect.
- **Any price, tier, range, or currency.** Pricing is not set.
- **Any regulatory or medical-device framing.** No MDR, class, certification,
  clinical-grade, validated, diagnostic, or assessment language. Not a medical
  device, and no sentence that implies the category.
- A real patient, session, clinic, or quote without documented written consent.
- A fear-based hook aimed at a parent.
- Imitated or mocked stuttering, in any form, for any reason.
- A named competitor comparison outside the balanced roundup in
  `blog/strategy.md`.

Offer the nearest version that works. Almost every blocked claim has a mechanism
description that is both allowed and more persuasive.

## Producing graphics

Copy rendered as an image goes into `marketing/instagram/templates/index.html` as
an `<article data-export="...">`, then `npm run export` from `templates/`. Naming
decides size: `story-*` is 1080 x 1920, `doc-<carousel>-<nn>-<slug>` is 1080 x 1350
and assembles into a PDF, everything else is square.

Never invent a hex color or a font. Navy `#293587` and the palette in
`brand-voice.md`. Outfit, Plus Jakarta Sans, Bricolage Grotesque. Generated
imagery follows `Content System/image-prompts.md`, which is atmosphere only:
never UI, never text, never numbers.
````
