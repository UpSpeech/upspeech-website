# Brand Signature

What makes an UpSpeech post recognizably ours.

This was written from `Assets/Inspiration from other companies/`, which holds
carousels and posts from Sword Health, Headspace, Expressable, and a few
illustrators. The point of that folder is not to give us formats to copy. It is to
show what good looks like so we can build our own.

Three parts: the principles those posts prove, the devices that are ours, and how
to borrow a format without borrowing a look.

Principles 7 to 9 and the five devices marked *second pass* came from going back
through the same folder after the first carousel shipped, with a built deck to
compare against. Reading the references cold and reading them with something of
our own beside them are different exercises, and the second one found things the
first missed.

---

## Part 1: nine principles the reference set proves

Stated as principles, deliberately, so they can be applied without any of it
looking like the brand it came from.

**1. A recurring slide label turns a carousel into a series.** A small consistent
tag at the top of each slide (the reference set uses things like `THE PROBLEM`,
`THE SOLUTION`) does more work than it looks like. It tells the reader where they
are, it makes the next slide feel worth swiping to, and across many posts it makes
separate carousels feel like one publication.

**2. A mixed-weight headline lets one phrase carry the idea.** Bold on the four
words that matter, regular on the rest, in a single typeface. The eye lands on the
claim before it reads the sentence. Cheaper and better than two typefaces.

**3. Numbers belong in cards, not in prose.** A 2x2 grid of four figures reads in
a second. The same four figures in a paragraph read in ten and land in none.

**4. One statement per slide beats one paragraph per slide.** The strongest
carousels in that folder put a single sentence on a full-bleed ground and trust
it. Slides are free. Cramming is a choice.

**5. An object that travels across slides creates continuity.** One reference set
moves a small sun along a horizon from slide to slide. It costs nothing, it makes
the deck feel authored, and it gives the eye a reason to keep going.

**6. A character can front a feature that is otherwise abstract.** "Our AI drafts
your notes" is hard to picture. A character holding that idea is not. It also
makes the feature feel like it belongs to the product rather than to the industry.

**7. A label that names an act beats a label that names a part.** Principle 1
says put a label there. This says what to put in it. The strongest deck in the
folder runs `THE TURN`, `THE SOUNDING BELL`, `THE GUARDRAILS`, `THE PROOF`, and
each one makes the reader want to know what it means. Nobody has ever wanted to
know what `THE SOLUTION` is. Same component, same position, same cost, and it
turns a labelled sequence into a story with chapters.

**8. Emphasis inside body copy needs a different device from emphasis in a
headline.** Bold works in a headline, where there are eight words and two of them
carry it. In a forty-word paragraph bold goes muddy and the eye stops trusting
it. One reference set wraps the load-bearing clause in a filled bar with reversed
type, which survives at body size where bold does not.

**9. A proportion drawn is more shareable than a proportion stated.** `94%` is a
number the reader parses. Ninety-four filled dots out of a hundred is a picture
the reader sees, and it is the version that gets screenshotted. The cost is one
slide's worth of layout for a figure that was going in the deck anyway.

---

## Part 2: the UpSpeech signature

The devices that are ours. Nothing in the reference folder has these, and a slide
using three or four of them is identifiable as UpSpeech with the logo covered.

All of them are built and running in
[`Output/templates/styles.css`](Output/templates/styles.css), which shares
nothing with the rest of the repo. A device does not get listed here until it has
rendered in an export, so that this list can be trusted as an inventory rather
than a wishlist. `doc-visible-week` is the deck that carries every one of them
and is the place to look at them working.

**The aurora ground.** Lavender, sky, and mint bleeding in from opposite corners
of a near-white field, with a quiet dot grid over the top. The dark variant runs
the same bleeds, brighter, over deep navy. It is principle 1 and principle 5
solved at once: every slide is unmistakably part of the same set, and the corner
color gives an otherwise plain layout somewhere to breathe. Class: `.frame`,
`.frame-dark`.

