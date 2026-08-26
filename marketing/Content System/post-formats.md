# Post Formats

The named, repeatable shapes. Every post is one of these, or it is a new format
that gets added here after it works.

A format is not a template file. It is a decision about structure: what goes on
which slide, in what order, and what makes that particular shape fail. The
template engine at `../instagram/templates/` renders them.

**How the renderer decides size**, from `export.mjs`:

| Name pattern | Output |
| --- | --- |
| `story-*` | 1080 x 1920 |
| `doc-<carousel>-<nn>-<slug>` | 1080 x 1350, and assembled in order into `doc-<carousel>.pdf` |
| `profile-grid` | 3240 x 3240 |
| everything else | 1080 x 1080 |

**Built** means an `<article data-export="...">` for it already exists in
`../instagram/templates/index.html`. **Not built** means the format is defined and
the template still has to be written.

---

## Instagram

### IG-1. Manifesto square

**When.** Positioning. The pinned post. A campaign opener.
**Reader.** Any, usually person who stutters.
**Shape.** One large Outfit headline, one supporting line, the Companion, soft
ground. Nothing else. No product, no call to action.
**Fails when.** It says two things. A manifesto that needs a second idea is not a
manifesto.
**Built.** `feed-01-manifesto`.

### IG-2. Stutter-positive statement

**When.** The education pillar. The most shared thing we make.
**Reader.** Person who stutters, or the wider community.
**Shape.** Navy statement frame from `brand-signature.md`. One sentence, large,
centered. Nothing to sell in the post, and nothing to sell in the caption either.
**Fails when.** A product mention sneaks in. It costs more reach than it earns,
every time.
**Built.** `feed-06-stutter-positive`.

### IG-3. Myth-bust square

**When.** Correcting something the field gets wrong.
**Reader.** Community, or parents.
**Shape.** Two options. Single square with the myths as speech bubbles around the
Companion, or the myth in navy on the top half and the correction on the light
lower half. Never more than five myths.
**Fails when.** The myth is more memorable than the correction. Give the
correction the larger type.
**Not built.**

### IG-4. Progress card

**When.** Making improvement visible. The "progress not pressure" pillar.
**Reader.** Person who stutters.
**Shape.** The progress ring as hero, at roughly 60% of the square, one number
inside it, one short line beneath. If the number is ours, the honest-limits tag
sits with it.
**Fails when.** The ring becomes decoration next to a paragraph. The ring is the
post.
**Built.** `feed-03-progress`.

### IG-5. Companion encouragement

**When.** The personality layer. Between heavier posts.
**Reader.** Person who stutters.
**Shape.** Companion large, one affirming line, one Companion state that matches
the line. No product, no call to action.
**Fails when.** The line congratulates an outcome instead of the showing up.
**Built.** `feed-04-companion`.

### IG-6. Practice and feature square

**When.** One capability, shown through a concrete habit.
**Reader.** Person who stutters.
**Shape.** One habit named, shown as a small card or list inside the square, one
line of context.
**Fails when.** It lists features. One capability, one habit.
**Built.** `feed-02-practice`, `feed-07-path`, `feed-08-scenarios`.

### IG-7. Phone-composite product proof

**When.** Showing the real product.
**Reader.** Person who stutters, or a clinician.
**Shape.** Real sanitized screenshot in a hand or a browser frame, flat ground,
optionally one oversized word behind the device. The screen is real, never
generated. Route detail in `../instagram/visual-production-pipeline.md`.
**Fails when.** The UI is generated, or the screenshot has real client data in it.
Both are hard stops.
**Built.** `feed-mock-01-progress`, `feed-mock-02-report`, `feed-10-app`,
`feed-11-mobile-trio`, `feed-photo-01-phone-practice`.

### IG-8. Technique carousel

**When.** Explaining one technique in four to six slides.
**Reader.** Person who stutters.
**Shape.**

1. Cover. Technique named, stated so the slide works alone in the feed.
2. What it is, in one sentence.
3. What it feels like to do it.
4. When a therapist tends to reach for it.
5. Optional: what it is not.
6. Ask. Save it, or bring it to your next session.

Companion travels through, one state per slide. Under 15 words a slide.
**Fails when.** It reads as instruction. We explain a technique, we never
prescribe one. "Ask your therapist whether this one is for you" is the ending.
**Not built** as a technique series. `carousel-app-01..03` is the same skeleton
for a product walkthrough.

### IG-9. Week-in-the-life carousel

**When.** Showing how the product actually fits a week.
**Reader.** Person who stutters, or a parent.
**Shape.** Cover, then one slide per beat of the week, then the ask.
**Fails when.** It becomes a feature tour with days attached.
**Built.** `carousel-week-01-hero` through `carousel-week-04-cta`.

### IG-10. Story checklist

**When.** Practice days.
**Shape.** Three to five items, tappable-looking, one idea. 1080 x 1920.
**Built.** `story-01-streak`, `story-03-progress`.

### IG-11. Story poll

**When.** Asking something only that reader could answer.
**Shape.** Two options that are both true for somebody. Never a poll about us.
**Fails when.** It asks "do you like our new feature?"
**Built.** `story-02-technique-poll`.

