# Railway Deployment Guide

## Overview

This guide will help you deploy the UpSpeech application to Railway with **3 separate services**: backend, frontend, and AI service.

**✅ What you need:** PostgreSQL database only (no Redis required)
**📁 Architecture:** 3 Railway services + 1 PostgreSQL database

## Prerequisites

1. Railway account (sign up at [railway.app](https://railway.app))
2. Railway CLI installed: `npm install -g @railway/cli`
3. Git repository pushed to GitHub/GitLab

## Project Structure

```
upspeech-website/
├── app-backend/          # Rails API + Solid Queue worker
├── app-frontend/         # React + Nginx
└── upspeech-ai/          # FastAPI service
```

## Deployment Steps

### 1. Install Railway CLI and Login

```bash
npm install -g @railway/cli
railway login
```

### 2. Create a New Railway Project

```bash
railway create upspeech
```

### 3. Deploy Backend Service

#### A. Navigate to backend directory and deploy

```bash
cd app-backend
railway up
```

#### B. Add environment variables in Railway dashboard:

- `RAILS_MASTER_KEY`: Get from `config/master.key`
- `DATABASE_URL`: Will be auto-generated when you add PostgreSQL
- `GROQ_API_KEY`: Your Groq API key
- `UPSPEECH_AI_URL`: Will be the AI service URL (set after AI service is deployed)
- `RAILS_ENV`: production

#### C. Add PostgreSQL database:

```bash
railway add --database postgresql
```

**⚠️ Important:** Do NOT add Redis - Solid Queue uses PostgreSQL for job storage.

### 4. Deploy AI Service

#### A. Navigate to AI directory and deploy as new service

```bash
cd ../upspeech-ai
railway up --service ai-service
```

#### B. Add environment variables:

- `GROQ_API_KEY`: Your Groq API key

#### C. Add volume for file storage:

In Railway dashboard for AI service:

1. Go to Settings → Volumes
2. Click "Add Volume"
3. Set volume name: `ai-file-storage`
4. Set mount path: `/app/uploads`
5. Set size: 5GB (adjust based on usage)
6. Click "Create Volume"

**⚠️ Important:** AI service requires persistent storage for file management between backend and worker containers.

### 5. Deploy Frontend Service

#### A. Navigate to frontend directory

```bash
cd ../app-frontend
```

#### B. Update production environment file

Edit `.env.production` and replace URLs with your actual Railway service URLs:

```
VITE_API_BASE_URL=https://your-backend-service.railway.app
VITE_API_URL=https://your-backend-service.railway.app/api/v1
VITE_APP_NAME=UpSpeech
VITE_NODE_ENV=production
```

#### C. Deploy frontend

```bash
railway up --service frontend
```

### 6. Update Environment Variables

#### A. Update backend with AI service URL:

- `UPSPEECH_AI_URL`: https://your-ai-service.railway.app

#### B. CSP is automatically configured based on environment variables - no manual updates needed.

### 7. Database Setup

```bash
# Connect to your backend service
railway shell --service backend

# Run database migrations
rails db:create db:migrate

# Optional: Seed data
rails db:seed
```

## Service URLs

After deployment, you'll have:

- **Frontend**: `https://your-frontend.railway.app`
- **Backend**: `https://your-backend.railway.app`
- **AI Service**: `https://your-ai-service.railway.app`

## Important Notes

### Backend Configuration

- **Queue System**: Solid Queue (database-backed, no Redis needed)
- **File Storage**: AI service handles all file storage (no backend volumes needed)
- **Health Check**: `/up`
- **Worker Process**: Runs in the same container as the web server
- **Memory Efficient**: Jobs only contain file_id references, not file content

### Frontend Configuration

- **Build Tool**: Vite with React
- **Web Server**: Nginx with React Router support
- **CSP**: Dynamically configured based on environment variables
- **Health Check**: `/` (serves the React app)

### AI Service Configuration

- **Framework**: FastAPI for audio transcription
- **Dependencies**: Groq API for transcription, ffmpeg for audio processing
- **Health Check**: `/health`
- **Endpoints**: `/upload`, `/process/{file_id}`, `/files/{file_id}`, `/generate-report/`
- **Storage**: Requires volume mount for persistent file storage

## Monitoring

- Use Railway's built-in monitoring dashboard
- Check logs for each service
- Set up alerts for service health

## Scaling

- Railway auto-scales based on traffic
- For heavy usage, consider upgrading plans
- Monitor resource usage in the dashboard

## Troubleshooting

### Common Issues

1. **CORS errors**: Check CSP configuration - it's automatically configured based on environment
2. **Database connection**: Check DATABASE_URL environment variable in backend service
3. **File upload issues**: Ensure AI service volume is properly mounted at `/app/uploads`
4. **Job processing**: Check Solid Queue logs (database-backed, no Redis involved)
5. **Service communication**: Ensure `UPSPEECH_AI_URL` points to the correct AI service URL
6. **Large file uploads**: Ensure AI service volume has sufficient space (monitor via `/health` endpoint)
7. **Memory issues**: With file_id approach, worker memory usage should be minimal

### Useful Commands

```bash
# Check service logs
railway logs --service backend

# Connect to service shell
railway shell --service backend

# View environment variables
railway variables

# Restart service
railway restart --service backend
```