**The dark bookends.** *Second pass, corrected.* Dark ground for the cover and
for the limits slide, light for the argument in between. This was already how
`doc-visible-week` ran before anyone wrote it down, and it is right: dark is
where the brand speaks in its own voice, on the opening claim and on the honest
caveat, and the light pages are where the argument gets made. Naming it stops it
being an accident of one deck.

An earlier draft of this entry called for something different, a deck held on one
ground and broken exactly once. That was written from two exported pages rather
than the whole deck, and it described a problem the deck did not have. Building
it settled the question, and the entry now says what the deck actually does.

What the reference set was pointing at is real but compositional rather than
tonal, and it is the next entry.

**The filled upper half.** *Second pass.* Every page in a carousel anchors its
content to the bottom, which is correct and which leaves the top forty percent
empty. On one page that is composure. On five consecutive pages it is the same
picture five times, and the deck goes flat in a way no change of ground fixes.
Each interior page wants one object up there: a ghost word, a pictograph, a
product screen, a stat grid tall enough to reach. The test is to lay the pages
side by side at thumbnail size, which is roughly how a reader meets them, and see
whether any two are the same shape.

**The pill label.** A white pill with a soft lift, uppercase Bricolage, tracked
wide. `THE PROBLEM`, `WHAT WE MEASURED`, `WHAT THIS DOES NOT SHOW`. Principle 1,
in our type. Class: `.pill`.

**The act label.** *Second pass.* The pill, with principle 7 applied to what goes
inside it. Each carousel gets its own set of four or five act names, drawn from
its own subject rather than from a generic outline. The deck about a pilot with
no reminders runs `THE HABIT WE EXPECTED`, `WHAT THEY DID INSTEAD`, `THE THING WE
TURNED OFF`, `WHAT THIS DOES NOT SHOW`. Two rules keep it from turning cryptic:
an act label has to be intelligible on its own in the feed, because slide four
may be the first one a reader sees, and the limits slide keeps its plain label in
every deck. `WHAT THIS DOES NOT SHOW` is the one place where being unmistakable
beats being interesting. No new class, the pill renders it.

**The split headline.** One typeface, two weights. Bold on the phrase that
carries the idea, regular on the rest. "So we **turned the reminders off**." The
eye lands on the claim before it reads the sentence. Class: `.headline strong`.

**The highlight bar.** *Second pass.* The split headline, one level down, for
body copy. The load-bearing clause of a paragraph sits inside a filled bar in the
navy to sky to mint gradient, type reversed to white. This is principle 8, and it
is the only device in the reference folder the signature had no answer for.
Rationed hard: once per slide, and not on a slide that already carries a gradient
numeral, or the two fight and the slide has no focal point at all. Class:
`.mark-bar`.

**The clause has to fit on one line**, and that is the rule building it produced.
The bar sets `box-decoration-break: clone` so a wrap paints the full gradient on
every line rather than slicing one gradient across them, which is the right
behaviour and still not enough. A clause that wraps after its first word leaves
that word alone in a bar of its own, and a one-word bar reads as a rendering
fault rather than as emphasis. Mark the short version of the clause, or break the
line yourself, and look at the render before shipping it. `the week is invisible`
works where `the week is invisible to both of you` does not.

**The gradient numeral.** Numbers are the loudest object on a slide, filled with
the navy to sky to mint gradient rather than a flat color. A zero we are proud of
takes flat mint instead, because zero notifications sent is a different kind of
number from 340 recordings submitted. Classes: `.numeral`, `.numeral-flat`.

**The pictograph.** *Second pass.* Principle 9. A proportion drawn as a grid of
dots rather than set as a percentage, the counted dots in mint and the remainder
at low opacity on the same ground. It suits prevalence figures, which is much of
what [`proof-library.md`](proof-library.md) holds: `5 in 100` children stutter
for six months or more, `1 in 100` keep stuttering long term. Those two together
are the strongest pictograph we have, because the picture makes the gap between
them the point, which is exactly what the myth square is arguing. It also suits a
plain count out of a plain total: `doc-visible-week` draws 21 of 24.

