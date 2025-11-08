# Report Template System

**Last Updated**: November 8, 2025

## Overview

UpSpeech uses a **multi-tenant template architecture** for reports that ensures:

- **WYSIWYG**: Web view and PDF export look identical
- **Tenant Customization**: Each tenant can configure their own branding, colors, and template style
- **Multi-language**: Support for multiple languages (en, pt, es, fr, de)
- **Extensibility**: Easy to add new report types and tenant-specific templates
- **Type Safety**: Backend enum ensures consistency across the system
- **Dynamic Theming**: CSS variables allow real-time branding updates

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Backend (Rails)                          │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ Report Model (report.rb)                              │  │
│  │                                                       │  │
│  │ enum :report_type, {                                  │  │
│  │   fluency_analysis: "fluency_analysis",               │  │
│  │   speech_patterns: "speech_patterns",                 │  │
│  │   comprehensive: "comprehensive"                      │  │
│  │ }                                                     │  │
│  └───────────────────────────────────────────────────────┘  │
│                          ↓                                  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ PDF Templates (ERB)                                   │  │
│  │  - app/views/layouts/pdf.html.erb                     │  │
│  │  - app/views/reports/pdf.html.erb                     │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                          ↓ API
┌─────────────────────────────────────────────────────────────┐
│                   Frontend (React)                          │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ ReportTemplateRegistry.tsx                            │  │
│  │                                                       │  │
│  │ const REPORT_TEMPLATES = {                            │  │
│  │   fluency_analysis: FluencyAnalysisTemplate,          │  │
│  │   speech_patterns: DefaultReportTemplate,             │  │
│  │   comprehensive: DefaultReportTemplate                │  │
│  │ }                                                     │  │
│  └───────────────────────────────────────────────────────┘  │
│                          ↓                                  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ Template Components                                   │  │
│  │  - BaseReportTemplate.tsx (shared layout)             │  │
│  │  - FluencyAnalysisTemplate.tsx                        │  │
│  │  - DefaultReportTemplate.tsx                          │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Tenant-Based Template Selection

UpSpeech supports **two levels of template customization**:

1. **Report Type Templates**: Different layouts for different clinical reports (fluency_analysis, comprehensive, etc.)
2. **Tenant Templates**: Completely custom templates for specific organizations (e.g., SpeechCare Portuguese template)

### Template Selection Priority

```
┌──────────────────────────────────────────────────────────────┐
│  1. Check tenant.report_template_type                        │
│     ↓                                                         │
│  2. Use TENANT_TEMPLATES[template_type] if exists            │
│     ↓                                                         │
│  3. Fallback to REPORT_TEMPLATES[report.report_type]         │
│     ↓                                                         │
│  4. Final fallback: DefaultReportTemplate                    │
└──────────────────────────────────────────────────────────────┘
```

### Example: SpeechCare Organization

A tenant with `report_template_type: "speechcare_pt"` will:

- Use `SpeechCarePortugueseTemplate` for ALL reports (regardless of report_type)
- Display Portuguese labels, Garamond font, blue branding
- Show SpeechCare contact information in footer

A tenant with `report_template_type: "default"` will:

- Use type-based selection: `FluencyAnalysisTemplate`, `DefaultReportTemplate`, etc.
- Display branding according to tenant theming (colors, logo, contact info)
- Respect tenant's language setting for labels

## Dynamic Theming System

Tenants can customize report branding without creating custom templates:

### Tenant Theme Fields

```ruby
# Database schema (tenants table)
logo_url:             string    # External URL for organization logo
primary_color:        string    # Hex color (e.g., #1f2937)
accent_color:         string    # Hex color (e.g., #10b981)
language:             string    # ISO code: en, pt, es, fr, de
contact_email:        string    # Shows in report footer
contact_phone:        string    # Shows in report footer
website:              string    # Shows in report footer
footer_text:          string    # Custom footer message
report_template_type: string    # default, speechcare_pt, etc.
```

### How Theming Works

1. **Backend** (`ReportsController#show`):

   ```ruby
   base_data[:tenant] = {
     logo_url: report.tenant.logo_url,
     primary_color: report.tenant.primary_color,
     accent_color: report.tenant.accent_color,
     # ... all theme fields
   }
   ```

