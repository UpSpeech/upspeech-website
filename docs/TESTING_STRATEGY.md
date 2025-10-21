# Testing Strategy & Coverage Plan

**Last Updated**: October 21, 2025
**Status**: Active - Continuous Improvement

## Executive Summary

UpSpeech has a **solid backend testing foundation (188 tests)** but **limited frontend coverage**. This document outlines the current testing status, identifies gaps, and provides a prioritized roadmap for achieving 80%+ test coverage across the entire application.

**Key Metrics:**
- **Backend**: ~188 test examples, good model/controller coverage, missing service tests
- **Frontend**: ~177 test cases, but only 15-20% feature coverage
- **Target**: 80% overall coverage, 95% for critical paths

---

## Current Testing Infrastructure

### Backend (Rails + RSpec)

**Framework**: RSpec 3 with FactoryBot, DatabaseCleaner, Faker

**Test Files**: 18 files, 2,293 lines of test code

**Coverage by Type:**
```
Models:       115 tests ✅ (strong)
Controllers:   68 tests ✅ (good)
Jobs:          16 tests ✅ (complete)
Services:       0 tests ❌ (missing)
Policies:       0 tests ❌ (missing)
Mailers:        0 tests ❌ (missing)
Total:        188 tests
```

**Strengths:**
- Multi-tenancy thoroughly tested (tenant isolation, cross-tenant access prevention)
- RBAC (5-role system) comprehensively tested
- API endpoints well covered with permission checks
- Background job processing tested (success/failure scenarios)
- Good factory patterns for test data generation

**Gaps:**
1. ❌ **Services** - No tests for `PatientSummaryGenerator`, future services
2. ❌ **ReportNote Model** - Test file exists but only has pending placeholder
3. ❌ **Pundit Policies** - Authorization policies not explicitly tested
4. ❌ **Mailers** - No mailer tests (if any exist)
5. ⚠️ **Coverage Reporting** - SimpleCov not configured

---

### Frontend (React + Vitest)

**Framework**: Vitest 3.2.4 with @testing-library/react, jsdom

**Test Files**: 6 files, ~177 test cases

**Coverage by Type:**
```
Utilities:     42 tests ✅ (permissions.test.ts - excellent)
Components:    26 tests ⚠️ (limited to dashboards, LanguageSwitcher)
Pages:         15 tests ⚠️ (only TherapistDashboardPage tested)
Hooks:          0 tests ❌ (missing)
Total:        ~177 tests (15-20% of codebase)
```

**Strengths:**
- Permission logic comprehensively tested (42 test cases)
- Dashboard components have basic tests
- Good mocking infrastructure in place
- Vitest UI available for interactive testing
- Coverage reporting configured (@vitest/coverage-v8)

**Gaps:**
1. ❌ **Core Feature Pages** - ReportsPage, ReportViewPage, ReportEditPage (Tiptap), AudioUploadPage
2. ❌ **Management Pages** - AnalyticsPage, ClientsManagementPage, PatientProgressPage
3. ❌ **Key Components** - ReportNotes, audio recording components, analytics charts
4. ❌ **Custom Hooks** - useAuth, useDebounce, useLocalStorage (if any)
5. ❌ **Utilities** - API client helpers, formatters, validators
6. ⚠️ **Integration Tests** - Limited full-flow testing

---

## Priority 1: Critical Missing Tests

### Backend Critical Tests

#### 1. ReportNote Model Tests (HIGH PRIORITY)
**File**: `app-backend/spec/models/report_note_spec.rb`
**Status**: Pending placeholder exists
**Why**: Recently added feature (Sprint 2), core therapist portal functionality

**Required Tests:**
```ruby
RSpec.describe ReportNote, type: :model do
  describe 'validations' do
    it { should validate_presence_of(:note) }
    it { should validate_presence_of(:visibility) }
    it { should validate_inclusion_of(:visibility).in_array(['therapist_only', 'shared_with_patient']) }
  end

  describe 'associations' do
    it { should belong_to(:report) }
    it { should belong_to(:user) }
    it { should belong_to(:tenant) }
  end

  describe 'scopes' do
    it 'filters by tenant_id for multi-tenancy'
    it 'filters visible_to_patient notes'
    it 'filters therapist_only notes'
  end

  describe 'permissions' do
    it 'allows therapist to create notes'
    it 'prevents client from creating notes'
    it 'shows shared notes to patients'
    it 'hides therapist_only notes from patients'
  end
end
```

