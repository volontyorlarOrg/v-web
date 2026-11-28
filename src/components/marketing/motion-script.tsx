import { MOTION_BOOT_SCRIPT } from "@/lib/motion";

export function MotionScript() {
  return <script dangerouslySetInnerHTML={{ __html: MOTION_BOOT_SCRIPT }} />;
}
