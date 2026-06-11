import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { AbsoluteFill } from "remotion";
import ScenePlan from "./scenes/ScenePlan";
import ScenePractice from "./scenes/ScenePractice";
import SceneProgress from "./scenes/SceneProgress";
import SceneRecording from "./scenes/SceneRecording";
import SceneReport from "./scenes/SceneReport";
import SceneAnnotation from "./scenes/SceneAnnotation";
import SceneEnd from "./scenes/SceneEnd";

const FADE = 12;

// Plan, Practice, Progress, Recording, Report, Annotation, End
export const SCENE_DURATIONS = [120, 130, 120, 120, 150, 120, 80] as const;

export const HERO_DEMO_DURATION =
  SCENE_DURATIONS.reduce((a, b) => a + b, 0) -
  FADE * (SCENE_DURATIONS.length - 1);

const transition = () => (
  <TransitionSeries.Transition
    presentation={fade()}
    timing={linearTiming({ durationInFrames: FADE })}
  />
);

const HeroDemo = () => {
  return (
    <AbsoluteFill className="bg-calm-light">
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS[0]}>
          <ScenePlan />
        </TransitionSeries.Sequence>
        {transition()}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS[1]}>
          <ScenePractice />
        </TransitionSeries.Sequence>
        {transition()}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS[2]}>
          <SceneProgress />
        </TransitionSeries.Sequence>
        {transition()}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS[3]}>
          <SceneRecording />
        </TransitionSeries.Sequence>
        {transition()}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS[4]}>
          <SceneReport />
        </TransitionSeries.Sequence>
        {transition()}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS[5]}>
          <SceneAnnotation />
        </TransitionSeries.Sequence>
        {transition()}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS[6]}>
          <SceneEnd />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};

export default HeroDemo;