**Estimated Time**: 1-2 hours

---

#### 2. PatientSummaryGenerator Service Tests (HIGH PRIORITY)
**File**: `app-backend/spec/services/patient_summary_generator_spec.rb` (CREATE NEW)
**Status**: Service exists, no tests
**Why**: Core therapist portal feature, complex data aggregation logic

**Required Tests:**
```ruby
RSpec.describe PatientSummaryGenerator do
  let(:tenant) { create(:tenant) }
  let(:patient) { create(:user, :client, tenant: tenant) }
  let(:service) { described_class.new(patient) }

  describe '#generate' do
    context 'with complete patient data' do
      before do
        create_list(:audio_recording, 5, user: patient, tenant: tenant)
        create_list(:report, 3, user: patient, tenant: tenant)
      end

      it 'returns structured patient summary'
      it 'includes patient demographics'
      it 'aggregates recording statistics'
      it 'aggregates report statistics'
      it 'calculates progress metrics'
      it 'includes recent activity timeline'
    end

    context 'with missing data' do
      it 'handles patient with no recordings gracefully'
      it 'handles patient with no reports gracefully'
      it 'handles patient with no recent activity'
    end

    context 'with edge cases' do
      it 'handles deleted recordings'
      it 'handles draft reports vs ready reports'
      it 'respects tenant boundaries'
    end
  end

  describe '#to_html' do
    it 'generates valid HTML output'
    it 'includes all summary sections'
    it 'applies clinical styling'
  end
end
```

**Estimated Time**: 2-3 hours

---

#### 3. Report Notes Controller Tests (MEDIUM PRIORITY)
**File**: `app-backend/spec/requests/api/v1/report_notes_controller_spec.rb` (CREATE NEW)
**Status**: Controller exists, no tests
**Why**: API endpoints need RBAC and multi-tenancy verification

**Required Tests:**
```ruby
RSpec.describe "Api::V1::ReportNotesController", type: :request do
  let(:tenant) { create(:tenant) }
  let(:therapist) { create(:user, :therapist, tenant: tenant) }
  let(:client) { create(:user, :client, tenant: tenant) }
  let(:report) { create(:report, user: client, tenant: tenant) }

  describe "GET /api/v1/reports/:report_id/notes" do
    context "as therapist" do
      it "returns all notes including therapist_only"
    end

    context "as client" do
      it "returns only shared_with_patient notes"
      it "filters out therapist_only notes"
    end
  end

  describe "POST /api/v1/reports/:report_id/notes" do
    context "as therapist" do
      it "creates note with therapist_only visibility"
      it "creates note with shared_with_patient visibility"
    end

    context "as client" do
      it "returns 403 forbidden"
    end
  end

  describe "PATCH /api/v1/reports/:report_id/notes/:id" do
    it "allows therapist to update own notes"
    it "prevents updating other therapist's notes"
    it "prevents client from updating notes"
  end

  describe "DELETE /api/v1/reports/:report_id/notes/:id" do
    it "allows therapist to delete own notes"
    it "prevents deleting other therapist's notes"
  end
end
```

**Estimated Time**: 2-3 hours

---

### Frontend Critical Tests

#### 1. ReportsPage Tests (HIGH PRIORITY)
**File**: `app-frontend/src/pages/ReportsPage.test.tsx` (CREATE NEW)
**Status**: Page exists, no tests
**Why**: Core feature page, filtering/sorting/pagination logic

**Required Tests:**
```typescript
describe('ReportsPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('initial render', () => {
    it('fetches and displays reports on mount');
    it('displays loading state while fetching');
    it('displays error message on API failure');
    it('displays empty state when no reports exist');
  });

  describe('filtering', () => {
    it('filters by status (draft, ready)');
    it('filters by report_type');
    it('clears filters on reset button click');
    it('updates URL params with active filters');
  });

  describe('sorting', () => {
    it('sorts by date (newest first, oldest first)');
    it('sorts by title (A-Z, Z-A)');
  });

  describe('pagination', () => {
    it('displays pagination controls when results exceed page size');
    it('navigates to next page');
    it('navigates to previous page');
    it('updates page number in URL');
  });

  describe('report actions', () => {
    it('navigates to report view on card click');
    it('displays report metadata (date, status, type)');
  });

  describe('permissions', () => {
    it('shows all tenant reports for therapist');
    it('shows only own reports for client');
  });
});
```

