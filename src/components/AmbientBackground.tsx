"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PRESENTATION_BACKGROUNDS } from "@/data/backgrounds";
import { usePresentation } from "@/store/usePresentationStore";
import { getSectionForStep } from "@/data/timeline";
import { easeSmooth } from "@/lib/motion";
import { SECTION_META } from "@/lib/caseBoard";

const IDLE_ROTATE_MS = 11_000;

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

export function AmbientBackground() {
  const { state } = usePresentation();
  const reducedMotion = usePrefersReducedMotion();
  const images = PRESENTATION_BACKGROUNDS.filter(Boolean);
  const [index, setIndex] = useState(0);
  const prevSectionId = useRef<string | null>(null);

  const section = getSectionForStep(state.currentStep);
  const sectionMeta = SECTION_META[section.id as keyof typeof SECTION_META];

  useEffect(() => {
    if (images.length <= 1) return;
    if (prevSectionId.current === null) {
      prevSectionId.current = section.id;
      return;
    }
    if (prevSectionId.current !== section.id) {
      prevSectionId.current = section.id;
      setIndex((i) => (i + 1) % images.length);
    }
  }, [section.id, images.length]);

  useEffect(() => {
    if (images.length <= 1 || reducedMotion) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, IDLE_ROTATE_MS);
    return () => window.clearInterval(id);
  }, [images.length, reducedMotion]);

  const src = images[index % Math.max(images.length, 1)];

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(61,42,29,0.86) 0%, rgba(39,28,22,0.92) 100%)",
        }}
      />

      <div
        className="absolute inset-[2.2vh_2.2vw] rounded-[28px] border"
        style={{
          borderColor: "rgba(255, 230, 190, 0.08)",
          background:
            "linear-gradient(180deg, rgba(82,58,41,0.62) 0%, rgba(53,37,28,0.78) 100%)",
          boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.03), 0 24px 90px rgba(0,0,0,0.34)",
        }}
      />

      <AnimatePresence initial={false}>
        {images.length > 0 && (
          <motion.div
            key={`bg-${index}-${src}`}
            className="absolute inset-[2.2vh_2.2vw] overflow-hidden rounded-[28px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.18 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0.2 : 1.1, ease: easeSmooth }}
          >
            <motion.img
              src={src}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              initial={false}
              animate={reducedMotion ? { scale: 1 } : { scale: [1, 1.045, 1] }}
              transition={{
                duration: reducedMotion ? 0 : 16,
                repeat: reducedMotion ? 0 : Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
              draggable={false}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className="absolute inset-[2.2vh_2.2vw] rounded-[28px]"
        style={{
          background:
            "radial-gradient(circle at top, rgba(255,232,181,0.14), transparent 28%), linear-gradient(180deg, rgba(246,231,205,0.08) 0%, rgba(18,11,8,0.16) 100%)",
        }}
      />

      <div
        className="absolute left-[10vw] top-[10vh] h-[16vh] w-[22vw] rounded-[20px] border"
        style={{
          borderColor: "rgba(255, 236, 209, 0.08)",
          background:
            "linear-gradient(180deg, rgba(255,244,220,0.06) 0%, rgba(255,244,220,0.01) 100%)",
          rotate: "-8deg",
        }}
      />
      <div
        className="absolute right-[9vw] top-[14vh] h-[18vh] w-[20vw] rounded-[20px] border"
        style={{
          borderColor: "rgba(255, 236, 209, 0.08)",
          background:
            "linear-gradient(180deg, rgba(255,244,220,0.06) 0%, rgba(255,244,220,0.01) 100%)",
          rotate: "6deg",
        }}
      />

      <div
        className="absolute left-1/2 top-[6vh] -translate-x-1/2 rounded-full border px-4 py-2 font-typewriter text-[11px] uppercase tracking-[0.22em]"
        style={{
          color: "#f0dfc7",
          borderColor: `${sectionMeta.accent}55`,
          backgroundColor: "rgba(31, 23, 20, 0.68)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.24)",
        }}
      >
        {sectionMeta.watermark}
      </div>
    </div>
  );
}
