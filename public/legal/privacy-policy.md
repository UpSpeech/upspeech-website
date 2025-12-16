# Privacy Policy

**Last Updated:** December 16, 2025

## Introduction

Welcome to UpSpeech ("we," "our," or "us"). We are committed to protecting your privacy and handling your personal information with care and transparency. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our speech therapy platform.

UpSpeech is a multi-tenant software-as-a-service (SaaS) platform designed for speech-language pathologists (SLPs) and their patients, focusing on stuttering therapy and clinical report automation.

By using UpSpeech, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, please do not use our platform.

## Information We Collect

### 1. Account Information

When you create an account, we collect:

- **Email address** - Used for authentication and account communications
- **Password** - Securely hashed using Argon2id encryption (we never store passwords in plain text)
- **Full name** (first and last name) - Used for identification and report generation
- **User role** - Determines your access level (owner, admin, therapist, client/patient, member)
- **Language preference** - For localized interface display (English, Portuguese, Spanish)
- **Organization affiliation** - The tenant/organization you belong to

### 2. Audio and Video Recordings

UpSpeech allows users to upload speech recordings for analysis:

- **Audio/video files** - Recordings of speech sessions, which may contain voice data and other identifiable information
- **Recording metadata** - Original filename, file type, file size, duration, upload timestamp
- **Recording type** - Whether the recording is audio-only or video-and-audio
- **Report type** - Classification as assessment or session recording
- **Consent acknowledgment** - Confirmation that you have obtained necessary consent before uploading recordings
- **File hash** - A cryptographic hash used to detect duplicate uploads within your organization

**Important:** Audio and video recordings may contain sensitive health information. We store these files securely in Google Cloud Storage with encryption at rest and in transit.

### 3. Transcriptions and AI-Generated Content

We use third-party artificial intelligence services (Groq API) to process your audio recordings:

- **Transcriptions** - Text transcripts generated from your audio recordings using AI speech recognition (Whisper)
- **AI-generated reports** - Clinical reports automatically generated using large language models (GPT)
- **Disfluency annotations** - Automated detection and classification of speech disfluencies (repetitions, prolongations, blocks)
- **Speech analysis data** - Statistical analysis of speech patterns and stuttering severity

### 4. Clinical Reports and Notes

Therapists create and manage clinical documentation:

- **Report content** - Clinical observations, assessments, treatment recommendations (HTML formatted, sanitized for security)
- **Report metadata** - Title, status (draft/ready), report type (assessment, session, insurance report), creation date
- **Report notes** - Additional clinical notes and observations
- **Exercise selections** - Consultation exercises associated with reports

### 5. Therapist-Patient Relationships

We track professional relationships within the platform:

- **Therapist assignments** - Formal linkages between therapists and their patients
- **Assignment status** - Whether the relationship is active or inactive
- **Invite codes** - Codes used by therapists to invite patients to the platform
- **Exercise assignments** - Mini games and consultation exercises assigned by therapists to patients
- **Assignment status** - Completion status, difficulty ratings, patient recordings

### 6. Progress and Analytics Data

We track user progress and platform usage:

- **Exercise completion data** - Which exercises were completed, when, and associated recordings
- **Disfluency statistics** - Quantitative measurements of stuttering behaviors over time
- **Technique annotations** - Use of therapeutic techniques (voluntary stuttering, pull-outs, cancellations, etc.)
- **Progress metrics** - Statistical summaries of patient improvement
- **Platform usage** - Login times, feature usage, session duration

### 7. Feedback and Communications

Users can provide feedback within the platform:

- **Report feedback** - Comments and ratings on generated reports
- **General feedback** - Bug reports, feature requests, user experience feedback
- **Support communications** - Email correspondence with our support team
- **System notifications** - Activity related to your account and assigned patients

### 8. Technical and Usage Data

We automatically collect certain technical information:

