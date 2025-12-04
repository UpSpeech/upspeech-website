# Lint & Type Errors Tracker

**Last Updated**: 2025-12-04

This document tracks all ESLint and TypeScript errors that need to be fixed before deployment.

## ✅ Progress Update (2025-12-04)

**TypeScript Errors: COMPLETE!** 🎉

- ✅ All 9 TypeScript errors fixed
- ✅ `npm run typecheck` passes with 0 errors
- ✅ Storybook Modal stories updated with proper types
- ✅ null type handling fixed in library pages

**Next Steps**: ESLint errors (393 remaining) - see Phase 2 & 3 in Fix Strategy below

## Summary

| Category                    | Total Errors | Priority | Status                |
| --------------------------- | ------------ | -------- | --------------------- |
| **ESLint**                  | **393**      | High     | 🔴 In Progress        |
| i18n Literal Strings        | 324          | High     | 🔴 Not Started        |
| Inline SVG Elements         | 58           | High     | 🔴 Not Started        |
| Standalone h1 Elements      | 7            | High     | 🔴 Not Started        |
| Raw HTML Elements           | 4            | High     | 🔴 Not Started        |
| **TypeScript**              | **0**        | Critical | ✅ **COMPLETE**       |
| ~~Storybook Modal Stories~~ | ~~7~~        | Medium   | ✅ Fixed (2025-12-04) |
| ~~Type Mismatch (null)~~    | ~~2~~        | High     | ✅ Fixed (2025-12-04) |

---

## Quick Commands

```bash
# Run all checks
cd app-frontend
npm run lint          # Check ESLint errors
npm run lint:fix      # Auto-fix what can be fixed
npm run typecheck     # Check TypeScript errors

# Fix workflow
npm run lint:fix      # Auto-fix ESLint (some errors)
npm run typecheck     # Verify TypeScript
npm run test          # Ensure tests still pass
```

---

## TypeScript Errors ✅ COMPLETE (0 errors)

All TypeScript errors have been fixed! 🎉

### ✅ 1. Storybook Modal Stories Type Issues (7 errors) - FIXED

**Files**: `src/components/ui/Modal/Modal.stories.tsx`

**Error**: Missing `args` property in Story type

**Status**: ✅ Fixed on 2025-12-04

**Solution Applied**:

```tsx
// Added args property to all 7 stories:
export const Basic: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    children: null,
  },
  render: () => (
    <ModalExample>
      {({ isOpen, onClose }) => (
        <Modal isOpen={isOpen} onClose={onClose}>
          ...
        </Modal>
      )}
    </ModalExample>
  ),
};
```

**Stories Fixed**:

- ✅ Basic (line 46)
- ✅ WithFooter (line 63)
- ✅ WithoutCloseButton (line 89)
- ✅ Sizes (line 110)
- ✅ HeadingLevels (line 161)
- ✅ FormExample (line 230)
- ✅ LongContent (line 297)

---

### ✅ 2. Type Mismatch: null not assignable to string (2 errors) - FIXED

**Files**:

- `src/pages/ConsultationExercisesLibraryPage.tsx:490`
- `src/pages/MiniGamesLibraryPage.tsx:351`

**Error**: `Argument of type 'string | number | null' is not assignable to parameter of type 'string'`

**Status**: ✅ Fixed on 2025-12-04

**Problem**: Select component's `onChange` callback returns `string | number | null`, but `parseInt()` requires a string parameter.

**Solution Applied**:

```tsx
// ❌ Before (line 490 & 351)
<Select
  value={selectedTenantId.toString()}
  onChange={(value) => {
    setSelectedTenantId(value === "all" ? "all" : parseInt(value));
    setPage(1);
  }}
/>

// ✅ After - Added null check and String() conversion
<Select
  value={selectedTenantId.toString()}
  onChange={(value) => {
    if (value === null) return;
    setSelectedTenantId(value === "all" ? "all" : parseInt(String(value)));
    setPage(1);
  }}
/>
```

**Result**: Both files now handle null values correctly and TypeScript passes without errors.

---

## ESLint Errors (393 total)

### Category Breakdown

| Category               | Count | Auto-Fixable | Manual Work Required            |
| ---------------------- | ----- | ------------ | ------------------------------- |
| i18n Literal Strings   | 324   | ❌ No        | ✅ Yes - Add `useTranslation()` |
| Inline SVG Elements    | 58    | ❌ No        | ✅ Yes - Replace with Heroicons |
| Standalone h1 Elements | 7     | ❌ No        | ✅ Yes - Use `<PageHeader>`     |
| Raw HTML Elements      | 4     | ❌ No        | ✅ Yes - Use component library  |

