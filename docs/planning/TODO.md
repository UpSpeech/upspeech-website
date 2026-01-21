# UpSpeech TODO

**Last Updated:** 2026-01-21
**Current Focus:** Frontend Design Audit Remediation & Production Readiness

---

## Frontend Design Audit Findings

**Audit Date:** 2026-01-21
**Overall Quality Score:** B+ (Good)
**Anti-Pattern Verdict:** PASS - Does NOT look AI-generated

### Summary

| Severity | Count | Status         |
| -------- | ----- | -------------- |
| Critical | 1     | **DONE**       |
| High     | 5     | **5/5 DONE**   |
| Medium   | 12    | **12/12 DONE** |
| Low      | 8     | **6/8 DONE**   |

---

## Immediate Priority (Critical)

### Performance - Code Splitting & Lazy Loading

- [x] **Implement route-level code splitting with `React.lazy()`** ✅ DONE (2026-01-21)
  - Location: `app-frontend/src/App.tsx`
  - All 22 page components now lazy loaded with Suspense fallback
  - Impact: Reduced initial bundle, pages load on demand

- [x] **Add `loading="lazy"` to images below the fold** ✅ DONE (2026-01-21)
  - Updated: Footer.tsx, VideoPlayer.tsx, ConsultationExercisesLibraryPage.tsx, TenantSettingsPage.tsx
  - Impact: Improved LCP, reduced bandwidth usage

---

## High Priority (This Sprint)

### Performance

- [x] **Add `will-change` hints for animated elements** ✅ DONE (2026-01-21)
  - Updated: `card.tsx` (hoverable cards), `buttonVariants.ts` (all buttons)
  - Added `will-change-transform` for smooth hover animations
  - Impact: Smoother animations on lower-powered devices

### Anti-Patterns

- [x] **Deprecate bounce easing token** ✅ DONE (2026-01-21)
  - Location: `app-frontend/src/index.css:175`
  - Added deprecation comment, added exponential easing alternatives (`--ease-out-expo`, `--ease-out-quart`)
  - Token not in active use, safe to remove in next major version

### Accessibility

- [x] **Fix touch target sizes to minimum 44px** ✅ DONE (2026-01-21)
  - Updated: `buttonVariants.ts` - all button sizes now have `min-h-11` (44px)
  - Icon buttons updated with `min-h-11 min-w-11` for WCAG 2.1 AAA compliance

### Theming

- [x] **Replace hardcoded `#fff` in chart components** ✅ DONE (2026-01-21)
  - Updated: `PatientBubble.tsx`
  - Changed to `rgba(255, 255, 255, 0.9)` for stroke, `rgba(255, 255, 255, 0.95)` for text
  - Softer appearance while maintaining readability

- [x] **Review gray text on colored backgrounds for contrast** ✅ DONE (2026-01-21)
  - Updated: Dashboard hero cards in ClientDashboard, AdminDashboard, TherapistDashboard, OwnerDashboard
  - Changed `text-gray-600` to `text-gray-700` on gradient backgrounds for better contrast
  - Changed greeting text to use `text-primary-600` for brand consistency

---

## Medium Priority (Next Sprint)

### Theming

- [x] **Migrate editor styles to use CSS variables** ✅ DONE (2026-01-21)
  - Location: `app-frontend/src/index.css` (ProseMirror styles)
  - Migrated all hardcoded colors to use `var(--color-gray-*)` and `var(--color-primary-*)` tokens
  - Blockquotes, code blocks, tables, links, placeholders all now use design system

- [x] **Replaced Inter with Plus Jakarta Sans** ✅ DONE (2026-01-21)
  - Location: `app-frontend/src/index.css:16`, `app-frontend/index.html:94`
  - Plus Jakarta Sans is warmer, friendlier, and less ubiquitous than Inter
  - Pairs well with Outfit headings, aligns with "Calm, Scientific, Encouraging" brand
  - Also updated `.font-body` utility to use CSS variable for consistency

### Responsive Design

- [x] **Add container queries to reusable components** ✅ DONE (2026-01-21)
  - Location: `app-frontend/src/index.css`, `app-frontend/src/components/ui/card.tsx`
  - Added container query utilities: `.container-query`, `.container-card`, `.container-stat`, `.container-grid`
  - Added named container query breakpoints with responsive utility classes (cq-sm:, cq-md:, cq-lg:)
  - Added `containerQuery` prop to Card component (boolean | "card" | "stat" | "grid")
  - Components can now respond to container width instead of viewport width

- [x] **Add max-width constraint on main content** ✅ DONE (2026-01-21)
  - Location: `app-frontend/src/components/Layout/Layout.tsx`
  - Added `max-w-screen-2xl mx-auto w-full` to main content area
  - Prevents content from stretching on ultra-wide monitors

### Performance

- [x] **Increase memoization coverage in list components** ✅ DONE (2026-01-21)
  - Added `React.memo` to: ExerciseListItem, PracticeGameCard, PatientListCard
  - These components are rendered in lists and now prevent unnecessary re-renders

- [x] **Audit keyframe animations for layout properties** ✅ DONE (2026-01-21)
  - All animations verified - only use `transform`, `opacity`, `box-shadow`, `background-position`
  - No layout properties (width, height, top, left) being animated - already optimized

### Other Medium Issues

- [x] **Review long animation durations** ✅ REVIEWED (2026-01-21)
  - Float animations (6-8s) are intentionally slow for decorative elements
  - Used in EmptyState for subtle, calming background movement
  - Aligns with brand personality: "Calm, Scientific, Encouraging"
  - Long durations appropriate for healthcare app - creates gentle, non-distracting motion
