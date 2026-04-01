"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { TimelineItem } from "@/lib/types";
import { usePresentation } from "@/store/usePresentationStore";

interface PolaroidCardProps {
  item: TimelineItem;
  isActive: boolean;
  isPast: boolean;
  isFuture: boolean;
  index: number;
  className?: string;
  style?: React.CSSProperties;
}

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

  const categoryColors: Record<string, string> = {
    project: "#D4E4E8",
    lesson: "#E8E4D4",
    challenge: "#E8D4D4",
    growth: "#D4E8D4",
    memory: "#E4D4E8",
    hero: "#D4D8E8",
  };

  const bgColor = item.color || categoryColors[item.category] || "#E8E4D4";

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      rotate: 0,
      scale: 0.85,
    },
    visible: {
      opacity: isPast ? 0.45 : 1,
      y: 0,
      rotate: isActive ? 0 : item.rotation,
      scale: isActive ? 1 : isPast ? 0.88 : 1,
      filter: isPast ? "blur(1px)" : "blur(0px)",
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: -20,
    },
  };

  const springConfig = {
    type: "spring" as const,
    stiffness: 260,
    damping: 28,
    mass: 0.8,
  };

  if (isFuture) return null;

  return (
    <motion.div
      layout
      key={item.id}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={cardVariants}
      transition={springConfig}
      whileHover={
        isActive
          ? {
              scale: 1.03,
              rotate: item.rotation * 0.3,
              y: -6,
              transition: { duration: 0.25 },
            }
          : undefined
      }
      onClick={() => {
        if (isActive) {
          expandCard(state.expandedCardId === item.id ? null : item.id);
        }
      }}
      className={cn(
        "relative select-none",
        isActive && "cursor-pointer z-20",
        isPast && "pointer-events-none z-10",
        className
      )}
      style={{
        ...style,
        filter: isPast
          ? "blur(1.5px) saturate(0.6)"
          : state.spotlightMode && !isActive
          ? "blur(3px) saturate(0.4)"
          : "none",
        opacity: state.spotlightMode && !isActive ? 0.12 : undefined,
      }}
    >
      {/* Polaroid frame */}
      <div
        className="bg-white polaroid-shadow rounded-sm overflow-hidden transition-shadow duration-300"
        style={{
          width: 220,
          padding: "12px 12px 44px 12px",
        }}
      >
        {/* Image area */}
        <div
          className="w-full rounded-sm overflow-hidden relative"
          style={{
            height: 160,
            backgroundColor: bgColor,
          }}
        >
          {/* Emoji / visual */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-5xl">{item.emoji || "📌"}</span>
          </div>
          {/* Category badge */}
          <div className="absolute top-2 right-2">
            <span
              className="text-xs font-sans font-500 px-2 py-0.5 rounded-full text-white/90"
              style={{ backgroundColor: "rgba(0,0,0,0.25)", fontSize: "10px", fontFamily: "DM Sans" }}
            >
              {item.category}
            </span>
          </div>
          {/* Metric overlay */}
          {item.metric && isActive && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="absolute bottom-2 left-2 bg-white/90 rounded px-2 py-1"
            >
              <div
                className="font-display text-lg leading-none"
                style={{ color: "#E8622A", fontFamily: "Playfair Display" }}
              >
                {item.metric.value}
              </div>
              <div
                className="text-charcoal-muted leading-none mt-0.5"
                style={{ fontSize: "9px", fontFamily: "DM Sans", color: "#6B645C" }}
              >
                {item.metric.label}
              </div>
            </motion.div>
          )}
        </div>

        {/* Caption strip */}
        <div className="pt-3 px-1">
          <p
            className="font-handwritten text-center leading-tight"
            style={{
              fontSize: "15px",
              color: "#4A4540",
              fontFamily: "Caveat",
            }}
          >
            {item.caption}
          </p>
        </div>
      </div>

      {/* Active indicator dot */}
      {isActive && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-2 w-4 h-4 rounded-full border-2 border-white"
          style={{ backgroundColor: "#E8622A" }}
        />
      )}
    </motion.div>
  );
}
