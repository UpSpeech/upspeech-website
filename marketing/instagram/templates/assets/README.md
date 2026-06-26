# Template Assets

Vendored assets used by the deterministic Instagram template renderer.

- `logo.svg` and `logo-invert.svg`: UpSpeech lockups copied from the website
  public assets so social exports use the real brand mark.
- `fonts/`: self-hosted Latin WOFF2 cuts for Outfit, Plus Jakarta Sans, and
  Bricolage Grotesque. Keeping fonts local makes exports reproducible without
  relying on Google Fonts loading in headless Chrome.
- `screenshots/`: demo-only product screenshots used in product proof posts.
  These must never contain real patient names, real emails, real clinic names,
  session recordings, or client data.

Do not use image generation for readable product UI. Capture or compose a real
sanitized screenshot, then place it here or in `../source-images/screenshots/`.
