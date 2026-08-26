# UpSpeech Content System (prototype)

The operating layer for content production: what an AI session or a person needs
in order to write a post without inventing a number, re-deriving a format, or
guessing an image prompt.

## Read this first

**This is a prototype. It is not live.**

The system currently in use is `../` (the `marketing/` folder): `brand-voice.md`,
`CONTENT_DIRECTIVES.md`, the three channel folders, and the `/content` skill in
the umbrella repo that loads them. None of that has been changed, and nothing in
this folder is loaded automatically by anything.

To test this prototype, point a session at this file by hand. If it produces
better content than the live system, we promote it in a separate, deliberate step
(see `skill-draft.md`). If it does not, deleting this folder undoes it completely.

## What each file is for

| File | Hook |
| --- | --- |
| [`proof-library.md`](proof-library.md) | Every number we are allowed to use, with its source and its limits. Read before writing any claim. |
| [`messaging-map.md`](messaging-map.md) | What we say we are, at every length, in English and European Portuguese. |
| [`audiences.md`](audiences.md) | The five readers, as working personas. Pick exactly one per post. |
| [`brand-signature.md`](brand-signature.md) | What makes an UpSpeech post recognizably ours rather than a copy of somebody's good idea. |
| [`post-formats.md`](post-formats.md) | The named, repeatable formats, mapped to the template engine. |
| [`image-prompts.md`](image-prompts.md) | Model routing, cost, and locked prompts for generated imagery. |
| [`workflow.md`](workflow.md) | Idea to published, with owners and lead times. |
| [`repurposing.md`](repurposing.md) | One idea across three channels without repeating yourself. |
| [`measurement.md`](measurement.md) | What we track, and when we actually look at it. |
| [`community-management.md`](community-management.md) | Replying, the hard situations, and the consent register. |
| [`content-log.md`](content-log.md) | The register of what shipped. |
| [`skill-draft.md`](skill-draft.md) | A proposed replacement for the `/content` skill. Inert. |
| [`Output/`](Output/README.md) | Where generated content lands: the copy, the render targets, and the finished PNGs and PDFs. |
| `Assets/` | The raw asset library. `Inspiration from other companies/` is what `brand-signature.md` was written from. |

## Load order for a generating session

Higher wins when two files disagree.

1. **The sensitivity rules** in [`../brand-voice.md`](../brand-voice.md). Never overridden.
2. **Claim discipline** in [`../CONTENT_DIRECTIVES.md`](../CONTENT_DIRECTIVES.md), plus the never-public list in [`proof-library.md`](proof-library.md).
3. **House style** in [`../CONTENT_DIRECTIVES.md`](../CONTENT_DIRECTIVES.md).
4. [`proof-library.md`](proof-library.md), for anything factual.
5. [`messaging-map.md`](messaging-map.md) and [`audiences.md`](audiences.md), for what to say and to whom.
6. [`post-formats.md`](post-formats.md) and [`brand-signature.md`](brand-signature.md), for shape.
7. **Channel anatomy** in [`../CONTENT_DIRECTIVES.md`](../CONTENT_DIRECTIVES.md), then the channel `strategy.md`.

Everything in this folder sits under the sensitivity rules and claim discipline.
Nothing here can loosen them.

## Known divergences from the live system

The live files state four things that are wrong. This prototype states them
correctly, which means the two systems contradict each other while both exist.
That is the main reason nothing is wired together yet.

When this prototype is promoted, these are the edits to make.

| Live files say | Correct | Where it is wrong today |
| --- | --- | --- |
| MVP complete December 2025 | **March 2026** | root `CLAUDE.md`, `.claude/skills/content/SKILL.md` |
| MDR Class I, self-certified on efficiency | **No regulatory positioning at all.** UpSpeech is not positioned as a medical device, and we write no sentence that implies the category. | `../CONTENT_DIRECTIVES.md` claim table, `SKILL.md` |
| Pricing by tier, in euros, for three countries | **No pricing is set.** Never quote a price or a range. The call to action is a conversation. | `SKILL.md`, and the euro example in the `../CONTENT_DIRECTIVES.md` house-style section |
| 12,017 SLPs in Spain, 40,000+ in Europe | Unverified. Replaced with sourced figures in [`proof-library.md`](proof-library.md). | `SKILL.md` |

## Generated content

Everything the system produces goes in [`Output/`](Output/README.md): the copy
file with its brief and filled-in checklist, the render target, and the finished
asset. Two posts are there now, both generated from this prototype alone.

## What is deliberately not here

Anything the live system already does well. Voice, the sensitivity rules, house
style, claim discipline, per-channel anatomy, the European Portuguese rules, and
the nine-item ship checklist all stay in `../CONTENT_DIRECTIVES.md` and
`../brand-voice.md`. This folder adds the layer above them, not a second copy.
