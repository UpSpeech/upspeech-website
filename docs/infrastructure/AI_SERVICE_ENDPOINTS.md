# AI Service Endpoints Documentation

## Overview

The UpSpeech AI Service provides file storage and processing endpoints to handle large audio files efficiently. This replaces the previous embedded content approach with a file_id-based system that eliminates memory issues for 130MB+ files.

## Architecture

```
Rails Backend ──┐
                ├─── AI Service File Storage ───┐
Rails Worker ───┘                                ├─── Volume Storage
                                                 │    /app/uploads/
Background Jobs: file_id only (not file content)┘
```

## API Endpoints

### Base URL

- **Development**: `http://ai-service:8081`
- **Production**: `https://your-ai-service.railway.app`

---

## 1. File Upload

**Upload audio file and receive file_id for later processing**

### Request

```http
POST /upload
Content-Type: multipart/form-data

file: <audio_file>
```

### Response

```json
{
  "file_id": "550e8400-e29b-41d4-a716-446655440000",
  "file_size": 134217728,
  "duration": 300.5,
  "status": "uploaded"
}
```

### Error Responses

```json
// File too large
{
  "detail": "File too large (max 200MB)",
  "status_code": 413
}

// Invalid file type
{
  "detail": "Invalid audio file: unsupported format",
  "status_code": 400
}

// Server error
{
  "detail": "Upload failed: disk space insufficient",
  "status_code": 500
}
```

### Implementation Details

- **File Storage**: `/app/uploads/{file_id}.{extension}`
- **Max Size**: 200MB
- **Supported Formats**: mp3, wav, m4a, ogg, webm
- **Unique ID**: UUID4 format
- **Metadata Extraction**: Duration automatically detected

---

## 2. File Processing

**Process stored file using file_id**

### Request

```http
POST /process/{file_id}
Headers:
  Groq-Api-Key: your_groq_api_key
```

### Response

```json
{
  "transcript": "This is the transcribed text from the audio file...",
  "report": "Detailed speech therapy analysis report...",
  "file_id": "550e8400-e29b-41d4-a716-446655440000",
  "status": "processed"
}
```

### Error Responses

```json
// File not found
{
  "detail": "File not found: 550e8400-e29b-41d4-a716-446655440000",
  "status_code": 404
}

// Missing API key
{
  "detail": "Missing Groq API key",
  "status_code": 400
}

// Processing failed
{
  "detail": "Transcription failed: audio quality too low",
  "status_code": 500
}
```

### Implementation Details

- **Processing Time**: Varies by file size (typical: 1-5 minutes)
- **API Key**: Required in header for Groq service
- **File Lookup**: Searches `/app/uploads/{file_id}.*`
- **Content Validation**: Ensures transcript and report quality

---

## 3. File Cleanup

**Delete stored file after processing**

### Request

```http
DELETE /files/{file_id}
```

### Response

```json
{
  "file_id": "550e8400-e29b-41d4-a716-446655440000",
  "deleted_files": ["/app/uploads/550e8400-e29b-41d4-a716-446655440000.mp3"],
  "status": "deleted"
}
```

### Error Responses

```json
// File not found (not an error)
{
  "file_id": "550e8400-e29b-41d4-a716-446655440000",
  "deleted_files": [],
  "status": "not_found"
}
```

### Implementation Details

- **Idempotent**: Safe to call multiple times
- **Wildcard Deletion**: Removes files with any extension
- **Error Handling**: Logs warnings but doesn't fail

---

## 4. Health Check

**Monitor service status and storage**

### Request

```http
GET /health
```

### Response

```json
{
  "status": "healthy",
  "service": "upspeech-ai",
  "stored_files": 42,
  "storage_available": 85899345920
}
```

### Implementation Details

- **File Count**: Number of files in uploads directory
- **Storage**: Available disk space in bytes
- **Status**: `healthy` or `degraded`

---

## 5. Legacy Endpoint (Backward Compatibility)

**Original endpoint for immediate processing**

### Request

```http
POST /generate-report/
Content-Type: multipart/form-data
Headers:
  Groq-Api-Key: your_groq_api_key

file: <audio_file>
```

### Response

```json
{
  "transcript": "Transcribed text...",
  "report": "Generated report...",
  "metadata": {
    "processing_info": {
      "file_size_bytes": 1024000,
      "transcript_length": 500,
      "report_length": 2000,
      "request_id": "abc12345"
    }
  }
}
```

### Implementation Details

- **Temporary Processing**: Files cleaned up immediately
- **No file_id**: Direct upload → process → cleanup
- **Memory Usage**: Higher memory footprint
- **Use Case**: Maintain compatibility during migration

---

## Integration Examples

### Rails Controller Integration

```ruby
# app/controllers/api/v1/audio_recordings_controller.rb

def upload_to_ai_service(uploaded_file)
  service_url = ENV.fetch('UPSPEECH_AI_URL')

  connection = Faraday.new(url: service_url) do |conn|
    conn.request :multipart
    conn.adapter :net_http
    conn.options.timeout = 300
  end

  payload = {
    file: Faraday::UploadIO.new(uploaded_file, uploaded_file.content_type, uploaded_file.original_filename)
  }

  response = connection.post('/upload', payload)

  if response.success?
    result = JSON.parse(response.body, symbolize_names: true)
    { success: true, file_id: result[:file_id], file_size: result[:file_size] }
  else
    { success: false, error: response.body }
  end
end
```

