import { Composition } from "remotion";

import { INTRO_DURATION, Intro } from "./Intro";
import { FPS } from "./theme";

export function RemotionRoot() {
  return (
    <>
      <Composition
        id="Intro"
        component={Intro}
        durationInFrames={INTRO_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />
    </>
  );
}
