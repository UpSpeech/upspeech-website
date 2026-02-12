# UpSpeech TODO

**Last Updated:** 2026-02-11
**Current Focus:** Storybook-First Testing Migration

> **Housekeeping:** Completed items are removed, not checked off. This keeps the file actionable. For history, check git blame or CHANGELOG.md.

---

## User Priority Tasks (TODO-simple.md)

**File:** [TODO-simple.md](./TODO-simple.md) — managed by the user, not by Claude.

**Instructions for Claude:** Check `TODO-simple.md` for the user's current priorities. These tasks are user-managed — Claude may only mark items as done when completed. Do not add, or remove them. If they're not prioritized, put them into P1 or P2.

---

## Storybook-First Testing Migration

**Documentation:** [STORYBOOK_TESTING_MIGRATION.md](../../../app-frontend/docs/STORYBOOK_TESTING_MIGRATION.md)

**Strategy:** Migrate from scattered unit tests to page-level Storybook stories with MSW + play functions.

### Quick Stats

| Metric                       | Current | Target  |
| ---------------------------- | ------- | ------- |
| Pages with Story Tests       | 23 / 23 | 23 / 23 |
| MSW Handler Factories        | 10 / 10 | 10 / 10 |
| UI Component Tests to Delete | 22 / 22 | 22 / 22 |
| Exercise Component Stories   | 25 / 25 | 25 / 25 |

### Therapist Portal Pages

- [x] `PatientDetailPage.stories.tsx` - Unified tabbed view (Progress, Learning Path, Exercises tabs)
- [x] `RecordingAnnotationPage.stories.tsx`

### Reports Pages

- [x] `ReportsPage.stories.tsx`
- [x] `ReportViewPage.stories.tsx`
- [x] `ReportEditPage.stories.tsx`
- [x] `ManualReportGeneratorPage.stories.tsx`
- [x] `AudioUploadPage.stories.tsx`

### Admin & Settings Pages

- [x] `AccountSettingsPage.stories.tsx` - Uses `users.ts` handler
- [x] `TenantSettingsPage.stories.tsx` - Uses `tenants.ts` handler
- [x] `UsersManagementPage.stories.tsx`
- [x] `TenantsManagementPage.stories.tsx`
- [x] `ExerciseManagementPage.stories.tsx`
- [x] `AnalyticsPage.stories.tsx`
- [x] `FeatureFlagManagementPage.stories.tsx`
- [x] `FeedbackManagementDashboard.stories.tsx`

### MSW Handler Factories Needed

- [x] `reports.ts` - `/reports`, `/reports/:id`, `/report_notes`, `/audio_recordings`, `/manual_reports`
- [x] `users.ts` - `/users`, `/invite_codes`, `/password`
- [x] `tenants.ts` - `/tenants`, `/tenant_settings`, `/feature_flags`, `/general_feedbacks`, `/analytics`

### Test Cleanup (After Stories Exist)

- [x] Delete 22 UI component test files (Button.test.tsx, etc.) - Stories cover these ✅ Already removed
- [x] Convert 9 page test files to stories with play functions ✅ Already removed
- [x] Keep 4 utility test files (permissions.test.ts, analytics.test.ts, consent.test.ts, utils.test.ts) ✅ Confirmed present

### Exercise Component Stories (Complete)

- [x] Shared infrastructure (componentDecorator, mediaDecorator, exerciseFixtures) ✅
- [x] Batch 1: Simple utility components (6 components, 26 stories) ✅
- [x] Batch 2: Display components (4 components, 13 stories) ✅
- [x] Batch 3: Non-recording exercises (3 components, 14 stories) ✅
- [x] Batch 4: Recording exercises (8 components, 33 stories) ✅
- [x] Batch 5: Modal components (4 components, 17 stories) ✅

### E2E Tests to Keep (Playwright)

- [ ] `auth.spec.ts` - Login, logout, session handling
- [ ] `therapy-session.spec.ts` - Complete therapy session flow
- [ ] `report-generation.spec.ts` - Generate and view a report

---

## Outstanding Testing

- [x] Backend integration tests — 7 new spec files (103 examples): report generation flow, exercise assignment lifecycle, patient-therapist linking, multi-tenancy isolation, mini game completion, audio recording lifecycle, scenario practice flow (Feb 11, 2026)
- [ ] Integration tests for all exercise types
- [ ] E2E tests for complete learning path flow
- [ ] Performance testing

---

## Phase 10: Learning Path UX Audit Fixes (2026-02-10)

**Source:** Comprehensive UI/UX and usability audit of the entire learning path system.
**Result:** 51 of 52 issues resolved. 1 deferred.

### Deferred

- [ ] **#16 — Breathing circle in PauseExercise could sync with audio** — Requires WebAudio API AnalyserNode integration, too complex for a polish pass. CSS-driven breathing animation works well as-is.

---

## Post-MVP (Backlog)

### Learning Path Enhancements

- [ ] Speech rate calculation with visual feedback
- [ ] Email/push notifications for inactivity, completions, unlocks
- [ ] Learning path analytics for therapists
- [ ] Full translation of exercise content (multiple languages)
- [ ] Track pending completions — patient "ready for review" flag for therapist

### Low Priority (From Design Audit)

- [ ] Consider migrating color system to OKLCH
- [ ] Implement semantic z-index tokens (`--z-sticky`, `--z-backdrop`, `--z-modal`, `--z-tooltip`)

---

## Completed Phases (Reference)

- **Learning Path Phases 1-9**: Backend, frontend, exercises, polish (Jan 30 — Feb 2, 2026)
- **Phase 10 UX Audit**: 51/52 issues resolved (Feb 10, 2026)
- **ElevenLabs Transcription Migration**: Switched from Groq Whisper to ElevenLabs Scribe v2 with GCS-based upload flow (Feb 11, 2026)
- **Backend Integration Tests**: 7 new integration test files, 103 examples covering all major business flows + multi-tenancy isolation (Feb 11, 2026)

---

## Key Design Decisions (Reference)

| Decision            | Resolution                                                                      |
| ------------------- | ------------------------------------------------------------------------------- |
| Visual layout       | Vertical journey (journey upward)                                               |
| Locked indicators   | No locked badges, just "coming next" preview                                    |
| Celebration style   | Calm acknowledgment, no confetti                                                |
| Return messaging    | Welcome back, no guilt                                                          |
| **Step completion** | **THERAPIST ONLY** - Patient practices unlimited times until therapist advances |
| Timer direction     | Counts UP (not down) to reduce pressure                                         |
| Questionnaire UI    | Sliders, SurveyMonkey-style                                                     |
| Patient view        | No "Complete Step" button - show encouraging "Keep Practicing" instead          |

---

## Related Documentation

- [TECHNICAL_PLAN.md](../../../local-docs/LearningPath/TECHNICAL_PLAN.md) - Complete Learning Path specification
- [Q&A.md](../../../local-docs/LearningPath/Q&A.md) - Requirements clarifications
- [TESTING_STRATEGY.md](../architecture/TESTING_STRATEGY.md) - Test coverage goals
- [STORYBOOK_TESTING_MIGRATION.md](../../../app-frontend/docs/STORYBOOK_TESTING_MIGRATION.md) - Storybook-first testing migration plan
