# Testing Strategy & Coverage Plan

**Last Updated**: 2025-11-07
**Status**: Active - Phase 1 Testing Roadmap Defined

## Executive Summary

UpSpeech has a **solid backend testing foundation (188 tests, 35.59% coverage with SimpleCov)** but **limited frontend coverage**. This document outlines the current testing status, identifies gaps from the newly implemented Phase 1 features (therapist-patient linking + invite system), and provides a prioritized 5-phase testing roadmap for achieving 80%+ test coverage.

**Key Metrics:**

- **Backend**: 188 test examples, **35.59% coverage (SimpleCov configured)** ✅, missing Phase 1 feature tests
- **Frontend**: ~177 test cases, but only 15-20% feature coverage, missing Phase 1 UI tests
- **Target**: 80% overall coverage, 95% for critical paths
- **Phase 1 Testing Gap**: ~21 hours of testing needed for new features (see Phase 1 Implementation Testing Plan below)

---

## Testing Philosophy & Workflow

UpSpeech aims for **sturdy, production-ready code**. All new features and bug fixes MUST include relevant tests.

### Core Principles

**Quality over quantity:**

- Write **meaningful tests** that verify actual behavior, not just mocks
- Avoid excessive mocking that makes tests pass without validating real functionality
- Test edge cases, error scenarios, and happy paths
- Focus on integration and behavior testing over implementation details

**Required Test Coverage:**

- **Backend**: All new models, controllers, services, and jobs MUST have tests
- **Frontend**: All new pages, components (especially with business logic), and utilities MUST have tests
- **Aim for 80%+ code coverage** across both frontend and backend

### When to Write Tests

**ALWAYS write tests for:**

1. **New features** - Write tests alongside implementation (TDD encouraged)
2. **Bug fixes** - Write a failing test first, then fix the bug
3. **Refactoring** - Ensure existing tests pass, add tests for new edge cases
4. **API endpoints** - Test all CRUD operations and permissions
5. **Business logic** - Services, utilities, calculations
6. **User interactions** - Forms, buttons, navigation

**Testing workflow:**

1. **Before coding**: Write failing test (TDD approach)
2. **During coding**: Implement feature until test passes
3. **After coding**: Add edge case tests, verify coverage
4. **Before commit**: Run full test suite
5. **Before PR**: Ensure all tests pass, coverage meets targets

### Running Tests

**Backend (RSpec):**

```bash
bundle exec rspec                    # Run all tests
bundle exec rspec spec/models/       # Run specific folder
COVERAGE=true bundle exec rspec      # Run with coverage
```

**Frontend (Vitest):**

```bash
npm run test              # Run all tests
npm run test -- --watch   # Watch mode
npm run test:ui           # UI dashboard
npm run test:coverage     # With coverage
```

**Storybook Interaction Tests:**

```bash
npm run storybook         # Start Storybook dev server (port 6006)
npm run test:storybook    # Run Storybook interaction tests (requires Storybook running)
npm run test:storybook:ci # Run in CI mode (builds Storybook first)
```

### Coverage Requirements

**Check coverage regularly:**

```bash
# Backend
COVERAGE=true bundle exec rspec

# Frontend
npm run test -- --coverage
```

**Minimum coverage targets:**

- **Overall**: 80%
- **Critical paths**: 95% (auth, permissions, payment flows)
- **New features**: 100% (all new code must have tests)

For detailed testing guidelines, examples, and specific test requirements, see the sections below.

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
- **SimpleCov coverage reporting configured** ✅ (35.59% baseline established)

**Gaps:**

1. ❌ **Phase 1 Models** - `TherapistPatientAssignment`, `InviteCode` (pending stubs only)
2. ❌ **Phase 1 Controllers** - `TherapistAssignmentsController`, `InvitesController` (no tests)
3. ❌ **Phase 1 Mailers** - `InviteMailer` (no tests)
4. ❌ **Phase 1 Auth** - `RegistrationsController` invite token functionality (not tested)
5. ❌ **Services** - No tests for `PatientSummaryGenerator`, `AudioAnalyzerService`, etc.
6. ❌ **ReportNote Model** - Test file exists but only has pending placeholder
7. ❌ **Sprint 2-3 Controllers** - `ReportNotesController`, `PatientProgressController`, `PatientSummariesController` (no tests)
8. ❌ **Pundit Policies** - Authorization policies not explicitly tested
9. ✅ **Coverage Reporting** - SimpleCov configured and active (35.59% baseline)

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

