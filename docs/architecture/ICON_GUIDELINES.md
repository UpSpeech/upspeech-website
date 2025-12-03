# Icon Guidelines - UpSpeech Frontend

**Last Updated**: 2025-12-03
**Status**: 🔴 CRITICAL - Major inconsistencies found

---

## 🚨 Audit Findings (2025-12-03)

### Current State - INCONSISTENT

**Icon Libraries Installed:**
- ✅ **Heroicons** v2.2.0 (`@heroicons/react`)
- ⚠️ **Lucide** v0.555.0 (`lucide-react`)

**Usage Statistics:**
- 📦 **Heroicons**: 39 imports across codebase
  - 24/outline: 34 imports (PRIMARY)
  - 24/solid: 3 imports
  - 20/solid: 2 imports
- 📦 **Lucide**: 4 imports (feedback components only)
- ❌ **Inline SVGs**: 142 instances across 34 files
- ❌ **Emojis**: 20+ instances in JSX code

### Problems Identified

**1. Mixed Icon Libraries** 🔴 HIGH SEVERITY
- Using both Heroicons AND Lucide creates inconsistency
- Different visual styles between libraries
- Increases bundle size unnecessarily
- Confusing for developers (which library to use?)

**2. Excessive Inline SVGs** 🔴 HIGH SEVERITY
- 142 inline SVG instances across 34 files
- Duplicated code (same icons defined multiple times)
- Harder to maintain (changes require editing multiple files)
- No consistency in sizing, colors, or styling
- Increases code complexity and file sizes

**3. Emojis in UI Code** 🟡 MEDIUM SEVERITY
- Emojis used for icons in 20+ locations
- Examples:
  - ✓ (checkmark) - Should use CheckIcon
  - ✕ (x mark) - Should use XMarkIcon
  - 📊 (chart) - Should use ChartBarIcon
  - 📄 (document) - Should use DocumentTextIcon
  - 🎉 (party) - Acceptable for celebratory messages
  - ⚠️ (warning) - Should use ExclamationTriangleIcon
  - 🔍 (search) - Should use MagnifyingGlassIcon

**Affected Files:**
```
Inline SVGs (34 files):
- src/components/clients/PatientStatsCards.tsx
- src/components/clients/StatsCards.tsx
- src/components/dashboards/*.tsx (4 files)
- src/components/common/*.tsx (4 files)
- src/components/feedback/*.tsx (3 files)
- src/pages/*.tsx (11 files)
- src/components/Layout/*.tsx (3 files)
+ 9 more files

Emojis (20+ locations):
- src/components/ui/AILoadingSpinner.tsx - 📊
- src/components/feedback/GeneralFeedbackTab.tsx - 🔍, ⚠️
- src/components/feedback/ReportFeedbackTab.tsx - ⚠️, 📊, 📄
- src/components/feedback/FeedbackFilters.tsx - ✕ (4x)
- src/components/dashboards/ClientDashboard.tsx - ✓, 🎉
- src/components/exercises/ExerciseSelectorModal.tsx - ✓
- src/components/LanguageSwitcher.tsx - ✓
+ more files

Mixed Libraries (4 files using Lucide):
- src/components/feedback/FeedbackButton.tsx
- src/components/feedback/GeneralFeedbackForm.tsx
- src/components/feedback/ReportFeedbackButtons.tsx
- src/components/feedback/ReportAnnotationView.tsx
```

---

## ✅ Standardized Guidelines (NEW)

### Primary Icon Library: Heroicons

**Decision**: Use **Heroicons 24/outline** as the standard icon library.

**Rationale:**
- ✅ Already heavily used (34/39 imports)
- ✅ MIT licensed, free for commercial use
- ✅ Maintained by Tailwind CSS team (consistent updates)
- ✅ Comprehensive icon set (292 icons)
- ✅ Designed to work with Tailwind CSS
- ✅ React-first with TypeScript support
- ✅ Accessible (proper ARIA attributes)
- ✅ Small bundle size (tree-shakeable)

### Icon Size Variants

**When to use each variant:**

