# Feedback System - UX Design Document

**Date**: December 2, 2025
**Phase**: Phase 3 - Feedback Mechanism System
**Focus**: User Experience & Interaction Design

---

## Design Principles

1. **Non-Intrusive**: Feedback mechanisms should be discoverable but not disruptive
2. **Contextual**: Feedback options appear where they're most relevant
3. **Clear Feedback**: Users always know when their action was successful
4. **Progressive Disclosure**: Simple by default, detailed when needed
5. **Accessible**: Keyboard navigation, screen reader support, ARIA labels
6. **Responsive**: Works beautifully on all screen sizes

---

## 1. Report Feedback (Upvote/Downvote)

### User Journey
**Scenario**: A therapist reviews an AI-generated report and wants to indicate quality

### UX Design

#### Placement
- **Location**: Bottom of report view, above action buttons (Download PDF, Edit, etc.)
- **Visibility**: Always visible but subtle (not the primary action)
- **Position**: Fixed to bottom on mobile, inline on desktop

#### Visual Design
```
┌─────────────────────────────────────────────┐
│  Report Content...                          │
│                                             │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│  Was this report helpful?                   │
│                                             │
│  [👍 Helpful] [👎 Not Helpful]              │
│                                             │
│  💭 Add a comment (optional)                │
└─────────────────────────────────────────────┘
```

#### Interaction States

**Default State**:
- Two outlined buttons: "👍 Helpful" and "👎 Not Helpful"
- Neutral gray color scheme
- Hover: Slight background color change
- Cursor: pointer

**After Vote (Upvote)**:
- "👍 Helpful" button: Filled green, bold text
- "👎 Not Helpful" button: Faded out (still clickable to change vote)
- Micro-animation: Gentle scale-up + fade-in success message
- Success message: "✓ Thanks for your feedback!" (auto-dismisses after 3s)

**After Vote (Downvote)**:
- "👎 Not Helpful" button: Filled red, bold text
- Comment field expands automatically with focus
- Placeholder: "Help us improve - what could be better?" (optional)
- Success message after submit: "✓ We'll use this to improve"

**Loading State**:
- Button shows spinner icon
- Disabled during API call
- Smooth transition to success state

**Error State**:
- Red error message: "Couldn't save your feedback. Try again?"
- Original vote state unchanged
- Retry button available

#### Owner-Only View (Aggregate Stats)

**Display for Owners**:
```
┌─────────────────────────────────────────────┐
│  Feedback Summary                           │
│  👍 24 (80%)    👎 6 (20%)    Total: 30     │
│                                             │
│  [View Comments] →                          │
└─────────────────────────────────────────────┘
```

**Comments Modal** (owner-only):
- Opens modal with all comments
- Filterable by vote type (helpful/not helpful)
- Shows user role (therapist/admin) + timestamp
- Searchable

#### Accessibility
- ARIA labels: "Mark report as helpful", "Mark report as not helpful"
- Keyboard navigation: Tab to buttons, Enter/Space to vote
- Screen reader announces: "Your vote was recorded"
- Focus management: Returns to voted button after submission

#### Mobile Optimization
- Larger touch targets (min 44x44px)
- Fixed to bottom with safe area padding
- Sticky positioning on scroll
- Swipe-friendly spacing

---

## 2. General Feedback Form

### User Journey
**Scenario**: A user encounters a bug or wants to suggest a new feature

### UX Design

#### Entry Points

**Primary**: Feedback button in main navigation
```
┌─────────────────────────────────────────────┐
│ [Dashboard] [Reports] [Exercises] [💬]     │
└─────────────────────────────────────────────┘
```

**Secondary**:
- User dropdown menu: "Give Feedback"
- Help Center page: "Share Feedback" button
- Empty states: "Something missing? Let us know"

#### Form Layout

