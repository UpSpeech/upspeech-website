# i18n Translation Audit Report

**Date**: 2025-12-05
**Status**: 🔴 CRITICAL - 909 Missing Translation Keys

## Executive Summary

A comprehensive audit of translation usage revealed that **909 translation keys are missing** from the English locale files. This is causing components to display translation key paths instead of actual text.

### Root Cause

The primary issue is **namespace misalignment**:

1. **Components use**: `t("common:auth.sign_in")`
2. **Expected structure in common.json**: `{ "auth": { "sign_in": "Sign In" } }`
3. **Actual structure**: Keys are in separate namespace files (`auth.json`, `tenant.json`, etc.)
4. **Should be**: `t("auth:sign_in")` looking in `auth.json`

### Impact

- **User Experience**: Translation keys are displayed as-is instead of human-readable text
- **Multi-language**: Impossible to add Portuguese/Spanish translations until English keys exist
- **Development**: New features cannot add proper i18n without fixing this foundation

---

## Statistics

| Metric                        | Count                                                                         |
| ----------------------------- | ----------------------------------------------------------------------------- |
| **Total missing keys**        | 909                                                                           |
| **Files affected**            | ~80 production files                                                          |
| **Namespaces involved**       | `common`, `auth`, `tenant`, `exercises`, `patients`, `users`, `reports`, etc. |
| **Properly structured files** | ~15 JSON files exist but keys don't match usage                               |

---

## Categories of Missing Keys

### 1. Authentication & User Management (~100 keys)

- `auth.*` keys used in LoginForm, RegisterForm
- `users.*` keys in user management pages
- **Files**: LoginForm.tsx, RegisterForm.tsx, AccountSettingsPage.tsx, UsersManagementPage.tsx

### 2. Dashboards (~150 keys)

- `admin_dashboard.*`, `therapist.*`, `client.*`, `owner_dashboard.*`
- **Files**: AdminDashboard.tsx, TherapistDashboard.tsx, ClientDashboard.tsx, OwnerDashboard.tsx

### 3. Exercises & Assignments (~200 keys)

- `exercises.mini_games.*`, `exercises.my_exercises.*`
- **Files**: MiniGameAssignmentModal.tsx, MyExercisesPage.tsx, ExerciseManagementPage.tsx

### 4. Patients (~80 keys)

- `patients.*`, `clients.*`
- **Files**: PatientsPage.tsx, MyPatientsPage.tsx, PatientListCard.tsx

### 5. Reports (~60 keys)

- `reports.*`, `audio_recordings.*`
- **Files**: ReportsPage.tsx, ReportViewPage.tsx, ManualReportGeneratorPage.tsx

### 6. Tenant/Organization (~50 keys)

- `tenant.*`, `tenants.*`
- **Files**: TenantSettingsPage.tsx, TenantsManagementPage.tsx

### 7. Common/Shared (~269 keys)

- Navigation, pagination, filtering, form controls
- **Files**: Pagination.tsx, FilterPanel.tsx, Sidebar.tsx

---

## Recommended Fix Strategy

### Option 1: Add Missing Keys to Locale Files ⭐ RECOMMENDED

**Approach**: Extract all hardcoded English text from components and add to appropriate JSON files.

**Pros**:

- Preserves existing code structure
- Enables multi-language support immediately after English is complete
- No code changes required (only JSON updates)

**Cons**:

- Large manual effort (~909 keys to add)
- Need to maintain namespace organization

**Estimated Time**: 20-30 hours

**Process**:

1. Run audit script to generate missing keys with their source files
2. For each file, extract the English text that should be translated
3. Add keys to appropriate namespace JSON files
4. Verify translations work
5. Add Portuguese/Spanish translations in phase 2

### Option 2: Fix Namespace Usage in Components

**Approach**: Change all `t("common:namespace.key")` to `t("namespace:key")` and ensure `useTranslation(['namespace'])`.

**Pros**:

- More correct usage of i18next namespaces
- Cleaner separation of concerns

**Cons**:

- Requires code changes in ~80 files
- Risk of breaking existing working translations
- More complex migration

**Estimated Time**: 30-40 hours

### Option 3: Hybrid Approach

**Approach**: Fix critical pages first (dashboards, auth), add missing keys for others.

**Pros**:

- Immediate impact on most visible pages
- Reduces scope initially

