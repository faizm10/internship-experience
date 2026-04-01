"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePresentation } from "@/store/usePresentationStore";
import { FlashlightOff } from "lucide-react";

export function SpotlightOverlay() {
  const { state, toggleSpotlight } = usePresentation();

  return (
    <AnimatePresence>
      {state.spotlightMode && (
        <motion.div
          key="spotlight-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-30 pointer-events-none"
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 24%, rgba(255,231,173,0.28) 0%, rgba(255,231,173,0.12) 12%, rgba(13,9,8,0.12) 28%, rgba(13,9,8,0.82) 72%)",
            }}
          />
          <div
            className="absolute left-1/2 top-0 h-[48vh] w-[72vw] -translate-x-1/2"
            style={{
              background:
                "radial-gradient(ellipse at top, rgba(255,229,161,0.28) 0%, rgba(255,229,161,0.08) 40%, transparent 72%)",
              filter: "blur(18px)",
            }}
          />
          <div
            className="absolute left-1/2 top-0 h-28 w-28 -translate-x-1/2 rounded-full border"
            style={{
              borderColor: "rgba(255, 240, 211, 0.22)",
              background:
                "radial-gradient(circle at 30% 30%, rgba(255,244,222,0.9) 0%, rgba(205,170,109,0.72) 52%, rgba(49,35,21,0.82) 100%)",
              boxShadow: "0 18px 60px rgba(0,0,0,0.35)",
            }}
          />
        </motion.div>
      )}
      {state.spotlightMode && (
        <motion.button
          key="spotlight-exit-button"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          onClick={toggleSpotlight}
          className="fixed right-5 top-24 z-50 flex items-center gap-2 rounded-full px-4 py-2 text-xs uppercase tracking-[0.16em] pointer-events-auto md:right-6 md:top-6"
          style={{
            backgroundColor: "rgba(31, 23, 20, 0.86)",
            color: "#f7ebdc",
            fontFamily: "Special Elite",
            border: "1px solid rgba(255,255,255,0.12)",
            backdropFilter: "blur(8px)",
          }}
        >
          <FlashlightOff size={13} />
          desk lamp off
        </motion.button>
      )}
    </AnimatePresence>
  );
}
