# Service Communication & API Integration Guide

**Last Updated**: 2025-11-07

## Overview

This document explains how the three main services (Frontend, Backend, AI Service) communicate with each other, how to add new API endpoints, and how to configure environment variables for inter-service communication.

## Architecture Diagram

```mermaid
sequenceDiagram
    participant F as Frontend<br/>(React/Vite)
    participant B as Backend<br/>(Rails API)
    participant Q as Background Jobs<br/>(Solid Queue)
    participant AI as AI Service<br/>(FastAPI)

    %% Audio Upload Flow
    F->>F: User uploads audio file
    F->>B: POST /api/v1/audio_recordings<br/>(multipart/form-data)
    B->>AI: POST /upload<br/>(file data)
    AI-->>B: {file_id, file_size}
    B->>B: Save AudioRecording with file_id
    B->>Q: Queue TranscriptionProcessorJob
    B-->>F: 201 Created {recording data}

    %% Background Processing
    Q->>AI: POST /process/{file_id}<br/>(Groq-Api-Key header)
    AI->>AI: Transcribe & Generate Report
    AI-->>Q: {transcript, report}
    Q->>B: Update DB (transcription, report)
    Q->>AI: DELETE /files/{file_id}
    AI-->>Q: 200 OK

    %% Frontend Polling/Viewing
    F->>B: GET /api/v1/audio_recordings/{id}
    B-->>F: {status: processed, reports, transcriptions}
```

## Service Endpoints Summary

| Service     | URL (Dev)             | URL (Prod) | Protocol |
| ----------- | --------------------- | ---------- | -------- |
| Frontend    | http://localhost:3001 | TBD        | HTTP     |
| Backend API | http://localhost:3000 | TBD        | HTTP     |
| AI Service  | http://localhost:8081 | TBD        | HTTP     |

---

## Frontend → Backend Communication

### API Client Configuration

**Location**: `app-frontend/src/lib/api.ts`

The frontend uses a singleton `ApiClient` class built on Axios with two separate clients:

```typescript
// Versioned API client (most endpoints)
this.client = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // http://localhost:3000/api/v1
  timeout: 30000,
});

// Unversioned client (auth only)
this.authClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // http://localhost:3000
  timeout: 30000,
});
```

### Authentication

**Method**: JWT Bearer Token (stored in localStorage)

```typescript
// Request interceptor adds JWT to all requests
this.client.interceptors.request.use(config => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor handles 401 (unauthorized)
client.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Clear auth data and redirect to login
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user_data");
      window.location.href = "/auth";
    }
    return Promise.reject(error);
  }
);
```

### Request Patterns

**Standard GET Request:**

```typescript
async getReports(params?: FilterParams): Promise<PaginatedResponse<Report>> {
  const response = await this.client.get<PaginatedResponse<Report>>(
    "/reports",
    { params }  // Query parameters
  );
  return response.data;
}
```

**POST with JSON Body:**

```typescript
async createReportNote(
  reportId: number,
  note: { note: string; visibility: string }
): Promise<ApiResponse<ReportNote>> {
  const response = await this.client.post(`/reports/${reportId}/notes`, {
    report_note: note  // Rails expects nested params
  });
  return response.data;
}
```

**File Upload (multipart/form-data):**

```typescript
async uploadAudioFile(
  file: File | Blob,
  metadata: { title?: string; description?: string }
): Promise<ApiResponse<AudioRecording>> {
  const formData = new FormData();
  formData.append("audio_file", file);
  if (metadata.title) formData.append("title", metadata.title);

  const response = await this.client.post<ApiResponse<AudioRecording>>(
    "/audio_recordings",
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
      timeout: 120000  // 2 minutes for large files
    }
  );
  return response.data;
}
```

### Environment Variables (Frontend)

**File**: `app-frontend/.env` (copy from `.env.example`)

```bash
# Required - API endpoints
VITE_API_URL=http://localhost:3000/api/v1          # Versioned API base URL
VITE_API_BASE_URL=http://localhost:3000            # Unversioned (auth only)

# Optional - App metadata
VITE_APP_NAME=UpSpeech
VITE_APP_VERSION=1.0.0
VITE_NODE_ENV=development
```

---

## Backend → AI Service Communication

### Communication Methods

The backend communicates with the AI service in **two ways**:

1. **Synchronously** (during upload) - Controller calls AI service directly
2. **Asynchronously** (for processing) - Background job calls AI service

