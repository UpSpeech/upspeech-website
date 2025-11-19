# Exercise System Architecture

**Last Updated:** 2025-11-17
**Status:** ✅ Production Ready

## Overview

The UpSpeech exercise system consists of two distinct types of therapeutic tools designed for different use cases in speech therapy:

1. **Mini Games** - Patient-assignable daily practice exercises for independent work
2. **Consultation Exercises** - Therapist tools for in-session activities linked to reports

This architecture replaced the previous unified Exercise model with an STI (Single Table Inheritance) pattern, providing better separation of concerns and clearer business logic.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        Exercise System                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────┐              ┌────────────────────────┐  │
│  │   MiniGame       │              │ ConsultationExercise    │  │
│  │  (Daily Practice)│              │  (In-Session Tools)     │  │
│  └────────┬─────────┘              └──────────┬─────────────┘  │
│           │                                    │                 │
│           │                                    │                 │
│           ▼                                    ▼                 │
│  ┌──────────────────┐              ┌────────────────────────┐  │
│  │ MiniGameAssignment│             │ReportConsultationExercise│
│  │  (Homework)       │              │  (Session Link)         │  │
│  └────────┬─────────┘              └──────────┬─────────────┘  │
│           │                                    │                 │
│           ▼                                    ▼                 │
│  ┌──────────────────┐              ┌────────────────────────┐  │
│  │    Patient       │              │       Report            │  │
│  │  (Client/Member) │              │  (Session Record)       │  │
│  └──────────────────┘              └────────────────────────┘  │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

## Models

### MiniGame

**Purpose:** Patient-assignable exercises for daily practice and homework.

**Key Attributes:**

- `title` (string, required) - Exercise name
- `description` (text, optional) - Brief description
- `instructions` (text, required) - How to perform the exercise
- `category` (string, required) - One of 10 categories
- `difficulty` (integer, 1-5, required) - Exercise difficulty level
- `created_by_therapist_id` (integer, required) - Creator reference
- `tenant_id` (integer, required) - Multi-tenancy isolation

**Categories:**

- `fluency_shaping` - Fluency shaping techniques
- `fluency_modification` - Fluency modification strategies
- `cbt` - Cognitive behavioral therapy exercises
- `breathing` - Breathing control exercises
- `relaxation` - Relaxation techniques
- `mindfulness` - Mindfulness practices
- `speech_practice` - General speech practice
- `conversation_skills` - Conversational fluency
- `presentation` - Public speaking practice
- `other` - Miscellaneous exercises

**Associations:**

- `belongs_to :tenant`
- `belongs_to :created_by_therapist` (User)
- `has_many :mini_game_assignments`
- `has_many :assigned_patients, through: :mini_game_assignments`

**Validations:**

- Creator must have therapist, admin, or owner role
- Creator and mini game must belong to the same tenant
- All required fields must be present
- Difficulty must be 1-5
- Category must be valid

**Scopes:**

- `.for_tenant(tenant_id)` - Filter by tenant
- `.by_category(category)` - Filter by category
- `.by_difficulty(difficulty)` - Filter by difficulty level
- `.by_therapist(therapist_id)` - Filter by creator
- `.search(query)` - Search title, description, instructions
- `.recent` - Order by created_at DESC

### ConsultationExercise

**Purpose:** Therapist tools used during in-session activities, linked to reports for tracking.

**Key Attributes:**

- `title` (string, required) - Exercise name
- `description` (text, required) - Description of the exercise
- `instructions` (text, required) - How to use the exercise
- `category` (string, required) - Same 10 categories as MiniGame
- `difficulty` (integer, 1-5, required) - Exercise complexity
- `text` (text, optional) - Text content for reading/speaking exercises
- `image_url` (string, optional) - Image URL for visual exercises
- `created_by_therapist_id` (integer, required)
- `tenant_id` (integer, required)

**Special Requirements:**

- **Must have either `text` OR `image_url`, but not both**
- This creates two types of consultation exercises:
  - **Text-based:** For reading passages, pronunciation practice
  - **Image-based:** For visual cues, charts, diagrams

**Associations:**

- `belongs_to :tenant`
- `belongs_to :created_by_therapist` (User)
- `has_many :report_consultation_exercises`
- `has_many :reports, through: :report_consultation_exercises`

**Validations:**

