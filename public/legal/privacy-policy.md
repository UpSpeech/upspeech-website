# Privacy Policy

**Last Updated:** October 15, 2026

## Introduction

Welcome to UpSpeech ("we," "our," or "us"). UpSpeech is operated by UPSPEECH, SOCIEDADE UNIPESSOAL, LDA., based in Portugal. We are committed to protecting your privacy and handling your personal information with care and transparency. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our speech therapy platform.

UpSpeech is a multi-tenant software-as-a-service (SaaS) platform designed for speech-language pathologists (SLPs) and their patients across the speech-therapy spectrum, with stuttering as the first condition covered. It supports structured between-session practice, therapist feedback, and AI-assisted clinical report automation. UpSpeech is available as a web application and as mobile apps for iOS and Android.

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

**Important:** Audio and video recordings may contain sensitive health information. We store these files in cloud storage in the European Union, encrypted at rest and in transit.

### 3. Transcriptions and AI-Generated Content

We use third-party artificial intelligence services to process your audio recordings:

- **Transcriptions** - Text transcripts generated from your audio recordings using AI speech recognition
- **AI-generated reports** - Clinical report drafts generated using large language models
- **Disfluency annotations** - Automated detection and classification of speech disfluencies (repetitions, prolongations, blocks)
- **Speech analysis data** - Statistical analysis of speech patterns and stuttering severity
- **Real-time practice conversations** - In interactive practice scenarios ("realistic mode"), your live microphone audio is streamed in real time to AI voice services so you can hold a spoken conversation with an AI practice partner. The live audio is processed transiently to generate the AI's spoken responses; a transcript and summary of the conversation may be retained as part of your practice history

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

- **Authentication tokens** - JWT tokens stored in your browser's localStorage (web) or the device's secure storage (Keychain on iOS, Keystore on Android) on our mobile apps, to keep you signed in
- **Browser information** - Browser type, version, and device type (for compatibility and troubleshooting)
- **Mobile device information** - When you use our iOS or Android apps, we collect the app version, device model, and operating system version for compatibility and troubleshooting
- **Push notification tokens** - If you enable notifications in the mobile app, we store a device push token so we can deliver reminders and updates
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

- **Transcription** - Send your audio recordings to a speech-recognition provider for speech-to-text conversion
- **Real-time practice conversations** - Stream your live audio to AI voice and language services to power interactive spoken practice scenarios
- **Report automation** - Generate clinical report drafts using large language models, based on the transcription and your clinical context
- **Disfluency detection** - Automatically identify and classify stuttering behaviors in recordings
- **Clinical insights** - Provide statistical analysis and trends to support treatment planning
- **Optional model training (consent-based)** - With your explicit opt-in consent, anonymized voice recordings may be retained after you delete your account and used to train future versions of UpSpeech's speech-therapy AI models. This is optional, opt-in only, and you can change your mind at deletion time by selecting "Delete everything." Voice recordings are biometric data under GDPR Article 9; this processing only occurs with your specific, explicit consent

### 3. Communication

- **Service notifications** - Send important updates about your account, assignments, or platform changes
- **Therapist invitations** - Email invite codes to prospective patients on behalf of therapists
- **Push notifications** - If you use our mobile app and opt in, send reminders and updates about your practice, assignments, and account to your device
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

## How We Use AI

AI does five jobs in UpSpeech:

- **Transcription** - A speech-recognition provider turns your uploaded recordings, and the audio from practice scenarios, into text.
- **Report drafts** - A language model writes a first draft of a clinical report from the transcript and the context your therapist adds.
- **Practice conversations** - In realistic-mode scenarios, a voice provider turns your speech into text and the AI partner's reply into speech, and a language model writes the reply.
- **Chat assistants** - A language model answers questions in the in-app chats for patients and therapists, and in the help assistant.
- **Intake interview** - A language model asks the questions in the intake interview and summarises the answers for your therapist.