**Estimated Time**: 3-4 hours

---

#### 2. ReportViewPage Tests (HIGH PRIORITY)
**File**: `app-frontend/src/pages/ReportViewPage.test.tsx` (CREATE NEW)
**Status**: Page exists with ReportNotes integration, no tests
**Why**: Core feature with complex interactions (notes, export, edit)

**Required Tests:**
```typescript
describe('ReportViewPage', () => {
  describe('report display', () => {
    it('fetches and displays report content');
    it('renders report HTML content correctly');
    it('displays report metadata (title, date, status, type)');
    it('shows loading state while fetching');
    it('handles 404 for non-existent report');
  });

  describe('report notes', () => {
    it('renders ReportNotes component');
    it('passes correct reportId to notes component');
  });

  describe('actions', () => {
    it('navigates to edit page on edit button click');
    it('exports report as PDF');
    it('displays back button to return to reports list');
  });

  describe('permissions', () => {
    it('shows edit button only for therapists');
    it('hides edit button for clients');
    it('shows therapist_only notes only to therapists');
    it('shows shared notes to clients');
  });
});
```

**Estimated Time**: 2-3 hours

---

#### 3. AudioUploadPage Tests (HIGH PRIORITY)
**File**: `app-frontend/src/pages/AudioUploadPage.test.tsx` (CREATE NEW)
**Status**: Page exists, no tests
**Why**: Critical user flow, file upload/recording logic

**Required Tests:**
```typescript
describe('AudioUploadPage', () => {
  describe('file upload', () => {
    it('displays file input for audio upload');
    it('validates file type (audio only)');
    it('validates file size (max 50MB)');
    it('shows upload progress');
    it('displays success message on upload complete');
    it('handles upload errors');
  });

  describe('audio recording', () => {
    it('requests microphone permission');
    it('displays recording controls (start, stop, pause)');
    it('shows recording duration');
    it('allows playback of recorded audio');
    it('submits recording on confirm');
  });

  describe('metadata', () => {
    it('allows entering recording title');
    it('allows entering recording description');
    it('validates required fields before submit');
  });

  describe('navigation', () => {
    it('redirects to processing status page after upload');
    it('shows cancel button to return to previous page');
  });
});
```

**Estimated Time**: 4-5 hours (complex interactions)

---

#### 4. ReportNotes Component Tests (MEDIUM PRIORITY)
**File**: `app-frontend/src/components/ReportNotes.test.tsx` (CREATE NEW)
**Status**: Component exists, no tests
**Why**: New feature (Sprint 2), therapist portal core functionality

**Required Tests:**
```typescript
describe('ReportNotes', () => {
  describe('display notes', () => {
    it('fetches and displays existing notes');
    it('groups notes by visibility (therapist_only, shared)');
    it('displays note author and timestamp');
    it('shows loading state while fetching');
  });

  describe('create note', () => {
    it('displays create note form');
    it('allows selecting visibility (therapist_only, shared_with_patient)');
    it('submits new note on button click');
    it('clears form after successful creation');
    it('displays validation errors');
  });

  describe('edit note', () => {
    it('allows editing own notes');
    it('updates note on save');
    it('cancels edit on cancel button');
  });

  describe('delete note', () => {
    it('shows delete button for own notes');
    it('confirms before deleting');
    it('removes note from list after deletion');
  });

  describe('permissions', () => {
    it('shows create form only for therapists');
    it('hides therapist_only notes from clients');
    it('shows shared notes to clients');
  });
});
```

**Estimated Time**: 2-3 hours

---

## Priority 2: Medium Priority Tests

### Backend Medium Priority

1. **Patient Progress Controller Tests** (`spec/requests/api/v1/patient_progress_controller_spec.rb`)
   - Time range filtering
   - Statistics accuracy
   - Activity timeline aggregation
   - Multi-tenancy enforcement
   - **Estimated Time**: 2-3 hours

2. **Patient Summaries Controller Tests** (`spec/requests/api/v1/patient_summaries_controller_spec.rb`)
   - Export endpoint authorization
   - HTML generation
   - Data aggregation
   - **Estimated Time**: 1-2 hours

3. **Pundit Policy Tests** (`spec/policies/` - if policies exist)
   - Authorization rules per model
   - Role-based access control
   - **Estimated Time**: 2-3 hours per policy

