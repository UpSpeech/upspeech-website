# UpSpeech Content Directives

Read this before writing any Instagram caption, LinkedIn post, or blog article.

`brand-voice.md` says who we sound like. The channel strategy files say what to
post and how often. This file says how to write the thing so it comes out at the
same standard every time, in English and in European Portuguese.

It is written to be usable two ways: by a person drafting a post, and by a Claude
Code session generating one. The `/content` skill in the umbrella repo loads this
file, so anything added here changes what the assistant produces.

## Order of authority

When two files disagree, higher wins.

1. **The sensitivity rules** in `brand-voice.md`. Never overridden by anything.
2. **Claim discipline** (this file). What we are allowed to say about a clinical
   product with no published trial.
3. **House style** (this file).
4. **Channel directives** (this file).
5. **Channel strategy** (`instagram/strategy.md`, `linkedin/strategy.md`,
   `blog/strategy.md`).
6. **`gtm-laws.md`**, which is advice, not law.

---

## Before you write: the four-line brief

Every post starts with four answers written down. If any is blank, there is no
post yet, only a topic.

| Line | Question | Fails when |
| --- | --- | --- |
| **Reader** | Which single audience? | "SLPs and patients". Pick one. |
| **Idea** | One concrete sentence. | "Talk about our AI features." |
| **Evidence** | What makes it true: a pilot number, a clinician's words, a product behavior, a cited paper. | You reach for an adjective instead. |
| **Next step** | What the reader does. Feeling calmer and saving the post both count. | You write "engagement". |

The five audiences, from `brand-voice.md`: people who stutter, parents and
caregivers, speech-language pathologists, clinic owners, the wider community.
A post aimed at two of them lands with neither.

## The quality bar

Three tests. A draft passes all three or it gets rewritten.

**Read it aloud.** If you stumble, run out of breath, or hear a sentence no
person would say, cut it. The whole product is about speaking, so copy that is
hard to say out loud is off-brand on top of being bad writing.

**The clinician test.** Picture an SLP with twenty years of caseload reading it
over coffee. Do they nod, or do they wince? A wince means we overstated
something, patronized someone, or described their job wrong.

**The specificity test.** Could a competitor paste this text under their own logo
and have it still make sense? If yes, the post says nothing. Put back the number,
the technique name, the actual sentence someone said.

---

## House style

### Mechanics

- No em-dashes anywhere. Use commas, periods, or parentheses.
- US English across all channels: practice, behavior, organize, program. The
  website already uses it, so a British spelling reads as a different author.
- Most sentences under 20 words, one idea each. Vary the length so it does not
  read like a metronome.
- Numerals for numbers, including under ten. Euro sign before the amount: €99.
- One exclamation mark per post at most, and only for a real celebration.
- Bold for one phrase a reader would want to find again, not for emphasis.
- Never all caps.
- Contractions are fine and usually better. We are warm, not stiff.

### Words we do not use

| Do not write | Write instead |
| --- | --- |
| leverage | use |
| unlock, empower | let, help |
| seamless, effortless | delete it and describe the actual number of steps |
| revolutionize, game-changer, disrupt | delete the sentence |
| cutting-edge, state-of-the-art | name the actual technique |
| delve, dive in, let's explore | start with the point |
| journey | week, path, therapy (exception: "Journey" naming a product screen) |
| solution | the specific thing it does |
| robust, powerful, comprehensive | delete |
| in today's fast-paced world | delete the sentence |
| here's the thing, let that sink in | delete |
| struggles with, suffers from, battling | lives with, works on, or nothing at all |
| harness, supercharge, elevate | delete |

War and battle metaphors are out everywhere. Nobody is fighting their speech.

### Constructions we do not use

**The antithesis flip.** "It's not about speaking perfectly. It's about being
heard." One of these per quarter across all channels, and only when the contrast
is real and load-bearing. Stacked, they are the loudest sign a machine wrote the
post.

**Rule-of-three padding.** "Calm, clear, and confident" when one of the three is
doing all the work. Cut to the word that means something.

**The stacked rhetorical opener.** Two or three questions in a row before the
post says anything.

