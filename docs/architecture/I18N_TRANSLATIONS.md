# Internationalization (i18n) & Translations

**Last Updated**: November 8, 2025

## Overview

UpSpeech supports **multi-language functionality** across both frontend and backend:

- **Frontend**: React i18next for UI labels, messages, and dynamic content
- **Backend**: Rails I18n for server-rendered content (PDFs, emails)
- **Supported Languages**: English (en), Portuguese (pt), Spanish (es), French (fr), German (de)

## Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                    Frontend (React)                          │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ i18next Configuration                                  │  │
│  │  - src/i18n/config.ts                                  │  │
│  │  - Detects browser language                            │  │
│  │  - Loads JSON translation files                        │  │
│  └────────────────────────────────────────────────────────┘  │
│                          ↓                                   │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ Translation Files (JSON)                               │  │
│  │  - src/i18n/locales/en.json                            │  │
│  │  - src/i18n/locales/pt.json                            │  │
│  │  - src/i18n/locales/es.json (future)                   │  │
│  └────────────────────────────────────────────────────────┘  │
│                          ↓                                   │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ React Components                                       │  │
│  │  - const { t } = useTranslation()                      │  │
│  │  - t('key.path')                                       │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│                    Backend (Rails)                           │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ Rails I18n Configuration                               │  │
│  │  - config/application.rb                               │  │
│  │  - config.i18n.available_locales = [:en, :pt]          │  │
│  │  - config.i18n.default_locale = :en                    │  │
│  └────────────────────────────────────────────────────────┘  │
│                          ↓                                   │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ Locale Files (YAML)                                    │  │
│  │  - config/locales/en.yml                               │  │
│  │  - config/locales/pt.yml                               │  │
│  └────────────────────────────────────────────────────────┘  │
│                          ↓                                   │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ ERB Templates / Controllers                            │  │
│  │  - I18n.t('key.path')                                  │  │
│  │  - t('key.path') in views                              │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

## Frontend Translations (i18next)

### Setup

**File**: `app-frontend/src/i18n/config.ts`

```tsx
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import translation files
import enTranslations from "./locales/en.json";
import ptTranslations from "./locales/pt.json";

i18n
  .use(LanguageDetector) // Detects user language
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    resources: {
      en: { translation: enTranslations },
      pt: { translation: ptTranslations },
    },
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // React already escapes
    },
  });

export default i18n;
```

### Translation Files Structure

**File**: `app-frontend/src/i18n/locales/en.json`

```json
{
  "common": {
    "loading": "Loading...",
    "save": "Save",
    "cancel": "Cancel",
    "delete": "Delete",
    "edit": "Edit"
  },
  "navigation": {
    "dashboard": "Dashboard",
    "reports": "Reports",
    "recordings": "Recordings",
    "tenant": "Organization Settings"
  },
  "reports": {
    "title": "Reports",
    "create_new": "Create New Report",
    "template": {
      "subtitle": "Assessment Report",
      "report_date": "Report Date",
      "patient_information": "Patient Information",
      "name": "Name",
      "contact": "Contact",
      "clinical_analysis": "Clinical Analysis"
    }
  }
}
```

**File**: `app-frontend/src/i18n/locales/pt.json`

```json
{
  "common": {
    "loading": "Carregando...",
    "save": "Guardar",
    "cancel": "Cancelar",
    "delete": "Eliminar",
    "edit": "Editar"
  },
  "navigation": {
    "dashboard": "Painel",
    "reports": "Relatórios",
    "recordings": "Gravações",
    "tenant": "Configurações da Organização"
  },
  "reports": {
    "title": "Relatórios",
    "create_new": "Criar Novo Relatório",
    "template": {
      "subtitle": "Relatório de Avaliação",
      "report_date": "Data do Relatório",
      "patient_information": "Informações do Paciente",
      "name": "Nome",
      "contact": "Contacto",
      "clinical_analysis": "Análise Clínica"
    }
  }
}
```

### Using Translations in Components

```tsx
import { useTranslation } from "react-i18next";

export function MyComponent() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("reports.title")}</h1>
      <p>{t("reports.template.subtitle")}</p>
      <button>{t("common.save")}</button>
    </div>
  );
}
```

### Changing Language Programmatically

```tsx
import { useTranslation } from "react-i18next";

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <select
      onChange={(e) => changeLanguage(e.target.value)}
      value={i18n.language}
    >
      <option value="en">English</option>
      <option value="pt">Português</option>
    </select>
  );
}
```

