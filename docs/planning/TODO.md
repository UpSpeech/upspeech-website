# TODOS

**Last Updated**: November 8, 2025

## ✅ RECENTLY COMPLETED: Phase 1 & Phase 4 (November 8, 2025)

### Phase 1: Foundational Setup - 100% Complete ✅

**Completed**: November 8, 2025
**Priority**: HIGH - MVP Core
**Effort**: Previously 90% complete, final 10% completed today
**Status**: ✅ Complete

**What Was Completed**:

- ✅ **Patient-Therapist Linking System** - Formal assignments, filtered views, status management
- ✅ **Invite Code System** - Secure tokens, email invites, 7-day expiration, signup integration

**Key Files**:

- `app-backend/app/models/therapist_patient_assignment.rb`
- `app-backend/app/models/invite_code.rb`
- `app-backend/app/controllers/api/v1/therapist_assignments_controller.rb`
- `app-backend/app/controllers/api/v1/invites_controller.rb`
- `app-backend/app/mailers/invite_mailer.rb`
- `app-frontend/src/pages/MyPatientsPage.tsx`
- `app-frontend/src/components/auth/RegisterForm.tsx`

### Phase 4: Manual Exercise Assignment - 90% Complete 🟡

**Completed**: November 8, 2025
**Priority**: MEDIUM - MVP Enhancement
**Effort**: 2 days
**Status**: 🟡 Needs Enhancement

**What Was Built**:

- ✅ Exercise library with 10 categories (fluency_shaping, cbt, breathing, etc.)
- ✅ Exercise CRUD for therapists
- ✅ Manual assignment system with due dates and notes
- ✅ Patient exercise interface with completion tracking
- ✅ 4 statuses: assigned, in_progress, completed, skipped
- ✅ Statistics dashboard (completion rates, overdue detection)
- ✅ 2 UI pages (ExerciseLibraryPage, MyExercisesPage)
- ✅ 17 API client methods
- ✅ Full TypeScript types

**Pending Enhancements**:

- [ ] **Exercise Types**: Add 2 types - `daily` and `consultation`
  - Daily exercises: Regular homework/practice exercises
  - Consultation exercises: In-session activities with therapist
- [ ] **Consultation Exercise Requirements**:
  - Must have ONE of: `text` OR `image_url` (not both, not neither)
  - Must have `description` field (required)
  - Validation: Ensure consultation exercises meet these requirements
- [ ] **UI Updates**:
  - Add type selector in exercise creation/edit forms
  - Show exercise type in library view
  - Filter exercises by type
  - Different icons/badges for daily vs consultation exercises

**Key Files**:

- `app-backend/app/models/exercise.rb` - Add `exercise_type` enum and validation
- `app-backend/app/models/exercise_assignment.rb`
- `app-backend/app/controllers/api/v1/exercises_controller.rb`
- `app-backend/app/controllers/api/v1/exercise_assignments_controller.rb`
- `app-frontend/src/pages/ExerciseLibraryPage.tsx` - Add type filtering
- `app-frontend/src/pages/MyExercisesPage.tsx` - Show exercise type
- `app-frontend/src/types/exercise.ts` - Add `exercise_type` field

**Routes**:

- `/dashboard/exercises` - Exercise Library (therapists)
- `/my-exercises` - My Exercises (patients)

**Technical Requirements**:

```ruby
# Exercise model changes needed:
# - Add exercise_type: enum [:daily, :consultation]
# - Add validation for consultation exercises:
#   - Must have description (presence: true)
#   - Must have exactly one of text OR image_url (custom validation)
```

**Note**: AI-powered exercise recommendations deferred to post-MVP.

---

## ✅ PREVIOUSLY COMPLETED: Tenant Theming & Multi-Template System

**Completed**: November 8, 2025
**Priority**: P1 (High) - Multi-tenant SaaS requirement
**Effort**: 2 days
**Status**: ✅ Complete

### What Was Built

Implemented a comprehensive **tenant customization system** that allows each organization to brand their reports with custom:

- Logos, colors, fonts
- Contact information
- Languages (en, pt, es, fr, de)
- Complete custom templates (for organizations with unique requirements)

### Key Features

1. **Dynamic Theming System**
   - Tenants can configure branding without code changes
   - CSS variable-based theming (colors apply in real-time)
   - Admin UI at `/dashboard/tenant` for owner/admin users
   - External logo URLs (no file uploads needed)

2. **Tenant-Specific Templates**
   - Two-tier template selection: report type + tenant preference
   - Example: SpeechCare Portuguese template with custom branding
   - Easy to add new tenant-specific templates

3. **Multi-Language Support**
   - Frontend (i18next) + Backend (Rails I18n)
   - Currently: English, Portuguese
   - Ready for: Spanish, French, German

4. **Admin Configuration**
   - Organization settings (name, slug)
   - Branding (logo URL, primary/accent colors, template type)
   - Contact info (email, phone, website, custom footer text)
   - Language preference

### Technical Implementation

#### Backend

- `TenantSettingsController` - API for tenant theming configuration
- 8 new tenant columns: `logo_url`, `primary_color`, `accent_color`, `language`, `contact_email`, `contact_phone`, `website`, `footer_text`, `report_template_type`
- Rails I18n with `config/locales/pt.yml` for Portuguese
- Updated `ReportsController` to include tenant theme in JSON
- PDF templates use tenant theming variables

#### Frontend

- `TenantSettingsPage.tsx` - Admin UI with color pickers, dropdowns
- `SpeechCarePortugueseTemplate.tsx` - Example tenant-specific template
- `reportTemplateUtils.ts` - Tenant-based template selection logic
- `BaseReportTemplate.tsx` - Dynamic CSS theming support
- i18next configuration with `en.json` and `pt.json`
- TypeScript types updated with theme fields

