"use client";

import { motion, AnimatePresence } from "framer-motion";
import { easeSmooth, sectionTransition } from "@/lib/motion";
import { usePresentation } from "@/store/usePresentationStore";
import { timelineItems } from "@/data/timeline";
import { PolaroidCard } from "./PolaroidCard";
import { STAGE_META } from "@/lib/caseBoard";

export function ClosingSection({ visible }: { visible: boolean }) {
  const { state } = usePresentation();

  const closingItems = timelineItems.filter((i) => i.stage === "closing");
  const visibleItems = closingItems.filter((i) => i.step <= state.currentStep);
  const activeItem = visibleItems[visibleItems.length - 1] ?? null;
  const showThanks = state.currentStep >= 15;

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16, transition: { duration: 0.38, ease: easeSmooth } }}
      transition={sectionTransition}
      className="absolute inset-0 z-10 grid gap-4 px-4 pb-4 pt-4 md:px-7 md:pb-7 md:pt-6 lg:grid-cols-[minmax(0,1.1fr)_420px]"
    >
      <div className="board-panel rounded-[24px] px-5 py-5 md:px-7 md:py-6">
        <p
          className="font-typewriter text-[10px] uppercase tracking-[0.22em]"
          style={{ color: STAGE_META.closing.accent }}
        >
          {STAGE_META.closing.stamp}
        </p>
        <h2
          className="mt-2 font-display leading-[0.92]"
          style={{
            fontSize: "clamp(38px, 6vw, 74px)",
            color: "var(--ink)",
            letterSpacing: "-0.04em",
          }}
        >
          Final Verdict:
          <br />
          <span style={{ color: "#b93a32" }}>real foundation built.</span>
        </h2>
        <p className="mt-5 max-w-2xl text-[15px] leading-7" style={{ color: "#4b3a31" }}>
          The board started with uncertainty. It ends with clearer judgment,
          stronger instincts, and proof that the learning here was not abstract.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="paper-panel rounded-[18px] px-4 py-4">
            <p
              className="font-typewriter text-[10px] uppercase tracking-[0.18em]"
              style={{ color: "#8c6a55" }}
            >
              Closing Note
            </p>
            <p className="mt-3 text-sm leading-6" style={{ color: "#46372f" }}>
              I came in wanting to prove I could contribute. I’m leaving with a
              much more useful outcome: I know how much better my engineering gets
              when the bar is real.
            </p>
          </div>
          <div className="paper-panel rounded-[18px] px-4 py-4">
            <p
              className="font-typewriter text-[10px] uppercase tracking-[0.18em]"
              style={{ color: "#8c6a55" }}
            >
              Closing Note
            </p>
            <p className="mt-3 text-sm leading-6" style={{ color: "#46372f" }}>
              The code mattered. The people mattered more. That combination is what
              made this whole case worth documenting.
            </p>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-[24px] board-panel px-4 py-4 md:px-5 md:py-5">
        <div className="flex h-full min-h-[420px] items-center justify-center">
          <div className="relative flex w-full flex-col items-center gap-4 md:gap-0">
            <AnimatePresence>
              {visibleItems.map((item, index) => {
                const isActive = activeItem?.id === item.id;
                const isPast = !isActive;
                const style =
                  index === 0
                    ? { left: "6%", top: "8%", rotate: "-7deg" }
                    : { right: "4%", top: "24%", rotate: "6deg" };

                return (
                  <motion.div
                    key={item.id}
                    className="relative md:absolute"
                    initial={false}
                    animate={{
                      left: "left" in style ? style.left : undefined,
                      right: "right" in style ? style.right : undefined,
                      top: style.top,
                      rotate: isActive ? 0 : style.rotate,
                      scale: isActive ? 1 : 0.88,
                    }}
                    transition={{ type: "spring", stiffness: 280, damping: 28 }}
                  >
                    <PolaroidCard
                      item={item}
                      isActive={isActive}
                      isPast={isPast}
                      isFuture={false}
                      index={index}
                    />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        <AnimatePresence>
          {showThanks && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22, type: "spring", stiffness: 260, damping: 26 }}
              className="paper-panel absolute bottom-4 left-4 right-4 rounded-[20px] px-4 py-4 md:bottom-6 md:left-6 md:right-6"
              style={{ rotate: "-1deg" }}
            >
              <p
                className="font-handwritten text-[28px] leading-none"
                style={{ color: "#b93a32" }}
              >
                Case closed. Questions welcome.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
