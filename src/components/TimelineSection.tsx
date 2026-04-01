"use client";

import { motion, AnimatePresence } from "framer-motion";
import { easeSmooth, sectionTransition } from "@/lib/motion";
import { usePresentation } from "@/store/usePresentationStore";
import { timelineItems } from "@/data/timeline";
import { PolaroidCard } from "./PolaroidCard";
import { POLAROID_LAYOUT } from "@/lib/polaroidLayout";
import { Stage } from "@/lib/types";
import { CATEGORY_META, STAGE_META, getEvidenceCode } from "@/lib/caseBoard";

interface TimelineSectionProps {
  stage: Stage;
  title: string;
  subtitle: string;
  startStep: number;
  endStep: number;
  visible: boolean;
}

const CARD_POSITIONS = [
  { x: 48, y: 112 },
  { x: 332, y: 44 },
  { x: 620, y: 118 },
  { x: 112, y: 332 },
  { x: 444, y: 314 },
  { x: 784, y: 94 },
  { x: 746, y: 334 },
];

function getLineStyle(start: { x: number; y: number }, end: { x: number; y: number }) {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const width = Math.sqrt(dx * dx + dy * dy);
  const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

  return {
    left: start.x,
    top: start.y,
    width,
    transform: `rotate(${angle}deg)`,
  };
}

