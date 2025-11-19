# Multi-Tenancy Strategy

Status: **Current Implementation v1.0** (Session-based tenant resolution)
Last Updated: 2025-09-15

## 1. Goals

- Simple to implement now (no over-engineering).
- Strong logical isolation with minimal developer friction.
- Migration path to stronger physical isolation for select tenants.
- Minimize risk of cross-tenant data exposure.

## 2. Phased Approach

| Phase         | Model                                                | Use Case          | Notes                                      |
| ------------- | ---------------------------------------------------- | ----------------- | ------------------------------------------ |
| 1 (MVP)       | Shared schema; `tenant_id` FK on rows                | Fast delivery     | Add indexes early.                         |
| 2 (Enhance)   | Postgres Row Level Security                          | Defense in depth  | Activate once queries stable.              |
| 3 (Selective) | Separate schemas per enterprise tenant               | Premium isolation | Migrate subset of tenants.                 |
| 4 (Advanced)  | Separate databases (cluster or serverless instances) | Large enterprise  | Only if data volume or compliance demands. |

## 3. Tenant Identification (Current Implementation)

- **Session-based**: Tenant resolved via `current_user.tenant` association.
- `current_tenant` set in ApplicationController from authenticated user session.
- All requests use session authentication to determine tenant context.
- **Future**: JWT with `tid` claim for stateless tenant resolution.

## 4. Data Modeling Conventions

- Every tenant-owned table: `tenant_id UUID NOT NULL` + composite index if high cardinality queries: `(tenant_id, created_at)` or `(tenant_id, status)`.
- Reference pattern:

```ruby
# Example model
class AudioRecording < ApplicationRecord
  include TenantScoped
  belongs_to :tenant
  belongs_to :user
end
```

## 5. Rails Enforcement Layer (Current Implementation)

ApplicationController pattern:

```ruby
class ApplicationController < ActionController::API
  before_action :set_current_tenant

  protected

  def current_tenant
    @current_tenant ||= current_user&.tenant
  end

  def set_current_tenant
    Current.tenant = current_user.tenant if current_user
  end
end
```

`TenantScoped` concern (planned):

- Validates presence of `tenant_id`.
- `for_current_tenant` scope invoked in controllers.
- Explicit scoping to avoid global default scope pitfalls.

## 6. Query Safety

- RuboCop custom cop to flag models missing `tenant_id`.
- Test helper: `expect { unsafe_query }.to raise_error(TenantScopeMissing)` in critical paths.
- Periodic sampling: log statements without tenant filter (log scanning job).

## 7. RLS (Phase 2)

Example policy after validation period:

```sql
ALTER TABLE audio_recordings ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON audio_recordings
  USING (tenant_id::text = current_setting('app.current_tenant_id'));
```

Set parameter at session start:

```sql
SELECT set_config('app.current_tenant_id', 'tenant-uuid-here', false);
```

Rails middleware sets it per request via `ActiveRecord::Base.connection.execute`.

## 8. Schema / DB Migration (Phase 3+)

Migration candidate criteria:

- Data volume > X GB OR latency sensitive OR contractual isolation.
- Steps:
  1. Create new schema `tenant_<slug>`.
  2. Copy structure (pg_dump --schema-only).
  3. Use logical replication or dual-write instrumentation for cutover.
  4. Freeze writes for tenant, sync delta, update routing table, unfreeze.

Routing abstraction: `TenantRouter.resolve(tenant_id)` → returns connection spec.

## 9. Background Jobs

Include `tenant_id` explicitly in job args. Load tenant context at job start. Fail fast if tenant missing or soft-deleted.

## 10. Soft Deletion & Retention

- Add `deleted_at` to Tenant for graceful off-boarding.
- Background job queues reject jobs for deleted tenants.
- Data purge policy (Phase 2) configurable in settings table.

## 11. Observability

- Add `tenant_id` to structured logs + metrics tags.
- PII scrubbing pipeline to avoid leaking user content into logs.

## 12. Testing Strategy

- Factory creates a tenant + user automatically.
- Shared examples ensuring each model enforces tenant scope.
- Cross-tenant access attempt spec (should raise / 404).

## 13. Current Implementation Notes

- **Session-based tenant resolution**: Simple, reliable for MVP
- **Database queries**: Each request loads tenant via user association
- **Performance**: Acceptable for single-server deployment
- **Scaling limitation**: Session state prevents horizontal scaling

## 14. Future Improvements

### JWT Migration (Priority 1)

- **Stateless tenant resolution**: Embed `tid` in JWT claims
- **Performance**: Eliminate per-request tenant database lookups
- **Scaling**: Enable horizontal scaling across multiple servers
- **Microservices**: Allow other services to validate tenant context

### Additional Enhancements

- Per-tenant rate limits (Redis buckets keyed by tenant)
- Billing integration aligned with isolation levels
- Enhanced audit logging with tenant context

## 15. Open Questions

- JWT migration timeline based on scaling requirements
- Per-tenant feature flags and customization needs
- Billing provider integration strategy

## 16. Summary

Current session-based implementation provides secure tenant isolation for MVP. Clear migration path to JWT-based stateless tenant resolution when horizontal scaling becomes necessary.
