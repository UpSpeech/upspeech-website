# UpSpeech MVP Roadmap

**Version**: 2.0
**Last Updated**: December 18, 2025
**Status**: ✅ **MVP COMPLETE** - Focus: Test Coverage & Production Readiness

---

## Table of Contents

1. [MVP Goals](#mvp-goals)
2. [Phase Overview](#phase-overview)
3. [Detailed Phase Breakdown](#detailed-phase-breakdown)
4. [Implementation Timeline](#implementation-timeline)
5. [Technical Dependencies](#technical-dependencies)
6. [Success Metrics](#success-metrics)

---

## MVP Goals

### Primary Hypotheses to Validate

1. **Therapist Hypothesis**: SLPs save significant time with AI-assisted report automation
2. **Patient Hypothesis**: Patients engage with structured practice when guided by therapist-linked feedback and tracking

### Target Users

- **Primary**: Speech-Language Pathologists (SLPs) specializing in stuttering therapy
- **Secondary**: Adult patients who stutter seeking structured practice support

### MVP Scope

The MVP focuses on **report automation + basic patient-facing tools** to validate both hypotheses while establishing credibility with therapists (our distribution channel).

**Launch Timeline**: 6-8 weeks for core features (Phases 1, 2, 3, 5, 7)

---

## Phase Overview

| Phase | Name                        | Status  | Priority        | Completion Date |
| ----- | --------------------------- | ------- | --------------- | --------------- |
| 1     | Foundational Setup          | ✅ 100% | HIGH            | Nov 8, 2025     |
| 2     | Automated Report Writing    | ✅ 100% | **CRITICAL** ⚡ | Oct 2025        |
| 3     | Manual Speech Annotation    | ✅ 100% | HIGH            | Dec 2025        |
| 4     | Manual Exercise Assignment  | ✅ 100% | MEDIUM          | Nov 17, 2025    |
| 5     | Practice Tracker & Progress | ✅ 100% | MEDIUM          | Oct 17, 2025    |
| 6     | Gamified Motivation         | 🔴 0%   | Post-MVP        | Deferred        |
| 7     | Therapist Portal            | ✅ 100% | MEDIUM          | Oct 17, 2025    |

**✅ MVP Status: COMPLETE** - All core phases (1-5, 7) delivered.

**Notes**:

- **Phase 3** scope: Manual annotation system (therapist/patient markup of disfluencies). Automatic AI detection is not in MVP scope.
- **Phase 4** simplified from "AI-Powered Exercise Generator" to "Manual Exercise Assignment" for MVP.
- **Phase 6** (Gamification) deferred to post-MVP based on user feedback.

---

## Detailed Phase Breakdown

### Phase 1: Foundational Setup

**Objective**: Build core architecture with authentication and role-based access control.

**Status**: ✅ **100% Complete** (November 8, 2025)

#### ✅ Completed Features

- [x] Secure authentication (Devise + JWT/Sessions)
- [x] 5-role system (owner, admin, therapist, client, member)
- [x] Role-based dashboards with permission checks
- [x] Multi-tenant architecture (row-level isolation via `tenant_id`)
- [x] User management CRUD operations
- [x] Permission system (`can_manage_all_tenants?`, `can_manage_users?`, etc.)
- [x] **Patient-Therapist Linking System** ⭐ NEW
- [x] **Invite Code System** ⭐ NEW

**Implementation Files**:

- `app-backend/app/models/user.rb`
- `app-backend/app/models/therapist_patient_assignment.rb`
- `app-backend/app/models/invite_code.rb`
- `app-backend/app/controllers/api/v1/therapist_assignments_controller.rb`
- `app-backend/app/controllers/api/v1/invites_controller.rb`
- `app-backend/app/mailers/invite_mailer.rb`
- `app-frontend/src/lib/auth.tsx`
- `app-frontend/src/lib/permissions.ts`
- `app-frontend/src/pages/MyPatientsPage.tsx` (with assignment UI)
- `app-frontend/src/components/auth/RegisterForm.tsx` (invite token support)

#### Features Completed

1. **Patient-Therapist Linking System** ✅

   - Formal assignment model tracking therapist-patient relationships
   - API endpoints: index, create, update (status), destroy
   - Frontend UI for assigning patients to therapists
   - Filtered views (therapists see only assigned patients)
   - Status management (active/inactive)

2. **Invite Code System** ✅
   - Secure token generation (SecureRandom.urlsafe_base64)
   - Email invites via InviteMailer
   - 7-day expiration with validation
   - Token validation endpoint (public)
   - SignupPage accepts invite tokens from URL
   - Auto-population of email from invite

#### User Stories

**Therapist**:

- ✅ As an SLP, I can create an account and manage my patients
- ✅ As an SLP, I can invite patients via email link
- ✅ As an SLP, I can assign patients to myself or other therapists

**Patient**:

- ✅ As a patient, I can create an account and link to my therapist
- ✅ As a patient, I can join using an invite link
- ✅ As a patient, I have a home dashboard showing my data

---

### Phase 2: Automated Report Writing ⚡

**Objective**: Validate core value proposition - AI saves therapist time on clinical documentation.

**Status**: ✅ **100% Complete**

#### ✅ Completed Features

- [x] AI-assisted report generation from audio recordings
- [x] Three report types (fluency_analysis, speech_patterns, comprehensive)
- [x] Report viewing with advanced filtering
  - Filter by: status (draft/ready), type, date range, user, recording status
  - Sort by: created date, updated date, title
  - Search by: title, user name, therapist name
- [x] Report deletion with role-based access control
- [x] Draft vs Ready status workflow
- [x] Markdown rendering of AI-generated content
- [x] Role-based report access:
  - Owners: See all reports cross-tenant
  - Admins/Therapists: See all reports in their organization
  - Clients/Members: See only their own reports
- [x] Report metadata tracking (created_at, updated_at, user, tenant)

**Implementation Files**:

- `app-backend/app/models/report.rb`
- `app-backend/app/controllers/api/v1/reports_controller.rb`
- `app-backend/app/services/markdown_processor.rb`
- `app-frontend/src/pages/ReportsPage.tsx`
- `upspeech-ai/src/report_writer/text_generator.py`

#### 🔨 Missing Features (40%)

1. **Report Editing** - **Priority: P0** ⭐

   - **What**: Allow therapists to edit AI-generated report content
   - **Why**: Core hypothesis - therapists need to refine AI output for accuracy
   - **Effort**: 1 week

   **Implementation**:

   ```ruby
   # Add to reports_controller.rb
   def update
     @report = Report.find(params[:id])
     authorize_report_update!(@report)

     if @report.update(report_params)
       render json: { report: @report }, status: :ok
     else
       render json: { errors: @report.errors }, status: :unprocessable_content
     end
   end

   private

   def report_params
     params.require(:report).permit(:title, :content, :status, :report_type)
   end
   ```

   **Frontend**:

   - Rich text editor: Use **Tiptap** (https://tiptap.dev/) or **React Quill**
   - Autosave functionality (debounced, every 3 seconds)
   - Version indicator showing last saved time

   **Files to Create**:

   - `app-frontend/src/pages/ReportEditPage.tsx`
   - `app-frontend/src/components/reports/ReportEditor.tsx`
   - `app-frontend/src/hooks/useAutoSave.ts`

   **Files to Modify**:

   - `app-backend/app/controllers/api/v1/reports_controller.rb` - Add `update` action
   - `app-frontend/src/pages/ReportsPage.tsx` - Add "Edit" button

2. **PDF Export** - **Priority: P0** ⭐

   - **What**: Generate professional clinical report PDFs
   - **Why**: Therapists need to share reports with clients, insurance, supervisors
   - **Effort**: 1 week

   **Implementation Options**:

   **Option A: Prawn (Pure Ruby)**

   ```ruby
   # Gemfile
   gem 'prawn'
   gem 'prawn-table'

   # app/services/pdf_generator_service.rb
   class PdfGeneratorService
     def initialize(report)
       @report = report
     end

     def generate
       Prawn::Document.new do |pdf|
         pdf.text @report.title, size: 24, style: :bold
         pdf.move_down 20
         pdf.text @report.content
         # Add branding, header, footer
       end
     end
   end
   ```

   **Option B: Wicked PDF (HTML to PDF)**

   ```ruby
   # Gemfile
   gem 'wicked_pdf'
   gem 'wkhtmltopdf-binary'

   # Controller action
   def export_pdf
     respond_to do |format|
       format.pdf do
         render pdf: "report_#{@report.id}",
                template: "reports/show.pdf.erb"
       end
     end
   end
   ```

   **Recommended**: **Prawn** for better control over layout and clinical formatting

   **Files to Create**:

   - `app/services/pdf_generator_service.rb`
   - `app/views/reports/_report_template.pdf.prawn` (if using view templates)

   **Files to Modify**:

   - `app-backend/app/controllers/api/v1/reports_controller.rb` - Add `export_pdf` action
   - `Gemfile` - Add prawn gem
   - `app-frontend/src/pages/ReportsPage.tsx` - Add "Export PDF" button

3. **Report Versioning** - **Priority: P2**

   - **What**: Track edit history with ability to restore previous versions
   - **Why**: Audit trail, undo major changes, compliance
   - **Effort**: 4 days

   **Implementation**:

   ```ruby
   # New Model: ReportVersion
   # Fields: report_id, version_number, content, title, created_at, created_by_user_id

   class Report < ApplicationRecord
     has_many :versions, class_name: 'ReportVersion', dependent: :destroy
     after_update :create_version

     def create_version
       versions.create(
         version_number: versions.count + 1,
         content: content_was,
         title: title_was,
         created_by_user_id: Current.user&.id
       )
     end
   end
   ```

   **Files to Create**:

   - `app/models/report_version.rb`
   - Migration: `db/migrate/YYYYMMDDHHMMSS_create_report_versions.rb`

   **Files to Modify**:

   - `app/models/report.rb` - Add versioning callbacks
   - `app-frontend/src/pages/ReportEditPage.tsx` - Add version history sidebar

4. **Report Templates** - **Priority: P3**

   - **What**: Predefined report structures (Assessment, Progress Note, Re-assessment)
   - **Why**: Consistency, compliance with clinical standards
   - **Effort**: 1 week

   **Implementation**:

   ```ruby
   # New Model: ReportTemplate
   # Fields: name, template_type, structure (jsonb), is_default, tenant_id

   class ReportTemplate < ApplicationRecord
     TYPES = %w[assessment progress_note reassessment recommendation discharge]

     belongs_to :tenant
     validates :template_type, inclusion: { in: TYPES }
   end
   ```

   **Files to Create**:

   - `app/models/report_template.rb`
   - `app/controllers/api/v1/report_templates_controller.rb`
   - `app-frontend/src/pages/ReportTemplatesPage.tsx`

5. **Smart Suggestions** - **Priority: P3** (Post-MVP)

   - **What**: AI-powered suggestions like "Add common observations", "Flag unclear sections"
   - **Why**: Guide therapists to complete reports, improve quality
   - **Effort**: 2 weeks

   **Implementation**: Requires LLM prompt engineering + UI for suggestions panel

#### User Stories

**Therapist**:

- ✅ As an SLP, I can generate a clinical report draft from session recordings
- 🔨 **As an SLP, I can edit the report before saving** ⭐
- 🔨 **As an SLP, I can export my final report as PDF** ⭐
- ✅ As an SLP, I can view previous reports for a patient
- 🔨 As an SLP, I can see report edit history and restore versions

---

### Phase 3: Manual Speech Annotation

**Objective**: Enable post-recording disfluency annotation with therapist/patient manual markup.

**Status**: ✅ **100% Complete** (December 2025)

**MVP Scope**: Manual annotation system only. Automatic AI-based disfluency detection is out of scope for MVP.

#### ✅ Completed Features

**Audio Recording & Transcription:**

- [x] Audio recording module (file upload + live recording)
- [x] Mobile-friendly recording interface with waveform visualization
- [x] AI transcription integration (Groq API)
- [x] Transcription storage with confidence scores (0.0-1.0)
- [x] Recording lifecycle: pending → processing → processed/failed
- [x] Duplicate detection via SHA256 file hashing
- [x] Multi-format support (WAV, MP3, M4A, OGG, FLAC, opus, WebM)
- [x] File metadata tracking (duration, size, type, original filename)
- [x] Async job processing with Solid Queue
- [x] Transcription display in reports with collapsible sections

**Manual Annotation System:**

- [x] DisfluencyAnnotation model (repetition, prolongation, block types)
- [x] TechniqueAnnotation model (6 speech technique types)
- [x] RecordingAnnotationPage.tsx - Full annotation UI
- [x] RecordingDetailPage.tsx - View annotations
- [x] AnnotationPanel component - Interactive annotation controls
- [x] Basic disfluency metrics (disfluency_rate calculation)
- [x] Therapist and patient annotation capabilities
- [x] Annotation CRUD operations

**Implementation Files**:

- `app-backend/app/models/audio_recording.rb`
- `app-backend/app/models/transcription.rb`
- `app-backend/app/models/disfluency_annotation.rb`
- `app-backend/app/models/technique_annotation.rb`
- `app-backend/app/jobs/transcription_processor_job.rb`
- `app-backend/app/controllers/api/v1/audio_recordings_controller.rb`
- `app-frontend/src/pages/AudioUploadPage.tsx`
- `app-frontend/src/pages/RecordingAnnotationPage.tsx`
- `app-frontend/src/pages/RecordingDetailPage.tsx`
- `app-frontend/src/components/recordings/AnnotationPanel.tsx`
- `upspeech-ai/src/report_writer/audio_transcriber.py`

#### User Stories

**Patient**:

- ✅ As a patient, I can record short speech samples
- ✅ As a patient, I can manually annotate my own disfluencies
- ✅ As a patient, I can view my annotations and track basic metrics

**Therapist**:

- ✅ As an SLP, I can review patient recordings with transcriptions
- ✅ As an SLP, I can manually annotate disfluencies (repetition, prolongation, block)
- ✅ As an SLP, I can mark speech techniques used during recordings
- ✅ As an SLP, I can view basic disfluency rate metrics

**Out of MVP Scope** (Future enhancements):

- Automatic AI-based disfluency detection
- Advanced speech metrics and trend analysis
- Context tagging (structured vs spontaneous speech)
- Disfluency prediction and recommendations

---

### Phase 4: Manual Exercise Assignment

**Objective**: Enable therapists to create and assign practice exercises to patients.

**Status**: ✅ **100% Complete** (November 29, 2025)

**MVP Scope**: Manual exercise management with MiniGame and ConsultationExercise models. AI-powered recommendations deferred to post-MVP.

#### ✅ Completed Features

- [x] Exercise library with CRUD operations
- [x] 10 exercise categories (fluency_shaping, fluency_modification, cbt, breathing, relaxation, mindfulness, speech_practice, conversation_skills, presentation, other)
- [x] Difficulty levels (1-5 scale)
- [x] Manual exercise assignment by therapists
- [x] Assignment with due dates and therapist notes
- [x] Exercise completion tracking (4 statuses: assigned, in_progress, completed, skipped)
- [x] Patient notes on completed exercises
- [x] Statistics and progress tracking
- [x] Overdue exercise detection
- [x] Completion rate metrics

**Implementation Files**:

**Backend**:

- `app-backend/app/models/exercise.rb`
- `app-backend/app/models/exercise_assignment.rb`
- `app-backend/app/controllers/api/v1/exercises_controller.rb`
- `app-backend/app/controllers/api/v1/exercise_assignments_controller.rb`
- `db/migrate/20251108130552_create_exercises.rb`
- `db/migrate/20251108130732_create_exercise_assignments.rb`

**Frontend**:

- `app-frontend/src/pages/ExerciseLibraryPage.tsx` (Therapist UI)
- `app-frontend/src/pages/MyExercisesPage.tsx` (Patient UI)
- `app-frontend/src/types/index.ts` (TypeScript types)
- `app-frontend/src/lib/api.ts` (17 API client methods)

**Routes**:

- `/dashboard/exercises` - Exercise Library (therapists only)
- `/my-exercises` - My Exercises (all users)

#### Features Completed

1. **Exercise Library Management** ✅

   - Create, read, update, delete exercises
   - Filter by category and difficulty
   - Search and pagination
   - Category dropdown with 10 options
   - Difficulty selector (1-5)
   - Rich text instructions field

2. **Exercise Assignment System** ✅

   - Assign exercises to specific patients
   - Set due dates (optional)
   - Add therapist notes (optional)
   - Track assignment status
   - View all assignments (filtered by therapist/patient)
   - Statistics dashboard

3. **Patient Exercise Interface** ✅
   - View assigned exercises
   - Filter by status (active, completed, overdue, all)
   - Mark exercises as in progress
   - Complete exercises with patient notes
   - Skip exercises
   - View exercise details and instructions
   - Statistics cards (total, completed, in progress, completion rate)
   - Overdue indicator for late exercises

#### 🔨 Pending Enhancements (Final 10%)

**Exercise Types** - **Priority: P1** ⭐ **IN PROGRESS**

- **What**: Add `exercise_type` enum with `daily` and `consultation` types
- **Why**: Differentiate regular homework from in-session activities
- **Effort**: 1-2 days

**Implementation**:

```ruby
# Exercise model changes:
enum exercise_type: { daily: 0, consultation: 1 }

# Validation for consultation exercises:
# - Must have description (presence: true)
# - Must have exactly ONE of: text OR image_url (custom validation)
```

**Frontend Updates**:

- Add type selector in create/edit forms
- Show exercise type badges in library view
- Add type filtering
- Different icons for daily vs consultation exercises

**Files to Modify**:

- `app/models/exercise.rb` - Add enum and validation
- `app-frontend/src/pages/ExerciseLibraryPage.tsx` - Type filtering
- `app-frontend/src/pages/MyExercisesPage.tsx` - Show type
- `app-frontend/src/types/exercise.ts` - Add type field

#### User Stories

**Therapist**:

- ✅ As an SLP, I can create custom exercises with instructions
- ✅ As an SLP, I can assign exercises to specific patients
- ✅ As an SLP, I can set due dates for exercises
- ✅ As an SLP, I can add notes/instructions for each assignment
- ✅ As an SLP, I can see which exercises a patient completes
- ✅ As an SLP, I can track completion rates and statistics
- 🔨 As an SLP, I can create daily homework exercises and in-session consultation exercises

**Patient**:

- ✅ As a patient, I can view all exercises assigned to me
- ✅ As a patient, I can see exercise instructions and details
- ✅ As a patient, I can mark exercises as in progress or complete
- ✅ As a patient, I can add notes about my practice
- ✅ As a patient, I can see my completion rate and statistics
- ✅ As a patient, I can see which exercises are overdue
- 🔨 As a patient, I can see which exercises are for daily practice vs in-session consultation

#### Post-MVP Enhancements (Future)

The following features will be added after launch:

- AI-powered exercise recommendations based on speech analysis
- Personalized difficulty adjustment
- Scenario-based practice (text or avatar simulation)
- Exercise effectiveness tracking
- Automated exercise suggestions based on patient progress

---

### Phase 5: Practice Tracker & Progress Dashboard

**Objective**: Visualize patient engagement and outcomes for both users.

**Status**: ✅ **100% Complete** (October 2025)

**MVP Scope**: Basic progress tracking with recording/report metrics. Advanced disfluency analytics deferred (requires automatic detection).

#### ✅ Completed Features

- [x] System-wide analytics dashboard
- [x] Growth tracking (users, recordings, reports over time)
- [x] Usage metrics (role distribution, processing statistics, storage usage)
- [x] Performance metrics (success rate, average confidence, processing time)
- [x] Time range filtering (7d, 30d, 3m, 12m, all time)
- [x] Charts and visualizations (Recharts library)
- [x] Role-based analytics:
  - Owners: Cross-tenant system analytics
  - Admins: Organization-level analytics
  - Therapists: Can access analytics (but not patient-specific yet)
- [x] Top organizations by activity (owner only)
- [x] Patient progress dashboard (PatientProgressPage.tsx)
- [x] Recording history and statistics
- [x] Activity timeline visualization
- [x] Time-based progress charts (Recharts)
- [x] Consistency score calculation

**Implementation Files**:

- `app-backend/app/controllers/api/v1/analytics_controller.rb`
- `app-backend/app/controllers/api/v1/patient_progress_controller.rb`
- `app-frontend/src/pages/AnalyticsPage.tsx`
- `app-frontend/src/pages/PatientProgressPage.tsx`

#### User Stories

**Therapist**:

- ✅ As an SLP, I can view system-wide analytics across my organization
- ✅ As an SLP, I can view individual patient progress with recording/report history
- ✅ As an SLP, I can see patient activity timelines and consistency scores

**Patient**:

- ✅ As a patient, I can visualize my practice consistency over time
- ✅ As a patient, I can see my recording history and statistics
- ✅ As a patient, I can track my progress with charts and metrics

**Out of MVP Scope** (Future enhancements):

- Advanced disfluency trend charts (requires automatic detection)
- Goal setting and milestone tracking
- Weekly email summaries for therapists
- Context-based performance analysis

---

### Phase 6: Gamified Motivation

**Objective**: Add lightweight engagement features without distracting from therapy.

**Status**: 🔴 **0% Complete** - **POST-MVP**

#### 🔨 All Features Missing (100%)

This phase will be implemented post-MVP.

**Planned Features**:

1. Daily streak tracking
2. Badges (3-day, 7-day, 30-day streaks)
3. Motivational nudges ("Great job practicing 5 days in a row!")
4. Reminders for skipped practice
5. Achievement sharing with therapist

**Estimated Effort**: 1-2 weeks

#### User Stories (Future)

**Patient**:

- As a patient, I want to receive badges when I practice regularly
- As a patient, I want to get reminders when I skip practice

---

### Phase 7: Therapist Portal Expansion

**Objective**: Consolidate therapist-facing tools for better caseload management.

**Status**: 🟢 **70% Complete**

#### ✅ Completed Features

- [x] Patient list with CRUD operations
- [x] Patient filtering/search (name, email, role, date range)
- [x] Patient statistics (total count, active count, new this month)
- [x] View all patient reports
- [x] Report filtering by patient name, therapist name, date
- [x] Report deletion capability
- [x] Role-based access control (therapists see org reports, clients see own)
- [x] Pagination support
- [x] Patient profile management (edit name, contact info)

**Implementation Files**:

- `app-frontend/src/pages/ClientsManagementPage.tsx`
- `app-frontend/src/pages/ReportsPage.tsx` (therapist view)
- `app-backend/app/controllers/api/v1/users_controller.rb`
- `app-backend/app/controllers/api/v1/reports_controller.rb`

#### 🔨 Missing Features (30%)

1. **Report Notes/Feedback System** - **Priority: P1**

   - **What**: Therapists can leave comments/feedback on specific reports
   - **Why**: Asynchronous communication, provide guidance on exercises
   - **Effort**: 3 days

   **Implementation**:

   ```ruby
   # New Model: ReportNote
   # Fields: report_id, user_id (therapist), note, visibility (private/shared_with_patient)

   class ReportNote < ApplicationRecord
     belongs_to :report
     belongs_to :user # therapist who wrote the note

     validates :visibility, inclusion: { in: %w[private shared_with_patient] }
     validates :note, presence: true
   end
   ```

   **Files to Create**:

   - `app/models/report_note.rb`
   - `app/controllers/api/v1/report_notes_controller.rb`
   - `app-frontend/src/components/reports/ReportNotes.tsx`

   **Files to Modify**:

   - `app-frontend/src/pages/ReportsPage.tsx` - Add notes section

2. **Patient Summary Export** - **Priority: P1**

   - **What**: Generate comprehensive PDF with patient progress, charts, all reports
   - **Why**: Share with supervisors, insurance companies, other clinicians
   - **Effort**: 4 days

   **Implementation**:

   ```ruby
   # app/services/patient_summary_generator.rb
   class PatientSummaryGenerator
     def initialize(patient)
       @patient = patient
     end

     def generate_pdf
       Prawn::Document.new do |pdf|
         add_header(pdf)
         add_overview(pdf)
         add_progress_charts(pdf)
         add_recent_reports(pdf)
         add_disfluency_analysis(pdf)
       end
     end
   end
   ```

   **Files to Create**:

   - `app/services/patient_summary_generator.rb`
   - `app/controllers/api/v1/patient_summaries_controller.rb`

   **Files to Modify**:

   - `app-frontend/src/pages/ClientsManagementPage.tsx` - Add "Export Summary" button

3. **Manual Report Generator (Insurance Templates)** - **Priority: P1** ⭐ **IN PROGRESS**

   - **What**: UI to generate manual reports from templates (insurance declarations, assessments)
   - **Why**: Enable therapists to quickly create insurance documentation without manual typing
   - **Effort**: 3-4 days

   **Implementation**:

   ```ruby
   # app/controllers/api/v1/manual_reports_controller.rb
   class Api::V1::ManualReportsController < ApplicationController
     # GET /api/v1/manual_reports/templates
     def templates
       render json: {
         templates: [
           {
             id: 'insurance_report',
             name: 'Insurance Declaration (PT)',
             description: 'Portuguese insurance declaration for stuttering therapy',
             fields: insurance_report_fields
           }
         ]
       }
     end

     # POST /api/v1/manual_reports/generate
     def generate
       # Calls /insurance-report endpoint in upspeech-ai
       # Saves report to database
       # Returns formatted report content
     end
   end
   ```

   **Frontend**:

   ```typescript
   // app-frontend/src/pages/ManualReportGeneratorPage.tsx
   // 3-step flow:
   // 1. Select template from available options (cards)
   // 2. Fill form with required fields (dynamic based on template)
   // 3. Preview report + export as PDF or copy to clipboard
   ```

   **Files to Create**:

   - `app/controllers/api/v1/manual_reports_controller.rb`
   - `app-frontend/src/pages/ManualReportGeneratorPage.tsx`

   **Files to Modify**:

   - `config/routes.rb` - Add manual reports routes
   - Navigation component - Add link to manual reports page

   **Existing Integration**:

   - `POST /insurance-report` endpoint already exists in upspeech-ai (line 487-519 in endpoint.py)
   - Template already defined in `src/report_writer/templates/report_templates.py`

4. **Therapist Dashboard with Quick Metrics** - **Priority: P2**

   - **What**: Dedicated dashboard showing all assigned patients with key metrics at a glance
   - **Why**: Efficient caseload management, quick identification of at-risk patients
   - **Effort**: 3 days

   **Implementation**:

   ```typescript
   // app-frontend/src/pages/TherapistDashboard.tsx
   // Shows:
   // - Patient cards with:
   //   - Last recording date
   //   - Recent disfluency trend (↑ / ↓ / →)
   //   - Adherence score (recordings per week)
   //   - Alerts (no activity in 2 weeks, significant regression)
   // - Quick actions: View progress, Send message, Assign exercise
   ```

   **Files to Create**:

   - `app-frontend/src/pages/TherapistDashboard.tsx`
   - `app-frontend/src/components/therapist/PatientCard.tsx`

#### User Stories

**Therapist**:

- ✅ As an SLP, I can see all my patients' key info in one place
- 🔨 As an SLP, I can leave feedback on patient reports
- 🔨 As an SLP, I can export patient progress summaries as PDF
- 🔨 **As an SLP, I can generate insurance reports by filling out a template form** ⭐
- 🔨 As an SLP, I have a dashboard showing patient alerts and quick metrics

---

## Implementation Timeline

### Sprint 1 (Weeks 1-2): Phase 2 Completion - Report Writing ⚡

**Focus**: Deliver core therapist value - editable reports with PDF export

**Week 1: Report Editing**

- [ ] Add `update` action to `reports_controller.rb`
- [ ] Install Tiptap or React Quill
- [ ] Build `ReportEditPage.tsx` with rich text editor
- [ ] Implement autosave (debounced)
- [ ] Add "Edit" button in ReportsPage
- [ ] Test editing workflow end-to-end

**Week 2: PDF Export**

- [ ] Add `prawn` gem to Gemfile
- [ ] Create `PdfGeneratorService`
- [ ] Design clinical report PDF template
  - Header with clinic branding
  - Patient info section
  - Report content with proper formatting
  - Footer with date, therapist signature
- [ ] Add `export_pdf` action to controller
- [ ] Add "Export PDF" button in frontend
- [ ] Test PDF generation with various report types

**Deliverables**:

- Therapists can edit AI-generated reports
- Therapists can export reports as professional PDFs
- Phase 2: 60% → 100% ✅

---

### Sprint 2 (Weeks 3-4): Phase 1 & Phase 3 Foundation

**Focus**: Enable therapist-patient relationships + start disfluency detection

**Week 3: Therapist-Patient Linking**

- [ ] Create `TherapistPatientAssignment` model + migration
- [ ] Build assignment API endpoints (POST, DELETE)
- [ ] Add assignment UI in `ClientsManagementPage.tsx`
- [ ] Update reports/analytics to filter by assigned patients
- [ ] Test assignment workflow

**Week 4: Disfluency Detection Foundation**

- [ ] Research disfluency detection approaches (acoustic + NLP)
- [ ] Create `Disfluency` model + migration
- [ ] Enhance AI service (`disfluency_detector.py`)
- [ ] Update `/generate-report/` endpoint to return disfluencies
- [ ] Store disfluencies in `TranscriptionProcessorJob`
- [ ] Display basic disfluency markers in frontend

**Deliverables**:

- Phase 1: 90% → 100% ✅
- Phase 3: 50% → 65%

---

### Sprint 3 (Weeks 5-6): Phase 3 Completion - Speech Analysis

**Focus**: Full disfluency detection, annotation, and metrics

**Week 5: Annotation Interface**

- [ ] Create `Annotation` model + migration
- [ ] Build annotation API (POST, PUT, DELETE)
- [ ] Install WaveSurfer.js for waveform visualization
- [ ] Build `AnnotationInterface.tsx` component
  - Waveform with clickable disfluency markers
  - Type selector (repetition, prolongation, block, etc.)
  - Note input for each annotation
- [ ] Add context tagging to `AudioUploadPage.tsx`
- [ ] Test annotation workflow (therapist + patient views)

**Week 6: Metrics & Insights**

- [ ] Create `DisfluencyMetric` model + migration
- [ ] Build `DisfluencyMetricsCalculator` service
- [ ] Calculate metrics after transcription processing
- [ ] Add metrics display in ReportsPage
- [ ] Create disfluency trend chart (line chart over time)
- [ ] Add context-based analysis (performance by speech type)

**Deliverables**:

- Phase 3: 65% → 100% ✅
- Patients can annotate their recordings
- Therapists can review and correct AI disfluency detection
- Disfluency metrics displayed in reports

---

### Sprint 4 (Weeks 7-8): Phase 5 & 7 - Progress & Portal

**Focus**: Patient progress visualization + therapist portal polish

**Week 7: Patient Progress Dashboard**

- [ ] Create `PatientProgressController`
- [ ] Build `PatientProgressPage.tsx`
- [ ] Add disfluency trend charts (line chart, bar chart)
- [ ] Add comparison view (current week vs baseline)
- [ ] Add context heatmap (performance by speech type)
- [ ] Test progress view for multiple patients

**Week 8: Therapist Portal Enhancements**

- [ ] Create `ReportNote` model + migration
- [ ] Build report notes API
- [ ] Add notes UI in ReportsPage
- [ ] Build `PatientSummaryGenerator` service
- [ ] Add "Export Summary" button
- [ ] Create `TherapistDashboard.tsx` with patient cards
- [ ] Add patient alerts (no activity, regression)

**Deliverables**:

- Phase 5: 40% → 90%
- Phase 7: 70% → 100% ✅
- Patients can see their progress over time
- Therapists can leave feedback on reports
- Therapists can export patient summaries

---

## MVP Launch Readiness (End of Week 8)

### Phase Completion Status

| Phase                      | Status  | Launch-Critical?            |
| -------------------------- | ------- | --------------------------- |
| Phase 1 - Foundation       | ✅ 100% | Yes                         |
| Phase 2 - Report Writing   | ✅ 100% | **YES - CORE VALUE**        |
| Phase 3 - Speech Analysis  | ✅ 100% | Yes - Differentiator        |
| Phase 4 - Exercises        | 0%      | No - Post-launch            |
| Phase 5 - Progress         | 90%     | Yes - Hypothesis validation |
| Phase 6 - Gamification     | 0%      | No - Post-launch            |
| Phase 7 - Therapist Portal | ✅ 100% | Yes                         |

**MVP Feature Completeness**: ~85%

### Post-MVP Roadmap

**Phase 4: Exercise System** (3-4 weeks post-launch)

- Based on user feedback: Do patients want structured exercises?
- Implement if therapists request assignment features

**Phase 6: Gamification** (1-2 weeks post-launch)

- Add if engagement data shows drop-off
- Implement streaks and badges

**Advanced Features** (3+ months post-launch)

- Real-time speech analysis during recording
- AI avatar for scenario practice
- Integration with clinic management systems
- Mobile apps (iOS/Android)
- Multi-language support (Portuguese priority)

---

## Technical Dependencies

### Backend Dependencies (Ruby)

```ruby
# Gemfile additions needed:
gem 'prawn'              # PDF generation
gem 'prawn-table'        # Tables in PDFs
gem 'trix'               # Rich text (alternative to frontend editor)
# gem 'wicked_pdf'       # Alternative: HTML to PDF
# gem 'wkhtmltopdf-binary'
```

### Frontend Dependencies (npm)

```json
{
  "dependencies": {
    "@tiptap/react": "^2.0.0", // Rich text editor
    "@tiptap/starter-kit": "^2.0.0", // Tiptap extensions
    "wavesurfer.js": "^7.0.0", // Audio waveform
    "recharts": "^2.10.0" // Already installed - charts
  }
}
```

### AI Service Dependencies (Python)

```txt
# requirements.txt additions:
torch>=2.0.0              # Already installed
torchaudio>=2.0.0         # Already installed
transformers>=4.40.0      # Already installed
# Consider adding:
speechbrain>=0.5.0        # Advanced speech processing
librosa>=0.10.0           # Audio feature extraction
```

### Database Schema Changes

**New Tables to Create**:

1. `therapist_patient_assignments` (Phase 1)
2. `invite_codes` (Phase 1)
3. `report_versions` (Phase 2 - P2)
4. `report_templates` (Phase 2 - P3)
5. `disfluencies` (Phase 3)
6. `annotations` (Phase 3)
7. `disfluency_metrics` (Phase 3)
8. `goals` (Phase 5)
9. `milestones` (Phase 5)
10. `report_notes` (Phase 7)

**Table Modifications**:

- `audio_recordings`: Add `context_tags`, `speech_type`, `stress_level` columns (Phase 3)

---

## Success Metrics

### Phase 2 Success Criteria (Report Writing)

**Therapist Adoption**:

- **Goal**: 80% of therapists edit at least 1 report before exporting
- **Measure**: Track `report.updated_at != report.created_at`

**Time Savings**:

- **Goal**: Average report creation time < 10 minutes (vs. 30-60 min manual)
- **Measure**: Time from upload to PDF export

**Quality**:

- **Goal**: 70% of AI-generated reports rated "Acceptable" or "Good"
- **Measure**: Optional feedback survey after report export

### Phase 3 Success Criteria (Speech Analysis)

**Annotation Engagement**:

- **Goal**: 60% of patients annotate at least 1 recording
- **Measure**: Count users with annotations

**Disfluency Detection Accuracy**:

- **Goal**: 75% precision/recall vs. therapist annotations
- **Measure**: Compare AI vs. therapist-marked disfluencies

**Insights Usefulness**:

- **Goal**: Therapists find metrics "Useful" or "Very Useful" (4-5 rating)
- **Measure**: In-app survey

### Phase 5 Success Criteria (Progress Tracking)

**Patient Engagement**:

- **Goal**: 70% of patients check progress dashboard weekly
- **Measure**: Weekly active users viewing progress page

**Motivation**:

- **Goal**: Patients with visible progress upload 2x more recordings
- **Measure**: Compare recording frequency (with progress view vs. without)

---

## Notes & Assumptions

### Assumptions

1. **AI Service Capability**: Current Groq API provides sufficient transcription quality for clinical use
2. **Disfluency Detection**: Combination of acoustic analysis + NLP can achieve 75%+ accuracy
3. **Therapist Workflow**: SLPs prefer editing reports over writing from scratch
4. **Patient Motivation**: Progress visualization increases engagement (requires validation)

### Risks

1. **AI Accuracy**: Disfluency detection may require significant tuning per user
   - Mitigation: Human-in-the-loop annotation, per-user calibration
2. **Compliance**: Clinical reports may have strict regulatory requirements
   - Mitigation: Research ICD-11, DSM-5-TR standards, add disclaimer
3. **Performance**: Real-time audio processing may strain backend
   - Mitigation: Async job queue (Solid Queue) already in place

### Open Questions

- Should we support video recordings for tension/secondary behavior analysis?
- How to handle multi-language support (Portuguese priority)?
- Integration with existing clinic EHR/EMR systems?

---

**Last Updated**: October 16, 2025
**Document Owner**: Product & Engineering Team
**Next Review**: End of Sprint 1 (Week 2)
