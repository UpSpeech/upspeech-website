# Content Log

The register of what shipped.

One row per published item, filled in the same day it goes out. This exists for
three reasons: to make the six-week reuse window in
[`repurposing.md`](repurposing.md) checkable, to make the monthly review in
[`measurement.md`](measurement.md) possible without archaeology, and to stop us
posting the same idea twice in a month because nobody remembered the first time.

**A register nobody fills in is worse than no register**, because it looks like a
record and it is not one. If this file goes two weeks stale, the honest move is to
say so at the top rather than backfill from memory.

---

## Columns

| Column | What goes in it |
| --- | --- |
| Date | Publication date, `YYYY-MM-DD` |
| Ch | `IG`, `LI`, or `BLOG` |
| Format | The code from [`post-formats.md`](post-formats.md), for example `LI-4` |
| Reader | The one persona from [`audiences.md`](audiences.md) |
| Idea | The brief's idea line, in under twelve words |
| Evidence | The [`proof-library.md`](proof-library.md) entry used, or `mechanism`, or `none` |
| Lang | `EN` or `PT` |
| Link | Permalink. For the blog, the canonical URL |
| Reuse | `source`, `derived from <date>`, or `-` |
| 7d / 30d | The primary metric for that channel, from `measurement.md` |
| Note | One line. Why it worked, or why it did not |

---

## The log

Newest first.

| Date | Ch | Format | Reader | Idea | Evidence | Lang | Link | Reuse | 7d | 30d | Note |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| | | | | | | | | | | | |

---

## Example rows

Not published. Here to show the shape.

| Date | Ch | Format | Reader | Idea | Evidence | Lang | Link | Reuse | 7d | 30d | Note |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 2026-09-03 | BLOG | BL-2 | Clinician | Why home practice does not happen | pilot | EN | /blog/why-home-practice-does-not-happen | source | 40 sessions | 210 sessions | Ranked p2 for the exact question by day 30 |
| 2026-09-05 | LI | LI-4 | Clinician | Same argument as seven pages | pilot | EN | linkedin.com/... | derived from 2026-09-03 | 31 saves | 44 saves | Limits page quoted back in two comments |
| 2026-09-09 | IG | IG-8 | Person who stutters | The most concrete section, as a carousel | mechanism | PT | instagram.com/... | derived from 2026-09-03 | 88 saves | 120 saves | PT version outperformed EN two to one |

---

## Rules

**Fill it the same day.** Not at the end of the week.

**7d and 30d get filled in.** A row with an empty 30d column after five weeks is
a row that tells you nothing, and the monthly review is where it should have
happened.

**The Note column is the point.** Everything else is bookkeeping. One honest
sentence about why a post did what it did is the only part of this file anyone
will read again.

**Check before drafting.** Before writing a post, search this file for the idea.
Inside six weeks, and it is a reuse decision rather than a new post.

**Quarterly prune.** Move rows older than a year into a dated archive section at
the bottom. Keep every blog row where it is, because those are still live assets
and the six-month refresh in [`repurposing.md`](repurposing.md) reads from here.

---

## Consent-linked rows

If a row involves a real person, the Note column carries `consent on file` and the
date it was given. The consent record itself lives outside this repo, with the
founder, per [`community-management.md`](community-management.md). **Never put a
patient's name, a clinic name, or any identifying detail in this file.** It is a
content register, not a records system.
