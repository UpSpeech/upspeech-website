# UpSpeech MVP Planning Documentation

This folder contains MVP planning and implementation tracking documents.

## Documents

### [MVP_ROADMAP.md](MVP_ROADMAP.md)
**Complete 7-phase implementation plan**

Detailed breakdown of all MVP phases with:
- User stories for therapists and patients
- Technical implementation specifications
- Code snippets and file references
- Priority levels (P0-P3)
- Effort estimates
- Dependencies and prerequisites

Use this document to:
- Understand what needs to be built
- See technical implementation details
- Get code examples for new features
- Understand the "why" behind each feature

### [IMPLEMENTATION_STATUS.md](IMPLEMENTATION_STATUS.md)
**Current feature completion tracking**

Simple checklist-style document showing:
- What's completed (✅)
- What's in progress (🔨)
- What's pending (⬜)
- Sprint-by-sprint tasks
- Files to create/modify
- Quick progress percentages

Use this document to:
- Track day-to-day progress
- See what's next on the roadmap
- Update completion status
- Get a quick overview of MVP status

### How to Use These Documents

**When starting work:**
1. Check `IMPLEMENTATION_STATUS.md` for current phase and tasks
2. Reference `MVP_ROADMAP.md` for detailed specs and examples
3. Update checkboxes in `IMPLEMENTATION_STATUS.md` as you complete features

**When completing a feature:**
1. Mark checkbox as `[x]` in `IMPLEMENTATION_STATUS.md`
2. Update phase completion percentage
3. Update "Last Updated" date
4. Commit with message like: `docs: Complete report editing feature (Phase 2)`

**When adding new features:**
1. Add to `MVP_ROADMAP.md` with full specs
2. Add checklist item to `IMPLEMENTATION_STATUS.md`
3. Update phase percentages

## Related Documentation

For architectural and technical design docs, see:
- [upspeech-website/docs/](../upspeech-website/docs/) - System design, multi-tenancy, auth flows, etc.
- [.claude/claude.md](../.claude/claude.md) - AI assistant context file

## Documentation Structure

```
/upspeech/
├── .claude/
│   └── claude.md                      # AI context (quick project overview)
├── docs/                              # MVP planning (this folder)
│   ├── README.md                      # This file
│   ├── MVP_ROADMAP.md                 # Detailed implementation plan
│   └── IMPLEMENTATION_STATUS.md       # Progress tracking
├── upspeech-website/docs/             # Technical design docs
│   ├── SYSTEM_DESIGN.md               # Architecture overview
│   ├── MULTI_TENANCY.md               # Multi-tenancy strategy
│   ├── AUTH_FLOW.md                   # Authentication flows
│   ├── PERMISSIONS.md                 # Authorization model
│   └── ...                            # Other design docs
├── app-backend/
│   ├── README.md                      # Backend setup guide
│   └── docs/
│       └── FILE_STORAGE_STRATEGY.md   # File storage approach
└── app-frontend/
    └── README.md                      # Frontend setup guide
```

## Best Practices

### Updating Progress
- Update `IMPLEMENTATION_STATUS.md` **daily** or after each feature completion
- Keep phase percentages realistic and up-to-date
- Move completed items from "In Progress" to "Completed Features" sections

### Writing Commit Messages
```bash
# Good commit messages
git commit -m "feat(reports): Add PDF export with prawn gem"
git commit -m "docs: Update Phase 2 to 80% complete"
git commit -m "fix(annotations): Correct waveform marker positioning"

# Reference the phase in larger features
git commit -m "feat(phase3): Implement disfluency detection model"
```

### Keeping Context
- Before long breaks: Update `IMPLEMENTATION_STATUS.md` with current status
- Before context switches: Add notes about what you were working on
- Document blockers or open questions in the relevant phase section

---

**Last Updated**: October 16, 2025
**Current Phase**: Sprint 1 - Phase 2 Completion (Report Writing)
**Next Milestone**: Complete report editing and PDF export (End of Week 2)
