"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePresentation } from "@/store/usePresentationStore";
import { timelineItems } from "@/data/timeline";
import { PolaroidCard } from "./PolaroidCard";

export function ClosingSection({ visible }: { visible: boolean }) {
  const { state } = usePresentation();

  const closingItems = timelineItems.filter((i) => i.stage === "closing");
  const visibleItems = closingItems.filter((i) => i.step <= state.currentStep);
  const activeItem = visibleItems[visibleItems.length - 1] ?? null;

  const showThanks = state.currentStep >= 15;

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
      className="absolute inset-0 flex flex-col items-center justify-center"
    >
      {/* Large background text */}
      <div
        className="absolute select-none pointer-events-none font-display"
        style={{
          fontFamily: "Playfair Display",
          fontSize: "clamp(60px, 14vw, 180px)",
          fontWeight: 700,
          color: "rgba(26,25,24,0.03)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          whiteSpace: "nowrap",
          letterSpacing: "-0.02em",
        }}
      >
        THANK YOU
      </div>

      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="font-sans text-xs uppercase tracking-widest block mb-4"
        style={{ fontFamily: "DM Sans", color: "#E8622A", letterSpacing: "0.16em", fontSize: "10px" }}
      >
        Closing
      </motion.span>

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="font-display text-center leading-none mb-3"
        style={{
          fontFamily: "Playfair Display",
          fontSize: "clamp(36px, 6vw, 72px)",
          fontWeight: 600,
          color: "#1A1918",
          letterSpacing: "-0.02em",
        }}
      >
        One co-op.
        <br />
        <em style={{ fontStyle: "italic", color: "#E8622A" }}>Real foundation.</em>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="font-sans text-center mb-10 max-w-md"
        style={{ fontFamily: "DM Sans", color: "#9E9890", fontSize: "15px", lineHeight: 1.6 }}
      >
        To everyone on this team: the code reviews, the 1:1s,
        <br />
        the Slack answers at midnight. It mattered.
      </motion.p>

      {/* Cards */}
      <div className="flex items-center gap-6">
        <AnimatePresence>
          {visibleItems.map((item, index) => {
            const isActive = activeItem?.id === item.id;
            const isPast = !isActive;
            return (
              <PolaroidCard
                key={item.id}
                item={item}
                isActive={isActive}
                isPast={isPast}
                isFuture={false}
                index={index}
              />
            );
          })}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showThanks && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, type: "spring", stiffness: 200, damping: 24 }}
            className="mt-8 text-center"
          >
            <p
              className="font-handwritten text-2xl"
              style={{ fontFamily: "Caveat", color: "#4A4540", fontSize: "26px" }}
            >
              Questions? I'd love to chat. 🙂
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