function getInactivePin(position: { x: number; y: number }) {
  return {
    x: position.x + POLAROID_LAYOUT.width / 2,
    y: position.y + 58,
  };
}

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
  const activeIndex = activeItem ? items.findIndex((item) => item.id === activeItem.id) : -1;
  const containerWidth = 1120;
  const containerHeight = stage === "during" ? 640 : 560;
  const centerPin = {
    x: containerWidth / 2,
    y: containerHeight / 2 - 108,
  };
  const nextItem = activeIndex >= 0 && activeIndex < items.length - 1 ? items[activeIndex + 1] : null;
  const nextPosition = nextItem
    ? getInactivePin(CARD_POSITIONS[(activeIndex + 1) % CARD_POSITIONS.length])
    : null;

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16, transition: { duration: 0.38, ease: easeSmooth } }}
      transition={sectionTransition}
      className="absolute inset-0 z-10 flex flex-col px-4 pb-4 pt-4 md:px-7 md:pb-7 md:pt-6"
    >
      <div className="grid flex-shrink-0 gap-4 lg:grid-cols-[minmax(0,1fr)_350px]">
        <div className="board-panel rounded-[22px] px-5 py-5 md:px-6 md:py-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p
                className="font-typewriter text-[10px] uppercase tracking-[0.22em]"
                style={{ color: STAGE_META[stage].accent }}
              >
                {STAGE_META[stage].stamp}
              </p>
              <h2
                className="mt-2 font-display leading-none"
                style={{
                  fontSize: "clamp(34px, 5vw, 62px)",
                  color: "var(--ink)",
                  letterSpacing: "-0.03em",
                }}
              >
                {title}
              </h2>
            </div>
            <div
              className="max-w-lg rounded-[18px] px-4 py-3"
              style={{
                backgroundColor: "rgba(255, 248, 236, 0.52)",
                boxShadow: "0 8px 18px rgba(33, 24, 19, 0.06)",
              }}
            >
              <p className="text-sm leading-6" style={{ color: "#4b3a31" }}>
                {subtitle}
              </p>
            </div>
          </div>
        </div>

        <div className="board-panel rounded-[22px] px-5 py-5">
          <p
            className="font-typewriter text-[10px] uppercase tracking-[0.22em]"
            style={{ color: "#866c5a" }}
          >
            Current Lead
          </p>
          {activeItem ? (
            <div className="mt-3 space-y-3">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p
                    className="font-typewriter text-[10px] uppercase tracking-[0.18em]"
                    style={{ color: CATEGORY_META[activeItem.category].accent }}
                  >
                    {getEvidenceCode(activeItem.step)}
                  </p>
                  <p className="mt-1 text-lg font-semibold" style={{ color: "#2f221b" }}>
                    {activeItem.title}
                  </p>
                </div>
                <span
                  className="rounded-full px-3 py-1 font-typewriter text-[10px] uppercase tracking-[0.16em]"
                  style={{
                    color: "#544238",
                    backgroundColor: "rgba(255, 249, 239, 0.72)",
                  }}
                >
                  {visibleItems.length}/{items.length}
                </span>
              </div>
              <p className="text-sm leading-6" style={{ color: "#4b3a31" }}>
                {activeItem.summary}
              </p>
              {nextItem && (
                <div
                  className="rounded-[16px] px-4 py-3"
                  style={{
                    backgroundColor: "rgba(185, 58, 50, 0.1)",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.14)",
                  }}
                >
                  <p
                    className="font-typewriter text-[10px] uppercase tracking-[0.18em]"
                    style={{ color: "#8a4339" }}
                  >
                    Next Lead
                  </p>
                  <p className="mt-1 text-sm" style={{ color: "#492e27" }}>
                    {nextItem.title}
                  </p>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>

      <div className="mt-4 flex-1">
        <div className="grid h-full gap-4 md:hidden">
          <div className="paper-panel rounded-[20px] px-4 py-4">
            <p
              className="font-typewriter text-[10px] uppercase tracking-[0.2em]"
              style={{ color: "#8c6a55" }}
            >
              Revealed Clues
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {visibleItems.map((item) => (
                <span
                  key={item.id}
                  className="rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.12em]"
                  style={{
                    color:
                      activeItem?.id === item.id
                        ? CATEGORY_META[item.category].accent
                        : "#65574f",
                    backgroundColor:
                      activeItem?.id === item.id
                        ? CATEGORY_META[item.category].paper
                        : "rgba(255, 249, 239, 0.76)",
                  }}
                >
                  {getEvidenceCode(item.step)} · {item.title}
                </span>
              ))}
            </div>
          </div>

          <div className="flex min-h-0 flex-1 items-center justify-center overflow-hidden">
            {activeItem && (
              <div className="scale-[0.88] sm:scale-[0.96]">
                <PolaroidCard
                  item={activeItem}
                  isActive={true}
                  isPast={false}
                  isFuture={false}
                  index={activeIndex}
                />
              </div>
            )}
          </div>
        </div>

        <div className="relative hidden h-full items-center justify-center md:flex">
          <div
            className="relative origin-top scale-[0.72] lg:scale-[0.86] xl:scale-100"
            style={{ width: containerWidth, height: containerHeight }}
          >
            {visibleItems.map((item, index) => {
              if (index === 0) return null;
              const previousIndex = index - 1;
              const isConnectingToActive = index === visibleItems.length - 1;
              const start =
                previousIndex === activeIndex
                  ? centerPin
                  : getInactivePin(CARD_POSITIONS[previousIndex % CARD_POSITIONS.length]);
              const end = isConnectingToActive
                ? centerPin
                : getInactivePin(CARD_POSITIONS[index % CARD_POSITIONS.length]);

              return (
                <div
                  key={`thread-${item.id}`}
                  className="thread-line"
                  style={getLineStyle(start, end)}
                />
              );
            })}

            {nextPosition && activeItem && (
              <>
                <div
                  className="thread-line"
                  style={{
                    ...getLineStyle(centerPin, nextPosition),
                    opacity: 0.38,
                    filter: "saturate(0.7)",
                  }}
                />
                <div
                  className="absolute rounded-full px-3 py-1 font-typewriter text-[10px] uppercase tracking-[0.18em]"
                  style={{
                    left: nextPosition.x - 36,
                    top: nextPosition.y - 34,
                    backgroundColor: "rgba(31, 23, 20, 0.76)",
                    color: "#f7ebdc",
                  }}
                >
                  next lead
                </div>
              </>
            )}

            <AnimatePresence>
              {visibleItems.map((item, index) => {
                const pos = CARD_POSITIONS[index % CARD_POSITIONS.length];
                const isActive = activeItem?.id === item.id;
                const isPast = !isActive && item.step <= state.currentStep;

                return (
                  <motion.div
                    key={item.id}
                    className="absolute"
                    style={{ zIndex: isActive ? 20 : index }}
                    initial={false}
                    animate={{
                      left: isActive ? "50%" : pos.x,
                      top: isActive ? "50%" : pos.y,
                      x: isActive ? POLAROID_LAYOUT.centerOffsetX : 0,
                      y: isActive ? POLAROID_LAYOUT.centerOffsetY : 0,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 28,
                      mass: 0.86,
                    }}
                  >
                    {!isActive && (
                      <div
                        className="absolute left-1/2 top-6 z-20 -translate-x-1/2"
                      >
                        <div className="pushpin" />
                      </div>
                    )}
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
      </div>
    </motion.div>
  );
}
