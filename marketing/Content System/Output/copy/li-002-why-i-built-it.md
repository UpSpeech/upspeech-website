# LI-002. Why a person who stutters founded a speech therapy company

Status: **ready to post.** Three assets, pick one.

| Asset | What it is |
| --- | --- |
| [`../exports/li-founder-02-week.png`](../exports/li-founder-02-week.png) | **Recommended.** LI-7 photo post. Generated plate, one line over it |
| [`../exports/li-founder-01-statement.png`](../exports/li-founder-01-statement.png) | LI-6 statement card. The opening line, no photograph |
| [`../exports/li-founder-03-week-bare.png`](../exports/li-founder-03-week-bare.png) | Same photograph, mark only, no text |

## Brief

| | |
| --- | --- |
| Reader | Speech and language therapist (`audiences.md`, persona 3) |
| Idea | The founder's stutter explains a design decision, and is not offered as evidence for anything |
| Evidence | `proof-library.md`, The founder, plus The pilot for the one number in the post |
| Next step | A genuine question about how they find out what happened between sessions |
| Format | LI-2, build-in-public post, with a photo |

## Post text

```text
I have stuttered my whole life. That is not a reason to trust our product, and
it is the reason the product is shaped the way it is.

Every person who stutters has a version of the same week. You leave a session
with something to practice. You do it once, badly, on a Tuesday. By the next
appointment you cannot honestly say what happened, so you round it up, and the
person trying to help you works from a summary you invented on the way in.

I did that for years. It was not laziness and it was not motivation. Nothing
about that week was visible to anyone, including me.

So we built the company around the week rather than around the session. Practice
tied to the technique the therapist set, short enough that it actually happens,
and visible to that therapist before the next appointment.

The part I want to be careful about: living with something is not the same as
knowing how to treat it. I am not a clinician, and I do not have outcome
evidence. What we have is one pilot. 24 adults, 21 of them practiced between
sessions with no notifications from us, 340 recordings. That measures engagement,
not clinical outcome.

The clinical judgment is yours. I wanted the week to stop disappearing.

What do you use now to find out what actually happened between two sessions?

#SpeechTherapy #Stuttering #SLP
```

Hook truncated at 140 characters reads: *"I have stuttered my whole life. That is
not a reason to trust our product, and it is the reason the product is shaped the"*
It survives the cut, and the second half of the sentence is the reason to keep
reading. Total 1,290 characters, inside the 900 to 1,600 range.

## Image

**A generated plate, not a photograph of the talk.** An empty kitchen table at
dusk: a mug, a phone face up, a set of keys, a lamp on somewhere behind. It is the
week the post is about, which is the honest thing for a generated image to be.

`fal-ai/flux/schnell`, the cheapest tier in
[`../../image-prompts.md`](../../image-prompts.md). Four variants in one job for
about two cents, and it cleared the realism checklist without escalating. The
prompt, the accepted variant, and why are in [`../source/log.md`](../source/log.md).

**A stage photograph was deliberately not generated.** This post is about a talk
that really happened. A generated stand-in for a real event is a fabricated
record, not atmosphere, and the line between the two is the whole reason the
generated-imagery rules exist.

### The real stage photo is still blocked

If you want the actual photograph instead, it is one command away, and it is
blocked on one thing that is not technical. **The projection screen behind the
speaker shows a funding allocation slide** (`& clinical · 15%`, `Reserve · 5%`).
`proof-library.md` lists investor material as never public, and a slide caught in
the background of a photograph is the same material by a different route. The
screen has to be cleared before that image is used anywhere at all, including
internally.

Put the original at `source/stage-original.jpg` and run:

```bash
node tools/fal-image.mjs \
  --model fal-ai/flux-pro/kontext \
  --image source/stage-original.jpg \
  --prompt "Remove all text, charts and graphics from the presentation screen behind the speaker, leaving a clean softly lit blank screen. Keep the speaker, his face, his clothing, the audience, the stage and the lighting exactly as they are. Photorealistic, unchanged composition." \
  --out stage-clean-v01.jpg
```

Then compare the speaker's face against the original before accepting it, copy the
result over `templates/assets/photo/week-table.jpg` or add a new article, and
re-export. Roughly four cents a try. If the model will not clear the screen
without disturbing the speaker, the fallback is a deterministic crop with
ImageMagick, which is safe and loses part of the room.

## Alt text

```text
Statement card: white text on deep navy reading "I have stuttered my whole life.
That is not a reason to trust our product." Below it, "It is the reason the
product is shaped the way it is." Attributed to the founder of UpSpeech.
```

Photo post:

```text
An empty kitchen table at dusk. A white mug, a phone lying face up, and a set of
keys rest on the bare wood, with a lamp lit somewhere behind in the dark room.
Text over the lower part reads "The week nobody could see."
```

## Ship checklist

| # | Item | Result |
| --- | --- | --- |
| 1 | Brief complete | pass |
| 2 | Sensitivity | pass. No outcome claim, fluency never framed as the goal, no stutter imitated or described for effect |
| 3 | Claims | pass. The pilot number carries the engagement tag in the same paragraph |
| 4 | Style | pass. No em-dash, no banned word, prose paragraphs |
| 5 | Specificity | pass. Nobody else can post the Tuesday paragraph |
| 6 | Accessibility | pass. Alt text written, and the card's text is repeated in the post |
| 7 | Channel fit | pass. Hook survives truncation, 3 hashtags |
| 8 | Portuguese | n/a. A PT-PT version is worth writing again for this one |
| 9 | Links | n/a |
| 10 | No pricing | pass |
| 11 | No regulatory framing | pass |
| 12 | Consent | pass. No identifiable person in the shipped assets. The founder is the author |
| 13 | No investor material | pass. The generated plate has no slide in it. The real stage photo still fails until its screen is cleared |

## Notes

**This post walks straight into a rule I wrote, so it is worth being explicit.**
`proof-library.md` says of the founder entry: *lived experience is authority about
a life, not about a clinical field. It never stands in for evidence, and it never
leads a post aimed at a clinician.*

The first line leads with the stutter. It stays inside the rule because of what
the sentence does next: it says outright that this is not a reason to trust the
product. The stutter is used to explain a design decision, which is a mechanism,
and the only claim in the post is the pilot number with its limit attached. The
paragraph beginning "the part I want to be careful about" is the one doing the
work, and it does not get cut for length.

If that paragraph ever gets dropped, the post breaks the rule and should not go
out.

**Two checklist items are new on this post.** Consent, because there is a real
identifiable person in the frame, and no investor material, because there nearly
was. Both are worth adding to the standard checklist rather than remembering them
one post at a time.