---

### 1. i18n Literal Strings (324 errors)

**Rule**: `i18next/no-literal-string`

**Problem**: Hardcoded English text that should be translatable

**Files Affected** (top offenders):

- `src/pages/MiniGamesLibraryPage.tsx` - 103 errors
- `src/pages/ConsultationExercisesLibraryPage.tsx` - 96 errors
- `src/pages/ExercisesManagementPage.tsx` - 29 errors
- `src/pages/DashboardPage.tsx` - 24 errors
- `src/components/MiniGameAssignmentModal.tsx` - 19 errors
- `src/components/ConsultationExerciseAssignmentModal.tsx` - 17 errors
- `src/pages/PatientsPage.tsx` - 10 errors
- `src/pages/TenantsManagementPage.tsx` - 6 errors
- `src/pages/UsersManagementPage.tsx` - 6 errors
- `src/components/CookieConsent.tsx` - 4 errors
- And 10+ more files...

**Standard Fix Pattern**:

```tsx
// ❌ Current (hardcoded string)
<h2>Assign Daily Exercise</h2>
<p>Create a daily exercise assignment for your patient(s)</p>
<Button>Submit</Button>

// ✅ Fixed (with i18n)
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();

  return (
    <>
      <h2>{t('exercises.assignModal.title')}</h2>
      <p>{t('exercises.assignModal.description')}</p>
      <Button>{t('common.submit')}</Button>
    </>
  );
}
```

**Translation Files to Update**:

- `app-frontend/src/i18n/locales/en.json` - Add English keys
- `app-frontend/src/i18n/locales/pt.json` - Add Portuguese translations

**Estimated Time**:

- Per file: 30-60 minutes (depending on file size)
- Total: ~20-30 hours

**Priority**: High (required for multi-language support)

---

### 2. Inline SVG Elements (58 errors)

**Rule**: `no-restricted-syntax` (inline `<svg>`)

**Problem**: Inline SVGs instead of Heroicons

**Files Affected**:

- `src/pages/MiniGamesLibraryPage.tsx` - 10 SVGs
- `src/pages/ConsultationExercisesLibraryPage.tsx` - 10 SVGs
- `src/pages/DashboardPage.tsx` - 12 SVGs
- `src/pages/ExercisesManagementPage.tsx` - 8 SVGs
- `src/pages/PatientsPage.tsx` - 6 SVGs
- `src/pages/TenantsManagementPage.tsx` - 4 SVGs
- `src/pages/UsersManagementPage.tsx` - 8 SVGs

**Standard Fix Pattern**:

```tsx
// ❌ Current (inline SVG)
<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M12 4v16m8-8H4"
  />
</svg>;

// ✅ Fixed (Heroicons)
import { PlusIcon } from "@heroicons/react/24/outline";

<PlusIcon className="w-6 h-6" />;
```

**Common SVG → Icon Mappings**:

- Plus/Add → `PlusIcon`
- Edit/Pencil → `PencilIcon`
- Delete/Trash → `TrashIcon`
- Check/Checkmark → `CheckIcon`
- X/Close → `XMarkIcon`
- Info → `InformationCircleIcon`
- Calendar → `CalendarIcon`
- Users → `UsersIcon`
- Search → `MagnifyingGlassIcon`
- Filter → `FunnelIcon`
- Eye/View → `EyeIcon`

**Reference**: See `docs/architecture/ICON_GUIDELINES.md` for complete mappings

**Estimated Time**:

- Per SVG: 2-5 minutes
- Total: ~3-5 hours

**Priority**: High (standardization + accessibility)

---

### 3. Standalone h1 Elements (7 errors)

**Rule**: `no-restricted-syntax` (standalone `<h1>`)

**Problem**: Pages using `<h1>` instead of `<PageHeader>`

**Files Affected**:

- `src/pages/MiniGamesLibraryPage.tsx:220`
- `src/pages/ConsultationExercisesLibraryPage.tsx:229`
- `src/pages/ExercisesManagementPage.tsx:145`
- `src/pages/PatientsPage.tsx:207`
- `src/pages/ReportsPage.tsx:105`
- `src/pages/TenantsManagementPage.tsx:230`
- `src/pages/UsersManagementPage.tsx:265` (warning, not error)

**Standard Fix Pattern**:

```tsx
// ❌ Current (standalone h1)
<h1 className="text-2xl font-bold">My Page Title</h1>;

// ✅ Fixed (PageHeader)
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";

<PageHeader
  title="My Page Title"
  subtitle="Optional description"
  actions={
    <Button variant="primary">
      <PlusIcon className="w-5 h-5" />
      Add New
    </Button>
  }
/>;
```

