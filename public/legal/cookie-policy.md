# Cookie Policy

**Last Updated:** April 8, 2026

## Introduction

This Cookie Policy explains how UpSpeech uses cookies and similar technologies when you visit our platforms. It explains what these technologies are, why we use them, and your rights to control our use of them.

## What Are Cookies and Similar Technologies?

### Cookies

Cookies are small text files that are placed on your device (computer, smartphone, tablet) when you visit a website. They are widely used to make websites work efficiently and provide information to website owners.

### Local Storage

Local Storage is a web storage mechanism that allows websites to store data directly in your browser. Unlike cookies, Local Storage data does not expire automatically and is not sent to the server with every request.

### Session Storage

Session Storage is similar to Local Storage but is cleared when you close your browser tab. It's used for temporary data that only needs to persist during a single browsing session.

## How UpSpeech Uses Cookies

UpSpeech uses different technologies on our **marketing website** and our **application platform**:

### Marketing Website (upspeech.app)

Our public-facing marketing website uses cookies and similar technologies to understand how visitors interact with our site and to improve your experience.

#### Analytics and Performance Cookies

**Google Analytics 4**

We use Google Analytics to understand how visitors use our website, which pages are most popular, and how users navigate our site.

| Cookie Name  | Purpose                                      | Duration | Type      |
| ------------ | -------------------------------------------- | -------- | --------- |
| **\_ga**     | Distinguishes unique users                   | 2 years  | Analytics |
| **\_ga\_\*** | Maintains session state for Google Analytics | 2 years  | Analytics |
| **\_gid**    | Distinguishes unique users                   | 24 hours | Analytics |
| **\_gat**    | Throttles request rate to Google Analytics   | 1 minute | Analytics |

**Microsoft Clarity**

We use Microsoft Clarity to understand how users interact with our website through session recordings and heatmaps.

| Cookie Name | Purpose                                     | Duration   | Type      |
| ----------- | ------------------------------------------- | ---------- | --------- |
| **\_clck**  | Persists Clarity User ID across visits      | 1 year     | Analytics |
| **\_clsk**  | Connects multiple page views in one session | 1 day      | Analytics |
| **CLID**    | Identifies user across multiple domains     | 1 year     | Analytics |
| **SM**      | Synchronizes user ID across domains         | Session    | Analytics |
| **MR**      | Indicates if a data refresh is needed       | 7 days     | Analytics |
| **MUID**    | Microsoft User Identifier                   | 1 year     | Analytics |
| **ANONCHK** | Indicates whether MUID cookie is used       | 10 minutes | Analytics |

**PostHog**

We use PostHog for product analytics to understand how users interact with our platform, including page views, feature usage, and user journeys. PostHog data is hosted in the European Union.

| Cookie/Storage Item | Purpose                                    | Duration  | Type      |
| ------------------- | ------------------------------------------ | --------- | --------- |
| **ph_\***           | Stores anonymous user and session identity | 1 year    | Analytics |

**Consent Management**

| Storage Item                | Purpose                            | Type      | Duration  |
| --------------------------- | ---------------------------------- | --------- | --------- |
| **upspeech_cookie_consent** | Stores your cookie consent choices | Essential | Permanent |

This is stored in Local Storage (not a cookie) and remembers whether you've accepted or declined analytics cookies.

#### How We Use Analytics Data

We use analytics data to:

- Understand which pages are most visited and useful
- Identify technical issues and improve site performance
- Optimize user journeys and improve the overall experience
- Understand where our visitors come from (e.g., search engines, social media)

**We do NOT:**

- Sell or share your data with third parties for advertising
- Use analytics data to identify individual users
- Track you across other websites outside of UpSpeech

### Application Platform (\*.upspeech.app)

Our application platform (accessed via tenant subdomains like `speechcare.upspeech.app`) uses Local Storage for essential functionality and analytics cookies for improving your experience:

#### Essential Local Storage

| Data Item        | Purpose                                                     | Duration |
| ---------------- | ----------------------------------------------------------- | -------- |
| **auth_token**   | JWT authentication token for maintaining your login session | 24 hours |
| **user_data**    | Cached copy of your user profile for faster page loads      | Session  |
| **token_expiry** | Expiration timestamp of your authentication token           | 24 hours |

#### Functional Local Storage

| Data Item            | Purpose                                                      | Duration  |
| -------------------- | ------------------------------------------------------------ | --------- |
| **language**         | Your selected interface language (English, Portuguese, etc.) | Permanent |
| **theme_preference** | Your color theme preference (light/dark mode)                | Permanent |

#### Session Storage (Temporary)

We may use Session Storage for temporary data such as:

- Form data preservation (to prevent data loss if you navigate away)
- Temporary UI state (e.g., collapsed sidebars, active tabs)
- Short-lived feature flags for A/B testing

Session Storage data is automatically cleared when you close your browser tab.

#### Analytics Cookies (Consent Required)

