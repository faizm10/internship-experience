"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePresentation } from "@/store/usePresentationStore";
import { useState, useEffect } from "react";

export function NavigationHint() {
  const { state } = usePresentation();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 4200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (state.currentStep === 0) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 4200);
      return () => clearTimeout(timer);
    }
  }, [state.currentStep]);

  const isLastStep = state.currentStep === state.totalSteps - 1;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 8, rotate: -2 }}
          animate={{ opacity: 1, y: 0, rotate: -2 }}
          exit={{ opacity: 0, y: 6, rotate: -2 }}
          transition={{ duration: 0.35 }}
          className="fixed right-4 top-20 z-50 max-w-[250px] rounded-[18px] border px-4 py-3 md:right-6 md:top-[96px]"
          style={{
            background:
              "linear-gradient(180deg, rgba(246,235,213,0.96) 0%, rgba(235,221,192,0.96) 100%)",
            borderColor: "rgba(84, 60, 42, 0.18)",
            boxShadow: "0 18px 40px rgba(0,0,0,0.26)",
          }}
        >
          <p
            className="font-typewriter text-[10px] uppercase tracking-[0.2em]"
            style={{ color: "#8c6a55" }}
          >
            Navigation Note
          </p>
          <p className="mt-2 text-sm leading-6" style={{ color: "#46372f" }}>
            {isLastStep
              ? "Use the left arrow to revisit earlier clues."
              : "Click the board or press the right arrow to follow the next lead."}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