**Fragments. For. Emphasis.** One sentence per line down the whole post is the
LinkedIn house style of people with nothing to say. We write paragraphs.

**Emoji as bullet points.** No emoji at all on LinkedIn or the blog. On Instagram
they are allowed inside a sentence where a person would use one, never as a list
marker and never more than two in a caption.

**Generic engagement bait.** "What do you think?" and "Agree?" are dead. Ask
something only that reader could answer, about their own week.

### Structure

Prose paragraphs on LinkedIn and the blog. Use a list only when the content is
genuinely a list of parallel things, such as techniques or steps. A post built
entirely of bullets has skipped the thinking.

---

## Claim discipline

This is the section that keeps us out of trouble. UpSpeech is MDR Class I,
self-certified on efficiency, with no published clinical trial. Every public
sentence has to sit inside that.

| Cannot say | Can say | Why |
| --- | --- | --- |
| improves fluency | supports the technique the clinician set | outcome claim |
| reduces stuttering by X% | in our pilot, 21 of 24 adults practiced with no notifications sent | that number is engagement, and we say so |
| clinically proven, evidence-based results | built with speech-language pathologists | no trial published yet |
| saves clinicians five hours a week | drafts the session report so the clinician edits and approves instead of typing from scratch | the hours are not measured |
| the AI detects, assesses, or diagnoses | the AI drafts, the clinician decides | no diagnostic claim, ever |
| helps you speak fluently | five calm minutes, wherever you are | fluency is not the goal |
| replaces homework sheets | makes the week between sessions visible | describe, do not compare |

Four rules underneath the table.

1. **Every number carries its source in the same post**, or it does not appear.
   The pilot numbers are: 24 adults, 21 of them practiced without any
   notification, 340 recordings submitted. They measure engagement. Never let
   them imply a speech outcome.
2. **"AI" is never used without the human step in the same sentence or the next
   one.** Drafts and the clinician approves. Suggests and the clinician decides.
3. **UpSpeech is never the subject of a verb about a person's speech.** The app
   does not improve, correct, fix, or smooth anything. It records, shows, tracks,
   drafts, and reminds.
4. **No named competitor**, no side-by-side, no "unlike other apps".

When a draft needs a claim we cannot make, the fix is almost always to describe
the mechanism instead of the result. Mechanism is concrete, checkable, and more
persuasive to a clinician anyway.

---

## Instagram

Audience order on this channel: people who stutter, parents, the community, then
clinicians as a quiet presence. Full pillars in `instagram/strategy.md`.

### Caption anatomy

```
Line 1      A complete thought under 60 characters. This is all most people see.
            No cliffhangers, no "read this before you...". It has to land alone.

            (blank line)

Body        Two to four short paragraphs. 250 to 600 characters total.
            Second person, one reader. Concrete practice language.

            (blank line)

Ask         One line. Save it, try it tomorrow, send it to someone, link in bio.

            (blank line)

Hashtags    Five to eight, own block, from the rotation in strategy.md.
```

Write line 1 last, after you know what the post actually says.

### Rules

- No links in the caption. Instagram does not make them clickable. Say "link in
  bio" and make sure the bio link matches the post.
- The education pillar exists to be saved and shared, so it carries nothing to
  sell. A soft mention of the product in a myth-busting post costs more reach
  than the mention is worth.
- Alt text is written before posting, not bolted on after. Patterns and drafts
  are in `instagram/alt-text.md`. Describe what is in the image and what it
  means, in one or two sentences.
- Text baked into an image also appears in the caption. Screen readers cannot
  read a PNG.

### Carousels

Cover slide states the entire idea on its own, because that is the slide that
appears in the feed. Five to eight slides. Last slide is the ask. Every slide has
to be readable at thumbnail size, which in practice means one idea and under 15
words per slide. Build them as `<article data-export="...">` entries in
`instagram/templates/index.html` and export.

### Stories

One idea per frame. Question stickers get answers when they ask about the
reader's own life ("where do you practice?"), not about us. Polls work best with
two options that are both true for somebody.

---

## LinkedIn