---

### Frontend Medium Priority

1. **PatientProgressPage Tests** (`src/pages/PatientProgressPage.test.tsx`)
   - Chart rendering (recharts)
   - Time range filtering
   - Statistics display
   - **Estimated Time**: 3-4 hours

2. **ClientsManagementPage Tests** (`src/pages/ClientsManagementPage.test.tsx`)
   - Patient list display
   - Search/filter functionality
   - Patient actions (view progress, export summary)
   - **Estimated Time**: 3-4 hours

3. **AnalyticsPage Tests** (`src/pages/AnalyticsPage.test.tsx`)
   - Metrics display
   - Chart rendering
   - Time range filtering
   - **Estimated Time**: 2-3 hours

---

## Priority 3: Lower Priority Tests

### Backend Lower Priority

1. **Edge case tests** for existing models
2. **Concurrent access tests** (race conditions)
3. **Performance tests** (N+1 queries, slow endpoints)
4. **Mailer tests** (when mailers are added)

---

### Frontend Lower Priority

1. **Component library tests** (buttons, inputs, modals)
2. **Utility function tests** (formatters, validators)
3. **Custom hook tests** (useAuth variations, useDebounce)
4. **E2E tests** (Playwright/Cypress) for critical user flows

---

## Coverage Improvement Roadmap

### Phase 1: Critical Backend Tests (Week 1)
**Goal**: Close backend service/model gaps
**Estimated Time**: 8-10 hours

1. ✅ ReportNote model tests (1-2 hours)
2. ✅ PatientSummaryGenerator service tests (2-3 hours)
3. ✅ ReportNotes controller tests (2-3 hours)
4. ✅ Patient Progress/Summaries controller tests (3-4 hours)

**Deliverables:**
- All services tested
- ReportNote model fully tested
- New API endpoints tested
- Backend coverage: ~85-90%

---

### Phase 2: Critical Frontend Tests (Week 2)
**Goal**: Cover core feature pages
**Estimated Time**: 12-15 hours

1. ✅ ReportsPage tests (3-4 hours)
2. ✅ ReportViewPage tests (2-3 hours)
3. ✅ AudioUploadPage tests (4-5 hours)
4. ✅ ReportNotes component tests (2-3 hours)

**Deliverables:**
- Core user flows tested
- Critical components tested
- Frontend coverage: ~40-50%

---

### Phase 3: Management Pages (Week 3)
**Goal**: Cover therapist portal features
**Estimated Time**: 10-12 hours

1. ✅ PatientProgressPage tests (3-4 hours)
2. ✅ ClientsManagementPage tests (3-4 hours)
3. ✅ AnalyticsPage tests (2-3 hours)
4. ✅ Additional component tests (2-3 hours)

**Deliverables:**
- Management pages tested
- Frontend coverage: ~60-70%

---

### Phase 4: Coverage Refinement (Ongoing)
**Goal**: Reach 80%+ coverage
**Estimated Time**: Continuous

1. Add tests for new features as developed
2. Improve edge case coverage
3. Add integration tests
4. Configure coverage reporting (SimpleCov for backend)

**Deliverables:**
- Backend coverage: 90%+
- Frontend coverage: 80%+
- Coverage reports integrated into CI/CD

---

## Testing Best Practices Checklist

### Backend (RSpec)
- [x] Use FactoryBot for test data (avoid manual `create` calls)
- [x] Test multi-tenancy isolation for all models/controllers
- [x] Test RBAC for all API endpoints (all 5 roles)
- [ ] Add SimpleCov for coverage reporting
- [x] Use DatabaseCleaner for transaction-based cleanup
- [ ] Test services separately from controllers
- [ ] Mock external API calls (AI service, etc.)

### Frontend (Vitest)
- [x] Use @testing-library/react for component tests
- [x] Use @testing-library/user-event for interactions
- [x] Mock API calls with vi.hoisted()
- [x] Clear mocks between tests (vi.clearAllMocks())
- [ ] Test loading states
- [ ] Test error states
- [ ] Test empty states
- [ ] Use waitFor() for async assertions
- [ ] Test accessibility (aria labels, roles)

---

## Coverage Reporting Setup

### Backend: Add SimpleCov

**Add to Gemfile (test group):**
```ruby
group :test do
  gem 'simplecov', require: false
  gem 'simplecov-json', require: false
end
```

