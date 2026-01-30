# UpSpeech TODO

**Last Updated:** 2026-01-30
**Current Focus:** Learning Path / Therapy Journey Implementation

---

## Current Priority: Learning Path (Therapy Journey)

**Documentation:**

- [Technical Plan](../../../local-docs/LearningPath/TECHNICAL_PLAN.md) - Complete implementation specification
- [Core Principles](../../../local-docs/LearningPath/Learning%20Path%20-%20Core%20principal%202f562b3431858096ad2bd996a94069f6.md) - Therapeutic sequence and milestone definitions
- [Q&A](../../../local-docs/LearningPath/Q&A.md) - Requirements clarifications

**Design Commands by Phase:**
| Phase | Commands |
|-------|----------|
| Patient Journey UI | `/quieter`, `/simplify`, `/onboard` |
| Milestone Acknowledgment | `/quieter`, `/delight` |
| Waveform/Timer | `/animate`, `/harden` |
| Therapist Dashboard | `/normalize` |
| Accessibility Pass | `/audit`, `/harden` |
| Final Polish | `/critique`, `/polish` |

---

## Phase 1: Backend Foundation (Week 1-2)

### Database Migrations

- [ ] Create `milestones` table
- [ ] Create `milestone_steps` table
- [ ] Create `step_exercise_templates` table
- [ ] Create `patient_learning_paths` table
- [ ] Create `patient_step_progresses` table
- [ ] Create `patient_step_exercises` table
- [ ] Create `milestone_questionnaires` table
- [ ] Add `patient_step_progress_id` to `audio_recordings`

### Models

- [ ] `Milestone` model with validations, scopes, methods
- [ ] `MilestoneStep` model with validations, scopes, methods
- [ ] `StepExerciseTemplate` model
- [ ] `PatientLearningPath` model with progression logic + `welcome_back_message`
- [ ] `PatientStepProgress` model with complete/skip logic
- [ ] `PatientStepExercise` model
- [ ] `MilestoneQuestionnaire` model

### Seed Data

- [ ] Seed all 8 milestones with steps and `narrative_key`
- [ ] Seed default exercise templates for each step
- [ ] Create i18n keys for all titles/descriptions/narratives
- [ ] Create welcome back message translations

### Basic APIs

- [ ] `MilestonesController` (index, show)
- [ ] `MilestoneStepsController` (index, show)
- [ ] `LearningPathsController` (show, create, update)
- [ ] `StepProgressesController` (show, complete, skip, move_back)

### Tests

- [ ] Model specs for all new models
- [ ] Controller specs for all endpoints
- [ ] Integration tests for progression logic

---

## Phase 2: Backend Advanced (Week 2-3)

### Therapist APIs

