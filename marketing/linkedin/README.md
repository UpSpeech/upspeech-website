# LinkedIn System

The B2B channel for UpSpeech, aimed at speech-language pathologists, clinic
owners, and the wider speech-therapy field.

LinkedIn carries the clinical story that stays quiet on Instagram: AI clinical
documentation, clinician time savings, between-session adherence, and product
proof, told peer-to-peer and evidence-aware.

## Structure

- `strategy.md`: positioning, audiences, content pillars, formats, cadence.
- `content-calendar.md`: first four weeks of post drafts.

## Graphics

LinkedIn is text-first. When a post needs a graphic (a quote card, a stat, a
document carousel cover), reuse the Instagram template engine: add an
`<article data-export="li-...">` in `../instagram/templates/index.html`, style
it, and export. LinkedIn single images read well at 1200 x 1200 (square) or
1200 x 627 (landscape); document carousels are 1080 x 1350 portrait pages
uploaded as a PDF. The export script crops to 1080 x 1080 by default, which
posts cleanly.

## Voice

Same brand voice (`../brand-voice.md`), dialed to the *scientific* and credible
end. Respect clinical judgment, never overstate outcomes, and never turn a
patient's experience into a sales hook. The same sensitivity rules apply.
