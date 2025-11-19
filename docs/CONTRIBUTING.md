# Contributing to UpSpeech

Welcome to UpSpeech! This guide will help you understand our development workflow, code quality standards, and contribution process.

## Table of Contents

- [Development Setup](#development-setup)
- [Code Quality & Linting](#code-quality--linting)
- [Testing Requirements](#testing-requirements)
- [Git Workflow](#git-workflow)
- [Pre-commit Checklist](#pre-commit-checklist)

## Development Setup

### Prerequisites

- Ruby 3.4.4
- Node.js 22.17.1
- PostgreSQL 16
- Docker and Docker Compose

### Getting Started

All services are orchestrated from the `upspeech-website/` directory using `dev.sh`. See the main [README.md](../README.md) for detailed dev.sh commands.

**Quick start:**

```bash
cd upspeech-website
./dev.sh setup    # First time: build, migrate, seed
./dev.sh start    # Start all services
./dev.sh logs     # Watch logs
```

**Service URLs after starting:**

- Frontend: http://localhost:3001
- Backend API: http://localhost:3000
- AI Service: http://localhost:8081
- PostgreSQL: postgresql://postgres:postgres@localhost:5432/upspeech_development
- Redis: redis://localhost:6379

## Code Quality & Linting

**All code must pass linters before committing.** Run linters regularly during development and fix all issues.

### Backend Linting (RuboCop)

RuboCop enforces Ruby style guidelines and best practices.

```bash
# Run RuboCop on all files
bin/rubocop

# Auto-fix safe offenses
bin/rubocop -a

# Auto-fix all offenses (use with caution)
bin/rubocop -A

# Run on specific file
bin/rubocop app/models/user.rb
```

**When to run:**

- Before committing changes
- After adding new files
- When refactoring existing code

**Important:**

- Fix all RuboCop offenses before committing
- If you must disable a cop, add a comment explaining why
- Follow Rails and Ruby community style guides

### Frontend Linting (ESLint + Prettier)

ESLint enforces TypeScript/JavaScript best practices, Prettier handles code formatting.

```bash
# Run ESLint
npm run lint
# or
npx eslint src/

# Fix ESLint issues automatically
npm run lint:fix
# or
npx eslint src/ --fix

# Run Prettier to check formatting
npx prettier --check src/

# Fix Prettier formatting
npx prettier --write src/
```

**When to run:**

- Before committing changes
- After adding new files
- When refactoring existing code

**Important:**

- Fix all ESLint errors before committing
- ESLint warnings should be addressed when practical
- Prettier formatting should be consistent across all files
- Both tools run automatically in CI/CD pipeline

## Testing Requirements

UpSpeech aims for sturdy, production-ready code. **All new features and bug fixes MUST include relevant tests.**

### Testing Guidelines

- **Write meaningful tests** that verify actual behavior, not just mocks
- Test edge cases, error scenarios, and happy paths
- Focus on integration and behavior testing over implementation details
- **Aim for 80%+ code coverage** across both frontend and backend

For detailed testing guidelines, see [TESTING_STRATEGY.md](architecture/TESTING_STRATEGY.md).

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
npm run test -- --coverage # With coverage
```

### When to Write Tests

**ALWAYS write tests for:**

1. **New features** - Write tests alongside implementation (TDD encouraged)
2. **Bug fixes** - Write a failing test first, then fix the bug
3. **Refactoring** - Ensure existing tests pass, add tests for new edge cases
4. **API endpoints** - Test all CRUD operations and permissions
5. **Business logic** - Services, utilities, calculations
6. **User interactions** - Forms, buttons, navigation

## Git Workflow

### Branch Naming

Use descriptive branch names that follow this pattern:

- `feature/phase-X-feature-name` - For new features
- `fix/issue-description` - For bug fixes
- `refactor/component-name` - For refactoring
- `docs/documentation-update` - For documentation changes

**Examples:**

- `feature/phase-3-disfluency-detection`
- `fix/report-export-pdf-formatting`
- `refactor/audio-upload-component`

### Commit Messages

Follow conventional commits format:

```
<type>: <description>

[optional body]

[optional footer]
```

**Types:**

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, no logic change)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks (dependencies, build, etc.)

**Examples:**

- `feat: add disfluency detection to speech analysis`
- `fix: correct tenant isolation in reports query`
- `docs: update TESTING_STRATEGY.md with new guidelines`
- `refactor: simplify report generation service`

### Pull Request Process

1. **Create feature branch** from `main`
2. **Implement changes** with tests
3. **Run linters and tests** (ensure they pass)
4. **Update documentation** if needed
5. **Push branch** to remote
6. **Create pull request** with:
   - Clear title and description
   - Reference to related issues/tasks
   - Screenshots/videos for UI changes
   - Test coverage summary
7. **Address review feedback**
8. **Merge** after approval

## Pre-commit Checklist

Before committing code, ensure:

- [ ] All tests pass (`bundle exec rspec` and `npm run test`)
- [ ] Backend linting passes (`bin/rubocop`)
- [ ] Frontend linting passes (`npm run lint`)
- [ ] Frontend formatting passes (`npx prettier --check src/`)
- [ ] No debugging code (console.log, binding.pry, etc.)
- [ ] Code coverage meets requirements (80%+)
- [ ] Documentation updated (if applicable)
- [ ] New tests added for new features/fixes

## Important Architectural Guidelines

### Multi-tenancy

**All database queries must be scoped by `tenant_id`.**

- Use `current_tenant.reports` instead of `Report.all`
- Never bypass tenant scoping unless explicitly required and documented
- See [MULTI_TENANCY.md](architecture/MULTI_TENANCY.md) for details

### Role-Based Access Control (RBAC)

Use permission methods in `user.rb` for access control:

```ruby
# Backend
current_user.can_manage_users?
current_user.can_view_all_reports?

# Frontend
import { canManageUsers, canViewAllReports } from '@/lib/permissions'
```

See [PERMISSIONS.md](architecture/PERMISSIONS.md) for the complete permission matrix.

### Security Best Practices

- Be careful not to introduce security vulnerabilities (XSS, SQL injection, command injection, etc.)
- Validate all user inputs
- Sanitize outputs in templates
- Use parameterized queries (ActiveRecord does this by default)
- Follow OWASP Top 10 guidelines

## Getting Help

- **Documentation:** See [docs/README.md](README.md) for full documentation index
- **Issues:** Check existing issues or create a new one
- **Questions:** Reach out to the team in your preferred communication channel

---

**Last Updated:** 2025-11-07

Thank you for contributing to UpSpeech!
