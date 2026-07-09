# Screenshot library

Real, sanitized product screenshots for use in templates (browser frames, phone
mockups, proof posts). Reference them from a template like:

```html
<img src="./assets/screenshots/web/therapist-report.png" alt="..." />
<img src="./assets/screenshots/mobile/patient-practice-device.png" alt="..." />
```

These are demo-only captures (no real patient names, emails, clinics, or session
data). Keep them that way. See `../../../brand-voice.md`.

## web/ (desktop app, landscape)

Source: `upspeech-website/public/screenshots/app/`.

- `client-dashboard.png` - patient home / weekly progress
- `therapist-dashboard.png` - clinician home
- `therapist-report.png` - AI-drafted session report
- `therapist-learning-path.png` - learning path builder
- `therapist-patient-progress.jpg` - per-patient progress view
- `patient-ai-scenario.png` - scenario practice
- `cbsa-severity-trend.png` - severity trend chart
- `researcher-annotation-tool.jpg` - annotation room

## mobile/ (phone, portrait)

Source: `upspeech-website/public/screenshots/mobile/`.

- `patient-home.webp`, `patient-journey.webp`, `patient-practice.webp` - raw
  screens (660 x 1434), drop into your own CSS phone frame
- `patient-home-device.png`, `patient-journey-device.png`,
  `patient-practice-device.png` - the same screens pre-composited into an iPhone
  frame (503 x 1036), ready to place directly (used in `feed-10-app`)
- `iphone-frame.png` - the empty iPhone frame, if you want to frame a raw screen

## Not vendored here (point to these when you need more)

Heavy or localized sets, left in their home repos to avoid bloating marketing:

- **App Store / Play listing screenshots** (caption-composited, per locale,
  iPhone 6.7" + iPad 12.9"): `app-mobile/fastlane/screenshots/<locale>/` and
  `app-mobile/.pr-assets/store/`. Locales include `en-US`, `es-ES`, `pt-PT`.
- **Android Play images:** `app-mobile/fastlane/metadata/android/<locale>/images/`.
- **More web captures:** `app-frontend/screenshots/` and
  `upspeech-website/public/screenshots/`.

When a mockup needs one of these, copy the specific file in (sanitized) rather
than vendoring the whole set. Localized store screenshots are also the obvious
raw material for the PT/ES localized posts.
