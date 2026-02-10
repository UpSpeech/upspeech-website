# UpSpeech TODO

**Last Updated:** 2026-02-10
**Current Focus:** Learning Path UX Audit Fixes / Storybook-First Testing Migration

---

## User Priority Tasks (TODO-simple.md)

**File:** [TODO-simple.md](./TODO-simple.md) — managed by the user, not by Claude.

**Instructions for Claude:** Check `TODO-simple.md` for the user's current priorities. These tasks are user-managed — Claude may only mark items as done when completed. Do not add, remove, or reorder items.

---

## Storybook-First Testing Migration

**Documentation:** [STORYBOOK_TESTING_MIGRATION.md](../../../app-frontend/docs/STORYBOOK_TESTING_MIGRATION.md)

**Strategy:** Migrate from scattered unit tests to page-level Storybook stories with MSW + play functions.

### Quick Stats

| Metric                       | Current | Target  |
| ---------------------------- | ------- | ------- |
| Pages with Story Tests       | 8 / 23  | 20 / 23 |
| MSW Handler Factories        | 7 / 8   | 8 / 8   |
| UI Component Tests to Delete | 0 / 22  | 22 / 22 |

### Therapist Portal Pages

- [x] `MyPatientsPage.stories.tsx` ✅
- [ ] `PatientDetailPage.stories.tsx` - Unified tabbed view (Progress, Learning Path, Exercises tabs)
- [ ] `RecordingAnnotationPage.stories.tsx`

### Reports Pages

- [ ] `ReportsPage.stories.tsx` - Needs `reports.ts` handler
- [ ] `ReportViewPage.stories.tsx`
- [ ] `ReportEditPage.stories.tsx`
- [ ] `ManualReportGeneratorPage.stories.tsx`
- [ ] `AudioUploadPage.stories.tsx`

### Admin & Settings Pages

- [ ] `AccountSettingsPage.stories.tsx` - Needs `users.ts` handler
- [ ] `TenantSettingsPage.stories.tsx` - Needs `tenants.ts` handler
- [ ] `UsersManagementPage.stories.tsx`
- [ ] `TenantsManagementPage.stories.tsx`
- [ ] `ExerciseManagementPage.stories.tsx`
- [ ] `AnalyticsPage.stories.tsx`
- [ ] `FeatureFlagManagementPage.stories.tsx`
- [ ] `FeedbackManagementDashboard.stories.tsx`

### MSW Handler Factories Needed

- [ ] `reports.ts` - `/reports`, `/reports/:id`, `/report_notes`
- [ ] `users.ts` - `/users`, `/me`, `/account_settings`
- [ ] `tenants.ts` - `/tenant_settings`, `/tenants`

### Test Cleanup (After Stories Exist)

- [ ] Delete 22 UI component test files (Button.test.tsx, etc.) - Stories cover these
- [ ] Convert 9 page test files to stories with play functions
- [ ] Keep 4 utility test files (permissions.test.ts, analytics.test.ts, consent.test.ts, utils.test.ts)

### E2E Tests to Keep (Playwright)

- [ ] `auth.spec.ts` - Login, logout, session handling
- [ ] `therapy-session.spec.ts` - Complete therapy session flow
- [ ] `report-generation.spec.ts` - Generate and view a report

---

## Outstanding Testing

Remaining test items from completed learning path phases:

- [ ] Component tests for exercise components (quiz, waveform, timer, identification)
- [ ] Integration tests for all exercise types
- [ ] E2E tests for complete learning path flow
- [ ] Performance testing
- [x] Cognitive load review — Completed Feb 10, 2026. Both patient and therapist flows evaluated for information density, competing choices, flow predictability, and anxiety triggers. Result: Pass. Patient flow uses excellent progressive disclosure (accordion milestones, single CTA, one-question-at-a-time questionnaires). Therapist flow is appropriately dense for clinical professionals. No code changes needed.
- [x] Accessibility audit (`/audit`) — Design review + polish pass completed (Feb 10, 2026): 17 issues found and fixed across 10 files (touch targets, keyboard navigation, heading hierarchy, ARIA roles, design token consistency, focus rings, runtime bug fix)

---

## Phase 10: Learning Path UX Audit Fixes (2026-02-10)

**Source:** Comprehensive UI/UX and usability audit of the entire learning path system (therapist + patient flows).
**Total Issues:** 52 findings across patient experience, therapist experience, exercise components, accessibility, and information architecture.

### Batch 1: Critical Issues (Fix First)

These issues represent functional gaps or data loss risks that should be resolved before any other improvements.