Peer-to-peer with clinicians and clinic owners. Credible and useful, never loud.
Pillars in `linkedin/strategy.md`.

### Post anatomy

```
Hook        The first two lines, roughly 140 characters, before "see more".
            A specific observation or a number. Never "I'm excited to announce".
            Never a question.

Body        Three to six short paragraphs of real prose.
            900 to 1,600 characters is the working range.
            Peer-to-peer. Name the clinical reality before naming the product.

Close       One line that gives the reader something to do or think about,
            or a genuine question about their own practice.

Hashtags    Three at most, at the end, or none. Never mid-sentence.
```

### Rules

- The hook is truncated on mobile at a different point than on desktop, so the
  post has to survive being cut at 140 characters. Read it truncated before
  posting.
- Lead with the clinician's day, not the feature. The documentation burden, the
  session that starts with fifteen minutes of "how was your week", the homework
  that did not happen. The product enters after the reader has already agreed
  with the problem.
- Build-in-public posts admit something real. A post about a thing we got wrong
  outperforms a launch note and costs nothing but ego.
- Reply to every substantive comment the same day. On LinkedIn the comment thread
  is the distribution, not the post.
- Never repost an Instagram caption. Same idea, rewritten for a clinician, or
  skip it.
- A patient's experience is not a sales asset. Consent rule 5 applies here
  hardest, because this is the channel where it would be most tempting.

### Formats

Text is the staple. Document carousels (exported as `doc-*` pages, assembled into
a PDF by the template engine) earn the most saves and suit the "five ways the
session note eats your evening" shape. Single graphics for one stat or one quote.
Video is optional and always captioned.

---

## Blog

The blog is the only channel that compounds. It is also the fix for the AEO
problem in `aeo.md`, where UpSpeech currently registers zero mentions across
answer engines on non-branded prompts. Pillars and cadence in `blog/strategy.md`.

### Article anatomy

```
Title           What the reader gets, under 60 characters so search does not cut it.
Standfirst      Two sentences under the title: who this is for, what it answers.
Direct answer   40 to 60 words in the first 150 words of the article, answering
                the title question plainly. This is the block answer engines lift.
Sections        H2s, each phrased as a question a person would actually type.
Body            900 to 1,600 words standard. 400 to 700 for a technique explainer.
FAQ             Three to five real questions, marked up as FAQPage schema.
Close           The next step, plus a link to a relevant /techniques page.
```

### Rules

- One primary question per article, phrased the way a person types it into a
  search box, not the way a clinician would title a paper.
- The direct-answer paragraph is written to stand alone when quoted with no
  surrounding context. Assume it will be.
- Every factual claim links to a source. Prefer peer-reviewed work, then
  professional bodies (ASHA, APTF, AELFA, NVLF), then the Stuttering Foundation
  and community organizations. Never a content-marketing blog as a source.
- Every article links to at least two `/techniques` pages, and technique pages
  link back to the article. That internal web is what makes the section rank as a
  section rather than as scattered pages.
- Byline with credentials, published date, and a visible "updated" date. Answer
  engines and clinicians both weigh authorship.
- Articles for parents never open on fear. No "is your child falling behind".

### When the blog lives on upspeech.app

Mirror the existing `/techniques` pattern in the website repo: a route in
`src/App.tsx`, a page component, and shared layout. Whatever the implementation,
these are required before a post goes live.

- Route under `/blog/<slug>`, slug in English, lowercase, hyphenated.
- Meta title and description, distinct from the H1.
- Canonical URL on every post.
- Open Graph image at 1200 x 630, produced by the Instagram template engine so it
  matches the brand rather than being a stock picture.
- Entry in `sitemap.xml`.
- Article and FAQPage structured data.
- Published and modified dates in the markup, not only in the visible text.

### When the blog lives somewhere else

Substack, Medium, and LinkedIn articles all work for distribution and all have
the same trap. If an article exists on upspeech.app as well, the external copy
carries a canonical tag pointing back to upspeech.app. Never publish identical
text on two indexed domains with no canonical, because the copy that ranks will
not be the one you control.