Rules. The grid matches the denominator, so `1 in 100` is ten by ten and never a
rounded stand-in at 99 percent. It replaces the **gradient** numeral on that
slide rather than joining it, since two loud objects leave a slide with no focal
point. A flat numeral is a different matter and can stay: on
`doc-visible-week-03` the mint dots and the flat mint zero agree rather than
compete, and the zero is the counterpoint the pictograph is arguing against.

A pictograph ships with its caption. The dots are the picture and the caption is
the figure, and a reader who screenshots the slide needs both. A figure only gets
drawn if it is sourced in the proof library, since a picture of a number reads as
more certain than the number did and the limit tag has to work harder to hold it.
Classes: `.pictograph`, `.pictograph-dot`, `.pictograph-caption`, with `--cols`
setting the row length.

**The travelling ring.** A progress ring in the top right that fills a little
more on every page of a carousel, 8 percent on the cover to full on the last
slide. Principle 5, and better than borrowing somebody's travelling sun, because
a progress ring is what the product is actually about. A reader can see the deck
has a direction before reading a word. Class: `.ring`, driven by `--fill`.

**The promise cue.** *Second pass.* The mint rule and the word `SWIPE` at the
foot of the cover is a good object carrying a weak instruction. Every reference
cover that earns the swipe says what the reader gets for it: *swipe to see what
is hiding in your data*, *swipe for milestones to celebrate*. Ours names the
payoff in the reader's terms, in sentence case beside the rule, five to nine
words. `Swipe for what 24 people did with no reminders.` The instruction is not
the point. The promise is, and a cover that cannot make one is usually a carousel
without an argument yet. It keeps the mint rule and drops the tracking and the
caps, because those belong to a label and this is a sentence. Classes: `.swipe`
with `.swipe-promise`, alongside `.swipe-bar`.

**The limit tag.** The one nobody else in that folder does, and the most
distinctive thing we have. A gold dot and a line saying what the number does not
prove, inside the frame, on the same slide as the number. `Engagement, not
clinical outcome`. Class: `.limit-tag`.

It started as a constraint. It works as a signature. In a category where every
competitor's stat slide is an unqualified outcome number, the brand whose stat
slide says what it does not prove is doing something recognizable, and a
clinician notices it in about two seconds.

**The ghost word.** An oversized word behind the content, cropped by the frame
edge, at 5 percent opacity, on the slide where a single word is the whole idea.
Class: `.ghost`, with `.frame-dark .ghost` reversing it to white on the dark
ground.

**Once on the cover, and at most once inside.** *Second pass, corrected.* The
rule used to read once per carousel, which building `doc-visible-week` showed to
be one budget covering two different jobs. A cover that sets its type in the
lower third leaves the top two thirds empty and reads as unfinished, and every
reference cover fills that space with something: a headline set enormous, a
product mockup, two tilted photographs. The ghost word is what we have for it and
it costs one word. Spending the whole allowance there would then rule it out for
the interior page that actually needs it. So the cover gets one and the interior
gets one, and a third is a tic. This deck runs `ANYWAY` on the cover and
`TUESDAY` on page 2.

**Quoted speech bubbles.** A claim shown as something somebody said, staggered
left and right like a conversation, rather than asserted by us in a headline. It
lets a myth post put the myth on screen without the brand appearing to say it.
Class: `.bubbles`.

**The split square.** The claim on a dark half, what is actually true on a light
half. The Instagram counterpart to the limit tag: two things on one square, held
together instead of one replacing the other. Class: `.split`.

**The type stack.** Outfit for headlines at 400 and 800, Plus Jakarta Sans for
body, Bricolage Grotesque uppercase for labels. Never substituted.

