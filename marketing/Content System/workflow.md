# Workflow

Idea to published, for all three channels.

`../instagram/posting-playbook.md` covers this for Instagram in more operational
detail. This file is the pipeline all three channels share, plus who owns what.

---

## The pipeline

```text
1. Intake        the four-line brief
2. Draft         copy first, always
3. Visual route  decide before generating anything
4. Produce       template, export, or write
5. Check         the nine-item ship checklist
6. Accessibility alt text, captions, contrast
7. Schedule      queue it, do not publish on impulse
8. Publish
9. Engage        48 hours, actively
10. Log          content-log.md
11. Review       monthly
```

---

## 1. Intake: the four-line brief

From `../CONTENT_DIRECTIVES.md`. No post starts without all four.

| Line | Answer |
| --- | --- |
| Reader | Exactly one persona from [`audiences.md`](audiences.md) |
| Idea | One concrete sentence |
| Evidence | An entry in [`proof-library.md`](proof-library.md), a product behavior, a clinician's words, or a cited source |
| Next step | What the reader does |

If Evidence is blank, stop. Do not go looking for a number to fit the idea, which
is how invented statistics happen. Either restructure the post around a mechanism,
or add a sourced entry to `proof-library.md` first.

**Lead time.** Five days for a normal batch. Ten to fourteen for a campaign.

## 2. Draft

Copy before visuals, without exception. A visual made before the copy exists ends
up deciding what the post says, and it decides badly.

Pick the format from [`post-formats.md`](post-formats.md) by name and write to its
grammar. For Instagram, write the first line last. For LinkedIn, read the hook
truncated at 140 characters. For the blog, write the direct-answer paragraph so it
survives being quoted with nothing around it.

## 3. Visual route

Decide before generating anything. Three routes, in order of preference.

| Route | When | Where |
| --- | --- | --- |
| Deterministic template | Any post that is text, numbers, or product UI | `../instagram/templates/index.html` |
| Real screenshot composite | Product proof where the screen is the content | `../instagram/visual-production-pipeline.md` |
| Generated plate | Atmosphere only. Desks, hands, texture, light | [`image-prompts.md`](image-prompts.md) |

Most posts are route one. Route three is a background, never a subject.

## 4. Produce

Copy goes into `index.html` as an `<article data-export="...">`, named to the
convention in [`post-formats.md`](post-formats.md), then:

```bash
npm run export -- <name-or-prefix>
```

from `../instagram/templates/`. Blog posts are written straight into the site
repo, following `../blog/README.md`.

## 5. Check

The nine-item ship checklist at the end of `../CONTENT_DIRECTIVES.md`. Run it
honestly and record the result. The three that catch the most drafts:

- A number without its source, or without the tag that travels with it.
- A banned word, or the antithesis flip.
- Text baked into an image that never made it into the caption.

Plus two from this prototype: **no price, no regulatory framing.** See the never-
public list in [`proof-library.md`](proof-library.md).

## 6. Accessibility

Not a step that can be skipped when time is short, because accessibility is part
of the brand rather than a compliance item.

- Alt text written before posting. Patterns in `../instagram/alt-text.md`.
- Every video captioned.
- Contrast checked.
- Any text inside an image repeated in the caption. A screen reader cannot read a
  PNG.

## 7. Schedule

Queue it. Publishing the moment a post is finished produces clumps and gaps, and
a calm reliable cadence is itself on-brand with an anxious audience.

Cadence, from the channel strategies:

| Channel | Cadence |
| --- | --- |
| Instagram | 3 feed posts a week, 1 carousel, 2 to 4 story frames on practice days |
| LinkedIn | 2 to 3 posts a week, Tuesday to Thursday mornings |
| Blog | 2 a month, sustained |

Never two selling posts back to back on any channel.

## 8. Publish

## 9. Engage

**48 hours, actively.** On LinkedIn the comment thread is the distribution, not
the post. Reply to every substantive comment the same day.

Tone and the hard situations are in
[`community-management.md`](community-management.md). Read it before the first
difficult comment arrives, not after.

## 10. Log

One row in [`content-log.md`](content-log.md), the same day. A register nobody
fills in is worse than no register, because it looks like a record.

## 11. Review

Monthly, against [`measurement.md`](measurement.md).

---

## Who does what

Small team, so this is about which hat, not which person.

| Step | Hat | Approves |
| --- | --- | --- |
| Brief | Whoever is asking for the post | |
| Draft | Writer or AI session | |
| Claims and numbers | Writer, against `proof-library.md` | Founder, for anything new |
| Sensitivity call | Anyone can raise it. Nobody overrules it | Founder |
| Clinical accuracy | An SLP reads anything technique-specific | SLP |
| Consent | Founder holds the register. No exceptions | Founder |
| Visual | Producer | |
| Publish | Whoever holds the calendar | |

Two things only the founder approves: **a new claim entering
`proof-library.md`**, and **anything involving a real person.** Both are the kind
of thing that is hard to take back.

---

## Batch request

To ask for the next batch, in a session or from a person:

```text
Next 2-week UpSpeech batch.

Goal:            [signups / awareness / clinician trust / feature education]
Channel:         [Instagram / LinkedIn / blog / all three]
Reader focus:    [one persona from audiences.md]
What worked:     [top posts from the last batch]
What changed:    [features shipped, new screenshots, new evidence]
Need:            [e.g. 6 feed posts, 2 carousels, 4 stories, 1 LinkedIn document]
```

Come back every two weeks while launching, before the queue runs dry. Monthly once
there is a rhythm.

## When to ask for more than the routine

- A feature ships.
- Real, shareable usage data exists.
- Three to four weeks before International Stuttering Awareness Day, 22 October.
- A clinic partnership goes live.
- Something in `proof-library.md` changes, which changes what we are allowed to
  say.
