# UpSpeech - Development Environment

**Main repository for UpSpeech development** - A multi-tenant SaaS platform for speech-language pathologists (SLPs) and their patients, focused on stuttering therapy. Uses AI to automate clinical report writing and provide speech analysis tools.

## 🚀 Quick Start

This repository contains orchestration scripts to manage all UpSpeech services. Start here for development!

### Prerequisites

- Docker and Docker Compose
- Git
- SSH access to GitHub (for cloning private repos)

### First Time Setup

```bash
# 1. Clone this repository
git clone git@github.com:UpSpeech/upspeech-website.git
cd upspeech-website

# 2. Clone all other repositories
./bootstrap.sh

# 3. Configure environment variables
cp .env.docker.example .env.docker
nano .env.docker  # Set GROQ_API_KEY, RAILS_MASTER_KEY, SECRET_KEY_BASE

# 4. Initialize and start all services
./dev.sh setup

# 5. Verify everything is working
./dev.sh health
./dev.sh env:check
```

After setup, services will be available at:

- **Frontend**: http://localhost:3001
- **Backend API**: http://localhost:3000
- **AI Service**: http://localhost:8081

## 📁 Repository Structure

This is a **multi-repository project**:

```
parent-directory/
├── app-backend/          # Rails 8 API (Ruby 3.4.7)
├── app-frontend/         # React 19 + TypeScript + Vite
├── upspeech-ai/          # FastAPI Python service
└── upspeech-website/     # This repo (orchestration + docs)
    ├── bootstrap.sh      # Clone all repositories
    ├── dev.sh           # Manage all services
    └── docs/            # Complete documentation
```

## 🛠️ Development Commands

All development is managed through `./dev.sh`:

### Service Management

```bash
./dev.sh start              # Start all services
./dev.sh stop               # Stop all services
./dev.sh restart            # Restart all services
./dev.sh status             # Show service status
./dev.sh logs [service]     # View logs
./dev.sh shell [service]    # Open shell in container
./dev.sh rebuild [service]  # Rebuild specific service
```

### Testing

```bash
./dev.sh test                      # Run all tests
./dev.sh test:backend [path]       # Backend RSpec tests
./dev.sh test:backend:coverage     # Backend with coverage
./dev.sh test:frontend [path]      # Frontend Vitest tests
./dev.sh test:frontend:coverage    # Frontend with coverage
./dev.sh test:frontend:watch       # Watch mode
```

### Code Quality

```bash
./dev.sh lint                  # Run all linters
./dev.sh lint:backend          # RuboCop only
./dev.sh lint:frontend         # ESLint + Prettier
./dev.sh lint:fix:backend      # Auto-fix Ruby issues
./dev.sh lint:fix:frontend     # Auto-fix JS/TS issues
```

### Database

```bash
./dev.sh migrate         # Run migrations
./dev.sh seed            # Seed database
./dev.sh db:reset        # Drop, create, migrate, seed
./dev.sh db:drop         # Drop database
./dev.sh db:console      # Open psql console
```

### Git Operations (Multi-Repo)

```bash
./dev.sh git:pull        # Pull all repositories
./dev.sh git:status      # Status of all repositories
./dev.sh git:branch      # Current branch for all repos
./dev.sh git:fetch       # Fetch all repositories
```

### Utilities

```bash
./dev.sh health          # Check all services (Docker + HTTP)
./dev.sh env:check       # Validate environment variables
./dev.sh help            # Show all commands
```

## 🔑 Environment Variables

Required variables in `.env.docker`:

| Variable           | Required? | Purpose                                |
| ------------------ | --------- | -------------------------------------- |
| `GROQ_API_KEY`     | ⚠️ Yes    | AI transcription and report generation |
| `RAILS_MASTER_KEY` | ⚠️ Yes    | Rails encrypted credentials            |
| `SECRET_KEY_BASE`  | ⚠️ Yes    | Secure session cookies                 |

Get your keys:

- **GROQ_API_KEY**: https://console.groq.com/keys
- **RAILS_MASTER_KEY**: Generate with `openssl rand -hex 32`
- **SECRET_KEY_BASE**: Generate with `openssl rand -hex 64`

## 📚 Documentation

Complete documentation in the `docs/` directory:

### Getting Started

- **[docs/README.md](docs/README.md)** - Documentation index
- **[docs/CONTRIBUTING.md](docs/CONTRIBUTING.md)** - Development workflow
- **[docs/CHANGELOG.md](docs/CHANGELOG.md)** - Sprint completions

### Planning