- **Authentication tokens** - JWT tokens stored in your browser's localStorage for 24 hours
- **Browser information** - Browser type, version, and device type (for compatibility and troubleshooting)
- **IP address** - For security monitoring and geographic analytics
- **Access logs** - Timestamps and actions performed within the platform (for security auditing)

### 9. Organization/Tenant Data

For organizational accounts (therapist clinics, healthcare facilities):

- **Organization name and identifier**
- **Custom branding** - Logo, color scheme, website URL, contact information
- **Language and timezone preferences**
- **Feature flag settings** - Which platform features are enabled for your organization

## How We Use Your Information

We use the information we collect for the following purposes:

### 1. Provide and Improve Services

- **Account management** - Create and manage user accounts, authenticate users
- **Speech analysis** - Process audio recordings to generate transcriptions and clinical reports
- **Clinical workflows** - Enable therapists to create reports, assign exercises, and track patient progress
- **Patient engagement** - Allow patients to complete exercises, upload recordings, and view their progress
- **Platform functionality** - Deliver core features including multi-tenant isolation, role-based access control, and real-time updates

### 2. AI Processing and Report Generation

- **Transcription** - Send your audio recordings to Groq API for speech-to-text conversion
- **Report automation** - Generate clinical reports using AI language models based on transcription and your clinical context
- **Disfluency detection** - Automatically identify and classify stuttering behaviors in recordings
- **Clinical insights** - Provide statistical analysis and trends to support treatment planning

### 3. Communication

- **Service notifications** - Send important updates about your account, assignments, or platform changes
- **Therapist invitations** - Email invite codes to prospective patients on behalf of therapists
- **Support responses** - Respond to your questions, feedback, and support requests
- **Administrative communications** - Send account-related information, security alerts, or policy updates

### 4. Security and Compliance

- **Authentication and authorization** - Verify user identity and enforce role-based permissions
- **Fraud prevention** - Detect and prevent unauthorized access, abuse, or security threats
- **Multi-tenant isolation** - Ensure strict data separation between organizations
- **Audit logging** - Maintain records of access and modifications for security compliance
- **Data integrity** - Prevent duplicate uploads and ensure data consistency

### 5. Analytics and Improvement

- **Usage analytics** - Understand how users interact with the platform to improve user experience
- **Feature development** - Identify which features are most valuable and where to focus development efforts
- **Performance optimization** - Monitor system performance and identify bottlenecks
- **Quality assurance** - Test and improve AI transcription and report generation accuracy

## How We Share Your Information

We do not sell your personal information to third parties. We share your information only in the following limited circumstances:

### 1. Third-Party Service Providers

We use trusted third-party services to operate our platform:

- **Groq API** - Provides AI transcription (Whisper) and language models (GPT) for report generation. Audio recordings are sent to Groq for processing. See Groq's privacy policy at [https://groq.com/privacy-policy/](https://groq.com/privacy-policy/)
- **Google Cloud Platform** - Stores audio/video files and logos in Google Cloud Storage with encryption. See Google's privacy policy at [https://policies.google.com/privacy](https://policies.google.com/privacy)
- **Railway** - Hosts our application infrastructure. See Railway's privacy policy at [https://railway.app/legal/privacy](https://railway.app/legal/privacy)
- **Email service providers** - Deliver transactional emails (invitations, password resets, notifications)

These providers are contractually obligated to protect your information and use it only for the purposes we specify.

### 2. Within Your Organization

In our multi-tenant system:

- **Therapists** in your organization can view all reports and patient data within the organization (subject to their role permissions)
- **Admins** in your organization can manage users, view analytics, and access organization-wide data
- **Patients** can only view their own data and reports
- **Platform owners** (UpSpeech administrators) have cross-tenant access for system administration and support purposes only

### 3. Legal Requirements

We may disclose your information if required to do so by law or in response to:

- **Court orders or legal process** - Subpoenas, warrants, or other legal requests
- **Law enforcement requests** - Valid requests from government authorities
- **Legal protection** - To protect our rights, property, or safety, or that of our users or the public
- **Regulatory compliance** - To comply with applicable healthcare, data protection, or other regulatory requirements

### 4. Business Transfers

If UpSpeech is involved in a merger, acquisition, or sale of assets, your information may be transferred to the acquiring entity. We will notify you via email and/or prominent notice on our platform of any such change in ownership or control.

### 5. With Your Consent

We may share your information for other purposes with your explicit consent, such as:

- Sharing anonymized research data with academic institutions
- Participating in case studies or testimonials (with your prior approval)
- Integrating with third-party tools you authorize

## Data Storage and Security

### Where We Store Your Data

- **Database** - PostgreSQL database hosted on Railway (United States by default)
- **File storage** - Google Cloud Storage (configurable region, default: United States)
- **Application servers** - Railway infrastructure (United States by default)

### Security Measures

We implement industry-standard security practices:

- **Encryption in transit** - All data transmitted between your browser and our servers uses TLS/SSL encryption (HTTPS)
- **Encryption at rest** - Audio files and databases are encrypted when stored
- **Password security** - Passwords are hashed using Argon2id, a secure cryptographic algorithm
- **JWT authentication** - Stateless token-based authentication with 24-hour expiration
- **Role-based access control** - Strict enforcement of user permissions based on roles
- **Multi-tenant isolation** - Database-level row isolation ensures organizations cannot access each other's data
- **Input sanitization** - All user inputs are sanitized to prevent XSS, SQL injection, and other attacks
- **Rate limiting** - Protection against brute-force attacks on authentication endpoints
- **Security monitoring** - Ongoing monitoring for suspicious activity and unauthorized access
- **Regular updates** - Timely application of security patches and updates

### Data Retention

- **Active accounts** - We retain your data for as long as your account is active
- **Inactive accounts** - If your account is inactive for 2 years, we may delete your data after providing advance notice
- **Legal retention** - We may retain certain data longer if required by law or for legitimate business purposes (e.g., fraud prevention, legal disputes)
- **Deletion requests** - You may request deletion of your data at any time (see Your Rights section)
- **Backups** - Deleted data may persist in backups for up to 90 days before permanent removal

## Your Rights and Choices

Depending on your location, you may have the following rights regarding your personal information:

### 1. Access and Portability

- **Access** - Request a copy of the personal information we hold about you
- **Data portability** - Receive your data in a structured, machine-readable format (JSON)
- **Account dashboard** - View and download your reports, recordings, and exercise history directly in the platform

### 2. Correction and Update

- **Profile updates** - Update your name, email, password, and language preference in Account Settings
- **Data correction** - Request correction of inaccurate or incomplete information
- **Report editing** - Therapists can edit draft reports before finalizing

### 3. Deletion and Restriction

- **Account deletion** - Request deletion of your account and associated data
- **Recording deletion** - Delete individual audio/video recordings (also removes them from Google Cloud Storage)
- **Report deletion** - Delete specific reports (therapists only)
- **Processing restriction** - Request that we stop processing your data (with some exceptions for legal requirements)

### 4. Objection and Withdrawal