External-first pieces still follow the anatomy above. Drop the site file
conventions, keep the direct answer, the sources, and the technique links.

---

## Portuguese

Portugal is the first market. Portuguese content is not a translation pass, it is
the post written again from the same brief. Translating an English post produces
English rhythm in Portuguese words, and clinicians hear it immediately.

### European Portuguese, not Brazilian

Write PT-PT under the Acordo Ortográfico of 1990. Machine translation and most AI
drafting drift to Brazilian Portuguese by default, so every draft gets checked for
these tells.

| Brazilian tell | European Portuguese |
| --- | --- |
| gagueira | gaguez |
| fonoaudiólogo, fonoaudióloga | terapeuta da fala |
| você as the default second person | tu |
| estar praticando (gerund) | estar a praticar |
| time | equipa |
| celular | telemóvel |
| tela | ecrã |
| contato | contacto |
| usuário | utilizador |

Under AO90, Portugal keeps the consonant it pronounces and drops the one it does
not: `contacto` and `facto` keep the c, `direção` and `ação` lose it.

### Address

Patients and parents get **tu**. It is the warm, normal second person in Portugal,
and `você` reads cold or foreign there, which is the opposite of what the brand is
for.

Clinicians get **tu** in peer-to-peer founder voice, or impersonal infinitive
constructions when the post is more formal ("Redigir o relatório deixa de ser o
fim do dia"). Portuguese professional register on LinkedIn runs more formal than
American LinkedIn, so keep the calm and drop the US directness in openers.

### Terminology

| English | PT-PT | Never |
| --- | --- | --- |
| speech-language pathologist | terapeuta da fala | fonoaudiólogo |
| speech therapy | terapia da fala | |
| stuttering | gaguez | gagueira |
| people who stutter | pessoas que gaguejam | gagos |
| person who stutters | pessoa que gagueja | um gago |
| patient, client | utente, paciente | |
| clinic | clínica | |
| session | sessão | |
| caseload | lista de utentes | |
| session report | relatório de sessão | |
| practice (noun) | prática, treino | |
| to practice | praticar, treinar | |
| between sessions | entre sessões | |
| easy onset | início suave | |
| light contact | contacto leve | contato leve |
| prolonged speech | fala prolongada | |
| pausing | pausas | |
| cancellation | cancelamento | |
| pull-out | pull-out, saída | |
| preparatory set | preparação prévia | |
| voluntary stuttering | gaguez voluntária | |
| desensitization | dessensibilização | |
| progress | progresso, evolução | |

`feedback` is used untranslated in Portuguese clinical practice and is fine.
`stutter-positive` has no clean single term, so explain the idea instead of
inventing one: "uma abordagem que não trata a gaguez como um defeito a corrigir".

### The sensitivity rules in Portuguese

They translate in meaning, not word for word.

- `gago` as a noun label is out, the same way "stutterer" is out in English. As an
  adjective in someone's own self-description it belongs to them, not to us.
- `sofre de gaguez` is out. Nobody suffers from anything in our copy.
- `curar`, `corrigir`, and `superar a gaguez` are all out. They are outcome claims
  and they frame stuttering as a defect at the same time.
- `falar normalmente` is out. There is no normal.

### Practical

Portuguese runs 15 to 25 percent longer than English. An Instagram first line
that fits in 60 characters in English will not fit translated, so rewrite it
shorter rather than letting it truncate. Recheck every length limit after
writing, not before.

Hashtags: `#Gaguez #TerapiaDaFala #TerapeutaDaFala #PessoasQueGaguejam`, plus the
English community tags, which the Portuguese community also follows.

---

## The ship checklist

Run it before posting. Any fail sends the draft back.

1. **Brief.** Reader, idea, evidence, and next step are all answered.
2. **Sensitivity.** No outcome claim, no cure, fluency never framed as the goal,
   no imitated stutter, no "suffers from", no real person or clinic without
   written consent on file.
3. **Claims.** Every number carries its source. Every "AI" carries the human step.
   UpSpeech is not the subject of a verb about someone's speech. No competitor
   named.
4. **Style.** No em-dash. No word from the banned table. No antithesis flip. No
   one-sentence-per-line formatting. Reads aloud without a stumble.
5. **Specificity.** A competitor could not post this text under their own logo.
6. **Accessibility.** Alt text written, video captioned, contrast checked, and any
   text inside an image repeated in the caption.
7. **Channel fit.** First line or hook still works truncated. Length inside the
   range. Hashtag count inside the range.
8. **Portuguese, if applicable.** No Brazilian tells. `tu`, not `você`. Lengths
   rechecked after the text expanded.
9. **Links.** Every link works and goes where the copy promised.

---

## One idea, three channels

**Brief.** Reader: varies by channel. Idea: people in our pilot kept practicing
without being nagged. Evidence: 21 of 24 adults, 340 recordings, no push
notifications sent. Next step: varies.

**Instagram**, for people who stutter.

> Nobody reminded them. They practiced anyway.
>
> In our pilot, 21 of 24 adults kept practicing between sessions with no
> notifications from us at all. No streak warnings, no nudges, no guilt.
>
> It turns out that when practice is short, clear, and someone is going to see
> it, showing up gets easier on its own.
>
> Save this for the week you need it.

**LinkedIn**, for clinicians.

> We sent zero notifications during the pilot. 21 of 24 adults practiced between
> sessions anyway, and submitted 340 recordings.
>
> We had built the reminder system. We turned it off before the pilot started
> because we wanted to know what adherence looked like without pressure, and the
> honest answer was that we were slightly afraid of what we would see.
>
> What seems to have carried it is that the practice was short, tied to the
> technique the therapist had actually set, and visible to that therapist
> afterwards. Practice that someone is going to look at behaves differently from
> practice that disappears.
>
> This measures engagement, not outcomes. The clinical evidence work is a
> separate and much slower project. But it changed what we build: we spend our
> effort on making the week visible rather than on getting better at nagging.
>
> If you set home practice, what actually gets it done in your caseload?

**Blog**, for clinicians and clinic owners, as the direct-answer paragraph.

> Between-session practice adherence improves when practice is short, tied to a
> technique the clinician set, and visible to that clinician afterwards. In a
> pilot of 24 adults using UpSpeech with no notifications enabled, 21 practiced
> between sessions and submitted 340 recordings. This measures engagement rather
> than clinical outcome.

**LinkedIn in Portuguese**, written again rather than translated.

> Não enviámos uma única notificação durante o piloto. Ainda assim, 21 dos 24
> adultos praticaram entre sessões e submeteram 340 gravações.
>
> O sistema de lembretes estava construído. Desligámo-lo antes do piloto porque
> queríamos saber como era a adesão sem pressão, e havia algum receio do que
> íamos encontrar.
>
> O que parece ter feito a diferença é a prática ser curta, estar ligada à
> técnica que o terapeuta definiu, e ser vista por esse terapeuta depois. Uma
> prática que alguém vai ver comporta-se de forma diferente de uma prática que
> desaparece.
>
> Isto mede adesão, não resultados clínicos. Essa evidência é um trabalho à parte
> e bastante mais lento.
>
> Para quem prescreve treino em casa: o que é que realmente funciona na tua lista
> de utentes?

---

## Before and after

**Feature announcement.**

> Before: We're excited to unveil our game-changing AI report generation, which
> empowers clinicians to seamlessly streamline their documentation workflow and
> unlock hours of time savings!

> After: The session report now arrives as a draft. You read it, change what is
> wrong, and approve it. The judgment stays yours, the typing mostly does not.

**Awareness post.**

> Before: It's not about speaking perfectly. It's about speaking up. Stuttering
> doesn't define you. Join us on the journey to finding your voice.

> After: Speaking up matters more than speaking smoothly. Save this if it is a
> reminder you needed today.

**Parent-facing post.**

> Before: Is your child falling behind in their speech development? Early
> intervention is critical. Don't wait.

> After: Most parents want to know when to ask someone. If your child is
> stuttering and it has lasted more than six months, or they have started to
> avoid words or situations, a speech-language pathologist can tell you what, if
> anything, to do next. Asking early is not the same as something being wrong.
