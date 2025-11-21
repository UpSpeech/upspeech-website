# Google Cloud Storage (GCS) Setup Guide

## Overview

UpSpeech uses Google Cloud Storage for storing audio/video recordings and extracted clips. This guide covers environment separation, safety practices, and setup instructions.

## ⚠️ Critical Safety Practice: Separate Buckets Per Environment

**NEVER use the same GCS bucket for development and production!**

Using separate buckets prevents:

- Accidental deletion of production data during development
- Data corruption from test operations
- Mixing development and production data
- Security risks from development credentials

## Recommended Bucket Structure

### Option 1: Separate Buckets (Recommended)

Create three separate GCS buckets:

```
upspeech-dev          # Development environment
upspeech-staging      # Staging environment
upspeech-production   # Production environment
```

**Advantages:**

- Complete data isolation
- Different IAM permissions per environment
- Easy to identify and manage
- No risk of cross-environment contamination

### Option 2: Folders in Single Bucket (Not Recommended)

If you must use a single bucket, use folder prefixes:

```
my-bucket/
  ├── dev/            # Development files
  ├── staging/        # Staging files
  └── production/     # Production files
```

**Disadvantages:**

- Risk of accidental cross-folder operations
- Shared IAM permissions
- Harder to audit and monitor
- Less secure

## Setup Instructions

### 1. Create GCS Buckets

For each environment, create a bucket in Google Cloud Console:

```bash
# Using gcloud CLI
gcloud storage buckets create gs://upspeech-dev --location=us-central1
gcloud storage buckets create gs://upspeech-staging --location=us-central1
gcloud storage buckets create gs://upspeech-production --location=us-central1
```

### 2. Set Bucket Permissions

Each bucket should have:

- **Storage Object Admin** role for the service account
- **Storage Object Viewer** role (optional, for debugging)

```bash
# Grant permissions to service account
gcloud storage buckets add-iam-policy-binding gs://upspeech-dev \
  --member="serviceAccount:your-service-account@project.iam.gserviceaccount.com" \
  --role="roles/storage.objectAdmin"
```

### 3. Configure Environment Variables

#### Development (`.env` or `.env.development`)

```bash
GCS_PROJECT_ID=your-gcp-project-id
GCS_BUCKET=upspeech-dev
GCS_CREDENTIALS_PATH=config/gcp/service-account-key-dev.json
RAILS_ENV=development
```

#### Production (`.env.production` or Railway/Heroku config)

```bash
GCS_PROJECT_ID=your-gcp-project-id
GCS_BUCKET=upspeech-production
GCS_CREDENTIALS_PATH=config/gcp/service-account-key-prod.json
RAILS_ENV=production
```

### 4. Service Account Keys

**Best Practice:** Use different service accounts per environment:

- `upspeech-dev@project.iam.gserviceaccount.com` → Dev bucket only
- `upspeech-prod@project.iam.gserviceaccount.com` → Production bucket only

This ensures development credentials cannot access production data.

## Built-in Safety Checks

UpSpeech includes automatic safety validation in `GoogleCloudStorageService`:

```ruby
# Prevents using production bucket in development
def validate_bucket_environment!
  return unless Rails.env.development? || Rails.env.test?

  production_indicators = ['production', 'prod', 'prd']

  if production_indicators.any? { |indicator| @bucket_name.downcase.include?(indicator) }
    raise "SAFETY ERROR: Cannot use production bucket in development environment!"
  end
end
```

If you accidentally configure a production bucket in development, the app will:

1. Log a prominent error message
2. Raise an exception and refuse to start
3. Prevent any operations that could affect production data

## File Organization Within Buckets

Regardless of which bucket you use, files are organized by tenant and type:

```
upspeech-dev/
├── recordings/
│   ├── tenant_1/
│   │   ├── recording_123.webm
│   │   └── recording_124.webm
│   └── tenant_2/
│       └── recording_125.webm
└── clips/
    ├── tenant_1/
    │   ├── recording_123_clip_0.webm
    │   ├── recording_123_clip_1.webm
    │   └── recording_124_clip_0.webm
    └── tenant_2/
        └── recording_125_clip_0.webm
```