## Backend Translations (Rails I18n)

### Setup

**File**: `app-backend/config/application.rb`

```ruby
config.i18n.available_locales = [:en, :pt, :es, :fr, :de]
config.i18n.default_locale = :en
config.i18n.fallbacks = true
```

### Locale Files

**File**: `app-backend/config/locales/en.yml`

```yaml
en:
  reports:
    template:
      subtitle: "Assessment Report"
      report_date: "Report Date"
      patient_information: "Patient Information"
      name: "Name"
      contact: "Contact"
      clinical_analysis: "Clinical Analysis"
    types:
      fluency_analysis: "Fluency Analysis"
      speech_patterns: "Speech Patterns"
      comprehensive: "Comprehensive"
    statuses:
      draft: "DRAFT"
      ready: "READY"
```

**File**: `app-backend/config/locales/pt.yml`

```yaml
pt:
  reports:
    template:
      subtitle: "Relatório de Avaliação"
      report_date: "Data do Relatório"
      patient_information: "Informações do Paciente"
      name: "Nome"
      contact: "Contacto"
      clinical_analysis: "Análise Clínica"
    types:
      fluency_analysis: "Análise de Fluência"
      speech_patterns: "Padrões de Fala"
      comprehensive: "Abrangente"
    statuses:
      draft: "RASCUNHO"
      ready: "PRONTO"
```

### Using Translations in Controllers

```ruby
class Api::V1::ReportsController < ApplicationController
  def show
    # Set locale based on tenant or user preference
    I18n.locale = @tenant.language || :en

    # Use translations
    report_subtitle = I18n.t('reports.template.subtitle')
    # => "Assessment Report" (en) or "Relatório de Avaliação" (pt)
  end
end
```

### Using Translations in Views (ERB)

```erb
<!-- app/views/reports/pdf.html.erb -->
<h2><%= t('reports.template.subtitle') %></h2>

<section>
  <h3><%= t('reports.template.patient_information') %></h3>
  <p><strong><%= t('reports.template.name') %>:</strong> <%= @patient.name %></p>
</section>
```

## Tenant-Based Language Selection

Each tenant can set a default language for their reports:

### Database Schema

```ruby
# tenants table
language: string  # ISO code: en, pt, es, fr, de
```

### Setting Locale in Reports

**Backend** (`app-backend/app/controllers/api/v1/reports_controller.rb`):

```ruby
def export_pdf
  @report = current_tenant.reports.find(params[:id])

  # Set locale based on tenant language preference
  I18n.with_locale(@report.tenant.language || :en) do
    # Generate PDF content with correct translations
    render_pdf
  end
end
```

**Frontend** (`BaseReportTemplate.tsx`):

```tsx
export function BaseReportTemplate({ report }: Props) {
  const { i18n } = useTranslation();

  // Use tenant's language preference
  React.useEffect(() => {
    if (report.tenant?.language) {
      i18n.changeLanguage(report.tenant.language);
    }
  }, [report.tenant?.language, i18n]);

  // ...
}
```

## Adding a New Language

### Step 1: Add Frontend Translations

Create new locale file:

**File**: `app-frontend/src/i18n/locales/es.json`

```json
{
  "common": {
    "loading": "Cargando...",
    "save": "Guardar",
    "cancel": "Cancelar"
  },
  "reports": {
    "title": "Informes",
    "template": {
      "subtitle": "Informe de Evaluación"
    }
  }
}
```

Import in config:

```tsx
// src/i18n/config.ts
import esTranslations from "./locales/es.json";

i18n.init({
  resources: {
    en: { translation: enTranslations },
    pt: { translation: ptTranslations },
    es: { translation: esTranslations }, // NEW
  },
  // ...
});
```

### Step 2: Add Backend Translations

**File**: `app-backend/config/locales/es.yml`

```yaml
es:
  reports:
    template:
      subtitle: "Informe de Evaluación"
      report_date: "Fecha del Informe"
      patient_information: "Información del Paciente"
    types:
      fluency_analysis: "Análisis de Fluidez"
```

### Step 3: Update Validation

```ruby
# app/models/tenant.rb
validates :language,
  inclusion: { in: %w[en pt es fr de] },  # Add 'es'
  allow_blank: true
```

### Step 4: Update UI Dropdowns

```tsx
// src/pages/TenantSettingsPage.tsx
<select value={formData.language} onChange={...}>
  <option value="en">English</option>
  <option value="pt">Português</option>
  <option value="es">Español</option>  {/* NEW */}
  <option value="fr">Français</option>
  <option value="de">Deutsch</option>
</select>
```

