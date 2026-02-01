# Learning Path - Complete User Flow

This document describes the end-to-end user flows for the Learning Path (Therapy Journey) feature.

## Overview

The Learning Path guides patients through 8 structured milestones of speech therapy. Each milestone contains multiple steps with exercises. Progression is linear and therapist-controlled.

```
Milestone 1: Understanding
  └── Step 1.1 → Step 1.2 → Step 1.3 → ... → Questionnaire
Milestone 2: Identification
  └── Step 2.1 → Step 2.2 → ...
...
Milestone 8: Maintenance
  └── Step 8.1 → Step 8.2 → ... → Journey Complete
```

---

## 1. Setup Flow (Therapist)

### Creating a Learning Path

```
┌─────────────────────────────────────────────────────────────────┐
│ THERAPIST                                                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. Assign patient (invite code or direct assignment)           │
│     └── TherapistPatientAssignment created                      │
│                                                                 │
│  2. Navigate to /dashboard/patients/:id/learning-path           │
│     └── Or via /dashboard/learning-paths → click patient        │
│                                                                 │
│  3. Click "Start Learning Path"                                 │
│     └── POST /api/v1/patients/:id/learning_path                 │
│                                                                 │
│  4. System creates:                                             │
│     ├── PatientLearningPath (status: active)                    │
│     ├── PatientStepProgress for Step 1.1 (status: current)      │
│     └── PatientStepExercises (copies from templates)            │
│                                                                 │
│  5. Patient now sees "My Journey" in navigation                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Customizing Exercises (Optional)

```
┌─────────────────────────────────────────────────────────────────┐
│ THERAPIST                                                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  For any step, therapist can:                                   │
│                                                                 │
│  • Disable exercises that aren't relevant                       │
│    └── POST /api/v1/patient_step_exercises/:id/disable          │
│                                                                 │
│  • Customize instructions for this patient                      │
│    └── PATCH /api/v1/patient_step_exercises/:id                 │
│                                                                 │
│  • Add therapist notes (visible only to therapist)              │
│    └── PATCH /api/v1/step_progresses/:id/update_notes           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Daily Practice Flow (Patient)

### Viewing the Journey

```
┌─────────────────────────────────────────────────────────────────┐
│ PATIENT opens /journey                                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────┐                        │
│  │  📍 Current Step (highlighted)      │ ← Click to practice    │
│  │  "Identifying Your Stuttering"      │                        │
│  │  Step 2.3 of 6                       │                        │
│  └─────────────────────────────────────┘                        │
│                                                                 │
│  ┌─────────────────────────────────────┐                        │
│  │  ✓ Milestone 1: Understanding       │ ← Completed            │
│  │    All steps complete               │                        │
│  └─────────────────────────────────────┘                        │
│                                                                 │
│  ┌─────────────────────────────────────┐                        │
│  │  ◐ Milestone 2: Identification      │ ← In Progress          │
│  │    3 of 6 steps complete            │                        │
│  │    ├── ✓ Step 2.1                   │                        │
│  │    ├── ✓ Step 2.2                   │                        │
│  │    ├── 📍 Step 2.3 (current)        │                        │
│  │    └── ○ Steps 2.4-2.6 (upcoming)   │                        │
│  └─────────────────────────────────────┘                        │
│                                                                 │
│  ┌─────────────────────────────────────┐                        │
│  │  Coming Next: Milestone 3           │ ← Preview only         │
│  │  "Learning Modification Techniques" │                        │
│  └─────────────────────────────────────┘                        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Practicing a Step

```
┌─────────────────────────────────────────────────────────────────┐
│ PATIENT opens /journey/step/:stepProgressId                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Step Title: "Identifying Your Stuttering"                      │
│  Instructions: [therapist-customized or default]                │
│                                                                 │
│  ┌─────────────────────────────────────┐                        │
│  │  Exercises                          │                        │
│  │  ├── ▶ Watch Introduction Video     │ ← Click to practice    │
│  │  ├── ▶ Record Yourself Reading      │                        │
│  │  ├── ▶ Self-Reflection Questions    │                        │
│  │  └── ▶ Quiz: Check Understanding    │                        │
│  └─────────────────────────────────────┘                        │
│                                                                 │
│  Practice Stats:                                                │
│  "Practiced 5 times · 23 minutes total"                         │
│                                                                 │
│  ┌─────────────────────────────────────┐                        │
│  │  Feeling confident?                 │                        │
│  │  [Complete Step]                    │ ← When ready           │
│  └─────────────────────────────────────┘                        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Exercise Types

