# TODOS

**Last Updated**: November 29, 2025

## 🎯 NEW SPRINT: User Experience & Feedback Systems

**Priority**: P1 (High) - Critical for user engagement and product improvement
**Effort**: 4-5 weeks
**Status**: 🔴 Not Started

---

## Phase 1: Feature Flag System (Per-Tenant)

**Priority**: P0 (Critical) - Foundation for controlled feature rollout
**Effort**: 3-4 days
**Status**: 🔴 Not Started

### User Story

As a platform owner, I want to control which features are enabled for each tenant, so I can gradually roll out new features, A/B test functionality, and maintain different feature sets across organizations.

### Implementation Tasks

#### Backend

- [ ] **Feature Flags Model & Database**

  - Create `FeatureFlag` model (name, key, description, default_enabled, created_at)
  - Create `TenantFeatureFlag` model (tenant_id, feature_flag_id, enabled, created_at, updated_at)
  - Add unique index on [tenant_id, feature_flag_id]
  - Seed initial feature flags in database

- [ ] **Feature Flag Service**

  - Create `FeatureFlagService` class
  - Method: `enabled?(tenant_id, flag_key)` - Check if flag is enabled for tenant
  - Method: `enabled_features(tenant_id)` - Get all enabled features for tenant
  - Method: `enable_feature(tenant_id, flag_key)` - Enable feature for tenant
  - Method: `disable_feature(tenant_id, flag_key)` - Disable feature for tenant
  - Caching layer (Redis) for performance

- [ ] **Feature Flags Controller** (Owner-only)

  - `GET /api/v1/admin/feature_flags` - List all available feature flags
  - `GET /api/v1/admin/tenants/:id/feature_flags` - Get tenant's feature flags
  - `PATCH /api/v1/admin/tenants/:id/feature_flags/:key` - Toggle feature for tenant
  - `GET /api/v1/feature_flags` - Get current tenant's enabled features (all users)

- [ ] **Authorization Helper**
  - Add `feature_enabled?(:flag_key)` helper to ApplicationController
  - Add `require_feature_flag(:flag_key)` before_action filter
  - Automatic 403 response if feature disabled

#### Frontend

- [ ] **Feature Flag Provider**

  - Create `FeatureFlagContext.tsx` - React context for feature flags
  - Create `useFeatureFlag(flagKey)` hook
  - Fetch enabled features on app load
  - Cache in localStorage with TTL

- [ ] **Feature Flag Components**

  - Create `FeatureGate.tsx` - Conditional rendering component
  - Usage: `<FeatureGate flag="feedback_system">...</FeatureGate>`
  - Show nothing or placeholder if feature disabled

- [ ] **Admin Feature Flag Management** (Owner-only)
  - Create `FeatureFlagManagementPage.tsx`
  - List all tenants with their feature flag status
  - Toggle switches for each feature per tenant
  - Bulk enable/disable for multiple tenants

#### Initial Feature Flags

```ruby
# Feature flags to create:
- key: "onboarding_flow", name: "Onboarding Flow", default: true
- key: "feedback_system", name: "Feedback System", default: false
- key: "report_voting", name: "Report Voting", default: false
- key: "report_annotations", name: "Report Annotations", default: false
- key: "general_feedback", name: "General Feedback Form", default: false
```

#### Key Files

- `app-backend/app/models/feature_flag.rb`
- `app-backend/app/models/tenant_feature_flag.rb`
- `app-backend/app/services/feature_flag_service.rb`
- `app-backend/app/controllers/api/v1/admin/feature_flags_controller.rb`
- `app-backend/app/controllers/api/v1/feature_flags_controller.rb`
- `app-frontend/src/contexts/FeatureFlagContext.tsx`
- `app-frontend/src/hooks/useFeatureFlag.ts`
- `app-frontend/src/components/FeatureGate.tsx`
- `app-frontend/src/pages/admin/FeatureFlagManagementPage.tsx`
- `app-frontend/src/types/featureFlag.ts`