```tsx
// 24/outline - DEFAULT for all UI elements
import { HomeIcon } from "@heroicons/react/24/outline";

// 24/solid - Use for:
// - Filled/selected states
// - Emphasis in navigation
// - Dark mode variants when more visual weight needed
import { HomeIcon } from "@heroicons/react/24/solid";

// 20/solid - AVOID unless absolutely necessary
// - Only for very compact UIs (mobile toolbars, small buttons)
// - Use sparingly to maintain consistency
import { HomeIcon } from "@heroicons/react/20/solid";
```

### Standard Icon Sizes

Use Tailwind classes for consistent sizing:

```tsx
// Small - Inline text, small buttons
<Icon className="w-4 h-4" />

// Medium - Default for buttons, inputs, navigation
<Icon className="w-5 h-5" />

// Large - Page headers, empty states, large buttons
<Icon className="w-6 h-6" />

// XL - Feature highlights, hero sections
<Icon className="w-8 h-8" />

// XXL - Empty states, error pages, placeholders
<Icon className="w-12 h-12" />
```

### Color Guidelines

Use semantic color classes:

```tsx
// Primary actions
<Icon className="text-primary-600 dark:text-primary-400" />

// Success states
<Icon className="text-green-600 dark:text-green-400" />

// Warning states
<Icon className="text-yellow-600 dark:text-yellow-400" />

// Error/danger states
<Icon className="text-red-600 dark:text-red-400" />

// Neutral/secondary
<Icon className="text-gray-600 dark:text-gray-400" />

// Inherit from parent
<Icon className="text-current" />
```

---

## 🚫 What NOT to Do

### ❌ DON'T Use Emojis for Icons

```tsx
// ❌ BAD - Emoji in code
<button>
  🔍 Search
</button>

// ❌ BAD - Emoji in placeholder
<input placeholder="🔍 Search feedback..." />

// ❌ BAD - Emoji for status
<span>✓ Completed</span>

// ✅ GOOD - Use Heroicons
import { MagnifyingGlassIcon, CheckIcon } from "@heroicons/react/24/outline";

<button>
  <MagnifyingGlassIcon className="w-5 h-5" />
  Search
</button>

<input
  placeholder="Search feedback..."
  icon={<MagnifyingGlassIcon className="w-5 h-5" />}
/>

<span className="flex items-center gap-1">
  <CheckIcon className="w-4 h-4 text-green-600" />
  Completed
</span>
```

**Exception**: Emojis ARE allowed in:
- User-generated content
- Celebratory messages (e.g., "Great job! 🎉")
- Fun copy/marketing text
- Documentation/comments

### ❌ DON'T Use Inline SVGs

```tsx
// ❌ BAD - Inline SVG
<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
</svg>

// ✅ GOOD - Use Heroicons
import { HomeIcon } from "@heroicons/react/24/outline";

<HomeIcon className="w-6 h-6" />
```

**Exception**: Custom brand logos or complex illustrations that are NOT available in Heroicons.

### ❌ DON'T Mix Icon Libraries

```tsx
// ❌ BAD - Mixing libraries in same file
import { HomeIcon } from "@heroicons/react/24/outline";
import { MessageSquare } from "lucide-react";

// ✅ GOOD - Use only Heroicons
import { HomeIcon, ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
```

---

## ✅ Best Practices

### 1. Import Pattern

```tsx
// ✅ Import only what you need (tree-shaking)
import { HomeIcon, UserIcon, CogIcon } from "@heroicons/react/24/outline";

// ❌ Don't import all icons
import * as HeroIcons from "@heroicons/react/24/outline";
```

### 2. Consistent Styling

```tsx
// ✅ Create reusable icon component for consistency
import { HomeIcon } from "@heroicons/react/24/outline";

interface IconButtonProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  variant?: 'primary' | 'secondary';
}

export function IconButton({ icon: Icon, label, variant = 'primary' }: IconButtonProps) {
  return (
    <button className={/* button styles */}>
      <Icon className="w-5 h-5" />
      {label}
    </button>
  );
}

// Usage
<IconButton icon={HomeIcon} label="Home" />
```

### 3. Accessibility

```tsx
// ✅ Decorative icons (next to text)
<button>
  <HomeIcon className="w-5 h-5" aria-hidden="true" />
  Home
</button>

// ✅ Icon-only buttons (need aria-label)
<button aria-label="Go to home">
  <HomeIcon className="w-5 h-5" />
</button>

// ✅ Icons with screen reader text
<button>
  <HomeIcon className="w-5 h-5" aria-hidden="true" />
  <span className="sr-only">Go to home</span>
</button>
```

