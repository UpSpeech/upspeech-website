# Learning Path - Technical Documentation

This document covers the technical architecture of the Learning Path system.

## Overview

The Learning Path is a structured therapy program that guides patients through 8 milestones with multiple steps per milestone. It supports various exercise types, progress tracking, and therapist customization.

## Database Schema

### Core Tables

```
milestones
├── id
├── tenant_id (optional - null for default milestones)
├── number (1-8)
├── slug (unique identifier)
├── title_key (i18n key)
├── description_key (i18n key)
├── narrative_key (i18n key - shown to patients)
└── position (for ordering)

milestone_steps
├── id
├── milestone_id
├── number (step number within milestone)
├── slug (unique identifier)
├── title_key (i18n key)
├── description_key (i18n key)
├── instructions_key (i18n key)
├── exercise_type (standard, quiz, modeling, holding, scenario)
├── is_scenario (boolean - uses full scenario system)
├── default_config (JSON - exercise-specific config)
└── position (for ordering)

step_exercise_templates
├── id
├── milestone_step_id
├── title_key (i18n key)
├── instructions_key (i18n key)
├── video_url (optional reference video)
├── default_config (JSON - exercise defaults)
└── position (ordering within step)

patient_learning_paths
├── id
├── tenant_id
├── patient_id (user)
├── therapist_id (user, optional)
├── current_milestone_id
├── current_step_id
├── status (active, paused, completed)
├── started_at
├── completed_at
└── metadata (JSON - welcome messages, acknowledgments)

patient_step_progresses
├── id
├── patient_learning_path_id
├── milestone_step_id
├── status (pending, current, completed, skipped)
├── exercise_attempts (integer)
├── total_practice_time (integer, seconds)
├── unlocked_at
├── started_at
├── completed_at
├── completed_by_id (user who marked complete)
├── therapist_notes (text)
└── metadata (JSON - quiz results, self-modeling submissions, pause data)

patient_step_exercises
├── id
├── patient_step_progress_id
├── step_exercise_template_id
├── is_enabled (boolean - therapist can disable)
├── custom_instructions (override default)
├── custom_config (JSON - override defaults)
└── position (ordering)

milestone_questionnaires
├── id
├── patient_learning_path_id
├── milestone_id
├── responses (JSON - question/answer pairs)
└── submitted_at
```

### Relationships

```
PatientLearningPath
├── belongs_to :tenant
├── belongs_to :patient (User)
├── belongs_to :therapist (User, optional)
├── belongs_to :current_milestone (Milestone)
├── belongs_to :current_step (MilestoneStep)
├── has_many :patient_step_progresses
└── has_many :milestone_questionnaires

PatientStepProgress
├── belongs_to :patient_learning_path
├── belongs_to :milestone_step
├── belongs_to :completed_by (User, optional)
└── has_many :patient_step_exercises

ScenarioSession
└── belongs_to :patient_step_progress (optional)

AudioRecording
└── belongs_to :patient_step_progress (optional)
```

## API Endpoints

### Patient APIs

```
GET  /api/v1/my_learning_path
     Returns patient's learning path with progress

POST /api/v1/my_learning_path/acknowledge
     Acknowledge welcome back message or milestone completion

GET  /api/v1/step_progresses/:id
     Get step progress with exercises

POST /api/v1/step_progresses/:id/complete
     Mark step as complete

POST /api/v1/step_progresses/:id/record_attempt
     Increment attempt counter, optionally add practice time

POST /api/v1/step_progresses/:id/submit_quiz
     Submit quiz answers, returns score and results

POST /api/v1/step_progresses/:id/submit_self_modeling
     Submit self-evaluation ratings (fluency, confidence, technique, overall)

POST /api/v1/step_progresses/:id/submit_pauses
     Submit pause markers (guided or autonomous mode)

POST /api/v1/milestones/:id/questionnaire
     Submit milestone questionnaire responses
```

### Therapist APIs

```
GET  /api/v1/learning_paths
     List all patients' learning paths (with filters)

GET  /api/v1/learning_paths/:id
     Get specific patient's learning path detail

POST /api/v1/learning_paths
     Create learning path for patient

PATCH /api/v1/learning_paths/:id
      Update learning path status (pause, resume, complete)

POST /api/v1/step_progresses/:id/skip
     Skip a step (therapist only)

POST /api/v1/step_progresses/:id/reopen
     Reopen a completed step (therapist only)

PATCH /api/v1/step_progresses/:id/update_notes
      Add/update therapist notes

PATCH /api/v1/patient_step_exercises/:id
      Customize exercise for patient

POST /api/v1/patient_step_exercises/:id/enable
     Enable exercise

POST /api/v1/patient_step_exercises/:id/disable
     Disable exercise
```

## Frontend Components

### Pages

```
TherapyJourneyPage.tsx        - Patient's main journey view
StepDetailPage.tsx            - Step with exercises, practice, completion
TherapistLearningDashboard.tsx - Therapist overview of all patients
PatientLearningDetailPage.tsx  - Therapist view of single patient
```

### Components

```
learning-path/
├── AcknowledgmentOverlay.tsx  - Celebration for completions
├── CurrentStepPanel.tsx       - Patient's current step card
├── JourneyContextBanner.tsx   - Banner showing journey context
├── JourneyTimeline.tsx        - Vertical timeline of milestones
├── MilestoneCard.tsx          - Expandable milestone display
├── NextStepPreview.tsx        - Preview of upcoming step
├── QuestionnaireModal.tsx     - Milestone questionnaire
├── SliderInput.tsx            - Rating input component
└── WelcomeBackBanner.tsx      - Welcome message after absence

exercises/
├── QuizExercise.tsx           - Multiple choice/true-false quizzes
├── IdentificationExercise.tsx - Video review with classification
├── SelfModelingExercise.tsx   - Self-evaluation with star ratings
├── PauseExercise.tsx          - Guided pause practice
├── HoldingExercise.tsx        - Prolongation with waveform
├── JournalExercise.tsx        - Reflective writing
└── SelfDisclosureExercise.tsx - Scenario prompts
```