**Desktop View** (centered modal, 600px wide):
```
┌───────────────────────────────────────┐
│  💬 Share Your Feedback               │
│  ───────────────────────────────────  │
│                                       │
│  What type of feedback?               │
│  [ 🐛 Bug Report ▼ ]                  │
│                                       │
│  Title                                │
│  [Brief summary of your feedback]     │
│                                       │
│  Description                          │
│  ┌─────────────────────────────────┐ │
│  │ Tell us more...                 │ │
│  │                                 │ │
│  │                                 │ │
│  │                                 │ │
│  └─────────────────────────────────┘ │
│                                       │
│  [Cancel]              [Send Feedback]│
└───────────────────────────────────────┘
```

#### Category Selection (Step 1)

**Visual Design**: Icon cards (4-up grid on desktop, 2-up on mobile)
```
┌─────────────┐ ┌─────────────┐
│   🐛        │ │    💡       │
│  Bug Report │ │   Feature   │
│             │ │   Request   │
└─────────────┘ └─────────────┘

┌─────────────┐ ┌─────────────┐
│   ⚡        │ │    💬       │
│ Improvement │ │    Other    │
│             │ │             │
└─────────────┘ └─────────────┘
```

**Interaction**:
- Hover: Lift effect (translateY(-2px) + shadow)
- Selected: Blue border + filled background
- Keyboard: Arrow keys to navigate, Enter to select
- Auto-advances to form after selection

#### Form Fields

**Title Field**:
- Required
- Max 100 characters
- Character counter: "42/100"
- Placeholder varies by category:
  - Bug: "What went wrong?"
  - Feature: "What would you like to see?"
  - Improvement: "What could be better?"
  - Other: "What's on your mind?"

**Description Field**:
- Required
- Min 10 characters, max 1000
- Auto-expanding textarea (starts at 4 rows)
- Character counter: "245/1000"
- Rich formatting helper icons:
  - **Bold** (Cmd+B)
  - *Italic* (Cmd+I)
  - • List
  - Code block

**Optional Enhancement** (Future):
- File attachment (screenshots, videos)
- "📎 Attach file" button
- Drag-and-drop zone

#### Submission Flow

**Loading State**:
- Button shows spinner: "Sending..."
- Form fields disabled
- Subtle pulse animation

**Success State**:
- Confetti animation 🎉
- Success message modal:
  ```
  ┌───────────────────────────────────┐
  │        ✓ Thank You!               │
  │                                   │
  │  Your feedback has been received. │
  │  We'll review it soon!            │
  │                                   │
  │  Feedback ID: #1234               │
  │                                   │
  │         [Done]                    │
  └───────────────────────────────────┘
  ```
- Auto-closes after 5 seconds or user clicks Done
- Returns to previous page

**Error State**:
- Error banner at top of form
- "⚠️ Couldn't send feedback. Please try again."
- Form data preserved (no data loss)
- Focus returns to first error field

#### Accessibility
- Form validation: Real-time, non-intrusive
- Error messages: Clear, helpful, linked to fields
- ARIA live regions for dynamic feedback
- Keyboard shortcuts: Cmd+Enter to submit
- Focus trap within modal
- Escape key to close

---

## 3. Report Annotations (Inline Comments)

### User Journey
**Scenario**: An owner, admin, or therapist reviews a report and wants to highlight specific sections for improvement or feedback

### UX Design

#### Activation (Owners, Admins, Therapists)

**Toggle Button** (top-right of report):
```
┌─────────────────────────────────────────────┐
│  Report Title             [💬 Annotate Mode]│
└─────────────────────────────────────────────┘
```

**Default Mode**: Read-only (normal report view)
**Annotate Mode**: Enabled (text selection active)

**Permissions**:
- **Owners**: Can create annotations and see ALL annotations from everyone
- **Admins/Therapists**: Can create annotations and see only their OWN annotations
- **Patients**: Cannot access annotation features

#### Text Selection Flow