The application platform uses the same analytics services as our marketing website to help us improve the user experience.

**Google Analytics 4**

| Cookie Name  | Purpose                                      | Duration | Type      |
| ------------ | -------------------------------------------- | -------- | --------- |
| **\_ga**     | Distinguishes unique users                   | 2 years  | Analytics |
| **\_ga\_\*** | Maintains session state for Google Analytics | 2 years  | Analytics |
| **\_gid**    | Distinguishes unique users                   | 24 hours | Analytics |

**Microsoft Clarity**

| Cookie Name | Purpose                                     | Duration | Type      |
| ----------- | ------------------------------------------- | -------- | --------- |
| **\_clck**  | Persists Clarity User ID across visits      | 1 year   | Analytics |
| **\_clsk**  | Connects multiple page views in one session | 1 day    | Analytics |
| **CLID**    | Identifies user across multiple domains     | 1 year   | Analytics |
| **MUID**    | Microsoft User Identifier                   | 1 year   | Analytics |

**PostHog**

| Cookie/Storage Item | Purpose                                    | Duration  | Type      |
| ------------------- | ------------------------------------------ | --------- | --------- |
| **ph_\***           | Stores anonymous user and session identity | 1 year    | Analytics |

**Consent Management**

| Storage Item                | Purpose                            | Type      | Duration  |
| --------------------------- | ---------------------------------- | --------- | --------- |
| **upspeech_cookie_consent** | Stores your cookie consent choices | Essential | Permanent |

When you first use the application, you'll see a consent banner allowing you to accept or decline analytics cookies. Your choice is stored in Local Storage and respected for all future visits to that subdomain.

**Note:** Each tenant subdomain (e.g., `speechcare.upspeech.app`, `demo.upspeech.app`) maintains its own consent preferences separately

## Cookie Consent and Your Choices

### Marketing Website

When you first visit our marketing website, you'll see a consent banner that allows you to:

- **Accept All** - Allow all analytics cookies
- **Decline** - Block all non-essential cookies

You can change your consent preferences at any time by:

1. Clearing your browser's cookies and Local Storage
2. Revisiting the website (the consent banner will reappear)
3. Making a new selection

We use **Google Consent Mode v2** and PostHog's consent API, which means:

- If you decline cookies, Google Analytics, Microsoft Clarity, and PostHog will not collect data
- Your choice is respected and stored locally
- Analytics scripts will not track you if you've declined

### Application Platform

For the application platform:

- **Essential storage (authentication) cannot be disabled** - Without it, you cannot log in or use the platform
- **Functional storage (preferences) can be cleared** - But you'll need to re-select your preferences on each visit

## Managing Cookies and Storage

### Browser-Level Controls

All modern browsers allow you to control cookies through their settings:

**Google Chrome:**

1. Settings → Privacy and security → Cookies and other site data
2. Choose to block third-party cookies or all cookies
3. View and delete cookies for specific sites

**Mozilla Firefox:**

1. Settings → Privacy & Security
2. Choose Enhanced Tracking Protection level
3. Manage cookie exceptions under "Cookies and Site Data"

**Safari:**

1. Preferences → Privacy
2. Choose "Prevent cross-site tracking"
3. Manage website data

**Microsoft Edge:**

1. Settings → Cookies and site permissions
2. Manage and delete cookies

### Viewing and Deleting Local Storage

You can view and delete Local Storage through browser developer tools:

**In Chrome/Edge:**

1. Press F12 or right-click → Inspect
2. Go to "Application" tab → "Local Storage"
3. Select the UpSpeech domain
4. Delete individual items or clear all

**In Firefox:**

1. Press F12 → "Storage" tab → "Local Storage"

**In Safari:**

1. Develop → Show Web Inspector → "Storage" tab

### Clearing All Data

**For Marketing Website:**

- Clear your browser's cookies for upspeech.app
- Clear Local Storage to reset your consent preferences

**For Application Platform:**

- Log out (we automatically delete the auth token)
- Or manually clear Local Storage (will log you out)

**Note:** Clearing essential storage will log you out of the application platform.

## Impact of Blocking Cookies

### Marketing Website

If you decline or block analytics cookies:

- ✅ The website will function normally
- ✅ Your privacy is protected
- ⚠️ We cannot improve the site based on usage patterns
- ⚠️ We cannot identify and fix technical issues as easily

### Application Platform

If you block essential Local Storage:

- ❌ You will be logged out immediately
- ❌ You cannot access authenticated features
- ❌ The platform will not function properly

If you clear functional Local Storage:

- ⚠️ Your language and theme preferences will reset
- ⚠️ You'll need to re-select preferences on each visit

## Third-Party Cookies and Services

### Google Analytics

Google Analytics is a web analytics service provided by Google LLC. Google uses cookies to analyze how users interact with websites.