- **[docs/planning/MVP_ROADMAP.md](docs/planning/MVP_ROADMAP.md)** - 7-phase MVP plan
- **[docs/planning/TODO.md](docs/planning/TODO.md)** - Current sprint tasks

### Architecture

- **[docs/architecture/SYSTEM_DESIGN.md](docs/architecture/SYSTEM_DESIGN.md)** - System architecture
- **[docs/architecture/SERVICE_COMMUNICATION.md](docs/architecture/SERVICE_COMMUNICATION.md)** - API endpoints
- **[docs/architecture/TESTING_STRATEGY.md](docs/architecture/TESTING_STRATEGY.md)** - Testing guidelines
- **[docs/architecture/MULTI_TENANCY.md](docs/architecture/MULTI_TENANCY.md)** - Multi-tenancy
- **[docs/architecture/AUTH_FLOW.md](docs/architecture/AUTH_FLOW.md)** - Authentication
- **[docs/architecture/PERMISSIONS.md](docs/architecture/PERMISSIONS.md)** - Authorization (5 roles)
- **[docs/architecture/REPORT_TEMPLATES.md](docs/architecture/REPORT_TEMPLATES.md)** - Report templates
- **[docs/architecture/I18N_TRANSLATIONS.md](docs/architecture/I18N_TRANSLATIONS.md)** - i18n support

## 🏗️ Tech Stack

- **Backend**: Rails 8, PostgreSQL 16, Solid Queue
- **Frontend**: React 19, TypeScript, Vite, TailwindCSS v4
- **AI Service**: FastAPI, Groq API (Whisper + Llama)
- **Infrastructure**: Docker, Railway
- **Runtime**: Ruby 3.4.7, Node 22.17.1, Python 3.11+

## 🧪 Testing

Tests are required for all code changes:

```bash
# Backend (RSpec) - 80%+ coverage required
./dev.sh test:backend:coverage

# Frontend (Vitest) - 80%+ coverage required
./dev.sh test:frontend:coverage
```

See [TESTING_STRATEGY.md](docs/architecture/TESTING_STRATEGY.md) for guidelines.

## 📝 Pre-Commit Checklist

Before committing:

- ✅ All tests passing (`./dev.sh test`)
- ✅ Linters passing (`./dev.sh lint`)
- ✅ Coverage maintained (≥80%, 95% for critical paths)
- ✅ No TypeScript errors
- ✅ Follow conventional commits (feat:, fix:, docs:, etc.)

See [CONTRIBUTING.md](docs/CONTRIBUTING.md) for detailed workflow.

## 🚢 Common Workflows

### Daily Development

```bash
./dev.sh start              # Start services
./dev.sh logs backend       # Watch logs
./dev.sh test:frontend:watch # TDD workflow
```

### After Pulling Changes

```bash
./dev.sh git:pull          # Pull all repos
./dev.sh build             # Rebuild if dependencies changed
./dev.sh migrate           # Run new migrations
./dev.sh restart           # Restart services
```

### Debugging

```bash
./dev.sh health            # Check service health
./dev.sh logs backend      # View backend logs
./dev.sh shell backend     # Open Rails console
./dev.sh db:console        # Open psql console
```

### Working on Specific Service

```bash
./dev.sh rebuild backend   # Rebuild after Gemfile changes
./dev.sh restart backend   # Restart after code changes
./dev.sh test:backend      # Run backend tests
./dev.sh lint:backend      # Check code quality
```

## 🤝 Contributing

1. Read [CONTRIBUTING.md](docs/CONTRIBUTING.md)
2. Check [TODO.md](docs/planning/TODO.md) for current priorities
3. Create feature branch: `feature/phase-X-feature-name`
4. Write tests for all changes
5. Run full test suite and linters
6. Submit pull request

## 📊 Current Status (November 2025)

- **Phase 1** (Foundation): 100% ✅
- **Phase 2** (Report Writing): 100% ✅
- **Phase 3** (Speech Analysis): 50% 🚧
- **Phase 4** (Exercise Assignment): 100% ✅
- **Phase 5** (Progress Dashboard): 75% ✅
- **Phase 7** (Therapist Portal): 100% ✅

See [MVP_ROADMAP.md](docs/planning/MVP_ROADMAP.md) for details.

## 📞 Support

- **Issues**: Report bugs/features in GitHub Issues
- **Questions**: Check documentation first, then ask the team
- **Health Check**: Run `./dev.sh health` to diagnose issues

## 📄 License

[Your License Here]

---

**Last Updated**: 2025-11-26
**Ruby**: 3.4.7 | **Node**: 22.17.1 | **PostgreSQL**: 16