## Part 3: borrow the device, not the design

Every format in that folder is available to us. What does not come with it is the
other brand's look: not their palette, not their type, not their illustration
style, not their voice. Take the structure, run it through Part 2, and it comes
out ours.

Concretely: the customer-story shape is a good shape. Run it on our dot grid, in
Outfit, with the Companion moving through it and our own numbers in the cards, and
nobody would connect the two.

Three places where a borrowed format meets a rule we already have. In each case
the format survives, with one change.

**The red-flags checklist.** A strong, high-save format, and we can run it. What
changes is where it points. Claim discipline rule 4 in `../CONTENT_DIRECTIVES.md`
rules out competitor comparison, so ours points at qualities worth looking for in
any tool that sits between sessions, with no vendor named or implied. "Questions
worth asking about anything you put between your sessions" is the same format
doing more useful work, and it is more credible than a takedown anyway.

**Stat cards.** Ours to use, in the 2x2 grid from principle 3. The numbers come
from [`proof-library.md`](proof-library.md), which means they are engagement and
prevalence figures carrying their limits, not outcome figures. That is the
honest-limits tag from Part 2, and it is why our stat slide looks different from
everyone else's even at a glance.

**Emoji as bullet markers.** A house-style call in `../CONTENT_DIRECTIVES.md`, not
a judgment about the format. The same checklist runs with mint check marks and
navy iconography from the product's own icon set.

### One narrow hard line

The scribble-as-feeling device (a tangle of line standing in for an emotion, a
plain figure beside it) is genuinely good and we can use it, including for the
feeling of a hard moment before speaking.

The line: **not a scribble, tangle, or distortion coming out of a mouth.** Every
other use is fine. That one specific framing reads as imitating speech, and
sensitivity rule 3 in `../brand-voice.md` is absolute. It is a narrow exclusion
about one composition, not a ban on the device.

---

## Appendix: what each reference taught

Kept as a record of the thinking. Nothing here is an instruction to reproduce
anything.

| Reference | What it taught |
| --- | --- |
| Sword Health customer story | The eyebrow label, the mixed-weight headline, the 2x2 stat grid, context pills at the foot of a stat slide |
| Sword Health red flags | The checklist as a save-worthy format, and why the comparative version of it is not available to us |
| Sword Health white paper and takeaways | That a long document can be pulled apart into a carousel without losing the argument |
| Headspace tip carousels | One statement per slide, full-bleed color, and the travelling object as a continuity device |
| Expressable | A named character fronting an abstract AI feature. Also that "more time with clients, less time on notes" is a message that works, and that it is an antithesis flip, which house style rations to one per quarter |
| Five myths about therapy | An entire myth post in one square, with the myths as speech bubbles around a character |
| Worry Lines illustrations | The scribble as a feeling, and the calm figure standing beside it rather than inside it |
| Phone showcase posts | Real UI in a real hand on a flat ground, with an oversized word behind the device. Cheap to build deterministically, and it keeps the screen crisp |

Second pass, after the first carousel shipped:

| Reference | What it taught |
| --- | --- |
| Sword Health white paper | Act names in the label instead of outline headings, which is principle 7 and the largest free upgrade in the set. Also that the mechanism slide should carry the real product screen rather than describe it |
| Sword Health takeaways | The filled highlight bar as emphasis inside body copy, where bold stops working. Also that eleven slides is two slides of padding, and seven holds an argument |
| Sword Health report | The dot matrix for a proportion, and the swipe cue written as a promise rather than an instruction |
| Headspace celebrating wins | That a carousel gets its rhythm from a change of ground, which we take once per deck rather than by alternating |
| Headspace boundaries carousel | The pair stack, a claim pill above and a reframe pill below on one divided card, which is the myth square as a repeatable carousel page |
| Reference covers as a group | That an empty upper two thirds reads as unfinished, and that every one of them puts something there |
