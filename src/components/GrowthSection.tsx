"use client";

import { motion, AnimatePresence } from "framer-motion";
import { easeSmooth, sectionTransition } from "@/lib/motion";
import { usePresentation } from "@/store/usePresentationStore";
import { timelineItems } from "@/data/timeline";
import { PolaroidCard } from "./PolaroidCard";
import { POLAROID_LAYOUT } from "@/lib/polaroidLayout";
import { STAGE_META } from "@/lib/caseBoard";

const skills = [
  { label: "TypeScript", level: 88 },
  { label: "System Design", level: 72 },
  { label: "Code Review", level: 90 },
  { label: "Observability", level: 78 },
  { label: "Git Discipline", level: 95 },
  { label: "Communication", level: 85 },
];

export function GrowthSection({ visible }: { visible: boolean }) {
  const { state } = usePresentation();

  const afterItems = timelineItems.filter((i) => i.stage === "after");
  const visibleAfterItems = afterItems.filter((i) => i.step <= state.currentStep);
  const activeItem = visibleAfterItems[visibleAfterItems.length - 1] ?? null;

  const showSkills = state.currentStep >= 11;
  const showShift = state.currentStep >= 12;
  const showComparison = state.currentStep >= 13;

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16, transition: { duration: 0.38, ease: easeSmooth } }}
      transition={sectionTransition}
      className="absolute inset-0 z-10 grid gap-4 px-4 pb-4 pt-4 md:px-7 md:pb-7 md:pt-6 lg:grid-cols-[420px_minmax(0,1fr)]"
    >
      <div className="space-y-4">
        <div className="board-panel rounded-[22px] px-5 py-5">
          <p
            className="font-typewriter text-[10px] uppercase tracking-[0.22em]"
            style={{ color: STAGE_META.after.accent }}
          >
            {STAGE_META.after.stamp}
          </p>
          <h2
            className="mt-2 font-display leading-none"
            style={{
              fontSize: "clamp(34px, 5vw, 62px)",
              color: "var(--ink)",
              letterSpacing: "-0.03em",
            }}
          >
            Findings Board
          </h2>
          <p className="mt-4 text-sm leading-6" style={{ color: "#4b3a31" }}>
            This is the part where the scattered clues stop feeling isolated and
            start reading like a clear pattern.
          </p>
        </div>

        <div className="paper-panel rounded-[22px] px-5 py-5">
          <p
            className="font-typewriter text-[10px] uppercase tracking-[0.2em]"
            style={{ color: "#8c6a55" }}
          >
            Capability Readout
          </p>
          {showSkills && (
            <div className="mt-4 space-y-4">
              {skills.map((skill, i) => (
                <motion.div
                  key={skill.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.38, ease: easeSmooth }}
                >
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-sm font-medium" style={{ color: "#4a3b31" }}>
                      {skill.label}
                    </span>
                    <span
                      className="font-typewriter text-[11px] uppercase tracking-[0.14em]"
                      style={{ color: "#8c6a55" }}
                    >
                      {skill.level}%
                    </span>
                  </div>
                  <div
                    className="h-2 overflow-hidden rounded-full"
                    style={{ backgroundColor: "#ded0bb" }}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ delay: 0.24 + i * 0.05, duration: 0.78, ease: easeSmooth }}
                      className="h-full rounded-full"
                      style={{
                        background:
                          i % 2 === 0
                            ? "linear-gradient(90deg, #b93a32 0%, #d97335 100%)"
                            : "linear-gradient(90deg, #6b7d55 0%, #365a49 100%)",
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        <AnimatePresence>
          {showShift && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.42, ease: easeSmooth }}
              className="paper-panel rounded-[22px] px-5 py-5"
            >
              <p
                className="font-typewriter text-[10px] uppercase tracking-[0.2em]"
                style={{ color: "#8c6a55" }}
              >
                Biggest Shift
              </p>
              <p
                className="mt-3 font-handwritten text-[30px] leading-none"
                style={{ color: "#b93a32" }}
              >
                From “does it work?”
                <br />
                to “should we build it?”
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="relative min-h-[460px] overflow-hidden rounded-[22px] board-panel px-4 py-4 md:px-6 md:py-6">
        <div className="relative h-full min-h-[420px]">
          <AnimatePresence>
            {visibleAfterItems.map((item, index) => {
              const positions = [
                { x: 20, y: 34 },
                { x: 238, y: 176 },
                { x: 462, y: 48 },
              ];
              const pos = positions[index % positions.length];
              const isActive = activeItem?.id === item.id;
              const isPast = !isActive && item.step <= state.currentStep;

              return (
                <motion.div
                  key={item.id}
                  className="absolute hidden md:block"
                  style={{ zIndex: isActive ? 20 : index }}
                  initial={false}
                  animate={{
                    left: isActive ? "50%" : pos.x,
                    top: isActive ? "54%" : pos.y,
                    x: isActive ? POLAROID_LAYOUT.centerOffsetX : 0,
                    y: isActive ? POLAROID_LAYOUT.centerOffsetY : 0,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 28,
                    mass: 0.9,
                  }}
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

          <div className="flex h-full items-center justify-center md:hidden">
            {activeItem && (
              <div className="scale-[0.88]">
                <PolaroidCard
                  item={activeItem}
                  isActive={true}
                  isPast={false}
                  isFuture={false}
                  index={visibleAfterItems.length - 1}
                />
              </div>
            )}
          </div>

          <AnimatePresence>
            {showComparison && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 18 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 280, damping: 26 }}
                className="paper-panel absolute bottom-3 left-3 right-3 rounded-[20px] px-4 py-4 md:bottom-6 md:right-6 md:left-auto md:w-[280px]"
                style={{ rotate: "-2deg" }}
              >
                <p
                  className="font-typewriter text-[10px] uppercase tracking-[0.18em]"
                  style={{ color: "#8c6a55" }}
                >
                  Before vs After
                </p>
                <div className="mt-3 space-y-2">
                  {[
                    { before: "Tutorial-trained", after: "Production-tested" },
                    { before: "Code-first", after: "Outcome-first" },
                    { before: "Single file", after: "Systems thinking" },
                  ].map((row) => (
                    <div key={row.before} className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
                      <span className="text-right text-[11px] line-through" style={{ color: "#b3a18b" }}>
                        {row.before}
                      </span>
                      <span style={{ color: "#b93a32" }}>→</span>
                      <span className="text-[11px] font-medium" style={{ color: "#46372f" }}>
                        {row.after}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