2. **Frontend** (`BaseReportTemplate.tsx`):

   ```tsx
   // Extract tenant theme or use defaults
   const primaryColor = tenant?.primary_color || '#1f2937';
   const accentColor = tenant?.accent_color || '#10b981';

   // Apply CSS variables
   <div style={{
     '--primary-color': primaryColor,
     '--accent-color': accentColor
   }}>
   ```

3. **PDF** (`app/views/layouts/pdf.html.erb`):
   ```erb
   <% primary_color = tenant&.primary_color || '#1f2937' %>
   <style>
     :root {
       --primary-color: <%= primary_color %>;
       --accent-color: <%= accent_color %>;
     }
   </style>
   ```

### Admin UI for Tenant Settings

Owners and admins can configure branding at `/dashboard/tenant`:

- **Organization Settings**: Name, slug
- **Branding & Theme**: Logo URL, colors, language, template type
- **Contact Information**: Email, phone, website, footer text

Changes are immediately reflected in all new reports.

## Key Files

### Backend

| File                                                   | Purpose                                                  |
| ------------------------------------------------------ | -------------------------------------------------------- |
| `app/models/report.rb`                                 | **Source of truth** for report types (enum)              |
| `app/models/tenant.rb`                                 | Tenant model with theme field validations                |
| `app/controllers/api/v1/reports_controller.rb`         | Handles PDF export logic + includes tenant theme in JSON |
| `app/controllers/api/v1/tenant_settings_controller.rb` | API for owner/admin to manage tenant branding            |
| `app/views/layouts/pdf.html.erb`                       | PDF layout with tenant theming variables                 |
| `app/views/reports/pdf.html.erb`                       | PDF content template with tenant logo/footer             |
| `config/locales/en.yml`                                | English translations (Rails backend)                     |
| `config/locales/pt.yml`                                | Portuguese translations (Rails backend)                  |
| `db/migrate/...add_report_template_type_to_tenants.rb` | Adds report_template_type column                         |
| `db/migrate/...add_theming_to_tenants.rb`              | Adds 8 theming columns (logo, colors, contact, language) |

### Frontend

| File                                                                | Purpose                                                          |
| ------------------------------------------------------------------- | ---------------------------------------------------------------- |
| `src/components/reports/templates/ReportTemplateRegistry.tsx`       | Maps report types to templates + tenant-based selection logic    |
| `src/components/reports/templates/reportTemplateUtils.ts`           | Utility: `getReportTemplateForReport()` with tenant support      |
| `src/components/reports/templates/BaseReportTemplate.tsx`           | Shared report layout with dynamic theming (CSS variables)        |
| `src/components/reports/templates/FluencyAnalysisTemplate.tsx`      | Fluency-specific report template                                 |
| `src/components/reports/templates/DefaultReportTemplate.tsx`        | Generic report template                                          |
| `src/components/reports/templates/SpeechCarePortugueseTemplate.tsx` | SpeechCare-branded Portuguese template (tenant-specific)         |
| `src/pages/ReportViewPage.tsx`                                      | Uses templates for web viewing                                   |
| `src/pages/TenantSettingsPage.tsx`                                  | Admin UI for configuring tenant branding                         |
| `src/lib/api.ts`                                                    | API client with `getTenantSettings()` / `updateTenantSettings()` |
| `src/types/index.ts`                                                | TypeScript types including Tenant interface with theme fields    |
| `src/i18n/locales/en.json`                                          | English translations (frontend - i18next)                        |
| `src/i18n/locales/pt.json`                                          | Portuguese translations (frontend - i18next)                     |
| `public/images/speechcare-logo.png`                                 | SpeechCare organization logo asset                               |

## How to Add a New Report Type

Follow these steps to add a new report type (e.g., `stuttering_severity`):

### Step 1: Update Backend Enum

**File**: `app-backend/app/models/report.rb`

```ruby
class Report < ApplicationRecord
  # ... existing code ...

  # Update both the validation and the enum
  validates :report_type, presence: true,
    inclusion: { in: %w[fluency_analysis speech_patterns comprehensive stuttering_severity] }

  enum :report_type, {
    fluency_analysis: "fluency_analysis",
    speech_patterns: "speech_patterns",
    comprehensive: "comprehensive",
    stuttering_severity: "stuttering_severity"  # NEW
  }
end
```