### Background Job Integration

```ruby
# app/jobs/transcription_processor_job.rb

def call_ai_service_with_file_id(audio_recording)
  service_url = ENV.fetch('UPSPEECH_AI_URL')
  groq_api_key = ENV.fetch('GROQ_API_KEY')

  file_id = audio_recording.metadata&.dig('ai_file_id')

  connection = Faraday.new(url: service_url) do |conn|
    conn.adapter :net_http
    conn.options.timeout = 300
  end

  response = connection.post("/process/#{file_id}") do |req|
    req.headers['Groq-Api-Key'] = groq_api_key
  end

  if response.success?
    JSON.parse(response.body, symbolize_names: true)
  else
    raise "AI service processing error: #{response.status} - #{response.body}"
  end
end

def cleanup_ai_service_file(audio_recording)
  file_id = audio_recording.metadata&.dig('ai_file_id')
  return unless file_id

  service_url = ENV.fetch('UPSPEECH_AI_URL')

  connection = Faraday.new(url: service_url) do |conn|
    conn.adapter :net_http
    conn.options.timeout = 30
  end

  response = connection.delete("/files/#{file_id}")
  # Log but don't fail on cleanup errors
end
```

## Error Handling Strategy

### Client-Side (Rails)

```ruby
def handle_ai_service_error(response)
  case response.status
  when 404
    # File not found - may have been cleaned up
    logger.warn("AI service file not found: #{response.body}")
  when 413
    # File too large
    raise "File size exceeds limit (200MB)"
  when 500
    # Server error - retry may help
    raise "AI service temporarily unavailable"
  else
    raise "AI service error: #{response.status} - #{response.body}"
  end
end
```

### Retry Strategy

```ruby
# In TranscriptionProcessorJob
retry_on Faraday::TimeoutError, wait: 30.seconds, attempts: 5
retry_on Faraday::ConnectionFailed, wait: 10.seconds, attempts: 3

# Don't retry certain errors
discard_on ArgumentError # Invalid file_id, API keys, etc.
```

## Security Considerations

### File Access Control

- **No direct file URLs**: Files only accessible via API endpoints
- **API Key Required**: Processing requires valid Groq API key
- **File_ID Validation**: UUIDs prevent directory traversal
- **Temporary Storage**: Files deleted after processing

### Rate Limiting

```python
# Consider implementing rate limiting
from slowapi import Limiter
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)

@app.post("/upload")
@limiter.limit("10/minute")  # Limit uploads per IP
async def upload_file(request: Request, file: UploadFile = File(...)):
    # ... implementation
```

### File Validation

```python
# Validate file types and content
ALLOWED_EXTENSIONS = {'.mp3', '.wav', '.m4a', '.ogg', '.webm'}
MAX_FILE_SIZE = 200 * 1024 * 1024  # 200MB

def validate_audio_file(file: UploadFile):
    # Check extension
    if not any(file.filename.lower().endswith(ext) for ext in ALLOWED_EXTENSIONS):
        raise HTTPException(400, "Unsupported file type")

    # Check magic bytes for actual audio content
    # ... additional validation
```

## Monitoring and Alerting

### Key Metrics

- **Upload Success Rate**: Percentage of successful `/upload` calls
- **Processing Time**: Average time for `/process/{file_id}` calls
- **Storage Usage**: Disk space utilization in `/app/uploads`
- **Cleanup Success**: Rate of successful file deletions

### Health Monitoring

```python
@app.get("/metrics")
async def get_metrics():
    upload_dir = "/app/uploads"

    # Count files
    file_count = len(os.listdir(upload_dir)) if os.path.exists(upload_dir) else 0

    # Calculate storage
    total, used, free = shutil.disk_usage(upload_dir)
    usage_percent = (used / total) * 100

    return {
        "files_stored": file_count,
        "storage_usage_percent": usage_percent,
        "storage_free_gb": free / (1024**3),
        "uptime_seconds": time.time() - start_time
    }
```

### Alerting Thresholds

- **Storage Usage > 85%**: Warning
- **Storage Usage > 95%**: Critical
- **Files Count > 1000**: Warning (cleanup may be failing)
- **Upload Errors > 10%**: Service degradation

## Migration Strategy

### Phase 1: Dual Implementation

- Deploy new endpoints alongside existing `/generate-report/`
- Rails uses feature flag to choose approach
- Monitor both endpoints simultaneously

### Phase 2: Gradual Migration

- Migrate large files (>50MB) to new approach first
- Monitor memory usage and error rates
- Keep legacy endpoint for smaller files

### Phase 3: Full Migration

- Switch all uploads to new approach
- Deprecate `/generate-report/` endpoint
- Remove legacy code after monitoring period

This documentation provides a complete reference for integrating with the AI service file storage endpoints, ensuring efficient handling of large audio files while maintaining system reliability.