#### Database Schema

```ruby
# FeatureFlag
create_table :feature_flags do |t|
  t.string :name, null: false
  t.string :key, null: false, index: { unique: true }
  t.text :description
  t.boolean :default_enabled, default: false
  t.timestamps
end

# TenantFeatureFlag
create_table :tenant_feature_flags do |t|
  t.references :tenant, null: false, foreign_key: true
  t.references :feature_flag, null: false, foreign_key: true
  t.boolean :enabled, default: false, null: false
  t.timestamps

  t.index [:tenant_id, :feature_flag_id], unique: true
end
```

#### Routes

- `/admin/feature-flags` - Feature flag management (owners only)

#### Usage Examples

**Backend**:

```ruby
# In controller
before_action -> { require_feature_flag(:feedback_system) }, only: [:create_feedback]

# In code
if FeatureFlagService.enabled?(current_tenant.id, :feedback_system)
  # Show feedback UI
end
```

**Frontend**:

```tsx
// Using hook
const { enabled } = useFeatureFlag("feedback_system");
if (enabled) {
  return <FeedbackButton />;
}

// Using component
<FeatureGate flag="feedback_system">
  <FeedbackButton />
</FeatureGate>;
```

---

## Phase 2: Onboarding Flow System

**Priority**: P1 (High) - Critical first-time user experience
**Effort**: 1 week
**Status**: 🔴 Not Started

### User Story

As a new user (patient/therapist/admin), I want a guided onboarding experience that helps me understand the platform's features and complete my profile setup, so I can start using the application confidently.

### Implementation Tasks

#### Backend

- [ ] **Onboarding Model & Database**

  - Create `UserOnboarding` model (user_id, role, current_step, completed_at, steps_data JSONB)
  - Track completion status per user
  - Store step-specific data (e.g., profile completion, preferences)
  - Add API endpoints for onboarding state management

- [ ] **Onboarding Steps Controller**
  - `GET /api/v1/onboarding/status` - Get user's current onboarding state
  - `PATCH /api/v1/onboarding/progress` - Update current step
  - `POST /api/v1/onboarding/complete` - Mark onboarding as complete
  - `GET /api/v1/onboarding/steps/:role` - Get role-specific onboarding steps

#### Frontend

- [ ] **Onboarding Flow Components**

  - Create `OnboardingWizard.tsx` - Multi-step wizard container
  - Create `OnboardingStep.tsx` - Reusable step component
  - Create role-specific step components:
    - `PatientOnboarding.tsx` (profile, goals, preferences)
    - `TherapistOnboarding.tsx` (profile, specializations, availability)
    - `AdminOnboarding.tsx` (organization setup, team invites)

- [ ] **Onboarding Steps Design**

  - **Step 1**: Welcome & Introduction (platform overview)
  - **Step 2**: Profile Completion (photo, bio, contact info)
  - **Step 3**: Role-Specific Setup
    - Patients: Therapy goals, communication preferences
    - Therapists: Specializations, license info, bio
    - Admins: Organization branding, team setup
  - **Step 4**: Feature Tour (interactive tooltips, walkthrough)
  - **Step 5**: Quick Start Actions (first report, first exercise, etc.)

- [ ] **UI/UX Features**
  - Progress indicator (steps 1/5, 2/5, etc.)
  - Skip option (but encourage completion)
  - Save progress (can resume later)
  - Celebration animation on completion
  - Option to re-trigger onboarding from settings

#### Key Files

- `app-backend/app/models/user_onboarding.rb`
- `app-backend/app/controllers/api/v1/onboarding_controller.rb`
- `app-frontend/src/components/onboarding/OnboardingWizard.tsx`
- `app-frontend/src/components/onboarding/OnboardingStep.tsx`
- `app-frontend/src/types/onboarding.ts`

#### Routes

- `/onboarding` - Main onboarding flow (all roles)

