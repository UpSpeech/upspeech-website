# EmailJS Setup Guide

## 1. Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account (200 emails/month)
3. Verify your email address

## 2. Connect Your Email Service

1. In the EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider:
   - **Gmail** (recommended for personal use)
   - **Outlook** (for Microsoft accounts)
   - **SendGrid/Mailgun** (for production)
4. Follow the authentication steps

## 3. Create Email Template

1. Go to "Email Templates" in the dashboard
2. Click "Create New Template"
3. Use this template structure:

```
Subject: Welcome to the UpSpeech Waitlist, {{to_name}}!

Hi {{to_name}},

Thank you for joining the UpSpeech waitlist! We're excited to have you as part of our community of forward-thinking speech therapy professionals.

Here's what we received:
- Name: {{to_name}}
- Email: {{to_email}}
- Role: {{user_role}}
- Clinic Size: {{clinic_size}}

What happens next?
🚀 You'll be among the first to know when we launch
📧 We'll send you exclusive updates about our progress
⚡ You'll get early access to UpSpeech before the general public

Have questions? Just reply to this email and we'll get back to you quickly.

Best regards,
The UpSpeech Team

---
UpSpeech - AI-Powered Speech Therapy Solutions
Visit us at: https://upspeech.com
```

4. Set template variables:
   - `{{to_name}}` - User's name
   - `{{to_email}}` - User's email
   - `{{user_role}}` - Their role selection
   - `{{clinic_size}}` - Clinic size selection

## 4. Get Your Credentials

1. **Service ID**: Found in "Email Services" section
2. **Template ID**: Found in "Email Templates" section
3. **Public Key**: Found in "Account" → "General" → "Public Key"

## 5. Configure Environment Variables

1. Copy `.env.example` to `.env.local`
2. Replace the placeholder values with your actual EmailJS credentials:

```env
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

## 6. Test Your Setup

1. Fill out the waitlist form on your website
2. Check the browser console for any errors
3. Verify the email is received in the user's inbox
4. Check EmailJS dashboard for delivery statistics

## Email Template Best Practices

### Subject Lines

- ✅ "Welcome to UpSpeech, {{to_name}}!"
- ✅ "You're on the UpSpeech waitlist!"
- ❌ "Form submission received" (too generic)

### Content Tips

- Personalize with the user's name
- Confirm what they signed up for
- Set clear expectations
- Include next steps
- Add your branding
- Keep it concise but friendly

### Professional Touch

- Use your company email as reply-to
- Include company signature
- Add social media links
- Mention privacy policy if needed

## Troubleshooting

### Common Issues

1. **Email not sending**: Check console for errors, verify credentials
2. **Template variables not working**: Ensure exact spelling in template
3. **Emails going to spam**: Use authenticated email service, avoid spam words
4. **Rate limiting**: Free tier has 200 emails/month limit

### Testing

- Test with different email providers (Gmail, Outlook, etc.)
- Check spam folders
- Verify template renders correctly
- Test form validation

## Security Notes

- Never commit `.env.local` to version control
- Public key is safe to expose (it's meant to be public)
- Service ID and Template ID are also safe to expose
- Consider rate limiting to prevent abuse

## Monitoring

- Check EmailJS dashboard for delivery rates
- Monitor browser console for errors
- Set up alerts for failed deliveries
- Track conversion rates from email to sign-ups
