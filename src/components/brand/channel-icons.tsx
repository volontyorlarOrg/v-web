import { createLucideIcon } from "lucide-react";

/**
 * lucide-react dropped its brand icons in 1.0, so the Instagram glyph lives here
 * now. The icon node is lucide's own (ISC licensed), rebuilt through the factory
 * they still export, which keeps it a real LucideIcon: same 24x24 grid, same
 * stroke defaults, same `size` and `strokeWidth` props as every other icon.
 */
export const Instagram = createLucideIcon("instagram", [
  ["rect", { width: "20", height: "20", x: "2", y: "2", rx: "5", ry: "5", key: "2e1cvw" }],
  ["path", { d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z", key: "9exkf1" }],
  ["line", { x1: "17.5", x2: "17.51", y1: "6.5", y2: "6.5", key: "r4j83e" }],
]);
