# Multi-Tenant Subdomain Deployment Guide

This guide explains how to deploy UpSpeech with tenant-specific subdomains on production infrastructure.

## Architecture Overview

**URL Structure:**

- **Marketing Site**: `https://upspeech.app` (Netlify)
- **Admin Portal**: `https://admin.upspeech.app` (Railway - app-frontend) - **Owners only**
- **Tenant Apps**: `https://{tenant-slug}.upspeech.app` (Railway - app-frontend)
  - Example: `https://acme.upspeech.app`
  - Example: `https://speechcare.upspeech.app`
- **API Backend**: `https://api.upspeech.app` (Railway - app-backend)
- **AI Service**: Internal only (Railway - upspeech-ai)

**How It Works:**

1. Each tenant has a unique slug (e.g., `acme`, `speechcare`)
2. Users access their tenant at `{tenant-slug}.upspeech.app`
3. **Owners access platform-wide admin at `admin.upspeech.app`**
4. Frontend validates subdomain matches user's tenant/role on login
5. Backend validates tenant access for all API requests
6. Sessions/cookies are shared across all `*.upspeech.app` subdomains
7. **Owners can access both admin portal AND any tenant subdomain**

---

## Prerequisites

- ✅ Domain registered (upspeech.app)
- ✅ DNS managed by Namecheap (or other provider)
- ✅ Railway account with app-frontend and app-backend services deployed
- ✅ Netlify account with upspeech-website deployed
- ✅ SSL certificates will be automatically provisioned by Railway and Netlify

---

## Part 1: DNS Configuration (Namecheap)

### Step 1: Log in to Namecheap