**Step 1: Select Text**
- User highlights text with cursor
- Selected text: Yellow highlight overlay
- Smooth fade-in animation

**Step 2: Annotation Popover**
- Popover appears above selection (or below if no space)
- Arrow pointing to selection
```
┌──────────────────────────────┐
│  💬 Add Annotation           │
│  ────────────────────────    │
│  [Comment on this text...]   │
│  ────────────────────────    │
│  [Cancel]        [Save] ✓    │
└──────────────────────────────┘
         ▼
"selected text example"
```

**Step 3: Save Annotation**
- Success micro-animation: Green checkmark + fade
- Highlighted text: Orange border + yellow background
- Annotation indicator: 💬 icon in margin

#### Viewing Existing Annotations

**Visual Indicators**:
- Annotated text: Orange underline + yellow highlight
- Margin icon: 💬 with count badge (if multiple on same text)
- Hover effect: Darkens highlight, shows tooltip preview

**Annotation Tooltip** (on hover):
```
┌─────────────────────────────────────┐
│  💬 John Doe (Owner) - 2 hours ago │
│  ─────────────────────────────────  │
│  "Consider rephrasing this section │
│   for better clarity."              │
│                                     │
│  [View All] [Edit] [Delete]         │
└─────────────────────────────────────┘
```

**Click to Expand**: Opens full annotation sidebar

#### Annotation Sidebar

**Layout** (right side panel, 400px wide):
```
┌─────────────────────────────────────┐
│  Annotations (3)        [Close ×]   │
│  ─────────────────────────────────  │
│                                     │
│  📍 Introduction                    │
│  "This section needs more..."       │
│  👤 Jane Admin • 1 day ago          │
│  [Edit] [Delete]                    │
│  ───────────────────────────────    │
│                                     │
│  📍 Assessment                      │
│  "Add specific examples here"       │
│  👤 John Owner • 2 hours ago        │
│  [Edit] [Delete]                    │
│  ───────────────────────────────    │
│                                     │
│  📍 Recommendations                 │
│  "Great suggestions!"               │
│  👤 Mary Admin • Just now           │
│  [Edit] [Delete]                    │
│                                     │
└─────────────────────────────────────┘
```

**Features**:
- Click annotation: Scrolls to highlighted text + pulses
- Filter by section
- Sort by date
- Export annotations with report
- **Owners**: See all annotations from all users with author names
- **Admins/Therapists**: See only their own annotations
- Delete button: Visible only for annotation creator or owner

#### Mobile Optimization
- Bottom sheet instead of sidebar
- Swipe down to dismiss
- Tap highlighted text to view annotation
- Long-press to add annotation

#### Accessibility
- Keyboard shortcut: Cmd+Shift+A to toggle annotate mode
- Tab to navigate between annotations
- Screen reader: "Annotation by [user] on [text]: [comment]"
- High contrast mode: Stronger highlight colors

---

## 4. Feedback Management Dashboard (Owner-only)

### User Journey
**Scenario**: An owner wants to review and triage user feedback

### UX Design

#### Dashboard Layout

