# Marketing moved

The `marketing/` folder is now its own repo: `UpSpeech/upspeech-marketing`,
private, cloned to `marketing/` at the umbrella root by `bootstrap.sh`.

Brand voice, the writing standard, the Instagram, LinkedIn, and blog strategies,
the HTML-to-PNG template engine, and the exported assets all live there. So do
the `content` and `marketing-production` skills, which used to be
`.claude/skills/upspeech-marketing/` here.

It moved because this repo is public. The GTM triage, the AEO competitive
analysis with its named competitor set, and every unpublished draft were readable
by anyone. Reasoning and trade-offs:
`decisions/2026-08-26-marketing-becomes-its-own-repo.md` in the umbrella repo.

Website work the marketing side is waiting on is listed in that repo's
`blog/strategy.md`: the prerender failure on the technique pages, and the missing
`/for-slps` and `/for-people-who-stutter` pages.