### Step 2: Create Frontend Template Component

**File**: `app-frontend/src/components/reports/templates/StutteringSeverityTemplate.tsx`

```tsx
import { BaseReportTemplate } from "./BaseReportTemplate";
import type { ReportData } from "./BaseReportTemplate";

interface StutteringSeverityTemplateProps {
  report: ReportData;
  showPatientInfo?: boolean;
  showTenantInfo?: boolean;
}

export function StutteringSeverityTemplate({
  report,
  showPatientInfo,
  showTenantInfo,
}: StutteringSeverityTemplateProps) {
  return (
    <BaseReportTemplate
      report={report}
      showPatientInfo={showPatientInfo}
      showTenantInfo={showTenantInfo}
    >
      <div className="p-8 print:p-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200 print:border-gray-400 print:text-2xl">
          Stuttering Severity Assessment
        </h2>

        {/* Custom sections for stuttering severity */}
        <div className="space-y-6">
          {/* Severity Score Section */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Severity Score
            </h3>
            {/* Add custom content here */}
          </section>

          {/* Main Report Content */}
          {report.content_html ? (
            <div
              className="prose prose-sm max-w-none print:prose-print"
              dangerouslySetInnerHTML={{ __html: report.content_html }}
            />
          ) : (
            <div className="prose prose-sm max-w-none whitespace-pre-wrap print:prose-print">
              {report.content}
            </div>
          )}
        </div>
      </div>
    </BaseReportTemplate>
  );
}
```

### Step 3: Register Template in Registry

**File**: `app-frontend/src/components/reports/templates/ReportTemplateRegistry.tsx`

```tsx
import { ComponentType } from "react";
import type { ReportData } from "./BaseReportTemplate";
import { DefaultReportTemplate } from "./DefaultReportTemplate";
import { FluencyAnalysisTemplate } from "./FluencyAnalysisTemplate";
import { StutteringSeverityTemplate } from "./StutteringSeverityTemplate"; // NEW

// ... existing code ...

const REPORT_TEMPLATES: Record<string, ReportTemplateComponent> = {
  fluency_analysis: FluencyAnalysisTemplate,
  speech_patterns: DefaultReportTemplate,
  comprehensive: DefaultReportTemplate,
  stuttering_severity: StutteringSeverityTemplate, // NEW
};

// ... existing code ...

// Export new template
export { StutteringSeverityTemplate } from "./StutteringSeverityTemplate"; // NEW
```

### Step 4: (Optional) Update PDF Template

If you need custom PDF styling for this report type, update the backend PDF template:

**File**: `app-backend/app/views/reports/pdf.html.erb`

```erb
<!-- You can add conditional sections based on report type -->
<% if @report_data[:report].report_type == 'stuttering_severity' %>
  <!-- Custom section for stuttering severity reports -->
<% end %>
```

### Step 5: Test

1. **Backend**: Create a report with the new type

   ```ruby
   Report.create!(
     title: "Test Stuttering Severity",
     content: "Sample content",
     report_type: :stuttering_severity,  # Uses enum
     status: :ready,
     user: user,
     tenant: tenant,
     audio_recording: audio
   )
   ```

2. **Frontend**: Navigate to the report view page - should use new template

3. **PDF Export**: Click "Export PDF" - should render correctly

## Report Type Naming Conventions

- **Format**: `snake_case` (e.g., `fluency_analysis`, not `fluencyAnalysis`)
- **Descriptive**: Clearly describes the report's clinical focus
- **Consistent**: Must match exactly between backend enum and frontend registry
- **Unique**: No duplicate type names

## How to Add a Tenant-Specific Template

For organizations that need **complete control** over report design (custom branding, language, layout), create a tenant-specific template.

### Example: Adding "Acme Medical" Template

#### Step 1: Create Database Migration

```bash
cd app-backend
bundle exec rails generate migration AddAcmeMedicalTemplateType
```

No migration needed if you're just adding a new value to `report_template_type` (it's a string column). Just update the model validation:

```ruby
# app/models/tenant.rb
validates :report_template_type,
  inclusion: { in: %w[default speechcare_pt acme_medical] },
  allow_blank: true
```

#### Step 2: Create Frontend Template Component