**Estimated Time**:

- Per page: 10-15 minutes
- Total: ~1.5 hours

**Priority**: High (accessibility + consistency)

---

### 4. Raw HTML Elements (4 errors)

**Rule**: `no-restricted-syntax` (raw `<button>`, `<input>`, etc.)

**Files**: Various

**Problem**: Using raw HTML elements instead of standardized components

**Standard Fix**:

```tsx
// ❌ Current
<button className="px-4 py-2 bg-blue-600">Click</button>
<input type="text" className="border rounded" />

// ✅ Fixed
<Button variant="primary">Click</Button>
<Input type="text" />
```

**Estimated Time**: ~30 minutes total

**Priority**: High (component library compliance)

---

## Fix Strategy & Timeline

### Phase 1: Critical TypeScript Errors (Day 1 - 30 min)

**Must fix first** - blocks builds

1. ✅ Fix Storybook Modal stories (7 errors) - 15 min
2. ✅ Fix null type issues in library pages (2 errors) - 5 min
3. ✅ Verify typecheck passes - 5 min
4. ✅ Test affected components - 5 min

### Phase 2: Component Standardization (Day 1-2 - 3 hours)

**High priority** - consistency & accessibility

1. ✅ Replace inline SVGs with Heroicons (58 errors) - 2 hours
2. ✅ Replace standalone h1 with PageHeader (7 errors) - 1 hour
3. ✅ Fix raw HTML elements (4 errors) - 30 min
4. ✅ Run lint and verify reduction in errors

### Phase 3: i18n Migration (Days 2-5 - 20-30 hours)

**Large effort** - split across multiple sessions

**Priority Order** (most user-facing first):

1. **Patient-facing pages** (highest visibility):

   - DashboardPage (24 errors)
   - PatientsPage (10 errors)
   - ExercisesManagementPage (29 errors)

2. **Therapist tools**:

   - MiniGamesLibraryPage (103 errors) - largest file
   - ConsultationExercisesLibraryPage (96 errors)
   - Assignment modals (36 errors)

3. **Admin pages** (lower priority):

   - TenantsManagementPage (6 errors)
   - UsersManagementPage (6 errors)

4. **Shared components**:
   - CookieConsent (4 errors)
   - Other components (~15 errors)

**Per-file workflow**:

1. Add `useTranslation()` hook
2. Extract all literal strings to translation keys
3. Add English translations to `en.json`
4. Add Portuguese translations to `pt.json` (can use AI assistance)
5. Test both languages
6. Verify lint passes for that file

### Phase 4: Final Verification (Day 5 - 1 hour)

1. ✅ Run `npm run lint` - should show 0 errors
2. ✅ Run `npm run typecheck` - should show 0 errors
3. ✅ Run `npm run test` - all tests pass
4. ✅ Manual testing in both languages
5. ✅ Update this document with completion

---

## Progress Tracking

### Completed Files ✅

- None yet

### In Progress 🔄

- None yet

### Blocked 🚫

- None

---

## Resources

- **Icon Guidelines**: `docs/architecture/ICON_GUIDELINES.md`
- **i18n Documentation**: `docs/architecture/I18N_TRANSLATIONS.md`
- **Component Library**: `docs/architecture/COMPONENT_LIBRARY.md`
- **Storybook**: Run `npm run storybook` to view components

---

## Notes

- **Auto-fix limitation**: `npm run lint:fix` only fixes formatting issues (Prettier). Component and i18n issues must be fixed manually.
- **Testing requirement**: After fixing errors, run full test suite to ensure no regressions
- **Translation help**: Can use AI (ChatGPT/Claude) to assist with Portuguese translations, but require native speaker review
- **Incremental approach**: Fix one file at a time, commit, test, repeat
- **Team coordination**: Large i18n effort should be split across team members if available

---

## Commit Strategy

Use conventional commits for tracking progress:

```bash
# TypeScript fixes
git commit -m "fix(types): fix Modal storybook stories type errors"
git commit -m "fix(types): add null checks for searchTerm in library pages"

# Component standardization
git commit -m "refactor(icons): replace inline SVGs with Heroicons in DashboardPage"
git commit -m "refactor(ui): replace standalone h1 with PageHeader in PatientsPage"

# i18n migration (per file or related group)
git commit -m "i18n: add translations for DashboardPage"
git commit -m "i18n: add translations for exercise assignment modals"
git commit -m "i18n: add translations for MiniGamesLibraryPage"
```

---

**Total Estimated Effort**: ~30-35 hours
**Recommended Approach**: Fix TypeScript first (critical), then incrementally tackle i18n file by file over 1-2 weeks