- [x] **#38 — Recordings never uploaded to server** — Added `uploadExerciseRecording` helper in StepDetailPage, wired into all 6 recording exercises. Backend consent validation exempted for learning path recordings. WebM extension mapping added to API client. ✅
- [x] **#20 — No confirmation dialogs for therapist actions** — Added confirmation modal for Complete/Skip/Reopen actions in TherapistLearningPathView with action-specific messaging and button variants. ✅
- [x] **#1 — No paused learning path UI state** — Added paused status check in TherapyJourneyPage with calm sky-blue PauseCircleIcon and reassuring messaging. ✅
- [x] **#39 — QuizExercise double onComplete call** — Removed premature `onComplete` call from `handleNextQuestion`. Now fires only when user clicks "Continue" on results screen. ✅

### Batch 2: High Priority — Therapist Experience

These issues significantly impact the therapist workflow and clinical utility.

- [x] **#22 — No visibility into patient exercise submissions** — Added `metadata` field to step_progress_json in both controllers. Frontend SubmissionSummary component shows quiz scores, self-modeling ratings, and pause sessions inline with each step. ✅
- [x] **#23 — No practice history for therapists** — Exposed metadata JSONB via API and added TypeScript types. Therapists now see submission badges (quiz score, ratings, session counts) in StepRow. ✅
- [x] **#24 — Acknowledgment queue can overwhelm therapists** — Added queue counter ("1 of 3 achievements") and "Dismiss all" button to AcknowledgmentOverlay for stacked acknowledgments. **Files:** `AcknowledgmentOverlay.tsx`, `TherapyJourneyPage.tsx`
- [x] **#25 — Notes modal lacks context** — Added step progress context panel (status badge, attempt count, practice time, started/completed dates) above the textarea in NotesModal. ✅
- [x] **#21 — Mobile button density in therapist view** — Secondary actions (Notes, Exercises) hidden on mobile; primary actions (Complete/Skip/Reopen) always visible. Button labels use `lg:inline` breakpoint. ✅
- [x] **#26 — No bulk operations** — Added select mode toggle to MilestoneSection with checkboxes on each StepRow. Batch action bar shows "Complete" and "Skip" buttons for selected steps. Select all/deselect all supported. **File:** `app-frontend/src/components/patients/TherapistLearningPathView.tsx`

### Batch 3: High Priority — Patient Experience

- [x] **#3 — Step "0 of 0" display for future milestones** — Verified: MilestoneCard already has fallback to `milestone.steps_count` when `stepProgresses.length === 0`. All step progresses created upfront. No fix needed. ✅
- [x] **#10 — Generic fallback navigation** — Replaced `/practice` navigation with in-page content showing step instructions and a "Log Practice Attempt" button. ✅
- [x] **#2 — Missing welcome back message personalization** — Added current step title and last practice date to WelcomeBackBanner for personalized context. ✅
- [x] **#14 — AcknowledgmentOverlay has no auto-dismiss** — Added 5-second auto-dismiss timer for step-type acknowledgments. Milestones/journey remain manual. Respects prefers-reduced-motion. ✅

### Batch 4: Medium Priority — Exercise Component Consistency

- [x] **#31 — Inconsistent color palettes across exercises** — Verified: intentional design — 5 exercises use primary navy (Quiz, Journal, Reflection, Identification, Holding), 5 use distinct therapeutic accent colors (violet, emerald, orange, sky, amber) for visual identity per exercise type. No change needed. **Files:** All exercise components
- [x] **#32 — Inconsistent "Try Again" patterns** — Verified: all exercises already use consistent `Button variant="secondary"` + `deleteRecording` pattern. Minor icon differences acceptable per exercise context. **Files:** All exercise components
- [x] **#33 — Varied loading and error states** — Verified: all exercises already use consistent `LoadingSpinner size="sm"` + `isSubmitting` prop pattern in submit buttons. **Files:** All exercise components
- [x] **#34 — Native audio/video player inconsistency** — Verified: native `<audio>` elements all use consistent styling (`w-full max-w-md`). Plyr is used for video (appropriate for different media type — fullscreen, play-large). No change needed. **Files:** Recording exercise components
- [x] **#35 — Missing MediaErrorAlert in 4 exercises** — Added MediaErrorAlert with categorized DOMException handling (permission_denied, no_device, generic) to ReflectionExercise (camera), GeneralisationExercise (conditional camera/microphone), SelfDisclosureExercise, and MotorControlExercise. ✅
- [x] **#36 — No recording time limits** — Added 5-minute auto-stop to PauseExercise with amber color warning at 4:30. ReflectionExercise already had maxVideoDuration. Other exercises still need limits (partial fix). **Files:** `app-frontend/src/components/exercises/PauseExercise.tsx`
- [x] **#37 — No recording size/duration warning** — PauseExercise now shows max duration indicator when approaching limit. ReflectionExercise already shows time/max. **Files:** `app-frontend/src/components/exercises/PauseExercise.tsx`

### Batch 5: Medium Priority — Patient Journey Polish