**File**: `app-frontend/src/components/reports/templates/AcmeMedicalTemplate.tsx`

```tsx
import { BaseReportTemplate } from "./BaseReportTemplate";
import type { ReportData } from "./BaseReportTemplate";

interface AcmeMedicalTemplateProps {
  report: ReportData;
  showPatientInfo?: boolean;
  showTenantInfo?: boolean;
}

export function AcmeMedicalTemplate({
  report,
  showPatientInfo = true,
  showTenantInfo = true,
}: AcmeMedicalTemplateProps) {
  return (
    <BaseReportTemplate
      report={report}
      showPatientInfo={showPatientInfo}
      showTenantInfo={showTenantInfo}
    >
      <div
        className="p-8 print:p-12"
        style={{ fontFamily: "Arial, sans-serif" }}
      >
        {/* Custom Acme Medical header with logo */}
        <div className="mb-6 text-center">
          <img
            src="https://acme-medical.com/logo.png"
            alt="Acme Medical"
            className="h-16 mx-auto mb-2"
          />
          <h1 style={{ color: "#003366" }} className="text-2xl font-bold">
            Clinical Speech Assessment
          </h1>
        </div>

        {/* Custom sections specific to Acme Medical workflow */}
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2" style={{ color: "#003366" }}>
            Assessment Overview
          </h2>
          {/* Acme-specific content structure */}
        </section>

        {/* Main report content */}
        {report.content_html ? (
          <div
            className="prose prose-sm max-w-none print:prose-print"
            dangerouslySetInnerHTML={{ __html: report.content_html }}
          />
        ) : (
          <div className="prose prose-sm max-w-none whitespace-pre-wrap print:prose-print">
            {report.content}
          </div>
        )}

        {/* Acme Medical footer */}
        <footer className="mt-8 pt-4 border-t text-sm text-gray-600">
          <p>Acme Medical Center | www.acme-medical.com | (555) 123-4567</p>
          <p className="text-xs mt-2">
            This report is confidential and intended solely for the use of the
            addressee.
          </p>
        </footer>
      </div>
    </BaseReportTemplate>
  );
}
```

#### Step 3: Register in Template Utilities

**File**: `app-frontend/src/components/reports/templates/reportTemplateUtils.ts`

```tsx
import { AcmeMedicalTemplate } from "./AcmeMedicalTemplate";

const TENANT_TEMPLATES: Record<string, ReportTemplateComponent> = {
  speechcare_pt: SpeechCarePortugueseTemplate,
  acme_medical: AcmeMedicalTemplate, // NEW
  default: DefaultReportTemplate,
};
```

#### Step 4: Export from Registry

**File**: `app-frontend/src/components/reports/templates/ReportTemplateRegistry.tsx`

```tsx
export { AcmeMedicalTemplate } from "./AcmeMedicalTemplate";
```

#### Step 5: Update Tenant Settings Dropdown

**File**: `app-frontend/src/pages/TenantSettingsPage.tsx`

```tsx
<select value={formData.report_template_type} ...>
  <option value="default">Default Template</option>
  <option value="speechcare_pt">SpeechCare (Portuguese)</option>
  <option value="acme_medical">Acme Medical</option>  {/* NEW */}
</select>
```

#### Step 6: Set Tenant Configuration

As an owner/admin, navigate to `/dashboard/tenant` and select "Acme Medical" template.

All reports for this tenant will now use the custom template!

### Tenant-Specific vs Dynamic Theming

| Approach            | When to Use                                          |
| ------------------- | ---------------------------------------------------- |
| **Dynamic Theming** | Organization wants custom colors, logo, contact info |
| (default template)  | Standard report layout is acceptable                 |
|                     | Just needs branding customization                    |
| **Tenant-Specific** | Organization requires completely custom layout       |
| Template            | Different section structure                          |
|                     | Specific fonts, hard-coded text, unique workflow     |
|                     | Example: SpeechCare Portuguese template              |

**Best Practice**: Start with dynamic theming. Only create tenant-specific templates when layout customization is required.

## Common Patterns

### When to Create a New Template

Create a new template component when:

- ✅ Report has unique sections (e.g., severity scores, custom metrics)
- ✅ Report needs different visual layout
- ✅ Report has specialized visualizations (charts, graphs)