**Desktop View** (full width):
```
┌──────────────────────────────────────────────────────────┐
│  💬 Feedback Management                                  │
│  ────────────────────────────────────────────────────    │
│                                                          │
│  [🔍 Search feedback...]              [Export CSV ⬇]    │
│                                                          │
│  Filters:                                                │
│  [All Types ▼] [All Status ▼] [All Roles ▼] [Reset]     │
│                                                          │
│  ───────────────────────────────────────────────────     │
│                                                          │
│  📊 Report Feedback (24)  |  💬 General Feedback (12)    │
│  ───────────────────────────────────────────────────     │
│                                                          │
│  ┌────────────────────────────────────────────────┐     │
│  │ 🐛 Bug Report                     Status: NEW   │     │
│  │ Title: Audio upload fails on mobile             │     │
│  │ 👤 Dr. Smith (Therapist) • 2 hours ago          │     │
│  │                                                  │     │
│  │ Description: When I try to upload audio...      │     │
│  │                                                  │     │
│  │ [View Full] [In Review] [Planned] [Reject]      │     │
│  └────────────────────────────────────────────────┘     │
│                                                          │
│  ┌────────────────────────────────────────────────┐     │
│  │ 💡 Feature Request           Status: PLANNED    │     │
│  │ Title: Add video recording for exercises        │     │
│  │ 👤 Emma Wilson (Therapist) • 1 day ago          │     │
│  │ ...                                              │     │
│  └────────────────────────────────────────────────┘     │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

#### Feedback Card Design

**Card States**:
- **New**: White background, blue "NEW" badge
- **In Review**: Light yellow background, orange badge
- **Planned**: Light green background, green badge
- **Completed**: Light gray, checkmark icon
- **Rejected**: Very light red, X icon

**Card Components**:
```
┌────────────────────────────────────────────────┐
│ 🐛 Bug Report                     Status: NEW   │ ← Icon + Type + Badge
│ Title: Audio upload fails on mobile             │ ← Title (truncated)
│ 👤 Dr. Smith (Therapist) • 2 hours ago          │ ← User + Role + Time
│                                                  │
│ Description: When I try to upload audio...      │ ← Description (preview)
│ [Show More ▼]                                    │ ← Expandable
│                                                  │
│ Priority: [Low ▼]                                │ ← Priority Dropdown
│                                                  │
│ [View Full] [In Review] [Planned] [Reject]      │ ← Quick Actions
└────────────────────────────────────────────────┘
```

#### Filtering & Search

**Search**:
- Real-time search (debounced 300ms)
- Searches: title, description, user name
- Highlight matching terms in results
- "No results" empty state with clear filter button

**Filter Options**:
```
Type:        [All] [Bug] [Feature] [Improvement] [Other]
Status:      [All] [New] [In Review] [Planned] [Completed] [Rejected]
User Role:   [All] [Therapist] [Admin] [Patient] [Owner]
Date Range:  [Last 7 days ▼]
Priority:    [All] [Low] [Medium] [High] [Critical]
```

**Active Filters**:
- Show as chips/badges above results
- Each chip has × to remove
- "Clear all filters" button

#### Status Updates (Quick Actions)

**Inline Buttons**:
- One-click status change
- Loading state: Button shows spinner
- Success: Gentle card color transition + toast notification
- Undo option in toast (5 second window)

**Bulk Actions** (Future Enhancement):
- Checkbox selection
- "Update Selected" dropdown
- Bulk status change, priority assignment, export

#### Detail View (Modal)

**Full Feedback Modal**:
```
┌───────────────────────────────────────────────┐
│  🐛 Bug Report                     Status: NEW │
│  ───────────────────────────────────────────  │
│                                               │
│  Audio upload fails on mobile                 │
│                                               │
│  Submitted by:                                │
│  👤 Dr. Smith (Therapist)                     │
│  📅 December 2, 2025 at 2:34 PM               │
│  📧 dr.smith@example.com                      │
│                                               │
│  Description:                                 │
│  When I try to upload audio recordings from   │
│  my iPhone, the upload fails with an error... │
│                                               │
│  Attachments: (if any)                        │
│  📎 screenshot.png                            │
│                                               │
│  ───────────────────────────────────────────  │
│                                               │
│  Update Status:                               │
│  [New ▼] [In Review] [Planned] [Complete]    │
│                                               │
│  Priority:                                    │
│  [Low ▼] [Medium] [High] [Critical]           │
│                                               │
│  Internal Notes: (owner-only)                 │
│  [Add note for team...]                       │
│                                               │
│  [Save Changes]                    [Close]    │
└───────────────────────────────────────────────┘
```

#### Report Feedback Tab

**View Toggle**:
- Table view (compact)
- Card view (detailed)

**Metrics Dashboard** (top of tab):
```
┌──────────────────────────────────────────────────┐
│  Report Feedback Overview                        │
│                                                  │
│  👍 192 (85%)    👎 34 (15%)    Total: 226       │
│                                                  │
│  📈 Average Score: 4.2/5.0                       │
│  📊 Trend: ↑ +5% from last week                  │
└──────────────────────────────────────────────────┘
```

**Individual Report Feedback**:
```
┌────────────────────────────────────────────────┐
│ 📄 Report #1234 - Client: Jane Doe             │
│ 👍 5 (83%)    👎 1 (17%)    Total: 6 votes      │
│                                                │
│ Comments (2):                                  │
│ • "Very detailed and helpful!" - Dr. Smith     │
│ • "Missing fluency metrics" - Dr. Jones        │
│                                                │
│ [View Report] [View Annotations]               │
└────────────────────────────────────────────────┘
```

#### Accessibility
- Keyboard navigation: Tab through cards, Enter to expand
- Screen reader: Announces filter changes, status updates
- Focus management: Modal traps focus, returns on close
- Skip links: "Skip to results"

#### Mobile Optimization
- Stack filters vertically
- Collapsible filter panel
- Swipe cards to reveal actions
- Bottom sheet for detail view

---

## Micro-Interactions & Animations

### Timing
- Hover effects: 150ms ease-out
- Button presses: 100ms ease-in-out
- Modal open/close: 200ms ease-in-out
- Success animations: 300ms ease-out
- Toast notifications: Slide in 200ms, auto-dismiss after 5s

### Animations
- **Vote Success**: Scale up button (1.05x) + checkmark fade-in
- **Feedback Submit**: Confetti burst from center
- **Status Change**: Card color transition (300ms)
- **Annotation Save**: Green checkmark pops in
- **Loading States**: Subtle pulse animation

### Sound (Optional Future Enhancement)
- Success sound: Soft "ding"
- Error sound: Gentle "pop"
- Muted by default, toggle in settings

---

## Feature Flag Integration

### Gated UI Elements

**When `feedback_system` flag is DISABLED**:
- Hide feedback button in navigation
- Hide report feedback section
- Hide annotations toggle
- Show "Feature not available" message if user tries to access `/feedback`

**When flag is ENABLED**:
- Show all feedback UI
- Enable API endpoints
- Display in navigation

**Graceful Degradation**:
- If API call fails (403 Forbidden), show:
  ```
  ┌───────────────────────────────────────┐
  │  ℹ️ Feedback System                   │
  │                                       │
  │  This feature is currently disabled.  │
  │  Contact your administrator.          │
  │                                       │
  │         [Go Back]                     │
  └───────────────────────────────────────┘
  ```

---

## Error Handling & Edge Cases

### Network Errors
- Retry button
- Offline indicator
- Cached feedback (submit when back online)

### Validation Errors
- Inline field errors (real-time)
- Clear error messages
- Focus first error field

### Permission Errors (403)
- "Feature not available" message
- Link to contact support
- Graceful redirect

### No Data States
- Empty state illustrations
- Helpful CTAs: "No feedback yet. Encourage your users to share!"
- "Be the first to give feedback" prompt

---

## Performance Optimizations

### Loading Strategies
- Lazy load annotation library (only when annotate mode enabled)
- Debounced search (300ms)
- Paginated results (20 per page)
- Infinite scroll for feedback dashboard

### Caching
- Cache feedback counts (5 min TTL)
- Optimistic UI updates (instant feedback)
- Background sync for offline submissions

---

## Next Steps

1. ✅ Review and approve UX design
2. Create component wireframes in Figma/Sketch (optional)
3. Build backend models and APIs
4. Implement frontend UI components
5. User testing with real therapists
6. Iterate based on feedback

---

**Last Updated**: December 2, 2025
**Status**: Design Complete - Ready for Implementation
**Approved By**: [Pending Review]