- [x] **#4 — CurrentStepPanel lacks exercise preview** — Added exercise type badge to CurrentStepPanel showing the exercise type (quiz, recording, etc.) next to milestone label. **File:** `app-frontend/src/pages/TherapyJourneyPage.tsx`
- [x] **#5 — NextStepPreview shows too little** — Added "Coming up next" teaser below CurrentStepPanel showing the next locked step's number and title. Uses `step_progresses` to find the next step after current. **File:** `app-frontend/src/pages/TherapyJourneyPage.tsx`
- [x] **#6 — No progress indicator within exercises** — Added exercise count indicator ("3 exercises") to the exercise list heading in StepDetailPage. **File:** `app-frontend/src/pages/StepDetailPage.tsx`
- [x] **#7 — Milestone completion celebration is identical** — Differentiated celebrations: steps get CheckIcon/emerald (h-16), milestones get StarIcon/deep navy (h-20), journey gets TrophyIcon/warm gold (h-24). Progressively more significant. **File:** `app-frontend/src/components/learning-path/AcknowledgmentOverlay.tsx`
- [x] **#8 — No session summary after practice** — Added session tracking with submission count and elapsed time. Banner shows "This session: N exercise(s) completed · X min" after submissions. **File:** `app-frontend/src/pages/StepDetailPage.tsx`
- [x] **#9 — Journey completion has no special treatment** — Journey completion now uses TrophyIcon with warm amber/gold gradient and largest icon size (h-24 w-24), distinct from steps and milestones. **Files:** `app-frontend/src/components/learning-path/AcknowledgmentOverlay.tsx`

### Batch 6: Medium Priority — Therapist Tools

- [x] **#27 — ExerciseCustomizationModal has no "Reset to defaults"** — Added "Reset to Defaults" button in modal footer that sends nil values to clear custom_title/custom_instructions/custom_video_url, reverting to template defaults. ✅
- [x] **#28 — No video URL validation beyond browser native** — Added URL validation checking for known video providers (YouTube, Vimeo, Loom) and video file extensions (.mp4, .webm). Shows warning for unrecognized URLs. **File:** `app-frontend/src/components/learning-path/ExerciseCustomizationModal.tsx`
- [x] **#29 — StatusModal (pause/resume/complete) lacks impact preview** — Added explanatory text below each action button describing the impact on the patient's experience. ✅

### Batch 7: Accessibility Issues

- [x] **#44 — Keyboard trap in IdentificationExercise timeline** — Added 'M' keyboard shortcut to open the Mark Moment dropdown, with kbd hint displayed next to time. Menu already supports arrow key navigation. **File:** `app-frontend/src/components/exercises/IdentificationExercise.tsx`
- [x] **#45 — Star rating in SelfModelingExercise lacks visible focus** — Added explicit amber focus ring with ring-offset to star buttons. Also added video progress fallback (#41). **File:** `app-frontend/src/components/exercises/SelfModelingExercise.tsx`
- [x] **#46 — Waveform visualizer in HoldingExercise is visual-only** — Added target zone status to aria-live screen reader announcement ("In target zone" / "Outside target zone"). Component already had accessibility mode and amplitude announcement. **File:** `app-frontend/src/components/exercises/WaveformVisualizer.tsx`
- [x] **#47 — Space key conflict in PauseExercise** — Added target check to skip space capture when an interactive element (button, input, etc.) has focus. **File:** `app-frontend/src/components/exercises/PauseExercise.tsx`
- [x] **#48 — AcknowledgmentOverlay contrast on gradient background** — Increased text opacity from 55-70% to 70-90% across heading, subtitle, encouragement, and hint text for WCAG AA compliance. **File:** `app-frontend/src/components/learning-path/AcknowledgmentOverlay.tsx`

### Batch 8: Exercise-Specific UX Issues

- [x] **#40 — No quiz review mode** — Added question-by-question review section to results screen showing correct/incorrect status with explanations for wrong answers. **File:** `app-frontend/src/components/exercises/QuizExercise.tsx`
- [x] **#41 — SelfModelingExercise video completion detection** — Added timeupdate fallback that considers video watched at >=90% progress. **File:** `app-frontend/src/components/exercises/SelfModelingExercise.tsx`
- [x] **#42 — IdentificationExercise timeline markers overlap** — Added vertical offset calculation for markers within 5% of each other, alternating above/below center. **File:** `app-frontend/src/components/exercises/IdentificationExercise.tsx`
- [x] **#43 — No undo for IdentificationExercise marker placement** — Added double-click to remove on timeline markers with tooltip hint. List view already had delete buttons. **File:** `app-frontend/src/components/exercises/IdentificationExercise.tsx`

### Batch 9: Questionnaire & Interaction Polish