- [x] **Add missing loading states in data-fetching components** ✅ REVIEWED (2026-01-21)
  - Verified 12/20 data-fetching pages have Skeleton, LoadingOverlay, or LoadingSpinner
  - Remaining pages (forms, simple views) use button loading states appropriately
  - Pattern: LoadingOverlay for empty initial state, inline loading for actions
- [x] **Replace inline SVG spinner in Button** ✅ DONE (2026-01-21)
  - Added `color="current"` option to LoadingSpinner (inherits parent's text color)
  - Updated Button component to use `<LoadingSpinner size="sm" color="current" />`
  - Consolidates spinner implementation, maintains visual consistency
- [x] **Deduplicate gradient definitions** ✅ DONE (2026-01-21)
  - Updated utility classes (.bg-gradient-_) to use `var(--gradient-_)` instead of hardcoded values
  - Updated .text-gradient-primary to use var(--gradient-primary)
  - Single source of truth: CSS custom properties at lines 110-117
- [x] **Ensure table component has horizontal scroll handling on mobile** ✅ VERIFIED (2026-01-21)
  - Table component already has `overflow-x-auto` wrapper (line 58)
  - Enables horizontal scroll when content exceeds container width
  - No changes needed - already properly implemented

---

## Low Priority (Backlog)

### Theming

- [ ] **Consider migrating color system to OKLCH**
  - Location: `app-frontend/src/index.css`
  - Benefit: Perceptually uniform color manipulations
  - Command: `/normalize`

- [ ] **Implement semantic z-index tokens** (FUTURE)
  - Current pattern: z-10 (sticky), z-20 (relative overlays), z-40 (backdrops), z-50 (modals)
  - Works well but would benefit from semantic names
  - Recommendation: Create CSS variables `--z-sticky`, `--z-backdrop`, `--z-modal`, `--z-tooltip`
  - Lower priority - current numeric system is consistent and functional

### Code Cleanup

- [x] **Review unused glass utilities** ✅ VERIFIED (2026-01-21)
  - Searched for `.glass` class usage - not used in any component
  - Recommend removing in future cleanup sprint (non-breaking)
  - Keeping for now as they don't affect bundle size when unused (CSS purging)

### Performance

- [x] **Add font loading strategy** ✅ VERIFIED (2026-01-21)
  - Google Fonts URL already includes `display=swap` (index.html:94)
  - Fonts preconnected to googleapis.com and gstatic.com (index.html:87-88)
  - No changes needed - already optimally configured
  - Define fallback font metrics to minimize layout shift

### Other Low Issues

- [x] **Audit padding values outside the 4pt grid system** ✅ VERIFIED (2026-01-21)
  - Searched for p-0.5, p-1.5, p-2.5, p-3.5, and other off-grid spacing values
  - No off-grid padding/margin/gap values found - codebase already follows 4pt grid
- [x] **Apply letter spacing tokens where appropriate** ✅ DONE (2026-01-21)
  - Added `tracking-tight` to large headings (text-2xl+) for more polished typography
  - Updated: page-header.tsx, stat-card.tsx, all dashboard welcome headings
  - Uppercase text already correctly uses `tracking-wide`/`tracking-wider`
- [x] **Document animation stagger capping** ✅ DONE (2026-01-21)
  - Added stagger tokens to index.css: `--stagger-increment-sm` (50ms), `--stagger-increment-md` (100ms), `--stagger-max-delay` (400ms)
  - Documented guidelines: cap total stagger at 400-500ms, use smaller increments for long lists
- [x] **Make empty states more encouraging per design principles** ✅ DONE (2026-01-21)
  - Added mood props to empty states missing them: MyPatientsPage (encouraging), ReportsPage (calm), PracticePage (calm/encouraging), UsersManagementPage (encouraging)
  - Existing dashboards already correctly used mood props

---

## Positive Findings (Maintain)

These practices are working well and should be maintained:

- **prefers-reduced-motion respected** - Implemented in hooks and CSS
- **Dark mode comprehensive** - 667 `dark:` variants in UI components
- **ARIA attributes present** - 123 occurrences in UI components
- **Focus states implemented** - Consistent `focus-visible:ring` pattern
- **Semantic color tokens** - Well-defined primary, semantic, therapeutic, celebration palettes
- **Animation system thoughtful** - Soft easings, calming timing, spring effects for celebrations
- **Brand-tinted shadows** - Using `rgba(41, 53, 135, 0.x)` instead of pure gray
- **Therapeutic color palette** - `calm-sky`, `calm-mint`, `celebrate` tokens for emotional design

---

## Command Reference

| Command      | Use For                                                     |
| ------------ | ----------------------------------------------------------- |
| `/optimize`  | Performance issues (lazy loading, will-change, memoization) |
| `/normalize` | Theming inconsistencies (hardcoded colors, tokens)          |
| `/harden`    | Responsive/accessibility (touch targets, container queries) |
| `/simplify`  | Remove unused code                                          |
| `/bolder`    | Typography differentiation                                  |

---

## Related Documentation

- [STYLE_MIGRATION_TRACKER.md](./STYLE_MIGRATION_TRACKER.md) - Component library migration status
- [MVP_ROADMAP.md](./MVP_ROADMAP.md) - Feature roadmap
- [TESTING_STRATEGY.md](../architecture/TESTING_STRATEGY.md) - Test coverage goals