### 4. Common Icon Mappings

Use these Heroicons equivalents for common emojis:

| Emoji | Heroicon | Import |
|-------|----------|--------|
| ✓ | CheckIcon | `@heroicons/react/24/outline` |
| ✕ | XMarkIcon | `@heroicons/react/24/outline` |
| 🔍 | MagnifyingGlassIcon | `@heroicons/react/24/outline` |
| 📊 | ChartBarIcon | `@heroicons/react/24/outline` |
| 📄 | DocumentTextIcon | `@heroicons/react/24/outline` |
| ⚠️ | ExclamationTriangleIcon | `@heroicons/react/24/outline` |
| 🗑️ | TrashIcon | `@heroicons/react/24/outline` |
| ✏️ | PencilIcon | `@heroicons/react/24/outline` |
| ➕ | PlusIcon | `@heroicons/react/24/outline` |
| ⚙️ | CogIcon | `@heroicons/react/24/outline` |
| 👤 | UserIcon | `@heroicons/react/24/outline` |
| 🏠 | HomeIcon | `@heroicons/react/24/outline` |

Browse all icons: https://heroicons.com/

---

## 🔧 ESLint Enforcement

### Prevent Emoji Usage in JSX

Add to `eslint.config.js`:

```javascript
{
  selector: "Literal[value=/[\\u{1F300}-\\u{1F9FF}\\u{2600}-\\u{26FF}\\u{2700}-\\u{27BF}✓✕⚠️📊📄🔍]/u]",
  message: "Don't use emojis for icons. Use Heroicons instead: import { Icon } from '@heroicons/react/24/outline';",
},
```

### Prevent Inline SVG Elements

Add to `eslint.config.js`:

```javascript
{
  selector: "JSXElement[openingElement.name.name='svg']",
  message: "Don't use inline SVG elements. Use Heroicons instead: import { Icon } from '@heroicons/react/24/outline';",
},
```

### Prevent Lucide Imports

Add to `eslint.config.js`:

```javascript
{
  selector: "ImportDeclaration[source.value='lucide-react']",
  message: "Don't use Lucide icons. Use Heroicons instead: import { Icon } from '@heroicons/react/24/outline';",
},
```

---

## 📋 Migration Plan

### Phase 1: Prevent New Violations (Immediate)
1. ✅ Add ESLint rules to prevent:
   - Emojis in JSX
   - Inline SVG elements
   - Lucide imports
2. ✅ Update CLAUDE.md with icon guidelines
3. ✅ Create this documentation

### Phase 2: Fix Existing Violations (1-2 weeks)

**Priority 1: Replace Emojis (20+ instances)**
- Low effort, high impact
- Search and replace with Heroicons
- ~2-3 hours

**Priority 2: Remove Lucide (4 files)**
- Replace 4 Lucide imports with Heroicons equivalents
- Test feedback components
- ~1 hour

**Priority 3: Replace Inline SVGs (142 instances, 34 files)**
- High effort, high impact
- Identify unique SVGs
- Replace with Heroicons or extract to components
- ~8-12 hours

**Estimated Total**: 11-16 hours

### Phase 3: Cleanup (After migration)
1. Remove `lucide-react` from package.json
2. Create icon component library helpers
3. Add Storybook stories for common icon patterns

---

## 📚 Resources

- **Heroicons Documentation**: https://heroicons.com/
- **Heroicons GitHub**: https://github.com/tailwindlabs/heroicons
- **Heroicons React**: https://www.npmjs.com/package/@heroicons/react
- **Browse all 292 icons**: https://heroicons.com/

---

## 📊 Progress Tracking

| Task | Status | Notes |
|------|--------|-------|
| Create guidelines | ✅ COMPLETE | This document |
| Add ESLint rules | 🟡 PENDING | See below for implementation |
| Replace emojis | ⬜ NOT STARTED | 20+ instances |
| Remove Lucide | ⬜ NOT STARTED | 4 files |
| Replace inline SVGs | ⬜ NOT STARTED | 142 instances |
| Remove lucide-react | ⬜ NOT STARTED | After migration |

---

**Last Updated**: 2025-12-03
**Maintained By**: Development Team
**Next Review**: After icon migration completion
