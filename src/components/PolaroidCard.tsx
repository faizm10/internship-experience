"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import { easeSmooth } from "@/lib/motion";
import { TimelineItem } from "@/lib/types";
import { usePresentation } from "@/store/usePresentationStore";
import { POLAROID_LAYOUT } from "@/lib/polaroidLayout";
import { CATEGORY_META, STAGE_META, getEvidenceCode } from "@/lib/caseBoard";

interface PolaroidCardProps {
  item: TimelineItem;
  isActive: boolean;
  isPast: boolean;
  isFuture: boolean;
  index: number;
  className?: string;
  style?: React.CSSProperties;
}

const clampText: React.CSSProperties = {
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
};

export function PolaroidCard({
  item,
  isActive,
  isPast,
  isFuture,
  index,
  className,
  style,
}: PolaroidCardProps) {
  const { state, expandCard } = usePresentation();
  const [slideIdx, setSlideIdx] = useState(0);

  useEffect(() => {
    setSlideIdx(0);
  }, [item.id]);

  useEffect(() => {
    if (!isActive) setSlideIdx(0);
  }, [isActive]);

  useEffect(() => {
    if (!isActive || item.images.length <= 1) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;
    const t = window.setInterval(() => {
      setSlideIdx((i) => (i + 1) % item.images.length);
    }, 4200);
    return () => window.clearInterval(t);
  }, [isActive, item.images.length]);

  if (isFuture) return null;

  const categoryMeta = CATEGORY_META[item.category];
  const stageMeta = STAGE_META[item.stage];
  const evidenceCode = getEvidenceCode(item.step);

  const targetOpacity = state.spotlightMode && !isActive ? 0.12 : isPast ? 0.58 : 1;
  const targetFilter =
    state.spotlightMode && !isActive
      ? "blur(3px) saturate(0.35)"
      : isPast
      ? "blur(0.8px) saturate(0.72)"
      : "blur(0px) saturate(1)";
  const targetRotate = isActive ? 0 : item.rotation;
  const targetScale = isActive ? 1 : isPast ? 0.85 : 0.96;

  return (
    <motion.div
      layout
      key={item.id}
      initial={{ opacity: 0, y: 48, scale: 0.9, rotate: 0 }}
      animate={{
        opacity: targetOpacity,
        y: 0,
        scale: targetScale,
        rotate: targetRotate,
        filter: targetFilter,
      }}
      exit={{ opacity: 0, scale: 0.92, y: -18, transition: { duration: 0.22 } }}
      transition={{
        type: "spring",
        stiffness: 280,
        damping: 26,
        mass: 0.72,
        opacity: { duration: 0.3 },
        filter: { duration: 0.3 },
      }}
      whileHover={
        isActive
          ? {
              scale: 1.02,
              rotate: item.rotation * 0.22,
              y: -5,
              transition: { duration: 0.18 },
            }
          : undefined
      }
      onClick={() => {
        if (isActive) {
          expandCard(state.expandedCardId === item.id ? null : item.id);
        }
      }}
      data-no-advance={isActive ? "true" : undefined}
      className={cn(
        "relative select-none",
        isActive && "cursor-pointer z-20",
        isPast && "pointer-events-none z-10",
        className
      )}
      style={{ ...style }}
    >
      <div
        className="relative paper-panel overflow-hidden rounded-[6px] transition-transform duration-300"
        style={{ width: POLAROID_LAYOUT.width }}
      >
        <div
          className="tape-strip"
          style={{ top: -9, left: 20, rotate: "-6deg" }}
        />
        <div
          className="tape-strip"
          style={{ top: -10, right: 18, rotate: "8deg", width: 68 }}
        />

        <div className="absolute left-1/2 top-3 z-20 -translate-x-1/2">
          <div className="pushpin" />
        </div>

        <div className="px-4 pb-4 pt-5">
          <div className="mb-3 flex items-center justify-between gap-2">
            <div
              className="font-typewriter rounded-full px-2.5 py-1 text-[10px] uppercase tracking-[0.16em]"
              style={{
                color: "#f6ebdc",
                backgroundColor: categoryMeta.accent,
              }}
            >
              {evidenceCode}
            </div>
            <div
              className="font-typewriter text-[10px] uppercase tracking-[0.18em]"
              style={{ color: stageMeta.accent }}
            >
              {categoryMeta.chip}
            </div>
          </div>

          <div
            className="relative overflow-hidden rounded-[4px]"
            style={{
              height: POLAROID_LAYOUT.imageHeight,
              backgroundColor: item.color || categoryMeta.paper,
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.18)",
            }}
          >
            <div
              className="absolute left-3 top-3 z-20 rounded-full px-2.5 py-1 font-typewriter text-[9px] uppercase tracking-[0.18em]"
              style={{
                backgroundColor: "rgba(28, 20, 17, 0.72)",
                color: "#f6ebdc",
              }}
            >
              {stageMeta.label}
            </div>
            <div
              className="absolute right-3 top-3 z-20 rounded-sm px-2 py-1 font-typewriter text-[9px] uppercase tracking-[0.16em]"
              style={{
                backgroundColor: "rgba(249, 241, 226, 0.92)",
                color: categoryMeta.accent,
              }}
            >
              {categoryMeta.label}
            </div>

            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
              {!isActive || item.images.length <= 1 ? (
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <AnimatePresence initial={false}>
                  <motion.img
                    key={`${item.id}-${slideIdx}`}
                    src={item.images[slideIdx]}
                    alt={item.title}
                    className="absolute inset-0 h-full w-full object-cover"
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: easeSmooth }}
                  />
                </AnimatePresence>
              )}
            </div>

            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(16,11,10,0.05) 0%, rgba(16,11,10,0.28) 100%)",
              }}
            />

            {item.metric && (
              <div
                className="absolute bottom-3 left-3 z-20 rounded-[4px] px-3 py-1.5"
                style={{
                  backgroundColor: "rgba(250, 243, 232, 0.9)",
                  color: categoryMeta.accent,
                  boxShadow: "0 8px 16px rgba(19, 13, 10, 0.12)",
                }}
              >
                <div
                  className="font-display text-2xl leading-none"
                  style={{ fontWeight: 700 }}
                >
                  {item.metric.value}
                </div>
                <div
                  className="font-typewriter text-[9px] uppercase tracking-[0.18em]"
                >
                  {item.metric.label}
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p
                  className="font-typewriter text-[10px] uppercase tracking-[0.2em]"
                  style={{ color: "#8c6a55" }}
                >
                  Lead {index + 1}
                </p>
                <h3
                  className="font-display text-[28px] leading-[1.02]"
                  style={{ color: "var(--ink)", letterSpacing: "-0.02em" }}
                >
                  {item.title}
                </h3>
              </div>
              {isActive && (
                <div
                  className="rounded-full px-2 py-1 font-typewriter text-[10px] uppercase tracking-[0.16em]"
                  style={{
                    color: categoryMeta.accent,
                    backgroundColor: categoryMeta.paper,
                  }}
                >
                  Active
                </div>
              )}
            </div>

            <p
              className="font-handwritten text-[24px] leading-none"
              style={{ color: categoryMeta.accent }}
            >
              {item.caption}
            </p>

            <p
              className="text-[13px] leading-[1.55]"
              style={{
                ...clampText,
                WebkitLineClamp: isActive ? 4 : 3,
                color: "#4a3b32",
              }}
            >
              {item.summary}
            </p>

            <div className="flex items-center justify-between gap-3">
              <div className="flex flex-wrap gap-1.5">
                {(item.tags ?? []).slice(0, isActive ? 3 : 2).map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1 rounded-full px-2 py-1 text-[10px] uppercase tracking-[0.08em]"
                    style={{
                      color: "#67554c",
                      backgroundColor: "rgba(255, 249, 239, 0.72)",
                    }}
                  >
                    <Tag size={10} />
                    {tag}
                  </span>
                ))}
              </div>

              {isActive && (
                <div
                  className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.12em]"
                  style={{ color: categoryMeta.accent }}
                >
                  open case notes
                  <ArrowUpRight size={14} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