#### Documentation

- **NEW**: `I18N_TRANSLATIONS.md` - Complete guide to translation system
- **UPDATED**: `REPORT_TEMPLATES.md` - Added tenant theming, template selection, examples

### Routes & Permissions

- `GET /api/v1/tenant/settings` - Fetch tenant settings (owner/admin)
- `PATCH /api/v1/tenant/settings` - Update tenant settings (owner/admin)
- Frontend route: `/dashboard/tenant` (already existed)

### Testing Needed

- [ ] Test SpeechCare template rendering with all report types
- [ ] Test PDF export with custom branding
- [ ] Test dynamic color changes in real-time
- [ ] Test all language combinations
- [ ] Cross-browser testing (Chrome, Firefox, Safari)

### Documentation Created

- ✅ `docs/architecture/I18N_TRANSLATIONS.md` - Translation system guide
- ✅ `docs/architecture/REPORT_TEMPLATES.md` - Updated with theming docs
- [ ] `docs/README.md` - Add references to new docs

---

## Current Sprint Priority

### 🚀 IN PROGRESS: Manual Report Generator (Phase 7)

**Priority**: P1 (High) - Enables insurance workflows
**Effort**: 3-4 days
**Status**: 🟡 In Progress

#### Implementation Tasks

- [ ] Backend: Create `ManualReportsController` with `/templates` and `/generate` endpoints
- [ ] Backend: Add API routes for manual reports
- [ ] Backend: Integrate with `/insurance-report` endpoint in upspeech-ai
- [ ] Frontend: Create `ManualReportGeneratorPage.tsx` with 3-step flow (select → fill → preview)
- [ ] Frontend: Add navigation link for therapists
- [ ] Test: End-to-end workflow with insurance report template
- [ ] Test: PDF export functionality

#### User Story

As a therapist, I want to generate manual insurance reports by selecting a template, filling in patient/session details, and exporting as PDF, so I can quickly create documentation for insurance providers without manual typing.

#### Technical Details

**Backend Endpoints**:

- `GET /api/v1/manual_reports/templates` - List available templates
- `POST /api/v1/manual_reports/generate` - Generate report from template + fields

**Frontend Page**: `/manual-reports`

**Existing AI Endpoint**: `POST /insurance-report` (upspeech-ai) - Already implemented

---

## Next Up: Phase 3 - Disfluency Annotation

**Priority**: P0 (Critical) - MVP Core Feature
**Effort**: 2-3 weeks
**Status**: 🟡 50% Complete

### Tasks

- [ ] **Disfluency Detection AI** (2 weeks)
  - Create `Disfluency` model (timestamp_start, timestamp_end, disfluency_type, confidence)
  - Build `disfluency_detector.py` in upspeech-ai
  - Integrate acoustic analysis + NLP for detection
  - Store disfluencies in `TranscriptionProcessorJob`

- [ ] **Annotation Interface** (1 week)
  - Create `Annotation` model for user corrections/notes
  - Build annotation API endpoints (CRUD)
  - Install WaveSurfer.js for waveform visualization
  - Create `AnnotationInterface.tsx` component
    - Clickable disfluency markers on waveform
    - Type classifier (repetition, block, prolongation)
    - Notes input per annotation
  - Add context tagging (structured/spontaneous speech, stress level)

- [ ] **Disfluency Metrics** (3 days)
  - Create `DisfluencyMetric` model
  - Calculate frequency (disfluencies per minute)
  - Calculate type distribution
  - Display in progress dashboard

### User Stories

**Patient**:

- As a patient, I can record speech samples and see AI-detected disfluencies
- As a patient, I can listen again and mark/correct stuttering moments
- As a patient, I can classify each stutter as repetition, block, or prolongation
- As a patient, I can add notes to my recordings

**Therapist**:

- As a therapist, I can review patient recordings with AI-detected disfluencies
- As a therapist, I can correct AI detection and add annotations
- As a therapist, I can view disfluency metrics and trends over time

---

## Backlog: Phase 4 - Exercise Assignment System

**Priority**: LOW (Post-MVP)
**Effort**: 3-4 weeks
**Status**: 🔴 Not started

This will be implemented post-launch based on user feedback.

### Planned Features

- Exercise library in database
- Exercise assignment by therapists (duration, frequency)
- Audio/video recording for exercise completion
- Transcript storage
- Exercise completion tracking in patient profile

---

## Phase Completion Status

| Phase       | Feature                           | Status                   | Priority   |
| ----------- | --------------------------------- | ------------------------ | ---------- |
| Phase 2     | Automated Report Writing          | ✅ 100%                  | CRITICAL   |
| **Phase 4** | **Manual Exercise Assignment**    | 🟡 **90% - In Progress** | **MEDIUM** |
| **Phase 7** | **Manual Report Generator**       | 🟡 **In Progress**       | **P1**     |
| Phase 1     | Patient-Therapist Linking         | ✅ 100%                  | HIGH       |
| Phase 3     | Disfluency Detection & Annotation | 🟡 50%                   | P0         |
| Phase 5     | Progress Dashboard                | ✅ 75%                   | MEDIUM     |
| Phase 7     | Report Notes/Feedback             | ✅ 100%                  | MEDIUM     |
| Phase 7     | Patient Summary Export            | ✅ 100%                  | MEDIUM     |

**Next Milestone**: Complete Phase 4 (Exercise Types) → Phase 3 (Disfluency) → MVP Launch
