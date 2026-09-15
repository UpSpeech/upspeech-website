# UpSpeech website (upspeech-website)

The public marketing site.

**This repo is public.** Nothing about product strategy, clinical positioning,
pricing sources or patient data goes in it, including in this file. The marketing
material was split into the private `upspeech-marketing` repo in August 2026 for
exactly this reason.

## Conventions

- **No regulatory positioning.** UpSpeech does not claim one and never implies
  one. The claims posture lives in the marketing repo's
  `standards/CONTENT_DIRECTIVES.md`.
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

The full text is `AGENTS.md` in the umbrella repo, `UpSpeech/upspeech`, which is
the single copy. These are the ones that cause damage if missed, so they are
repeated here.

- **Base branch: `main`.** Merging to `main` deploys. Netlify builds a preview per PR.
- **Use a per-task worktree.** `git worktree add ../upspeech-website-<slug> -b <branch> origin/main`.
  Never `git switch` in this checkout: other sessions run against it and a branch
  change reverts their uncommitted work.
- **Stage files by name.** Never `git add -A` or `git add .`, and never stage
  `.env`, credentials or keys.
- **No tool attribution.** No `Co-Authored-By`, no "Generated with", no assistant
  or vendor name in a commit, a PR body or a trailer.
- **No em dashes.** Anywhere. Use a comma or end the sentence.
- **A PR for a numbered plan opens with the plan and its issue**, on the first
  line, using the cross-repo form:

  ```
  **Plan**: [NNN, Title](https://github.com/UpSpeech/upspeech/blob/main/plans/NNN-slug.md), stage N of M. Tracking issue: UpSpeech/upspeech#ISSUE.
  ```

  A bare `#ISSUE` resolves in this repo and points at something else. Never write
  `Closes` on it: GitHub does not auto-close across repositories.
- **Comments are rare and short.** No comment restating the line below it, none
  longer than the code it describes, no tombstones for deleted code, no plan
  numbers or dates. Default to none.


## CI cannot enforce anything right now

Every GitHub Actions workflow in the organisation is failing to start:

> The job was not started because recent account payments have failed or your
> spending limit needs to be increased.

Jobs go red in a couple of seconds with zero steps executed. That is the billing
signature, not a test failure. Run the gates above locally and say in the PR that
you did. Delete this section when Actions runs again.