1. ❌ **Phase 1 Components** - `RegisterForm` (invite token logic not tested)
2. ❌ **Phase 1 Pages** - Invite acceptance flow, therapist assignment UI (in ClientsManagementPage)
3. ❌ **Core Feature Pages** - ReportsPage, ReportViewPage, ReportEditPage (Tiptap), AudioUploadPage
4. ❌ **Sprint 2-3 Management Pages** - ClientsManagementPage (assignments + invites), PatientProgressPage
5. ❌ **Sprint 2 Components** - ReportNotes, audio recording components, analytics charts
6. ❌ **Custom Hooks** - useAuth, useDebounce, useLocalStorage (if any)
7. ❌ **Utilities** - API client helpers, formatters, validators
8. ⚠️ **Integration Tests** - Limited full-flow testing (e.g., invite acceptance e2e)

---

### Storybook-First Testing (Page-Level)

**Status**: In Progress (January 2026)

UpSpeech is migrating to a **Storybook-first testing approach** for page-level tests. This pattern provides:

- **Visual testing** - See exactly what users see
- **Interaction testing** - Play functions simulate user behavior
- **MSW mocking** - Deterministic network behavior with Mock Service Worker
- **Component isolation** - Test pages with different user roles and data scenarios

**Reference**: [Storybook-first testing pattern](https://perjerz.medium.com/shifting-left-our-storybook-first-ui-page-level-tests-msw-and-the-storybook-test-harness-e0fdf4b75c5f)

**Current Coverage:**

| Page              | Stories | Status  |
| ----------------- | ------- | ------- |
| DashboardPage     | 10      | ✅ Done |
| PracticePage      | 10      | ✅ Done |
| MyExercisesPage   | 15      | ✅ Done |
| TherapyJourneyPage| 5       | ✅ Done |
| StepDetailPage    | 8       | ✅ Done |

**MSW Handler Factories** (located in `src/mocks/handlers/`):

- `exercises.ts` - Mini games, assignments, statistics, categories
- `dashboards.ts` - Audio recordings, reports
- `practice.ts` - Composes exercises + dashboards + learning path + user filtering
- `learningPath.ts` - Learning path and step progress endpoints

**Writing Page Stories:**

```tsx
// src/pages/MyPage.stories.tsx
import { pageDecorator, mockUsers } from "../../.storybook/decorators";
import { createMyPageHandlers } from "@/mocks/handlers/myPage";

export const Default: Story = {
  decorators: [
    pageDecorator({
      path: "/my-page",
      initialEntry: "/my-page",
      user: mockUsers.client,
    }),
  ],
  parameters: {
    msw: {
      handlers: createMyPageHandlers(),
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await waitFor(() => {
      expect(canvas.getByText("Expected Content")).toBeInTheDocument();
    }, { timeout: 5000 });
  },
};
```

**Running Storybook Tests:**

```bash
# Start Storybook dev server
npm run storybook

# Run tests (in another terminal, with Storybook running)
npm run test:storybook

# CI mode (builds Storybook first, then tests)
npm run test:storybook:ci
```

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
describe("ReportsPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("initial render", () => {
    it("fetches and displays reports on mount");
    it("displays loading state while fetching");
    it("displays error message on API failure");
    it("displays empty state when no reports exist");
  });

  describe("filtering", () => {
    it("filters by status (draft, ready)");
    it("filters by report_type");
    it("clears filters on reset button click");
    it("updates URL params with active filters");
  });

  describe("sorting", () => {
    it("sorts by date (newest first, oldest first)");
    it("sorts by title (A-Z, Z-A)");
  });

  describe("pagination", () => {
    it("displays pagination controls when results exceed page size");
    it("navigates to next page");
    it("navigates to previous page");
    it("updates page number in URL");
  });

  describe("report actions", () => {
    it("navigates to report view on card click");
    it("displays report metadata (date, status, type)");
  });

  describe("permissions", () => {
    it("shows all tenant reports for therapist");
    it("shows only own reports for client");
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
describe("ReportViewPage", () => {
  describe("report display", () => {
    it("fetches and displays report content");
    it("renders report HTML content correctly");
    it("displays report metadata (title, date, status, type)");
    it("shows loading state while fetching");
    it("handles 404 for non-existent report");
  });

  describe("report notes", () => {
    it("renders ReportNotes component");
    it("passes correct reportId to notes component");
  });

  describe("actions", () => {
    it("navigates to edit page on edit button click");
    it("exports report as PDF");
    it("displays back button to return to reports list");
  });

  describe("permissions", () => {
    it("shows edit button only for therapists");
    it("hides edit button for clients");
    it("shows therapist_only notes only to therapists");
    it("shows shared notes to clients");
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
describe("AudioUploadPage", () => {
  describe("file upload", () => {
    it("displays file input for audio upload");
    it("validates file type (audio only)");
    it("validates file size (max 50MB)");
    it("shows upload progress");
    it("displays success message on upload complete");
    it("handles upload errors");
  });

  describe("audio recording", () => {
    it("requests microphone permission");
    it("displays recording controls (start, stop, pause)");
    it("shows recording duration");
    it("allows playback of recorded audio");
    it("submits recording on confirm");
  });

  describe("metadata", () => {
    it("allows entering recording title");
    it("allows entering recording description");
    it("validates required fields before submit");
  });

  describe("navigation", () => {
    it("redirects to processing status page after upload");
    it("shows cancel button to return to previous page");
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
describe("ReportNotes", () => {
  describe("display notes", () => {
    it("fetches and displays existing notes");
    it("groups notes by visibility (therapist_only, shared)");
    it("displays note author and timestamp");
    it("shows loading state while fetching");
  });

  describe("create note", () => {
    it("displays create note form");
    it("allows selecting visibility (therapist_only, shared_with_patient)");
    it("submits new note on button click");
    it("clears form after successful creation");
    it("displays validation errors");
  });

  describe("edit note", () => {
    it("allows editing own notes");
    it("updates note on save");
    it("cancels edit on cancel button");
  });

  describe("delete note", () => {
    it("shows delete button for own notes");
    it("confirms before deleting");
    it("removes note from list after deletion");
  });

  describe("permissions", () => {
    it("shows create form only for therapists");
    it("hides therapist_only notes from clients");
    it("shows shared notes to clients");
  });
});
```

**Estimated Time**: 2-3 hours

---

## Phase 1 Implementation Testing Plan

**Context**: Phase 1 (Therapist-Patient Linking + Invite System) was implemented without tests. This section provides a comprehensive 5-phase roadmap to close the testing gap for Phase 1 features and other recent sprint work.

**Total Estimated Time**: ~21 hours
**Expected Outcome**: Backend coverage 60%+, Frontend coverage 40%+

---

### Phase 1: Critical Backend Tests (New Features) - ~4 hours

**Focus**: Test all Phase 1 models, controllers, and mailers

#### 1.1 TherapistPatientAssignment Model Tests (45 min)

**File**: `app-backend/spec/models/therapist_patient_assignment_spec.rb`
**Status**: Pending stub exists

**Required Tests:**

```ruby
RSpec.describe TherapistPatientAssignment, type: :model do
  describe 'validations' do
    it { should validate_presence_of(:therapist_id) }
    it { should validate_presence_of(:patient_id) }
    it { should validate_uniqueness_of(:patient_id).scoped_to(:therapist_id, :tenant_id) }
  end

  describe 'associations' do
    it { should belong_to(:therapist).class_name('User') }
    it { should belong_to(:patient).class_name('User') }
    it { should belong_to(:tenant) }
  end

  describe 'tenant scoping' do
    it 'prevents cross-tenant assignments'
    it 'allows multiple therapists per patient within tenant'
  end

  describe 'role validation' do
    it 'requires therapist to have therapist role'
    it 'requires patient to have client role'
    it 'prevents assigning admin as patient'
  end
end
```

---

#### 1.2 InviteCode Model Tests (45 min)

**File**: `app-backend/spec/models/invite_code_spec.rb`
**Status**: Pending stub exists

**Required Tests:**

```ruby
RSpec.describe InviteCode, type: :model do
  describe 'validations' do
    it { should validate_presence_of(:code) }
    it { should validate_presence_of(:role) }
    it { should validate_uniqueness_of(:code) }
    it { should validate_inclusion_of(:role).in_array(['therapist', 'client']) }
  end

  describe 'associations' do
    it { should belong_to(:tenant) }
    it { should belong_to(:created_by).class_name('User') }
    it { should belong_to(:used_by).class_name('User').optional }
  end

  describe 'code generation' do
    it 'generates unique 8-character code on create'
    it 'generates URL-safe codes (alphanumeric only)'
  end

  describe 'expiration' do
    it 'marks code as expired after 7 days'
    it 'allows setting custom expiration'
    it 'prevents using expired codes'
  end

  describe 'usage' do
    it 'marks code as used when accepted'
    it 'records used_by user'
    it 'prevents reusing used codes'
  end

  describe 'scopes' do
    it 'filters active (not expired, not used) codes'
    it 'filters by role'
    it 'filters by tenant'
  end
end
```

---

#### 1.3 TherapistAssignmentsController Tests (1 hour)

**File**: `app-backend/spec/requests/api/v1/therapist_assignments_controller_spec.rb`
**Status**: Controller exists, no tests

**Required Tests:**

```ruby
RSpec.describe "Api::V1::TherapistAssignmentsController", type: :request do
  let(:tenant) { create(:tenant) }
  let(:therapist) { create(:user, :therapist, tenant: tenant) }
  let(:patient) { create(:user, :client, tenant: tenant) }

  describe "GET /api/v1/therapist_assignments" do
    context "as therapist" do
      it "returns own patient assignments"
      it "includes patient details"
    end

    context "as admin" do
      it "returns all tenant assignments"
    end

    context "as client" do
      it "returns 403 forbidden"
    end
  end

  describe "POST /api/v1/therapist_assignments" do
    context "as therapist" do
      it "creates assignment to self"
      it "prevents cross-tenant assignment"
    end

    context "as admin" do
      it "creates assignment between any therapist and patient"
    end

    context "as client" do
      it "returns 403 forbidden"
    end
  end

  describe "DELETE /api/v1/therapist_assignments/:id" do
    it "allows therapist to unassign own patient"
    it "allows admin to delete any assignment"
    it "prevents cross-tenant deletion"
  end
end
```

---

#### 1.4 InvitesController Tests (1 hour)

**File**: `app-backend/spec/requests/api/v1/invites_controller_spec.rb`
**Status**: Controller needs rewrite, no tests

**Required Tests:**

```ruby
RSpec.describe "Api::V1::InvitesController", type: :request do
  let(:tenant) { create(:tenant) }
  let(:admin) { create(:user, :admin, tenant: tenant) }
  let(:therapist) { create(:user, :therapist, tenant: tenant) }

  describe "GET /api/v1/invites" do
    context "as admin" do
      it "returns all tenant invite codes"
      it "filters active vs expired codes"
    end

    context "as therapist" do
      it "returns only own created invites"
    end

    context "as client" do
      it "returns 403 forbidden"
    end
  end

  describe "POST /api/v1/invites" do
    context "as admin" do
      it "creates invite code for therapist role"
      it "creates invite code for client role"
      it "generates unique 8-char code"
    end

    context "as therapist" do
      it "creates invite code for client role only"
      it "prevents creating therapist invites"
    end
  end

  describe "POST /api/v1/invites/:code/accept" do
    it "accepts valid invite code during registration"
    it "marks code as used"
    it "assigns user to tenant"
    it "creates therapist-patient assignment for client invites"
    it "rejects expired codes"
    it "rejects already-used codes"
  end

  describe "DELETE /api/v1/invites/:id" do
    it "allows admin to delete any invite"
    it "allows therapist to delete own invites"
    it "prevents deleting used invites"
  end
end
```

---

#### 1.5 InviteMailer Tests (30 min)

**File**: `app-backend/spec/mailers/invite_mailer_spec.rb`
**Status**: Mailer exists, no tests

**Required Tests:**

```ruby
RSpec.describe InviteMailer, type: :mailer do
  describe '#invite_email' do
    let(:tenant) { create(:tenant, name: 'Test Clinic') }
    let(:therapist) { create(:user, :therapist, tenant: tenant) }
    let(:invite) { create(:invite_code, tenant: tenant, created_by: therapist, role: 'client') }
    let(:mail) { described_class.invite_email(invite, 'patient@example.com') }

    it 'renders the subject' do
      expect(mail.subject).to eq('You've been invited to UpSpeech')
    end

    it 'sends to the correct email' do
      expect(mail.to).to eq(['patient@example.com'])
    end

    it 'includes the invite code' do
      expect(mail.body.encoded).to include(invite.code)
    end

    it 'includes the registration link with code' do
      expect(mail.body.encoded).to include("/register?code=#{invite.code}")
    end

    it 'includes therapist name for client invites' do
      expect(mail.body.encoded).to include(therapist.name)
    end
  end
end
```

---

### Phase 2: Backend Service Tests - ~2 hours

**Focus**: Test service layer that was previously untested

#### 2.1 Create spec/services/ Directory

```bash
mkdir -p app-backend/spec/services
```

---

#### 2.2 PatientSummaryGenerator Tests (1 hour)

**File**: `app-backend/spec/services/patient_summary_generator_spec.rb`
**Status**: Service exists (Sprint 2), no tests

_(Detailed tests already documented in Priority 1 section above)_

---

#### 2.3 Additional Service Tests (1 hour)

- `AudioAnalyzerService` (if exists)
- `MarkdownProcessor` (if exists)
- `JwtService` (if exists)

---

### Phase 3: Critical Frontend Tests (New Features) - ~6 hours

**Focus**: Test Phase 1 frontend features and Sprint 2-3 components

#### 3.1 RegisterForm Component Tests - Invite Logic (2 hours)

**File**: `app-frontend/src/components/RegisterForm.test.tsx`
**Status**: Component exists, no tests for invite logic

**Required Tests:**

```typescript
describe("RegisterForm - Invite Flow", () => {
  describe("invite code parameter", () => {
    it("reads invite code from URL query param");
    it("displays invite code in readonly field");
    it("validates invite code with backend");
    it("shows error for expired invite code");
    it("shows error for invalid invite code");
  });

  describe("registration with invite", () => {
    it("submits registration with invite code");
    it("redirects to dashboard after successful registration");
    it("assigns user to therapist for client invites");
    it("marks invite code as used");
  });

  describe("registration without invite", () => {
    it("allows registration without invite code");
    it("creates new tenant for first user");
  });
});
```

---

#### 3.2 ReportNotes Component Tests (2 hours)

**File**: `app-frontend/src/components/ReportNotes.test.tsx`
**Status**: Component exists (Sprint 2), no tests

_(Detailed tests already documented in Priority 1 section above)_

---

#### 3.3 ClientsManagementPage Tests - Assignment UI (2 hours)

**File**: `app-frontend/src/pages/ClientsManagementPage.test.tsx`
**Status**: Page exists with Sprint 2-3 features, no tests

**Required Tests:**

```typescript
describe("ClientsManagementPage - Phase 1 Features", () => {
  describe("therapist assignments", () => {
    it("displays list of assigned patients");
    it("shows assignment status and date");
    it("allows unassigning patient");
    it("confirms before unassigning");
  });

  describe("invite management", () => {
    it("displays create invite button");
    it("opens invite modal on button click");
    it("creates client invite with therapist as creator");
    it("displays generated invite code");
    it("copies invite link to clipboard");
    it("displays list of active invites");
    it("shows invite status (active, expired, used)");
    it("allows deleting unused invites");
  });

  describe("patient summary export", () => {
    it("displays export button for each patient");
    it("downloads HTML summary on button click");
  });
});
```

---

### Phase 4: Essential Frontend Page Tests - ~8 hours

**Focus**: Cover critical user-facing pages that were built in Sprints 2-3

#### 4.1 ReportsPage Tests (3 hours)

_(Detailed tests already documented in Priority 1 section above)_

---

#### 4.2 ReportViewPage Tests (2 hours)

_(Detailed tests already documented in Priority 1 section above)_

---

#### 4.3 PatientProgressPage Tests (3 hours)

**File**: `app-frontend/src/pages/PatientProgressPage.test.tsx`
**Status**: Page exists (Sprint 3), no tests

**Required Tests:**

```typescript
describe("PatientProgressPage", () => {
  describe("initial render", () => {
    it("fetches patient progress data on mount");
    it("displays loading state while fetching");
    it("displays error message on API failure");
  });

  describe("summary cards", () => {
    it("displays total recordings count");
    it("displays total reports count");
    it("displays consistency score");
    it("displays average recordings per week");
  });

  describe("recording frequency chart", () => {
    it("renders area chart with recharts");
    it("displays recordings over time");
    it("filters by time range (7d, 30d, 90d, all)");
  });

  describe("activity timeline", () => {
    it("displays combined recordings and reports timeline");
    it("shows activity bars by date");
    it("includes tooltips with activity details");
  });

  describe("insights section", () => {
    it("displays progress insights based on data");
    it("shows recent activity list");
  });
});
```

---

### Phase 5: Registration Flow Integration Test - ~1 hour

**Focus**: End-to-end test for invite acceptance flow

#### 5.1 Invite Acceptance E2E Test

**File**: `app-frontend/src/tests/integration/invite-flow.test.tsx` (CREATE NEW)

**Required Tests:**

```typescript
describe("Invite Acceptance Flow (Integration)", () => {
  it("completes full invite flow", async () => {
    // 1. Admin creates invite code
    // 2. Invite code is shared via link
    // 3. New user visits registration with code
    // 4. User completes registration
    // 5. User is assigned to tenant
    // 6. Client is assigned to therapist (for client invites)
    // 7. Invite code is marked as used
    // 8. User can access appropriate dashboard
  });

  it("handles expired invite gracefully");
  it("handles invalid invite code gracefully");
});
```

---

### Phase 1 Testing Plan Summary

**Total Time Investment**: ~21 hours

| Phase | Focus                         | Time | Outcome                              |
| ----- | ----------------------------- | ---- | ------------------------------------ |
| 1     | Critical Backend Tests        | 4h   | Phase 1 models, controllers, mailers |
| 2     | Backend Service Tests         | 2h   | Service layer coverage               |
| 3     | Critical Frontend Tests       | 6h   | Phase 1 UI + Sprint 2 components     |
| 4     | Essential Frontend Page Tests | 8h   | Core user-facing pages               |
| 5     | Registration Flow Integration | 1h   | E2E invite acceptance                |

**Expected Coverage After Completion:**

- Backend: 60-65% (up from 35.59%)
- Frontend: 40-50% (up from 15-20%)
- Critical paths (auth, invites, assignments): 90%+

**Next Steps After Phase 1 Testing:**

1. Continue with existing Priority 2/3 tests (AudioUploadPage, AnalyticsPage, etc.)
2. Add Phase 3 (Disfluency Detection) tests as features are implemented
3. Implement E2E tests with Playwright/Cypress for critical user journeys
4. Achieve 80%+ overall coverage target

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

### Backend Test Files (18 + Phase 1 Missing)

```
spec/
├── models/
│   ├── user_spec.rb (31 tests) ✅
│   ├── report_spec.rb (22 tests) ✅
│   ├── audio_recording_spec.rb (20 tests) ✅
│   ├── tenant_spec.rb (18 tests) ✅
│   ├── transcription_spec.rb (13 tests) ✅
│   ├── report_note_spec.rb (1 pending) ❌
│   ├── therapist_patient_assignment_spec.rb (1 pending) ❌ PHASE 1
│   └── invite_code_spec.rb (1 pending) ❌ PHASE 1
├── requests/api/v1/
│   ├── reports_controller_spec.rb (21 tests) ✅
│   ├── analytics_controller_spec.rb (18 tests) ✅
│   ├── filtering_integration_spec.rb (29 tests) ✅
│   ├── therapist_assignments_controller_spec.rb ❌ MISSING - PHASE 1
│   ├── invites_controller_spec.rb ❌ MISSING - PHASE 1
│   ├── report_notes_controller_spec.rb ❌ MISSING - SPRINT 2
│   ├── patient_progress_controller_spec.rb ❌ MISSING - SPRINT 3
│   └── patient_summaries_controller_spec.rb ❌ MISSING - SPRINT 2
├── jobs/
│   └── transcription_processor_job_spec.rb (16 tests) ✅
├── mailers/
│   └── invite_mailer_spec.rb ❌ MISSING - PHASE 1
├── services/
│   └── patient_summary_generator_spec.rb ❌ MISSING - SPRINT 2
└── spec_helper.rb, rails_helper.rb ✅
```

### Frontend Test Files (6 + Phase 1 Missing)

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
│   ├── RegisterForm.test.tsx ❌ MISSING - PHASE 1 (invite logic)
│   └── ReportNotes.test.tsx ❌ MISSING - SPRINT 2
├── pages/
│   ├── TherapistDashboardPage.test.tsx (15 tests) ✅
│   ├── ReportsPage.test.tsx ❌ MISSING - SPRINT 2
│   ├── ReportViewPage.test.tsx ❌ MISSING - SPRINT 2
│   ├── AudioUploadPage.test.tsx ❌ MISSING
│   ├── AnalyticsPage.test.tsx ❌ MISSING
│   ├── ClientsManagementPage.test.tsx ❌ MISSING - PHASE 1 + SPRINT 2-3
│   └── PatientProgressPage.test.tsx ❌ MISSING - SPRINT 3
├── tests/
│   ├── setup.ts ✅
│   ├── mocks.ts ✅
│   └── integration/
│       └── invite-flow.test.tsx ❌ MISSING - PHASE 1 E2E
```

---

**Document Owner**: Development Team
**Review Cadence**: Monthly
**Next Review**: November 22, 2025
