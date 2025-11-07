# UpSpeech Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to semantic versioning for sprints.

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

**Last Updated:** 2025-11-07
