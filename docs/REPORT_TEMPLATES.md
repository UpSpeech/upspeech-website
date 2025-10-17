# Report Template System

**Last Updated**: October 17, 2025

## Overview

UpSpeech uses a **template-based architecture** for reports that ensures:

- **WYSIWYG**: Web view and PDF export look identical
- **Extensibility**: Easy to add new report types with custom layouts
- **Type Safety**: Backend enum ensures consistency across the system
- **Maintainability**: Single source of truth for report types

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

## Key Files

### Backend

| File                                           | Purpose                                     |
| ---------------------------------------------- | ------------------------------------------- |
| `app/models/report.rb`                         | **Source of truth** for report types (enum) |
| `app/controllers/api/v1/reports_controller.rb` | Handles PDF export logic                    |
| `app/views/layouts/pdf.html.erb`               | PDF layout with print-optimized CSS         |
| `app/views/reports/pdf.html.erb`               | PDF content template (matches frontend)     |

### Frontend

| File                                                           | Purpose                                         |
| -------------------------------------------------------------- | ----------------------------------------------- |
| `src/components/reports/templates/ReportTemplateRegistry.tsx`  | Maps report types to templates                  |
| `src/components/reports/templates/BaseReportTemplate.tsx`      | Shared report layout (header, footer, metadata) |
| `src/components/reports/templates/FluencyAnalysisTemplate.tsx` | Fluency-specific report template                |
| `src/components/reports/templates/DefaultReportTemplate.tsx`   | Generic report template                         |
| `src/pages/ReportViewPage.tsx`                                 | Uses templates for web viewing                  |

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
   - Converts HTML to PDF using Grover (Puppeteer/Chrome)
   - Returns PDF as binary data
4. Frontend downloads the PDF file

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
