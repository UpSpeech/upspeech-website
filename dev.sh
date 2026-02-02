#!/bin/bash

# UpSpeech Development Environment Manager

set -e

COMPOSE_FILE="docker-compose.dev.yml"
ENV_FILE=".env.docker"

case "$1" in
  "start"|"up")
    echo "🚀 Starting UpSpeech development environment..."
    docker-compose --env-file $ENV_FILE -f $COMPOSE_FILE up -d
    echo "✅ Services started!"
    echo ""
    echo "📋 Service URLs:"
    echo "   Frontend: http://localhost:3001"
    echo "   Backend:  http://localhost:3000"
    echo "   Website:  http://localhost:8080"
    echo "   AI Service: http://localhost:8081"
    echo "   Database: postgresql://postgres:postgres@localhost:5432/upspeech_development"
    echo ""
    echo "📝 Run 'docker-compose -f $COMPOSE_FILE logs -f' to view logs"
    ;;

  "stop"|"down")
    echo "🛑 Stopping UpSpeech development environment..."
    docker-compose --env-file $ENV_FILE -f $COMPOSE_FILE down
    echo "✅ Services stopped!"
    ;;

  "restart")
    echo "🔄 Restarting UpSpeech development environment..."
    docker-compose --env-file $ENV_FILE -f $COMPOSE_FILE down
    docker-compose --env-file $ENV_FILE -f $COMPOSE_FILE up -d
    echo "✅ Services restarted!"
    ;;

  "logs")
    SERVICE=${2:-}
    if [ -n "$SERVICE" ]; then
      docker-compose --env-file $ENV_FILE -f $COMPOSE_FILE logs -f $SERVICE
    else
      docker-compose --env-file $ENV_FILE -f $COMPOSE_FILE logs -f
    fi
    ;;

  "build")
    echo "🔨 Building UpSpeech development images..."
    docker-compose --env-file $ENV_FILE -f $COMPOSE_FILE build --no-cache
    echo "✅ Images built!"
    ;;

  "clean")
    echo "🧹 Cleaning up Docker resources..."
    docker-compose --env-file $ENV_FILE -f $COMPOSE_FILE down -v
    docker system prune -f
    echo "✅ Cleanup complete!"
    ;;

  "status")
    echo "📊 UpSpeech development environment status:"
    docker-compose --env-file $ENV_FILE -f $COMPOSE_FILE ps
    ;;

  "shell")
    SERVICE=${2:-backend}
    echo "🐚 Opening shell in $SERVICE container..."
    docker-compose --env-file $ENV_FILE -f $COMPOSE_FILE exec $SERVICE bash
    ;;

  "migrate")
    echo "🗄️  Running database migrations..."
    docker-compose --env-file $ENV_FILE -f $COMPOSE_FILE exec backend rails db:migrate
    echo "✅ Migrations complete!"
    ;;

  "seed")
    echo "🌱 Seeding database..."
    docker-compose --env-file $ENV_FILE -f $COMPOSE_FILE exec backend rails db:seed
    echo "✅ Database seeded!"
    ;;

  "queue-setup")
    echo "🔧 Setting up Solid Queue tables..."
    docker-compose --env-file $ENV_FILE -f $COMPOSE_FILE exec backend rails runner "load('db/queue_schema.rb')"
    echo "✅ Solid Queue tables created!"
    ;;

  "setup")
    echo "⚙️  Setting up UpSpeech development environment..."
    echo ""

    # Check if required directories exist
    if [ ! -d "../app-backend" ] || [ ! -d "../app-frontend" ] || [ ! -d "../upspeech-ai" ]; then
      echo "❌ Error: Required repositories not found!"
      echo ""
      echo "Missing one or more of the following directories:"
      [ ! -d "../app-backend" ] && echo "  • app-backend/"
      [ ! -d "../app-frontend" ] && echo "  • app-frontend/"
      [ ! -d "../upspeech-ai" ] && echo "  • upspeech-ai/"
      echo ""
      echo "💡 Solution: Run './bootstrap.sh' to clone all required repositories."
      echo ""
      exit 1
    fi

    # Note: upspeech-website is in the current directory (.), so no need to check for it

    # Check for environment file
    if [ ! -f ".env.docker" ]; then
      echo "⚠️  Warning: .env.docker not found"
      echo "💡 Creating from .env.docker.example..."
      if [ -f ".env.docker.example" ]; then
        cp .env.docker.example .env.docker
        echo "✅ .env.docker created!"
        echo ""
        echo "⚠️  IMPORTANT: You must update .env.docker with the following required values:"
        echo ""
        echo "🔐 Rails Secrets (generate with: openssl rand -hex 64):"
        echo "    • RAILS_MASTER_KEY       - Required for Rails credentials"
        echo "    • SECRET_KEY_BASE        - Required for secure sessions"
        echo "    • JWT_SECRET_KEY         - Required for JWT authentication"
        echo "    • DEVISE_SECRET_KEY      - Required for Devise sessions"
        echo ""
        echo "🤖 AI Service:"
        echo "    • GROQ_API_KEY           - Get from https://console.groq.com/keys"
        echo ""
        echo "☁️  Google Cloud Storage:"
        echo "    • GCS_BUCKET             - Bucket name (e.g., upspeech-dev)"
        echo "    • GCS_PROJECT_ID         - GCP project ID"
        echo "    • GCS_CREDENTIALS_PATH   - Path to service account JSON"
        echo ""
        echo "📝 Edit the file now:"
        echo "    nano .env.docker"
        echo "    # or use your preferred editor"
        echo ""
        echo "💡 Generate secrets:"
        echo "    openssl rand -hex 32  # For RAILS_MASTER_KEY"
        echo "    openssl rand -hex 64  # For SECRET_KEY_BASE, JWT_SECRET_KEY, DEVISE_SECRET_KEY"
        echo ""
        read -p "Press Enter after updating .env.docker to continue setup..."
        echo ""
      else
        echo "❌ Error: .env.docker.example not found"
        exit 1
      fi
    fi

    echo "🔨 Building Docker images..."
    docker-compose --env-file $ENV_FILE -f $COMPOSE_FILE build

    echo "🚀 Starting database..."
    docker-compose --env-file $ENV_FILE -f $COMPOSE_FILE up -d postgres

    echo "⏳ Waiting for database to be ready..."
    sleep 10

    echo "🗄️  Creating and seeding database..."
    docker-compose --env-file $ENV_FILE -f $COMPOSE_FILE exec backend rails db:create db:migrate db:seed

    echo "🔧 Setting up Solid Queue..."
    docker-compose --env-file $ENV_FILE -f $COMPOSE_FILE exec backend rails runner "load('db/queue_schema.rb')"

    echo "🚀 Starting all services..."
    docker-compose --env-file $ENV_FILE -f $COMPOSE_FILE up -d

    echo ""
    echo "✅ Development environment ready!"
    echo ""
    echo "📋 Service URLs:"
    echo "   Frontend: http://localhost:3001"
    echo "   Backend:  http://localhost:3000"
    echo "   Website:  http://localhost:8080"
    echo "   AI Service: http://localhost:8081"
    echo ""
    echo "⚠️  NOTE: AI features require GROQ_API_KEY in .env.docker"
    echo "⚠️  NOTE: File uploads require GCS credentials in .env.docker"
    echo ""
    echo "💡 Next steps:"
    echo "   • Run '$0 health' to check service health"
    echo "   • Run '$0 env:check' to validate environment variables"
    echo "   • Run '$0 logs' to view logs"
    echo "   • Run '$0 help' for all available commands"
    echo ""
    ;;

  "bundle")
    echo "💎 Installing gems in backend container..."
    docker-compose --env-file $ENV_FILE -f $COMPOSE_FILE run --rm backend bundle install
    echo "✅ Gems installed!"
    ;;

  # ============================================
  # TESTING COMMANDS
  # ============================================

  "test"|"test:all")
    echo "🧪 Running all tests..."
    echo ""
    echo "📦 Backend tests:"
    docker-compose --env-file $ENV_FILE -f $COMPOSE_FILE exec backend bundle exec rspec
    echo ""
    echo "📦 Frontend tests:"
    docker-compose --env-file $ENV_FILE -f $COMPOSE_FILE exec frontend npm run test -- --run
    echo ""
    echo "✅ All tests completed!"
    ;;

  "test:backend")
    TEST_PATH=${2:-}
    if [ -n "$TEST_PATH" ]; then
      echo "🧪 Running backend tests: $TEST_PATH"
      docker-compose --env-file $ENV_FILE -f $COMPOSE_FILE exec backend bundle exec rspec $TEST_PATH
    else
      echo "🧪 Running all backend tests..."
      docker-compose --env-file $ENV_FILE -f $COMPOSE_FILE exec backend bundle exec rspec
    fi
    ;;

  "test:backend:coverage")
    echo "🧪 Running backend tests with coverage..."
    docker-compose --env-file $ENV_FILE -f $COMPOSE_FILE exec backend bash -c "COVERAGE=true bundle exec rspec"
    echo "✅ Coverage report generated in app-backend/coverage/"
    ;;

  "test:frontend")
    TEST_PATH=${2:-}
    if [ -n "$TEST_PATH" ]; then
      echo "🧪 Running frontend tests: $TEST_PATH"
      docker-compose --env-file $ENV_FILE -f $COMPOSE_FILE exec frontend npm run test -- --run $TEST_PATH
    else
      echo "🧪 Running all frontend tests..."
      docker-compose --env-file $ENV_FILE -f $COMPOSE_FILE exec frontend npm run test -- --run
    fi
    ;;

  "test:frontend:coverage")
    echo "🧪 Running frontend tests with coverage..."
    docker-compose --env-file $ENV_FILE -f $COMPOSE_FILE exec frontend npm run test -- --coverage --run
    echo "✅ Coverage report generated in app-frontend/coverage/"
    ;;

  "test:frontend:watch")
    echo "🧪 Running frontend tests in watch mode..."
    docker-compose --env-file $ENV_FILE -f $COMPOSE_FILE exec frontend npm run test -- --watch
    ;;

  "test:storybook")
    echo "🎨 Running Storybook interaction tests..."
    echo "⚠️  Note: Storybook must be running (./dev.sh storybook:start)"
    docker-compose --env-file $ENV_FILE -f $COMPOSE_FILE exec frontend npm run test:storybook
    ;;

  "test:storybook:ci")
    echo "🎨 Running Storybook tests in CI mode..."
    echo "📦 Building Storybook first..."
    docker-compose --env-file $ENV_FILE -f $COMPOSE_FILE exec frontend npm run build-storybook
    echo "🧪 Running tests against static build..."
    docker-compose --env-file $ENV_FILE -f $COMPOSE_FILE exec frontend npx concurrently -k -s first -n "SB,TEST" \
      "npx http-server storybook-static --port 6006 --silent" \
      "npx wait-on tcp:6006 && npm run test:storybook:ci"
    ;;

  "storybook:start")
    echo "🎨 Starting Storybook dev server..."
    docker-compose --env-file $ENV_FILE -f $COMPOSE_FILE exec -d frontend npm run storybook
    echo "✅ Storybook started at http://localhost:6006"
    ;;

  # ============================================
  # GIT OPERATIONS
  # ============================================

  "git:pull")
    echo "📥 Pulling latest changes from all repositories..."
    echo ""

    for dir in ../app-backend ../app-frontend ../upspeech-ai .; do
      repo_name=$(basename $dir)
      echo "📦 $repo_name:"
      (cd $dir && git pull) || echo "⚠️  Failed to pull $repo_name"
      echo ""
    done

    echo "✅ All repositories updated!"
    ;;

  "git:status")
    echo "📊 Git status for all repositories:"
    echo ""

    for dir in ../app-backend ../app-frontend ../upspeech-ai .; do
      repo_name=$(basename $dir)
      echo "=========================================="
      echo "📦 $repo_name"
      echo "=========================================="
      (cd $dir && git status)
      echo ""
    done
    ;;

  "git:branch")
    echo "🌿 Current branches:"
    echo ""

    for dir in ../app-backend ../app-frontend ../upspeech-ai .; do
      repo_name=$(basename $dir)
      branch=$(cd $dir && git branch --show-current)
      echo "📦 $repo_name: $branch"
    done
    echo ""
    ;;

  "git:fetch")
    echo "📥 Fetching from all repositories..."
    echo ""

    for dir in ../app-backend ../app-frontend ../upspeech-ai .; do
      repo_name=$(basename $dir)
      echo "📦 $repo_name:"
      (cd $dir && git fetch) || echo "⚠️  Failed to fetch $repo_name"
      echo ""
    done

    echo "✅ Fetch completed for all repositories!"
    ;;

  # ============================================
  # LINTING COMMANDS
  # ============================================

  "lint"|"lint:all")
    echo "🔍 Running all linters..."
    echo ""
    echo "📦 Backend (RuboCop):"
    docker-compose --env-file $ENV_FILE -f $COMPOSE_FILE exec backend bin/rubocop
    echo ""
    echo "📦 Frontend (ESLint + Prettier):"
    docker-compose --env-file $ENV_FILE -f $COMPOSE_FILE exec frontend npm run lint
    echo ""
    echo "✅ All linting completed!"
    ;;

  "lint:backend")
    echo "🔍 Running RuboCop..."
    docker-compose --env-file $ENV_FILE -f $COMPOSE_FILE exec backend bin/rubocop
    ;;

  "lint:frontend")
    echo "🔍 Running ESLint + Prettier..."
    docker-compose --env-file $ENV_FILE -f $COMPOSE_FILE exec frontend npm run lint
    ;;

  "lint:fix:backend")
    echo "🔧 Auto-fixing RuboCop issues..."
    docker-compose --env-file $ENV_FILE -f $COMPOSE_FILE exec backend bin/rubocop -a
    echo "✅ RuboCop auto-fix completed!"
    ;;

  "lint:fix:frontend")
    echo "🔧 Auto-fixing ESLint + Prettier issues..."
    docker-compose --env-file $ENV_FILE -f $COMPOSE_FILE exec frontend npm run lint:fix
    echo "✅ Frontend linting auto-fix completed!"
    ;;

  # ============================================
  # DATABASE COMMANDS
  # ============================================

  "db:reset")
    echo "🔄 Resetting database (drop, create, migrate, seed)..."
    docker-compose --env-file $ENV_FILE -f $COMPOSE_FILE exec backend rails db:drop db:create db:migrate db:seed
    echo "🔧 Setting up Solid Queue..."
    docker-compose --env-file $ENV_FILE -f $COMPOSE_FILE exec backend rails runner "load('db/queue_schema.rb')"
    echo "✅ Database reset complete!"
    ;;

  "db:drop")
    echo "🗑️  Dropping database..."
    docker-compose --env-file $ENV_FILE -f $COMPOSE_FILE exec backend rails db:drop
    echo "✅ Database dropped!"
    ;;

  "db:console")
    echo "🗄️  Opening PostgreSQL console..."
    docker-compose --env-file $ENV_FILE -f $COMPOSE_FILE exec postgres psql -U postgres upspeech_development
    ;;

  # ============================================
  # SERVICE-SPECIFIC OPERATIONS
  # ============================================

  "rebuild")
    SERVICE=${2:-}
    if [ -z "$SERVICE" ]; then
      echo "❌ Error: Please specify a service to rebuild"
      echo "Usage: $0 rebuild [service]"
      echo "Available services: backend, frontend, website, ai-service, worker, postgres"
      exit 1
    fi

    echo "🔨 Rebuilding $SERVICE..."
    docker-compose --env-file $ENV_FILE -f $COMPOSE_FILE build $SERVICE
    docker-compose --env-file $ENV_FILE -f $COMPOSE_FILE up -d --no-deps $SERVICE
    echo "✅ $SERVICE rebuilt and restarted!"
    ;;

  # ============================================
  # HEALTH & VALIDATION
  # ============================================

  "health")
    echo "🏥 Checking service health..."
    echo ""

    # Check Docker container status
    echo "📦 Docker Containers:"
    docker-compose --env-file $ENV_FILE -f $COMPOSE_FILE ps
    echo ""

    # Check HTTP endpoints
    echo "🌐 HTTP Endpoints:"

    # Backend health check
    if curl -f -s http://localhost:3000/api/v1/health > /dev/null 2>&1 || curl -f -s http://localhost:3000 > /dev/null 2>&1; then
      echo "✅ Backend (http://localhost:3000) - Healthy"
    else
      echo "❌ Backend (http://localhost:3000) - Unhealthy"
    fi

    # Frontend health check
    if curl -f -s http://localhost:3001 > /dev/null 2>&1; then
      echo "✅ Frontend (http://localhost:3001) - Healthy"
    else
      echo "❌ Frontend (http://localhost:3001) - Unhealthy"
    fi

    # Website health check
    if curl -f -s http://localhost:8080 > /dev/null 2>&1; then
      echo "✅ Website (http://localhost:8080) - Healthy"
    else
      echo "❌ Website (http://localhost:8080) - Unhealthy"
    fi

    # AI Service health check
    if curl -f -s http://localhost:8081/health > /dev/null 2>&1 || curl -f -s http://localhost:8081 > /dev/null 2>&1; then
      echo "✅ AI Service (http://localhost:8081) - Healthy"
    else
      echo "❌ AI Service (http://localhost:8081) - Unhealthy"
    fi

    echo ""
    echo "Database:"

    # PostgreSQL health check
    if docker-compose --env-file $ENV_FILE -f $COMPOSE_FILE exec postgres pg_isready -U postgres > /dev/null 2>&1; then
      echo "✅ PostgreSQL - Healthy"
    else
      echo "❌ PostgreSQL - Unhealthy"
    fi

    echo ""
    ;;

  "env:check")
    echo "🔍 Validating environment variables..."
    echo ""

    MISSING_VARS=0

    # Check for .env.docker (the ONLY env file needed for Docker)
    echo "📋 Environment File:"
    if [ -f ".env.docker" ]; then
      echo "✅ .env.docker exists"
      # Load environment variables from .env.docker
      set -a
      source .env.docker
      set +a
    else
      echo "❌ .env.docker missing (run: cp .env.docker.example .env.docker)"
      MISSING_VARS=1
      echo ""
      echo "⚠️  Cannot validate variables without .env.docker file"
      exit 1
    fi

    echo ""
    echo "🔑 Critical Variables (Required):"

    # AI Service
    if [ -z "$GROQ_API_KEY" ]; then
      echo "❌ GROQ_API_KEY not set (required for AI features)"
      MISSING_VARS=1
    else
      echo "✅ GROQ_API_KEY is set"
    fi

    # Rails Secrets
    if [ -z "$RAILS_MASTER_KEY" ]; then
      echo "❌ RAILS_MASTER_KEY not set (required for credentials)"
      MISSING_VARS=1
    else
      echo "✅ RAILS_MASTER_KEY is set"
    fi

    if [ -z "$SECRET_KEY_BASE" ]; then
      echo "❌ SECRET_KEY_BASE not set (required for sessions)"
      MISSING_VARS=1
    else
      echo "✅ SECRET_KEY_BASE is set"
    fi

    if [ -z "$JWT_SECRET_KEY" ]; then
      echo "❌ JWT_SECRET_KEY not set (required for JWT auth)"
      MISSING_VARS=1
    else
      echo "✅ JWT_SECRET_KEY is set"
    fi

    if [ -z "$DEVISE_SECRET_KEY" ]; then
      echo "❌ DEVISE_SECRET_KEY not set (required for Devise)"
      MISSING_VARS=1
    else
      echo "✅ DEVISE_SECRET_KEY is set"
    fi

    # Google Cloud Storage
    if [ -z "$GCS_BUCKET" ]; then
      echo "❌ GCS_BUCKET not set (required for file uploads)"
      MISSING_VARS=1
    else
      echo "✅ GCS_BUCKET is set"
    fi

    if [ -z "$GCS_PROJECT_ID" ]; then
      echo "❌ GCS_PROJECT_ID not set (required for GCS)"
      MISSING_VARS=1
    else
      echo "✅ GCS_PROJECT_ID is set"
    fi

    if [ -z "$GCS_CREDENTIALS_PATH" ] && [ -z "$GCS_CREDENTIALS_JSON" ]; then
      echo "❌ GCS credentials not set (need GCS_CREDENTIALS_PATH or GCS_CREDENTIALS_JSON)"
      MISSING_VARS=1
    else
      echo "✅ GCS credentials configured"
    fi

    echo ""
    echo "📦 Optional Variables (with defaults):"

    # Optional with defaults
    if [ -z "$CLIP_BUFFER_SECONDS" ]; then
      echo "⚠️  CLIP_BUFFER_SECONDS not set (will use default: 5)"
    else
      echo "✅ CLIP_BUFFER_SECONDS is set: $CLIP_BUFFER_SECONDS"
    fi

    if [ -z "$CHAT_MESSAGE_HISTORY_LIMIT" ]; then
      echo "⚠️  CHAT_MESSAGE_HISTORY_LIMIT not set (will use default: 15)"
    else
      echo "✅ CHAT_MESSAGE_HISTORY_LIMIT is set: $CHAT_MESSAGE_HISTORY_LIMIT"
    fi

    echo ""
    if [ $MISSING_VARS -eq 0 ]; then
      echo "✅ Environment validation passed!"
    else
      echo "⚠️  Some environment files are missing. Run 'cp .env.docker.example .env.docker' to create them."
    fi
    ;;

  *)
    echo "UpSpeech Development Environment Manager"
    echo ""
    echo "Usage: $0 {command} [options]"
    echo ""
    echo "═══════════════════════════════════════════════════════════════"
    echo "SERVICE MANAGEMENT"
    echo "═══════════════════════════════════════════════════════════════"
    echo "  start              Start all services"
    echo "  stop               Stop all services"
    echo "  restart            Restart all services"
    echo "  status             Show service status"
    echo "  build              Build all Docker images"
    echo "  rebuild [service]  Rebuild specific service (backend, frontend, ai-service, etc.)"
    echo "  clean              Stop services and clean up Docker resources"
    echo "  shell [service]    Open bash shell in container (default: backend)"
    echo "  logs [service]     View logs (all services or specific one)"
    echo ""
    echo "═══════════════════════════════════════════════════════════════"
    echo "DATABASE"
    echo "═══════════════════════════════════════════════════════════════"
    echo "  migrate            Run database migrations"
    echo "  seed               Seed database with sample data"
    echo "  queue-setup        Set up Solid Queue tables"
    echo "  db:reset           Drop, create, migrate, and seed database"
    echo "  db:drop            Drop database"
    echo "  db:console         Open PostgreSQL console"
    echo ""
    echo "═══════════════════════════════════════════════════════════════"
    echo "TESTING"
    echo "═══════════════════════════════════════════════════════════════"
    echo "  test                         Run all tests (backend + frontend)"
    echo "  test:backend [path]          Run backend RSpec tests (all or specific path)"
    echo "  test:backend:coverage        Run backend tests with coverage report"
    echo "  test:frontend [path]         Run frontend Vitest tests (all or specific path)"
    echo "  test:frontend:coverage       Run frontend tests with coverage report"
    echo "  test:frontend:watch          Run frontend tests in watch mode"
    echo "  test:storybook               Run Storybook interaction tests (requires Storybook running)"
    echo "  test:storybook:ci            Run Storybook tests in CI mode (builds Storybook first)"
    echo "  storybook:start              Start Storybook dev server"
    echo ""
    echo "═══════════════════════════════════════════════════════════════"
    echo "CODE QUALITY"
    echo "═══════════════════════════════════════════════════════════════"
    echo "  lint                   Run all linters (backend + frontend)"
    echo "  lint:backend           Run RuboCop (Ruby linter)"
    echo "  lint:frontend          Run ESLint + Prettier (JS/TS linter)"
    echo "  lint:fix:backend       Auto-fix RuboCop issues"
    echo "  lint:fix:frontend      Auto-fix ESLint + Prettier issues"
    echo ""
    echo "═══════════════════════════════════════════════════════════════"
    echo "GIT OPERATIONS"
    echo "═══════════════════════════════════════════════════════════════"
    echo "  git:pull           Pull latest changes from all repositories"
    echo "  git:status         Show git status for all repositories"
    echo "  git:branch         Show current branch for all repositories"
    echo "  git:fetch          Fetch from all repositories"
    echo ""
    echo "═══════════════════════════════════════════════════════════════"
    echo "UTILITIES"
    echo "═══════════════════════════════════════════════════════════════"
    echo "  setup              Complete initial setup (build, migrate, seed, queue)"
    echo "  bundle             Install gems in backend container"
    echo "  health             Check all services (Docker + HTTP endpoints)"
    echo "  env:check          Validate environment variables and files"
    echo ""
    echo "═══════════════════════════════════════════════════════════════"
    echo "EXAMPLES"
    echo "═══════════════════════════════════════════════════════════════"
    echo "  # Daily development"
    echo "  $0 start                                # Start all services"
    echo "  $0 logs backend                         # Watch backend logs"
    echo ""
    echo "  # Running tests"
    echo "  $0 test                                 # Run all tests"
    echo "  $0 test:backend spec/models/user_spec.rb  # Run specific test"
    echo "  $0 test:frontend:coverage               # Frontend tests with coverage"
    echo ""
    echo "  # Code quality"
    echo "  $0 lint                                 # Run all linters"
    echo "  $0 lint:fix:backend                     # Auto-fix Ruby issues"
    echo ""
    echo "  # Git operations"
    echo "  $0 git:pull                             # Pull all repos"
    echo "  $0 git:status                           # Status of all repos"
    echo ""
    echo "  # Database management"
    echo "  $0 db:reset                             # Reset database"
    echo "  $0 db:console                           # Open psql console"
    echo ""
    echo "  # Service operations"
    echo "  $0 rebuild backend                      # Rebuild backend only"
    echo "  $0 shell frontend                       # Shell in frontend container"
    echo ""
    echo "═══════════════════════════════════════════════════════════════"
    echo "TIPS"
    echo "═══════════════════════════════════════════════════════════════"
    echo "  • First time setup: Run './bootstrap.sh' to clone all repos, then './dev.sh setup'"
    echo "  • Check service health: ./dev.sh health"
    echo "  • Validate environment: ./dev.sh env:check"
    echo "  • After pulling changes: ./dev.sh build && ./dev.sh migrate"
    echo ""
    ;;
esac
