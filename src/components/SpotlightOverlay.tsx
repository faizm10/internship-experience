"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePresentation } from "@/store/usePresentationStore";
import { Minimize2 } from "lucide-react";

export function SpotlightOverlay() {
  const { state, toggleSpotlight } = usePresentation();

  return (
    <AnimatePresence>
      {state.spotlightMode && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-30 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 500px 400px at 50% 48%, transparent 0%, rgba(0,0,0,0.55) 100%)",
          }}
        />
      )}
      {state.spotlightMode && (
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          onClick={toggleSpotlight}
          className="fixed top-6 right-6 z-50 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-sans pointer-events-auto"
          style={{
            backgroundColor: "rgba(26,25,24,0.85)",
            color: "#F7F3EC",
            fontFamily: "DM Sans",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <Minimize2 size={11} />
          exit spotlight
        </motion.button>
      )}
    </AnimatePresence>
  );
}