- **Object to processing** - Object to certain uses of your data (e.g., marketing communications, though we currently don't send marketing emails)
- **Withdraw consent** - Withdraw consent for processing where consent is the legal basis
- **Opt-out** - Unsubscribe from non-essential emails using the unsubscribe link

### 5. Complaint and Enforcement

- **Data protection authority** - Lodge a complaint with your local data protection authority if you believe we've violated your privacy rights
- **Contact us** - Reach out to us directly with privacy concerns at upspeechapp@gmail.com

**To exercise these rights**, email us at **upspeechapp@gmail.com** with your request. We will respond within 30 days.

## Children's Privacy

UpSpeech is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.

**Note for parents/guardians:** If a child's speech recordings are uploaded by a parent, guardian, or therapist, the adult user is responsible for obtaining any necessary consent and ensuring compliance with applicable laws (such as COPPA in the United States).

If we become aware that we have collected personal information from a child under 13 without proper parental consent, we will take steps to delete that information promptly.

## International Data Transfers

UpSpeech is based in the United States, and our servers and third-party service providers are primarily located in the United States. If you are accessing our platform from outside the United States, please be aware that your information may be transferred to, stored in, and processed in the United States and other countries.

These countries may have data protection laws that differ from those in your country of residence. By using UpSpeech, you consent to the transfer of your information to the United States and other countries as described in this Privacy Policy.

For users in the European Economic Area (EEA), United Kingdom, or Switzerland, we rely on appropriate legal mechanisms for international data transfers, such as Standard Contractual Clauses or adequacy decisions.

## California Privacy Rights (CCPA)

If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA):

- **Right to know** - What personal information we collect, use, disclose, and sell
- **Right to delete** - Request deletion of your personal information (with certain exceptions)
- **Right to opt-out** - We do not sell personal information, so no opt-out is necessary
- **Right to non-discrimination** - We will not discriminate against you for exercising your CCPA rights

To exercise these rights, contact us at **upspeechapp@gmail.com**.

## European Privacy Rights (GDPR)

If you are located in the European Economic Area (EEA), United Kingdom, or Switzerland, you have rights under the General Data Protection Regulation (GDPR):

### Legal Basis for Processing

We process your personal data based on the following legal grounds:

- **Contract** - Processing necessary to provide our services under our Terms of Service
- **Legitimate interests** - For fraud prevention, security, analytics, and service improvement
- **Consent** - For specific processing activities where we ask for your consent (e.g., uploading recordings)
- **Legal obligation** - To comply with applicable laws and regulations

### Your GDPR Rights

- **Right of access** - Obtain confirmation of processing and a copy of your data
- **Right to rectification** - Correct inaccurate or incomplete personal data
- **Right to erasure** ("right to be forgotten") - Request deletion of your personal data
- **Right to restriction** - Limit how we use your personal data
- **Right to data portability** - Receive your data in a portable format
- **Right to object** - Object to processing based on legitimate interests
- **Right to withdraw consent** - Withdraw consent where that is the legal basis
- **Right to lodge a complaint** - File a complaint with your local data protection authority

### Data Protection Officer

For GDPR-related inquiries, contact us at **upspeechapp@gmail.com**.

## Cookies and Tracking Technologies

UpSpeech uses minimal tracking technologies:

### Local Storage

We store the following in your browser's localStorage:

- **Authentication token** - JWT token for maintaining your login session (expires after 24 hours)
- **User profile data** - Cached copy of your user information for faster page loads
- **Language preference** - Your selected interface language

### No Third-Party Cookies

We do not use third-party cookies for advertising or tracking purposes. We do not participate in behavioral advertising networks.

### Browser Settings

You can clear localStorage at any time through your browser settings. Note that clearing localStorage will log you out of the platform.

For more details, see our [Cookie Policy](/cookies).

## Changes to This Privacy Policy

We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of any material changes by:

- **Email notification** - Sending an email to the address associated with your account
- **Platform notice** - Displaying a prominent notice within the platform
- **Last Updated date** - Updating the "Last Updated" date at the top of this policy

Your continued use of UpSpeech after the effective date of changes constitutes your acceptance of the updated Privacy Policy. If you do not agree to the changes, please discontinue use of the platform.

## Contact Us

If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:

**Email:** upspeechapp@gmail.com
**LinkedIn:** [https://www.linkedin.com/company/upspeech/](https://www.linkedin.com/company/upspeech/)
**Platform:** Use the "Support" link in the platform footer to submit a support request

We will respond to your inquiry within 30 days.

---

**Thank you for trusting UpSpeech with your data. We are committed to protecting your privacy and providing a secure, effective platform for speech therapy.**
