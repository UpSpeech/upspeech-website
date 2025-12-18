# Project TODOs

**Last Updated**: December 18, 2025
**Current Focus**: Test Coverage & Production Readiness
**Status**: ✅ MVP COMPLETE - Focus on Quality & Testing

---

## Overview

The **MVP is complete** with all core features delivered (Phases 1-5, 7). The primary focus is now on **improving test coverage** and ensuring production readiness.

**Current Coverage**:

- **Backend**: 67.36% (Target: 80% minimum, 95% for critical paths)
- **Frontend**: ~35% (Target: 80% minimum, 95% for critical paths)

---

## High Priority - Test Coverage (This Sprint)

### Backend Test Coverage (67% → 80%+)

**Gap: 13 percentage points needed**

#### Untested Backend Services (4 files - HIGH PRIORITY)

- [ ] Add tests for `audio_analyzer_service.rb` (CRITICAL - Phase 3 dependency)
- [ ] Add tests for `google_cloud_storage_service.rb` (Infrastructure)
- [ ] Add tests for `markdown_processor.rb` (Content processing)
- [ ] Add tests for `video_clip_extractor_service.rb` (Feature dependent)

**Estimated Effort**: 2-3 days
**Impact**: +8-10% coverage

#### Edge Case & Error Handling Tests

- [ ] Add error handling tests for authentication flows
- [ ] Add edge case tests for multi-tenancy scoping
- [ ] Add integration tests for cross-service communication
- [ ] Add validation edge case tests for models

**Estimated Effort**: 3-4 days
**Impact**: +5-7% coverage

---

### Frontend Test Coverage (35% → 80%+)

**Gap: 83 untested components out of 127 total**

#### Critical Untested Components (Priority 1 - 1 week)

**Authentication (3 files)**:

- [ ] `LoginForm.tsx` - Login flow tests
- [ ] `ResetPasswordPage.tsx` - Password reset tests
- [ ] Auth error handling and validation

**Patient Management (4 files)**:

- [ ] `EditPatientModal.tsx` - Edit patient tests
- [ ] `DeletePatientModal.tsx` - Delete confirmation tests
- [ ] `CreatePatientModal.tsx` - Create patient tests
- [ ] `PatientListCard.tsx` - Patient card display tests

**Exercise System (6 files)**:

- [ ] `ExerciseDetailsModal.tsx` - Exercise details tests
- [ ] `ExerciseCompletionModal.tsx` - Completion flow tests
- [ ] `ExerciseListItem.tsx` - List item tests
- [ ] `CompletionTimeline.tsx` - Timeline visualization tests
- [ ] Exercise assignment tests
- [ ] Exercise filtering and sorting tests

**Estimated Effort**: 5-7 days
**Impact**: +15-20% coverage

#### Secondary Untested Components (Priority 2 - 1-2 weeks)

**Feedback System (7 files)**:

- [ ] `FeedbackButton.tsx`
- [ ] `FeedbackCard.tsx`
- [ ] `FeedbackDetailModal.tsx`
- [ ] `FeedbackFilters.tsx`
- [ ] `ReportFeedbackMetrics.tsx`
- [ ] Feedback form submissions
- [ ] Feedback filtering and display

**Report System (5 files)**:

- [ ] `DefaultReportTemplate.tsx`
- [ ] `FluencyAnalysisTemplate.tsx`
- [ ] `SpeechCarePortugueseTemplate.tsx`
- [ ] `RecordingPlayer.tsx`
- [ ] `ClipPlayer.tsx`

**Recording & Annotation (3 files)**:

- [ ] Annotation controls and UI
- [ ] Recording playback tests
- [ ] Waveform visualization tests

**Estimated Effort**: 7-10 days
**Impact**: +25-30% coverage

#### Additional Pages Without Tests (Priority 3 - 1 week)

- [ ] `ManualReportGeneratorPage.tsx`
- [ ] `AudioUploadPage.tsx`
- [ ] `ExerciseManagementPage.tsx`
- [ ] `HelpCenterPage.tsx`
- [ ] `FeatureFlagManagementPage.tsx`
- [ ] And 15+ more pages

**Estimated Effort**: 5-7 days
**Impact**: +10-15% coverage

---

## Medium Priority - Code Quality

### Component Standards Enforcement

- [ ] Enforce PageHeader usage on all pages (currently 44% adoption - 14 pages remaining)
- [ ] Complete icon migration (142 inline SVG instances → Heroicons)
- [ ] Remove 20+ emoji instances from code
- [ ] Migrate 23 files with raw HTML violations (feedback system, chat system)

**Estimated Effort**: 3-5 days

### Documentation

- [x] Update MVP_ROADMAP.md to reflect MVP completion
- [x] Update TODO.md with test coverage focus
- [ ] Update CLAUDE.md with accurate completion status
- [ ] Update CHANGELOG.md with December 2025 entry

**Estimated Effort**: 1-2 hours

---

## Low Priority - Future Enhancements (Post-MVP)

### Phase 6: Gamification (Deferred)

- Daily streak tracking
- Achievement badges
- Motivational nudges
- Reminder system

**Status**: Out of MVP scope, evaluate based on user feedback

### Advanced Speech Analysis (Deferred)

- Automatic disfluency detection (AI/ML based)
- Advanced speech metrics and trend analysis
- Context tagging (structured vs spontaneous speech)
- Disfluency prediction and recommendations

**Status**: Out of MVP scope, requires research and AI development

---

## Completed This Month (December 2025)

- ✅ **Documentation Audit** (Dec 18) - Comprehensive audit of all project docs
- ✅ **MVP Completion Verification** (Dec 18) - Verified all phases 1-5, 7 complete
- ✅ **MVP_ROADMAP.md Update** (Dec 18) - Accurate status reflection
- ✅ **TODO.md Rewrite** (Dec 18) - Focus shifted to test coverage

## Completed Previously (November 2025)

- ✅ **Exercise System Refactoring** (Nov 29) - Split Exercise → MiniGame + ConsultationExercise
- ✅ **Old Exercise Model Removal** (Nov 29) - Clean migration, zero legacy code
- ✅ **Component Library Migration** (Nov 17) - 100% complete, 65+ standardized components
- ✅ **Phase 4 Completion** (Nov 17) - Manual exercise assignment system
- ✅ **Phase 1, 2, 5, 7 Completion** (Oct-Nov) - All MVP phases delivered

---

## Timeline Estimates

**Test Coverage Sprint** (2-4 weeks):

- Week 1-2: Backend services + critical frontend components (Priority 1)
- Week 3: Secondary frontend components (Priority 2, partial)
- Week 4: Code quality improvements + remaining tests

**Production Readiness** (1 week):

- Final QA and bug fixes
- Performance testing
- Security audit
- Deployment preparation

**Target Production Launch**: Mid-January 2026

---

## Success Criteria

### Test Coverage Targets

- ✅ Backend: 80%+ overall coverage
- ✅ Backend Critical Paths: 95%+ coverage (auth, permissions, multi-tenancy)
- ✅ Frontend: 80%+ overall coverage
- ✅ Frontend Critical Paths: 95%+ coverage (auth, patient management)

### Code Quality

- ✅ All linters passing (RuboCop, ESLint, Prettier)
- ✅ Zero TypeScript errors
- ✅ All standardized components enforced
- ✅ PageHeader used on 100% of applicable pages

### Production Readiness

- ✅ All tests passing
- ✅ Performance benchmarks met
- ✅ Security audit complete
- ✅ Documentation up-to-date

---

**Next Review**: After test coverage sprint completion (estimated early January 2026)
