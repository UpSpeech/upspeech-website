# UpSpeech website (upspeech-website)

The public marketing site.

**This repo is public.** Nothing about product strategy, clinical positioning,
pricing sources or patient data goes in it, including in this file. The marketing
material was split into the private `upspeech-marketing` repo in August 2026 for
exactly this reason.

## Conventions

- **No regulatory positioning.** UpSpeech does not claim one and never implies
  one. The full claims standard is held privately; ask before writing anything
  that reads as a clinical or regulatory claim.
- `tailwind.config.ts` files the brand accent `#958AF0` under `calm.lavender`,
  which is a different colour's name in app-frontend. Check the value, not the
  name.
- On the dark charcoal band, lavender ink is `lavender-bright` `#BEB8F6`.
- A full-bleed hero image is never the LCP element here, so do not optimise it as
  though it were.

## Gates

```bash
npm run lint
npm run build
```

Prerendering runs out of memory locally at the default pool size and exits 137.
Drop `POOL_SIZE` to 2.

## Workspace rules

`AGENTS.md` in the umbrella repo, `UpSpeech/upspeech`, is the single copy and
holds the rest: pull requests, screenshots, plans and the board, testing,
decisions. Read it before opening a PR from here.

Five rules sit here because they bite before you would think to go and look.

- **Base branch: `main`.** Merging to `main` deploys. Netlify builds a preview per PR.
- **Work in a per-task worktree.** `git worktree add ../upspeech-website-<slug> -b <branch> origin/main`.
  Other sessions run against this checkout, and a `git switch` here reverts their
  uncommitted work.
- **Check `../plans/delight/` before changing a screen.** If an open delight plan
  names your files, ship the task here and that plan's stage to `feat/redesign`
  in the same session. The umbrella `AGENTS.md`, "The delight plans come with the
  change", has the steps.
- **Stage files by name**, so `.env`, credentials and keys stay out of a commit.
- **A commit message carries the change and nothing else.** No trailer naming an
  assistant or a vendor, and no em dashes anywhere: use a comma, or end the
  sentence.

**Comments are rare and short.** Write one where the code cannot say it itself: a
non-obvious constraint, a workaround and what forces it, a unit or an invariant.
Default to none.

## CI cannot enforce anything right now

Every GitHub Actions workflow in the organisation is failing to start:

> The job was not started because recent account payments have failed or your
> spending limit needs to be increased.

Jobs go red in a couple of seconds with zero steps executed. That is the billing
signature, not a test failure. Run the gates above locally and say in the PR that
you did. Delete this section when Actions runs again.
