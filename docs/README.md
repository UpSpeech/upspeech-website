# UpSpeech Documentation

Complete documentation index for the UpSpeech platform. All documentation is organized into logical folders for easy navigation.

## Getting Started

**New to UpSpeech development?** Start here:

1. **[CONTRIBUTING.md](CONTRIBUTING.md)** - Development workflow, setup, linting, and git guidelines
2. **[CHANGELOG.md](CHANGELOG.md)** - Recent sprint completions and feature history
3. **[planning/TODO.md](planning/TODO.md)** - Current sprint tasks and priorities
4. **[planning/MVP_ROADMAP.md](planning/MVP_ROADMAP.md)** - Complete 7-phase MVP plan

## Planning & Tracking

Current sprint status, roadmap, and task tracking.

- **[planning/MVP_ROADMAP.md](planning/MVP_ROADMAP.md)** - Detailed 7-phase implementation plan with specs
- **[planning/TODO.md](planning/TODO.md)** - Current sprint tasks and immediate priorities
- **[CHANGELOG.md](CHANGELOG.md)** - Sprint completions and feature history

## Architecture & Design

Core technical architecture, patterns, and system design.

- **[architecture/SYSTEM_DESIGN.md](architecture/SYSTEM_DESIGN.md)** - Overall architecture and technical decisions
- **[architecture/SERVICE_COMMUNICATION.md](architecture/SERVICE_COMMUNICATION.md)** - **⭐ How services communicate & API integration guide**
- **[architecture/TESTING_STRATEGY.md](architecture/TESTING_STRATEGY.md)** - Testing philosophy, guidelines, and coverage plan
- **[architecture/MULTI_TENANCY.md](architecture/MULTI_TENANCY.md)** - Multi-tenant isolation strategy
- **[architecture/AUTH_FLOW.md](architecture/AUTH_FLOW.md)** - Authentication and session management
- **[architecture/PERMISSIONS.md](architecture/PERMISSIONS.md)** - Role-based access control (5 roles)
- **[architecture/REPORT_TEMPLATES.md](architecture/REPORT_TEMPLATES.md)** - Report template system and how to add new types

## Infrastructure & Deployment

Deployment configuration, infrastructure setup, and operational docs.

- **[infrastructure/RAILWAY_DEPLOYMENT.md](infrastructure/RAILWAY_DEPLOYMENT.md)** - Deployment configuration and setup
- **[infrastructure/AI_SERVICE_ENDPOINTS.md](infrastructure/AI_SERVICE_ENDPOINTS.md)** - FastAPI service API documentation
- **[infrastructure/JOBS_AND_PROCESSING.md](infrastructure/JOBS_AND_PROCESSING.md)** - Background job strategy (Solid Queue)
- **[infrastructure/EMAILJS_SETUP.md](infrastructure/EMAILJS_SETUP.md)** - Email integration configuration
- **[infrastructure/database-indexing-strategy.md](infrastructure/database-indexing-strategy.md)** - Database optimization

## Development Guides

- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Complete development guide
  - Development setup and workflow
  - Code quality and linting (RuboCop, ESLint, Prettier)
  - Git workflow and PR process
  - Pre-commit checklist
- **[Root README.md](../../README.md)** - Project overview and quick start commands

## Architectural Decision Records (ADRs)

Technical decisions and their rationale.

- **[adr/0001-runtime-versions.md](adr/0001-runtime-versions.md)** - Runtime version decisions (Ruby 3.4.4, Node 22.17.1)

## AI Assistant Context

- **[.claude/CLAUDE.md](../../.claude/CLAUDE.md)** - High-level context for AI assistants

## Documentation Conventions

### File Organization

- **planning/** - Roadmaps, TODO lists, implementation tracking
- **architecture/** - System design, patterns, technical architecture
- **infrastructure/** - Deployment, ops, service configuration
- **adr/** - Architectural Decision Records

### Writing Guidelines

1. **Keep sections concise** - Move deep dives to separate files
2. **Update ADRs** - When changing system behavior, add or update an ADR
3. **Use TODO comments** - Include owner or target date when possible
4. **Cross-reference liberally** - Link to related docs instead of duplicating content
5. **Update dates** - Include "Last Updated: YYYY-MM-DD" at the bottom of each doc

### Diagrams

- All diagrams use Mermaid syntax
- Regenerate locally via VS Code extension or CLI tools
- Include diagrams inline in markdown files

### Pull Request Guidelines

PRs that alter design docs should:
- Include a summary of impact in the PR description
- Update the "Last Updated" date in modified docs
- Link to related issues or tasks

## Upcoming Documentation

- API Reference (auto-generated from OpenAPI specs)
- Prompt Engineering Guidelines (for AI service)
- Performance Testing Guide
- Security Audit Checklist

---

**Questions or suggestions?** Open an issue or submit a PR to improve these docs.

**Last Updated**: 2025-11-07
