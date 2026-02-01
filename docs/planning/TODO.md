# UpSpeech TODO

**Last Updated:** 2026-02-01
**Current Focus:** Learning Path / Therapy Journey Implementation

---

## Current Priority: Learning Path (Therapy Journey)

**Documentation:**

- [Technical Plan](../../../local-docs/LearningPath/TECHNICAL_PLAN.md) - Complete implementation specification
- [Core Principles](../../../local-docs/LearningPath/Learning%20Path%20-%20Core%20principal%202f562b3431858096ad2bd996a94069f6.md) - Therapeutic sequence and milestone definitions
- [Q&A](../../../local-docs/LearningPath/Q&A.md) - Requirements clarifications

---

## CRITICAL: Therapist-Controlled Progression Fix

**Issue:** Current implementation incorrectly allows patients to self-complete steps.
**Correct Behavior:** Patients stay on their current step until the therapist advances them.

### Backend Changes

- [ ] **Remove patient step completion** - Update `can_complete_step?` in `StepProgressesController` to only allow therapists/admins/owners
- [ ] **Update API response** - Ensure completion endpoint returns 403 Forbidden for patients
- [ ] **Update tests** - Add/update controller specs to verify patients cannot complete steps
- [ ] **Track pending completions** - Consider adding patient "ready for review" flag (optional UX enhancement)

### Frontend Changes (requires design audit + critique)

- [ ] **Remove "Complete Step" button** from `StepDetailPage.tsx` for patient view
- [ ] **Remove `CompletionModal`** component or restrict to therapist view
- [ ] **Add encouraging "Keep Practicing" section** - Focus on value of practice, not progression (e.g., "Practice builds confidence. Take your time with this step.")
- [ ] **Update acknowledgment flow** - Show step completions on next login (therapist-triggered)
- [ ] **Update translations** - Add new i18n keys for practice-focused messaging (avoid "next step" language)
- [ ] **Design audit** - Run `/audit` on StepDetailPage for accessibility after changes
- [ ] **Design critique** - Run `/critique` to ensure the patient experience is encouraging, not blocking

### Design Polish (after implementation)

- [ ] Run `/quieter` - Ensure messaging is calm and supportive
- [ ] Run `/delight` - Add encouraging micro-interactions for practice completion
- [ ] Run `/harden` - Handle edge cases (long waits, multiple practice sessions)

---

**Design Commands by Phase:** ✅ COMPLETE (2026-02-01)
| Phase | Commands | Status |
|-------|----------|--------|
| Patient Journey UI | `/quieter`, `/simplify`, `/onboard` | ✅ |
| Milestone Acknowledgment | `/quieter`, `/delight` | ✅ |
| Waveform/Timer | `/animate`, `/harden` | ✅ |
| Therapist Dashboard | `/normalize` | ✅ |
| Accessibility Pass | `/audit`, `/harden` | ✅ |
| Final Polish | `/critique`, `/simplify`, `/design-polish` | ✅ |

---

## Phase 1: Backend Foundation ✅ COMPLETE

### Database Migrations

- [x] Create `milestones` table
- [x] Create `milestone_steps` table
- [x] Create `step_exercise_templates` table
- [x] Create `patient_learning_paths` table
- [x] Create `patient_step_progresses` table
- [x] Create `patient_step_exercises` table
- [x] Create `milestone_questionnaires` table
- [x] Add `patient_step_progress_id` to `audio_recordings`

### Models

- [x] `Milestone` model with validations, scopes, methods
- [x] `MilestoneStep` model with validations, scopes, methods
- [x] `StepExerciseTemplate` model
- [x] `PatientLearningPath` model with progression logic + `welcome_back_message`
- [x] `PatientStepProgress` model with complete/skip logic
- [x] `PatientStepExercise` model
- [x] `MilestoneQuestionnaire` model

### Seed Data

- [x] Seed all 8 milestones with steps and `narrative_key`
- [x] Seed default exercise templates for each step
- [x] Create i18n keys for all titles/descriptions/narratives
- [x] Create welcome back message translations

### Basic APIs

- [x] `MilestonesController` (index, show)
- [x] `MilestoneStepsController` (index, show)
- [x] `LearningPathsController` (show, create, update)
- [x] `StepProgressesController` (show, complete, skip, move_back)

### Tests

- [x] Model specs for all new models (2026-02-01) - 93 model tests passing
- [x] Controller specs for all endpoints (2026-02-01) - 43 controller tests passing
- [x] Integration tests for progression logic (2026-02-01) - 26 integration tests

---

