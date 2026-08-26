# Source images

Generated and edited plates, before they go into a template. Every job is
logged below by `tools/fal-image.mjs` so it can be reproduced.

Originals are kept alongside the edits, so an edit can always be compared with
what it came from.
## week-plate-v01.jpg
- model: `fal-ai/flux/schnell`
- input: none, generated
- prompt: A kitchen table at dusk in an ordinary home, a phone lying face down on the worn wooden surface beside a half-finished mug of tea and a set of keys, low warm light coming from one window out of frame, quiet and lived in, nobody present, editorial lifestyle photography, shallow depth of field, natural color, no readable text, no logos, no identifiable people
- seed: 671893939
- size: 1080x1350
- request: `01a03eea-48db-7603-a968-fef6ed604eb1`
**Accepted: `week-plate-v01-v03.jpg`**, copied to
`templates/assets/photo/week-table.jpg`.

Four variants came back in one job. v03 won on composition: the subject sits at
mid height, which leaves the lower third free for the scrim and the text, and the
lamp behind gives the light a direction the shadows agree with.

No escalation was needed. `fal-ai/flux/schnell` is the cheapest tier in
`../../image-prompts.md` and it cleared the realism checklist first time, which is
what usually happens on a scene with no hands and no faces in it. Four images at
roughly 1.5 MP came to about two cents for the whole job.

Deliberately not generated: a stage or conference scene. The post it belongs to is
about a talk that really happened, and a generated stand-in for a real event would
be a fabricated record rather than atmosphere.