### Method 1: Synchronous Upload (Controller)

**Location**: `app-backend/app/controllers/api/v1/audio_recordings_controller.rb`

```ruby
def upload_to_ai_service(uploaded_file)
  service_url = ENV.fetch('UPSPEECH_AI_URL', 'http://localhost:8081')

  connection = Faraday.new(url: service_url) do |conn|
    conn.request :multipart
    conn.request :url_encoded
    conn.adapter :net_http
    conn.options.timeout = 300  # 5 minutes
  end

  payload = {
    file: Faraday::UploadIO.new(
      uploaded_file,
      uploaded_file.content_type,
      uploaded_file.original_filename
    )
  }

  response = connection.post('/upload', payload)

  if response.success?
    result = JSON.parse(response.body, symbolize_names: true)
    {
      success: true,
      file_id: result[:file_id],        # UUID from AI service
      file_size: result[:file_size],
      duration: result[:duration]
    }
  else
    { success: false, error: "Upload failed: #{response.status}" }
  end
end
```

**Flow:**

1. Frontend → Backend: POST /api/v1/audio_recordings (file)
2. Backend → AI Service: POST /upload (file)
3. AI Service returns `file_id` (UUID)
4. Backend stores `file_id` in `audio_recording.metadata['ai_file_id']`
5. Backend queues `TranscriptionProcessorJob` with `file_id`

### Method 2: Async Processing (Background Job)

**Location**: `app-backend/app/jobs/transcription_processor_job.rb`

```ruby
def call_ai_service_with_file_id(audio_recording)
  service_url = ENV.fetch('UPSPEECH_AI_URL', 'http://localhost:8081')
  groq_api_key = ENV.fetch('GROQ_API_KEY')

  file_id = audio_recording.metadata&.dig('ai_file_id')
  raise "No AI file_id found" unless file_id

  connection = Faraday.new(url: service_url) do |conn|
    conn.request :url_encoded
    conn.adapter :net_http
    conn.options.timeout = 300  # 5 minutes
  end

  # Call AI service to process the file using file_id
  response = connection.post("/process/#{file_id}") do |req|
    req.headers['Groq-Api-Key'] = groq_api_key
    req.headers['Content-Type'] = 'application/json'
  end

  if response.success?
    result = JSON.parse(response.body, symbolize_names: true)
    { transcript: result[:transcript], report: result[:report] }
  else
    raise "AI service error: #{response.status} - #{response.body}"
  end
end
```

**Flow:**

1. Background job picks up queued work
2. Job → AI Service: POST /process/{file_id} (with Groq-Api-Key header)
3. AI Service transcribes audio and generates report
4. Job saves `Transcription` and `Report` records
5. Job → AI Service: DELETE /files/{file_id} (cleanup)

### Environment Variables (Backend)

**File**: `app-backend/.env` (copy from `.env.example`)

```bash
# Required - Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/upspeech_development

# Required - AI Service Integration
UPSPEECH_AI_URL=http://localhost:8081          # AI service base URL
GROQ_API_KEY=your_groq_api_key_here            # API key for Groq transcription

# Required - Rails/Authentication
RAILS_MASTER_KEY=your_rails_master_key_here
RAILS_ENV=development
JWT_SECRET_KEY=your_jwt_secret_key_here        # For JWT authentication
DEVISE_SECRET_KEY=your_devise_secret_here      # For Devise (generate with: rails secret)
```

**Generate secrets:**

```bash
cd app-backend
bundle exec rails secret  # For JWT_SECRET_KEY and DEVISE_SECRET_KEY
```

---

## AI Service Endpoints

### FastAPI Service

**Location**: `upspeech-ai/src/report_writer/endpoint.py`

**Port**: 8081 (IPv4), 8082 (IPv6)

### Available Endpoints

#### 1. Health Check

```http
GET /health
```

**Response:**

```json
{
  "status": "healthy",
  "service": "upspeech-ai",
  "stored_files": 3,
  "storage_available_gb": 12.45
}
```

#### 2. Upload Audio File

```http
POST /upload
Content-Type: multipart/form-data

file: <binary audio data>
```

**Response:**

```json
{
  "file_id": "550e8400-e29b-41d4-a716-446655440000",
  "file_size": 1048576,
  "duration": 120.5,
  "status": "uploaded"
}
```

**Notes:**