**Your therapist makes the clinical decisions.** A report written by AI is a first draft for your therapist, who can edit it. Disfluency counts and other automated analyses support your therapist's judgement and do not replace it. No decision about your therapy is made by AI alone.

**What we send.** Depending on the job: your recording or live audio, its transcript, the context your therapist writes for a report, and your chat messages. In practice scenarios and the intake interview we also send your name, so the AI can address you.

**Who receives it.** The AI providers on our [Subprocessors page](/subprocessors/). An AI tracing service keeps a record of each request and response so we can check the quality of the AI's output. If we move any of this processing to a different company, we will update that page and tell you before the change takes effect.

## How We Share Your Information

We do not sell your personal information to third parties. We share your information only in the following limited circumstances:

### 1. Third-Party Service Providers

We use other companies to run parts of UpSpeech. Each one processes data only on our instructions and under a contract with us. They fall into these groups:

- **Hosting and storage** - Our servers, database and file storage, all in the European Union
- **AI providers** - Speech recognition, speech generation and language models, which receive recordings, transcripts and chat messages as described in "How We Use AI"
- **AI tracing** - A record of each AI request and response, used to check quality and fix errors
- **Real-time media relay** - Carries the live audio of practice conversations when a direct connection is not possible
- **Email and push notifications** - Delivers transactional email, and notifications to your mobile device
- **Product analytics and error tracking** - How the platform is used, and reports of errors
- **Website hosting** - Our public website and its early-access form

The full list, with what each provider receives, where it processes data and the safeguard for any transfer outside the EU, is on our [Subprocessors page](/subprocessors/). We update that page before we add or replace a provider.

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

- **Database** - PostgreSQL database with our hosting provider, on servers in the European Union
- **File storage** - Cloud storage in the European Union
- **Application servers** - Our hosting provider, on servers in the European Union

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

## Your Rights

Under the General Data Protection Regulation (GDPR), you have the following rights regarding your personal information:

### 1. Access and Portability

- **Access** - Request a copy of the personal information we hold about you
- **Data portability** - Receive your data in a structured, machine-readable format (JSON)
- **Account dashboard** - View and download your reports, recordings, and exercise history directly in the platform

### 2. Correction and Update

- **Profile updates** - Update your name, email, password, and language preference in Account Settings
- **Data correction** - Request correction of inaccurate or incomplete information
- **Report editing** - Therapists can edit draft reports before finalizing

### 3. Deletion and Restriction

- **Account deletion** - Delete your account and associated data directly from the app (Settings → Account → Delete account), or by emailing us. Deletion is permanent and cannot be undone from inside the app
- **Optional recording retention** - If you granted ML training consent (at signup or by contacting us), you may choose at deletion time to keep your recordings in an anonymized form (your user ID, name, filenames, transcripts, and reviewer notes are removed; the audio is retained for model training). If you did not grant this consent, recordings are deleted along with your account
- **Recording deletion** - Delete individual audio/video recordings, which also deletes the stored file
- **Report deletion** - Delete specific reports (therapists only)
- **Processing restriction** - Request that we stop processing your data (with some exceptions for legal requirements)
- **Withdraw training consent** - You can withdraw consent at any time before deletion by emailing **help@upspeech.app**, or at deletion time by selecting "Delete everything." Once recordings have been anonymized for training, they can no longer be identified back to you and therefore cannot be removed on an individual basis. For broader concerns, contact us at **help@upspeech.app**

### 4. Objection and Withdrawal