- All MiniGame validations apply
- `description` is required (unlike MiniGame where it's optional)
- Must have either `text` or `image_url` (XOR validation)
- Cannot have both `text` and `image_url`

**Scopes:**

- Same as MiniGame scopes

### ReportConsultationExercise

**Purpose:** Join table linking reports to consultation exercises with positional ordering.

**Key Attributes:**

- `report_id` (integer, required)
- `consultation_exercise_id` (integer, required)
- `tenant_id` (integer, required)
- `position` (integer, required, >= 0) - Exercise order in session

**Associations:**

- `belongs_to :report`
- `belongs_to :consultation_exercise`
- `belongs_to :tenant`

**Validations:**

- Report, exercise, and join record must share the same tenant
- No duplicate exercises on the same report
- Position must be >= 0

**Scopes:**

- `default_scope { order(position: :asc) }` - Always ordered by position
- `.ordered_by_position` - Explicit ordering scope

**Positioning:**

- Exercises are ordered by `position` field (0, 1, 2, ...)
- When adding: automatically assigned next available position
- When removing: remaining exercises are reordered
- When reordering: positions updated based on new order array

### MiniGameAssignment

**Purpose:** Tracks assignment of mini games to patients as homework/practice.

**Key Attributes:**

- `mini_game_id` (integer, required)
- `patient_id` (integer, required) - User with client/member role
- `therapist_id` (integer, required) - Assigning therapist
- `tenant_id` (integer, required)
- `status` (enum, required) - Current assignment status
- `assigned_at` (datetime, required)
- `due_date` (datetime, optional)
- `completed_at` (datetime, optional)
- `notes_from_therapist` (text, optional)
- `notes_from_patient` (text, optional)

**Status Values:**

- `assigned` - Initial state, not yet started
- `in_progress` - Patient has started working on it
- `completed` - Patient finished the exercise
- `skipped` - Patient chose to skip

**Computed Fields:**

- `overdue` (boolean) - True if past due_date and not completed
- `completion_time_in_days` (integer) - Days from assigned to completed

**Associations:**

- `belongs_to :mini_game`
- `belongs_to :patient` (User)
- `belongs_to :therapist` (User)
- `belongs_to :tenant`

**Validations:**

- Patient must have client or member role
- Therapist must have therapist, admin, or owner role
- All participants must belong to the same tenant

**Scopes:**

- `.for_tenant(tenant_id)`
- `.for_patient(patient_id)`
- `.for_therapist(therapist_id)`
- `.by_status(status)`
- `.overdue` - Assignments past due date and not completed
- `.active` - Status is assigned or in_progress
- `.recent`

## Controllers & API Endpoints

### MiniGamesController

**Endpoints:**

```
GET    /api/v1/mini_games               # List mini games
GET    /api/v1/mini_games/:id            # Get single mini game
POST   /api/v1/mini_games                # Create mini game
PATCH  /api/v1/mini_games/:id            # Update mini game
DELETE /api/v1/mini_games/:id            # Delete mini game
GET    /api/v1/mini_games/categories     # List valid categories
```

**Filters:**

- `category` - Filter by category
- `difficulty` - Filter by difficulty
- `therapist_id` - Filter by creator
- `search` - Search text in title, description, instructions
- `page` - Page number for pagination
- `per_page` - Items per page

**Permissions:**

- **List/Show:** All authenticated users
- **Create:** Therapist, Admin, Owner only
- **Update/Delete:** Creator or Admin/Owner in same tenant

### ConsultationExercisesController

**Endpoints:**

```
GET    /api/v1/consultation_exercises               # List exercises
GET    /api/v1/consultation_exercises/:id            # Get single exercise
POST   /api/v1/consultation_exercises                # Create exercise
PATCH  /api/v1/consultation_exercises/:id            # Update exercise
DELETE /api/v1/consultation_exercises/:id            # Delete exercise
GET    /api/v1/consultation_exercises/categories     # List categories
```

**Same filters and permissions as MiniGamesController**

### MiniGameAssignmentsController

**Endpoints:**

```
GET    /api/v1/mini_game_assignments                # List assignments
GET    /api/v1/mini_game_assignments/:id             # Get assignment
POST   /api/v1/mini_game_assignments                 # Create assignment
PATCH  /api/v1/mini_game_assignments/:id             # Update assignment
DELETE /api/v1/mini_game_assignments/:id             # Delete assignment
POST   /api/v1/mini_game_assignments/:id/complete    # Mark complete
POST   /api/v1/mini_game_assignments/:id/in_progress # Mark in progress
POST   /api/v1/mini_game_assignments/:id/skip        # Mark skipped
GET    /api/v1/mini_game_assignments/statistics      # Get statistics
```

**Filters:**

- `patient_id` - Filter by patient
- `therapist_id` - Filter by therapist
- `status` - Filter by status
- `page`, `per_page` - Pagination

**Permissions:**

- **List:** Patients see their own, therapists see their assigned patients, admins see all in tenant
- **Create:** Therapist, Admin, Owner only
- **Update status:** Patient (for their own) or Therapist/Admin
- **Delete:** Creator or Admin/Owner

### ReportsController (Consultation Exercise Methods)

**Endpoints:**

```
POST   /api/v1/reports/:id/consultation_exercises                        # Add exercise to report
DELETE /api/v1/reports/:id/consultation_exercises/:consultation_exercise_id # Remove exercise
PATCH  /api/v1/reports/:id/consultation_exercises/reorder                # Reorder exercises
```

**Add Exercise:**

- Automatically assigns next position
- Returns updated report with all exercises

**Remove Exercise:**

- Removes the exercise
- Automatically reorders remaining exercises
- Returns updated report

**Reorder:**

- Accepts array of exercise IDs in desired order
- Updates positions to match array order
- Returns updated report

**All operations trigger AI logging** (see AI Integration section)

## AI Service Integration

### Endpoint

```
POST /log-consultation-exercises
```

**Request Body:**

```json
{
  "report_id": 123,
  "tenant_id": 1,
  "therapist_id": 45,
  "patient_id": 67,
  "consultation_exercises": [
    {
      "id": 1,
      "title": "Reading Passage",
      "description": "Practice fluency",
      "category": "speech_practice",
      "difficulty": 3,
      "position": 0,
      "text": "Sample text...",
      "image_url": null,
      "created_by": {
        "id": 45,
        "name": "Dr. Smith"
      }
    }
  ]
}
```

**Response:**

```json
{
  "status": "logged",
  "report_id": 123,
  "exercises_count": 3,
  "summary": {
    "categories": {
      "speech_practice": 2,
      "breathing": 1
    },
    "difficulties": {
      "3": 2,
      "4": 1
    },
    "exercise_types": {
      "text": 2,
      "image": 1
    }
  }
}
```

### Logging Trigger

The `AiConsultationExerciseLogger` service automatically logs consultation exercise data whenever:

- An exercise is added to a report
- An exercise is removed from a report
- Exercises are reordered in a report

### Logged Data

For each session:

- **Per-exercise details:** ID, title, category, difficulty, position, type (text/image)
- **Session context:** Report ID, tenant, therapist, patient
- **Summary statistics:** Category distribution, difficulty breakdown, type usage

### Future ML Analysis

The logged data enables future analysis of:

- Session effectiveness correlation with exercise types
- Optimal exercise sequences for different patient profiles
- Exercise difficulty progression patterns
- Category effectiveness by patient demographics

## Frontend Components

### MiniGamesLibraryPage

**Location:** `app-frontend/src/pages/MiniGamesLibraryPage.tsx`

**Features:**

- Grid view of all mini games
- Filter by category, difficulty, search
- Create/edit/delete mini games
- Assign mini games to patients
- Pagination support

**Permissions:**

- Therapist, Admin, Owner only

### ConsultationExercisesLibraryPage

**Location:** `app-frontend/src/pages/ConsultationExercisesLibraryPage.tsx`

**Features:**

- Grid view of all consultation exercises
- Filter by category, difficulty, search
- Create/edit/delete exercises
- Text/image toggle with validation
- Visual badges for exercise type
- No assignment functionality (exercises are linked to reports, not assigned)

**Permissions:**

- Therapist, Admin, Owner only

### ConsultationExerciseSelector

**Location:** `app-frontend/src/components/reports/ConsultationExerciseSelector.tsx`

**Features:**

- Add exercises from dropdown
- Remove exercises with confirmation
- Reorder with up/down arrows
- Display exercise details (title, description, category, difficulty, type)
- Visual indicators for text vs image exercises
- Read-only mode for viewing
- Empty state when no exercises

**Used In:**

- `ReportEditPage` - Editable mode
- `ManualReportGeneratorPage` - Editable mode
- `ReportViewPage` - Read-only mode

### MyExercisesPage

**Location:** `app-frontend/src/pages/MyExercisesPage.tsx`

**Updates:**

- Changed from Exercise to MiniGame terminology
- Updated all API calls to mini game endpoints
- Removed exercise_type badge (all are daily exercises)
- Updated type imports and object references

**Features:**

- View assigned mini games
- Mark as in progress, complete, or skip
- Add patient notes
- Filter by status, patient (therapists), therapist (admins)
- View assignment statistics

## Migration & Data Integrity

### Migration Process

**Step 1:** Create new tables

- `mini_games` - New table based on exercises
- `consultation_exercises` - New table with text/image_url fields
- `report_consultation_exercises` - Join table with position
- Rename `exercise_assignments` → `mini_game_assignments`

**Step 2:** Data migration

- Split 80 existing exercises by `exercise_type`
- 64 daily exercises → `mini_games` table
- 16 consultation exercises → `consultation_exercises` table
- Create ID mapping for referential integrity

**Step 3:** Update assignments

- Update `mini_game_assignments.mini_game_id` using ID mapping
- Preserve all assignment data (status, notes, dates)

**Rollback Strategy:**

- Keep old Exercise model for potential rollback
- All data transformations are reversible
- ID mappings stored during migration

### Data Validation

Post-migration validation ensures:

- All exercises migrated correctly
- No orphaned assignments
- Referential integrity maintained
- Tenant consistency preserved
- Position ordering correct

## Best Practices

### Creating Mini Games

```ruby
# Good - Clear, actionable mini game
MiniGame.create!(
  title: "Diaphragmatic Breathing",
  description: "Practice deep breathing for speech control",
  instructions: "Breathe deeply from diaphragm. Hold 3 seconds. Exhale slowly over 5 seconds. Repeat 10 times.",
  category: "breathing",
  difficulty: 2,
  created_by_therapist: therapist,
  tenant: tenant
)
```

### Creating Consultation Exercises

```ruby
# Text-based exercise
ConsultationExercise.create!(
  title: "Rainbow Passage Reading",
  description: "Practice fluency with structured text",
  instructions: "Read passage aloud using slow rate technique",
  category: "speech_practice",
  difficulty: 3,
  text: "When sunlight strikes raindrops in the air...",
  image_url: nil, # Must be nil when text is present
  created_by_therapist: therapist,
  tenant: tenant
)

# Image-based exercise
ConsultationExercise.create!(
  title: "Visual Fluency Chart",
  description: "Use visual cue for pacing",
  instructions: "Follow the rhythm indicated by the visual chart",
  category: "fluency_shaping",
  difficulty: 4,
  text: nil, # Must be nil when image_url is present
  image_url: "https://example.com/fluency-chart.jpg",
  created_by_therapist: therapist,
  tenant: tenant
)
```

### Assigning Mini Games

```ruby
assignment = MiniGameAssignment.create!(
  mini_game: mini_game,
  patient: client,
  therapist: therapist,
  tenant: tenant,
  due_date: 7.days.from_now,
  notes_from_therapist: "Focus on breathing technique during this exercise"
)
```

### Adding Consultation Exercises to Reports

```ruby
# In controller
report.report_consultation_exercises.create!(
  consultation_exercise: exercise,
  tenant: current_tenant,
  position: report.consultation_exercises.count # Auto-increment
)

# Triggers AI logging automatically
AiConsultationExerciseLogger.log_exercises(report)
```

## Testing

### Test Coverage

**Models:**

- `spec/models/mini_game_spec.rb` - 50+ tests
- `spec/models/consultation_exercise_spec.rb` - 50+ tests
- `spec/models/report_consultation_exercise_spec.rb` - 30+ tests

**Factories:**

- `spec/factories/mini_games.rb`
- `spec/factories/consultation_exercises.rb`
- `spec/factories/report_consultation_exercises.rb`
- `spec/factories/mini_game_assignments.rb`

**Test Categories:**

- Validations (presence, format, custom)
- Associations (belongs_to, has_many, through)
- Scopes (filtering, searching, ordering)
- Permissions (role-based access)
- Tenant isolation
- Position ordering
- XOR validation (text vs image)

### Running Tests

```bash
# All model tests
bundle exec rspec spec/models/mini_game_spec.rb
bundle exec rspec spec/models/consultation_exercise_spec.rb
bundle exec rspec spec/models/report_consultation_exercise_spec.rb

# With coverage
COVERAGE=true bundle exec rspec spec/models/

# Specific test
bundle exec rspec spec/models/mini_game_spec.rb:10
```

## Troubleshooting

### Common Issues

**Issue:** "Consultation exercises must have either text or image_url"

- **Cause:** Neither `text` nor `image_url` provided
- **Solution:** Provide exactly one (not both, not neither)

**Issue:** "Consultation exercises must have either text or image_url, not both"

- **Cause:** Both `text` and `image_url` provided
- **Solution:** Provide only one field

**Issue:** Position conflicts when adding exercises

- **Cause:** Manual position assignment
- **Solution:** Let the system auto-assign position (use count of existing exercises)

**Issue:** "Creator must have therapist, admin, or owner role"

- **Cause:** Trying to create exercise as client/member
- **Solution:** Only therapists, admins, or owners can create exercises

**Issue:** Exercises not appearing for certain users

- **Cause:** Tenant isolation
- **Solution:** Verify all records share the same tenant_id

## Related Documentation

- [Multi-Tenancy Architecture](./MULTI_TENANCY.md)
- [Permissions System](./PERMISSIONS.md)
- [Testing Strategy](./TESTING_STRATEGY.md)
- [Service Communication](./SERVICE_COMMUNICATION.md)

## Changelog

**2025-11-17:** Initial documentation for new exercise system architecture

- Split unified Exercise model into MiniGame and ConsultationExercise
- Added ReportConsultationExercise join table with positioning
- Renamed ExerciseAssignment to MiniGameAssignment
- Integrated AI logging service
- Migrated 80 existing exercises
- Created comprehensive test coverage
