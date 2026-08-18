import { Composition } from "remotion";
import HeroDemo, { HERO_DEMO_DURATION } from "./HeroDemo";
import "./fonts";
import "./style.css";

export const RemotionRoot = () => {
  return (
    <Composition
      id="HeroDemo"
      component={HeroDemo}
      durationInFrames={HERO_DEMO_DURATION}
      fps={30}
      width={1280}
      height={720}
      defaultProps={{ locale: "en" as const }}
    />
  );
};