- [x] **#18 — QuestionnaireModal slider defaults to minimum** — Changed default from minimum to midpoint (Math.round((min+max)/2)) to avoid biasing responses. **File:** `app-frontend/src/components/learning-path/QuestionnaireModal.tsx`
- [x] **#19 — QuestionnaireModal state resets on close** — Added inline confirmation UI (replaced native `window.confirm`) when closing with unsaved answers. Shows "Discard & Close" / "Keep Going" buttons. **File:** `app-frontend/src/components/learning-path/QuestionnaireModal.tsx`
- [x] **#15 — AcknowledgmentOverlay gradient contrast** — Fixed with #48 — increased opacity across all text elements. **File:** `app-frontend/src/components/learning-path/AcknowledgmentOverlay.tsx`

### Batch 10: Flow & Information Architecture

- [x] **#49 — No breadcrumb navigation in step detail** — Replaced back link with semantic breadcrumb nav (Journey > Milestone X > Step X.Y). Added `milestone_number` and `milestone_title` to backend step_summary. **Files:** `StepDetailPage.tsx`, `step_progresses_controller.rb`, `learningPath.ts`
- [x] **#50 — TherapyJourneyPage scroll position lost** — Added sessionStorage-based scroll position save/restore when navigating to/from StepDetailPage. **File:** `app-frontend/src/pages/TherapyJourneyPage.tsx`
- [x] **#51 — No deep linking to specific milestones** — Added `id="milestone-{number}"` anchors with `scroll-mt-24` and hash-based scroll-on-mount. Navigate to `/journey#milestone-3` to jump directly. **File:** `app-frontend/src/pages/TherapyJourneyPage.tsx`
- [x] **#52 — Exercise completion state not persisted locally** — Added localStorage persistence of exercise submissions with timestamps. Shows "You last practiced this step on [date]" on return visits. **File:** `app-frontend/src/pages/StepDetailPage.tsx`

### Low Priority — Nice-to-Have Polish

- [x] **#11 — JournalExercise previous entries are read-only** — Added `therapistComment` and `therapistCommentAt` fields to `JournalEntry` type. History entries now display therapist annotations in a styled callout below the entry content. **File:** `app-frontend/src/components/exercises/JournalExercise.tsx`
- [x] **#12 — SelfDisclosureExercise scenario repetition** — Added Fisher-Yates shuffle to prompt order on each session so repeated practice sees prompts in different sequence. **File:** `app-frontend/src/components/exercises/SelfDisclosureExercise.tsx`
- [x] **#13 — GeneralisationExercise technique markers not reviewed** — Verified: already has technique summary badges with timestamps in recorded state (lines 492-505). **File:** `app-frontend/src/components/exercises/GeneralisationExercise.tsx`
- [ ] **#16 — Breathing circle in PauseExercise could sync with audio** — Deferred: requires WebAudio API AnalyserNode integration for real-time amplitude detection, too complex for a polish pass. CSS-driven breathing animation works well as-is. **File:** `app-frontend/src/components/exercises/PauseExercise.tsx`
- [x] **#17 — MotorControlExercise force markers lack timeline view** — Verified: already has marker summary badges with type and timestamp in recorded state (lines 458-485). **File:** `app-frontend/src/components/exercises/MotorControlExercise.tsx`

### Priority Summary

| Priority          | Count  | Description                                                           |
| ----------------- | ------ | --------------------------------------------------------------------- |
| Critical          | 4      | Data loss, functional bugs (#38, #20, #1, #39)                        |
| High              | 10     | Major UX gaps for therapists (#22-26) and patients (#3, #10, #2, #14) |
| Medium            | 19     | Consistency (#31-37), polish (#4-9), therapist tools (#27-29)         |
| Accessibility     | 5      | Keyboard, contrast, screen reader (#44-48)                            |
| Exercise-specific | 4      | Quiz, video, timeline UX (#40-43)                                     |
| Interaction       | 3      | Questionnaire, overlay polish (#18, #19, #15)                         |
| Flow/IA           | 4      | Navigation, scroll, deep linking (#49-52)                             |
| Low               | 5      | Nice-to-have enhancements (#11-13, #16-17)                            |
| **Total**         | **52** |                                                                       |

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

All learning path implementation phases (1-9) completed between Jan 30 — Feb 2, 2026:

- **Phase 1-2**: Backend Foundation & Advanced (models, migrations, APIs, seed data, tests)
- **Phase 3-4**: Frontend Foundation & Advanced (pages, hooks, therapist dashboard, permissions, translations, acknowledgments, questionnaire, design polish)
- **Phase 5-8**: Specialized Exercises for Milestones 1-8 (quiz, identification, reflection, waveform, timer, holding, motor control, self-modeling, pause, journal, self-disclosure, generalisation)
- **Phase 9**: Polish & Testing (animations, loading states, error handling, accessibility, documentation)
- **Therapist-Controlled Progression Fix** (2026-02-02): Patients cannot self-complete steps

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
