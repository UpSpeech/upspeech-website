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

LinkedIn is text-first. When a post needs a graphic, reuse the Instagram
template engine in `../instagram/templates/`: add an `<article data-export="...">`
to `index.html`, style it, and export.

**Single images.** Name them `li-...`. They export at 1080 x 1080, which posts
cleanly (LinkedIn reads squares at 1200 x 1200 and landscape at 1200 x 627).

**Document carousels.** Name the pages
`doc-<carousel>-<nn>-<slug>`, for example `doc-refer-early-01-cover`. The `doc-`
prefix exports each page at 1080 x 1350 portrait, and the exporter then
assembles every page of a carousel, in slide-number order, into
`exports/doc-<carousel>.pdf`. Upload that PDF as a LinkedIn document post.

Re-render one carousel without rebuilding the whole set:

```bash
npm run export -- doc-refer-early
```

## Voice

Same brand voice (`../brand-voice.md`), dialed to the *scientific* and credible
end. Respect clinical judgment, never overstate outcomes, and never turn a
patient's experience into a sales hook. The same sensitivity rules apply.
