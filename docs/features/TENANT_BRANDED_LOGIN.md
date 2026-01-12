# Tenant-Branded Login Pages

## Overview

Login pages now display tenant-specific branding (logo, colors, name) based on the subdomain, similar to how email templates work. This provides a white-labeled experience for each tenant.

## How It Works

### 1. **Subdomain Detection**

When a user visits a tenant subdomain (e.g., `speechcare.upspeech.app`), the frontend automatically detects the tenant slug from the URL.

### 2. **Branding Fetch**

The login page fetches public branding information via a **public API endpoint** (no authentication required):

```
GET /api/v1/tenants/:slug/branding
```

### 3. **Branding Application**

The fetched branding is applied to the login page:

- **Logo**: Displays tenant logo (with fallback to default)
- **Colors**: Applied as CSS custom properties for future theming
- **Name**: Used in alt text and page title

### 4. **Fallback Behavior**

- If no subdomain is detected (localhost, Railway preview), use default UpSpeech branding
- If admin subdomain (`admin.upspeech.app`), use default branding (admin portal)
- If branding fetch fails, gracefully fall back to default branding (login still works)

## Implementation Details

### Backend

#### Controller: `TenantBrandingController`

**File**: `app-backend/app/controllers/api/v1/tenant_branding_controller.rb`

**Public endpoint** (no authentication):

```ruby
GET /api/v1/tenants/:slug/branding
```

**Returns**:

```json
{
  "data": {
    "name": "SpeechCare",
    "slug": "speechcare",
    "logo_url": "https://storage.googleapis.com/...",
    "primary_color": "#548DD4",
    "accent_color": "#548DD4",
    "language": "pt"
  }
}
```

**Security**:

- ✅ Public endpoint (no auth required)
- ✅ Only returns branding data (no sensitive information)
- ✅ Blocks system tenant (`system` slug)
- ✅ Returns 404 for non-existent tenants
- ✅ Returns 403 for inactive tenants

#### Route

**File**: `app-backend/config/routes.rb`

```ruby
# Tenant branding (public - for login page customization)
get 'tenants/:slug/branding', to: 'tenant_branding#show'
```

### Frontend

#### Hook: `useTenantBranding`

**File**: `app-frontend/src/hooks/useTenantBranding.ts`

Custom React hook that:

1. Detects tenant slug from subdomain
2. Fetches branding from public API
3. Handles loading states and errors
4. Provides branding data to components

**Usage**:

```typescript
import { useTenantBranding } from "@/hooks/useTenantBranding";

const { branding, isLoading, error } = useTenantBranding();
```

#### Updated Component: `AuthPage`

**File**: `app-frontend/src/pages/AuthPage.tsx`

**Changes**:

1. Uses `useTenantBranding()` hook
2. Displays tenant logo with fallback
3. Sets CSS custom properties for colors (for future theming)
4. Shows loading spinner while fetching branding

#### Types

**File**: `app-frontend/src/types/tenant.ts`

New `TenantBranding` interface:

```typescript
export interface TenantBranding {
  name: string;
  slug: string;
  logo_url: string | null;
  primary_color: string | null;
  accent_color: string | null;
  language: string;
}
```

#### API Client

**File**: `app-frontend/src/lib/api.ts`

New method:

```typescript
async getTenantBranding(slug: string): Promise<ApiResponse<TenantBranding>>
```

## Examples

### Example 1: SpeechCare Tenant

**URL**: `https://speechcare.upspeech.app/auth`

**Result**:

- Shows SpeechCare logo
- Applies blue color scheme (#548DD4)
- Uses Portuguese language preference

### Example 2: Default Tenant

**URL**: `https://upspeech-demo.upspeech.app/auth`

**Result**:

- Shows tenant logo or UpSpeech default
- Uses tenant-specific colors
- Standard branding

### Example 3: Admin Portal

**URL**: `https://admin.upspeech.app/auth`

**Result**:

- Shows default UpSpeech logo
- Uses standard colors
- No tenant-specific branding

### Example 4: Localhost Development (No Subdomain)

**URL**: `http://localhost:3001/auth`

**Result**:

- Shows default UpSpeech logo
- Uses standard colors
- No branding fetch (no subdomain detected)

### Example 5: Local Subdomain Testing

**URL**: `http://speechcare.localhost:3001/auth` (requires /etc/hosts entry)

**Result**:

- Shows SpeechCare logo
- Applies blue color scheme (#548DD4)
- Fetches branding from local API
- Works exactly like production subdomain

## Testing

### Backend Tests

```bash
# Test public branding endpoint
curl https://api.upspeech.app/api/v1/tenants/speechcare/branding

# Test non-existent tenant
curl https://api.upspeech.app/api/v1/tenants/nonexistent/branding
# Should return 404

# Test system tenant (blocked)
curl https://api.upspeech.app/api/v1/tenants/system/branding
# Should return 404
```

### Frontend Testing

1. **Local subdomain testing** (using .localhost with /etc/hosts):

   Add to `/etc/hosts`:

   ```
   127.0.0.1    speechcare.localhost
   127.0.0.1    admin.localhost
   127.0.0.1    upspeech-demo.localhost
   ```

   Then access:

   ```
   http://speechcare.localhost:3001/auth
   http://admin.localhost:3001/auth
   ```

2. **Alternative: Local subdomain testing** (using lvh.me DNS):

   No /etc/hosts needed - just works:

   ```
   http://speechcare.lvh.me:3001/auth
   http://admin.lvh.me:3001/auth
   ```

3. **Production testing**:

   ```
   https://speechcare.upspeech.app/auth
   ```

4. **Verify**:
   - Logo loads correctly
   - Fallback works if logo fails
   - Loading state shows spinner
   - Login still works if branding fetch fails

## Future Enhancements

### 1. Color Theming

CSS custom properties are already set for tenant colors:

```css
--tenant-primary: #548dd4 --tenant-accent: #548dd4;
```

These can be used to theme buttons, links, and other UI elements:

```css
.login-button {
  background-color: var(--tenant-primary, #98a5fe);
}
```

### 2. Background Images

Add support for custom login page backgrounds per tenant.

### 3. Custom Messaging

Allow tenants to configure custom welcome messages on login page.

### 4. Favicon

Dynamically set favicon based on tenant logo.

## Related Features

- **Email Templates**: Similar branding system for emails (see `REPORT_TEMPLATES.md`)
- **Tenant Settings**: Admin UI to configure branding (see `TenantSettingsPage.tsx`)
- **Multi-Tenancy**: Subdomain-based tenant isolation (see `SUBDOMAIN_DEPLOYMENT.md`)

## Troubleshooting

### Login page shows default branding instead of tenant branding

**Possible causes**:

1. Subdomain not detected (check you're on `{tenant}.upspeech.app`)
2. Tenant doesn't exist (check tenant slug in database)
3. Tenant is inactive (check `active` field in database)
4. API endpoint not accessible (check CORS, CSP)

**Debug**:

```javascript
// Check what subdomain is detected
import { getTenantSlugFromSubdomain } from "@/lib/tenant";
console.log("Detected tenant:", getTenantSlugFromSubdomain());
```

### Logo doesn't load

**Possible causes**:

1. Logo URL expired (GCS signed URLs expire after 1 hour)
2. CORS issue
3. Invalid image URL

**Debug**:

- Check browser console for image load errors
- Verify logo URL in API response
- Test logo URL directly in browser

### CSP blocks API request

**Solution**: Ensure `https://api.upspeech.app` is in CSP `connect-src` directive (see `index.html`).

---

**Last Updated**: 2026-01-12
**Related Issues**: Tenant branding, login customization, white-label support