```
┌─────────────────────────────────────────────────────────────────┐
│ Exercise Types                                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  STANDARD RECORDING                                             │
│  └── Patient records audio practicing a technique               │
│      └── POST /api/v1/audio_recordings (with step context)      │
│                                                                 │
│  QUIZ                                                           │
│  └── Multiple choice / true-false questions                     │
│      └── POST /api/v1/step_progresses/:id/submit_quiz           │
│      └── Returns score, shows explanations                      │
│                                                                 │
│  SELF-MODELING                                                  │
│  └── Patient rates themselves on 4 dimensions (1-5)             │
│      ├── Fluency, Confidence, Technique, Overall                │
│      └── POST /api/v1/step_progresses/:id/submit_self_modeling  │
│                                                                 │
│  PAUSE EXERCISE                                                 │
│  └── Practice inserting natural pauses                          │
│      ├── Guided mode: visual cues, button presses               │
│      ├── Autonomous mode: natural pause detection               │
│      └── POST /api/v1/step_progresses/:id/submit_pauses         │
│                                                                 │
│  HOLDING/WAVEFORM                                               │
│  └── Prolongation practice with real-time visualization         │
│      └── Uses Web Audio API for waveform display                │
│                                                                 │
│  SCENARIO                                                       │
│  └── Conversational practice (phone calls, ordering, etc.)      │
│      └── Creates ScenarioSession linked to step                 │
│                                                                 │
│  JOURNAL                                                        │
│  └── Reflective writing with guided prompts                     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. Step Completion Flow

### Patient Completes a Step

```
┌─────────────────────────────────────────────────────────────────┐
│ STEP COMPLETION                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. Patient clicks "Complete Step"                              │
│     └── Confirmation modal appears                              │
│         "Ready to move on? You can always come back."           │
│                                                                 │
│  2. Patient confirms                                            │
│     └── POST /api/v1/step_progresses/:id/complete               │
│                                                                 │
│  3. Backend updates:                                            │
│     ├── Current step → status: completed                        │
│     ├── Next step → status: current (unlocked)                  │
│     └── Learning path → current_step updated                    │
│                                                                 │
│  4. AcknowledgmentOverlay appears                               │
│     ┌─────────────────────────────────────┐                     │
│     │         ✓ Step Complete             │                     │
│     │                                     │                     │
│     │  "Identifying Your Stuttering"      │                     │
│     │                                     │                     │
│     │  "Every step forward matters."      │ ← Random message    │
│     │                                     │                     │
│     │         [Continue]                  │                     │
│     │                                     │                     │
│     │    Tap anywhere to continue         │                     │
│     └─────────────────────────────────────┘                     │
│     └── Auto-dismisses after 4 seconds                          │
│     └── Pauses on hover/focus (accessibility)                   │
│                                                                 │
│  5. Patient returns to journey page                             │
│     └── Next step is now current                                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 4. Milestone Completion Flow

### Completing the Last Step in a Milestone

