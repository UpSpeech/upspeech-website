# UpSpeech Docker Development Environment

This directory contains Docker configurations for running the complete UpSpeech stack locally, mimicking the production environment.

## Quick Start

### 1. Prerequisites

- Docker Desktop installed and running
- Git repository cloned with all subdirectories

### 2. Environment Setup

```bash
# Copy environment template
cp .env.docker.example .env.docker

# Edit the environment file with your actual values
vim .env.docker
```

### 3. Start Development Environment

```bash
# One-time setup (builds images, creates database, runs migrations)
./dev.sh setup

# Or start services individually
./dev.sh start
```

### 4. Access Your Application

- **Frontend**: http://localhost:3051
- **Backend API**: http://localhost:3050
- **Database**: postgresql://postgres:postgres@localhost:5432/upspeech_development
- **Redis**: redis://localhost:6379
- **AI Service**: http://localhost:3053

## Development Commands

### Service Management

```bash
./dev.sh start     # Start all services
./dev.sh stop      # Stop all services
./dev.sh restart   # Restart all services
./dev.sh status    # Check service status
```

### Development Tools

```bash
./dev.sh logs              # View all logs
./dev.sh logs frontend     # View specific service logs
./dev.sh shell backend     # Open shell in backend container
./dev.sh shell frontend    # Open shell in frontend container
```

### Database Operations

```bash
./dev.sh migrate   # Run database migrations
./dev.sh seed      # Seed database with demo data
```

### Maintenance

```bash
./dev.sh build     # Rebuild all images
./dev.sh clean     # Stop services and clean up volumes
```

## Architecture

### Services

1. **postgres** - PostgreSQL 16 database
2. **redis** - Redis for caching and background jobs
3. **backend** - Rails 8 API server (port 3050)
4. **frontend** - React + Vite development server (port 3051)
5. **ai-service** - Python FastAPI service (port 3053)

### Volumes

- `postgres_data` - Database persistence
- `redis_data` - Redis persistence
- `bundle_cache` - Ruby gems cache
- `node_modules` - Node.js dependencies cache

### Networks

- `upspeech-network` - Internal Docker network for service communication

## Development vs Production

### Development Features

- Hot reloading for frontend and backend
- Source code mounted as volumes
- Debug ports exposed
- Development database seeded with demo data

### Production Features

- Optimized builds
- No source code mounting
- SSL/TLS termination
- Environment-based configuration

## Troubleshooting

### Common Issues

**Port conflicts:**

```bash
# Check what's using ports
lsof -i :3050
lsof -i :3051

# Stop conflicting services
./dev.sh stop
```

**Database issues:**

```bash
# Reset database
./dev.sh clean
./dev.sh setup
```

**Build issues:**

```bash
# Clean rebuild
./dev.sh build
```

**Permission issues:**

```bash
# Fix file permissions
sudo chown -R $USER:$USER .
```

### Service Debugging

**Backend logs:**

```bash
./dev.sh logs backend
```

**Frontend logs:**

```bash
./dev.sh logs frontend
```

**Database connection test:**

```bash
./dev.sh shell backend
# Inside container:
rails dbconsole
```

**Redis connection test:**

```bash
docker exec -it upspeech_redis_dev redis-cli ping
```

## Environment Variables

### Required for Development

- `GROQ_API_KEY` - For AI transcription service
- `RAILS_MASTER_KEY` - Rails encryption key

### Optional

- `POSTGRES_USER` - Database user (default: postgres)
- `POSTGRES_PASSWORD` - Database password (default: postgres)

### Production Additional

- `SECRET_KEY_BASE` - Rails secret key
- `FRONTEND_URL` - Production frontend URL
- `BACKEND_URL` - Production API URL

## File Structure

```
.
├── docker-compose.dev.yml      # Development stack
├── docker-compose.prod.yml     # Production stack
├── dev.sh                      # Development management script
├── .env.docker.example         # Environment template
└── services/
    ├── app-backend/
    │   ├── Dockerfile.dev      # Rails development image
    │   └── Dockerfile          # Rails production image
    ├── app-frontend/
    │   ├── Dockerfile.dev      # React development image
    │   ├── Dockerfile          # React production image
    │   └── nginx.conf          # Production nginx config
    └── upspeech-ai/
        └── Dockerfile          # Python AI service
```

## Contributing

When adding new services or modifying the Docker setup:

1. Update the appropriate Dockerfile
2. Modify docker-compose files as needed
3. Update this README
4. Test both development and production builds
5. Update the dev.sh script if new commands are needed

## Production Deployment

For production deployment, use:

```bash
# Build production images
docker-compose -f docker-compose.prod.yml build

# Deploy to production
docker-compose -f docker-compose.prod.yml up -d
```

Make sure to set all required environment variables in your production environment.