Use `DefaultReportTemplate` when:

- ✅ Report is primarily text-based analysis
- ✅ No custom sections needed
- ✅ Standard clinical report format is sufficient

### Template Component Structure

All templates should:

1. Accept `ReportData`, `showPatientInfo`, `showTenantInfo` props
2. Wrap content in `<BaseReportTemplate>` for consistent header/footer
3. Use print-friendly CSS classes (e.g., `print:p-12`, `print:text-2xl`)
4. Render `content_html` (processed markdown) or fallback to `content`

Example:

```tsx
<BaseReportTemplate {...props}>
  <div className="p-8 print:p-12">
    {/* Custom sections */}

    {/* Always include main content */}
    {report.content_html ? (
      <div dangerouslySetInnerHTML={{ __html: report.content_html }} />
    ) : (
      <div>{report.content}</div>
    )}
  </div>
</BaseReportTemplate>
```

## TypeScript Type Safety

The `ReportData` interface is defined in `BaseReportTemplate.tsx`:

```tsx
export interface ReportData {
  id: number;
  title: string;
  content: string;
  content_html?: string;
  status: 'draft' | 'ready';
  report_type: string;  // Should match backend enum values
  created_at: string;
  updated_at: string;
  user?: { ... };
  tenant?: { ... };
  audio_recording: { ... };
  transcriptions?: [...];
}
```

## PDF Generation Flow

1. User clicks "Export PDF" in `ReportViewPage.tsx`
2. Frontend calls `apiClient.exportReportPDF(id)`
3. Backend `reports_controller.rb#export_pdf`:
   - Loads report data
   - Processes markdown content to HTML
   - Renders ERB template (`app/views/reports/pdf.html.erb`)
   - Returns HTML as JSON: `{ html: html, filename: "..." }`
4. Frontend receives HTML and:
   - Opens a new browser window
   - Writes the HTML into the window
   - Triggers browser's native print dialog (`window.print()`)
5. User saves as PDF using browser's print-to-PDF feature

## Consistency Checklist

When adding a new report type, ensure:

- [ ] Backend enum updated in `report.rb`
- [ ] Backend validation includes new type
- [ ] Frontend template component created
- [ ] Frontend registry maps type to component
- [ ] Template exports in registry file
- [ ] Template uses `BaseReportTemplate` wrapper
- [ ] Template renders `content_html` or `content`
- [ ] Print CSS classes included (`print:*`)
- [ ] Tested: Create report → View → Edit → Export PDF

## Migration Example

If you need to add a new report type to an existing database:

```ruby
# db/migrate/YYYYMMDDHHMMSS_add_stuttering_severity_report_type.rb
class AddStutteringSeverityReportType < ActiveRecord::Migration[8.0]
  def up
    # The enum is stored as a string, so no migration needed
    # Just update the model enum and you're done!

    # However, if you want to update existing reports:
    # Report.where(report_type: 'comprehensive')
    #       .where("content LIKE '%stuttering severity%'")
    #       .update_all(report_type: 'stuttering_severity')
  end

  def down
    # Rollback if needed
    # Report.where(report_type: 'stuttering_severity')
    #       .update_all(report_type: 'comprehensive')
  end
end
```

## Troubleshooting

### "Report type not found" error

**Problem**: Frontend can't find template for report type
**Solution**: Check `REPORT_TEMPLATES` in `ReportTemplateRegistry.tsx` - type name must match backend exactly

### PDF doesn't match web view

**Problem**: PDF styling differs from web view
**Solution**: Ensure both templates use similar structure. Check `app/views/reports/pdf.html.erb` mirrors `BaseReportTemplate.tsx` layout

### TypeScript import error: "doesn't provide export named ReportData"

**Problem**: Mixing value and type imports
**Solution**: Use `import type { ReportData }` for types, `import { Component }` for components

```tsx
// ✅ Correct
import { BaseReportTemplate } from "./BaseReportTemplate";
import type { ReportData } from "./BaseReportTemplate";

// ❌ Incorrect
import { BaseReportTemplate, ReportData } from "./BaseReportTemplate";
```

---

**For questions or issues with the template system**, check:

- This document
- Inline comments in `ReportTemplateRegistry.tsx`
- `SYSTEM_DESIGN.md` for overall architecture