```
┌─────────────────────────────────────────────────────────────────┐
│ MILESTONE COMPLETION                                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. Patient completes last step of milestone                    │
│                                                                 │
│  2. Questionnaire modal appears                                 │
│     ┌─────────────────────────────────────┐                     │
│     │  Milestone 2 Complete!              │                     │
│     │                                     │                     │
│     │  Question 1 of 4                    │                     │
│     │  "How confident do you feel about   │                     │
│     │   identifying your stuttering?"     │                     │
│     │                                     │                     │
│     │  [1] [2] [3] [4] [5]               │ ← Slider/buttons     │
│     │  Not at all      Very confident    │                     │
│     │                                     │                     │
│     │  [Previous]              [Next →]   │                     │
│     └─────────────────────────────────────┘                     │
│                                                                 │
│  3. Patient completes questionnaire                             │
│     └── POST /api/v1/milestones/:id/questionnaire               │
│                                                                 │
│  4. Milestone AcknowledgmentOverlay (longer, 6 seconds)         │
│     ┌─────────────────────────────────────┐                     │
│     │      ✓ Milestone Complete           │                     │
│     │                                     │                     │
│     │  "Identification"                   │                     │
│     │                                     │                     │
│     │  "Your dedication is paying off."   │                     │
│     │                                     │                     │
│     │         [Continue]                  │                     │
│     └─────────────────────────────────────┘                     │
│                                                                 │
│  5. Next milestone unlocks                                      │
│     └── First step of next milestone becomes current            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 5. Therapist Management Flow

### Dashboard Overview

```
┌─────────────────────────────────────────────────────────────────┐
│ THERAPIST opens /dashboard/learning-paths                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Stats Cards:                                                   │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐           │
│  │ 24       │ │ 18       │ │ 12       │ │ 3        │           │
│  │ Total    │ │ With     │ │ Active   │ │ Needs    │           │
│  │ Patients │ │ Paths    │ │ This Week│ │ Attention│           │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘           │
│                                                                 │
│  Filters: [All Patients ▼] [All Milestones ▼] [Search...]      │
│                                                                 │
│  Patient List:                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ John Smith        Milestone 3, Step 2    45%  Active    │   │
│  │ Jane Doe          Milestone 5, Step 1    68%  Active    │   │
│  │ Bob Johnson       Milestone 2, Step 4    25%  Paused    │   │
│  │ Alice Williams    No learning path       --   --        │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Patient Detail View

```
┌─────────────────────────────────────────────────────────────────┐
│ THERAPIST opens /dashboard/patients/:id/learning-path          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Patient: John Smith                                            │
│  Status: Active | Progress: 45% | Current: Milestone 3, Step 2 │
│                                                                 │
│  [Pause Journey] [Complete Journey]                             │
│                                                                 │
│  Milestone 3: Modification Techniques                           │
│  ├── ✓ Step 3.1: Introduction (completed Jan 15)               │
│  │   └── 📝 Notes: "Good understanding of basics"               │
│  │                                                              │
│  ├── 📍 Step 3.2: Practice Techniques (current)                │
│  │   ├── Attempts: 12 | Time: 45 min                           │
│  │   ├── [Complete] [Skip] [Reopen]                            │
│  │   ├── [Edit Exercises]                                       │
│  │   └── 📝 Notes: [Add note...]                                │
│  │                                                              │
│  └── ○ Step 3.3: Advanced Practice (locked)                    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Therapist Actions

```
┌─────────────────────────────────────────────────────────────────┐
│ THERAPIST ACTIONS                                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  COMPLETE STEP (for patient)                                    │
│  └── When therapist determines patient has mastered step        │
│      └── POST /api/v1/step_progresses/:id/complete              │
│      └── completed_by_id set to therapist                       │
│                                                                 │
│  SKIP STEP                                                      │
│  └── When step isn't applicable for this patient                │
│      └── POST /api/v1/step_progresses/:id/skip                  │
│      └── Step marked skipped, next step unlocks                 │
│                                                                 │
│  REOPEN STEP                                                    │
│  └── When patient needs more practice on completed step         │
│      └── POST /api/v1/step_progresses/:id/reopen                │
│      └── Step returns to current status                         │
│                                                                 │
│  PAUSE JOURNEY                                                  │
│  └── Temporarily suspend patient's journey                      │
│      └── PATCH /api/v1/patients/:id/learning_path               │
│      └── status: paused                                         │
│                                                                 │
│  RESUME JOURNEY                                                 │
│  └── Continue paused journey                                    │
│      └── PATCH /api/v1/patients/:id/learning_path               │
│      └── status: active                                         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 6. Return After Absence Flow

### Welcome Back Experience

