# Code Quality Configuration

This document describes the code quality tools and rules configured for upspeech-website.

## Overview

The project uses TypeScript strict mode, ESLint, and Prettier to maintain code quality and consistency.

## TypeScript Configuration

**File**: `tsconfig.app.json`

### Key Settings

- **Strict mode enabled**: `strict: true`
  - Enables all strict type-checking options
  - Catches more potential bugs at compile time
  - Enforces better type safety practices

- **Target**: ES2022
  - Modern JavaScript features
  - Better performance and smaller bundles

- **Additional checks**:
  - `noFallthroughCasesInSwitch: true` - Prevents accidental fallthrough in switch statements

### Differences from app-frontend

The website has a similar TypeScript configuration to app-frontend but without:

- Test file exclusions (marketing site has simpler test setup)
- `verbatimModuleSyntax` and other advanced module features

## ESLint Configuration

**File**: `eslint.config.js`

### Enabled Rules

#### React & React Hooks

- **React Hooks recommended-latest**: Latest best practices for hooks
- **exhaustive-deps**: Warns about missing dependencies in useEffect/useCallback
- **Fast refresh support**: Optimized for Vite HMR

#### TypeScript

- **no-unused-vars**: Warns about unused variables
  - Allows `_prefixed` variables for intentionally unused params
- **no-explicit-any**: Warns against using `any` type
- **no-unused-expressions**: Prevents statements that have no effect

#### Code Quality

- **no-console**: Warns about console.log (allows console.warn/error)
- **prefer-const**: Enforces const for variables that aren't reassigned
- **no-var**: Prevents use of `var` keyword

### Exceptions

- **UI components** (`src/components/ui/**`): Allows non-component exports (shadcn/ui pattern)
- **Hooks** (`src/hooks/**`): Allows utility exports alongside hooks

### Differences from app-frontend

The website has a **simpler** ESLint config than app-frontend because it's a marketing site:

**Not included** (app-frontend only):

- Component library enforcement (Button, Input, Modal patterns)
- i18next translation enforcement
- PageHeader requirements
- Icon standardization rules (Heroicons only)
- Lucide import restrictions
- Custom component structure rules
- Gradient utility restrictions

**Why?** The marketing website uses shadcn/ui components which have different patterns than the app-frontend's custom component library.

## Prettier Configuration

**File**: `.prettierrc`

Standard formatting rules for consistency:

- Semicolons: Yes
- Single quotes: No (double quotes)
- Print width: 80 characters
- Tab width: 2 spaces
- Trailing commas: All

## NPM Scripts

```bash
# Format code with Prettier
npm run format

# Lint code with ESLint (check only)
npm run lint

# Lint and auto-fix issues
npm run lint:fix

# Type-check with TypeScript
npm run typecheck

# Run all checks (format → lint → typecheck)
npm run full_check
```

## Pre-commit Checklist

Before committing code, ensure:

1. ✅ `npm run full_check` passes without errors
2. ✅ All TypeScript types are correct
3. ✅ No ESLint errors (warnings are acceptable)
4. ✅ Code is formatted with Prettier

## Current Status

- ✅ TypeScript strict mode: **Enabled**
- ✅ ESLint: **6 warnings** (unused vars, non-blocking)
- ✅ Prettier: **All files formatted**
- ✅ Full check: **Passing**

## Future Improvements

1. Fix unused variable warnings by removing dead code
2. Consider adding more code quality rules as needed
3. Add automated pre-commit hooks (optional)

---

**Last Updated**: 2026-01-12
**Aligned with**: app-frontend code quality standards (adapted for marketing site)
