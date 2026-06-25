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
