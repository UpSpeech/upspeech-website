# TODOS

**Last Updated**: November 5, 2025

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

| Phase | Feature | Status | Priority |
|-------|---------|--------|----------|
| Phase 2 | Automated Report Writing | ✅ 95% | CRITICAL |
| **Phase 7** | **Manual Report Generator** | 🟡 **In Progress** | **P1** |
| Phase 1 | Patient-Therapist Linking | 🔴 90% | HIGH |
| Phase 3 | Disfluency Detection & Annotation | 🟡 50% | P0 |
| Phase 5 | Progress Dashboard | ✅ 75% | MEDIUM |
| Phase 7 | Report Notes/Feedback | ✅ 100% | MEDIUM |
| Phase 7 | Patient Summary Export | ✅ 100% | MEDIUM |
| Phase 4 | Exercise Assignment | 🔴 0% | Post-MVP |

**Next Milestone**: Complete Phase 7 (Manual Reports) → Phase 3 (Disfluency) → Phase 1 (Linking) → MVP Launch