- [ ] Therapist dashboard endpoint (all patients' learning paths)
- [ ] Patient detail endpoint
- [ ] Exercise customization endpoint
- [ ] Therapist notes endpoint (reuse existing)

### Patient APIs

- [ ] Record attempt endpoint
- [ ] Questionnaire submission endpoint
- [ ] Acknowledgments endpoint

### Integration with Existing

- [ ] Link recordings to step progress
- [ ] Link scenario sessions to step progress
- [ ] Update progress tracking to include learning path data
- [ ] Integrate with Practice Library

### Quiz Content

- [ ] Create quiz questions for Milestone 1 (hardcoded, backend-modifiable)
- [ ] Quiz validation and scoring logic

### Tests

- [ ] Full API integration tests
- [ ] Edge cases (skipping, moving back, etc.)
- [ ] Multi-tenancy tests

---

## Phase 3: Frontend Foundation (Week 3-4)

**Design Commands:** `/quieter`, `/simplify`, `/onboard`

### API Client

- [ ] Add learning path endpoints to `api.ts`
- [ ] Add TypeScript types for all responses

### Hooks

- [ ] `useLearningPath` hook
- [ ] `useStepProgress` hook
- [ ] `useAcknowledgments` hook

### Patient Journey Page

- [ ] Basic page structure (`/journey` route)
- [ ] `JourneyTimeline` component (vertical visualization)
- [ ] `MilestoneCard` component (expanded/collapsed states)
- [ ] `CurrentStepPanel` component
- [ ] `NextStepPreview` component
- [ ] `WelcomeBackBanner` component
- [ ] Navigation to exercise/practice

### Integration with Practice

- [ ] Link from journey to practice page
- [ ] Pass step context to recording
- [ ] Return to journey after practice
- [ ] Show journey exercises in Practice Library

### Tests

- [ ] Component tests for all new components
- [ ] Page tests for journey page
- [ ] Integration tests for navigation flow

---

## Phase 4: Frontend Advanced (Week 4-5)

**Design Commands:** `/normalize` (dashboard), `/quieter`, `/delight` (acknowledgments)

### Therapist Dashboard

- [ ] `TherapistLearningDashboard` page
- [ ] Patient list with progress indicators
- [ ] Filters (by progress, activity, etc.)

### Patient Detail View

- [ ] `PatientLearningDetailPage`
- [ ] Step management (complete, skip, move back)
- [ ] Exercise customization modal
- [ ] Therapist notes (reuse existing)

### Acknowledgments

- [ ] `AcknowledgmentOverlay` component (calm, not confetti)
- [ ] Gentle glow/color shift animation
- [ ] Warm congratulatory message
- [ ] Integration with login flow

### Questionnaire

- [ ] `SliderInput` component (SurveyMonkey-style)
- [ ] `QuestionnaireModal` component
- [ ] Integration with milestone completion

### Tests

- [ ] Component tests
- [ ] Page tests
- [ ] E2E tests for therapist flows

---

## Phase 5: Specialized Exercises - Milestone 1-2 (Week 5-6)

### Quiz Component

- [ ] `QuizExercise` component (warm, encouraging - never cold)
- [ ] Question types: true/false, multiple choice
- [ ] Progress tracking
- [ ] Encouraging results display

### Identification Exercises

- [ ] Video review with annotation (reuse PlyrVideo)
- [ ] Classification interface (short/long, soft/tense)
- [ ] Moment marking on timeline
- [ ] Intensity rating (1-5 scale)

### Reflection Exercises

- [ ] Video recording for explanation
- [ ] Text entry for reflections

### Tests

- [ ] Component tests for quiz
- [ ] Integration tests for identification

---

## Phase 6: Specialized Exercises - Milestone 3-4 (Week 6-7)

**Design Commands:** `/animate` (therapeutic intent), `/harden`

### Waveform Visualizer

- [ ] Real-time audio analysis (Web Audio API)
- [ ] Visual waveform display with calming aesthetic
- [ ] Target zone visualization for smooth exit
- [ ] Pace guidance feedback ("too fast", "good pace")
- [ ] Non-visual alternative (audio level numbers for accessibility)

### Timer Component

- [ ] Configurable duration (therapist sets)
- [ ] Visual progress (count UP, not countdown)
- [ ] Start/stop/pause controls (patient controlled)
- [ ] Haptic feedback option
- [ ] Spoken time option for accessibility

### Holding Exercise

- [ ] Integration of timer + waveform
- [ ] Exit speed levels (very slow, medium, natural)
- [ ] Smooth exit visualization

### Live Marker Button

- [ ] Large touch target (minimum 44px, prefer 64px)
- [ ] Keyboard shortcut (spacebar or M key)
- [ ] Timestamp capture
- [ ] Visual + haptic confirmation feedback

### Motor Control Exercise

- [ ] Force/no-force marking during live recording
- [ ] Integration with live marker

### Tests

- [ ] Component tests for waveform, timer
- [ ] Integration tests for exercises
- [ ] Accessibility tests

---

## Phase 7: Specialized Exercises - Milestone 5-6 (Week 7-8)

### Self-Modeling

- [ ] Integrate existing video annotation
- [ ] Add intensity/difficulty rating (1-5 scale)
- [ ] Link to step progress

### Pause Exercises

- [ ] Visual signal for guided pauses (calming, not jarring)
- [ ] Levels (very long, medium, short)
- [ ] Autonomous pause identification

### Journal Component

- [ ] `JournalExercise` component
- [ ] Guided prompts ("How did I feel?", "What went well?")
- [ ] Rich writing experience (emotional touchpoint)
- [ ] History view

### Tests

- [ ] Integration tests for all exercise types

---

## Phase 8: Specialized Exercises - Milestone 7-8 (Week 8-9)

### Self-Disclosure Scenarios

- [ ] Scenario templates per type (phone, ordering, introduction, work meeting)
- [ ] "I stutter" prompts with confidence
- [ ] Integration with existing scenario system

### Generalisation

- [ ] Scenario with technique identification
- [ ] Final scenario step

### Tests

- [ ] E2E tests for complete learning path

---

## Phase 9: Polish & Testing (Week 9-10)

**Design Commands:** `/audit`, `/harden`, `/critique`, `/polish`

### Polish

- [ ] Animations and transitions (ease-out-soft curves)
- [ ] Loading states (breathing/pulsing, calming)
- [ ] Error handling (helpful, non-blaming)
- [ ] Empty states (guide toward action)

### Accessibility

- [ ] Keyboard navigation for journey timeline
- [ ] Screen reader support with ARIA live regions
- [ ] Focus management
- [ ] Non-visual alternatives for waveform/timer
- [ ] Cognitive load review

### Testing

- [ ] Comprehensive E2E tests
- [ ] Performance testing
- [ ] Accessibility audit (`/audit`)

### Documentation

- [ ] User guide for patients
- [ ] Admin guide for therapists
- [ ] Technical documentation

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

| Decision          | Resolution                                       |
| ----------------- | ------------------------------------------------ |
| Visual layout     | Vertical journey (journey upward)                |
| Locked indicators | No locked badges, just "coming next" preview     |
| Celebration style | Calm acknowledgment, no confetti                 |
| Return messaging  | Welcome back, no guilt                           |
| Step completion   | Patient continues until therapist marks complete |
| Timer direction   | Counts UP (not down) to reduce pressure          |
| Questionnaire UI  | Sliders, SurveyMonkey-style                      |

---

## Related Documentation

- [TECHNICAL_PLAN.md](../../../local-docs/LearningPath/TECHNICAL_PLAN.md) - Complete Learning Path specification
- [Q&A.md](../../../local-docs/LearningPath/Q&A.md) - Requirements clarifications
- [TESTING_STRATEGY.md](../architecture/TESTING_STRATEGY.md) - Test coverage goals
