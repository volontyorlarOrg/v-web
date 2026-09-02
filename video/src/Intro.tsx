import { AbsoluteFill, Sequence } from "remotion";

import "./fonts";
import { Apply } from "./scenes/Apply";
import { Confirmed } from "./scenes/Confirmed";
import { Discover } from "./scenes/Discover";
import { Landing } from "./scenes/Landing";
import { LogIn } from "./scenes/LogIn";
import { Open } from "./scenes/Open";
import { Outro } from "./scenes/Outro";
import { color } from "./theme";

export const SCENES = [
  { name: "Open", length: 120, render: (l: number) => <Open length={l} /> },
  { name: "Landing", length: 400, render: (l: number) => <Landing length={l} /> },
  { name: "LogIn", length: 240, render: (l: number) => <LogIn length={l} /> },
  { name: "Discover", length: 300, render: (l: number) => <Discover length={l} /> },
  { name: "Apply", length: 330, render: (l: number) => <Apply length={l} /> },
  { name: "Confirmed", length: 210, render: (l: number) => <Confirmed length={l} /> },
  { name: "Outro", length: 210, render: (l: number) => <Outro length={l} /> },
] as const;

export const INTRO_DURATION = SCENES.reduce((total, scene) => total + scene.length, 0);

export function Intro() {
  let offset = 0;

  return (
    <AbsoluteFill style={{ background: color.paper }}>
      {SCENES.map((scene) => {
        const from = offset;
        offset += scene.length;
        return (
          <Sequence key={scene.name} from={from} durationInFrames={scene.length} name={scene.name}>
            {scene.render(scene.length)}
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
}