### Hooks

```
useLearningPath()          - Patient's own learning path
useStepProgress()          - Single step progress with exercises
usePatientLearningPath()   - Therapist access to patient's path
useMilestones()            - List of all milestones
```

## Exercise Types

### Standard (`exercise_type: 'standard'`)
Basic recording exercise. Patient records themselves practicing a technique.

### Quiz (`exercise_type: 'quiz'`)
Knowledge assessment. Configured via `default_config.questions`:
```json
{
  "questions": [
    {
      "id": "q1",
      "text_key": "learning_path.quiz.question_1",
      "type": "true_false",
      "correct_answer": true,
      "explanation_key": "learning_path.quiz.explanation_1"
    }
  ],
  "passing_score": 70
}
```

### Modeling (`exercise_type: 'modeling'`)
Self-evaluation exercise. Patient rates themselves on 4 dimensions:
- Fluency (1-5)
- Confidence (1-5)
- Technique (1-5)
- Overall (1-5)

Stored in `metadata.self_modeling_submissions`.

### Holding (`exercise_type: 'holding'`)
Prolongation exercise with waveform visualization. Uses Web Audio API for real-time feedback.

### Scenario (`is_scenario: true`)
Full conversational scenario using the ScenarioSession system. Links to `patient_step_progress_id` for tracking.

## Metadata Storage

Step progress metadata stores submission history:

```json
{
  "quiz_attempts": [
    {
      "submitted_at": "2026-02-01T12:00:00Z",
      "score": 85,
      "correct_count": 6,
      "total_count": 7,
      "passed": true
    }
  ],
  "self_modeling_submissions": [
    {
      "submitted_at": "2026-02-01T12:00:00Z",
      "ratings": { "fluency": 4, "confidence": 3, "technique": 4, "overall": 4 },
      "average_rating": 3.8,
      "notes": "Felt more confident today"
    }
  ],
  "pause_submissions": [
    {
      "submitted_at": "2026-02-01T12:00:00Z",
      "mode": "guided",
      "pause_count": 5,
      "pauses": [
        { "timestamp": 1200, "level": "medium", "detected_automatically": false }
      ]
    }
  ]
}
```

## Progress Calculation

```ruby
# Overall progress
completed_steps = patient_step_progresses.completed.count
total_steps = MilestoneStep.count
progress_percentage = (completed_steps.to_f / total_steps) * 100

# Milestone progress
milestone_steps = milestone.milestone_steps.count
completed_in_milestone = patient_step_progresses
  .completed
  .joins(:milestone_step)
  .where(milestone_steps: { milestone_id: milestone.id })
  .count
milestone_progress = (completed_in_milestone.to_f / milestone_steps) * 100
```

## Internationalization

All user-facing text uses i18n keys:
- `learning_path.milestones.{slug}.title`
- `learning_path.milestones.{slug}.description`
- `learning_path.milestones.{slug}.narrative`
- `learning_path.steps.{slug}.title`
- `learning_path.steps.{slug}.description`
- `learning_path.steps.{slug}.instructions`

Keys are defined in:
- `app-frontend/src/i18n/locales/en.json`
- `app-frontend/src/i18n/locales/pt.json`
- `app-frontend/src/i18n/locales/es.json`

## Multi-tenancy

Learning paths are tenant-scoped:
- `patient_learning_paths.tenant_id` ensures data isolation
- Default milestones have `tenant_id = null` (shared across tenants)
- Custom milestones can be tenant-specific

All queries are automatically scoped via `current_tenant`.

## Testing

### Backend Tests

```bash
# Model specs
bundle exec rspec spec/models/milestone_spec.rb
bundle exec rspec spec/models/patient_learning_path_spec.rb
bundle exec rspec spec/models/patient_step_progress_spec.rb

# Controller specs
bundle exec rspec spec/requests/api/v1/learning_paths_spec.rb
bundle exec rspec spec/requests/api/v1/step_progresses_spec.rb
```

### Frontend Tests

```bash
# Component tests
npm run test src/components/learning-path/
npm run test src/pages/TherapyJourneyPage.test.tsx
npm run test src/pages/StepDetailPage.test.tsx
```

## Accessibility

The Learning Path UI follows WCAG 2.1 AA guidelines:

- **Motion**: All animations respect `prefers-reduced-motion`
- **Focus**: Clear focus indicators on all interactive elements
- **ARIA**: Progress bars, live regions for loading states
- **Touch targets**: Minimum 44x44px on all interactive elements
- **Color**: Non-color indicators for status (checkmarks, not just green)

## Design Principles

The Learning Path follows these design principles:

1. **Calm Before All Else** - Reduce anxiety, use soft transitions
2. **Progress, Not Pressure** - Celebrate without creating pressure
3. **Clinical Credibility** - Professional appearance therapists can trust
4. **Accessible by Default** - WCAG AA, extra attention to cognitive load
5. **Personality Through Polish** - Refined animations, thoughtful micro-interactions

---

For implementation details, see:
- [TODO.md](../planning/TODO.md) - Current development status
- [TECHNICAL_PLAN.md](../../../local-docs/LearningPath/TECHNICAL_PLAN.md) - Original specification
