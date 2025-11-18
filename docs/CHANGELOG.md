# UpSpeech Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to semantic versioning for sprints.

## Post-Sprint 4 - November 17, 2025

### Exercise System Refactoring ✅ COMPLETE

#### Changed

**Architecture Overhaul:**
- Split unified `Exercise` model (with STI pattern) into two distinct models:
  - `MiniGame` - Patient-assignable daily practice exercises
  - `ConsultationExercise` - Therapist tools for in-session activities
- Improved separation of concerns and clearer business logic
- Better alignment with actual therapeutic workflows

**Backend Changes:**
- Created `mini_games` table (migrated 64 daily exercises from exercises)
- Created `consultation_exercises` table (migrated 16 consultation exercises from exercises)
- Created `report_consultation_exercises` join table with position tracking
- Renamed `exercise_assignments` to `mini_game_assignments`
- Created `MiniGamesController` and `ConsultationExercisesController` with full CRUD
- Updated `ReportsController` with 3 new methods for consultation exercise management:
  - `add_consultation_exercise` - Add exercise to report with auto-position
  - `remove_consultation_exercise` - Remove and reorder remaining
  - `reorder_consultation_exercises` - Update positions via array
- Created `AiConsultationExerciseLogger` service for ML analysis
- Added `POST /log-consultation-exercises` endpoint to AI service
- Migrated 80 existing exercises with full data integrity

**Frontend Changes:**
- Created `MiniGamesLibraryPage.tsx` - CRUD interface for mini games with assignment
- Created `ConsultationExercisesLibraryPage.tsx` - CRUD with text/image validation
- Created `ConsultationExerciseSelector.tsx` - Reusable component for report integration
- Updated `ReportEditPage`, `ManualReportGeneratorPage`, `ReportViewPage` with exercise selectors
- Updated `MyExercisesPage` to use MiniGame terminology throughout
- Added 30+ new API client methods
- Updated TypeScript types for all new models

**AI Integration:**
- Automatic logging of consultation exercises when added/removed/reordered
- Detailed per-exercise tracking (ID, title, category, difficulty, position, type)
- Session summary statistics (category distribution, difficulty breakdown, type usage)
- Foundation for future ML analysis:
  - Session effectiveness correlation with exercise types
  - Optimal exercise sequences for patient profiles
  - Difficulty progression patterns

**Testing:**
- Created comprehensive RSpec tests for all new models:
  - `mini_game_spec.rb` - 50+ test cases
  - `consultation_exercise_spec.rb` - 50+ test cases
  - `report_consultation_exercise_spec.rb` - 30+ test cases
- Created FactoryBot factories for all models
- Test coverage: validations, associations, scopes, permissions, tenant isolation

**Documentation:**
- Created comprehensive `EXERCISE_SYSTEM.md` architecture documentation
- Documented models, controllers, API endpoints, AI integration
- Added best practices and troubleshooting guide
- Updated changelog

**Key Features:**
- **MiniGames:** Can be assigned to patients for independent practice
- **Consultation Exercises:** Linked to reports, tracked by position, logged to AI
- **Text vs Image:** Consultation exercises support either text OR image content
- **Position Ordering:** Exercises in reports maintain sequence (1st, 2nd, 3rd)
- **AI Logging:** Automatic tracking for future analysis

**Migration:**
- Data migration script with ID mapping
- Zero data loss - all 80 exercises migrated successfully
- All assignments preserved and remapped
- Backwards compatibility maintained

**Files Changed:**
- Backend Models: `MiniGame`, `ConsultationExercise`, `ReportConsultationExercise`, `MiniGameAssignment`
- Backend Controllers: `MiniGamesController`, `ConsultationExercisesController`, `MiniGameAssignmentsController` (renamed)
- Backend Services: `AiConsultationExerciseLogger`
- Frontend Pages: `MiniGamesLibraryPage.tsx`, `ConsultationExercisesLibraryPage.tsx`, `MyExercisesPage.tsx`
- Frontend Components: `ConsultationExerciseSelector.tsx`
- AI Service: `src/report_writer/endpoint.py` (new endpoint)

#### Status
- Exercise System Refactoring: 100% complete
- Test Coverage: Comprehensive backend tests
- Documentation: Complete architecture documentation
- Production Ready: ✅

---

## Sprint 4 (Week 4) - November 8, 2025

### Phase 1: Foundation (Patient-Therapist Linking) ✅ COMPLETE

#### Added

**Patient-Therapist Assignment System:**
- Created `TherapistPatientAssignment` model with status management (active/inactive)
- Built `TherapistAssignmentsController` with full CRUD API
- Implemented filtered views for therapists to see only their assigned patients
- Created `MyPatientsPage.tsx` with patient list and assignment management
- Added assignment controls to `ClientsManagementPage.tsx`

**Invite Code System:**
- Created `InviteCode` model with secure token generation (SecureRandom.urlsafe_base64)
- Built `InvitesController` with create/validate endpoints
- Implemented 7-day expiration system with automatic validation
- Created `InviteMailer` for email delivery of invite links
- Integrated invite token support into `RegisterForm.tsx`
- Auto-assignment of therapist-patient relationship on signup with invite

**Key Files:**
- Backend: `TherapistPatientAssignment`, `InviteCode` models
- Controllers: `TherapistAssignmentsController`, `InvitesController`
- Frontend: `MyPatientsPage.tsx`, `RegisterForm.tsx` (invite integration)

