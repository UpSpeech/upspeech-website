# Authentication & Authorization Flow

Status: **Current Implementation v1.0** (Session-based)
Last Updated: 2025-09-15

## 1. Goals

- Secure API access with session-based authentication.
- Multi-tenant aware: tenant context resolved via user associations.
- Fast implementation for MVP; easy to extend (SSO, magic links).

## 2. Current Implementation (Session-Based)

**Note**: This differs from the original JWT design for faster MVP delivery. See [Future Improvements](#future-improvements) for JWT migration plan.

## 3. Actors

- End-user (browser SPA).
- Rails API (Devise controllers).
- Session Store (Rails built-in session management).

## 4. Authentication Model

| Component                           | Storage                                | Lifetime      | Purpose                   |
| ----------------------------------- | -------------------------------------- | ------------- | ------------------------- |
| Session Cookie                      | HttpOnly Secure SameSite=Strict cookie | Rails default | Maintain user session.    |
| User Profile                        | localStorage (frontend)                | Session       | Cache user data locally.  |
| (Optional) Email Verification Token | DB or signed token                     | 24h           | Activate user.            |
| (Optional) Password Reset Token     | DB or signed token                     | 1h            | Credential recovery.      |

Session Context: User ID, tenant association via `current_user.tenant`.

## 5. Login Flow

1. POST `/auth/sign_in` with `{user: {email, password}}`.
2. Devise validates credentials; ensure user belongs to active tenant.
3. Rails creates session and sets session cookie.
4. Return `{status: {code: 200, message: "..."}, data: user_profile}`.
5. Frontend stores user profile in localStorage (no tokens).

## 6. Session Management

- **Server-side**: Rails manages session state automatically.
- **Client-side**: Session cookie sent automatically with requests.
- **Tenant Context**: Resolved via `current_user.tenant` in ApplicationController.
- **CORS**: Configured to allow credentials for cross-origin requests.

## 7. Logout

- DELETE `/auth/sign_out`: Devise destroys session.
- Frontend clears localStorage user data.

## 8. Password Reset

1. Request: POST `/auth/password/reset/request` with email.
2. Send signed token link `https://app/reset?token=...`.
3. Validate, allow new password set; invalidate existing sessions.

## 9. Registration

- POST `/auth` (Devise registration): creates Tenant + User (owner role).
- Optionally require email verification before enabling login.
- Seed default settings rows.

## 10. Roles & Authorization

Initial roles: `owner`, `admin`, `member`.

- Policy layer: Pundit with tenant scoping.
- Server validates roles on each request via `current_user` session data.

## 11. Rate Limiting

- `/auth/sign_in`: 5 attempts / 10 min / IP + email combo.
- Standard Rails rate limiting on auth endpoints.

## 12. CSRF Considerations

- Sessions use Rails built-in CSRF protection.
- API requests include CSRF token for state-changing operations.

## 13. Implementation Gems

- `devise` (email/password, recoverable, confirmable, sessions).
- `argon2` or `bcrypt` for password hashing.
- `pundit` for authorization policies.

## 14. Frontend Handling

- Store user profile in localStorage (no sensitive tokens).
- Session cookie automatically sent with requests.
- Global Axios interceptor for 401 → redirect to login.

## 15. Current Session Context

```ruby
# ApplicationController
def current_tenant
  @current_tenant ||= current_user&.tenant
end

def set_current_tenant
  Current.tenant = current_user.tenant if current_user
end
```

## 16. Auditing (Phase 2)

Log events: login success/failure, password reset request, role change.

## 17. Future Improvements

### JWT Migration (Phase 2)
- **Goal**: Implement stateless JWT authentication for horizontal scaling
- **Access Tokens**: 15-minute JWT with `tid` (tenant) claims
- **Refresh Tokens**: 30-day rotating HttpOnly cookies
- **Benefits**: Stateless scaling, embedded tenant context, microservice-ready
- **Migration Path**: Dual authentication support during transition

### Additional Enhancements
- SSO (SAML / OIDC) maps external identity to tenant role.
- Magic links (email-based sign-in).
- WebAuthn for phishing-resistant MFA.

## 18. Summary

Session-based authentication provides secure, simple MVP implementation. Tenant context resolved via user associations. Clear migration path to JWT when horizontal scaling is needed.
