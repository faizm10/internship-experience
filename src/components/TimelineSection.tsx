"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePresentation } from "@/store/usePresentationStore";
import { timelineItems } from "@/data/timeline";
import { PolaroidCard } from "./PolaroidCard";
import { Stage } from "@/lib/types";

interface TimelineSectionProps {
  stage: Stage;
  title: string;
  subtitle: string;
  startStep: number;
  endStep: number;
  visible: boolean;
}

// Fixed positions for card layout — asymmetric and layered
const CARD_POSITIONS = [
  { x: 0, y: 0 },
  { x: 260, y: -40 },
  { x: 520, y: 20 },
  { x: 130, y: 200 },
  { x: 390, y: 170 },
  { x: 650, y: -20 },
  { x: 260, y: 370 },
];

export function TimelineSection({
  stage,
  title,
  subtitle,
  startStep,
  endStep,
  visible,
}: TimelineSectionProps) {
  const { state } = usePresentation();

  const items = timelineItems.filter((item) => item.stage === stage);
  const visibleItems = items.filter((item) => item.step <= state.currentStep);
  const activeItem = visibleItems[visibleItems.length - 1] ?? null;

  if (!visible) return null;

  const containerWidth = Math.min(items.length * 240, 900);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="absolute inset-0 flex flex-col"
    >
      {/* Section header */}
      <div className="flex items-end justify-between px-12 pt-10 pb-0 flex-shrink-0">
        <div>
          <span
            className="font-sans text-xs uppercase tracking-widest"
            style={{ fontFamily: "DM Sans", color: "#E8622A", letterSpacing: "0.16em", fontSize: "10px" }}
          >
            {stage}
          </span>
          <h2
            className="font-display leading-none mt-1"
            style={{
              fontFamily: "Playfair Display",
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 600,
              color: "#1A1918",
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </h2>
        </div>
        {activeItem && (
          <motion.div
            key={activeItem.id}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="text-right max-w-xs"
          >
            <p
              className="font-sans text-sm leading-relaxed"
              style={{ color: "#9E9890", fontFamily: "DM Sans" }}
            >
              {activeItem.summary}
            </p>
          </motion.div>
        )}
      </div>

      {/* Cards area */}
      <div className="flex-1 relative flex items-center justify-center overflow-hidden">
        <div
          className="relative"
          style={{
            width: containerWidth + 80,
            height: stage === "during" ? 600 : 400,
          }}
        >
          <AnimatePresence>
            {visibleItems.map((item, index) => {
              const pos = CARD_POSITIONS[index % CARD_POSITIONS.length];
              const isActive = activeItem?.id === item.id;
              const isPast = !isActive && item.step <= state.currentStep;

              return (
                <div
                  key={item.id}
                  className="absolute"
                  style={{
                    left: isActive ? "50%" : pos.x,
                    top: isActive ? "50%" : pos.y + 40,
                    transform: isActive ? "translate(-110px, -130px)" : undefined,
                    zIndex: isActive ? 20 : index,
                    transition: "left 0.5s cubic-bezier(0.25,0.1,0,1), top 0.5s cubic-bezier(0.25,0.1,0,1)",
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
        </div>
      </div>

      {/* Bottom subtitle */}
      <div className="px-12 pb-20 flex-shrink-0">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="font-handwritten text-base"
          style={{ fontFamily: "Caveat", color: "#C8C0B4", fontSize: "18px" }}
        >
          {subtitle}
        </motion.p>
      </div>
    </motion.div>
  );
}
