# The hero map keeps north up and stays centred

The closing act of the hero map settles the board upward; it does not turn it.

An earlier version rotated the board 84° about its own normal at the close and
slid it to the right of the frame so a caption column could sit on the left.
It was rejected on sight: Uzbekistan became an unrecognisable vertical sliver,
the composition only existed on wide viewports, and on a phone the board rose
off the top of the frame. Three rules came out of that and are now enforced by
tests rather than by constants:

1. **The tip is the only rotation.** The board rotates about its own x axis to
   tip towards the reader, between 9° and 58°, and never about y or z.
   `timeline.test.ts` pins the phase shape so a turn cannot be added quietly.
2. **The board is centred on the frame's vertical axis in every act.**
   `framing.test.ts` asserts the frame's horizontal centre through the whole
   runway. Room for the caption comes from the board moving up and its frame
   shrinking — the direction the reader is already scrolling — not from moving
   it aside.
3. **Framing is a pixel window measured from the DOM.** The hero copy's bottom,
   the caption's height and the pins' boxes set the frames; nothing is chosen
   by viewport aspect or by special-casing a breakpoint.

If a future design wants a three-quarter or side view of the country, it has to
start from a composition that stays legible at 390px wide, and it needs a fresh
decision here first.

Related: [[three-js-scoped-to-the-hero-map]]