## Translation Key Organization

### Naming Convention

Use **dot notation** to organize translations hierarchically:

```
domain.section.key
```

Examples:

- `common.loading` - Common UI elements
- `reports.title` - Reports section title
- `reports.template.subtitle` - Report template subtitle
- `navigation.dashboard` - Navigation menu item
- `errors.not_found` - Error messages

### Best Practices

1. **Keep keys consistent** between `en.json` and `pt.json` (same structure)
2. **Use descriptive keys**: `reports.export_pdf` not `reports.button1`
3. **Group related translations**: All report-related keys under `reports.*`
4. **Avoid hardcoding text**: Always use `t('key')` instead of plain strings
5. **Provide context in keys**: `users.delete_confirm` not just `confirm`

### Example Structure

```json
{
  "common": {
    "actions": {
      "save": "Save",
      "cancel": "Cancel",
      "delete": "Delete"
    },
    "states": {
      "loading": "Loading...",
      "error": "Error",
      "success": "Success"
    }
  },
  "domain": {
    "section": {
      "key": "Translation value"
    }
  }
}
```

## Interpolation & Variables

### Frontend (i18next)

```json
{
  "welcome": "Welcome, {{name}}!",
  "items_count": "You have {{count}} items"
}
```

```tsx
t("welcome", { name: user.firstName });
// => "Welcome, John!"

t("items_count", { count: 5 });
// => "You have 5 items"
```

### Backend (Rails I18n)

```yaml
en:
  welcome: "Welcome, %{name}!"
  items_count: "You have %{count} items"
```

```ruby
I18n.t('welcome', name: user.first_name)
# => "Welcome, John!"

I18n.t('items_count', count: 5)
# => "You have 5 items"
```

## Pluralization

### Frontend

```json
{
  "reports_count": {
    "zero": "No reports",
    "one": "{{count}} report",
    "other": "{{count}} reports"
  }
}
```

```tsx
t("reports_count", { count: 0 }); // => "No reports"
t("reports_count", { count: 1 }); // => "1 report"
t("reports_count", { count: 5 }); // => "5 reports"
```

### Backend

```yaml
en:
  reports_count:
    zero: "No reports"
    one: "%{count} report"
    other: "%{count} reports"
```

```ruby
I18n.t('reports_count', count: 5)  # => "5 reports"
```

## Current Translation Status

| Language   | Frontend | Backend | Status   |
| ---------- | -------- | ------- | -------- |
| English    | ✅       | ✅      | Complete |
| Portuguese | ✅       | ✅      | Complete |
| Spanish    | ❌       | ❌      | Planned  |
| French     | ❌       | ❌      | Planned  |
| German     | ❌       | ❌      | Planned  |

## Key Files Reference

### Frontend

| File                       | Purpose                                |
| -------------------------- | -------------------------------------- |
| `src/i18n/config.ts`       | i18next configuration & initialization |
| `src/i18n/locales/en.json` | English translations                   |
| `src/i18n/locales/pt.json` | Portuguese translations                |
| `src/types/i18next.d.ts`   | TypeScript type definitions (optional) |

### Backend

| File                    | Purpose                  |
| ----------------------- | ------------------------ |
| `config/application.rb` | Rails I18n configuration |
| `config/locales/en.yml` | English translations     |
| `config/locales/pt.yml` | Portuguese translations  |

## Troubleshooting

### Translation key not found

**Problem**: Console shows "Missing translation: en.some.key"

**Solutions**:

1. Check key exists in `en.json` or `en.yml`
2. Verify exact key path (case-sensitive)
3. Restart dev server after adding new translations
4. Check JSON syntax is valid (no trailing commas)

### Translations not updating

**Problem**: Changed translations don't appear

**Solutions**:

1. **Frontend**: Hard refresh browser (Cmd+Shift+R)
2. **Frontend**: Clear browser cache
3. **Backend**: Restart Rails server
4. Check file saved properly

### Wrong language displaying

**Problem**: Shows English instead of Portuguese

**Solutions**:

1. Check tenant.language is set correctly
2. Verify `I18n.locale` or `i18n.changeLanguage()` is called
3. Check browser language detection settings
4. Use React DevTools to inspect i18n state

---

**For translation-related questions**, check:

- This document
- [i18next documentation](https://www.i18next.com/)
- [Rails I18n guide](https://guides.rubyonrails.org/i18n.html)
- `REPORT_TEMPLATES.md` for template-specific translations