**Add to spec/spec_helper.rb (top of file):**
```ruby
require 'simplecov'
SimpleCov.start 'rails' do
  add_filter '/spec/'
  add_filter '/config/'
  add_filter '/vendor/'

  add_group 'Models', 'app/models'
  add_group 'Controllers', 'app/controllers'
  add_group 'Services', 'app/services'
  add_group 'Jobs', 'app/jobs'

  minimum_coverage 80
  minimum_coverage_by_file 60
end
```

**Run with coverage:**
```bash
COVERAGE=true bundle exec rspec
open coverage/index.html
```

---

### Frontend: Already Configured

**Run coverage:**
```bash
npm run test -- --coverage
open coverage/index.html
```

**View coverage summary:**
```bash
npm run test -- --coverage --reporter=verbose
```

---

## Continuous Integration

**Add to CI pipeline (.github/workflows/test.yml):**

```yaml
name: Test Suite

on: [push, pull_request]

jobs:
  backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run backend tests
        run: |
          cd app-backend
          bundle install
          COVERAGE=true bundle exec rspec
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: app-backend/coverage/coverage.json

  frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run frontend tests
        run: |
          cd app-frontend
          npm ci
          npm run test -- --coverage
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: app-frontend/coverage/coverage-final.json
```

---

## Success Metrics

**Short-term (4 weeks):**
- ✅ All critical backend gaps closed (ReportNote, services)
- ✅ Core frontend pages tested (Reports, Audio, Progress)
- ✅ Coverage reporting configured
- Target: 70% overall coverage

**Mid-term (8 weeks):**
- ✅ All management pages tested
- ✅ Component library tested
- ✅ CI/CD integration complete
- Target: 80% overall coverage

**Long-term (Ongoing):**
- ✅ 90%+ backend coverage
- ✅ 80%+ frontend coverage
- ✅ E2E tests for critical flows
- ✅ Performance/load testing
- Target: 85%+ overall coverage, zero untested critical paths

---

## Appendix: Test File Inventory

### Backend Test Files (18)
```
spec/
├── models/
│   ├── user_spec.rb (31 tests) ✅
│   ├── report_spec.rb (22 tests) ✅
│   ├── audio_recording_spec.rb (20 tests) ✅
│   ├── tenant_spec.rb (18 tests) ✅
│   ├── transcription_spec.rb (13 tests) ✅
│   └── report_note_spec.rb (1 pending) ❌
├── requests/api/v1/
│   ├── reports_controller_spec.rb (21 tests) ✅
│   ├── analytics_controller_spec.rb (18 tests) ✅
│   ├── filtering_integration_spec.rb (29 tests) ✅
│   ├── report_notes_controller_spec.rb ❌ MISSING
│   ├── patient_progress_controller_spec.rb ❌ MISSING
│   └── patient_summaries_controller_spec.rb ❌ MISSING
├── jobs/
│   └── transcription_processor_job_spec.rb (16 tests) ✅
├── services/
│   └── patient_summary_generator_spec.rb ❌ MISSING
└── spec_helper.rb, rails_helper.rb ✅
```

### Frontend Test Files (6)
```
src/
├── lib/
│   └── permissions.test.ts (42 tests) ✅
├── components/
│   ├── LanguageSwitcher.test.tsx (5 tests) ✅
│   ├── dashboards/
│   │   ├── AdminDashboard.test.tsx (10 tests) ✅
│   │   ├── TherapistDashboard.test.tsx (4 tests) ✅
│   │   └── ClientDashboard.test.tsx (7 tests) ✅
│   └── ReportNotes.test.tsx ❌ MISSING
├── pages/
│   ├── TherapistDashboardPage.test.tsx (15 tests) ✅
│   ├── ReportsPage.test.tsx ❌ MISSING
│   ├── ReportViewPage.test.tsx ❌ MISSING
│   ├── AudioUploadPage.test.tsx ❌ MISSING
│   ├── AnalyticsPage.test.tsx ❌ MISSING
│   ├── ClientsManagementPage.test.tsx ❌ MISSING
│   └── PatientProgressPage.test.tsx ❌ MISSING
└── test/
    ├── setup.ts ✅
    └── mocks.ts ✅
```

---

**Document Owner**: Development Team
**Review Cadence**: Monthly
**Next Review**: November 21, 2025
