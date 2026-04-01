import type { Transition } from "framer-motion";

/** Comfortable editorial ease — quick start, long settle */
export const easeSmooth: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const sectionTransition: Transition = {
  duration: 0.52,
  ease: easeSmooth,
};
