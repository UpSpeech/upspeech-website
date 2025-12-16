# Cookie Policy

**Last Updated:** December 16, 2025

## Introduction

This Cookie Policy explains how UpSpeech uses cookies and similar technologies to recognize you when you visit our platform. It explains what these technologies are, why we use them, and your rights to control our use of them.

## What Are Cookies and Similar Technologies?

### Cookies

Cookies are small text files that are placed on your device (computer, smartphone, tablet) when you visit a website. They are widely used to make websites work efficiently and provide information to website owners.

### Local Storage

Local Storage is a web storage mechanism that allows websites to store data directly in your browser. Unlike cookies, Local Storage data does not expire automatically and is not sent to the server with every request.

### Session Storage

Session Storage is similar to Local Storage but is cleared when you close your browser tab. It's used for temporary data that only needs to persist during a single browsing session.

## How UpSpeech Uses Cookies and Storage

**UpSpeech uses minimal tracking technologies and does not use traditional cookies for advertising or tracking purposes.**

### What We Use

#### 1. Local Storage (Primary Method)

We primarily use **Local Storage** (not cookies) to store essential data in your browser:

| Data Item            | Purpose                                                      | Type       | Duration  |
| -------------------- | ------------------------------------------------------------ | ---------- | --------- |
| **auth_token**       | JWT authentication token for maintaining your login session  | Essential  | 24 hours  |
| **user_data**        | Cached copy of your user profile for faster page loads       | Functional | Session   |
| **language**         | Your selected interface language (English, Portuguese, etc.) | Functional | Permanent |
| **theme_preference** | Your color theme preference (light/dark mode)                | Functional | Permanent |
| **token_expiry**     | Expiration timestamp of your authentication token            | Essential  | 24 hours  |

#### 2. Session Storage (Temporary)

We may use **Session Storage** for temporary data such as:

- Form data preservation (to prevent data loss if you navigate away)
- Temporary UI state (e.g., collapsed sidebars, active tabs)
- Short-lived feature flags or A/B testing assignments

Session Storage data is automatically cleared when you close your browser tab.

### What We Do NOT Use

- ❌ **Third-party advertising cookies** - We do not serve ads or use advertising networks
- ❌ **Third-party tracking cookies** - We do not use analytics services like Google Analytics
- ❌ **Social media cookies** - We do not embed social media widgets that track you
- ❌ **Cross-site tracking** - We do not track you across other websites

## Types of Technologies We Use

### 1. Essential Technologies

These are strictly necessary for the platform to function and cannot be disabled:

**Authentication Token (Local Storage)**

- **Purpose:** Maintains your login session and authenticates API requests
- **Duration:** 24 hours (automatically expires)
- **Data Stored:** JWT token containing your user ID and tenant ID
- **Why Essential:** Without this, you cannot use authenticated features of the platform

### 2. Functional Technologies

These enhance functionality and user experience but are not strictly essential:

**User Data Cache (Local Storage)**

- **Purpose:** Stores your profile information locally to reduce server requests
- **Duration:** Until manually cleared or you log out
- **Data Stored:** Name, email, role, preferences
- **Why Useful:** Improves page load times and reduces bandwidth usage

**Language Preference (Local Storage)**

- **Purpose:** Remembers your selected interface language
- **Duration:** Permanent (until manually cleared)
- **Data Stored:** Language code (e.g., "en", "pt", "es")
- **Why Useful:** Prevents having to re-select your language on each visit

**Theme Preference (Local Storage)**

- **Purpose:** Remembers whether you prefer light or dark mode
- **Duration:** Permanent (until manually cleared)
- **Data Stored:** Theme name ("light" or "dark")
- **Why Useful:** Maintains consistent visual experience across sessions

### 3. Analytical Technologies

**Current Status:** We do not currently use analytical cookies or tracking technologies.

**Future Use:** We may introduce privacy-friendly analytics in the future (such as server-side analytics or self-hosted solutions) to understand platform usage and improve user experience. If we do, we will update this policy and notify you.

## Third-Party Technologies

UpSpeech integrates with third-party services that may use their own cookies or storage mechanisms when you interact with them:

### Google Cloud Storage

When you upload or download audio/video files, Google Cloud Storage may use cookies for:

- Authentication of signed URL requests
- Security and fraud prevention