## Phase 2: Backend Advanced ✅ COMPLETE

### Therapist APIs

- [x] Therapist dashboard endpoint (all patients' learning paths)
- [x] Patient detail endpoint
- [x] Exercise customization endpoint (2026-01-30)
- [x] Therapist notes endpoint (reuse existing)

### Patient APIs

- [x] Record attempt endpoint
- [x] Questionnaire submission endpoint (frontend + backend complete 2026-01-30)
- [x] Acknowledgments endpoint

### Integration with Existing

- [x] Link recordings to step progress (2026-01-31)
- [x] Link scenario sessions to step progress (2026-01-31)
- [x] Update progress tracking to include learning path data (2026-01-31)
- [x] Integrate with Practice Library (2026-01-30)

### Quiz Content

- [x] Create quiz questions for Milestone 1 (hardcoded, backend-modifiable) (2026-01-31)
- [x] Quiz validation and scoring logic (2026-01-31)

### Tests

- [x] Full API integration tests (2026-02-01) - Complete journey flows for patient/therapist
- [x] Edge cases (skipping, moving back, etc.) (2026-02-01) - Skip, reopen, quiz, self-modeling tests
- [x] Multi-tenancy tests (2026-02-01) - Data isolation verification

---

## Phase 3: Frontend Foundation ✅ COMPLETE

**Design Commands:** `/quieter`, `/simplify`, `/onboard`

### API Client

- [x] Add learning path endpoints to `api.ts`
- [x] Add TypeScript types for all responses (`src/types/learningPath.ts`)

### Hooks

- [x] `useLearningPath` hook
- [x] `useStepProgress` hook
- [x] `usePatientLearningPath` hook (therapist management)
- [x] `useMilestones` hook

### Patient Journey Page

- [x] Basic page structure (`/journey` route)
- [x] `JourneyTimeline` component (vertical visualization)
- [x] `MilestoneCard` component (expanded/collapsed states)
- [x] `CurrentStepPanel` component
- [x] `WelcomeBackBanner` component
- [x] Navigation to exercise/practice
- [x] `NextStepPreview` component

### Step Detail Page

- [x] Basic page structure (`/journey/step/:stepProgressId` route)
- [x] Step instructions display
- [x] Exercise list
- [x] Practice stats (attempts, time)
- [x] Completion modal
- [x] AcknowledgmentOverlay integration

### Integration with Practice

- [x] Link from journey to practice page (via StepDetailPage)
- [x] Pass step context to recording (navigation state)
- [x] Return to journey after practice (JourneyContextBanner)
- [x] Show journey exercises in Practice Library (2026-01-30)

### Tests

- [ ] Component tests for all new components
- [ ] Page tests for journey page
- [ ] Integration tests for navigation flow

---

## Phase 4: Frontend Advanced ✅ COMPLETE

**Design Commands:** `/normalize` (dashboard), `/quieter`, `/delight` (acknowledgments)

### Therapist Dashboard

- [x] `TherapistLearningDashboard` page (`/dashboard/learning-paths`)
- [x] Patient list with progress indicators
- [x] Stats cards (total, with paths, active, needs attention)
- [x] Filters (by progress, activity, search)

### Patient Detail View

- [x] `PatientLearningDetailPage` (`/dashboard/patients/:patientId/learning-path`)
- [x] Step management (complete, skip, reopen)
- [x] Pause/resume/complete status management
- [x] Exercise customization modal (2026-01-30)
- [x] Therapist notes (2026-01-31)

### Navigation

- [x] "My Journey" nav item for patients
- [x] "Learning Paths" nav item for therapists
- [x] Route integration in App.tsx

### Permissions & Route Protection ✅ COMPLETE (2026-02-01)

- [x] Patient routes (`/journey`, `/journey/step/:id`) protected with `requiredRole={["client", "member"]}`
- [x] Therapist routes (`/dashboard/learning-paths`) protected with `requiredPermission="can_manage_clients"`
- [x] Backend API enforces role-based access on all endpoints
- [x] Navigation items gated by user permissions

### Translations

- [x] English translations for learning_path namespace
- [x] Portuguese translations
- [x] Spanish translations

### Acknowledgments

- [x] `AcknowledgmentOverlay` component (calm, not confetti)
- [x] Gentle glow/color shift animation
- [x] Warm congratulatory message
- [x] Integration with login flow (2026-01-31)

### Questionnaire

- [x] `SliderInput` component (SurveyMonkey-style)
- [x] `QuestionnaireModal` component
- [x] Integration with milestone completion (TherapyJourneyPage)

### Design Polish ✅ COMPLETE (2026-02-01)

Design commands executed: `/critique`, `/simplify`, `/quieter`, `/bolder`, `/delight`, `/audit`, `/harden`, `/design-polish`

- [x] TherapyJourneyPage simplified (removed nested cards, cleaner timeline)
- [x] AcknowledgmentOverlay redesigned (full-screen, auto-dismiss, tap-anywhere)
- [x] SliderInput changed to button group (better touch targets)
- [x] Focus indicators added to all interactive elements
- [x] Progress bars have ARIA attributes
- [x] Completed steps have checkmark indicator (not color-only)
- [x] Dark mode contrast fixed
- [x] SparklesIcon replaced with BookOpenIcon in JourneyContextBanner
- [x] QuestionnaireModal uses Textarea component (removed raw element)
- [x] NextStepPreview uses Button component (removed raw element)
- [x] AcknowledgmentOverlay pauses auto-dismiss on hover/focus (accessibility)
- [x] StepDetailPage simplified - removed Card wrappers, flatter layout (2026-02-01)
- [x] ExerciseCard replaced with lightweight ExerciseItem (2026-02-01)
- [x] Stats changed from dashboard grid to inline text (2026-02-01)
- [x] Complete Step section moved to bottom with responsive layout (2026-02-01)
- [x] Empty state and completed journey copy refined for warmth (2026-02-01)
- [x] Motion-reduce support added to all progress bar animations (2026-02-01)
- [x] ARIA live regions added for loading state announcements (2026-02-01)
- [x] Code cleanup and clarifying comments (2026-02-01)

### Tests

- [ ] Component tests
- [ ] Page tests
- [ ] E2E tests for therapist flows

---

## Phase 5: Specialized Exercises - Milestone 1-2 (Week 5-6)

### Quiz Component ✅ COMPLETE (2026-01-31)

- [x] `QuizExercise` component (warm, encouraging - never cold)
- [x] Question types: true/false, multiple choice
- [x] Progress tracking
- [x] Encouraging results display

### Identification Exercises

- [x] Video review with annotation (reuse PlyrVideo) (2026-01-31)
- [x] Classification interface (short/long, soft/tense) (2026-01-31)
- [x] Moment marking on timeline (2026-01-31)
- [x] Intensity rating (1-5 scale) (2026-01-31)

### Reflection Exercises

- [x] Video recording for explanation (2026-01-31)
- [x] Text entry for reflections (2026-01-31)

### Tests

- [ ] Component tests for quiz
- [ ] Integration tests for identification

---

## Phase 6: Specialized Exercises - Milestone 3-4 (Week 6-7)

**Design Commands:** `/animate` (therapeutic intent), `/harden`

### Waveform Visualizer

- [x] Real-time audio analysis (Web Audio API) (2026-01-31)
- [x] Visual waveform display with calming aesthetic (2026-01-31)
- [x] Target zone visualization for smooth exit (2026-01-31)
- [x] Pace guidance feedback ("too fast", "good pace") (2026-01-31)
- [x] Non-visual alternative (audio level numbers for accessibility) (2026-01-31)

### Timer Component

- [x] Configurable duration (therapist sets) (2026-01-31)
- [x] Visual progress (count UP, not countdown) (2026-01-31)
- [x] Start/stop/pause controls (patient controlled) (2026-01-31)
- [x] Haptic feedback option (2026-01-31)
- [x] Spoken time option for accessibility (2026-01-31)

### Holding Exercise

- [x] Integration of timer + waveform (2026-01-31)
- [x] Exit speed levels (very slow, medium, natural) (2026-01-31)
- [x] Smooth exit visualization (waveform integrated) (2026-01-31)

### Live Marker Button

- [x] Large touch target (minimum 44px, prefer 64px) (2026-01-31)
- [x] Keyboard shortcut (spacebar or M key) (2026-01-31)
- [x] Timestamp capture (2026-01-31)
- [x] Visual + haptic confirmation feedback (2026-01-31)

### Motor Control Exercise

- [x] Force/no-force marking during live recording (2026-01-31)
- [x] Integration with live marker (2026-01-31)

### Tests

- [ ] Component tests for waveform, timer
- [ ] Integration tests for exercises
- [ ] Accessibility tests

---

## Phase 7: Specialized Exercises - Milestone 5-6 (Week 7-8)

### Self-Modeling

- [x] `SelfModelingExercise` component with video review (2026-01-31)
- [x] Multi-dimensional rating (fluency, confidence, technique, overall) (2026-01-31)
- [x] Star rating UI (1-5 scale) (2026-01-31)
- [x] Link to step progress (backend integration) (2026-02-01) - Already complete via `submit_self_modeling` endpoint

### Pause Exercises

- [x] Visual signal for guided pauses (calming, not jarring) (2026-01-31)
- [x] Levels (very long, medium, short) (2026-01-31)
- [x] Pause submission endpoint for guided/autonomous modes (2026-02-01) - `submit_pauses` API endpoint added

### Journal Component

- [x] `JournalExercise` component (2026-01-31)
- [x] Guided prompts ("How did I feel?", "What went well?") (2026-01-31)
- [x] Rich writing experience (emotional touchpoint) (2026-01-31)
- [x] History view (2026-01-31)

### Tests

- [ ] Integration tests for all exercise types

---

## Phase 8: Specialized Exercises - Milestone 7-8 (Week 8-9)

### Self-Disclosure Scenarios

- [x] Scenario templates per type (phone, ordering, introduction, work meeting) (2026-01-31)
- [x] "I stutter" prompts with confidence (2026-01-31)
- [x] Integration with existing scenario system (2026-02-01) - ScenarioSession linked via `patient_step_progress_id`

### Generalisation

- [x] Scenario with technique identification (2026-01-31)
- [x] Final scenario step (2026-01-31)

### Tests

- [ ] E2E tests for complete learning path

---

## Phase 9: Polish & Testing (Week 9-10)

**Design Commands:** `/audit`, `/harden`, `/critique`, `/polish` ✅ COMPLETE (2026-02-01)

### Polish

- [x] Animations and transitions (ease-out-soft curves) (2026-01-31)
- [x] Loading states with ARIA live regions (2026-02-01)
- [x] Error handling (helpful, non-blaming) (2026-01-31)
- [x] Empty states refined with warmer copy (2026-02-01)

### Accessibility

- [x] Keyboard navigation for dropdown menus (IdentificationExercise) (2026-01-31)
- [x] Screen reader support with ARIA live regions (2026-01-31)
- [x] Focus management for dropdowns (2026-01-31)
- [x] Non-visual alternatives for waveform/timer (already implemented)
- [ ] Cognitive load review
- [x] Star rating ARIA roles (SelfModelingExercise) (2026-01-31)
- [x] Progress bar ARIA (PauseExercise) (2026-01-31)
- [x] Touch targets ≥44px (SelfModelingExercise) (2026-01-31)

### Testing

- [ ] Comprehensive E2E tests
- [ ] Performance testing
- [ ] Accessibility audit (`/audit`)

### Documentation ✅ COMPLETE (2026-02-01)

- [x] User guide for patients (`docs/guides/LEARNING_PATH_PATIENT_GUIDE.md`)
- [x] Admin guide for therapists (`docs/guides/LEARNING_PATH_THERAPIST_GUIDE.md`)
- [x] Technical documentation (`docs/architecture/LEARNING_PATH.md`)

---

## Post-MVP (Backlog)

### Learning Path Enhancements

- [ ] Speech rate calculation with visual feedback
- [ ] Email/push notifications for inactivity, completions, unlocks
- [ ] Learning path analytics for therapists
- [ ] Full translation of exercise content (multiple languages)

### Low Priority (From Design Audit)

- [ ] Consider migrating color system to OKLCH
- [ ] Implement semantic z-index tokens (`--z-sticky`, `--z-backdrop`, `--z-modal`, `--z-tooltip`)

---

## Key Design Decisions (Reference)

| Decision            | Resolution                                                                 |
| ------------------- | -------------------------------------------------------------------------- |
| Visual layout       | Vertical journey (journey upward)                                          |
| Locked indicators   | No locked badges, just "coming next" preview                               |
| Celebration style   | Calm acknowledgment, no confetti                                           |
| Return messaging    | Welcome back, no guilt                                                     |
| **Step completion** | **THERAPIST ONLY** - Patient practices unlimited times until therapist advances |
| Timer direction     | Counts UP (not down) to reduce pressure                                    |
| Questionnaire UI    | Sliders, SurveyMonkey-style                                                |
| Patient view        | No "Complete Step" button - show encouraging "Keep Practicing" instead     |

---

## Related Documentation

- [TECHNICAL_PLAN.md](../../../local-docs/LearningPath/TECHNICAL_PLAN.md) - Complete Learning Path specification
- [Q&A.md](../../../local-docs/LearningPath/Q&A.md) - Requirements clarifications
- [TESTING_STRATEGY.md](../architecture/TESTING_STRATEGY.md) - Test coverage goals
