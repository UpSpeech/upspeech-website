# UpSpeech Documentation

Index of architecture & design references.

## MVP Planning & Tracking

- [MVP Roadmap](./MVP_ROADMAP.md) - 7-phase implementation plan with detailed specs
- [Implementation Status](./IMPLEMENTATION_STATUS.md) - Current feature completion tracking
- [Claude Context](../../.claude/claude.md) - AI assistant context and current priorities

## Core Design Docs

- [System Design](SYSTEM_DESIGN.md) - Overall architecture and technical decisions
- [Multi-Tenancy](MULTI_TENANCY.md) - Multi-tenant isolation strategy
- [Authentication Flow](AUTH_FLOW.md) - Authentication and session management
- [Permissions & Authorization](PERMISSIONS.md) - Role-based access control
- [Jobs & Processing (Queue Decision)](JOBS_AND_PROCESSING.md) - Background job strategy

## Deployment & Infrastructure

- [Railway Deployment](RAILWAY_DEPLOYMENT.md) - Deployment configuration and setup
- [EmailJS Setup](EMAILJS_SETUP.md) - Email integration configuration
- [Database Indexing Strategy](database-indexing-strategy.md) - Database optimization
- [AI Service Endpoints](AI_SERVICE_ENDPOINTS.md) - FastAPI service documentation

## Upcoming / Planned

- Deployment (Railway) – forthcoming
- API Reference – auto-generated later
- Prompt Engineering Guidelines – forthcoming

## Conventions

- All diagrams use Mermaid; regenerate locally via VS Code extension or CI check later.
- ADRs (Architectural Decision Records) live under `docs/adr/`.

## Editing Guidelines

1. Keep sections concise; move deep dives to separate files.
2. When changing a system behavior, add or update an ADR.
3. Use TODO comments with an owner or target date when possible.

---

PRs that alter design docs should include a summary of impact in the description.
