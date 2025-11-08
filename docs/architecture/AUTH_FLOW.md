# Authentication & Authorization Flow

Status: **Current Implementation v1.1** (JWT-based)
Last Updated: 2025-11-08

## 1. Goals

- Secure API access with stateless JWT (JSON Web Token) authentication.
- Multi-tenant aware: tenant context is embedded in the JWT and resolved on the backend.
- Scalable and ready for microservice communication.

## 2. Current Implementation (JWT-Based)

The application uses JWT Bearer tokens for authenticating all API requests. The flow leverages a customized Devise setup on the backend to issue tokens and a client-side implementation that stores the token in `localStorage`.

## 3. Actors

- End-user (browser SPA).
- Rails API (customized Devise controllers, `JwtService`).
- Frontend Auth Service (`useAuth` context).

## 4. Authentication Model

| Component | Storage | Lifetime | Purpose |
|---|---|---|---|
| **JWT Access Token** | `localStorage` (frontend) | **24 hours** | Authenticate API requests. Contains `user_id`, `tenant_id`. |
| **User Profile** | `localStorage` (frontend) | Session | Cache user data locally for the UI. |
| **(Optional) Password Reset Token** | DB or signed token | 1h | Credential recovery. |

## 5. Login Flow

1.  **POST `/auth/sign_in`** with `{user: {email, password}}`.
2.  The backend's `Auth::SessionsController` uses Devise to validate credentials.
3.  If valid, the controller calls `JwtService.encode` to create a new JWT. The payload contains `user_id`, `tenant_id`, and a 24-hour expiry (`exp`).
4.  The server returns a JSON response:
    ```json
    {
      "status": { "code": 200, "message": "Logged in successfully." },
      "token": "ey...",
      "exp": "11-09-2025 14:30",
      "user": { ... }
    }
    ```
5.  The frontend's `AuthProvider` (`lib/auth.tsx`) receives the response.
6.  The `token`, expiry `exp`, and `user` data are stored in `localStorage`.
7.  The user is now authenticated; subsequent API calls will include the token.

## 6. Token Handling & API Requests

-   **Storage**: The JWT is stored in the browser's `localStorage`.
-   **Sending the Token**: A frontend Axios interceptor (`lib/api.ts`) automatically attaches the token to the `Authorization` header for all API requests to the versioned API:
    `Authorization: Bearer <token>`
-   **Backend Verification**: On each request, a `before_action` in the `ApplicationController` (using the `JsonWebToken` concern) decodes and validates the token. It uses the token's payload to find the `current_user` and `current_tenant`.
-   **Unauthorized Requests**: If the token is missing, invalid, or expired, the server returns a `401 Unauthorized` status.
-   **Frontend 401 Handling**: An Axios response interceptor catches 401 errors, clears the `auth_token` and `user_data` from `localStorage`, and redirects the user to the login page.

## 7. Logout

1.  Frontend calls the `logout` function in `AuthProvider`.
2.  An optional **DELETE `/auth/sign_out`** request is made to the backend.
3.  Crucially, the frontend **deletes** the `auth_token`, `token_expiry`, and `user_data` from `localStorage`.
4.  The user state is cleared, and they are effectively logged out.

## 8. Password Reset

1. Request: POST `/auth/password/reset/request` with email.
2. Send signed token link `https://app/reset?token=...`.
3. Validate, allow new password set.

## 9. Registration

- POST `/auth` (Devise registration): creates a new `Tenant` and associated `User` (with `owner` role).
- Upon successful registration, the backend returns a JWT, logging the user in immediately.
- Optionally require email verification before enabling login.

## 10. Roles & Authorization

- **Roles**: `owner`, `admin`, `therapist`, `client`, `member`.
- **Policy Layer**: Pundit is used for authorization policies.
- **Verification**: The server validates roles on each request via the `current_user` object, which is authenticated and loaded from the JWT payload.

## 11. Rate Limiting

- `/auth/sign_in`: 5 attempts / 10 min / IP + email combo.
- Standard Rails rate limiting on auth endpoints is in place.

## 12. CSRF Considerations

- Since the application uses stateless JWTs sent in the `Authorization` header and does not rely on cookies for authentication, it is not vulnerable to CSRF attacks.
- The Rails backend may still have CSRF protection enabled by default, but it does not apply to the API endpoints authenticated via JWT.

## 13. Implementation Details

### Backend

-   **Gems**:
    -   `devise` for handling the user model and authentication logic.
    -   `jwt` for encoding and decoding tokens.
    -   `pundit` for authorization policies.
    -   `argon2` for password hashing.
-   **`Auth::SessionsController`**: Overrides the default Devise `respond_with` method to generate and return a JWT upon successful login.
-   **`JwtService`**: A service class (`app/services/jwt_service.rb`) that encapsulates JWT encoding/decoding logic.
-   **`JsonWebToken` Concern**: A controller concern (`app/controllers/concerns/json_web_token.rb`) that handles decoding the token from the `Authorization` header and setting the `@current_user`.

### Frontend

-   **`lib/api.ts`**: Contains the `ApiClient` with Axios interceptors to add the `Authorization` header to requests and handle 401 responses.
-   **`lib/auth.tsx`**: The `AuthProvider` component manages the user's authentication state, handles login/logout logic, and interacts with `localStorage`.

## 14. Auditing

Log events: login success/failure, password reset request, role change. (Future Implementation)

## 15. Future Improvements

-   **Refresh Tokens**: To improve security and provide longer-lived sessions without exposing a long-lived access token, a refresh token mechanism could be implemented.
    -   Access tokens would have a shorter lifetime (e.g., 15 minutes).
    -   A secure, `HttpOnly` refresh token would be used to obtain a new access token without requiring the user to log in again.
-   **SSO (SAML / OIDC)**: Map external identity providers to tenant roles.
-   **WebAuthn**: For phishing-resistant MFA.

## 16. Summary

The application uses a **JWT-based authentication** system, which provides a stateless and scalable method for securing the API. The backend leverages Devise for credential validation and a custom `JwtService` for token generation. The frontend manages the token in `localStorage` and uses Axios interceptors to automate adding it to API requests. This approach is secure and well-suited for a modern SPA architecture.