---

## Phase 3: Feedback Mechanism System

**Priority**: P1 (High) - Critical for quality assurance and improvement
**Effort**: 2 weeks
**Status**: 🔴 Not Started

> [!IMPORTANT] > **Feature Flag Gated**: All feedback features must be behind the `feedback_system` feature flag. The system will check if the flag is enabled before showing any feedback UI or allowing API access.

### User Story

As a therapist/admin/patient, I want to provide feedback on reports and platform features (upvote/downvote, general comments, and inline report annotations), so the owners can improve the system based on real user input.

### Implementation Tasks

#### Backend

- [ ] **Feature Flag Integration**

  - Add `require_feature_flag(:feedback_system)` to all feedback controllers
  - Return 403 Forbidden if feature flag is disabled
  - Include feature flag check in API responses

- [ ] **Report Feedback Model** (Upvote/Downvote System)

  - Create `ReportFeedback` model (report_id, user_id, feedback_type: enum [:upvote, :downvote], comment, created_at)
  - Track aggregate scores per report (upvotes count, downvotes count)
  - Add validation: one vote per user per report
  - Add API endpoints for voting

- [ ] **General Feedback Model** (Platform Feedback)

  - Create `GeneralFeedback` model (user_id, category: enum [:bug, :feature_request, :improvement, :other], title, description, status: enum [:new, :in_review, :planned, :completed, :rejected], priority, created_at)
  - Owner-only status updates
  - Add API endpoints for feedback submission and management

- [ ] **Report Annotations Model** (Inline Comments)

  - Create `ReportAnnotation` model (report_id, user_id, highlighted_text, section_identifier, start_position, end_position, comment, created_at)
  - Store exact text selection and position data
  - Support multiple annotations per report
  - Visibility: owner-only (hidden from patients)

- [ ] **Feedback Controllers**
  - `POST /api/v1/reports/:id/feedback` - Upvote/downvote report
  - `GET /api/v1/reports/:id/feedback` - Get report feedback summary (owner-only)
  - `POST /api/v1/feedback` - Submit general feedback
  - `GET /api/v1/feedback` - List all feedback (owner-only, filterable)
  - `PATCH /api/v1/feedback/:id` - Update feedback status (owner-only)
  - `POST /api/v1/reports/:id/annotations` - Create annotation
  - `GET /api/v1/reports/:id/annotations` - Get annotations (owner-only)
  - `DELETE /api/v1/reports/:id/annotations/:id` - Delete annotation (owner-only)

#### Frontend

- [ ] **Feature Flag Integration**

  - Wrap all feedback UI with `<FeatureGate flag="feedback_system">`
  - Hide feedback navigation items if flag disabled
  - Show "Feature not available" message if user tries to access disabled feature

- [ ] **Report Feedback UI**

  - Add thumbs up/down buttons to report view
  - Show aggregate vote counts (owners only)
  - Add optional comment field with vote
  - Visual feedback on vote submission
  - Update vote in real-time
  - **Wrap with**: `<FeatureGate flag="feedback_system">`

- [ ] **General Feedback UI**

  - Create `FeedbackFormPage.tsx` - Feedback submission page
  - Add feedback button in main navigation (all users)
  - Category selector (bug, feature request, improvement, other)
  - Title + description fields
  - File attachment support (optional enhancement)
  - Confirmation message on submission

- [ ] **Feedback Management Dashboard** (Owner-only)

  - Create `FeedbackManagementPage.tsx`
  - List all feedback with filters (category, status, user role)
  - Status update controls (new → in review → planned → completed/rejected)
  - Priority assignment
  - Search and sort functionality
  - Export feedback to CSV

- [ ] **Report Annotation System**

  - Install `react-text-annotator` or similar library
  - Create `ReportAnnotationView.tsx` component
  - Enable text selection and highlighting in reports
  - Show annotation dialog on text selection
  - Display existing annotations (owner-only)
  - Annotation management (edit, delete)

