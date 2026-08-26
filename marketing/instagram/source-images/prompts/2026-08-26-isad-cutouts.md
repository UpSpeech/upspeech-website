# ISAD campaign cut-outs, 26 August 2026

Two generated objects, cut out and composited in CSS rather than baked into a
plate. Both are objects. No people, per rule 5 in `../../../brand-voice.md`.

Tooling: `genmedia` CLI v0.7.0. Cost about USD 0.02 for the batch including two
discarded attempts.

## mug

Used in `feed-isad-06-listen` (`.cutout-mug`).

| Field | Value |
|---|---|
| Generate | `fal-ai/flux/dev`, `image_size: square_hd` |
| Prompt | a single cream ceramic mug with a soft matte glaze, centred, filling most of the frame, plain pure white seamless background, soft even daylight, calm minimal product photograph, no text, no people |
| Cut out | `fal-ai/birefnet`, `output_format: png` |
| Post | `magick -trim +repage` |
| Plate | `../composites/mug-plate.png` (1024x1024) |
| Output | `../../templates/assets/objects/mug.png` (449x442, srgba) |

## plant

Used in `story-isad-03-fact` (`.cutout-plant`).

| Field | Value |
|---|---|
| Generate | `fal-ai/flux/dev`, `image_size: square_hd` |
| Prompt | a small green potted plant in a pale ceramic pot, centred, filling most of the frame, plain pure white seamless background, soft even daylight, calm minimal product photograph, no text, no people |
| Cut out | `fal-ai/birefnet`, `output_format: png` |
| Post | `magick -trim +repage` |
| Plate | `../composites/plant-plate.png` (1024x1024) |
| Output | `../../templates/assets/objects/plant.png` (412x523, srgba) |

## What to repeat

Ask for the object **centred and filling most of the frame**. The first attempt
left it small in a large white field, so the trimmed cut-out came out around
290px and was too soft to scale to 1080.

Read the written path back from `downloaded_files[0].path` rather than assuming
the name you passed to `--download`. When the target file already exists the CLI
writes `name_1.png`, `name_2.png` instead of overwriting, which is easy to miss
and leaves you editing a stale file.

Generate into an empty directory for the same reason.

## Rejected

A pair of over-ear headphones. Cut out cleanly, but came back matte black,
which is off-palette against the navy and light-lilac system. Swapped for the
mug. Prompting for a specific brand colour would be the fix if the object is
wanted later.
