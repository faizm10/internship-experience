"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePresentation } from "@/store/usePresentationStore";
import { timelineItems } from "@/data/timeline";
import { PolaroidCard } from "./PolaroidCard";

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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="absolute inset-0 flex"
    >
      {/* Left panel: title + skills */}
      <div className="w-1/2 flex flex-col justify-center pl-12 pr-8">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="font-sans text-xs uppercase tracking-widest block mb-2"
          style={{ fontFamily: "DM Sans", color: "#E8622A", letterSpacing: "0.16em", fontSize: "10px" }}
        >
          After
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="font-display leading-none mb-6"
          style={{
            fontFamily: "Playfair Display",
            fontSize: "clamp(28px, 4vw, 52px)",
            fontWeight: 600,
            color: "#1A1918",
            letterSpacing: "-0.02em",
          }}
        >
          Growth,
          <br />
          <em style={{ fontStyle: "italic" }}>measured.</em>
        </motion.h2>

        <AnimatePresence>
          {showSkills && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-3"
            >
              {skills.map((skill, i) => (
                <motion.div
                  key={skill.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className="font-sans text-xs font-medium"
                      style={{ fontFamily: "DM Sans", color: "#4A4540", fontSize: "12px" }}
                    >
                      {skill.label}
                    </span>
                    <span
                      className="font-handwritten text-sm"
                      style={{ fontFamily: "Caveat", color: "#9E9890", fontSize: "14px" }}
                    >
                      {skill.level}%
                    </span>
                  </div>
                  <div
                    className="h-1.5 rounded-full overflow-hidden"
                    style={{ backgroundColor: "#EFE8DC" }}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ delay: 0.3 + i * 0.07, duration: 0.7, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{
                        backgroundColor: i === 0 ? "#E8622A" : "#9E9890",
                        opacity: i === 0 ? 1 : 0.7,
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showShift && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-6 pt-5 border-t"
              style={{ borderColor: "#EFE8DC" }}
            >
              <p
                className="font-handwritten text-xl leading-snug"
                style={{ fontFamily: "Caveat", color: "#4A4540", fontSize: "20px" }}
              >
                "From <em>does it work?</em> to
                <br />
                <span style={{ color: "#E8622A" }}>should we build this?</span>"
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Right panel: polaroid cards */}
      <div className="w-1/2 relative flex items-center justify-center">
        <AnimatePresence>
          {visibleAfterItems.map((item, index) => {
            const positions = [
              { x: 0, y: 0 },
              { x: 50, y: -60 },
              { x: -30, y: 80 },
            ];
            const pos = positions[index % positions.length];
            const isActive = activeItem?.id === item.id;
            const isPast = !isActive && item.step <= state.currentStep;

            return (
              <div
                key={item.id}
                className="absolute"
                style={{
                  left: `calc(50% + ${pos.x}px)`,
                  top: `calc(50% + ${pos.y}px)`,
                  transform: "translate(-110px, -130px)",
                  zIndex: isActive ? 20 : index,
                }}
              >
                <PolaroidCard
                  item={item}
                  isActive={isActive}
                  isPast={isPast}
                  isFuture={false}
                  index={index}
                />
              </div>
            );
          })}
        </AnimatePresence>

        <AnimatePresence>
          {showComparison && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 26 }}
              className="absolute bottom-16 right-8 bg-white rounded-sm polaroid-shadow p-4"
              style={{ width: 180 }}
            >
              <p
                className="font-handwritten text-center text-xs mb-3"
                style={{ fontFamily: "Caveat", color: "#9E9890", fontSize: "12px" }}
              >
                before vs. after
              </p>
              {[
                { before: "Tutorial-trained", after: "Production-tested" },
                { before: "Code-first", after: "Outcome-first" },
                { before: "Single file", after: "Systems thinking" },
              ].map((row, i) => (
                <div key={i} className="flex items-center gap-1.5 mb-1.5">
                  <span
                    className="text-xs line-through flex-1 text-right"
                    style={{ color: "#C8C0B4", fontFamily: "DM Sans", fontSize: "9px" }}
                  >
                    {row.before}
                  </span>
                  <span style={{ color: "#E8622A", fontSize: "10px" }}>→</span>
                  <span
                    className="text-xs flex-1 font-medium"
                    style={{ color: "#4A4540", fontFamily: "DM Sans", fontSize: "9px" }}
                  >
                    {row.after}
                  </span>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