### IG-12. Story fact drop

**When.** Education, on the navy frame, at story size.
**Shape.** One fact, one source line, save prompt.
**Built.** `story-04-myth`.

---

## LinkedIn

### LI-1. Clinical observation post

**When.** The staple. Two to three a week.
**Reader.** Speech and language therapist.
**Shape.** Hook of roughly 140 characters that survives truncation, then three to
six paragraphs of real prose, then a genuine question about their practice.
900 to 1,600 characters.
**Fails when.** It opens with a question, or the product arrives before the reader
has agreed with the problem. Name the clinical reality first.

### LI-2. Build-in-public post

**When.** Roughly once a week.
**Reader.** Clinician, or a founder peer.
**Shape.** Same anatomy as LI-1, admitting something real. What we got wrong, what
we turned off, what surprised us.
**Fails when.** The admission is fake modesty about a strength. "We shipped too
fast because we care too much" fools nobody.

### LI-3. Mechanism explainer

**When.** A feature needs to be understood rather than announced.
**Shape.** The clinical problem, then how the thing works, then what it does not
do. The third part is not optional.
**Fails when.** It skips the limits. That paragraph is the one clinicians trust.

### LI-4. Document carousel

**When.** The highest-save format on the channel. Roughly twice a month.
**Reader.** Clinician or clinic.
**Shape.** 1080 x 1350 pages, six to ten, named
`doc-<carousel>-<nn>-<slug>` so the exporter assembles the PDF in order.

1. Cover. The whole idea, stated on its own.
2. The problem, from the clinician's day.
3. The problem again, with a number in a card if we have one.
4. The mechanism.
5. The mechanism, continued or shown.
6. **The limits.** What this does not prove or does not do.
7. Ask.

The limits slide is a house rule, not a convention borrowed from anywhere. It is
the honest-limits tag from `brand-signature.md` at carousel scale.
**Fails when.** It is a blog post cut into rectangles. Each page is one idea.
**Built.** `doc-refer-early-01-cover` through `doc-refer-early-07-cta`.

### LI-5. One-stat card

**When.** A single number worth pausing on.
**Shape.** Square. The number large, the label beneath, the honest-limits tag in
the card. Sourced or it does not ship.
**Built.** `li-stat-01`.

### LI-6. Statement card

**When.** A consented clinician quote, or the one line from a founder post worth
lifting out of it.
**Reader.** Whoever the post it came from was for.
**Shape.** 1080 x 1350, dark aurora, oversized quote mark behind, pill label, the
sentence in a split headline, one supporting line, attribution with role.
**Fails when.** The quote is from a patient. A patient's experience is not a sales
asset, and consent rule 5 bites hardest on this channel. Also fails when the
lifted line is the only interesting thing in the post it came from.
**Built.** `li-founder-01-statement`.

### LI-7. Photo post

**When.** A real photograph is the asset: a conference, a stage, a room, the team.
**Reader.** Any, usually clinicians or peers.
**Shape.** 1080 x 1350, photo full bleed, a navy scrim rising from the bottom,
pill label and headline over the scrim, mark at the foot. A bare variant drops
everything but the mark and lets the photograph carry it alone.
**Fails when.** Something is in the background that should not be published. Read
the whole frame before shipping, not just the subject: slides, whiteboards,
laptop screens, name badges, and documents on tables. A funding slide caught
behind a speaker is investor material by any other route.
**Also.** Any identifiable person in frame needs consent on file, including a
member of the team.
**Built.** `li-founder-02-week`, `li-founder-03-week-bare`.

**On a generated plate.** A photo post can run on a generated scene, and often
should. The line: a generated image may stand for an idea, never for an event that
really happened. A generated stage would be a fabricated record of a real talk. A
generated kitchen table standing for "the week" is atmosphere, which is what
`image-prompts.md` allows.

---

## Blog

### BL-1. Technique explainer

**When.** The findability pillar.
**Length.** 400 to 700 words.
**Shape.** Title as a typed question, standfirst, direct-answer paragraph of 40 to
60 words inside the first 150, H2s phrased as questions, three to five FAQs,
close with a link to two `/techniques` pages.
**Fails when.** The direct-answer paragraph does not stand alone when quoted with
no context. Assume it will be.

### BL-2. Pillar answer post

**When.** A buyer or reader question worth owning.
**Length.** 900 to 1,600 words.
**Shape.** As BL-1, longer, with sources on every factual claim.
**Fails when.** It answers three questions. One primary question per article.

### BL-3. Honest roundup

**When.** Rarely, and carefully.
**Shape.** Competitors treated fairly, on stated criteria, with us placed where we
actually belong. A roundup that puts us first is worth nothing.
**Note.** This is the single exception to the no-competitor rule, and it is
defined in `../blog/strategy.md`, not here.

### BL-4. Field note

**When.** Congress write-ups, evidence reads, what we learned building.
**Shape.** Free, short, honest. This is where we can say the evidence is thinner
than people assume, which is what makes us believable later.

---

## Adding a format

A format earns a place here after it has run once and worked. Add: when to use it,
the reader, the slide grammar, the failure mode, and the export name. If you
cannot name the failure mode, it is not a format yet, it is a post you liked.