Path format:

- Full recordings: `recordings/tenant_{id}/recording_{id}.webm`
- Extracted clips: `clips/tenant_{id}/recording_{id}_clip_{index}.webm`

## Security Best Practices

### 1. IAM Permissions

**Development bucket:**

- Broad permissions OK (objectAdmin)
- Can use personal GCP account for debugging

**Production bucket:**

- Minimal required permissions only
- Use dedicated service account
- Enable audit logging

### 2. Credentials Management

**Development:**

- Store key file locally: `config/gcp/service-account-key-dev.json`
- Add to `.gitignore`
- Can share among dev team (non-sensitive)

**Production:**

- Use environment variables or secret management
- Never commit production keys to git
- Rotate keys regularly
- Use GCP Workload Identity if on GKE

### 3. Access Control

**Development:**

```bash
# Allow developers to debug
gcloud storage buckets add-iam-policy-binding gs://upspeech-dev \
  --member="group:developers@yourcompany.com" \
  --role="roles/storage.objectViewer"
```

**Production:**

```bash
# Only service account has access
gcloud storage buckets add-iam-policy-binding gs://upspeech-production \
  --member="serviceAccount:upspeech-prod@project.iam.gserviceaccount.com" \
  --role="roles/storage.objectAdmin"
```

## Lifecycle Policies

Consider adding lifecycle policies to automatically delete old files:

```json
{
  "lifecycle": {
    "rule": [
      {
        "action": { "type": "Delete" },
        "condition": {
          "age": 90,
          "matchesPrefix": ["recordings/"]
        }
      }
    ]
  }
}
```

Apply with:

```bash
gcloud storage buckets update gs://upspeech-dev --lifecycle-file=lifecycle.json
```

## Monitoring and Alerts

Set up GCP monitoring for:

- Storage usage (cost control)
- Request count (performance)
- Error rate (reliability)
- Unauthorized access attempts (security)

## Troubleshooting

### Error: "Cannot use production bucket in development"

**Cause:** Your `.env` has `GCS_BUCKET=upspeech-production` in development.

**Solution:**

```bash
# Update .env
GCS_BUCKET=upspeech-dev
```

### Error: "403 Forbidden"

**Cause:** Service account lacks permissions.

**Solution:**

```bash
gcloud storage buckets add-iam-policy-binding gs://YOUR_BUCKET \
  --member="serviceAccount:YOUR_SA@project.iam.gserviceaccount.com" \
  --role="roles/storage.objectAdmin"
```

### Error: "Bucket does not exist"

**Cause:** Bucket name is wrong or bucket doesn't exist.

**Solution:**

```bash
# List your buckets
gcloud storage buckets list

# Create if needed
gcloud storage buckets create gs://upspeech-dev --location=us-central1
```

## Development Workflow

### Local Development

1. Create a dev bucket: `upspeech-dev`
2. Configure `.env`:
   ```bash
   GCS_BUCKET=upspeech-dev
   ```
3. Run the app - safety checks will validate the setup
4. All uploads go to dev bucket only

### Switching to Staging/Production

1. Never change `.env` to point to production!
2. Deploy to staging/production environment
3. Set environment variables in deployment platform (Railway, Heroku, etc.)
4. Each environment automatically uses its configured bucket

## Quick Setup Checklist

- [ ] Create separate GCS buckets for each environment
- [ ] Generate service account keys per environment
- [ ] Configure `.env` with development bucket
- [ ] Add credentials file to `.gitignore`
- [ ] Test file upload/download in development
- [ ] Verify safety checks are working
- [ ] Document production bucket name (securely)
- [ ] Set up monitoring and alerts

## References

- [GCS Documentation](https://cloud.google.com/storage/docs)
- [Service Account Best Practices](https://cloud.google.com/iam/docs/best-practices-service-accounts)
- [Rails Credentials Guide](https://guides.rubyonrails.org/security.html#custom-credentials)

---

**Last Updated:** 2025-11-21
**Maintainer:** Development Team