#### Status
- Phase 1: 100% complete

---

### Phase 4: Manual Exercise Assignment ✅ COMPLETE

#### Added

**Exercise Library:**
- Created `Exercise` model with 10 categories (fluency_shaping, fluency_modification, cbt, breathing, relaxation, mindfulness, speech_practice, conversation_skills, presentation, other)
- Difficulty scale 1-5 with validation
- Built `ExercisesController` with CRUD + categories endpoint
- Tenant-scoped exercise library

**Exercise Assignment System:**
- Created `ExerciseAssignment` model with 4 statuses (assigned, in_progress, completed, skipped)
- Due date tracking with overdue detection
- Notes fields for therapist and patient communication
- Built `ExerciseAssignmentsController` with CRUD + complete/in_progress/skip actions
- Statistics endpoint for completion rates and average completion time

**Therapist Interface:**
- Created `ExerciseLibraryPage.tsx` for exercise management
- Exercise creation/editing with category and difficulty selection
- Assignment modal with patient selection and due date picker
- Filter by category and difficulty
- Visual indicators for exercise assignments

**Patient Interface:**
- Created `MyExercisesPage.tsx` for viewing and completing exercises
- Statistics dashboard showing total, completed, overdue counts
- Status filtering (all, assigned, in progress, completed, overdue)
- Exercise completion with patient notes
- Visual badges for status and overdue indicators

**API Integration:**
- Added 17 API client methods to `lib/api.ts`
- TypeScript types: `Exercise`, `ExerciseAssignment`, `ExerciseAssignmentStatistics`, `ExerciseCategory`
- Routes: `/dashboard/exercises` (therapists), `/my-exercises` (patients)
- Navigation integration in `RoleBasedNavigation.tsx`

**Internationalization:**
- Added translations to `en.json` and `pt.json`
- Navigation labels: "Exercise Library" / "Biblioteca de Exercícios"

**Key Files:**
- Backend: `Exercise`, `ExerciseAssignment` models
- Controllers: `ExercisesController`, `ExerciseAssignmentsController`
- Frontend: `ExerciseLibraryPage.tsx`, `MyExercisesPage.tsx`

#### Status
- Phase 4: 100% complete (AI recommendations deferred to post-MVP)

---

## Sprint 3 (Week 3) - October 17, 2025

### Phase 5: Progress Dashboard ✅ COMPLETE

#### Added

**Backend Progress API:**
- Created `PatientProgressController` with comprehensive progress endpoint
- Recording/report statistics with time range filtering (30d, 90d, all-time)
- Activity timeline combining recordings and reports
- Consistency score calculation based on recording frequency

**Frontend Progress Dashboard:**
- Installed recharts library for data visualizations
- Created `PatientProgressPage.tsx` with summary cards (total recordings, reports, consistency score)
- Recording frequency area chart showing activity over time
- Activity timeline bar chart combining recordings and reports
- Progress insights section with actionable recommendations
- Recent activity feed with chronological list
- Added navigation from `ClientsManagementPage.tsx` to patient progress

#### Status
- Phase 5: 75% complete (pending disfluency integration from Phase 3)

---

## Sprint 2 (Week 2-3) - October 2025

### Phase 7: Therapist Portal (Notes & Export) ✅ COMPLETE

#### Added

**Report Notes System:**
- Created `ReportNote` model with visibility controls:
  - `therapist_only`: Private notes for internal use
  - `shared_with_patient`: Feedback visible to patients
- Built `ReportNotesController` with full CRUD API
- Created `ReportNotes.tsx` component with create/edit/delete functionality
- Integrated notes into `ReportViewPage.tsx` with role-based visibility

**Patient Summary Export:**
- Created `PatientSummaryGenerator` service to aggregate patient data
- Built HTML export template with clinical styling
- Export includes: patient demographics, report summaries, recording statistics
- Added export endpoint to `PatientSummariesController`
- Integrated export button into `ClientsManagementPage.tsx`

#### Status
- Phase 7: 100% complete

---

## Sprint 1 (Week 1-2) - October 2025

### Phase 2: Automated Report Writing ✅ COMPLETE

#### Added

**Report Editing System:**
- Integrated Tiptap rich text editor with clinical formatting
- Implemented autosave functionality (saves every 2 seconds)
- Added PATCH endpoint for report updates (`/api/v1/reports/:id`)
- Report viewing workflow: list → view → edit

**Template System:**
- Created flexible template system for different report types
- Initial templates: Initial Assessment, Progress Note, Discharge Summary
- Template selection during report generation
- See [REPORT_TEMPLATES.md](architecture/REPORT_TEMPLATES.md) for adding new templates

**Export Functionality:**
- HTML-based PDF export with clinical styling
- Professional report formatting suitable for clinical documentation
- Export available from report view page

#### Status
- Phase 2: 95% complete (needs production testing only)

---

## Template for Future Sprints

```markdown
## Sprint X (Week X) - [Date]

### Phase X: [Feature Name] [Status]

#### Added
- Feature 1 description
- Feature 2 description

#### Changed
- Change 1 description

#### Fixed
- Fix 1 description

#### Status
- Phase X: [Percentage]% complete
```

---

## Legend

- ✅ COMPLETE - Fully implemented and tested
- 🚧 IN PROGRESS - Currently being worked on
- ⏳ PENDING - Planned but not started
- ❌ BLOCKED - Waiting on dependency or decision

---

**Last Updated:** 2025-11-17