- [ ] **Annotation Features**
  - Click highlighted text to view comment
  - Different highlight colors for different users
  - Annotation count indicator
  - Filter/search annotations
  - Export annotations with report

#### Key Files

**Backend**:

- `app-backend/app/models/report_feedback.rb`
- `app-backend/app/models/general_feedback.rb`
- `app-backend/app/models/report_annotation.rb`
- `app-backend/app/controllers/api/v1/report_feedback_controller.rb`
- `app-backend/app/controllers/api/v1/general_feedback_controller.rb`
- `app-backend/app/controllers/api/v1/report_annotations_controller.rb`

**Frontend**:

- `app-frontend/src/pages/FeedbackFormPage.tsx`
- `app-frontend/src/pages/FeedbackManagementPage.tsx`
- `app-frontend/src/components/reports/ReportFeedbackButtons.tsx`
- `app-frontend/src/components/reports/ReportAnnotationView.tsx`
- `app-frontend/src/types/feedback.ts`

#### Routes

- `/feedback` - Submit general feedback (all users)
- `/dashboard/feedback` - Manage feedback (owners only)
- `/reports/:id` - Enhanced with voting + annotations

#### Database Schema

```ruby
# ReportFeedback
create_table :report_feedbacks do |t|
  t.references :report, null: false, foreign_key: true
  t.references :user, null: false, foreign_key: true
  t.string :feedback_type, null: false # upvote, downvote
  t.text :comment
  t.timestamps

  t.index [:report_id, :user_id], unique: true
end

# GeneralFeedback
create_table :general_feedbacks do |t|
  t.references :user, null: false, foreign_key: true
  t.references :tenant, null: false, foreign_key: true
  t.string :category, null: false # bug, feature_request, improvement, other
  t.string :title, null: false
  t.text :description, null: false
  t.string :status, default: 'new' # new, in_review, planned, completed, rejected
  t.string :priority # low, medium, high, critical
  t.timestamps
end

# ReportAnnotation
create_table :report_annotations do |t|
  t.references :report, null: false, foreign_key: true
  t.references :user, null: false, foreign_key: true
  t.string :section_identifier # e.g., "introduction", "assessment", "recommendations"
  t.text :highlighted_text, null: false
  t.integer :start_position
  t.integer :end_position
  t.text :comment, null: false
  t.timestamps
end
```

---

## Phase 4: Database & Permissions

**Priority**: P1 (High) - Required for feature flags, feedback and annotations
**Effort**: 2 days
**Status**: 🔴 Not Started

### Implementation Tasks

- [ ] **Database Migrations**

  - Create migration for `feature_flags` table
  - Create migration for `tenant_feature_flags` table
  - Seed initial feature flags (onboarding, feedback_system, report_voting, etc.)
  - Create migration for `user_onboardings` table
  - Create migration for `report_feedbacks` table
  - Create migration for `general_feedbacks` table
  - Create migration for `report_annotations` table
  - Add indexes for performance (user_id, report_id, tenant_id)

- [ ] **Authorization & Permissions**

  - Implement owner-only access for:
    - Viewing report feedback aggregates
    - Managing general feedback
    - Viewing/managing report annotations
  - Add role checks in controllers
  - Update frontend to conditionally show owner-only features

- [ ] **Data Privacy & Security**
  - Ensure annotations are never visible to patients
  - Implement soft deletes for feedback (retain data)
  - Add audit logging for feedback status changes
  - Rate limiting for feedback submission (prevent spam)

---

## Testing & Documentation

**Priority**: MEDIUM
**Effort**: 3 days
**Status**: 🔴 Not Started

### Tasks

- [ ] **Unit Tests**

  - Test feature flag service logic (enable/disable, caching)
  - Test feature flag authorization helpers
  - Test onboarding model validations
  - Test feedback voting logic (one vote per user)
  - Test annotation text selection and storage
  - Test owner-only permissions
  - Test feature flag requirements on feedback endpoints