- **Object to processing** - Object to certain uses of your data (e.g., marketing communications, though we currently don't send marketing emails)
- **Withdraw consent** - Withdraw consent for processing where consent is the legal basis
- **Opt-out** - Unsubscribe from non-essential emails using the unsubscribe link

### 5. Complaint

- **Supervisory authority** - Lodge a complaint with the Portuguese data protection authority (Comissão Nacional de Proteção de Dados, CNPD) or your local data protection authority
- **Contact us** - Reach out to us directly with privacy concerns at help@upspeech.app

**To exercise these rights**, email us at **help@upspeech.app** with your request. We will respond within 30 days.

## Children's Privacy

UpSpeech is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.

Users aged 13 to 17 may use the platform only with the consent and supervision of a parent, legal guardian, or licensed speech-language pathologist. The supervising adult is responsible for the minor's use of the platform, including obtaining any necessary consent before uploading speech recordings.

Users aged 18 and over are solely responsible for their own use of the platform and the content they upload.

If we become aware that we have collected personal information from a child under 13 without proper parental consent, we will take steps to delete that information promptly.

## International Data Transfers

UpSpeech is based in Portugal, within the European Union, and our servers, database and file storage are in the EU. Some providers process data outside the EU, including in the United States. Our [Subprocessors page](/subprocessors/) says where each one processes data.

When data is transferred outside the European Economic Area (EEA), the transfer relies on an adequacy decision of the European Commission, such as the EU-US Data Privacy Framework where the provider is certified under it, or on the Commission's Standard Contractual Clauses.

If you are accessing our platform from outside the EU, please be aware that your information is stored in the European Union, which has strong data protection standards under the General Data Protection Regulation (GDPR).

## Legal Basis for Processing (GDPR)

UpSpeech is based in Portugal and subject to the General Data Protection Regulation (GDPR). We process your personal data based on the following legal grounds:

- **Contract** - Processing necessary to provide our services under our Terms of Service
- **Legitimate interests** - For fraud prevention, security, analytics, and service improvement
- **Consent** - For specific processing activities where we ask for your consent (e.g., uploading recordings)
- **Legal obligation** - To comply with applicable laws and regulations

Your rights under the GDPR are described in the "Your Rights" section above.

### Data Protection Contact

For GDPR-related inquiries, contact us at **help@upspeech.app**.

Our supervisory authority is the Comissão Nacional de Proteção de Dados (CNPD), Portugal.

## Cookies and Tracking Technologies

UpSpeech uses minimal tracking technologies:

### Local Storage

We store the following in your browser's localStorage:

- **Authentication token** - JWT token for maintaining your login session (expires after 24 hours)
- **User profile data** - Cached copy of your user information for faster page loads
- **Language preference** - Your selected interface language

On our mobile apps, the equivalent information (authentication token, cached profile, and language preference) is stored in the device's secure storage (Keychain on iOS, Keystore on Android) rather than in browser localStorage.

### Analytics Cookies

We use analytics cookies (Google Analytics, Microsoft Clarity, PostHog) to understand how users interact with our platform. These cookies are only set with your explicit consent. We do not use cookies for advertising or tracking purposes, and we do not participate in behavioral advertising networks. For full details, see our [Cookie Policy](/cookies/).

### Browser Settings

You can clear localStorage at any time through your browser settings. Note that clearing localStorage will log you out of the platform.

For more details, see our [Cookie Policy](/cookies/).

## Changes to This Privacy Policy

We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of any material changes by:

- **Email notification** - Sending an email to the address associated with your account
- **Platform notice** - Displaying a prominent notice within the platform
- **Last Updated date** - Updating the "Last Updated" date at the top of this policy

Your continued use of UpSpeech after the effective date of changes constitutes your acceptance of the updated Privacy Policy. If you do not agree to the changes, please discontinue use of the platform.

## Contact Us

If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:

**Email:** help@upspeech.app
**LinkedIn:** [https://www.linkedin.com/company/upspeech/](https://www.linkedin.com/company/upspeech/)
**Platform:** Use the "Support" link in the platform footer to submit a support request

We will respond to your inquiry within 30 days.

---

**Thank you for trusting UpSpeech with your data. We are committed to protecting your privacy and providing a secure, effective platform for speech therapy.**
