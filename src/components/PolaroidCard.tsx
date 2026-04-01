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

  if (isFuture) return null;

  // Compute visual state — handled in animate, not variants, to avoid style conflicts
  const targetOpacity = state.spotlightMode && !isActive ? 0.1 : isPast ? 0.45 : 1;
  const targetFilter =
    state.spotlightMode && !isActive
      ? "blur(4px) saturate(0.3)"
      : isPast
      ? "blur(1.5px) saturate(0.6)"
      : "blur(0px) saturate(1)";
  const targetRotate = isActive ? 0 : item.rotation;
  const targetScale = isActive ? 1 : isPast ? 0.88 : 1;

  return (
    <motion.div
      layout
      key={item.id}
      initial={{ opacity: 0, y: 50, scale: 0.88, rotate: 0 }}
      animate={{
        opacity: targetOpacity,
        y: 0,
        scale: targetScale,
        rotate: targetRotate,
        filter: targetFilter,
      }}
      exit={{ opacity: 0, scale: 0.92, y: -16, transition: { duration: 0.2 } }}
      transition={{
        type: "spring",
        stiffness: 280,
        damping: 26,
        mass: 0.7,
        opacity: { duration: 0.3 },
        filter: { duration: 0.3 },
      }}
      whileHover={
        isActive
          ? {
              scale: 1.04,
              rotate: item.rotation * 0.25,
              y: -8,
              transition: { duration: 0.2 },
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
      {/* Polaroid frame */}
      <div
        className="bg-[#FDFCFB] polaroid-shadow rounded-[3px] overflow-hidden transition-all duration-300 border border-black/[0.03]"
        style={{
          width: 260,
          padding: "14px 14px 52px 14px",
        }}
      >
        {/* Image area with inner shadow for depth */}
        <div
          className="w-full rounded-[1px] overflow-hidden relative group/img"
          style={{
            height: 220,
            backgroundColor: bgColor,
            boxShadow: "inset 0 0 12px rgba(0,0,0,0.06)",
          }}
        >
          {/* Subtle inner border for the image */}
          <div className="absolute inset-0 border border-black/[0.04] z-10 pointer-events-none" />
          
          {/* Visual content (Image or Emoji fallback) */}
          <div className="absolute inset-0 flex items-center justify-center">
            {item.images && item.images.length > 0 ? (
              <img
                src={item.images[0]}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105"
              />
            ) : (
              <span className="text-5xl">{item.emoji || "📌"}</span>
            )}
          </div>
          
          {/* Multi-image indicator (Stack effect) */}
          {item.images && item.images.length > 1 && (
            <div className="absolute bottom-2 right-2 z-20 flex gap-0.5">
              {[...Array(Math.min(item.images.length, 3))].map((_, i) => (
                <div 
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-white/80 shadow-sm border border-black/10"
                  style={{ opacity: 1 - i * 0.2 }}
                />
              ))}
            </div>
          )}
          
          {/* Subtle gradient overlay for realism */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/[0.02] to-transparent pointer-events-none" />
          
          {/* Metric overlay */}
          {item.metric && isActive && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: -10 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md rounded-sm px-2.5 py-1.5 z-20 shadow-sm border border-black/[0.03]"
            >
              <div
                className="font-display text-xl leading-none"
                style={{ color: "#E8622A", fontFamily: "Playfair Display", fontWeight: 700 }}
              >
                {item.metric.value}
              </div>
              <div
                className="text-charcoal-muted leading-none mt-1 font-medium"
                style={{ fontSize: "9px", fontFamily: "DM Sans", color: "#6B645C", textTransform: "uppercase", letterSpacing: "0.02em" }}
              >
                {item.metric.label}
              </div>
            </motion.div>
          )}
        </div>

        {/* Caption strip with improved typography */}
        <div className="pt-4 px-1">
          <p
            className="font-handwritten text-center leading-tight italic"
            style={{
              fontSize: "18px",
              color: "#3D3935",
              fontFamily: "Caveat",
              fontWeight: 500,
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
