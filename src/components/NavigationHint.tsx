"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePresentation } from "@/store/usePresentationStore";
import { useState, useEffect } from "react";

export function NavigationHint() {
  const { state } = usePresentation();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  // Show hint again on first step
  useEffect(() => {
    if (state.currentStep === 0) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [state.currentStep]);

  const isLastStep = state.currentStep === state.totalSteps - 1;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-8 right-8 z-50 flex items-center gap-2"
          style={{ color: "#9E9890" }}
        >
          <span
            className="font-sans"
            style={{ fontSize: "11px", fontFamily: "DM Sans", letterSpacing: "0.04em" }}
          >
            {isLastStep ? "press ← to go back" : "click anywhere or press →"}
          </span>
          {!isLastStep && (
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
              <path
                d="M1 5h12M9 1l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