```
┌─────────────────────────────────────────────────────────────────┐
│ PATIENT RETURNS AFTER DAYS AWAY                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. Patient logs in                                             │
│     └── GET /api/v1/my_learning_path                            │
│     └── Backend calculates what changed since last visit        │
│                                                                 │
│  2. Welcome back message shows (if applicable)                  │
│     ┌─────────────────────────────────────┐                     │
│     │  Welcome back!                      │                     │
│     │                                     │                     │
│     │  "It's good to see you again.       │                     │
│     │   Your journey is right where       │                     │
│     │   you left it."                     │                     │
│     │                                     │                     │
│     │  [Continue My Journey]              │                     │
│     └─────────────────────────────────────┘                     │
│     └── No guilt messaging, no missed streaks                   │
│                                                                 │
│  3. If therapist completed steps while away:                    │
│     └── AcknowledgmentOverlay shows for each completion         │
│     └── "Your therapist marked Step 2.3 complete!"             │
│                                                                 │
│  4. If milestones were completed while away:                    │
│     └── Milestone acknowledgment shows                          │
│                                                                 │
│  5. Patient acknowledged all updates                            │
│     └── POST /api/v1/my_learning_path/acknowledge               │
│     └── Updates stored in learning_path.metadata                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 7. Journey Completion Flow

### Completing the Final Milestone

```
┌─────────────────────────────────────────────────────────────────┐
│ JOURNEY COMPLETE                                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. Patient completes last step of Milestone 8                  │
│                                                                 │
│  2. Final questionnaire                                         │
│                                                                 │
│  3. Journey Complete AcknowledgmentOverlay                      │
│     ┌─────────────────────────────────────┐                     │
│     │      ✓ Journey Complete             │                     │
│     │                                     │                     │
│     │  "Your Therapy Journey"             │                     │
│     │                                     │                     │
│     │  "What an incredible accomplishment.│                     │
│     │   You've come so far."              │                     │
│     │                                     │                     │
│     │         [Continue]                  │                     │
│     └─────────────────────────────────────┘                     │
│                                                                 │
│  4. Learning path status → completed                            │
│     └── PATCH learning_path status: completed                   │
│                                                                 │
│  5. Journey page shows completion state                         │
│     ┌─────────────────────────────────────┐                     │
│     │  🎉 Congratulations!                │                     │
│     │                                     │                     │
│     │  You've completed your therapy      │                     │
│     │  journey. All 8 milestones are      │                     │
│     │  done!                              │                     │
│     │                                     │                     │
│     │  Your therapist will discuss        │                     │
│     │  next steps with you.               │                     │
│     └─────────────────────────────────────┘                     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## API Reference

| Action                   | Method | Endpoint                                                  |
| ------------------------ | ------ | --------------------------------------------------------- |
| Get patient's journey    | GET    | `/api/v1/my_learning_path`                                |
| Acknowledge updates      | POST   | `/api/v1/my_learning_path/acknowledge`                    |
| Get step details         | GET    | `/api/v1/step_progresses/:id`                             |
| Complete step            | POST   | `/api/v1/step_progresses/:id/complete`                    |
| Record attempt           | POST   | `/api/v1/step_progresses/:id/record_attempt`              |
| Submit quiz              | POST   | `/api/v1/step_progresses/:id/submit_quiz`                 |
| Submit self-modeling     | POST   | `/api/v1/step_progresses/:id/submit_self_modeling`        |
| Submit pauses            | POST   | `/api/v1/step_progresses/:id/submit_pauses`               |
| Submit questionnaire     | POST   | `/api/v1/milestones/:id/questionnaire`                    |
| Skip step (therapist)    | POST   | `/api/v1/step_progresses/:id/skip`                        |
| Reopen step (therapist)  | POST   | `/api/v1/step_progresses/:id/reopen`                      |
| Update notes (therapist) | PATCH  | `/api/v1/step_progresses/:id/update_notes`                |
| Create learning path     | POST   | `/api/v1/patients/:id/learning_path`                      |
| Update learning path     | PATCH  | `/api/v1/patients/:id/learning_path`                      |
| Customize exercise       | PATCH  | `/api/v1/patient_step_exercises/:id`                      |
| Enable/disable exercise  | POST   | `/api/v1/patient_step_exercises/:id/enable` or `/disable` |

---

## Related Documentation

- [LEARNING_PATH.md](LEARNING_PATH.md) - Technical architecture
- [LEARNING_PATH_PATIENT_GUIDE.md](../guides/LEARNING_PATH_PATIENT_GUIDE.md) - Patient user guide
- [LEARNING_PATH_THERAPIST_GUIDE.md](../guides/LEARNING_PATH_THERAPIST_GUIDE.md) - Therapist user guide
- [TECHNICAL_PLAN.md](../../../local-docs/LearningPath/TECHNICAL_PLAN.md) - Original specification

---

**Last Updated:** 2026-02-01