See Google's cookie policy: [https://policies.google.com/technologies/cookies](https://policies.google.com/technologies/cookies)

### Groq API

We send audio files to Groq API for transcription and report generation. Groq may use cookies or similar technologies on their infrastructure, though these do not track you through UpSpeech.

See Groq's privacy policy: [https://groq.com/privacy-policy/](https://groq.com/privacy-policy/)

**Note:** UpSpeech does not control third-party cookies. Please review third-party privacy policies for details on their practices.

## Your Rights and Choices

### Viewing and Managing Local Storage

You can view, manage, and delete Local Storage data through your browser's developer tools:

**Google Chrome:**

1. Press F12 or right-click → Inspect
2. Go to "Application" tab
3. Expand "Local Storage" in the left sidebar
4. Select the UpSpeech domain
5. View or delete individual items or clear all

**Mozilla Firefox:**

1. Press F12 or right-click → Inspect Element
2. Go to "Storage" tab
3. Expand "Local Storage"
4. Select the UpSpeech domain
5. View or delete items

**Safari:**

1. Enable developer menu: Preferences → Advanced → "Show Develop menu"
2. Develop → Show Web Inspector
3. Go to "Storage" tab
4. Select "Local Storage"

**Microsoft Edge:**

1. Press F12
2. Go to "Application" tab (same as Chrome)
3. Manage Local Storage

### Clearing All Data

**Logout:** When you log out of UpSpeech, we automatically delete the authentication token from Local Storage.

**Manual Clearing:** You can manually clear all Local Storage for UpSpeech through your browser settings:

- Chrome: Settings → Privacy and security → Clear browsing data → Cookies and site data
- Firefox: Settings → Privacy & Security → Cookies and Site Data → Clear Data
- Safari: Preferences → Privacy → Manage Website Data → Remove All
- Edge: Settings → Privacy → Clear browsing data

**Note:** Clearing Local Storage will log you out and reset your preferences.

### Browser Settings

Most browsers allow you to:

- Block all Local Storage (may prevent platform functionality)
- Clear Local Storage on browser close
- Manage storage on a per-site basis

Consult your browser's help documentation for specific instructions.

### Do Not Track (DNT)

UpSpeech respects "Do Not Track" (DNT) browser signals. However, since we do not track you across websites or use third-party trackers, DNT settings do not significantly change our behavior.

## Impact of Blocking or Deleting Storage

### Essential Storage (Authentication Token)

If you block or delete the authentication token:

- ❌ You will be logged out immediately
- ❌ You cannot access protected features of the platform
- ❌ The platform will not function properly

**Recommendation:** Do not block essential Local Storage if you want to use UpSpeech.

### Functional Storage (Preferences)

If you delete functional Local Storage:

- ⚠️ Your language preference will reset to default (English)
- ⚠️ Your theme preference will reset to default (light mode)
- ⚠️ You will need to re-select your preferences on each visit

**Recommendation:** Keep functional storage enabled for a better user experience.

## Children's Privacy

UpSpeech is not directed to children under 13, and we do not knowingly collect data from children through cookies or Local Storage.

If a child's recordings are uploaded by a parent or therapist, the adult user is responsible for obtaining appropriate consent and managing the child's data.

## Changes to This Cookie Policy

We may update this Cookie Policy from time to time to reflect changes in our practices or for legal, regulatory, or operational reasons.

When we make material changes, we will:

- Update the "Last Updated" date at the top of this policy
- Notify you via email or a prominent notice in the platform (for significant changes)
- Provide you an opportunity to review the changes before they take effect

Your continued use of UpSpeech after changes take effect constitutes your acceptance of the updated Cookie Policy.

## Contact Us

If you have questions about this Cookie Policy or how we use storage technologies, please contact us:

**Email:** upspeechapp@gmail.com
**LinkedIn:** [https://www.linkedin.com/company/upspeech/](https://www.linkedin.com/company/upspeech/)
**Support:** Use the support link in the platform footer

---

**Summary:**

UpSpeech uses Local Storage (not cookies) to maintain your login session and remember your preferences. We do not use third-party tracking, advertising cookies, or cross-site tracking technologies. You can manage Local Storage through your browser settings, but blocking essential storage will prevent the platform from working properly.

For more information about how we handle your personal data, see our [Privacy Policy](/privacy).
