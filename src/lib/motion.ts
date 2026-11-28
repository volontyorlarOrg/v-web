export const MOTION_BOOT_SCRIPT = `(function(){var r=document.documentElement;try{if(!matchMedia("(prefers-reduced-motion: reduce)").matches)r.dataset.motion=""}catch(e){}})()`;

export function motionAllowed(): boolean {
  return !matchMedia("(prefers-reduced-motion: reduce)").matches;
}