1. Go to [Namecheap](https://www.namecheap.com/)
2. Sign in to your account
3. Navigate to **Domain List** → **Manage** next to `upspeech.app`
4. Click on **Advanced DNS** tab

### Step 2: Add DNS Records

Add the following DNS records in Namecheap's Advanced DNS:

| Type    | Host  | Value                                          | TTL       |
| ------- | ----- | ---------------------------------------------- | --------- |
| CNAME   | `*`   | `app-frontend-production-7b53.up.railway.app.` | Automatic |
| CNAME   | `api` | `[your-backend-railway-url].up.railway.app.`   | Automatic |
| CNAME   | `www` | `upspeech.app.`                                | Automatic |
| A/ALIAS | `@`   | (Netlify IPs - see below)                      | Automatic |

**Important Notes:**

- ✅ The `*` wildcard record enables all tenant subdomains (acme.upspeech.app, speechcare.upspeech.app, etc.)
- ✅ Add a trailing dot (`.`) to CNAME values for proper DNS resolution
- ✅ Replace `[your-backend-railway-url]` with your actual Railway backend URL
- ✅ For the root domain (`@`), use Netlify's IP addresses or ALIAS record (see Netlify section below)

### Step 3: Verify DNS Records

After adding records:

1. Wait 5-15 minutes for DNS propagation
2. Verify using DNS lookup tools:

   ```bash
   # Check wildcard subdomain
   nslookup acme.upspeech.app

   # Check API subdomain
   nslookup api.upspeech.app

   # Check root domain
   nslookup upspeech.app
   ```

**Expected Results:**

- `acme.upspeech.app` → points to Railway frontend URL
- `api.upspeech.app` → points to Railway backend URL
- `upspeech.app` → points to Netlify IPs

---

## Part 2: Railway Configuration

### Step 1: Configure app-frontend Service

1. Log in to [Railway](https://railway.app/)
2. Navigate to your **app-frontend** project
3. Go to **Settings** → **Domains**
4. Click **+ Custom Domain**
5. Enter: `*.upspeech.app`
6. Railway will show DNS instructions (already configured in Namecheap)
7. Railway will automatically provision a **wildcard SSL certificate** (\*.upspeech.app)

**Wait for SSL Certificate:**

- Railway uses Let's Encrypt for SSL
- Provisioning takes 5-15 minutes
- Status will show "Active" when ready
- All tenant subdomains will use this certificate

### Step 2: Configure app-backend Service

1. In Railway dashboard, navigate to **app-backend** service
2. Go to **Settings** → **Domains**
3. Click **+ Custom Domain**
4. Enter: `api.upspeech.app`
5. Railway will provision SSL certificate for API subdomain

### Step 3: Update Environment Variables

**app-frontend environment variables:**

```bash
# Railway -> app-frontend -> Variables
VITE_API_BASE_URL=https://api.upspeech.app
VITE_API_URL=https://api.upspeech.app/api/v1
VITE_APP_NAME=UpSpeech
VITE_NODE_ENV=production
VITE_MARKETING_SITE_URL=https://upspeech.app/
VITE_BASE_DOMAIN=upspeech.app
```

**app-backend environment variables:**

```bash
# Railway -> app-backend -> Variables
FRONTEND_URL=https://upspeech.app
CORS_ALLOWED_ORIGINS=https://upspeech.app
RAILS_ENV=production
```

**Important:** After updating environment variables, Railway will automatically redeploy your services.

### Step 4: Verify Railway Deployment

1. Check that both services show "Active" status
2. Test API endpoint:
   ```bash
   curl https://api.upspeech.app/api/v1/health
   ```
3. Test tenant subdomain in browser:
   - Visit `https://acme.upspeech.app` (replace `acme` with an actual tenant slug)
   - Should load the frontend application

---

## Part 3: Netlify Configuration (Marketing Site)

### Step 1: Configure Custom Domain in Netlify

1. Log in to [Netlify](https://www.netlify.com/)
2. Navigate to your **upspeech-website** site
3. Go to **Site settings** → **Domain management**
4. Click **Add custom domain**
5. Enter: `upspeech.app` (root domain)
6. Click **Verify**
7. Netlify will detect existing DNS records

### Step 2: Configure DNS (Option A - Recommended)

If Netlify shows DNS configuration instructions:

**For Namecheap users:**

1. Go back to Namecheap → Advanced DNS
2. Add these records for the root domain (`@`):
   ```
   Type: A Record
   Host: @
   Value: 75.2.60.5
   TTL: Automatic
   ```
   ```
   Type: AAAA Record (IPv6, optional)
   Host: @
   Value: 2606:4700:10::6816:59
   TTL: Automatic
   ```

**Note:** Netlify IP addresses may change. Always check Netlify's current IPs in your site settings.

### Step 3: Configure DNS (Option B - ALIAS Record)

If your DNS provider supports ALIAS records (not Namecheap):

```
Type: ALIAS
Host: @
Value: [your-netlify-site].netlify.app
```

### Step 4: Enable HTTPS in Netlify

1. In Netlify → **Domain settings** → **HTTPS**
2. Click **Verify DNS configuration**
3. Click **Provision certificate**
4. Wait 5-10 minutes for Let's Encrypt certificate
5. Enable **Force HTTPS** (redirect HTTP → HTTPS)

### Step 5: Verify Netlify Deployment

1. Visit `https://upspeech.app` in browser
2. Verify marketing site loads correctly
3. Check SSL certificate (green lock icon)

---

## Part 4: Testing the Deployment

### Test 1: Marketing Site

```bash
curl https://upspeech.app
# Expected: Marketing site HTML
```

### Test 2: API Endpoint

```bash
curl https://api.upspeech.app/api/v1/health
# Expected: {"status": "ok"}
```

### Test 3: Tenant Subdomain (Browser)

1. Create a test tenant in the database with slug `test-tenant`
2. Visit `https://test-tenant.upspeech.app`
3. Should load the application login page
4. Log in with a user belonging to that tenant
5. Verify dashboard loads correctly

### Test 4: Subdomain Validation

1. Log in as a user from tenant A (e.g., `acme`)
2. Try visiting tenant B's subdomain (e.g., `speechcare.upspeech.app`)
3. Should be logged out and redirected to login
4. **Expected behavior**: Users can only access their own tenant's subdomain

### Test 5: Cross-Subdomain Logout

1. Log in on `acme.upspeech.app`
2. Visit `speechcare.upspeech.app` in same browser
3. Should be logged out (cookies are scoped to tenant)

### Test 6: Admin Portal Access (Owner-Only)

**Owner access:**

1. Log in as owner on `admin.upspeech.app`
2. Navigate to Reports page
3. Should see reports from ALL tenants
4. Should see tenant name/filter for each report
5. Filter by specific tenant → should show only that tenant's reports

**Non-owner blocked:**

1. Log in as admin user on `acme.upspeech.app`
2. Try to visit `admin.upspeech.app`
3. Should be redirected back to `acme.upspeech.app`
4. **Expected behavior**: Only owners can access admin portal

**Owner switching contexts:**

1. Owner logs into `admin.upspeech.app` → Sees all tenants
2. Owner navigates to `acme.upspeech.app` → Sees only Acme data
3. Owner navigates back to `admin.upspeech.app` → Sees all tenants again
4. **Expected behavior**: Context switches based on subdomain

---

## Part 5: Local Development with Subdomains

For local development, use **lvh.me** (a free service that resolves `*.lvh.me` to `127.0.0.1`):

### Step 1: Update Local Environment

**app-frontend/.env:**

```bash
VITE_API_BASE_URL=http://localhost:3000
VITE_API_URL=http://localhost:3000/api/v1
VITE_BASE_DOMAIN=lvh.me:3001
```

### Step 2: Access Local Subdomains

- **No subdomain**: `http://localhost:3001` (works with any tenant)
- **Admin portal**: `http://admin.lvh.me:3001` (platform-wide admin - owners only)
- **Tenant subdomain**: `http://acme.lvh.me:3001` (Acme tenant)
- **Tenant subdomain**: `http://speechcare.lvh.me:3001` (SpeechCare tenant)

### Step 3: Test Subdomain Validation Locally

1. Create test tenants and users:

   ```ruby
   # Rails console: bundle exec rails c

   # Create tenants
   acme = Tenant.create!(name: "Acme Corp", slug: "acme")
   speechcare = Tenant.create!(name: "SpeechCare", slug: "speechcare")
   platform = Tenant.create!(name: "Platform", slug: "platform")

   # Create owner (platform admin)
   owner = User.create!(
     email: "owner@upspeech.app",
     password: "password123",
     first_name: "Platform",
     last_name: "Owner",
     role: "owner",
     tenant: platform
   )

   # Create Acme admin
   acme_admin = User.create!(
     email: "admin@acme.com",
     password: "password123",
     first_name: "Acme",
     last_name: "Admin",
     role: "admin",
     tenant: acme
   )

   # Create SpeechCare admin
   speechcare_admin = User.create!(
     email: "admin@speechcare.com",
     password: "password123",
     first_name: "SpeechCare",
     last_name: "Admin",
     role: "admin",
     tenant: speechcare
   )
   ```

2. **Test regular user access:**
   - Visit `http://acme.lvh.me:3001` and log in with Acme admin
   - Try visiting `http://speechcare.lvh.me:3001` → should be logged out ✅
   - Try visiting `http://admin.lvh.me:3001` → should be redirected to `acme.lvh.me:3001` ✅

3. **Test owner access:**
   - Visit `http://admin.lvh.me:3001` and log in with owner
   - Should see reports/users from ALL tenants ✅
   - Visit `http://acme.lvh.me:3001` (without logging out)
   - Should see ONLY Acme data ✅
   - Visit `http://speechcare.lvh.me:3001` (without logging out)
   - Should see ONLY SpeechCare data ✅

---

## Part 6: Adding New Tenants

### Step 1: Create Tenant in Database

```ruby
# Rails console: bundle exec rails c
tenant = Tenant.create!(
  name: "New Organization",
  slug: "new-org"  # Must be URL-safe (lowercase, hyphens only)
)
```

### Step 2: Test Tenant Subdomain

1. Visit `https://new-org.upspeech.app`
2. Should load application automatically (no DNS changes needed!)
3. Create a user for this tenant and log in

**Important:** No DNS changes or Railway configuration needed for new tenants! The wildcard certificate covers all subdomains automatically.

---

## Part 7: Troubleshooting

### Issue: Tenant subdomain not loading (ERR_NAME_NOT_RESOLVED)

**Cause:** DNS not propagated yet

**Solution:**

1. Wait 15-30 minutes for DNS propagation
2. Clear DNS cache:

   ```bash
   # macOS
   sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder

   # Windows
   ipconfig /flushdns

   # Linux
   sudo systemd-resolve --flush-caches
   ```

3. Test with online DNS checker: https://dnschecker.org/

### Issue: SSL certificate error (NET::ERR_CERT_COMMON_NAME_INVALID)

**Cause:** Railway wildcard certificate not provisioned yet

**Solution:**

1. Go to Railway → app-frontend → Settings → Domains
2. Verify `*.upspeech.app` domain shows "Active"
3. Wait 15 minutes for Let's Encrypt provisioning
4. Contact Railway support if issue persists after 1 hour

### Issue: CORS error in browser console

**Cause:** CORS not configured for wildcard subdomains

**Solution:**

1. Verify backend CORS config in `app-backend/config/initializers/cors.rb`
2. Should include regex pattern: `/\Ahttps:\/\/([a-z0-9\-]+\.)?upspeech\.app\z/`
3. Restart backend service in Railway

### Issue: User sees "Access denied" error on their tenant subdomain

**Cause:** Subdomain doesn't match user's tenant slug

**Solution:**

1. Check user's tenant slug in database:
   ```ruby
   user = User.find_by(email: "user@example.com")
   puts user.tenant.slug
   ```
2. Verify user is visiting correct URL: `https://[tenant-slug].upspeech.app`
3. Check backend logs for tenant validation errors

### Issue: User can't log in (infinite redirect loop)

**Cause:** Subdomain validation causing redirect loop

**Solution:**

1. Check browser console for errors
2. Verify `tenant_slug` is included in auth response:
   ```bash
   # Test login endpoint
   curl -X POST https://api.upspeech.app/api/v1/auth/sign_in \
     -H "Content-Type: application/json" \
     -d '{"email":"user@example.com","password":"password"}'
   ```
3. Response should include `user.tenant_slug` field
4. If missing, verify `app-backend/app/serializers/user_serializer.rb` includes `tenant_slug`

### Issue: Marketing site (upspeech.app) not loading

**Cause:** DNS not pointing to Netlify correctly

**Solution:**

1. In Namecheap, verify A record for `@` points to Netlify IP
2. In Netlify, verify domain status shows "Active"
3. Check Netlify deployment status (should be "Published")
4. Test DNS resolution: `nslookup upspeech.app`

---

## Part 8: Maintenance & Updates

### Updating Environment Variables

**Railway:**

1. Update variables in Railway dashboard
2. Services redeploy automatically (2-3 minutes)

**Netlify:**

1. Update build environment variables in Netlify dashboard
2. Manually trigger a new deploy: **Deploys** → **Trigger deploy**

### SSL Certificate Renewal

- **Railway**: Let's Encrypt certificates auto-renew every 90 days
- **Netlify**: Let's Encrypt certificates auto-renew every 90 days
- No manual action required!

### Adding New Subdomains (Non-Tenant)

If you need a new subdomain like `staging.upspeech.app`:

1. **Add DNS record in Namecheap:**

   ```
   Type: CNAME
   Host: staging
   Value: [your-railway-staging-url].up.railway.app.
   ```

2. **Add custom domain in Railway:**
   - Navigate to staging service
   - Add domain: `staging.upspeech.app`

---

## Part 9: Rollback Procedure

If you need to rollback to the old setup (single domain without subdomains):

### Step 1: Update DNS (Namecheap)

1. Remove wildcard record (`*`)
2. Remove API subdomain record (`api`)
3. Keep only root domain records

### Step 2: Update Railway (app-frontend)

1. Remove custom domain `*.upspeech.app`
2. Use Railway's default URL or set a single custom domain

### Step 3: Update Railway (app-backend)

1. Update `CORS_ALLOWED_ORIGINS` to include old domain
2. Redeploy service

### Step 4: Update Frontend Code

1. Remove tenant validation from `src/lib/auth.tsx`
2. Update `.env.production` with old API URL
3. Redeploy frontend

---

## Part 10: Owner (Super Admin) Access - Admin Portal & Tenant Subdomains

### What is an Owner?

**Owners** are platform-level super administrators who can access:

1. **Admin portal** (`admin.upspeech.app`) - Platform-wide view of ALL tenants
2. **Any tenant subdomain** - Tenant-specific management

This role is for **internal use only** and should never be assigned to clients.

**Role Hierarchy:**

- **Owner**: Platform super admin (internal only) - can access admin portal + ANY tenant
- **Admin**: Tenant admin - can only access their own tenant
- **Therapist**: Tenant therapist - can only access their own tenant
- **Client**: Patient - can only access their own tenant

### How It Works: Two Access Modes

#### Mode 1: Admin Portal (`admin.upspeech.app`)

**Purpose:** Platform-wide management and overview

**What owners see:**

- ALL users across ALL tenants
- ALL reports across ALL tenants
- Can filter by tenant/organization
- Platform-level analytics and settings

**Example:**

```
1. Owner visits: https://admin.upspeech.app/login
2. Owner logs in with their credentials
3. Owner sees: List of ALL reports with tenant names
4. Owner filters: "Show only Acme reports"
5. Owner can view/edit reports (if supported)
```

#### Mode 2: Tenant Subdomain (e.g., `acme.upspeech.app`)

**Purpose:** Tenant-specific management (act as super-admin FOR THAT TENANT)

**What owners see:**

- ONLY Acme users
- ONLY Acme reports
- ONLY Acme settings
- Work in Acme tenant context

**Example:**

```
1. Owner visits: https://acme.upspeech.app/login
2. Owner logs in with their credentials
3. Owner sees: Acme's dashboard, users, reports, settings
4. API context: All API calls use Acme tenant context
5. Scoped to Acme only (no other tenants visible)
```

### Example Scenarios

**Scenario 1: Owner needs to view all reports**

```
1. Owner visits: https://admin.upspeech.app
2. Owner navigates to Reports page
3. Owner sees: Reports from Acme, SpeechCare, Clinic A, etc.
4. Owner uses tenant filter: "Show only SpeechCare reports"
```

**Scenario 2: Owner needs to manage specific tenant**

```
1. Owner visits: https://acme.upspeech.app
2. Owner works in Acme context
3. Owner creates users, edits reports, configures settings
4. All changes scoped to Acme tenant only
```

**Scenario 3: Owner switches between modes**

```
1. Owner on admin.upspeech.app → Sees ALL tenants data
2. Owner clicks "Go to Acme portal" → Redirects to acme.upspeech.app
3. Owner on acme.upspeech.app → Sees ONLY Acme data
4. Owner navigates back to admin.upspeech.app → Sees ALL tenants again
```

**Scenario 4: Regular admin tries to access admin portal**

```
1. Acme admin visits: https://admin.upspeech.app
2. Backend checks: Is user.role === 'owner'? NO
3. Frontend redirects to: https://acme.upspeech.app (their home tenant)
4. Result: Access denied to admin portal ❌
```

### Security Implications

✅ **Admin portal access restricted** - Only owners can access `admin.upspeech.app`
✅ **Owners can access any tenant** - This is intentional for platform management
✅ **Context-aware data scoping** - Admin portal shows all tenants, tenant subdomains show specific tenant only
✅ **Audit trail** - Owner actions are logged with their user ID
⚠️ **Critical**: Never assign "owner" role to external clients
⚠️ **Critical**: Monitor owner activity for unauthorized access
⚠️ **Critical**: Admin portal exposes all tenant data - ensure strong authentication

### Creating an Owner User

```ruby
# Rails console: bundle exec rails c

# Option 1: Create owner in a "platform" tenant
platform_tenant = Tenant.find_or_create_by!(
  name: "UpSpeech Platform",
  slug: "platform"
)

owner = User.create!(
  email: "admin@upspeech.app",
  password: "secure_password",
  first_name: "Platform",
  last_name: "Admin",
  role: "owner",
  tenant: platform_tenant
)

# Option 2: Promote existing user to owner
user = User.find_by(email: "existing@example.com")
user.update!(role: "owner")
```

### Best Practices

1. **Limit owner accounts** - Only create owner accounts for internal staff
2. **Use strong passwords** - Owners have access to all tenant data via admin portal
3. **Enable 2FA** - Consider adding two-factor authentication for owners (future enhancement)
4. **Audit owner actions** - Monitor owner activity in production logs, especially admin portal access
5. **Create a platform tenant** - Give owners a "home" tenant for their own data (e.g., `platform.upspeech.app`)
6. **Use admin portal for read-only operations** - Prefer `admin.upspeech.app` for viewing/filtering all tenants
7. **Use tenant subdomains for modifications** - Edit/delete operations should be done on specific tenant subdomains

### Future Enhancements

Consider adding:

- **Tenant switcher UI** - Quick links in admin portal to jump to specific tenant subdomains
- **Audit log** - Track owner access to admin portal and cross-tenant actions
- **Two-factor authentication** - Require 2FA for admin portal access
- **Admin-specific features** - Tenant creation, billing management, platform analytics
- **Tenant impersonation** - "View as Admin" to see what tenant admins see
- **Admin dashboard** - Platform-wide metrics, tenant health, usage statistics

---

## Part 11: Security Considerations

### 1. Cookie Security

**Current Setup:**

- Cookies are scoped to `.upspeech.app` (all subdomains)
- `secure: true` (HTTPS only)
- `httponly: true` (no JavaScript access)
- `same_site: :lax` (CSRF protection)

**Risk:** A compromised tenant subdomain could access cookies from other tenants if `domain: '.upspeech.app'` is used.

**Mitigation:**

- Backend validates tenant on every request
- Frontend validates subdomain on login
- Consider scoping cookies per-tenant if needed

### 2. Subdomain Takeover Prevention

**Risk:** If a tenant is deleted but their subdomain DNS remains, it could be taken over.

**Mitigation:**

- Soft-delete tenants (don't remove from database immediately)
- Backend returns 404 for deleted tenant subdomains
- Monitor for suspicious tenant creation patterns

### 3. SSL/TLS

**Current Setup:**

- Wildcard certificate (`*.upspeech.app`) covers all tenant subdomains
- Let's Encrypt auto-renewal

**Best Practices:**

- Force HTTPS redirects (already configured)
- Monitor certificate expiry (Railway handles this)
- Use HSTS headers (consider adding)

---

## Summary Checklist

Before going live, verify:

- [ ] DNS records configured in Namecheap (wildcard, api, root)
- [ ] Railway app-frontend has custom domain `*.upspeech.app` (Active status)
- [ ] Railway app-backend has custom domain `api.upspeech.app` (Active status)
- [ ] Netlify upspeech-website has custom domain `upspeech.app` (Active status)
- [ ] All SSL certificates provisioned (green lock icon in browsers)
- [ ] Environment variables updated in all services
- [ ] Marketing site loads at `https://upspeech.app`
- [ ] API responds at `https://api.upspeech.app/api/v1/health`
- [ ] Test tenant subdomain loads at `https://[tenant-slug].upspeech.app`
- [ ] Test admin portal loads at `https://admin.upspeech.app`
- [ ] Subdomain validation works (users can only access their tenant)
- [ ] Owner admin portal access works (owners can log into admin.upspeech.app)
- [ ] Owner tenant access works (owners can access any tenant subdomain)
- [ ] Non-owner users blocked from admin portal (redirected to their tenant)
- [ ] Non-owner users blocked from accessing other tenant subdomains (403)
- [ ] Admin portal shows all tenants data (users, reports with tenant filter)
- [ ] Tenant subdomains show tenant-specific data only
- [ ] Cross-subdomain cookie sharing works for logout
- [ ] Force HTTPS enabled on all services

---

## Support & Resources

- **Railway Documentation**: https://docs.railway.app/guides/domains
- **Netlify Documentation**: https://docs.netlify.com/domains-https/custom-domains/
- **Let's Encrypt**: https://letsencrypt.org/
- **DNS Propagation Checker**: https://dnschecker.org/
- **lvh.me (Local Subdomain Testing)**: http://lvh.me/

---

**Last Updated:** 2026-01-12
**Document Version:** 2.0 - Added admin portal (admin.upspeech.app) for platform-wide management