- [ ] **Integration Tests**

  - Test feature flag toggle workflow
  - Test feature-gated API endpoints (403 when disabled)
  - Test complete onboarding flow for each role
  - Test feedback submission and management workflow
  - Test annotation creation and retrieval
  - Test upvote/downvote functionality
  - Test feature flag UI components (FeatureGate)

- [ ] **End-to-End Tests**

  - Test admin feature flag management
  - Test feature visibility based on flags
  - Test onboarding wizard completion
  - Test feedback form submission (when enabled)
  - Test report annotation workflow (when enabled)
  - Test feedback management dashboard

- [ ] **Documentation**
  - Create `FEATURE_FLAGS.md` - Feature flag system guide
  - Create `ONBOARDING.md` - Onboarding system guide
  - Create `FEEDBACK_SYSTEM.md` - Feedback and annotation guide
  - Update `API_DOCUMENTATION.md` with new endpoints
  - Update `README.md` with new features

---

## Feature Completion Checklist

### Feature Flag System

- [ ] Backend models and service
- [ ] Frontend context and components
- [ ] Admin management UI
- [ ] Integration with feedback system

### Onboarding Flow

- [ ] Backend models and API
- [ ] Frontend wizard components
- [ ] Role-specific onboarding steps
- [ ] Progress tracking and resumption
- [ ] Testing and documentation

### Feedback Mechanism

- [ ] Report upvote/downvote system
- [ ] General feedback form
- [ ] Report annotation system
- [ ] Owner-only management dashboard
- [ ] Database migrations and permissions

### Quality Assurance

- [ ] All tests passing
- [ ] Documentation complete
- [ ] Code review completed
- [ ] User acceptance testing
- [ ] Production deployment ready

---

## ✅ COMPLETED FEATURES (Previous Sprints)

### Phase 1: Foundational Setup - 100% Complete ✅

- ✅ Patient-Therapist Linking System
- ✅ Invite Code System

### Phase 2: Automated Report Writing - 100% Complete ✅

- ✅ AI-powered report generation
- ✅ Multiple report templates

### Phase 4: Manual Exercise Assignment - 100% Complete ✅

- ✅ Exercise library with 10 categories
- ✅ Manual assignment system
- ✅ Patient exercise interface
- ✅ Statistics dashboard

### Phase 5: Progress Dashboard - 100% Complete ✅

- ✅ Patient progress tracking
- ✅ Therapist analytics

### Phase 6: Tenant Theming & Multi-Template System - 100% Complete ✅

- ✅ Dynamic theming system
- ✅ Tenant-specific templates
- ✅ Multi-language support

### Phase 7: Manual Report Generator - 100% Complete ✅

- ✅ Template selection
- ✅ Field filling interface
- ✅ PDF export

### Phase 8: Report Notes/Feedback - 100% Complete ✅

- ✅ Basic report notes system
- ✅ Patient summary export

### Phase 9: Disfluency Detection & Annotation - 100% Complete ✅

- ✅ Disfluency detection AI
- ✅ Annotation interface
- ✅ Disfluency metrics

---

## Sprint Roadmap

| Sprint Phase | Feature                    | Priority | Status             | Effort       |
| ------------ | -------------------------- | -------- | ------------------ | ------------ |
| **Phase 1**  | **Feature Flag System**    | **P0**   | 🔴 **Not Started** | **3-4 days** |
| **Phase 2**  | **Onboarding Flow**        | **P1**   | 🔴 **Not Started** | **1 week**   |
| **Phase 3**  | **Feedback System**        | **P1**   | 🔴 **Not Started** | **2 weeks**  |
| **Phase 4**  | **Database & Permissions** | **P1**   | 🔴 **Not Started** | **2 days**   |

**Next Milestone**: Complete Phases 1-4 → User Feedback Launch 🚀