- Files stored in `/app/uploads` with UUID filename
- Max file size: 200MB
- File is NOT processed yet, just stored

#### 3. Process Audio File

```http
POST /process/{file_id}
Groq-Api-Key: gsk_xxxxxxxxxxxx
```

**Response:**

```json
{
  "transcript": "Full transcription text here...",
  "report": "Generated clinical report here...",
  "file_id": "550e8400-e29b-41d4-a716-446655440000",
  "status": "processed"
}
```

**Notes:**

- Requires `file_id` from previous upload
- Requires `Groq-Api-Key` header for transcription
- Audio split into 3-minute chunks for processing
- Groq Whisper used for transcription
- Groq LLM used for report generation

#### 4. Delete Processed File

```http
DELETE /files/{file_id}
```

**Response:**

```json
{
  "file_id": "550e8400-e29b-41d4-a716-446655440000",
  "deleted_files": ["550e8400-e29b-41d4-a716-446655440000.wav"],
  "status": "deleted"
}
```

**Notes:**

- Cleans up stored file after processing complete
- Called automatically by backend after successful processing
- Non-blocking (returns success even if file not found)

#### 5. Admin Cleanup

```http
POST /admin/cleanup
```

Removes orphaned files older than 24 hours.

### Environment Variables (AI Service)

**File**: `upspeech-ai/.env` (if needed - typically passed via Docker)

The AI service receives the `GROQ_API_KEY` via HTTP headers from the backend, not environment variables. However, if running standalone:

```bash
# Only needed for standalone testing
GROQ_API_KEY=your_groq_api_key_here
```

---

## Frontend → AI Service: Direct Communication?

**Answer**: **NO** - The frontend NEVER communicates directly with the AI service.

**Why?**

1. **Security**: Keeps Groq API key secret (only backend knows it)
2. **Control**: Backend validates permissions before processing
3. **Multi-tenancy**: Backend enforces tenant isolation
4. **Consistency**: All audio processing logged and tracked in database

**Correct Flow:**

```
Frontend → Backend → AI Service
         ↓
      Database
```

---

## Adding New API Endpoints

### Step 1: Create Rails Controller Endpoint

**File**: `app-backend/app/controllers/api/v1/{resource}_controller.rb`

```ruby
class Api::V1::ExampleController < ApplicationController
  before_action :authenticate_user!

  # GET /api/v1/examples
  def index
    @examples = current_tenant.examples
      .where(user: current_user)  # Apply RBAC
      .page(params[:page])

    render json: {
      data: @examples.map { |ex| example_json(ex) },
      pagination: pagination_meta(@examples)
    }
  end

  # POST /api/v1/examples
  def create
    @example = current_tenant.examples.build(example_params)
    @example.user = current_user

    if @example.save
      render json: { data: example_json(@example) }, status: :created
    else
      render json: { error: @example.errors.full_messages }, status: :unprocessable_content
    end
  end

  private

  def example_params
    params.require(:example).permit(:title, :description)
  end

  def example_json(example)
    {
      id: example.id,
      title: example.title,
      description: example.description,
      created_at: example.created_at
    }
  end
end
```

### Step 2: Add Route

**File**: `app-backend/config/routes.rb`

```ruby
Rails.application.routes.draw
  namespace :api do
    namespace :v1 do
      resources :examples, only: [:index, :create, :show, :update, :destroy]
    end
  end
end
```

### Step 3: Add Frontend API Method

**File**: `app-frontend/src/lib/api.ts`

```typescript
// Add to ApiClient class
async getExamples(params?: {
  page?: number;
  per_page?: number;
}): Promise<PaginatedResponse<Example>> {
  const response = await this.client.get<PaginatedResponse<Example>>(
    "/examples",
    { params }
  );
  return response.data;
}

async createExample(example: {
  title: string;
  description: string;
}): Promise<ApiResponse<Example>> {
  const response = await this.client.post<ApiResponse<Example>>(
    "/examples",
    { example }  // Rails expects nested params
  );
  return response.data;
}
```

### Step 4: Add TypeScript Types

**File**: `app-frontend/src/types/index.ts` (or create new file)

```typescript
export interface Example {
  id: number;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
}
```

### Step 5: Use in React Component

