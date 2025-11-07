# Permissions & Authorization System

## Overview

Fluently uses a role-based access control (RBAC) system with multi-tenant support to manage user permissions across speech therapy organizations. The system supports five user roles with clearly defined capabilities and scope limitations.

## User Roles

### 1. Owner (Super Admin)

- **Scope**: Cross-tenant system administrator
- **Key Capabilities**:
  - Manage all tenants/organizations
  - View all data system-wide
  - Access reports from any tenant
  - Full system analytics and insights
  - Can perform any action across the entire platform

### 2. Admin (Organization Manager)

- **Scope**: Single tenant administrator
- **Key Capabilities**:
  - Manage their organization's users
  - View organization-wide analytics
  - Access all reports within their tenant
  - Manage client accounts and therapists
  - Configure organization settings

### 3. Therapist (Speech Language Pathologist)

- **Scope**: Clinical professional within tenant
- **Key Capabilities**:
  - Manage assigned clients
  - View all reports within their tenant
  - Upload audio files for analysis
  - Access client progress data
  - Generate therapy reports

### 4. Client (Primary Users)

- **Scope**: Individual speech therapy patients
- **Key Capabilities**:
  - Record new audio sessions
  - Upload personal audio files
  - View only their own reports and data
  - Track personal progress
  - Access Portuguese-language interface

### 5. Member (Alternative Client Role)

- **Scope**: Similar to client with potential for extended features
- **Key Capabilities**:
  - Record audio sessions
  - Upload audio files
  - View own data only
  - Access basic platform features

## Permission Matrix

| Permission               | Owner | Admin | Therapist | Client | Member |
| ------------------------ | ----- | ----- | --------- | ------ | ------ |
| `can_manage_all_tenants` | ✅    | ❌    | ❌        | ❌     | ❌     |
| `can_view_all_tenants`   | ✅    | ❌    | ❌        | ❌     | ❌     |
| `can_manage_tenant`      | ❌\*  | ✅    | ❌        | ❌     | ❌     |
| `can_manage_users`       | ✅    | ✅    | ❌        | ❌     | ❌     |
| `can_access_analytics`   | ✅    | ✅    | ❌        | ❌     | ❌     |
| `can_manage_clients`     | ✅    | ✅    | ✅        | ❌     | ❌     |
| `can_view_all_reports`   | ✅    | ✅    | ✅        | ❌     | ❌     |
| `can_upload_audio`       | ✅    | ✅    | ✅        | ✅     | ✅     |
| `can_record_audio`       | ❌    | ❌    | ❌        | ✅     | ✅     |
| `can_view_own_data_only` | ❌    | ❌    | ❌        | ✅     | ❌     |

_Note: Owners manage ALL tenants, not specific ones_

## Architecture Implementation

### Backend (Rails)

#### User Model (`app/models/user.rb`)

```ruby
class User < ApplicationRecord
  validates :role, inclusion: { in: ['owner', 'admin', 'member', 'therapist', 'client'] }

  # Owner permissions (cross-tenant)
  def can_manage_all_tenants?
    role == 'owner'
  end

  # Admin permissions (single-tenant)
  def can_manage_tenant?
    role == 'admin'
  end

  # Professional permissions
  def can_view_all_reports?
    ['owner', 'admin', 'therapist'].include?(role)
  end

  # Client permissions
  def can_record_audio?
    ['client', 'member'].include?(role)
  end
end
```

#### Controller Authorization

```ruby
class Api::V1::ReportsController < ApplicationController
  before_action :authorize_report, only: [:show, :destroy]

  def index
    @reports = case current_user.role
    when 'owner'
      # Cross-tenant access
      Report.includes(:audio_recording, :user, :tenant)
    when 'admin', 'therapist'
      # Tenant-scoped access
      current_tenant.reports.includes(:audio_recording, :user)
    when 'client', 'member'
      # User-scoped access
      current_tenant.reports.where(user: current_user)
    end
  end
end
```

### Frontend (React/TypeScript)

#### Permission Functions (`src/lib/permissions.ts`)

```typescript
export const canManageAllTenants = (user: User | null): boolean => {
  return user?.permissions?.can_manage_all_tenants ?? false;
};

export const canViewAllReports = (user: User | null): boolean => {
  return user?.permissions?.can_view_all_reports ?? false;
};
```

#### Role-Based Components

```typescript
// Conditional rendering based on permissions
{
  canViewAllReports(user) && <ReportsList showUserInfo={true} />;
}

{
  canRecordAudio(user) && <RecordingButton />;
}
```

## Data Flow & Security

### Multi-Tenant Data Isolation

1. **Tenant Scoping**: Most operations are scoped to `current_tenant`
2. **Owner Exception**: Owners bypass tenant scoping for cross-tenant operations
3. **User Isolation**: Clients can only access their own data within their tenant

### API Response Structure

The API includes different data based on user permissions:

```json
{
  "data": [
    {
      "id": 123,
      "title": "Speech Analysis",
      "status": "ready",
      // Included for admins/therapists/owners
      "user": {
        "id": 456,
        "first_name": "João",
        "last_name": "Silva"
      },
      // Included only for owners
      "tenant": {
        "id": 789,
        "name": "Clínica Exemplo"
      }
    }
  ]
}
```

## Testing Strategy

### Backend Tests

- **Role-based filtering**: Verify each role sees appropriate data
- **Cross-tenant access**: Ensure owners can access all tenants
- **Authorization boundaries**: Test access denial for unauthorized actions
- **Permission methods**: Unit tests for all permission functions

### Frontend Tests

- **Permission functions**: Test all utility functions with edge cases
- **Conditional rendering**: Verify UI elements show/hide correctly
- **Role-specific dashboards**: Test each dashboard component

## Security Considerations

### Defense in Depth

1. **Database-level**: Queries scoped by tenant/user
2. **Controller-level**: Authorization checks before actions
3. **API-level**: Data filtering based on permissions
4. **Frontend-level**: UI restrictions based on roles

### Common Patterns

```ruby
# Always check permissions before sensitive operations
def authorize_report
  case current_user.role
  when 'owner'
    true # Can access any report
  when 'admin', 'therapist'
    @report.tenant == current_tenant
  when 'client', 'member'
    @report.user == current_user && @report.tenant == current_tenant
  end
end
```

## Portuguese Therapy Context

### Client Experience

- Portuguese-language interface for Brazilian speech therapy patients
- Simplified recording and progress tracking
- Focus on "sessões" (sessions) and "progresso" (progress)

### Professional Tools

- Multi-client management for therapists
- Cross-organization insights for admins
- Comprehensive analytics for treatment planning

## Future Considerations

### Potential Enhancements

1. **Fine-grained permissions**: Move to policy-based system (Pundit)
2. **Team-based access**: Sub-groups within organizations
3. **Time-based permissions**: Temporary access grants
4. **Audit logging**: Track permission usage and changes

### Migration Strategy

If moving to a permissions gem:

1. Keep current system alongside new implementation
2. Gradually migrate controllers to policy-based authorization
3. Maintain backward compatibility during transition
4. Full migration only after thorough testing

## Implementation Status

✅ **Complete**

- Role-based permission system
- Multi-tenant data isolation
- Frontend permission utilities
- Comprehensive test coverage

🔄 **Ongoing**

- Performance optimization
- Enhanced audit logging

📋 **Planned**

- Admin panel for permission management
- Role delegation features
- Advanced analytics permissions

---

_Last updated: January 2025_
_Next review: March 2025_