- Privacy Policy: [https://policies.google.com/privacy](https://policies.google.com/privacy)
- Opt-out: [https://tools.google.com/dlpage/gaoptout](https://tools.google.com/dlpage/gaoptout)

### Microsoft Clarity

Microsoft Clarity provides session recording and heatmap analytics to help us improve user experience.

- Privacy Policy: [https://privacy.microsoft.com/privacystatement](https://privacy.microsoft.com/privacystatement)
- Learn more: [https://clarity.microsoft.com/](https://clarity.microsoft.com/)

### PostHog

PostHog provides product analytics to help us understand how users interact with our platform. PostHog data is processed and stored in the European Union.

- Privacy Policy: [https://posthog.com/privacy](https://posthog.com/privacy)
- Data Processing: EU-hosted (Frankfurt)

### Sentry

Sentry provides error tracking and performance monitoring to help us identify and fix bugs. When an error occurs, Sentry collects technical information (error message, stack trace, browser/device info) but does not use cookies. Sentry does not require cookie consent.

- Privacy Policy: [https://sentry.io/privacy/](https://sentry.io/privacy/)

### Google Cloud Storage

When you upload or download audio/video files, Google Cloud Storage may use cookies for:

- Authentication of signed URL requests
- Security and fraud prevention

See Google's cookie policy: [https://policies.google.com/technologies/cookies](https://policies.google.com/technologies/cookies)

### ElevenLabs

We send audio files to ElevenLabs for speech-to-text transcription. ElevenLabs may use cookies on their infrastructure for security purposes.

See ElevenLabs' privacy policy: [https://elevenlabs.io/privacy](https://elevenlabs.io/privacy)

### Google AI (Gemini)

We use Google Gemini language models for clinical report generation. Google may use cookies on their infrastructure for security purposes.

See Google's privacy policy: [https://policies.google.com/privacy](https://policies.google.com/privacy)

## Do Not Track (DNT)

UpSpeech respects "Do Not Track" (DNT) browser signals:

- On our **marketing website**, we honor DNT by treating it as a declined consent
- On our **application platform**, DNT is respected, but essential authentication storage is still required for the platform to function

## Children's Privacy

UpSpeech is not directed to children under 13, and we do not knowingly collect data from children under 13 through cookies or Local Storage.

Users aged 13 to 17 may use the platform only with the consent and supervision of a parent, legal guardian, or licensed speech-language pathologist. The supervising adult is responsible for obtaining appropriate consent and managing the minor's data.

## International Users

UpSpeech is based in Portugal and hosted on European Union servers. If you access our platform from outside the EU, please be aware that:

- Cookies and Local Storage data are stored on your device (not transferred to our servers)
- Analytics data collected by Google Analytics and Microsoft Clarity may be transferred to and processed in countries where these providers operate
- PostHog analytics data is processed and stored in the European Union (Frankfurt)
- Google and Microsoft are compliant with relevant data protection frameworks

For users in the EU/EEA:

- We use Google Consent Mode v2 to respect GDPR requirements
- Analytics cookies require your explicit consent
- You have the right to withdraw consent at any time

## Your Data Rights (GDPR)

As an EU-based service, we comply with the General Data Protection Regulation (GDPR). You have the right to:

- Access what data we collect about you
- Correct inaccurate data
- Delete your data (right to erasure)
- Restrict processing
- Data portability
- Object to processing
- Withdraw consent at any time

To exercise these rights, contact us at help@upspeech.app

## Changes to This Cookie Policy

We may update this Cookie Policy from time to time to reflect:

- Changes in our use of cookies
- Changes in cookie technologies
- Legal, regulatory, or operational requirements

When we make changes, we will:

- Update the "Last Updated" date at the top
- Notify you via email or a prominent notice (for significant changes)
- Give you an opportunity to review changes

Your continued use of UpSpeech after changes take effect constitutes acceptance of the updated policy.

## Contact Us

If you have questions about this Cookie Policy or how we use cookies and similar technologies, please contact us:

**Email:** hello@upspeech.app
**LinkedIn:** [https://www.linkedin.com/company/upspeech/](https://www.linkedin.com/company/upspeech/)
**Support:** Use the support link in the platform footer

---

## Summary

**Marketing Website (upspeech.app):**

- Uses Google Analytics, Microsoft Clarity, and PostHog cookies for site analytics
- Requires your consent (via banner) before setting analytics cookies
- You can accept or decline at any time

**Application Platform (\*.upspeech.app):**

- Uses Local Storage for authentication and preferences (essential)
- Uses Google Analytics, Microsoft Clarity, and PostHog for analytics (consent required)
- Uses Sentry for error tracking (no cookies, no consent required)
- Each tenant subdomain maintains separate consent preferences
- Essential storage is required for the platform to work

**Your Control:**

- Manage cookie consent via the banner on each site/subdomain
- Control cookies and storage through browser settings
- Contact us to exercise your data rights

For more information about how we handle your personal data, see our [Privacy Policy](/privacy).