```typescript
import { apiClient } from "@/lib/api";
import { Example } from "@/types";

function ExamplesPage() {
  const [examples, setExamples] = useState<Example[]>([]);

  useEffect(() => {
    apiClient.getExamples().then(response => {
      setExamples(response.data);
    });
  }, []);

  const handleCreate = async (data: { title: string; description: string }) => {
    const response = await apiClient.createExample(data);
    setExamples([...examples, response.data]);
  };

  // ... render UI
}
```

---

## Common Patterns & Best Practices

### 1. Multi-Tenancy Scoping

**Always scope queries by tenant:**

```ruby
# ✅ CORRECT
current_tenant.reports.where(user: current_user)

# ❌ WRONG - bypasses tenant isolation
Report.where(user: current_user)
```

### 2. Role-Based Access Control (RBAC)

**Check permissions before returning data:**

```ruby
case current_user.role
when 'owner'
  AudioRecording.all  # Owners see all tenants
when 'admin', 'therapist'
  current_tenant.audio_recordings  # Tenant-wide access
when 'client'
  current_tenant.audio_recordings.where(user: current_user)  # Own records only
else
  AudioRecording.none
end
```

### 3. Nested Params (Rails Convention)

**Backend expects nested params:**

```ruby
# params.rb
params.require(:report).permit(:title, :content)
```

**Frontend must nest data:**

```typescript
// ✅ CORRECT
await apiClient.updateReport(id, { report: { title: "New Title" } });

// ❌ WRONG - Rails won't find params
await apiClient.updateReport(id, { title: "New Title" });
```

### 4. Error Handling

**Backend:**

```ruby
rescue ActiveRecord::RecordNotFound
  render json: { error: 'Resource not found' }, status: :not_found
rescue ActiveRecord::RecordInvalid => e
  render json: { error: e.message }, status: :unprocessable_content
```

**Frontend:**

```typescript
try {
  const response = await apiClient.createExample(data);
  // Handle success
} catch (error) {
  if (axios.isAxiosError(error)) {
    console.error("API Error:", error.response?.data?.error);
  }
}
```

### 5. Timeouts for Long Operations

**Adjust timeouts for file uploads and AI processing:**

```typescript
// Frontend
timeout: 120000; // 2 minutes for file uploads

// Backend (Faraday)
conn.options.timeout = 300; // 5 minutes for AI processing
```

---

## Troubleshooting

### Frontend can't connect to Backend

**Check:**

1. Backend is running: `curl http://localhost:3000/api/v1/up`
2. CORS headers configured in `app-backend/config/application.rb`
3. Environment variable `VITE_API_URL` is correct

### Backend can't connect to AI Service

**Check:**

1. AI service is running: `curl http://localhost:8081/health`
2. Environment variable `UPSPEECH_AI_URL` is set correctly
3. Firewall/Docker network allows connection

### AI Service returns 400 (Missing Groq API Key)

**Check:**

1. Backend has `GROQ_API_KEY` set in `.env`
2. Job passes key in `Groq-Api-Key` header (note the capitalization)

### File Upload Fails

**Check:**

1. File size < 200MB limit
2. Content-Type is set correctly (`multipart/form-data`)
3. Backend Faraday has `:multipart` request adapter
4. AI service `/app/uploads` directory has write permissions

---

## Quick Reference Commands

```bash
# Check if services are running
curl http://localhost:3001                    # Frontend
curl http://localhost:3000/api/v1/up          # Backend
curl http://localhost:8081/health             # AI Service

# Test file upload (Backend → AI Service)
curl -X POST http://localhost:8081/upload \
  -F "file=@test.wav"

# Test processing (requires file_id from upload)
curl -X POST http://localhost:8081/process/{file_id} \
  -H "Groq-Api-Key: your_key_here"

# Delete file from AI service
curl -X DELETE http://localhost:8081/files/{file_id}
```

---

## Related Documentation

- **[SYSTEM_DESIGN.md](SYSTEM_DESIGN.md)** - Overall architecture
- **[AUTH_FLOW.md](AUTH_FLOW.md)** - Authentication details
- **[PERMISSIONS.md](PERMISSIONS.md)** - RBAC implementation
- **[MULTI_TENANCY.md](MULTI_TENANCY.md)** - Multi-tenant patterns
- **[../infrastructure/AI_SERVICE_ENDPOINTS.md](../infrastructure/AI_SERVICE_ENDPOINTS.md)** - AI Service API reference

---

**Questions?** Check existing endpoints in `app-frontend/src/lib/api.ts` for real-world examples or open an issue.
