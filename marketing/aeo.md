# AEO (Answer Engine Optimization)

How UpSpeech shows up in ChatGPT, Perplexity, and Gemini answers for
buyer-intent prompts, and what to do about it. AEO compounds slowly but it is
how a growing share of both patients and clinicians now find tools.

## Baseline — manual pass, 2026-06-25 (web search)

This is a first manual grounding via web search (Google SERP + the sources an
answer engine would cite), not a grader run and not direct answer-engine
testing. Treat the SERP/citation landscape as a proxy. The next step is still a
real pass inside ChatGPT, Perplexity, and Gemini (log in, run the prompts, note
who gets cited) plus a HubSpot AEO Grader run for scored numbers.

| Engine          | Brand query ("UpSpeech") | Category prompts | Date       |
| --------------- | ------------------------ | ---------------- | ---------- |
| Google SERP     | #1 (upspeech.app ranks)  | Absent           | 2026-06-25 |
| ChatGPT         | not yet tested           | not yet tested   | TODO       |
| Perplexity      | not tested               | Absent (0/5)     | 2026-06-25 |
| Gemini          | not yet tested           | not yet tested   | TODO       |

**Read:** UpSpeech is recognized on its own name (ranks #1 for "UpSpeech
stuttering therapy app") but has no share of voice on non-branded buyer prompts.
Category prompts are owned by the competitors below. Same pattern the reference
projects saw: discoverable when named, invisible when not. The fix is third-party
citations and category pages, not more brand-name content.

**Ahrefs AI Visibility Checker (2026-06-25):** **0 AI mentions** found across
ChatGPT, Gemini, Perplexity, Copilot, and Google AI Overviews. An independent,
multi-engine tool corroborates the manual Perplexity 0/5: UpSpeech has
effectively zero AI visibility today. This is the clean starting number to beat.

Re-run cadence: quarterly.

## HubSpot AEO Grader — 2026-06-25 (scored characterization)

Engines: OpenAI GPT-5.4 mini (cutoff Aug 2025), Perplexity (live), Gemini 3 Flash
Preview (cutoff Jan 2025). Inputs: United States, "AI speech therapy app for
stuttering", Healthcare.

| Metric (max)            | ChatGPT | Perplexity | Gemini |
| ----------------------- | ------- | ---------- | ------ |
| Overall AEO (100)       | 37      | 45         | 45     |
| Brand recognition (20)  | 2       | 3          | 2      |
| Market score (10)       | 6       | 6          | 6      |
| Presence quality (20)   | 5       | 6          | 6      |
| Brand sentiment (40)    | 22      | 29         | 31     |
| Share of voice (10)     | 2       | 1          | 0      |
| Recognition score (100) | 12      | 15         | 12     |
| Sentiment total (100)   | 56      | 72         | 78     |

**Caveat, read before trusting these.** The Grader asks each model to *characterize*
UpSpeech once handed the name and competitors, so its "Market Position" pie (it
reports 8-18% share of voice and 120-1,840 "mentions") is the model confabulating
from thin training data, not a measurement. It contradicts the two real-retrieval
checks (Ahrefs 0 mentions, manual Perplexity 0/5), which are the ones to trust for
"are we actually retrieved or cited." Use the Grader only for the signals below.

What it's genuinely useful for:

- **Brand recognition is low** (12-15/100) and share of voice ~0-2/10. Consistent
  with reality: we're not known.
- **Latent sentiment is moderate-to-positive** (56 / 72 / 78) and the archetype
  reads "Innovator, Niche". If we become visible, models are inclined to describe
  us well, so the job is visibility, not reputation repair.
- **What the models lean on:** ChatGPT admits "no robust review corpus" (0);
  Perplexity cites r/Stutter, our own site, and an arXiv paper that validates
  *Eloquent* and notes UpSpeech "lacks comparable peer-reviewed data"; Gemini
  leans on app-store ratings and health-tech journals.
- **Named growth gaps** (all double as content/PR angles): clinical
  validation/evidence, clearer differentiation vs alternatives, and retention.
- **Fuller competitor set surfaced:** Speech Easy, Proloquo2Go, enuncia.ai, Noona,
  Speakin, BeneTalk, DAF Pro, on top of Stamurai / Eloquent / Stutter Stars.

The throughline across all three checks: we are not retrieved or cited, but where
models do see us the read is positive. Pure visibility problem.

## Landscape to benchmark against (verified 2026-06-25)

UpSpeech sits at the intersection of two categories, so it competes for two
different sets of prompts. Names below actually surfaced in the buyer-prompt
searches.

**Stuttering / speech-practice apps (patient-facing):** Stamurai (dominant,
"world's biggest"), Eloquent (game-based, publishes pilot fluency data),
Stutter Stars, BeneTalk, SpeechEasy, StopStutter. Benchmark share of voice on
"best app for people who stutter."

**Clinician documentation / AI scribes (SLP-facing):** SLPFlow (SLP-specific
leader), PatientNotes, Sprypt, TheraPlatform, Zanda Health (BizzyAI), AizaMD,
SOAPNoteAI. Benchmark on "AI session notes for speech-language pathologists."

**Citation targets** (the listicles and bodies that rank and get cited, so
getting included here is the highest-ROL move): stutterstars.com's "10
stuttering apps" roundup, STAMMA (stamma.org) apps & devices page,
trytwofold.com's "best AI note takers for SLPs", and the Sprypt documentation
roundup.

UpSpeech's distinct angle, and the one to make legible to the engines: it does
*both*, and it is specifically stutter-positive and SLP-linked, not a generic
fluency drill or a generic medical scribe. No competitor found spans both sides.

**LinkedIn stat card:** `li-stat-01` now uses the ~2 hr/day figure, the load SLPs
report spending on paperwork (cited across documentation-tool sources). If you
want a hard citation on the card itself, add a small source line under the stat.

## Site issues blocking AEO (found 2026-06-25, fix first)

> **Status 2026-06-25, both addressed, in review.** Three website PRs target
> `preview/website-options` (the branch Netlify actually deploys to production;
> `main` is a stale English-only line):
> - **Issue #1 (broken technique pages): PR #18** adds a prerender content gate
>   that hard-fails the build if a backend-driven page renders empty, plus the
>   `--disable-web-security` CORS fix and `data-prerender-state` markers. Root
>   cause turned out to be three-fold: `VITE_API_URL` likely unset on Netlify
>   (still needs a maintainer dashboard check), the prerender only checked Helmet
>   tags (present even on the error page), AND the prod backend only allows CORS
>   from `*.upspeech.app` so the `localhost:4173` build origin was blocked. The
>   pre-existing `prerender-resilience` retry logic did NOT fix this (it retries
>   on missing Helmet tags, which the error page still has).
> - **Issue #2 (no `/for-slps`): PR #19** adds the clinician landing page in
>   en/pt/es.
> - Bonus: **PR #20** adds `/stutter-positive` and `/reducing-documentation-time`
>   articles (buyer-prompt whitespace, Article + FAQPage schema).
>
> Open maintainer action: set `VITE_API_URL` in the Netlify production build env;
> review the pt/es copy on #19/#20 before merge.

Checked what the live site actually serves to a crawler (`curl` as PerplexityBot).
The site prerenders to static HTML (Puppeteer SSG) with good schema, sitemap,
llms.txt, and hreflang. But:

1. **The technique pages are broken in production.** The build prerenders them
   while fetching content from the backend API, and on the production build the
   API was unreachable, so the deployed HTML is a failed state:
   - `/techniques/` serves the loading spinner (0 technique names, no
     `CollectionPage` schema).
   - `/techniques/<slug>/` serves an `<h1>` reading **"Error Loading Technique"**
     (confirmed on voluntary-stuttering and soft-starts).

   So our 11 technique articles + index, our richest and most citable content
   (Article + FAQPage schema), are invisible/broken to crawlers and answer
   engines. This very likely contributes to the 0 visibility. The home and other
   static pages prerender fine, so the pipeline works; only the backend-driven
   pages fail. Fix: make prerender hard-fail (don't deploy) if the API is
   unreachable, snapshot technique data at build time, or add a post-prerender
   assertion that the content is present and "Error Loading" is absent. (A
   `feat/prerender-resilience` branch exists, check whether it's merged/deployed.)

2. **No `/for-slps` (or `/for-clients`) page.** Both return the SPA fallback, so
   the SLP-documentation buyer prompt (#3) has no landing page to cite.

These are higher ROI than any new content: #1 unlocks pages that already exist;
#2 is the obvious gap for the B2B prompts.

## Actions

Ordered by likely ROI. Adjust after the first grader run.

### 1. Get cited in 3rd-party roundups and directories

Highest leverage: this is what gets crawled into future training rounds.

- [ ] Submit to AlternativeTo (vs Stamurai, vs Constant Therapy, vs Mentalyc).
- [ ] Submit to There's An AI For That, Futurepedia, ToolFinder.
- [ ] Product Hunt launch (one shot, pick a Tuesday).
- [ ] Pitch to pluck a mention in "best stuttering apps 2026" and "AI tools for
      SLPs" listicles (speech-therapy blogs, SLP newsletters, digital-health
      review sites).

### 2. Build comparison and category pages

Each page targets a known buyer prompt and gives engines structured content to
quote. Be fair to competitors; AI engines reward balanced pages.

- [ ] `/vs/stamurai` — therapist-linked vs solo self-practice, stutter-positive
      framing, progress shared with an SLP.
- [ ] `/vs/constant-therapy` — stuttering-specific vs broad neuro-rehab.
- [ ] `/for-slps` — the AI report drafting plus between-session adherence story.
- [ ] `/for-people-who-stutter` — the practice, progress, and scenario story.
- [ ] A plain "what is UpSpeech" page that answers the prompt directly in the
      first paragraph.

### 3. Trust and data-handling positioning

A clinical product is judged on this, and engines surface it. Get ahead of it.

- [ ] A `/privacy/data-handling` page: encryption, data residency, retention,
      multi-tenant isolation, and what the product does and doesn't store.
- [ ] An honest "is UpSpeech a medical device / does it diagnose?" FAQ entry
      (it supports therapy; it does not diagnose or replace a clinician).
- [ ] A trust signal near signup for clinicians (built with SLPs, your judgment
      stays in control).

### 4. Community presence

- [ ] Identify 1 to 2 active stuttering communities (e.g. r/Stutter, NSA-adjacent
      groups) and lurk before contributing. Be a member, not a marketer.
- [ ] Identify SLP communities (SLP subreddits, Facebook groups, ASHA-adjacent
      forums). Answer documentation/adherence questions usefully; mention the
      product once, in context, only where relevant.
- [ ] Answer relevant Quora/Reddit questions on "apps for stuttering" and "AI
      notes for speech therapists" with a genuinely useful answer.

### 5. Buyer-prompt content

Map known prompts to pages/posts that answer them directly so engines can quote
a paragraph.

- [ ] "Best apps for people who stutter in 2026" — honest roundup, include
      competitors fairly.
- [ ] "How to keep practising speech therapy between sessions."
- [ ] "Does AI note-taking work for speech-language pathologists?"
- [ ] "What does stutter-positive therapy actually mean?" — the awareness angle,
      which also feeds Instagram.

## Measurement tools (free first)

Use free tools for the baseline; only pay once we're actively moving the number.

**Brand inputs to paste into any tool:**

- Brand name: `UpSpeech`
- Website: `https://upspeech.app`
- One-line description: `AI-powered speech therapy for stuttering: between-session
  practice for people who stutter, plus AI clinical report drafting for SLPs.`
- Competitors (patient side): Stamurai, Eloquent, Stutter Stars
- Competitors (SLP side): SLPFlow, PatientNotes, TheraSnap
- Locale: run from the target market (set US first, then PT/ES for localized pages)

**Runsheet:**

1. **HubSpot AEO Grader** — https://www.hubspot.com/aeo-grader
   Free, no account, one-time. Enter brand + site. Returns a *scored* read across
   ChatGPT/Perplexity/Gemini (sentiment, presence, brand recognition, share of
   voice, market position). Copy the scores into the baseline table at the top.

2. **Ahrefs AI Visibility Checker** — https://ahrefs.com/ai-visibility-checker
   Free, no signup. Enter the domain. Checks ChatGPT, Gemini, Perplexity, Copilot,
   Google AI Overviews. Note mention + citation rate per engine (limited preview,
   but covers every engine free).

3. **Rankscale** — https://rankscale.ai  (free tier, for ongoing tracking)
   Sign up for the free tier, add the 5 prompts below and the competitors, let it
   track over time. This is the recurring monitor.

4. *(optional, paid-with-trial)* **Otterly** — https://otterly.ai/pricing
   14-day free trial, no card, then $29/mo Lite (15 prompts). Only if you want
   richer competitor/citation tracking than Rankscale's free tier gives.

Cross-check free one-shotters if a result looks off: Semrush AI Search Visibility
checker (semrush.com/free-tools/ai-search-visibility-checker), ProductRank.ai,
aeochecker.ai.

## What we're not doing yet

- No paid trackers beyond a free trial until the free tools show the number
  moving. The bottleneck is content that doesn't exist yet, not measurement.
- No multi-language AEO push until the English baseline moves.
- No efficacy or outcome claims to chase a prompt. Credibility is the moat;
  don't trade it for a ranking.

## Manual in-UI pass (the real baseline, ~10 min, monthly)

The web-search baseline above is a proxy. This is the actual answer-engine test;
it has to be run by hand because it needs a logged-in session in each engine.

Run each of the 5 prompts in **ChatGPT, Perplexity, and Gemini** (3 x 5 = 15
runs). For each, record:

- **Named?** Does the answer mention UpSpeech at all? (yes / no)
- **Position:** if named, is it a lead recommendation or a footnote?
- **Cited?** Does it link upspeech.app or a page that mentions us?
- **Who won:** the top 2-3 competitors the engine recommended instead.

Prompts:

1. best app for people who stutter
2. apps to practise speech therapy between sessions
3. AI session notes for speech-language pathologists
4. stutter-positive speech therapy tools
5. how do speech therapists reduce documentation time

Log one row per pass below. "Named?" = did the answer mention UpSpeech.

| Date       | Engine               | #1 | #2 | #3 | #4 | #5 | Named |
| ---------- | -------------------- | -- | -- | -- | -- | -- | ----- |
| 2026-06-25 | Google SERP proxy    | no | -  | no | -  | -  | 0/2   |
| 2026-06-25 | Perplexity, incognito | no | no | no | no | no | 0/5   |

Still to run: ChatGPT and Gemini (same 5 prompts, one row each).

## In-UI pass findings — 2026-06-25 (Perplexity, incognito)

UpSpeech was **named in 0 of 5** answers and **cited 0 times**. Perplexity does
live web retrieval and shows its sources, so it is the engine most likely to
surface a real product, which makes a clean 0/5 the strongest signal we have:
for these buyer prompts UpSpeech is not in the set of pages the engine retrieves
or cites. Per prompt:

1. *best app for people who stutter* — surfaced TalkPath Therapy, Speech4Good,
   SpeechEasy/DAF devices, and generic categories. It did not cite UpSpeech, and
   notably didn't lead with the strongest incumbents (Stamurai, Eloquent) either,
   so the cited set here is loose and winnable.
2. *apps to practise speech therapy between sessions* — SpeakClinic, "Terapia da
   Fala", Speechify. Localized to European Portuguese. UpSpeech absent.
3. *AI session notes for SLPs* — SLPFlow, TheraSnap, Novi, Ambiki, PatientNotes.
   This is the **crowded** prompt: real, entrenched, cited incumbents.
4. *stutter-positive speech therapy tools* — **no specific brand cited**, only
   generic categories. This is literally UpSpeech's positioning and it's wide
   open whitespace.
5. *how do speech therapists reduce documentation time* — **no brand cited**,
   generic workflow advice. It described "generate a draft, then review", which
   is UpSpeech's exact pitch, with no product attached.

**What this changes (priority order):**

- **The core gap is retrievability.** A live-retrieval engine missed us on all
  five, so the fix is citable, crawlable content: third-party listicles and our
  own category pages that directly answer these prompts. Brand-name content alone
  won't move it.
- **Own #4 and #5 first.** No incumbent holds them. A `/stutter-positive` page and
  a "reduce SLP documentation time" article, written to answer the prompt
  directly, are the highest-ROI pages to publish.
- **#3 is a fight.** SLPFlow/TheraSnap/Novi/PatientNotes are entrenched; compete
  with a specific angle (stutter-linked + patient practice), not head-on.
- **#1/#2 reward listicle inclusion.** The cited set was loose, so getting into
  the "best stuttering apps" roundups Perplexity pulls from is what moves it.
- The Portugal localization is a reminder to re-run from the target locale and to
  prioritize the PT/ES pages.

## Off-site citation runsheet (plan 147, Part B) — 2026-06-25

The Actions list above is the strategy. This is the operational layer: what is
now live to cite, the exact copy to submit, and when to re-measure. Pages get
crawled; third-party citations get UpSpeech into answers. Both halves are needed.

### Canonical URLs to point every citation at

Once PRs #18/#19/#20 merge and deploy, these are the pages a roundup, directory,
or community answer should link to. Until #18 deploys, the technique pages still
render broken, so hold technique-specific links until then.

- Patient story: `https://upspeech.app/for-patients`
- Clinician story: `https://upspeech.app/for-slps`  (PR #19)
- Stutter-positive explainer: `https://upspeech.app/stutter-positive`  (PR #20)
- SLP documentation article: `https://upspeech.app/reducing-documentation-time`  (PR #20)
- Technique hub: `https://upspeech.app/techniques`  (only after PR #18 deploys)
- PT/ES variants exist for all of the above under `/pt/...` and `/es/...`.

### Where to submit (concrete, check each accepts submissions)

1. **AI-tool directories** (fast, self-serve, indexed by answer engines):
   AlternativeTo, There's An AI For That (theresanaiforthat.com), Futurepedia,
   ToolFinder, ProductRank.ai. Use the blurb below.
2. **Stuttering-app roundups** ("best stuttering apps 2026", "apps for people who
   stutter"): find the pages Perplexity actually cited in the in-UI pass above
   (they were the loose set that listed Stamurai / Stutter Stars / SpeechEasy).
   Identify each article's update/contact route; pitch a fair inclusion, never a
   demand to top the list.
3. **SLP-tool roundups** ("AI tools for SLPs", "AI session notes for speech
   therapists"): SLP newsletters and digital-health review sites. Lead with the
   stutter-linked + patient-practice angle, not head-on vs SLPFlow/PatientNotes.
4. **Healthtech/app directories**: relevant Capterra/G2-style and SLP association
   resource pages that accept a profile.

### Ready-to-paste blurbs (brand-voice checked; edit per destination)

Directory / short listing (under ~50 words):

> UpSpeech is a stutter-positive speech therapy platform. People who stutter get
> guided practice and progress tracking between sessions; their speech-language
> pathologist sets the plan and gets AI-drafted session notes to review. Built
> with SLPs. Web, iOS, and Android.

Roundup inclusion pitch (one paragraph, for an editor):

> UpSpeech might fit your roundup: it is a stutter-positive app where practice is
> linked to the person's own therapist, not solo self-drill. People who stutter
> practise techniques their SLP assigned and see their progress; the therapist
> sees it too and gets a drafted session note to review and sign off. It is used
> alongside therapy, not instead of it. Happy to provide screenshots or a
> walkthrough. Canonical page: https://upspeech.app/for-patients

Community answer (only where genuinely on-topic, disclose affiliation):

> (Disclosure: I work on UpSpeech.) For practising between sessions, the thing
> that helped most was tying practice to what my/their therapist actually set,
> rather than a generic app. UpSpeech does that and is stutter-positive about it
> (the goal is being heard, not sounding a certain way). Whatever you pick, the
> therapist link is the part worth looking for.

### Community presence — handle with care (do not skip this caveat)

r/Stutter and similar are sensitive spaces, not link-drop targets. Rules:
participate authentically, always disclose affiliation, never astroturf, never
make outcome/cure claims, follow each community's self-promotion rules, and mention
the product once and only where it genuinely answers the question. A bad citation
here is worse for the brand than no citation. If the team cannot commit to doing
this as a real member over time, leave community out of the runsheet entirely.

### Re-measure schedule (and when rankscale earns its keep)

1. After PR #18 deploys, re-`curl` the live technique pages as PerplexityBot and
   confirm real content (no "Error Loading"); update the baseline at the top.
2. After the first round of directory/roundup submissions lands (allow a few weeks
   for crawl), re-run the free one-shotters (HubSpot AEO Grader, Ahrefs AI
   Visibility, manual Perplexity 0/5 prompts). Append dated results so this file
   keeps a trend, not just a snapshot.
3. Only once that re-measure shows the number starting to move is it worth setting
   up rankscale.ai's free tier for ongoing tracking. Before then there is nothing
   to monitor but a flat zero. (Confirmed: skip rankscale until step 2 moves.)