**Cons**:

- Inconsistent approach
- Technical debt remains

---

## Immediate Action Plan (Option 1)

### Phase 1: Critical User-Facing Pages (Week 1)

**Priority: Authentication & Dashboards**

1. **Auth Flow** (~30 keys)

   - LoginForm.tsx
   - RegisterForm.tsx
   - ForgotPasswordPage.tsx
   - ResetPasswordPage.tsx

2. **Dashboards** (~150 keys)
   - AdminDashboard.tsx
   - TherapistDashboard.tsx
   - ClientDashboard.tsx
   - OwnerDashboard.tsx

**Deliverable**: Users can log in and see properly translated dashboard

### Phase 2: Core Features (Week 2)

**Priority: Exercises & Patients**

3. **Exercise System** (~200 keys)

   - MyExercisesPage.tsx
   - MiniGameAssignmentModal.tsx
   - ConsultationExerciseAssignmentModal.tsx
   - ExerciseManagementPage.tsx

4. **Patient Management** (~80 keys)
   - PatientsPage.tsx
   - MyPatientsPage.tsx
   - PatientListCard.tsx

**Deliverable**: Core therapist workflows fully translated

### Phase 3: Admin & Reports (Week 3)

**Priority: Admin features**

5. **Reports** (~60 keys)

   - ReportsPage.tsx
   - ReportViewPage.tsx
   - ManualReportGeneratorPage.tsx

6. **Admin Pages** (~100 keys)
   - UsersManagementPage.tsx
   - TenantsManagementPage.tsx
   - TenantSettingsPage.tsx
   - AnalyticsPage.tsx

**Deliverable**: All major features have proper English translations

### Phase 4: Common Components & Utilities (Week 4)

**Priority: Shared components**

7. **Common Components** (~269 keys)
   - Pagination, Filters, Breadcrumbs
   - Sidebars, Navigation
   - Modals, Forms

**Deliverable**: Complete English translation coverage

### Phase 5: Multi-Language (Week 5+)

**Priority: Portuguese & Spanish**

- Copy all English keys to `pt/*.json`
- Copy all English keys to `es/*.json`
- Translate Portuguese (native speaker or AI + review)
- Translate Spanish (native speaker or AI + review)

---

##Tools & Automation

### Audit Script

The audit script (`/tmp/audit_i18n_final.py`) can:

- Find all `t()` calls in production code
- Compare against existing locale files
- Generate list of missing keys by file
- Output in markdown format for easy tracking

### Semi-Automated Key Generation

For each missing key, we can:

1. Find the surrounding code context
2. Extract the English text that should be used
3. Generate a JSON snippet to add to locale files

Example:

```typescript
// Code: t("auth.sign_in")
// Should add to auth.json:
{
  "sign_in": "Sign In"
}
```

---

## Next Steps

1. **Decision**: Choose fix strategy (Option 1 recommended)
2. **Setup**: Create tracking spreadsheet or project board
3. **Start**: Begin with Phase 1 (Auth + Dashboards)
4. **Iterate**: Complete one phase per week
5. **Review**: Test each phase before moving to next
6. **Multi-lang**: Add Portuguese/Spanish after English is 100% complete

---

## Files to Update

### JSON Files (English - `src/i18n/locales/en/`)

- `auth.json` - Add ~50 missing auth keys
- `common.json` - Add ~269 common/shared keys
- `dashboard.json` - Create new file with ~150 dashboard keys
- `exercises.json` - Add ~200 exercise-related keys
- `patients.json` - Add ~80 patient management keys
- `reports.json` - Add ~60 report keys
- `users.json` - Add ~50 user management keys
- `tenant.json` - Add ~50 tenant/org keys

### After English is Complete

- Mirror structure to `src/i18n/locales/pt/` (Portuguese)
- Mirror structure to `src/i18n/locales/es/` (Spanish)

---

## Success Criteria

✅ All 909 missing keys added to English locale files
✅ No translation keys displayed in UI (all show proper text)
✅ `npm run lint` passes without i18n violations
✅ Manual testing confirms all text is readable
✅ Portuguese translations added (Phase 5)
✅ Spanish translations added (Phase 5)

---

**Last Updated**: 2025-12-05
**Author**: AI Assistant
**Next Review**: After Phase 1 completion
