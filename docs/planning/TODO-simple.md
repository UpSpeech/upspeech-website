# User TODOs

## P1

- [x] Consolidate sidebar
- [x] Milestone steps not in order in therapist learning path tab
- [x] Some users can start in milestone 3, need to define a starting point before starting the learning path
- [x] All milestones need to have an introductory video.
  - ~~Is this already done? These are hardcoded, Where can patient see them?~~
  - ~~Steps should be able to have a "tutorial video". We need to prepare for this. Sort of a step /onboarding.~~
  - Done: Migration adds intro_video_url to milestones, tutorial_video_url to milestone_steps. Videos shown in TherapyJourneyPage and StepDetailPage.
- [x] scenario_sessions returning 500 for holding step 3.4 (maybe others too)
- [x] Some steps are throwing 500 on submission.
- [x] On the holding exercises, the idea is for the user to click the a button to mark that they are holding. like a press and hold situation.
- [x] For different exercise steps we should have the possibility for audio (which we do now) as well as video
- [x] On exercises, marked moments should be clickable and make the video/audio go to that timestamp.
- [x] On learning path exercise buttons, is it possible to press and hold the button instead of one to start and one to release?
- [x] For learning path exercises where we need to have videos, can we sedd this with random videos just so we can test things out thoroughly

## P2

- [ ] Migrate transcriptions to elevenlabs endpoint
